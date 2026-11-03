// =========================================================================
// RENDER-BOOK.JS - DUAL-PAGE BOOK SPREAD RENDERING & PAGE DOTS
// =========================================================================

function renderPageDots() {
  const dotsContainer = document.getElementById("pageDotsContainer");
  if (!dotsContainer) return;

  dotsContainer.innerHTML = LESSONS_DATA.map((l, idx) => {
    const isCurrent = idx === appState.currentLessonIdx;
    const isCompleted = !!appState.progress.completedDays[l.day];
    let dotCls = "w-2.5 h-2.5 rounded-full transition cursor-pointer ";
    if (isCurrent) {
      dotCls += "bg-amber-400 ring-2 ring-amber-400/50 scale-125";
    } else if (isCompleted) {
      dotCls += "bg-emerald-500/80 hover:bg-emerald-400";
    } else {
      dotCls += "bg-slate-700 hover:bg-slate-500";
    }
    return `<button type="button" data-action="dot-jump" data-idx="${idx}" class="${dotCls}" title="Day ${l.day}: ${escapeAttr(l.title)}"></button>`;
  }).join("");
}

function updateNavigationStateUI() {
  const lesson = LESSONS_DATA[appState.currentLessonIdx];
  if (!lesson) return;

  const selectEl = document.getElementById("lessonSelect");
  if (selectEl && selectEl.value !== String(appState.currentLessonIdx)) {
    selectEl.value = String(appState.currentLessonIdx);
  }

  const prevBtn = document.getElementById("prevPageBtn");
  const nextBtn = document.getElementById("nextPageBtn");
  const bottomPrev = document.getElementById("bottomPrevBtn");
  const bottomNext = document.getElementById("bottomNextBtn");
  if (prevBtn) prevBtn.disabled = appState.currentLessonIdx === 0;
  if (nextBtn) nextBtn.disabled = appState.currentLessonIdx === LESSONS_DATA.length - 1;
  if (bottomPrev) bottomPrev.disabled = appState.currentLessonIdx === 0;
  if (bottomNext) bottomNext.disabled = appState.currentLessonIdx === LESSONS_DATA.length - 1;

  const bottomPageNum = document.getElementById("bottomPageNumber");
  if (bottomPageNum) {
    bottomPageNum.textContent = `Day ${lesson.day} of ${LESSONS_DATA.length} (Pages ${(lesson.day * 2) - 1}–${lesson.day * 2})`;
  }

  const isDone = !!appState.progress.completedDays[lesson.day];
  const markIcon = document.getElementById("markCompleteIcon");
  const markLabel = document.getElementById("markCompleteLabel");
  const markBtn = document.getElementById("markCompleteBtn");
  if (markIcon && markLabel && markBtn) {
    markIcon.textContent = isDone ? "✅" : "⭕";
    markLabel.textContent = isDone ? "Marked Complete" : "Mark as Complete";
    markBtn.className = isDone
      ? "px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 flex items-center gap-1.5 transition"
      : "px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 flex items-center gap-1.5 transition";
  }

  renderPageDots();
}

