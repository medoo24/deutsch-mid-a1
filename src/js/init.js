// =========================================================================
// INIT.JS - DOM INITIALIZATION & EVENT LISTENERS
// =========================================================================

window.addEventListener("DOMContentLoaded", () => {
  // Ensure Master Glossary is compiled
  if (typeof buildMasterGlossary === "function") {
    buildMasterGlossary();
  }

  loadProgressFromStorage();

  // Populate Lesson Dropdown (all 20 Lessons)
  const lessonSelect = document.getElementById("lessonSelect");
  if (lessonSelect) {
    lessonSelect.innerHTML = LESSONS_DATA.map((l, idx) =>
      `<option value="${idx}">Day ${l.day}: ${escapeHtml(l.title)}</option>`
    ).join("");

    lessonSelect.addEventListener("change", e => {
      goToLesson(parseInt(e.target.value, 10));
    });
  }

  // Mode Switcher Buttons
  document.getElementById("modeBookBtn")?.addEventListener("click", () => switchMode("book"));
  document.getElementById("modeTvBtn")?.addEventListener("click", () => switchMode("tv"));
  document.getElementById("modeTestBtn")?.addEventListener("click", () => switchMode("test"));
  document.getElementById("modeTranslateBtn")?.addEventListener("click", () => switchMode("translate"));
  document.getElementById("modeReadingBtn")?.addEventListener("click", () => switchMode("reading"));
  document.getElementById("modeImmersionBtn")?.addEventListener("click", () => openImmersionLaunchDialog());

  // Immersion Mode Launch Modal
  document.getElementById("immersionStartCurrentBtn")?.addEventListener("click", () => startImmersionMode(false));
  document.getElementById("immersionStartBeginBtn")?.addEventListener("click", () => startImmersionMode(true));
  document.getElementById("closeImmersionLaunchModalBtn")?.addEventListener("click", () => {
    document.getElementById("immersionLaunchModal")?.classList.add("hidden");
  });

  // Immersion Overlay Controls
  document.getElementById("closeImmersionBtn")?.addEventListener("click", () => exitImmersionMode());
  document.getElementById("immersionEndSessionBtn")?.addEventListener("click", () => exitImmersionMode());
  document.getElementById("immersionPauseBtn")?.addEventListener("click", () => toggleImmersionPause());
  document.getElementById("immersionCenterPauseBtn")?.addEventListener("click", () => toggleImmersionPause());
  document.getElementById("immersionSkipPhaseBtn")?.addEventListener("click", () => skipImmersionPhase());
  document.getElementById("immersionPrevPhaseBtn")?.addEventListener("click", () => prevImmersionPhase());

  document.querySelectorAll(".immersion-speed-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const spd = parseFloat(btn.dataset.speed || "1.0");
      setImmersionSpeed(spd);
    });
  });

  // Prev / Next Page Swap Buttons
  document.getElementById("prevPageBtn")?.addEventListener("click", () => goToLesson(appState.currentLessonIdx - 1, "prev"));
  document.getElementById("nextPageBtn")?.addEventListener("click", () => goToLesson(appState.currentLessonIdx + 1, "next"));
  document.getElementById("bottomPrevBtn")?.addEventListener("click", () => goToLesson(appState.currentLessonIdx - 1, "prev"));
  document.getElementById("bottomNextBtn")?.addEventListener("click", () => goToLesson(appState.currentLessonIdx + 1, "next"));
  document.getElementById("quizPrevLessonBtn")?.addEventListener("click", () => goToLesson(appState.currentLessonIdx - 1, "prev"));
  document.getElementById("quizNextLessonBtn")?.addEventListener("click", () => goToLesson(appState.currentLessonIdx + 1, "next"));
  document.getElementById("transPrevLessonBtn")?.addEventListener("click", () => goToLesson(appState.currentLessonIdx - 1, "prev"));
  document.getElementById("transNextLessonBtn")?.addEventListener("click", () => goToLesson(appState.currentLessonIdx + 1, "next"));
  document.getElementById("readPrevLessonBtn")?.addEventListener("click", () => goToLesson(appState.currentLessonIdx - 1, "prev"));
  document.getElementById("readNextLessonBtn")?.addEventListener("click", () => goToLesson(appState.currentLessonIdx + 1, "next"));

  // Translation Navigation Buttons
  document.getElementById("transPrevQBtn")?.addEventListener("click", () => {
    const list = getFilteredTranslationList();
    if (!list.length) return;
    appState.transCurrentQIdx = (appState.transCurrentQIdx - 1 + list.length) % list.length;
    renderTranslationStage();
  });
  document.getElementById("transNextQBtn")?.addEventListener("click", () => {
    const list = getFilteredTranslationList();
    if (!list.length) return;
    appState.transCurrentQIdx = (appState.transCurrentQIdx + 1) % list.length;
    renderTranslationStage();
  });

  // Translation Direction Filters
  document.querySelectorAll(".trans-dir-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      appState.transFilterDir = btn.dataset.transDir;
      appState.transCurrentQIdx = 0;
      document.querySelectorAll(".trans-dir-btn").forEach(b => {
        b.className = b.dataset.transDir === appState.transFilterDir
          ? "trans-dir-btn px-3 py-1.5 rounded-lg font-semibold bg-sky-500 text-slate-950 whitespace-nowrap"
          : "trans-dir-btn px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-slate-300 hover:text-white whitespace-nowrap";
      });
      renderTranslationStage();
    });
  });

  // Reading Mode Toggles
  document.getElementById("toggleEnglishTransBtn")?.addEventListener("click", () => {
    appState.readShowEnglish = !appState.readShowEnglish;
    renderReadingPassage();
  });
  document.getElementById("toggleArabicTransBtn")?.addEventListener("click", () => {
    appState.readShowArabic = !appState.readShowArabic;
    renderReadingPassage();
  });
  document.getElementById("hideTransBtn")?.addEventListener("click", () => {
    appState.readShowEnglish = false;
    appState.readShowArabic = false;
    renderReadingPassage();
  });

  // Reading Audio Story
  let isStorySpeaking = false;
  document.getElementById("readPassageAloudBtn")?.addEventListener("click", async () => {
    const lesson = LESSONS_DATA[appState.currentLessonIdx];
    if (!lesson || !lesson.readingPassage) return;
    const label = document.getElementById("readPassageAloudLabel");
    if (isStorySpeaking) {
      stopAllSpeech();
      isStorySpeaking = false;
      if (label) label.textContent = "Listen to Story";
      return;
    }
    isStorySpeaking = true;
    if (label) label.textContent = "Stop Story";
    await speakTextPromise(lesson.readingPassage.text, "de-DE", 0.90);
    isStorySpeaking = false;
    if (label) label.textContent = "Listen to Story";
  });

  document.getElementById("readStopSpeechBtn")?.addEventListener("click", () => {
    stopAllSpeech();
    isStorySpeaking = false;
  });

  // Keyboard Shortcuts
  window.addEventListener("keydown", e => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    if (e.code === "Space") {
      if (immersionState.isActive) {
        e.preventDefault();
        toggleImmersionPause();
      } else if (appState.currentMode === "tv") {
        e.preventDefault();
        tvState.isPlaying ? pauseTvMode() : startTvMode();
      }
    } else if (e.code === "Escape") {
      if (immersionState.isActive) {
        exitImmersionMode();
      }
    } else if (e.code === "ArrowRight") {
      if (immersionState.isActive) {
        skipImmersionPhase();
      } else if (appState.currentLessonIdx < LESSONS_DATA.length - 1) {
        goToLesson(appState.currentLessonIdx + 1, "next");
      }
    } else if (e.code === "ArrowLeft") {
      if (immersionState.isActive) {
        prevImmersionPhase();
      } else if (appState.currentLessonIdx > 0) {
        goToLesson(appState.currentLessonIdx - 1, "prev");
      }
    }
  });

  // Mark Lesson Complete
  document.getElementById("markCompleteBtn")?.addEventListener("click", () => {
    const lesson = LESSONS_DATA[appState.currentLessonIdx];
    const isDone = !!appState.progress.completedDays[lesson.day];
    appState.progress.completedDays[lesson.day] = !isDone;
    saveProgressToStorage();
    updateNavigationStateUI();
    showToast(isDone ? `Day ${lesson.day} marked incomplete` : `Day ${lesson.day} marked complete! 🎉`);
  });

  // Speak Current Lesson Button
  document.getElementById("speakCurrentLessonBtn")?.addEventListener("click", async () => {
    const lesson = LESSONS_DATA[appState.currentLessonIdx];
    if (!lesson) return;
    stopAllSpeech();
    showToast(`Playing Day ${lesson.day} words & phrase...`);
    for (const v of lesson.vocab) {
      await speakTextPromise(v.de, "de-DE", 0.92);
      await new Promise(r => setTimeout(r, 600));
    }
    await speakTextPromise(lesson.usefulPhrase.de, "de-DE", 0.90);
  });

  // Stop Speech Quick Button
  document.getElementById("stopSpeechQuickBtn")?.addEventListener("click", () => {
    if (tvState.isPlaying) pauseTvMode();
    if (immersionState.isActive) toggleImmersionPause();
    stopAllSpeech();
    showToast("Audio stopped");
  });

  // TV Mode Controls
  document.getElementById("tvPlayPauseBtn")?.addEventListener("click", () => {
    tvState.isPlaying ? pauseTvMode() : startTvMode();
  });
  document.getElementById("tvPrevSlideBtn")?.addEventListener("click", () => {
    const wasPlaying = tvState.isPlaying;
    if (wasPlaying) pauseTvMode();
    if (tvState.currentSlideIdx > 0) {
      tvState.currentSlideIdx--;
      tvState.currentItemRepeat = 1;
      renderTvSlideUI();
    }
  });
  document.getElementById("tvNextSlideBtn")?.addEventListener("click", () => {
    const wasPlaying = tvState.isPlaying;
    if (wasPlaying) pauseTvMode();
    if (tvState.currentSlideIdx < tvState.slides.length - 1) {
      tvState.currentSlideIdx++;
      tvState.currentItemRepeat = 1;
      renderTvSlideUI();
    }
  });
  document.getElementById("tvRestartLessonBtn")?.addEventListener("click", () => {
    tvState.currentSlideIdx = 0;
    tvState.currentItemRepeat = 1;
    tvState.currentLessonRepeat = 1;
    renderTvSlideUI();
    if (!tvState.isPlaying) startTvMode();
  });
  document.getElementById("tvYouglishCurrentBtn")?.addEventListener("click", () => {
    const slide = tvState.slides[tvState.currentSlideIdx];
    if (slide) openYouglishModal(slide.german);
  });
  document.getElementById("tvInspectGlossaryBtn")?.addEventListener("click", () => {
    const slide = tvState.slides[tvState.currentSlideIdx];
    if (slide && slide.id) {
      focusGlossaryEntry(slide.id);
    }
  });

  // Quiz Check All & Reset Buttons
  document.getElementById("checkAllQuizBtn")?.addEventListener("click", () => {
    const lesson = LESSONS_DATA[appState.currentLessonIdx];
    (lesson.quiz || []).forEach((_, qIdx) => {
      appState.progress.quizChecked[`${lesson.day}_${qIdx}`] = true;
    });
    saveProgressToStorage();
    renderQuiz();
    showToast("All answers revealed!");
  });

  document.getElementById("resetQuizBtn")?.addEventListener("click", () => {
    const lesson = LESSONS_DATA[appState.currentLessonIdx];
    (lesson.quiz || []).forEach((_, qIdx) => {
      delete appState.progress.quizAnswers[`${lesson.day}_${qIdx}`];
      delete appState.progress.quizChecked[`${lesson.day}_${qIdx}`];
    });
    saveProgressToStorage();
    renderQuiz();
    showToast(`Quiz for Day ${lesson.day} reset.`);
  });

  // Glossary Sidebar & Filter Controls
  document.getElementById("toggleGlossaryBtn")?.addEventListener("click", () => {
    const sidebar = document.getElementById("glossarySidebar");
    if (sidebar) sidebar.classList.toggle("hidden");
  });
  document.getElementById("closeGlossaryMobileBtn")?.addEventListener("click", () => {
    document.getElementById("glossarySidebar")?.classList.add("hidden");
  });
  document.getElementById("filterCurrentLessonGlossaryBtn")?.addEventListener("click", () => {
    appState.glossaryOnlyCurrentLesson = !appState.glossaryOnlyCurrentLesson;
    renderGlossary();
  });

  const glossSearch = document.getElementById("glossarySearchInput");
  const clearGlossBtn = document.getElementById("clearGlossarySearchBtn") || document.getElementById("glossaryClearSearchBtn");
  if (glossSearch) {
    glossSearch.addEventListener("input", e => {
      appState.glossarySearchQuery = e.target.value;
      if (clearGlossBtn) clearGlossBtn.classList.toggle("hidden", !e.target.value);
      renderGlossary();
    });
  }
  if (clearGlossBtn) {
    clearGlossBtn.addEventListener("click", () => {
      if (glossSearch) glossSearch.value = "";
      appState.glossarySearchQuery = "";
      clearGlossBtn.classList.add("hidden");
      renderGlossary();
    });
  }

  document.querySelectorAll(".glossary-cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      appState.glossaryFilterCat = btn.dataset.cat;
      document.querySelectorAll(".glossary-cat-btn").forEach(b => {
        b.className = b.dataset.cat === appState.glossaryFilterCat
          ? "glossary-cat-btn px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 transition"
          : "glossary-cat-btn px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white transition";
      });
      renderGlossary();
    });
  });

  // YouGlish Modal Controls
  document.getElementById("openYouglishBtn")?.addEventListener("click", () => openYouglishModal());
  document.getElementById("closeYouglishModalBtn")?.addEventListener("click", () => {
    document.getElementById("youglishModal")?.classList.add("hidden");
  });
  document.getElementById("youglishSearchBtn")?.addEventListener("click", () => {
    const val = document.getElementById("youglishQueryInput")?.value || "";
    runYouglishLookup(val);
  });
  document.getElementById("youglishQueryInput")?.addEventListener("keydown", e => {
    if (e.key === "Enter") runYouglishLookup(e.target.value);
  });
  document.getElementById("youglishLangSelect")?.addEventListener("change", () => {
    const val = document.getElementById("youglishQueryInput")?.value || "";
    runYouglishLookup(val);
  });

  document.getElementById("ygSpeakNormalBtn")?.addEventListener("click", () => {
    const val = document.getElementById("youglishQueryInput")?.value || "";
    speakSingle(val, "de-DE", 0.95);
  });
  document.getElementById("ygSpeakSlowBtn")?.addEventListener("click", () => {
    const val = document.getElementById("youglishQueryInput")?.value || "";
    speakSingle(val, "de-DE", 0.72);
  });
  document.getElementById("ygSpeakEnBtn")?.addEventListener("click", () => {
    const val = document.getElementById("youglishQueryInput")?.value || "";
    const match = ALL_GLOSSARY.find(g => g.de.toLowerCase().includes(val.toLowerCase()));
    if (match && match.en) speakSingle(match.en, "en-US", 1.0);
  });

  // Progress Modal Controls
  document.getElementById("openProgressBtn")?.addEventListener("click", () => {
    renderProgressModal();
    document.getElementById("progressModal")?.classList.remove("hidden");
  });
  document.getElementById("closeProgressModalBtn")?.addEventListener("click", () => {
    document.getElementById("progressModal")?.classList.add("hidden");
  });

  document.getElementById("downloadProgressJsonBtn")?.addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState.progress, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `deutsch_mid_a1_progress_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Progress file downloaded!");
  });

  document.getElementById("uploadProgressJsonInput")?.addEventListener("change", e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      importProgressJsonString(ev.target.result);
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  document.getElementById("copyProgressTextBtn")?.addEventListener("click", () => {
    const textarea = document.getElementById("progressJsonTextarea");
    if (textarea) {
      textarea.select();
      navigator.clipboard?.writeText(textarea.value);
      showToast("JSON copied to clipboard!");
    }
  });

  document.getElementById("applyProgressTextBtn")?.addEventListener("click", () => {
    const textarea = document.getElementById("progressJsonTextarea");
    if (textarea) {
      importProgressJsonString(textarea.value);
    }
  });

  document.getElementById("resetAllProgressBtn")?.addEventListener("click", () => {
    if (confirm("Are you sure you want to completely reset all scores, quizzes, and saved progress?")) {
      appState.progress = {
        version: "2.0",
        updatedAt: new Date().toISOString(),
        completedDays: {},
        quizAnswers: {},
        quizChecked: {},
        translationAttempts: {},
        translationScores: {},
        translationRevealed: {},
        passageMcqAnswers: {},
        passageWrittenSelfCheck: {},
        passageWrittenAnswers: {},
        tvLoopsCompleted: 0,
        lessonTvLoops: {},
        starredGlossaryIds: {}
      };
      saveProgressToStorage();
      renderBookSpread();
      renderQuiz();
      renderTranslationStage();
      renderReadingPassage();
      renderGlossary();
      renderProgressModal();
      showToast("Progress completely reset.");
    }
  });

  // Global Click Delegation
  document.body.addEventListener("click", e => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    if (action === "speak-de") {
      speakSingle(btn.dataset.text, "de-DE", 0.92);
    } else if (action === "speak-en") {
      speakSingle(btn.dataset.text, "en-US", 1.0);
    } else if (action === "speak-ar") {
      speakSingle(btn.dataset.text, "ar-SA", 1.0);
    } else if (action === "speak-dynamic") {
      speakSingle(btn.dataset.text, btn.dataset.lang || "de-DE", 0.95);
    } else if (action === "toggle-star") {
      const id = btn.dataset.id;
      appState.progress.starredGlossaryIds[id] = !appState.progress.starredGlossaryIds[id];
      saveProgressToStorage();
      renderBookSpread();
      renderGlossary();
    } else if (action === "focus-glossary") {
      focusGlossaryEntry(btn.dataset.id);
    } else if (action === "open-youglish") {
      openYouglishModal(btn.dataset.text);
    } else if (action === "yg-chip") {
      openYouglishModal(btn.dataset.text);
    } else if (action === "listen-page-left") {
      const lesson = LESSONS_DATA[appState.currentLessonIdx];
      showToast(`Reading Day ${lesson.day} vocabulary...`);
      (async () => {
        for (const v of lesson.vocab) {
          await speakTextPromise(v.de, "de-DE", 0.92);
          await new Promise(r => setTimeout(r, 600));
        }
        await speakTextPromise(lesson.usefulPhrase.de, "de-DE", 0.90);
      })();
    } else if (action === "listen-page-right") {
      const lesson = LESSONS_DATA[appState.currentLessonIdx];
      showToast(`Reading Day ${lesson.day} grammar examples...`);
      (async () => {
        for (const ex of lesson.grammar.examples) {
          await speakTextPromise(ex.de, "de-DE", 0.92);
          await new Promise(r => setTimeout(r, 700));
        }
      })();
    } else if (action === "dot-jump" || action === "jump-lesson") {
      goToLesson(parseInt(btn.dataset.idx, 10));
    } else if (action === "modal-jump-lesson") {
      document.getElementById("progressModal")?.classList.add("hidden");
      goToLesson(parseInt(btn.dataset.idx, 10));
    } else if (action === "launch-tv-lesson") {
      switchMode("tv");
      startTvMode();
    } else if (action === "launch-test-lesson") {
      switchMode("test");
    } else if (action === "launch-trans-lesson") {
      switchMode("translate");
    } else if (action === "launch-read-lesson") {
      switchMode("reading");
    } else if (action === "tv-jump-slide") {
      tvState.currentSlideIdx = parseInt(btn.dataset.idx, 10);
      tvState.currentItemRepeat = 1;
      renderTvSlideUI();
    } else if (action === "select-quiz-opt") {
      const lesson = LESSONS_DATA[appState.currentLessonIdx];
      const qIdx = parseInt(btn.dataset.qidx, 10);
      const opt = btn.dataset.opt;
      appState.progress.quizAnswers[`${lesson.day}_${qIdx}`] = opt;
      appState.progress.quizChecked[`${lesson.day}_${qIdx}`] = true;
      saveProgressToStorage();
      renderQuiz();
    } else if (action === "select-read-mcq") {
      const lesson = LESSONS_DATA[appState.currentLessonIdx];
      const qIdx = parseInt(btn.dataset.qidx, 10);
      const opt = btn.dataset.opt;
      appState.progress.passageMcqAnswers[`${lesson.day}_${qIdx}`] = opt;
      saveProgressToStorage();
      renderReadingPassage();
    } else if (action === "toggle-model-written") {
      const lesson = LESSONS_DATA[appState.currentLessonIdx];
      const wIdx = parseInt(btn.dataset.widx, 10);
      const key = `${lesson.day}_${wIdx}_revealed`;
      appState.progress.passageWrittenAnswers[key] = !appState.progress.passageWrittenAnswers[key];
      saveProgressToStorage();
      renderReadingPassage();
    } else if (action === "self-check-written") {
      const lesson = LESSONS_DATA[appState.currentLessonIdx];
      const wIdx = parseInt(btn.dataset.widx, 10);
      const key = `${lesson.day}_${wIdx}`;
      appState.progress.passageWrittenSelfCheck[key] = btn.checked;
      saveProgressToStorage();
      renderReadingPassage();
    } else if (action === "insert-key") {
      const ch = btn.dataset.key;
      const textarea = document.getElementById("transInputTextarea");
      if (textarea) {
        const start = textarea.selectionStart || textarea.value.length;
        const end = textarea.selectionEnd || textarea.value.length;
        textarea.value = textarea.value.slice(0, start) + ch + textarea.value.slice(end);
        textarea.focus();
        textarea.setSelectionRange(start + ch.length, start + ch.length);
      }
    }
  });

  // Auto-save written response text on input
  document.body.addEventListener("input", e => {
    if (e.target.dataset && e.target.dataset.writtenIdx !== undefined) {
      const lesson = LESSONS_DATA[appState.currentLessonIdx];
      const wIdx = parseInt(e.target.dataset.writtenIdx, 10);
      appState.progress.passageWrittenAnswers[`${lesson.day}_${wIdx}`] = e.target.value;
      saveProgressToStorage();
    }
  });

  // Touch Swipe for Book Spread
  let touchStartX = null;
  const spreadEl = document.getElementById("bookSpreadContainer");
  if (spreadEl) {
    spreadEl.addEventListener("touchstart", e => {
      if (e.touches && e.touches.length === 1) touchStartX = e.touches[0].clientX;
    }, { passive: true });
    spreadEl.addEventListener("touchend", e => {
      if (touchStartX === null || !e.changedTouches || !e.changedTouches.length) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(dx) > 55) {
        if (dx < 0 && appState.currentLessonIdx < LESSONS_DATA.length - 1) {
          goToLesson(appState.currentLessonIdx + 1, "next");
        } else if (dx > 0 && appState.currentLessonIdx > 0) {
          goToLesson(appState.currentLessonIdx - 1, "prev");
        }
      }
    }, { passive: true });
  }

  // Initial UI Render Calls
  updateProgressHeaderUI();
  renderBookSpread();
  renderTvSlideUI();
  renderQuiz();
  renderTranslationStage();
  renderReadingPassage();
  renderGlossary();
});
