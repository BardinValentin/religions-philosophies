const CURRENT_YEAR = new Date().getFullYear();

const RELIGION_SPREAD = [
  // ─── ZOROASTRIAN ──────────────────────────────────────
  {
    id: 'zoroastrian',
    label: 'Зороастризм',
    color: '#d4a04a',
    areas: [
      // Persian heartland (Iran, parts of Iraq/Afghanistan)
      { coords: [[25, 44], [28, 48], [30, 52], [32, 54], [36, 56], [38, 52], [40, 48], [38, 44], [34, 42], [30, 40], [28, 42]], from: -600, to: 650 },
      // Extended influence under Achaemenids
      { coords: [[32, 36], [36, 38], [40, 40], [42, 44], [40, 48], [38, 52], [36, 56], [32, 58], [28, 56], [24, 52], [26, 48], [28, 44], [30, 40]], from: -550, to: 650 },
    ]
  },

  // ─── VEDIC ────────────────────────────────────────────
  {
    id: 'vedic',
    label: 'Ведическая религия',
    color: '#c4a07a',
    areas: [
      // Punjab and Indus valley
      { coords: [[28, 66], [30, 72], [34, 74], [36, 78], [32, 80], [28, 78], [24, 76], [22, 72], [24, 68], [26, 66]], from: -1500, to: -200 },
      // Ganges plain expansion
      { coords: [[22, 78], [26, 80], [28, 84], [26, 86], [22, 84], [20, 80]], from: -1000, to: -200 },
    ]
  },

  // ─── JUDAISM (diaspora — accurate regions) ────────────
  {
    id: 'judaism',
    label: 'Иудаизм',
    color: '#7a9ad4',
    areas: [
      // Ancient Israel / Canaan
      { coords: [[29.5, 34.2], [33.5, 34.2], [33.5, 36.5], [31.5, 36.5], [31.5, 35.5], [29.5, 35.5]], from: -1000, to: CURRENT_YEAR },
      // Modern Israel
      { coords: [[29.5, 34.2], [33.5, 34.2], [33.5, 36.5], [31.5, 36.5], [31.5, 35.5], [29.5, 35.5]], from: 1948, to: CURRENT_YEAR },
    ]
  },

  // ─── HINDUISM ─────────────────────────────────────────
  {
    id: 'hinduism',
    label: 'Индуизм',
    color: '#c48a3a',
    areas: [
      // Early Hinduism (Ganges plain, alongside Vedic)
      { coords: [[22, 78], [26, 78], [28, 82], [26, 86], [22, 84], [20, 80]], from: -800, to: -200 },
      // Indian subcontinent (full expansion)
      { coords: [[6, 76], [8, 80], [12, 82], [20, 88], [28, 88], [30, 84], [32, 78], [30, 72], [28, 68], [22, 68], [16, 70], [10, 72], [6, 76]], from: -200, to: CURRENT_YEAR },
      // Nepal
      { coords: [[26, 80], [28, 80], [30, 84], [28, 88], [26, 88]], from: 0, to: CURRENT_YEAR },
      // Bali
      { coords: [[-8, 114], [-8, 116], [-9, 116], [-9, 114]], from: 1000, to: CURRENT_YEAR },
    ]
  },

  // ─── BUDDHISM ─────────────────────────────────────────
  {
    id: 'buddhism',
    label: 'Буддизм',
    color: '#d4a04a',
    areas: [
      // India (origin)
      { coords: [[20, 80], [26, 84], [28, 88], [24, 90], [18, 88], [16, 84], [20, 80]], from: -400, to: 1200 },
      // Sri Lanka
      { coords: [[6, 79], [10, 80], [10, 82], [6, 82]], from: -200, to: CURRENT_YEAR },
      // Southeast Asia (Myanmar, Thailand, Cambodia, Laos)
      { coords: [[10, 96], [14, 100], [20, 100], [22, 104], [18, 106], [14, 108], [10, 106], [8, 102], [6, 98], [8, 96]], from: 500, to: CURRENT_YEAR },
      // Tibet / Mongolia
      { coords: [[28, 84], [34, 88], [36, 92], [40, 96], [44, 94], [48, 90], [48, 86], [44, 84], [38, 82], [34, 80], [30, 82]], from: 700, to: CURRENT_YEAR },
      // China (Mahayana)
      { coords: [[22, 100], [28, 100], [34, 104], [38, 108], [40, 114], [38, 118], [34, 120], [30, 116], [26, 112], [22, 108], [20, 104]], from: 100, to: CURRENT_YEAR },
      // Korea
      { coords: [[34, 124], [38, 126], [40, 130], [38, 132], [34, 128]], from: 400, to: CURRENT_YEAR },
      // Japan
      { coords: [[32, 130], [36, 130], [40, 134], [42, 138], [38, 142], [34, 140], [32, 136]], from: 600, to: CURRENT_YEAR },
      // Bhutan
      { coords: [[26, 88], [28, 88], [28, 90], [26, 90]], from: 700, to: CURRENT_YEAR },
    ]
  },

  // ─── JAINISM ────────────────────────────────────────────
  {
    id: 'jainism',
    label: 'Джайнизм',
    color: '#c09860',
    areas: [
      { coords: [[22, 70], [24, 72], [26, 74], [24, 76], [22, 76], [20, 74]], from: -500, to: CURRENT_YEAR },
      { coords: [[20, 72], [22, 72], [22, 74], [20, 74]], from: -500, to: CURRENT_YEAR },
    ]
  },

  // ─── SIKHISM ────────────────────────────────────────────
  {
    id: 'sikhism',
    label: 'Сикхизм',
    color: '#b0a070',
    areas: [
      { coords: [[30, 72], [32, 74], [32, 76], [30, 76], [28, 74]], from: 1500, to: CURRENT_YEAR },
      { coords: [[30, 73], [31, 74], [31, 75], [30, 75], [29, 74]], from: 1500, to: CURRENT_YEAR },
    ]
  },

  // ─── CHRISTIANITY ─────────────────────────────────────
  {
    id: 'christianity',
    label: 'Христианство',
    color: '#c48a7a',
    areas: [
      // Origin — Israel
      { coords: [[29.5, 34.2], [33.5, 34.2], [33.5, 36.5], [29.5, 36.5]], from: 33, to: CURRENT_YEAR },
      // Southern Europe
      { coords: [[35, -10], [45, -10], [48, -5], [50, 0], [48, 5], [45, 10], [42, 15], [38, 20], [36, 25], [36, 20], [36, 15], [35, 10], [35, 0], [35, -5]], from: 100, to: CURRENT_YEAR },
      // Western / Central Europe
      { coords: [[45, -10], [55, -10], [58, -5], [60, 0], [62, 5], [60, 10], [55, 15], [50, 10], [48, 5], [48, 0], [45, -5]], from: 500, to: CURRENT_YEAR },
      // British Isles
      { coords: [[50, -8], [58, -8], [60, -5], [60, 0], [58, 2], [55, 0], [50, 0], [50, -5]], from: 500, to: CURRENT_YEAR },
      // Scandinavia
      { coords: [[55, 4], [65, 4], [70, 10], [70, 20], [65, 30], [60, 28], [55, 20], [55, 10]], from: 900, to: CURRENT_YEAR },
      // Eastern Europe
      { coords: [[45, 20], [50, 20], [55, 25], [60, 30], [65, 35], [65, 45], [60, 50], [55, 55], [50, 55], [45, 50], [42, 45], [42, 35], [45, 28]], from: 900, to: CURRENT_YEAR },
      // Russia / Siberia
      { coords: [[50, 50], [60, 50], [70, 55], [70, 80], [60, 100], [55, 110], [50, 100], [48, 80], [48, 60], [50, 55]], from: 1000, to: CURRENT_YEAR },
      // North America
      { coords: [[25, -130], [50, -130], [60, -115], [65, -90], [60, -70], [50, -65], [40, -75], [30, -80], [25, -80], [25, -100]], from: 1500, to: CURRENT_YEAR },
      // Mexico / Central America
      { coords: [[8, -100], [25, -100], [25, -85], [20, -80], [15, -75], [10, -80], [8, -90]], from: 1500, to: CURRENT_YEAR },
      // South America
      { coords: [[-55, -77], [5, -77], [10, -70], [12, -60], [10, -50], [5, -40], [0, -35], [-5, -35], [-10, -40], [-20, -45], [-25, -55], [-35, -60], [-45, -65], [-55, -70]], from: 1500, to: CURRENT_YEAR },
      // Sub-Saharan Africa
      { coords: [[-35, 14], [-30, 18], [-25, 22], [-15, 30], [-5, 35], [0, 36], [5, 34], [10, 30], [15, 25], [20, 20], [20, 10], [15, 0], [10, -5], [5, -10], [0, -5], [-5, 0], [-10, 5], [-15, 10], [-20, 12], [-25, 14], [-30, 16]], from: 1500, to: CURRENT_YEAR },
      // Philippines
      { coords: [[4, 118], [8, 118], [14, 120], [18, 122], [20, 126], [16, 128], [10, 126], [5, 124], [4, 120]], from: 1500, to: CURRENT_YEAR },
      // Australia
      { coords: [[-38, 114], [-35, 114], [-30, 115], [-25, 130], [-20, 145], [-20, 150], [-30, 150], [-35, 145], [-40, 140], [-40, 120], [-38, 114]], from: 1700, to: CURRENT_YEAR },
      // New Zealand
      { coords: [[-48, 166], [-44, 166], [-40, 170], [-40, 176], [-44, 178], [-48, 176], [-48, 170]], from: 1800, to: CURRENT_YEAR },
    ]
  },

  // ─── ISLAM ────────────────────────────────────────────
  {
    id: 'islam',
    label: 'Ислам',
    color: '#5a9a5a',
    areas: [
      // Arabia (origin)
      { coords: [[15, 38], [20, 40], [28, 42], [30, 46], [28, 50], [24, 52], [20, 48], [16, 44], [14, 40]], from: 622, to: CURRENT_YEAR },
      // Middle East
      { coords: [[30, 30], [34, 32], [38, 34], [40, 38], [38, 42], [36, 46], [34, 50], [30, 48], [28, 44], [28, 40], [30, 36]], from: 632, to: CURRENT_YEAR },
      // North Africa
      { coords: [[20, -15], [30, -10], [34, 0], [32, 10], [30, 15], [32, 20], [32, 30], [30, 34], [22, 34], [18, 30], [15, 20], [15, 10], [18, 0], [20, -10]], from: 640, to: CURRENT_YEAR },
      // Anatolia / Balkans
      { coords: [[36, 26], [42, 26], [48, 30], [48, 36], [44, 40], [40, 42], [36, 38], [36, 32]], from: 650, to: CURRENT_YEAR },
      // Caucasus
      { coords: [[38, 44], [42, 44], [44, 48], [42, 52], [38, 50], [38, 46]], from: 650, to: CURRENT_YEAR },
      // Iran / Central Asia
      { coords: [[32, 44], [38, 44], [40, 48], [42, 52], [40, 56], [38, 60], [36, 64], [32, 62], [28, 58], [28, 52], [30, 48]], from: 650, to: CURRENT_YEAR },
      // South Asia (Pakistan, Bangladesh, parts India)
      { coords: [[8, 72], [10, 76], [22, 76], [28, 70], [32, 64], [34, 68], [36, 72], [34, 76], [28, 80], [24, 80], [20, 82], [16, 80], [12, 78], [8, 76]], from: 700, to: CURRENT_YEAR },
      // East Africa (Somalia, Tanzania, Kenya coast)
      { coords: [[-12, 36], [-5, 36], [0, 40], [5, 42], [10, 44], [12, 48], [10, 52], [5, 50], [0, 45], [-5, 42], [-10, 40]], from: 700, to: CURRENT_YEAR },
      // West Africa (Sahel)
      { coords: [[8, -15], [15, -15], [20, -10], [20, 0], [18, 10], [15, 15], [10, 15], [8, 10], [8, 0], [8, -10]], from: 1000, to: CURRENT_YEAR },
      // Horn of Africa
      { coords: [[5, 36], [12, 36], [15, 40], [15, 44], [12, 48], [8, 48], [5, 44], [5, 40]], from: 700, to: CURRENT_YEAR },
      // Indonesia / Malaysia
      { coords: [[-10, 96], [0, 96], [6, 98], [8, 104], [6, 108], [4, 112], [0, 110], [-5, 108], [-10, 104], [-10, 100]], from: 1200, to: CURRENT_YEAR },
      // Philippines (Mindanao)
      { coords: [[4, 120], [8, 120], [10, 124], [8, 126], [4, 124]], from: 1300, to: CURRENT_YEAR },
    ]
  },

  // ─── TAOISM ───────────────────────────────────────────
  {
    id: 'taoism',
    label: 'Даосизм',
    color: '#7aa87a',
    areas: [
      // China proper
      { coords: [[20, 100], [26, 100], [32, 102], [36, 106], [38, 110], [38, 116], [34, 120], [28, 118], [24, 114], [22, 108], [20, 104]], from: -500, to: CURRENT_YEAR },
    ]
  },

  // ─── CONFUCIANISM ─────────────────────────────────────
  {
    id: 'confucianism',
    label: 'Конфуцианство',
    color: '#8a7a5a',
    areas: [
      // China
      { coords: [[20, 100], [28, 100], [36, 104], [40, 108], [40, 116], [36, 120], [28, 120], [22, 114], [20, 108]], from: -500, to: CURRENT_YEAR },
      // Korea
      { coords: [[34, 124], [38, 126], [40, 130], [38, 132], [34, 130]], from: 400, to: CURRENT_YEAR },
      // Vietnam
      { coords: [[10, 104], [14, 104], [18, 106], [18, 110], [14, 110], [10, 108]], from: 0, to: CURRENT_YEAR },
      // Japan (influence)
      { coords: [[32, 130], [36, 130], [38, 134], [36, 138], [34, 136], [32, 132]], from: 600, to: CURRENT_YEAR },
    ]
  },

  // ─── SHINTO ───────────────────────────────────────────
  {
    id: 'shinto',
    label: 'Синтоизм',
    color: '#c47a7a',
    areas: [
      // Japan main islands
      { coords: [[30, 129], [36, 129], [40, 133], [42, 138], [38, 142], [34, 140], [30, 136], [30, 130]], from: -300, to: CURRENT_YEAR },
      // Hokkaido
      { coords: [[42, 140], [44, 140], [46, 144], [44, 146], [42, 144]], from: 500, to: CURRENT_YEAR },
    ]
  },

  // ─── EGYPTIAN ─────────────────────────────────────────
  {
    id: 'egyptian',
    label: 'Древний Египет',
    color: '#c4a04a',
    areas: [
      // Nile valley and delta
      { coords: [[22, 30], [26, 32], [28, 32], [30, 34], [30, 36], [28, 36], [24, 34], [22, 32], [22, 30]], from: -3000, to: 600 },
      // Nubia / Upper Egypt
      { coords: [[20, 30], [22, 30], [22, 34], [20, 34]], from: -2000, to: 400 },
    ]
  },

  // ─── MESOPOTAMIAN ─────────────────────────────────────
  {
    id: 'mesopotamian',
    label: 'Месопотамия',
    color: '#8a9a6a',
    areas: [
      // Tigris-Euphrates valley
      { coords: [[30, 40], [34, 40], [36, 44], [36, 48], [32, 48], [30, 46], [30, 42]], from: -3000, to: 600 },
      // Assyrian heartland
      { coords: [[34, 40], [38, 40], [40, 44], [38, 46], [36, 46], [36, 42]], from: -2000, to: 600 },
    ]
  },

  // ─── HELLENISTIC ──────────────────────────────────────
  {
    id: 'hellenistic',
    label: 'Эллинизм',
    color: '#7a8ab4',
    areas: [
      // Greece and Aegean
      { coords: [[34, 20], [38, 22], [40, 24], [42, 22], [42, 26], [40, 28], [38, 26], [36, 24], [34, 22]], from: -500, to: 100 },
      // Ionia (Asia Minor)
      { coords: [[36, 26], [38, 26], [40, 28], [38, 30], [36, 28]], from: -500, to: 100 },
      // Hellenistic expansion (Alexander's empire)
      { coords: [[30, 25], [34, 28], [38, 30], [40, 34], [38, 38], [36, 42], [32, 44], [30, 40], [30, 35], [30, 30]], from: -330, to: 100 },
    ]
  },

  // ─── ROMAN PAGAN ──────────────────────────────────────
  {
    id: 'roman_pagan',
    label: 'Римская религия',
    color: '#b48a6a',
    areas: [
      // Italy
      { coords: [[38, 8], [42, 8], [44, 10], [46, 12], [46, 16], [44, 18], [42, 18], [40, 16], [38, 14], [38, 10]], from: -500, to: 400 },
      // Roman Empire at its peak
      { coords: [[30, -8], [36, -5], [40, 0], [44, 4], [48, 10], [48, 20], [44, 24], [40, 28], [36, 30], [32, 32], [30, 28], [30, 20], [30, 10], [30, 0], [30, -5]], from: -100, to: 400 },
      // North Africa (Roman provinces)
      { coords: [[30, -5], [34, -5], [36, 0], [36, 10], [34, 12], [32, 10], [30, 8], [30, 0]], from: -100, to: 400 },
    ]
  },

  // ─── NORSE ────────────────────────────────────────────
  {
    id: 'norse',
    label: 'Скандинавская',
    color: '#6a8a9a',
    areas: [
      // Scandinavia
      { coords: [[56, 4], [62, 4], [68, 10], [70, 20], [64, 30], [60, 28], [56, 20], [56, 10], [56, 6]], from: 200, to: 1100 },
      // Iceland
      { coords: [[63, -24], [66, -24], [66, -18], [63, -18]], from: 800, to: 1100 },
      // Norse settlements in British Isles
      { coords: [[54, -6], [58, -6], [58, 0], [54, 0]], from: 800, to: 1100 },
    ]
  },

  // ─── SLAVIC PAGAN ─────────────────────────────────────
  {
    id: 'slavic_pagan',
    label: 'Славянская',
    color: '#9a7a5a',
    areas: [
      // Eastern Europe (Slavic range)
      { coords: [[44, 14], [50, 14], [56, 18], [60, 24], [60, 32], [56, 36], [52, 34], [48, 30], [46, 26], [44, 22], [44, 16]], from: 500, to: 1000 },
      // Balkans (South Slavs)
      { coords: [[42, 16], [46, 16], [48, 20], [48, 24], [46, 26], [42, 24], [40, 20], [42, 18]], from: 600, to: 1000 },
    ]
  },

  // ─── PRE-ISLAMIC ARABIA ───────────────────────────────
  {
    id: 'pre_islamic_arabia',
    label: 'Доисламская Аравия',
    color: '#8a7a4a',
    areas: [
      // Arabian Peninsula
      { coords: [[12, 38], [16, 40], [20, 42], [26, 44], [28, 48], [24, 52], [20, 50], [16, 46], [12, 42], [12, 38]], from: -100, to: 622 },
      // South Arabia (Yemen)
      { coords: [[12, 42], [16, 44], [16, 48], [12, 48]], from: -500, to: 622 },
    ]
  },

  // ─── CELTIC PAGAN ─────────────────────────────────────
  {
    id: 'celtic_pagan',
    label: 'Кельтская религия',
    color: '#6a8a5a',
    areas: [
      // Gaul, British Isles, Ireland
      { coords: [[44, -5], [50, -8], [55, -6], [58, -5], [52, 2], [48, 5], [45, 2], [44, 0]], from: -500, to: 500 },
      // Ireland
      { coords: [[51, -10], [55, -10], [55, -6], [51, -6]], from: -500, to: 500 },
    ]
  },

  // ─── BALTIC PAGAN ─────────────────────────────────────
  {
    id: 'baltic_pagan',
    label: 'Балтская религия',
    color: '#7a7a4a',
    areas: [
      // Baltic region
      { coords: [[52, 18], [56, 18], [58, 22], [58, 28], [54, 28], [52, 24], [52, 20]], from: 0, to: 1400 },
      // Prussia
      { coords: [[54, 20], [56, 20], [56, 24], [54, 24]], from: 500, to: 1400 },
    ]
  },

  // ─── FINNO-UGRIC ──────────────────────────────────────
  {
    id: 'finno_ugric',
    label: 'Финно-угорская',
    color: '#5a8a7a',
    areas: [
      // Finland / Karelia
      { coords: [[60, 20], [65, 20], [70, 25], [70, 32], [65, 35], [60, 30], [60, 24]], from: 0, to: 1200 },
      // Volga region (Mari, Udmurt)
      { coords: [[54, 44], [58, 44], [60, 50], [56, 52], [54, 48]], from: 500, to: 1200 },
    ]
  },

  // ─── TENGRISM ─────────────────────────────────────────
  {
    id: 'tengrism',
    label: 'Тенгрианство',
    color: '#8a6a4a',
    areas: [
      // Central Asian steppe
      { coords: [[40, 50], [46, 50], [50, 55], [52, 60], [48, 70], [44, 75], [40, 70], [38, 60], [38, 54]], from: 0, to: 1700 },
      // Mongolia
      { coords: [[44, 80], [48, 80], [52, 90], [50, 100], [46, 105], [42, 100], [42, 90]], from: 200, to: 1700 },
      // Siberia (Altai, Sakha)
      { coords: [[50, 80], [60, 80], [70, 85], [72, 100], [68, 110], [60, 105], [52, 95], [50, 85]], from: 500, to: 1700 },
    ]
  },

  // ─── AFRICAN TRADITIONAL ──────────────────────────────
  {
    id: 'african_trad',
    label: 'Афр. традиционные',
    color: '#6a7a5a',
    areas: [
      // West Africa (Yoruba, Fon, Dogon)
      { coords: [[4, -10], [10, -10], [14, -5], [14, 5], [12, 10], [8, 10], [4, 5], [4, -2]], from: -1000, to: CURRENT_YEAR },
      // Central Africa (Congo)
      { coords: [[-10, 10], [-5, 10], [0, 15], [5, 20], [5, 25], [0, 28], [-5, 25], [-10, 20], [-10, 15]], from: -500, to: CURRENT_YEAR },
      // East Africa
      { coords: [[-10, 30], [-5, 30], [0, 35], [0, 42], [-5, 42], [-10, 38], [-10, 34]], from: -500, to: CURRENT_YEAR },
      // Southern Africa
      { coords: [[-35, 14], [-30, 18], [-25, 22], [-20, 28], [-20, 35], [-25, 35], [-30, 30], [-35, 25]], from: 0, to: CURRENT_YEAR },
    ]
  },

  // ─── POLYNESIAN ───────────────────────────────────────
  {
    id: 'polynesian',
    label: 'Полинезийская',
    color: '#5a8a8a',
    areas: [
      // Polynesian Triangle (Samoa, Tonga, Fiji, Tahiti)
      { coords: [[-18, -160], [-10, -160], [-5, -150], [0, -150], [5, -140], [0, -135], [-5, -140], [-10, -150], [-18, -155]], from: 0, to: CURRENT_YEAR },
      // Hawaii
      { coords: [[20, -160], [22, -160], [22, -155], [20, -155]], from: 500, to: CURRENT_YEAR },
      // New Zealand (Maori)
      { coords: [[-48, 166], [-44, 166], [-40, 170], [-40, 176], [-44, 178], [-48, 176]], from: 800, to: CURRENT_YEAR },
    ]
  },

  // ─── NATIVE AMERICAN ──────────────────────────────────
  {
    id: 'native_american',
    label: 'Религии Америки',
    color: '#7a6a5a',
    areas: [
      // North America (Plains, Southwest, Northwest)
      { coords: [[30, -125], [50, -125], [55, -115], [60, -100], [55, -90], [50, -80], [45, -70], [40, -75], [35, -80], [30, -85], [30, -100]], from: -1000, to: CURRENT_YEAR },
      // Mesoamerica
      { coords: [[10, -105], [22, -105], [22, -95], [20, -85], [15, -85], [10, -90], [10, -100]], from: -1500, to: CURRENT_YEAR },
      // Amazon
      { coords: [[-15, -75], [0, -75], [5, -65], [5, -55], [0, -50], [-5, -50], [-10, -60], [-15, -65]], from: -500, to: CURRENT_YEAR },
      // Andes
      { coords: [[-20, -80], [-5, -80], [0, -75], [0, -65], [-5, -60], [-10, -65], [-20, -70]], from: -1000, to: CURRENT_YEAR },
    ]
  },
];

