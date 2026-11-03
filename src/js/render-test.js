// =========================================================================
// RENDER-TEST.JS - MULTIPLE CHOICE QUIZ MODE RENDERING & LOGIC
// =========================================================================

function renderQuiz() {
  const lesson = LESSONS_DATA[appState.currentLessonIdx];
  if (!lesson) return;

  const badgeEl = document.getElementById("quizLessonBadge");
  if (badgeEl) badgeEl.textContent = `Day ${lesson.day} of ${LESSONS_DATA.length}`;

  const titleEl = document.getElementById("quizLessonTitle");
  if (titleEl) titleEl.textContent = `Day ${lesson.day}: ${lesson.title}`;

  let correctCount = 0;
  const container = document.getElementById("quizQuestionsContainer");
  if (!container) return;

  container.innerHTML = (lesson.quiz || []).map((qItem, qIdx) => {
    const userAns = appState.progress.quizAnswers[`${lesson.day}_${qIdx}`];
    const isChecked = !!appState.progress.quizChecked[`${lesson.day}_${qIdx}`];
    const isCorrect = userAns === qItem.answer;
    if (isCorrect) correctCount++;

    const optionsHtml = (qItem.options || []).map((opt, optIdx) => {
      const isSelected = userAns === opt;
      let btnStyle = "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200";
      if (isSelected) {
        btnStyle = "bg-sky-500/20 border-sky-500/60 text-sky-200 font-semibold ring-1 ring-sky-500/40";
      }
      if (isChecked) {
        if (opt === qItem.answer) {
          btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500/50";
        } else if (isSelected && !isCorrect) {
          btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200 line-through opacity-80";
        }
      }

      return `
        <button type="button" data-action="select-quiz-opt" data-qidx="${qIdx}" data-opt="${escapeAttr(opt)}" class="text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between gap-2 ${btnStyle}">
          <span><strong>${String.fromCharCode(65 + optIdx)}.</strong> ${escapeHtml(opt)}</span>
          ${isChecked ? (opt === qItem.answer ? '<span class="text-emerald-400 font-bold">✓</span>' : (isSelected ? '<span class="text-rose-400 font-bold">✕</span>' : '')) : ''}
        </button>
      `;
    }).join("");

    return `
      <div class="bg-slate-950/90 border ${isChecked ? (isCorrect ? 'border-emerald-500/50' : 'border-rose-500/50') : 'border-slate-800'} rounded-xl p-4 space-y-3">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div class="flex items-start gap-2.5">
            <span class="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">${qIdx + 1}</span>
            <p class="text-sm sm:text-base font-semibold text-white">${escapeHtml(qItem.q)}</p>
          </div>
          <button type="button" data-action="speak-de" data-text="${escapeAttr(qItem.speakDe || qItem.answer)}" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition shrink-0">
            🔊 Listen
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
          ${optionsHtml}
        </div>

        ${isChecked ? `
          <div class="ml-8 p-3 rounded-xl text-xs ${isCorrect ? 'bg-emerald-950/50 border border-emerald-700/50 text-emerald-200' : 'bg-rose-950/50 border border-rose-700/50 text-rose-200'} flex flex-wrap items-center justify-between gap-2">
            <div>
              <strong>${isCorrect ? '✓ Correct!' : `✕ Incorrect — Correct answer: „${escapeHtml(qItem.answer)}“`}</strong>
              <p class="mt-0.5 text-slate-300">${escapeHtml(qItem.explain)}</p>
            </div>
            <button type="button" data-action="open-youglish" data-text="${escapeAttr(qItem.speakDe || qItem.answer)}" class="px-2.5 py-1 rounded-lg bg-indigo-600/40 hover:bg-indigo-600 text-white text-[11px] font-semibold transition">
              🎬 YouGlish
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }).join("");

  const scoreEl = document.getElementById("quizScoreText");
  if (scoreEl) scoreEl.textContent = `${correctCount} / ${(lesson.quiz || []).length}`;

  if (correctCount === (lesson.quiz || []).length && !appState.progress.completedDays[lesson.day]) {
    appState.progress.completedDays[lesson.day] = true;
    saveProgressToStorage();
    if (typeof updateNavigationStateUI === "function") updateNavigationStateUI();
    showToast(`🎉 Day ${lesson.day} Mastered & Marked Complete!`);
  }
}

window.renderQuiz = renderQuiz;
