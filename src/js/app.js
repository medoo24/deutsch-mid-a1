// =========================================================================
// APP.JS - CORE APPLICATION STATE, LOCALSTORAGE, TTS, UTILS & NAVIGATION
// =========================================================================

// Combine LESSONS_DATA from Part 1 and Part 2
const LESSONS_DATA = [
  ...(typeof DATA_PART1 !== 'undefined' && Array.isArray(DATA_PART1) ? DATA_PART1 : []),
  ...(typeof DATA_PART2 !== 'undefined' && Array.isArray(DATA_PART2) ? DATA_PART2 : [])
];
window.LESSONS_DATA = LESSONS_DATA;

// Storage key for localStorage
const STORAGE_KEY = "deutsch_mid_a1_v2_progress";

// Main Application State
const appState = {
  currentLessonIdx: 0,
  currentMode: "book", // book, tv, test, translate, reading, immersion
  glossaryFilterCat: "all",
  glossaryOnlyCurrentLesson: false,
  glossarySearchQuery: "",
  highlightedGlossaryId: null,

  // Translation Mode state
  transFilterDir: "all", // all, de_to_ar, ar_to_de, en_to_de, de_to_en
  transCurrentQIdx: 0,

  // Reading Mode state
  readShowEnglish: false,
  readShowArabic: false,

  // Persistent progress
  progress: {
    version: "2.0",
    updatedAt: new Date().toISOString(),
    completedDays: {},
    quizAnswers: {},
    quizChecked: {},
    translationAttempts: {},     // key: `${day}_${transIdx}` -> text
    translationScores: {},       // key: `${day}_${transIdx}` -> boolean (correct)
    translationRevealed: {},     // key: `${day}_${transIdx}` -> boolean
    passageMcqAnswers: {},       // key: `${day}_${mcqIdx}` -> option
    passageWrittenSelfCheck: {}, // key: `${day}_${wIdx}` -> boolean
    passageWrittenAnswers: {},   // key: `${day}_${wIdx}` -> text
    tvLoopsCompleted: 0,
    lessonTvLoops: {},
    starredGlossaryIds: {}
  }
};
window.appState = appState;

// TV Mode State
const tvState = {
  isPlaying: false,
  slides: [],
  currentSlideIdx: 0,
  currentItemRepeat: 1,
  currentLessonRepeat: 1,
  currentWholeRepeat: 1,
  runToken: 0
};
window.tvState = tvState;

// Immersion Mode State
const immersionState = {
  isActive: false,
  currentLessonIdx: 0,
  currentPhase: 'vocab',  // vocab | phrase | grammar | examples | quiz | passage
  currentItemIdx: 0,
  speed: 1.0,
  isPaused: false,
  sessionStats: {
    wordsSeenCount: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    startTime: null
  },
  autoAdvanceTimer: null,
  runToken: 0
};
window.immersionState = immersionState;

// =========================================================================
// LOCALSTORAGE FUNCTIONS
// =========================================================================
function loadProgressFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        appState.progress = Object.assign(appState.progress, parsed);
      }
    }
  } catch (e) {
    console.warn("Could not load progress from storage", e);
  }
}

function saveProgressToStorage() {
  try {
    appState.progress.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.progress));
    updateProgressHeaderUI();
  } catch (e) {
    console.warn("Could not save progress", e);
  }
}

function showToast(msg) {
  const toast = document.getElementById("toastNotification");
  const text = document.getElementById("toastText");
  if (!toast || !text) return;
  text.textContent = msg;
  toast.classList.remove("hidden");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.add("hidden"), 2600);
}

// =========================================================================
// TEXT-TO-SPEECH (TTS) ENGINE WITH DE, EN & AR SUPPORT
// =========================================================================
let currentSpeechUtterance = null;
let currentAudioStream = null;