const YEAR_LABELS = {
  '-3000': '3000 г. до н.э.',
  '-2500': '2500 г. до н.э.',
  '-2000': '2000 г. до н.э.',
  '-1500': '1500 г. до н.э.',
  '-1000': '1000 г. до н.э.',
  '-500': '500 г. до н.э.',
  '0': '0 г. н.э.',
  '500': '500 г.',
  '1000': '1000 г.',
  '1500': '1500 г.',
  [String(CURRENT_YEAR)]: CURRENT_YEAR + ' г.',
};

let mapInstance = null;
let mapLayers = {};
let mapLegendItems = {};
let mapAnimationId = null;

function initMap() {
  if (mapInstance) return;

  mapInstance = L.map('map', {
    center: [30, 50],
    zoom: 2,
    minZoom: 2,
    maxZoom: 6,
    worldCopyJump: true,
    attributionControl: false,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(mapInstance);

  buildMapLegend();

  const slider = document.getElementById('map-year-slider');
  const yearLabel = document.getElementById('map-year-label');
  const yearValue = document.getElementById('map-year-value');

  slider.addEventListener('input', function() {
    const year = parseInt(this.value);
    updateMapYear(year);
    yearLabel.textContent = formatYear(year);
  });

  document.getElementById('map-play-btn').addEventListener('click', toggleMapAnimation);

  slider.max = String(CURRENT_YEAR);
  slider.value = String(CURRENT_YEAR);
  yearLabel.textContent = formatYear(CURRENT_YEAR);
  yearValue.textContent = String(CURRENT_YEAR);
  updateMapYear(CURRENT_YEAR);
}

function formatYear(year) {
  if (year < 0) return Math.abs(year) + ' г. до н.э.';
  return year + ' г.';
}

function buildMapLegend() {
  const legendDiv = document.getElementById('map-legend');
  legendDiv.innerHTML = '';

  RELIGION_SPREAD.forEach(r => {
    const item = document.createElement('div');
    item.className = 'map-legend-item';
    item.dataset.religionId = r.id;

    const colorBox = document.createElement('span');
    colorBox.className = 'map-legend-color';
    colorBox.style.background = r.color;

    const label = document.createElement('span');
    label.className = 'map-legend-label';
    label.textContent = r.label;

    item.appendChild(colorBox);
    item.appendChild(label);

    item.addEventListener('click', function() {
      toggleReligionLayer(r.id, this);
    });

    legendDiv.appendChild(item);
    mapLegendItems[r.id] = item;
  });
}

function toggleReligionLayer(id, el) {
  const hidden = el.classList.toggle('hidden');
  if (mapLayers[id]) {
    mapLayers[id].forEach(layer => {
      if (hidden) {
        mapInstance.removeLayer(layer);
      } else {
        layer.addTo(mapInstance);
      }
    });
  }
}

function updateMapYear(year) {
  Object.keys(mapLayers).forEach(id => {
    mapLayers[id].forEach(layer => mapInstance.removeLayer(layer));
  });
  mapLayers = {};

  RELIGION_SPREAD.forEach(r => {
    const legendItem = mapLegendItems[r.id];
    let hasVisibleArea = false;
    const layers = [];

    r.areas.forEach(area => {
      if (year >= area.from && year <= area.to) {
        hasVisibleArea = true;
        const polygon = L.polygon(area.coords, {
          color: r.color,
          weight: 1.5,
          opacity: 0.6,
          fillColor: r.color,
          fillOpacity: 0.25,
        });

        const nodeInfo = nodeData[r.id];
        let popupContent = '<b>' + r.label + '</b>';
        if (nodeInfo) {
          popupContent += '<br><em>' + formatYear(area.from) + ' – ' + formatYear(area.to) + '</em>';
          popupContent += '<br>' + (nodeInfo.description || '');
        }
        polygon.bindPopup(popupContent);

        polygon.on('mouseover', function() {
          this.setStyle({ fillOpacity: 0.4, weight: 2.5 });
        });
        polygon.on('mouseout', function() {
          this.setStyle({ fillOpacity: 0.25, weight: 1.5 });
        });

        layers.push(polygon);
      }
    });

    if (hasVisibleArea) {
      layers.forEach(layer => layer.addTo(mapInstance));
      if (legendItem) legendItem.style.opacity = '1';
    } else {
      if (legendItem) legendItem.style.opacity = '0.3';
    }

    mapLayers[r.id] = layers;
  });
}

function toggleMapAnimation() {
  const btn = document.getElementById('map-play-btn');
  const slider = document.getElementById('map-year-slider');

  if (mapAnimationId) {
    clearInterval(mapAnimationId);
    mapAnimationId = null;
    btn.textContent = '▶';
    return;
  }

  btn.textContent = '⏸';
  const startYear = parseInt(slider.value);
  let currentYear = startYear;

  mapAnimationId = setInterval(() => {
    currentYear += 10;
    if (currentYear > CURRENT_YEAR) {
      currentYear = -3000;
    }
    slider.value = currentYear;
    const yearLabel = document.getElementById('map-year-label');
    yearLabel.textContent = formatYear(currentYear);
    updateMapYear(currentYear);
  }, 100);
}
