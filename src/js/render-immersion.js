// =========================================================================
// RENDER-IMMERSION.JS - HANDS-FREE AUTOPILOT STUDY MODE
// =========================================================================

const IMMERSION_PHASES = ['vocab', 'phrase', 'grammar', 'examples', 'quiz', 'passage'];

function getImmersionPhaseIndex(phase) {
  const idx = IMMERSION_PHASES.indexOf(phase);
  return idx >= 0 ? idx : 0;
}

function sleepImmersion(ms, token) {
  return new Promise(resolve => {
    let elapsed = 0;
    const interval = setInterval(() => {
      if (!immersionState.isActive || token !== immersionState.runToken) {
        clearInterval(interval);
        resolve(false);
        return;
      }
      if (!immersionState.isPaused) {
        elapsed += 50;
        if (elapsed >= ms) {
          clearInterval(interval);
          resolve(true);
        }
      }
    }, 50);
  });
}

function openImmersionLaunchDialog() {
  const dialog = document.getElementById("immersionLaunchModal");
  if (dialog) {
    dialog.classList.remove("hidden");
  } else {
    startImmersionMode(false);
  }
}

function startImmersionMode(fromBeginning = false) {
  const dialog = document.getElementById("immersionLaunchModal");
  if (dialog) dialog.classList.add("hidden");

  // Pause TV mode if active
  if (tvState.isPlaying && typeof pauseTvMode === "function") {
    pauseTvMode();
  }
  stopAllSpeech();

  immersionState.isActive = true;
  immersionState.isPaused = false;
  if (fromBeginning) {
    immersionState.currentLessonIdx = 0;
  }
  immersionState.currentPhase = 'vocab';
  immersionState.currentItemIdx = 0;
  immersionState.passageSubPhase = 'text'; // 'text' | 'mcq'
  immersionState.passageMcqIdx = 0;
  immersionState.quizWaitingUser = false;
  immersionState.sessionStats = {
    wordsSeenCount: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    startTime: Date.now()
  };

  const overlay = document.getElementById("immersionOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  immersionState.runToken = (immersionState.runToken || 0) + 1;
  executeCurrentImmersionPhase(immersionState.runToken);
}

function exitImmersionMode() {
  immersionState.isActive = false;
  immersionState.isPaused = false;
  immersionState.runToken = (immersionState.runToken || 0) + 1;
  stopAllSpeech();

  const overlay = document.getElementById("immersionOverlay");
  if (overlay) {
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

function toggleImmersionPause() {
  if (!immersionState.isActive) return;
  immersionState.isPaused = !immersionState.isPaused;

  const pauseBtn = document.getElementById("immersionPauseBtn");
  const centerPauseBtn = document.getElementById("immersionCenterPauseBtn");
  const pausedOverlay = document.getElementById("immersionPausedBanner");

  if (immersionState.isPaused) {
    stopAllSpeech();
    if (pauseBtn) pauseBtn.innerHTML = `<span>▶</span> <span>Resume</span>`;
    if (centerPauseBtn) centerPauseBtn.innerHTML = `<span>▶</span>`;
    if (pausedOverlay) pausedOverlay.classList.remove("hidden");
  } else {
    if (pauseBtn) pauseBtn.innerHTML = `<span>⏸</span> <span>Pause</span>`;
    if (centerPauseBtn) centerPauseBtn.innerHTML = `<span>⏸</span>`;
    if (pausedOverlay) pausedOverlay.classList.add("hidden");
    // Resume execution
    immersionState.runToken = (immersionState.runToken || 0) + 1;
    executeCurrentImmersionPhase(immersionState.runToken);
  }
}

function skipImmersionPhase() {
  if (!immersionState.isActive) return;
  stopAllSpeech();
  immersionState.runToken = (immersionState.runToken || 0) + 1;

  const currentPIdx = getImmersionPhaseIndex(immersionState.currentPhase);
  if (currentPIdx < IMMERSION_PHASES.length - 1) {
    immersionState.currentPhase = IMMERSION_PHASES[currentPIdx + 1];
    immersionState.currentItemIdx = 0;
    immersionState.passageSubPhase = 'text';
    immersionState.passageMcqIdx = 0;
  } else {
    // Next lesson
    advanceImmersionLesson();
    return;
  }
  executeCurrentImmersionPhase(immersionState.runToken);
}

function prevImmersionPhase() {
  if (!immersionState.isActive) return;
  stopAllSpeech();
  immersionState.runToken = (immersionState.runToken || 0) + 1;

  const currentPIdx = getImmersionPhaseIndex(immersionState.currentPhase);
  if (currentPIdx > 0) {
    immersionState.currentPhase = IMMERSION_PHASES[currentPIdx - 1];
    immersionState.currentItemIdx = 0;
    immersionState.passageSubPhase = 'text';
    immersionState.passageMcqIdx = 0;
  } else if (immersionState.currentLessonIdx > 0) {
    immersionState.currentLessonIdx--;
    immersionState.currentPhase = 'vocab';
    immersionState.currentItemIdx = 0;
    immersionState.passageSubPhase = 'text';
    immersionState.passageMcqIdx = 0;
  }
  executeCurrentImmersionPhase(immersionState.runToken);
}

function setImmersionSpeed(newSpeed) {
  immersionState.speed = newSpeed;
  document.querySelectorAll(".immersion-speed-btn").forEach(btn => {
    const s = parseFloat(btn.dataset.speed);
    if (Math.abs(s - newSpeed) < 0.05) {
      btn.className = "immersion-speed-btn px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 shadow";
    } else {
      btn.className = "immersion-speed-btn px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-400 hover:text-white";
    }
  });
}

function advanceImmersionLesson() {
  if (immersionState.currentLessonIdx + 1 < LESSONS_DATA.length) {
    immersionState.currentLessonIdx++;
    immersionState.currentPhase = 'vocab';
    immersionState.currentItemIdx = 0;
    immersionState.passageSubPhase = 'text';
    immersionState.passageMcqIdx = 0;
    immersionState.runToken = (immersionState.runToken || 0) + 1;
    executeCurrentImmersionPhase(immersionState.runToken);
  } else {
    // Session Complete!
    renderImmersionCompleteScreen();
  }
}

function updateImmersionHeaderAndStatsUI() {
  const lesson = LESSONS_DATA[immersionState.currentLessonIdx];
  if (!lesson) return;

  const lessonBadge = document.getElementById("immersionLessonBadge");
  if (lessonBadge) {
    lessonBadge.textContent = `Lesson ${lesson.day} / ${LESSONS_DATA.length}`;
  }

  const phaseNames = {
    vocab: "📖 Key Vocabulary",
    phrase: "🗣️ Useful Phrase",
    grammar: "🧠 Grammar Focus",
    examples: "🔊 Real-Life Examples",
    quiz: "✍️ Interactive Mini-Quiz",
    passage: "📚 Story Comprehension"
  };

  const phaseBadge = document.getElementById("immersionPhaseBadge");
  if (phaseBadge) {
    phaseBadge.textContent = phaseNames[immersionState.currentPhase] || immersionState.currentPhase;
  }

  // Calculate overall progress across 20 lessons and 6 phases
  const totalSteps = LESSONS_DATA.length * IMMERSION_PHASES.length;
  const currentStep = (immersionState.currentLessonIdx * IMMERSION_PHASES.length) + getImmersionPhaseIndex(immersionState.currentPhase);
  const pct = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  const progressBar = document.getElementById("immersionProgressBar");
  if (progressBar) progressBar.style.width = `${pct}%`;

  // Update stats in bottom bar
  const wordsEl = document.getElementById("immersionStatWords");
  if (wordsEl) wordsEl.textContent = String(immersionState.sessionStats.wordsSeenCount);

  const quizEl = document.getElementById("immersionStatQuiz");
  if (quizEl) {
    const totalQ = immersionState.sessionStats.questionsAnswered;
    const correctQ = immersionState.sessionStats.correctAnswers;
    const rate = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 100;
    quizEl.textContent = `${correctQ}/${totalQ} (${rate}%)`;
  }
}

async function executeCurrentImmersionPhase(token) {
  if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

  const lesson = LESSONS_DATA[immersionState.currentLessonIdx];
  if (!lesson) return;

  updateImmersionHeaderAndStatsUI();
  const speed = immersionState.speed || 1.0;
  const contentArea = document.getElementById("immersionContentArea");
  if (!contentArea) return;

  // -----------------------------------------------------------------
  // 1. VOCABULARY PHASE (3s per word + speech)
  // -----------------------------------------------------------------
  if (immersionState.currentPhase === 'vocab') {
    const words = lesson.vocab;
    if (immersionState.currentItemIdx >= words.length) {
      immersionState.currentPhase = 'phrase';
      immersionState.currentItemIdx = 0;
      executeCurrentImmersionPhase(token);
      return;
    }

    const word = words[immersionState.currentItemIdx];
    immersionState.sessionStats.wordsSeenCount++;
    updateImmersionHeaderAndStatsUI();

    let colorCls = "text-amber-400";
    const lower = word.de.toLowerCase();
    if (lower.startsWith("der ")) colorCls = "text-sky-400";
    else if (lower.startsWith("die ")) colorCls = "text-rose-400";
    else if (lower.startsWith("das ")) colorCls = "text-emerald-400";

    contentArea.innerHTML = `
      <div class="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Word ${immersionState.currentItemIdx + 1} of ${words.length} • ${escapeHtml(word.cat)}
          </span>
        </div>

        <div class="font-serif-book font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-tight ${colorCls} drop-shadow-lg">
          ${escapeHtml(word.de)}
        </div>

        <div class="font-arabic font-bold text-3xl sm:text-4xl text-amber-100/90 pt-2" dir="rtl">
          ${escapeHtml(word.ar)}
        </div>

        <div class="text-xl sm:text-2xl font-medium text-slate-300">
          ${escapeHtml(word.en)}
        </div>

        <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-400 max-w-xl">
          ${escapeHtml(word.grammar)}
        </div>
      </div>
    `;

    // Audio sequence
    await speakTextPromise(word.de, "de-DE", 0.90 * speed);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    await sleepImmersion(Math.round(800 / speed), token);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    await speakTextPromise(word.en, "en-US", 1.0 * speed);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    await sleepImmersion(Math.round(1800 / speed), token);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    immersionState.currentItemIdx++;
    executeCurrentImmersionPhase(token);
  }

  // -----------------------------------------------------------------
  // 2. USEFUL PHRASE PHASE (8s)
  // -----------------------------------------------------------------
  else if (immersionState.currentPhase === 'phrase') {
    const phrase = lesson.usefulPhrase;
    contentArea.innerHTML = `
      <div class="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-orange-500/20 text-orange-300 border border-orange-500/30">
          🗣️ Essential Conversational Phrase
        </span>

        <div class="font-serif-book font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-snug drop-shadow">
          ${escapeHtml(phrase.de)}
        </div>

        <div class="font-arabic font-bold text-2xl sm:text-3xl text-amber-200" dir="rtl">
          ${escapeHtml(phrase.ar)}
        </div>

        <div class="text-lg sm:text-2xl text-slate-300 font-medium">
          ${escapeHtml(phrase.en)}
        </div>

        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 max-w-xl italic">
          💡 ${escapeHtml(phrase.why)}
        </div>
      </div>
    `;

    await speakTextPromise(phrase.de, "de-DE", 0.90 * speed);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    await sleepImmersion(Math.round(1000 / speed), token);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    await speakTextPromise(phrase.en, "en-US", 1.0 * speed);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    await sleepImmersion(Math.round(3000 / speed), token);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    immersionState.currentPhase = 'grammar';
    immersionState.currentItemIdx = 0;
    executeCurrentImmersionPhase(token);
  }

  // -----------------------------------------------------------------
  // 3. GRAMMAR PHASE (12s)
  // -----------------------------------------------------------------
  else if (immersionState.currentPhase === 'grammar') {
    const grammar = lesson.grammar;
    const rowsHtml = grammar.tableRows.map((r, rIdx) => {
      const cells = r.map((c, cIdx) => `<td class="px-3 py-2 border-b border-slate-800 text-xs sm:text-sm ${cIdx === r.length - 1 ? 'font-arabic text-right text-amber-300' : 'text-slate-200'}">${escapeHtml(c)}</td>`).join("");
      return `<tr class="${rIdx % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-900/20'}">${cells}</tr>`;
    }).join("");

    contentArea.innerHTML = `
      <div class="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-6 space-y-5 animate-fade-in">
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30">
          🧠 Grammar Rule &amp; Patterns
        </span>

        <h3 class="font-serif-book font-bold text-2xl sm:text-4xl text-white text-center">
          ${escapeHtml(grammar.title)}
        </h3>

        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl text-center">
          ${escapeHtml(grammar.summary)}
        </div>

        <div class="w-full max-w-2xl rounded-xl border border-slate-800 overflow-hidden bg-slate-950/80 shadow-lg">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-900 text-xs text-amber-400 font-bold border-b border-slate-800">
                ${grammar.tableHeaders.map(th => `<th class="px-3 py-2">${escapeHtml(th)}</th>`).join("")}
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      </div>
    `;

    await speakTextPromise(grammar.title, "en-US", 1.0 * speed);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    await speakTextPromise(grammar.summary, "en-US", 1.05 * speed);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    await sleepImmersion(Math.round(4000 / speed), token);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    immersionState.currentPhase = 'examples';
    immersionState.currentItemIdx = 0;
    executeCurrentImmersionPhase(token);
  }

  // -----------------------------------------------------------------
  // 4. EXAMPLES PHASE (5s per example)
  // -----------------------------------------------------------------
  else if (immersionState.currentPhase === 'examples') {
    const examples = lesson.grammar.examples;
    if (immersionState.currentItemIdx >= examples.length) {
      immersionState.currentPhase = 'quiz';
      immersionState.currentItemIdx = 0;
      executeCurrentImmersionPhase(token);
      return;
    }

    const ex = examples[immersionState.currentItemIdx];
    contentArea.innerHTML = `
      <div class="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-500/30">
          🔊 Example ${immersionState.currentItemIdx + 1} of ${examples.length}
        </span>

        <div class="font-serif-book font-bold text-3xl sm:text-5xl text-white tracking-tight leading-snug drop-shadow">
          ${escapeHtml(ex.de)}
        </div>

        <div class="font-arabic font-bold text-2xl sm:text-3xl text-amber-200" dir="rtl">
          ${escapeHtml(ex.ar)}
        </div>

        <div class="text-xl sm:text-2xl text-slate-300 font-medium">
          ${escapeHtml(ex.en)}
        </div>
      </div>
    `;

    await speakTextPromise(ex.de, "de-DE", 0.90 * speed);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    await sleepImmersion(Math.round(800 / speed), token);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    await speakTextPromise(ex.en, "en-US", 1.0 * speed);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    await sleepImmersion(Math.round(2000 / speed), token);
    if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

    immersionState.currentItemIdx++;
    executeCurrentImmersionPhase(token);
  }

  // -----------------------------------------------------------------
  // 5. MINI-QUIZ PHASE (Interactive, tap answer, auto-advance)
  // -----------------------------------------------------------------
  else if (immersionState.currentPhase === 'quiz') {
    const quizzes = lesson.quiz;
    if (immersionState.currentItemIdx >= quizzes.length) {
      immersionState.currentPhase = 'passage';
      immersionState.currentItemIdx = 0;
      immersionState.passageSubPhase = 'text';
      executeCurrentImmersionPhase(token);
      return;
    }

    const q = quizzes[immersionState.currentItemIdx];
    immersionState.quizWaitingUser = true;

    contentArea.innerHTML = `
      <div class="flex flex-col items-center justify-center max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fade-in w-full">
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30">
            ✍️ Quick Quiz: Question ${immersionState.currentItemIdx + 1} of ${quizzes.length}
          </span>
        </div>

        <div class="font-semibold text-xl sm:text-2xl text-white text-center leading-snug">
          ${escapeHtml(q.q)}
        </div>

        <div id="immersionQuizOptionsGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl pt-2">
          ${q.options.map((opt, optIdx) => `
            <button type="button" data-immersion-opt="${escapeAttr(opt)}" class="immersion-quiz-opt-btn text-left p-4 rounded-2xl bg-slate-900 border border-slate-700 hover:border-amber-400 hover:bg-slate-800 text-white font-medium text-base sm:text-lg transition flex items-center justify-between gap-3 shadow-md">
              <span><strong>${String.fromCharCode(65 + optIdx)}.</strong> ${escapeHtml(opt)}</span>
              <span class="immersion-opt-feedback"></span>
            </button>
          `).join("")}
        </div>

        <div id="immersionQuizFeedbackBox" class="w-full max-w-2xl hidden p-3 rounded-xl text-center text-sm font-semibold transition"></div>
      </div>
    `;

    // Attach tap listeners to the options
    document.querySelectorAll(".immersion-quiz-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!immersionState.quizWaitingUser) return;
        handleImmersionQuizAnswer(btn.dataset.immersionOpt, q, token);
      });
    });

    // Speak question prompt softly
    if (q.speakDe) {
      speakTextPromise(q.speakDe, "de-DE", 0.95 * speed);
    }
  }

  // -----------------------------------------------------------------
  // 6. PASSAGE PHASE (Story text audio + MCQs)
  // -----------------------------------------------------------------
  else if (immersionState.currentPhase === 'passage') {
    const passage = lesson.readingPassage;
    if (!passage) {
      advanceImmersionLesson();
      return;
    }

    if (immersionState.passageSubPhase === 'text') {
      contentArea.innerHTML = `
        <div class="flex flex-col items-center justify-center max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
          <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            📚 Story Listening
          </span>

          <h3 class="font-serif-book font-bold text-2xl sm:text-4xl text-amber-300 text-center">
            ${escapeHtml(passage.title)}
          </h3>

          <div class="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-base sm:text-lg text-slate-100 leading-relaxed font-serif-book shadow-xl">
            ${escapeHtml(passage.text)}
          </div>

          <div class="text-xs sm:text-sm text-slate-400 text-center italic">
            Listening to German narration...
          </div>
        </div>
      `;

      await speakTextPromise(passage.text, "de-DE", 0.88 * speed);
      if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

      await sleepImmersion(Math.round(2500 / speed), token);
      if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

      // Switch to passage MCQs
      immersionState.passageSubPhase = 'mcq';
      immersionState.passageMcqIdx = 0;
      executeCurrentImmersionPhase(token);
    } else {
      // Passage MCQ sub-phase
      const mcqs = passage.mcqQuestions || [];
      if (immersionState.passageMcqIdx >= mcqs.length) {
        // Lesson Complete!
        renderImmersionLessonCompleteNotice(lesson);
        return;
      }

      const q = mcqs[immersionState.passageMcqIdx];
      immersionState.quizWaitingUser = true;

      contentArea.innerHTML = `
        <div class="flex flex-col items-center justify-center max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fade-in w-full">
          <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            📚 Comprehension: Question ${immersionState.passageMcqIdx + 1} of ${mcqs.length}
          </span>

          <div class="font-semibold text-xl sm:text-2xl text-white text-center leading-snug">
            ${escapeHtml(q.q)}
          </div>

          <div id="immersionPassageOptionsGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl pt-2">
            ${q.options.map((opt, optIdx) => `
              <button type="button" data-immersion-read-opt="${escapeAttr(opt)}" class="immersion-read-opt-btn text-left p-4 rounded-2xl bg-slate-900 border border-slate-700 hover:border-emerald-400 hover:bg-slate-800 text-white font-medium text-base sm:text-lg transition flex items-center justify-between gap-3 shadow-md">
                <span><strong>${String.fromCharCode(65 + optIdx)}.</strong> ${escapeHtml(opt)}</span>
                <span class="immersion-opt-feedback"></span>
              </button>
            `).join("")}
          </div>

          <div id="immersionPassageFeedbackBox" class="w-full max-w-2xl hidden p-3 rounded-xl text-center text-sm font-semibold transition"></div>
        </div>
      `;

      document.querySelectorAll(".immersion-read-opt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          if (!immersionState.quizWaitingUser) return;
          handleImmersionPassageAnswer(btn.dataset.immersionReadOpt, q, token);
        });
      });
    }
  }
}