function stopAllSpeech() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  if (currentAudioStream) {
    currentAudioStream.pause();
    currentAudioStream = null;
  }
  currentSpeechUtterance = null;
  document.body.classList.remove("tv-speaking");
  const readBtnLabel = document.getElementById("readPassageAloudLabel");
  if (readBtnLabel) readBtnLabel.textContent = "Listen to Story";
}

function speakTextPromise(text, lang = "de-DE", rate = 0.92) {
  return new Promise(resolve => {
    if (!text || !text.trim()) {
      resolve();
      return;
    }

    stopAllSpeech();
    document.body.classList.add("tv-speaking");

    const engineMode = document.getElementById("tvVoiceEngineSelect")?.value || "auto";

    const finish = () => {
      document.body.classList.remove("tv-speaking");
      resolve();
    };

    const useGoogleStream = () => {
      try {
        let tl = "de";
        if (lang.startsWith("ar")) tl = "ar";
        else if (lang.startsWith("en")) tl = "en";
        const encoded = encodeURIComponent(text.slice(0, 160));
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=${encoded}`;
        currentAudioStream = new Audio(url);
        currentAudioStream.playbackRate = Math.max(0.7, Math.min(rate, 1.3));
        currentAudioStream.onended = finish;
        currentAudioStream.onerror = finish;
        currentAudioStream.play().catch(() => finish());
      } catch (err) {
        finish();
      }
    };

    if (engineMode === "google_stream") {
      useGoogleStream();
      return;
    }

    if ("speechSynthesis" in window) {
      try {
        const utter = new SpeechSynthesisUtterance(text);
        currentSpeechUtterance = utter;
        utter.lang = lang;
        utter.rate = rate;

        const voices = window.speechSynthesis.getVoices() || [];
        const prefix = lang.slice(0, 2).toLowerCase();
        const matched = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(prefix));
        if (matched) {
          utter.voice = matched;
        }

        const safetyTimer = setTimeout(() => {
          window.speechSynthesis.cancel();
          finish();
        }, Math.max(4000, text.length * 150));

        utter.onend = () => {
          clearTimeout(safetyTimer);
          finish();
        };
        utter.onerror = () => {
          clearTimeout(safetyTimer);
          if (engineMode === "auto") {
            useGoogleStream();
          } else {
            finish();
          }
        };

        window.speechSynthesis.speak(utter);
      } catch (e) {
        if (engineMode === "auto") useGoogleStream();
        else finish();
      }
    } else {
      useGoogleStream();
    }
  });
}

function speakSingle(text, lang = "de-DE", rate = 0.95) {
  if (tvState.isPlaying && typeof pauseTvMode === "function") pauseTvMode();
  stopAllSpeech();
  speakTextPromise(text, lang, rate);
}

function getArticleBadgeColor(deText) {
  const lower = deText.trim().toLowerCase();
  if (lower.startsWith("der ")) return "bg-sky-100 text-sky-900 border-sky-300";
  if (lower.startsWith("die ")) return "bg-rose-100 text-rose-900 border-rose-300";
  if (lower.startsWith("das ")) return "bg-emerald-100 text-emerald-900 border-emerald-300";
  return "bg-amber-100 text-amber-900 border-amber-300";
}

// =========================================================================
// PROGRESS METRICS & EXPORT / IMPORT (20 LESSONS AWARE)
// =========================================================================
function getProgressSummaryCounts() {
  const totalLessonsCount = LESSONS_DATA.length || 20;
  const completedCount = Object.values(appState.progress.completedDays || {}).filter(Boolean).length;

  let totalCorrectQuiz = 0;
  let totalQuizCount = 0;
  LESSONS_DATA.forEach(l => {
    (l.quiz || []).forEach((q, idx) => {
      totalQuizCount++;
      if (appState.progress.quizAnswers[`${l.day}_${idx}`] === q.answer) {
        totalCorrectQuiz++;
      }
    });
  });

  let totalTransSolved = 0;
  let totalTransCount = 0;
  LESSONS_DATA.forEach(l => {
    (l.translateQuiz || []).forEach((_, idx) => {
      totalTransCount++;
      if (appState.progress.translationScores[`${l.day}_${idx}`]) {
        totalTransSolved++;
      }
    });
  });

  let totalReadingSolved = 0;
  let totalReadingCount = 0;
  LESSONS_DATA.forEach(l => {
    if (l.readingPassage) {
      (l.readingPassage.mcqQuestions || []).forEach((q, idx) => {
        totalReadingCount++;
        if (appState.progress.passageMcqAnswers[`${l.day}_${idx}`] === q.answer) totalReadingSolved++;
      });
      (l.readingPassage.writtenQuestions || []).forEach((_, idx) => {
        totalReadingCount++;
        if (appState.progress.passageWrittenSelfCheck[`${l.day}_${idx}`]) totalReadingSolved++;
      });
    }
  });

  const starredCount = Object.values(appState.progress.starredGlossaryIds || {}).filter(Boolean).length;
  return {
    totalLessonsCount,
    completedCount,
    totalCorrectQuiz,
    totalQuizCount,
    totalTransSolved,
    totalTransCount,
    totalReadingSolved,
    totalReadingCount,
    starredCount
  };
}

function updateProgressHeaderUI() {
  const s = getProgressSummaryCounts();
  const headerEl = document.getElementById("headerProgressText");
  if (headerEl) {
    headerEl.textContent = `${s.completedCount}/${s.totalLessonsCount} Done • ${s.totalCorrectQuiz}/${s.totalQuizCount} Quiz`;
  }
}

function renderProgressModal() {
  const s = getProgressSummaryCounts();
  const statCompleted = document.getElementById("statLessonsCompleted");
  if (statCompleted) statCompleted.textContent = `${s.completedCount} / ${s.totalLessonsCount}`;
  const statQuiz = document.getElementById("statQuizScore");
  if (statQuiz) statQuiz.textContent = `${s.totalCorrectQuiz} / ${s.totalQuizCount}`;
  const statTrans = document.getElementById("statTransScore");
  if (statTrans) statTrans.textContent = `${s.totalTransSolved} / ${s.totalTransCount}`;
  const statReading = document.getElementById("statReadingScore");
  if (statReading) statReading.textContent = `${s.totalReadingSolved} / ${s.totalReadingCount}`;

  const grid = document.getElementById("progressLessonGrid");
  if (grid) {
    grid.innerHTML = LESSONS_DATA.map((l, idx) => {
      const done = !!appState.progress.completedDays[l.day];
      let qSolved = 0;
      (l.quiz || []).forEach((q, qIdx) => {
        if (appState.progress.quizAnswers[`${l.day}_${qIdx}`] === q.answer) qSolved++;
      });
      return `
        <button type="button" data-action="modal-jump-lesson" data-idx="${idx}" class="text-left p-2.5 rounded-xl border ${
          done ? 'bg-emerald-950/40 border-emerald-600/50' : 'bg-slate-950 border-slate-800 hover:border-slate-700'
        } transition flex items-center justify-between gap-2">
          <div class="min-w-0">
            <div class="text-xs font-bold text-white truncate">Day ${l.day}: ${escapeHtml(l.title)}</div>
            <div class="text-[11px] text-slate-400">Quiz: ${qSolved}/${(l.quiz || []).length}</div>
          </div>
          <span class="text-sm shrink-0">${done ? '✅' : '⭕'}</span>
        </button>
      `;
    }).join("");
  }

  const textarea = document.getElementById("progressJsonTextarea");
  if (textarea) {
    textarea.value = JSON.stringify(appState.progress, null, 2);
  }
}

function importProgressJsonString(jsonStr) {
  const feedback = document.getElementById("progressFeedbackMsg");
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== "object") throw new Error("Invalid structure");
    appState.progress = Object.assign(appState.progress, parsed);
    saveProgressToStorage();
    if (typeof renderBookSpread === "function") renderBookSpread();
    if (typeof renderQuiz === "function") renderQuiz();
    if (typeof renderTranslationStage === "function") renderTranslationStage();
    if (typeof renderReadingPassage === "function") renderReadingPassage();
    if (typeof renderGlossary === "function") renderGlossary();
    renderProgressModal();
    if (feedback) {
      feedback.textContent = "✓ Progress imported and restored successfully!";
      feedback.className = "text-xs font-semibold text-emerald-400";
      feedback.classList.remove("hidden");
    }
    showToast("Progress imported!");
  } catch (err) {
    if (feedback) {
      feedback.textContent = "✕ Invalid progress JSON. Please check formatting.";
      feedback.className = "text-xs font-semibold text-rose-400";
      feedback.classList.remove("hidden");
    }
  }
}

// =========================================================================
// MODE SWITCHING & NAVIGATION
// =========================================================================
function switchMode(newMode) {
  if (newMode !== "tv" && tvState.isPlaying && typeof pauseTvMode === "function") {
    pauseTvMode();
  }
  if (newMode !== "immersion" && immersionState.isActive && typeof exitImmersionMode === "function") {
    exitImmersionMode();
  }
  stopAllSpeech();
  appState.currentMode = newMode;

  const secMap = {
    book: "bookModeSection",
    tv: "tvModeSection",
    test: "testModeSection",
    translate: "translateModeSection",
    reading: "readingModeSection"
  };

  Object.keys(secMap).forEach(key => {
    const el = document.getElementById(secMap[key]);
    if (el) el.classList.toggle("hidden", key !== newMode);
  });

  const btnMap = {
    book: "modeBookBtn",
    tv: "modeTvBtn",
    test: "modeTestBtn",
    translate: "modeTranslateBtn",
    reading: "modeReadingBtn"
  };

  Object.keys(btnMap).forEach(key => {
    const btn = document.getElementById(btnMap[key]);
    if (!btn) return;
    if (key === newMode) {
      btn.className = "mode-tab-btn px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 bg-amber-500 text-slate-950 shadow whitespace-nowrap";
    } else {
      btn.className = "mode-tab-btn px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 text-slate-300 hover:text-white whitespace-nowrap";
    }
  });

  if (newMode === "book" && typeof renderBookSpread === "function") renderBookSpread();
  else if (newMode === "tv") {
    tvState.currentSlideIdx = 0;
    tvState.currentItemRepeat = 1;
    if (typeof renderTvSlideUI === "function") renderTvSlideUI();
  } else if (newMode === "test" && typeof renderQuiz === "function") renderQuiz();
  else if (newMode === "translate" && typeof renderTranslationStage === "function") renderTranslationStage();
  else if (newMode === "reading" && typeof renderReadingPassage === "function") renderReadingPassage();
}

function goToLesson(idx, direction = null) {
  const bounded = Math.max(0, Math.min(LESSONS_DATA.length - 1, idx));
  if (bounded === appState.currentLessonIdx && !direction) return;
  const dir = direction || (bounded > appState.currentLessonIdx ? "next" : "prev");
  appState.currentLessonIdx = bounded;
  tvState.currentSlideIdx = 0;
  tvState.currentItemRepeat = 1;
  appState.transCurrentQIdx = 0;
  if (typeof renderBookSpread === "function") renderBookSpread(dir);
  if (typeof renderTvSlideUI === "function") renderTvSlideUI();
  if (typeof renderQuiz === "function") renderQuiz();
  if (typeof renderTranslationStage === "function") renderTranslationStage();
  if (typeof renderReadingPassage === "function") renderReadingPassage();
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/'/g, "&#39;");
}

// =========================================================================
// YOUGLISH & VIDEO EXPLORER
// =========================================================================
function ensureYouglishScriptLoaded(callback) {
  if (window.YG && window.YG.Widget) {
    callback();
    return;
  }
  const existing = document.getElementById("youglish-sdk");
  if (!existing) {
    const tag = document.createElement("script");
    tag.id = "youglish-sdk";
    tag.src = "https://youglish.com/public/emb/widget.js";
    tag.async = true;
    tag.onload = () => callback();
    tag.onerror = () => {
      console.warn("Could not load YouGlish script");
      const notice = document.getElementById("youglishFallbackNotice");
      if (notice) notice.classList.remove("hidden");
    };
    document.head.appendChild(tag);
  } else {
    setTimeout(() => callback(), 300);
  }
}

function openYouglishModal(phrase = "") {
  const lesson = LESSONS_DATA[appState.currentLessonIdx];
  const targetPhrase = phrase || (lesson ? lesson.usefulPhrase.de : "Guten Tag");

  const queryInput = document.getElementById("youglishQueryInput");
  if (queryInput) queryInput.value = targetPhrase;
  const titleEl = document.getElementById("youglishCurrentPhraseTitle");
  if (titleEl) titleEl.textContent = targetPhrase;
  const modal = document.getElementById("youglishModal");
  if (modal) modal.classList.remove("hidden");

  // Render Chips from Current Lesson
  const chipsContainer = document.getElementById("youglishLessonChips");
  if (chipsContainer && lesson) {
    chipsContainer.innerHTML = lesson.vocab.map(v =>
      `<button type="button" data-action="yg-chip" data-text="${escapeAttr(v.de)}" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 text-xs font-semibold border border-slate-700 transition">${escapeHtml(v.de)}</button>`
    ).join("") + `
      <button type="button" data-action="yg-chip" data-text="${escapeAttr(lesson.usefulPhrase.de)}" class="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-slate-950 text-xs font-bold border border-amber-500/40 transition">★ Useful Phrase</button>
    `;
  }

  runYouglishLookup(targetPhrase);
}

let youglishWidgetInstance = null;
function runYouglishLookup(query) {
  const cleanQ = (query || "").replace(/[„“\"!\?]/g, "").trim();
  if (!cleanQ) return;

  const fallbackLink = document.getElementById("youglishExternalLink");
  if (fallbackLink) {
    fallbackLink.href = `https://youglish.com/pronounce/${encodeURIComponent(cleanQ)}/german`;
  }

  ensureYouglishScriptLoaded(() => {
    try {
      if (!youglishWidgetInstance && window.YG && window.YG.Widget) {
        youglishWidgetInstance = new window.YG.Widget("youglishWidgetContainer", {
          width: 640,
          components: 84, // search box, controls, title
          events: {
            onError: () => {
              const notice = document.getElementById("youglishFallbackNotice");
              if (notice) notice.classList.remove("hidden");
            }
          }
        });
      }
      if (youglishWidgetInstance && youglishWidgetInstance.fetch) {
        youglishWidgetInstance.fetch(cleanQ, "german");
      }
    } catch (e) {
      console.warn("YouGlish embed failed", e);
      const notice = document.getElementById("youglishFallbackNotice");
      if (notice) notice.classList.remove("hidden");
    }
  });
}

// Export utilities to window
window.loadProgressFromStorage = loadProgressFromStorage;
window.saveProgressToStorage = saveProgressToStorage;
window.showToast = showToast;
window.stopAllSpeech = stopAllSpeech;
window.speakTextPromise = speakTextPromise;
window.speakSingle = speakSingle;
window.getArticleBadgeColor = getArticleBadgeColor;
window.getProgressSummaryCounts = getProgressSummaryCounts;
window.updateProgressHeaderUI = updateProgressHeaderUI;
window.renderProgressModal = renderProgressModal;
window.importProgressJsonString = importProgressJsonString;
window.switchMode = switchMode;
window.goToLesson = goToLesson;
window.escapeHtml = escapeHtml;
window.escapeAttr = escapeAttr;
window.openYouglishModal = openYouglishModal;
window.runYouglishLookup = runYouglishLookup;
