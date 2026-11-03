// Data Part 1: Days 1 - 10
const DATA_PART1 = [
  {
    "day": 1,
    "title": "The Accusative Case & Café Ordering",
    "subtitle": "Wen oder was? • Ordering politely with „Ich hätte gern ...“",
    "arabicTitle": "حالة المفعول به (Akkusativ) والطلب بأدب في المقهى",
    "vocab": [
      {
        "de": "der Kellner",
        "en": "the waiter",
        "ar": "النادل (الجرسون)",
        "cat": "noun",
        "grammar": "Masc. Noun • Pl: die Kellner | Nom: der Kellner | Akk: den Kellner | Dat: dem Kellner"
      },
      {
        "de": "der Kuchen",
        "en": "the cake",
        "ar": "الكعكة (الكيك)",
        "cat": "noun",
        "grammar": "Masc. Noun • Pl: die Kuchen | Nom: der Kuchen | Akk: den Kuchen | Dat: dem Kuchen"
      },
      {
        "de": "die Rechnung",
        "en": "the bill / check",
        "ar": "الفاتورة / الحساب",
        "cat": "noun",
        "grammar": "Fem. Noun • Pl: die Rechnungen | Nom/Akk: die Rechnung | Dat: der Rechnung"
      },
      {
        "de": "das Brötchen",
        "en": "the bread roll",
        "ar": "خبز صغير (كايزر / رغيف صغير)",
        "cat": "noun",
        "grammar": "Neut. Noun • Pl: die Brötchen | Nom/Akk: das Brötchen | Dat: dem Brötchen"
      },
      {
        "de": "bestellen",
        "en": "to order",
        "ar": "يطلب (طعاماً أو شراباً)",
        "cat": "verb",
        "grammar": "Reg. Verb • ich bestelle, du bestellst, er/sie/es bestellt, wir bestellen | Perfekt: hat bestellt"
      },
      {
        "de": "bezahlen",
        "en": "to pay",
        "ar": "يدفع (الحساب)",
        "cat": "verb",
        "grammar": "Reg. Verb • ich bezahle, du bezahlst, er/sie/es bezahlt, wir bezahlen | Perfekt: hat bezahlt"
      }
    ],
    "usefulPhrase": {
      "de": "Ich hätte gern einen Kaffee und ein Brötchen, bitte.",
      "en": "I would like a coffee and a bread roll, please.",
      "ar": "أودّ الحصول على قهوة وخبز صغير، من فضلك.",
      "why": "While 'Ich möchte' works fine, native speakers use 'Ich hätte gern' all the time in cafés, bakeries, and restaurants because it sounds natural and polite."
    },
    "grammar": {
      "title": "The Accusative Case (Wen oder was?)",
      "summary": "In German, the subject (the person doing the action) uses the Nominative case. When a noun is the direct object (the thing being ordered, bought, or asked), it switches to the Accusative case. Good news: ONLY masculine (der) words change in the accusative (der ➔ den, ein ➔ einen, kein ➔ keinen)!",
      "tableHeaders": [
        "Gender",
        "Nominative (Subject)",
        "Accusative (Direct Object)",
        "Arabic Note"
      ],
      "tableRows": [
        [
          "Masculine (m)",
          "der / ein / kein Kuchen",
          "den / einen / keinen Kuchen",
          "المذكر فقط يتغير (der ➔ den / einen)"
        ],
        [
          "Feminine (f)",
          "die / eine / keine Rechnung",
          "die / eine / keine Rechnung",
          "المؤنث يبقى كما هو (die / eine)"
        ],
        [
          "Neuter (n)",
          "das / ein / kein Brötchen",
          "das / ein / kein Brötchen",
          "المحايد يبقى كما هو (das / ein)"
        ]
      ],
      "examples": [
        {
          "de": "Der Kuchen ist lecker.",
          "en": "The cake is delicious. (Nominative Subject)",
          "ar": "الكعكة لذيذة. (فاعل مرفوع)"
        },
        {
          "de": "Ich bestelle den Kuchen.",
          "en": "I order the cake. (Accusative Direct Object)",
          "ar": "أنا أطلب الكعكة. (مفعول به منصوب)"
        },
        {
          "de": "Ich hätte gern einen Kaffee und ein Brötchen, bitte.",
          "en": "I would like a coffee and a bread roll, please.",
          "ar": "أود الحصول على قهوة وخبز صغير، من فضلك."
        }
      ]
    },
    "quiz": [
      {
        "q": "Fill in the blanks (ein / eine / einen): „Ich hätte gern _______ Kuchen und _______ Brötchen, bitte.“",
        "options": [
          "einen ... ein",
          "ein ... einen",
          "eine ... ein",
          "den ... das"
        ],
        "answer": "einen ... ein",
        "explain": "„der Kuchen“ is masculine so it becomes „einen“ in the Accusative; „das Brötchen“ is neuter so it stays „ein“.",
        "speakDe": "Ich hätte gern einen Kuchen und ein Brötchen, bitte."
      },
      {
        "q": "Fill in the correct article (den / die / das): „Wir bezahlen _______ Rechnung.“",
        "options": [
          "die",
          "den",
          "das",
          "der"
        ],
        "answer": "die",
        "explain": "„die Rechnung“ is feminine; feminine articles stay „die“ in the Accusative case.",
        "speakDe": "Wir bezahlen die Rechnung."
      },
      {
        "q": "Fill in the correct article (den / die / das): „Ich frage _______ Kellner.“",
        "options": [
          "den",
          "der",
          "dem",
          "das"
        ],
        "answer": "den",
        "explain": "„der Kellner“ is masculine and is the direct object of fragen, so „der“ changes to „den“.",
        "speakDe": "Ich frage den Kellner."
      },
      {
        "q": "Translate: „I am ordering a bread roll, not a cake.“ (Use kein/keinen)",
        "options": [
          "Ich bestelle ein Brötchen, keinen Kuchen.",
          "Ich bestelle einen Brötchen, kein Kuchen.",
          "Ich bezahlen ein Brötchen, keine Kuchen.",
          "Ich bestelle das Brötchen, der Kuchen."
        ],
        "answer": "Ich bestelle ein Brötchen, keinen Kuchen.",
        "explain": "Neuter „ein Brötchen“ stays unchanged; masculine „der Kuchen“ takes „keinen Kuchen“ in the accusative.",
        "speakDe": "Ich bestelle ein Brötchen, keinen Kuchen."
      }
    ],
    "translateQuiz": [
      {
        "type": "de_to_ar",
        "prompt": "Ich bestelle den Kuchen und bezahle die Rechnung.",
        "answer": "أطلب الكعكة وأدفع الفاتورة."
      },
      {
        "type": "de_to_ar",
        "prompt": "Der Kellner bringt ein Brötchen und einen Kaffee.",
        "answer": "النادل يُحضر خبزاً صغيراً وقهوة."
      },
      {
        "type": "ar_to_de",
        "prompt": "أود كعكة وخبزاً صغيراً، من فضلك.",
        "answer": "Ich hätte gern einen Kuchen und ein Brötchen, bitte."
      },
      {
        "type": "ar_to_de",
        "prompt": "نحن نسأل النادل وندفع الحساب.",
        "answer": "Wir fragen den Kellner und bezahlen die Rechnung."
      },
      {
        "type": "en_to_de",
        "prompt": "I am ordering a bread roll, not a cake.",
        "answer": "Ich bestelle ein Brötchen, keinen Kuchen."
      },
      {
        "type": "en_to_de",
        "prompt": "We would like to pay the bill, please.",
        "answer": "Wir möchten die Rechnung bezahlen, bitte."
      },
      {
        "type": "de_to_en",
        "prompt": "Ich hätte gern einen Kaffee, bitte.",
        "answer": "I would like a coffee, please."
      },
      {
        "type": "de_to_en",
        "prompt": "Der Kellner bringt die Rechnung schnell.",
        "answer": "The waiter brings the bill quickly."
      }
    ],
    "readingPassage": {
      "title": "Im gemütlichen Café",
      "text": "Lukas geht am Nachmittag in ein gemütliches Café in der Altstadt. Er setzt sich an einen freien Tisch am Fenster und ruft freundlich den Kellner. Lukas sagt: „Guten Tag! Ich hätte gern einen Kaffee und ein frisches Brötchen, bitte.“ Der Kellner notiert die Bestellung und bringt sie schnell an den Tisch. Der Kuchen in der Glasvitrine sieht ebenfalls sehr lecker aus. Nach einer Stunde ruft Lukas zufrieden: „Ich möchte bitte die Rechnung bezahlen!“",
      "translation": "Lukas goes to a cozy café in the old town in the afternoon. He sits down at a free table by the window and politely calls the waiter. Lukas says: 'Good day! I would like a coffee and a fresh bread roll, please.' The waiter takes down the order and brings it quickly to the table. The cake in the glass display also looks very delicious. After an hour, Lukas calls contentedly: 'I would like to pay the bill, please!'",
      "arabicTranslation": "يذهب لوكاس بعد الظهر إلى مقهى مريح في المدينة القديمة. يجلس إلى طاولة شاغرة بجانب النافذة وينادي النادل بلطف. يقول لوكاس: «نهارك سعيد! أود قهوة وخبزاً طازجاً، من فضلك.» يدوّن النادل الطلب ويحضره سريعاً إلى الطاولة. تبدو الكعكة في واجهة العرض الزجاجية لذيذة جداً أيضاً. بعد ساعة ينادي لوكاس راضياً: «أود دفع الفاتورة من فضلك!»",
      "mcqQuestions": [
        {
          "q": "Was bestellt Lukas beim Kellner?",
          "options": [
            "Einen Kaffee und ein frisches Brötchen",
            "Nur ein Stück Kuchen",
            "Tee mit Milch",
            "Ein Glas Wasser"
          ],
          "answer": "Einen Kaffee und ein frisches Brötchen",
          "explain": "Lukas sagt deutlich: „Ich hätte gern einen Kaffee und ein frisches Brötchen, bitte.“"
        },
        {
          "q": "Was möchte Lukas nach einer Stunde machen?",
          "options": [
            "Die Rechnung bezahlen",
            "Einen weiteren Kuchen bestellen",
            "Einen Freund anrufen",
            "Den Tisch wechseln"
          ],
          "answer": "Die Rechnung bezahlen",
          "explain": "Am Ende ruft er: „Ich möchte bitte die Rechnung bezahlen!“"
        }
      ],
      "writtenQuestions": [
        {
          "q": "Wo sitzt Lukas im Café?",
          "modelAnswer": "Lukas sitzt an einem freien Tisch am Fenster.",
          "modelAnswerAr": "يجلس لوكاس إلى طاولة شاغرة بجانب النافذة."
        },
        {
          "q": "Wie sieht der Kuchen in der Glasvitrine aus?",
          "modelAnswer": "Der Kuchen sieht sehr lecker aus.",
          "modelAnswerAr": "تبدو الكعكة في واجهة العرض لذيذة جداً."
        }
      ]
    }
  },
  {
    "day": 2,
    "title": "Modal Verb „möchten“ & Sentence Bracket",
    "subtitle": "Satzklammer • Ordering Drinks & Splitting the Bill",
    "arabicTitle": "الفعل المساعد (möchten) وإطار الجملة الألمانية",
    "vocab": [
      {
        "de": "der Apfelsaft",
        "en": "the apple juice",
        "ar": "عصير التفاح",
        "cat": "noun",
        "grammar": "Masc. Noun • Pl: die Apfelsäfte | Nom: der Apfelsaft | Akk: den Apfelsaft | Dat: dem Apfelsaft"
      },
      {
        "de": "der Tee",
        "en": "the tea",
        "ar": "الشاي",
        "cat": "noun",
        "grammar": "Masc. Noun • Pl: die Tees | Nom: der Tee | Akk: den Tee | Dat: dem Tee"
      },
      {
        "de": "das Wasser",
        "en": "the water",
        "ar": "الماء",
        "cat": "noun",
        "grammar": "Neut. Noun • Nom/Akk: das Wasser | Dat: dem Wasser"
      },
      {
        "de": "trinken",
        "en": "to drink",
        "ar": "يشرب",
        "cat": "verb",
        "grammar": "Irreg. Verb • ich trinke, du trinkst, er/sie/es trinkt, wir trinken, ihr trinkt | Perfekt: hat getrunken"
      },
      {
        "de": "essen",
        "en": "to eat",
        "ar": "يأكل",
        "cat": "verb",
        "grammar": "Irreg. Verb • ich esse, du isst, er/sie/es isst, wir essen, ihr esst | Perfekt: hat gegessen"
      },
      {
        "de": "hier essen / mitnehmen",
        "en": "eat here / take away",
        "ar": "يأكل هنا / يأخذ معه (سفري)",
        "cat": "verb",
        "grammar": "Separable Compound • ich nehme mit, du nimmst mit, er nimmt mit | Perfekt: hat mitgenommen"
      }
    ],
    "usefulPhrase": {
      "de": "Zusammen oder getrennt? — Getrennt, bitte.",
      "en": "Together or separately? — Separately, please.",
      "ar": "معاً أم كلٌّ على حدة؟ — كلٌّ على حدة، من فضلك.",
      "why": "When paying (bezahlen) at a café or restaurant in Germany, waiters almost always ask this to check if you're splitting the bill."
    },
    "grammar": {
      "title": "Modal Verb Sentence Bracket (Satzklammer) with „möchten“",
      "summary": "When you express wanting to do an action, German modal verbs create a sentence bracket: the conjugated modal verb sits in Position 2, while the main action verb moves to the VERY END in its infinitive (-en) form. Any objects sit in the middle!",
      "tableHeaders": [
        "Pronoun",
        "Conjugation of möchten",
        "Sentence Example",
        "Arabic Meaning"
      ],
      "tableRows": [
        [
          "ich",
          "möchte",
          "Ich möchte einen Tee trinken.",
          "أود أن أشرب شاياً"
        ],
        [
          "du",
          "möchtest",
          "Möchtest du den Kuchen essen?",
          "هل تود أن تأكل الكعكة؟"
        ],
        [
          "er / sie / es",
          "möchte",
          "Er möchte das Wasser trinken.",
          "هو يود أن يشرب الماء"
        ],
        [
          "wir",
          "möchten",
          "Wir möchten hier essen.",
          "نحن نود أن نأكل هنا"
        ],
        [
          "ihr",
          "möchtet",
          "Möchtet ihr bezahlen?",
          "هل تودون الدفع؟"
        ],
        [
          "sie / Sie",
          "möchten",
          "Möchten Sie mitnehmen?",
          "هل تود حضرتك أخذ الطلب سفري؟"
        ]
      ],
      "examples": [
        {
          "de": "Ich möchte einen Apfelsaft trinken.",
          "en": "I would like to drink an apple juice.",
          "ar": "أود أن أشرب عصير تفاح."
        },
        {
          "de": "Möchtest du den Kuchen essen?",
          "en": "Would you like to eat the cake?",
          "ar": "هل تود أن تأكل الكعكة؟"
        },
        {
          "de": "Wir möchten die Rechnung bezahlen.",
          "en": "We would like to pay the bill.",
          "ar": "نود أن ندفع الفاتورة."
        }
      ]
    },
    "quiz": [
      {
        "q": "Sentence Building: Put these words into a correct German sentence: (trinken / möchte / einen Apfelsaft / ich)",
        "options": [
          "Ich möchte einen Apfelsaft trinken.",
          "Ich trinken möchte einen Apfelsaft.",
          "Ich möchte trinken einen Apfelsaft.",
          "Möchte ich einen Apfelsaft trinken."
        ],
        "answer": "Ich möchte einen Apfelsaft trinken.",
        "explain": "Conjugated modal verb „möchte“ sits in Position 2, and the action verb „trinken“ goes to the very end.",
        "speakDe": "Ich möchte einen Apfelsaft trinken."
      },
      {
        "q": "Conjugation & End Verb: Fill in the correct form of möchten and put bezahlen in the right place: „Wir _______ die Rechnung _______.“",
        "options": [
          "möchten ... bezahlen",
          "möchte ... bezahlen",
          "bezahlen ... möchten",
          "möchtet ... bezahlt"
        ],
        "answer": "möchten ... bezahlen",
        "explain": "For „wir“, conjugated „möchten“ is in Position 2 and infinitive „bezahlen“ is parked at the end.",
        "speakDe": "Wir möchten die Rechnung bezahlen."
      },
      {
        "q": "Accusative + Bracket: Fill in the blanks with den, die, or das: „Er möchte _______ Wasser trinken und _______ Kuchen essen.“",
        "options": [
          "das ... den",
          "den ... das",
          "das ... der",
          "dem ... den"
        ],
        "answer": "das ... den",
        "explain": "„das Wasser“ stays neuter; masculine „der Kuchen“ becomes „den Kuchen“ in the accusative direct object.",
        "speakDe": "Er möchte das Wasser trinken und den Kuchen essen."
      },
      {
        "q": "Mini-Dialogue Translation: Translate into German: „Together or separately?“ — „Separately, please.“",
        "options": [
          "„Zusammen oder getrennt?“ – „Getrennt, bitte.“",
          "„Zusammen oder getrennt?“ – „Zusammen, bitte.“",
          "„Hier essen oder mitnehmen?“ – „Getrennt, bitte.“",
          "„Wer bezahlt?“ – „Getrennt, danke.“"
        ],
        "answer": "„Zusammen oder getrennt?“ – „Getrennt, bitte.“",
        "explain": "„Getrennt“ means separately; „zusammen“ means together.",
        "speakDe": "Zusammen oder getrennt? Getrennt, bitte."
      }
    ],
    "translateQuiz": [
      {
        "type": "de_to_ar",
        "prompt": "Möchtest du einen Tee trinken oder einen Apfelsaft?",
        "answer": "هل تود أن تشرب شاياً أم عصير تفاح؟"
      },
      {
        "type": "de_to_ar",
        "prompt": "Wir möchten das Essen hier essen und nicht mitnehmen.",
        "answer": "نود أن نأكل الطعام هنا وألا نأخذه سفري."
      },
      {
        "type": "ar_to_de",
        "prompt": "أود أن أشرب ماء، من فضلك.",
        "answer": "Ich möchte Wasser trinken, bitte."
      },
      {
        "type": "ar_to_de",
        "prompt": "معاً أم كلٌّ على حدة؟ — كلٌّ على حدة، من فضلك.",
        "answer": "Zusammen oder getrennt? — Getrennt, bitte."
      },
      {
        "type": "en_to_de",
        "prompt": "I would like to drink an apple juice.",
        "answer": "Ich möchte einen Apfelsaft trinken."
      },
      {
        "type": "en_to_de",
        "prompt": "We would like to pay the bill together.",
        "answer": "Wir möchten die Rechnung zusammen bezahlen."
      },
      {
        "type": "de_to_en",
        "prompt": "Möchtest du den Kuchen mitnehmen?",
        "answer": "Would you like to take the cake away?"
      },
      {
        "type": "de_to_en",
        "prompt": "Er möchte einen warmen Tee trinken.",
        "answer": "He would like to drink a warm tea."
      }
    ],
    "readingPassage": {
      "title": "Bestellung zur Mittagszeit",
      "text": "Sarah und Tim besuchen in ihrer Mittagspause ein italienisches Bistro. Sarah hat großen Durst und möchte ein kaltes Mineralwasser und einen Apfelsaft trinken. Tim möchte lieber einen heißen Tee und ein frisches Käsebrötchen essen. Die Kellnerin kommt an den Tisch und fragt: „Möchten Sie hier essen oder das Essen mitnehmen?“ Sarah antwortet: „Wir möchten gern hier essen.“ Am Ende fragt die Kellnerin freundlich: „Zusammen oder getrennt?“ Tim lächelt: „Zusammen, bitte!“",
      "translation": "Sarah and Tim visit an Italian bistro during their lunch break. Sarah is very thirsty and would like to drink a cold mineral water and an apple juice. Tim prefers to have a hot tea and eat a fresh cheese roll. The waitress comes to the table and asks: 'Would you like to eat here or take the food away?' Sarah answers: 'We would like to eat here.' In the end the waitress asks politely: 'Together or separately?' Tim smiles: 'Together, please!'",
      "arabicTranslation": "تزور سارة وتيم حانة إيطالية صغيرة أثناء استراحة الغداء. سارة عطشى جداً وتود شرب ماء معدني بارد وعصير تفاح. يفضل تيم تناول شاي ساخن وأكل شطيرة جبن طازجة. تأتي النادلة إلى الطاولة وتسأل: «هل تودون الأكل هنا أم أخذ الطعام سفري؟» تجيب سارة: «نود الأكل هنا.» في النهاية تسأل النادلة بلطف: «معاً أم كلٌّ على حدة؟» يبتسم تيم: «معاً، من فضلك!»",
      "mcqQuestions": [
        {
          "q": "Was möchte Sarah trinken?",
          "options": [
            "Ein kaltes Mineralwasser und einen Apfelsaft",
            "Nur einen Kaffee",
            "Heiße Schokolade",
            "Nichts"
          ],
          "answer": "Ein kaltes Mineralwasser und einen Apfelsaft",
          "explain": "Im Text steht: Sarah möchte ein kaltes Mineralwasser und einen Apfelsaft trinken."
        },
        {
          "q": "Wie bezahlt Tim am Ende?",
          "options": [
            "Zusammen",
            "Getrennt",
            "Mit Gutschein",
            "Er bezahlt gar nicht"
          ],
          "answer": "Zusammen",
          "explain": "Tim antwortet auf die Frage der Kellnerin: „Zusammen, bitte!“"
        }
      ],
      "writtenQuestions": [
        {
          "q": "Was möchte Tim essen und trinken?",
          "modelAnswer": "Tim möchte einen heißen Tee trinken und ein Käsebrötchen essen.",
          "modelAnswerAr": "يود تيم شرب شاي ساخن وأكل شطيرة جبن."
        },
        {
          "q": "Möchten Sarah und Tim im Bistro essen oder das Essen mitnehmen?",
          "modelAnswer": "Sie möchten gern hier im Bistro essen.",
          "modelAnswerAr": "يودان تناول الطعام هنا في الحانة الصغيرة."
        }
      ]
    }
  },
  {
    "day": 3,
    "title": "Modal Verb „können“ & Making Plans",
    "subtitle": "Expressing Ability & Asking „Hast du heute Zeit?“",
    "arabicTitle": "الفعل المساعد (können - يستطيع) وترتيب المواعيد",
    "vocab": [
      {
        "de": "das Café",
        "en": "the café / coffee shop",
        "ar": "المقهى (الكافيه)",
        "cat": "noun",
        "grammar": "Neut. Noun • Pl: die Cafés | Nom/Akk: das Café | Dat: dem Café (im Café)"
      },
      {
        "de": "der Termin",
        "en": "the appointment / meeting",
        "ar": "الموعد",
        "cat": "noun",
        "grammar": "Masc. Noun • Pl: die Termine | Nom: der Termin | Akk: den Termin | Dat: dem Termin"
      },
      {
        "de": "die Zeit",
        "en": "the time",
        "ar": "الوقت",
        "cat": "noun",
        "grammar": "Fem. Noun • Pl: die Zeiten | Nom/Akk: die Zeit | Dat: der Zeit"
      },
      {
        "de": "treffen",
        "en": "to meet",
        "ar": "يقابل / يلتقي",
        "cat": "verb",
        "grammar": "Irreg. Verb • ich treffe, du triffst, er/sie/es trifft, wir treffen, ihr trefft | Perfekt: hat getroffen"
      },
      {
        "de": "heute",
        "en": "today",
        "ar": "اليوم",
        "cat": "phrase",
        "grammar": "Temporal Adverb • Placed early according to TeKaMoLo"
      },
      {
        "de": "morgen",
        "en": "tomorrow",
        "ar": "غداً",
        "cat": "phrase",
        "grammar": "Temporal Adverb • morgen = tomorrow; der Morgen = morning"
      }
    ],
    "usefulPhrase": {
      "de": "Hast du heute Zeit?",
      "en": "Do you have time today?",
      "ar": "هل لديك وقت اليوم؟",
      "why": "The standard casual question to ask a friend or colleague if they're free to grab a coffee or meet up."
    },
    "grammar": {
      "title": "Modal Verb „können“ (can / to be able to)",
      "summary": "Modal verb „können“ follows the exact same sentence bracket pattern as „möchten“: conjugated form in Position 2 (or Position 1 in yes/no questions), and infinitive at the end. Notice the vowel change from ö to a in singular (ich kann, du kannst, er kann)!",
      "tableHeaders": [
        "Pronoun",
        "Conjugation of können",
        "Sentence Example",
        "Arabic Meaning"
      ],
      "tableRows": [
        [
          "ich",
          "kann",
          "Ich kann die Rechnung bezahlen.",
          "أستطيع دفع الفاتورة"
        ],
        [
          "du",
          "kannst",
          "Kannst du morgen den Kellner fragen?",
          "هل تستطيع سؤال النادل غداً؟"
        ],
        [
          "er / sie / es",
          "kann",
          "Er kann heute Freunde treffen.",
          "هو يستطيع مقابلة أصدقاء اليوم"
        ],
        [
          "wir",
          "können",
          "Wir können heute einen Kaffee trinken.",
          "نستطيع شرب قهوة اليوم"
        ],
        [
          "ihr",
          "könnt",
          "Könnt ihr im Café warten?",
          "هل تستطيعون الانتظار في المقهى؟"
        ],
        [
          "sie / Sie",
          "können",
          "Können Sie morgen kommen?",
          "هل تستطيع حضرتك المجيء غداً؟"
        ]
      ],
      "examples": [
        {
          "de": "Wir können heute Freunde im Café treffen.",
          "en": "We can meet friends in the café today.",
          "ar": "نستطيع مقابلة أصدقاء في المقهى اليوم."
        },
        {
          "de": "Kannst du den Kuchen mitnehmen?",
          "en": "Can you take the cake along?",
          "ar": "هل يمكنك أخذ الكعكة معك؟"
        },
        {
          "de": "Ich kann morgen einen Tee trinken.",
          "en": "I can drink a tea tomorrow.",
          "ar": "أستطيع شرب شاي غداً."
        }
      ]
    },
    "quiz": [
      {
        "q": "Conjugation & Bracket: Fill in the correct form of können and move treffen to the right position: „Wir _______ heute Freunde im Café _______.“",
        "options": [
          "können ... treffen",
          "kann ... treffen",
          "könnt ... trifft",
          "treffen ... können"
        ],
        "answer": "können ... treffen",
        "explain": "Conjugated modal „können“ takes Position 2 for „wir“, and infinitive „treffen“ goes to the end.",
        "speakDe": "Wir können heute Freunde im Café treffen."
      },
      {
        "q": "Accusative + können: Choose the correct article: „Kannst du _______ Kuchen mitnehmen?“",
        "options": [
          "den",
          "der",
          "das",
          "dem"
        ],
        "answer": "den",
        "explain": "„der Kuchen“ is the direct object (Accusative masculine), so it becomes „den Kuchen“.",
        "speakDe": "Kannst du den Kuchen mitnehmen?"
      },
      {
        "q": "Sentence Rearranging: Arrange these words into a natural question: (du / heute / Zeit / hast / ?)",
        "options": [
          "Hast du heute Zeit?",
          "Du hast heute Zeit?",
          "Zeit hast du heute?",
          "Heute du hast Zeit?"
        ],
        "answer": "Hast du heute Zeit?",
        "explain": "In German yes/no questions, the conjugated verb takes Position 1: „Hast du heute Zeit?“",
        "speakDe": "Hast du heute Zeit?"
      },
      {
        "q": "Translation into German: Translate using können, einen Tee, and trinken: „I can drink a tea tomorrow.“",
        "options": [
          "Ich kann morgen einen Tee trinken.",
          "Ich kann morgen ein Tee trinken.",
          "Ich können morgen einen Tee trinken.",
          "Ich kann trinken morgen einen Tee."
        ],
        "answer": "Ich kann morgen einen Tee trinken.",
        "explain": "„Ich kann“ + time „morgen“ + direct object „einen Tee“ + infinitive „trinken“ at the end.",
        "speakDe": "Ich kann morgen einen Tee trinken."
      }
    ],
    "translateQuiz": [
      {
        "type": "de_to_ar",
        "prompt": "Hast du heute Zeit für ein Treffen im Café?",
        "answer": "هل لديك وقت اليوم للقاء في المقهى؟"
      },
      {
        "type": "de_to_ar",
        "prompt": "Wir können morgen einen Termin beim Arzt vereinbaren.",
        "answer": "نستطيع غداً ترتيب موعد عند الطبيب."
      },
      {
        "type": "ar_to_de",
        "prompt": "هل تستطيع مقابلة صديق اليوم في المقهى؟",
        "answer": "Kannst du heute einen Freund im Café treffen?"
      },
      {
        "type": "ar_to_de",
        "prompt": "أستطيع دفع الفاتورة غداً بكل سرور.",
        "answer": "Ich kann morgen die Rechnung gern bezahlen."
      },
      {
        "type": "en_to_de",
        "prompt": "Can you take the cake away tomorrow?",
        "answer": "Kannst du morgen den Kuchen mitnehmen?"
      },
      {
        "type": "en_to_de",
        "prompt": "We can drink a tea in the café today.",
        "answer": "Wir können heute im Café einen Tee trinken."
      },
      {
        "type": "de_to_en",
        "prompt": "Ich habe heute leider keine Zeit.",
        "answer": "Unfortunately I have no time today."
      },
      {
        "type": "de_to_en",
        "prompt": "Können wir uns morgen um drei Uhr treffen?",
        "answer": "Can we meet tomorrow at three o'clock?"
      }
    ],
    "readingPassage": {
      "title": "Ein Treffen im Café",
      "text": "Anna ruft ihren Kollegen David am Vormittag an. Sie fragt ihn: „Hast du heute Zeit?“ David schaut in seinen Terminkalender und antwortet: „Heute habe ich leider einen wichtigen Termin beim Zahnarzt. Aber morgen bin ich ganz frei!“ Anna freut sich und sagt: „Perfekt! Dann können wir uns morgen im Café treffen.“ Sie möchten zusammen einen heißen Kaffee trinken und über den neuen Arbeitsplan sprechen.",
      "translation": "Anna calls her colleague David in the morning. She asks him: 'Do you have time today?' David looks into his appointment calendar and answers: 'Unfortunately today I have an important appointment at the dentist. But tomorrow I am completely free!' Anna is glad and says: 'Perfect! Then we can meet in the café tomorrow.' They would like to drink a hot coffee together and speak about the new work plan.",
      "arabicTranslation": "تتصل آنا بزميلها ديفيد في الصباح. تسأله: «هل لديك وقت اليوم؟» ينظر ديفيد في جدول مواعيده ويجيب: «للأسف لدي اليوم موعد مهم عند طبيب الأسنان. لكن غداً أنا متفرغ تماماً!» تسعد آنا وتقول: «ممتاز! إذاً يمكننا اللقاء غداً في المقهى.» يودان شرب قهوة ساخنة معاً والتحدث عن خطة العمل الجديدة.",
      "mcqQuestions": [
        {
          "q": "Warum hat David heute keine Zeit für ein Treffen?",
          "options": [
            "Er hat einen Termin beim Zahnarzt",
            "Er ist im Supermarkt",
            "Er muss nach Berlin fahren",
            "Er schläft noch"
          ],
          "answer": "Er hat einen Termin beim Zahnarzt",
          "explain": "David sagt: „Heute habe ich leider einen wichtigen Termin beim Zahnarzt.“"
        },
        {
          "q": "Wann und wo treffen sich Anna und David?",
          "options": [
            "Morgen im Café",
            "Heute Abend im Büro",
            "Am Wochenende im Park",
            "Nächste Woche zu Hause"
          ],
          "answer": "Morgen im Café",
          "explain": "Anna schlägt vor: „Dann können wir uns morgen im Café treffen.“"
        }
      ],
      "writtenQuestions": [
        {
          "q": "Was fragt Anna ihren Kollegen David am Telefon?",
          "modelAnswer": "Anna fragt: „Hast du heute Zeit?“",
          "modelAnswerAr": "سألت آنا: «هل لديك وقت اليوم؟»"
        },
        {
          "q": "Was möchten die beiden im Café besprechen?",
          "modelAnswer": "Sie möchten über den neuen Arbeitsplan sprechen.",
          "modelAnswerAr": "يودان التحدث عن خطة العمل الجديدة."
        }
      ]
    }
  },
  {
    "day": 4,
    "title": "Separable Prefix Verbs & Clock Times",
    "subtitle": "Trennbare Verben (einkaufen, anrufen, mitkommen) & „um ... Uhr“",
    "arabicTitle": "الأفعال المنفصلة (Trennbare Verben) والساعة",
    "vocab": [
      {
        "de": "der Supermarkt",
        "en": "the supermarket",
        "ar": "السوبرماركت",
        "cat": "noun",
        "grammar": "Masc. Noun • Pl: die Supermärkte | Nom: der Supermarkt | Akk: den Supermarkt | Dat: dem Supermarkt"
      },
      {
        "de": "die Uhr",
        "en": "the clock / watch / o'clock",
        "ar": "الساعة",
        "cat": "noun",
        "grammar": "Fem. Noun • Pl: die Uhren | Usage: um acht Uhr (at 8 o'clock)"
      },
      {
        "de": "einkaufen",
        "en": "to shop / buy groceries",
        "ar": "يتسوق",
        "cat": "verb",
        "grammar": "Separable Verb • ich kaufe ein, du kaufst ein, er kauft ein, wir kaufen ein | Perfekt: hat eingekauft"
      },
      {
        "de": "anrufen",
        "en": "to call (on the phone)",
        "ar": "يتصل هاتفياً",
        "cat": "verb",
        "grammar": "Separable Verb • ich rufe an, du rufst an, er ruft an, wir rufen an | Perfekt: hat angerufen"
      },
      {
        "de": "mitkommen",
        "en": "to come along",
        "ar": "يأتي مع / يرافق",
        "cat": "verb",
        "grammar": "Separable Verb • ich komme mit, du kommst mit, er kommt mit, wir kommen mit | Perfekt: ist mitgekommen"
      },
      {
        "de": "um … Uhr",
        "en": "at … o'clock",
        "ar": "في تمام الساعة...",
        "cat": "phrase",
        "grammar": "Prepositional Phrase • Always use 'um' for precise clock times"
      }
    ],
    "usefulPhrase": {
      "de": "Passt es dir um acht Uhr?",
      "en": "Does eight o'clock work for you?",
      "ar": "هل يناسبك الوقت في الساعة الثامنة؟",
      "why": "The most natural everyday phrase to negotiate a meeting time with a friend or colleague. If it works, you can reply: „Ja, das passt super!“"
    },
    "grammar": {
      "title": "Separable Prefix Verbs (Trennbare Verben)",
      "summary": "In German, many action verbs have prefixes (ein-, an-, mit-, ab-, auf-). In a simple present-tense sentence, the prefix splits off and flies to the very end of the sentence! BUT combined with a modal verb (können / möchten), the verb does NOT split—the modal verb sits in Position 2 and the separable verb stays whole at the end.",
      "tableHeaders": [
        "Verb Type",
        "Sentence Pattern",
        "Example",
        "Arabic Meaning"
      ],
      "tableRows": [
        [
          "Simple Present (Splits)",
          "Verb (Pos 2) ... Prefix (End)",
          "Ich rufe dich morgen an.",
          "سأتصل بك غداً (انفصلت an-)"
        ],
        [
          "Simple Present (Splits)",
          "Verb (Pos 2) ... Prefix (End)",
          "Er kauft im Supermarkt ein.",
          "هو يتسوق في السوبرماركت (انفصلت ein-)"
        ],
        [
          "Question (Splits)",
          "Verb (Pos 1) ... Prefix (End)",
          "Kommst du heute mit?",
          "هل تأتي معنا اليوم؟ (انفصلت mit-)"
        ],
        [
          "With Modal (Whole!)",
          "Modal (Pos 2) ... Whole Verb (End)",
          "Ich kann dich morgen anrufen.",
          "أستطيع الاتصال بك غداً (كاملة)"
        ],
        [
          "With Modal (Whole!)",
          "Modal (Pos 2) ... Whole Verb (End)",
          "Möchtest du heute mitkommen?",
          "هل تود أن تأتي معنا اليوم؟ (كاملة)"
        ]
      ],
      "examples": [
        {
          "de": "Er kauft heute im Supermarkt ein.",
          "en": "He shops at the supermarket today.",
          "ar": "هو يتسوق اليوم في السوبرماركت."
        },
        {
          "de": "Kommst du ins Café mit?",
          "en": "Are you coming along to the café?",
          "ar": "هل تأتي معنا إلى المقهى؟"
        },
        {
          "de": "Wir können den Kellner um acht Uhr anrufen.",
          "en": "We can call the waiter at eight o'clock.",
          "ar": "نستطيع الاتصال بالنادل في الساعة الثامنة."
        }
      ]
    },
    "quiz": [
      {
        "q": "Simple Sentence Splitting: Conjugate einkaufen for „er“ and place the prefix correctly: „Er _______ heute im Supermarkt _______.“",
        "options": [
          "kauft ... ein",
          "einkauft ... -",
          "kaufen ... ein",
          "kauft ... an"
        ],
        "answer": "kauft ... ein",
        "explain": "The base verb „kaufen“ conjugates to „kauft“ in Position 2; the prefix „ein“ goes to the very end.",
        "speakDe": "Er kauft heute im Supermarkt ein."
      },
      {
        "q": "Question with Prefix: Turn mitkommen into a question with „du“: „_______ du ins Café _______?“",
        "options": [
          "Kommst ... mit",
          "Mitkommst ... -",
          "Kommen ... mit",
          "Kommst ... an"
        ],
        "answer": "Kommst ... mit",
        "explain": "„Kommst“ starts the question in Position 1, and the prefix „mit“ flies to the end.",
        "speakDe": "Kommst du ins Café mit?"
      },
      {
        "q": "Modal Verb + Whole Verb: Fill in using können (for wir) and anrufen: „Wir _______ den Kellner um acht Uhr _______.“",
        "options": [
          "können ... anrufen",
          "kann ... anrufen",
          "anrufen ... können",
          "können ... ruft an"
        ],
        "answer": "können ... anrufen",
        "explain": "With modal verbs, the separable verb does NOT split; it stays whole at the very end.",
        "speakDe": "Wir können den Kellner um acht Uhr anrufen."
      },
      {
        "q": "Mini-Dialogue Translation: Translate into German: „Does eight o'clock work for you?“ — „Yes, that works great!“",
        "options": [
          "„Passt es dir um acht Uhr?“ – „Ja, das passt super!“",
          "„Hast du Zeit um acht?“ – „Nein danke.“",
          "„Wie spät ist es um acht?“ – „Das passt.“",
          "„Passt es Ihnen?“ – „Nein, getrennt.“"
        ],
        "answer": "„Passt es dir um acht Uhr?“ – „Ja, das passt super!“",
        "explain": "„Passt es dir um ... Uhr?“ is the idiomatic phrase to negotiate a meeting time.",
        "speakDe": "Passt es dir um acht Uhr? Ja, das passt super!"
      }
    ],
    "translateQuiz": [
      {
        "type": "de_to_ar",
        "prompt": "Ich rufe meine Freundin um sieben Uhr an.",
        "answer": "أتصل بصديقتي في تمام الساعة السابعة."
      },
      {
        "type": "de_to_ar",
        "prompt": "Kaufst du heute im Supermarkt für das Abendessen ein?",
        "answer": "هل تتسوق اليوم في السوبرماركت من أجل العشاء؟"
      },
      {
        "type": "ar_to_de",
        "prompt": "هل تأتي معنا إلى المقهى؟",
        "answer": "Kommst du ins Café mit?"
      },
      {
        "type": "ar_to_de",
        "prompt": "هل يناسبك في الساعة الثامنة؟ — نعم، هذا يناسبني تماماً!",
        "answer": "Passt es dir um acht Uhr? — Ja, das passt super!"
      },
      {
        "type": "en_to_de",
        "prompt": "He is shopping at the supermarket today.",
        "answer": "Er kauft heute im Supermarkt ein."
      },
      {
        "type": "en_to_de",
        "prompt": "Can you call me at eight o'clock?",
        "answer": "Kannst du mich um acht Uhr anrufen?"
      },
      {
        "type": "de_to_en",
        "prompt": "Wir können heute im Supermarkt einkaufen.",
        "answer": "We can shop at the supermarket today."
      },
      {
        "type": "de_to_en",
        "prompt": "Möchtest du um acht Uhr mitkommen?",
        "answer": "Would you like to come along at eight o'clock?"
      }
    ],
    "readingPassage": {
      "title": "Einkaufen vor dem Abendessen",
      "text": "Es ist siebzehn Uhr und der Kühlschrank in der WG ist fast leer. Max nimmt sein Smartphone und ruft seine Mitbewohnerin Lisa an: „Hallo Lisa, ich gehe gleich einkaufen. Kommst du in den Supermarkt mit?“ Lisa freut sich, antwortet aber: „Sehr gern, aber ich habe noch eine Online-Vorlesung bis achtzehn Uhr. Passt es dir um halb sieben?“ Max sagt sofort: „Ja, das passt super! Ich kann dich um halb sieben direkt an der Haltestelle treffen.“ Zusammen kaufen sie im Supermarkt frisches Gemüse, Brot und Saft für das Abendessen ein.",
      "translation": "It is 5 PM and the fridge in the shared apartment is almost empty. Max takes his smartphone and calls his roommate Lisa: 'Hello Lisa, I am going shopping in a moment. Are you coming along to the supermarket?' Lisa is pleased, but replies: 'With pleasure, but I still have an online lecture until 6 PM. Does 6:30 work for you?' Max says immediately: 'Yes, that works great! I can meet you at half past six right at the stop.' Together they shop for fresh vegetables, bread, and juice in the supermarket for dinner.",
      "arabicTranslation": "الساعة الخامسة مساءً والثلاجة في سكن الطلاب المشترك شبه فارغة. يأخذ ماكس هاتفه الذكي ويتصل بزميلته في السكن ليزا: «مرحباً ليزا، سأذهب للتسوق بعد قليل. هل تأتين معي إلى السوبرماركت؟» تفرح ليزا لكنها تجيب: «بكل سرور، لكن لا تزال لدي محاضرة عبر الإنترنت حتى السادسة. هل يناسبك الساعة السادسة والنصف؟» يقول ماكس فوراً: «نعم، هذا ممتاز! يمكنني مقابلتك عند المحطة في السادسة والنصف مباشرة.» معاً يتسوقان خضروات طازجة وخبزاً وعصيراً للعشاء في السوبرماركت.",
      "mcqQuestions": [
        {
          "q": "Warum ruft Max Lisa um siebzehn Uhr an?",
          "options": [
            "Er möchte im Supermarkt einkaufen und fragt, ob sie mitkommt",
            "Er hat seinen Schlüssel verloren",
            "Er möchte die Rechnung bezahlen",
            "Er ist krank"
          ],
          "answer": "Er möchte im Supermarkt einkaufen und fragt, ob sie mitkommt",
          "explain": "Max ruft sie an und fragt: „Kommst du in den Supermarkt mit?“"
        },
        {
          "q": "Um wie viel Uhr treffen sich die beiden an der Haltestelle?",
          "options": [
            "Um halb sieben (18:30 Uhr)",
            "Um siebzehn Uhr",
            "Um acht Uhr",
            "Morgen früh"
          ],
          "answer": "Um halb sieben (18:30 Uhr)",
          "explain": "Lisa fragt: „Passt es dir um halb sieben?“ und Max stimmt zu."
        }
      ],
      "writtenQuestions": [
        {
          "q": "Bis wie viel Uhr hat Lisa eine Vorlesung?",
          "modelAnswer": "Lisa hat eine Vorlesung bis achtzehn Uhr.",
          "modelAnswerAr": "لدى ليزا محاضرة حتى الساعة السادسة مساءً."
        },
        {
          "q": "Was kaufen Max und Lisa im Supermarkt ein?",
          "modelAnswer": "Sie kaufen frisches Gemüse, Brot und Saft ein.",
          "modelAnswerAr": "يتسوقان خضروات طازجة وخبزاً وعصيراً."
        }
      ]
    }
  },
  {
    "day": 5,
    "title": "Time Prepositions & Inversion",
    "subtitle": "um, am, von ... bis & Verb in Position 2",
    "arabicTitle": "حروف جر الزمان وتغيير ترتيب الجملة (Inversion)",
    "vocab": [
      {
        "de": "der Montag",
        "en": "Monday",
        "ar": "يوم الاثنين",
        "cat": "noun",
        "grammar": "Masc. Noun • Pl: die Montage | Usage: am Montag (on Monday)"
      },
      {
        "de": "der Abend",
        "en": "the evening",
        "ar": "المساء",
        "cat": "noun",
        "grammar": "Masc. Noun • Pl: die Abende | Usage: am Abend (in the evening)"
      },
      {
        "de": "das Wochenende",
        "en": "the weekend",
        "ar": "عطلة نهاية الأسبوع",
        "cat": "noun",
        "grammar": "Neut. Noun • Pl: die Wochenenden | Usage: am Wochenende"
      },
      {
        "de": "am Montag / am Abend",
        "en": "on Monday / in the evening",
        "ar": "يوم الاثنين / في المساء",
        "cat": "phrase",
        "grammar": "Contraction of an + dem • Used for days and parts of days"
      },
      {
        "de": "am Wochenende",
        "en": "at the weekend",
        "ar": "في عطلة نهاية الأسبوع",
        "cat": "phrase",
        "grammar": "Prepositional Phrase • Always use 'am' for weekends too"
      },
      {
        "de": "vorbereiten",
        "en": "to prepare",
        "ar": "يجهز / يحضر",
        "cat": "verb",
        "grammar": "Separable Verb • ich bereite vor, du bereitest vor, er bereitet vor | Perfekt: hat vorbereitet"
      }
    ],
    "usefulPhrase": {
      "de": "Wie spät ist es? — Es ist acht Uhr.",
      "en": "What time is it? — It is 8 o'clock.",
      "ar": "كم الساعة؟ — إنها الساعة الثامنة.",
      "why": "The standard everyday question to ask for the current time. You can reply simply with the hour: „Es ist acht Uhr.“ or „Es ist halb acht.“"
    },
    "grammar": {
      "title": "Time Prepositions (um, am, von … bis) & Inversion",
      "summary": "Use 'um' for precise clock time, 'am' for days and parts of the day (am Montag, am Abend, am Wochenende; exception: in der Nacht), and 'von ... bis' for ranges. Strictly remember INVERSION: the conjugated verb must remain in Position 2! If you start with time, the subject and verb flip.",
      "tableHeaders": [
        "Preposition",
        "Rule & Usage",
        "Example with Inversion",
        "Arabic Meaning"
      ],
      "tableRows": [
        [
          "um + Clock Time",
          "Specific hour",
          "Um acht Uhr trinke ich einen Tee.",
          "في الساعة 8 أشرب شاياً"
        ],
        [
          "am + Day / Part",
          "Days & parts of day",
          "Am Montag haben wir einen Termin.",
          "يوم الاثنين لدينا موعد"
        ],
        [
          "am + Wochenende",
          "Weekends",
          "Am Wochenende treffen wir uns im Café.",
          "في عطلة الأسبوع نلتقي بالمقهى"
        ],
        [
          "von ... bis ...",
          "Time duration",
          "Von neun bis siebzehn Uhr arbeite ich.",
          "من 9 حتى 17 أعمل"
        ],
        [
          "Inversion with Modal",
          "Modal in Pos 2, verb at end",
          "Am Abend kann er im Supermarkt einkaufen.",
          "في المساء يمكنه التسوق"
        ]
      ],
      "examples": [
        {
          "de": "Am Wochenende treffen wir uns im Café.",
          "en": "At the weekend we meet in the café.",
          "ar": "في عطلة نهاية الأسبوع نلتقي في المقهى."
        },
        {
          "de": "Am Abend kann er im Supermarkt einkaufen.",
          "en": "In the evening he can shop at the supermarket.",
          "ar": "في المساء يمكنه التسوق في السوبرماركت."
        },
        {
          "de": "Am Montag kann ich die Rechnung bezahlen.",
          "en": "On Monday I can pay the bill.",
          "ar": "يوم الاثنين أستطيع دفع الفاتورة."
        }
      ]
    },
    "quiz": [
      {
        "q": "Preposition Choice: Fill in the blanks with um or am: „Wir haben einen Termin _______ Montag _______ zehn Uhr.“",
        "options": [
          "am ... um",
          "um ... am",
          "in ... um",
          "am ... im"
        ],
        "answer": "am ... um",
        "explain": "Days of the week take „am“; clock times take „um“.",
        "speakDe": "Wir haben einen Termin am Montag um zehn Uhr."
      },
      {
        "q": "Inversion & Position 2: Rearrange into a sentence starting with the time element: (im Café / wir / treffen / am Wochenende / uns)",
        "options": [
          "Am Wochenende treffen wir uns im Café.",
          "Am Wochenende wir treffen uns im Café.",
          "Im Café am Wochenende treffen wir uns.",
          "Treffen wir uns am Wochenende im Café."
        ],
        "answer": "Am Wochenende treffen wir uns im Café.",
        "explain": "Starting with „Am Wochenende“ forces the conjugated verb „treffen“ into Position 2, followed by subject „wir“.",
        "speakDe": "Am Wochenende treffen wir uns im Café."
      },
      {
        "q": "Modal Verb + Time + End Verb: Complete the sentence with können (for er) and einkaufen: „Am Abend _______ er im Supermarkt _______.“",
        "options": [
          "kann ... einkaufen",
          "können ... einkaufen",
          "kauft ... ein",
          "kann ... eingekauft"
        ],
        "answer": "kann ... einkaufen",
        "explain": "Modal verb „kann“ is in Position 2; separable verb „einkaufen“ stays intact at the very end.",
        "speakDe": "Am Abend kann er im Supermarkt einkaufen."
      },
      {
        "q": "Translation into German: Translate using am Montag and bezahlen: „On Monday, I can pay the bill.“",
        "options": [
          "Am Montag kann ich die Rechnung bezahlen.",
          "Am Montag ich kann die Rechnung bezahlen.",
          "Ich am Montag kann bezahlen die Rechnung.",
          "Am Montag kann bezahlen ich die Rechnung."
        ],
        "answer": "Am Montag kann ich die Rechnung bezahlen.",
        "explain": "„Am Montag“ (Time first) ➔ „kann“ (Pos 2) ➔ „ich“ (Subject) ➔ „die Rechnung“ (Object) ➔ „bezahlen“ (End).",
        "speakDe": "Am Montag kann ich die Rechnung bezahlen."
      }
    ],
    "translateQuiz": [
      {
        "type": "de_to_ar",
        "prompt": "Am Abend bereite ich das Essen für meine Gäste vor.",
        "answer": "في المساء أجهّز الطعام لضيوفي."
      },
      {
        "type": "de_to_ar",
        "prompt": "Wie spät ist es? — Es ist genau acht Uhr.",
        "answer": "كم الساعة؟ — إنها تمام الساعة الثامنة."
      },
      {
        "type": "ar_to_de",
        "prompt": "يوم الاثنين نستطيع مقابلة النادل في المقهى.",
        "answer": "Am Montag können wir den Kellner im Café treffen."
      },
      {
        "type": "ar_to_de",
        "prompt": "في عطلة نهاية الأسبوع يتسوق هو في السوبرماركت.",
        "answer": "Am Wochenende kauft er im Supermarkt ein."
      },
      {
        "type": "en_to_de",
        "prompt": "On Monday, I can pay the bill.",
        "answer": "Am Montag kann ich die Rechnung bezahlen."
      },
      {
        "type": "en_to_de",
        "prompt": "In the evening, we meet at eight o'clock.",
        "answer": "Am Abend treffen wir uns um acht Uhr."
      },
      {
        "type": "de_to_en",
        "prompt": "Von Montag bis Freitag arbeite ich im Büro.",
        "answer": "From Monday to Friday I work in the office."
      },
      {
        "type": "de_to_en",
        "prompt": "Am Wochenende habe ich endlich Zeit für meine Freunde.",
        "answer": "At the weekend I finally have time for my friends."
      }
    ],
    "readingPassage": {
      "title": "Ein voller Wochenplan",
      "text": "Jonas plant seine Arbeitswoche sehr genau. Am Montag bereitet er einen wichtigen Termin im Büro vor. Von neun bis siebzehn Uhr arbeitet er hochkonzentriert am Computer. Am Dienstagabend trifft er einen guten Freund und sie trinken einen Tee im Café. Am Freitag schaut Jonas auf die Uhr: „Wie spät ist es? Es ist schon acht Uhr!“ Am Wochenende hat Jonas endlich frei und kann sich im Park entspannen.",
      "translation": "Jonas plans his workweek very precisely. On Monday he prepares an important appointment in the office. From 9 AM to 5 PM he works highly concentrated on the computer. On Tuesday evening he meets a good friend and they drink a tea in the café. On Friday Jonas looks at the clock: 'What time is it? It is already 8 o'clock!' At the weekend Jonas finally has free time and can relax in the park.",
      "arabicTranslation": "يخطط يوناس لأسبوع عمله بدقة شديدة. يوم الاثنين يجهز لموعد مهم في المكتب. من الساعة التاسعة حتى الخامسة يعمل بتركيز عالٍ على الحاسوب. مساء الثلاثاء يقابل صديقاً جيداً ويشربان شاياً في المقهى. يوم الجمعة ينظر يوناس إلى الساعة: «كم الساعة؟ إنها الثامنة بالفعل!» في عطلة نهاية الأسبوع يتفرغ يوناس أخيراً ويمكنه الاسترخاء في الحديقة.",
      "mcqQuestions": [
        {
          "q": "Was macht Jonas am Montag?",
          "options": [
            "Er bereitet einen wichtigen Termin vor",
            "Er schläft bis mittags",
            "Er geht ins Fitnessstudio",
            "Er fährt in den Urlaub"
          ],
          "answer": "Er bereitet einen wichtigen Termin vor",
          "explain": "Im Text steht: „Am Montag bereitet er einen wichtigen Termin im Büro vor.“"
        },
        {
          "q": "Wann kann sich Jonas endlich entspannen?",
          "options": [
            "Am Wochenende",
            "Am Montag früh",
            "Von neun bis siebzehn Uhr",
            "Nur am Mittwoch"
          ],
          "answer": "Am Wochenende",
          "explain": "„Am Wochenende hat Jonas endlich frei und kann sich im Park entspannen.“"
        }
      ],
      "writtenQuestions": [
        {
          "q": "Von wann bis wann arbeitet Jonas im Büro?",
          "modelAnswer": "Jonas arbeitet von neun bis siebzehn Uhr.",
          "modelAnswerAr": "يعمل يوناس من الساعة التاسعة حتى الخامسة مساءً."
        },
        {
          "q": "Was trinken Jonas und sein Freund am Dienstagabend im Café?",
          "modelAnswer": "Sie trinken einen Tee im Café.",
          "modelAnswerAr": "يشربان شاياً في المقهى."
        }
      ]
    }
  },
  {
    "day": 6,
    "title": "Dative for Stationary Locations",
    "subtitle": "Wo? • in dem / im Café, im Park, in der Bäckerei",
    "arabicTitle": "حالة المجرور (Dativ) للمواقع الثابتة (أين؟ - Wo?)",
    "vocab": [
      {
        "de": "die Bäckerei",
        "en": "the bakery",
        "ar": "المخبز",
        "cat": "noun",
        "grammar": "Fem. Noun • Pl: die Bäckereien | Usage: in der Bäckerei (Dative location)"
      },
      {
        "de": "der Park",
        "en": "the park",
        "ar": "الحديقة العامة",
        "cat": "noun",
        "grammar": "Masc. Noun • Pl: die Parks | Usage: im Park (in dem Park)"
      },
      {
        "de": "das Restaurant",
        "en": "the restaurant",
        "ar": "المطعم",
        "cat": "noun",
        "grammar": "Neut. Noun • Pl: die Restaurants | Usage: im Restaurant (in dem Restaurant)"
      },
      {
        "de": "warten (auf)",
        "en": "to wait (for)",
        "ar": "ينتظر",
        "cat": "verb",
        "grammar": "Reg. Verb • ich warte, du wartest, er wartet | Takes auf + Akk: warten auf den Bus"
      },
      {
        "de": "sitzen",
        "en": "to sit",
        "ar": "يجلس",
        "cat": "verb",
        "grammar": "Irreg. Verb • ich sitze, du sitzt, er sitzt, wir sitzen | Perfekt: hat gesessen"
      },
      {
        "de": "drinnen / draußen",
        "en": "inside / outside",
        "ar": "بالداخل / بالخارج",
        "cat": "phrase",
        "grammar": "Local Adverbs • drinnen (inside) vs. draußen (outside)"
      }
    ],
    "usefulPhrase": {
      "de": "Wo bist du? — Ich bin schon da!",
      "en": "Where are you? — I'm already here!",
      "ar": "أين أنت؟ — أنا موجود بالفعل!",
      "why": "The quintessential text or phone call line when meeting someone (treffen) at a café, bakery, or station."
    },
    "grammar": {
      "title": "Dative for Stationary Locations (Wo?)",
      "summary": "When asking „Wo?“ (Where is someone/something stationary?), two-way prepositions like „in“ require the Dative case. Masculine (der) and Neuter (das) both change to „dem“ (contracting with in to „im“: im Park, im Café, im Restaurant). Feminine (die) changes to „der“ (in der Bäckerei).",
      "tableHeaders": [
        "Gender",
        "Nominative",
        "Accusative (Direct Object)",
        "Dative (Location: in + Dat)",
        "Contraction"
      ],
      "tableRows": [
        [
          "Masculine",
          "der Park",
          "den Park",
          "in dem Park",
          "im Park"
        ],
        [
          "Neuter",
          "das Café / Restaurant",
          "das Café / Restaurant",
          "in dem Café / Restaurant",
          "im Café / im Restaurant"
        ],
        [
          "Feminine",
          "die Bäckerei",
          "die Bäckerei",
          "in der Bäckerei",
          "in der Bäckerei (no contraction)"
        ]
      ],
      "examples": [
        {
          "de": "Ich sitze im Café und trinke einen Kaffee.",
          "en": "I sit in the café and drink a coffee. (Dat location + Akk drink)",
          "ar": "أجلس في المقهى وأشرب قهوة."
        },
        {
          "de": "Wir können in der Bäckerei ein Brötchen kaufen.",
          "en": "We can buy a bread roll in the bakery.",
          "ar": "نستطيع شراء خبز صغير في المخبز."
        },
        {
          "de": "Am Montag warte ich im Park.",
          "en": "On Monday I wait in the park.",
          "ar": "يوم الاثنين أنتظر في الحديقة."
        }
      ]
    },
    "quiz": [
      {
        "q": "Dative Preposition/Article: Fill in the blanks with im or in der: „Ich sitze _______ Restaurant und warte auf dich. Er kauft Kuchen _______ Bäckerei.“",
        "options": [
          "im ... in der",
          "in der ... im",
          "im ... im",
          "in das ... in die"
        ],
        "answer": "im ... in der",
        "explain": "„das Restaurant“ becomes „im Restaurant“ (in dem); „die Bäckerei“ is feminine and becomes „in der Bäckerei“.",
        "speakDe": "Ich sitze im Restaurant und warte auf dich. Er kauft Kuchen in der Bäckerei."
      },
      {
        "q": "Double Case Check (Dative + Accusative): Choose the correct options: „Wir möchten [ im / in den ] Park [ ein / einen ] Tee trinken.“",
        "options": [
          "im ... einen",
          "in den ... ein",
          "im ... ein",
          "in dem ... der"
        ],
        "answer": "im ... einen",
        "explain": "Location is stationary in the park = dative „im“; direct object is masculine „der Tee“ = accusative „einen“.",
        "speakDe": "Wir möchten im Park einen Tee trinken."
      },
      {
        "q": "Sentence Rearranging (Inversion): Start with the time phrase: (im Café / am Abend / wir / sitzen)",
        "options": [
          "Am Abend sitzen wir im Café.",
          "Am Abend wir sitzen im Café.",
          "Im Café am Abend wir sitzen.",
          "Sitzen am Abend im Café wir."
        ],
        "answer": "Am Abend sitzen wir im Café.",
        "explain": "Starting with time expression „Am Abend“ triggers inversion: verb „sitzen“ in Position 2, followed by subject „wir“.",
        "speakDe": "Am Abend sitzen wir im Café."
      },
      {
        "q": "Translation into German: Translate using am Wochenende, können, im Park, and treffen: „At the weekend, we can meet in the park.“",
        "options": [
          "Am Wochenende können wir uns im Park treffen.",
          "Am Wochenende wir können uns im Park treffen.",
          "Wir im Park am Wochenende können treffen.",
          "Können wir am Wochenende im Park treffen."
        ],
        "answer": "Am Wochenende können wir uns im Park treffen.",
        "explain": "Time first „Am Wochenende“ + modal verb „können“ + subject „wir uns“ + location „im Park“ + infinitive „treffen“.",
        "speakDe": "Am Wochenende können wir uns im Park treffen."
      }
    ],
    "translateQuiz": [
      {
        "type": "de_to_ar",
        "prompt": "Ich sitze draußen im Café und warte auf dich.",
        "answer": "أجلس بالخارج في المقهى وأنتظرك."
      },
      {
        "type": "de_to_ar",
        "prompt": "Sie kaufen heute frisches Brot in der Bäckerei.",
        "answer": "هم يشترون اليوم خبزاً طازجاً من المخبز."
      },
      {
        "type": "ar_to_de",
        "prompt": "أين أنت؟ — أنا موجود بالفعل في المطعم!",
        "answer": "Wo bist du? — Ich bin schon da im Restaurant!"
      },
      {
        "type": "ar_to_de",
        "prompt": "في المساء نجلس في الحديقة ونشرب الشاي.",
        "answer": "Am Abend sitzen wir im Park und trinken Tee."
      },
      {
        "type": "en_to_de",
        "prompt": "We would like to drink a tea in the park.",
        "answer": "Wir möchten im Park einen Tee trinken."
      },
      {
        "type": "en_to_de",
        "prompt": "He is waiting inside the bakery.",
        "answer": "Er wartet drinnen in der Bäckerei."
      },
      {
        "type": "de_to_en",
        "prompt": "Möchtest du lieber drinnen oder draußen sitzen?",
        "answer": "Would you rather sit inside or outside?"
      },
      {
        "type": "de_to_en",
        "prompt": "Wir treffen uns am Nachmittag im Restaurant.",
        "answer": "We meet in the afternoon in the restaurant."
      }
    ],
    "readingPassage": {
      "title": "Sonniger Nachmittag im Park",
      "text": "Es ist ein herrlich sonniger Samstagnachmittag. Felix geht zuerst in die Bäckerei an der Ecke und kauft zwei belegte Brötchen und ein großes Stück Apfelkuchen. Danach spaziert er in den Park und setzt sich auf eine sonnige Bank unter den Linden. Sein Freund Karim ruft ihn auf dem Handy an: „Wo bist du?“ Felix lacht: „Ich bin schon da im Park! Sitzt du noch drinnen in deiner Wohnung?“ Karim antwortet: „Nein, ich komme sofort nach draußen zu dir.“ Zusammen genießen sie das Essen im Grünen.",
      "translation": "It is a wonderfully sunny Saturday afternoon. Felix first goes to the bakery on the corner and buys two topped bread rolls and a big piece of apple cake. Afterwards he walks into the park and sits down on a sunny bench under the linden trees. His friend Karim calls him on the mobile phone: 'Where are you?' Felix laughs: 'I'm already here in the park! Are you still sitting inside in your apartment?' Karim answers: 'No, I am coming outside to you right away.' Together they enjoy the food in the green.",
      "arabicTranslation": "إنه بعد ظهر يوم سبت مشمس ورائع. يذهب فيليكس أولاً إلى المخبز على الزاوية ويشتري شطيرتين وقطعة كبيرة من كعكة التفاح. بعد ذلك يتنزه في الحديقة ويجلس على مقعد مشمس تحت أشجار الزيزفون. يتصل به صديقه كريم على الهاتف المحمول: «أين أنت؟» يضحك فيليكس: «أنا هنا بالفعل في الحديقة! هل ما زلت جالساً بالداخل في شقتك؟» يجيب كريم: «لا، أنا قادم إلى الخارج إليك فوراً.» معاً يستمتعان بتناول الطعام وسط الطبيعة.",
      "mcqQuestions": [
        {
          "q": "Was kauft Felix zuerst in der Bäckerei?",
          "options": [
            "Zwei belegte Brötchen und ein Stück Apfelkuchen",
            "Nur eine Flasche Wasser",
            "Einen Kaffee zum Mitnehmen",
            "Gar nichts"
          ],
          "answer": "Zwei belegte Brötchen und ein Stück Apfelkuchen",
          "explain": "Im Text: „Felix geht zuerst in die Bäckerei an der Ecke und kauft zwei belegte Brötchen und ein großes Stück Apfelkuchen.“"
        },
        {
          "q": "Wo sitzt Felix, als Karim anruft?",
          "options": [
            "Auf einer sonnigen Bank im Park",
            "Drinnen in der Bäckerei",
            "Im Restaurant",
            "Im Bus"
          ],
          "answer": "Auf einer sonnigen Bank im Park",
          "explain": "Felix spaziert in den Park und setzt sich auf eine sonnige Bank."
        }
      ],
      "writtenQuestions": [
        {
          "q": "Was ruft Karim, als er Felix auf dem Handy anruft?",
          "modelAnswer": "Karim fragt: „Wo bist du?“",
          "modelAnswerAr": "سأل كريم: «أين أنت؟»"
        },
        {
          "q": "Wo saß Karim vorher?",
          "modelAnswer": "Karim saß drinnen in seiner Wohnung.",
          "modelAnswerAr": "كان كريم جالساً بالداخل في شقته."
        }
      ]
    }
  },
  {
    "day": 7,
    "title": "Word Order: Time before Place (TeKaMoLo)",
    "subtitle": "Temporal (Wann?) ➔ Modal (Wie?) ➔ Lokal (Wo?)",
    "arabicTitle": "ترتيب عناصر الجملة الألمانية: الزمان قبل المكان (TeKaMoLo)",
    "vocab": [
      {
        "de": "der Freund / die Freundin",
        "en": "the friend (m / f)",
        "ar": "الصديق / الصديقة",
        "cat": "noun",
        "grammar": "Noun • Pl: die Freunde / die Freundinnen | Masc: der Freund | Fem: die Freundin"
      },
      {
        "de": "mit dem Bus / mit dem Fahrrad",
        "en": "by bus / by bike",
        "ar": "بالحافلة / بالدراجة",
        "cat": "phrase",
        "grammar": "Dative with mit • mit takes dative: der Bus ➔ dem Bus, das Fahrrad ➔ dem Fahrrad"
      },
      {
        "de": "zusammen",
        "en": "together",
        "ar": "معاً / سوياً",
        "cat": "phrase",
        "grammar": "Modal Adverb • Describes how an action is performed (Manner)"
      },
      {
        "de": "gerne / gern",
        "en": "gladly / with pleasure",
        "ar": "بسرور / برغبة (يحب أن)",
        "cat": "phrase",
        "grammar": "Modal Adverb • Placed directly after verbs to show enjoyment: Ich trinke gern Tee"
      },
      {
        "de": "fahren",
        "en": "to drive / travel / ride",
        "ar": "يقود / يسافر / يركب وسيلة مواصلات",
        "cat": "verb",
        "grammar": "Irreg. Verb • ich fahre, du fährst, er/sie/es fährt, wir fahren | Perfekt: ist gefahren"
      }
    ],
    "usefulPhrase": {
      "de": "Wie kommst du zum Café? — Ich fahre mit dem Bus.",
      "en": "How are you getting to the café? — I'm going by bus.",
      "ar": "كيف ستصل إلى المقهى؟ — سأذهب بالحافلة.",
      "why": "The standard question when coordinating travel with someone. You can reply: „Ich fahre mit dem Bus.“ or „Ich komme zu Fuß.“"
    },
    "grammar": {
      "title": "Word Order: Time before Place (Te-Ka-Mo-Lo)",
      "summary": "In English, place often comes before time ('at the café at 3 o'clock'). In German, the natural sequence is strictly Time before Place: Wann? (Temporal) ➔ Wie? (Modal/Manner) ➔ Wo? (Lokal/Place). Direct objects usually follow or sit neatly inside the modal bracket.",
      "tableHeaders": [
        "Element",
        "Question",
        "Example in Sentence",
        "Arabic Meaning"
      ],
      "tableRows": [
        [
          "Temporal (Te)",
          "Wann? (When?)",
          "am Nachmittag / heute",
          "الزمان (متى؟)"
        ],
        [
          "Modal (Mo)",
          "Wie? (How / Manner?)",
          "mit dem Bus / zusammen / gern",
          "الحال والكيفية (كيف؟)"
        ],
        [
          "Lokal (Lo)",
          "Wo? / Wohin? (Where?)",
          "im Café / in die Stadt",
          "المكان (أين؟ / إلى أين؟)"
        ],
        [
          "Subject First Order",
          "Subj + Verb + Te + Mo + Lo",
          "Ich fahre am Montag mit dem Bus in die Stadt.",
          "ترتيب الجملة بالفاعل أولاً"
        ],
        [
          "Time First (Inversion)",
          "Te + Verb + Subj + Mo + Lo",
          "Am Wochenende fahre ich mit dem Fahrrad in den Park.",
          "تقديم الزمان مع قلب الفعل والفاعل"
        ]
      ],
      "examples": [
        {
          "de": "Wir sitzen am Abend im Restaurant.",
          "en": "We sit in the restaurant in the evening. (Time before Place)",
          "ar": "نجلس في المساء في المطعم."
        },
        {
          "de": "Ich fahre am Montag mit dem Bus in die Stadt.",
          "en": "I travel by bus to the city on Monday. (Te-Mo-Lo)",
          "ar": "أسافر يوم الاثنين بالحافلة إلى المدينة."
        },
        {
          "de": "Am Wochenende möchte ich im Café einen Kuchen essen.",
          "en": "At the weekend I would like to eat a cake in the café.",
          "ar": "في عطلة نهاية الأسبوع أود أن آكل كعكة في المقهى."
        }
      ]
    },
    "quiz": [
      {
        "q": "Ordering (Time before Place): Put the elements in the natural German sequence: „Wir sitzen [ im Restaurant / am Abend ] .“",
        "options": [
          "am Abend im Restaurant",
          "im Restaurant am Abend",
          "im Restaurant abends",
          "sitzen am Abend Restaurant"
        ],
        "answer": "am Abend im Restaurant",
        "explain": "Time („am Abend“) strictly comes before Place („im Restaurant“).",
        "speakDe": "Wir sitzen am Abend im Restaurant."
      },
      {
        "q": "Full Te-Mo-Lo Ordering: Put these elements in correct order: „Ich fahre _______ _______ _______ .“ (in die Stadt [Place] / am Montag [Time] / mit dem Bus [Manner])",
        "options": [
          "am Montag mit dem Bus in die Stadt",
          "in die Stadt am Montag mit dem Bus",
          "mit dem Bus am Montag in die Stadt",
          "am Montag in die Stadt mit dem Bus"
        ],
        "answer": "am Montag mit dem Bus in die Stadt",
        "explain": "Te (am Montag) ➔ Mo (mit dem Bus) ➔ Lo (in die Stadt).",
        "speakDe": "Ich fahre am Montag mit dem Bus in die Stadt."
      },
      {
        "q": "Modal Bracket + Te-Mo-Lo: Arrange these words into a complete sentence: (kann / morgen / im Park / er / joggen)",
        "options": [
          "Er kann morgen im Park joggen.",
          "Er morgen kann im Park joggen.",
          "Kann er morgen joggen im Park.",
          "Morgen er kann joggen im Park."
        ],
        "answer": "Er kann morgen im Park joggen.",
        "explain": "Subject „Er“ + modal „kann“ (Pos 2) + time „morgen“ + place „im Park“ + infinitive „joggen“ at the end.",
        "speakDe": "Er kann morgen im Park joggen."
      },
      {
        "q": "Translation into German: Translate into German: „At the weekend, I would like to eat a cake in the café.“",
        "options": [
          "Am Wochenende möchte ich im Café einen Kuchen essen.",
          "Am Wochenende ich möchte im Café essen einen Kuchen.",
          "Ich möchte einen Kuchen essen am Wochenende im Café.",
          "Im Café möchte ich essen einen Kuchen am Wochenende."
        ],
        "answer": "Am Wochenende möchte ich im Café einen Kuchen essen.",
        "explain": "Time „Am Wochenende“ triggers inversion; Place „im Café“; direct object „einen Kuchen“; end verb „essen“.",
        "speakDe": "Am Wochenende möchte ich im Café einen Kuchen essen."
      }
    ],
    "translateQuiz": [
      {
        "type": "de_to_ar",
        "prompt": "Wie kommst du zum Café? — Ich fahre mit dem Fahrrad.",
        "answer": "كيف ستصل إلى المقهى؟ — سأذهب بالدراجة."
      },
      {
        "type": "de_to_ar",
        "prompt": "Wir fahren heute zusammen mit dem Bus in die Stadt.",
        "answer": "نسافر اليوم معاً بالحافلة إلى المدينة."
      },
      {
        "type": "ar_to_de",
        "prompt": "أحب ركوب الدراجة في عطلة نهاية الأسبوع في الحديقة.",
        "answer": "Ich fahre am Wochenende gern mit dem Fahrrad im Park."
      },
      {
        "type": "ar_to_de",
        "prompt": "يوم الاثنين نسافر بالحافلة إلى المقهى.",
        "answer": "Am Montag fahren wir mit dem Bus zum Café."
      },
      {
        "type": "en_to_de",
        "prompt": "We sit in the restaurant in the evening.",
        "answer": "Wir sitzen am Abend im Restaurant."
      },
      {
        "type": "en_to_de",
        "prompt": "How are you getting to the café?",
        "answer": "Wie kommst du zum Café?"
      },
      {
        "type": "de_to_en",
        "prompt": "Er fährt am Nachmittag mit dem Bus nach Hause.",
        "answer": "He goes home by bus in the afternoon."
      },
      {
        "type": "de_to_en",
        "prompt": "Ich trinke am Morgen gern einen warmen Tee.",
        "answer": "I like drinking a warm tea in the morning."
      }
    ],
    "readingPassage": {
      "title": "Auf dem Weg zum Treffpunkt",
      "text": "Am Sonntagmorgen möchten Lea und ihre beste Freundin Marie zusammen frühstücken. Lea ruft Marie an und fragt: „Wie kommst du zum Café?“ Marie antwortet sofort: „Ich fahre am Vormittag mit dem Fahrrad durch den Park.“ Lea sagt: „Das klingt gesund! Ich fahre lieber mit dem Bus, denn meine Bushaltestelle liegt direkt vor der Haustür.“ Um Punkt zehn Uhr treffen sich die Freundinnen im Café. Sie sitzen gern draußen in der Morgensonne und bestellen Kaffee und Croissants.",
      "translation": "On Sunday morning Lea and her best friend Marie would like to have breakfast together. Lea calls Marie and asks: 'How are you getting to the café?' Marie answers right away: 'I am riding my bike through the park in the morning.' Lea says: 'That sounds healthy! I prefer to take the bus, because my bus stop is right in front of the front door.' At ten o'clock sharp the friends meet in the café. They like sitting outside in the morning sun and order coffee and croissants.",
      "arabicTranslation": "صباح يوم الأحد تود ليا وصديقتها المقربة ماري تناول الإفطار معاً. تتصل ليا بماري وتسألها: «كيف ستصلين إلى المقهى؟» تجيب ماري فوراً: «سأذهب في الصباح بالدراجة عبر الحديقة.» تقول ليا: «هذا يبدو صحياً! أنا أفضل الركوب بالحافلة لأن محطة الحافلات أمام باب منزلي مباشرة.» في تمام الساعة العاشرة تلتقي الصديقتان في المقهى. تحبان الجلوس في الخارج تحت شمس الصباح وتطلبان قهوة وكرواسون.",
      "mcqQuestions": [
        {
          "q": "Wie kommt Marie zum Treffpunkt im Café?",
          "options": [
            "Mit dem Fahrrad durch den Park",
            "Mit dem Bus",
            "Mit dem Taxi",
            "Zu Fuß mit dem Hund"
          ],
          "answer": "Mit dem Fahrrad durch den Park",
          "explain": "Marie sagt deutlich: „Ich fahre am Vormittag mit dem Fahrrad durch den Park.“"
        },
        {
          "q": "Wo sitzen die beiden Freundinnen am liebsten?",
          "options": [
            "Draußen in der Morgensonne",
            "Drinnen an der Bar",
            "Im Bus",
            "Im Park auf einer Bank"
          ],
          "answer": "Draußen in der Morgensonne",
          "explain": "Im Text steht: „Sie sitzen gern draußen in der Morgensonne.“"
        }
      ],
      "writtenQuestions": [
        {
          "q": "Warum fährt Lea mit dem Bus zum Café?",
          "modelAnswer": "Weil ihre Bushaltestelle direkt vor der Haustür liegt.",
          "modelAnswerAr": "لأن محطة الحافلة تقع أمام باب بيتها مباشرة."
        },
        {
          "q": "Um wie viel Uhr treffen sich Lea und Marie im Café?",
          "modelAnswer": "Sie treffen sich um Punkt zehn Uhr.",
          "modelAnswerAr": "تلتقيان في تمام الساعة العاشرة."
        }
      ]
    }
  },
  {
    "day": 8,
    "title": "Dative Pronouns & Fixed Dative Verbs",
    "subtitle": "helfen, danken, schmecken, gefallen & mir/dir/ihm/ihr/uns/Ihnen",
    "arabicTitle": "ضمائر المجرور (Dativ) والأفعال التي تأخذ مجروراً دائماً",
    "vocab": [
      {
        "de": "helfen",
        "en": "to help",
        "ar": "يساعد",
        "cat": "verb",
        "grammar": "Irreg. Dative Verb • ich helfe, du hilfst, er/sie/es hilft, wir helfen | Perfekt: hat geholfen | Takes Dative"
      },
      {
        "de": "danken",
        "en": "to thank",
        "ar": "يشكر",
        "cat": "verb",
        "grammar": "Reg. Dative Verb • ich danke dir, wir danken Ihnen | Perfekt: hat gedankt | Takes Dative"
      },
      {
        "de": "schmecken",
        "en": "to taste (good)",
        "ar": "يعجب مذاقه / يستلذ",
        "cat": "verb",
        "grammar": "Dative Verb • Der Kuchen schmeckt mir gut | Takes Dative pronoun/noun"
      },
      {
        "de": "gefallen",
        "en": "to please / to like",
        "ar": "يعجب / يروق",
        "cat": "verb",
        "grammar": "Irreg. Dative Verb • ich gefalle, du gefällst, er gefällt | Perfekt: hat gefallen | Das gefällt mir"
      },
      {
        "de": "jemandem",
        "en": "to someone (dative marker)",
        "ar": "لشخص ما (علامة المجرور)",
        "cat": "phrase",
        "grammar": "Indefinite Dative Marker • Used in grammar dictionaries to show Dative requirement"
      },
      {
        "de": "die Hilfe",
        "en": "the help / assistance",
        "ar": "المساعدة / العون",
        "cat": "noun",
        "grammar": "Fem. Noun • Pl: die Hilfen | Usage: Vielen Dank für die Hilfe!"
      }
    ],
    "usefulPhrase": {
      "de": "Kann ich Ihnen helfen? — Ja bitte, ich suche …",
      "en": "Can I help you? [formal] — Yes please, I'm looking for …",
      "ar": "هل يمكنني مساعدة حضرتك؟ — نعم من فضلك، أبحث عن...",
      "why": "The standard question staff ask when you enter a bakery, café, or supermarket. Casually between friends: „Kann ich dir helfen?“"
    },
    "grammar": {
      "title": "Dative Pronouns & Fixed Dative Verbs",
      "summary": "In German, certain common verbs always require their object to be in the Dative case: helfen, danken, schmecken, gefallen, gehören. Personal pronouns change in the dative: ich ➔ mir, du ➔ dir, er/es ➔ ihm, sie ➔ ihr, wir ➔ uns, Sie ➔ Ihnen.",
      "tableHeaders": [
        "Person",
        "Nominative (Subject)",
        "Dative (Indirect Object)",
        "Example Sentence"
      ],
      "tableRows": [
        [
          "ich",
          "ich",
          "mir",
          "Der Kuchen schmeckt mir gut."
        ],
        [
          "du",
          "du",
          "dir",
          "Ich helfe dir gern."
        ],
        [
          "er / es",
          "er / es",
          "ihm",
          "Das Buch gehört ihm."
        ],
        [
          "sie (she)",
          "sie",
          "ihr",
          "Wir danken ihr von Herzen."
        ],
        [
          "wir",
          "wir",
          "uns",
          "Er hilft uns beim Umzug."
        ],
        [
          "Sie (formal)",
          "Sie",
          "Ihnen",
          "Kann ich Ihnen helfen?"
        ]
      ],
      "examples": [
        {
          "de": "Wie schmeckt dir der Apfelsaft? — Er schmeckt mir sehr gut!",
          "en": "How does the apple juice taste to you? — It tastes very good to me!",
          "ar": "كيف تجد طعم عصير التفاح؟ — يعجبني مذاقه كثيراً!"
        },
        {
          "de": "Ich kann dir morgen helfen.",
          "en": "I can help you tomorrow.",
          "ar": "أستطيع مساعدتك غداً."
        },
        {
          "de": "Am Wochenende kann mein Freund mir helfen.",
          "en": "At the weekend my friend can help me.",
          "ar": "في عطلة نهاية الأسبوع يمكن لصديقي مساعدتي."
        }
      ]
    },
    "quiz": [
      {
        "q": "Dative Pronoun Choice: Fill in the blanks with mir or dir: „Wie schmeckt _______ der Apfelsaft? — Er schmeckt _______ sehr gut!“",
        "options": [
          "dir ... mir",
          "dich ... mich",
          "du ... ich",
          "ihnen ... ihm"
        ],
        "answer": "dir ... mir",
        "explain": "Asking the other person takes „dir“; answering for yourself takes „mir“.",
        "speakDe": "Wie schmeckt dir der Apfelsaft? — Er schmeckt mir sehr gut!"
      },
      {
        "q": "Dative Verb + Modal Bracket: Fill in können and place helfen at the end: „Ich _______ [können] _______ [you, informal] morgen _______.“",
        "options": [
          "kann ... dir ... helfen",
          "können ... dich ... helfen",
          "kann ... du ... hilft",
          "kann ... dir ... geholfen"
        ],
        "answer": "kann ... dir ... helfen",
        "explain": "Modal verb „kann“ in Position 2, dative pronoun „dir“, infinitive „helfen“ parked at the end.",
        "speakDe": "Ich kann dir morgen helfen."
      },
      {
        "q": "Formal Interaction: Complete the shop assistant's question using the formal pronoun: „Kann ich _______ [you, formal] helfen?“",
        "options": [
          "Ihnen",
          "Sie",
          "dir",
          "ihr"
        ],
        "answer": "Ihnen",
        "explain": "Capitalized „Ihnen“ is the formal Dative pronoun for Sie.",
        "speakDe": "Kann ich Ihnen helfen?"
      },
      {
        "q": "Translation into German: Translate using am Wochenende, helfen, and mir: „At the weekend, my friend can help me.“",
        "options": [
          "Am Wochenende kann mein Freund mir helfen.",
          "Am Wochenende mein Freund kann mir helfen.",
          "Mein Freund kann helfen mich am Wochenende.",
          "Am Wochenende kann helfen mir mein Freund."
        ],
        "answer": "Am Wochenende kann mein Freund mir helfen.",
        "explain": "Time first „Am Wochenende“ triggers inversion: modal „kann“ (Pos 2), subject „mein Freund“, dative „mir“, verb „helfen“.",
        "speakDe": "Am Wochenende kann mein Freund mir helfen."
      }
    ],
    "translateQuiz": [
      {
        "type": "de_to_ar",
        "prompt": "Der Kuchen in diesem Café schmeckt mir wirklich ausgezeichnet.",
        "answer": "الكعكة في هذا المقهى يعجبني مذاقها حقاً بشكل ممتاز."
      },
      {
        "type": "de_to_ar",
        "prompt": "Kann ich Ihnen helfen? — Ja bitte, ich suche die Bäckerei.",
        "answer": "هل يمكنني مساعدة حضرتك؟ — نعم من فضلك، أبحث عن المخبز."
      },
      {
        "type": "ar_to_de",
        "prompt": "كيف تجد طعم القهوة؟ — إنها تعجبني كثيراً!",
        "answer": "Wie schmeckt dir der Kaffee? — Er schmeckt mir sehr gut!"
      },
      {
        "type": "ar_to_de",
        "prompt": "أستطيع مساعدتك يوم الاثنين بكل سرور.",
        "answer": "Ich kann dir am Montag gern helfen."
      },
      {
        "type": "en_to_de",
        "prompt": "Can I help you? [formal]",
        "answer": "Kann ich Ihnen helfen?"
      },
      {
        "type": "en_to_de",
        "prompt": "The cake tastes very good to him.",
        "answer": "Der Kuchen schmeckt ihm sehr gut."
      },
      {
        "type": "de_to_en",
        "prompt": "Wir danken dem Kellner für die freundliche Hilfe.",
        "answer": "We thank the waiter for the friendly help."
      },
      {
        "type": "de_to_en",
        "prompt": "Das neue Restaurant gefällt mir sehr gut.",
        "answer": "I like the new restaurant very much."
      }
    ],
    "readingPassage": {
      "title": "Hilfe beim Einkaufen",
      "text": "Frau Müller betritt am Montagmorgen eine traditionsreiche Bäckerei im Stadtzentrum. Die junge Verkäuferin hinter der Theke lächelt freundlich und fragt: „Guten Morgen! Kann ich Ihnen helfen?“ Frau Müller antwortet: „Ja bitte, welcher Kuchen schmeckt Ihren Kunden am besten?“ Die Verkäuferin empfiehlt sofort den gedeckten Apfelkuchen: „Dieser Kuchen schmeckt unseren Gästen immer fantastisch!“ Frau Müller kauft zwei Stücke und sagt dankbar: „Ich danke Ihnen herzlich für die Empfehlung!“ Zu Hause probiert sie ein Stück und der Kuchen schmeckt ihr hervorragend.",
      "translation": "Mrs. Müller enters a traditional bakery in the city center on Monday morning. The young sales assistant behind the counter smiles friendly and asks: 'Good morning! Can I help you?' Mrs. Müller answers: 'Yes please, which cake tastes best to your customers?' The sales assistant immediately recommends the covered apple cake: 'This cake always tastes fantastic to our guests!' Mrs. Müller buys two pieces and says gratefully: 'Thank you very much for the recommendation!' At home she tries a piece and the cake tastes superb to her.",
      "arabicTranslation": "تدخل السيدة مولر صباح الاثنين مخبزاً عريقاً في وسط المدينة. تبتسم البائعة الشابة خلف المنضدة بلطف وتسأل: «صباح الخير! هل يمكنني مساعدة حضرتك؟» تجيب السيدة مولر: «نعم من فضلك، أي كعكة تعجب زبائنكم أكثر؟» توصي البائعة فوراً بكعكة التفاح المغطاة: «هذه الكعكة تعجب ضيوفنا دائماً بشكل رائع!» تشتري السيدة مولر قطعتين وتقول بامتنان: «أشكر حضرتك من قلبي على التوصية!» في المنزل تتذوق قطعة ومذاق الكعكة يعجبها للغاية.",
      "mcqQuestions": [
        {
          "q": "Was fragt die Verkäuferin Frau Müller am Anfang?",
          "options": [
            "„Kann ich Ihnen helfen?“",
            "„Wie spät ist es?“",
            "„Wo wohnen Sie?“",
            "„Möchten Sie Kaffee?“"
          ],
          "answer": "„Kann ich Ihnen helfen?“",
          "explain": "Die Verkäuferin fragt höflich: „Guten Morgen! Kann ich Ihnen helfen?“"
        },
        {
          "q": "Welchen Kuchen empfiehlt die Verkäuferin?",
          "options": [
            "Den gedeckten Apfelkuchen",
            "Einen Schokoladenkuchen",
            "Ein Käsebrötchen",
            "Gar keinen"
          ],
          "answer": "Den gedeckten Apfelkuchen",
          "explain": "Die Verkäuferin empfiehlt sofort den gedeckten Apfelkuchen."
        }
      ],
      "writtenQuestions": [
        {
          "q": "Wem dankt Frau Müller herzlich für die Empfehlung?",
          "modelAnswer": "Sie dankt der Verkäuferin herzlich.",
          "modelAnswerAr": "شكرت البائعة من قلبها."
        },
        {
          "q": "Wie schmeckt der Apfelkuchen Frau Müller zu Hause?",
          "modelAnswer": "Der Kuchen schmeckt ihr hervorragend.",
          "modelAnswerAr": "كان مذاق الكعكة ممتازاً بالنسبة لها."
        }
      ]
    }
  },
  {
    "day": 9,
    "title": "Dual-Object Sentences (Dative Person + Accusative Thing)",
    "subtitle": "geben, bringen, zeigen • Wem? before Wen oder was?",
    "arabicTitle": "الجمل ذات المفعولين: المجرور للشخص أولاً ثم المنصوب للشيء",
    "vocab": [
      {
        "de": "geben",
        "en": "to give",
        "ar": "يعطي",
        "cat": "verb",
        "grammar": "Irreg. Verb • ich gebe, du gibst, er/sie/es gibt, wir geben | Perfekt: hat gegeben | Dual-object verb"
      },
      {
        "de": "bringen",
        "en": "to bring",
        "ar": "يحضر / يجلب",
        "cat": "verb",
        "grammar": "Irreg. Verb • ich bringe, du bringst, er bringt, wir bringen | Perfekt: hat gebracht | Dual-object verb"
      },
      {
        "de": "zeigen",
        "en": "to show",
        "ar": "يُري / يعرض",
        "cat": "verb",
        "grammar": "Reg. Verb • ich zeige, du zeigst, er zeigt, wir zeigen | Perfekt: hat gezeigt | Dual-object verb"
      },
      {
        "de": "die Speisekarte",
        "en": "the menu",
        "ar": "قائمة الطعام",
        "cat": "noun",
        "grammar": "Fem. Noun • Pl: die Speisekarten | Nom/Akk: die Speisekarte | Dat: der Speisekarte"
      },
      {
        "de": "die Quittung",
        "en": "the receipt",
        "ar": "إيصال الدفع / وصل الاستلام",
        "cat": "noun",
        "grammar": "Fem. Noun • Pl: die Quittungen | Nom/Akk: die Quittung | Dat: der Quittung"
      },
      {
        "de": "empfehlen",
        "en": "to recommend",
        "ar": "يوصي بـ / يقترح",
        "cat": "verb",
        "grammar": "Irreg. Verb • ich empfehle, du empfiehlst, er empfiehlt | Perfekt: hat empfohlen"
      }
    ],
    "usefulPhrase": {
      "de": "Könnten Sie mir bitte die Speisekarte bringen?",
      "en": "Could you please bring me the menu? [formal]",
      "ar": "هل يمكن لحضرتك من فضلك أن تحضر لي قائمة الطعام؟",
      "why": "The most polite, natural restaurant phrase in Germany when you need a menu or receipt. Casually: „Kannst du mir bitte … geben?“"
    },
    "grammar": {
      "title": "Dual-Object Sentences (Dative Person + Accusative Thing)",
      "summary": "When a sentence has both a person receiving something (indirect object) and an item handed over (direct object), German uses both cases: Verb + Dative (Person: Wem?) + Accusative (Thing: Was?). Golden rule of thumb: The Person comes before the Thing!",
      "tableHeaders": [
        "Role",
        "Case",
        "Question",
        "Examples in Action"
      ],
      "tableRows": [
        [
          "Receiver (Person)",
          "Dative",
          "Wem? (To whom?)",
          "mir, dir, ihm, ihr, uns, Ihnen / dem Kellner"
        ],
        [
          "Item (Thing)",
          "Accusative",
          "Wen oder was? (What?)",
          "den Kuchen, einen Tee, die Speisekarte, das Wasser"
        ],
        [
          "Dual-Object Order",
          "Person before Thing",
          "Dativ (Person) + Akkusativ (Sache)",
          "Der Kellner bringt mir die Rechnung."
        ],
        [
          "With Modal Bracket",
          "Modal in Pos 2, verb at end",
          "Könnten Sie mir bitte die Speisekarte bringen?",
          "هل يمكنك إحضار القائمة لي؟"
        ]
      ],
      "examples": [
        {
          "de": "Der Kellner bringt mir die Rechnung.",
          "en": "The waiter brings me (Dat) the bill (Akk).",
          "ar": "النادل يحضر لي الفاتورة."
        },
        {
          "de": "Ich gebe dir den Apfelsaft.",
          "en": "I give you (Dat) the apple juice (Akk Masc).",
          "ar": "أنا أعطيك عصير التفاح."
        },
        {
          "de": "Könnten Sie mir bitte die Speisekarte bringen?",
          "en": "Could you please bring me the menu?",
          "ar": "هل يمكنك إحضار قائمة الطعام لي؟"
        }
      ]
    },
    "quiz": [
      {
        "q": "Case Recognition (Dative Person + Accusative Thing): Fill in the blanks: „Ich gebe _______ [you: dir/dich] _______ [der Tee: den/dem] .“",
        "options": [
          "dir ... den Tee",
          "dich ... den Tee",
          "dir ... dem Tee",
          "dich ... der Tee"
        ],
        "answer": "dir ... den Tee",
        "explain": "Person receiving takes dative „dir“; the thing handed over is masculine accusative „den Tee“.",
        "speakDe": "Ich gebe dir den Tee."
      },
      {
        "q": "Modal Bracket Order: Arrange these words into a natural request: (bringen / Sie / können / mir / die Rechnung / bitte / ?)",
        "options": [
          "Können Sie mir bitte die Rechnung bringen?",
          "Können bringen Sie mir die Rechnung bitte?",
          "Sie können mir bitte bringen die Rechnung?",
          "Bringen können Sie mir bitte die Rechnung?"
        ],
        "answer": "Können Sie mir bitte die Rechnung bringen?",
        "explain": "Modal verb first in a question; dative person „mir“; accusative item „die Rechnung“; infinitive „bringen“ at the end.",
        "speakDe": "Können Sie mir bitte die Rechnung bringen?"
      },
      {
        "q": "Pronoun Choice: Choose the correct Dative pronoun: „Der Kellner zeigt [ ihn / ihm ] die Speisekarte.“",
        "options": [
          "ihm",
          "ihn",
          "er",
          "ihnen"
        ],
        "answer": "ihm",
        "explain": "„ihm“ is the dative pronoun for „he/him“ (der Mann / der Gast).",
        "speakDe": "Der Kellner zeigt ihm die Speisekarte."
      },
      {
        "q": "Translation into German: Translate using bringen, mir, and ein Brötchen: „Can you bring me a bread roll?“",
        "options": [
          "Kannst du mir ein Brötchen bringen?",
          "Kannst du mich ein Brötchen bringen?",
          "Kannst du mir einen Brötchen bringen?",
          "Kannst du bringen mir ein Brötchen?"
        ],
        "answer": "Kannst du mir ein Brötchen bringen?",
        "explain": "„das Brötchen“ stays „ein Brötchen“ in the neuter accusative; dative person is „mir“.",
        "speakDe": "Kannst du mir ein Brötchen bringen?"
      }
    ],
    "translateQuiz": [
      {
        "type": "de_to_ar",
        "prompt": "Könnten Sie mir bitte die Speisekarte bringen?",
        "answer": "هل يمكن لحضرتك من فضلك أن تحضر لي قائمة الطعام؟"
      },
      {
        "type": "de_to_ar",
        "prompt": "Der Kellner gibt dem Gast die Quittung nach dem Bezahlen.",
        "answer": "النادل يعطي الزبون إيصال الدفع بعد السداد."
      },
      {
        "type": "ar_to_de",
        "prompt": "أنا أعطيك عصير التفاح والخبز الصغير.",
        "answer": "Ich gebe dir den Apfelsaft und das Brötchen."
      },
      {
        "type": "ar_to_de",
        "prompt": "هل تستطيع أن تريني قائمة الطعام؟",
        "answer": "Kannst du mir die Speisekarte zeigen?"
      },
      {
        "type": "en_to_de",
        "prompt": "The waiter brings me the bill.",
        "answer": "Der Kellner bringt mir die Rechnung."
      },
      {
        "type": "en_to_de",
        "prompt": "Could you please show him the menu?",
        "answer": "Könnten Sie ihm bitte die Speisekarte zeigen?"
      },
      {
        "type": "de_to_en",
        "prompt": "Ich zeige dir gern das Foto von meinem Urlaub.",
        "answer": "I gladly show you the photo from my vacation."
      },
      {
        "type": "de_to_en",
        "prompt": "Kannst du uns bitte das Wasser bringen?",
        "answer": "Can you please bring us the water?"
      }
    ],
    "readingPassage": {
      "title": "Ein Abendessen im Restaurant",
      "text": "Herr Bergmann setzt sich am Abend an einen ruhigen Tisch im Restaurant zur Post. Er winkt dem Kellner freundlich zu: „Entschuldigung, könnten Sie mir bitte die Speisekarte bringen?“ Der Kellner nickt höflich: „Sehr gern, mein Herr!“ Nach zwei Minuten bringt der Kellner ihm die Speisekarte und empfiehlt die Spezialität des Hauses. Herr Bergmann bestellt gebratenen Fisch und eine Flasche Mineralwasser. Nach dem köstlichen Essen bezahlt er mit EC-Karte und der Kellner gibt ihm sofort die Quittung.",
      "translation": "Mr. Bergmann sits down at a quiet table in the restaurant 'Zur Post' in the evening. He waves politely to the waiter: 'Excuse me, could you please bring me the menu?' The waiter nods courteously: 'With pleasure, sir!' After two minutes the waiter brings him the menu and recommends the house specialty. Mr. Bergmann orders fried fish and a bottle of mineral water. After the delicious meal he pays by debit card and the waiter gives him the receipt right away.",
      "arabicTranslation": "يجلس السيد بيرغمان في المساء إلى طاولة هادئة في مطعم «تسور بوست». يلوح للنادل بلطف: «عفواً، هل يمكن لحضرتك من فضلك إحضار قائمة الطعام لي؟» يومئ النادل بأدب: «بكل سرور يا سيدي!» بعد دقيقتين يحضر له النادل قائمة الطعام ويوصي بوجبة المطعم المميزة. يطلب السيد بيرغمان سمكاً مقلياً وزجاجة ماء معدني. بعد الوجبة اللذيذة يدفع ببطاقة البنك ويعطيه النادل الإيصال فوراً.",
      "mcqQuestions": [
        {
          "q": "Worum bittet Herr Bergmann den Kellner am Anfang?",
          "options": [
            "Um die Speisekarte",
            "Sofort um die Rechnung",
            "Um ein Glas Apfelsaft",
            "Um ein Taxi"
          ],
          "answer": "Um die Speisekarte",
          "explain": "Herr Bergmann fragt: „Entschuldigung, könnten Sie mir bitte die Speisekarte bringen?“"
        },
        {
          "q": "Was gibt der Kellner Herrn Bergmann nach dem Bezahlen?",
          "options": [
            "Die Quittung",
            "Eine neue Speisekarte",
            "Ein Stück Kuchen",
            "Einen Gutschein"
          ],
          "answer": "Die Quittung",
          "explain": "Im Text steht: „... und der Kellner gibt ihm sofort die Quittung.“"
        }
      ],
      "writtenQuestions": [
        {
          "q": "Was bringt der Kellner Herrn Bergmann nach zwei Minuten?",
          "modelAnswer": "Der Kellner bringt ihm die Speisekarte.",
          "modelAnswerAr": "أحضر له النادل قائمة الطعام."
        },
        {
          "q": "Wie bezahlt Herr Bergmann das Essen?",
          "modelAnswer": "Er bezahlt mit EC-Karte.",
          "modelAnswerAr": "دفع بواسطة بطاقة البنك الإلكترونية."
        }
      ]
    }
  },
  {
    "day": 10,
    "title": "Conversational Past Tense (Perfekt with haben)",
    "subtitle": "haben + Partizip II (gemacht, gekauft, gehört, eingekauft)",
    "arabicTitle": "زمن الماضي في المحادثة الألمانية (Perfekt مع haben)",
    "vocab": [
      {
        "de": "gestern",
        "en": "yesterday",
        "ar": "أمس / البارحة",
        "cat": "phrase",
        "grammar": "Temporal Adverb • Indicates past time (triggers Perfekt in conversation)"
      },
      {
        "de": "letzte Woche",
        "en": "last week",
        "ar": "الأسبوع الماضي",
        "cat": "phrase",
        "grammar": "Temporal Phrase • Commonly used with past tense (Perfekt)"
      },
      {
        "de": "kaufen ➔ gekauft",
        "en": "to buy ➔ bought",
        "ar": "اشترى ➔ اشترى في الماضي",
        "cat": "verb",
        "grammar": "Regular Partizip II • ge + kauf + t | Aux: haben (hat gekauft)"
      },
      {
        "de": "hören ➔ gehört",
        "en": "to hear / listen ➔ heard",
        "ar": "سمع / استمع ➔ استمع في الماضي",
        "cat": "verb",
        "grammar": "Regular Partizip II • ge + hör + t | Aux: haben (hat gehört)"
      },
      {
        "de": "gemacht",
        "en": "done / made (from machen)",
        "ar": "فعل / صنع (من الفعل machen)",
        "cat": "verb",
        "grammar": "Partizip II • ge + mach + t | Aux: haben (hat gemacht)"
      },
      {
        "de": "fragen ➔ gefragt",
        "en": "to ask ➔ asked",
        "ar": "سأل ➔ سأل في الماضي",
        "cat": "verb",
        "grammar": "Regular Partizip II • ge + frag + t | Aux: haben (hat gefragt)"
      }
    ],
    "usefulPhrase": {
      "de": "Was hast du gestern gemacht?",
      "en": "What did you do yesterday?",
      "ar": "ماذا فعلت أمس؟",
      "why": "The universal conversational opener when catching up with friends or colleagues on Monday morning."
    },
    "grammar": {
      "title": "The Conversational Past Tense (Perfekt with haben)",
      "summary": "In spoken German, almost all past events are described using the Perfekt tense. It forms a sentence bracket: conjugated helping verb „haben“ sits in Position 2, while the past participle (Partizip II) lands at the very end. Regular participles: ge- + stem + -t (machen ➔ gemacht, kaufen ➔ gekauft). Separable verbs insert -ge- in the middle (einkaufen ➔ eingekauft).",
      "tableHeaders": [
        "Infinitive",
        "Stem",
        "Partizip II",
        "Example Sentence in Perfekt"
      ],
      "tableRows": [
        [
          "machen",
          "mach-",
          "gemacht",
          "Was hast du gestern gemacht?"
        ],
        [
          "kaufen",
          "kauf-",
          "gekauft",
          "Ich habe gestern einen Kuchen gekauft."
        ],
        [
          "hören",
          "hör-",
          "gehört",
          "Wir haben im Café schöne Musik gehört."
        ],
        [
          "fragen",
          "frag-",
          "gefragt",
          "Er hat den Kellner nach der Rechnung gefragt."
        ],
        [
          "einkaufen (separable)",
          "kauf-",
          "eingekauft",
          "Sie hat am Abend im Supermarkt eingekauft."
        ]
      ],
      "examples": [
        {
          "de": "Ich habe gestern einen Apfelsaft gekauft.",
          "en": "I bought an apple juice yesterday. (Accusative masculine)",
          "ar": "اشتريت عصير تفاح أمس."
        },
        {
          "de": "Wir haben gestern im Café Musik gehört.",
          "en": "We listened to music in the café yesterday. (TeKaMoLo)",
          "ar": "استمعنا إلى الموسيقى في المقهى أمس."
        },
        {
          "de": "Er hat am Abend im Supermarkt eingekauft.",
          "en": "He shopped at the supermarket in the evening.",
          "ar": "هو تسوق في المساء في السوبرماركت."
        }
      ]
    },
    "quiz": [
      {
        "q": "Regular Partizip II Formation: Build the past participle for fragen (to ask): ge + frag + t = _______",
        "options": [
          "gefragt",
          "gefragen",
          "gefrägt",
          "befragt"
        ],
        "answer": "gefragt",
        "explain": "Regular verbs add ge- prefix and -t ending to the verb stem: ge + frag + t = gefragt.",
        "speakDe": "Ich habe den Kellner gefragt."
      },
      {
        "q": "Bracket Completion: Fill in the correct form of haben and put gemacht at the end: „Was _______ du gestern _______?“",
        "options": [
          "hast ... gemacht",
          "haben ... gemacht",
          "bist ... gemacht",
          "hat ... machen"
        ],
        "answer": "hast ... gemacht",
        "explain": "For „du“, conjugated „hast“ takes Position 2, and participle „gemacht“ lands at the very end.",
        "speakDe": "Was hast du gestern gemacht?"
      },
      {
        "q": "Sentence Rearranging (Past Tense Bracket): Put the elements into the correct sequence: (einen Tee / hat / im Café / er / gekauft)",
        "options": [
          "Er hat im Café einen Tee gekauft.",
          "Er hat gekauft im Café einen Tee.",
          "Einen Tee er hat gekauft im Café.",
          "Hat er im Café gekauft einen Tee."
        ],
        "answer": "Er hat im Café einen Tee gekauft.",
        "explain": "Subject „Er“ + helping verb „hat“ (Pos 2) + place „im Café“ + object „einen Tee“ + participle „gekauft“ at the end.",
        "speakDe": "Er hat im Café einen Tee gekauft."
      },
      {
        "q": "Translation into German: Translate using gestern, haben, einen Kuchen, and gekauft: „Yesterday, I bought a cake.“",
        "options": [
          "Gestern habe ich einen Kuchen gekauft.",
          "Gestern ich habe einen Kuchen gekauft.",
          "Ich habe gekauft gestern einen Kuchen.",
          "Gestern habe gekauft ich einen Kuchen."
        ],
        "answer": "Gestern habe ich einen Kuchen gekauft.",
        "explain": "Starting with „Gestern“ triggers inversion: „habe“ in Pos 2, followed by subject „ich“, and „gekauft“ at the end.",
        "speakDe": "Gestern habe ich einen Kuchen gekauft."
      }
    ],
    "translateQuiz": [
      {
        "type": "de_to_ar",
        "prompt": "Was hast du gestern am Abend gemacht?",
        "answer": "ماذا فعلت أمس في المساء؟"
      },
      {
        "type": "de_to_ar",
        "prompt": "Ich habe gestern im Supermarkt frisches Brot und Tee gekauft.",
        "answer": "اشتريت أمس خبزاً طازجاً وشاياً من السوبرماركت."
      },
      {
        "type": "ar_to_de",
        "prompt": "أمس اشتريت كعكة في المخبز.",
        "answer": "Gestern habe ich einen Kuchen in der Bäckerei gekauft."
      },
      {
        "type": "ar_to_de",
        "prompt": "هل استمعت إلى الموسيقى أمس في المقهى؟",
        "answer": "Hast du gestern im Café Musik gehört?"
      },
      {
        "type": "en_to_de",
        "prompt": "What did you do yesterday?",
        "answer": "Was hast du gestern gemacht?"
      },
      {
        "type": "en_to_de",
        "prompt": "He shopped at the supermarket last week.",
        "answer": "Er hat letzte Woche im Supermarkt eingekauft."
      },
      {
        "type": "de_to_en",
        "prompt": "Wir haben gestern die Rechnung im Restaurant bezahlt.",
        "answer": "We paid the bill in the restaurant yesterday."
      },
      {
        "type": "de_to_en",
        "prompt": "Ich habe den Kellner nach der Speisekarte gefragt.",
        "answer": "I asked the waiter for the menu."
      }
    ],
    "readingPassage": {
      "title": "Ein Rückblick auf das Wochenende",
      "text": "Am Montagmorgen treffen sich Florian und Sophie in der Kaffeeküche im Büro. Florian nimmt eine Tasse Kaffee und fragt interessiert: „Was hast du am Wochenende gemacht?“ Sophie erzählt begeistert: „Ich habe am Samstag im Supermarkt eingekauft und danach meine beste Freundin getroffen. Wir haben im Café einen leckeren Kuchen gegessen und schöne Musik gehört. Und gestern habe ich mich im Park ausgeruht.“ Florian lächelt: „Das klingt nach einem wunderbaren Wochenende!“",
      "translation": "On Monday morning Florian and Sophie meet in the office coffee kitchen. Florian takes a cup of coffee and asks with interest: 'What did you do at the weekend?' Sophie recounts enthusiastically: 'I shopped at the supermarket on Saturday and then met my best friend. We ate a delicious cake in the café and listened to nice music. And yesterday I rested in the park.' Florian smiles: 'That sounds like a wonderful weekend!'",
      "arabicTranslation": "صباح الاثنين يلتقي فلوريان وصوفي في ركن القهوة بالمكتب. يأخذ فلوريان فنجان قهوة ويسأل باهتمام: «ماذا فعلت في عطلة نهاية الأسبوع؟» تروي صوفي بحماس: «لقد تسوقت يوم السبت في السوبرماركت ثم قابلت أعز صديقاتي. لقد أكلنا كعكة لذيذة في المقهى واستمعنا إلى موسيقى جميلة. وأمس استرحت في الحديقة.» يبتسم فلوريان: «هذا يبدو وكأنه عطلة نهاية أسبوع رائعة!»",
      "mcqQuestions": [
        {
          "q": "Was fragt Florian am Montagmorgen in der Kaffeeküche?",
          "options": [
            "„Was hast du am Wochenende gemacht?“",
            "„Wie viel kostet der Kuchen?“",
            "„Hast du die Rechnung bezahlt?“",
            "„Wo ist mein Terminkalender?“"
          ],
          "answer": "„Was hast du am Wochenende gemacht?“",
          "explain": "Florian fragt interessiert: „Was hast du am Wochenende gemacht?“"
        },
        {
          "q": "Was haben Sophie und ihre Freundin im Café gemacht?",
          "options": [
            "Kuchen gegessen und schöne Musik gehört",
            "Nur am Laptop gearbeitet",
            "Den Kellner gesucht",
            "Tee verkauft"
          ],
          "answer": "Kuchen gegessen und schöne Musik gehört",
          "explain": "Sophie erzählt: „Wir haben im Café einen leckeren Kuchen gegessen und schöne Musik gehört.“"
        }
      ],
      "writtenQuestions": [
        {
          "q": "Wann hat Sophie im Supermarkt eingekauft?",
          "modelAnswer": "Sophie hat am Samstag im Supermarkt eingekauft.",
          "modelAnswerAr": "تسوقت صوفي يوم السبت في السوبرماركت."
        },
        {
          "q": "Wo hat sich Sophie gestern ausgeruht?",
          "modelAnswer": "Sie hat sich gestern im Park ausgeruht.",
          "modelAnswerAr": "استراحت أمس في الحديقة."
        }
      ]
    }
  }
];