async function handleImmersionQuizAnswer(selectedOpt, qItem, token) {
  immersionState.quizWaitingUser = false;
  immersionState.sessionStats.questionsAnswered++;

  const isCorrect = selectedOpt === qItem.answer;
  if (isCorrect) {
    immersionState.sessionStats.correctAnswers++;
  }

  // Update progress store as well
  const lesson = LESSONS_DATA[immersionState.currentLessonIdx];
  appState.progress.quizAnswers[`${lesson.day}_${immersionState.currentItemIdx}`] = selectedOpt;
  appState.progress.quizChecked[`${lesson.day}_${immersionState.currentItemIdx}`] = true;
  saveProgressToStorage();

  // Style buttons
  document.querySelectorAll(".immersion-quiz-opt-btn").forEach(btn => {
    btn.disabled = true;
    const opt = btn.dataset.immersionOpt;
    if (opt === qItem.answer) {
      btn.className = "text-left p-4 rounded-2xl bg-emerald-950 border-2 border-emerald-500 text-emerald-200 font-bold text-base sm:text-lg flex items-center justify-between gap-3 shadow-lg";
      const fb = btn.querySelector(".immersion-opt-feedback");
      if (fb) fb.textContent = "✓ Correct";
    } else if (opt === selectedOpt && !isCorrect) {
      btn.className = "text-left p-4 rounded-2xl bg-rose-950 border-2 border-rose-500 text-rose-200 line-through text-base sm:text-lg flex items-center justify-between gap-3 opacity-80";
      const fb = btn.querySelector(".immersion-opt-feedback");
      if (fb) fb.textContent = "✕";
    } else {
      btn.className = "text-left p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-500 text-base sm:text-lg flex items-center justify-between gap-3 opacity-40";
    }
  });

  const fbBox = document.getElementById("immersionQuizFeedbackBox");
  if (fbBox) {
    fbBox.textContent = isCorrect ? "✓ Excellent! Moving to next question..." : `✕ Correct answer: „${qItem.answer}“`;
    fbBox.className = `w-full max-w-2xl p-3 rounded-xl text-center text-sm font-semibold transition ${isCorrect ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40' : 'bg-rose-950/60 text-rose-300 border border-rose-500/40'}`;
    fbBox.classList.remove("hidden");
  }

  updateImmersionHeaderAndStatsUI();

  // Wait 2s then advance
  const speed = immersionState.speed || 1.0;
  await sleepImmersion(Math.round(2000 / speed), token);
  if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

  immersionState.currentItemIdx++;
  executeCurrentImmersionPhase(token);
}

