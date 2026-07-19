const NODE_COLORS = {
  root:          { background: '#b8a07a', border: '#d4c4a8' },
  branch:        { background: '#a8987a', border: '#c4b49a' },
  subBranch:     { background: '#988a7a', border: '#b4a48e' },
  belief:        { background: '#c48a7a', border: '#d8a08a' },
  text:          { background: '#7a9aba', border: '#96b4d0' },
  textDetail:    { background: '#8aaac8', border: '#a0bcd4' },
  rule:          { background: '#8ab888', border: '#a0d09a' },
  practice:      { background: '#b8a8c8', border: '#c8bcd4' },
  marginal:      { background: '#887a8a', border: '#a08e9e' },
  apocrypha:     { background: '#6a8a7a', border: '#86a696' },
};

const nodes = new vis.DataSet([
  // ─── ROOT ───────────────────────────────────────────────
  { id: 'abrahamic', label: 'Авраамические\nрелигии', group: 'root', shape: 'star', size: 32, color: NODE_COLORS.root, font: { size: 18 } },

  // ─── ANCIENT ROOTS ────────────────────────────────────────
  { id: 'ancient_roots', label: 'Древние\nкорни',      group: 'root',    shape: 'box', size: 26, color: NODE_COLORS.root, font: { size: 14 } },
  { id: 'mesopotamian',  label: 'Шумеро-аккадская\nрелигия', group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'egyptian',      label: 'Древнеегипетская\nрелигия',  group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'canaanite',     label: 'Ханаанская\nрелигия',       group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'zoroastrian',   label: 'Зороастризм',               group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'hellenistic',   label: 'Эллинизм\n(греч. философия)', group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'roman_pagan',   label: 'Древне-\nримская\nрелигия',   group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'norse',         label: 'Древне-\nскандинавская\nрелигия', group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'slavic_pagan',  label: 'Древне-\nславянская\nрелигия',  group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'pre_islamic_arabia', label: 'Доисламская\nАравия',  group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'celtic_pagan',    label: 'Древне-\nкельтская\nрелигия',     group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'baltic_pagan',    label: 'Балтская\nрелигия',               group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'finno_ugric',     label: 'Финно-\nугорская\nрелигия',       group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'tengrism',        label: 'Тенгрианство',                    group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'african_trad',    label: 'Афр. традиц.\nрелигии',           group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'polynesian',      label: 'Полине-\nзийская\nрелигия',       group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'native_american', label: 'Религии\nкоренных\nнародов\nАмерики', group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'vedic',         label: 'Ведическая\nрелигия',        group: 'branch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'abraham',  label: 'Авраам', group: 'branch', shape: 'box', size: 22, color: NODE_COLORS.branch, font: { size: 15 } },

  // ─── CHRISTIANITY ───────────────────────────────────────
  { id: 'christianity', label: 'Христианство', group: 'branch', shape: 'box', size: 24, color: NODE_COLORS.branch, font: { size: 15 } },

  { id: 'catholicism', label: 'Католицизм', group: 'branch', shape: 'box', size: 22, color: NODE_COLORS.branch },
  { id: 'orthodoxy', label: 'Православие', group: 'branch', shape: 'box', size: 22, color: NODE_COLORS.branch },
  { id: 'protestantism', label: 'Протестантизм', group: 'branch', shape: 'box', size: 22, color: NODE_COLORS.branch },

  { id: 'roman_catholic', label: 'Римско-\nкатолическая', group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'eastern_catholic', label: 'Восточно-\nкатолическая', group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'eastern_orthodox', label: 'Восточное\nправославие', group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'oriental_orthodox', label: 'Ориентальное\nправославие', group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'lutheranism', label: 'Лютеранство', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'anglicanism', label: 'Англиканство', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'calvinism', label: 'Кальвинизм', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'baptist', label: 'Баптизм', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'methodism', label: 'Методизм', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'pentecostalism', label: 'Пятидесят-\nничество', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  // ─── UNRECOGNIZED BRANCHES (CHRISTIANITY) ──────────────────
  { id: 'marginal_branch',   label: 'Непризнанные\nтечения',  group: 'branch',    shape: 'box', size: 20, color: NODE_COLORS.marginal },
  { id: 'mormonism',        label: 'Мормонизм',              group: 'marginal',   shape: 'box', size: 16, color: NODE_COLORS.marginal },
  { id: 'jehovah_witnesses', label: 'Свидетели\nИеговы',      group: 'marginal',   shape: 'box', size: 16, color: NODE_COLORS.marginal },
  { id: 'unitarianism',     label: 'Унитариан-\nство',        group: 'marginal',   shape: 'box', size: 16, color: NODE_COLORS.marginal },

  { id: 'trinity', label: 'Троица', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'incarnation', label: 'Воплощение', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'salvation', label: 'Спасение', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'resurrection', label: 'Воскресение', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'second_coming', label: 'Второе\nпришествие', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },

  { id: 'old_testament', label: 'Ветхий\nЗавет', group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'new_testament', label: 'Новый\nЗавет', group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'gospels', label: 'Евангелия', group: 'textDetail', shape: 'box', size: 14, color: NODE_COLORS.textDetail },
  { id: 'apostles', label: 'Деяния и\nПослания', group: 'textDetail', shape: 'box', size: 14, color: NODE_COLORS.textDetail },

  // ─── APOCRYPHA ─────────────────────────────────────────────
  { id: 'apocrypha',         label: 'Апокрифы',               group: 'text',      shape: 'box',   size: 16, color: NODE_COLORS.apocrypha },
  { id: 'apocrypha_ot',     label: 'Ветхозавет-\nные',        group: 'apocrypha',  shape: 'box',   size: 14, color: NODE_COLORS.apocrypha },
  { id: 'apocrypha_nt',     label: 'Новозавет-\nные',         group: 'apocrypha',  shape: 'box',   size: 14, color: NODE_COLORS.apocrypha },
  { id: 'enoch',            label: 'Книга\nЕноха',            group: 'apocrypha',  shape: 'box',   size: 12, color: NODE_COLORS.apocrypha },
  { id: 'jubilees',         label: 'Книга\nЮбилеев',         group: 'apocrypha',  shape: 'box',   size: 12, color: NODE_COLORS.apocrypha },
  { id: 'gospel_thomas',    label: 'Евангелие\nот Фомы',     group: 'apocrypha',  shape: 'box',   size: 12, color: NODE_COLORS.apocrypha },
  { id: 'gospel_judas',     label: 'Евангелие\nот Иуды',     group: 'apocrypha',  shape: 'box',   size: 12, color: NODE_COLORS.apocrypha },
  { id: 'gospel_mary',      label: 'Евангелие\nот Марии',    group: 'apocrypha',  shape: 'box',   size: 12, color: NODE_COLORS.apocrypha },

  { id: 'ten_commandments', label: '10 Заповедей', group: 'rule', shape: 'box', size: 18, color: NODE_COLORS.rule },
  { id: 'great_commandment', label: 'Великая\nзаповедь', group: 'rule', shape: 'box', size: 18, color: NODE_COLORS.rule },
  { id: 'beatitudes', label: 'Заповеди\nблаженства', group: 'rule', shape: 'box', size: 18, color: NODE_COLORS.rule },
  { id: 'golden_rule', label: 'Золотое\nправило', group: 'rule', shape: 'box', size: 18, color: NODE_COLORS.rule },

  { id: 'baptism_sac', label: 'Крещение', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'eucharist', label: 'Евхаристия', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'confirmation', label: 'Миропо-\nмазание', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'penance', label: 'Покаяние', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'anointing', label: 'Елеосвя-\nщение', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'marriage_sac', label: 'Брак', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'holy_orders_sac', label: 'Священ-\nство', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── CHRISTIAN ADDITIONS ─────────────────────────────────
  { id: 'ecumenical_councils', label: 'Вселенские\nсоборы',     group: 'text',      shape: 'box', size: 14, color: NODE_COLORS.text },
  { id: 'nicean_creed',        label: 'Никейский\nсимвол веры', group: 'belief',    shape: 'box', size: 16, color: NODE_COLORS.belief },
  { id: 'chalcedon_creed',     label: 'Халкидонский\nорос',     group: 'belief',    shape: 'box', size: 16, color: NODE_COLORS.belief },
  { id: 'church_fathers',      label: 'Святые\nотцы',           group: 'text',      shape: 'box', size: 14, color: NODE_COLORS.text },
  { id: 'patristics',          label: 'Патристика',             group: 'textDetail', shape: 'box', size: 12, color: NODE_COLORS.textDetail },
  { id: 'liturgy_byzantine',   label: 'Византий-\nская литургия', group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'liturgy_roman',       label: 'Римская\nлитургия',      group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'monasticism',         label: 'Монашество',             group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'hesychasm',           label: 'Исихазм',                group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'icon_veneration',     label: 'Иконопочи-\nтание',      group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'jesus_prayer',        label: 'Иисусова\nмолитва',      group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'christian_fasting',   label: 'Пост\n(говение)',        group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'christian_pilgrimage',label: 'Паломни-\nчество',        group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── JUDAISM ─────────────────────────────────────────────
  { id: 'judaism', label: 'Иудаизм', group: 'branch', shape: 'box', size: 24, color: NODE_COLORS.branch, font: { size: 15 } },

  { id: 'orthodox_judaism',    label: 'Ортодок-\nсальный', group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'conservative_judaism', label: 'Консерва-\nтивный',  group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'reform_judaism',      label: 'Реформист-\nский',    group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },

  { id: 'judaism_covenant',    label: 'Завет',         group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'chosen_people',       label: 'Богоиз-\nбранность', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'judaism_mashiach',    label: 'Машиах\n(Мессия)',    group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },

  { id: 'tanakh', label: 'Танах', group: 'text', shape: 'box', size: 18, color: NODE_COLORS.text },
  { id: 'torah',  label: 'Тора',  group: 'textDetail', shape: 'box', size: 14, color: NODE_COLORS.textDetail },
  { id: 'talmud', label: 'Талмуд', group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },

  { id: 'mitzvot_613', label: '613\nзаповедей', group: 'rule', shape: 'box', size: 18, color: NODE_COLORS.rule },

  { id: 'shabbat',          label: 'Шаббат\n(суббота)',      group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'kashrut',          label: 'Кашрут\n(пищ. законы)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'judaism_brit_milah', label: 'Брит-\nмила',         group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'judaism_holidays',  label: 'Праздники',            group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'tefillah',          label: 'Тфила\n(молитва)',     group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'tzedakah',          label: 'Цдака\n(милостыня)',   group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'mikvah',            label: 'Миква\n(омовение)',    group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── KABBALAH (JEWISH MYSTICISM) ───────────────────────────
  { id: 'kabbalah',           label: 'Каббала\n(мистика)',   group: 'text',      shape: 'box',   size: 16, color: NODE_COLORS.apocrypha },
  { id: 'zohar',              label: 'Зоар',                  group: 'apocrypha',  shape: 'box',   size: 14, color: NODE_COLORS.apocrypha },
  { id: 'sefer_yetzirah',     label: 'Сефер\nЙецира',        group: 'apocrypha',  shape: 'box',   size: 14, color: NODE_COLORS.apocrypha },

  // ─── JUDAISM ADDITIONS ──────────────────────────────────
  { id: 'hasidism',          label: 'Хасидизм',              group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'jewish_philosophy', label: 'Еврейская\nфилософия',  group: 'belief',    shape: 'box', size: 16, color: NODE_COLORS.belief },
  { id: 'maimonides',        label: 'Маймонид\n(Рамбам)',    group: 'text',      shape: 'box', size: 14, color: NODE_COLORS.text },

  // ─── ISLAM ──────────────────────────────────────────────
  { id: 'islam', label: 'Ислам', group: 'branch', shape: 'box', size: 24, color: NODE_COLORS.branch, font: { size: 15 } },

  { id: 'sunni', label: 'Суннизм', group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'shia', label: 'Шиизм', group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'sufism', label: 'Суфизм', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'tawhid', label: 'Единобожие\n(Таухид)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'prophethood', label: 'Пророчество\n(Нубувва)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'angels', label: 'Ангелы\n(Малаика)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'holy_books', label: 'Священные\nПисания', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'judgment_day', label: 'Судный\nдень', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'qadr', label: 'Предопреде-\nление (Кадр)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },

  { id: 'quran', label: 'Коран', group: 'text', shape: 'box', size: 18, color: NODE_COLORS.text },
  { id: 'hadith', label: 'Хадисы /\nСунна', group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },

  { id: 'shahada', label: 'Шахада\n(вера)', group: 'rule', shape: 'box', size: 16, color: NODE_COLORS.rule },
  { id: 'salat', label: 'Намаз\n(молитва)', group: 'rule', shape: 'box', size: 16, color: NODE_COLORS.rule },
  { id: 'zakat', label: 'Закят\n(милостыня)', group: 'rule', shape: 'box', size: 16, color: NODE_COLORS.rule },
  { id: 'sawm', label: 'Ураза\n(пост)', group: 'rule', shape: 'box', size: 16, color: NODE_COLORS.rule },
  { id: 'hajj', label: 'Хадж\n(паломн.)', group: 'rule', shape: 'box', size: 16, color: NODE_COLORS.rule },
  { id: 'halal', label: 'Халяль\n(дозвол.)', group: 'rule', shape: 'box', size: 16, color: NODE_COLORS.rule },

  // ─── ISLAM ADDITIONS ──────────────────────────────────────
  { id: 'fiqh_schools',    label: 'Школы\nфикха',          group: 'subBranch', shape: 'box', size: 14, color: NODE_COLORS.subBranch },
  { id: 'hanafi',          label: 'Ханафит-\nский',         group: 'subBranch', shape: 'box', size: 14, color: NODE_COLORS.subBranch },
  { id: 'maliki',          label: 'Маликит-\nский',         group: 'subBranch', shape: 'box', size: 14, color: NODE_COLORS.subBranch },
  { id: 'shafi_i',         label: 'Шафиит-\nский',          group: 'subBranch', shape: 'box', size: 14, color: NODE_COLORS.subBranch },
  { id: 'hanbali',         label: 'Ханбалит-\nский',        group: 'subBranch', shape: 'box', size: 14, color: NODE_COLORS.subBranch },
  { id: 'sufi_tariqas',    label: 'Суфийские\nтарикаты',    group: 'subBranch', shape: 'box', size: 14, color: NODE_COLORS.subBranch },
  { id: 'qadiriyya',       label: 'Кадирия',                group: 'subBranch', shape: 'box', size: 14, color: NODE_COLORS.subBranch },
  { id: 'naqshbandiyya',   label: 'Накшбан-\nдия',         group: 'subBranch', shape: 'box', size: 14, color: NODE_COLORS.subBranch },
  { id: 'suhrawardiyya',   label: 'Сухравар-\nдия',         group: 'subBranch', shape: 'box', size: 14, color: NODE_COLORS.subBranch },
  { id: 'kalam',           label: 'Калам\n(теология)',      group: 'belief',    shape: 'box', size: 16, color: NODE_COLORS.belief },
  { id: 'falsafa',           label: 'Фальсафа\n(философия)',  group: 'belief',    shape: 'box', size: 16, color: NODE_COLORS.belief },
  { id: 'islam_zikr',        label: 'Зикр\n(поминовение)',    group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'islam_dua',         label: 'Дуа\n(мольба)',           group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'islam_tawaf',       label: 'Таваф\n(обход Каабы)',   group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── CATEGORY GROUPS ──────────────────────────────────────
  { id: 'christianity_beliefs',   label: 'Верования',     group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'christianity_texts',     label: 'Тексты',        group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'christianity_rules',     label: 'Правила',       group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'christianity_practices', label: 'Таинства',      group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'christianity_apocrypha', label: 'Апокрифы',      group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'judaism_beliefs',        label: 'Верования',     group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'judaism_texts',          label: 'Тексты',        group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'judaism_rules',          label: 'Правила',       group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'judaism_practices',      label: 'Практики',      group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'islam_beliefs',          label: 'Верования',     group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'islam_texts',            label: 'Тексты',        group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'islam_rules',            label: 'Столпы',        group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'islam_practices',        label: 'Практики',      group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  // ─── DHARMIC ROOT ──────────────────────────────────────────
  { id: 'dharmic', label: 'Дхармические\nрелигии', group: 'root', shape: 'star', size: 28, color: NODE_COLORS.root, font: { size: 16 } },

  // ─── HINDUISM ──────────────────────────────────────────────
  { id: 'hinduism', label: 'Индуизм', group: 'branch', shape: 'box', size: 24, color: NODE_COLORS.branch, font: { size: 15 } },

  { id: 'vaishnavism', label: 'Вайшнавизм', group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'shaivism', label: 'Шиваизм', group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'shaktism', label: 'Шактизм', group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },
  { id: 'smartism', label: 'Смартизм', group: 'subBranch', shape: 'box', size: 18, color: NODE_COLORS.subBranch },

  { id: 'brahman', label: 'Брахман\n(Абсолют)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'atman', label: 'Атман\n(Душа)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'karma', label: 'Карма\n(закон)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'samsara', label: 'Сансара\n(перерожд.)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'moksha', label: 'Мокша\n(освобожд.)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'dharma', label: 'Дхарма\n(долг)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },

  { id: 'vedas', label: 'Веды', group: 'text', shape: 'box', size: 18, color: NODE_COLORS.text },
  { id: 'upanishads', label: 'Упанишады', group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'bhagavad_gita', label: 'Бхагавад-\nгита', group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'puranas', label: 'Пураны', group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'itihasas', label: 'Итихасы\n(эпосы)', group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'ramayana', label: 'Рамаяна', group: 'textDetail', shape: 'box', size: 14, color: NODE_COLORS.textDetail },
  { id: 'mahabharata', label: 'Махабхарата', group: 'textDetail', shape: 'box', size: 14, color: NODE_COLORS.textDetail },

  { id: 'rigveda', label: 'Ригведа', group: 'textDetail', shape: 'box', size: 12, color: NODE_COLORS.textDetail },
  { id: 'samaveda', label: 'Самаведа', group: 'textDetail', shape: 'box', size: 12, color: NODE_COLORS.textDetail },
  { id: 'yajurveda', label: 'Яджурведа', group: 'textDetail', shape: 'box', size: 12, color: NODE_COLORS.textDetail },
  { id: 'atharvaveda', label: 'Атхарваведа', group: 'textDetail', shape: 'box', size: 12, color: NODE_COLORS.textDetail },

  { id: 'yamas', label: 'Ямы\n(ограничения)', group: 'rule', shape: 'box', size: 16, color: NODE_COLORS.rule },
  { id: 'niyamas', label: 'Ниямы\n(предписания)', group: 'rule', shape: 'box', size: 16, color: NODE_COLORS.rule },
  { id: 'ahimsa', label: 'Ахимса\n(непричин. вреда)', group: 'rule', shape: 'box', size: 16, color: NODE_COLORS.rule },
  { id: 'satya_hindu', label: 'Сатья\n(правдивость)', group: 'rule', shape: 'box', size: 16, color: NODE_COLORS.rule },
  { id: 'brahmacharya', label: 'Брахмачарья\n(высш. сознание)', group: 'rule', shape: 'box', size: 16, color: NODE_COLORS.rule },

  { id: 'yoga', label: 'Йога', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'puja', label: 'Пуджа\n(поклонение)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'meditation_hindu', label: 'Медитация', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'mantra', label: 'Мантра', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'bhakti', label: 'Бхакти\n(преданность)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  { id: 'yoga_types',    label: 'Пути\nйоги',            group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'raja_yoga',     label: 'Раджа-йога\n(царский)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'karma_yoga',    label: 'Карма-йога\n(действие)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'bhakti_yoga',   label: 'Бхакти-йога\n(преданность)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'jnana_yoga',    label: 'Джняна-йога\n(знание)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'kriya_yoga',    label: 'Крийя-йога\n(очищение)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'hatha_yoga',    label: 'Хатха-йога\n(тело)',    group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'kundalini_yoga', label: 'Кундалини-\nйога',     group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'mantra_yoga',   label: 'Мантра-йога\n(звук)',   group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── CATEGORY GROUPS (HINDUISM) ─────────────────────────────
  { id: 'hinduism_traditions', label: 'Школы и\nнаправления', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'hinduism_beliefs',   label: 'Верования',     group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'hinduism_texts',     label: 'Тексты',        group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'hinduism_rules',     label: 'Правила',       group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'hinduism_practices', label: 'Практики',      group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'hinduism_modern',    label: 'Современные\nдвижения', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'agni_yoga',        label: 'Агни-йога',       group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'integral_yoga',   label: 'Интегральная\nйога', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'advaita_vedanta', label: 'Адвайта-\nведанта', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'vishishtadvaita', label: 'Вишиштад-\nвайта', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'dvaita',          label: 'Двайта',           group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'samkhya',         label: 'Санкхья',          group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'nyaya',           label: 'Ньяя\n(логика)',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'vaisheshika',     label: 'Вайшешика\n(атомизм)', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'ananda_marga',    label: 'Ананда\nМарга',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'brahmo_samaj',    label: 'Брахмо-\nсамадж',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'arya_samaj',      label: 'Арья-\nсамадж',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'ramakrishna_mission', label: 'Рамакришна\nМиссия', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'iskcon',          label: 'ИСККОН',           group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'osho',            label: 'Ошо',              group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  // ─── MODERN SPIRITUAL MOVEMENTS ──────────────────────────────
  { id: 'modern_movements', label: 'Современные\nдуховные\nдвижения', group: 'branch', shape: 'hexagon', size: 22, color: '#a08060' },
  { id: 'theosophy',        label: 'Теософия',        group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'modern_beliefs',      label: 'Верования',             group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'modern_texts',        label: 'Тексты',                group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'modern_practices',    label: 'Практики',              group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'anthroposophy',       label: 'Антропосо-\nфия',       group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'new_age',             label: 'Нью-эйдж',              group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'spiritual_evolution', label: 'Духовная\nэволюция',    group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'unity_of_religions',  label: 'Единство\nрелигий',     group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'reincarnation_modern', label: 'Реинкарна-\nция',       group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'subtle_worlds',       label: 'Тонкие\nмиры',          group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'ascended_masters',    label: 'Вознесённые\nВладыки',   group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },

  { id: 'secret_doctrine',     label: 'Тайная\nДоктрина',      group: 'text',    shape: 'box', size: 16, color: NODE_COLORS.text },


  // ─── ADDITIONAL MODERN MOVEMENTS ────────────────────────────
  { id: 'bahai',             label: 'Бахаи',                    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'wicca',             label: 'Викка',                    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'rastafari',         label: 'Растафари',                group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'candomble',         label: 'Кандомбле',                group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'umbanda',           label: 'Умбанда',                  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'falun_gong',        label: 'Фалунь-\nгун',           group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'anastasia',           label: 'Анастасия\n(Звен. кедры)', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'church_of_satan',     label: 'Церковь\nСатаны',          group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  // ─── OCCULT TRADITIONS ─────────────────────────────────────
  { id: 'occult_traditions', label: 'Оккультные\ntрадиции', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'hermeticism',      label: 'Герметизм',          group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'gnosticism',       label: 'Гностицизм',         group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'rosicrucianism',   label: 'Розенкрей-\nцерство', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'freemasonry',      label: 'Масонство',          group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'spiritualism',     label: 'Спиритизм',          group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'ceremonial_magic', label: 'Церемони-\nальная магия', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'meditation_modern',   label: 'Медитация',             group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'channeling',          label: 'Ченнелинг',             group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'affirmation',         label: 'Аффирма-\nции',          group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── BUDDHISM ───────────────────────────────────────────────
  { id: 'buddhism', label: 'Буддизм', group: 'branch', shape: 'box', size: 24, color: NODE_COLORS.branch, font: { size: 15 } },

  { id: 'buddhism_schools',  label: 'Школы',      group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'buddhism_beliefs',  label: 'Верования',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'buddhism_texts',    label: 'Тексты',     group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'buddhism_practices',label: 'Практики',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'theravada',  label: 'Тхеравада',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'mahayana',   label: 'Махаяна',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'vajrayana',  label: 'Ваджраяна',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'four_noble_truths', label: '4 Благородные\nистины',    group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'eightfold_path',    label: 'Благородный\n8-ричный путь', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'buddhist_karma',    label: 'Карма\n(перерождение)',     group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'nirvana',           label: 'Нирвана\n(просветление)',   group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },

  { id: 'tripitaka', label: 'Трипитака\n(Палийский\nканон)', group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'buddhist_sutras', label: 'Сутры\nМахаяны',          group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'dhammapada', label: 'Дхамма-\nпада',               group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },

  { id: 'meditation_buddhist', label: 'Медитация\n(Випассана)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'mindfulness',        label: 'Осознан-\nность',         group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'buddhist_chanting',  label: 'Пение\nсутр',            group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'zazen',       label: 'Дзадзэн\n(сидячая\nмедитация)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'metta_bhavana',     label: 'Метта-\nбхавана',         group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'buddhist_prostrations', label: 'Прости-\nрания',      group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'buddhist_offerings', label: 'Подно-\nшения',           group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'buddhist_mandala',   label: 'Мандала',                group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── BUDDHISM ADDITIONS ─────────────────────────────────────
  { id: 'madhyamaka',  label: 'Мадхьямака\n(шуньята)',  group: 'belief',    shape: 'box', size: 16, color: NODE_COLORS.belief },
  { id: 'yogacara',    label: 'Йогачара\n(виджняпти)',   group: 'belief',    shape: 'box', size: 16, color: NODE_COLORS.belief },
  { id: 'dzogchen',    label: 'Дзогчен',                  group: 'belief',    shape: 'box', size: 16, color: NODE_COLORS.belief },
  { id: 'pure_land',   label: 'Чистая\nземля',           group: 'subBranch', shape: 'box', size: 14, color: NODE_COLORS.subBranch },
  { id: 'buddhist_tantra', label: 'Буддийский\nтантризм', group: 'practice',  shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── JAINISM ──────────────────────────────────────────────────
  { id: 'jainism', label: 'Джайнизм', group: 'branch', shape: 'box', size: 24, color: NODE_COLORS.branch, font: { size: 15 } },

  { id: 'jainism_beliefs',   label: 'Верования', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'jainism_texts',     label: 'Тексты',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'jainism_rules',     label: 'Правила',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'jainism_practices', label: 'Практики',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'jainism_schools', label: 'Школы', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'jiva_ajiva',    label: 'Джива /\nАджива',     group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'ahimsa_jain',   label: 'Ахимса\n(ненасилие)',  group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'karma_jain',    label: 'Карма\n(материя)',     group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'kevala_jnana',  label: 'Кевала-\nгьяна',       group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'samsara_jain',  label: 'Сансара\n(цикл)',      group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'moksha_jain',   label: 'Мокша\n(освобождение)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },

  { id: 'agamas',           label: 'Агамы',              group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'tattvartha_sutra', label: 'Таттвартха-\nсутра',  group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },

  { id: 'five_vows_jain',     label: 'Пять\nобетов',      group: 'rule',  shape: 'box', size: 18, color: NODE_COLORS.rule },
  { id: 'asceticism_jain',    label: 'Аскеза\n(тапас)',   group: 'rule',  shape: 'box', size: 18, color: NODE_COLORS.rule },
  { id: 'three_jewels_jain',  label: 'Три\nдрагоценности', group: 'rule', shape: 'box', size: 18, color: NODE_COLORS.rule },

  { id: 'meditation_jain', label: 'Медитация\n(самая)',  group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'fasting_jain',   label: 'Пост\n(анашана)',     group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'pilgrimage_jain', label: 'Паломни-\nчество',    group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  { id: 'digambara',    label: 'Дигам-\nбары',    group: 'belief', shape: 'box', size: 16, color: NODE_COLORS.belief },
  { id: 'shvetambara',  label: 'Шветам-\nбары',   group: 'belief', shape: 'box', size: 16, color: NODE_COLORS.belief },

  // ─── SIKHISM ──────────────────────────────────────────────────
  { id: 'sikhism', label: 'Сикхизм', group: 'branch', shape: 'box', size: 24, color: NODE_COLORS.branch, font: { size: 15 } },

  { id: 'sikhism_beliefs',   label: 'Верования', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'sikhism_texts',     label: 'Тексты',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'sikhism_rules',     label: 'Правила',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'sikhism_practices', label: 'Практики',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'ek_onkar',      label: 'Эк-Онкар\n(Единый Бог)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'gurus_sikh',    label: 'Десять\nгуру',           group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'khalsa',        label: 'Хальса\n(община)',       group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'sewa_sikh',     label: 'Сева\n(служение)',       group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'karma_sikh',    label: 'Карма /\nсансара',       group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },

  { id: 'guru_granth_sahib', label: 'Гуру Грантх\nСахиб',  group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },

  { id: 'five_ks',     label: 'Пять К',          group: 'rule',  shape: 'box', size: 18, color: NODE_COLORS.rule },
  { id: 'sikh_principles', label: 'Три столпа\n(наам, даан, иснаан)', group: 'rule', shape: 'box', size: 18, color: NODE_COLORS.rule },

  { id: 'langar',       label: 'Лангар\n(трапеза)',  group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'kirtan_sikh',  label: 'Киртан\n(пение)',    group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── EAST ASIAN ROOT ─────────────────────────────────────────
  { id: 'east_asian', label: 'Восточно-\nазиатские\nучения', group: 'root', shape: 'star', size: 28, color: NODE_COLORS.root, font: { size: 14 } },

  // ─── TAOISM ──────────────────────────────────────────────────
  { id: 'taoism', label: 'Даосизм', group: 'branch', shape: 'box', size: 24, color: NODE_COLORS.branch, font: { size: 15 } },

  { id: 'taoism_beliefs',   label: 'Верования', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'taoism_texts',     label: 'Тексты',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'taoism_practices', label: 'Практики',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'tao',       label: 'Дао\n(Путь)',          group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'de_tao',    label: 'Дэ\n(Добродетель)',    group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'wuwei',     label: 'У-вэй\n(недеяние)',    group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'pu_tao',    label: 'Пустота\n(Пу)',        group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },

  { id: 'tao_te_ching', label: 'Дао Дэ\nЦзин',      group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'zhuangzi_book', label: 'Чжуан-\nцзы',      group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },

  { id: 'taoist_meditation', label: 'Медитация',    group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'qigong',            label: 'Цигун',        group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'feng_shui',         label: 'Фэн-шуй',      group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── CONFUCIANISM ────────────────────────────────────────────
  { id: 'confucianism', label: 'Конфуциан-\nство', group: 'branch', shape: 'box', size: 24, color: NODE_COLORS.branch, font: { size: 15 } },

  { id: 'confucianism_beliefs',   label: 'Верования', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'confucianism_texts',     label: 'Тексты',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'confucianism_practices', label: 'Практики',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'ren',       label: 'Жэнь\n(человекол.)', group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'li_conf',   label: 'Ли\n(ритуал)',       group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'yi_conf',   label: 'И\n(долг)',           group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'xiao',      label: 'Сяо\n(почтит.)',     group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },

  { id: 'analects',      label: 'Лунь Юй\n(Аналекты)', group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'five_classics', label: 'Пяти-\nкнижие',       group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },

  { id: 'ancestor_worship', label: 'Почитание\nпредков', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'education_conf',   label: 'Образо-\nвание',     group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'rituals_conf',     label: 'Ритуалы',            group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── SHINTO ──────────────────────────────────────────────────
  { id: 'shinto', label: 'Синтоизм', group: 'branch', shape: 'box', size: 24, color: NODE_COLORS.branch, font: { size: 15 } },

  { id: 'shinto_beliefs',   label: 'Верования', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'shinto_texts',     label: 'Тексты',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'shinto_practices', label: 'Практики',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },

  { id: 'kami',       label: 'Ками\n(духи)',      group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'amaterasu',  label: 'Аматэрасу',         group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },

  { id: 'kojiki',     label: 'Кодзики',           group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'nihon_shoki', label: 'Нихон\nсёки',      group: 'text', shape: 'box', size: 16, color: NODE_COLORS.text },

  { id: 'shinto_purification', label: 'Очищение\n(хараи)',     group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'shinto_festivals',   label: 'Мацури\n(праздники)',    group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'shinto_shrines',     label: 'Святилища\n(дзиндзя)',   group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── ROMAN PAGAN ──────────────────────────────────────────
  { id: 'roman_pagan_beliefs',  label: 'Верования',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'roman_gods_jupiter',   label: 'Юпитер\nи пантеон',   group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'roman_gods_imperial',  label: 'Культ\nимператора',   group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'roman_pax_deorum',     label: 'Pax Deorum',          group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'roman_pagan_practices', label: 'Практики',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'roman_sacrifice',      label: 'Жертво-\nприношения',  group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'roman_augury',         label: 'Ауспиции',            group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'roman_festivals',      label: 'Римские\nпраздники',  group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── NORSE ─────────────────────────────────────────────────
  { id: 'norse_beliefs',   label: 'Верования',     group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'norse_pantheon',  label: 'Асы и\nваны',   group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'norse_odin',      label: 'Один',          group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'norse_thor',      label: 'Тор',           group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'norse_ragnarok',  label: 'Рагнарёк',      group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'norse_texts',     label: 'Тексты',        group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'norse_edda',      label: 'Эдды',          group: 'text',    shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'norse_sagas',     label: 'Саги',          group: 'textDetail', shape: 'box', size: 14, color: NODE_COLORS.textDetail },
  { id: 'norse_practices', label: 'Практики',      group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'norse_blot',      label: 'Блот\n(жертв.)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'norse_seid',      label: 'Сейд\n(магия)',  group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── SLAVIC PAGAN ─────────────────────────────────────────
  { id: 'slavic_pagan_beliefs',  label: 'Верования',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'slavic_pantheon',       label: 'Слав.\nпантеон', group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'slavic_perun',          label: 'Перун',         group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'slavic_veles',          label: 'Велес',         group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'slavic_pagan_practices', label: 'Практики',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'slavic_rituals',        label: 'Обряды',        group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'slavic_koliada',        label: 'Коляда',        group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'slavic_maslenitsa',     label: 'Масленица',     group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── PRE-ISLAMIC ARABIA ───────────────────────────────────
  { id: 'pre_islamic_beliefs',  label: 'Верования',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'arabian_gods',         label: 'Аравийские\nбожества', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'arabian_hanifs',       label: 'Ханифы',      group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'pre_islamic_practices', label: 'Практики',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'arabian_pagan_cults',  label: 'Племенные\nкульты', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'arabian_kaaba_cult',   label: 'Культ\nКаабы', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── VEDIC ─────────────────────────────────────────────────
  { id: 'vedic_beliefs',   label: 'Верования',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'vedic_gods',      label: 'Ведийские\nбоги', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'vedic_yajna',     label: 'Яджна\n(жертв.)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'vedic_texts',     label: 'Тексты',       group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'vedic_rigveda',   label: 'Ригведа',      group: 'text',    shape: 'box', size: 16, color: NODE_COLORS.text },
  { id: 'vedic_practices', label: 'Практики',     group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'vedic_rituals',   label: 'Ведические\nритуалы', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── CELTIC PAGAN ─────────────────────────────────────────
  { id: 'celtic_pagan_beliefs',  label: 'Верования',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'celtic_pantheon',       label: 'Кельтские\nбожества', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'celtic_druids',         label: 'Друиды',     group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'celtic_otherworld',     label: 'Потусто-\nронний мир', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'celtic_pagan_practices', label: 'Практики',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'celtic_festivals',      label: 'Кельтские\nпраздники', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'celtic_sacrifice',      label: 'Жертво-\nприношения', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── BALTIC PAGAN ─────────────────────────────────────────
  { id: 'baltic_pagan_beliefs',  label: 'Верования',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'baltic_perkunas',       label: 'Перкунас',   group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'baltic_pantheon',       label: 'Балтский\nпантеон', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'baltic_pagan_practices', label: 'Практики',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'baltic_rituals',        label: 'Балтские\nобряды', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'baltic_fire_cult',      label: 'Культ\nогня', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── FINNO-UGRIC ──────────────────────────────────────────
  { id: 'finno_ugric_beliefs',  label: 'Верования',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'finno_shamanism',      label: 'Шаманизм',    group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'finno_spirits',        label: 'Духи\nприроды', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'finno_ugric_practices', label: 'Практики',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'finno_rituals',        label: 'Шаманские\nобряды', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'finno_sacrifice',      label: 'Жертво-\nприношения', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── TENGRISM ─────────────────────────────────────────────
  { id: 'tengrism_beliefs',  label: 'Верования',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'tengri_god',        label: 'Тенгри',     group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'tengri_sky',        label: 'Небо\n(Умай)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'tengrism_practices', label: 'Практики',  group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'tengri_rituals',    label: 'Тенгриан-\nские обряды', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'tengri_shaman',     label: 'Шаманы\n(камы)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── AFRICAN TRADITIONAL ──────────────────────────────────
  { id: 'african_trad_beliefs',  label: 'Верования',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'african_yoruba',       label: 'Йоруба\n(Ориша)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'african_vodun',        label: 'Вудун\n(Фон)',  group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'african_trad_practices', label: 'Практики',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'african_rituals',       label: 'Обряды\nи танец', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'african_divination',    label: 'Гадание\n(Ифа)',  group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── POLYNESIAN ───────────────────────────────────────────
  { id: 'polynesian_beliefs',   label: 'Верования',    group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'polynesian_gods',      label: 'Полинез.\боги', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'polynesian_mana',      label: 'Мана',          group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'polynesian_tapu',      label: 'Тапу\n(запрет)', group: 'belief', shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'polynesian_practices', label: 'Практики',     group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'polynesian_rituals',   label: 'Полинез.\nритуалы', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'polynesian_tattoo',    label: 'Татуировка\n(та-моко)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── NATIVE AMERICAN ──────────────────────────────────────
  { id: 'native_american_beliefs', label: 'Верования',      group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'native_great_spirit',     label: 'Великий\nДух',   group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'native_spirits',          label: 'Духи\nприроды',  group: 'belief',  shape: 'box', size: 18, color: NODE_COLORS.belief },
  { id: 'native_american_practices', label: 'Практики',     group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'native_ceremonies',       label: 'Церемонии',      group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'native_vision_quest',     label: 'Поиск\nвидения', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },
  { id: 'native_sweat_lodge',      label: 'Парная\n(инипи)', group: 'practice', shape: 'box', size: 14, color: NODE_COLORS.practice },

  // ─── EGREGOR ────────────────────────────────────────────────
  { id: 'egregor',          label: 'Эгрегор',          group: 'branch', shape: 'hexagon', size: 22, color: '#a08060' },
  { id: 'egregor_theory',   label: 'Теория\nэгрегоров', group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'egregor_types',    label: 'Типы\nэгрегоров',   group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'egregor_texts',    label: 'Тексты',           group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
  { id: 'egregor_practices', label: 'Практики',        group: 'subBranch', shape: 'box', size: 16, color: NODE_COLORS.subBranch },
]);

const edges = new vis.DataSet([
  // ─── ANCIENT ROOTS ───────────────────────────────────────
  { from: 'ancient_roots', to: 'mesopotamian', color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'egyptian',     color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'canaanite',    color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'zoroastrian',  color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'hellenistic',      color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'roman_pagan',      color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'norse',            color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'slavic_pagan',     color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'pre_islamic_arabia', color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'vedic',            color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'abraham',          color: 'rgba(255,255,255,0.15)', width: 2.5 },
  { from: 'abraham',       to: 'abrahamic',    color: 'rgba(255,255,255,0.15)', width: 2.5 },
  { from: 'mesopotamian',  to: 'abraham', color: 'rgba(212,196,168,0.2)',  width: 1, dashes: true, label: 'Родина Авраама', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '📍 Родина Авраама | Ур Халдейский — центр шумеро-аккадской цивилизации · Авраам вышел из месопотамского контекста · Быт. 11:31', details: 'Авраам родился и вырос в Уре Халдейском (юг Ирака) — центре шумеро-аккадской цивилизации. Библейские законы (Исход 21–23) демонстрируют поразительные параллели с Кодексом Хаммурапи (XVIII в. до н.э.): «око за око» (Лев. 24:20 = §196 Кодекса), законы о краже, телесных повреждениях и рабах. Потоп в Книге Бытия (гл. 6–8) почти дословно восходит к «Эпосу о Гильгамеше» (табличка XI, XVIII в. до н.э.: Утнапиштим строит ковчег, берёт «семя всех живых существ», выпускает голубя и ворона). Вавилонская башня (Быт. 11) — переосмысление зиккурата Этеменанки (Вавилон, VI в. до н.э.). Правовая традиция Месопотамии через Авраама и Моисея вошла в библейское право: шумерские «реформы Уруинимгины» (XXIV в. до н.э.) — древнейшие известные законы, защищающие бедных от произвола. Авраам вышел из месопотамского культурного контекста (Быт. 11:31): язык (аккадский → древнееврейский), обычаи и юридические нормы.' },
  { from: 'egyptian',      to: 'abraham', color: 'rgba(212,196,168,0.2)',   width: 1, dashes: true, label: 'Егип. контекст', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '🇪🇬 Египетский контекст | Моисей вырос при дворе фараона · Египетская мудрость (Деян. 7:22) · Параллели: Книга мёртвых ↔ эсхатология', details: 'Моисей «был научен всей мудрости египетской» (Деян. 7:22). Египетская «Книга мёртвых» (XX–XVI вв. до н.э.) содержит сцены загробного суда: взвешивание сердца на весах против пера Маат — прямая параллель к библейскому суду и Дан. 5 (исчисление, взвешивание). «Поучения Аменемопе» (XIII–XI вв. до н.э.) текстуально близки к Книге Притчей Соломоновых (Притч. 22:17–24:22): «Приклони ухо твоё и слушай слова мудрых» — почти дословный перевод египетского оригинала. Псалом 104 прославляет Бога за творение — его структура восходит к гимну Эхнатона (XIV в. до н.э.) «Солнцу» (Атону). Исход из Египта под руководством Моисея (XIII в. до н.э.) сформировал израильскую идентичность; сама история Исхода использует египетский литературный жанр «рассказа о бегстве» (сказка о Синухе, XX в. до н.э.).' },
  { from: 'canaanite',     to: 'judaism', color: 'rgba(212,196,168,0.2)',    width: 1.5, dashes: true, label: 'Ханаан. влияние', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '🏺 Ханаанское влияние | Израильская религия выросла из ханаанской · Эль/Элохим — ханаанский бог · Полемика с Ваалом и Ашерой · Монотеизм — к VI в. до н.э.', details: 'Ранние израильтяне говорили на ханаанском языке (древнееврейский — его диалект). Угаритские тексты (XIV–XII вв. до н.э., Рас-Шамра) проливают свет на ханаанский пантеон: верховный бог Эль (ср. Элохим), его сын Баал (ср. библейскую полемику с Ваалом), богиня Ашера (ср. запрет ашер в Библии). Имена многих библейских патриархов (Авраам, Иаков) — сокращённые формы теофорных имён с элементом «Эль». Пророк Илия (IX в. до н.э.) вступил в прямое состязание с пророками Ваала на горе Кармил (3 Цар. 18) — ключевой эпизод борьбы яхвизма с ханаанским культом. Археологические находки в Кунтиллет-Айруд (VIII в. до н.э.) — надпись «Яхве и его Ашера» — свидетельствуют, что даже после Соломона израильтяне почитали Яхве в паре с ханаанской богиней. Окончательный монотеизм утвердился лишь после вавилонского пленения (VI в. до н.э.) через реформы Ездры и Неемии.' },
  { from: 'zoroastrian',   to: 'judaism', color: 'rgba(212,196,168,0.2)',    width: 1.5, dashes: true, label: 'Эсхатология', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '🔥 Зороастрийское влияние | Эпоха Второго Храма · Воскресение мёртвых · Судный день · Архангелы · Мессия · Рай и ад', details: 'Иудеи эпохи Второго Храма (VI–I вв. до н.э.) жили под властью Персии, где зороастризм был господствующей религией. Пророк Исайя (Второисайя, VI в. до н.э.) создал монотеистический манифест (Ис. 45) в полемике с персидским дуализмом: «Я Господь, и нет иного». Книга Даниила (II в. до н.э.) впервые в Библии учит о воскресении мёртвых (Дан. 12:2) и Судном дне — прямо под влиянием зороастрийской эсхатологии (Фрашо-керети, обновление мира). Община Кумрана (II–I вв. до н.э.) разработала детальную ангелологию (Михаил, Гавриил как архангелы) и учение о двух путях (сыны света/тьмы) — очевидная параллель с зороастрийскими Амеша-Спента и дуализмом Ахура-Мазды и Ахримана. Филон Александрийский (I в.) синтезировал иудейскую ангелологию с греческим Логосом. Иосиф Флавий (I в.) свидетельствует, что фарисеи верили в воскресение и загробное воздаяние — концепции, чуждые раннему иудаизму, но центральные в зороастризме.' },
  { from: 'hellenistic',   to: 'christianity', color: 'rgba(212,196,168,0.2)',  width: 1.5, dashes: true, label: 'Филос. основа', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '🏛 Философская основа | Платонизм: Логос, бессмертие души · Стоицизм: добродетель · Аристотелизм: логика · Августин, Ориген', details: 'Христианское богословие сформировалось на греческом языке в категориях греческой философии. Филон Александрийский (ок. 25 до н.э. – 50 н.э.) создал аллегорический метод толкования Писания и учение о Логосе как посреднике — его идеи легли в Пролог Евангелия от Иоанна. Иустин Философ (100–165) в «Апологиях» учил о «сперматическом Логосе»: семена истины у греков — предвестие Христа. Ориген (185–254) в трактате «О началах» синтезировал платонизм с христианской теологией; его аллегорический метод экзегезы определил библеистику на века. Августин (354–430) через неоплатонизм пришёл к христианству («Исповедь»), разработал учения о Троице, предопределении и граде Божьем. Каппадокийцы (Василий Великий, Григорий Назианзин, Григорий Нисский, IV в.) переформулировали никейский догмат в платонических терминах («единосущие»). Псевдо-Дионисий Ареопагит (V–VI вв.) через неоплатоническую иерархию описал небесные чины и церковную структуру.' },
  { from: 'roman_pagan',   to: 'christianity', color: 'rgba(212,196,168,0.2)',  width: 1.5, dashes: true, label: 'Римский\nконтекст', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '🏛 Римский контекст | Римская империя — среда возникновения христианства · Римское право · Культ императора · Гонения', details: 'Христианство распространялось в пределах Римской империи: римские дороги и Pax Romana позволили Павлу из Тарса (I в.) пройти 15 000 км с проповедью от Антиохии до Испании. Греческий койне — единый язык Средиземноморья — стал языком Нового Завета и Септуагинты. Гонения императоров (Нерон, 64 г. — первое гонение, казнь Петра и Павла; Диоклетиан, 303–311 гг. — «Великое гонение») укрепили церковь институционально. Император Константин (Миланский эдикт, 313 г.) не только легализовал христианство, но и созвал Первый Никейский собор (325 г.), задавший имперскую модель вселенских соборов. Император Феодосий (380 г., эдикт «Cunctos populos») сделал христианство государственной религией. Епископ Амвросий Медиоланский (IV в.) публично отлучил императора Феодосия за резню в Фессалониках — прецедент верховенства церкви над светской властью. Римское право легло в основу канонического права (Corpus Iuris Canonici), а латынь как язык Западной церкви оставалась языком богословия до XVI в.' },
  { from: 'norse',          to: 'christianity', color: 'rgba(212,196,168,0.2)',  width: 1.5, dashes: true, label: 'Христиа-\nнизация', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '⚔ Христианизация Скандинавии | X–XIII вв. · Короли-миссионеры (Олаф, Кнут) · Синкретизм с северной традицией', details: 'Христианизация Скандинавии (X–XIII вв.). Св. Ансгар (801–865) — первый миссионер в Дании и Швеции («апостол Севера»), построил первую церковь в Бирке. Олаф Трюггвасон (995–1000), король Норвегии, крестил страну силой: разрушал капища, казнил ярлов-язычников, привёз миссионеров из Англии. Олаф Харальдссон (Святой Олаф, 1015–1028) завершил христианизацию Норвегии, его культ распространился по всей Скандинавии. Кнут Великий (1016–1035) объединил Данию, Англию и Норвегию в империю, ввёл англосаксонскую церковную модель. Снорри Стурлусон (1179–1241), исландский историк и поэт, записал «Младшую Эдду» и «Круг Земной», сохранив скандинавскую мифологию уже через призму христианской культуры: его Один — уже не бог, а исторический царь Азии. «Старшая Эдда» (XIII в.) — сборник языческих мифов, записанный христианскими монахами. Рагнарёк («сумерки богов») был переосмыслен как христианский Апокалипсис с элементами германо-скандинавского эпоса.' },
  { from: 'slavic_pagan',  to: 'christianity', color: 'rgba(212,196,168,0.2)',  width: 1.5, dashes: true, label: 'Крещение\nславян', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '☦ Крещение славян | IX–X вв. · Кирилл и Мефодий · Крещение Руси (988) · Двоеверие', details: 'Кирилл (827–869) и Мефодий (815–885), солунские греки, создали глаголицу и перевели Библию и литургию на славянский язык, заложив основы славянской письменности и православной культуры. Князь Владимир Святославич (958–1015), согласно «Повести временных лет», выбрал христианство византийского обряда после того, как его послы увидели красоту богослужения в Святой Софии Константинопольской («не знали, на небе или на земле мы»). Крещение Руси в 988 г. приобщило восточных славян к византийской цивилизации, письменности, иконописи, каменному зодчеству (София Киевская, 1037). Иларион Киевский (XI в.) в «Слове о законе и благодати» — первое оригинальное философское произведение Древней Руси. Нестор Летописец (XI–XII вв.) создал «Повесть временных лет» — основной источник по истории Древней Руси. Двоеверие — синтез христианства с культом Перуна, Велеса, Масленицей и русалиями — сохранялось в народной культуре вплоть до XX в.' },
  { from: 'pre_islamic_arabia', to: 'islam', color: 'rgba(212,196,168,0.2)',  width: 1.5, dashes: true, label: 'Аравийский\nконтекст', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '🕋 Доисламская Аравия | Кааба · Ханфиты · Иудейские и христианские общины · Племенной политеизм', details: 'Мухаммад (570–632) родился в Мекке, где находилась Кааба — древнее святилище с идолами 360 племенных божеств (ал-Лат, аль-Узза, Манат — «дочери Аллаха», упомянутые в Коране 53:19–20). Ханифы — доисламские монотеисты, такие как Зейд ибн Амр и Варака ибн Науфаль (двоюродный брат Хадиджи), — отвергали идолопоклонство и искали «религию Авраама». Иудейские общины Медины (Бану Курайза, Бану Надир, Бану Кайнука) повлияли на формирование исламского права и эсхатологии. Христианский монах Бахира (по преданию, встретил юного Мухаммада в Сирии) предсказал ему пророчество. Персидский зороастризм через Сасанидскую империю повлиял на исламскую ангелологию (Джибрил, Микаил) и эсхатологию (Сират, рай и ад). Византийская и эфиопская христианские традиции отражены в коранических рассказах о Марйам (Марии) и Исе (Иисусе).' },
  { from: 'vedic',          to: 'hinduism',    color: 'rgba(212,196,168,0.2)',  width: 1.5, dashes: true, label: 'Ведич.\\nоснова', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '📜 Ведическая основа | Ригведа · Жертвоприношения · Брахманы · Упанишады · Эволюция в индуизм', details: 'Ведическая религия (XV–V вв. до н.э.) — предшественница индуизма. Ригведа (X–XV вв. до н.э.) — древнейший индоевропейский текст, гимны Индре, Агни, Варуне, Соме. Мудрец Яджнявалкья (VIII–VII вв. до н.э.) в «Брихадараньяка-упанишаде» сформулировал учение об Атмане (тождестве внутреннего «я» и абсолютного Брахмана) — центральная идея веданты. Шанкара (VIII–IX вв.) в комментариях к «Веданта-сутре» систематизировал адвайту (не-дуализм): Брахман — единственная реальность, мир — иллюзия (майя). Рамануджа (XI в.) в «Шри-бхашье» разработал вишишта-адвайту (квалифицированный монизм) с личным Богом Вишну. Мадхва (XIII в.) создал двайту (дуализм): душа и Бог разделены навечно. Все три школы признают авторитет Вед — в этом эволюция ведизма в классический индуизм.' },
  { from: 'ancient_roots', to: 'celtic_pagan',    color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'baltic_pagan',    color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'finno_ugric',     color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'tengrism',        color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'african_trad',    color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'polynesian',      color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'ancient_roots', to: 'native_american', color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'celtic_pagan',   to: 'christianity', color: 'rgba(212,196,168,0.2)',  width: 1, dashes: true, label: 'Христиа-\nнизация', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '☘ Христианизация кельтов | Св. Патрик (V в.) · Ирландское монашество · Синтез кельтской и христианской традиции', details: 'Христианизация кельтов (V–VII вв.). Св. Патрик (389–461), бывший раб в Ирландии, стал её крестителем: использовал трилистник (трикелис) для объяснения Троицы, основал церковь в Арме. Кельтский крест (кольцо вокруг перекрестья) — синтез христианского креста и солярного символа. Ирландские монастыри (Килдэр, Клонмакнойс, Скрипторий на острове Айона) сохранили античную учёность во время варварских нашествий: монахи переписывали не только Библию, но и Вергилия, Овидия, греческих философов. «Книга Келлс» (ок. 800) — шедевр островного искусства, синтез кельтского орнамента с христианскими сюжетами. Колумбан (543–615), ирландский миссионер, основал монастыри во Франции (Люксёй) и Италии (Боббио), неся ирландскую монашескую традицию в Европу. Бритты (Уэльс, Корнуолл) сохранили христианство с римских времён; Св. Давид (VI в.) — небесный покровитель Уэльса. Друидические традиции (почитание дубов, священных источников) были переосмыслены: кельтские святые часто проповедовали у священных деревьев и источников.' },
  { from: 'baltic_pagan',   to: 'christianity', color: 'rgba(212,196,168,0.2)',  width: 1, dashes: true, label: 'Крещение\nбалтов', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '⚔ Крещение балтов | XIII–XIV вв. · Тевтонский орден · Литва — последняя языческая страна Европы', details: 'Христианизация балтов (XIII–XIV вв.). Пруссы были покорены и насильственно крещены Тевтонским орденом (1230–1283); «Прусская правда» Хелминского замка — попытка обратить пруссов через смешанные браки и судебные санкции. Великое княжество Литовское при князе Миндовге (1251) приняло католичество, но в 1261 г. вернулось в язычество — единственный такой случай в истории. Князь Гедимин (1316–1341) в письмах к францисканцам и доминиканцам терпимо относился ко всем религиям, приглашая в Вильну христианских миссионеров при сохранении языческого культа. Князь Ягайло (1385–1434) по Кревской унии (1385) принял католичество и крестил Литву в 1387 г., получив за это польскую корону. Витовт Великий (1392–1430) продолжил христианизацию Жемайтии, строя костёлы на месте бывших капищ. Балтская мифология сохранилась: Перкунас (громовержец) отождествлялся со св. Ильёй; праздник Йонинес (Ивана Купалы, летнее солнцестояние) — прямое продолжение балтского праздника Раса (лит.)/Лиго (латыш.). Эпос «Лачплесис» (латыш.) отразил синтез балтской и христианской мифологии.' },
  { from: 'finno_ugric',    to: 'christianity', color: 'rgba(212,196,168,0.2)',  width: 1, dashes: true, label: 'Крещение\nфиннов', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '☦ Христианизация финно-угров | XI–XIV вв. · Епископ Генрих · Калевала как языческий эпос', details: 'Христианизация финно-угров (XI–XIV вв.). Епископ Генрих (ок. 1150), англичанин, крестил финнов в ходе шведского крестового похода; убит крестьянином Лалли на льду озера Кёюлиё — позже оба почитались как святые. Шведский король Эрик IX Святой (1150–1160) организовал Первый шведский крестовый поход в Финляндию. Микаэль Агрикола (1510–1557), «отец финской письменности», перевёл Новый Завет на финский (1548), создав литературный финский язык; в предисловии он перечислил языческих богов Финляндии (Укко, Акка, Ахти), тем самым сохранив их имена для истории. Элиас Лённрот (1802–1884) собрал «Калевалу» — финский народный эпос, сохранивший языческие мифы: Вяйнямёйнен (первопредок, певец рун), Ильмаринен (кузнец неба), Лоухи (хозяйка Похьёлы), Сампо (мельница изобилия). Карелы были крещены через Новгород (XII–XIII вв.) с сохранением сильного пласта языческой карельской мифологии. Марийцы (черемисы) — единственный финно-угорский народ Европы, частично сохранивший традиционную этническую религию (марийская вера, Юмо — верховный бог) до XXI в., несмотря на многовековое православное давление. Удмурты и коми сохранили культ медведя, священных рощ (луд) и жертвоприношения вплоть до XX в. (Великий Пермь, Стефан Пермский, XIV в., крестил коми, создав древнепермскую азбуку).' },
  { from: 'tengrism',       to: 'islam',        color: 'rgba(212,196,168,0.2)',  width: 1, dashes: true, label: 'Тюрки →\nислам', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '☪ Исламизация тюрок | X–XIV вв. · Караханиды · Сельджуки · Османы · Синтез тенгрианства и ислама', details: 'Исламизация тюрок (X–XIV вв.). Сатук Богра-хан (X в.), правитель Караханидов, первым из тюркских правителей принял ислам и ввёл его как государственную религию (ок. 960). Махмуд аль-Кашгари (XI в.) в «Диван лугат ат-турк» («Словаре тюркских наречий») описал тюркские племена и их тенгрианские верования уже с позиции исламского учёного. Сельджуки (XI–XIV вв.) — тюркская династия, принявшая ислам суннитского толка; султан Альп-Арслан (1063–1072) разгромил византийцев при Манцикерте (1071), открыв тюркам Анатолию. Джалаладдин Руми (1207–1273), персидский поэт-суфий, творивший в сельджукской Конье, синтезировал исламский мистицизм с тюркскими фольклорными мотивами. Османы (XIII–XX вв.) — последняя великая тюркская мусульманская империя. Султан Мехмед II Завоеватель (1432–1481) взял Константинополь (1453), сделав его исламской столицей. Тенгрианские элементы сохранились в народном исламе: почитание святых мест (аулие / «святые могилы» предков), культ Неба (Тенгри отождествлён с Аллахом), шаманские камлания, превратившиеся в зикры суфийских братств (Бекташи, Накшбанди). Ясы (город Туркестан) — центр тюркского суфизма: Ходжа Ахмет Ясави (1093–1166) создал мистическую поэзию на тюркском языке, «Диван-и Хикмет», сочетавшую коранический символизм с тенгрианскими образами.' },
  { from: 'tengrism',       to: 'buddhism',     color: 'rgba(212,196,168,0.2)',  width: 1, dashes: true, label: 'Монголы →\nбуддизм', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '☸ Монголы и буддизм | XVI в. · Алтан-хан · Далай-лама · Синтез шаманизма и буддизма', details: 'Принятие буддизма монголами (XVI в.). Чингисхан (1162–1227) и早期 Монгольская империя придерживались тенгрианства (Вечное Синее Небо), но были терпимы ко всем религиям: буддийские монахи, мусульманские купцы, христианские миссионеры (несториане) свободно действовали при дворе. Хубилай-хан (1215–1294) основатель династии Юань, приблизил тибетского ламу Пагба-ламу (1235–1280), создавшего квадратное письмо Пагба для монгольского языка — попытка синтеза буддийской письменной традиции с монгольским языком. Однако массовое принятие буддизма произошло лишь в XVI в.: Алтан-хан (1507–1582) из династии Чингизидов пригласил тибетского ламу Соднама Гьяцо (1543–1588) и даровал ему титул «Далай-лама» (Океан мудрости) — основа института далай-лам. Монгольская знать строила монастыри (дацаны), где буддийские тантры синтезировались с шаманскими камланиями: духи-хозяева местности (эттены, сабдаки) стали буддийскими защитниками (дхармапалами). Цонкапа (1357–1419), основатель школы Гелуг, чьё учение приняли монголы, разработал строгую монашескую дисциплину и философию прасангики-мадхьямаки. Бурятский и калмыцкий буддизм (XVII–XVIII вв.) сохранил сильнейший слой добуддийских верований: почитание обо (священных куч камней), культ предков, обожествление Чингисхана как буддийского защитника (бодхисаттвы). Агван Доржиев (1853–1938), бурятский лама, сыграл ключевую роль в диалоге буддизма с Российской империей: построил буддийский храм в Санкт-Петербурге (1915) — первый в Европе.' },
  { from: 'african_trad',   to: 'christianity', color: 'rgba(212,196,168,0.2)',  width: 1, dashes: true, label: 'Африка\nхристиан.', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '⛪ Христианство в Африке | Коптская церковь (I в.) · Португальские миссии (XV в.) · Афро-христианские синкретические культы', details: 'Христианство в Африке имеет две волны: ранняя (Коптская церковь в Египте и Эфиопии с I в.) и колониальная (португальские миссии с XV в., позже протестантские). Возникли синкретические афро-христианские культы: кимбангизм в Конго, аладура в Нигерии, зионистские церкви в Южной Африке.' },
  { from: 'african_trad',   to: 'islam',        color: 'rgba(212,196,168,0.2)',  width: 1, dashes: true, label: 'Африка\nислам', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '☪ Ислам в Африке | Торговля через Сахару · Империи Гана, Мали, Сонгай · Суфизм и африканские традиции', details: 'Ислам распространился в Африке через транссахарскую торговлю (VIII–XIV вв.). Африканские империи (Гана, Мали, Сонгай) приняли ислам, сохранив местные традиции. Суфийские братства (тиджания, кадирия) синтезировали ислам с африканскими верованиями. В Западной Африке ислам часто сосуществует с традиционными культами.' },
  { from: 'polynesian',     to: 'christianity', color: 'rgba(212,196,168,0.2)',  width: 1, dashes: true, label: 'Океания\nхристиан.', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '⛵ Христианизация Океании | XVIII–XIX вв. · Миссионеры (Лондонское миссионерское общество) · Таити, Гавайи, Новая Зеландия', details: 'Христианизация Океании (XVIII–XIX вв.). Таити: Лондонское миссионерское общество (1797); король Помаре II (1812) принял христианство и ввёл законы на библейской основе, запретив идолопоклонство и человеческие жертвоприношения. Гавайи: король Камехамеха II (1819) нарушил древнюю систему тапу, публично разделив трапезу с женщинами; американские миссионеры (1820, Аса Тёрстон и Хайрам Бингем) создали гавайскую письменность и перевели Библию; королева Каахуману (1824) приняла крещение. Новая Зеландия (маори): миссионер Сэмюэл Марсден (1765–1838) основал первую миссию (1814); вожди маори (Хонги Хика, Потахо) использовали христианство для укрепления своей власти. Перевод Библии на язык маори (1837, Уильям Уильямс) создал литературный стандарт маори. Религиозное движение Паи-Марире (Хау-Хау, 1862, пророк Те Уа) — синтез маорийских верований (мана, тапу) с христианскими элементами: идол в виде шеста с христианскими символами, защита от пуль. Самоа: миссионер Джон Уильямс (1796–1839) крестил острова; вождь Малиетоа защищал миссионеров и способствовал распространению христианства. Пасха (Рапануи): христианство пришло через католических миссионеров (1864), что привело к утрате письменности ронго-ронго.' },
  { from: 'native_american', to: 'christianity', color: 'rgba(212,196,168,0.2)',  width: 1, dashes: true, label: 'Америка\nхристиан.', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '⛪ Христианизация Америки | XVI–XIX вв. · Испанские миссии · Синкретизм: Санта-Муэрте, Пачамама, Навахо-христианство', details: 'Христианство было принесено в Америку европейскими колонизаторами (XVI в.). Католические миссии в Латинской Америке породили синкретические культы: Санта-Муэрте (Мексика), Пачамама (Анды), синтез католичества с верованиями навахо. В Северной Америке миссионеры создали письменность для многих языков коренных народов.' },

  // ─── ROOT ───────────────────────────────────────────────
  { from: 'abrahamic', to: 'christianity', color: 'rgba(255,255,255,0.15)', width: 2.5 },
  { from: 'abrahamic', to: 'islam',        color: 'rgba(255,255,255,0.15)', width: 2.5 },

  // ─── CHRISTIANITY TREE ──────────────────────────────────
  { from: 'christianity', to: 'catholicism',    color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'christianity', to: 'orthodoxy',       color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'christianity', to: 'protestantism',   color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'catholicism',   to: 'roman_catholic',  color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'catholicism',   to: 'eastern_catholic',color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'orthodoxy',     to: 'eastern_orthodox',color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'orthodoxy',     to: 'oriental_orthodox',color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'protestantism', to: 'lutheranism',     color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'protestantism', to: 'anglicanism',     color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'protestantism', to: 'calvinism',       color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'protestantism', to: 'baptist',         color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'protestantism', to: 'methodism',       color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'protestantism', to: 'pentecostalism',  color: 'rgba(255,255,255,0.08)', width: 1.5 },

  { from: 'new_testament', to: 'gospels',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'new_testament', to: 'apostles',       color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── JUDAISM TREE ────────────────────────────────────────
  { from: 'abrahamic', to: 'judaism', color: 'rgba(255,255,255,0.15)', width: 2.5 },

  { from: 'judaism', to: 'orthodox_judaism',    color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'judaism', to: 'conservative_judaism', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'judaism', to: 'reform_judaism',       color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'tanakh',  to: 'torah', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── ISLAM TREE ─────────────────────────────────────────
  { from: 'islam', to: 'sunni', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'islam', to: 'shia',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'islam', to: 'sufism',color: 'rgba(255,255,255,0.12)', width: 2 },

  // ─── ISLAM ADDITIONS ──────────────────────────────────────────
  { from: 'sufism', to: 'sufi_tariqas', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sufi_tariqas', to: 'qadiriyya',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sufi_tariqas', to: 'naqshbandiyya', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sufi_tariqas', to: 'suhrawardiyya', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sufism', to: 'kalam',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sufism', to: 'falsafa', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sunni', to: 'fiqh_schools',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'fiqh_schools', to: 'hanafi',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'fiqh_schools', to: 'maliki',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'fiqh_schools', to: 'shafi_i', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'fiqh_schools', to: 'hanbali', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_practices', to: 'islam_zikr',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_practices', to: 'islam_dua',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_practices', to: 'islam_tawaf', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── UNRECOGNIZED BRANCHES (CHRISTIANITY) ──────────────────
  { from: 'christianity',   to: 'marginal_branch',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'marginal_branch', to: 'mormonism',         color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'marginal_branch', to: 'jehovah_witnesses', color: 'rgba(255,255,255,0.08)', width: 1.5 },
  { from: 'marginal_branch', to: 'unitarianism',      color: 'rgba(255,255,255,0.08)', width: 1.5 },

  // ─── APOCRYPHA (CHRISTIANITY) ──────────────────────────────
  { from: 'apocrypha',    to: 'apocrypha_ot', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'apocrypha',    to: 'apocrypha_nt', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'apocrypha_ot', to: 'enoch',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'apocrypha_ot', to: 'jubilees',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'apocrypha_nt', to: 'gospel_thomas', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'apocrypha_nt', to: 'gospel_judas',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'apocrypha_nt', to: 'gospel_mary',   color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── KABBALAH (JEWISH MYSTICISM) ───────────────────────────
  { from: 'kabbalah',   to: 'zohar',          color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'kabbalah',   to: 'sefer_yetzirah', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── JUDAISM ADDITIONS ──────────────────────────────────────
  { from: 'judaism', to: 'hasidism',          color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_beliefs', to: 'jewish_philosophy', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_beliefs', to: 'maimonides',        color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── CATEGORY GROUP EDGES (CHRISTIANITY) ──────────────────
  { from: 'christianity', to: 'christianity_beliefs',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'christianity', to: 'christianity_texts',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'christianity', to: 'christianity_rules',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'christianity', to: 'christianity_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'christianity', to: 'christianity_apocrypha', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'christianity_beliefs',   to: 'trinity',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_beliefs',   to: 'incarnation',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_beliefs',   to: 'salvation',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_beliefs',   to: 'resurrection',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_beliefs',   to: 'second_coming',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_texts',     to: 'old_testament',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_texts',     to: 'new_testament',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_rules',     to: 'ten_commandments', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_rules',     to: 'great_commandment', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_rules',     to: 'beatitudes',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_rules',     to: 'golden_rule',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'baptism_sac',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'eucharist',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'confirmation',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'penance',         color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'anointing',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'marriage_sac',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'holy_orders_sac', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_apocrypha', to: 'apocrypha',       color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── CATEGORY GROUP EDGES (JUDAISM) ───────────────────────
  // ─── CHRISTIANITY ADDITIONS ──────────────────────────────────
  { from: 'christianity_beliefs', to: 'nicean_creed',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_beliefs', to: 'chalcedon_creed',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_texts',   to: 'ecumenical_councils', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_texts',   to: 'church_fathers',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'church_fathers',       to: 'patristics',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'liturgy_byzantine', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'liturgy_roman',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'monasticism',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'hesychasm',         color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'icon_veneration',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'jesus_prayer',         color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'christian_fasting',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'christianity_practices', to: 'christian_pilgrimage', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── CATEGORY GROUP EDGES (JUDAISM) ───────────────────────
  { from: 'judaism', to: 'judaism_beliefs',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'judaism', to: 'judaism_texts',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'judaism', to: 'judaism_rules',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'judaism', to: 'judaism_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'judaism', to: 'kabbalah',          color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'judaism_beliefs',   to: 'judaism_covenant',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_beliefs',   to: 'chosen_people',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_beliefs',   to: 'judaism_mashiach',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_texts',     to: 'tanakh',            color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_texts',     to: 'talmud',            color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_rules',     to: 'mitzvot_613',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_rules',     to: 'ten_commandments',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_practices', to: 'shabbat',           color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_practices', to: 'kashrut',           color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_practices', to: 'judaism_brit_milah', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_practices', to: 'judaism_holidays',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_practices', to: 'tefillah', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_practices', to: 'tzedakah', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'judaism_practices', to: 'mikvah',   color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── CATEGORY GROUP EDGES (ISLAM) ─────────────────────────
  { from: 'islam', to: 'islam_beliefs', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'islam', to: 'islam_texts',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'islam', to: 'islam_rules',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'islam', to: 'islam_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'islam_beliefs', to: 'tawhid',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_beliefs', to: 'prophethood',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_beliefs', to: 'angels',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_beliefs', to: 'holy_books',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_beliefs', to: 'judgment_day',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_beliefs', to: 'qadr',          color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_texts',   to: 'quran',         color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_texts',   to: 'hadith',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_rules',   to: 'shahada',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_rules',   to: 'salat',         color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_rules',   to: 'zakat',         color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_rules',   to: 'sawm',          color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_rules',   to: 'hajj',          color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'islam_rules',   to: 'halal',         color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── HINDUISM ──────────────────────────────────────────────
  { from: 'dharmic', to: 'hinduism',         color: 'rgba(255,255,255,0.15)', width: 2.5 },

  { from: 'hinduism', to: 'hinduism_traditions', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'hinduism_traditions', to: 'vaishnavism', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'hinduism_traditions', to: 'shaivism',    color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'hinduism_traditions', to: 'shaktism',    color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'hinduism_traditions', to: 'smartism',    color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'hinduism', to: 'hinduism_beliefs',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'hinduism', to: 'hinduism_texts',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'hinduism', to: 'hinduism_rules',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'hinduism', to: 'hinduism_practices', color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'hinduism_beliefs',   to: 'brahman',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_beliefs',   to: 'atman',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_beliefs',   to: 'karma',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_beliefs',   to: 'samsara',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_beliefs',   to: 'moksha',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_beliefs',   to: 'dharma',    color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'hinduism_texts',     to: 'vedas',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_texts',     to: 'upanishads',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_texts',     to: 'bhagavad_gita', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_texts',     to: 'puranas',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_texts',     to: 'itihasas',    color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'itihasas',     to: 'ramayana',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'itihasas',     to: 'mahabharata', color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'vedas',        to: 'rigveda',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'vedas',        to: 'samaveda',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'vedas',        to: 'yajurveda',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'vedas',        to: 'atharvaveda', color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'hinduism_rules',     to: 'yamas',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_rules',     to: 'niyamas',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_rules',     to: 'ahimsa',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_rules',     to: 'satya_hindu',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_rules',     to: 'brahmacharya', color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'hinduism_practices', to: 'yoga',            color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_practices', to: 'puja',            color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_practices', to: 'meditation_hindu', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_practices', to: 'mantra',          color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_practices', to: 'bhakti',          color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'yoga', to: 'yoga_types',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'yoga_types', to: 'raja_yoga',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'yoga_types', to: 'karma_yoga',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'yoga_types', to: 'bhakti_yoga',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'yoga_types', to: 'jnana_yoga',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'yoga_types', to: 'kriya_yoga',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'yoga_types', to: 'hatha_yoga',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'yoga_types', to: 'kundalini_yoga', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'yoga_types', to: 'mantra_yoga',   color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── PHILOSOPHICAL SCHOOLS (CONNECTED TO THEIR TRADITIONS) ─────
  { from: 'smartism',     to: 'advaita_vedanta', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'vaishnavism',  to: 'vishishtadvaita', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'vaishnavism',  to: 'dvaita',          color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_traditions', to: 'samkhya',         color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_traditions', to: 'nyaya',           color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_traditions', to: 'vaisheshika',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_traditions', to: 'hinduism_modern', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'hinduism_modern',  to: 'brahmo_samaj',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_modern',  to: 'arya_samaj',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_modern',  to: 'ramakrishna_mission', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_modern',  to: 'iskcon',          color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_modern',  to: 'osho',            color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_modern',  to: 'ananda_marga',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_modern',  to: 'agni_yoga',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'hinduism_modern',  to: 'integral_yoga',   color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── BUDDHISM ─────────────────────────────────────────────────
  { from: 'dharmic', to: 'buddhism', color: 'rgba(255,255,255,0.15)', width: 2.5 },

  { from: 'buddhism', to: 'buddhism_schools',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'buddhism', to: 'buddhism_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'buddhism', to: 'buddhism_texts',    color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'buddhism', to: 'buddhism_practices',color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'buddhism_schools',  to: 'theravada',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_schools',  to: 'mahayana',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_schools',  to: 'vajrayana',  color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'buddhism_beliefs',  to: 'four_noble_truths', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_beliefs',  to: 'eightfold_path',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_beliefs',  to: 'buddhist_karma',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_beliefs',  to: 'nirvana',           color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'buddhism_texts',    to: 'tripitaka',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_texts',    to: 'buddhist_sutras', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_texts',    to: 'dhammapada',     color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'buddhism_practices', to: 'meditation_buddhist', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_practices', to: 'mindfulness',         color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_practices', to: 'buddhist_chanting',   color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── BUDDHISM ADDITIONS ──────────────────────────────────────
  { from: 'buddhism_beliefs',  to: 'madhyamaka',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_beliefs',  to: 'yogacara',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_beliefs',  to: 'dzogchen',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_schools',  to: 'pure_land',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_practices', to: 'buddhist_tantra', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_practices', to: 'zazen',               color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_practices', to: 'metta_bhavana',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_practices', to: 'buddhist_prostrations', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_practices', to: 'buddhist_offerings',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'buddhism_practices', to: 'buddhist_mandala',    color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── JAINISM ────────────────────────────────────────────────────
  { from: 'dharmic', to: 'jainism', color: 'rgba(255,255,255,0.15)', width: 2.5 },

  { from: 'jainism', to: 'jainism_beliefs',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'jainism', to: 'jainism_texts',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'jainism', to: 'jainism_rules',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'jainism', to: 'jainism_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'jainism', to: 'jainism_schools',   color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'jainism_beliefs',   to: 'jiva_ajiva',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'jainism_beliefs',   to: 'ahimsa_jain',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'jainism_beliefs',   to: 'karma_jain',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'jainism_beliefs',   to: 'kevala_jnana',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'jainism_beliefs',   to: 'samsara_jain',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'jainism_beliefs',   to: 'moksha_jain',    color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'jainism_texts',     to: 'agamas',           color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'jainism_texts',     to: 'tattvartha_sutra', color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'jainism_rules',     to: 'five_vows_jain',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'jainism_rules',     to: 'asceticism_jain',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'jainism_rules',     to: 'three_jewels_jain',  color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'jainism_practices', to: 'meditation_jain',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'jainism_practices', to: 'fasting_jain',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'jainism_practices', to: 'pilgrimage_jain',  color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'jainism_schools',   to: 'digambara',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'jainism_schools',   to: 'shvetambara', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── SIKHISM ────────────────────────────────────────────────────
  { from: 'dharmic', to: 'sikhism', color: 'rgba(255,255,255,0.15)', width: 2.5 },

  { from: 'sikhism', to: 'sikhism_beliefs',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'sikhism', to: 'sikhism_texts',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'sikhism', to: 'sikhism_rules',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'sikhism', to: 'sikhism_practices', color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'sikhism_beliefs',   to: 'ek_onkar',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sikhism_beliefs',   to: 'gurus_sikh',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sikhism_beliefs',   to: 'khalsa',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sikhism_beliefs',   to: 'sewa_sikh',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sikhism_beliefs',   to: 'karma_sikh',    color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'sikhism_texts',     to: 'guru_granth_sahib', color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'sikhism_rules',     to: 'five_ks',          color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sikhism_rules',     to: 'sikh_principles',  color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'sikhism_practices', to: 'langar',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'sikhism_practices', to: 'kirtan_sikh', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── EAST ASIAN ────────────────────────────────────────────────
  { from: 'ancient_roots', to: 'east_asian', color: 'rgba(255,255,255,0.06)', width: 1, dashes: true, label: 'Древнекит.\nтрадиция', font: { size: 8, color: 'rgba(255,255,255,0.35)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '🏮 Древнекитайская традиция | Древняя китайская культура (Хуанхэ, Шан-Инь) — основа даосизма, конфуцианства и народных верований', details: 'Китайская цивилизация — одна из древнейших, сформировалась в бассейне Хуанхэ (XX–XV вв. до н.э.). Древние верования (культ предков, Неба, оракульные практики) заложили основу для даосизма и конфуцианства, а через культурное влияние — и для японского синтоизма.' },

  { from: 'east_asian', to: 'taoism',       color: 'rgba(255,255,255,0.15)', width: 2.5 },
  { from: 'east_asian', to: 'confucianism',  color: 'rgba(255,255,255,0.15)', width: 2.5 },
  { from: 'east_asian', to: 'shinto',        color: 'rgba(255,255,255,0.15)', width: 2.5 },

  // ─── TAOISM TREE ───────────────────────────────────────────────
  { from: 'taoism', to: 'taoism_beliefs',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'taoism', to: 'taoism_texts',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'taoism', to: 'taoism_practices', color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'taoism_beliefs',   to: 'tao',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'taoism_beliefs',   to: 'de_tao',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'taoism_beliefs',   to: 'wuwei',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'taoism_beliefs',   to: 'pu_tao',     color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'taoism_texts',     to: 'tao_te_ching',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'taoism_texts',     to: 'zhuangzi_book',  color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'taoism_practices', to: 'taoist_meditation', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'taoism_practices', to: 'qigong',            color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'taoism_practices', to: 'feng_shui',         color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── CONFUCIANISM TREE ─────────────────────────────────────────
  { from: 'confucianism', to: 'confucianism_beliefs',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'confucianism', to: 'confucianism_texts',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'confucianism', to: 'confucianism_practices', color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'confucianism_beliefs',   to: 'ren',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'confucianism_beliefs',   to: 'li_conf',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'confucianism_beliefs',   to: 'yi_conf',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'confucianism_beliefs',   to: 'xiao',      color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'confucianism_texts',     to: 'analects',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'confucianism_texts',     to: 'five_classics', color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'confucianism_practices', to: 'ancestor_worship', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'confucianism_practices', to: 'education_conf',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'confucianism_practices', to: 'rituals_conf',     color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── SHINTO TREE ───────────────────────────────────────────────
  { from: 'shinto', to: 'shinto_beliefs',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'shinto', to: 'shinto_texts',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'shinto', to: 'shinto_practices', color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'shinto_beliefs',   to: 'kami',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'shinto_beliefs',   to: 'amaterasu', color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'shinto_texts',     to: 'kojiki',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'shinto_texts',     to: 'nihon_shoki', color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'shinto_practices', to: 'shinto_purification', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'shinto_practices', to: 'shinto_festivals',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'shinto_practices', to: 'shinto_shrines',     color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── INFLUENCE: BUDDHISM → EAST ASIA ──────────────────────────
  { from: 'buddhism',   to: 'east_asian',  color: 'rgba(180,160,200,0.15)', width: 1, dashes: true, label: 'Буддизм\nв Азии', font: { size: 8, color: 'rgba(180,160,200,0.4)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '☸ Распространение буддизма | Буддизм распространился из Индии в Китай (I в.), Корею (IV в.) и Японию (VI в.), глубоко повлияв на даосизм, конфуцианство и синтоизм', details: 'Буддизм пришёл в Китай через Шёлковый путь (I в. н.э.). Кумараджива (344–413) перевёл более 300 томов сутр на китайский, заложив основы китайского буддизма. Хуэйнэн (638–713), шестой патриарх чань-буддизма, в «Сутре Помоста» синтезировал буддийскую пустоту с даосским недеянием (у-вэй). В Японию буддизм проник через Корею (VI в.); принц Сётоку (574–622) сделал его государственной религией и составил «Конституцию 17 статей» на основе буддийской и конфуцианской этики. В Корее монах Вонхё (617–686) объединил школы буддизма в единую традицию. В Тибете Падмасамбхава (VIII в.) создал тибетский буддизм, синтезировав индийскую тантру с местным бон. Чань-буддизм через Догэна (1200–1253) пришёл в Японию как дзэн, глубоко повлияв на самурайскую этику, чайную церемонию (Сэн-но Рикю, XVI в.) и искусство.' },

  // ─── INFLUENCE CONNECTIONS (HINDUISM ↔ OTHERS) ──────────────
  { from: 'zoroastrian',   to: 'hinduism',  color: 'rgba(212,196,168,0.2)', width: 1.5, dashes: true, label: 'Индо-иран. корни', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '⚛ Индо-иранские корни | Ведическая религия и зороастризм — две ветви единой традиции · Сома/Хаома · Культ огня · Рита/Аша', details: 'Ведическая религия и зороастризм — две ветви единой праиндоиранской традиции (2000–1500 до н.э.). Общее: ритуальный напиток сома/хаома (Ригведа IX vs. Авеста Ясна 9–11), культ огня (Агни в ведах, Атар в Авесте), космический закон рита/аша. После разделения произошла «инверсия»: ведические дева (боги, санскр. deva) стали в зороастризме дэвами (демонами), а асуры — ахурами (Ахура-Мазда). Пророк Заратуштра (ок. 1000 до н.э.) реформировал древнюю религию, отвергнув политеизм: в Гатах (Ясна 30) он учит о двух изначальных Духах (Спента-Майнью vs. Ангра-Майнью) — дуализм добра и зла. Авестийский термин «даэна» (вера, совесть) родствен санскритскому «дхьяна» (медитация). Ригведийский бог Митра (договор, дружба) соответствует авестийскому Митре — судье душ на мосту Чинват. Яджнявалкья в «Шатапатха-брахмане» и Упанишадах развил концепцию Брахмана — абсолюта, параллельную зороастрийскому Ахура-Мазде как всеблагому творцу.' },
  { from: 'hellenistic',   to: 'hinduism',  color: 'rgba(212,196,168,0.2)', width: 1.5, dashes: true, label: 'Греко-инд. обмен', font: { size: 8, color: 'rgba(212,196,168,0.6)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '🏛 Греко-индийский обмен | Индо-греческие царства · Пирронизм ↔ Адвайта-веданта · Неоплатонизм ↔ Веданта', details: 'После походов Александра Македонского (326 г. до н.э.) на северо-западе Индии образовались индо-греческие царства. Царь Менандр (II в. до н.э.) — центральный персонаж буддийского диалога «Милиндапаньха» («Вопросы Милинды»), где он обсуждает буддийскую доктрину с монахом Нагасеной. Пиррон (360–270 до н.э.), основатель скептицизма, участвовал в походе Александра и контактировал с индийскими гимнософистами; его учение о воздержании от суждений (эпохе) обнаруживает прямые параллели с буддийской шуньятой (пустотой) и адвайтой. Неоплатоник Плотин (204–270) учил о Едином, превышающем бытие и мышление, — почти дословное совпадение с концепцией Ниргуна-Брахмана в веданте. Шанкара (788–820), комментируя Упанишады, создал адвайта-веданту — монистическую философию, удивительно близкую к неоплатонизму. Греческая астрономия и астрология через индо-греческие царства проникли в Индию: «Ромака-сиддханта» — индийский астрономический трактат на основе греческих моделей.' },
  { from: 'ancient_roots', to: 'dharmic',   color: 'rgba(255,255,255,0.06)', width: 1, dashes: true, label: 'Ведич. период', font: { size: 8, color: 'rgba(255,255,255,0.35)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '📜 Ведический период | Ведическая цивилизация (XV–V вв. до н.э.) — современница Египта и Месопотамии · Ригведа — древнейший текст', details: 'Ведическая цивилизация (XV–V вв. до н.э.) — одна из древнейших религиозных традиций, современница Египта, Месопотамии и Ханаана. Её тексты (Ригведа) сопоставимы по древности с клинописными табличками Месопотамии. Ведическая религия заложила основы индуизма, подобно тому как религии Междуречья и Египта повлияли на авраамические традиции.' },

  // ─── ROMAN PAGAN TREE ──────────────────────────────────────
  { from: 'roman_pagan', to: 'roman_pagan_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'roman_pagan', to: 'roman_pagan_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'roman_pagan_beliefs',  to: 'roman_gods_jupiter',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'roman_pagan_beliefs',  to: 'roman_gods_imperial', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'roman_pagan_beliefs',  to: 'roman_pax_deorum',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'roman_pagan_practices', to: 'roman_sacrifice', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'roman_pagan_practices', to: 'roman_augury',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'roman_pagan_practices', to: 'roman_festivals', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── NORSE TREE ──────────────────────────────────────────
  { from: 'norse', to: 'norse_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'norse', to: 'norse_texts',    color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'norse', to: 'norse_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'norse_beliefs',  to: 'norse_pantheon', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'norse_beliefs',  to: 'norse_odin',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'norse_beliefs',  to: 'norse_thor',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'norse_beliefs',  to: 'norse_ragnarok', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'norse_texts',    to: 'norse_edda',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'norse_texts',    to: 'norse_sagas',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'norse_practices', to: 'norse_blot',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'norse_practices', to: 'norse_seid',    color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── SLAVIC PAGAN TREE ────────────────────────────────────
  { from: 'slavic_pagan', to: 'slavic_pagan_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'slavic_pagan', to: 'slavic_pagan_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'slavic_pagan_beliefs',  to: 'slavic_pantheon', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'slavic_pagan_beliefs',  to: 'slavic_perun',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'slavic_pagan_beliefs',  to: 'slavic_veles',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'slavic_pagan_practices', to: 'slavic_rituals',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'slavic_pagan_practices', to: 'slavic_koliada',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'slavic_pagan_practices', to: 'slavic_maslenitsa', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── PRE-ISLAMIC ARABIA TREE ─────────────────────────────
  { from: 'pre_islamic_arabia', to: 'pre_islamic_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'pre_islamic_arabia', to: 'pre_islamic_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'pre_islamic_beliefs',  to: 'arabian_gods',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'pre_islamic_beliefs',  to: 'arabian_hanifs',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'pre_islamic_practices', to: 'arabian_pagan_cults', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'pre_islamic_practices', to: 'arabian_kaaba_cult',  color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── VEDIC TREE ─────────────────────────────────────────
  { from: 'vedic', to: 'vedic_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'vedic', to: 'vedic_texts',    color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'vedic', to: 'vedic_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'vedic_beliefs',  to: 'vedic_gods',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'vedic_beliefs',  to: 'vedic_yajna',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'vedic_texts',    to: 'vedic_rigveda', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'vedic_practices', to: 'vedic_rituals', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── CELTIC PAGAN TREE ─────────────────────────────────
  { from: 'celtic_pagan', to: 'celtic_pagan_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'celtic_pagan', to: 'celtic_pagan_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'celtic_pagan_beliefs',  to: 'celtic_pantheon',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'celtic_pagan_beliefs',  to: 'celtic_druids',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'celtic_pagan_beliefs',  to: 'celtic_otherworld', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'celtic_pagan_practices', to: 'celtic_festivals', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'celtic_pagan_practices', to: 'celtic_sacrifice', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── BALTIC PAGAN TREE ────────────────────────────────
  { from: 'baltic_pagan', to: 'baltic_pagan_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'baltic_pagan', to: 'baltic_pagan_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'baltic_pagan_beliefs',  to: 'baltic_perkunas', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'baltic_pagan_beliefs',  to: 'baltic_pantheon', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'baltic_pagan_practices', to: 'baltic_rituals',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'baltic_pagan_practices', to: 'baltic_fire_cult', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── FINNO-UGRIC TREE ─────────────────────────────────
  { from: 'finno_ugric', to: 'finno_ugric_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'finno_ugric', to: 'finno_ugric_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'finno_ugric_beliefs',  to: 'finno_shamanism', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'finno_ugric_beliefs',  to: 'finno_spirits',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'finno_ugric_practices', to: 'finno_rituals',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'finno_ugric_practices', to: 'finno_sacrifice', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── TENGRISM TREE ─────────────────────────────────────
  { from: 'tengrism', to: 'tengrism_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'tengrism', to: 'tengrism_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'tengrism_beliefs',  to: 'tengri_god',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'tengrism_beliefs',  to: 'tengri_sky',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'tengrism_practices', to: 'tengri_rituals', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'tengrism_practices', to: 'tengri_shaman',  color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── AFRICAN TRADITIONAL TREE ──────────────────────────
  { from: 'african_trad', to: 'african_trad_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'african_trad', to: 'african_trad_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'african_trad_beliefs',  to: 'african_yoruba',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'african_trad_beliefs',  to: 'african_vodun',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'african_trad_practices', to: 'african_rituals',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'african_trad_practices', to: 'african_divination', color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── POLYNESIAN TREE ───────────────────────────────────
  { from: 'polynesian', to: 'polynesian_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'polynesian', to: 'polynesian_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'polynesian_beliefs',  to: 'polynesian_gods',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'polynesian_beliefs',  to: 'polynesian_mana',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'polynesian_beliefs',  to: 'polynesian_tapu',      color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'polynesian_practices', to: 'polynesian_rituals',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'polynesian_practices', to: 'polynesian_tattoo',   color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── NATIVE AMERICAN TREE ──────────────────────────────
  { from: 'native_american', to: 'native_american_beliefs',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'native_american', to: 'native_american_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'native_american_beliefs',  to: 'native_great_spirit',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'native_american_beliefs',  to: 'native_spirits',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'native_american_practices', to: 'native_ceremonies',    color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'native_american_practices', to: 'native_vision_quest',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'native_american_practices', to: 'native_sweat_lodge',   color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── MODERN SPIRITUAL MOVEMENTS ──────────────────────────────
  { from: 'ancient_roots', to: 'modern_movements', color: 'rgba(255,255,255,0.08)', width: 1, dashes: true, label: 'Соврем.\nдуховность', font: { size: 8, color: 'rgba(255,255,255,0.35)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '🔮 Современные духовные движения | XIX–XX вв. · Синтез западного эзотеризма, восточных учений и философии', details: 'Современные духовные движения (XIX–XX вв.) представляют синтез западного эзотеризма (герметизм, гностицизм), восточных учений (индуизм, буддизм) и западной философии. Характерны: концепция духовной эволюции, вера в реинкарнацию, единство всех религий, развитая система тонких миров.' },
  { from: 'abrahamic', to: 'modern_movements', color: 'rgba(200,180,160,0.15)', width: 1.5, dashes: true, label: 'Зап. эзотеризм', font: { size: 8, color: 'rgba(200,180,160,0.4)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '✡ Западный эзотеризм | Герметизм · Каббала · Христианский мистицизм — корни теософии', details: 'Западный эзотеризм (герметизм, каббала, христианский мистицизм, розенкрейцерство) — один из истоков современных духовных движений. Елена Блаватская синтезировала западные оккультные традиции с восточными учениями.' },
  { from: 'dharmic', to: 'modern_movements', color: 'rgba(180,160,200,0.15)', width: 1.5, dashes: true, label: 'Вост. влияние', font: { size: 8, color: 'rgba(180,160,200,0.4)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: '☸ Влияние дхармических религий | Индуизм, буддизм — источник концепций кармы, реинкарнации, медитации', details: 'Дхармические религии (индуизм, буддизм) оказали глубокое влияние на современные духовные движения: концепции кармы, реинкарнации, медитации, чакр и энергетических центров.' },
  { from: 'modern_movements', to: 'theosophy',        color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'anthroposophy',    color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'new_age',          color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'theosophy',     to: 'secret_doctrine', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'modern_movements', to: 'modern_beliefs',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'modern_texts',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'modern_practices', color: 'rgba(255,255,255,0.12)', width: 2 },

  { from: 'modern_beliefs',   to: 'spiritual_evolution',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'modern_beliefs',   to: 'unity_of_religions',   color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'modern_beliefs',   to: 'reincarnation_modern', color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'modern_beliefs',   to: 'subtle_worlds',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'modern_beliefs',   to: 'ascended_masters',     color: 'rgba(255,255,255,0.06)', width: 1 },

  { from: 'modern_texts',     to: 'secret_doctrine',    color: 'rgba(255,255,255,0.06)', width: 1 },


  { from: 'modern_practices', to: 'meditation_modern',  color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'modern_practices', to: 'channeling',         color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'modern_practices', to: 'affirmation',        color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── ADDITIONAL MODERN MOVEMENTS ─────────────────────────────
  { from: 'modern_movements', to: 'bahai',       color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'wicca',       color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'rastafari',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'candomble',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'umbanda',     color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'falun_gong',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'anastasia',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'church_of_satan', color: 'rgba(255,255,255,0.12)', width: 2 },

  // ─── OCCULT — sub-branch ────────────────────────────────────
  { from: 'modern_movements',  to: 'occult_traditions',  color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'occult_traditions', to: 'hermeticism',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'occult_traditions', to: 'gnosticism',         color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'occult_traditions', to: 'rosicrucianism',     color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'occult_traditions', to: 'freemasonry',        color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'occult_traditions', to: 'spiritualism',       color: 'rgba(255,255,255,0.06)', width: 1 },
  { from: 'occult_traditions', to: 'ceremonial_magic',   color: 'rgba(255,255,255,0.06)', width: 1 },

  // ─── EGREGOR ────────────────────────────────────────────────
  { from: 'egregor', to: 'egregor_theory',   color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'egregor', to: 'egregor_types',    color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'egregor', to: 'egregor_texts',    color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'egregor', to: 'egregor_practices', color: 'rgba(255,255,255,0.12)', width: 2 },
  { from: 'modern_movements', to: 'egregor', color: 'rgba(160,128,96,0.15)', width: 1.5, dashes: true, label: 'Эзотерика', font: { size: 8, color: 'rgba(160,128,96,0.4)', strokeWidth: 3, strokeColor: '#1a1a2e' }, title: 'Эгрегоры — концепция коллективного сознания в эзотерике', details: 'Понятие эгрегора (коллективного мыслеобраза, энергоинформационной структуры) используется в эзотерике, оккультизме и современных духовных движениях. Восходит к работам Е.П. Блаватской, Даниила Андреева и более поздним авторам.' },
]);

const nodeData = {
  ancient_roots: { category: 'Древние корни', date: 'VII–I тыс. до н.э.', description: 'Религии и мировоззрения, существовавшие до и во время формирования авраамического монотеизма. Халафская и Убайдская культуры Месопотамии (VII–IV тыс. до н.э.) заложили основы храмовой экономики, культа плодородия и протошумерских верований. Их идеи, образы и практики оказали влияние на иудаизм, христианство и ислам. Ведическая религия (предшественница индуизма) также относится к древнему периоду и имеет общие индо-иранские корни с зороастризмом.', links: [{ title: 'Древние религии — Sacred-Texts.com', url: 'https://www.sacred-texts.com/ane/' }, { title: 'Религия — Британника', url: 'https://www.britannica.com/topic/religion' }] },
  mesopotamian: { category: 'Древняя религия', date: 'XXXV–VI вв. до н.э.', description: 'Религия Шумера, Аккада, Вавилона и Ассирии. Политеистический пантеон, космогония «Энума элиш», эпос о Гильгамеше. Зиккураты как храмовые центры. Жреческая астрономия и гаруспиции. Авраам родом из Ура Халдейского.', links: [{ title: 'Эпос о Гильгамеше — Sacred-Texts.com', url: 'https://www.sacred-texts.com/ane/gilg.htm' }, { title: 'Энума элиш — Sacred-Texts.com', url: 'https://www.sacred-texts.com/ane/enuma.htm' }] },
  egyptian: { category: 'Древняя религия', date: 'XXXII в. до н.э. – VI в. н.э.', description: 'Религия Египта с развитым пантеоном, культом мёртвых и заупокойными текстами. Фараон как посредник, пирамиды и мумификация. Мотив суда Осириса повлиял на библейскую эсхатологию.', links: [{ title: 'Египетская религия — Sacred-Texts.com', url: 'https://www.sacred-texts.com/egy/' }] },
  canaanite: { category: 'Древняя религия', date: 'XX–I вв. до н.э.', description: 'Религия ханаанских племён (Эль, Ваал, Ашера). Угаритские тексты. Древние израильтяне вышли из ханаанской среды; ранний монотеизм развивался в полемике с ханаанским культом.', links: [{ title: 'Угаритские тексты — Sacred-Texts.com', url: 'https://www.sacred-texts.com/ane/canaan.htm' }] },
  zoroastrian: { category: 'Древняя религия', date: 'VII–VI вв. до н.э.', description: 'Пророческая религия древнего Ирана (Заратустра). Дуализм Ахура-Мазды и Ахримана. Ангелы, рай и ад, Судный день, воскресение — через иудаизм повлияли на христианство и ислам.', links: [{ title: 'Авеста — Sacred-Texts.com', url: 'https://www.sacred-texts.com/zor/' }] },
  hellenistic: { category: 'Древняя религия / философия', date: 'VIII–I вв. до н.э.', description: 'Греческая философия и эллинистическая культура. Платон, Аристотель, стоицизм — основа христианского богословия. Контакты с индийской мыслью через индо-греческие царства.', links: [{ title: 'Философия — Stanford Encyclopedia', url: 'https://plato.stanford.edu/' }] },
  roman_pagan: { category: 'Древняя религия', date: 'VIII в. до н.э. – V в. н.э.', description: 'Религия Рима: Юпитер, Марс, Веста, культ императора. Государственная религия (religio licita). Христианство распространилось в римском правовом и культурном контексте.', links: [{ title: 'Roman religion — Britannica', url: 'https://www.britannica.com/topic/Roman-religion' }] },
  norse: { category: 'Древняя религия', date: 'II–XI вв.', description: 'Скандинавская религия викингов: Один, Тор, Фрейя, Рагнарёк. Эдды и саги. Христианизация Скандинавии в X–XIII вв.', links: [{ title: 'Norse mythology — Sacred-Texts.com', url: 'https://www.sacred-texts.com/neu/poe/index.htm' }] },
  slavic_pagan: { category: 'Древняя религия', date: 'VI–X вв.', description: 'Религия славян: Перун, Велес, Сварог, Мокошь. Отсутствие письменности — реконструкция по фольклору, археологии, византийским авторам.', links: [{ title: 'Славянская религия — Британника', url: 'https://www.britannica.com/topic/Slavic-religion' }] },
  pre_islamic_arabia: { category: 'Древняя религия', date: 'V–VII вв.', description: 'Доисламская Аравия (джахилийя): Кааба как святилище, три богини (Аллат, аль-Узза, Манат). Иудейские и христианские общины, ханифы-монотеисты.', links: [{ title: 'Pre-Islamic Arabia — Britannica', url: 'https://www.britannica.com/place/Arabia-pre-Islamic' }] },
  vedic: { category: 'Древняя религия', date: 'XV–V вв. до н.э.', description: 'Древнейшая религия Индии: ведийские боги (Индра, Агни, Варуна, Сома) и жертвенные ритуалы (яджна). Четыре Веды — основа будущего индуизма.', links: [{ title: 'Веды — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/' }] },
  abraham: { category: 'Патриарх', date: 'ок. XX–XVIII вв. до н.э.', description: 'Авраам — родоначальник авраамических религий. Завет с Богом, сыновья Измаил и Исаак. Родом из Ура Месопотамского.', links: [{ title: 'Бытие 12 — Bible.by', url: 'https://bible.by/verse/1/12/1/' }] },
  abrahamic: { category: 'Корень', description: 'Авраамические (авраамовы) религии — монотеистические религии, ведущие происхождение от Авраама. Общие черты: вера в единого Бога, почитание пророков, священные писания.', rules: ['Вера в единого Бога (монотеизм)', 'Почитание пророков', 'Священные писания', 'Нравственный закон', 'Эсхатология (учение о конце света)'], links: [{ title: 'Библия онлайн', url: 'https://bible.by/' }] },

  christianity: { category: 'Ветвь', date: 'I в. (ок. 33 г.)', description: 'Крупнейшая мировая религия, основанная на жизни и учении Иисуса Христа. Насчитывает около 2.5 млрд последователей.', links: [{ title: 'Библия онлайн', url: 'https://bible.by/' }, { title: 'Ватикан — официальный сайт Святого Престола', url: 'https://www.vatican.va/' }] },
  catholicism: { category: 'Ветвь', date: '1054 г.', description: 'Крупнейшая ветвь христианства, возглавляемая Папой Римским. Центр — Ватикан.', links: [{ title: 'Ватикан — официальный сайт', url: 'https://www.vatican.va/' }] },
  orthodoxy: { category: 'Ветвь', date: '1054 г.', description: 'Восточное христианство, включает автокефальные церкви. Сохраняет древние литургические традиции.', links: [{ title: 'Патриархия.ру — РПЦ', url: 'https://www.patriarchia.ru/' }] },
  protestantism: { category: 'Ветвь', date: '1517 г.', description: 'Возник в XVI веке в результате Реформации. Основные принципы: sola scriptura, sola fide.', links: [{ title: 'Всемирный совет церквей', url: 'https://www.oikoumene.org/' }] },
  roman_catholic: { category: 'Ветвь', date: '1054 г.', description: 'Латинский обряд Католической церкви — самый распространённый.', links: [{ title: 'Ватикан — официальный сайт', url: 'https://www.vatican.va/' }] },
  eastern_catholic: { category: 'Ветвь', date: '1596 г.', description: 'Восточные католические церкви, сохраняющие восточные обряды в единстве с Римом.', links: [{ title: 'Ватикан — официальный сайт', url: 'https://www.vatican.va/' }] },
  eastern_orthodox: { category: 'Ветвь', date: '1054 г.', description: 'Православные церкви византийской традиции (Константинополь, Москва и др.).', links: [{ title: 'Патриархия.ру — РПЦ', url: 'https://www.patriarchia.ru/' }] },
  oriental_orthodox: { category: 'Ветвь', date: '451 г.', description: 'Древние восточные церкви (Коптская, Армянская, Сирийская и др.).', links: [{ title: 'Коптская церковь — официальный сайт', url: 'https://www.copticchurch.net/' }] },
  lutheranism: { category: 'Ветвь', date: '1517 г.', description: 'Основана Мартином Лютером. Учение об оправдании верой.', links: [{ title: 'Всемирная лютеранская федерация', url: 'https://lutheranworld.org/' }] },
  anglicanism: { category: 'Ветвь', date: '1534 г.', description: 'Церковь Англии, сочетает католические и протестантские элементы.', links: [{ title: 'Англиканское сообщество', url: 'https://www.anglicancommunion.org/' }] },
  calvinism: { category: 'Ветвь', date: '1536 г.', description: 'Реформатская традиция, основанная Жаном Кальвином. Учение о предопределении.', links: [{ title: 'Реформатская церковь — World Communion', url: 'https://wcrc.ch/' }] },
  baptist: { category: 'Ветвь', date: '1609 г.', description: 'Крещение только по вере (сознательный возраст). Автономия поместных церквей.', links: [{ title: 'Всемирный баптистский альянс', url: 'https://www.baptistworld.org/' }] },
  methodism: { category: 'Ветвь', date: '1738 г.', description: 'Основана Джоном Уэсли. Акцент на личной святости и социальном служении.', links: [{ title: 'Всемирный методистский совет', url: 'https://worldmethodistcouncil.org/' }] },
  pentecostalism: { category: 'Ветвь', date: '1901 г.', description: 'Акцент на дарах Святого Духа, включая глоссолалию.', links: [{ title: 'Ассамблеи Бога — AG.org', url: 'https://ag.org/' }] },
  trinity: { category: 'Верование', date: 'I–IV вв. (догмат 325/381 гг.)', description: 'Бог един в трёх лицах: Отец, Сын и Святой Дух.', links: [{ title: 'Символ веры (Никео-Цареградский)', url: 'https://ru.wikipedia.org/wiki/%D0%9D%D0%B8%D0%BA%D0%B5%D0%BE-%D0%A6%D0%B0%D1%80%D0%B5%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B9_%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB_%D0%B2%D0%B5%D1%80%D1%8B' }] },
  incarnation: { category: 'Верование', date: 'I–V вв. (догмат 431 г.)', description: 'Иисус Христос — Бог, ставший человеком. Две природы соединены нераздельно.', links: [{ title: 'Евангелие от Иоанна 1:14', url: 'https://bible.by/verse/43/1/14/' }] },
  salvation: { category: 'Верование', date: 'I в.', description: 'Спасение от греха и смерти через веру в Иисуса Христа.', links: [{ title: 'Евангелие от Иоанна 3:16', url: 'https://bible.by/verse/43/3/16/' }] },
  resurrection: { category: 'Верование', date: 'I в.', description: 'Христос воскрес из мёртвых на третий день, дав надежду на воскресение всем верующим.', links: [{ title: 'Евангелие от Матфея 28', url: 'https://bible.by/verse/40/28/1/' }] },
  second_coming: { category: 'Верование', date: 'I в.', description: 'Второе пришествие Христа в конце времён для суда и установления Царства Божьего.', links: [{ title: 'Деяния 1:9-11', url: 'https://bible.by/verse/44/1/9/' }] },
  old_testament: { category: 'Священный текст', date: 'XIII–II вв. до н.э.', description: 'Первая часть Библии, общая с иудаизмом. Включает Пятикнижие, Пророков и Писания.', links: [{ title: 'Ветхий Завет — Bible.by', url: 'https://bible.by/old-testament/' }] },
  new_testament: { category: 'Священный текст', date: 'I–II вв.', description: 'Вторая часть Библии, включает 27 книг: Евангелия, Деяния, Послания, Откровение.', links: [{ title: 'Новый Завет — Bible.by', url: 'https://bible.by/new-testament/' }] },
  gospels: { category: 'Священный текст', date: 'ок. 65–100 гг.', description: 'Четыре Евангелия: от Матфея, Марка, Луки и Иоанна.', links: [{ title: 'Евангелие от Матфея', url: 'https://bible.by/verse/40/1/1/' }] },
  apostles: { category: 'Священный текст', date: 'ок. 50–100 гг.', description: 'Книга Деяний и Послания апостолов, Откровение.', links: [{ title: 'Деяния апостолов — Bible.by', url: 'https://bible.by/verse/44/1/1/' }, { title: 'Откровение — Bible.by', url: 'https://bible.by/verse/66/1/1/' }] },
  ten_commandments: { category: 'Правило', date: 'ок. XIII в. до н.э.', description: 'Десять заповедей, данных Богом Моисею на горе Синай. Основа нравственного закона.', rules: ['1. Я Господь, Бог твой', '2. Не делай себе кумира', '3. Не произноси имени Господа напрасно', '4. Помни день субботний', '5. Почитай отца и мать', '6. Не убивай', '7. Не прелюбодействуй', '8. Не кради', '9. Не лжесвидетельствуй', '10. Не желай чужого'], links: [{ title: 'Десять заповедей — Исход 20', url: 'https://bible.by/verse/2/20/1/' }] },
  great_commandment: { category: 'Правило', date: 'I в.', description: 'Возлюби Господа Бога всем сердцем и ближнего как самого себя.', links: [{ title: 'Великая заповедь — Мф.22:37-40', url: 'https://bible.by/verse/40/22/37/' }, { title: 'Второзаконие 6:5', url: 'https://bible.by/verse/5/6/5/' }] },
  beatitudes: { category: 'Правило', date: 'I в.', description: 'Заповеди блаженства из Нагорной проповеди.', rules: ['Блаженны нищие духом', 'Блаженны плачущие', 'Блаженны кроткие', 'Блаженны алчущие правды', 'Блаженны милостивые', 'Блаженны чистые сердцем', 'Блаженны миротворцы', 'Блаженны изгнанные за правду'], links: [{ title: 'Нагорная проповедь — Мф.5', url: 'https://bible.by/verse/40/5/1/' }] },
  golden_rule: { category: 'Правило', date: 'I в.', description: 'Поступай с другими так, как хочешь, чтобы поступали с тобой (Мф.7:12).', links: [{ title: 'Золотое правило — Мф.7:12', url: 'https://bible.by/verse/40/7/12/' }] },
  baptism_sac: { category: 'Таинство', date: 'I в.', description: 'Вход в Церковь через погружение в воду во имя Отца, Сына и Святого Духа.', links: [{ title: 'Мф.28:19 — крещение', url: 'https://bible.by/verse/40/28/19/' }] },
  eucharist: { category: 'Таинство', date: 'I в.', description: 'Причащение Телом и Кровью Христовыми. Центральное таинство литургии.', links: [{ title: '1 Кор.11:23-26 — Тайная вечеря', url: 'https://bible.by/verse/46/11/23/' }] },
  confirmation: { category: 'Таинство', date: 'I–II вв.', description: 'Миропомазание / конфирмация. Дар Святого Духа.', links: [{ title: 'Деян.8:14-17 — сошествие Духа', url: 'https://bible.by/verse/44/8/14/' }] },
  penance: { category: 'Таинство', date: 'I–III вв.', description: 'Исповедь грехов перед священником и отпущение.', links: [{ title: 'Ин.20:21-23 — отпущение грехов', url: 'https://bible.by/verse/43/20/21/' }] },
  anointing: { category: 'Таинство', date: 'I–III вв.', description: 'Елеосвящение — помазание больного с молитвой об исцелении.', links: [{ title: 'Иак.5:14-15 — елеосвящение', url: 'https://bible.by/verse/59/5/14/' }] },
  marriage_sac: { category: 'Таинство', date: 'I в.', description: 'Благословение Богом супружеского союза.', links: [{ title: 'Быт.2:24 — союз мужчины и женщины', url: 'https://bible.by/verse/1/2/24/' }] },
  holy_orders_sac: { category: 'Таинство', date: 'I–II вв.', description: 'Рукоположение в священный сан.', links: [{ title: '1 Тим.4:14 — рукоположение', url: 'https://bible.by/verse/54/4/14/' }] },

  judaism: { category: 'Ветвь', date: 'ок. XIII в. до н.э.', description: 'Монотеистическая религия еврейского народа, основанная на Завете между Богом и Авраамом. Насчитывает около 15 млн последователей. Основной закон — Тора.', links: [{ title: 'Танах онлайн', url: 'https://bible.by/old-testament/' }, { title: 'Chabad.org — иудейский портал', url: 'https://www.chabad.org/' }] },
  orthodox_judaism: { category: 'Ветвь', date: 'XIX в.', description: 'Традиционное направление иудаизма, строго соблюдающее Галаху (еврейский закон). Основано на письменной и устной Торе.', links: [{ title: 'Chabad.org — ортодоксальный иудаизм', url: 'https://www.chabad.org/' }] },
  conservative_judaism: { category: 'Ветвь', date: '1885 г.', description: 'Направление, возникшее в XIX веке как реакция на реформизм. Стремится сохранить традицию, допуская умеренные изменения.', links: [{ title: 'United Synagogue of Conservative Judaism', url: 'https://www.uscj.org/' }] },
  reform_judaism: { category: 'Ветвь', date: '1810 г.', description: 'Либеральное направление, возникшее в XIX веке в Германии. Акцент на этическом учении, отказ от многих традиционных обрядов.', links: [{ title: 'Union for Reform Judaism', url: 'https://urj.org/' }] },
  judaism_covenant: { category: 'Верование', date: 'ок. XIII в. до н.э.', description: 'Завет (брит) — договор между Богом и народом Израиля. Включает обязательства с обеих сторон: Бог даёт Закон и защиту, народ обязуется соблюдать заповеди.', links: [{ title: 'Бытие 12:1-3 — завет с Авраамом', url: 'https://bible.by/verse/1/12/1/' }] },
  chosen_people: { category: 'Верование', date: 'ок. XIII в. до н.э.', description: 'Народ Израиля избран Богом для получения Торы и соблюдения заповедей. Избранность — не привилегия, а ответственность.', links: [{ title: 'Исход 19:5-6 — избранный народ', url: 'https://bible.by/verse/2/19/5/' }] },
  judaism_mashiach: { category: 'Верование', date: 'VI–I вв. до н.э.', description: 'Машиах (Мессия) — будущий избавитель из дома Давида, который восстановит Храм и установит эру мира и справедливости.', links: [{ title: 'Исаия 11:1-9 — пророчество о машиахе', url: 'https://bible.by/verse/23/11/1/' }] },
  tanakh: { category: 'Священный текст', date: 'XIII–II вв. до н.э.', description: 'Танах (аббр. Тора, Невиим, Ктувим) — еврейская Библия. Состоит из 24 книг, написанных на иврите и арамейском.', links: [{ title: 'Ветхий Завет — Bible.by', url: 'https://bible.by/old-testament/' }] },
  torah: { category: 'Священный текст', date: 'XIII–VI вв. до н.э.', description: 'Тора (Пятикнижие Моисея): Бытие, Исход, Левит, Числа, Второзаконие. Центральный текст иудаизма.', links: [{ title: 'Тора — Bible.by', url: 'https://bible.by/verse/1/1/1/' }] },
  talmud: { category: 'Священный текст', date: 'III–VI вв.', description: 'Талмуд — центральный текст раввинистического иудаизма. Состоит из Мишны (запись устного закона) и Гемары (комментарии).', links: [{ title: 'Sefaria — еврейские тексты онлайн', url: 'https://www.sefaria.org/' }] },
  mitzvot_613: { category: 'Правило', date: 'ок. XIII в. до н.э.', description: '613 заповедей (мицвот) — все предписания Торы. Делятся на 248 предписывающих и 365 запрещающих. Включают 10 заповедей.', links: [] },
  shabbat: { category: 'Практика', date: 'ок. XIII в. до н.э.', description: 'Шаббат (суббота) — седьмой день недели, день отдыха. Запрещена работа, зажигание огня, письмо и др. Начинается вечером в пятницу.', links: [{ title: 'Исход 20:8-11 — заповедь субботы', url: 'https://bible.by/verse/2/20/8/' }] },
  kashrut: { category: 'Практика', date: 'ок. XIII в. до н.э.', description: 'Кашрут — свод пищевых законов. Разрешено (кошерно): мясо жвачных с раздвоенными копытами, рыба с чешуёй и плавниками. Запрещено: свинина, морепродукты, смешение мяса и молока.', links: [{ title: 'Левит 11 — кошерные животные', url: 'https://bible.by/verse/3/11/1/' }] },
  judaism_brit_milah: { category: 'Практика', date: 'ок. XX в. до н.э.', description: 'Брит-мила (обрезание) — знак Завета между Богом и Авраамом. Совершается на 8-й день после рождения мальчика.', links: [{ title: 'Бытие 17:9-14 — обрезание', url: 'https://bible.by/verse/1/17/9/' }] },
  judaism_holidays: { category: 'Практика', date: 'XIII–VI вв. до н.э.', description: 'Главные праздники: Рош ха-Шана (Новый год), Йом-Кипур (Судный день), Песах (Пасха/Исход), Шавуот (дарование Торы), Суккот (Кущи), Ханука и Пурим.', links: [{ title: 'Chabad.org — еврейские праздники', url: 'https://www.chabad.org/holidays/default_cdo/jewish/Holidays.htm' }] },

  islam: { category: 'Ветвь', date: '610–622 гг.', description: 'Вторая по численности мировая религия (около 2 млрд). Основана пророком Мухаммадом в VII веке на Аравийском полуострове. В переводе с арабского — «предание себя Богу».', links: [{ title: 'Коран онлайн', url: 'https://quran.com/ru' }] },
  sunni: { category: 'Ветвь', date: '632 г.', description: 'Крупнейшее направление ислама (около 85% мусульман). Признают первых четырёх халифов. Основной источник права — Коран и Сунна.', links: [
      { title: 'Sunnah.com — хадисы Пророка', url: 'https://sunnah.com/' },
      { title: 'Islamweb — исламский портал', url: 'https://islamweb.net/' },
      { title: 'Ислам.ру — исламская библиотека', url: 'https://islam.ru/' },
    ] },
  shia: { category: 'Ветвь', date: '632 г.', description: 'Второе по величине направление (около 15%). Признают только Али и его потомков законными преемниками пророка.', links: [{ title: 'Al-Islam.org — шиитская библиотека', url: 'https://www.al-islam.org/' }] },
  sufism: { category: 'Ветвь', date: 'VIII–IX вв.', description: 'Мистическое течение в исламе. Акцент на духовном опыте, медитации и близости к Богу через зикр. Проявляет типологическое сходство с бхакти (преданной любовью) в индуизме — оба пути делают центрom личную любовь к Божественному.', links: [{ title: 'Sufism.org — суфийский портал', url: 'https://sufism.org/' }] },
  tawhid: { category: 'Верование', date: 'VII в.', description: 'Единобожие — центральный принцип ислама. Бог (Аллах) един, нет божества, кроме Него.', links: [{ title: 'Коран, сура 112 (Аль-Ихлас)', url: 'https://quran.com/112' }] },
  prophethood: { category: 'Верование', date: 'VII в.', description: 'Вера в пророков — от Адама до Мухаммада, который является «печатью пророков».', links: [{ title: 'Коран 4:163 — пророки', url: 'https://quran.com/4/163' }] },
  angels: { category: 'Верование', date: 'VII в.', description: 'Вера в ангелов, созданных из света. Главные: Джибриль, Микаиль, Исрафиль, Азраиль.', links: [{ title: 'Коран 2:177 — вера в ангелов', url: 'https://quran.com/2/177' }] },
  holy_books: { category: 'Верование', date: 'VII в.', description: 'Вера в священные писания: Коран (ниспослан Мухаммаду), Таурат (Тора), Забур (Псалмы), Инджиль (Евангелие).', links: [{ title: 'Коран 4:136 — вера в писания', url: 'https://quran.com/4/136' }] },
  judgment_day: { category: 'Верование', date: 'VII в.', description: 'Вера в Судный день, воскресение мёртвых, рай и ад. Каждый получит воздаяние по делам.', links: [{ title: 'Коран 56:1-56 — Судный день', url: 'https://quran.com/56/1' }] },
  qadr: { category: 'Верование', date: 'VII в.', description: 'Вера в предопределение (кадр). Всё происходит по воле Аллаха, но человек обладает свободой выбора.', links: [{ title: 'Коран 54:49 — предопределение', url: 'https://quran.com/54/49' }] },
  quran: { category: 'Священный текст', date: '610–632 гг.', description: 'Священная книга ислама. Слово Аллаха, ниспосланное пророку Мухаммаду через ангела Джибриля. Состоит из 114 сур.', links: [{ title: 'Коран онлайн (с переводом)', url: 'https://quran.com/ru' }] },
  hadith: { category: 'Священный текст', date: 'VII–IX вв.', description: 'Сунна — собрание хадисов, повествующих о словах и действиях пророка Мухаммада. Второй по значимости источник после Корана.', links: [{ title: 'Сунна онлайн (Sunnah.com)', url: 'https://sunnah.com/' }] },
  shahada: { category: 'Правило', date: 'VII в.', description: 'Шахада — свидетельство веры: «Нет божества, кроме Аллаха, и Мухаммад — посланник Аллаха». Первый столп ислама.', links: [{ title: 'Коран 3:18 — свидетельство', url: 'https://quran.com/3/18' }] },
  salat: { category: 'Правило', date: 'VII в.', description: 'Намаз — обязательная молитва пять раз в день. Второй столп ислама.', links: [{ title: 'Коран 4:103 — предписание молитвы', url: 'https://quran.com/4/103' }] },
  zakat: { category: 'Правило', date: 'VII в.', description: 'Закят — обязательная милостыня в пользу нуждающихся (2.5% от капитала). Третий столп ислама.', links: [{ title: 'Коран 2:110 — закят', url: 'https://quran.com/2/110' }] },
  sawm: { category: 'Правило', date: 'VII в.', description: 'Ураза (пост) — воздержание от рассвета до заката в месяц Рамадан. Четвёртый столп ислама.', links: [{ title: 'Коран 2:183-185 — предписание поста', url: 'https://quran.com/2/183' }] },
  hajj: { category: 'Правило', date: 'VII в.', description: 'Хадж — паломничество в Мекку в месяц Зуль-хиджа. Совершается при наличии возможности. Пятый столп ислама.', links: [{ title: 'Коран 3:97 — обязанность хаджа', url: 'https://quran.com/3/97' }] },
  halal: { category: 'Правило', date: 'VII в.', description: 'Халяль — разрешённое по законам ислама. В пище: запрещены свинина, кровь, мертвечина, алкоголь. Мясо — по правилам забоя (забих).', links: [{ title: 'Коран 2:173 — запреты в пище', url: 'https://quran.com/2/173' }] },

  // ─── MARGINAL BRANCHES ─────────────────────────────────────
  marginal_branch: { category: 'Непризнанные течения', date: 'XIX–XX вв.', description: 'Христианские группы, не признанные мейнстримными конфессиями. Отвергают некоторые догматы (Троицу, божественность Христа) или имеют собственное священное писание, отличное от общехристианского канона.' },
  mormonism: { category: 'Непризнанное течение', date: '1830 г.', description: 'Церковь Иисуса Христа Святых последних дней. Основана Джозефом Смитом в 1830 году. Дополнительное писание: Книга Мормона.', links: [{ title: 'Церковь СПД — официальный сайт', url: 'https://www.churchofjesuschrist.org/' }] },
  jehovah_witnesses: { category: 'Непризнанное течение', date: '1879 г.', description: 'Религиозная организация, возникшая в конце XIX века (Чарльз Рассел). Отказ от переливания крови, неучастие в военных действиях. Отрицают Троицу.', links: [{ title: 'Свидетели Иеговы — официальный сайт', url: 'https://www.jw.org/' }] },
  unitarianism: { category: 'Непризнанное течение', date: '1568 г.', description: 'Христианское течение, отвергающее догмат о Троице. Бог един в одном лице. Иисус — человек, а не Бог.', links: [{ title: 'Unitarian Universalist Association', url: 'https://www.uua.org/' }] },

  // ─── APOCRYPHA ─────────────────────────────────────────────
  apocrypha: { category: 'Апокрифы', date: 'III в. до н.э. – IV в. н.э.', description: 'Тексты, не вошедшие в библейский канон, но связанные с библейскими сюжетами. Некоторые почитаются отдельными христианскими традициями как духовно полезные.' },
  apocrypha_ot: { category: 'Апокрифы', date: 'III–I вв. до н.э.', description: 'Ветхозаветные апокрифы — книги, приписываемые ветхозаветным персонажам, но не включённые в канон. Сохранились в эфиопской, славянской и других традициях.', links: [{ title: 'Ветхозаветные апокрифы — Sacred-Texts', url: 'https://www.sacred-texts.com/bib/apo/' }] },
  apocrypha_nt: { category: 'Апокрифы', date: 'II–IV вв.', description: 'Новозаветные апокрифы — раннехристианские тексты, не вошедшие в канон Нового Завета. Включают евангелия, деяния, послания и апокалипсисы.', links: [{ title: 'Новозаветные апокрифы — EarlyChristianWritings', url: 'https://www.earlychristianwritings.com/' }] },
  enoch: { category: 'Апокриф', date: 'III–I вв. до н.э.', description: 'Книга Еноха — древний еврейский апокриф, сохранившийся в эфиопской традиции. Описания падения ангелов, путешествий Еноха по небесам и пророчества о Судном дне.', links: [{ title: 'Книга Еноха — Sacred-Texts', url: 'https://www.sacred-texts.com/bib/boe/' }] },
  jubilees: { category: 'Апокриф', date: 'II в. до н.э.', description: 'Книга Юбилеев — пересказ Книги Бытия с хронологией по 49-летним циклам (юбилеям). Важна для кумранской общины.', links: [{ title: 'Книга Юбилеев — Sacred-Texts', url: 'https://www.sacred-texts.com/bib/jub/' }] },
  gospel_thomas: { category: 'Апокриф', date: 'II в.', description: 'Евангелие от Фомы — сборник из 114 изречений (логий) Иисуса, найденный в Наг-Хаммади. Гностический текст.', links: [{ title: 'Евангелие от Фомы — EarlyChristianWritings', url: 'https://www.earlychristianwritings.com/thomas.html' }] },
  gospel_judas: { category: 'Апокриф', date: 'II в.', description: 'Евангелие от Иуды — гностический текст, представляющий Иуду не предателем, а исполнителем тайной миссии.', links: [{ title: 'Евангелие от Иуды — National Geographic', url: 'https://www.nationalgeographic.com/culture/article/gospel-of-juda' }] },
  gospel_mary: { category: 'Апокриф', date: 'II в.', description: 'Евангелие от Марии — гностический текст, подчёркивающий роль Марии Магдалины как ученицы и получательницы тайного учения.', links: [{ title: 'Евангелие от Марии — Gnosis.org', url: 'https://www.gnosis.org/library/marygospel.htm' }] },

  // ─── KABBALAH ──────────────────────────────────────────────
  kabbalah: { category: 'Мистические тексты', date: 'XII–XIII вв.', description: 'Каббала — эзотерическое учение в иудаизме, мистическое толкование Торы. Основные тексты: Зоар, Сефер Йецира, Бахир.', links: [{ title: 'Зоар — Sefaria', url: 'https://www.sefaria.org/texts/Kabbalah/Zohar' }] },
  zohar: { category: 'Мистический текст', date: 'XIII в.', description: 'Зоар («Сияние») — основополагающий текст каббалы. Комментарий к Торе на арамейском, приписывается Шимону бар Йохаю (II век).', links: [{ title: 'Зоар — Sefaria', url: 'https://www.sefaria.org/texts/Kabbalah/Zohar' }] },
  sefer_yetzirah: { category: 'Мистический текст', date: 'II–VII вв.', description: 'Сефер Йецира («Книга Творения») — один из древнейших текстов каббалы. Описывает сотворение мира через 10 сефирот и 22 буквы ивритского алфавита.', links: [{ title: 'Сефер Йецира — Sefaria', url: 'https://www.sefaria.org/texts/Kabbalah/Sefer%20Yetzirah' }] },

  // ─── HINDUISM ──────────────────────────────────────────────
  dharmic: { category: 'Корень', description: 'Дхармические религии — индийские религии, основанные на понятии дхармы (универсального закона и долга). Включают индуизм, буддизм, джайнизм и сикхизм. В отличие от авраамических, не имеют единого основателя и признают множество путей к истине.', rules: ['Дхарма (нравственный долг)', 'Карма (закон причины и следствия)', 'Сансара (цикл перерождений)', 'Мокша (освобождение от сансары)', 'Множественность путей к Божественному'] },
  hinduism: { category: 'Ветвь', date: 'ок. XV в. до н.э.', description: 'Одна из древнейших мировых религий (около 1.2 млрд последователей). Не имеет единого основателя — формировалась на протяжении тысячелетий на основе ведической традиции. Отличается огромным разнообразием практик, философских школ и почитаемых божеств. Имеет общие индо-иранские корни с зороастризмом; через индо-греческие царства контактировала с эллинистической мыслью.', links: [{ title: 'Hinduwebsite — индуистский портал', url: 'https://www.hinduwebsite.com/' }] },
  vaishnavism: { category: 'Школа', date: 'ок. V в. до н.э.', description: 'Вайшнавизм — крупнейшее направление индуизма. Почитает Вишну и его аватары (Кришну, Раму) как верховное божество. Основа — бхакти (преданная любовь).', links: [{ title: 'ISKCON — официальный сайт', url: 'https://www.iskcon.org/' }] },
  shaivism: { category: 'Школа', date: 'ок. V в. до н.э.', description: 'Шиваизм — почитает Шиву как верховное божество. Включает множество подшкол (кашмирский шиваизм, лингаяты). Особое внимание — аскезе и медитации.', links: [{ title: 'Shaivism.net — шиваитский портал', url: 'https://www.shaivism.net/' }] },
  shaktism: { category: 'Школа', date: 'ок. V в. до н.э.', description: 'Шактизм — почитает Богиню (Деви, Кали, Дургу, Парвати) как верховное божество. Центральное понятие — Шакти (божественная энергия).', links: [{ title: 'Devi Mandir — шактизм', url: 'https://www.shreemaa.org/' }] },
  smartism: { category: 'Школа', date: 'ок. VIII в.', description: 'Смартизм — ортодоксальное направление индуизма, основанное на смрити (предании). Почитает пять божеств (Вишну, Шива, Деви, Ганеша, Сурья) как равноправные проявления единого Брахмана. Связан с философией Адвайта-веданты.', links: [{ title: 'Advaita Vedanta — сайт', url: 'https://www.advaita-vedanta.org/' }] },
  brahman: { category: 'Верование', date: 'ок. VIII в. до н.э.', description: 'Брахман — безличная, неизменная, бесконечная реальность, основа всего сущего. Высшая истина, превосходящая все описания и определения. Постижение Брахмана — путь к освобождению.', links: [{ title: 'Брахман — Британника', url: 'https://www.britannica.com/topic/brahman-hinduism' }] },
  atman: { category: 'Верование', date: 'ок. VIII в. до н.э.', description: 'Атман — индивидуальная душа, истинное «Я» каждого существа. В философии Адвайты тождествен Брахману. Освобождение (мокша) — осознание этого единства.', links: [{ title: 'Атман — Британника', url: 'https://www.britannica.com/topic/atman' }] },
  karma: { category: 'Верование', date: 'ок. VIII в. до н.э.', description: 'Карма — закон причины и следствия. Каждое действие (мысль, слово, поступок) создаёт последствия, которые определяют будущее перерождение. Хорошая карма ведёт к лучшему рождению, плохая — к худшему.', links: [{ title: 'Карма — Британника', url: 'https://www.britannica.com/topic/karma' }] },
  samsara: { category: 'Верование', date: 'ок. VIII в. до н.э.', description: 'Сансара — бесконечный цикл рождений и смертей, перерождений души (реинкарнация). Освобождение из сансары (мокша) — конечная цель духовного пути.', links: [{ title: 'Сансара — Британника', url: 'https://www.britannica.com/topic/samsara' }] },
  moksha: { category: 'Верование', date: 'ок. VIII в. до н.э.', description: 'Мокша — освобождение из цикла сансары, прекращение перерождений. Достигается через знание (джняна), преданность (бхакти), бескорыстное действие (карма-йога) или медитацию (раджа-йога).', links: [{ title: 'Мокша — Британника', url: 'https://www.britannica.com/topic/moksha' }] },
  dharma: { category: 'Верование', date: 'ок. VIII в. до н.э.', description: 'Дхарма — универсальный закон, нравственный долг, правильное поведение. Включает обязанности человека по отношению к обществу, семье, миру и божественному. Различается для разных варн и этапов жизни.', links: [{ title: 'Дхарма — Британника', url: 'https://www.britannica.com/topic/dharma' }] },
  vedas: { category: 'Священный текст', date: 'XV–V вв. до н.э.', description: 'Веды — древнейшие священные тексты индуизма на санскрите. Четыре самхиты: Ригведа (гимны), Самаведа (напевы), Яджурведа (формулы жертвоприношений), Атхарваведа (заклинания). Основной источник ведической религии.', links: [{ title: 'Веды — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/' }] },
  upanishads: { category: 'Священный текст', date: 'VIII–III вв. до н.э.', description: 'Упанишады — философские тексты, завершающие Веды (веданта). Учат о единстве Атмана и Брахмана, карме и освобождении. Оказали глубокое влияние на индийскую философию.', links: [{ title: 'Упанишады — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/upan/index.htm' }] },
  bhagavad_gita: { category: 'Священный текст', date: 'ок. V–II вв. до н.э.', description: 'Бхагавад-гита — диалог Кришны и Арджуны перед битвой на Курукшетре. Часть «Махабхараты». Синтез философии, йоги и бхакти. Один из самых почитаемых текстов индуизма.', links: [{ title: 'Бхагавад-гита — Vedabase.io', url: 'https://vedabase.io/en/library/bg/' }] },
  puranas: { category: 'Священный текст', date: 'III–XVI вв.', description: 'Пураны — сборники мифов, легенд, гимнов и философских трактатов. 18 основных Пуран повествуют о сотворении мира, истории династий и подвигах богов и героев.', links: [{ title: 'Пураны — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/puranas.htm' }] },
  itihasas: { category: 'Священный текст', date: 'V в. до н.э. – IV в.', description: 'Итихасы — «эпические» тексты индуизма: «Махабхарата» (100 000 стихов) и «Рамаяна» (24 000 стихов). Содержат не только повествование, но и философские и религиозные наставления.', links: [{ title: 'Махабхарата — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/maha/' }] },
  ramayana: { category: 'Священный текст', date: 'V–IV вв. до н.э.', description: '«Рамаяна» — эпическая поэма о царевиче Раме (аватаре Вишну), его жене Сите и битве с демоном Раваной. Авторство приписывается Вальмики.', links: [{ title: 'Рамаяна — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/rama/' }] },
  mahabharata: { category: 'Священный текст', date: 'IV в. до н.э. – IV в.', description: '«Махабхарата» — величайший эпос человечества (около 100 000 двустиший). Повествует о войне двух династий (Кауравов и Пандавов). Содержит Бхагавад-гиту.', links: [{ title: 'Махабхарата — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/maha/' }] },
  rigveda: { category: 'Священный текст', date: 'XV–X вв. до н.э.', description: 'Ригведа — древнейшая из Вед, сборник из 1028 гимнов на ведийском санскрите. Посвящена богам (Агни, Индра, Варуна, Сурья).', links: [{ title: 'Ригведа — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/rvs.htm' }] },
  samaveda: { category: 'Священный текст', date: 'X–V вв. до н.э.', description: 'Самаведа — «Веда напевов», сборник мелодий и песнопений, используемых в ритуалах. Большинство текстов заимствовано из Ригведы.', links: [{ title: 'Самаведа — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/svs.htm' }] },
  yajurveda: { category: 'Священный текст', date: 'X–V вв. до н.э.', description: 'Яджурведа — «Веда жертвенных формул», описывает ритуалы и произносимые во время них формулы (яджус).', links: [{ title: 'Яджурведа — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/yvs.htm' }] },
  atharvaveda: { category: 'Священный текст', date: 'X–V вв. до н.э.', description: 'Атхарваведа — «Веда заклинаний», содержит магические формулы, заговоры от болезней и врагов, философские гимны. Позднейшая из Вед.', links: [{ title: 'Атхарваведа — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/av.htm' }] },
  yamas: { category: 'Правило', date: 'ок. V–II вв. до н.э.', description: 'Ямы — этические ограничения, первая ступень йоги по Патанджали. Пять ям: ахимса (ненасилие), сатья (правдивость), астея (неворовство), брахмачарья (видение высшего сознания во всём), апариграха (нестяжательство).', links: [] },
  niyamas: { category: 'Правило', date: 'ок. V–II вв. до н.э.', description: 'Ниямы — этические предписания, вторая ступень йоги. Пять ниям: шауча (чистота), сантоша (довольство), тапас (самодисциплина), свадхьяя (самоизучение), ишвара-пранидхана (преданность Богу).', links: [] },
  ahimsa: { category: 'Правило', date: 'ок. VIII в. до н.э.', description: 'Ахимса — принцип ненасилия, непричинения вреда живым существам действием, словом или мыслью. Ключевая этическая концепция индуизма, буддизма и джайнизма. Влияние на Ганди и Мартина Лютера Кинга.', links: [{ title: 'Ахимса — Британника', url: 'https://www.britannica.com/topic/ahimsa' }] },
  satya_hindu: { category: 'Правило', date: 'ок. VIII в. до н.э.', description: 'Сатья — принцип правдивости, честности в мыслях, словах и действиях. Одна из пяти ям в йоге. Связана с понятием рита (космического порядка).', links: [{ title: 'Сатья — Британника', url: 'https://www.britannica.com/topic/satya' }] },
  brahmacharya: { category: 'Правило', date: 'ок. V–II вв. до н.э.', description: 'Брахмачарья — видеть во всём проявление высшего сознания (Брахмана). Традиционно — воздержание, контроль чувств и энергии; в более широком смысле — движение в Брахмане, осознание божественной природы во всём сущем. Третья яма в йоге Патанджали.', links: [{ title: 'Брахмачарья — Британника', url: 'https://www.britannica.com/topic/brahmacarya' }] },
  yoga: { category: 'Практика', date: 'ок. V–II вв. до н.э.', description: 'Йога — система духовных, психических и физических практик. Восемь ступеней по Патанджали: яма, нияма, асана, пранаяма, пратьяхара, дхарана, дхьяна, самадхи.', links: [{ title: 'Йога-сутры — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/yogasutr.htm' }] },
  puja: { category: 'Практика', date: 'ок. V в. до н.э.', description: 'Пуджа — ритуальное поклонение божеству с подношениями (цветы, пища, светильники, благовония). Совершается в храмах и дома перед изображением (мурти) божества.', links: [{ title: 'Пуджа — Британника', url: 'https://www.britannica.com/topic/puja' }] },
  meditation_hindu: { category: 'Практика', date: 'ок. VIII в. до н.э.', description: 'Медитация (дхьяна) — практика сосредоточения ума. В индуизме включает дхарану (концентрацию), дхьяну (медитацию) и самадхи (просветление). Центральная практика в йоге и веданте.', links: [{ title: 'Дхьяна — Британника', url: 'https://www.britannica.com/topic/dhyana' }] },
  mantra: { category: 'Практика', date: 'ок. XV в. до н.э.', description: 'Мантра — священный звук, слог или фраза, повторяемые во время медитации или ритуала. Важнейшая мантра: Аум (Ом) — символ Брахмана. Мантры — основа ведических ритуалов.', links: [{ title: 'Мантра — Британника', url: 'https://www.britannica.com/topic/mantra' }] },
  bhakti: { category: 'Практика', date: 'ок. V в. до н.э.', description: 'Бхакти — преданная любовь к личному божеству. Основной путь в вайшнавизме. Включает воспевание имён Бога (бхаджан, киртан), памятование, служение и самоотдачу. Проявляет типологическое сходство с суфийской традицией в исламе — обе ставят личную любовь к Богу в центр духовного пути.', links: [] },

  yoga_types: { category: 'Категория', description: 'Основные пути йоги (йога-марги) — классификация духовных практик индуизма по методу: знание, действие, преданность, психотехника.' },
  raja_yoga: { category: 'Практика', date: 'ок. II в. до н.э.', description: 'Раджа-йога («царская йога») — классическая йога Патанджали, восемь ступеней (аштанга): яма, нияма, асана, пранаяма, пратьяхара, дхарана, дхьяна, самадхи.', links: [{ title: 'Йога-сутры Патанджали — Sacred-Texts', url: 'https://www.sacred-texts.com/hin/yogasutr.htm' }] },
  karma_yoga: { category: 'Практика', date: 'ок. V–II вв. до н.э.', description: 'Карма-йога («йога действия») — путь бескорыстного действия и служения. Изложена в Бхагавад-гите: действуй без привязанности к результату, посвящая все действия Богу.', links: [{ title: 'Бхагавад-гита — Sacred-Texts', url: 'https://www.sacred-texts.com/hin/gita/' }] },
  bhakti_yoga: { category: 'Практика', date: 'ок. V в. до н.э.', description: 'Бхакти-йога («йога преданности») — путь любви и преданности личному божеству. Включает воспевание (киртан), памятование (смарана), служение (сева) и самоотдачу. Центральный путь в вайшнавизме.', links: [{ title: 'Бхакти-расамрита-синдху (Рупа Госвами)', url: 'https://www.sacred-texts.com/hin/hinduism.htm' }] },
  jnana_yoga: { category: 'Практика', date: 'ок. VIII в. до н.э.', description: 'Джняна-йога («йога знания») — путь философского познания и различения (вивека). Через изучение Упанишад, размышление (манана) и медитацию (нидидхьясана) постигается тождество Атмана и Брахмана.', links: [{ title: 'Jnana — Britannica', url: 'https://www.britannica.com/topic/jnana' }, { title: 'Упанишады — Sacred-Texts', url: 'https://www.sacred-texts.com/hin/upanisad/' }] },
  kriya_yoga: { category: 'Практика', date: 'ок. XIX–XX вв.', description: 'Крийя-йога — йога очищения и трансформации энергии через дыхательные техники (пранаяму) и внутренние энергетические практики. Популяризирована Парамахансой Йоганандой в «Автобиографии йога».', links: [{ title: 'Автобиография йога (Йогананда)', url: 'https://www.ananda.org/autobiography/' }, { title: 'Крийя-йога — Йога-сутры', url: 'https://www.sacred-texts.com/hin/yogasutr.htm' }] },
  hatha_yoga: { category: 'Практика', date: 'ок. XI–XV вв.', description: 'Хатха-йога — физическая йога, включающая асаны (позы), пранаяму (дыхание), бандхи (замки), мудры (жесты) и шаткармы (очистительные техники). Классические тексты: «Хатха-йога-прадипика» и «Гхеранда-самхита».', links: [{ title: 'Хатха-йога-прадипика — Sacred-Texts', url: 'https://www.sacred-texts.com/hin/hyp/' }, { title: 'Гхеранда-самхита — Sacred-Texts', url: 'https://www.sacred-texts.com/hin/gheranda/' }] },
  kundalini_yoga: { category: 'Практика', date: 'ок. X–XV вв.', description: 'Кундалини-йога — йога пробуждения дремлющей энергии (кундалини-шакти) в основании позвоночника. Цель — поднять энергию по сушумне через чакры к сахасраре, достигая просветления.', links: [{ title: 'Кундалини — Britannica', url: 'https://www.britannica.com/topic/kundalini' }] },
  mantra_yoga: { category: 'Практика', date: 'ок. XV в. до н.э.', description: 'Мантра-йога — путь сосредоточения через повторение священных звуков и слогов (мантр). Наиболее важная мантра — Ом (Аум). Включает джапу (повторение) на чётках и внутреннее созерцание звука.', links: [{ title: 'Мантра — Britannica', url: 'https://www.britannica.com/topic/mantra' }] },

  // ─── HINDUISM PHILOSOPHICAL SCHOOLS ─────────────────────────
  advaita_vedanta: { category: 'Философская школа', date: 'ок. VIII в.', description: 'Адвайта-веданта — недвойственная (advaita — «не два») веданта, основанная Шанкарой (788–820). Учит, что единственная реальность — Брахман, а мир явлений — майя (иллюзия). Атман (индивидуальная душа) тождествен Брахману. Освобождение (мокша) — осознание этого тождества путём знания (джняна). Центральный принцип: «Брахман реален, мир иллюзорен, душа и Брахман — одно» (брахма сатьям джаган митхья).', links: [{ title: 'Advaita Vedanta — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/advaita-vedanta/' }] },
  vishishtadvaita: { category: 'Философская школа', date: 'XI–XII вв.', description: 'Вишиштадвайта («ограниченная недвойственность») — школа веданты, основанная Рамануджей (1017–1137). Учит, что Брахман — личный Бог (Вишну-Нараяна), а души и материя — его атрибуты (вишешаны), реально отличные, но составляющие единое целое с Ним. Путь освобождения — бхакти (преданная любовь).', links: [{ title: 'Ramanuja — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/ramanuja/' }] },
  dvaita: { category: 'Философская школа', date: 'XIII в.', description: 'Двайта («двойственность») — дуалистическая школа веданты, основанная Мадхвой (1238–1317). Утверждает вечное различие между Богом (Вишну) и душой, душой и материей, а также между разными душами. Пять вечных различий (панча-бхеда). Путь освобождения — бхакти и милость Бога.', links: [{ title: 'Madhva — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/madhva/' }] },
  samkhya: { category: 'Философская школа', date: 'ок. VII–VI вв. до н.э.', description: 'Санкхья («число», «перечисление») — одна из древнейших индийских философских систем, основанная Капилой. Учит о двух независимых реальностях: пуруша (дух, сознание) и пракрити (материя, природа). Из взаимодействия пуруши и пракрити возникает весь проявленный мир. Освобождение — осознание различия между пурушей и пракрити. Санкхья — философская основа йоги.', links: [{ title: 'Samkhya — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/samkhya/' }] },
  nyaya: { category: 'Философская школа', date: 'ок. VI–V вв. до н.э.', description: 'Ньяя («правило», «логика») — индийская школа логики и эпистемологии, основанная Готамой (Акшападой). Разработала учение о четырёх источниках знания (праманы): восприятие, умозаключение, сравнение и свидетельство. Шестнадцать категорий (падартха) для анализа реальности. Позднее слилась с вайшешикой в ньяя-вайшешику.', links: [{ title: 'Nyaya — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/nyaya/' }] },
  vaisheshika: { category: 'Философская школа', date: 'ок. VI–V вв. до н.э.', description: 'Вайшешика («особенность») — школа индийской философии, основанная Канадой. Разработала учение об атомах (ану) — вечных, неделимых частицах, из которых состоит материальный мир. Семь категорий (падартха): субстанция, качество, действие, общность, особенность, присущность, небытие. Близка к ньяе.', links: [{ title: 'Vaisheshika — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/vaisheshika/' }] },
  ananda_marga: { category: 'Современное движение', date: '1955 г.', description: 'Ананда Марга («Путь блаженства») — нео-индуистское социально-духовное движение, основанное Прабхатом Ранджаном Саркаром (Шри Шри Анандамурти) в 1955 году в Бихаре, Индия. Учение: синтез тантры, йоги и социального активизма. Практики: медитация, киртан, вегетарианство. Социальная программа: ликвидация неравенства, экология.', links: [
      { title: 'Официальный сайт Ananda Marga', url: 'https://www.anandamarga.org/' },
      { title: 'Ananda Marga Publications (книги)', url: 'https://ampspublication.com/' },
      { title: 'Ananda Sutram — основное писание', url: 'https://ampspublication.com/product/ananda-sutram' },
      { title: 'Subhasita Samgraha (собрание бесед)', url: 'http://anandamargabooks.org/Subhasita%20Samgraha.html' }] },
  brahmo_samaj: { category: 'Современное движение', date: '1828 г.', description: 'Брахмо-самадж — первое реформаторское движение в индуизме, основанное Рам Мохан Роем в 1828 году в Калькутте. Проповедовал монотеизм, отказ от идолопоклонства, кастовой системы и сати. Рационалистический подход к религии. Сыграл ключевую роль в индийском Ренессансе XIX века.', links: [{ title: 'Брахмо-самадж — официальный сайт', url: 'https://brahmosamaj.org/' }] },
  arya_samaj: { category: 'Современное движение', date: '1875 г.', description: 'Арья-самадж — реформаторское движение в индуизме, основанное Даянандой Сарасвати в 1875 году. Лозунг: «Назад к Ведам!» (возврат к ведической чистоте). Отрицает идолопоклонство, кастовую систему, неприкасаемость и детские браки. Акцент на ведийских ритуалах и социальном реформизме.', links: [{ title: 'Арья-самадж — официальный сайт', url: 'https://www.aryasamaj.org/' }] },
  ramakrishna_mission: { category: 'Современное движение', date: '1897 г.', description: 'Миссия Рамакришны — духовно-благотворительная организация, основанная Свами Вивеканандой в 1897 году. Названа в честь учителя Вивекананды — Рамакришны Парамахамсы. Проповедует универсальную религию, единство всех религий, служение людям как служение Богу (шива-джнане-джива-сева).', links: [{ title: 'Миссия Рамакришны — официальный сайт', url: 'https://belurmath.org/' }] },
  iskcon: { category: 'Современное движение', date: '1966 г.', description: 'Международное общество сознания Кришны (ИСККОН) — вайшнавское движение, основанное Бхактиведантой Свами Прабхупадой в 1966 году в Нью-Йорке. Основано на гаудия-вайшнавизме (Чайтанья). Практики: воспевание мантры «Харе Кришна», вегетарианство, изучение Бхагавад-гиты. Широко известно храмами и фестивалями Ратха-ятра.', links: [{ title: 'ISKCON — официальный сайт', url: 'https://www.iskcon.org/' }, { title: 'Vedabase.io — книги Прабхупады', url: 'https://vedabase.io/' }] },
  osho: { category: 'Современное движение', date: '1970-е гг.', description: 'Ошо (Бхагаван Шри Раджниш, 1931–1990) — индийский мистик и учитель, основатель движения «Раджниш». Синтез индийских традиций (адвайта, тантра, йога) и западной психотерапии. Известен учениями о тотальном принятии, медитации как свидетельствовании, и критикой традиционных религий. Ашрам в Пуне.', links: [{ title: 'OSHO — официальный сайт', url: 'https://www.osho.com/' }] },
  agni_yoga: { category: 'Современное движение', date: '1920–1930-е гг.', description: 'Агни-йога (Живая Этика) — духовное учение, переданное через Елену и Николая Рерихов в 1920–1930-х гг. Представляет собой синтез теософских концепций, индийской философии и практических наставлений. Основные тексты: 14 книг серии «Агни-йога». Ключевые идеи: космическая эволюция, огненная трансформация, значение культуры и красоты, сотрудничество с Великими Учителями (Махатмами).', links: [{ title: 'Международный центр Рерихов', url: 'https://icr.su/' }, { title: 'Библиотека Агни-йоги', url: 'https://agniyoga.org/' }] },
  integral_yoga: { category: 'Современное движение', date: '1910–1950-е гг.', description: 'Интегральная йога (Пурна-йога) — учение Шри Ауробиндо (1872–1950) и Матери (Мирра Альфасса). Цель: не личное освобождение (мокша), а полная трансформация человеческой природы и «божественная жизнь на земле». Синтезирует четыре пути йоги: карма-йогу, бхакти-йогу, джняна-йогу и раджа-йогу. Основные тексты: «Божественная жизнь», «Синтез йоги», «Савитри».', links: [{ title: 'Sri Aurobindo Ashram — официальный сайт', url: 'https://www.sriaurobindoashram.org/' }, { title: 'Божественная жизнь — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/sl/' }] },

  // ─── BUDDHISM ────────────────────────────────────────────────
  buddhism: { category: 'Ветвь', date: 'VI–V вв. до н.э.', description: 'Буддизм — одна из трёх мировых религий (ок. 500 млн последователей). Основана Сиддхартхой Гаутамой (Буддой) в VI–V вв. до н.э. Возникла в Индии как альтернатива ведическому ритуализму. Основные принципы: Четыре Благородные Истины и Благородный Восьмеричный Путь. Не признаёт существование вечной души (анатман). Распадается на три основные ветви: Тхеравада, Махаяна и Ваджраяна.', links: [{ title: 'BuddhaNet — буддийский портал', url: 'https://www.buddhanet.net/' }] },
  theravada: { category: 'Школа', date: 'III в. до н.э.', description: 'Тхеравада («Учение старейших») — древнейшая из сохранившихся буддийских школ. Преобладает в Шри-Ланке, Таиланде, Мьянме, Лаосе, Камбодже. Основной текст — Палийский канон (Трипитака). Акцент на монашеской дисциплине и личном освобождении через медитацию.', links: [{ title: 'Access to Insight — тхеравада', url: 'https://www.accesstoinsight.org/' }] },
  mahayana: { category: 'Школа', date: 'I в. до н.э.', description: 'Махаяна («Великая колесница») — крупнейшая ветвь буддизма. Преобладает в Китае, Японии, Корее, Тибете, Монголии. Учит о Бодхисаттве — существе, откладывающем собственное освобождение ради спасения других. Включает школы: Дзэн, Чистой Земли, Тяньтай.', links: [{ title: 'Buddhist Door — махаяна', url: 'https://www.buddhistdoor.net/' }] },
  vajrayana: { category: 'Школа', date: 'V–VII вв.', description: 'Ваджраяна («Алмазная колесница») — эзотерическая ветвь буддизма, распространённая в Тибете, Бутане, Монголии. Использует тантрические методы: мантры, мудры, визуализации божеств. Тибетский буддизм (ламаизм) — основная форма Ваджраяны.', links: [{ title: 'FPMT — тибетский буддизм', url: 'https://www.fpmt.org/' }] },
  four_noble_truths: { category: 'Верование', date: 'VI–V вв. до н.э.', description: 'Четыре Благородные Истины — основа учения Будды: 1) Дуккха — жизнь есть страдание; 2) Самудая — причина страдания — желание; 3) Ниродха — возможно прекращение страдания; 4) Марга — путь к прекращению страдания — Благородный Восьмеричный Путь.', links: [{ title: 'Четыре истины — Access to Insight', url: 'https://www.accesstoinsight.org/lib/authors/thanissaro/truths.html' }] },
  eightfold_path: { category: 'Верование', date: 'VI–V вв. до н.э.', description: 'Благородный Восьмеричный Путь — практический метод освобождения от страдания: 1) Правильное воззрение, 2) Правильное намерение, 3) Правильная речь, 4) Правильное действие, 5) Правильный образ жизни, 6) Правильное усилие, 7) Правильное памятование (осознанность), 8) Правильное сосредоточение (медитация).', links: [{ title: 'Восьмеричный путь — Access to Insight', url: 'https://www.accesstoinsight.org/ptf/dhamma/sacca/sacca4/index.html' }] },
  buddhist_karma: { category: 'Верование', date: 'VI–V вв. до н.э.', description: 'В буддизме карма — закон причинно-следственной связи, определяющий перерождение (сансару). В отличие от индуизма, нет вечной души (анатман) — перерождается не душа, а поток сознания (сантана). Цель — прекращение цепи перерождений (нирвана).', links: [{ title: 'Камма — Access to Insight', url: 'https://www.accesstoinsight.org/ptf/dhamma/kamma.html' }] },
  nirvana: { category: 'Верование', date: 'VI–V вв. до н.э.', description: 'Нирвана («угасание», «затухание») — конечная цель буддийского пути. Прекращение страдания, желаний, привязанностей и цепи перерождений. Состояние абсолютного покоя, просветления и освобождения. Неописуемо словами — постигается только личным опытом.', links: [{ title: 'Ниббана — Access to Insight', url: 'https://www.accesstoinsight.org/lib/authors/thanissaro/nibbana.html' }] },
  tripitaka: { category: 'Священный текст', date: 'III–I вв. до н.э.', description: 'Трипитака («Три корзины») — Палийский канон буддизма Тхеравады. Состоит из трёх разделов: Виная-питака (монашеские правила), Сутта-питака (проповеди Будды), Абхидхамма-питака (философские трактаты). Записан на пали в I в. до н.э. на Шри-Ланке.', links: [{ title: 'Палийский канон — Access to Insight', url: 'https://www.accesstoinsight.org/tipitaka/' }] },
  buddhist_sutras: { category: 'Священный текст', date: 'I–V вв.', description: 'Сутры Махаяны — тексты, записанные на санскрите и китайском. Включают «Сутру Сердца», «Сутру Алмазного Огранщика» (Ваджраччхедика), «Лотосовую Сутру», «Сутру Чистой Земли». Махаянские сутры содержат учения о пустоте (шуньята) и природе Будды.', links: [{ title: 'Сутра Сердца — Buddhist Door', url: 'https://www.buddhistdoor.net/training/heart-sutra/' }] },
  dhammapada: { category: 'Священный текст', date: 'III–I вв. до н.э.', description: 'Дхаммапада — сборник из 423 стихов (изречений Будды) на пали. Входит в Сутта-питаку (Кхуддака-никая). Один из самых известных и популярных буддийских текстов. Содержит краткое изложение этики и философии буддизма.', links: [{ title: 'Дхаммапада — Access to Insight', url: 'https://www.accesstoinsight.org/tipitaka/kn/dhp/index.html' }] },
  meditation_buddhist: { category: 'Практика', date: 'VI–V вв. до н.э.', description: 'Буддийская медитация — центральная практика буддизма. Основные методы: Випассана (осознанность к дыханию и телу), Саматха (успокоение ума, дхьяна), Медитация любящей доброты (метта-бхавана). Цель — развитие осознанности, успокоение ума и достижение просветления.', links: [{ title: 'Випассана — Access to Insight', url: 'https://www.accesstoinsight.org/lib/authors/mahasi/sss.html' }] },
  mindfulness: { category: 'Практика', date: 'VI–V вв. до н.э.', description: 'Осознанность (сати, смрити) — памятование настоящего момента, основа буддийской медитации. Входит как 7-й элемент Благородного Восьмеричного Пути. Современная светская форма — практика майндфулнесс. Ключевые тексты: «Сатипаттхана-сутта» (основы осознанности).', links: [{ title: 'Сатипаттхана-сутта — Access to Insight', url: 'https://www.accesstoinsight.org/ptf/dhamma/sati.html' }] },
  buddhist_chanting: { category: 'Практика', date: 'VI–V вв. до н.э.', description: 'Пение сутр — коллективное или индивидуальное ритмичное произнесение буддийских текстов. В Тхераваде — пение на пали (паритта). В Махаяне — чтение сутр на санскрите или китайском/японском. В Ваджраяне — пение мантр (Ом Мани Падме Хум).', links: [{ title: 'Паритта — Access to Insight', url: 'https://www.accesstoinsight.org/tipitaka/kn/khp/khp.intro.html' }] },

  // ─── JAINISM ────────────────────────────────────────────────────
  jainism: { category: 'Ветвь', date: 'IX–VI вв. до н.э.', description: 'Джайнизм — древняя дхармическая религия Индии, основанная на учении 24 тиртханкаров (проводников), последним из которых был Махавира (Вардхамана, VI в. до н.э.). Центральный принцип — ахимса (ненасилие) как высшая добродетель. Ок. 5 млн последователей, преимущественно в Индии.', rules: ['Ахимса (ненасилие)', 'Астейя (неворовство)', 'Сатья (правдивость)', 'Брахмачарья (целомудрие)', 'Апариграха (нестяжание)'], links: [] },

  jainism_beliefs: { category: 'Верования', date: 'IX–VI вв. до н.э.', description: 'Основные верования джайнизма: дуализм дживы (души) и адживы (не-души), учение о карме как тонкой материи, привязывающей душу к сансаре, и возможность освобождения (мокши) через кевала-гьяну (всеведение).', links: [{ title: 'Джайнизм — философия — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/jainism/' }] },
  jiva_ajiva: { category: 'Верование', date: 'IX–VI вв. до н.э.', description: 'Джива (душа) и аджива (не-душа) — две основные категории реальности в джайнизме. Душа вечна, обладает сознанием и способна к освобождению. Всё не-живое (материя, пространство, время) — аджива. Цель — отделение души от кармической материи.', links: [{ title: 'Джайнизм — Британника', url: 'https://www.britannica.com/topic/Jainism' }] },
  ahimsa_jain: { category: 'Верование', date: 'IX–VI вв. до н.э.', description: 'Ахимса (ненасилие) — центральный принцип джайнизма, доведённый до абсолютной степени. Запрет на причинение вреда любым живым существам мыслью, словом или действием. Джайны-монахи носят марлевую повязку (мухапатти) и метут дорогу перед собой, чтобы не наступить на насекомых.', links: [] },
  karma_jain: { category: 'Верование', date: 'IX–VI вв. до н.э.', description: 'В джайнизме карма понимается как тонкая материя, прилипающая к душе вследствие действий, мыслей и слов. Различают 8 видов кармы: четыре «вредоносные» (гнездо-гьяниварта) и четыре «полезные» (гнездо-ашубха). Освобождение — полное уничтожение кармической материи.', links: [] },
  kevala_jnana: { category: 'Верование', date: 'IX–VI вв. до н.э.', description: 'Кевала-гьяна («абсолютное знание», «всеведение») — состояние полного просветления, при котором душа познаёт всю реальность во всех её аспектах. Доступно только тиртханкарам и освобождённым душам. Последняя стадия перед мокшей.', links: [] },
  samsara_jain: { category: 'Верование', date: 'IX–VI вв. до н.э.', description: 'Сансара (цикл перерождений) в джайнизме описывается как бесконечное странствие души через четыре сферы: божественную, человеческую, животную и адскую. Длительность цикла определяется кармой. Только человек способен достичь освобождения.', links: [] },
  moksha_jain: { category: 'Верование', date: 'IX–VI вв. до н.э.', description: 'Мокша (освобождение) в джайнизме — полное отделение души от всякой кармы и материи. Освобождённая душа (сиддха) поднимается на вершину вселенной (сиддха-локе), где пребывает в вечном блаженстве, знании и чистом сознании.', links: [] },

  jainism_schools: { category: 'Школы', date: 'III–I вв. до н.э.', description: 'Основные школы джайнизма — дигамбары («одетые небом») и шветамбары («одетые в белое»). Разделение произошло ок. III в. до н.э. Дигамбары считают, что совершенный монах не носит одежды и отвергает право женщин на освобождение. Шветамбары допускают монашескую одежду и признают возможность освобождения для женщин.', links: [] },
  digambara: { category: 'Школа', date: 'III в. до н.э.', description: 'Дигамбары («одетые небом», т.е. нагие) — одна из двух основных школ джайнизма. Монахи-дигамбары не носят одежды и не признают права женщин на освобождение. Основной центр — Шравана-Белгола (Карнатака). Канон дигамбаров — «Шаткхандагама».', links: [] },
  shvetambara: { category: 'Школа', date: 'III в. до н.э.', description: 'Шветамбары («одетые в белое») — одна из двух основных школ джайнизма. Монахи носят белые одежды, признают возможность освобождения для женщин. Канон шветамбаров — «Сиддханта» (45 текстов агам). Распространены в Гуджарате и Раджастхане.', links: [] },

  jainism_texts: { category: 'Тексты', date: 'III в. до н.э. — V в.', description: 'Священные тексты джайнизма: агамы (шветамбарский канон «Сиддханта» на пракрите) и пост-канонические сочинения, включая «Таттвартха-сутру» Умасвати (санскрит, II–V вв.) — единственный текст, признаваемый обеими школами.', links: [] },
  agamas: { category: 'Священный текст', date: 'III–I вв. до н.э.', description: 'Агамы — собрание священных текстов джайнизма на пракрите (ардха-магадхи). Шветамбарский канон включает 45 текстов, разделённых на 6 групп: анги, упаанги, пракирны, чхеда-сутры, мула-сутры и пракама-сутры. Содержат учение Махавиры и тиртханкаров.', links: [{ title: 'Джайнские агамы — Британника', url: 'https://www.britannica.com/topic/Agama-Jainism' }] },
  tattvartha_sutra: { category: 'Священный текст', date: 'II–V вв.', description: '«Таттвартха-сутра» («Сутра о значении категорий») — основополагающий философский текст джайнизма на санскрите, автором которого считается Умасвати (II–V вв.). Единственный текст, признаваемый и дигамбарами, и шветамбарами. Излагает семь категорий реальности (таттв).', links: [] },

  jainism_rules: { category: 'Правила', date: 'IX–VI вв. до н.э.', description: 'Этические правила джайнизма включают пять великих обетов (маха-враты), три драгоценности (ратна-трая) и многочисленные предписания аскезы (тапас). Строгость соблюдения правил отличает монахов от мирян.', links: [{ title: 'Джайнизм — этика — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/jainism/#Ethic' }] },
  five_vows_jain: { category: 'Правило', date: 'IX–VI вв. до н.э.', description: 'Пять великих обетов (маха-враты) джайнизма: ахимса (ненасилие), сатья (правдивость), астейя (неворовство), брахмачарья (целомудрие), апариграха (нестяжание). Монахи соблюдают их абсолютно, миряне — частично (ану-враты).', links: [] },
  asceticism_jain: { category: 'Правило', date: 'IX–VI вв. до н.э.', description: 'Тапас (аскеза) в джайнизме — сознательное принятие трудностей для очищения кармы. Включает посты, ограничение пищи, медитацию в жарком солнце, изучение текстов, молчание (мауна). Внешняя аскеза сопровождается внутренней — покаянием и самоанализом.', links: [] },
  three_jewels_jain: { category: 'Правило', date: 'IX–VI вв. до н.э.', description: 'Три драгоценности (ратна-трая) джайнизма — путь к освобождению: 1) самьяг-даршана (правильное видение/вера), 2) самьяг-гьяна (правильное знание), 3) самьяг-чаритра (правильное поведение). Без всех трёх освобождение невозможно.', links: [{ title: 'Три драгоценности джайнизма — Британника', url: 'https://www.britannica.com/topic/ratnatraya' }] },

  jainism_practices: { category: 'Практики', date: 'IX–VI вв. до н.э.', description: 'Джайнские практики включают медитацию (самая), пост (анашана, упваса), паломничества к храмам на вершинах гор (Шатрунджая, Палитана), ритуальное омовение статуй тиртханкаров и ежедневное чтение агам.', links: [{ title: 'Джайнизм — практики — Британника', url: 'https://www.britannica.com/topic/Jainism/Rituals-and-social-practices' }] },
  meditation_jain: { category: 'Практика', date: 'IX–VI вв. до н.э.', description: 'Самая (медитация) в джайнизме — практика сосредоточения на душе (дживе) для очищения от кармы. Включает четыре вида созерцания: арта-дхьяна (печали), раудра-дхьяна (гнева), дхарма-дхьяна (блага) и шукла-дхьяна (чистого света). Последние две ведут к освобождению.', links: [{ title: 'Джайнская медитация — Британника', url: 'https://www.britannica.com/topic/Jainism/Monastic-life#ref298350' }] },
  fasting_jain: { category: 'Практика', date: 'IX–VI вв. до н.э.', description: 'Пост (анашана, упваса) — важнейшая джайнская практика очищения. Включает полный отказ от пищи на 1–3 дня (упваса) и ритуальное голодание до смерти (сантара/саллекхана) — добровольный уход из жизни в состоянии полной осознанности.', links: [] },
  pilgrimage_jain: { category: 'Практика', date: 'IX–VI вв. до н.э.', description: 'Паломничество (тиртха-ятра) — посещение святых мест, связанных с тиртханкарами. Главные центры: Шатрунджая (Палитана, Гуджарат), Гирнар (Джунагадх), Абу (Раджастхан), Шравана-Белгола (Карнатака). Джайны строят храмы на вершинах гор.', links: [] },

  // ─── SIKHISM ────────────────────────────────────────────────────
  sikhism: { category: 'Ветвь', date: 'XV–XVI вв.', description: 'Сикхизм — монотеистическая религия, основанная в Пенджабе (Северо-Западная Индия) гуру Нанаком (1469–1539). Сочетает элементы индуизма и ислама, но имеет собственное учение. Центральный принцип — единство Бога (Эк-Онкар) и равенство всех людей. Ок. 30 млн последователей (5-я по величине религия мира).', rules: ['Единый Бог (Эк-Онкар)', 'Равенство всех людей', 'Отказ от кастовой системы', 'Активное служение (сева)', 'Почитание Гуру Грантх Сахиб'], links: [] },

  sikhism_beliefs: { category: 'Верования', date: 'XV–XVI вв.', description: 'Основные верования сикхизма: единобожие (Эк-Онкар), почитание десяти гуру (от Нанака до Гобинд Сингха), учение о хальсе (общине равных), карма и сансара как божественный порядок, служение (сева) как путь к спасению.', links: [{ title: 'Сикхизм — вероучение — Британника', url: 'https://www.britannica.com/topic/Sikhism' }] },
  ek_onkar: { category: 'Верование', date: 'XV–XVI вв.', description: 'Эк-Онкар («Бог Един») — фундаментальный принцип сикхизма. Бог един, бесформен, вне времени и рождения, одновременно трансцендентен и имманентен. Не имеет пола, не воплощается, постигается через любовь и преданность (бхакти). Символ — ੴ (ик-оанкар).', links: [] },
  gurus_sikh: { category: 'Верование', date: 'XV–XVIII вв.', description: 'Десять гуру сикхизма: 1) Нанак (1469–1539), 2) Ангад, 3) Амар Дас, 4) Рам Дас, 5) Арджан (автор Ади Грантх), 6) Хар Гобинд, 7) Хар Рай, 8) Хар Кришан, 9) Тегх Бахадур, 10) Гобинд Сингх (основатель хальсы). После десятого гуру — Гуру Грантх Сахиб как вечный гуру.', links: [] },
  khalsa: { category: 'Верование', date: '1699 г.', description: 'Хальса («Чистая», «Община избранных») — военно-религиозная община сикхов, основанная гуру Гобинд Сингхом в 1699 г. Все члены хальсы принимают пять К (кеш, канха, кара, кирпан, каччхера). Хальса символизирует равенство и готовность защищать веру.', links: [] },
  sewa_sikh: { category: 'Верование', date: 'XV–XVI вв.', description: 'Сева (бескорыстное служение) — центральная добродетель сикхизма. Проявляется в общественных кухнях (лангар), помощи нуждающимся, уходу за гурдварами. Сева — не просто благотворительность, а путь преодоления эго и единения с Богом.', links: [] },
  karma_sikh: { category: 'Верование', date: 'XV–XVI вв.', description: 'В сикхизме карма и сансара понимаются как проявление божественного порядка (хукам). Бог — конечная причина всего, но человек обладает свободной волей. Освобождение достигается не отказом от мира, а активной жизнью в преданности и служении.', links: [{ title: 'Сикхизм — философия — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/sikhism/' }] },

  sikhism_texts: { category: 'Тексты', date: '1604 г.', description: 'Главный священный текст сикхизма — Гуру Грантх Сахиб (Ади Грантх), составленный гуру Арджаном в 1604 г. Написан на пенджаби (шрифт гурмукхи). Содержит гимны и молитвы гуру и святых учителей разных религий (Кабир, Равидас, Фарид).', links: [] },
  guru_granth_sahib: { category: 'Священный текст', date: '1604 г.', description: 'Гуру Грантх Сахиб — священное писание сикхизма, почитаемое как живой гуру. Состоит из 1430 страниц, содержит 5864 шабда (гимна). Включает сочинения первых пяти гуру, а также стихи индуистских и мусульманских святых (Кабир, Шейх Фарид, Равидас, Намдев). Единственный священный текст, который исполняется как музыка (киртан).', links: [{ title: 'Гуру Грантх Сахиб — Британника', url: 'https://www.britannica.com/topic/Adi-Granth' }, { title: 'Гуру Грантх Сахиб — Sacred-Texts', url: 'https://www.sacred-texts.com/skh/granth.htm' }] },

  sikhism_rules: { category: 'Правила', date: '1699 г.', description: 'Правила сикхизма включают пять К (обязательные для хальсы) и три столпа (наам, даан, иснаан). Запреты: табак, алкоголь, кастовая дискриминация, суеверия и ритуалы. Сикхи не признают аскезу и отшельничество как путь к спасению.', links: [{ title: 'Сикхизм — этика — Британника', url: 'https://www.britannica.com/topic/Sikhism/' }] },
  five_ks: { category: 'Правило', date: '1699 г.', description: 'Пять К — обязательные элементы внешности для членов хальсы (все названия начинаются с «к» на пенджаби): кеш (нестриженые волосы), канха (деревянный гребень), кара (стальной браслет), кирпан (ритуальный кинжал), каччхера (короткие штаны). Символизируют преданность вере и готовность к защите.', links: [] },
  sikh_principles: { category: 'Правило', date: 'XV–XVI вв.', description: 'Три столпа сикхизма (гуру Нанак): 1) Наам-джапо (повторение имени Бога), 2) Кират-каро (честный труд, жизнь мирянина), 3) Ванд-чакко (делиться с нуждающимися, сева и лангар). В отличие от индуизма, сикхизм не признаёт отшельничество.', links: [] },

  sikhism_practices: { category: 'Практики', date: 'XV–XVI вв.', description: 'Сикхские практики включают: киртан (коллективное пение гимнов), лангар (общая трапеза в гурдваре), чтение Гуру Грантх Сахиб, медитацию на имя Бога (наам-джап), праздники (Вайсакхи, Дивали, гурупурабы) и паломничества в Золотой Храм (Амритсар).', links: [{ title: 'Сикхизм — практики — Британника', url: 'https://www.britannica.com/topic/Sikhism/Rites-and-ceremonies' }] },
  langar: { category: 'Практика', date: 'XV–XVI вв.', description: 'Лангар — общественная бесплатная трапеза в гурдваре (сикхском храме). Все посетители, независимо от веры, касты или пола, едят вместе на полу, сидя рядами. Пища вегетарианская. Лангар — символ равенства и служения (севы).', links: [] },
  kirtan_sikh: { category: 'Практика', date: 'XV–XVI вв.', description: 'Киртан — коллективное музыкальное исполнение гимнов из Гуру Грантх Сахиб и сочинений сикхских поэтов. Сопровождается инструментами: хармониум, табла, рабаб. Киртан — не просто пение, а способ медитации и соединения с Богом через звук.', links: [] },

  // ─── EAST ASIAN ────────────────────────────────────────────────
  east_asian: { category: 'Корень', description: 'Восточноазиатские учения — даосизм, конфуцианство и синтоизм, сформировавшиеся в Китае и Японии. В отличие от авраамических и дхармических религий, акцентируют гармонию с природой, социальный порядок и ритуальную чистоту. Не имеют единого основателя и не требуют веры в единого Бога.', rules: ['Гармония с природой (дао/ками)', 'Социальный порядок и ритуал', 'Почитание предков', 'Самосовершенствование'] },

  taoism: { category: 'Ветвь', date: 'VI–IV вв. до н.э.', description: 'Даосизм — китайское философско-религиозное учение, основанное Лао-цзы (VI в. до н.э.) и Чжуан-цзы (IV в. до н.э.). Центральное понятие — Дао («Путь») — естественный порядок вселенной. Философский даосизм учит недеянию (у-вэй) и простоте. Религиозный даосизм включает пантеон божеств, алхимию и практики бессмертия. Оказал глубокое влияние на китайскую культуру, медицину и боевые искусства.', links: [{ title: 'Дао Дэ Цзин — Chinese Text Project', url: 'https://ctext.org/dao-de-jing' }] },
  tao: { category: 'Верование', date: 'VI–IV вв. до н.э.', description: 'Дао («Путь») — центральное понятие даосизма. Безличный, вечный, невыразимый принцип, порождающий всё сущее. «Дао, которое может быть выражено словами, не есть постоянное дао» (Дао Дэ Цзин, гл. 1). Дао — одновременно источник, закон и цель бытия. Человек должен следовать дао, а не противиться ему.', links: [{ title: 'Дао — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/daoism/' }] },
  de_tao: { category: 'Верование', date: 'VI–IV вв. до н.э.', description: 'Дэ («Добродетель», «Благая сила») — проявление дао в конкретных вещах. Каждая вещь обладает своей дэ — внутренней силой, которая делает её тем, что она есть. В «Дао Дэ Цзин» Лао-цзы учит: высшая добродетель — та, что не осознаёт себя как добродетель.', links: [{ title: 'Дао Дэ Цзин — CText.org', url: 'https://ctext.org/dao-de-jing' }] },
  wuwei: { category: 'Верование', date: 'VI–IV вв. до н.э.', description: 'У-вэй («недеяние», «не-действие») — принцип не-насильственного, естественного действия в согласии с дао. Не означает бездействие, а означает действие без усилия, без борьбы, без противостояния естественному течению вещей. «Лучший правитель — тот, о котором народ знает лишь, что он существует» (Дао Дэ Цзин).', links: [{ title: 'У-вэй — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/daoism/#ConceptDeDao' }] },
  pu_tao: { category: 'Верование', date: 'VI–IV вв. до н.э.', description: 'Пу («Необработанный кусок дерева», «Пустота») — метафора изначальной, простой, неиспорченной природы. Даосизм призывает вернуться к состоянию пу, простоте и спонтанности, освободившись от искусственных социальных условностей. Созерцание пустоты — путь к единению с дао.', links: [{ title: 'Чжуан-цзы — CText.org', url: 'https://ctext.org/zhuangzi' }] },
  tao_te_ching: { category: 'Священный текст', date: 'VI–IV вв. до н.э.', description: '«Дао Дэ Цзин» («Книга Пути и Добродетели») — основополагающий текст даосизма, приписываемый Лао-цзы (VI–V вв. до н.э.). Состоит из 81 короткой главы, написанных афористическим стихом. Кратчайший из великих религиозных текстов (ок. 5000 иероглифов). Один из самых переводимых текстов в мировой литературе.', links: [{ title: 'Дао Дэ Цзин — CText.org', url: 'https://ctext.org/dao-de-jing' }] },
  zhuangzi_book: { category: 'Священный текст', date: 'IV–III вв. до н.э.', description: '«Чжуан-цзы» — второй по значимости текст даосизма, приписываемый философу Чжуан-цзы (IV в. до н.э.). Написан в форме притч, аллегорий и парадоксов. Знаменитые истории: «Сон Чжуан-цзы о бабочке», «Приготовление к кулинарии воловьей туши». Развивает концепции дао и у-вэй с юмором и поэзией.', links: [{ title: 'Чжуан-цзы — CText.org', url: 'https://ctext.org/zhuangzi' }] },
  taoist_meditation: { category: 'Практика', date: 'VI в. до н.э.', description: 'Даосская медитация — практика успокоения ума и единения с дао. Включает «сидячую забывчивость» (цзо-ван) — полное отрешение от мыслей и чувств, «созерцание пустоты» и «внутреннюю алхимию» (нэй-дань) — визуализацию потоков ци в теле. Цель — бессмертие (физическое или духовное).', links: [{ title: 'Даосизм — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/daoism/' }] },
  qigong: { category: 'Практика', date: 'II–I вв. до н.э.', description: 'Цигун («работа с ци») — система дыхательных, двигательных и медитативных практик, основанная на даосской философии. Управление жизненной энергией (ци) через движение и дыхание. Включает тайцзицюань, практики оздоровления и долголетия.', links: [{ title: 'Цигун — Британника', url: 'https://www.britannica.com/topic/qigong' }] },
  feng_shui: { category: 'Практика', date: 'IV–III вв. до н.э.', description: 'Фэн-шуй («ветер и вода») — даосская практика гармонизации пространства для обеспечения благоприятного потока ци. Основана на учении об инь-ян и пяти элементах (у-син). Используется при строительстве домов, планировке городов, захоронениях.', links: [{ title: 'Фэн-шуй — Британника', url: 'https://www.britannica.com/topic/feng-shui' }] },

  confucianism: { category: 'Ветвь', date: 'VI–V вв. до н.э.', description: 'Конфуцианство — этико-философское учение, основанное Конфуцием (Кун-цзы, 551–479 до н.э.). Не столько религия, сколько моральная система, регулирующая все аспекты жизни. Центральные понятия: жэнь (человеколюбие), ли (ритуал), и (долг), сяо (сыновняя почтительность). Определяло китайскую цивилизацию на протяжении 2500 лет.', links: [{ title: 'Лунь Юй — Chinese Text Project', url: 'https://ctext.org/analects' }] },
  ren: { category: 'Верование', date: 'VI–V вв. до н.э.', description: 'Жэнь («человеколюбие», «гуманность») — центральная добродетель конфуцианства, основа всех моральных качеств. Означает любовь к людям, способность относиться к другим как к себе. «Не делай другим того, чего не желаешь себе» (Лунь Юй 12:2). Золотое правило этики Конфуция.', links: [{ title: 'Лунь Юй — CText.org', url: 'https://ctext.org/analects' }] },
  li_conf: { category: 'Верование', date: 'VI–V вв. до н.э.', description: 'Ли («ритуал», «этикет», «благопристойность») — свод правил поведения, церемоний и ритуалов, регулирующих все сферы жизни. Конфуций считал, что следование ли воспитывает жэнь и поддерживает социальный порядок. «Без ли нет порядка» (Лунь Юй).', links: [{ title: 'Конфуцианство — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/confucius/' }] },
  yi_conf: { category: 'Верование', date: 'VI–V вв. до н.э.', description: 'И («долг», «справедливость», «праведность») — моральное обязательство делать правильное не ради выгоды, а потому что это правильно. Противопоставляется корысти (ли). Благородный муж (цзюнь-цзы) руководствуется долгом, а не выгодой.', links: [{ title: 'Лунь Юй — CText.org', url: 'https://ctext.org/analects' }] },
  xiao: { category: 'Верование', date: 'VI–V вв. до н.э.', description: 'Сяо («сыновняя почтительность», «почитание родителей») — основа всех добродетелей в конфуцианстве. Уважение к родителям при жизни и после смерти, забота о них, продолжение рода, поддержание семейной чести. Конфуций: «Сяо — корень всех добродетелей».', links: [{ title: 'Сяо — Британника', url: 'https://www.britannica.com/topic/xiao' }] },
  analects: { category: 'Священный текст', date: 'V–IV вв. до н.э.', description: '«Лунь Юй» («Аналекты») — сборник бесед и высказываний Конфуция, записанных его учениками. Состоит из 20 глав. Основной источник конфуцианской этики. Ключевое произведение китайской философии, на протяжении веков обязательное для изучения чиновниками.', links: [{ title: 'Лунь Юй — CText.org', url: 'https://ctext.org/analects' }] },
  five_classics: { category: 'Священный текст', date: 'XI–V вв. до н.э.', description: 'Пятикнижие (У-цзин) — пять древних китайских текстов, составлявших основу конфуцианского образования: «И Цзин» (Книга Перемен), «Шу Цзин» (Книга Истории), «Ши Цзин» (Книга Песен), «Ли Цзи» (Книга Ритуалов), «Чуньцю» (Летопись Весны и Осени).', links: [{ title: 'У-цзин — CText.org', url: 'https://ctext.org/' }] },
  ancestor_worship: { category: 'Практика', date: 'XX в. до н.э.', description: 'Почитание предков — древнейшая практика Китая, интегрированная в конфуцианство. Включает поддержание семейных алтарей, подношения пищи и благовоний, поклоны перед табличками предков. Сяо-сыновняя почтительность — основа этой практики.', links: [{ title: 'Китайские религии — Британника', url: 'https://www.britannica.com/topic/Chinese-religion' }] },
  education_conf: { category: 'Практика', date: 'VI–V вв. до н.э.', description: 'Образование — центральная практика конфуцианства. Конфуций первым в Китае открыл частную школу для всех, независимо от происхождения. Идеал: цзюнь-цзы (благородный муж) — образованный, моральный, культурный человек. Система государственных экзаменов (кэцзюй) на основе конфуцианских текстов.', links: [{ title: 'Конфуций — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/confucius/' }] },
  rituals_conf: { category: 'Практика', date: 'VI–V вв. до н.э.', description: 'Ритуалы (ли) — система церемоний, регулирующих жизнь от рождения до смерти. Включают свадебные, похоронные и жертвенные обряды, этикет повседневного общения. Конфуций учил: ритуалы не формальность, а средство воспитания моральных качеств и поддержания гармонии.', links: [{ title: 'Ли — Британника', url: 'https://www.britannica.com/topic/li-Chinese-philosophy' }] },

  shinto: { category: 'Ветвь', date: 'VIII–VI вв. до н.э. (оформл. VI–VIII вв.)', description: 'Синтоизм («Путь богов») — традиционная религия Японии, основанная на почитании ками (духов природы, предков, божеств). Не имеет основателя или священного канона. Сформировался из древних японских верований в VIII в. с созданием «Кодзики» и «Нихон сёки». Акцент на ритуальной чистоте, почитании природы и императорской семьи.', links: [{ title: 'Jinja Honcho — Ассоциация синтоистских святилищ', url: 'https://www.jinjahoncho.or.jp/' }] },
  kami: { category: 'Верование', date: 'с древности', description: 'Ками — духи или божества синтоизма. Могут быть природными явлениями (солнце, ветер, горы), предками, героями, абстрактными силами. В отличие от западного понятия Бога, ками не всемогущи и не всеблаги. Центральный ками — Аматэрасу (богиня Солнца), родоначальница императорского рода.', links: [{ title: 'Ками — Британника', url: 'https://www.britannica.com/topic/kami' }] },
  amaterasu: { category: 'Верование', date: 'с древности', description: 'Аматэрасу Омиками («Великая священная богиня, сияющая на небе») — богиня Солнца, верховное божество синтоистского пантеона. Считается родоначальницей японского императорского дома. Главное святилище — Исэ Дзингу. Согласно мифу, из пещеры, куда она спряталась, её выманили танцем и зеркалом.', links: [{ title: 'Аматэрасу — Британника', url: 'https://www.britannica.com/topic/Amaterasu' }] },
  kojiki: { category: 'Священный текст', date: '712 г.', description: '«Кодзики» («Записи о деяниях древности») — древнейшая японская хроника, составленная О-но Ясумаро в 712 г. по указу императрицы Гэммэй. Содержит мифы о сотворении мира, богах-ками, легендарных императорах. Один из главных священных текстов синтоизма.', links: [{ title: 'Кодзики — Sacred-Texts.com', url: 'https://www.sacred-texts.com/shi/kj/index.htm' }] },
  nihon_shoki: { category: 'Священный текст', date: '720 г.', description: '«Нихон сёки» («Анналы Японии») — вторая древнейшая японская хроника, завершённая в 720 г. Охватывает историю от мифического сотворения до конца VII века. Написана на классическом китайском. Более подробная и «историческая», чем Кодзики.', links: [{ title: 'Нихон сёки — Sacred-Texts.com', url: 'https://www.sacred-texts.com/shi/nihon.htm' }] },
  shinto_purification: { category: 'Практика', date: 'с древности', description: 'Хараи (очищение) — ритуал очищения от скверны (цуми), центральная практика синтоизма. Включает омовение рук и рта у входа в святилище (тэмпура), окропление солёной водой, размахивание жезлом с бумажными полосками (хараи-гуси), ритуал охараи (великое очищение).', links: [{ title: 'Синтоизм — Британника', url: 'https://www.britannica.com/topic/Shinto' }] },
  shinto_festivals: { category: 'Практика', date: 'с древности', description: 'Мацури — синтоистские праздники и фестивали в честь ками. Включают процессии с микоси (переносными святилищами), музыку гагаку, танцы кагура, ритуальные угощения. Крупнейшие: Гион мацури (Киото), Канда мацури (Токио), Ава о-дорри. Каждый храм проводит свой ежегодный мацури.', links: [{ title: 'Мацури — Британника', url: 'https://www.britannica.com/topic/matsuri' }] },
  shinto_shrines: { category: 'Практика', date: 'с древности', description: 'Святилища (дзиндзя) — места обитания ками и поклонения им. Характерные элементы: тории (ворота), тэмпуя (чаша для омовения), хайдэн (зал для молитв), хондэн (святая святых). Важнейшее святилище — Исэ Дзингу. Посещение святилища включает омовение, поклон, подношение и молитву.', links: [{ title: 'Исэ Дзингу — официальный сайт', url: 'https://www.isejingu.or.jp/' }] },

  // ─── GROUPING LABELS (category containers) ───────────────
  christianity_beliefs: { category: 'Группа', description: 'Верования христианства — основные догматы и учения, сформировавшиеся в первые века церкви.' },
  christianity_texts: { category: 'Группа', description: 'Священные тексты христианства — Ветхий и Новый Завет.' },
  christianity_rules: { category: 'Группа', description: 'Правила и заповеди христианства — этические и моральные предписания.' },
  christianity_practices: { category: 'Группа', description: 'Таинства и практики христианства — обряды, установленные Христом.' },
  christianity_apocrypha: { category: 'Группа', description: 'Апокрифы — тексты, не вошедшие в библейский канон, но связанные с библейскими сюжетами.' },

  judaism_beliefs: { category: 'Группа', description: 'Верования иудаизма — фундаментальные принципы еврейской религии.' },
  judaism_texts: { category: 'Группа', description: 'Священные тексты иудаизма — Танах, Талмуд и мистическая литература.' },
  judaism_rules: { category: 'Группа', description: 'Заповеди и правила иудаизма — мицвот (613 заповедей) и Галаха.' },
  judaism_practices: { category: 'Группа', description: 'Практики иудаизма — шаббат, кашрут, обрезание, праздники.' },

  islam_beliefs: { category: 'Группа', description: 'Верования ислама — шесть столпов имана (веры).' },
  islam_texts: { category: 'Группа', description: 'Священные тексты ислама — Коран и Сунна (хадисы).' },
  islam_rules: { category: 'Группа', description: 'Правила и столпы ислама — пять столпов, халяль.' },

  hinduism_traditions: { category: 'Группа', description: 'Школы и направления индуизма — четыре основные традиции и философские школы.' },
  hinduism_beliefs: { category: 'Группа', description: 'Верования индуизма — центральные понятия: Брахман, Атман, карма, сансара, мокша, дхарма.' },
  hinduism_texts: { category: 'Группа', description: 'Священные тексты индуизма — Веды, Упанишады, Пураны, эпосы.' },
  hinduism_rules: { category: 'Группа', description: 'Этические правила индуизма — ямы, ниямы.' },
  hinduism_practices: { category: 'Группа', description: 'Практики индуизма — йога, пуджа, медитация, мантра, бхакти.' },
  hinduism_modern: { category: 'Группа', description: 'Современные движения в индуизме — реформаторские и нео-индуистские организации XIX–XX вв.' },

  buddhism_schools: { category: 'Группа', description: 'Школы буддизма — три основные ветви: Тхеравада, Махаяна, Ваджраяна.' },
  buddhism_beliefs: { category: 'Группа', description: 'Верования буддизма — Четыре Благородные Истины, Восьмеричный Путь, карма, нирвана.' },
  buddhism_texts: { category: 'Группа', description: 'Священные тексты буддизма — Трипитака, сутры Махаяны, Дхаммапада.' },
  buddhism_practices: { category: 'Группа', description: 'Практики буддизма — медитация, осознанность, пение сутр.' },

  taoism_beliefs: { category: 'Группа', description: 'Верования даосизма — Дао, Дэ, У-вэй, Пу.' },
  taoism_texts: { category: 'Группа', description: 'Священные тексты даосизма — Дао Дэ Цзин, Чжуан-цзы.' },
  taoism_practices: { category: 'Группа', description: 'Практики даосизма — медитация, цигун, фэн-шуй.' },

  confucianism_beliefs: { category: 'Группа', description: 'Верования конфуцианства — Жэнь, Ли, И, Сяо.' },
  confucianism_texts: { category: 'Группа', description: 'Священные тексты конфуцианства — Лунь Юй, Пятикнижие (У-цзин).' },
  confucianism_practices: { category: 'Группа', description: 'Практики конфуцианства — почитание предков, образование, ритуалы.' },

  shinto_beliefs: { category: 'Группа', description: 'Верования синтоизма — ками, Аматэрасу.' },
  shinto_texts: { category: 'Группа', description: 'Священные тексты синтоизма — Кодзики, Нихон сёки.' },
  shinto_practices: { category: 'Группа', description: 'Практики синтоизма — очищение, мацури, святилища.' },

  roman_pagan_beliefs: { category: 'Группа', description: 'Верования Древнего Рима — Юпитер, культ императора, Pax Deorum.' },
  roman_gods_jupiter: { category: 'Верование', description: 'Юпитер — верховный бог римлян.' },
  roman_gods_imperial: { category: 'Верование', description: 'Культ императора — обожествление римских императоров.' },
  roman_pax_deorum: { category: 'Верование', description: 'Pax Deorum (Мир богов) — гармония между людьми и богами.' },
  roman_pagan_practices: { category: 'Группа', description: 'Практики Древнего Рима — жертвоприношения, ауспиции, праздники.' },
  roman_sacrifice: { category: 'Практика', description: 'Римские жертвоприношения животных.' },
  roman_augury: { category: 'Практика', description: 'Ауспиции — гадание по полёту птиц.' },
  roman_festivals: { category: 'Практика', description: 'Сатурналии, Луперкалии — римские религиозные праздники.' },

  norse_beliefs: { category: 'Группа', description: 'Верования скандинавов — асы, ваны, Рагнарёк.' },
  norse_pantheon: { category: 'Верование', description: 'Асы (Один, Тор) и ваны (Фрейя, Ньёрд) — основные группы скандинавских богов.' },
  norse_odin: { category: 'Верование', description: 'Один — верховный бог, бог мудрости, войны и поэзии.' },
  norse_thor: { category: 'Верование', description: 'Тор — бог грома, защитник людей.' },
  norse_ragnarok: { category: 'Верование', description: 'Рагнарёк — гибель богов и возрождение мира в скандинавской мифологии.' },
  norse_texts: { category: 'Группа', description: 'Тексты скандинавской религии — Эдды, саги.' },
  norse_edda: { category: 'Священный текст', description: 'Старшая и Младшая Эдда — основные источники скандинавской мифологии.' },
  norse_sagas: { category: 'Текст', description: 'Исландские саги — прозаические повествования о героях и вождях.' },
  norse_practices: { category: 'Группа', description: 'Практики скандинавов — блот, сейд.' },
  norse_blot: { category: 'Практика', description: 'Блот — жертвоприношение богам.' },
  norse_seid: { category: 'Практика', description: 'Сейд — шаманская магия, предсказания.' },

  slavic_pagan_beliefs: { category: 'Группа', description: 'Верования славян — Перун, Велес, пантеон.' },
  slavic_pantheon: { category: 'Верование', description: 'Славянские божества: Перун, Велес, Сварог, Дажьбог, Мокошь.' },
  slavic_perun: { category: 'Верование', description: 'Перун — бог-громовержец, верховное божество славян.' },
  slavic_veles: { category: 'Верование', description: 'Велес — бог скота, богатства и подземного мира.' },
  slavic_pagan_practices: { category: 'Группа', description: 'Практики славян — обряды, Коляда, Масленица.' },
  slavic_rituals: { category: 'Практика', description: 'Славянские обряды — капища, требы, почитание предков.' },
  slavic_koliada: { category: 'Практика', description: 'Коляда — зимний праздник, колядование.' },
  slavic_maslenitsa: { category: 'Практика', description: 'Масленица — проводы зимы, солярный праздник.' },

  pre_islamic_beliefs: { category: 'Группа', description: 'Верования доисламской Аравии.' },
  arabian_gods: { category: 'Верование', description: 'Аллат, аль-Узза, Манат — главные божества аравийского пантеона.' },
  arabian_hanifs: { category: 'Верование', description: 'Ханифы — монотеисты доисламской Аравии, не принадлежавшие к иудаизму или христианству.' },
  pre_islamic_practices: { category: 'Группа', description: 'Практики доисламской Аравии.' },
  arabian_pagan_cults: { category: 'Практика', description: 'Племенные культы, почитание идолов в Каабе.' },
  arabian_kaaba_cult: { category: 'Практика', description: 'Культ Каабы как святилища до ислама.' },

  vedic_beliefs: { category: 'Группа', description: 'Верования ведической религии.' },
  vedic_gods: { category: 'Верование', description: 'Индра, Агни, Варуна, Сома — главные ведийские божества.' },
  vedic_yajna: { category: 'Верование', description: 'Яджна — ведическое жертвоприношение, центральный ритуал.' },
  vedic_texts: { category: 'Группа', description: 'Тексты ведической религии — Веды.' },
  vedic_rigveda: { category: 'Священный текст', description: 'Ригведа — древнейший священный текст индуизма.' },
  vedic_practices: { category: 'Группа', description: 'Практики ведической религии.' },
  vedic_rituals: { category: 'Практика', description: 'Сложные жертвенные церемонии с чтением ведийских гимнов.' },

  celtic_pagan: { category: 'Древняя религия', description: 'Кельтская политеистическая религия. Друиды — жрецы, хранители традиции. Самайн, Бельтайн, Имболк, Лугнасад — четыре праздника колеса года.', links: [] },
  celtic_pagan_beliefs: { category: 'Группа', description: 'Верования кельтов — пантеон, друиды, потусторонний мир.' },
  celtic_pantheon: { category: 'Верование', description: 'Кельтские божества: Таранис, Кернунн, Эпона, Луг, Дагда, Морриган.' },
  celtic_druids: { category: 'Верование', description: 'Друиды — жреческое сословие, хранители знаний и ритуалов.' },
  celtic_otherworld: { category: 'Верование', description: 'Потусторонний мир (Сид, Тир на Ног) — райская земля молодости.' },
  celtic_pagan_practices: { category: 'Группа', description: 'Практики кельтов — праздники, жертвоприношения.' },
  celtic_festivals: { category: 'Практика', description: 'Самайн, Имболк, Бельтайн, Лугнасад — четыре главных праздника.' },
  celtic_sacrifice: { category: 'Практика', description: 'Жертвоприношения: животные, символические, иногда человеческие.' },

  baltic_pagan: { category: 'Древняя религия', description: 'Балтская религия: Перкунас, Диевас, Жемина. Последняя языческая религия Европы (Литва — до 1387 г.). Культ огня и священных рощ.', links: [] },
  baltic_pagan_beliefs: { category: 'Группа', description: 'Верования балтов — Перкунас, пантеон.' },
  baltic_perkunas: { category: 'Верование', description: 'Перкунас — верховный бог-громовержец балтов.' },
  baltic_pantheon: { category: 'Верование', description: 'Потримпс, Пиколс, Жемина, Сауле, Менес, Аушра.' },
  baltic_pagan_practices: { category: 'Группа', description: 'Практики балтов — обряды, культ огня.' },
  baltic_rituals: { category: 'Практика', description: 'Обряды в священных рощах, жрецы-вайделоты, вечный огонь.' },
  baltic_fire_cult: { category: 'Практика', description: 'Культ огня — центральный элемент балтской религии.' },

  finno_ugric: { category: 'Древняя религия', description: 'Финно-угорский шаманизм. «Калевала», духи природы, шаманы-нойда. Миф о нырянии за землёй.', links: [] },
  finno_ugric_beliefs: { category: 'Группа', description: 'Верования финно-угров — шаманизм, духи.' },
  finno_shamanism: { category: 'Верование', description: 'Шаманы (нойда) — посредники между миром людей и духов.' },
  finno_spirits: { category: 'Верование', description: 'Духи природы: хийси, веденева, тапио, акка.' },
  finno_ugric_practices: { category: 'Группа', description: 'Практики финно-угров.' },
  finno_rituals: { category: 'Практика', description: 'Камлание с бубном, путешествие в мир духов.' },
  finno_sacrifice: { category: 'Практика', description: 'Жертвоприношения: животные, молоко, хлеб в священных рощах.' },

  tengrism: { category: 'Древняя религия / шаманизм', description: 'Религия тюрков и монголов: Тенгри (Небо), Умай, Эрлик. Трёхъярусный мир, шаманы-камы.', links: [] },
  tengrism_beliefs: { category: 'Группа', description: 'Верования тенгрианства — Тенгри, Небо, духи.' },
  tengri_god: { category: 'Верование', description: 'Тенгри — верховный бог Неба, творец всего сущего.' },
  tengri_sky: { category: 'Верование', description: 'Умай — богиня земли; Эрлик — бог подземного мира.' },
  tengrism_practices: { category: 'Группа', description: 'Практики тенгрианства.' },
  tengri_rituals: { category: 'Практика', description: 'Моления на вершинах гор, жертвоприношения коней.' },
  tengri_shaman: { category: 'Практика', description: 'Шаманы (камы) — камлание, лечение, предсказания.' },

  african_trad: { category: 'Традиционная религия', description: 'Религии Африки: культ предков, ориша (йоруба), вуду (фон). Система гадания Ифа.', links: [] },
  african_trad_beliefs: { category: 'Группа', description: 'Верования африканских традиционных религий.' },
  african_yoruba: { category: 'Верование', description: 'Религия йоруба: Олорун, 400+ Ориша, Ифа.' },
  african_vodun: { category: 'Верование', description: 'Вудун (фон): Маву-Лиза, Локо, Дан.' },
  african_trad_practices: { category: 'Группа', description: 'Практики африканских религий.' },
  african_rituals: { category: 'Практика', description: 'Ритуальные танцы, подношения предкам, инициации.' },
  african_divination: { category: 'Практика', description: 'Система гадания Ифа — 256 знаков, включена в наследие ЮНЕСКО.' },

  polynesian: { category: 'Традиционная религия', description: 'Полинезийская религия: Ранги и Папа, Мауи, мана и тапу. Мараэ, тохунги, мореплавание и космогония.', links: [] },
  polynesian_beliefs: { category: 'Группа', description: 'Верования полинезийцев — мана, тапу, пантеон.' },
  polynesian_gods: { category: 'Верование', description: 'Ранги, Папа, Тан, Ту, Ронго, Тане.' },
  polynesian_mana: { category: 'Верование', description: 'Мана — сверхъестественная энергия, присущая людям и предметам.' },
  polynesian_tapu: { category: 'Верование', description: 'Тапу — система священных запретов, регулировавшая жизнь.' },
  polynesian_practices: { category: 'Группа', description: 'Практики полинезийцев.' },
  polynesian_rituals: { category: 'Практика', description: 'Молитвы, жертвоприношения, хака, марае.' },
  polynesian_tattoo: { category: 'Практика', description: 'Та-моко — священная татуировка маори, передающая статус.' },

  native_american: { category: 'Традиционная религия', description: 'Религии коренных народов Америки: Великий Дух, тотемы, Танец Солнца, поиск видения.', links: [{ title: 'Религии индейцев — Britannica', url: 'https://www.britannica.com/topic/Native-American-religion' }] },
  native_american_beliefs: { category: 'Группа', description: 'Верования коренных народов Америки.' },
  native_great_spirit: { category: 'Верование', description: 'Великий Дух (Вакан-Танка, Маниту) — верховная сила.' },
  native_spirits: { category: 'Верование', description: 'Духи природы, громовые птицы, койот-трикстер.' },
  native_american_practices: { category: 'Группа', description: 'Практики коренных народов Америки.' },
  native_ceremonies: { category: 'Практика', description: 'Танец Солнца, потлач, трубка мира.' },
  native_vision_quest: { category: 'Практика', description: 'Поиск видения — обряд перехода с постом и молитвой.' },
  native_sweat_lodge: { category: 'Практика', description: 'Инипи — ритуал очищения в парильне.' },

  // ─── MODERN SPIRITUAL MOVEMENTS ──────────────────────────────
  modern_movements: { category: 'Ветвь', date: 'XIX–XX вв.', description: 'Современные духовные движения — совокупность синкретических религиозных и философских течений, возникших в XIX–XX вв. Характеризуются синтезом западного эзотеризма (герметизм, каббала, алхимия) и восточных учений (индуизм, буддизм). Ключевые концепции: духовная эволюция, реинкарнация, единство всех религий, существование тонких миров и вознесённых учителей.', rules: ['Духовная эволюция вселенной и человека', 'Единство всех религий как разных путей к Истине', 'Вера в реинкарнацию и закон кармы', 'Существование тонких миров и иерархии светлых сил', 'Практика медитации и духовного самосовершенствования'], links: [{ title: 'Western Esoteric Texts — Sacred-Texts.com', url: 'https://www.sacred-texts.com/eso/index.htm' }, { title: 'New Age — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/new-age' }] },
  theosophy: { category: 'Ветвь', date: '1875 г.', description: 'Теософия — религиозно-философское движение, основанное Еленой Блаватской в 1875 г. в Нью-Йорке. Цель: синтез науки, религии и философии на основе единой эзотерической традиции. Учение базируется на «Тайной Доктрине» Блаватской. Ключевые идеи: духовная эволюция, реинкарнация, карма, существование Великого Белого Братства вознесённых учителей (Махатм). Оказала огромное влияние на все последующие эзотерические движения XX века.', links: [{ title: 'Теософское общество — официальный сайт', url: 'https://www.theosophical.org/' }, { title: 'Тайная Доктрина — Sacred-Texts.com', url: 'https://www.sacred-texts.com/the/' }] },
  anthroposophy: { category: 'Ветвь', date: '1913 г.', description: 'Антропософия — духовно-философское учение, основанное Рудольфом Штейнером (1861–1925) после выхода из Теософского общества в 1913 г. Отличается от теософии акцентом на западную эзотерическую традицию и христианский мистицизм. Практическое применение: вальдорфская педагогика, биодинамическое земледелие, антропософская медицина и эвритмия.', links: [{ title: 'Гётеанум — официальный сайт', url: 'https://www.goetheanum.org/' }, { title: 'Рудольф Штейнер — архив', url: 'https://www.rsarchive.org/' }] },
  new_age: { category: 'Ветвь', date: '1960–1970-е гг.', description: 'Нью-эйдж (New Age, «Новая эра») — широкое религиозно-духовное движение, сформировавшееся в 1960–70-х гг. на Западе. Включает множество разнородных течений: от эзотерики и оккультизма до экологического движения и холистической медицины. Характерен эклектизм: заимствования из восточных религий, шаманизма, западного эзотеризма и современной психологии. Ключевая идея: наступает эпоха Водолея — новая эра духовного пробуждения.', links: [{ title: 'New Age — Sacred-Texts.com (Esoteric)', url: 'https://www.sacred-texts.com/eso/index.htm' }, { title: 'New Thought — Sacred-Texts.com', url: 'https://www.sacred-texts.com/nth/index.htm' }] },

  spiritual_evolution: { category: 'Верование', date: 'XIX–XX вв.', description: 'Духовная эволюция — центральная концепция современных духовных движений. В отличие от дарвиновской биологической эволюции, духовная эволюция понимается как восходящее развитие сознания через множество воплощений. Вселенная и человек развиваются от материи к духу, от неведения к просветлению. Эта концепция особенно развита в теософии (Блаватская), Агни-йоге (Рерихи) и интегральной йоге (Шри Ауробиндо).', links: [{ title: 'The Secret Doctrine — Sacred-Texts.com', url: 'https://www.sacred-texts.com/the/sd/index.htm' }, { title: 'The Life Divine — Sri Aurobindo Ashram', url: 'https://library.sriaurobindoashram.org/sriaurobindo/' }] },
  unity_of_religions: { category: 'Верование', date: 'XIX–XX вв.', description: 'Единство религий — учение о том, что все мировые религии являются разными путями к одной Истине. В основе лежит представление о едином эзотерическом ядре всех религий (perennial philosophy). Каждая религия — внешняя (экзотерическая) форма, за которой скрывается внутренняя (эзотерическая) истина. Эта позиция особенно характерна для теософии и учения Живой Этики.', links: [{ title: 'Perennial philosophy — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/perennial-philosophy/' }] },
  reincarnation_modern: { category: 'Верование', date: 'XIX–XX вв.', description: 'Реинкарнация (перевоплощение) — одно из ключевых верований современных духовных движений. В отличие от индуистской и буддийской концепций, в теософии и родственных ей учениях реинкарнация понимается как процесс духовной эволюции личности через последовательные воплощения. Душа (Эго) проходит цикл воплощений, накапливая опыт и развивая сознание. Карма — закон причин и следствий, управляющий перевоплощениями.', links: [{ title: 'Reincarnation — Theosophy (AnandGholap)', url: 'https://www.anandgholap.net/reincarnation.htm' }, { title: 'Theosophy — Sacred-Texts.com', url: 'https://www.sacred-texts.com/the/index.htm' }] },
  subtle_worlds: { category: 'Верование', date: 'XIX–XX вв.', description: 'Тонкие миры — эзотерическая концепция многоуровневого строения вселенной. Помимо физического мира, существуют тонкие (невидимые) планы бытия: эфирный, астральный (мир чувств и эмоций), ментальный (мир мыслей), каузальный (мир причин) и высшие духовные сферы. Каждый человек имеет соответствующие «тела» (эфирное, астральное, ментальное), которые продолжают существовать после смерти физического тела.', links: [{ title: 'The Planes of Consciousness — AnandGholap', url: 'https://www.anandgholap.net/planes_of_consciousness.htm' }, { title: 'Theosophical Glossary — Theosociety.org', url: 'https://www.theosociety.org/pasadena/etgloss/etg-hp.htm' }] },
  ascended_masters: { category: 'Верование', date: 'XIX–XX вв.', description: 'Вознесённые Владыки (Махатмы) — духовные учителя, достигшие высших ступеней эволюции и руководящие духовным развитием человечества. В теософии — Великое Белое Братство во главе с Махатмой Морией и Кут Хуми. В Агни-йоге — Махатма Мория (Учитель М.) как вдохновитель учения. В интегральной йоге — концепция «супраментальных существ». Идея восходит к западному эзотеризму (розенкрейцеры, «Граф Сен-Жермен»).', links: [{ title: 'The Mahatmas — Theosociety.org', url: 'https://www.theosociety.org/pasadena/mahatma/mahatma.htm' }, { title: 'The Masters — AnandGholap', url: 'https://www.anandgholap.net/masters.htm' }] },

  secret_doctrine: { category: 'Священный текст', date: '1888 г.', description: '«Тайная Доктрина» — основной труд Е.П. Блаватской (1888), синтез науки, религии и философии. Состоит из двух томов: «Космогенезис» (происхождение вселенной) и «Антропогенезис» (происхождение человека). Основана на «Станцах Дзиан» — предполагаемой древней книге. Оказала огромное влияние на эзотерическую мысль XX века.', links: [{ title: 'Тайная Доктрина — Sacred-Texts.com', url: 'https://www.sacred-texts.com/the/' }] },


  meditation_modern: { category: 'Практика', date: 'XIX–XX вв.', description: 'Медитация — центральная практика современных духовных движений. В теософии — сосредоточение на высших идеалах. В Агни-йоге — «огненная медитация» (созерцание огня и света). В интегральной йоге — медитация-концентрация на супраментальном сознании. Цель: расширение сознания, связь с высшими планами бытия, духовная трансформация.', links: [{ title: 'Knowledge of Higher Worlds — Steiner Archive', url: 'https://www.rsarchive.org/Books/GA010/' }, { title: 'Raja Yoga — Sacred-Texts.com', url: 'https://www.sacred-texts.com/eso/ryo/index.htm' }] },
  channeling: { category: 'Практика', date: 'XIX–XX вв.', description: 'Ченнелинг (каналирование) — практика получения духовной информации от высших сущностей. В теософии — получение посланий от Махатм (письма Махатм). В Агни-йоге — запись диктовок от Учителя М. В Нью-эйдже — широкая практика контакта с «духовными гидами», ангелами и инопланетными сущностями. Восходит к спиритизму XIX века.', links: [{ title: 'The Mahatma Letters — Theosociety.org', url: 'https://www.theosociety.org/pasadena/mahatma/mlintro.htm' }, { title: 'A Wanderer in the Spirit Lands — Sacred-Texts.com', url: 'https://www.sacred-texts.com/eso/wsl/index.htm' }] },
  affirmation: { category: 'Практика', date: 'XIX–XX вв.', description: 'Аффирмации — позитивные утверждения, повторяемые для программирования подсознания и достижения желаемых изменений в жизни. Восходят к движению «Новое мышление» (New Thought) XIX века. Широко используются в Нью-эйдже, движении «Позитивного мышления» и различных школах самосовершенствования.', links: [{ title: 'New Thought Index — Sacred-Texts.com', url: 'https://www.sacred-texts.com/nth/index.htm' }, { title: 'The Game of Life — F. Scovel Shinn, Sacred-Texts', url: 'https://www.sacred-texts.com/nth/shinn/gol/index.htm' }] },

  // ─── MODERN CATEGORY GROUPS ──────────────────────────────────
  modern_beliefs: { category: 'Группа', description: 'Верования современных духовных движений — духовная эволюция, единство религий, реинкарнация, тонкие миры, вознесённые владыки.' },
  modern_texts: { category: 'Группа', description: 'Священные тексты современных духовных движений — Тайная Доктрина.' },
  modern_practices: { category: 'Группа', description: 'Практики современных духовных движений — медитация, ченнелинг, аффирмации.' },

  // ─── CHRISTIAN ADDITIONS ──────────────────────────────────
  ecumenical_councils: { category: 'Священный текст', description: 'Вселенские соборы — собрания епископов всей Церкви для решения догматических и канонических вопросов. Семь Вселенских соборов: I Никейский (325), I Константинопольский (381), Эфесский (431), Халкидонский (451), II Константинопольский (553), III Константинопольский (680–681), II Никейский (787).', links: [] },
  nicean_creed: { category: 'Верование', description: 'Никейский символ веры (325 г.) — первый общецерковный догматический документ, утвердивший единосущие Сына Отцу. Основной текст: «Верую во единого Бога Отца... и во единого Господа Иисуса Христа, Сына Божия, рожденного, несотворенного, единосущного Отцу».', links: [] },
  chalcedon_creed: { category: 'Верование', description: 'Халкидонский орос (451 г.) — догмат о двух природах Иисуса Христа: истинный Бог и истинный Человек, «неслитно, неизменно, нераздельно, неразлучно».', links: [] },
  church_fathers: { category: 'Священный текст', description: 'Святые отцы — авторитетные богословы ранней Церкви (II–VIII вв.), заложившие основы христианской доктрины. Восточные: Афанасий Великий, Василий Великий, Григорий Богослов, Иоанн Златоуст. Западные: Августин, Иероним, Амвросий Медиоланский, Григорий Великий.', links: [] },
  patristics: { category: 'Священный текст', description: 'Патристика — совокупность сочинений святых отцов: трактаты, проповеди, толкования Писания, полемические сочинения против ересей. Ключевые авторы: Ориген, Афанасий, каппадокийцы, Августин («О граде Божьем», «Исповедь»).', links: [] },
  liturgy_byzantine: { category: 'Практика', description: 'Византийская литургия (православная) — евхаристическое богослужение. Два основных чина: литургия Иоанна Златоуста (обычная) и литургия Василия Великого (10 раз в год). Включает проскомидию, литургию оглашенных, литургию верных. Центр — пресуществление хлеба и вина в Тело и Кровь Христовы.' },
  liturgy_roman: { category: 'Практика', description: 'Римская литургия (католическая) — месса. Традиционный чин: тридентская месса (на латыни, до Vaticanum II) и Novus Ordo Missae (на народных языках). Структура: вступительные обряды, литургия слова, евхаристическая литургия, обряд причащения, заключительный обряд.' },
  monasticism: { category: 'Практика', description: 'Монашество — образ жизни, посвященный Богу через обеты бедности, целомудрия и послушания. Возникло в III–IV вв. (Антоний Великий, Пахомий Великий). Типы: отшельничество (анахореты) и общежитие (киновия). Монашеские уставы: Василия Великого (православие), Бенедикта Нурсийского (запад), Иеронима (частные).', links: [] },
  hesychasm: { category: 'Практика', description: 'Исихазм — мистико-аскетическая практика православия: «умное делание», непрерывная молитва Иисусова, безмолвие, созерцание нетварного света (Фаворский свет). Развит Григорием Синаитом и Григорием Паламой (XIV в.), утверждён на Константинопольском соборе 1351 г.' },
  icon_veneration: { category: 'Практика', description: 'Почитание священных изображений (икон) в православии и католицизме. Икона — не портрет, а окно в духовный мир, написанное по канону. Догмат иконопочитания утверждён VII Вселенским собором (787). Перед иконами возжигают свечи, кадят ладаном, совершают поклоны.' },
  jesus_prayer: { category: 'Практика', description: 'Иисусова молитва — «Господи Иисусе Христе, Сыне Божий, помилуй мя грешного». Непрерывное повторение этой молитвы — ядро исихазма. «Добротолюбие» (собрание святоотеческих текстов) — основной источник учения о молитве. Соединяется с ритмом дыхания и биением сердца.' },
  christian_fasting: { category: 'Практика', description: 'Христианский пост — телесное и духовное воздержание. Великий пост (40 дней), Рождественский, Петров, Успенский. Постные дни — среда и пятница. В православии: отказ от мяса, молока, яиц (и рыбы в строгие дни). Цель: смирение плоти, усиление молитвы, духовное очищение.' },
  christian_pilgrimage: { category: 'Практика', description: 'Паломничество — путешествие к святым местам: Иерусалим (Гроб Господень, Вифлеем), Рим (гробницы апостолов Петра и Павла), Сантьяго-де-Компостела (путь Св. Иакова), Афон, Киево-Печерская лавра. Символизирует путь души к Богу, покаяние и обновление веры.' },

  // ─── ISLAM ADDITIONS ─────────────────────────────────────
  fiqh_schools: { category: 'Группа', description: 'Школы исламского права (мазхабы): ханафитская, маликитская, шафиитская, ханбалитская. Все четыре признают друг друга ортодоксальными.' },
  hanafi: { category: 'Ветвь', description: 'Ханафитский мазхаб — основан имамом Абу Ханифой (ум. 767). Крупнейшая школа фикха, принята у тюркских народов, в Индии, Пакистане, Афганистане. Отличается широким использованием суждения (рай) и аналогии (кийас).' },
  maliki: { category: 'Ветвь', description: 'Маликитский мазхаб — основан имамом Маликом ибн Анасом (ум. 795). Распространён в Северной и Западной Африке. Основной источник — сборник хадисов «аль-Муватта». Использует обычаи Медины (амаль) как источник права.' },
  shafi_i: { category: 'Ветвь', description: 'Шафиитский мазхаб — основан имамом аш-Шафии (ум. 820). Распространён в Египте, Йемене, Индонезии, Малайзии. Систематизировал основы фикха (усуль аль-фикх): Коран, сунна, иджма (консенсус), кийас.' },
  hanbali: { category: 'Ветвь', description: 'Ханбалитский мазхаб — основан имамом Ахмадом ибн Ханбалем (ум. 855). Самый консервативный мазхаб, отвергает рай и кийас в пользу буквального толкования. Распространён в Саудовской Аравии, Катаре. Влияние на ваххабизм.' },
  sufi_tariqas: { category: 'Группа', description: 'Суфийские тарикаты (ордена) — мистические братства в исламе, каждое со своим учением, цепью преемственности (сильсиля) и практиками зикра.' },
  qadiriyya: { category: 'Ветвь', description: 'Кадирия — старейший суфийский тарикат, основан Абдул-Кадиром аль-Джилани (1077–1166, Багдад). Распространён по всему исламскому миру. Акцент на трезвенности, следовании шариату, щедрости.' },
  naqshbandiyya: { category: 'Ветвь', description: 'Накшбандия — суфийский тарикат, основан Бахауддином Накшбандом (1318–1389, Бухара). Отличается тихим зикром (в сердце), практикой сухбат (духовного общения). Широко распространён в Средней Азии, Турции, Индии.' },
  suhrawardiyya: { category: 'Ветвь', description: 'Сухравардия — суфийский тарикат, основан Шихабуддином ас-Сухраварди (1145–1234, Багдад). Распространён в Индии и Пакистане. Сочетает экзотерическое знание (шариат) с эзотерическим (хакика).' },
  kalam: { category: 'Верование', description: 'Калам — исламская схоластическая теология, рациональное обоснование веры. Основные школы: мутазилиты (свобода воли, сотворённость Корана) и ашариты (предопределение, несотворённость Корана). Ключевые фигуры: аль-Ашари, аль-Матуриди, аль-Газали.', links: [] },
  falsafa: { category: 'Верование', description: 'Фальсафа — исламская философия греческого образца. Ключевые фигуры: аль-Кинди, аль-Фараби, Ибн Сина (Авиценна), Ибн Рушд (Аверроэс). Развивала идеи аристотелизма и неоплатонизма в исламском контексте. Эманация, бессмертие души, интеллект.', links: [{ title: 'Фальсафа — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/arabic-islamic-philosophy/' }] },
  islam_practices: { category: 'Группа', description: 'Практики ислама — дополнительные к пяти столпам: зикр (поминовение Аллаха), дуа (личная мольба), таваф (обход Каабы), умра (малое паломничество), маулид (день рождения пророка).' },
  islam_zikr: { category: 'Практика', description: 'Зикр («поминовение») — суфийская практика многократного повторения имён Аллаха или сакральных формул (Ля иляха илля-Ллах). Цель — очищение сердца, растворение эго (фана), достижение близости к Богу. Зикр бывает тихий (хафи) — в сердце, и громкий (джали) — вслух, под ритм музыки.' },
  islam_dua: { category: 'Практика', description: 'Дуа — личная мольба-просьба к Аллаху, в отличие от салата (формальной молитвы). Произносится на арабском или родном языке. Дуа — акт смирения и упования (таваккуль) на Бога. «Ваш Господь сказал: „Взывайте ко Мне, и Я отвечу вам“» (Коран, 40:60).' },
  islam_tawaf: { category: 'Практика', description: 'Таваф — ритуальный семикратный обход Каабы против часовой стрелки во время хаджа и умры. Каждый круг начинается и заканчивается у Чёрного камня. Символизирует единство верующих вокруг Творца. Сопровождается молитвами и целованием Чёрного камня.' },

  // ─── JUDAISM ADDITIONS ──────────────────────────────────────
  hasidism: { category: 'Ветвь', description: 'Хасидизм — мистическое движение в иудаизме, основанное Бааль-Шем-Товом (1698–1760) в Восточной Европе. Акцент на радости, экстатической молитве, близости к Богу через цадиков (праведников). Крупнейшие династии: Любавичские, Бреславские, Гурские.', links: [] },
  jewish_philosophy: { category: 'Верование', description: 'Еврейская философия — рациональное осмысление иудаизма. Ключевые фигуры: Филон Александрийский (I в., аллегорическое толкование), Саадия Гаон (X в., мутазилитский калам), Маймонид (XII в., аристотелизм), Иегуда Галеви (XI в., «Кузари»).', links: [{ title: 'Еврейская философия — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/jewish-philosophy/' }] },
  maimonides: { category: 'Священный текст', description: 'Маймонид (Рамбам, 1135–1204) — великий еврейский философ и законовед. Труды: «Путеводитель растерянных» (философия), «Мишне Тора» (кодификация закона), «13 принципов веры». Синтезировал иудаизм с аристотелизмом.', links: [] },
  tefillah: { category: 'Практика', description: 'Тфила (молитва) — центральная практика иудаизма. Три ежедневные молитвы: Шахарит (утренняя), Минха (послеполуденная), Маарив (вечерняя). Главная молитва — Амида (18 благословений), читается стоя. Перед молитвой мужчины надевают талит (молитвенное покрывало) и тфилин (филактерии).' },
  tzedakah: { category: 'Практика', description: 'Цдака (праведность/милостыня) — обязанность помогать нуждающимся. В иудаизме — не добровольное пожертвование, а религиозная обязанность. Восемь уровней цдаки по Маймониду: от неохотного даяния до помощи стать самостоятельным.' },
  mikvah: { category: 'Практика', description: 'Миква — ритуальный бассейн для омовения (твила) в иудаизме. Используется для очищения после ритуальной нечистоты: женщины после менструации (нида), обращённые в иудаизм, посуда для кошерования. Миква должна содержать не менее 762 литров «живой» (дождевой/родниковой) воды.' },

  // ─── BUDDHISM ADDITIONS ─────────────────────────────────
  madhyamaka: { category: 'Верование', description: 'Мадхьямака («срединный путь») — философская школа буддизма махаяны, основанная Нагарджуной (II–III вв.). Учение о шуньяте (пустотности): все дхармы лишены независимой сущности. Критика этернализма и нигилизма. Трактат «Муламадхьямака-карика».', links: [{ title: 'Мадхьямака — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/madhyamaka/' }] },
  yogacara: { category: 'Верование', description: 'Йогачара («практика йоги») — философская школа буддизма махаяны, основанная Асангой и Васубандху (IV–V вв.). Доктрина «только сознание» (виджняпти-матра): внешний мир — проекция сознания. Восемь видов сознания, включая алая-виджняну (сознание-сокровищница).', links: [{ title: 'Йогачара — Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/buddhism-psychic/' }] },
  dzogchen: { category: 'Верование', description: 'Дзогчен («великое совершенство») — высшее учение тибетского буддизма (ньингма) и бон. Состояние изначальной пробуждённости (ригпа) вне усилий и концепций. Три принципа: взгляд (воззрение), медитация, действие. Тексты: «Дхармадхату-стотра» (Лонгченпа).', links: [] },
  pure_land: { category: 'Ветвь', description: 'Буддизм Чистой Земли — школа махаяны, основанная на вере в Будду Амитабху (Бесконечный Свет) и его чистую землю Сукхавати. Ключевая практика: няньфо (рецитация имени Амитабхи). Распространён в Китае, Японии, Корее. Основатели: Хуэйюань (Китай), Хонэн и Синран (Япония).' },
  buddhist_tantra: { category: 'Практика', description: 'Буддийский тантризм (ваджраяна) — система практик для быстрого достижения просветления. Включает: визуализацию божеств, мантры, работу с энергиями (каналы, чакры), ритуалы посвящения (абхишека). Четыре класса тантр: крия, чарья, йога, аннутара-йога.' },
  zazen: { category: 'Практика', description: 'Дзадзэн («сидячая медитация») — центральная практика дзэн-буддизма. Сидение на подушке (дзабутон) со скрещёнными ногами, прямая спина, внимание на дыхании. Два метода: сосредоточение на счётчике дыхания (сусокан) или просто сидение (сикантадза) без объекта. Цель — кэнсё (пробуждение природы Будды).' },
  metta_bhavana: { category: 'Практика', description: 'Метта-бхавана — медитация любящей доброты (метта) из буддийской традиции. Воспитывает безусловную любовь и сострадание ко всем существам. Пять стадий: любовь к себе, к близкому, к нейтральному, к врагу, ко всем существам. Входит в «четыре безмерных» (брахма-вихара): метта, каруна, мудита, упеккха.' },
  buddhist_prostrations: { category: 'Практика', description: 'Простирания (поклоны) — практика смирения и почтения в буддизме Тхеравады и Тибета. Полные простирания (лёжа на полу с вытянутыми руками) выполняются перед алтарём или священными местами. Символизируют преодоление гордости, очищение кармы, накопление заслуг.' },
  buddhist_offerings: { category: 'Практика', description: 'Подношения — практика накопления заслуг (пунья) в буддизме. Подносят: воду, цветы, благовония, свет (свечи/масляные лампы), благовонную воду, пищу, музыку. В тибетском буддизме — семь чаш с водой, мандала-подношение (модель вселенной). Символизирует щедрость и отказ от привязанностей.' },
  buddhist_mandala: { category: 'Практика', description: 'Мандала — символическая диаграмма вселенной в буддизме ваджраяны. Используется как объект медитации, ритуальный инструмент и основа для инициации. Песчаные мандалы создаются монахами из цветного песка и разрушаются после завершения — символ непостоянства (анитья).' },

  // ─── ADDITIONAL MODERN MOVEMENTS ──────────────────────────
  bahai: { category: 'Ветвь', description: 'Бахаи — монотеистическая религия, основанная Бахауллой (1817–1892) в Персии. Учение: единство Бога, единство религий, единство человечества. Постепенное откровение через посланников (Авраам, Моисей, Будда, Зороастр, Христос, Мухаммад, Баб, Бахаулла). Административный центр — Хайфа (Израиль).', links: [] },
  wicca: { category: 'Ветвь', description: 'Викка — неоязыческая религия, основанная Джеральдом Гарднером (1884–1964) в Англии. Почитание Богини и Рогатого Бога. Практика магии, праздники Колеса Года (8 саббатов). Викканская этика: «Делай что желаешь, только никому не вреди». Реконструкция дохристианских европейских верований.', links: [] },
  rastafari: { category: 'Ветвь', description: 'Растафари — монотеистическое движение, возникшее на Ямайке в 1930-х гг. Почитание Хайле Селассие I (эфиопского императора) как воплощения Джа (Бога) и Мессии. Признание Африки как духовной родины чёрных. Обряды: гимнление (музыкальные собрания), курение каннабиса как таинства, ношение дредов.', links: [] },
  candomble: { category: 'Ветвь', description: 'Кандомбле — афро-бразильская религия, основанная на верованиях народа йоруба. Почитание ориша (божеств): Огун (война), Шанго (гром), Йемайя (море), Ошун (любовь). Обряды включают барабанный бой, танцы и одержимость. Синтезирована с католичеством (каждый ориша отождествлён с католическим святым).', links: [] },
  umbanda: { category: 'Ветвь', description: 'Умбанда — бразильская синкретическая религия, возникшая в 1920-х гг. Смесь кандомбле, спиритизма Аллана Кардека, католичества и индейских верований. Цель: достижение духовного развития через практики медиумизма, исцеления и благотворительности (карма-йога).' },
  falun_gong: { category: 'Ветвь', description: 'Фалуньгун (Фалунь Дафа) — китайское духовное движение, основанное Ли Хунчжи в 1992 г. Сочетает буддийские и даосские практики: медитация, цигун, пять упражнений. Нравственные принципы: истина, сострадание, терпение. Запрещён в КНР с 1999 г.', links: [] },
  anastasia: { category: 'Ветвь', description: 'Движение «Звенящие кедры России» — русское нью-эйдж движение, основанное Владимиром Мегре (серия книг «Звенящие кедры России», с 1996 г.). Идеи: возврат к природе, родовые поместья, образ Анастасии как духовного учителя. Экологическое движение родовых поселений.', links: [] },
  church_of_satan: { category: 'Ветвь', date: '1966 г.', description: 'Церковь Сатаны — сатанинская организация, основанная Антоном Шандором ЛаВеем (1930–1997) в Вальпургиеву ночь (30 апреля) 1966 г. в Сан-Франциско. ЛаВей провозгласил 1966 год «годом I Anno Satanas». «Библия Сатаны» (1969) — основной текст. Учение: человек — животное, потакание инстинктам, индивидуализм, «око за око», ответственность перед достойными. Сатана — не божество, а символ свободы, гордости и просвещения. Девять сатанинских заповедей, одиннадцать сатанинских правил Земли. Практики: ритуалы (магия), Великие Шабаши (5 в год: Вальпургиева ночь, Хэллоуин, Крещение, день летнего солнцестояния, день осеннего равноденствия). Ключевые фигуры: Антон ЛаВей (Верховный жрец), Питер Гилмор (нынешний глава). Влияние на современный сатанизм и метал-культуру.', links: [] },

  // ─── OCCULT TRADITIONS ──────────────────────────────────
  occult_traditions: { category: 'Ветвь', description: 'Оккультные традиции — совокупность эзотерических и мистических учений Запада, основанных на герметизме, гностицизме и символической магии. Ключевые направления: герметизм (I–III вв.), гностицизм (I–IV вв.), розенкрейцерство (XVII в.), масонство (XVIII в.), спиритизм (XIX в.), церемониальная магия (XIX–XX вв.). Оказали значительное влияние на теософию, антропософию и современные духовные движения.', links: [] },
  hermeticism: { category: 'Ветвь', description: 'Герметизм — религиозно-философское учение эллинистического Египта (I–III вв. н.э.), основанное на корпусе текстов «Герметика» (Corpus Hermeticum). Учение: единство Бога (Всевышний Ум, Благо), человек — микрокосм, духовное возрождение через познание. Гермес Трисмегист — мифический основатель, отождествлявшийся с Тотом и Енохом. Табличка Изумрудная: «То, что внизу, подобно тому, что вверху». Герметизм лёг в основу западного эзотеризма, алхимии, астрологии и каббалы.', links: [{ title: 'Corpus Hermeticum — Sacred-Texts', url: 'https://www.sacred-texts.com/eso/herm.htm' }] },
  gnosticism: { category: 'Ветвь', description: 'Гностицизм — совокупность религиозных течений поздней античности (I–IV вв.), основанных на идее гносиса (духовного знания). Дуализм: духовный мир (плерома) — материальный мир (кенома). Демиург (Ялдаваоф) — низший бог, создавший материю. Искра божественного света заключена в человеке и стремится вернуться к полноте. Валентин, Василид, Маркион — ключевые учителя. Библиотека Наг-Хаммади (1945) — основной источник гностических текстов (Евангелие от Фомы, Евангелие Истины).', links: [{ title: 'Nag Hammadi Library — Sacred-Texts', url: 'https://www.sacred-texts.com/nag/' }] },
  rosicrucianism: { category: 'Ветвь', description: 'Розенкрейцерство — эзотерическое движение, возникшее в Германии в начале XVII в. Манифесты: «Fama Fraternitatis» (1614), «Confessio Fraternitatis» (1615), «Химическая свадьба Христиана Розенкрейца» (1616). Легенда: Христиан Розенкрейц (1378–1484) — основатель Братства Розенкрейца. Учение: синтез герметизма, каббалы, христианского мистицизма, алхимии. Цель — духовное преображение человечества. Влияние на масонство, теософию, антропософию. Современные организации: AMORC, Lectorium Rosicrucianum.', links: [] },
  freemasonry: { category: 'Ветвь', description: 'Масонство — эзотерическое братство, возникшее в Англии в начале XVIII в. (Великая ложа Лондона, 1717). Символы: циркуль, наугольник, мастерок, грубый камень. Степени: ученик, подмастерье, мастер. Учение: нравственное самосовершенствование, братство, терпимость, вера в Великого Архитектора Вселенной. Масонство делится на регулярное (английское, признающее Великую ложу Англии) и нерегулярное (французское, допускающее агностицизм). Сыграло значительную роль в эпохе Просвещения и становлении демократических институтов.', links: [] },
  spiritualism: { category: 'Ветвь', description: 'Спиритизм — религиозно-философское учение о возможности общения с духами умерших через медиумов. Возник в США в 1840-х гг. (сёстры Фокс). Систематизирован Алланом Кардеком (1804–1869) в «Книге духов» (1857) и «Книге медиумов» (1861). Учение: духи — души умерших, проходящие перевоплощения (реинкарнация); цель — духовное совершенствование. Практики: сеансы, столоверчение, автоматическое письмо, материализация. Популярен в XIX — начале XX в.; повлиял на теософию, нью-эйдж.', links: [] },
  ceremonial_magic: { category: 'Ветвь', description: 'Церемониальная магия — система ритуальной магии Западной эзотерической традиции, основанная на герметических, каббалистических и гримуарных источниках. Ключевые тексты: «Ключ Соломона» (XIV–XV вв.), «Гоетия» (часть «Малого Ключа Соломона», XVII в.). Ордена: Герметический орден Золотой Зари (1888, Англия, основатели: С.Л. Макгрегор Мазерс, У.У. Уэсткотт, В.Р. Вудман). Алистер Кроули (1875–1947) — реформатор церемониальной магии («Книга Закона», Телема). Практики: пентаграммы, гексаграммы, вызов духов, освящение талисманов, астральная проекция.', links: [{ title: 'Sacred Magic — Sacred-Texts', url: 'https://www.sacred-texts.com/grim/' }] },

  // ─── EGREGOR ────────────────────────────────────────────────
  egregor: { category: 'Ветвь', description: 'Эгрегор — энергоинформационная структура, коллективное ментальное поле, созданное группой людей или существующее независимо. Понятие восходит к эзотерике (Е.П. Блаватская, Даниил Андреев). Эгрегоры могут быть религиозными, культурными, идеологическими. Функция — поддержание целостности группы, передача информации, энергообмен.', rules: ['Эгрегор формируется общими мыслями, эмоциями и действиями группы', 'Поддерживается ритуалами, символами, вниманием участников', 'Может влиять на участников как осознанно, так и бессознательно', 'Религиозные эгрегоры — одни из самых древних и мощных', 'Эгрегоры не вечны — они живут, пока жива группа носителей'], links: [] },
  egregor_theory: { category: 'Ветвь', description: 'Теория эгрегоров разрабатывалась в теософии (Е.П. Блаватская «Тайная Доктрина»), «Розе Мира» Даниила Андреева, работах Карла Юнга (коллективное бессознательное, архетипы). В современной эзотерике — учение об энергоинформационном поле, создаваемом человеческим сознанием. Эгрегоры существуют в тонком мире и могут быть как светлыми, так и тёмными.' },
  egregor_types: { category: 'Ветвь', description: 'Типы эгрегоров: религиозные (христианский эгрегор, исламский), национальные (эгрегор народа), культурные (эгрегор искусства), семейные (родовые эгрегоры), профессиональные, идеологические. Различаются по силе, долговечности и качеству энергии. Религиозные эгрегоры — наиболее устойчивые и могущественные, так как подкреплены многовековой традицией, молитвами и обрядами.' },
  egregor_texts: { category: 'Группа', description: 'Литература об эгрегорах: Е.П. Блаватская «Тайная Доктрина», Даниил Андреев «Роза Мира», К.Г. Юнг «Архетипы и коллективное бессознательное», современные эзотерические работы.' },
  egregor_practices: { category: 'Группа', description: 'Практики работы с эгрегорами: осознанное подключение к эгрегору (через медитацию, визуализацию), очищение от деструктивных эгрегоров, создание новых эгрегоров (через общие намерения и ритуалы), энергообмен с эгрегором.' },
};

