// =========================================================================
// RENDER-TV.JS - TV MODE AUTOMATIC AUDIO & SLIDESHOW PLAYBACK LOOP
// =========================================================================
function buildTvSlidesForLesson(lessonIdx) {
      const lesson = LESSONS_DATA[lessonIdx];
      const slides = [];

      // 1. Vocabulary slides (NO pron field)
      lesson.vocab.forEach((v, idx) => {
        slides.push({
          type: "Vocabulary",
          day: lesson.day,
          de: v.de,
          en: v.en,
          ar: v.ar,
          note: v.grammar,
          glossaryId: `d${lesson.day}_v${idx}`
        });
      });

      // 2. Useful Phrase slide
      slides.push({
        type: "Useful Phrase",
        day: lesson.day,
        de: lesson.usefulPhrase.de,
        en: lesson.usefulPhrase.en,
        ar: lesson.usefulPhrase.ar,
        note: lesson.usefulPhrase.why,
        glossaryId: `d${lesson.day}_phrase`
      });

      // 3. Grammar Example slides
      lesson.grammar.examples.forEach((ex, idx) => {
        slides.push({
          type: `Grammar Example ${idx + 1}`,
          day: lesson.day,
          de: ex.de,
          en: ex.en,
          ar: ex.ar,
          note: lesson.grammar.title,
          glossaryId: null
        });
      });

      return slides;
    }

    function renderTvSlideUI() {
      tvState.slides = buildTvSlidesForLesson(appState.currentLessonIdx);
      if (tvState.currentSlideIdx >= tvState.slides.length) {
        tvState.currentSlideIdx = 0;
      }
      const slide = tvState.slides[tvState.currentSlideIdx];
      if (!slide) return;

      const wholeTarget = parseInt(document.getElementById("tvWholeRepeatSelect")?.value || "1", 10);
      const lessonTarget = parseInt(document.getElementById("tvLessonRepeatSelect")?.value || "2", 10);
      const itemTarget = parseInt(document.getElementById("tvItemRepeatSelect")?.value || "2", 10);

      document.getElementById("tvCardLessonBadge").textContent = `Day ${slide.day} • ${slide.type}`;
      document.getElementById("tvCardIndexBadge").textContent = `Slide ${tvState.currentSlideIdx + 1} of ${tvState.slides.length}`;
      document.getElementById("tvMainGerman").textContent = slide.de;
      document.getElementById("tvMainEnglish").textContent = slide.en;
      document.getElementById("tvMainArabic").textContent = slide.ar;
      document.getElementById("tvExtraNote").textContent = slide.note;

      const wholeLabel = wholeTarget >= 99 ? "∞" : wholeTarget;
      document.getElementById("tvLoopCounterText").textContent =
        `All Lessons: ${tvState.currentWholeRepeat} / ${wholeLabel} • Lesson Repeat: ${tvState.currentLessonRepeat} / ${lessonTarget} • Item Repeat: ${tvState.currentItemRepeat} / ${itemTarget}`;

      const pct = Math.round(((tvState.currentSlideIdx + 1) / tvState.slides.length) * 100);
      document.getElementById("tvSlideProgressBar").style.width = `${pct}%`;

      const pillsContainer = document.getElementById("tvSlidePills");
      if (pillsContainer) {
        pillsContainer.innerHTML = tvState.slides.map((s, idx) => {
          const active = idx === tvState.currentSlideIdx;
          return `<button type="button" data-action="tv-jump-slide" data-idx="${idx}" class="px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition ${
            active
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }">${idx + 1}. ${escapeHtml(s.de.slice(0, 18))}</button>`;
        }).join("");
      }
    }

    function sleepMs(ms) {
      return new Promise(r => setTimeout(r, ms));
    }

    async function runTvPlaybackLoop(token) {
      const statusBadge = document.getElementById("tvStatusBadge");
      const langBadge = document.getElementById("tvActiveLangBadge");

      while (tvState.isPlaying && token === tvState.runToken) {
        tvState.slides = buildTvSlidesForLesson(appState.currentLessonIdx);
        renderTvSlideUI();

        const slide = tvState.slides[tvState.currentSlideIdx];
        if (!slide) break;

        const wholeTarget = parseInt(document.getElementById("tvWholeRepeatSelect")?.value || "1", 10);
        const lessonTarget = parseInt(document.getElementById("tvLessonRepeatSelect")?.value || "2", 10);
        const itemTarget = parseInt(document.getElementById("tvItemRepeatSelect")?.value || "2", 10);
        const langPattern = document.getElementById("tvLangPatternSelect")?.value || "de-en";
        const speed = parseFloat(document.getElementById("tvSpeedSelect")?.value || "0.9");
        const autoAdvanceAll = document.getElementById("tvAutoAdvanceLessons")?.checked ?? true;

        for (let ir = tvState.currentItemRepeat; ir <= itemTarget; ir++) {
          if (!tvState.isPlaying || token !== tvState.runToken) return;
          tvState.currentItemRepeat = ir;
          renderTvSlideUI();

          if (statusBadge) {
            statusBadge.textContent = `Speaking (${ir}/${itemTarget})`;
            statusBadge.className = "text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
          }

          if (langPattern === "de-en") {
            if (langBadge) langBadge.textContent = "🇩🇪 Speaking Deutsch...";
            await speakTextPromise(slide.de, "de-DE", speed);
            if (!tvState.isPlaying || token !== tvState.runToken) return;
            await sleepMs(350);
            if (langBadge) langBadge.textContent = "🇬🇧 Speaking English...";
            await speakTextPromise(slide.en, "en-US", Math.min(speed + 0.05, 1.15));
          } else if (langPattern === "en-de") {
            if (langBadge) langBadge.textContent = "🇬🇧 Speaking English...";
            await speakTextPromise(slide.en, "en-US", Math.min(speed + 0.05, 1.15));
            if (!tvState.isPlaying || token !== tvState.runToken) return;
            await sleepMs(350);
            if (langBadge) langBadge.textContent = "🇩🇪 Speaking Deutsch...";
            await speakTextPromise(slide.de, "de-DE", speed);
          } else if (langPattern === "de-ar") {
            if (langBadge) langBadge.textContent = "🇩🇪 Speaking Deutsch...";
            await speakTextPromise(slide.de, "de-DE", speed);
            if (!tvState.isPlaying || token !== tvState.runToken) return;
            await sleepMs(350);
            if (langBadge) langBadge.textContent = "🇸🇦 Speaking العربية...";
            await speakTextPromise(slide.ar, "ar-SA", speed);
          } else if (langPattern === "ar-de") {
            if (langBadge) langBadge.textContent = "🇸🇦 Speaking العربية...";
            await speakTextPromise(slide.ar, "ar-SA", speed);
            if (!tvState.isPlaying || token !== tvState.runToken) return;
            await sleepMs(350);
            if (langBadge) langBadge.textContent = "🇩🇪 Speaking Deutsch...";
            await speakTextPromise(slide.de, "de-DE", speed);
          } else if (langPattern === "de-en-ar") {
            if (langBadge) langBadge.textContent = "🇩🇪 Deutsch...";
            await speakTextPromise(slide.de, "de-DE", speed);
            if (!tvState.isPlaying || token !== tvState.runToken) return;
            await sleepMs(300);
            if (langBadge) langBadge.textContent = "🇬🇧 English...";
            await speakTextPromise(slide.en, "en-US", Math.min(speed + 0.05, 1.15));
            if (!tvState.isPlaying || token !== tvState.runToken) return;
            await sleepMs(300);
            if (langBadge) langBadge.textContent = "🇸🇦 العربية...";
            await speakTextPromise(slide.ar, "ar-SA", speed);
          } else if (langPattern === "de-en-de") {
            if (langBadge) langBadge.textContent = "🇩🇪 Deutsch (1st listen)...";
            await speakTextPromise(slide.de, "de-DE", speed);
            if (!tvState.isPlaying || token !== tvState.runToken) return;
            await sleepMs(300);
            if (langBadge) langBadge.textContent = "🇬🇧 English Meaning...";
            await speakTextPromise(slide.en, "en-US", Math.min(speed + 0.05, 1.15));
            if (!tvState.isPlaying || token !== tvState.runToken) return;
            await sleepMs(350);
            if (langBadge) langBadge.textContent = "🇩🇪 Deutsch (Shadow)...";
            await speakTextPromise(slide.de, "de-DE", speed);
          } else if (langPattern === "ar-only") {
            if (langBadge) langBadge.textContent = "🇸🇦 Speaking العربية...";
            await speakTextPromise(slide.ar, "ar-SA", speed);
          } else {
            if (langBadge) langBadge.textContent = "🇩🇪 Speaking Deutsch...";
            await speakTextPromise(slide.de, "de-DE", speed);
          }

          if (!tvState.isPlaying || token !== tvState.runToken) return;
          await sleepMs(650);
        }

        // Advance slide
        tvState.currentItemRepeat = 1;
        if (tvState.currentSlideIdx < tvState.slides.length - 1) {
          tvState.currentSlideIdx++;
          renderTvSlideUI();
        } else {
          // Finished lesson
          const dayNum = LESSONS_DATA[appState.currentLessonIdx].day;
          appState.progress.tvLoopsCompleted = (appState.progress.tvLoopsCompleted || 0) + 1;
          appState.progress.lessonTvLoops[dayNum] = (appState.progress.lessonTvLoops[dayNum] || 0) + 1;
          saveProgressToStorage();

          if (tvState.currentLessonRepeat < lessonTarget) {
            tvState.currentLessonRepeat++;
            tvState.currentSlideIdx = 0;
            showToast(`Repeating Day ${dayNum} (Loop ${tvState.currentLessonRepeat} of ${lessonTarget})`);
            renderTvSlideUI();
          } else {
            tvState.currentLessonRepeat = 1;
            tvState.currentSlideIdx = 0;

            if (autoAdvanceAll) {
              if (appState.currentLessonIdx < LESSONS_DATA.length - 1) {
                appState.currentLessonIdx++;
                renderBookSpread("next");
                renderTvSlideUI();
                showToast(`Advancing to Day ${LESSONS_DATA[appState.currentLessonIdx].day}`);
              } else {
                if (tvState.currentWholeRepeat < wholeTarget) {
                  tvState.currentWholeRepeat++;
                  appState.currentLessonIdx = 0;
                  renderBookSpread("next");
                  renderTvSlideUI();
                  showToast(`Whole Course Loop ${tvState.currentWholeRepeat} of ${wholeTarget}`);
                } else {
                  pauseTvMode("Course Completed!");
                  showToast("🎉 Congratulations! You completed all lessons in TV Mode!");
                  return;
                }
              }
            } else {
              pauseTvMode("Finished Lesson");
              return;
            }
          }
        }
      }
    }

    function startTvMode() {
      tvState.isPlaying = true;
      tvState.runToken = Math.random();
      document.getElementById("tvPlayPauseLabel").textContent = "Pause TV Mode";
      document.getElementById("tvPlayPauseIcon").textContent = "⏸";
      document.getElementById("tvPlayPauseBtn").className = "px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg transition";
      const badge = document.getElementById("tvStatusBadge");
      if (badge) {
        badge.textContent = "Playing";
        badge.className = "text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
      }
      runTvPlaybackLoop(tvState.runToken);
    }

    function pauseTvMode(statusLabel = "Paused") {
      tvState.isPlaying = false;
      tvState.runToken = Math.random();
      stopAllSpeech();
      const label = document.getElementById("tvPlayPauseLabel");
      const icon = document.getElementById("tvPlayPauseIcon");
      const btn = document.getElementById("tvPlayPauseBtn");
      if (label) label.textContent = "Resume TV Mode";
      if (icon) icon.textContent = "▶";
      if (btn) btn.className = "px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg transition";
      const badge = document.getElementById("tvStatusBadge");
      if (badge) {
        badge.textContent = statusLabel;
        badge.className = "text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700";
      }
    }

    // =========================================================================
    // 6. TEST & SOLVE (MCQ) MODE
    // =========================================================================
