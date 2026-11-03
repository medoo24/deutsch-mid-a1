// =========================================================================
// RENDER-READING.JS - READING PASSAGE COMPREHENSION MODE RENDERING & LOGIC
// =========================================================================

function renderReadingPassage() {
  const lesson = LESSONS_DATA[appState.currentLessonIdx];
  if (!lesson) return;
  const passage = lesson.readingPassage;
  if (!passage) return;

  const badgeEl = document.getElementById("readLessonBadge");
  if (badgeEl) badgeEl.textContent = `Day ${lesson.day} of ${LESSONS_DATA.length}`;

  const titleEl = document.getElementById("readStoryTitle");
  if (titleEl) titleEl.textContent = passage.title;

  const germanEl = document.getElementById("readGermanParagraph");
  if (germanEl) germanEl.textContent = passage.text;

  // English box
  const enBox = document.getElementById("readEnglishBox");
  const enText = document.getElementById("readEnglishText");
  if (enText) enText.textContent = passage.translation;
  if (enBox) enBox.classList.toggle("hidden", !appState.readShowEnglish);

  // Arabic box
  const arBox = document.getElementById("readArabicBox");
  const arText = document.getElementById("readArabicText");
  if (arText) arText.textContent = passage.arabicTranslation;
  if (arBox) arBox.classList.toggle("hidden", !appState.readShowArabic);

  const hideBtn = document.getElementById("hideTransBtn");
  if (hideBtn) {
    hideBtn.classList.toggle("hidden", !appState.readShowEnglish && !appState.readShowArabic);
  }

  // Calculate comprehension score
  let mcqScore = 0;
  (passage.mcqQuestions || []).forEach((q, qIdx) => {
    if (appState.progress.passageMcqAnswers[`${lesson.day}_${qIdx}`] === q.answer) {
      mcqScore++;
    }
  });
  let writtenScore = 0;
  (passage.writtenQuestions || []).forEach((_, wIdx) => {
    if (appState.progress.passageWrittenSelfCheck[`${lesson.day}_${wIdx}`]) {
      writtenScore++;
    }
  });

  const scoreBadge = document.getElementById("readScoreBadge");
  if (scoreBadge) {
    scoreBadge.textContent = `Score: ${mcqScore + writtenScore} / ${(passage.mcqQuestions || []).length + (passage.writtenQuestions || []).length}`;
  }

  // 1. Render MCQs
  const mcqContainer = document.getElementById("readMcqContainer");
  if (mcqContainer) {
    mcqContainer.innerHTML = (passage.mcqQuestions || []).map((qItem, qIdx) => {
      const userChoice = appState.progress.passageMcqAnswers[`${lesson.day}_${qIdx}`];
      const isAnswered = !!userChoice;
      const isCorrect = userChoice === qItem.answer;

      const optionsHtml = (qItem.options || []).map((opt, oIdx) => {
        const isSelected = userChoice === opt;
        let btnCls = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
        if (isSelected) {
          btnCls = isCorrect
            ? "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500/50"
            : "bg-rose-950/70 border-rose-500 text-rose-200 font-bold ring-1 ring-rose-500/50";
        } else if (isAnswered && opt === qItem.answer) {
          btnCls = "bg-emerald-950/40 border-emerald-600/60 text-emerald-300 font-semibold";
        }

        return `
          <button type="button" data-action="select-read-mcq" data-qidx="${qIdx}" data-opt="${escapeAttr(opt)}" class="text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between gap-2 ${btnCls}">
            <span><strong>${String.fromCharCode(65 + oIdx)}.</strong> ${escapeHtml(opt)}</span>
            ${isSelected ? (isCorrect ? '✓' : '✕') : ''}
          </button>
        `;
      }).join("");

      return `
        <div class="bg-slate-950/80 border ${isAnswered ? (isCorrect ? 'border-emerald-500/40' : 'border-rose-500/40') : 'border-slate-800'} rounded-xl p-4 space-y-3">
          <div class="flex items-start gap-2.5">
            <span class="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">${qIdx + 1}</span>
            <p class="text-sm font-semibold text-white">${escapeHtml(qItem.q)}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
            ${optionsHtml}
          </div>
          ${isAnswered ? `
            <div class="ml-8 p-2.5 rounded-lg text-xs ${isCorrect ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40' : 'bg-rose-950/40 text-rose-300 border border-rose-800/40'}">
              <strong>${isCorrect ? '✓ Correct!' : `✕ Note:`}</strong> ${escapeHtml(qItem.explain)}
            </div>
          ` : ''}
        </div>
      `;
    }).join("");
  }

  // 2. Render Written Questions
  const writtenContainer = document.getElementById("readWrittenContainer");
  if (writtenContainer) {
    writtenContainer.innerHTML = (passage.writtenQuestions || []).map((wItem, wIdx) => {
      const key = `${lesson.day}_${wIdx}`;
      const savedText = appState.progress.passageWrittenAnswers[key] || "";
      const isRevealed = !!appState.progress.passageWrittenAnswers[`${key}_revealed`];
      const isChecked = !!appState.progress.passageWrittenSelfCheck[key];

      return `
        <div class="bg-slate-950/80 border ${isChecked ? 'border-emerald-500/50' : 'border-slate-800'} rounded-xl p-4 space-y-3">
          <div class="flex items-start gap-2.5">
            <span class="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">${wIdx + 1}</span>
            <p class="text-sm font-semibold text-white">${escapeHtml(wItem.q)}</p>
          </div>

          <div class="pl-8 space-y-2">
            <textarea data-written-idx="${wIdx}" rows="2" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-xs sm:text-sm transition" placeholder="Write your answer in German or English...">${escapeHtml(savedText)}</textarea>

            <div class="flex items-center justify-between gap-2 flex-wrap pt-1">
              <button type="button" data-action="toggle-model-written" data-widx="${wIdx}" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition">
                ${isRevealed ? 'Hide Model Answer' : '👁 Show Model Answer'}
              </button>

              <label class="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                <input type="checkbox" data-action="self-check-written" data-widx="${wIdx}" ${isChecked ? 'checked' : ''} class="w-4 h-4 rounded text-emerald-600 bg-slate-800 border-slate-700 focus:ring-emerald-500">
                <span class="${isChecked ? 'text-emerald-400 font-semibold' : ''}">I answered correctly</span>
              </label>
            </div>

            ${isRevealed ? `
              <div class="mt-2 p-3 rounded-xl bg-amber-950/30 border border-amber-600/40 text-xs text-amber-200 space-y-1">
                <div><strong>German Model Answer:</strong> ${escapeHtml(wItem.modelAnswer)}</div>
                <div class="font-arabic text-sm text-right"><strong>الترجمة:</strong> ${escapeHtml(wItem.modelAnswerAr)}</div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");
  }
}

window.renderReadingPassage = renderReadingPassage;