async function handleImmersionPassageAnswer(selectedOpt, qItem, token) {
  immersionState.quizWaitingUser = false;
  immersionState.sessionStats.questionsAnswered++;

  const isCorrect = selectedOpt === qItem.answer;
  if (isCorrect) {
    immersionState.sessionStats.correctAnswers++;
  }

  const lesson = LESSONS_DATA[immersionState.currentLessonIdx];
  appState.progress.passageMcqAnswers[`${lesson.day}_${immersionState.passageMcqIdx}`] = selectedOpt;
  saveProgressToStorage();

  document.querySelectorAll(".immersion-read-opt-btn").forEach(btn => {
    btn.disabled = true;
    const opt = btn.dataset.immersionReadOpt;
    if (opt === qItem.answer) {
      btn.className = "text-left p-4 rounded-2xl bg-emerald-950 border-2 border-emerald-500 text-emerald-200 font-bold text-base sm:text-lg flex items-center justify-between gap-3 shadow-lg";
      const fb = btn.querySelector(".immersion-opt-feedback");
      if (fb) fb.textContent = "✓";
    } else if (opt === selectedOpt && !isCorrect) {
      btn.className = "text-left p-4 rounded-2xl bg-rose-950 border-2 border-rose-500 text-rose-200 line-through text-base sm:text-lg flex items-center justify-between gap-3 opacity-80";
      const fb = btn.querySelector(".immersion-opt-feedback");
      if (fb) fb.textContent = "✕";
    } else {
      btn.className = "text-left p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-500 text-base sm:text-lg flex items-center justify-between gap-3 opacity-40";
    }
  });

  const fbBox = document.getElementById("immersionPassageFeedbackBox");
  if (fbBox) {
    fbBox.textContent = isCorrect ? "✓ Well done!" : `✕ Note: ${qItem.explain}`;
    fbBox.className = `w-full max-w-2xl p-3 rounded-xl text-center text-sm font-semibold transition ${isCorrect ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40' : 'bg-rose-950/60 text-rose-300 border border-rose-500/40'}`;
    fbBox.classList.remove("hidden");
  }

  updateImmersionHeaderAndStatsUI();

  const speed = immersionState.speed || 1.0;
  await sleepImmersion(Math.round(2000 / speed), token);
  if (!immersionState.isActive || token !== immersionState.runToken || immersionState.isPaused) return;

  immersionState.passageMcqIdx++;
  executeCurrentImmersionPhase(token);
}

