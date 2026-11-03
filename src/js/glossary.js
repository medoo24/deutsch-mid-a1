// =========================================================================
// TRILINGUAL GLOSSARY (DE / EN / AR) DATA BUILDER
// =========================================================================

const ALL_GLOSSARY = [];

function buildMasterGlossary() {
  const p1 = (typeof DATA_PART1 !== 'undefined' && Array.isArray(DATA_PART1)) ? DATA_PART1 : [];
  const p2 = (typeof DATA_PART2 !== 'undefined' && Array.isArray(DATA_PART2)) ? DATA_PART2 : [];
  const combined = [...p1, ...p2];

  ALL_GLOSSARY.length = 0;
  combined.forEach(lesson => {
    lesson.vocab.forEach((v, vIdx) => {
      ALL_GLOSSARY.push({
        id: `d${lesson.day}_v${vIdx}`,
        day: lesson.day,
        de: v.de,
        en: v.en,
        ar: v.ar,
        cat: v.cat,
        grammar: v.grammar
      });
    });
    ALL_GLOSSARY.push({
      id: `d${lesson.day}_phrase`,
      day: lesson.day,
      de: lesson.usefulPhrase.de,
      en: lesson.usefulPhrase.en,
      ar: lesson.usefulPhrase.ar,
      cat: "phrase",
      grammar: lesson.usefulPhrase.why
    });
    lesson.grammar.examples.forEach((ex, exIdx) => {
      ALL_GLOSSARY.push({
        id: `d${lesson.day}_ex${exIdx}`,
        day: lesson.day,
        de: ex.de,
        en: ex.en,
        ar: ex.ar,
        cat: "phrase",
        grammar: `${lesson.grammar.title} Example`
      });
    });
  });
  return ALL_GLOSSARY;
}

buildMasterGlossary();
window.ALL_GLOSSARY = ALL_GLOSSARY;
window.buildMasterGlossary = buildMasterGlossary;