function renderBookSpread(direction = null) {
  const spreadEl = document.getElementById("bookSpreadContainer");
  const leftPageEl = document.getElementById("bookLeftPage") || document.getElementById("bookPageLeft");
  const rightPageEl = document.getElementById("bookRightPage") || document.getElementById("bookPageRight");
  if (!leftPageEl || !rightPageEl) return;

  const lesson = LESSONS_DATA[appState.currentLessonIdx];
  if (!lesson) return;

  if (direction && spreadEl) {
    spreadEl.classList.remove("flip-next", "flip-prev");
    void spreadEl.offsetWidth; // trigger reflow
    spreadEl.classList.add(direction === "next" ? "flip-next" : "flip-prev");
    setTimeout(() => {
      if (spreadEl) spreadEl.classList.remove("flip-next", "flip-prev");
    }, 480);
  }

  // -------------------------------------------------------------
  // LEFT PAGE: VOCABULARY & USEFUL PHRASE (NO PRONUNCIATION BAR)
  // -------------------------------------------------------------
  const vocabCardsHtml = lesson.vocab.map((v, vIdx) => {
    const isStarred = !!appState.progress.starredGlossaryIds[`d${lesson.day}_v${vIdx}`];
    return `
      <div class="p-3.5 rounded-xl bg-amber-50/70 border border-amber-900/15 shadow-sm hover:shadow transition space-y-1.5 group">
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-[11px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getArticleBadgeColor(v.de)}">${escapeHtml(v.cat)}</span>
            <span class="font-serif-book font-bold text-lg sm:text-xl text-slate-900 leading-snug tracking-tight">${escapeHtml(v.de)}</span>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <button type="button" data-action="toggle-star" data-id="d${lesson.day}_v${vIdx}" class="w-6 h-6 rounded flex items-center justify-center text-xs transition ${isStarred ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}" title="Bookmark this word">
              ${isStarred ? '★' : '☆'}
            </button>
            <button type="button" data-action="speak-de" data-text="${escapeAttr(v.de)}" class="w-7 h-7 rounded-lg bg-amber-200/60 hover:bg-amber-300 text-amber-950 flex items-center justify-center text-xs transition" title="Listen in German">
              🔊
            </button>
            <button type="button" data-action="speak-en" data-text="${escapeAttr(v.en)}" class="w-7 h-7 rounded-lg bg-sky-200/60 hover:bg-sky-300 text-sky-950 flex items-center justify-center text-xs transition" title="Listen in English">
              🇬🇧
            </button>
            <button type="button" data-action="speak-ar" data-text="${escapeAttr(v.ar)}" class="w-7 h-7 rounded-lg bg-emerald-200/60 hover:bg-emerald-300 text-emerald-950 flex items-center justify-center text-xs transition" title="Listen in Arabic">
              🇸🇦
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 text-xs">
          <div class="text-slate-700 font-medium flex items-center gap-1">
            <span class="text-slate-400">EN:</span>
            <span>${escapeHtml(v.en)}</span>
          </div>
          <div class="font-arabic font-semibold text-slate-800 text-sm text-right flex items-center justify-end gap-1">
            <span>${escapeHtml(v.ar)}</span>
            <span class="text-slate-400 text-xs">:AR</span>
          </div>
        </div>

        <div class="text-[11px] text-amber-950/80 bg-amber-100/50 px-2 py-1 rounded border border-amber-900/10 flex items-center justify-between gap-1 flex-wrap">
          <span>${escapeHtml(v.grammar)}</span>
          <button type="button" data-action="focus-glossary" data-id="d${lesson.day}_v${vIdx}" class="text-[10px] text-amber-800 hover:text-amber-950 underline font-semibold">Glossary →</button>
        </div>
      </div>
    `;
  }).join("");

  const phraseStarred = !!appState.progress.starredGlossaryIds[`d${lesson.day}_phrase`];

  leftPageEl.innerHTML = `
    <div class="border-b border-amber-900/15 pb-3 mb-4 flex items-center justify-between gap-2 flex-wrap">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold px-2 py-0.5 rounded bg-amber-600 text-white shadow-sm uppercase tracking-wider">Day ${lesson.day}</span>
          <h2 class="font-serif-book font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">${escapeHtml(lesson.title)}</h2>
        </div>
        <p class="font-arabic font-bold text-base text-amber-900/90 mt-1">${escapeHtml(lesson.arabicTitle)}</p>
      </div>
      <button type="button" data-action="listen-page-left" class="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-semibold border border-amber-900/15 transition flex items-center gap-1 shadow-sm">
        <span>🔊</span> <span>Read Left Page</span>
      </button>
    </div>

    <div class="space-y-3.5">
      <div class="flex items-center justify-between text-xs font-bold text-amber-950 uppercase tracking-wider">
        <span>📖 Key Vocabulary (${lesson.vocab.length} Words)</span>
        <span class="text-[11px] text-slate-500 font-normal">German • English • Arabic</span>
      </div>

      <div class="space-y-2.5">
        ${vocabCardsHtml}
      </div>

      <!-- Useful Phrase Box -->
      <div class="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-100/80 to-orange-100/80 border border-amber-900/20 shadow-sm space-y-2">
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-1.5 text-xs font-bold text-amber-950 uppercase tracking-wider">
            <span>🗣️ Useful Daily Phrase</span>
          </div>
          <div class="flex items-center gap-1">
            <button type="button" data-action="toggle-star" data-id="d${lesson.day}_phrase" class="w-6 h-6 rounded flex items-center justify-center text-xs transition ${phraseStarred ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}">
              ${phraseStarred ? '★' : '☆'}
            </button>
            <button type="button" data-action="speak-de" data-text="${escapeAttr(lesson.usefulPhrase.de)}" class="w-7 h-7 rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-950 flex items-center justify-center text-xs transition">
              🔊
            </button>
            <button type="button" data-action="speak-en" data-text="${escapeAttr(lesson.usefulPhrase.en)}" class="w-7 h-7 rounded-lg bg-sky-200/80 hover:bg-sky-300 text-sky-950 flex items-center justify-center text-xs transition">
              🇬🇧
            </button>
            <button type="button" data-action="speak-ar" data-text="${escapeAttr(lesson.usefulPhrase.ar)}" class="w-7 h-7 rounded-lg bg-emerald-200/80 hover:bg-emerald-300 text-emerald-950 flex items-center justify-center text-xs transition">
              🇸🇦
            </button>
            <button type="button" data-action="open-youglish" data-text="${escapeAttr(lesson.usefulPhrase.de)}" class="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold transition">
              🎬 YouGlish
            </button>
          </div>
        </div>
        <p class="font-serif-book font-bold text-lg sm:text-xl text-slate-900 tracking-tight">${escapeHtml(lesson.usefulPhrase.de)}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs pt-1 border-t border-amber-900/10">
          <div class="text-slate-700 font-medium">EN: ${escapeHtml(lesson.usefulPhrase.en)}</div>
          <div class="font-arabic font-semibold text-slate-800 text-sm text-right">AR: ${escapeHtml(lesson.usefulPhrase.ar)}</div>
        </div>
        <p class="text-[11px] text-amber-950/90 italic mt-1 bg-white/60 p-2 rounded border border-amber-900/10">
          <strong>Why it matters:</strong> ${escapeHtml(lesson.usefulPhrase.why)}
        </p>
      </div>
    </div>

    <div class="mt-6 pt-3 border-t border-amber-900/15 flex items-center justify-between text-xs text-slate-500">
      <span>Vocabulary &amp; Conversational Phrase</span>
      <span>Page ${(lesson.day * 2) - 1}</span>
    </div>
  `;

  // -------------------------------------------------------------
  // RIGHT PAGE: GRAMMAR SUMMARY, TABLE & EXAMPLE SENTENCES
  // -------------------------------------------------------------
  const grammarTableHeadersHtml = lesson.grammar.tableHeaders.map(th =>
    `<th class="px-3 py-2 text-left font-bold text-amber-950 border-b border-amber-900/20 text-xs bg-amber-100/60">${escapeHtml(th)}</th>`
  ).join("");

  const grammarTableRowsHtml = lesson.grammar.tableRows.map((row, rIdx) => {
    const cellsHtml = row.map((cell, cIdx) => {
      const isArabicCol = cIdx === row.length - 1;
      return `<td class="px-3 py-2 border-b border-amber-900/10 text-xs text-slate-800 ${isArabicCol ? 'font-arabic text-sm text-right font-medium' : ''}">${escapeHtml(cell)}</td>`;
    }).join("");
    return `<tr class="${rIdx % 2 === 0 ? 'bg-amber-50/40' : 'bg-transparent'} hover:bg-amber-100/40 transition">${cellsHtml}</tr>`;
  }).join("");

  const examplesHtml = lesson.grammar.examples.map((ex, exIdx) => {
    return `
      <div class="p-3 rounded-xl bg-amber-50/60 border border-amber-900/15 space-y-1 hover:shadow-sm transition">
        <div class="flex items-start justify-between gap-2">
          <p class="font-serif-book font-bold text-base text-slate-900 leading-snug">${escapeHtml(ex.de)}</p>
          <div class="flex items-center gap-1 shrink-0">
            <button type="button" data-action="speak-de" data-text="${escapeAttr(ex.de)}" class="w-6 h-6 rounded bg-amber-200/70 hover:bg-amber-300 text-amber-950 flex items-center justify-center text-xs transition" title="Listen in German">
              🔊
            </button>
            <button type="button" data-action="speak-en" data-text="${escapeAttr(ex.en)}" class="w-6 h-6 rounded bg-sky-200/70 hover:bg-sky-300 text-sky-950 flex items-center justify-center text-xs transition" title="Listen in English">
              🇬🇧
            </button>
            <button type="button" data-action="speak-ar" data-text="${escapeAttr(ex.ar)}" class="w-6 h-6 rounded bg-emerald-200/70 hover:bg-emerald-300 text-emerald-950 flex items-center justify-center text-xs transition" title="Listen in Arabic">
              🇸🇦
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs pt-1 text-slate-700">
          <div><span class="text-slate-400">EN:</span> ${escapeHtml(ex.en)}</div>
          <div class="font-arabic font-semibold text-slate-800 text-sm text-right"><span class="text-slate-400 text-xs">:AR</span> ${escapeHtml(ex.ar)}</div>
        </div>
      </div>
    `;
  }).join("");

  rightPageEl.innerHTML = `
    <div class="border-b border-amber-900/15 pb-3 mb-4 flex items-center justify-between gap-2 flex-wrap">
      <div>
        <span class="text-xs font-bold text-amber-950 uppercase tracking-wider">Grammar Focus • Day ${lesson.day}</span>
        <h3 class="font-serif-book font-bold text-xl text-slate-900 tracking-tight">${escapeHtml(lesson.grammar.title)}</h3>
      </div>
      <button type="button" data-action="listen-page-right" class="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-semibold border border-amber-900/15 transition flex items-center gap-1 shadow-sm">
        <span>🔊</span> <span>Read Right Page</span>
      </button>
    </div>

    <div class="space-y-4">
      <!-- Grammar Summary Note -->
      <div class="p-3.5 rounded-xl bg-amber-100/60 border border-amber-900/20 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1.5 shadow-sm">
        <div class="flex items-center gap-1 text-amber-950 font-bold uppercase tracking-wider text-xs">
          <span>🧠 Core Rule &amp; Pattern</span>
        </div>
        <p>${escapeHtml(lesson.grammar.summary)}</p>
      </div>

      <!-- Grammar Table -->
      <div class="rounded-xl border border-amber-900/20 overflow-hidden shadow-sm bg-white/50">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr>${grammarTableHeadersHtml}</tr>
            </thead>
            <tbody>
              ${grammarTableRowsHtml}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Real Life Examples -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs font-bold text-amber-950 uppercase tracking-wider">
          <span>💬 Practical Examples (${lesson.grammar.examples.length})</span>
          <span class="text-[11px] text-slate-500 font-normal">Trilingual Audio</span>
        </div>
        <div class="space-y-2">
          ${examplesHtml}
        </div>
      </div>
    </div>

    <div class="mt-6 pt-3 border-t border-amber-900/15 flex items-center justify-between text-xs text-slate-500">
      <span>Grammar &amp; Examples</span>
      <span>Page ${lesson.day * 2}</span>
    </div>
  `;

  updateNavigationStateUI();
}

window.renderBookSpread = renderBookSpread;
window.renderPageDots = renderPageDots;
window.updateNavigationStateUI = updateNavigationStateUI;