function renderImmersionLessonCompleteNotice(lesson) {
  const contentArea = document.getElementById("immersionContentArea");
  if (!contentArea) return;

  appState.progress.completedDays[lesson.day] = true;
  saveProgressToStorage();

  contentArea.innerHTML = `
    <div class="flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4 py-12 space-y-6 animate-fade-in">
      <div class="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-4xl flex items-center justify-center shadow-lg">
        ✓
      </div>
      <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        Day ${lesson.day} Complete!
      </h2>
      <p class="text-slate-300 text-base sm:text-lg">
        ${escapeHtml(lesson.title)}
      </p>
      <p class="text-xs text-amber-400 font-semibold">
        Auto-advancing to next lesson in 3 seconds...
      </p>
    </div>
  `;

  setTimeout(() => {
    if (immersionState.isActive) {
      advanceImmersionLesson();
    }
  }, 3000);
}

function renderImmersionCompleteScreen() {
  const contentArea = document.getElementById("immersionContentArea");
  if (!contentArea) return;

  const totalTimeSec = Math.round((Date.now() - (immersionState.sessionStats.startTime || Date.now())) / 1000);
  const minutes = Math.floor(totalTimeSec / 60);
  const seconds = totalTimeSec % 60;
  const timeStr = `${minutes}m ${seconds}s`;

  const totalQ = immersionState.sessionStats.questionsAnswered;
  const correctQ = immersionState.sessionStats.correctAnswers;
  const accuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 100;

  contentArea.innerHTML = `
    <div class="flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div class="text-5xl">🏆</div>
      <h2 class="text-3xl sm:text-5xl font-bold text-white tracking-tight">
        Immersion Session Complete!
      </h2>
      <p class="text-slate-300 text-base sm:text-lg">
        Congratulations! You completed all 20 lessons on auto-pilot.
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-4">
        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div class="text-2xl font-bold text-amber-400">${immersionState.sessionStats.wordsSeenCount}</div>
          <div class="text-xs text-slate-400 mt-1">Words Studied</div>
        </div>
        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div class="text-2xl font-bold text-sky-400">${totalQ}</div>
          <div class="text-xs text-slate-400 mt-1">Quizzes Taken</div>
        </div>
        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div class="text-2xl font-bold text-emerald-400">${accuracy}%</div>
          <div class="text-xs text-slate-400 mt-1">Accuracy</div>
        </div>
        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div class="text-2xl font-bold text-purple-400">${timeStr}</div>
          <div class="text-xs text-slate-400 mt-1">Time Elapsed</div>
        </div>
      </div>

      <div class="flex items-center gap-3 pt-6 flex-wrap justify-center">
        <button type="button" id="immersionRestartBtn" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow flex items-center gap-2 transition">
          🚀 Start From Beginning
        </button>
        <button type="button" id="immersionExitBtn" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition">
          ✕ Return to Main App
        </button>
      </div>
    </div>
  `;

  document.getElementById("immersionRestartBtn")?.addEventListener("click", () => {
    startImmersionMode(true);
  });
  document.getElementById("immersionExitBtn")?.addEventListener("click", () => {
    exitImmersionMode();
  });
}

window.openImmersionLaunchDialog = openImmersionLaunchDialog;
window.startImmersionMode = startImmersionMode;
window.exitImmersionMode = exitImmersionMode;
window.toggleImmersionPause = toggleImmersionPause;
window.skipImmersionPhase = skipImmersionPhase;
window.prevImmersionPhase = prevImmersionPhase;
window.setImmersionSpeed = setImmersionSpeed;
