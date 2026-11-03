// =========================================================================
// RENDER-TRANSLATION.JS - TRANSLATION TEST CHALLENGE & SIMILARITY CHECK
// =========================================================================
// =========================================================================
    function getFilteredTranslationList() {
      const lesson = LESSONS_DATA[appState.currentLessonIdx];
      const all = lesson.translateQuiz || [];
      if (appState.transFilterDir === "all") {
        return all.map((item, originalIdx) => ({ ...item, originalIdx }));
      }
      return all
        .map((item, originalIdx) => ({ ...item, originalIdx }))
        .filter(item => item.type === appState.transFilterDir);
    }

    function calculateTextSimilarity(strA, strB) {
      const clean = s => s.toLowerCase().replace(/[\.\,\?\!\;"'\„\“\(\)\-]/g, "").trim();
      const a = clean(strA);
      const b = clean(strB);
      if (a === b) return 100;
      if (!a || !b) return 0;

      // Word match ratio
      const wordsA = a.split(/\s+/);
      const wordsB = b.split(/\s+/);
      let matchCount = 0;
      wordsA.forEach(w => {
        if (wordsB.includes(w)) matchCount++;
      });
      const wordScore = (matchCount / Math.max(wordsA.length, wordsB.length)) * 100;
      return Math.round(wordScore);
    }

    function renderTranslationStage() {
      const lesson = LESSONS_DATA[appState.currentLessonIdx];
      document.getElementById("transLessonBadge").textContent = `Day ${lesson.day} of 10`;
      document.getElementById("transLessonTitle").textContent = `Day ${lesson.day}: ${lesson.title} • Translation`;

      const list = getFilteredTranslationList();
      if (appState.transCurrentQIdx >= list.length) {
        appState.transCurrentQIdx = 0;
      }
      const curItem = list[appState.transCurrentQIdx];

      // Count solved in current lesson
      let solvedCount = 0;
      (lesson.translateQuiz || []).forEach((_, idx) => {
        if (appState.progress.translationScores[`${lesson.day}_${idx}`]) {
          solvedCount++;
        }
      });
      document.getElementById("transScoreText").textContent = `${solvedCount} / ${lesson.translateQuiz.length} Solved`;

      const stage = document.getElementById("transQuestionStage");
      const counter = document.getElementById("transQuestionCounter");
      if (counter) {
        counter.textContent = list.length ? `Item ${appState.transCurrentQIdx + 1} of ${list.length}` : "0 of 0";
      }

      if (!curItem) {
        stage.innerHTML = `<div class="text-center text-slate-400 py-12">No translation items available for this filter.</div>`;
        return;
      }

      const storeKey = `${lesson.day}_${curItem.originalIdx}`;
      const savedUserText = appState.progress.translationAttempts[storeKey] || "";
      const isSolved = !!appState.progress.translationScores[storeKey];
      const isRevealed = !!appState.progress.translationRevealed[storeKey];

      const dirLabels = {
        de_to_ar: { label: "🇩🇪 Deutsch ➔ 🇸🇦 العربية", promptLang: "de-DE", answerLang: "ar-SA", targetIsAr: true },
        ar_to_de: { label: "🇸🇦 العربية ➔ 🇩🇪 Deutsch", promptLang: "ar-SA", answerLang: "de-DE", targetIsAr: false },
        en_to_de: { label: "🇬🇧 English ➔ 🇩🇪 Deutsch", promptLang: "en-US", answerLang: "de-DE", targetIsAr: false },
        de_to_en: { label: "🇩🇪 Deutsch ➔ 🇬🇧 English", promptLang: "de-DE", answerLang: "en-US", targetIsAr: false }
      };
      const meta = dirLabels[curItem.type] || dirLabels.de_to_ar;

      let feedbackBoxHtml = "";
      if (isSolved || isRevealed) {
        const sim = calculateTextSimilarity(savedUserText, curItem.answer);
        const isMatch = sim >= 80;
        feedbackBoxHtml = `
          <div class="mt-4 p-4 rounded-xl border ${isMatch ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-slate-950 border-amber-500/40 text-amber-200'} space-y-2">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="font-bold text-xs uppercase tracking-wider">${isMatch ? '✓ Accurate Translation!' : (isRevealed ? '💡 Model Answer Revealed' : '⚡ Almost there!')}</span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">Similarity: ${sim}%</span>
            </div>
            <div>
              <div class="text-xs text-slate-400">Model Answer:</div>
              <div class="text-base sm:text-lg font-bold text-white ${meta.targetIsAr ? 'font-arabic' : ''}">${escapeHtml(curItem.answer)}</div>
            </div>
            <div class="flex items-center gap-2 pt-1">
              <button type="button" data-action="speak-model-answer" data-text="${escapeAttr(curItem.answer)}" data-lang="${meta.answerLang}" class="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition">
                🔊 Listen to Model Answer
              </button>
            </div>
          </div>
        `;
      }

      stage.innerHTML = `
        <div class="max-w-3xl mx-auto w-full bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-4 shadow-xl">
          <!-- Direction Header -->
          <div class="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">${meta.label}</span>
            <button type="button" data-action="speak-prompt" data-text="${escapeAttr(curItem.prompt)}" data-lang="${meta.promptLang}" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-1">
              🔊 Listen to Prompt
            </button>
          </div>

          <!-- Prompt Sentence -->
          <div class="space-y-1">
            <div class="text-xs uppercase tracking-wider text-slate-400 font-semibold">Translate this sentence:</div>
            <div class="text-xl sm:text-2xl font-bold text-white ${curItem.type.startsWith('ar') ? 'font-arabic text-right' : ''}">
              „${escapeHtml(curItem.prompt)}“
            </div>
          </div>

          <!-- Input Area -->
          <div class="space-y-2">
            <label for="transInputTextarea" class="block text-xs font-semibold text-slate-300">Your Translation:</label>
            <textarea id="transInputTextarea" rows="3" ${meta.targetIsAr ? 'dir="rtl"' : ''} class="w-full bg-slate-900 text-white text-sm rounded-xl p-3.5 border border-slate-700 focus:outline-none focus:border-sky-500 ${meta.targetIsAr ? 'font-arabic text-base' : ''}" placeholder="${meta.targetIsAr ? 'اكتب الترجمة بالعربية هنا...' : 'Type your translation here...'}">${escapeHtml(savedUserText)}</textarea>

            <!-- German Special Character Chips helper -->
            ${!meta.targetIsAr ? `
              <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span class="text-[11px] text-slate-400">German Keys:</span>
                ${["ä","ö","ü","ß","Ä","Ö","Ü"].map(ch => `
                  <button type="button" data-action="insert-key" data-key="${ch}" class="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded border border-slate-700">${ch}</button>
                `).join("")}
              </div>
            ` : ''}
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center justify-between gap-2.5 pt-2">
            <div class="flex items-center gap-2">
              <button id="checkTransAnswerBtn" type="button" class="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow">
                ✓ Check Answer
              </button>
              <button id="revealTransAnswerBtn" type="button" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition">
                👁️ Reveal Model Answer
              </button>
            </div>
            <span class="text-xs text-slate-400">${isSolved ? '✅ Marked Solved' : 'Press Check Answer to evaluate'}</span>
          </div>

          ${feedbackBoxHtml}
        </div>
      `;

      // Event listener for Check and Reveal
      const checkBtn = document.getElementById("checkTransAnswerBtn");
      const revealBtn = document.getElementById("revealTransAnswerBtn");
      const textarea = document.getElementById("transInputTextarea");

      if (checkBtn && textarea) {
        checkBtn.addEventListener("click", () => {
          const val = textarea.value.trim();
          if (!val) {
            showToast("Please type your translation first!");
            return;
          }
          appState.progress.translationAttempts[storeKey] = val;
          const sim = calculateTextSimilarity(val, curItem.answer);
          if (sim >= 75) {
            appState.progress.translationScores[storeKey] = true;
            showToast(`Great! ${sim}% match`);
          } else {
            appState.progress.translationRevealed[storeKey] = true;
          }
          saveProgressToStorage();
          renderTranslationStage();
        });
      }

      if (revealBtn) {
        revealBtn.addEventListener("click", () => {
          appState.progress.translationRevealed[storeKey] = true;
          saveProgressToStorage();
          renderTranslationStage();
        });
      }
    }

    // =========================================================================
    // 8. READING PASSAGE MODE
    // =========================================================================
