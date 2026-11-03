// =========================================================================
// RENDER-GLOSSARY.JS - MASTER TRILINGUAL GLOSSARY (DE / EN / AR)
// =========================================================================

function renderGlossary() {
  const container = document.getElementById("glossaryListContainer");
  const badge = document.getElementById("glossaryCountBadge");
  const filterBtn = document.getElementById("filterCurrentLessonGlossaryBtn");
  const lesson = LESSONS_DATA[appState.currentLessonIdx];
  const currentDay = lesson ? lesson.day : 1;

  if (filterBtn) {
    filterBtn.textContent = appState.glossaryOnlyCurrentLesson ? `Day ${currentDay} Only` : `All ${LESSONS_DATA.length} Days`;
    filterBtn.className = appState.glossaryOnlyCurrentLesson
      ? "px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-bold transition"
      : "px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-amber-300 border border-slate-700 transition";
  }

  const q = (appState.glossarySearchQuery || "").trim().toLowerCase();

  const filtered = ALL_GLOSSARY.filter(item => {
    if (appState.glossaryOnlyCurrentLesson && item.day !== currentDay) return false;
    if (appState.glossaryFilterCat === "starred") {
      if (!appState.progress.starredGlossaryIds[item.id]) return false;
    } else if (appState.glossaryFilterCat !== "all" && item.cat !== appState.glossaryFilterCat) {
      return false;
    }
    if (q) {
      const hay = `${item.de} ${item.en} ${item.ar} ${item.grammar || ''}`.toLowerCase();
      return hay.includes(q);
    }
    return true;
  });

  if (badge) badge.textContent = String(filtered.length);
  if (!container) return;

  if (!filtered.length) {
    container.innerHTML = `
      <div class="text-center py-10 px-4 text-xs text-slate-400">
        No glossary entries match your search. Try switching to "All ${LESSONS_DATA.length} Days" or clearing filters.
      </div>
    `;
    return;
  }

  const catLabels = {
    noun: { label: "Noun / Article", cls: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
    verb: { label: "Verb / Form", cls: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    phrase: { label: "Phrase / Adverb", cls: "bg-amber-500/20 text-amber-300 border-amber-500/30" }
  };

  container.innerHTML = filtered.map(item => {
    const isStarred = !!appState.progress.starredGlossaryIds[item.id];
    const isTarget = appState.highlightedGlossaryId === item.id;
    const catCfg = catLabels[item.cat] || catLabels.phrase;

    return `
      <div id="glossary_item_${item.id}" class="p-3 rounded-xl border ${
        isTarget
          ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-400'
          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
      } space-y-1.5 transition">
        <div class="flex items-start justify-between gap-1.5">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${catCfg.cls}">${catCfg.label}</span>
            <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Day ${item.day}</span>
          </div>
          <div class="flex items-center gap-1">
            <button type="button" data-action="toggle-star" data-id="${item.id}" class="w-5 h-5 rounded flex items-center justify-center text-xs transition ${isStarred ? 'text-amber-400' : 'text-slate-500 hover:text-amber-400'}" title="Star word">
              ${isStarred ? '★' : '☆'}
            </button>
            <button type="button" data-action="speak-de" data-text="${escapeAttr(item.de)}" class="w-6 h-6 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center text-xs transition" title="Listen in German">
              🔊
            </button>
            <button type="button" data-action="speak-en" data-text="${escapeAttr(item.en)}" class="w-6 h-6 rounded bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-300 flex items-center justify-center text-xs transition" title="Listen in English">
              🇬🇧
            </button>
            <button type="button" data-action="speak-ar" data-text="${escapeAttr(item.ar)}" class="w-6 h-6 rounded bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 flex items-center justify-center text-xs transition" title="Listen in Arabic">
              🇸🇦
            </button>
            <button type="button" data-action="open-youglish" data-text="${escapeAttr(item.de)}" class="px-1.5 py-0.5 rounded bg-indigo-600/50 hover:bg-indigo-600 text-white text-[10px] font-semibold transition" title="Pronounce with YouGlish">
              🎬
            </button>
          </div>
        </div>

        <div class="font-bold text-sm text-white">${escapeHtml(item.de)}</div>

        <div class="text-xs text-slate-300 flex items-center justify-between gap-2">
          <span>${escapeHtml(item.en)}</span>
          <span class="font-arabic font-semibold text-amber-200 text-right">${escapeHtml(item.ar)}</span>
        </div>

        ${item.grammar ? `
          <div class="text-[11px] text-slate-400 pt-0.5 border-t border-slate-800/80">
            ${escapeHtml(item.grammar)}
          </div>
        ` : ''}
      </div>
    `;
  }).join("");
}

function focusGlossaryEntry(id) {
  appState.highlightedGlossaryId = id;
  const match = ALL_GLOSSARY.find(g => g.id === id);
  if (match) {
    appState.glossaryOnlyCurrentLesson = false;
    appState.glossaryFilterCat = "all";
    appState.glossarySearchQuery = "";
    const searchInput = document.getElementById("glossarySearchInput");
    if (searchInput) searchInput.value = "";
  }
  renderGlossary();

  const sidebar = document.getElementById("glossarySidebar");
  if (sidebar && sidebar.classList.contains("hidden")) {
    sidebar.classList.remove("hidden");
  }

  setTimeout(() => {
    const el = document.getElementById(`glossary_item_${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 100);
}

window.renderGlossary = renderGlossary;
window.focusGlossaryEntry = focusGlossaryEntry;
