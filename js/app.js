const container = document.getElementById('container');
const mapContainer = document.getElementById('map-container');
const panel = document.getElementById('info-panel');
const nodeTitle = document.getElementById('node-title');
const nodeCategory = document.getElementById('node-category');
const nodeDate = document.getElementById('node-date');
const nodeDescription = document.getElementById('node-description');
const rulesTitle = document.getElementById('rules-title');
const rulesList = document.getElementById('rules-list');
const linksTitle = document.getElementById('links-title');
const linksList = document.getElementById('links-list');

// ─── VIEW TOGGLE ──────────────────────────────────────────
let currentView = 'tree';
let parallelsShownOnce = false;
let hierarchyShownOnce = false;

function switchView(view) {
  currentView = view;
  document.getElementById('btn-tree-view').classList.toggle('active', view === 'tree');
  document.getElementById('btn-parallels-view').classList.toggle('active', view === 'parallels');
  document.getElementById('btn-hierarchy-view').classList.toggle('active', view === 'hierarchy');
  document.getElementById('btn-map-view').classList.toggle('active', view === 'map');
  container.style.display = view === 'tree' ? 'block' : 'none';
  document.getElementById('parallels-container').classList.toggle('active', view === 'parallels');
  document.getElementById('hierarchies-container').classList.toggle('active', view === 'hierarchy');
  mapContainer.classList.toggle('active', view === 'map');
  if (view === 'map' && typeof initMap === 'function') initMap();
  if (view === 'parallels' && parallelsNetwork) {
    if (!parallelsShownOnce) {
      parallelsShownOnce = true;
      parallelsNetwork.setOptions({ physics: { enabled: true } });
    }
    parallelsNetwork.fit({ animation: true });
  }
  if (view === 'hierarchy' && hierarchiesNetwork) {
    if (hSourcePopup) hSourcePopup.classList.remove('show');
    var activeTab = document.querySelector('.h-tab.active');
    var tree = activeTab ? activeTab.dataset.htree : 'dharmic';
    document.getElementById('hierarchies-dharmic-single').style.display = tree === 'dharmic' ? 'block' : 'none';
    document.getElementById('hierarchies-modern-single').style.display = tree === 'modern' ? 'block' : 'none';
    document.getElementById('hierarchies-abrahamic-single').style.display = tree === 'abrahamic' ? 'block' : 'none';
    document.getElementById('hierarchies-east-asian-single').style.display = tree === 'east_asian' ? 'block' : 'none';
    document.querySelectorAll('.h-subtabs').forEach(function(el) {
      el.style.display = el.dataset.htree === tree ? '' : 'none';
    });
    if (!hierarchyShownOnce) {
      hierarchyShownOnce = true;
      hierarchiesNetwork.setOptions({ physics: { enabled: true } });
    }
    if (tree === 'dharmic') {
      var activeSub = document.querySelector('.h-subtabs[data-htree="dharmic"] .h-subtab.active');
      if (activeSub) activateDharmicSubtab(activeSub.dataset.hsub);
    } else if (tree === 'modern') {
      var activeSub2 = document.querySelector('.h-subtabs[data-htree="modern"] .h-subtab.active');
      if (activeSub2) activateModernSubtab(activeSub2.dataset.hsub);
    } else if (tree === 'abrahamic') {
      var activeSub3 = document.querySelector('.h-subtabs[data-htree="abrahamic"] .h-subtab.active');
      if (activeSub3) activateAbrahamicSubtab(activeSub3.dataset.hsub);
    } else if (tree === 'east_asian') {
      var activeSub4 = document.querySelector('.h-subtabs[data-htree="east_asian"] .h-subtab.active');
      if (activeSub4) activateEastAsianSubtab(activeSub4.dataset.hsub);
    }
  }
  if (view === 'tree') network.fit({ animation: true });
}

document.getElementById('btn-tree-view').addEventListener('click', function() {
  if (currentView === 'tree') return;
  switchView('tree');
});

document.getElementById('btn-parallels-view').addEventListener('click', function() {
  if (currentView === 'parallels') return;
  switchView('parallels');
});

document.getElementById('btn-hierarchy-view').addEventListener('click', function() {
  if (currentView === 'hierarchy') return;
  switchView('hierarchy');
});

document.getElementById('btn-map-view').addEventListener('click', function() {
  if (currentView === 'map') return;
  switchView('map');
});

// ─── LEFT-TO-RIGHT TREE LAYOUT (wide spacing, no overlaps) ──
(function layoutTree() {
  // Build children map from SOLID edges only
  const children = {};
  edges.forEach(e => {
    if (e.dashes) return;
    if (!children[e.from]) children[e.from] = [];
    children[e.from].push(e.to);
  });

  const LEVEL_X = 240;
  const NODE_Y = 36;
  const BAND_Y = 1800;

  const subH = {};
  function calcH(id) {
    const subs = children[id] || [];
    if (subs.length === 0) { subH[id] = 1; return 1; }
    let t = 0;
    subs.forEach(c => { t += calcH(c) + 0.3; });
    t -= 0.3;
    subH[id] = t;
    return t;
  }

  const treePos = {};

  function layoutBranch(root, startX, centerY) {
    calcH(root);
    const visited = {};
    function assign(id, x, y) {
      if (visited[id]) return;
      visited[id] = true;
      treePos[id] = { x, y };
      const subs = children[id] || [];
      if (subs.length === 0) return;
      const tot = subH[id];
      let cy = y - (tot * NODE_Y) / 2;
      subs.forEach(c => {
        const ch = subH[c];
        assign(c, x + LEVEL_X, cy + (ch * NODE_Y) / 2);
        cy += ch * NODE_Y + 0.3 * NODE_Y;
      });
    }
    assign(root, startX, centerY);
  }

  // ─── MAIN ROOTS ──────────────────────────────────────────
  treePos.ancient_roots = { x: -500, y: -BAND_Y };
  treePos.abrahamic     = { x: 0, y: 0 };
  treePos.dharmic       = { x: 0, y: BAND_Y * 1.5 };
  treePos.east_asian    = { x: -100, y: BAND_Y * 4.5 + 100 };

  // ─── ANCIENT ROOTS CHILDREN ──────────────────────────────
  const AR = treePos.ancient_roots;

  // Leaf nodes — tight but safe grouping
  const leafIds = ['mesopotamian','egyptian','canaanite','zoroastrian','hellenistic'];
  leafIds.forEach((id, i) => {
    treePos[id] = { x: -300, y: AR.y - 200 + i * 100 };
  });

  // Pagan branches with sub-trees — 350px vertical spacing
  const paganIds = [
    'roman_pagan','norse','slavic_pagan','pre_islamic_arabia','vedic',
    'celtic_pagan','baltic_pagan','finno_ugric','tengrism',
    'african_trad','polynesian','native_american'
  ];
  paganIds.forEach((id, i) => {
    treePos[id] = { x: -300, y: AR.y + 300 + i * 350 };
  });

  treePos.abraham = { x: -120, y: AR.y };

  // ─── MAIN BANDS ──────────────────────────────────────────
  const bandCenters = [-2, -0.7, 0.6, 1.9, 3.2, 4.5].map(m => m * BAND_Y);
  layoutBranch('christianity', LEVEL_X, bandCenters[0]);
  layoutBranch('judaism',      LEVEL_X, bandCenters[1]);
  layoutBranch('islam',        LEVEL_X, bandCenters[2]);
  layoutBranch('hinduism',     LEVEL_X, bandCenters[3]);
  layoutBranch('jainism',      LEVEL_X, bandCenters[3] + BAND_Y * 0.5);
  layoutBranch('buddhism',     LEVEL_X, bandCenters[4]);
  layoutBranch('sikhism',      LEVEL_X, bandCenters[4] + BAND_Y * 0.5);
  layoutBranch('taoism',       LEVEL_X, bandCenters[5] - 400);
  layoutBranch('confucianism', LEVEL_X, bandCenters[5] + 100);
  layoutBranch('shinto',       LEVEL_X, bandCenters[5] + 600);

  // ─── EGREGOR ──────────────────────────────────────────────
  treePos.egregor = { x: LEVEL_X * 5, y: BAND_Y * 2.5 };
  layoutBranch('egregor', LEVEL_X * 5, BAND_Y * 2.5);

  // ─── OCCULT TRADITIONS (under modern_movements) ─────────
  treePos.occult_traditions = { x: LEVEL_X * 5 + LEVEL_X, y: BAND_Y * 2.5 + 800 };
  layoutBranch('occult_traditions', LEVEL_X * 5 + LEVEL_X, BAND_Y * 2.5 + 800);

  // ─── PAGAN SUB-TREES (each layoutBranch grows right) ────
  paganIds.forEach((id, i) => {
    layoutBranch(id, -300, AR.y + 300 + i * 350);
  });

  // Abraham → abrahamic (manual link to the Abrahamic root)
  // abrahamic is already positioned at (0, 0), its tree is via layoutBranch above

  // ─── APPLY POSITIONS ─────────────────────────────────────
  const updates = nodes.get().filter(n => treePos[n.id]).map(n => ({
    id: n.id, x: treePos[n.id].x, y: treePos[n.id].y
  }));
  if (updates.length) nodes.update(updates);

})();

const options = {
  nodes: {
    borderWidth: 1.5,
    borderWidthSelected: 2.5,
    font: {
      color: '#fff',
      size: 12,
      face: 'Segoe UI',
      strokeWidth: 0,
    },
    scaling: { min: 8, max: 36 },
  },
  edges: {
    smooth: false,
    width: 1.2,
    color: { color: 'rgba(255,255,255,0.06)', inherit: false },
    font: { size: 9, face: 'Segoe UI', strokeWidth: 0 },
  },
  physics: {
    enabled: false,
  },
  interaction: {
    hover: true,
    tooltipDelay: 200,
    navigationButtons: true,
    keyboard: true,
    zoomView: true,
    dragView: true,
    dragNodes: true,
  },
};

// Fix influence edge directions + add arrows
const directionSwap = {
  'norse_christianity':           { from: 'christianity', to: 'norse', label: 'Христиа-\nнизация' },
  'slavic_pagan_christianity':    { from: 'christianity', to: 'slavic_pagan', label: 'Крещение\nславян' },
  'celtic_pagan_christianity':    { from: 'christianity', to: 'celtic_pagan', label: 'Христиа-\nнизация' },
  'baltic_pagan_christianity':    { from: 'christianity', to: 'baltic_pagan', label: 'Крещение\nбалтов' },
  'finno_ugric_christianity':     { from: 'christianity', to: 'finno_ugric', label: 'Крещение\nфиннов' },
  'tengrism_islam':               { from: 'islam', to: 'tengrism', label: 'Ислам →\nтюрки' },
  'tengrism_buddhism':            { from: 'buddhism', to: 'tengrism', label: 'Буддизм →\nмонголы' },
  'african_trad_christianity':    { from: 'christianity', to: 'african_trad', label: 'Африка\nхристиан.' },
  'african_trad_islam':           { from: 'islam', to: 'african_trad', label: 'Африка\nислам' },
  'polynesian_christianity':      { from: 'christianity', to: 'polynesian', label: 'Океания\nхристиан.' },
  'native_american_christianity': { from: 'christianity', to: 'native_american', label: 'Америка\nхристиан.' },
};
edges.forEach(function(e) {
  if (e.dashes) {
    var key = e.from + '_' + e.to;
    if (directionSwap[key]) {
      e.from = directionSwap[key].from;
      e.to = directionSwap[key].to;
      if (directionSwap[key].label) e.label = directionSwap[key].label;
    }
    e.arrows = 'to';
    if (e.title) e.title += '\n🔍 Кликните для подробной информации';
  }
});

const network = new vis.Network(container, { nodes, edges }, options);

// ─── DRAG: hierarchical (children follow parent) + persistence ──

// Build parent→children tree from solid (non‑dashed) edges
const parentToChildren = {};
edges.forEach(e => {
  if (e.dashes) return;
  if (!parentToChildren[e.from]) parentToChildren[e.from] = [];
  parentToChildren[e.from].push(e.to);
});

function getAllDescendants(rootId) {
  const result = [];
  const q = [rootId];
  while (q.length) {
    const id = q.shift();
    const kids = parentToChildren[id];
    if (kids) {
      kids.forEach(k => { result.push(k); q.push(k); });
    }
  }
  return result;
}

let isCtrlDown = false;
document.addEventListener('keydown', e => { if (e.key === 'Control') isCtrlDown = true;  });
document.addEventListener('keyup',   e => { if (e.key === 'Control') isCtrlDown = false; });

let dragCtx = null;

network.on('dragStart', function (params) {
  if (!params.nodes || !params.nodes.length) return;
  const rootId = params.nodes[0];
  const ctrl = (params.event && (params.event.ctrlKey || (params.event.srcEvent && params.event.srcEvent.ctrlKey))) || isCtrlDown;
  const descIds = ctrl ? getAllDescendants(rootId) : [];
  const startPos = {};
  [rootId, ...descIds].forEach(id => {
    const p = network.getPosition(id);
    if (p) startPos[id] = { x: p.x, y: p.y };
  });
  dragCtx = { rootId, descIds, startPos };
});

network.on('dragging', function () {
  if (!dragCtx) return;
  const { rootId, descIds, startPos } = dragCtx;
  const cur = network.getPosition(rootId);
  const base = startPos[rootId];
  if (!cur || !base) return;
  const dx = cur.x - base.x;
  const dy = cur.y - base.y;
  if (dx === 0 && dy === 0) return;

  descIds.forEach(id => {
    const n = network.body.nodes[id];
    const s = startPos[id];
    if (n && s) { n.x = s.x + dx; n.y = s.y + dy; }
  });
});

network.on('dragEnd', function () {
  if (!dragCtx) return;
  const allPos = network.getPositions();
  localStorage.setItem('religion_positions', JSON.stringify(allPos));
  dragCtx = null;
});

// Restore saved positions on load (fallback: default_positions.json)
(async function applySaved() {
  try {
    let raw = localStorage.getItem('religion_positions');
    if (!raw) {
      try {
        const r = await fetch('js/default_positions.json');
        if (r.ok) raw = JSON.stringify(await r.json());
      } catch(e2) { /* no default file */ }
    }
    if (!raw) return;
    const saved = JSON.parse(raw);
    let count = 0;
    Object.keys(saved).forEach(id => {
      const node = network.body.nodes[id];
      if (node) {
        node.x = saved[id].x;
        node.y = saved[id].y;
        count++;
      }
    });
    if (count) network.requestRedraw();
  } catch(e) { /* ignore */ }
})();

// Console helpers for snapshot save/restore
function saveSnapshot() {
  const raw = localStorage.getItem('religion_positions');
  if (!raw) return alert('Нет сохранённых позиций. Сначала перетащи узлы.');
  const blob = new Blob([raw], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'religion_positions.json';
  a.click();
  URL.revokeObjectURL(url);
}
function loadSnapshot(json) {
  try { localStorage.setItem('religion_positions', JSON.stringify(JSON.parse(json))); location.reload(); }
  catch(e) { console.error('Неверный JSON'); }
}
async function restoreDefaultPositions() {
  try {
    const r = await fetch('js/default_positions.json');
    const data = await r.json();
    localStorage.setItem('religion_positions', JSON.stringify(data));
    location.reload();
  } catch(e) { console.error('Ошибка загрузки default_positions.json', e); }
}
function resetPositions() {
  localStorage.removeItem('religion_positions');
  location.reload();
}

document.querySelectorAll('#nav-tree [data-node]').forEach(el => {
  el.addEventListener('click', (e) => {
    const nodeId = el.dataset.node;
    if (el.dataset.scale === 'fit') {
      network.fit({ animation: true });
    } else {
      network.focus(nodeId, { scale: 1.8, animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
    }
  });
});

network.on('click', function (params) {
  // Prefer node over edge
  if (params.nodes.length > 0) {
    const nodeId = params.nodes[0];
    const data = nodeData[nodeId];
    if (!data) return;

    selectedNodeId = nodeId;
    btnDetail.style.display = religionDetails[nodeId] ? 'block' : 'none';

    nodeTitle.textContent = nodes.get(nodeId).label.replace(/\n/g, ' ');
    nodeCategory.textContent = data.category;
    nodeDate.textContent = data.date || '';
    nodeDate.style.display = data.date ? 'block' : 'none';
    nodeDescription.textContent = data.description;

    rulesList.innerHTML = '';
    if (data.rules && data.rules.length) {
      rulesTitle.style.display = 'block';
      data.rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        rulesList.appendChild(li);
      });
    } else {
      rulesTitle.style.display = 'none';
    }

    linksList.innerHTML = '';
    if (data.links && data.links.length) {
      linksTitle.style.display = 'block';
      data.links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.title;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        li.appendChild(a);
        linksList.appendChild(li);
      });
    } else {
      linksTitle.style.display = 'none';
    }
  } else if (params.edges.length > 0) {
    const edgeData = edges.get(params.edges[0]);
    if (!edgeData || !edgeData.details) return;

    const fLabel = nodes.get(edgeData.from).label.replace(/\n/g, ' ');
    const tLabel = nodes.get(edgeData.to).label.replace(/\n/g, ' ');

    nodeTitle.textContent = fLabel + ' ↔ ' + tLabel;
    nodeCategory.textContent = 'Связь / Влияние';
    nodeDate.textContent = '';
    nodeDate.style.display = 'none';
    nodeDescription.textContent = edgeData.details;

    rulesTitle.style.display = 'none';
    rulesList.innerHTML = '';
    linksTitle.style.display = 'none';
    linksList.innerHTML = '';
    btnDetail.style.display = 'none';
  } else {
    return;
  }

  panel.style.display = 'block';
});

network.on('doubleClick', function () {
  panel.style.display = 'none';
});

function closeInfo() {
  panel.style.display = 'none';
}

setTimeout(() => network.fit({ animation: true }), 0);

// ─── DETAILED VIEW ──────────────────────────────────────
let selectedNodeId = null;

const religionDetails = {
  mesopotamian: {
    title: 'Шумеро-аккадская религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Шумеро-аккадская религия — религиозные верования и культы древнего населения Месопотамии (шумеров, аккадцев, вавилонян, ассирийцев), существовавшие с IV тыс. до н.э. до первых веков н.э. Религия была политеистической: пантеон насчитывал сотни божеств, во главе которых стояли Ан (бог неба), Энлиль (бог воздуха и верховный божественный владыка) и Энки (бог мудрости и подземных вод).'
      },
      {
        heading: 'Пантеон',
        body: 'Верховная триада: Ан (небо), Энлиль (ветер/воздух), Энки (вода/мудрость). Богиня Инанна/Иштар — божество любви и войны. Мардук — верховный бог Вавилона, победитель хаоса (Тиамат). Ашшур — верховный бог Ассирии. Солнечный бог Уту/Шамаш — бог справедливости. Нанна/Син — бог луны.'
      },
      {
        heading: 'Космогония и мифы',
        body: '"Энума элиш" — вавилонский эпос о сотворении мира: из вод хаоса (Тиамат и Апсу) рождаются боги, Мардук убивает Тиамат и создаёт из её тела небо и землю. "Эпос о Гильгамеше" — древнейший литературный памятник (III–II тыс. до н.э.) о царе Урука, его друге Энкиду и поисках бессмертия. Эпос содержит миф о потопе, предвосхищающий библейский сюжет.'
      },
      {
        heading: 'Храмы и жречество',
        body: 'Центром культа был зиккурат — ступенчатая башня-храм. Главный бог города имел храм-дом (э-кур, э-анна). Жрецы (эн, энту) проводили ритуалы, приносили жертвы, толковали знамения. Храмы владели землями и играли ключевую роль в экономике.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Эпос о Гильгамеше» (пер. И.М. Дьяконова), «Энума элиш» (пер. В.К. Афанасьевой), Саггс Х. «Вавилон и Ассирия», «Мифы народов мира» (т.2).',
        links: [
          { title: 'Шумеро-аккадская мифология — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A8%D1%83%D0%BC%D0%B5%D1%80%D0%BE-%D0%B0%D0%BA%D0%BA%D0%B0%D0%B4%D1%81%D0%BA%D0%B0%D1%8F_%D0%BC%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F' },
          { title: 'Эпос о Гильгамеше — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%AD%D0%BF%D0%BE%D1%81_%D0%BE_%D0%93%D0%B8%D0%BB%D1%8C%D0%B3%D0%B0%D0%BC%D0%B5%D1%88%D0%B5' },
          { title: 'Энума элиш — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%AD%D0%BD%D1%83%D0%BC%D0%B0_%D1%8D%D0%BB%D0%B8%D1%88' },
          { title: 'Шумеры — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A8%D1%83%D0%BC%D0%B5%D1%80%D1%8B' },
        ]
      }
    ]
  },
  egyptian: {
    title: 'Древнеегипетская религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Религия Древнего Египта — политеистическая система верований, существовавшая с XXXII в. до н.э. до VI в. н.э. Характерные черты: развитый пантеон с богами-зооморфами, культ мёртвых, представления о загробном суде, сакральная роль фараона. Оказала влияние на иудаизм (Моисей вырос при египетском дворе, мотив суда Осириса параллелен Страшному суду) и античную философию.'
      },
      {
        heading: 'Пантеон',
        body: 'Эннеада Гелиополя: Ра (солнце, верховный бог), Шу (воздух), Тефнут (влага), Геб (земля), Нут (небо), Осирис (загробный мир), Исида (магия, жена-сестра Осириса), Сет (хаос, зло), Нефтида (защита). Другие важные боги: Амон (фиванский верховный бог, позже Амон-Ра), Анубис (бальзамирование, проводник душ), Гор (небо, царская власть), Тот (мудрость, письмо), Маат (истина, справедливость), Хатхор (любовь, музыка), Сехмет (война), Птах (творец, Мемфис).'
      },
      {
        heading: 'Космогония и загробный мир',
        body: 'Несколько космогоний: гелиопольская (Атум-Ра создаёт из себя Шу и Тефнут), гермопольская (Огдоада — восемь изначальных божеств), мемфисская (Птах творит мир словом). Загробный мир — Дуат: душа проходит через 12 врат, избегает демонов, предстаёт перед Осирисом на суде, где сердце взвешивают на весах против пера Маат. Тот записывает результаты. Пожирательница (Амтут) уничтожает недостойных. Тексты: «Книга мёртвых», «Тексты пирамид», «Тексты саркофагов».'
      },
      {
        heading: 'Культ и практики',
        body: 'Мумификация — сохранение тела для загробной жизни. Храмы — жилища богов, обслуживаемые жрецами. Фараон — живой бог Гор, посредник между мирами. Ежедневные ритуалы: омовение, облачение, кормление статуи бога. Праздники: Опет (путешествие Амона-Ра), Долина праздников (поминание мёртвых). Жертвоприношения (пища, пиво, быки). Погребальный культ: гробницы, мастабы, пирамиды, саркофаги.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Бадж Э.У. «Египетская религия», «Египетская Книга мёртвых» (пер. М.А. Коростовцева), Коростовцев М.А. «Религия Древнего Египта», «Мифы народов мира» (т.1).',
        links: [
          { title: 'Древнеегипетская религия — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%94%D1%80%D0%B5%D0%B2%D0%BD%D0%B5%D0%B5%D0%B3%D0%B8%D0%BF%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F_%D1%80%D0%B5%D0%BB%D0%B8%D0%B3%D0%B8%D1%8F' },
          { title: 'Египетская мифология — Sacred-Texts.com', url: 'https://www.sacred-texts.com/egy/' },
          { title: 'Книга мёртвых — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%94%D1%80%D0%B5%D0%B2%D0%BD%D0%B5%D0%B5%D0%B3%D0%B8%D0%BF%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F_%D0%9A%D0%BD%D0%B8%D0%B3%D0%B0_%D0%BC%D1%91%D1%80%D1%82%D0%B2%D1%8B%D1%85' },
        ]
      }
    ]
  },
  canaanite: {
    title: 'Ханаанская религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Ханаанская религия — политеистические верования семитских народов, населявших Восточное Средиземноморье (Ханаан, Финикия) в XX–I вв. до н.э. Основные источники: угаритские тексты (XIV–XIII вв. до н.э., Рас-Шамра) — глиняные таблички с мифами о Ваале, Эле, Анат. Древние израильтяне вышли из ханаанской среды; ранний израильский монотеизм развивался на фоне и в полемике с ханаанским культом.'
      },
      {
        heading: 'Пантеон',
        body: 'Верховный бог Эль/Илу — творец, отец богов, мудрый старец. Ваал (Баал-Хаддад) — бог грозы, дождя, плодородия, центральная фигура угаритских мифов. Анат — богиня войны и охоты, сестра Ваала. Ашера (Атират) — богиня-мать, супруга Эля. Астарта — богиня любви и войны. Мотив умирающего и воскресающего бога (Ваал умирает от руки Мута и воскресает с помощью Анат) — прообраз многих средиземноморских культов.'
      },
      {
        heading: 'Мифология',
        body: 'Цикл мифов о Ваале: Ваал побеждает Йамма (море-хаос) и получает царскую власть над богами. Затем Ваал умирает в битве с Мутом (смерть) и спускается в преисподнюю; богиня Анат оплакивает и воскрешает его. Эль и Ашера играют роль верховных родителей. Финикийские колонии распространили культ Ваала и Астарты по всему Средиземноморью (Карфаген, Кипр).'
      },
      {
        heading: 'Культ',
        body: 'Священные высоты (бамот) — места культа под открытым небом. Жертвоприношения животных и, возможно, детей (молк, пунический культ, упоминается в Библии как омерзительный обычай). Иеродулы (храмовая проституция) — ритуальные половые акты для стимуляции плодородия. Жрецы-пророки, экстатические практики. Библия (Ветхий Завет) постоянно полемизирует с ханаанскими культами, обличая их.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Шифман И.Ш. «Угаритский эпос» и «Культура древнего Угарита», Циркин Ю.Б. «Мифы Финикии и Угарита».',
        links: [
          { title: 'Ханаанская религия — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A5%D0%B0%D0%BD%D0%B0%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D1%80%D0%B5%D0%BB%D0%B8%D0%B3%D0%B8%D1%8F' },
          { title: 'Ханаанская литература — Sacred-Texts.com', url: 'https://www.sacred-texts.com/ane/canaan.htm' },
          { title: 'Угарит — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A3%D0%B3%D0%B0%D1%80%D0%B8%D1%82' },
        ]
      }
    ]
  },
  hellenistic: {
    title: 'Древнегреческая религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Древнегреческая религия — политеистическая система верований Древней Греции (VIII–I вв. до н.э.), основанная на почитании богов-олимпийцев. Оказала глубокое влияние на римскую религию (интерпретация римских богов как греческих) и христианское богословие (греческая философия — Платон, Аристотель, стоицизм — стала основой патристики). Через индо-греческие царства эллинизм контактировал с индийской философией.'
      },
      {
        heading: 'Пантеон',
        body: 'Двенадцать олимпийских богов: Зевс (верховный бог-громовержец), Гера (брак), Посейдон (море), Деметра (плодородие), Афина (мудрость, ремёсла), Аполлон (искусства, пророчества), Артемида (охота, природа), Арес (война), Афродита (любовь), Гефест (огонь, кузнечное дело), Гермес (вестник, торговля, путешествия), Дионис (виноделие, экстаз). Хтонические божества: Аид (подземное царство), Персефона, Гестия (домашний очаг). Множество нимф, сатиров, героев.'
      },
      {
        heading: 'Философская традиция',
        body: 'Греческая философия (VII–I вв. до н.э.) развивалась параллельно религии и часто конкурировала с ней. Досократики: Фалес, Анаксимандр, Пифагор. Классический период: Сократ (этический рационализм), Платон (мир идей, бессмертие души), Аристотель (перводвигатель, логика). Эпоха эллинизма: стоицизм (Сенека, Эпиктет), эпикуреизм, скептицизм (Пиррон). Неоплатонизм (Плотин, III в. н.э.) оказал прямое влияние на христианское богословие (Августин, псевдо-Дионисий Ареопагит).'
      },
      {
        heading: 'Культ и практики',
        body: 'Храмы — жилища богов, статуи, алтари. Полисные культы: каждый город имел божественного покровителя (Афины — Афина, Олимпия — Зевс). Олимпийские игры — общегреческий праздник в честь Зевса. Оракулы: Дельфийский (Аполлон), Додонский (Зевс). Мистерии: Элевсинские (Деметра и Персефона), Орфические (Дионис, загробная жизнь). Жертвоприношения (животные, возлияния, первые плоды). Погребение: ингумация или кремация, обол Харону.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Гомер «Илиада» и «Одиссея», Гесиод «Теогония», Аполлодор «Мифологическая библиотека», Платон «Диалоги», Аристотель «Метафизика».',
        links: [
          { title: 'Древнегреческая религия — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%94%D1%80%D0%B5%D0%B2%D0%BD%D0%B5%D0%B3%D1%80%D0%B5%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F_%D1%80%D0%B5%D0%BB%D0%B8%D0%B3%D0%B8%D1%8F' },
          { title: 'Греческая мифология — Theoi.com', url: 'https://www.theoi.com/' },
          { title: 'Дельфийский оракул — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D0%BB%D1%8C%D1%84%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D0%BE%D1%80%D0%B0%D0%BA%D1%83%D0%BB' },
        ]
      }
    ]
  },
  roman_pagan: {
    title: 'Древнеримская религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Религия Древнего Рима (VIII в. до н.э. – V в. н.э.) — политеистическая система, формировавшаяся из италийских, этрусских и греческих элементов. Включала культы Юпитера, Марса, Квирина, Януса, Весты и других божеств. Центральную роль играла государственная религия (religio licita) с коллегией жрецов и культом императора. Христианство возникло и распространилось в римском культурном, правовом и политическом контексте.'
      },
      {
        heading: 'Пантеон',
        body: 'Капитолийская триада: Юпитер (верховный бог, аналог Зевса), Юнона (брак, аналог Геры), Минерва (мудрость, аналог Афины). Другие: Марс (изначальный бог плодородия, позже войны), Квирин (бог римской общины), Янус (начало, входы, двери), Веста (домашний очаг), Диана (охота, аналог Артемиды), Венера (любовь, аналог Афродиты), Меркурий (вестник, аналог Гермеса), Нептун (море, аналог Посейдона), Церера (плодородие, аналог Деметры). С распространением империи — культы Исиды, Митры, Кибелы.'
      },
      {
        heading: 'Pax Deorum и религия государства',
        body: 'Pax deorum (мир с богами) — основа римской религии: правильное исполнение ритуалов (do ut des) обеспечивает благосклонность богов. Авгуры — гадание по полёту птиц, ауспиции. Гаруспики — гадание по внутренностям животных (этрусская традиция). Фламины — жрецы отдельных божеств. Понтифики — коллегия, надзиравшая за календарём и обрядами. Великий понтифик — верховный жрец (должность, которую занимали Юлий Цезарь и императоры).'
      },
      {
        heading: 'Культ и практики',
        body: 'Домашний культ: лары и пенаты (духи предков и дома), гении. Жертвоприношения животных (suovetaurilia — свинья, овца, бык для очищения). Праздники: Сатурналии (декабрь, прообраз карнавала), Луперкалии (февраль, очищение, плодородие), Либералии (март), Парилии (апрель, очищение скота). Римский календарь регулировал все религиозные обряды. Погребение: кремация или ингумация, колумбарии. Культ предков (manes).'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Овидий «Метаморфозы» и «Фасты», Вергилий «Энеида», Тит Ливий «История Рима от основания города», Плутарх «Сравнительные жизнеописания».',
        links: [
          { title: 'Древнеримская религия — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%94%D1%80%D0%B5%D0%B2%D0%BD%D0%B5%D1%80%D0%B8%D0%BC%D1%81%D0%BA%D0%B0%D1%8F_%D1%80%D0%B5%D0%BB%D0%B8%D0%B3%D0%B8%D1%8F' },
          { title: 'Римская мифология — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A0%D0%B8%D0%BC%D1%81%D0%BA%D0%B0%D1%8F_%D0%BC%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F' },
          { title: 'Римский календарь — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A0%D0%B8%D0%BC%D1%81%D0%BA%D0%B8%D0%B9_%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D1%8C' },
        ]
      }
    ]
  },
  slavic_pagan: {
    title: 'Древнеславянская религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Древнеславянская религия — политеистические верования славян до христианизации (VI–X вв.). Основные источники: древнерусские летописи («Повесть временных лет»), византийские авторы (Прокопий Кесарийский, Константин Багрянородный), арабские путешественники (Ибн Фадлан), археология, фольклор и этнография XIX–XX вв. Славянская религия близка балтской, германской и индо-иранской традициям (общие индоевропейские корни).'
      },
      {
        heading: 'Пантеон',
        body: 'Владимиров пантеон (Киев, 980 г.): Перун (громовержец, верховный бог), Хорс (солнце), Дажьбог (солнце, податель благ), Стрибог (ветер), Семаргл (священная птица/пёс, посредник), Мокошь (земля, женское начало). Другие: Велес/Волос (скот, богатство, подземный мир, магия), Сварог (бог-кузнец, небесный огонь), Симаргл, Род (предок, родовое начало), Рожаницы (богини судьбы), Лада (любовь, весна), Ярила (весеннее плодородие), Купала (летнее солнцестояние).'
      },
      {
        heading: 'Космология',
        body: 'Трёхчастная вселенная: небо (Правь — мир богов и закона), земля (Явь — мир людей), подземный мир (Навь — мир предков и демонов). Мировое древо (дуб) соединяет миры. Сотворение мира: два брата (Белобог и Чернобог) — дуалистический миф, распространённый у южных славян. Солнце — колесница, которую везут кони. Затмения — пожирание солнца волком. Культ камней, гор, рощ и источников.'
      },
      {
        heading: 'Культ и практики',
        body: 'Капища — святилища под открытым небом с идолами (Збручский идол — четырёхликий). Жрецы (волхвы, кудесники) проводили ритуалы, предсказания, лечение. Жертвоприношения (животные, пища, мед, пиво, иногда люди по свидетельствам арабов о русах). Сожжение или курганное погребение с инвентарём и тризной. Праздники: Масленица (проводы зимы), Купала (летнее солнцестояние, прыжки через огонь), Коляда (зимнее солнцестояние, колядки). Двоеверие после христианизации слило языческие и христианские обряды.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Рыбаков Б.А. «Язычество древних славян», Клейн Л.С. «Воскрешение Перуна», Иванов В.В., Топоров В.Н. «Славянские языковые моделирующие семиотические системы», «Повесть временных лет».',
        links: [
          { title: 'Славянская мифология — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%BC%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F' },
          { title: 'Перун — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D1%83%D0%BD' },
          { title: 'Збручский идол — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%97%D0%B1%D1%80%D1%83%D1%87%D1%81%D0%BA%D0%B8%D0%B9_%D0%B8%D0%B4%D0%BE%D0%BB' },
        ]
      }
    ]
  },
  pre_islamic_arabia: {
    title: 'Религия доисламской Аравии',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Религия доисламской Аравии (джахилийя — «эпоха невежества», V–VII вв.) — политеистические верования аравийских племён, почитание астральных божеств, культ предков, фетишизм. Центральное святилище — Кааба в Мекке, хранившая 360 идолов. Существовали иудейские (Йемен, Хайбар) и христианские (Наджран) общины, а также ханифы — монотеисты вне конфессий, искавшие «религию Авраама».'
      },
      {
        heading: 'Пантеон',
        body: 'Верховные богини: Аллат (богиня неба, луны, она же «Богиня»), аль-Узза (могущественная, планета Венера, богиня любви и войны), Манат (богиня судьбы и смерти) — «дочери Аллаха». Хубал (лунный бог-предок, статуя в Каабе). Каждая область/племя имела своего бога-покровителя: Душара (Набатея), аль-Кайн, Наср, Сува, Вадд, Йагук. Анимизм: почитание камней, деревьев, колодцев и звёзд.'
      },
      {
        heading: 'Духовная атмосфера джахилийи',
        body: 'Мекка — религиозный и торговый центр Аравии. Кааба (Чёрный камень, метеорит) — объект паломничества задолго до ислама. Коран упоминает, что ханифы (Авраам, Измаил) заложили Каабу. Существовала поэтическая традиция (касыды) — ключевой источник знаний о верованиях аравитян. Иудаизм и христианство были известны, но не доминировали. Авраамический монотеизм пророка Мухаммада выступил против политеизма курайшитов.'
      },
      {
        heading: 'Культ и практики',
        body: 'Паломничество к Каабе (хадж) — доисламский обычай. Обход Каабы (таваф) и целование Чёрного камня. Жертвоприношения животных (верблюды, овцы) у идолов. Культ предков: поминальные трапезы у могил. Амулеты, талисманы, вера в джиннов (духов), злых и добрых. Священные территории (хима) вокруг храмов. Племенной тотемизм. Войны и набеги как образ жизни (газу).'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Ибн Исхак «Сира пророка Мухаммада», «Книга идолов» (Китаб аль-Аснам) Хишама ибн аль-Кальби, доисламская арабская поэзия (касыды).',
        links: [
          { title: 'Доисламская Аравия — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%B8%D1%81%D0%BB%D0%B0%D0%BC%D1%81%D0%BA%D0%B0%D1%8F_%D0%90%D1%80%D0%B0%D0%B2%D0%B8%D1%8F' },
          { title: 'Pre-Islamic Arabia — Britannica', url: 'https://www.britannica.com/place/Arabia-pre-Islamic' },
          { title: 'Кааба — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D0%B0%D0%B1%D0%B0' },
        ]
      }
    ]
  },
  vedic: {
    title: 'Ведическая религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Ведическая религия — древнейшая форма религии на индийском субконтиненте (XV–V вв. до н.э.), предшественница индуизма. Основана на почитании ведийских божеств через жертвенные ритуалы (яджны). Имеет общие индо-иранские корни с зороастризмом (близость Агни/Атар, Сомы/Хаомы, Варуны/Ахура-Мазды). Священные тексты: четыре Веды (Ригведа, Самаведа, Яджурведа, Атхарваведа) и примыкающие Брахманы, Араньяки, Упанишады.'
      },
      {
        heading: 'Пантеон',
        body: 'Верховные боги дэвы: Индра (громовержец, царь богов, убийца Вритры), Агни (бог огня, жрец богов, посредник между людьми и богами), Варуна (вседержитель, хранитель космического закона — риты), Сома (божественный напиток и его божество), Митра (договор, солнце), Ашвины (божественные близнецы-целители), Сурья (солнце), Ваю (ветер), Ушас (заря). Упоминаются асуры (ахуры) — старшие боги, в ведической религии не резко противопоставлены дэвам (в отличие от зороастризма).'
      },
      {
        heading: 'Ритуал и космология',
        body: 'Жертвоприношение (яджна) — центральный элемент: разведение священного огня, возлияние сомы, чтение гимнов, принесение в жертву животных (конь — ашвамедха, корова). Сложная система ведийского ритуала разработана в Брахманах. Космогония: гимн Пуруша-сукта (Ригведа X.90) описывает сотворение мира из тела космического гиганта Пуруши, части которого стали социальными варнами. Гимн Насадия-сукта (Ригведа X.129) — философское размышление о происхождении бытия.'
      },
      {
        heading: 'От ведизма к индуизму',
        body: 'Поздний ведийский период (ок. 800–500 гг. до н.э.): развитие философии Упанишад, концепций кармы, сансары и мокши. Веданта, йога, буддизм и джайнизм выросли из ведической традиции (или в полемике с ней). Ритуализм Брахман уступил место аскетизму и мистицизму. Веды сохранили статус священного откровения (шрути) для всех ортодоксальных школ индуизма.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Ригведа» (пер. Т.Я. Елизаренковой), «Упанишады» (пер. А.Я. Сыркина), «Бхагавадгита», Елизаренкова Т.Я. «Слова и вещи в Ригведе».',
        links: [
          { title: 'Ведическая религия — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%B4%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F_%D1%80%D0%B5%D0%BB%D0%B8%D0%B3%D0%B8%D1%8F' },
          { title: 'Веды — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/' },
          { title: 'Индуистские божества — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D0%B4%D1%83%D0%B8%D1%81%D1%82%D1%81%D0%BA%D0%B8%D0%B5_%D0%B1%D0%BE%D0%B6%D0%B5%D1%81%D1%82%D0%B2%D0%B0' },
        ]
      }
    ]
  },
  norse: {
    title: 'Древнескандинавская религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Древнескандинавская (германская) религия — политеистическая система верований скандинавских и германских народов, существовавшая с II по XI в. Основные источники: «Старшая Эдда» (песни о богах и героях) и «Младшая Эдда» Снорри Стурлусона, а также саги и сочинения Адама Бременского и Саксона Грамматика. Центральное место занимали божества двух родов — асы и ваны.'
      },
      {
        heading: 'Пантеон',
        body: 'Асы: Один (верховный бог, мудрость, магия, война), Тор (громовержец, защитник Мидгарда), Тюр (бог воинских собраний), Бальдр (умирающее и воскресающее божество), Хеймдалль (страж богов). Ваны: Ньёрд (море), Фрейр (плодородие), Фрейя (любовь, магия). Локи — трикстер, породивший хтонических чудовищ (волка Фенрира, змея Ёрмунганда, Хель — хозяйку царства мёртвых).'
      },
      {
        heading: 'Космогония и эсхатология',
        body: 'Мир возник из взаимодействия огня и льда (Гинунгагап). Из тела первовеликана Имира асы создали вселенную. Мировое древо Иггдрасиль соединяет девять миров. Рагнарёк — гибель богов и мира в битве с хтоническими силами, после которой мир возродится. Эсхатологические мотивы пронизывают всю скандинавскую мифологию.'
      },
      {
        heading: 'Культ и практики',
        body: 'Центры культа: Уппсала (Швеция), храмы с идолами. Жертвоприношения (блот) — животные, иногда человеческие (упоминаются у Адама Бременского). Сейд — шаманская магия, связанная с Фрейей и Одином. Погребения: кремация с инвентарём и ладьёй для знати. Воинский культ: павшие воины попадают в Вальхаллу к Одину.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Старшая Эдда» (пер. А.И. Корсуна), «Младшая Эдда» Снорри Стурлусона (пер. О.А. Смирницкой), «Сага о Вёльсунгах», «История данов» Саксона Грамматика.',
        links: [
          { title: 'Скандинавская мифология — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%BC%D0%B0%D0%BD%D0%BE-%D1%81%D0%BA%D0%B0%D0%BD%D0%B4%D0%B8%D0%BD%D0%B0%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D0%BC%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F' },
          { title: 'Norse mythology — Sacred-Texts.com', url: 'https://www.sacred-texts.com/neu/poe/index.htm' },
          { title: 'Старшая Эдда — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D0%B0%D1%80%D1%88%D0%B0%D1%8F_%D0%AD%D0%B4%D0%B4%D0%B0' },
        ]
      }
    ]
  },
  zoroastrian: {
    title: 'Зороастризм',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Зороастризм — одна из древнейших пророческих религий, основанная пророком Заратустрой (Зороастром) в VII–VI вв. до н.э. в древнем Иране. Дуалистическое учение о борьбе добра (Ахура-Мазда) и зла (Ангра-Маинью). Оказала глубокое влияние на иудаизм эпохи Второго Храма (ангелы, эсхатология, воскресение мёртвых), а через него — на христианство и ислам.'
      },
      {
        heading: 'Пантеон и вероучение',
        body: 'Ахура-Мазда — единый бог-творец, источник света и блага. Шесть Амешаспентов (эманаций): Воху-Мана (благая мысль), Аша-Вахишта (истина), Хшатра-Ваирья (власть), Спента-Армаити (благочестие), Хаурватат (целостность), Амеретат (бессмертие). Язаты — ангелы: Митра, Анахита, Веретрагна. Фраваши — предсуществующие души. Противопоставление Аши (правда-гармония) и Друдж (ложь-разрушение).'
      },
      {
        heading: 'Эсхатология',
        body: 'Зороастризм принёс в мир развитую эсхатологию: посмертный суд, мост Чинват, воздаяние (рай — Гародмана, ад — Друджо-Дмана). В конце времён — три спасителя (Саошьянта), последняя битва, воскресение мёртвых и финальное очищение огнём (Фрашокерети). Эти идеи напрямую повлияли на иудейское и христианское учение о конце света.'
      },
      {
        heading: 'Культ и обряды',
        body: 'Священный огонь — центральный элемент культа (храмы огня). Ритуал Ясна с возлиянием хаомы. Очистительные обряды (барашнум). Ношение священной рубахи седре и пояса кошти. Пятикратная молитва. Погребение в «башнях молчания» (дахма), чтобы не осквернять землю. Календарные праздники: Новруз, Мехрган, Гахамбары.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Авеста» (пер. И.М. Стеблин-Каменского), Бойс М. «Зороастрийцы: верования и обычаи», Рак И.В. «Мифы древнего и раннесредневекового Ирана».',
        links: [
          { title: 'Зороастризм — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%97%D0%BE%D1%80%D0%BE%D0%B0%D1%81%D1%82%D1%80%D0%B8%D0%B7%D0%BC' },
          { title: 'Авеста — Sacred-Texts.com', url: 'https://www.sacred-texts.com/zor/' },
          { title: 'Заратустра — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D1%80%D0%B0%D1%82%D1%83%D1%81%D1%82%D1%80%D0%B0' },
        ]
      }
    ]
  },
  celtic_pagan: {
    title: 'Древнекельтская религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Кельтская религия — политеистические верования континентальных и островных кельтов (Галлия, Британия, Ирландия). Сформировалась в Центральной Европе, развилась в I тыс. до н.э. Христианизация кельтских земель (V–VII вв.) привела к синтезу кельтских и христианских традиций, особенно в Ирландии. Важная черта — вера в переселение душ.'
      },
      {
        heading: 'Пантеон',
        body: 'Галльские боги: Таранис (гром), Тевтат (племенной бог), Езус (воин, жертвы на дереве). Британские: Ноденс (ср. ирл. Нуаду), Бригантия (ср. ирл. Бригита). Ирландские: Дагда (всеотец), Луг (свет, ремёсла), Мананнан (море), Морриган (война), Бригита (поэзия, кузнечное дело). Племена богини Дану (Туата Де Дананн) — основная группа божеств.'
      },
      {
        heading: 'Мифология',
        body: 'Ирландская мифологическая традиция сохранилась в сагах: «Вторая битва при Мойтуре» (борьба Племён богини Дану с фоморами — демоническими существами), «Похищение Быка из Куальнге» (центральный эпос уладского цикла). Валлийская традиция — «Мабиногион». Кельтский потусторонний мир (Сид, Тир на Ног) — страна вечной молодости и блаженства.'
      },
      {
        heading: 'Жречество и практики',
        body: 'Друиды — жреческое сословие, хранители знаний, судьи, предсказатели. Четыре главных праздника: Самайн (1 ноября, начало года), Имболк (1 февраля), Бельтайн (1 мая), Лугнасад (1 августа). Жертвоприношения животных и, по римским свидетельствам, человеческие. Священные рощи и дубы. Обряд тройной смерти (повешение, утопление, сожжение).'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Мабиногион» (пер. В.В. Эрлихмана), «Похищение Быка из Куальнге» (пер. С.В. Шкунаева), «Ирландские саги» (пер. А.А. Смирнова), Шкунаев С.В. «Культура древних кельтов».',
        links: [
          { title: 'Кельтская мифология — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%B5%D0%BB%D1%8C%D1%82%D1%81%D0%BA%D0%B0%D1%8F_%D0%BC%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F' },
          { title: 'Друиды — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%94%D1%80%D1%83%D0%B8%D0%B4%D1%8B' },
          { title: 'Похищение Быка из Куальнге — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%85%D0%B8%D1%89%D0%B5%D0%BD%D0%B8%D0%B5_%D0%91%D1%8B%D0%BA%D0%B0_%D0%B8%D0%B7_%D0%9A%D1%83%D0%B0%D0%BB%D1%8C%D0%BD%D0%B3%D0%B5' },
        ]
      }
    ]
  },
  baltic_pagan: {
    title: 'Балтская религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Балтская религия — совокупность верований балтских народов (пруссов, литовцев, латышей), родственная славянской и германской традициям. Одна из последних языческих религий Европы: Великое княжество Литовское приняло христианство только в 1387 г. Источники: хроники (Пётр из Дуйсбурга), фольклор, археология.'
      },
      {
        heading: 'Пантеон',
        body: 'Диевас — верховный бог ясного неба. Перкунас — громовержец, главный бог-воитель. Жемина — богиня земли и плодородия. Лайма — богиня счастья и судьбы. Сауле — богиня солнца. Менес — бог луны. Велняс — хтоническое божество, аналог Велеса. Усиньш — покровитель лошадей. Богиня Медейна — покровительница леса и охоты.'
      },
      {
        heading: 'Космогония и мифы',
        body: 'Мир создан богом-демиургом из хаоса. Солнце (Сауле) и месяц (Менес) — небесная чета. Перкунас преследует Велняса (чёрта), скрывающегося в дубах — священных деревьях. Миф о солярном герое, освобождающем солнце из башни. Балты сохранили древние индоевропейские мифологемы в почти первозданном виде.'
      },
      {
        heading: 'Культ и практики',
        body: 'Священные рощи (алки) — основные места культа. Жрецы-вайделоты поддерживали вечный огонь (культ огня — центральный элемент). Священный змей (залтис) — домашний дух. Праздники: весеннее и летнее солнцестояние, Лиго (Янов день). Погребальный обряд: кремация, позже — ингумация под курганами.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Гимбутас М. «Балты», Греймас А. «О богах и людях: исследования по литовской мифологии», Иванов В.В., Топоров В.Н. «Балтийская мифология».',
        links: [
          { title: 'Балтийская мифология — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BB%D1%82%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F_%D0%BC%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F' },
          { title: 'Литовская мифология — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%82%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D0%BC%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F' },
          { title: 'Перкунас — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%BA%D1%83%D0%BD%D0%B0%D1%81' },
        ]
      }
    ]
  },
  finno_ugric: {
    title: 'Финно-угорская религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Традиционные верования финно-угорских народов (финны, карелы, эстонцы, коми, удмурты, марийцы, ханты, манси) восходят к эпохе общности III–II тыс. до н.э. Основаны на шаманизме, культе природы и предков. Ключевой эпос — «Калевала». Финно-угорская мифология близка самодийской и сибирским традициям.'
      },
      {
        heading: 'Верования и пантеон',
        body: 'Верховные боги: Юмала/Укко (финны), Кугу-Юмо (марийцы), Инмар (удмурты), Ен (коми), Нуми-Торум (обские угры). Трёхчастная вселенная: верхний мир (небо, Полярная звезда), средний мир (земля), нижний мир (преисподняя). Духи-хозяева природы: «матери» воды, леса, огня, ветра. Шаманы (нойда) — посредники между мирами.'
      },
      {
        heading: 'Космогония',
        body: 'Миф о нырянии за землёй: водоплавающая птица (гагара, селезень) достаёт землю со дна мирового океана по велению бога-демиурга. Из земли, утаённой во рту младшим братом-противником (Керемет, Омэль), создаются горы и вредоносное. Альтернативно — миф о яйце, снесённом птицей (карело-финский вариант).'
      },
      {
        heading: 'Практики',
        body: 'Камлание шамана с бубном, путешествие в мир духов. Жертвоприношения в священных рощах (животные, молоко, хлеб). Священные деревья и скалы с петроглифами. У марийцев до сих пор сохраняется традиционная религия с молитвами в священных рощах (ото). Праздники: летнее солнцестояние, медвежий праздник у обских угров.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Калевала» (пер. Л.П. Бельского), Петрухин В.Я. «Мифы финно-угров», Хелимский Е.А. «Компаративистика, уралистика».',
        links: [
          { title: 'Финно-угорская мифология — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A4%D0%B8%D0%BD%D0%BD%D0%BE-%D1%83%D0%B3%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F_%D0%BC%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F' },
          { title: 'Калевала — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D0%BB%D0%B5%D0%B2%D0%B0%D0%BB%D0%B0' },
          { title: 'Марийская традиционная религия — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D1%80%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F_%D1%82%D1%80%D0%B0%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%B0%D1%8F_%D1%80%D0%B5%D0%BB%D0%B8%D0%B3%D0%B8%D1%8F' },
        ]
      }
    ]
  },
  tengrism: {
    title: 'Тенгрианство',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Тенгрианство — традиционная религия тюркских и монгольских народов, центром которой является культ Тенгри — обожествлённого Неба. Основные источники: орхонские рунические надписи (VIII–XI вв.), «Сокровенное сказание монголов», эпосы тюркских народов. Распространение ислама и буддизма привело к угасанию тенгрианства как организованного культа.'
      },
      {
        heading: 'Пантеон',
        body: 'Кок-Тенгри — Голубое Небо, верховное божество. Умай — богиня плодородия, покровительница детей. Эрлик-хан — владыка подземного мира. Йер-Су — Земля и Вода. Культы Солнца (Кояш), Луны (Ай), Огня (Ут-ана). У монголов — 99 тенгри-божеств. Тотемизм: почитание волка, коня, орла. Шаманский пантеон: духи предков (онгоны), хозяева местности (ээзи).'
      },
      {
        heading: 'Космология',
        body: 'Трёхъярусный мир: верхний (небо, Тенгри), средний (земля, люди), нижний (подземный мир, Эрлик). Мировая ось — гора или дерево (Бай-Терек). Шанырак (крест в круге) — символ единства неба и земли. Циклическое время, культ предков. Концепция жизненной силы кут, посылаемой с неба. Фетишизм: почитание камней, деревьев и гор.'
      },
      {
        heading: 'Культ и практики',
        body: 'Моления на вершинах гор или у священных деревьев с возжиганием огня. Жертвоприношение коня (кобылы) — центральный обряд. Шаманы (камы, баксы) — камлание с бубном, лечение, предсказания. Праздники: весеннее равноденствие (Навруз, у тюрков), ысыах (якуты), сабантуй (татары). Почитание могил предков с ритуальной трапезой.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Сокровенное сказание монголов» (пер. С.А. Козина), Потапов Л.П. «Алтайский шаманизм», Алексеев Н.А. «Шаманизм тюркоязычных народов Сибири».',
        links: [
          { title: 'Тенгрианство — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D0%BD%D0%B3%D1%80%D0%B8%D0%B0%D0%BD%D1%81%D1%82%D0%B2%D0%BE' },
          { title: 'Тенгри — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D0%BD%D0%B3%D1%80%D0%B8' },
          { title: 'Тюркская мифология — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A2%D1%8E%D1%80%D0%BA%D1%81%D0%BA%D0%B0%D1%8F_%D0%BC%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F' },
        ]
      }
    ]
  },
  african_trad: {
    title: 'Африканские традиционные религии',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Традиционные религии народов Африки южнее Сахары (около 15% африканцев). Включают фетишизм, анимизм, тотемизм, культ предков и культ вождей. Каждая этническая группа имеет уникальные верования, но прослеживаются общие черты: вера в Бога-творца (демиурга), который удалился от дел мира, и активных духов-посредников.'
      },
      {
        heading: 'Пантеон и верования',
        body: 'Верховные боги: Олодумаре/Олофин (йоруба), Маву-Лиза (фон, вуду), Нзаме (фанг), Мукуру (гереро). Мириады младших божеств — ориша (йоруба): Огун (металл, война), Шанго (гром), Ошун (любовь), Обатала (творение). Культ предков — основа: души умерших влияют на жизнь потомков. Система гадания Ифа (256 знаков) — наследие ЮНЕСКО.'
      },
      {
        heading: 'Космогония',
        body: 'Разнообразные мифы: догоны верят в сотворение мира из яйца-семени (Амма), многослойный мир, нанизанный на мировую ось. У йоруба — Олудумаре создал мир через Ориша-нла. Частый мотив: первоначальное единство неба и земли, разорванное по вине людей. Миф о потопе и спасении немногих избранных.'
      },
      {
        heading: 'Практики',
        body: 'Ритуалы инициации (обрезание, изоляция в лесу, обучение тайнам племени). Тайные общества (Поро, Сандэ). Танцы в масках — воплощение духов предков. Жертвоприношения (животные, птицы) для умилостивления духов. Обряды плодородия, вызывания дождя. Ифа — сложная система гадания на орехах пальмы или цепи. Музыка барабанов — медиум для контакта с духами.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Фрэзер Дж. «Золотая ветвь», Элиаде М. «История веры и религиозных идей» (т.1-3), Мид М. «Взросление на Самоа».',
        links: [
          { title: 'Африканские традиционные религии — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%90%D1%84%D1%80%D0%B8%D0%BA%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B5_%D1%82%D1%80%D0%B0%D0%B4%D0%B8%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5_%D1%80%D0%B5%D0%BB%D0%B8%D0%B3%D0%B8%D0%B8' },
          { title: 'Религия йоруба — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%99%D0%BE%D1%80%D1%83%D0%B1%D0%B0_(%D1%80%D0%B5%D0%BB%D0%B8%D0%B3%D0%B8%D1%8F)' },
          { title: 'Ифа — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%98%D1%84%D0%B0' },
        ]
      }
    ]
  },
  polynesian: {
    title: 'Полинезийская религия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Полинезийская религия — совокупность верований народов Полинезии (гавайцев, маори, самоанцев, таитян, рапануйцев и др.), объединённых общим пантеоном и мифологией. Основные понятия: мана (сверхъестественная энергия) и тапу (священный запрет). Сохранилась в фольклоре и традициях, отчасти синтезировалась с христианством.'
      },
      {
        heading: 'Пантеон',
        body: 'Тангароа (Таароа) — верховный бог, творец мира, владыка океана. Тане — бог лесов и птиц, создатель женщины. Ронго — бог земледелия и мира. Ту (Ку) — бог войны. Тафириматеа — бог ветров и бурь. Оро — воинственный бог Таити. Пеле — богиня вулканов на Гавайях. Мауи — культурный герой, добывший огонь для людей.'
      },
      {
        heading: 'Космогония',
        body: 'Первозданные родители — Ранги (небо) и Папа (земля) — пребывали в объятиях. Их дети-боги (Тане, Ронго, Ту, Тангароа) разделили их, создав мир света. Тане украсил небо звёздами. Люди были вылеплены из глины или сотворены богами. Мифы о потопе и спасении на лодке.'
      },
      {
        heading: 'Культ и практики',
        body: 'Святилища — мараэ (открытые площадки с алтарём). Жрецы (тохунга, кахуна) — хранители знаний, генеалогий, ритуалов. Подношения — плоды, рыба, в особых случаях человеческие жертвы у некоторых групп (Таити, Гавайи). Тапу — система строгих запретов на вождей, священные места, пищу. Хака — ритуальный танец маори.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Те Ранги Хироа (П. Бак) «Мореплаватели солнечного восхода», Элиаде М. «История веры и религиозных идей».',
        links: [
          { title: 'Полинезийская мифология — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BB%D0%B8%D0%BD%D0%B5%D0%B7%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F_%D0%BC%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F' },
          { title: 'Мана — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D0%BD%D0%B0_(%D1%80%D0%B5%D0%BB%D0%B8%D0%B3%D0%B8%D1%8F)' },
          { title: 'Мифология маори — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F_%D0%BC%D0%B0%D0%BE%D1%80%D0%B8' },
        ]
      }
    ]
  },
  native_american: {
    title: 'Религии коренных народов Америки',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Мифология коренных народов Америки включает верования индейцев Северной, Центральной и Южной Америки, а также эскимосов (инуитов). Общие черты: вера в Великого Духа (Вакан-Танка, Маниту), связь с природой, почитание животных-тотемов, шаманизм, ритуалы перехода. Многообразие племенных традиций при общих архетипах.'
      },
      {
        heading: 'Пантеон и верования',
        body: 'Великий Дух (Вакан-Танка у лакота, Маниту у алгонкинов, Тива у пуэбло) — безличная верховная сила. Культурные герои и трикстеры: Койот (юго-запад), Ворон (северо-западное побережье), Паук-хитроумный (Иктоми у лакота). Петроглифы и изображения громовых птиц, змеев, бизонов. Танец Солнца — центральный ритуал равнинных племён.'
      },
      {
        heading: 'Космогония',
        body: 'Мифы о сотворении мира варьируются. Частый мотив: мир возник на спине черепахи (Миф о Черепахе). Ныряльщик за землёй (бобр, ондатра, утка) достаёт ил со дна первичного океана. У племён пуэбло — люди вышли из подземного мира через сипапу (пуп земли). Мифы о потопе и спасении. Циклическое время, четыре стороны света.'
      },
      {
        heading: 'Практики',
        body: 'Поиск видения (vision quest) — обряд перехода с постом, изоляцией и молитвой. Инипи (свейт-лодж) — ритуал очищения в парильне. Потлач — церемония обмена дарами у племён северо-западного побережья. Танец Солнца с самоистязанием у равнинных племён. Трубка мира (калюмет) — священный ритуал примирения. Тотемные столбы.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Мифы народов мира» (т.2 — Северная и Южная Америка), Леви-Стросс К. «Мифологики» (т.1-4), Элиаде М. «Шаманизм: архаические техники экстаза».',
        links: [
          { title: 'Мифология индейцев — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B8%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F_%D0%B8%D0%BD%D0%B4%D0%B5%D0%B9%D1%86%D0%B5%D0%B2' },
          { title: 'Индейцы Северной Америки — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D0%B4%D0%B5%D0%B9%D1%86%D1%8B_%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%D0%B9_%D0%90%D0%BC%D0%B5%D1%80%D0%B8%D0%BA%D0%B8' },
          { title: 'Танец Солнца — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A2%D0%B0%D0%BD%D0%B5%D1%86_%D0%A1%D0%BE%D0%BB%D0%BD%D1%86%D0%B0' },
        ]
      }
    ]
  },

  // ─── MAJOR WORLD RELIGIONS ─────────────────────────────────
  christianity: {
    title: 'Христианство',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Христианство — крупнейшая мировая религия (ок. 2,4 млрд последователей), основанная на вере в Иисуса Христа как Сына Божьего и Спасителя. Возникло в I в. н.э. в Палестине, выросло из иудейской мессианской традиции. Основные конфессии: католицизм, православие, протестантизм. Священное Писание — Библия (Ветхий и Новый Завет).'
      },
      {
        heading: 'Тринитарный догмат',
        body: 'Бог един в трёх Лицах (Ипостасях): Бог-Отец (нетварное начало), Бог-Сын (Иисус Христос, предвечно рождаемый от Отца) и Святой Дух (исходящий от Отца — в православии, и от Отца и Сына — Filioque — в католицизме). Троица — не три бога, но один Бог в трёх Лицах, различающихся по способу происхождения, но единых по сущности (единосущие). Догмат утверждён на Первом (325 г., Никея) и Втором (381 г., Константинополь) Вселенских соборах.'
      },
      {
        heading: 'Христология',
        body: 'Иисус Христос — истинный Бог и истинный Человек (Халкидонский орос, 451 г.). Две природы — божественная и человеческая — соединены неслитно, неизменно, нераздельно, неразлучно. Цель воплощения: спасение человечества от греха и смерти. Девственное рождение от Марии (Богородицы/Теотокос). Распятие при Понтии Пилате, смерть как искупительная жертва. Воскресение на третий день — основа христианской веры.'
      },
      {
        heading: 'Сотериология и эсхатология',
        body: 'Спасение — дар Божьей благодати, принимаемый через веру. В православии — синергия (сотрудничество благодати и свободной воли человека), теозис (обожение). В католицизме — оправдание через веру и дела, учение о заслугах и чистилище. В протестантизме — sola fide (только верой), предопределение (кальвинизм). Эсхатология: Второе пришествие Христа, воскресение мёртвых, Страшный суд, вечное блаженство в раю или вечное наказание в аду.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Библия» (книги Ветхого и Нового Заветов), Мейендорф И. «Введение в святоотеческое богословие», Флоровский Г. «Восточные отцы IV века», Шмеман А. «Исторический путь православия».',
        links: [
          { title: 'Христианство — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%A5%D1%80%D0%B8%D1%81%D1%82%D0%B8%D0%B0%D0%BD%D1%81%D1%82%D0%B2%D0%BE' },
          { title: 'Библия — Bible.by', url: 'https://bible.by/' },
          { title: 'Никейский Символ веры — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9D%D0%B8%D0%BA%D0%B5%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D0%A1%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB_%D0%B2%D0%B5%D1%80%D1%8B' },
        ]
      }
    ]
  },
  islam: {
    title: 'Ислам',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Ислам — монотеистическая религия (ок. 1,9 млрд последователей), основанная пророком Мухаммадом в VII в. в Аравии. Основные направления: суннизм (85–90%), шиизм (10–15%), суфизм (мистическое течение). Священная книга — Коран (откровение, переданное Аллахом через архангела Джабраила пророку Мухаммаду в 610–632 гг.).'
      },
      {
        heading: 'Таухид и вероучение',
        body: 'Таухид — абсолютное единобожие: Аллах един, не рождает и не рождён (Коран 112). Шесть столпов имана (веры): вера в Аллаха, в ангелов (Джибрил, Микаил, Исрафил, Азраил), в священные Писания (Таурат, Забур, Инджиль, Коран), в пророков (25 посланников: Адам, Нух, Ибрахим, Муса, Иса, Мухаммад — печать пророков), в Судный день (кияма), в предопределение (кадар).'
      },
      {
        heading: 'Пять столпов ислама',
        body: '1) Шахада — свидетельство: «Нет бога, кроме Аллаха, и Мухаммад — посланник Аллаха». 2) Салят — пятикратная молитва (фаджр, зухр, аср, магриб, иша). 3) Закят — обязательный налог (2,5% имущества) в пользу бедных. 4) Саум — пост в месяц Рамадан (от рассвета до заката). 5) Хадж — паломничество в Мекку (Кааба) раз в жизни при возможности.'
      },
      {
        heading: 'Эсхатология',
        body: 'Кияма (Судный день) наступит после воскрешения мёртвых. Все люди будут судимы по их деяниям (весы — мизан). Верующие войдут в Джанну (сад, рай) с реками из молока и мёда. Неверующие — в Джаханнам (ад, геенна). Предшествуют знамения: приход Даджаля (антихриста), нисхождение Исы (Иисуса), появление Яджуджа и Маджуджа (Гога и Магога).'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Коран» (пер. И.Ю. Крачковского), «Сахих аль-Бухари» (собрание хадисов), аль-Газали «Воскрешение наук о вере», Пиотровский М.Б. «Коранические сказания».',
        links: [
          { title: 'Ислам — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%98%D1%81%D0%BB%D0%B0%D0%BC' },
          { title: 'Коран — Quran.com', url: 'https://quran.com/ru' },
          { title: 'Сунна — Sunnah.com', url: 'https://sunnah.com/' },
        ]
      }
    ]
  },
  judaism: {
    title: 'Иудаизм',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Иудаизм — монотеистическая религия еврейского народа (ок. 15 млн последователей). Основан на Завете (Брит) между Богом и Авраамом (XX–XVIII вв. до н.э.) и даровании Торы Моисею на горе Синай (XIV–XIII вв. до н.э.). Основные течения: ортодоксальный, консервативный, реформистский иудаизм. Священные тексты: Танах (еврейская Библия) и Талмуд.'
      },
      {
        heading: 'Завет и богоизбранность',
        body: 'Брит — союз между Богом и еврейским народом: Авраам получил обещание земли и потомства (Быт. 12, 15, 17); на Синае народ получил Тору и заповеди (мицвот). Богоизбранность (бехира) — особая роль быть «светом для народов», нести знание единого Бога. Символы завета: обрезание (брит мила), соблюдение субботы (Шаббат).'
      },
      {
        heading: 'Мессианская идея',
        body: 'Машиах (помазанник) — будущий царь из дома Давида, который восстановит еврейское государство, храм в Иерусалиме и мир во всём мире. В отличие от христианства, иудаизм не признаёт Иисуса Мессией, так как он не исполнил политических и пророческих критериев (всеобщий мир, возвращение изгнанников). Эпоха Машиаха — земное, а не небесное царство.'
      },
      {
        heading: 'Каббалистическая космология',
        body: 'Каббала (эзотерическая традиция иудаизма) описывает процесс творения как эманацию божественного света через 10 сфирот (атрибутов/каналов) на Древе Жизни: Кетер (корона), Хохма (мудрость), Бина (понимание), Хесед (милость), Гвура (сила), Тиферет (красота), Нецах (вечность), Ход (слава), Йесод (основание), Малхут (царство). Четыре мира: Ацилут (эманаций), Брия (творения), Йецира (формирования), Асия (действия). Эйн Соф — бесконечный Бог, непостижимый Абсолют.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Танах» (еврейская Библия), «Талмуд» (Вавилонский и Иерусалимский), Маймонид «Путеводитель растерянных», «Зоар» (основной текст Каббалы), Шолем Г. «Основные течения в еврейской мистике».',
        links: [
          { title: 'Иудаизм — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%98%D1%83%D0%B4%D0%B0%D0%B8%D0%B7%D0%BC' },
          { title: 'Танах — Sefaria.org', url: 'https://www.sefaria.org/' },
          { title: 'Каббала — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D0%B1%D0%B1%D0%B0%D0%BB%D0%B0' },
        ]
      }
    ]
  },
  hinduism: {
    title: 'Индуизм',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Индуизм — совокупность религиозных традиций Индийского субконтинента (ок. 1,2 млрд последователей). Не имеет единого основателя, восходит к ведийской религии (II тыс. до н.э.). Основные направления: вайшнавизм (почитание Вишну), шиваизм (почитание Шивы), шактизм (почитание Богини), смартизм (почитание пяти божеств). Священные тексты: Веды, Упанишады, Пураны, «Бхагавадгита».'
      },
      {
        heading: 'Брахман-Атман и философия',
        body: 'Брахман — абсолютная реальность, безличная основа вселенной, единое бытие вне времени и пространства. Атман — индивидуальная душа, искра Брахмана в каждом существе. Тождество Атмана и Брахмана (тат твам аси — «ты есть То») — центральное открытие Упанишад. Школы веданты: адвайта (не-двойственность, Шанкара), вишиштадвайта (квалифицированная не-двойственность, Рамануджа), двайта (двойственность, Мадхва).'
      },
      {
        heading: 'Космология (кальпы и манвантары)',
        body: 'Циклическая вселенная: день Брахмы (кальпа) = 4,32 млрд земных лет, ночь Брахмы — столько же. 360 таких дней-ночей = год Брахмы. Жизнь Брахмы = 100 лет = 311 трлн лет. Каждая кальпа делится на 14 манвантар (периодов Ману). В каждой манвантаре — 71 махаюга (4,32 млн лет). Махаюга состоит из четырёх юг: Сатья-юга (1,728 млн лет, золотой век), Трета-юга (1,296 млн), Двапара-юга (864 тыс.), Кали-юга (432 тыс., текущая, началась ок. 3000 г. до н.э.). В конце кальпы — пралая (растворение вселенной).'
      },
      {
        heading: 'Карма, сансара, мокша',
        body: 'Карма — закон причин и следствий: каждое действие (тела, речи, ума) порождает последствия в этой или будущей жизни. Сансара — бесконечный цикл перерождений. Мокша — освобождение от сансары через познание Атмана, йогу и преданность (бхакти). Четыре пути: карма-йога (путь действия), бхакти-йога (путь любви и преданности), джняна-йога (путь знания), раджа-йога (царский путь). Три цели жизни: дхарма (долг), артха (достаток), кама (удовольствие) — и четвёртая: мокша.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Ригведа» (пер. Т.Я. Елизаренковой), «Упанишады» (пер. А.Я. Сыркина), «Бхагавадгита» (пер. В.С. Семенцова), «Вишну-пурана», «Махабхарата», Радхакришнан С. «Индийская философия» (т.1-2).',
        links: [
          { title: 'Индуизм — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D0%B4%D1%83%D0%B8%D0%B7%D0%BC' },
          { title: 'Веды — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/' },
          { title: 'Бхагавадгита — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/gita/' },
        ]
      }
    ]
  },
  buddhism: {
    title: 'Буддизм',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Буддизм — религиозно-философское учение (ок. 500 млн последователей), основанное Сиддхартхой Гаутамой (Буддой Шакьямуни) в VI–V вв. до н.э. в Индии. Основные направления: тхеравада («учение старцев», южный буддизм), махаяна («великая колесница», восточный), ваджраяна (тибетский буддизм). Четыре Благородные Истины — основа учения.'
      },
      {
        heading: 'Четыре Благородные Истины',
        body: '1) Истина о страдании (дуккха): жизнь несовершенна — рождение, старение, болезнь, смерть, встреча с неприятным, разлука с приятным, неудовлетворённость суть дуккха. 2) Истина о причине страдания: жажда (танха) — чувственных удовольствий, существования, несуществования. 3) Истина о прекращении страдания: полное угасание жажды — нирвана. 4) Истина о пути: Благородный Восьмеричный Путь.'
      },
      {
        heading: 'Благородный Восьмеричный Путь',
        body: 'Три группы: мудрость (панья) — правильное воззрение, правильное намерение; нравственность (шила) — правильная речь, правильное действие, правильный образ жизни; сосредоточение (самадхи) — правильное усилие, правильная осознанность, правильное сосредоточение. В махаяне — путь Бодхисаттвы (существа, стремящегося к просветлению ради всех живых существ) с шестью парамитами (совершенствами): дана (щедрость), шила, кшанти (терпение), вирья (усердие), дхьяна (медитация), праджня (мудрость).'
      },
      {
        heading: 'Буддийская космология и философия',
        body: 'Циклические миры (локи): мир желаний (кама-лока), мир форм (рупа-лока), мир без форм (арупа-лока). Шесть сфер перерождений (сансары): ады, голодные духи (преты), животные, люди, асуры (демоны), дэвы (боги). Зависимое происхождение (пратитья-самутпада): 12 звеньев, объясняющих цепь перерождений. Шуньята — пустотность всех явлений, отсутствие независимой сущности (Нагарджуна, мадхьямака). Йогачара: «только сознание» (виджняпти-матра).'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Дхаммапада» (пер. В.Н. Топорова), «Лотосовая сутра» (пер. А.Н. Игнатовича), «Тибетская книга мёртвых» («Бардо Тодоль»), Конзе Э. «Буддийская медитация», Торчинов Е.А. «Введение в буддологию».',
        links: [
          { title: 'Буддизм — Википедия', url: 'https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%B4%D0%B4%D0%B8%D0%B7%D0%BC' },
          { title: 'Дхаммапада — Sacred-Texts.com', url: 'https://www.sacred-texts.com/bud/dhp/index.htm' },
          { title: 'Buddhist Texts — Access to Insight', url: 'https://www.accesstoinsight.org/' },
        ]
      }
    ]
  },

  // ─── MODERN SPIRITUAL MOVEMENTS ────────────────────────────
  theosophy: {
    title: 'Теософия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Теософия — религиозно-философское движение, основанное Еленой Блаватской (1831–1891) в Нью-Йорке в 1875 г. Цель: синтез науки, религии и философии на основе единой эзотерической традиции. Ключевые труды: «Тайная Доктрина» (1888), «Разоблачённая Изида» (1877). Второй президент Теософского общества — Анни Безант. Близкие деятели: Ч. Ледбитер, Х.С. Олкотт.'
      },
      {
        heading: 'Космология',
        body: 'Единый Абсолют (Парабрахман) → три Логоса (непроявленный, потенциальный, проявленный) → семь планов бытия: Ади (высший), Анупадака, Нирванический, Буддхический, Ментальный, Астральный, Физический. Монада — искра Божественного, спускается через планы, облекаясь в соответствующие «тела». Человек — микрокосм, отражающий макрокосм. Эволюция через семь коренных рас (Лемурия, Атлантида, современная арийская раса).'
      },
      {
        heading: 'Махатмы и Великое Белое Братство',
        body: 'Махатмы (Великие Души) — вознесённые Учителя, достигшие высших ступеней эволюции и руководящие духовным развитием человечества. В теософии — Махатма Мория, Кут Хуми, Джуал Кул. Великое Белое Братство — сообщество этих Учителей. Письма Махатм (1881–1884) — важный источник теософского учения. Концепция восходит к западному эзотеризму (розенкрейцеры, Граф Сен-Жермен).'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Блаватская Е.П. «Тайная Доктрина» (тт.1-3), «Разоблачённая Изида», «Письма Махатм», Безант А. «Древняя мудрость», Ледбитер Ч. «Монада».',
        links: [
          { title: 'Тайная Доктрина — Sacred-Texts.com', url: 'https://www.sacred-texts.com/the/sd/index.htm' },
          { title: 'Теософское общество — Theosociety.org', url: 'https://www.theosociety.org/' },
          { title: 'Теософия — AnandGholap.net', url: 'https://www.anandgholap.net/' },
        ]
      }
    ]
  },
  agni_yoga: {
    title: 'Агни-йога (Живая Этика)',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Агни-йога (Живая Этика) — духовное учение, переданное через Елену Рерих (1879–1955) и Николая Рериха (1874–1947) в 1920–1930-х гг. Серия из 14 книг, полученных Е. Рерих через «запись голоса» (ченнелинг) от Махатмы Мории. Синтезирует теософские концепции, индийскую философию и практические наставления для повседневной жизни.'
      },
      {
        heading: 'Космология',
        body: 'Абсолют (Огненный Творец) → Закон Космического Магнита → Пространственный Огонь (первичная субстанция) → психическая энергия → человек (микрокосм) → эволюция огня → слияние с Высшим. Миры: Тонкий (астрально-ментальный), Астральный (мир чувств), Физический. Ключевые концепты: иерархия Света, Карма, Реинкарнация, сотрудничество с Махатмами. Беспредельность космоса — основа эволюционного развития.'
      },
      {
        heading: 'Практическое учение',
        body: 'Агни-йога даёт конкретные рекомендации: культура мысли и слова, дисциплина чувств, очищение организма, значение труда и творчества. Психическая энергия — главная сила человека, её накопление через служение общему благу. Культура и искусство — важнейшие инструменты эволюции (Н.К. Рерих — Пакт Рериха о защите культурного наследия). «Сердце» — центральный духовный орган. Женское начало и сотрудничество полов.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: «Листы Сада Мории» (Зов, Озарение), «Агни-йога» (Знаки Агни-йоги), «Мир Огненный», «Беспредельность», «Братство», Шапошникова Л.В. «Космическое мировоззрение — новое мышление XXI века».',
        links: [
          { title: 'Библиотека Агни-йоги — Agniyoga.org', url: 'https://agniyoga.org/' },
          { title: 'Международный центр Рерихов — ICR.su', url: 'https://icr.su/' },
        ]
      }
    ]
  },
  integral_yoga: {
    title: 'Интегральная йога (Шри Ауробиндо)',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Интегральная йога (Пурна-йога) — учение Шри Ауробиндо (1872–1950) и Матери (Мирра Альфасса, 1878–1973). Цель: не личное освобождение, а полная трансформация человеческой природы и «Божественная жизнь на земле». Ашрам Шри Ауробиндо в Пондичерри (Индия) — центр учения. Синтезирует карма-йогу, бхакти-йогу, джняна-йогу и раджа-йогу.'
      },
      {
        heading: 'Эволюция сознания',
        body: 'Брахман (непроявленное бытие-сознание-блаженство) → Сат-Чит-Ананда → Супраментал (Сверхразум — истинное сознание) → Овермайнд (над-ум) → Ментал → Витал (жизненная сила) → Физика. Инволюция: Сверхразум нисходит в материю, скрываясь в ней. Эволюция: дух восходит через материю → растение → животное → человек → супраментальное существо → Гносис (божественное знание). Человек — переходное существо.'
      },
      {
        heading: 'Супраментальная трансформация',
        body: 'Три стадии: 1) психическая трансформация (открытие души, внутреннего проводника), 2) духовная трансформация (нисхождение высшего сознания — буддхи), 3) супраментальная трансформация (полное преображение тела, клеточное бессмертие). Мать — первый супраментальный инструмент, показавшая путь физического преображения. «Божественная жизнь» — будущая стадия человечества, где сознание управляет материей напрямую.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Шри Ауробиндо «Божественная жизнь», «Синтез йоги», «Эссе о Гите», «Час Господа», Мать «Вопросы и ответы», Satprem «Шри Ауробиндо, или Путешествие сознания».',
        links: [
          { title: 'Sri Aurobindo Ashram — Library', url: 'https://library.sriaurobindoashram.org/' },
          { title: 'Божественная жизнь — Sacred-Texts.com', url: 'https://www.sacred-texts.com/hin/sl/' },
        ]
      }
    ]
  },
  anthroposophy: {
    title: 'Антропософия',
    sections: [
      {
        heading: 'Общие сведения',
        body: 'Антропософия — духовно-философское учение, основанное Рудольфом Штейнером (1861–1925) после выхода из Теософского общества в 1913 г. Отличается от теософии акцентом на западную эзотерическую традицию и христианский мистицизм. Штейнер стремился соединить естествознание с духовной наукой (Geisteswissenschaft). Центр — Гётеанум в Дорнахе (Швейцария).'
      },
      {
        heading: 'Антропософская космология',
        body: 'Эволюция Земли через семь планетарных стадий: Сатурн → Солнце → Луна → Земля → Юпитер → Венера → Вулкан. На каждой стадии развиваются определённые уровни сознания (глубокий сон → сон со сновидениями → бодрствование → ясновидение). Человек состоит из девяти членов: физическое тело, эфирное, астральное, Я (эго), Манас (дух-самость), Буддхи (дух-жизнь), Атман (дух-человек). Перевоплощение и карма — центральные понятия.'
      },
      {
        heading: 'Практическое применение',
        body: 'Вальдорфская педагогика — образовательная система, развивающая волю, чувства и мышление ребёнка (свыше 1000 школ). Биодинамическое земледелие (сельское хозяйство с учётом космических ритмов). Антропософская медицина (расширенная фармакопея, эвритмия). Эвритмия — искусство движения, «видимая речь». Социальная трёхчленность: духовная, правовая и экономическая сферы общества.'
      },
      {
        heading: 'Источники и литература',
        body: 'Ключевая литература: Штейнер Р. «Теософия», «Очерк тайноведения», «Философия свободы», «Истина и наука», «Курс народной педагогики».',
        links: [
          { title: 'Гётеанум — Goetheanum.org', url: 'https://www.goetheanum.org/' },
          { title: 'Архив Рудольфа Штейнера — Rsarchive.org', url: 'https://www.rsarchive.org/' },
        ]
      }
    ]
  }
};

const btnDetail = document.getElementById('btn-detail');
const detailPanel = document.getElementById('detail-panel');
const detailTitle = document.getElementById('detail-title');
const detailContent = document.getElementById('detail-content');

btnDetail.addEventListener('click', function() {
  const d = religionDetails[selectedNodeId];
  if (!d) return;
  showDetail(d);
});

function showDetail(data) {
  detailTitle.textContent = data.title;
  detailContent.innerHTML = '';
  data.sections.forEach(s => {
    const div = document.createElement('div');
    div.className = 'detail-section';
    let html = '';
    if (s.heading) html += '<h4>' + s.heading + '</h4>';
    if (s.body) html += '<p>' + s.body + '</p>';
    if (s.links && s.links.length) {
      html += '<ul>';
      s.links.forEach(l => {
        html += '<li><a href="' + l.url + '" target="_blank" rel="noopener noreferrer">' + l.title + '</a></li>';
      });
      html += '</ul>';
    }
    div.innerHTML = html;
    detailContent.appendChild(div);
  });
  detailPanel.classList.add('open');
}

function closeDetail() {
  detailPanel.classList.remove('open');
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeDetail();
});

// ─── PARALLELS VIEW ────────────────────────────────────────
const parallelsContainer = document.getElementById('parallels-container');

const PARALLEL_GROUPS = [
  {
    key: 'thunder', label: 'Громовержцы', color: '#d4a050',
    nodes: [
      { id: 'p_zeus', label: 'Зевс', desc: 'Верховный бог греческого пантеона, бог грома и молнии. Сын Кроноса и Реи, муж Геры. Правит с Олимпа.' },
      { id: 'p_jupiter', label: 'Юпитер', desc: 'Верховный бог римского пантеона, бог неба, света и грома. Аналог Зевса. Глава Капитолийской триады.' },
      { id: 'p_indra', label: 'Индра', desc: 'Царь ведийских богов (дэвов), бог грозы, дождя и войны. Убийца демона Вритры. Центральное божество Ригведы.' },
      { id: 'p_thor', label: 'Тор', desc: 'Скандинавский бог грома и молнии, защитник Мидгарда. Сын Одина, владелец молота Мьёльнира.' },
      { id: 'p_perun', label: 'Перун', desc: 'Верховный бог славянского пантеона, бог грома и войны. Глава дружинного культа Киевской Руси.' },
      { id: 'p_taranis', label: 'Таранис', desc: 'Кельтский бог грома. Изображался с колесом (символ молнии). Один из главных богов Галлии.' },
      { id: 'p_perkunas', label: 'Перкунас', desc: 'Балтский бог-громовержец, преследующий Велняса. Бог грома, молнии, дождя и плодородия.' },
      { id: 'p_baal', label: 'Ваал (Баал-Хаддад)', desc: 'Ханаанский бог грозы, дождя и плодородия. Центральный персонаж угаритских мифов, убивающий Йамма и воскресающий.' },
      { id: 'p_shango', label: 'Шанго', desc: 'Бог грома и молнии в религии йоруба. Четвёртый царь Ойо, обожествлённый после смерти. Символ — секира с двумя лезвиями.' },
    ]
  },
  {
    key: 'dying', label: 'Умирающие и воскресающие', color: '#6ab86a',
    nodes: [
      { id: 'p_osiris', label: 'Осирис', desc: 'Египетский бог загробного мира, умирающий и воскресающий. Убит братом Сетом, воскрешён Исидой. Символ возрождения.' },
      { id: 'p_dionysus', label: 'Дионис', desc: 'Греческий бог виноделия, экстаза и театра. Умирающее и воскресающее божество. Сын Зевса и Семелы.' },
      { id: 'p_baldr', label: 'Бальдр', desc: 'Скандинавский бог света и красоты. Убит стрелой из омелы по козням Локи. Его смерть — предвестие Рагнарёка.' },
      { id: 'p_tammuz', label: 'Таммуз (Думузи)', desc: 'Шумеро-аккадский бог пастушества, умирающий и воскресающий. Возлюбленный Инанны/Иштар. Ежегодно спускается в подземный мир.' },
      { id: 'p_adonis', label: 'Адонис', desc: 'Финикийско-греческий бог умирающей и воскресающей природы. Возлюбленный Афродиты. Убит вепрем, проводит часть года в подземном мире.' },
    ]
  },
  {
    key: 'mother', label: 'Богини-матери', color: '#d480a0',
    nodes: [
      { id: 'p_isis', label: 'Исида', desc: 'Египетская богиня магии, материнства и плодородия. Жена Осириса, мать Гора. Культ распространился по всей Римской империи.' },
      { id: 'p_cybele', label: 'Кибела', desc: 'Фригийская богиня-мать, Великая Мать богов. Культ с экстатическими ритуалами проник в Рим в 204 г. до н.э.' },
      { id: 'p_frigga', label: 'Фригг', desc: 'Скандинавская богиня брака, материнства и домашнего очага. Жена Одина, мать Бальдра.' },
      { id: 'p_mokosh', label: 'Мокошь', desc: 'Славянская богиня земли, плодородия и женского труда. Единственное женское божество в пантеоне Владимира.' },
      { id: 'p_pachamama', label: 'Пачамама', desc: 'Богиня земли и плодородия у инков и андских народов. Мать-земля, подательница урожая. До сих пор почитается.' },
      { id: 'p_demeter', label: 'Деметра', desc: 'Греческая богиня земледелия и плодородия. Мать Персефоны. Элевсинские мистерии — тайный культ в её честь.' },
      { id: 'p_zhemyna', label: 'Жемина', desc: 'Балтская богиня земли и плодородия. Дарует урожай и плодовитость скоту. Супруга Перкунаса.' },
    ]
  },
  {
    key: 'trickster', label: 'Трикстеры', color: '#d09040',
    nodes: [
      { id: 'p_hermes', label: 'Гермес', desc: 'Греческий бог торговли, воровства и путешествий. Вестник богов, проводник душ в Аид. Изобретатель лиры.' },
      { id: 'p_mercury', label: 'Меркурий', desc: 'Римский бог торговли, прибыли и красноречия. Аналог Гермеса. Покровитель купцов и путешественников.' },
      { id: 'p_loki', label: 'Локи', desc: 'Скандинавский бог-трикстер. Породил хтонических чудовищ. Виновник смерти Бальдра. Будет сражаться на стороне хаоса в Рагнарёк.' },
      { id: 'p_eshu', label: 'Эшу (Легба)', desc: 'Трикстер в религии йоруба, посредник между людьми и богами (ориша). Бог перекрёстков, хаоса и случайности.' },
      { id: 'p_coyote', label: 'Койот', desc: 'Трикстер в мифологии индейцев Северной Америки. То создаёт мир и учит людей, то сеет хаос и устраивает розыгрыши.' },
    ]
  },
  {
    key: 'sun', label: 'Солярные божества', color: '#d4c040',
    nodes: [
      { id: 'p_ra', label: 'Ра', desc: 'Верховный египетский бог солнца. Дневное путешествие по небу в ладье, ночное — через подземный мир Дуат.' },
      { id: 'p_helios', label: 'Гелиос', desc: 'Греческий бог солнца, сын титана Гипериона. Ежедневно проезжает по небу на огненной колеснице.' },
      { id: 'p_surya', label: 'Сурья', desc: 'Ведийский бог солнца. Едет по небу на колеснице, запряжённой семью конями. Всевидящее око богов.' },
      { id: 'p_dazhbog', label: 'Дажьбог', desc: 'Славянский бог солнца, податель благ. Сын Сварога. Упоминается в «Повести временных лет» как сын Сварога.' },
      { id: 'p_saule', label: 'Сауле', desc: 'Балтская богиня солнца. Дарует жизнь и тепло. Утром выезжает на колеснице, вечером купается в море.' },
      { id: 'p_tonatiuh', label: 'Тонатиу', desc: 'Ацтекский бог солнца. Требовал человеческих жертв для ежедневного восхода. Изображался как орёл.' },
      { id: 'p_inti', label: 'Инти', desc: 'Бог солнца у инков, предок-покровитель династии Сапа Инка. Один из важнейших богов империи.' },
    ]
  },
  {
    key: 'shamanism', label: 'Шаманские практики', color: '#a080d0',
    nodes: [
      { id: 'p_tengri_shaman', label: 'Тенгр. кам', desc: 'Шаман (кам, баксы) у тюркских и монгольских народов. Камлание с бубном, путешествие в мир духов, лечение.' },
      { id: 'p_finno_shaman', label: 'Финно-уг. нойда', desc: 'Шаман (нойда) у финно-угорских народов. Использование бубна, транса, духов-помощников. Отражён в «Калевале».' },
      { id: 'p_native_shaman', label: 'Индейский шаман', desc: 'Шаман (знахарь, medicine man) у индейцев Северной Америки. Поиск видения, лечение травами, связь с духами.' },
      { id: 'p_seid', label: 'Сейд', desc: 'Скандинавская шаманская магия, связанная с Фрейей и Одином. Включала пророчества, изменение погоды и судьбы.' },
    ]
  },
  {
    key: 'water', label: 'Водные божества', color: '#5090c0',
    nodes: [
      { id: 'p_poseidon', label: 'Посейдон', desc: 'Греческий бог морей, землетрясений и коней. Брат Зевса и Аида. Владыка подводного царства.' },
      { id: 'p_neptune', label: 'Нептун', desc: 'Римский бог морей. Аналог Посейдона. Праздник Нептуналии отмечался 23 июля.' },
      { id: 'p_tangaroa', label: 'Тангароа', desc: 'Верховный бог полинезийского пантеона, владыка океана и рыб. Творец мира и людей.' },
      { id: 'p_manannan', label: 'Мананнан', desc: 'Кельтский бог моря, владыка потустороннего мира. Сын Лера. Ездит по морю на колеснице.' },
      { id: 'p_varuna', label: 'Варуна', desc: 'Ведийский бог космических вод и закона (риты). Вседержитель, хранитель миропорядка. В индуизме — бог океана.' },
    ]
  },
  {
    key: 'underworld', label: 'Подземный мир', color: '#888888',
    nodes: [
      { id: 'p_hades', label: 'Аид', desc: 'Греческий бог подземного царства мёртвых. Брат Зевса и Посейдона. Похититель Персефоны.' },
      { id: 'p_anubis', label: 'Анубис', desc: 'Египетский бог бальзамирования и проводник душ в загробном мире. С головой шакала.' },
      { id: 'p_erlik', label: 'Эрлик', desc: 'Бог подземного мира в тенгрианстве. Владыка царства мёртвых, противник Тенгри и Умай.' },
      { id: 'p_velnias', label: 'Велняс', desc: 'Балтское хтоническое божество, аналог славянского Велеса. Бог подземного мира, богатства и магии.' },
      { id: 'p_hel', label: 'Хель', desc: 'Скандинавская богиня царства мёртвых. Дочь Локи и Ангрбоды. Правит Хельхеймом.' },
    ]
  },
];

// Build node + edge datasets for parallels
const pNodes = [];
const pEdges = [];
const pDescriptions = {};

PARALLEL_GROUPS.forEach(g => {
  const ids = g.nodes.map(n => n.id);
  // All-to-all edges within group (for force clustering)
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      pEdges.push({
        from: ids[i], to: ids[j],
        color: { color: g.color, opacity: 0.12 },
        width: 1,
      });
    }
  }
  // Nodes
  g.nodes.forEach(n => {
    pNodes.push({
      id: n.id,
      label: n.label,
      color: { background: g.color, border: '#ffffff', opacity: 0.9 },
      shape: 'dot',
      size: 22,
      group: g.key,
      font: { size: 12, color: '#eee', strokeWidth: 0 },
      title: n.label + ' (' + g.label + ')\n' + n.desc,
    });
    pDescriptions[n.id] = { label: n.label, category: g.label, description: n.desc };
  });
});

// ─── CROSS-GROUP EDGES ─────────────────────────────────
const crossEdges = [
  // ── Shamanism ↔ Solar ──────────────────────────────────
  {
    from: 'p_tengri_shaman', to: 'p_ra',
    title: 'Солнце как небесное око',
    details: 'В тенгрианстве солнце (Кояш/Кюн) — небесное око и проявление Тенгри. Культ солнца был центральным: ему посвящались жертвоприношения коней, камлания на восходе. Ра — верховный египетский бог солнца, создатель мира, ежедневно путешествующий по небу. Оба символизируют солнце как источник жизни и небесной власти.'
  },
  {
    from: 'p_tengri_shaman', to: 'p_surya',
    title: 'Небесный свет',
    details: 'В тенгрианстве и ведийской религии солнце — ключевой объект почитания. Сурья — ведийский бог солнца, всевидящее око богов, едущий на колеснице, запряжённой семью конями. Тенгрианский кам обращался к солнцу как к проявлению высшей силы. В обеих традициях восход солнца — сакральный момент для молитв и ритуалов.'
  },
  {
    from: 'p_native_shaman', to: 'p_tonatiuh',
    title: 'Танец Солнца',
    details: 'У индейцев Северной Америки танец Солнца — центральный ритуал, длящийся несколько дней, с постом, плясками и самоистязанием. Шаман выступает посредником между людьми и солнцем. Тонатиу — ацтекский бог солнца, требовавший человеческих жертв для ежедневного восхода. В обеих традициях солнце получает силу через жертву.'
  },
  {
    from: 'p_native_shaman', to: 'p_inti',
    title: 'Имперский солярный культ',
    details: 'Инти — бог солнца у инков, верховное божество империи, предок династии Сапа Инка. Шаманы-жрецы (вильяк) проводили ритуалы Интва Раими (праздник солнца) с жертвоприношениями. Индейский шаман также почитал солнце как верховный источник жизни. Для равнинных племён (лакота, шайенны) солнце — одна из главных сил вселенной.'
  },
  {
    from: 'p_finno_shaman', to: 'p_saule',
    title: 'Солнце на колеснице',
    details: 'Сауле — балтская богиня солнца, выезжающая утром на золотой колеснице и купающаяся вечером в море. У финно-угорских народов солнечные божества (Паиве у финнов, Чи-Пась у коми) играли центральную роль. Нойды обращались к солнцу в камланиях, особенно в дни солнцестояний. Финно-угорские и балтские культуры соседствовали и обменивались мифологемами.'
  },
  {
    from: 'p_finno_shaman', to: 'p_dazhbog',
    title: 'Соседские солярные культы',
    details: 'Дажьбог — славянский бог солнца, податель благ («Дажьбог» = «дающий бог»). У славян и финно-угров были тесные культурные контакты (северо-запад Руси, Поволжье). Общие солярные символы (коловрат, солнечная розетка) встречаются в археологии обеих традиций. Летнее солнцестояние — ключевой праздник и у славян (Купала), и у финно-угров.'
  },
  // ── Thunder ↔ Water ────────────────────────────────────
  {
    from: 'p_zeus', to: 'p_poseidon',
    title: 'Братья-мироправители',
    details: 'В греческой мифологии Зевс (небо, гром) и Посейдон (море, землетрясения) — братья, сыновья Кроноса и Реи. После свержения отца они бросили жребий: Зевсу досталось небо, Посейдону — море, Аиду — подземный мир. Зевс повелевает грозой и молнией, Посейдон — штормами и волнами. Оба — олимпийцы, но Посейдон часто конфликтует с Зевсом.'
  },
  {
    from: 'p_jupiter', to: 'p_neptune',
    title: 'Римская параллель',
    details: 'Римская адаптация греческой пары. Юпитер (Jupiter) — верховный бог неба, грома и молнии, глава Капитолийской триады. Нептун (Neptunus) — бог морей, первоначально бог пресных вод. Как и в греческой традиции, они — братья, сыновья Сатурна. Праздник Нептуналии (23 июля) включал строительство шалашей из веток — имитацию морских волн.'
  },
  {
    from: 'p_indra', to: 'p_varuna',
    title: 'Ведийская двойственность',
    details: 'В Ригведе Индра (громовержец, царь дэвов, убийца Вритры) и Варуна (вседержитель, хранитель космической риты, владыка вод) часто призываются вместе как верховная пара. Варуна старше, мудрее, надзирает за истиной — он асура (ахура). Индра — активный воин-дэва. Их союз олицетворяет две грани власти: динамическую (Индра-гром) и статическую (Варуна-закон).'
  },
  // ── Dying ↔ Underworld ─────────────────────────────────
  {
    from: 'p_osiris', to: 'p_anubis',
    title: 'Суд Осириса',
    details: 'Осирис — владыка загробного мира (Дуата), верховный судья умерших. Анубис — бог бальзамирования и проводник душ, сын Осириса и Нефтиды. В египетской Книге мёртвых Анубис приводит умершего на суд Осириса: сердце взвешивают на весах против пера Маат. Анубис подготавливает тело к загробной жизни, Осирис выносит приговор.'
  },
  {
    from: 'p_dionysus', to: 'p_hades',
    title: 'Катабасис Диониса',
    details: 'Дионис — единственный греческий олимпиец (кроме Гермеса), спускавшийся в Аид и вернувшийся. Он отправился в царство мёртвых, чтобы вывести свою мать Семелу из Аида и сделать её богиней (Тиона). В орфической традиции Дионис-Загрей — сын Зевса и Персефоны (царицы подземного мира), что напрямую связывает его с Аидом.'
  },
  {
    from: 'p_baldr', to: 'p_hel',
    title: 'Пленник Хель',
    details: 'Бальдр, любимый сын Одина и Фригг, был убит стрелой из омелы, направленной Локи. После смерти он попал в Хельхейм — царство мёртвых, которым правит Хель, дочь Локи. Фригг умоляла Хель отпустить Бальдра; та согласилась, если весь мир будет оплакивать его. Но великанша Тёкк (переодетый Локи) отказалась, и Бальдр остался у Хель до Рагнарёка.'
  },
  {
    from: 'p_tammuz', to: 'p_erlik',
    title: 'Ежегодный уход в преисподнюю',
    details: 'Таммуз (Думузи) — шумерский бог пастушества, возлюбленный Инанны. Когда Инанна спустилась в подземный мир (Кур), демоны схватили её; она спаслась, отдав им Таммуза. С тех пор Таммуз проводит половину года в подземном мире, а половину — на земле. Эрлик — тенгрианский владыка подземного мира, куда попадают души умерших. Оба — хтонические владыки, управляющие циклом смерти.'
  },
  // ── Mother ↔ Underworld ─────────────────────────────────
  {
    from: 'p_demeter', to: 'p_hades',
    title: 'Миф о Персефоне',
    details: 'Деметра, богиня плодородия и урожая, потеряла дочь Персефону, похищенную Аидом. В горе она лишила землю плодородия — наступила зима. Зевс повелел Аиду отпускать Персефону к матери на 2/3 года (весна-лето), а 1/3 (зима) она проводит с Аидом. Этот миф — центральная связь между материнством/плодородием и смертью.'
  },
  {
    from: 'p_isis', to: 'p_osiris',
    title: 'Любовь сильнее смерти',
    details: 'Исида — богиня магии и материнства, жена Осириса. Когда Сет убил и расчленил Осириса, Исида собрала его тело (кроме фаллоса, съеденного рыбой), создала из золота искусственный и зачала от мёртвого мужа Гора. Затем она помогла Осирису стать владыкой загробного мира. Исида — единственная богиня, перешедшая границу жизни и смерти ради любви.'
  },
  // ── Trickster ↔ Shamanism ───────────────────────────────
  {
    from: 'p_loki', to: 'p_seid',
    title: 'Обвинение в эрги',
    details: 'В «Перебранке Локи» (Lokasenna) Один обвиняет Локи: «Ты восемь зим / был под землёй, / доил коров / и детей рожал, / мужчиной назвался / — а это сейд». Сейд считался «немужским» (ergi) занятием — колдовством, связанным с женской магией. Локи, как трикстер, пересекает границы полов (рожает Слейпнира) и миров — это суть сейда.'
  },
  {
    from: 'p_eshu', to: 'p_tengri_shaman',
    title: 'Посредники между мирами',
    details: 'Эшу (Легба) в религии йоруба — трикстер и посредник между людьми и ориша. Ни одна молитва не достигает богов без его санкции. Он — «открыватель путей», хозяин перекрёстков и случайностей. Тенгрианский кам (шаман) — также посредник между миром людей и миром духов: он путешествует в небо к Тенгри или в подземный мир к Эрлику. Оба — essential gatekeepers.'
  },
  {
    from: 'p_coyote', to: 'p_native_shaman',
    title: 'Шаман-трикстер',
    details: 'Койот — центральный трикстер мифологии индейцев Северной Америки. Он то учит людей ремёслам и добывает огонь, то сеет хаос, нарушает табу и устраивает розыгрыши. Индейский шаман (medicine man) — также «нарушитель границ»: он путешествует между мирами, общается с духами, лечит и предсказывает. Архетип шаман-трикстер (койот, ворон) универсален для индейских культур.'
  },
];
crossEdges.forEach(e => {
  pEdges.push({
    from: e.from, to: e.to,
    color: { color: 'rgba(255,255,255,0.2)' },
    width: 0.5,
    dashes: true,
    title: e.title + '\n' + (e.details ? e.details.substring(0, 120) + '…' : ''),
    details: e.details || '',
  });
});

const parallelsNodes = new vis.DataSet(pNodes);
const parallelsEdges = new vis.DataSet(pEdges);

const parallelsOptions = {
  nodes: {
    borderWidth: 2,
    borderWidthSelected: 3,
    font: { size: 12, color: '#eee', face: 'Segoe UI', strokeWidth: 0 },
    scaling: { min: 14, max: 30 },
  },
  edges: {
    smooth: { type: 'continuous' },
    width: 1,
  },
  physics: {
    enabled: false,
    solver: 'forceAtlas2Based',
    forceAtlas2Based: {
      gravitationalConstant: -40,
      centralGravity: 0.005,
      springLength: 200,
      springConstant: 0.04,
      damping: 0.4,
      avoidOverlap: 0.5,
    },
    stabilization: { iterations: 200 },
  },
  interaction: {
    hover: true,
    tooltipDelay: 200,
    navigationButtons: true,
    keyboard: true,
    zoomView: true,
    dragView: true,
    dragNodes: true,
  },
};

const parallelsNetwork = new vis.Network(
  document.getElementById('parallels-network'),
  { nodes: parallelsNodes, edges: parallelsEdges },
  parallelsOptions
);

parallelsNetwork.on('click', function(params) {
  if (params.nodes.length > 0) {
    const nodeId = params.nodes[0];
    const d = pDescriptions[nodeId];
    if (!d) return;
    nodeTitle.textContent = d.label;
    nodeCategory.textContent = d.category;
    nodeDate.textContent = '';
    nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none';
    rulesList.innerHTML = '';
    linksTitle.style.display = 'none';
    linksList.innerHTML = '';
    btnDetail.style.display = 'none';
    panel.style.display = 'block';
  } else if (params.edges.length > 0) {
    const edgeData = parallelsEdges.get(params.edges[0]);
    if (!edgeData || !edgeData.details) return;
    const fLabel = parallelsNodes.get(edgeData.from).label;
    const tLabel = parallelsNodes.get(edgeData.to).label;
    nodeTitle.textContent = fLabel + ' ↔ ' + tLabel;
    nodeCategory.textContent = edgeData.title ? edgeData.title.replace(/<[^>]*>/g, '') : 'Связь';
    nodeDate.textContent = '';
    nodeDate.style.display = 'none';
    nodeDescription.textContent = edgeData.details;
    rulesTitle.style.display = 'none';
    rulesList.innerHTML = '';
    linksTitle.style.display = 'none';
    linksList.innerHTML = '';
    btnDetail.style.display = 'none';
    panel.style.display = 'block';
  } else {
    panel.style.display = 'none';
  }
});

parallelsNetwork.on('doubleClick', function() {
  panel.style.display = 'none';
});

// ─── HELPERS FOR POSITION PERSISTENCE ─────────────────────
function savePositions(key, dataSet) {
  const pos = {};
  dataSet.forEach(function(n) {
    if (n.x !== undefined && n.y !== undefined) {
      pos[n.id] = { x: n.x, y: n.y };
    }
  });
  localStorage.setItem(key, JSON.stringify(pos));
}
function loadPositions(key, arr) {
  try {
    var saved = localStorage.getItem(key);
    if (!saved) return;
    var pos = JSON.parse(saved);
    arr.forEach(function(n) {
      if (pos[n.id]) { n.x = pos[n.id].x; n.y = pos[n.id].y; }
    });
  } catch(e) {}
}
// ─── HIERARCHIES VIEW ──────────────────────────────────────
const hNodeData = {};
const hNodes = [];
const hEdges = [];

// ─── ЕДИНОЕ ДРЕВО: ПАРАБРАХМАН → ЛЮДИ ───────────────
// Источники: Ригведа (Пуруша-сукта 10.90, Насадия-сукта 10.129),
//            Вишну-пурана, Шива-пурана, Махабхарата, Брахма-пурана

function hNode(id, label, x, y, shape, size, color, desc, category) {
  const flat = label.replace(/\n/g, ' ');
  hNodes.push({
    id, label: flat,
    x, y, shape, size,
    color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 },
    font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: shape === 'star' ? '#fff' : '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc,
    fixed: true,
  });
  hNodeData[id] = { label: flat, category: category, description: desc };
}

function hEdge(from, to, color, width, dashes, _arrow, title, details) {
  hEdges.push({
    from, to,
    color: { color, opacity: 0.12 },
    width: width * 0.6, dashes,
    title: title || '',
    details: details || '',
  });
}

function hMarriage(a, b, title, details) {
  hEdges.push({
    from: a, to: b,
    color: { color: '#ffcc88', opacity: 0.12 },
    width: 1, dashes: false,
    title: title || '',
    details: details || '',
  });
}

// === УРОВЕНЬ 0: Абсолют ===
hNode('hi_brahman_abs', 'Парабрахман\n(Ниргуна)', 600, 20, 'star', 24, '#b8a07a',
  'Высшая реальность, не имеющая формы, атрибутов и качеств. За пределами добра и зла, бытия и небытия. Источник всего сущего. Познаётся только через отрицание (нети-нети). Ригведа 10.129 (Насадия-сукта): «Тогда не было ни сущего, ни не-сущего… То Единое дышало без дыхания» (пер. Т.Я. Елизаренковой).',
  'Абсолют — Парабрахман', 'v');

// === УРОВЕНЬ 1: Первое проявление ===
hNode('hi_hiranyagarbha', 'Хираньягарбха\n(Золотой Зародыш)', 600, 80, 'hexagon', 20, '#c8a878',
  'Золотой зародыш (космическое яйцо), первое проявление Абсолюта. Из него родился Брахма. Ригведа 10.121 (Хираньягарбха-сукта): «В начале поднялся Золотой Зародыш. Родившись, он стал единым владыкой творения» (пер. Т.Я. Елизаренковой).',
  'Первое проявление — Хираньягарбха', 'v');

// === УРОВЕНЬ 2: Творец ===
hNode('hi_brahma_c', 'Брахма-Творец\n(Праджапати)', 600, 140, 'hexagon', 20, '#c07050',
  'Бог-творец, родившийся из Золотого Зародыша / лотоса из пупа Вишну. Создал мир и всех существ. Супруг Сарасвати. Отец Праджапати (духовных сыновей). Вишну-пурана: Брахма рождается в начале каждой кальпы.',
  'Творец — Брахма (Праджапати)');

// === УРОВЕНЬ 3: Праджапати (духовные сыновья Брахмы) ===
hNode('hi_marici',        'Маричи',      340, 210, 'dot', 12, '#c89870',
  'Первый из Праджапати, «сияющий». Рождён из ума Брахмы. Отец Кашьяпы. Через Кашьяпу — предок всех богов (Адитьев), демонов (Дайтьев, Данавов), Нагов, Гаруды и других существ.', 'Праджапати — Маричи');

hNode('hi_atri',          'Атри',        440, 210, 'dot', 12, '#c89870',
  'Праджапати, рождённый из ума Брахмы. Великий мудрец, один из Саптариши. Отец Сомы (Чандры) и Дхатара. Считается предком многих ведийских кланов.', 'Праджапати — Атри');

hNode('hi_angiras',       'Ангирас',     540, 210, 'dot', 12, '#c89870',
  'Праджапати, рождённый из ума Брахмы. Великий мудрец, один из Саптариши. Отец Брихаспати (гуру богов) и других. К нему восходит Ангираса-самхита.', 'Праджапати — Ангирас');

hNode('hi_bhrigu',        'Бхригу',      640, 210, 'dot', 12, '#c89870',
  'Праджапати, рождённый из ума Брахмы. Один из Саптариши. Отец Лакшми (главной богини процветания) и Шукры (гуру демонов). С его именем связана Бхригу-самхита.', 'Праджапати — Бхригу');

hNode('hi_daksha',        'Дакша',       740, 210, 'hexagon', 20, '#c89870',
  'Праджапати, ключевой прародитель. Рождён из большого пальца правой ноги Брахмы. Его дочери стали матерями богов, демонов, змей, птиц. Устроил первое жертвоприношение. Махабхарата, Адипарва.', 'Праджапати — Дакша');

hNode('hi_pulastya',      'Пуластья',    840, 210, 'dot', 12, '#c89870',
  'Праджапати, рождённый из ума Брахмы. Один из Саптариши. Отец Куберы (бога богатства) и Раваны (царя ракшасов). Предок всех ракшасов.', 'Праджапати — Пуластья');

hNode('hi_himavan_c',     'Химаван',     940, 210, 'dot', 12, '#c89870',
  'Праджапати, сын Брахмы. Бог-олицетворение Гималайских гор. Отец Парвати (супруги Шивы) и Ганги. Владыка всех гор.', 'Праджапати — Химаван');

hNode('hi_narada',        'Нарада',      1040, 210, 'dot', 12, '#c89870',
  'Праджапати, рождённый из ума Брахмы. Божественный мудрец, странник между мирами. Сын Брахмы по разным версиям. Упоминается в Махабхарате и Пуранах.', 'Праджапати — Нарада');

// === УРОВЕНЬ 4: Супруги и следующее поколение ===
// Супруга Брахмы
hNode('hi_saraswati_c',   'Сарасвати\n(супруга Брахмы)', 740, 140, 'dot', 10, '#c88890',
  'Богиня знания, музыки, искусства и мудрости. Супруга Брахмы. Изображается с виной (муз. инструмент) и Ведами.', 'Супруга — Сарасвати');

// Дакша и его жена
hNode('hi_prasuti',       'Прасути\n(супруга Дакши)', 840, 280, 'dot', 12, '#a08070',
  'Супруга Дакши, мать его дочерей. Родилась из пальца левой ноги Брахмы (как Дакша — из правого).', 'Супруга — Прасути');

// Дочери Дакши
hNode('hi_sati',          'Сати',        840, 350, 'dot', 12, '#d07070',
  'Старшая дочь Дакши и Прасути. Первая жена Шивы. Совершила самосожжение из-за ссоры отца с Шивой. Позже переродилась как Парвати.', 'Дочь Дакши — Сати');

hNode('hi_aditi',         'Адити',       600, 350, 'hexagon', 20, '#70a0c0',
  'Дочь Дакши, жена Кашьяпы. Мать Адитьев (богов). Беспредельная, бесконечная — мать небесных светил. Через неё проходит линия к людям.', 'Дочь Дакши — Адити');

hNode('hi_diti',          'Дити',        340, 350, 'dot', 12, '#a06060',
  'Дочь Дакши, жена Кашьяпы. Мать Дайтьев (демонов). Родила Хираньякашипу и Хираньякшу. Противница богов.', 'Дочь Дакши — Дити');

hNode('hi_danu',          'Дану',        450, 350, 'dot', 12, '#a06060',
  'Дочь Дакши, жена Кашьяпы. Мать Данавов (демонического племени). От неё произошли Вритра и другие асуры.', 'Дочь Дакши — Дану');

hNode('hi_kadru',         'Кадру',       960, 370, 'dot', 12, '#80a060',
  'Дочь Дакши, жена Кашьяпы. Мать тысячи змеев (Нагов), главный из которых — Шеша (Ананта).', 'Дочь Дакши — Кадру');

hNode('hi_vinata',        'Вината',      1060, 370, 'dot', 12, '#80a060',
  'Дочь Дакши, жена Кашьяпы. Мать Гаруды (царя птиц) и Аруны (колесничего Сурьи).', 'Дочь Дакши — Вината');

// Кашьяпа (муж дочерей Дакши)
hNode('hi_kashyapa',      'Кашьяпа',     600, 280, 'hexagon', 20, '#80a080',
  'Сын Маричи (внук Брахмы). Прародитель богов, демонов и всех живых существ. Женат на 13 дочерях Дакши. Махабхарата: «Кашьяпа — отец всех существ» (Адипарва).', 'Прародитель — Кашьяпа');

// Супруга Химавана
hNode('hi_mena',          'Мена',        1000, 280, 'dot', 10, '#a08070',
  'Супруга Химавана, мать Парвати и Ганги.', 'Супруга — Мена');

// Парвати (дочь Химавана)
hNode('hi_parvati_c',     'Парвати',     940, 350, 'dot', 10, '#d07070',
  'Дочь Химавана и Мены, перерождение Сати. Супруга Шивы, мать Ганеши и Картикеи. Богиня любви, преданности и семейного счастья. В гневных формах — Дурга, Кали.', 'Супруга Шивы — Парвати');

// Шива
hNode('hi_shiva_c',       'Шива',        940, 420, 'hexagon', 17, '#c06040',
  'Бог-разрушитель в Тримурти. Супруг Парвати, отец Ганеши и Картикеи. Владыка йоги, медитации и аскезы. Изображается с трезубцем и барабаном.', 'Бог — Шива');

// Дети Шивы и Парвати
hNode('hi_ganesha_c',     'Ганеша',      880, 490, 'dot', 10, '#c08040',
  'Бог мудрости, устранитель препятствий. Сын Шивы и Парвати. С головой слона, одним бивнем. Почитается в начале всех начинаний.', 'Сын Шивы — Ганеша');

hNode('hi_kartikeya_c',   'Картикея',    1000, 490, 'dot', 12, '#c08040',
  'Бог войны, сын Шивы и Парвати. Предводитель небесного войска. Ездит на павлине. В Южной Индии — Муруган.', 'Сын Шивы — Картикея');

// Дети Кашьяпы и Адити (Адитьи)
hNode('hi_surya_c',       'Сурья\n(Вивасван)', 600, 420, 'hexagon', 20, '#d0a040',
  'Бог Солнца, главный из Адитьев. Сын Кашьяпы и Адити. Отец Вайвасваты Ману (прародителя людей), Ямы, Ямуны и Ашвинов. Ездит на колеснице, запряжённой семёркой коней.', 'Адитья — Сурья (Вивасван)');

hNode('hi_vishnu_ad',     'Вишну\n(Адитья)', 400, 420, 'dot', 10, '#4070c0',
  'Адитья, сын Кашьяпы и Адити. В вайшнавизме — Верховный Бог (Махавишну). Член Тримурти (хранитель). Возлежит на змее Шеше в океане молока.', 'Адитья — Вишну');

hNode('hi_indra_c',       'Индра',       500, 420, 'dot', 10, '#9080c0',
  'Царь богов, повелитель грома и молнии. Сын Кашьяпы и Адити. Владыка Сварги (небесного царства). Убивает змея Вритру. Главный герой Ригведы.', 'Адитья — Индра');

hNode('hi_varuna_c',      'Варуна',      300, 420, 'dot', 10, '#5090a0',
  'Бог вод и океана, хранитель космического закона (Риты). Сын Кашьяпы и Адити. В Ригведе — верховный судья.', 'Адитья — Варуна');

// Дети Кашьяпы и Дити (Дайтьи)
hNode('hi_hiranyakashipu','Хираньякашипу',250, 490, 'dot', 12, '#a05050',
  'Царь Дайтьев, сын Кашьяпы и Дити. Убит Вишну в форме Нарасимхи (человекольва). Завистник богов.', 'Дайтья — Хираньякашипу');

// Дети Кашьяпы и Винаты
hNode('hi_garuda_c',      'Гаруда',      1100, 420, 'dot', 12, '#b09060',
  'Царь птиц, сын Кашьяпы и Винаты. Вахана (ездовое животное) Вишну. Враг змей. Получеловек-полуорёл.', 'Сын Кашьяпы — Гаруда');

// Дети Атри
hNode('hi_soma_c',        'Сома\n(Чандра)', 440, 280, 'dot', 12, '#80a0b0',
  'Бог Луны, сын Атри. Женат на 27 дочерях Дакши (созвездиях накшатр). Дарит бессмертие, хранитель сомы (напитка богов).', 'Лунный бог — Сома');

// Дети Бхригу
hNode('hi_lakshmi_c',     'Лакшми',      640, 280, 'dot', 12, '#d0a060',
  'Богиня процветания и удачи, дочь Бхригу. Супруга Вишну. Родилась из Молочного океана при пахтанье.', 'Дочь Бхригу — Лакшми');

// === УРОВЕНЬ 5: Следующее поколение ===
// Дети Сурьи (Вивасвана)
hNode('hi_manu',          'Вайвасвата\nМану', 600, 490, 'hexagon', 20, '#90a080',
  'Сын Сурьи (Вивасвана), седьмой Ману текущей манвантары. Прародитель нынешнего человечества. Создал «Законы Ману» (Ману-смрити).', 'Прародитель — Ману');

hNode('hi_yama_c',        'Яма',         520, 490, 'dot', 10, '#706060',
  'Бог смерти и справедливости, сын Сурьи (Вивасвана). Хранитель южного направления, царь предков (питри).', 'Сын Сурьи — Яма');

hNode('hi_yamuna_c',      'Ямуна',       680, 490, 'dot', 10, '#6090b0',
  'Богиня реки Ямуна, дочь Сурьи (Вивасвана). Сестра Ямы. Священная река в индуизме.', 'Дочь Сурьи — Ямуна');

hNode('hi_ashvins',       'Ашвины',      770, 490, 'dot', 10, '#c0a080',
  'Божественные близнецы, сыновья Сурьи (Вивасвана) и Сараньи. Врачеватели богов, даруют молодость и исцеление.', 'Сыны Сурьи — Ашвины');

// === УРОВЕНЬ 6: Люди ===
hNode('hi_ikshvaku',      'Икшваку',     600, 560, 'dot', 12, '#909070',
  'Первый царь, сын Вайвасваты Ману. Основатель Солнечной (Сурьи) династии. Первый человек, ставший правителем. От него произошли все цари Солнечной династии, в том числе Рама.', 'Первый царь — Икшваку');

// === РЁБРА (EDGES) ===
const CORE = '#b8a07a';
const BRANCH = '#c89870';
const LIGHT = 'rgba(255,255,255,0.12)';

// Абсолют → Первое проявление
hEdge('hi_brahman_abs', 'hi_hiranyagarbha', CORE, 2.5, false, true, 'Нисхождение Абсолюта в проявленное', 'Парабрахман → Хираньягарбха: первое проявление Единого.');

// Первое проявление → Творец
hEdge('hi_hiranyagarbha', 'hi_brahma_c', CORE, 2.5, false, true, 'Рождение Творца из Золотого Зародыша', 'Хираньягарбха → Брахма: из золотого яйца родился Брахма-творец.');

// Брахма → Сарасвати (брак)
hMarriage('hi_brahma_c', 'hi_saraswati_c', 'Брахма и Сарасвати', 'Брак: Брахма-творец и Сарасвати (богиня знания).');

// Брахма → Праджапати
hEdge('hi_brahma_c', 'hi_marici', BRANCH, 1.5, false, true, 'Рождён из ума Брахмы', 'Маричи — умопорождённый сын Брахмы (Праджапати).');
hEdge('hi_brahma_c', 'hi_atri', BRANCH, 1.5, false, true, 'Рождён из ума Брахмы', 'Атри — умопорождённый сын Брахмы.');
hEdge('hi_brahma_c', 'hi_angiras', BRANCH, 1.5, false, true, 'Рождён из ума Брахмы', 'Ангирас — умопорождённый сын Брахмы.');
hEdge('hi_brahma_c', 'hi_bhrigu', BRANCH, 1.5, false, true, 'Рождён из ума Брахмы', 'Бхригу — умопорождённый сын Брахмы.');
hEdge('hi_brahma_c', 'hi_daksha', BRANCH, 2, false, true, 'Рождён из пальца правой ноги Брахмы', 'Дакша — Праджапати, родившийся из большого пальца правой ноги Брахмы.');
hEdge('hi_brahma_c', 'hi_pulastya', BRANCH, 1.5, false, true, 'Рождён из ума Брахмы', 'Пуластья — умопорождённый сын Брахмы.');
hEdge('hi_brahma_c', 'hi_himavan_c', BRANCH, 1.5, false, true, 'Сын Брахмы', 'Химаван — сын Брахмы, бог гор.');
hEdge('hi_brahma_c', 'hi_narada', BRANCH, 1.5, false, true, 'Рождён из ума Брахмы', 'Нарада — умопорождённый сын Брахмы.');

// Маричи → Кашьяпа
hEdge('hi_marici', 'hi_kashyapa', BRANCH, 1.5, false, true, 'Сын Маричи', 'Кашьяпа — сын Маричи, внук Брахмы.');

// Дакша + Прасути (брак)
hMarriage('hi_daksha', 'hi_prasuti', 'Дакша и Прасути', 'Брак: Дакша и Прасути, родившаяся из пальца левой ноги Брахмы.');

// Дакша и Прасути → дочери
hEdge('hi_prasuti', 'hi_sati', BRANCH, 1.5, false, true, 'Дочь Дакши и Прасути', 'Сати — старшая дочь Дакши.');
hEdge('hi_prasuti', 'hi_aditi', BRANCH, 1.5, false, true, 'Дочь Дакши и Прасути', 'Адити — дочь Дакши.');
hEdge('hi_prasuti', 'hi_diti', BRANCH, 1.5, false, true, 'Дочь Дакши и Прасути', 'Дити — дочь Дакши.');
hEdge('hi_prasuti', 'hi_danu', BRANCH, 1.5, false, true, 'Дочь Дакши и Прасути', 'Дану — дочь Дакши.');
hEdge('hi_prasuti', 'hi_kadru', BRANCH, 1.5, false, true, 'Дочь Дакши и Прасути', 'Кадру — дочь Дакши.');
hEdge('hi_prasuti', 'hi_vinata', BRANCH, 1.5, false, true, 'Дочь Дакши и Прасути', 'Вината — дочь Дакши.');

// Кашьяпа ↔ дочери Дакши (браки)
hMarriage('hi_kashyapa', 'hi_aditi', 'Кашьяпа и Адити', 'Брак: Кашьяпа (внук Брахмы) и Адити (дочь Дакши) — родители богов.');
hMarriage('hi_kashyapa', 'hi_diti', 'Кашьяпа и Дити', 'Брак: Кашьяпа и Дити — родители Дайтьев.');
hMarriage('hi_kashyapa', 'hi_danu', 'Кашьяпа и Дану', 'Брак: Кашьяпа и Дану — родители Данавов.');
hMarriage('hi_kashyapa', 'hi_kadru', 'Кашьяпа и Кадру', 'Брак: Кашьяпа и Кадру — родители змеев (Нагов).');
hMarriage('hi_kashyapa', 'hi_vinata', 'Кашьяпа и Вината', 'Брак: Кашьяпа и Вината — родители Гаруды.');

// Кашьяпа + Адити → Адитьи
hEdge('hi_aditi', 'hi_surya_c', BRANCH, 1.5, false, true, 'Сын Кашьяпы и Адити', 'Сурья (Вивасван) — Адитья, бог Солнца.');
hEdge('hi_aditi', 'hi_vishnu_ad', BRANCH, 1.5, false, true, 'Сын Кашьяпы и Адити', 'Вишну — Адитья, хранитель вселенной.');
hEdge('hi_aditi', 'hi_indra_c', BRANCH, 1.5, false, true, 'Сын Кашьяпы и Адити', 'Индра — Адитья, царь богов.');
hEdge('hi_aditi', 'hi_varuna_c', BRANCH, 1.5, false, true, 'Сын Кашьяпы и Адити', 'Варуна — Адитья, бог вод.');

// Кашьяпа + Дити → Дайтьи
hEdge('hi_diti', 'hi_hiranyakashipu', BRANCH, 1.5, false, true, 'Сын Кашьяпы и Дити', 'Хираньякашипу — Дайтья, царь демонов.');

// Кашьяпа + Вината → Гаруда
hEdge('hi_vinata', 'hi_garuda_c', BRANCH, 1.5, false, true, 'Сын Кашьяпы и Винаты', 'Гаруда, царь птиц.');

// Атри → Сома
hEdge('hi_atri', 'hi_soma_c', BRANCH, 1.5, false, true, 'Сын Атри', 'Сома (Чандра) — бог Луны, сын Атри.');

// Бхригу → Лакшми
hEdge('hi_bhrigu', 'hi_lakshmi_c', BRANCH, 1.5, false, true, 'Дочь Бхригу', 'Лакшми — дочь Бхригу, богиня процветания.');

// Химаван + Мена (брак)
hMarriage('hi_himavan_c', 'hi_mena', 'Химаван и Мена', 'Брак: Химаван (бог гор) и Мена.');

// Химаван + Мена → Парвати
hEdge('hi_mena', 'hi_parvati_c', BRANCH, 1.5, false, true, 'Дочь Химавана и Мены', 'Парвати — дочь Химавана.');

// Сати → перерождение → Парвати (реинкарнация)
hEdges.push({
  from: 'hi_sati', to: 'hi_parvati_c',
  color: { color: '#d07070', opacity: 0.1 },
  width: 0.8, dashes: [4, 4],
  title: 'Перерождение: Сати → Парвати',
  details: 'Сати (первая жена Шивы, дочь Дакши) переродилась как Парвати (дочь Химавана).',
});

// Шива + Парвати (брак)
hMarriage('hi_shiva_c', 'hi_parvati_c', 'Шива и Парвати', 'Брак: Шива и Парвати.');

// Парвати + Шива → сыновья
hEdge('hi_parvati_c', 'hi_ganesha_c', '#c08040', 1.5, false, true, 'Сын Шивы и Парвати', 'Ганеша — бог мудрости, сын Шивы и Парвати.');
hEdge('hi_parvati_c', 'hi_kartikeya_c', '#c08040', 1.5, false, true, 'Сын Шивы и Парвати', 'Картикея — бог войны, сын Шивы и Парвати.');
// Отец (Шива) → дети (пунктиром)
hEdge('hi_shiva_c', 'hi_ganesha_c', '#c06040', 1.2, true, true, 'Отец Ганеши', 'Шива → Ганеша (отец).');
hEdge('hi_shiva_c', 'hi_kartikeya_c', '#c06040', 1.2, true, true, 'Отец Картикеи', 'Шива → Картикея (отец).');

// Сурья → Ману
hEdge('hi_surya_c', 'hi_manu', CORE, 2, false, true, 'Сын Сурьи (Вивасвана)', 'Вайвасвата Ману — сын Сурьи (Вивасвана), седьмой Ману.');
hEdge('hi_surya_c', 'hi_yama_c', BRANCH, 1.5, false, true, 'Сын Сурьи', 'Яма — бог смерти, сын Сурьи.');
hEdge('hi_surya_c', 'hi_yamuna_c', BRANCH, 1.5, false, true, 'Дочь Сурьи', 'Ямуна — богиня реки, дочь Сурьи.');
hEdge('hi_surya_c', 'hi_ashvins', BRANCH, 1.5, false, true, 'Сыновья Сурьи', 'Ашвины — божественные близнецы, сыны Сурьи.');

// Ману → Икшваку
hEdge('hi_manu', 'hi_ikshvaku', CORE, 2, false, true, 'Сын Вайвасваты Ману', 'Икшваку — первый царь, сын Ману. Основатель Солнечной династии.');

// Икшваку → Солнечная династия
hEdge('hi_ikshvaku', 'hi_vikukshi', '#909070', 1.5, false, true, 'Сын Икшваку', 'Викукши — второй царь Солнечной династии, сын Икшваку.');

// === УРОВЕНЬ 7: Солнечная династия (Сурьяванша) ===
hNode('hi_vikukshi',    'Викукши',      250, 630, 'dot', 11, '#908070',
  'Второй царь Солнечной династии, сын Икшваку. Известен как «Пожиратель кролика». Отец Пуранджайи.', 'Царь СД — Викукши');
hNode('hi_mandhata',    'Мандхата',     250, 700, 'dot', 11, '#908070',
  'Великий царь Солнечной династии, сын Юванашвы. Покорил три мира. Упоминается в Ригведе (X.134) и Махабхарате.', 'Царь СД — Мандхата');
hNode('hi_harishchandra','Харишчандра',  250, 770, 'dot', 12, '#908070',
  'Царь Солнечной династии, известный своей непоколебимой правдивостью. Продал себя и семью ради исполнения обещания. О нём — одна из самых известных легенд Пуран.', 'Царь СД — Харишчандра');
hNode('hi_sagara',      'Сагара',       250, 840, 'dot', 11, '#908070',
  'Царь Солнечной династии, отец 60 000 сыновей. Вырыл океан (Са́гара — «с океаном»). Из-за его сыновей Гаруда похитил амриту.', 'Царь СД — Сагара');
hNode('hi_bhagiratha',  'Бхагиратха',   250, 910, 'dot', 12, '#908070',
  'Царь Солнечной династии, низведший Гангу с небес на землю многолетней аскезой. Благодаря ему Ганга стала земной рекой.', 'Царь СД — Бхагиратха');
hNode('hi_dasharatha',  'Дашаратха',    250, 980, 'dot', 12, '#908070',
  'Царь Айодхьи, сын Аджи, отец Рамы. Имел трёх жён (Каушалья, Сумитра, Кайкейи) и четырёх сыновей: Рама, Лакшмана, Бхарата, Шатругхна.', 'Царь СД — Дашаратха');
hNode('hi_rama_c',      'Рама\n(аватара)', 250, 1050, 'hexagon', 14, '#4090c0',
  'Седьмая аватара Вишну, герой «Рамаяны». Царевич Айодхьи, убил демона Равану. Олицетворение дхармы, идеальный царь и человек.', 'Аватара — Рама');

// Солнечная династия: связи
hEdge('hi_vikukshi', 'hi_mandhata', '#909070', 1.5, false, true, 'Потомок (через Пуранджаю)', 'Мандхата — великий царь Солнечной династии.');
hEdge('hi_mandhata', 'hi_harishchandra', '#909070', 1.5, false, true, 'Потомок', 'Харишчандра — царь Солнечной династии.');
hEdge('hi_harishchandra', 'hi_sagara', '#909070', 1.5, false, true, 'Потомок', 'Сагара — царь Солнечной династии.');
hEdge('hi_sagara', 'hi_bhagiratha', '#909070', 1.5, false, true, 'Потомок Сагары', 'Бхагиратха — праправнук Сагары.');
hEdge('hi_bhagiratha', 'hi_dasharatha', '#909070', 1.5, false, true, 'Потомок', 'Дашаратха — царь Айодхьи из Солнечной династии.');
hEdge('hi_dasharatha', 'hi_rama_c', '#909070', 1.5, false, true, 'Сын Дашаратхи', 'Рама — сын Дашаратхи, аватара Вишну.');

// === УРОВЕНЬ 7: Лунная династия (Чандраванша) ===
hNode('hi_budha_c',     'Будха',        950, 630, 'dot', 11, '#70a090',
  'Бог планеты Меркурий, сын Сомы (Чандры). Муж Илы, отец Пурураваса. Основатель Лунной династии.', 'Царь ЛД — Будха');
hNode('hi_pururavas',   'Пуруравас',    950, 700, 'dot', 11, '#70a090',
  'Первый царь Лунной династии, сын Будхи и Илы. Известен своей любовью к апсаре Урваши. Упоминается в Ригведе (X.95).', 'Царь ЛД — Пуруравас');
hNode('hi_yayati',      'Яяти',         950, 770, 'dot', 12, '#70a090',
  'Великий царь Лунной династии, сын Нахуши. Имел пятерых сыновей (Яду, Пуру, Друхью, Ану, Турвасу), от которых произошли все племена. Махабхарата, Адипарва.', 'Царь ЛД — Яяти');
hNode('hi_yadu',        'Яду',          880, 840, 'dot', 12, '#70a090',
  'Старший сын Яяти. Основатель клана Ядавов, из которого родился Кришна. Был проклят и не стал царём.', 'Царь ЛД — Яду');
hNode('hi_puru',        'Пуру',         1020, 840, 'dot', 12, '#70a090',
  'Младший сын Яяти, унаследовал царство. Основатель клана Пауравов, от которого произошли Кауравы и Пандавы.', 'Царь ЛД — Пуру');
hNode('hi_bharata_c',   'Бхарата',      1020, 910, 'dot', 13, '#70a090',
  'Царь из династии Пуру, сын Душьянты и Шакунталы. От его имени произошло название «Бхаратаварша» (Индия). Эпоним племени бхаратов.', 'Царь ЛД — Бхарата');
hNode('hi_kuru_c',      'Куру',         1020, 980, 'dot', 12, '#70a090',
  'Царь из династии Бхараты, предок Кауравов и Пандавов. От его имени — Курукшетра («поле Куру»), место битвы в Махабхарате.', 'Царь ЛД — Куру');
hNode('hi_pandavas',    'Пандавы',      950, 1050, 'dot', 12, '#70a090',
  'Пять сыновей Панду: Юдхиштхира, Бхима, Арджуна, Накула, Сахадева. Герои Махабхараты, победители в битве на Курукшетре.', 'Герои — Пандавы');
hNode('hi_krishna_c_h', 'Кришна\n(аватара)', 880, 1050, 'hexagon', 14, '#4080b0',
  'Восьмая аватара Вишну, родился в клане Ядавов (Лунная династия). Центральный персонаж «Бхагавад-гиты», духовный учитель Арджуны.', 'Аватара — Кришна');

// Лунная династия: связи
hEdge('hi_soma_c', 'hi_budha_c', '#70a090', 1.5, false, true, 'Сын Сомы', 'Будха — сын Сомы (Чандры), первый из Лунной династии.');
hEdge('hi_budha_c', 'hi_pururavas', '#70a090', 1.5, false, true, 'Сын Будхи', 'Пуруравас — сын Будхи.');
hEdge('hi_pururavas', 'hi_yayati', '#70a090', 1.5, false, true, 'Потомок', 'Яяти — великий царь Лунной династии.');
hEdge('hi_yayati', 'hi_yadu', '#70a090', 1.5, false, true, 'Сын Яяти', 'Яду — старший сын Яяти.');
hEdge('hi_yayati', 'hi_puru', '#70a090', 1.5, false, true, 'Сын Яяти', 'Пуру — младший сын Яяти, наследник.');
hEdge('hi_puru', 'hi_bharata_c', '#70a090', 1.5, false, true, 'Потомок Пуру', 'Бхарата — царь из клана Пауравов.');
hEdge('hi_bharata_c', 'hi_kuru_c', '#70a090', 1.5, false, true, 'Потомок Бхараты', 'Куру — царь, предок Кауравов.');
hEdge('hi_kuru_c', 'hi_pandavas', '#70a090', 1.5, false, true, 'Потомки Куру', 'Пандавы — сыновья Панду из рода Куру.');
hEdge('hi_yadu', 'hi_krishna_c_h', '#70a090', 1.5, false, true, 'Потомок Яду', 'Кришна — восьмая аватара Вишну, рождён в роду Ядавов.');

// === СОВРЕМЕННОЕ ЧЕЛОВЕЧЕСТВО ===
hNode('hi_humans',        'Современное\nчеловечество', 600, 1120, 'dot', 10, '#808080',
  'В нынешнюю эпоху Кали-юги человечество произошло от смешения всех этих династий. Ригведа (I.80.1): «От Ману родились люди». Сейчас 51-й год Брахмы, кальпа Швета-Вараха, 7-я манвантара (Вайвасвата Ману).',
  'Человечество');

// Связи в человечество
hEdge('hi_rama_c', 'hi_humans', '#808080', 2, false, true, 'Потомки Рамы', 'От Рамы и его братьев произошли люди, почитающие дхарму.');
hEdge('hi_pandavas', 'hi_humans', '#808080', 2, false, true, 'Потомки Пандавов', 'После битвы на Курукшетре потомки Пандавов продолжили человеческий род.');
hEdge('hi_krishna_c_h', 'hi_humans', '#808080', 2, false, true, 'Потомки Кришны', 'Род Ядавов продолжился после ухода Кришны.');

// ─── JAINISM HIERARCHY ─────────────────────────────────────────
const hjNodes = [];
const hjEdges = [];
const hjNodeData = {};
const C = 'rgba(255,255,255,0.12)', CW = 'rgba(255,255,255,0.06)';

function hjNode(id, label, x, y, shape, size, color, desc, cat) {
  const flat = label.replace(/\n/g, ' ');
  hjNodes.push({
    id, label: flat,
    x, y, shape, size,
    color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 },
    font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: shape === 'star' ? '#fff' : '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc,
    fixed: true,
  });
  hjNodeData[id] = { label: flat, category: cat, description: desc };
}
function hjEdge(from, to, color, width, dashes) {
  hjEdges.push({ from, to, color: { color, opacity: 0.12 }, width: width * 0.6, dashes, title: '' });
}

hjNode('hj_cosmos',   'Локакаша\n(Несотворённая\nВселенная)', 400, 10, 'star', 22, '#b8a07a',
  'Вечная, несотворённая вселенная в форме космического человека. Состоит из трёх миров (лока): верхнего, среднего и нижнего. Не имеет начала и конца во времени. Пурва-пурана: «Мир не был создан никем, он существовал всегда».', 'Абсолют — Локакаша');

hjNode('hj_urdhva',   'Урдхва-лока\n(Верхний мир)', 180, 100, 'hexagon', 17, '#c8b878',
  'Верхняя часть вселенной (небеса). Включает 16 небесных миров (кальпа) и обитель освобождённых душ — Сиддха-шилу (вершина вселенной). Боги (девы) обитают здесь, но они — такие же сансарные существа, как и люди.', 'Верхний мир');
hjNode('hj_siddha',   'Сиддхи\n(Освобождённые)', 100, 200, 'dot', 12, '#e0d8a0',
  'Освобождённые души (сиддхи), достигшие вершины вселенной — Сиддха-шилы. Они пребывают там вечно, в полном блаженстве, всеведении и чистом сознании, больше не возвращаясь в сансару.', 'Состояние души — Сиддха');

hjNode('hj_madhya',   'Мадхья-лока\n(Средний мир)', 400, 100, 'hexagon', 17, '#c8a878',
  'Средний мир — наша обитель. Состоит из концентрических островов-континентов (двипа), окружённых океанами. Главный — Джамбудвипа, где расположена Индия (Бхаратаварша) — единственное место, где возможно освобождение.', 'Средний мир');
hjNode('hj_jiva',     'Джива и\nАджива', 300, 210, 'diamond', 16, '#c09870',
  'Две фундаментальные категории: джива (вечные души) и аджива (не-душа: материя, пространство, время, движение, покой). Душа отлична от тела и может достичь освобождения, отделившись от кармической материи.', 'Верование — Джива/Аджива');
hjNode('hj_bandha',   'Асрава →\nБандха', 400, 210, 'dot', 12, '#b08868',
  'Асрава — приток кармической материи к душе через действия, мысли и слова. Бандха — связывание души этой материей. Восемь видов кармы определяют рождение, продолжительность жизни, характер и препятствия души.', 'Верование — Бандха');
hjNode('hj_samvara',  'Самвара →\nНирджара', 500, 210, 'dot', 12, '#b08868',
  'Самвара — прекращение притока новой кармы через соблюдение обетов, аскезу и медитацию. Нирджара — уничтожение уже накопленной кармы через покаяние и тапас. Полное уничтожение ведёт к мокше.', 'Верование — Самвара/Нирджара');
hjNode('hj_tirtha',    '24 Тиртханкары\n(проводники)', 400, 310, 'hexagon', 16, '#c8a070',
  '24 тиртханкары («строители переправы») — провозвестники джайнизма, родившиеся людьми и достигшие всеведения (кевала-гьяна). Первый — Ришабха (Адинатха), последний — Махавира. Они не боги, а идеальные люди-учителя.', 'Тиртханкары');
hjNode('hj_adinath',  'Адинатха\n(Ришабха)', 300, 390, 'dot', 12, '#c09060',
  'Ришабха (Адинатха) — 1-й тиртханкара джайнизма, живший в незапамятные времена. Сын царя Набхи. Основал общество, научил людей земледелию, ремёслам, письму и законам. Почитается как первый царь и первый учитель.', 'Тиртханкара — Адинатха');
hjNode('hj_parshva',  'Паршванатха', 400, 390, 'dot', 12, '#c09060',
  'Паршванатха — 23-й тиртханкара (IX–VIII вв. до н.э.). Родился в Варанаси. Установил четыре обета (ахимса, сатья, астейя, апариграха). Его символ — змей (нага). Считается исторической фигурой, предшествовавшей Махавире.', 'Тиртханкара — Паршванатха');
hjNode('hj_mahavira', 'Махавира\n(Вардхамана)', 500, 390, 'hexagon', 14, '#c09060',
  'Махавира («Великий герой») — 24-й тиртханкара (599–527 до н.э.). Родился в Кундаграме. В 30 лет отрёкся от мира, после 12 лет аскезы достиг кевала-гьяны. Учил ахимсе, равенству всех душ и пяти обетам. Современник Будды.', 'Тиртханкара — Махавира');

hjNode('hj_adho',     'Адхо-лока\n(Нижний мир)', 620, 100, 'hexagon', 17, '#a09080',
  'Нижняя часть вселенной — семь адов (нарака). Каждый ад ниже предыдущего, с возрастающими муками. Души попадают сюда из-за тяжёлой кармы, но после её исчерпания возвращаются в сансару. Ады не вечны.', 'Нижний мир');
hjNode('hj_naraka',   '7 адов\n(Нарака)', 640, 210, 'dot', 12, '#907060',
  'Семь адов (от Ратнапрабха до Адхографии): чем глубже, тем сильнее страдания. Температура повышается, цвета меняются от тёплых до чёрных. Души перерождаются здесь сотнями тысяч лет, но не вечно.', 'Ад — Нарака');

hjNode('hj_ratna',    'Три\nдрагоценности', 400, 490, 'hexagon', 16, '#b8a888',
  'Путь к освобождению: 1) Самьяг-даршана (правильное видение/вера), 2) Самьяг-гьяна (правильное знание), 3) Самьяг-чаритра (правильное поведение). Без всех трёх освобождение невозможно.', 'Путь — Три драгоценности');
hjNode('hj_kevala',   'Кевала-гьяна\n(всеведение)', 300, 570, 'dot', 12, '#c0a870',
  'Кевала-гьяна — абсолютное всеведение, высшая стадия познания. Душа познаёт прошлое, настоящее и будущее всех вещей во всей вселенной одновременно. Достигается только после полного уничтожения карм-препятствий.', 'Состояние — Кевала');
hjNode('hj_moksha',   'Мокша\n(освобождение)', 500, 570, 'hexagon', 16, '#c8a878',
  'Конечная цель джайнизма — полное освобождение души от всякой кармы и материи. Освобождённая душа (сиддха) навсегда покидает сансару, поднимается на вершину вселенной и пребывает там в вечном блаженстве.', 'Цель — Мокша');

// Jainism edges
hjEdge('hj_cosmos', 'hj_urdhva', C, 2, false);
hjEdge('hj_cosmos', 'hj_madhya', C, 2, false);
hjEdge('hj_cosmos', 'hj_adho',   C, 2, false);
hjEdge('hj_urdhva', 'hj_siddha', CW, 1, false);
hjEdge('hj_madhya', 'hj_jiva',   CW, 1, false);
hjEdge('hj_madhya', 'hj_tirtha', CW, 1, false);
hjEdge('hj_madhya', 'hj_bandha', CW, 1, false);
hjEdge('hj_madhya', 'hj_samvara', CW, 1, false);
hjEdge('hj_tirtha', 'hj_adinath', CW, 1, false);
hjEdge('hj_tirtha', 'hj_parshva', CW, 1, false);
hjEdge('hj_tirtha', 'hj_mahavira', CW, 1, false);
hjEdge('hj_adho',   'hj_naraka',  CW, 1, false);
hjEdge('hj_jiva',   'hj_ratna',   CW, 1.5, true);
hjEdge('hj_ratna',  'hj_kevala',  CW, 1, false);
hjEdge('hj_ratna',  'hj_moksha',  CW, 1, false);

// ─── SIKHISM HIERARCHY ──────────────────────────────────────────
const hsNodes = [];
const hsEdges = [];
const hsNodeData = {};

function hsNode(id, label, x, y, shape, size, color, desc, cat) {
  const flat = label.replace(/\n/g, ' ');
  hsNodes.push({
    id, label: flat,
    x, y, shape, size,
    color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 },
    font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: shape === 'star' ? '#fff' : '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc,
    fixed: true,
  });
  hsNodeData[id] = { label: flat, category: cat, description: desc };
}
function hsEdge(from, to, color, width, dashes) {
  hsEdges.push({ from, to, color: { color, opacity: 0.12 }, width: width * 0.6, dashes, title: '' });
}

hsNode('hs_ek_onkar', 'Эк-Онкар\n(Единый Бог)', 400, 10, 'star', 22, '#b8a07a',
  'Эк-Онкар («Бог Един») — фундаментальный принцип сикхизма. Бог един, бесформен, вечен, не рождён, самосущ. Одновременно трансцендентен и имманентен. Не воплощается, не имеет пола. Начало «Джапджи»: «Есть лишь один Бог, Высшая Истина, Творец» (пер. И.С. Рабиновича).', 'Абсолют — Эк-Онкар');

hsNode('hs_hukam',   'Хукам\n(Божественный\nпорядок)', 400, 100, 'hexagon', 18, '#c8a070',
  'Хукам — божественная воля/порядок, управляющий вселенной. Всё происходит по воле Бога: рождение, смерть, радость, страдание. Человек не может постичь хукам разумом, но может принять его смиренно. «Всё происходит по Твоей воле» (Гуру Грантх Сахиб).', 'Божественный порядок — Хукам');
hsNode('hs_srishti',  'Творение\n(Мир и человек)', 300, 210, 'dot', 12, '#b09870',
  'Мир создан Богом по Его воле (хукам). Природа — проявление Бога, но не Он сам. Человек — вершина творения, способный познать Бога через любовь и служение. Бог одновременно и в мире, и вне его.', 'Верование — Творение');
hsNode('hs_karma_s',  'Карма и\nсансара', 500, 210, 'dot', 12, '#b09870',
  'В сикхизме карма — не закон воздаяния, а проявление божественного порядка. Человек рождается вновь и вновь, пока не осознает Бога. Освобождение — не отказ от мира, а жизнь в мире с любовью к Богу (бхакти).', 'Верование — Карма/сансара');

hsNode('hs_gurus',    '10 Гуру\n(проводники)', 400, 310, 'hexagon', 18, '#c09860',
  'Десять гуру — духовные проводники, передававшие свет Бога от Нанака до Гобинд Сингха (1469–1708). Они не воплощения Бога, а люди, полностью реализовавшие единство с Ним. После 10-го гуру «Гуру Грантх Сахиб» стал вечным Гуру.', 'Гуру');
hsNode('hs_nanak',    'Гуру Нанак\n(1469–1539)', 250, 400, 'dot', 14, '#c09060',
  'Основатель сикхизма. Родился в Талванди (Пенджаб). В 1499 г. получил откровение: «Нет индусов, нет мусульман». Учил единству Бога, равенству людей, отказу от каст и ритуалов. Составил первые гимны (Джапджи).', 'Гуру — Нанак');
hsNode('hs_arjan',    'Гуру Арджан\n(1563–1606)', 400, 400, 'dot', 14, '#c09060',
  'Пятый гуру сикхов. Составил Ади Грантх (священное писание) в 1604 г. Построил Золотой Храм (Хармандир Сахиб) в Амритсаре. Замучен по приказу императора Джахангира — первый мученик сикхизма.', 'Гуру — Арджан');
hsNode('hs_gobind',   'Гуру Гобинд\nСингх (1666–1708)', 550, 400, 'dot', 14, '#c09060',
  'Десятый гуру сикхов. Основал Хальсу (1699), ввёл пять К. Установил, что после него живым гуру становится священный текст (Гуру Грантх Сахиб). Был поэтом, воином, философом.', 'Гуру — Гобинд Сингх');

hsNode('hs_granth',  'Гуру Грантх\nСахиб', 400, 500, 'hexagon', 16, '#a09070',
  'Священный текст сикхизма, почитаемый как живой Гуру. Состоит из 1430 страниц, 5864 гимнов (шабд). Написан на пенджаби (гурмукхи). Включает сочинения гуру, а также индуистских (Кабир, Равидас) и мусульманских (Фарид) святых.', 'Священный текст — Гуру Грантх Сахиб');

hsNode('hs_path',    'Путь\n(бхакти и сева)', 400, 610, 'hexagon', 16, '#b8a888',
  'Сикхский путь — активная жизнь в мире, а не отшельничество. Три принципа (Нанак): 1) Наам-джапо — повторение имени Бога, 2) Кират-каро — честный труд, 3) Ванд-чакко — делиться с другими. Центр — любовь к Богу (бхакти) и бескорыстное служение (сева).', 'Путь');
hsNode('hs_nam_japo', 'Наам-джапо\n(медитация\nна Имя)', 250, 710, 'dot', 12, '#a09060',
  'Наам-джапо — постоянное памятование Бога через повторение Его имени. Не механическая мантра, а сердечная медитация. Через наам душа очищается и соединяется с Богом. «Размышляй об Имени, и ты достигнешь совершенства» (Гуру Грантх Сахиб).', 'Практика — Наам-джапо');
hsNode('hs_kirat',   'Кират-каро\n(честный труд)', 400, 710, 'dot', 12, '#a09060',
  'Кират-каро — честный труд и жизнь честными средствами. Запрет на воровство, обман, ростовщичество. Сикх должен зарабатывать своим трудом, а не попрошайничать или эксплуатировать других. «Кто трудится и делится, тот знает путь» (Гуру Грантх Сахиб).', 'Практика — Кират-каро');
hsNode('hs_vand',    'Ванд-чакко\n(делиться с\nдругими)', 550, 710, 'dot', 12, '#a09060',
  'Ванд-чакко — делиться с нуждающимися частью своего дохода. Проявляется в системе лангар (общественная трапеза), севе (служение) и даане (пожертвования). «Поделиться с другими — высшая добродетель» (Гуру Грантх Сахиб).', 'Практика — Ванд-чакко');
hsNode('hs_khalsa',  'Хальса\n(община)', 550, 810, 'hexagon', 14, '#b0a070',
  'Хальса («Чистая») — военно-религиозная община сикхов, основанная Гобинд Сингхом в 1699 г. Члены хальсы принимают пять К, отказываются от кастовой системы, табака и алкоголя. Хальса — «армия Бога», защитница веры и слабых.', 'Община — Хальса');
hsNode('hs_mukti',   'Мукти\n(освобождение)', 250, 810, 'hexagon', 14, '#c8a878',
  'Освобождение (мукти) в сикхизме — слияние души с Богом через любовь и преданность. Достигается не аскезой, а жизнью в миру с постоянным памятованием Бога. Освобождённая душа пребывает в вечном блаженстве у стоп Бога (сач-кханд).', 'Цель — Мукти');

// Sikhism edges
hsEdge('hs_ek_onkar', 'hs_hukam',   C, 2.5, false);
hsEdge('hs_hukam',    'hs_srishti', CW, 1, false);
hsEdge('hs_hukam',    'hs_karma_s', CW, 1, false);
hsEdge('hs_hukam',    'hs_gurus',   CW, 1, false);
hsEdge('hs_gurus',    'hs_nanak',   CW, 1, false);
hsEdge('hs_gurus',    'hs_arjan',   CW, 1, false);
hsEdge('hs_gurus',    'hs_gobind',  CW, 1, false);
hsEdge('hs_gurus',    'hs_granth',  CW, 1, true);
hsEdge('hs_hukam',    'hs_path',    CW, 1.5, true);
hsEdge('hs_path',     'hs_nam_japo', CW, 1, false);
hsEdge('hs_path',     'hs_kirat',   CW, 1, false);
hsEdge('hs_path',     'hs_vand',    CW, 1, false);
hsEdge('hs_vand',     'hs_khalsa',  CW, 1, false);
hsEdge('hs_nam_japo', 'hs_mukti',   CW, 1, false);

// ─── ANANDA MARGA CREATION PHILOSOPHY ────────────────
var amNodeData = {};
var amNodes = [];
var amEdges = [];
function amNode(id, label, x, y, shape, size, color, desc) {
  var flat = label.replace(/\n/g, ' ');
  amNodes.push({ id, label: flat, x, y, shape, size, color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 }, font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: shape === 'star' ? '#fff' : '#bbb', strokeWidth: 0 }, title: flat + '\n' + desc, fixed: true });
  amNodeData[id] = { label: flat, category: 'Ананда Марга', description: desc };
}
function amEdge(from, to, color, width, dashes) {
  amEdges.push({ from, to, color: { color, opacity: 0.12 }, width: width * 0.6, dashes, title: '' });
}
var AG = '#b8a07a', AH = '#a08060', AI = '#c48a7a', AJ = '#8a7ab8', AK = '#7a9aba', AL = '#b8a8c8', AM = '#c8a878';
amNode('am_paramashiva',  'Парамашива\n(Высшее Сознание)', 600, 20, 'star', 24, AG,
  'Ниргуна-Брахма, Абсолютное Сознание без атрибутов. Источник всего творения, transcending пространства и времени.');
amNode('am_shiva_shakti', 'Шива-Шакти\n(единство)', 600, 100, 'hexagon', 20, AH,
  'Первичная двойственность: Шива (сознание, пуруша) и Шакти (энергия, пракрити). Их единство — основа проявления вселенной.');
amEdge('am_paramashiva', 'am_shiva_shakti', AH, 2.5, false);

amNode('am_saguna_brahma','Сагуна Брахма\n(с атрибутами)', 600, 180, 'hexagon', 18, AM,
  'Сагуна Брахма — Брахма с атрибутами, творческий аспект Абсолюта. В отличие от Ниргуна Брахмы (Парамашивы), Сагуна Брахма проявляет качества (гуны) и создаёт вселенную через вибрацию (спанда). Это первая стадия нисхождения Абсолюта в проявленный мир.');
amEdge('am_shiva_shakti', 'am_saguna_brahma', AM, 2, false);

amNode('am_mahattattva', 'Махаттаттва\n(космич. эго)', 600, 260, 'diamond', 18, AI,
  'Первый принцип (таттва) — космическое «Я ЕСМЬ». Из него разворачиваются все последующие категории бытия.');
amEdge('am_saguna_brahma', 'am_mahattattva', AI, 2, true);

amNode('am_ahamkara', 'Ахамкара\n(принцип эго)', 600, 340, 'diamond', 18, AI,
  'Индивидуальное эго — принцип самоотождествления, разделяющий субъект и объект.');
amEdge('am_mahattattva', 'am_ahamkara', AI, 2, true);

amNode('am_buddhi',  'Буддхи\n(интеллект)', 420, 420, 'diamond', 18, AJ,
  'Высший интеллект — интуитивное различение, способность постигать истину.');
amNode('am_manas',   'Манас\n(ум)', 780, 420, 'diamond', 18, AJ,
  'Низший ум — восприятие через органы чувств, обработка ощущений и желаний.');
amEdge('am_ahamkara', 'am_buddhi', AJ, 1.5, true);
amEdge('am_ahamkara', 'am_manas',  AJ, 1.5, true);

amNode('am_tanmatra',  'Танматры\n(5 тонких)', 420, 510, 'diamond', 18, AK,
  'Пять тонких сущностей: звук (шабда), прикосновение (спарша), форма (рупа), вкус (раса), запах (гандха).');
amNode('am_mahabhuta', 'Махабхуты\n(5 стихий)', 780, 510, 'diamond', 18, AK,
  'Пять грубых элементов: эфир (акаша), воздух (ваю), огонь (агни), вода (апас), земля (притхиви).');
amEdge('am_manas', 'am_tanmatra',  AK, 1.5, true);
amEdge('am_manas', 'am_mahabhuta', AK, 1.5, true);

amNode('am_prakriti',  'Пракрити\n(природа)', 600, 420, 'diamond', 18, AL,
  'Первичная природа — три гуны: саттва (равновесие), раджас (активность), тамас (инертность). Энергийный аспект Шакти.');
amNode('am_sattva',   'Саттва',  510, 510, 'diamond', 14, '#c8d8a8',
  'Гуна равновесия, ясности и гармонии — основа знания и света.');
amNode('am_rajas',    'Раджас',  600, 510, 'diamond', 14, '#d8a878',
  'Гуна активности, страсти и движения — основа действий и перемен.');
amNode('am_tamas',    'Тамас',   690, 510, 'diamond', 14, '#a08878',
  'Гуна инертности, тьмы и невежества — основа стабильности и материи.');
amEdge('am_ahamkara', 'am_prakriti', AL, 1.5, true);
amEdge('am_prakriti', 'am_sattva', '#c8d8a8', 1, true);
amEdge('am_prakriti', 'am_rajas',  '#d8a878', 1, true);
amEdge('am_prakriti', 'am_tamas',  '#a08878', 1, true);

amNode('am_prana', 'Прана\n(жизненная сила)', 600, 600, 'diamond', 18, '#c8a878',
  'Жизненная энергия — связующее звено между умом и материей, проявляется как 10 ваю (жизненных токов).');
amEdge('am_tanmatra',  'am_prana', '#c8a878', 1.5, true);
amEdge('am_mahabhuta', 'am_prana', '#c8a878', 1.5, true);
amEdge('am_sattva',    'am_prana', '#c8a878', 1, true);
amEdge('am_rajas',     'am_prana', '#c8a878', 1, true);
amEdge('am_tamas',     'am_prana', '#c8a878', 1, true);

amNode('am_jiva',   'Джива\n(душа)', 600, 680, 'diamond', 18, '#b8a8c8',
  'Индивидуальная душа в материальном теле — искра Парамашивы, покрытая пятью оболочками (кошами).');
amEdge('am_prana', 'am_jiva', '#b8a8c8', 1.5, true);

amNode('am_moksha', 'Мокша\n(освобождение)', 600, 760, 'diamond', 18, '#c8a070',
  'Освобождение от сансары — возвращение дживы к Парамашиве через садхану, преодоление ахамкары и слияние с Абсолютом.');
amEdge('am_jiva', 'am_moksha', '#c8a070', 1.5, true);

amNode('am_brahmachakra', 'Брахмачакра\n(цикл)', 600, 850, 'square', 16, '#7a9aba',
  'Космический цикл: из Парамашивы — проявление (сришти) через нисхождение сознания в материю, затем возвращение (пратисанчара) через эволюцию обратно к Источнику.');
amEdge('am_moksha', 'am_brahmachakra', '#7a9aba', 1, true);
var CWd = 'rgba(255,255,255,0.06)';
amEdge('am_brahmachakra', 'am_paramashiva', CWd, 1, false);

// ─── ВТОРОЕ ДРЕВО: ТРИМУРТИ ──────────────────────────
const tNodeData = {};
const tNodes = [];
const tEdges = [];

function tNode(id, label, x, y, color, desc) {
  const flat = label.replace(/\n/g, ' ');
  tNodes.push({
    id, label: flat, x, y,
    shape: id === 'ht_brahman' ? 'star' : (id === 'ht_trimurti' ? 'hexagon' : 'dot'),
    size: id === 'ht_brahman' ? 24 : (id === 'ht_trimurti' ? 20 : 14),
    color: { background: color, border: '#ffffff', opacity: id === 'ht_brahman' ? 1 : 0.85 },
    font: { size: (id === 'ht_brahman' || id === 'ht_trimurti') ? 10 : 9, color: '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc,
    fixed: true,
  });
  tNodeData[id] = { label: flat, category: 'Тримурти', description: desc };
}

function tEdge(from, to, color, dashes, title, details) {
  tEdges.push({
    from, to,
    color: { color, opacity: 0.12 },
    width: 1,
    dashes,
    title: title || '',
    details: details || '',
  });
}

function tMarriage(a, b) {
  tEdges.push({
    from: a, to: b,
    color: { color: '#ffcc88', opacity: 0.12 },
    width: 1,
  });
}

tNode('ht_brahman',  'Парабрахман\n(Единый)', 600, 40, '#b8a07a',
  'Единый Абсолют, не имеющий формы. Проявляет себя как Тримурти — три аспекта: творение, сохранение, разрушение.');

tNode('ht_trimurti', 'Тримурти\n(триединство)', 600, 120, '#a08060',
  'Триединый аспект Божественного: Брахма (творец), Вишну (хранитель), Шива (разрушитель). Равные ипостаси единого.');


tNode('ht_brahma',   'Брахма\n(творец)', 350, 230, '#c07050',
  'Бог-творец, первый из Тримурти. Рождается из лотоса, растущего из пупа Вишну. Создаёт вселенную, богов, людей и демонов в начале каждой кальпы. Его шакти — Сарасвати. Его духовные сыновья — Праджапати и риши.');
tNode('ht_vishnu',   'Вишну\n(хранитель)', 600, 230, '#4070c0',
  'Бог-хранитель, второй из Тримурти. Поддерживает вселенную и космический порядок (дхарму). С приходом адхармы нисходит как аватара (Рама, Кришна, Нарасимха и др.). Его шакти — Лакшми. Возлежит на змее Шеше в Молочном океане.');
tNode('ht_shiva',    'Шива\n(разрушитель)', 850, 230, '#c06040',
  'Бог-разрушитель, третий из Тримурти. Разрушает вселенную в конце цикла для нового творения. Великий йогин, владыка аскезы. Его шакти — Парвати. Живёт на Кайласе, его вахана — бык Нанди.');

tNode('ht_dattatreya','Дататтрея', 600, 310, '#a08060',
  'Единая аватара Тримурти: три бога Брахма, Вишну и Шива родились как Дататтрея — сын риши Атри и Анасуйи. Изображается с тремя головами (Брахма, Вишну, Шива), символизируя единство трёх аспектов Бога. Почитается как «гуру гуру» — учитель всех учителей.');

// Риши (духовные сыновья и ученики)
tNode('ht_narada',   'Нарада', 260, 290, '#908060',
  'Божественный мудрец, сын Брахмы. Путешествует между мирами, распространяет вести и песни. Играет ключевую роль в «Рамаяне», «Махабхарате» и Пуранах. Изобретатель вины (музыкального инструмента) и отец бхакти-йоги.');

// Линия от Брахмы к людям
tNode('ht_marici_t',  'Маричи', 380, 290, '#a09070',
  'Первый из Праджапати, «сияющий». Рождён из ума Брахмы. Отец Кашьяпы — прародителя всех существ. Через него проходит линия от богов к людям.');
tNode('ht_kashyapa_t','Кашьяпа', 380, 340, '#a09070',
  'Сын Маричи, внук Брахмы. Прародитель богов (Адитьев), демонов (Дайтьев, Данавов), змеев (Нагов), птиц (Гаруды) и людей. Муж 13 дочерей Дакши.');
tNode('ht_surya_t',   'Сурья\n(Вивасван)', 380, 390, '#a09070',
  'Бог Солнца, один из Адитьев, сын Кашьяпы и Адити. Отец Вайвасваты Ману (прародителя людей) и Ямы (бога смерти). Даёт свет и жизнь всему миру.');
tNode('ht_manu_t',    'Вайвасвата\nМану', 380, 450, '#a09070',
  'Седьмой Ману, сын Сурьи (Вивасвана). Прародитель человечества в текущей манвантаре. Спасается от потопа в лодке, запряжённой Вишну-рыбой (Матсья). Отец Икшваку.');
tNode('ht_ikshvaku_t','Икшваку', 380, 510, '#a09070',
  'Первый царь Земли, сын Вайвасваты Ману. Основатель Солнечной династии (Сурьяванша). Родоначальник царей Айодхьи, к которым принадлежит Рама.');
tNode('ht_humans_t',  'Люди', 380, 570, '#a09070',
  'Человечество — потомки Икшваку и других сыновей Ману. Через Солнечную и Лунную династии все люди связаны с богами. Согласно индуизму, каждый человек несёт божественную искру (Атман).');

tNode('ht_bhrigu',   'Бхригу', 210, 340, '#908060',
  'Один из семи великих риши (Саптариши), сын Брахмы. Известен тем, что испытал каждого из Тримурти: пнул Брахму (спящего), проклял Шиву (за отвержение) и признал Вишну высшим. Основатель школы астрологии.');

tNode('ht_atri',     'Атри', 540, 370, '#a08070',
  'Один из семи великих риши (Саптариши). Сын Брахмы, рождённый из его глаза. Супруг Анасуйи, отец Дататтреи. Символ аскезы и знания. Считается автором многих гимнов Ригведы.');
tNode('ht_anasuya',  'Анасуя', 660, 370, '#a08070',
  'Супруга риши Атри, мать Дататтреи. Известна своей целомудренностью и преданностью («пативрата»). Благословила трёх богов Тримурти, дав им рождение как единый сын Дататтрея. Одна из величайших женщин-подвижниц в индуизме.');

// Ученики Дататтреи
tNode('ht_alarka',   'Аларка', 520, 430, '#807060',
  'Демон (асура), обращённый Дататтреей. Изначально был змеем-людоедом, но получил от Дататтреи знание и освобождение. Символ того, что даже падшие существа могут достичь мудрости через гуру.');
tNode('ht_kartavirya','Картавирья\nАрджуна', 680, 430, '#807060',
  'Царь из Лунной династии (Хайхая), получивший от Дататтреи дар тысячи рук (Сахасрабаху). Правил миром, победил Равану. Его гордыня привела к гибели от Парашурамы. Один из самых могущественных царей в Пуранах.');

tNode('ht_saraswati','Сарасвати', 280, 370, '#c88890',
  'Богиня знания, музыки, искусств и мудрости. Супруга Брахмы, его творческая энергия (шакти). Изображается с виной (струнный инструмент) и Ведами. Символ чистоты и учёности. Река Сарасвати — её земное воплощение.');
tNode('ht_lakshmi',  'Лакшми', 600, 370, '#d0a060',
  'Богиня процветания, богатства, удачи и красоты. Супруга Вишну, его энергия сохранения. Родилась из Молочного океана при пахтанье. Изображается с лотосами, золотыми монетами. Её аватары — Сита (жена Рамы) и Рукмини (жена Кришны).');
tNode('ht_parvati',  'Парвати', 850, 370, '#d07070',
  'Богиня-мать, супруга Шивы. Мать Ганеши и Картикеи. В гневных формах — Дурга (воительница) и Кали (разрушительница тьмы). В мягкой форме — богиня любви и семейного счастья. Символ преданности мужу и женской силы.');

tNode('ht_ganesha',  'Ганеша', 740, 450, '#c08040',
  'Бог мудрости, знания и благополучия. Первородный сын Шивы и Парвати. С головой слона (потерял человеческую в гневе Шивы, заменена слоновьей). Почитается в начале всех начинаний. Устранитель препятствий (Вигхнешвара). Вахана — крыса.');
tNode('ht_kartikeya','Картикея', 920, 450, '#c08040',
  'Бог войны, второй сын Шивы и Парвати. Предводитель небесного войска (сенапати). Рождён для уничтожения демона Тараки. В Южной Индии известен как Муруган или Сканда. Его вахана — павлин, оружие — копьё (вель).');

tNode('ht_creation', 'Творение\n(вселенная)', 350, 450, '#c89870',
  'Проявленная вселенная, созданная Брахмой в начале каждой кальпы. Включает три мира (трилока): небеса (сварга), землю (бху) и подземный мир (патала). Циклы творения и разрушения (кальпы) длятся миллиарды лет.');
tNode('ht_preserve', 'Сохранение\n(дхарма)', 600, 450, '#70a0c0',
  'Поддержание космического порядка (дхармы) через аватары Вишну, которые нисходят в эпохи беззакония. Десять основных аватар (дашаватара): Матсья, Курма, Вараха, Нарасимха, Вамана, Парашурама, Рама, Кришна, Будда, Калки.');
tNode('ht_destroy',  'Разрушение\n(пралая)', 800, 450, '#c07060',
  'Растворение вселенной (пралая) в конце космического цикла. Шива разрушает всё танцем (тандава), после чего наступает период покоя до нового творения. В индуизме разрушение — не уничтожение, а необходимое обновление.');

// Рёбра
tEdge('ht_brahman', 'ht_trimurti', '#b8a07a', false, 'Единый проявляет себя как Тримурти', 'Парабрахман → Тримурти: единый Абсолют в трёх аспектах.');
tEdge('ht_trimurti', 'ht_brahma', '#c07050', false, 'Аспект творения', 'Тримурти → Брахма: аспект творца.');
tEdge('ht_trimurti', 'ht_vishnu', '#4070c0', false, 'Аспект сохранения', 'Тримурти → Вишну: аспект хранителя.');
tEdge('ht_trimurti', 'ht_shiva', '#c06040', false, 'Аспект разрушения', 'Тримурти → Шива: аспект разрушителя.');

tEdge('ht_brahma', 'ht_dattatreya', '#c07050', true, 'Брахма родился как Дататтрея', 'Брахма (аспект творения) воплотился как Дататтрея в роду Атри.');
tEdge('ht_vishnu', 'ht_dattatreya', '#4070c0', true, 'Вишну родился как Дататтрея', 'Вишну (аспект сохранения) воплотился как Дататтрея в роду Атри.');
tEdge('ht_shiva', 'ht_dattatreya', '#c06040', true, 'Шива родился как Дататтрея', 'Шива (аспект разрушения) воплотился как Дататтрея в роду Атри.');

tEdge('ht_brahma', 'ht_narada', '#908060', true, 'Духовный сын Брахмы', 'Нарада — божественный мудрец, рождённый из мысли Брахмы.');
tEdge('ht_brahma', 'ht_bhrigu', '#908060', true, 'Духовный сын Брахмы', 'Бхригу — один из Саптариши, сын Брахмы, испытавший Тримурти.');

// Линия к людям
tEdge('ht_brahma', 'ht_marici_t', '#a09070', false, 'Сын Брахмы', 'Маричи — первый из Праджапати, рождён из ума Брахмы.');
tEdge('ht_marici_t', 'ht_kashyapa_t', '#a09070', false, 'Сын Маричи', 'Кашьяпа — сын Маричи, прародитель всех существ.');
tEdge('ht_kashyapa_t', 'ht_surya_t', '#a09070', false, 'Сын Кашьяпы и Адити', 'Сурья (Вивасван) — бог Солнца, один из Адитьев.');
tEdge('ht_surya_t', 'ht_manu_t', '#a09070', false, 'Сын Сурьи', 'Вайвасвата Ману — седьмой Ману, сын Сурьи.');
tEdge('ht_manu_t', 'ht_ikshvaku_t', '#a09070', false, 'Сын Ману', 'Икшваку — первый царь, основатель Солнечной династии.');
tEdge('ht_ikshvaku_t', 'ht_humans_t', '#a09070', false, 'Прародитель людей', 'От Икшваку произошли люди и цари Айодхьи.');

tMarriage('ht_brahma', 'ht_saraswati');
tMarriage('ht_vishnu', 'ht_lakshmi');
tMarriage('ht_shiva', 'ht_parvati');

tEdge('ht_brahma', 'ht_creation', '#c07050', false, 'Брахма творит вселенную', 'Творение — результат действия Брахмы.');
tEdge('ht_vishnu', 'ht_preserve', '#4070c0', false, 'Вишну хранит дхарму', 'Сохранение — функция Вишну.');
tEdge('ht_shiva', 'ht_destroy', '#c06040', false, 'Шива разрушает в пралайе', 'Разрушение — функция Шивы.');
tEdge('ht_parvati', 'ht_ganesha', '#c08040', false, 'Сын Шивы и Парвати', 'Ганеша — сын Шивы и Парвати.');
tEdge('ht_parvati', 'ht_kartikeya', '#c08040', false, 'Сын Шивы и Парвати', 'Картикея — сын Шивы и Парвати.');

tMarriage('ht_atri', 'ht_anasuya');
tEdge('ht_atri', 'ht_dattatreya', '#a08070', true, 'Отец Дататтреи', 'Атри — земной отец Дататтреи.');
tEdge('ht_anasuya', 'ht_dattatreya', '#a08070', true, 'Мать Дататтреи', 'Анасуя — земная мать Дататтреи.');

tEdge('ht_dattatreya', 'ht_alarka', '#807060', false, 'Ученик Дататтреи', 'Аларка — обращённый демон, ученик Дататтреи.');
tEdge('ht_dattatreya', 'ht_kartavirya', '#807060', false, 'Ученик Дататтреи', 'Картавирья Арджуна — царь-тысячерукий, ученик Дататтреи.');

// ─── TRIMURTI NETWORK ─────────────────────────────────
tEdges.forEach(function(e) { if (!e.smooth) e.smooth = { type: 'continuous' }; });
loadPositions('h_trimurti', tNodes);
const tEdgesDataSet = new vis.DataSet(tEdges);
const tNodesDataSet = new vis.DataSet(tNodes);
const tOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
const hierarchiesNetwork2 = new vis.Network(
  document.getElementById('hierarchies-network-2'),
  { nodes: tNodesDataSet, edges: tEdgesDataSet },
  tOptions
);
hierarchiesNetwork2.on('click', function(params) {
  if (params.nodes.length > 0) {
    const d = tNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork2.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork2.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { tNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork2.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { tNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork2.getPositions();
  if (allPos) localStorage.setItem('h_trimurti', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_trimurti');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (tNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) tNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── GENEALOGY NETWORK ───────────────────────────────
hEdges.forEach(function(e) { if (!e.smooth) e.smooth = { type: 'continuous' }; });
loadPositions('h_genealogy', hNodes);
const hEdgesDataSet = new vis.DataSet(hEdges);
const hNodesDataSet = new vis.DataSet(hNodes);
const hOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 12, max: 32 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
const hierarchiesNetwork = new vis.Network(
  document.getElementById('hierarchies-network'),
  { nodes: hNodesDataSet, edges: hEdgesDataSet },
  hOptions
);
hierarchiesNetwork.on('click', function(params) {
  if (params.nodes.length > 0) {
    const d = hNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { hNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { hNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork.getPositions();
  if (allPos) localStorage.setItem('h_genealogy', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_genealogy');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (hNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) hNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── ТРЕТЬЕ ДРЕВО: АВРААМИЧЕСКОЕ ────────────────────
const aNodeData = {};
const aNodes = [];
const aEdges = [];

function aNode(id, label, x, y, shape, size, color, desc) {
  const flat = label.replace(/\n/g, ' ');
  aNodes.push({
    id, label: flat, x, y, shape, size,
    color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 },
    font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: shape === 'star' ? '#fff' : '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc,
    fixed: true,
  });
  aNodeData[id] = { label: flat, category: 'Авраамическое древо', description: desc };
}
function aEdge(from, to, color, dashes, title, details) {
  aEdges.push({ from, to, color: { color, opacity: 0.12 }, width: 1, dashes, title: title || '', details: details || '' });
}
function aMarriage(a, b) {
  aEdges.push({ from: a, to: b, color: { color: '#ffcc88', opacity: 0.12 }, width: 1 });
}

aNode('ab_god', 'Бог\n(Яхве)', 600, 40, 'star', 24, '#c8a070',
  'Единый Бог, Творец неба и земли. В христианстве — Святая Троица. В исламе — Аллах. Источник всех пророчеств и Писаний.');
aNode('ab_adam', 'Адам', 520, 110, 'hexagon', 18, '#a09070',
  'Первый человек, созданный Богом из праха (Быт. 2:7). Прародитель человечества.');
aNode('ab_eve', 'Ева', 630, 110, 'dot', 12, '#b09080',
  'Первая женщина, мать всех живущих (Быт. 3:20).');
aNode('ab_cain', 'Каин', 360, 180, 'dot', 10, '#907060',
  'Первенец Адама. Земледелец. Убил брата Авеля (Быт. 4:8).');
aNode('ab_abel', 'Авель', 480, 180, 'dot', 10, '#809070',
  'Второй сын Адама. Пастух. Убит Каином. Его жертва угодна Богу.');
aNode('ab_seth', 'Сиф', 600, 180, 'dot', 14, '#a09070',
  'Третий сын Адама (Быт. 4:25). Через него линия праведников до Ноя.');
aNode('ab_enosh', 'Енос', 600, 240, 'dot', 12, '#a09070',
  'Сын Сифа (Быт. 4:26). При нём начали призывать имя Господа.');
aNode('ab_kenan', 'Каинан', 600, 290, 'dot', 12, '#a09070',
  'Сын Еноса (Быт. 5:9).');
aNode('ab_mahalalel', 'Малелеил', 600, 340, 'dot', 12, '#a09070',
  'Сын Каинана (Быт. 5:12).');
aNode('ab_jared', 'Иаред', 600, 390, 'dot', 12, '#a09070',
  'Сын Малелеила (Быт. 5:15). Отец Еноха.');
aNode('ab_enoch', 'Енох', 600, 440, 'dot', 14, '#b0a080',
  'Сын Иареда (Быт. 5:18). Ходил пред Богом, взят живым на небо.');
aNode('ab_methuselah', 'Мафусал', 600, 490, 'dot', 12, '#a09070',
  'Сын Еноха (Быт. 5:21). Прожил 969 лет.');
aNode('ab_lamech', 'Ламех', 600, 540, 'dot', 12, '#a09070',
  'Сын Мафусала (Быт. 5:25). Отец Ноя.');
aNode('ab_noah', 'Ной', 600, 590, 'hexagon', 18, '#a09870',
  'Праведник, спасшийся от потопа (Быт. 6–9). Построил ковчег.');
aNode('ab_shem', 'Сим', 500, 660, 'dot', 14, '#a09070',
  'Сын Ноя (Быт. 5:32). Благословлён. Предок Авраама и Иисуса.');
aNode('ab_ham', 'Хам', 600, 660, 'dot', 12, '#907060',
  'Сын Ноя, проклят за непочтение к отцу.');
aNode('ab_japheth', 'Иафет', 700, 660, 'dot', 12, '#909070',
  'Сын Ноя, благословлён.');
aNode('ab_arpachshad', 'Арфаксад', 500, 720, 'dot', 12, '#a09070',
  'Сын Сима (Быт. 11:10).');
aNode('ab_shelah', 'Сала', 580, 720, 'dot', 12, '#a09070',
  'Сын Арфаксада (Быт. 11:12).');
aNode('ab_eber', 'Евер', 660, 720, 'dot', 14, '#a09070',
  'Сын Салы (Быт. 11:14). Праотец евреев.');
aNode('ab_peleg', 'Фалек', 500, 780, 'dot', 12, '#a09070',
  'Сын Евера (Быт. 11:16). При нём земля разделена.');
aNode('ab_reu', 'Рагав', 580, 780, 'dot', 12, '#a09070',
  'Сын Фалека (Быт. 11:18).');
aNode('ab_serug', 'Серух', 660, 780, 'dot', 12, '#a09070',
  'Сын Рагава (Быт. 11:20).');
aNode('ab_nahor', 'Нахор', 740, 780, 'dot', 12, '#a09070',
  'Сын Серуха (Быт. 11:22). Дед Авраама.');
aNode('ab_terah', 'Фарра', 600, 840, 'hexagon', 16, '#a09070',
  'Отец Авраама (Быт. 11:26). Вышел из Ура в Харран.');
aNode('ab_abraham', 'Авраам', 520, 910, 'hexagon', 18, '#b09870',
  'Отец веры (Быт. 12–25). Завет с Богом. Отец Исаака и Измаила.');
aNode('ab_sarah', 'Сарра', 630, 910, 'dot', 12, '#b08070',
  'Жена Авраама (Быт. 17:15). Мать Исаака.');
aNode('ab_hagar', 'Агарь', 380, 910, 'dot', 10, '#907060',
  'Рабыня Сарры, мать Измаила (Быт. 16).');
aNode('ab_ishmael', 'Измаил', 380, 980, 'dot', 14, '#a08870',
  'Сын Авраама и Агари (Быт. 16:15). Предок арабов. В исламе — пророк.');
aNode('ab_isaac', 'Исаак', 530, 980, 'hexagon', 16, '#b09870',
  'Сын Авраама и Сарры (Быт. 21:3). Второй патриарх.');
aNode('ab_rebekah', 'Ревекка', 650, 980, 'dot', 12, '#b08070',
  'Жена Исаака (Быт. 24). Мать Иакова.');
aNode('ab_jacob', 'Иаков\n(Израиль)', 540, 1050, 'hexagon', 16, '#b09870',
  'Сын Исаака (Быт. 25:26). Отец 12 колен Израиля.');
aNode('ab_leah', 'Лия', 460, 1050, 'dot', 12, '#b08070',
  'Первая жена Иакова (Быт. 29:23). Мать Иуды, Левия и других.');
aNode('ab_rachel', 'Рахиль', 640, 1050, 'dot', 12, '#b08070',
  'Вторая жена Иакова (Быт. 29:28). Мать Иосифа и Вениамина.');
aNode('ab_esau', 'Исав', 740, 1050, 'dot', 12, '#907060',
  'Сын Исаака (Быт. 25:25). Продал первородство.');
aNode('ab_judah', 'Иуда', 460, 1120, 'dot', 14, '#b09870',
  'Сын Иакова от Лии (Быт. 29:35). Царская линия: Давид → Иисус.');
aNode('ab_levi', 'Левий', 560, 1120, 'dot', 12, '#a09070',
  'Сын Иакова от Лии (Быт. 29:34). Священническая линия: Моисей, Аарон.');
aNode('ab_moses', 'Моисей', 670, 1120, 'dot', 14, '#b0a080',
  'Великий пророк (Исх. 2–Вт. 34). Вывел Израиль из Египта, получил Тору.');
aNode('ab_david', 'Давид', 510, 1190, 'hexagon', 16, '#b09870',
  'Царь Израиля (1 Цар. 16–3 Цар. 2). Псалмопевец. Обетование о вечном царстве.');
aNode('ab_bathsheba', 'Вирсавия', 630, 1190, 'dot', 12, '#b08070',
  'Жена Давида (2 Цар. 11). Мать Соломона. Ранее жена Урии Хеттеянина.');
aNode('ab_solomon', 'Соломон', 750, 1190, 'hexagon', 16, '#b09870',
  'Царь Израиля (3 Цар. 1–11). Сын Давида и Вирсавии. Построил Храм.');
aNode('ab_jesus', 'Иисус\nХристос', 530, 1260, 'hexagon', 18, '#c09870',
  'Мессия, Сын Божий (Новый Завет). Распят и воскрес. В исламе — пророк Иса.');
aNode('ab_muhammad', 'Мухаммад', 380, 1050, 'dot', 14, '#a08870',
  'Последний пророк ислама (570–632). Получил Коран.');

// Рёбра
aEdge('ab_god', 'ab_adam', '#c8a070', false, 'Создал Адама', 'Бог создал Адама из праха (Быт. 2:7).');
aEdge('ab_adam', 'ab_cain', '#a09070', false, 'Первенец', 'Первенец Адама (Быт. 4:1).');
aEdge('ab_adam', 'ab_abel', '#a09070', false, 'Второй сын', 'Второй сын Адама (Быт. 4:2).');
aEdge('ab_adam', 'ab_seth', '#a09070', false, 'Третий сын', 'Сиф вместо Авеля (Быт. 4:25).');
aEdge('ab_seth', 'ab_enosh', '#a09070', false, 'Сын Сифа', 'Енос — сын Сифа (Быт. 4:26).');
aEdge('ab_enosh', 'ab_kenan', '#a09070', false, 'Сын Еноса', 'Каинан — сын Еноса (Быт. 5:9).');
aEdge('ab_kenan', 'ab_mahalalel', '#a09070', false, 'Сын Каинана', 'Малелеил — сын Каинана (Быт. 5:12).');
aEdge('ab_mahalalel', 'ab_jared', '#a09070', false, 'Сын Малелеила', 'Иаред — сын Малелеила (Быт. 5:15).');
aEdge('ab_jared', 'ab_enoch', '#a09070', false, 'Сын Иареда', 'Енох — сын Иареда (Быт. 5:18).');
aEdge('ab_enoch', 'ab_methuselah', '#a09070', false, 'Сын Еноха', 'Мафусал — сын Еноха (Быт. 5:21).');
aEdge('ab_methuselah', 'ab_lamech', '#a09070', false, 'Сын Мафусала', 'Ламех — сын Мафусала (Быт. 5:25).');
aEdge('ab_lamech', 'ab_noah', '#a09070', false, 'Сын Ламеха', 'Ной — сын Ламеха (Быт. 5:28).');
aEdge('ab_noah', 'ab_shem', '#a09070', false, 'Сын Ноя', 'Сим — сын Ноя (Быт. 5:32).');
aEdge('ab_noah', 'ab_ham', '#907060', false, 'Сын Ноя', 'Хам — сын Ноя (Быт. 5:32).');
aEdge('ab_noah', 'ab_japheth', '#a09070', false, 'Сын Ноя', 'Иафет — сын Ноя (Быт. 5:32).');
aEdge('ab_shem', 'ab_arpachshad', '#a09070', false, 'Сын Сима', 'Арфаксад — сын Сима (Быт. 11:10).');
aEdge('ab_arpachshad', 'ab_shelah', '#a09070', false, 'Сын Арфаксада', 'Сала — сын Арфаксада (Быт. 11:12).');
aEdge('ab_shelah', 'ab_eber', '#a09070', false, 'Сын Салы', 'Евер — сын Салы (Быт. 11:14).');
aEdge('ab_eber', 'ab_peleg', '#a09070', false, 'Сын Евера', 'Фалек — сын Евера (Быт. 11:16).');
aEdge('ab_peleg', 'ab_reu', '#a09070', false, 'Сын Фалека', 'Рагав — сын Фалека (Быт. 11:18).');
aEdge('ab_reu', 'ab_serug', '#a09070', false, 'Сын Рагава', 'Серух — сын Рагава (Быт. 11:20).');
aEdge('ab_serug', 'ab_nahor', '#a09070', false, 'Сын Серуха', 'Нахор — сын Серуха (Быт. 11:22).');
aEdge('ab_nahor', 'ab_terah', '#a09070', false, 'Сын Нахора', 'Фарра — сын Нахора (Быт. 11:24).');
aEdge('ab_terah', 'ab_abraham', '#a09070', false, 'Сын Фарры', 'Авраам — сын Фарры (Быт. 11:26).');
aEdge('ab_abraham', 'ab_ishmael', '#a09070', false, 'Сын Авраама от Агари', 'Измаил — сын Авраама (Быт. 16:15).');
aEdge('ab_abraham', 'ab_isaac', '#a09070', false, 'Сын Авраама от Сарры', 'Исаак — сын Авраама (Быт. 21:3).');
aEdge('ab_isaac', 'ab_jacob', '#a09070', false, 'Сын Исаака', 'Иаков — сын Исаака (Быт. 25:26).');
aEdge('ab_isaac', 'ab_esau', '#907060', false, 'Сын Исаака', 'Исав — сын Исаака (Быт. 25:25).');
aEdge('ab_jacob', 'ab_levi', '#a09070', false, 'Сын Иакова от Лии', 'Левий — третий сын Иакова (Быт. 29:34).');
aEdge('ab_jacob', 'ab_judah', '#a09070', false, 'Сын Иакова от Лии', 'Иуда — четвёртый сын Иакова (Быт. 29:35).');
aEdge('ab_levi', 'ab_moses', '#a09070', true, 'Потомок Левия', 'Моисей — из колена Левиина (Исх. 2:1).');
aEdge('ab_judah', 'ab_david', '#a09070', true, 'Потомок Иуды', 'Давид — из колена Иудина (Руфь 4:18-22).');
aEdge('ab_david', 'ab_solomon', '#a09070', false, 'Сын Давида и Вирсавии', 'Соломон — сын Давида (2 Цар. 12:24).');
aEdge('ab_leah', 'ab_judah', '#a09070', false, 'Сын Лии', 'Иуда — сын Лии (Быт. 29:35).');
aEdge('ab_bathsheba', 'ab_solomon', '#a09070', false, 'Сын Вирсавии', 'Соломон — сын Вирсавии (2 Цар. 12:24).');
aEdge('ab_solomon', 'ab_jesus', '#a09070', true, 'Потомок Соломона', 'Иисус — из дома Давидова по Матфею (Мф. 1:1-17).');
aEdge('ab_ishmael', 'ab_muhammad', '#a09070', true, 'Потомок Измаила', 'Мухаммад — из потомков Измаила (исламская традиция).');

aMarriage('ab_adam', 'ab_eve');
aMarriage('ab_abraham', 'ab_sarah');
aEdge('ab_abraham', 'ab_hagar', '#907060', true, 'Наложница', 'Агарь — египетская рабыня Сарры (Быт. 16).');
aMarriage('ab_isaac', 'ab_rebekah');
aMarriage('ab_jacob', 'ab_leah');
aMarriage('ab_jacob', 'ab_rachel');
aMarriage('ab_david', 'ab_bathsheba');

aEdges.forEach(function(e) { if (!e.smooth) e.smooth = { type: 'continuous' }; });

loadPositions('h_abrahamic', aNodes);
const aEdgesDataSet = new vis.DataSet(aEdges);
const aNodesDataSet = new vis.DataSet(aNodes);

const aOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};

const hierarchiesNetwork3 = new vis.Network(
  document.getElementById('hierarchies-network-3'),
  { nodes: aNodesDataSet, edges: aEdgesDataSet },
  aOptions
);

hierarchiesNetwork3.on('click', function(params) {
  if (params.nodes.length > 0) {
    const d = aNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label;
    nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none';
    panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork3.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork3.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { aNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork3.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { aNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork3.getPositions();
  if (allPos) localStorage.setItem('h_abrahamic', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_abrahamic');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (aNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) aNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── NETWORK 4: JAINISM ──────────────────────────────────────
loadPositions('h_jainism', hjNodes);
const hjEdgesDataSet = new vis.DataSet(hjEdges);
const hjNodesDataSet = new vis.DataSet(hjNodes);
const hjOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
const hierarchiesNetwork4 = new vis.Network(
  document.getElementById('hierarchies-network-4'),
  { nodes: hjNodesDataSet, edges: hjEdgesDataSet },
  hjOptions
);
hierarchiesNetwork4.on('click', function(params) {
  if (params.nodes.length > 0) {
    const d = hjNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork4.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork4.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { hjNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork4.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { hjNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork4.getPositions();
  if (allPos) localStorage.setItem('h_jainism', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_jainism');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (hjNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) hjNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── NETWORK 5: SIKHISM ──────────────────────────────────────
loadPositions('h_sikhism', hsNodes);
const hsEdgesDataSet = new vis.DataSet(hsEdges);
const hsNodesDataSet = new vis.DataSet(hsNodes);
const hsOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
const hierarchiesNetwork5 = new vis.Network(
  document.getElementById('hierarchies-network-5'),
  { nodes: hsNodesDataSet, edges: hsEdgesDataSet },
  hsOptions
);
hierarchiesNetwork5.on('click', function(params) {
  if (params.nodes.length > 0) {
    const d = hsNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork5.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork5.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { hsNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork5.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { hsNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork5.getPositions();
  if (allPos) localStorage.setItem('h_sikhism', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_sikhism');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (hsNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) hsNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── NETWORK 6: ANANDA MARGA ─────────────────────────────
loadPositions('h_ananda_marga', amNodes);
var amEdgesDataSet = new vis.DataSet(amEdges);
var amNodesDataSet = new vis.DataSet(amNodes);
var amOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
var hierarchiesNetwork6 = new vis.Network(
  document.getElementById('hierarchies-network-6'),
  { nodes: amNodesDataSet, edges: amEdgesDataSet },
  amOptions
);
hierarchiesNetwork6.on('click', function(params) {
  if (params.nodes.length > 0) {
    var d = amNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork6.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork6.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { amNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork6.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { amNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork6.getPositions();
  if (allPos) localStorage.setItem('h_ananda_marga', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_ananda_marga');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (amNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) amNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── THEOSOPHY CREATION PHILOSOPHY ────────────────────
var thNodeData = {};
var thNodes = [];
var thEdges = [];
function thNode(id, label, x, y, shape, size, color, desc) {
  var flat = label.replace(/\n/g, ' ');
  thNodes.push({ id: 'th_' + id, label: flat, x: x, y: y, shape: shape, size: size, color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 }, font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: '#bbb', strokeWidth: 0 }, title: flat + '\n' + desc, fixed: true });
  thNodeData['th_' + id] = { label: flat, category: 'Теософия', description: desc };
}
function thEdge(from, to, color, width, dashes) {
  thEdges.push({ from: 'th_' + from, to: 'th_' + to, color: { color: color, opacity: 0.12 }, width: width * 0.6, dashes: dashes, title: '' });
}
var TG = '#b8a07a', TH = '#a08060', TI = '#9a8ac8', TJ = '#b08070', TK = '#7a9aba', TL = '#b8a8c8', TM = '#c8a878';
thNode('absolute',   'Абсолют\n(Парабрахман)',      600, 20,  'star',   24, TG,
  'Непроявленный Абсолют, Единая Реальность, бескачественный и запредельный. Источник всех миров и сознаний.');
thNode('logos',      'Логос\n(Три Логоса)',         600, 100, 'hexagon',22, TH,
  'Первая троичная дифференциация Абсолюта: Первый (Непроявленный), Второй (Проявленный) и Третий (Творческий) Логосы.');
thEdge('absolute', 'logos', TH, 2.5, false);

thNode('adi',        'Ади-план\n(Божественный)',    600, 200, 'hexagon',18, TI,
  'Высший план бытия, сфера Арупа (бесформенного) — чистого духа, первая эманация Логоса.');
thEdge('logos', 'adi', TI, 2, false);

thNode('anupadaka',  'Анупадака\n(Монадический)',   600, 290, 'hexagon',18, TI,
  'План монад — единичных искр Божественного, каждая из которых проходит эволюцию через низшие планы.');
thNode('nirvana',    'Нирвана\n(Духовный)',         400, 380, 'hexagon',16, TI,
  'План чистой духовности, состояние единства с Абсолютом без форм.');
thNode('buddhi',     'Буддхи\n(Интуитивный)',       800, 380, 'hexagon',16, TI,
  'План интуиции и любви-мудрости, первый проводник монады.');
thEdge('adi', 'anupadaka', TI, 1.5, false);
thEdge('anupadaka', 'nirvana', TI, 1.5, true);
thEdge('anupadaka', 'buddhi',  TI, 1.5, true);

thNode('mental',     'Ментальный\n(Мысли)',         400, 480, 'hexagon',16, TJ,
  'План ума — высший (каузальный, абстрактное мышление) и низший (конкретный ум, желания).');
thNode('astral',     'Астральный\n(Чувств)',        600, 480, 'hexagon',16, TJ,
  'План эмоций, страстей и чувственных восприятий (кама-лока).');
thNode('physical',   'Физический\n(Материя)',       800, 480, 'hexagon',16, TJ,
  'Плотный физический план — мир материи, доступный органам чувств. Эфирный двойник (прана) как переходное звено.');
thEdge('nirvana', 'mental',   TJ, 1.5, true);
thEdge('buddhi',  'astral',   TJ, 1.5, true);
thEdge('buddhi',  'physical', TJ, 1.5, true);

thNode('monad',      'Монада\n(Искра Бога)',        400, 580, 'diamond',18, TK,
  'Монада — тройственная искра: Атма (дух) → Буддхи (интуиция) → Манас (ум). Проходит эволюцию через все царства природы.');
thNode('human',      'Человек\n(7 принципов)',      600, 580, 'diamond',18, TK,
  'Человек как микрокосм: Атма, Буддхи, Манас, Кама-манас, Астрал, Эфир, Физика. Срединное звено эволюции.');
thNode('races',      'Коренные\nрасы (7)',          800, 580, 'diamond',16, TK,
  'Семь коренных рас человечества, последовательно сменяющие друг друга: от Полярной через Лемурийскую, Атлантическую к нашей Арийской и далее.');
thEdge('mental', 'monad',  TK, 1.5, true);
thEdge('astral', 'human',  TK, 1.5, true);
thEdge('physical','races', TK, 1.5, true);

thNode('nirvana_end','Освобождение\n(Нирвана)',     600, 680, 'diamond',18, TL,
  'Завершение эволюционного цикла — возвращение монады в единство с Абсолютом через слияние всех принципов.');
thEdge('human',  'nirvana_end', TL, 1.5, true);
thEdge('races',  'nirvana_end', TL, 1.5, true);
var tLoop = 'rgba(255,255,255,0.06)';
thEdge('nirvana_end', 'absolute', tLoop, 1, false);

// ─── THEOSOPHY NETWORK ───────────────────────────────
loadPositions('h_theosophy', thNodes);
var thEdgesDataSet = new vis.DataSet(thEdges);
var thNodesDataSet = new vis.DataSet(thNodes);
var thOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
var hierarchiesNetwork7 = new vis.Network(
  document.getElementById('hierarchies-network-7'),
  { nodes: thNodesDataSet, edges: thEdgesDataSet },
  thOptions
);
hierarchiesNetwork7.on('click', function(params) {
  if (params.nodes.length > 0) {
    var d = thNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork7.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork7.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { thNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork7.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { thNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork7.getPositions();
  if (allPos) localStorage.setItem('h_theosophy', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_theosophy');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (thNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) thNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── AGNI YOGA CREATION PHILOSOPHY ───────────────────
var ayNodeData = {};
var ayNodes = [];
var ayEdges = [];
function ayNode(id, label, x, y, shape, size, color, desc) {
  var flat = label.replace(/\n/g, ' ');
  ayNodes.push({ id: 'ay_' + id, label: flat, x: x, y: y, shape: shape, size: size, color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 }, font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: '#bbb', strokeWidth: 0 }, title: flat + '\n' + desc, fixed: true });
  ayNodeData['ay_' + id] = { label: flat, category: 'Агни-йога', description: desc };
}
function ayEdge(from, to, color, width, dashes) {
  ayEdges.push({ from: 'ay_' + from, to: 'ay_' + to, color: { color: color, opacity: 0.12 }, width: width * 0.6, dashes: dashes, title: '' });
}
var AGa = '#c87830', AHa = '#a06848', AIa = '#8a7ab8', AJa = '#7a9aba', AKa = '#c8a878', ALa = '#d08848';
ayNode('absolute',   'Абсолют\n(Огненный Творец)',  600, 20,  'star',   24, AGa,
  'Абсолют — Огненный Творец, источник всего сущего. В Агни-йоге Бог понимается как Беспредельный Огонь, пронизывающий все миры.');
ayNode('cosmic_magnet','Космический\nМагнит',       600, 110, 'hexagon',20, AHa,
  'Закон Космического Магнита — сила притяжения и эволюционного восхождения, организующая хаос в космос.');
ayEdge('absolute', 'cosmic_magnet', AHa, 2.5, false);

ayNode('fire',       'Пространствен-\nный Огонь',   600, 200, 'hexagon',18, AIa,
  'Первичная субстанция — Пространственный Огонь (Агни), основа всей материи и духа. Из него возникают все формы.');
ayNode('psychic_energy','Психическая\nЭнергия',     400, 300, 'diamond',18, AJa,
  'Тончайшая энергия, пронизывающая всё сущее — психическая энергия. Основа мысли, чувства и воли.');
ayNode('mental_world','Тонкий мир\n(Ментальный)',   800, 300, 'hexagon',16, AJa,
  'Тонкий мир — сфера мысли и ментальных образов, населённая существами разных уровней сознания.');
ayNode('astral_world','Астральный\nмир',            600, 300, 'hexagon',16, AIa,
  'Астральный мир — мир чувств и эмоций, переходная ступень между тонким и физическим планами.');
ayNode('physical_world','Физический\nмир',          800, 380, 'hexagon',16, AJa,
  'Физический мир — плотная материя, видимая вселенная. В Агни-йоге считается лишь одной из многих ступеней бытия.');
ayEdge('cosmic_magnet','fire',           AIa, 2,  false);
ayEdge('fire', 'psychic_energy', AJa, 1.5, true);
ayEdge('fire', 'mental_world',  AJa, 1.5, true);
ayEdge('fire', 'astral_world',  AIa, 1.5, true);
ayEdge('mental_world','physical_world', AJa, 1.5, false);

ayNode('human',      'Человек\n(Микрокосм)',       400, 480, 'diamond',18, AKa,
  'Человек — микрокосм, синтез всех трёх миров: физического, астрального и ментального. Через психическую энергию связан с Высшим.');
ayNode('brotherhood','Великое\nБратство',           800, 480, 'diamond',18, AKa,
  'Иерархия Света — Махатмы и Учителя (Махатма Мория, Махатма Кутхуми, Е.И. Рерих и др.), направляющие эволюцию человечества.');
ayEdge('psychic_energy','human',       AKa, 1.5, true);

ayNode('evolution',  'Эволюция\nОгня',             400, 580, 'diamond',18, ALa,
  'Эволюция Огня — процесс одухотворения материи: через накопление психической энергии человек трансформирует свою природу.');
ayNode('merging',    'Слияние\nс Высшим',          600, 580, 'diamond',18, ALa,
  'Конечная цель — полное преображение и слияние с Огненным Творцом через служение Общему Благу и овладение психической энергией.');
ayNode('karma',      'Карма\n(Закон причин)',      800, 580, 'diamond',16, AJa,
  'Закон кармы — неотъемлемая часть космического порядка. Каждое действие создаёт причинно-следственную связь, определяющую перевоплощения.');
ayEdge('human',    'evolution', ALa, 1.5, true);
ayEdge('evolution','merging',   ALa, 1.5, true);
ayEdge('brotherhood','merging', ALa, 1.5, true);

var aLoop = 'rgba(255,255,255,0.06)';
ayEdge('merging', 'absolute', aLoop, 1, false);

// ─── AGNI YOGA NETWORK ───────────────────────────────
loadPositions('h_agni_yoga', ayNodes);
var ayEdgesDataSet = new vis.DataSet(ayEdges);
var ayNodesDataSet = new vis.DataSet(ayNodes);
var ayOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
var hierarchiesNetwork8 = new vis.Network(
  document.getElementById('hierarchies-network-8'),
  { nodes: ayNodesDataSet, edges: ayEdgesDataSet },
  ayOptions
);
hierarchiesNetwork8.on('click', function(params) {
  if (params.nodes.length > 0) {
    var d = ayNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork8.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork8.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { ayNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork8.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { ayNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork8.getPositions();
  if (allPos) localStorage.setItem('h_agni_yoga', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_agni_yoga');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (ayNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) ayNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── INTEGRAL YOGA (SRI AUROBINDO) ───────────────────
var iyNodeData = {};
var iyNodes = [];
var iyEdges = [];
function iyNode(id, label, x, y, shape, size, color, desc) {
  var flat = label.replace(/\n/g, ' ');
  iyNodes.push({ id: 'iy_' + id, label: flat, x: x, y: y, shape: shape, size: size, color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 }, font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: '#bbb', strokeWidth: 0 }, title: flat + '\n' + desc, fixed: true });
  iyNodeData['iy_' + id] = { label: flat, category: 'Интегральная йога', description: desc };
}
function iyEdge(from, to, color, width, dashes) {
  iyEdges.push({ from: 'iy_' + from, to: 'iy_' + to, color: { color: color, opacity: 0.12 }, width: width * 0.6, dashes: dashes, title: '' });
}
var IGa = '#b08050', IHa = '#c49868', IIa = '#7a9aba', IJa = '#8ab888', IKa = '#b8a8c8', ILa = '#c8a878', IMa = '#a08878';
iyNode('brahman',    'Брахман\n(Непроявленное)',   600, 20,  'star',   24, IGa,
  'Непроявленный Брахман — бескачественный Абсолют, запредельный всякому определению и форме.');
iyNode('satchitananda','Сат-Чит-\nАнанда',          600, 110, 'hexagon',20, IHa,
  'Сат-Чит-Ананда (Бытие-Сознание-Блаженство) — тройственная природа Божественного в его самосознании.');
iyEdge('brahman', 'satchitananda', IHa, 2.5, false);

iyNode('supramental','Супраментал\n(Сверхразум)',   600, 200, 'hexagon',18, IIa,
  'Супраментал — Сверхразум, сознание-истина, познающее реальность без разделения на субъект и объект. Высшая сфера, из которой происходит нисхождение в материю.');
iyNode('overmind',   'Овермайнд\n(Высший ум)',      400, 300, 'hexagon',16, IIa,
  'Овермайнд (Высший Ум) — сфера космического сознания, где реальность ещё воспринимается целостно, но уже с элементами разделения.');
iyNode('mental',     'Ментал\n(Интеллект)',         200, 400, 'hexagon',16, IJa,
  'Ментальный план — мир мысли, логики и концептуального познания. Царство разума, разделяющего реальность на категории.');
iyNode('vital',      'Витал\n(Жизненная сила)',     400, 400, 'hexagon',16, IJa,
  'Витальный план — мир жизненной энергии, эмоций, страстей и динамических сил. Связующее звено между умом и телом.');
iyNode('physical',   'Физика\n(Материя)',           600, 400, 'hexagon',16, IJa,
  'Физический план — мир материи, атомов и клеток. В Интегральной йоге материя понимается как скрытая форма духа (спящий Шива).');
iyEdge('satchitananda','supramental', IIa, 2,  false);
iyEdge('supramental','overmind', IIa, 1.5, true);
iyEdge('overmind',  'mental',   IJa, 1.5, true);
iyEdge('overmind',  'vital',    IJa, 1.5, true);
iyEdge('overmind',  'physical', IJa, 1.5, true);

iyNode('involution','Инволюция\n(Нисхождение)',     800, 300, 'diamond',18, IKa,
  'Инволюция — нисхождение Сверхразума через последовательные планы (супраментал → овермайнд → ментал → витал → физика) в полное самозабвение материи.');
iyEdge('supramental','involution', IKa, 1.5, true);

iyNode('involution_end','Точка\nинволюции',         800, 400, 'diamond',16, IMa,
  'Крайняя точка нисхождения — полное погружение сознания в материю, где дух полностью забывает себя. Отсюда начинается обратное восхождение.');
iyEdge('physical', 'involution_end', IMa, 1.5, true);

iyNode('evolution',  'Эволюция\n(Восхождение)',    200, 520, 'diamond',18, IKa,
  'Эволюция — обратный процесс восхождения духа из материи через жизнь → ум → овермайнд → супраментал к полному самосознанию.');
iyNode('transformation','Супраментальное\nпреображение', 400, 520, 'diamond',18, ILa,
  'Супраментальное преображение — ключевой этап эволюции, где материя и тело трансформируются под действием Сверхразума.');
iyNode('divine_life','Божественная\nжизнь (Гносис)',600, 520, 'diamond',18, ILa,
  'Божественная жизнь на земле — конечная цель Интегральной йоги. Земля преображается в царство духа, где материя становится совершенным выражением Сверхразума.');
iyEdge('mental',   'evolution',      IKa, 1.5, true);
iyEdge('vital',    'evolution',      IKa, 1.5, true);
iyEdge('involution_end','evolution', IKa, 1.5, true);
iyEdge('evolution','transformation', ILa, 1.5, true);
iyEdge('transformation','divine_life',ILa, 1.5, true);

var iLoop = 'rgba(255,255,255,0.06)';
iyEdge('divine_life', 'brahman', iLoop, 1, false);

// ─── INTEGRAL YOGA NETWORK ───────────────────────────
loadPositions('h_integral_yoga', iyNodes);
var iyEdgesDataSet = new vis.DataSet(iyEdges);
var iyNodesDataSet = new vis.DataSet(iyNodes);
var iyOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
var hierarchiesNetwork9 = new vis.Network(
  document.getElementById('hierarchies-network-9'),
  { nodes: iyNodesDataSet, edges: iyEdgesDataSet },
  iyOptions
);
hierarchiesNetwork9.on('click', function(params) {
  if (params.nodes.length > 0) {
    var d = iyNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork9.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork9.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { iyNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork9.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { iyNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork9.getPositions();
  if (allPos) localStorage.setItem('h_integral_yoga', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_integral_yoga');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (iyNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) iyNodesDataSet.update(updates);
  } catch(e) {}
})();

// ══════════════════════════════════════════════════════════
// PHASE 3: HIERARCHIES OF CREATION
// ══════════════════════════════════════════════════════════

// ─── KABBALAH (TREE OF LIFE) ──────────────────────────────
const kbNodes = [];
const kbEdges = [];
const kbNodeData = {};
const KC = 'rgba(255,255,255,0.12)', KCW = 'rgba(255,255,255,0.06)';

function kbNode(id, label, x, y, shape, size, color, desc, cat) {
  const flat = label.replace(/\n/g, ' ');
  kbNodes.push({
    id, label: flat,
    x, y, shape, size,
    color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 },
    font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: shape === 'star' ? '#fff' : '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc,
    fixed: true,
  });
  kbNodeData[id] = { label: flat, category: cat, description: desc };
}
function kbEdge(from, to, color, width, dashes) {
  kbEdges.push({ from, to, color: { color, opacity: 0.12 }, width: width * 0.6, dashes, title: '' });
}

kbNode('kb_ein',      'Эйн Соф\n(Бесконечный)', 400, 20, 'star', 22, '#c8b080',
  'Бесконечный, непознаваемый Абсолют. Предшествует всякому проявлению. «Эйн Соф» — «Нет конца». Из Него через три стадии сжатия (цимцум) возникает Древо Жизни.', 'Абсолют — Эйн Соф');
kbNode('kb_keter',    'Кетер\n(Корона)', 400, 90, 'hexagon', 18, '#c8a070',
  'Первая сфира: «Венец» — воля Творца. Источник всего творения. Состояние «небытия», предшествующее осознанию. Содержит в себе все остальные сфирот в потенциале. Цвет — белый.', 'Сфира 1 — Кетер');
kbNode('kb_chokhmah', 'Хохма\n(Мудрость)', 280, 170, 'diamond', 16, '#c09860',
  'Вторая сфира: «Мудрость» — первая эманация, зарождение идеи творения. Мужской, активный принцип. Мир Ацилут (Мир Эманаций). Связана с правым полушарием мозга. Цвет — серый.', 'Сфира 2 — Хохма');
kbNode('kb_binah',    'Бина\n(Понимание)', 520, 170, 'diamond', 16, '#b080a0',
  'Третья сфира: «Понимание» — оформление идеи, структурирование. Женский, пассивный принцип. «Мать мира». Вместе с Хохмой образуют первую пару. Цвет — чёрный.', 'Сфира 3 — Бина');
kbNode('kb_daat',     'Даат\n(Знание)', 400, 250, 'dot', 12, '#a09070',
  'Невидимая сфира: «Знание». Объединение Хохмы и Бины. В некоторых схемах — псевдо-сфира, представляющая состояние осознания. Врата к Бесконечному.', 'Псевдо-сфира — Даат');
kbNode('kb_chesed',   'Хесед\n(Милость)', 240, 340, 'diamond', 16, '#80b090',
  'Четвёртая сфира: «Милость» — любовь, доброта, расширение. Правая сторона Древа. Связана с Авраамом. Цвет — белый. Мир Брия (Творения).', 'Сфира 4 — Хесед');
kbNode('kb_gevurah',  'Гвура\n(Строгость)', 560, 340, 'diamond', 16, '#c08060',
  'Пятая сфира: «Строгость» — суд, сила, ограничение. Левая сторона Древа. Уравновешивает Хесед. Цвет — красный. Связана с Исааком.', 'Сфира 5 — Гвура');
kbNode('kb_tiferet',  'Тиферет\n(Красота)', 400, 420, 'hexagon', 18, '#c8a050',
  'Шестая сфира: «Красота» — гармония, милосердие, центр Древа. Сердце каббалистической системы. Объединяет верхние и нижние сфирот. Цвет — жёлтый. Связана с Иаковом.', 'Сфира 6 — Тиферет');
kbNode('kb_netzach',  'Нецах\n(Вечность)', 240, 500, 'diamond', 16, '#a0a0c0',
  'Седьмая сфира: «Вечность» — победа, выносливость, эмоции. Правая нижняя сторона Древа. Мир Йецира (Формирования). Цвет — голубой.', 'Сфира 7 — Нецах');
kbNode('kb_hod',      'Ход\n(Слава)', 560, 500, 'diamond', 16, '#90a0c0',
  'Восьмая сфира: «Слава» — мысль, логика, анализ. Левая нижняя сторона. Уравновешивает Нецах. Цвет — оранжевый.', 'Сфира 8 — Ход');
kbNode('kb_yesod',    'Йесод\n(Основание)', 400, 580, 'diamond', 16, '#b0a0c0',
  'Девятая сфира: «Основание» — канал передачи энергии от верхних сфирот к Малхут. Связана с луной, подсознанием, снами. Мир Асия (Действия). Цвет — фиолетовый. Связана с Иосифом.', 'Сфира 9 — Йесод');
kbNode('kb_malkhut',  'Малхут\n(Царство)', 400, 660, 'hexagon', 18, '#c0a090',
  'Десятая сфира: «Царство» — проявление божественного в материальном мире. Шхина (Божественное Присутствие). Цель творения. Завершение Древа. Цвет — коричневый. Связана с царём Давидом.', 'Сфира 10 — Малхут');

// Kabbalah edges (3 pillars)
kbEdge('kb_ein', 'kb_keter', KC, 2, false);
kbEdge('kb_keter', 'kb_chokhmah', KC, 1.5, false);
kbEdge('kb_keter', 'kb_binah', KC, 1.5, false);
kbEdge('kb_chokhmah', 'kb_daat', KCW, 1, false);
kbEdge('kb_binah', 'kb_daat', KCW, 1, false);
kbEdge('kb_chokhmah', 'kb_chesed', KCW, 1, false);
kbEdge('kb_binah', 'kb_gevurah', KCW, 1, false);
kbEdge('kb_daat', 'kb_tiferet', KCW, 1, false);
kbEdge('kb_chesed', 'kb_tiferet', KCW, 1, false);
kbEdge('kb_gevurah', 'kb_tiferet', KCW, 1, false);
kbEdge('kb_chesed', 'kb_netzach', KCW, 1, false);
kbEdge('kb_gevurah', 'kb_hod', KCW, 1, false);
kbEdge('kb_tiferet', 'kb_yesod', KCW, 1, false);
kbEdge('kb_netzach', 'kb_yesod', KCW, 1, false);
kbEdge('kb_hod', 'kb_yesod', KCW, 1, false);
kbEdge('kb_yesod', 'kb_malkhut', KCW, 1, false);

// ─── ISLAMIC COSMOLOGY ────────────────────────────────────
const icNodes = [];
const icEdges = [];
const icNodeData = {};
const ICC = 'rgba(255,255,255,0.12)', ICCW = 'rgba(255,255,255,0.06)';

function icNode(id, label, x, y, shape, size, color, desc, cat) {
  const flat = label.replace(/\n/g, ' ');
  icNodes.push({
    id, label: flat,
    x, y, shape, size,
    color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 },
    font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: shape === 'star' ? '#fff' : '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc,
    fixed: true,
  });
  icNodeData[id] = { label: flat, category: cat, description: desc };
}
function icEdge(from, to, color, width, dashes) {
  icEdges.push({ from, to, color: { color, opacity: 0.12 }, width: width * 0.6, dashes, title: '' });
}

icNode('ic_allah',     'Аллах\n(Творец)', 400, 20, 'star', 22, '#c8a080',
  'Единый Творец, создавший небеса и землю (Коран, 2:117). Его Престол (Курси) объемлет небеса и землю. Он — Первый и Последний, Явный и Сокрытый.', 'Бог — Аллах');
icNode('ic_arsh',      'Арш\n(Трон)', 400, 100, 'hexagon', 18, '#c8a870',
  'Величайшее творение Аллаха — Его Трон (Арш). Над Аршем — Престол Милости. ар-Рашид: «Властелин Трона, Славный». Восемь ангелов несут Арш в Судный день (Коран, 69:17).', 'Космический уровень — Арш');
icNode('ic_kursi',     'Курси\n(Престол)', 400, 170, 'hexagon', 16, '#b8a070',
  'Престол Аллаха (Курси) — меньше Арша, но объемлет небеса и землю. Аят аль-Курси (2:255): «Престол Его объемлет небеса и землю, и не тяготит Его охрана их».', 'Космический уровень — Курси');
icNode('ic_paradise',  'Рай\n(Джанна)', 550, 170, 'hexagon', 16, '#80c080',
  'Джанна — Райский сад, место вечного блаженства для верующих. В нём 8 врат и 4 уровня: Рай Адна, Фирдаус, Махва и Джаннат ан-Наим.', 'Загробный мир — Рай');
icNode('ic_hell',      'Ад\n(Джаханнам)', 250, 170, 'hexagon', 16, '#c06050',
  'Джаханнам — адский огонь, место наказания для неверующих и грешников. Имеет 7 уровней, самый глубокий — Хавия.', 'Загробный мир — Ад');
icNode('ic_7heavens',  '7 небес\n(Самават)', 400, 260, 'hexagon', 17, '#b8a890',
  'Семь небес (Самават), созданных одно над другим. Первое небо — мир Луны, седьмое — Сидрат аль-Мунтаха (Лотос Крайнего Предела). Пророк вознёсся через них в Мирадж.', 'Космический уровень — 7 небес');
icNode('ic_1st',       '1-е небо\n(Луна)', 160, 340, 'dot', 12, '#a0b0c0',
  'Первое небо — из серебра, содержит звёзды. Врата, охраняемые ангелом Исмаилом. Над ним — океаны и облака.', 'Небесный уровень');
icNode('ic_2nd',       '2-е небо\n(Венера/Меркурий)', 240, 340, 'dot', 12, '#b0a0b0',
  'Второе небо — из чистого золота. На нём — Иисус и Иоанн Креститель согласно хадису о Мирадже.', 'Небесный уровень');
icNode('ic_3rd',       '3-е небо\n(Марс)', 320, 340, 'dot', 12, '#c0a090',
  'Третье небо — из жемчуга и рубинов. На нём — Иосиф (Юсуф), красивейший из пророков.', 'Небесный уровень');
icNode('ic_4th',       '4-е небо\n(Солнце)', 400, 340, 'dot', 12, '#c8a050',
  'Четвёртое небо — из белого серебра. На нём — Идрис (Енох) и ангел Малик. Река аль-Каусар.', 'Небесный уровень');
icNode('ic_5th',       '5-е небо\n(Юпитер)', 480, 340, 'dot', 12, '#a0c0a0',
  'Пятое небо — из чистого золота. На нём — Аарон (Харун). Ангел-хранитель огня.', 'Небесный уровень');
icNode('ic_6th',       '6-е небо\n(Сатурн)', 560, 340, 'dot', 12, '#a0a0a0',
  'Шестое небо — из драгоценных камней. На нём — Моисей (Муса).', 'Небесный уровень');
icNode('ic_7th',       '7-е небо\n(Лотос)', 640, 340, 'dot', 14, '#b0a080',
  'Седьмое небо — Сидрат аль-Мунтаха (Лотос Крайнего Предела). Конечная граница творения. Выше — только Престол Аллаха. На нём — Авраам (Ибрахим).', 'Небесный уровень — Сидрат аль-Мунтаха');
icNode('ic_pen',       'Небесная\nСкрижаль и Перо', 400, 460, 'dot', 14, '#c0a870',
  'Перо (Калям) — первое творение Аллаха, которым Он записал судьбы всего сущего в Небесной Скрижали (Лаух аль-Махфуз). Коран: «Читай! Господь твой — щедрейший, Который научил калямом» (96:3-4).', 'Космический принцип — Перо и Скрижаль');
icNode('ic_jinn',      'Джинны\nи Ангелы', 300, 460, 'diamond', 18, '#c0a070',
  'Джинны — разумные существа из бездымного огня (Коран, 15:27). Имеют свободу воли, среди них есть верующие и неверующие. Ангелы — существа из света, не имеющие свободы воли, исполняющие повеления Аллаха. Главные ангелы: Джибриль, Микаиль, Исрафиль, Азраиль.', 'Космические сущности');
icNode('ic_insan',     'Человек\n(Инсан)', 500, 460, 'diamond', 16, '#b0a070',
  'Человек — венец творения, наместник Аллаха (халифа) на земле. Создан из глины, в него вдохнута душа (рух). Обладает свободой воли и ответственностью перед Творцом.', 'Человек');

// Islamic cosmology edges
icEdge('ic_allah', 'ic_arsh', ICC, 2, false);
icEdge('ic_arsh', 'ic_kursi', ICC, 1.5, false);
icEdge('ic_arsh', 'ic_paradise', ICCW, 1, false);
icEdge('ic_arsh', 'ic_hell', ICCW, 1, false);
icEdge('ic_kursi', 'ic_7heavens', ICC, 1.5, false);
icEdge('ic_7heavens', 'ic_1st', ICCW, 1, false);
icEdge('ic_7heavens', 'ic_2nd', ICCW, 1, false);
icEdge('ic_7heavens', 'ic_3rd', ICCW, 1, false);
icEdge('ic_7heavens', 'ic_4th', ICCW, 1, false);
icEdge('ic_7heavens', 'ic_5th', ICCW, 1, false);
icEdge('ic_7heavens', 'ic_6th', ICCW, 1, false);
icEdge('ic_7heavens', 'ic_7th', ICCW, 1, false);
icEdge('ic_7heavens', 'ic_pen', ICCW, 1, false);
icEdge('ic_7heavens', 'ic_jinn', ICCW, 1, false);
icEdge('ic_7heavens', 'ic_insan', ICCW, 1, false);

// ─── TAOIST COSMOLOGY ─────────────────────────────────────
const tcNodes = [];
const tcEdges = [];
const tcNodeData = {};
const TCC = 'rgba(255,255,255,0.12)', TCCW = 'rgba(255,255,255,0.06)';

function tcNode(id, label, x, y, shape, size, color, desc, cat) {
  const flat = label.replace(/\n/g, ' ');
  tcNodes.push({
    id, label: flat,
    x, y, shape, size,
    color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 },
    font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: shape === 'star' ? '#fff' : '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc,
    fixed: true,
  });
  tcNodeData[id] = { label: flat, category: cat, description: desc };
}
function tcEdge(from, to, color, width, dashes) {
  tcEdges.push({ from, to, color: { color, opacity: 0.12 }, width: width * 0.6, dashes, title: '' });
}

tcNode('tc_dao',       'Дао\n(Путь)', 400, 20, 'star', 24, '#c8b080',
  'Дао — безымянный, вечный, невыразимый Первоисточник всего сущего. «Дао, которое может быть выражено словами, не есть постоянное дао» (Дао-Дэ-Цзин, 1). Оно пусто (сюй) и объёмлет всё.', 'Абсолют — Дао');
tcNode('tc_de',        'Дэ\n(Сила/Добродетель)', 400, 100, 'hexagon', 16, '#c8a870',
  'Дэ — проявление Дао в мире. Конкретная сила-добродетель каждой вещи. То, что делает вещь тем, чем она является. «Дао рождает, Дэ вскармливает» (Дао-Дэ-Цзин, 51).', 'Проявление — Дэ');
tcNode('tc_taiji',     'Тайцзи\n(Великий\nПредел)', 400, 180, 'hexagon', 18, '#c8a060',
  'Тайцзи — Великий Предел, начало проявленного мира. Из Небытия (Уцзи) рождается Великий Предел, который порождает Инь-Ян. Основа всей китайской космологии (И-Цзин, Сицы-чжуань).', 'Принцип — Тайцзи');
tcNode('tc_wuji',      'Уцзи\n(Небытие/Беспредельное)', 250, 100, 'hexagon', 16, '#a09070',
  'Уцзи — Небытие, Беспредельное, отсутствие различий. Предшествует Тайцзи. Состояние хаоса (хунь-дунь), не имеющее ни формы, ни имени. Пустота, из которой всё возникает.', 'Принцип — Уцзи');
tcNode('tc_yin',       'Инь\n(Тьма/Покой)', 300, 280, 'diamond', 18, '#6070a0',
  'Инь — тёмное начало: земля, луна, вода, холод, покой, женское, ночь, восприимчивость, сжатие. В Инь скрыт зародыш Ян. «Однажды Инь, однажды Ян — это и есть Дао».', 'Начало — Инь');
tcNode('tc_yang',      'Ян\n(Свет/Движение)', 500, 280, 'diamond', 18, '#c07050',
  'Ян — светлое начало: небо, солнце, огонь, тепло, движение, мужское, день, активность, расширение. В Ян скрыт зародыш Инь. Взаимодействие Инь-Ян порождает всё многообразие мира.', 'Начало — Ян');
tcNode('tc_5elements', '5 элементов\n(У-Син)', 400, 380, 'hexagon', 18, '#c0a060',
  'Пять стихий (У-Син): Вода, Дерево, Огонь, Земля, Металл. Цикл порождения: Вода → Дерево → Огонь → Земля → Металл → Вода. Цикл преодоления: Вода → Огонь → Металл → Дерево → Земля → Вода.', 'Принцип — У-Син');
tcNode('tc_water',     'Вода\n(Шуй)', 180, 470, 'dot', 14, '#5090c0',
  'Вода (Шуй) — первая стихия. Север, зима, почки, страх, солёный вкус. Чёрный цвет. Цикл: рождает Дерево.', 'Стихия — Вода');
tcNode('tc_wood',      'Дерево\n(Му)', 300, 470, 'dot', 14, '#60b060',
  'Дерево (Му) — вторая стихия. Восток, весна, печень, гнев, кислый вкус. Зелёный цвет. Цикл: рождает Огонь.', 'Стихия — Дерево');
tcNode('tc_fire',      'Огонь\n(Хо)', 420, 470, 'dot', 14, '#d06040',
  'Огонь (Хо) — третья стихия. Юг, лето, сердце, радость, горький вкус. Красный цвет. Цикл: рождает Землю.', 'Стихия — Огонь');
tcNode('tc_earth',     'Земля\n(Ту)', 540, 470, 'dot', 14, '#c0a040',
  'Земля (Ту) — четвёртая стихия. Центр, междусезонье, селезёнка, задумчивость, сладкий вкус. Жёлтый цвет. Цикл: рождает Металл.', 'Стихия — Земля');
tcNode('tc_metal',     'Металл\n(Цзинь)', 660, 470, 'dot', 14, '#c0c0a0',
  'Металл (Цзинь) — пятая стихия. Запад, осень, лёгкие, печаль, острый вкус. Белый цвет. Цикл: рождает Воду.', 'Стихия — Металл');
tcNode('tc_qi',        'Ци\n(Жизненная\nэнергия)', 400, 570, 'diamond', 16, '#b0a080',
  'Ци — универсальная жизненная энергия, пронизывающая всё сущее. Движется по меридианам тела. Управляется законами Инь-Ян и У-Син. Основа китайской медицины и боевых искусств.', 'Космическая энергия — Ци');
tcNode('tc_heavens',   'Небо и\nЗемля', 250, 570, 'diamond', 14, '#8090a0',
  'Небо (Тянь) и Земля (Ди) — два полюса проявленного мира. Небо — воплощение Ян, Земля — Инь. Человек (Жэнь) стоит между ними как третий, объединяющий их начала.', 'Космические полюса');
tcNode('tc_10k',       '10 тысяч\nвещей', 550, 570, 'dot', 14, '#a0a080',
  '«Десять тысяч вещей» (вань-у) — всё многообразие проявленного мира. Из У-Син рождаются все вещи. «Дао рождает одно, одно рождает два, два рождает три, три рождает десять тысяч вещей» (Дао-Дэ-Цзин, 42).', 'Мир явлений');

// Taoist edges
tcEdge('tc_dao', 'tc_de', TCC, 2, false);
tcEdge('tc_wuji', 'tc_taiji', TCC, 1.5, false);
tcEdge('tc_dao', 'tc_wuji', TCCW, 1, false);
tcEdge('tc_de', 'tc_taiji', TCC, 1.5, false);
tcEdge('tc_taiji', 'tc_yin', TCC, 1.5, false);
tcEdge('tc_taiji', 'tc_yang', TCC, 1.5, false);
tcEdge('tc_yin', 'tc_5elements', TCCW, 1, false);
tcEdge('tc_yang', 'tc_5elements', TCCW, 1, false);
tcEdge('tc_5elements', 'tc_water', TCCW, 1, false);
tcEdge('tc_5elements', 'tc_wood', TCCW, 1, false);
tcEdge('tc_5elements', 'tc_fire', TCCW, 1, false);
tcEdge('tc_5elements', 'tc_earth', TCCW, 1, false);
tcEdge('tc_5elements', 'tc_metal', TCCW, 1, false);
tcEdge('tc_5elements', 'tc_qi', TCCW, 1, false);
tcEdge('tc_5elements', 'tc_heavens', TCCW, 1, false);
tcEdge('tc_5elements', 'tc_10k', TCCW, 1, false);

// ─── CONFUCIAN COSMOLOGY ─────────────────────────────────
const ccNodes = [];
const ccEdges = [];
const ccNodeData = {};
const CCC = 'rgba(255,255,255,0.12)', CCCW = 'rgba(255,255,255,0.06)';

function ccNode(id, label, x, y, shape, size, color, desc, cat) {
  const flat = label.replace(/\n/g, ' ');
  ccNodes.push({
    id, label: flat,
    x, y, shape, size,
    color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 },
    font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: shape === 'star' ? '#fff' : '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc,
    fixed: true,
  });
  ccNodeData[id] = { label: flat, category: cat, description: desc };
}
function ccEdge(from, to, color, width, dashes) {
  ccEdges.push({ from, to, color: { color, opacity: 0.12 }, width: width * 0.6, dashes, title: '' });
}

ccNode('cc_tian',      'Небо\n(Тянь)', 400, 20, 'star', 22, '#c8a070',
  'Небо (Тянь) — верховное безличное начало, источник морального порядка. В конфуцианстве — высшая сила, дающая мандат (Тянь-мин) правителю. Следит за справедливостью и добродетелью (Дэ).', 'Верховное начало — Тянь');
ccNode('cc_taiji_conf','Тайцзи\n(Великий\nПредел)', 400, 100, 'hexagon', 18, '#c8a060',
  'Великий Предел (Тайцзи) — источник Инь-Ян и всех принципов (ли). Чжоу Дуньи (1017–1073) в «Объяснении диаграммы Великого Предела»: Уцзи → Тайцзи → Инь-Ян → Пять Элементов → Человек и мир.', 'Принцип — Тайцзи');
ccNode('cc_yin_conf',  'Инь-Ян\n(Движение и\nПокой)', 400, 200, 'diamond', 18, '#a08070',
  'Движение (Дун) и Покой (Цзин) — первичные модусы Тайцзи. Движение рождает Ян, покой — Инь. Их взаимодействие порождает Пять Элементов и всё сущее. Основа морального закона: гармония противоположностей.', 'Принцип — Инь-Ян');
ccNode('cc_5e_conf',   '5 Элементов\n(У-Син)', 400, 300, 'hexagon', 16, '#b8a060',
  'Пять Элементов (У-Син) в конфуцианской интерпретации — не столько физические стихии, сколько моральные и космические силы. Каждая из пяти добродетелей (жэнь, и, ли, чжи, синь) соответствует элементу.', 'Принцип — У-Син');
ccNode('cc_li',        'Ли\n(Ритуал/Порядок)', 200, 390, 'diamond', 14, '#b0a070',
  'Ли — ритуал, благопристойность, мировой порядок. Конфуций: «Без ли — не смотри, не слушай, не говори, не делай». Ли — внешнее выражение внутренней человечности Жэнь. Упорядочивает все сферы жизни.', 'Добродетель — Ли');
ccNode('cc_ren',       'Жэнь\n(Человечность)', 320, 390, 'diamond', 14, '#c0a050',
  'Жэнь — человечность, любовь к людям, центральная добродетель Конфуция. «Не делай другим того, чего не желаешь себе». Основа всех добродетелей, реализуется через отношения (пять связей).', 'Добродетель — Жэнь');
ccNode('cc_yi',        'И\n(Справедливость)', 440, 390, 'diamond', 14, '#b0a080',
  'И — справедливость, долг, праведность. Действие из чувства долга, а не выгоды. «Благородный муж понимает И, низкий человек понимает выгоду» (Лунь-юй, 4:16).', 'Добродетель — И');
ccNode('cc_zhi',       'Чжи\n(Мудрость)', 560, 390, 'diamond', 14, '#a0a0b0',
  'Чжи — мудрость, знание, различение добра и зла. Способность правильно понимать вещи и принимать верные решения. «Учение без размышления — напрасно, размышление без учения — опасно» (Лунь-юй, 2:15).', 'Добродетель — Чжи');
ccNode('cc_xin',       'Синь\n(Искренность)', 680, 390, 'diamond', 14, '#b0a0a0',
  'Синь — искренность, доверие, верность слову. «Если человек не обладает Синь, я не знаю, как он может быть человеком» (Лунь-юй, 2:22). Основа всех человеческих отношений.', 'Добродетель — Синь');
ccNode('cc_5relations','Пять связей\n(У-Лунь)', 400, 490, 'hexagon', 16, '#b8a870',
  'Пять связей — основа социальной гармонии: 1) правитель-подданный (справедливость), 2) отец-сын (сыновняя почтительность), 3) муж-жена (различие ролей), 4) старший-младший (порядок), 5) друг-друг (верность).', 'Социальный порядок — У-Лунь');
ccNode('cc_xiao',      'Сяо\n(Сыновняя\nпочтительность)', 250, 570, 'dot', 14, '#b09870',
  'Сяо — сыновняя почтительность, основа всех добродетелей. «Канон сыновней почтительности» (Сяо-Цзин): служение родителям при жизни, похороны по ритуалу, жертвоприношения после смерти.', 'Добродетель — Сяо');
ccNode('cc_junzi',     'Цзюнь-цзы\n(Благородный\nмуж)', 550, 570, 'diamond', 16, '#a09870',
  'Цзюнь-цзы — «благородный муж», идеал человеческого совершенства. Следует Дао, действует через Жэнь и И, знает судьбу (мин). Противоположность — сяо-жэнь (ничтожный человек).', 'Идеал — Цзюнь-цзы');

// Confucian edges
ccEdge('cc_tian', 'cc_taiji_conf', CCC, 2, false);
ccEdge('cc_taiji_conf', 'cc_yin_conf', CCC, 1.5, false);
ccEdge('cc_yin_conf', 'cc_5e_conf', CCC, 1.5, false);
ccEdge('cc_5e_conf', 'cc_li', CCCW, 1, false);
ccEdge('cc_5e_conf', 'cc_ren', CCCW, 1, false);
ccEdge('cc_5e_conf', 'cc_yi', CCCW, 1, false);
ccEdge('cc_5e_conf', 'cc_zhi', CCCW, 1, false);
ccEdge('cc_5e_conf', 'cc_xin', CCCW, 1, false);
ccEdge('cc_5e_conf', 'cc_5relations', CCCW, 1, false);
ccEdge('cc_5relations', 'cc_xiao', CCCW, 1, false);
ccEdge('cc_5relations', 'cc_junzi', CCCW, 1, false);

// ─── NETWORK 10: KABBALAH (TREE OF LIFE) ──────────────
loadPositions('h_kabbalah', kbNodes);
const kbEdgesDataSet = new vis.DataSet(kbEdges);
const kbNodesDataSet = new vis.DataSet(kbNodes);
const kbOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
const hierarchiesNetwork10 = new vis.Network(
  document.getElementById('hierarchies-network-10'),
  { nodes: kbNodesDataSet, edges: kbEdgesDataSet },
  kbOptions
);
hierarchiesNetwork10.on('click', function(params) {
  if (params.nodes.length > 0) {
    const d = kbNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork10.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork10.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { kbNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork10.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { kbNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork10.getPositions();
  if (allPos) localStorage.setItem('h_kabbalah', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_kabbalah');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (kbNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) kbNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── NETWORK 11: ISLAMIC COSMOLOGY ────────────────────
loadPositions('h_islamic_cosmos', icNodes);
const icEdgesDataSet = new vis.DataSet(icEdges);
const icNodesDataSet = new vis.DataSet(icNodes);
const icOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
const hierarchiesNetwork11 = new vis.Network(
  document.getElementById('hierarchies-network-11'),
  { nodes: icNodesDataSet, edges: icEdgesDataSet },
  icOptions
);
hierarchiesNetwork11.on('click', function(params) {
  if (params.nodes.length > 0) {
    const d = icNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork11.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork11.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { icNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork11.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { icNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork11.getPositions();
  if (allPos) localStorage.setItem('h_islamic_cosmos', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_islamic_cosmos');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (icNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) icNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── NETWORK 12: TAOIST COSMOLOGY ─────────────────────
loadPositions('h_taoist', tcNodes);
const tcEdgesDataSet = new vis.DataSet(tcEdges);
const tcNodesDataSet = new vis.DataSet(tcNodes);
const tcOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
const hierarchiesNetwork12 = new vis.Network(
  document.getElementById('hierarchies-network-12'),
  { nodes: tcNodesDataSet, edges: tcEdgesDataSet },
  tcOptions
);
hierarchiesNetwork12.on('click', function(params) {
  if (params.nodes.length > 0) {
    const d = tcNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork12.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork12.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { tcNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork12.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { tcNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork12.getPositions();
  if (allPos) localStorage.setItem('h_taoist', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_taoist');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (tcNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) tcNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── NETWORK 13: CONFUCIAN COSMOLOGY ──────────────────
loadPositions('h_confucian', ccNodes);
const ccEdgesDataSet = new vis.DataSet(ccEdges);
const ccNodesDataSet = new vis.DataSet(ccNodes);
const ccOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
const hierarchiesNetwork13 = new vis.Network(
  document.getElementById('hierarchies-network-13'),
  { nodes: ccNodesDataSet, edges: ccEdgesDataSet },
  ccOptions
);
hierarchiesNetwork13.on('click', function(params) {
  if (params.nodes.length > 0) {
    const d = ccNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork13.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork13.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { ccNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork13.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { ccNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork13.getPositions();
  if (allPos) localStorage.setItem('h_confucian', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_confucian');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (ccNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) ccNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── ANTHROPOSOPHY CREATION PHILOSOPHY ──────────────
var anthNodeData = {};
var anthNodes = [];
var anthEdges = [];
function anthNode(id, label, x, y, shape, size, color, desc) {
  var flat = label.replace(/\n/g, ' ');
  anthNodes.push({ id: 'anth_' + id, label: flat, x: x, y: y, shape: shape, size: size,
    color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 },
    font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc, fixed: true });
  anthNodeData['anth_' + id] = { label: flat, category: 'Антропософия', description: desc };
}
function anthEdge(from, to, color, width, dashes) {
  anthEdges.push({ from: 'anth_' + from, to: 'anth_' + to,
    color: { color: color, opacity: 0.12 }, width: width * 0.6, dashes: dashes, title: '' });
}
var AG = '#b8a07a', AH = '#a08060', AI = '#9a8ac8', AJ = '#b08070', AK = '#7a9aba', AL = '#b8a8c8';
anthNode('godhead',    'Божество\n(Готтхайт)',         600, 20,  'star',   24, AG,
  'Непроявленное Божество, трансцендентная основа всего бытия. Вселенская тайна, запредельная всем категориям.');
anthNode('trinity',    'Св. Троица\n(Отец-Сын-Дух)',    600, 100, 'hexagon',22, AH,
  'Три Лика Божества: Отец — основы бытия, Сын (Логос) — космический Христос, Св. Дух — оживотворяющий принцип.');
anthEdge('godhead', 'trinity', AH, 2.5, false);

anthNode('seraphim',   'Серафимы\n(Духи Любви)',       400, 190, 'hexagon',16, AI,
  'Высшая иерархия: Серафимы — духи любви, пламенеющие перед Престолом Бога. Жертвенная любовь как основа мироздания.');
anthNode('cherubim',   'Херувимы\n(Духи Гармонии)',        600, 190, 'hexagon',16, AI,
  'Средняя высшая иерархия: Херувимы — духи гармонии, носители божественной мудрости и космических ритмов.');
anthNode('thrones',    'Престолы\n(Духи Воли)',        800, 190, 'hexagon',16, AI,
  'Третья высшая иерархия: Престолы — духи воли, излучающие божественную силу как жертву. Архитектоника мировых пространств.');
anthEdge('trinity', 'seraphim', AI, 2, true);
anthEdge('trinity', 'cherubim', AI, 2, true);
anthEdge('trinity', 'thrones',  AI, 2, true);

anthNode('planet_saturn','Сатурн\n(Первая эпоха)',     350, 300, 'hexagon',16, AJ,
  'Первая планетарная эпоха (ок. 700 млн лет). Только тепло-эфир и первое зачаточное физическое тело человека.');
anthNode('planet_sun',  'Солнце\n(Вторая эпоха)',      550, 300, 'hexagon',16, AJ,
  'Вторая эпоха. Воздух-свет. Зарождение эфирного (жизненного) тела и первых растительных форм.');
anthNode('planet_moon', 'Луна\n(Третья эпоха)',         750, 300, 'hexagon',16, AJ,
  'Третья эпоха. Вода-звук. Зарождение астрального тела и начало животного царства. Начало кармы и страдания.');
anthNode('planet_earth','Земля\n(Четвёртая эпоха)',     550, 400, 'hexagon',18, AK,
  'Современная эпоха. Минеральная земная твердь, четыре состояния вещества. Человек получает «Я» (эго). Свобода выбора.');
anthEdge('seraphim', 'planet_saturn', AJ, 1.5, false);
anthEdge('cherubim', 'planet_sun',   AJ, 1.5, false);
anthEdge('thrones',  'planet_moon',  AJ, 1.5, false);
anthEdge('planet_saturn','planet_sun',  AJ, 1, false);
anthEdge('planet_sun',  'planet_moon', AJ, 1, false);
anthEdge('planet_moon', 'planet_earth',AK, 1, false);

anthNode('human_being','Семеричный\nчеловек',           350, 510, 'diamond',18, AK,
  'Семеричный состав: физ. тело, эфирное тело, астральное тело, «Я», Самодух (Манас), Жизнедух (Буддхи), Духочеловек (Атма).');
anthNode('golgotha',   'Мистерия\nГолгофы',            600, 510, 'diamond',20, AL,
  'Событие Мистерии Голгофы — смерть Христа на кресте — центральное событие земной эволюции. Солнечное Существо вошло в земную ауру.');
anthNode('future',     'Будущее:\nЮпитер-Венера-Вулкан',600, 600, 'diamond',16, AL,
  'Три будущие планетарные эпохи: Юпитер (звезда любви), Венера (преображение астральности), Вулкан (духовная планетарность).');
anthEdge('planet_earth','human_being', AK, 1.5, true);
anthEdge('planet_earth','golgotha',   AK, 1.5, true);
anthEdge('golgotha',   'future',     AL, 1.5, true);
anthEdge('human_being','future',     AL, 1.5, true);

loadPositions('h_anthroposophy', anthNodes);
var anthEdgesDataSet = new vis.DataSet(anthEdges);
var anthNodesDataSet = new vis.DataSet(anthNodes);
var anthOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
var hierarchiesNetwork14 = new vis.Network(
  document.getElementById('hierarchies-network-14'),
  { nodes: anthNodesDataSet, edges: anthEdgesDataSet },
  anthOptions
);
hierarchiesNetwork14.on('click', function(params) {
  if (params.nodes.length > 0) {
    var d = anthNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork14.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork14.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { anthNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork14.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { anthNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork14.getPositions();
  if (allPos) localStorage.setItem('h_anthroposophy', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_anthroposophy');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (anthNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) anthNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── HERMETICISM CREATION PHILOSOPHY ────────────────
var hermNodeData = {};
var hermNodes = [];
var hermEdges = [];
function hermNode(id, label, x, y, shape, size, color, desc) {
  var flat = label.replace(/\n/g, ' ');
  hermNodes.push({ id: 'herm_' + id, label: flat, x: x, y: y, shape: shape, size: size,
    color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 },
    font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc, fixed: true });
  hermNodeData['herm_' + id] = { label: flat, category: 'Герметизм', description: desc };
}
function hermEdge(from, to, color, width, dashes) {
  hermEdges.push({ from: 'herm_' + from, to: 'herm_' + to,
    color: { color: color, opacity: 0.12 }, width: width * 0.6, dashes: dashes, title: '' });
}
var HG = '#b8a07a', HH = '#a08060', HI = '#9a8ac8', HJ = '#b08070', HK = '#7a9aba', HL = '#b8a8c8';
hermNode('the_all',    'Всё\n(Единое)',                 600, 20,  'star',   24, HG,
  'Единое — невыразимый источник всего сущего, запредельный и непостижимый. Всё происходит из Него и всё возвращается в Него.');
hermNode('nous',       'Ум\n(Нус)',                     600, 100, 'hexagon',22, HH,
  'Первая эманация Единого — Божественный Ум (Нус). Созерцая Отца, Он творит мир идей и архетипов. «Я — свет, Ум, Бог».');
hermEdge('the_all', 'nous', HH, 2.5, false);

hermNode('logos',      'Логос\n(Слово)',                600, 190, 'hexagon',18, HI,
  'Творческое Слово, исходящее из Ума. Принцип, разделяющий единое на множественное. Второй божественный аспект.');
hermNode('governors',  'Семь\nУправителей',             600, 280, 'hexagon',18, HI,
  'Семь сфер (планетарных архонтов), управляющих подлунным миром. Они образуют судьбу и наделяют человека семью качествами.');
hermEdge('nous',     'logos',      HI, 2,   false);
hermEdge('logos',    'governors',  HI, 1.5, false);

hermNode('anthropos',  'Первочеловек\n(Антропос)',      400, 380, 'hexagon',18, HJ,
  'Архетипический человек, созданный по образу Бога. Он нисходит через сферы, получая от каждой часть своей природы.');
hermNode('physis',     'Природа\n( Физис)',             800, 380, 'hexagon',18, HJ,
  'Природа — низший мир, сотворённый Управителями. Мир тел, рождения и смерти. Человек в нём — странник.');
hermEdge('governors', 'anthropos', HJ, 1.5, true);
hermEdge('governors', 'physis',   HJ, 1.5, true);

hermNode('descent',    'Нисхождение\nдуши',             400, 480, 'diamond',18, HK,
  'Душа, проходя через семь сфер, облекается в их качества: от божественного мышления до телесных страстей.');
hermNode('ascent',     'Восхождение\n(Возрождение)',     600, 480, 'diamond',20, HL,
  'Восхождение души через семь сфер: сбрасывание страстей, очищение, возвращение к Уму. «Лучше смерть, чем жизнь» (Гермес).');
hermNode('poimandres', 'Поймандр\n(Пастырь)',           800, 480, 'diamond',18, HL,
  'Поймандр — Нус, открывающий тайны бытия. Является Гермесу и даёт учение о творении, человеке и спасении.');
hermEdge('anthropos', 'descent',  HK, 1.5, false);
hermEdge('physis',    'ascent',   HL, 1.5, true);
hermEdge('descent',   'ascent',   HK, 1.5, true);
hermEdge('ascent',    'poimandres', HL, 1.5, true);
hermEdge('poimandres','the_all',  'rgba(255,255,255,0.06)', 1, false);

loadPositions('h_hermeticism', hermNodes);
var hermEdgesDataSet = new vis.DataSet(hermEdges);
var hermNodesDataSet = new vis.DataSet(hermNodes);
var hermOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
var hierarchiesNetwork15 = new vis.Network(
  document.getElementById('hierarchies-network-15'),
  { nodes: hermNodesDataSet, edges: hermEdgesDataSet },
  hermOptions
);
hierarchiesNetwork15.on('click', function(params) {
  if (params.nodes.length > 0) {
    var d = hermNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork15.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork15.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { hermNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork15.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { hermNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork15.getPositions();
  if (allPos) localStorage.setItem('h_hermeticism', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_hermeticism');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (hermNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) hermNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── GNOSTICISM CREATION PHILOSOPHY (Valentinian) ───
var gnosNodeData = {};
var gnosNodes = [];
var gnosEdges = [];
function gnosNode(id, label, x, y, shape, size, color, desc) {
  var flat = label.replace(/\n/g, ' ');
  gnosNodes.push({ id: 'gnos_' + id, label: flat, x: x, y: y, shape: shape, size: size,
    color: { background: color, border: '#ffffff', opacity: shape === 'star' ? 1 : 0.85 },
    font: { size: (shape === 'star' || shape === 'hexagon') ? 10 : 9, color: '#bbb', strokeWidth: 0 },
    title: flat + '\n' + desc, fixed: true });
  gnosNodeData['gnos_' + id] = { label: flat, category: 'Гностицизм (Валентин)', description: desc };
}
function gnosEdge(from, to, color, width, dashes) {
  gnosEdges.push({ from: 'gnos_' + from, to: 'gnos_' + to,
    color: { color: color, opacity: 0.12 }, width: width * 0.6, dashes: dashes, title: '' });
}
var GG = '#b8a07a', GH = '#a08060', GI = '#9a8ac8', GJ = '#b08070', GK = '#7a9aba', GL = '#b8a8c8';
gnosNode('bythos',     'Бифос\n(Бездна)',               600, 20,  'star',   24, GG,
  'Первоначало — непостижимая Бездна, предвечный источник всего. Пребывает в покое и молчании вместе со своей Мыслью (Сиге).');
gnosNode('pleroma',    'Плерома\n(Полнота)',             600, 110, 'hexagon',22, GH,
  'Плерома — полнота божественного бытия, состоящая из 30 зонов (эманаций). Каждый зон — аспект божества в муж.-жен. паре (сизигии).');
gnosEdge('bythos', 'pleroma', GH, 2.5, false);

gnosNode('nous_truth','Нус и Алетейя\n(Ум и Истина)',  400, 210, 'hexagon',16, GI,
  'Первая сизигия, эманированная Бифосом. Через них Плерома начинает познавать себя.');
gnosNode('logos_life','Логос и Зоя\n(Слово и Жизнь)',  600, 210, 'hexagon',16, GI,
  'Четвёртая сизигия. Логос — творческий принцип, Зоя — жизненная сила Плеромы.');
gnosNode('anthropos_ecclesia','Антропос и Экклесия\n(Человек и Церковь)',  800, 210, 'hexagon',16, GI,
  'Пятая сизигия. Антропос — совершенный человек, Экклесия — единство спасённых.');
gnosEdge('pleroma', 'nous_truth',      GI, 1.5, true);
gnosEdge('pleroma', 'logos_life',      GI, 1.5, true);
gnosEdge('pleroma', 'anthropos_ecclesia', GI, 1.5, true);

gnosNode('sophia',     'София\n(Премудрость)',          400, 310, 'hexagon',18, GJ,
  'Младший зон Плеромы. Желая познать Отца без пары, она впадает в заблуждение и порождает Хаос (эктоплазму) вне Плеромы.');
gnosNode('horos',      'Горос\n(Предел)',               600, 310, 'hexagon',16, GJ,
  'Сила, ограничивающая Плерому. Отделяет полноту от пустоты, защищая зоны от повторения ошибки Софии. Он же — Крест.');
gnosEdge('nous_truth',      'sophia', GJ, 1.5, false);
gnosEdge('logos_life',      'horos',  GJ, 1.5, false);
gnosEdge('sophia',          'horos',  GJ, 1.5, true);

gnosNode('demiurge',   'Демиург\n(Ялдаваоф)',          400, 420, 'diamond',20, GK,
  'Низший творец, порождённый страстью Софии. Создаёт материальный мир (кеному) и семь небес. Считает себя единым Богом.');
gnosNode('kenoma',     'Кенома\n(Пустота)',             600, 420, 'diamond',18, GK,
  'Мир материи — пустота, ущербность, забвение. Человек состоит из тела (хюле), души (психе) и духа (пневма).');
gnosEdge('sophia',    'demiurge', GK, 1.5, false);
gnosEdge('horos',     'kenoma',   GK, 1.5, true);

gnosNode('spark',      'Искра\n(Пневма)',               400, 520, 'diamond',20, GL,
  'Искра божественного света, заключённая в избранных людях. Бессознательная частица Плеромы, жаждущая возвращения.');
gnosNode('christ',     'Христос\n(Сотер)',              600, 520, 'diamond',22, GL,
  'Спаситель, посланный Плеромой. Приносит гносис — спасительное знание. Пробуждает искру и указывает путь возвращения.');
gnosNode('return',     'Возвращение\n(Апокатастасис)',   600, 620, 'diamond',20, GL,
  'Восстановление полноты Плеромы. Пневматики возвращаются в свои сизигии. Материальный мир растворяется.');
gnosEdge('kenoma',    'spark',  GL, 1.5, true);
gnosEdge('demiurge',  'spark',  GK, 1.5, true);
gnosEdge('spark',     'christ', GL, 1.5, true);
gnosEdge('kenoma',    'christ', GK, 1.5, true);
gnosEdge('christ',    'return', GL, 1.5, false);
gnosEdge('return',    'bythos', 'rgba(255,255,255,0.06)', 1, false);

loadPositions('h_gnosticism', gnosNodes);
var gnosEdgesDataSet = new vis.DataSet(gnosEdges);
var gnosNodesDataSet = new vis.DataSet(gnosNodes);
var gnosOptions = {
  nodes: { borderWidth: 2, borderWidthSelected: 3, font: { face: 'Segoe UI', strokeWidth: 0 }, fixed: true, scaling: { min: 10, max: 28 } },
  edges: { smooth: { type: 'continuous' } },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 200, navigationButtons: true, keyboard: true, zoomView: true, dragView: true, dragNodes: true },
};
var hierarchiesNetwork16 = new vis.Network(
  document.getElementById('hierarchies-network-16'),
  { nodes: gnosNodesDataSet, edges: gnosEdgesDataSet },
  gnosOptions
);
hierarchiesNetwork16.on('click', function(params) {
  if (params.nodes.length > 0) {
    var d = gnosNodeData[params.nodes[0]];
    if (!d) return;
    nodeTitle.textContent = d.label; nodeCategory.textContent = d.category;
    nodeDate.textContent = ''; nodeDate.style.display = 'none';
    nodeDescription.textContent = d.description;
    rulesTitle.style.display = 'none'; rulesList.innerHTML = '';
    linksTitle.style.display = 'none'; linksList.innerHTML = '';
    btnDetail.style.display = 'none'; panel.style.display = 'block';
  } else { panel.style.display = 'none'; }
});
hierarchiesNetwork16.on('doubleClick', function() { panel.style.display = 'none'; });
hierarchiesNetwork16.on('dragStart', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { gnosNodesDataSet.update({ id: id, fixed: false }); }); }
});
hierarchiesNetwork16.on('dragEnd', function(params) {
  if (params.nodes.length) { params.nodes.forEach(function(id) { gnosNodesDataSet.update({ id: id, fixed: true }); }); }
  var allPos = hierarchiesNetwork16.getPositions();
  if (allPos) localStorage.setItem('h_gnosticism', JSON.stringify(allPos));
});
(function() {
  try {
    var saved = localStorage.getItem('h_gnosticism');
    if (!saved) return;
    var pos = JSON.parse(saved);
    var updates = [];
    Object.keys(pos).forEach(function(id) {
      if (gnosNodesDataSet.get(id)) { updates.push({ id: id, x: pos[id].x, y: pos[id].y }); }
    });
    if (updates.length) gnosNodesDataSet.update(updates);
  } catch(e) {}
})();

// ─── TAB SWITCHING ────────────────────────────────────
document.querySelectorAll('.h-tab[data-htree]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.h-tab').forEach(function(b) { b.classList.remove('active'); });
    this.classList.add('active');
    var tree = this.dataset.htree;
    document.getElementById('hierarchies-dharmic-single').style.display = tree === 'dharmic' ? 'block' : 'none';
    document.getElementById('hierarchies-modern-single').style.display = tree === 'modern' ? 'block' : 'none';
    document.getElementById('hierarchies-abrahamic-single').style.display = tree === 'abrahamic' ? 'block' : 'none';
    document.getElementById('hierarchies-east-asian-single').style.display = tree === 'east_asian' ? 'block' : 'none';
    document.querySelectorAll('.h-subtabs').forEach(function(el) {
      el.style.display = el.dataset.htree === tree ? '' : 'none';
    });
    if (tree === 'dharmic') {
      var activeSub = document.querySelector('.h-subtabs[data-htree="dharmic"] .h-subtab.active');
      if (activeSub) setTimeout(function() { activateDharmicSubtab(activeSub.dataset.hsub); }, 50);
    } else if (tree === 'modern') {
      var activeSub2 = document.querySelector('.h-subtabs[data-htree="modern"] .h-subtab.active');
      if (activeSub2) setTimeout(function() { activateModernSubtab(activeSub2.dataset.hsub); }, 50);
    } else if (tree === 'abrahamic') {
      var activeSub3 = document.querySelector('.h-subtabs[data-htree="abrahamic"] .h-subtab.active');
      if (activeSub3) setTimeout(function() { activateAbrahamicSubtab(activeSub3.dataset.hsub); }, 50);
    } else if (tree === 'east_asian') {
      var activeSub4 = document.querySelector('.h-subtabs[data-htree="east_asian"] .h-subtab.active');
      if (activeSub4) setTimeout(function() { activateEastAsianSubtab(activeSub4.dataset.hsub); }, 50);
    }
  });
});

// ─── DHARMIC SUB-TAB SWITCHING ─────────────────────────
var hDharmicSubtabs = document.querySelectorAll('.h-subtabs[data-htree="dharmic"] .h-subtab');
var hDharmicNetworks = document.querySelectorAll('#hierarchies-dharmic-single > div');
var hDharmicSubNetworkMap = {
  genealogy:   hierarchiesNetwork,
  trimurti:    hierarchiesNetwork2,
  jainism:     hierarchiesNetwork4,
  sikhism:     hierarchiesNetwork5,
};

function activateDharmicSubtab(key) {
  hDharmicSubtabs.forEach(function(t) { t.classList.remove('active'); });
  hDharmicNetworks.forEach(function(d) { d.classList.remove('active'); });
  var tab = document.querySelector('.h-subtabs[data-htree="dharmic"] .h-subtab[data-hsub="' + key + '"]');
  if (tab) tab.classList.add('active');
  var net = hDharmicSubNetworkMap[key];
  var idMap = { genealogy:'', trimurti:'-2', jainism:'-4', sikhism:'-5' };
  var div = document.getElementById('hierarchies-network' + (idMap[key] || ''));
  if (div) div.classList.add('active');
  if (net) setTimeout(function() { net.fit({ animation: true }); }, 50);
}

hDharmicSubtabs.forEach(function(btn) {
  btn.addEventListener('click', function() {
    activateDharmicSubtab(this.dataset.hsub);
  });
});

// ─── MODERN SUB-TAB SWITCHING ─────────────────────────
var hModernSubtabs = document.querySelectorAll('.h-subtabs[data-htree="modern"] .h-subtab');
var hModernNetworks = document.querySelectorAll('#hierarchies-modern-single > div');
var hModernSubNetworkMap = {
  theosophy:    hierarchiesNetwork7,
  agni_yoga:   hierarchiesNetwork8,
  integral_yoga: hierarchiesNetwork9,
  ananda_marga: hierarchiesNetwork6,
  anthroposophy: hierarchiesNetwork14,
  hermeticism:  hierarchiesNetwork15,
  gnosticism:   hierarchiesNetwork16,
};

function activateModernSubtab(key) {
  hModernSubtabs.forEach(function(t) { t.classList.remove('active'); });
  hModernNetworks.forEach(function(d) { d.classList.remove('active'); });
  var tab = document.querySelector('.h-subtabs[data-htree="modern"] .h-subtab[data-hsub="' + key + '"]');
  if (tab) tab.classList.add('active');
  var net = hModernSubNetworkMap[key];
  var idMap = { theosophy:'-7', agni_yoga:'-8', integral_yoga:'-9', ananda_marga:'-6', anthroposophy:'-14', hermeticism:'-15', gnosticism:'-16' };
  var div = document.getElementById('hierarchies-network' + (idMap[key] || ''));
  if (div) div.classList.add('active');
  if (net) setTimeout(function() { net.fit({ animation: true }); }, 50);
}

hModernSubtabs.forEach(function(btn) {
  btn.addEventListener('click', function() {
    activateModernSubtab(this.dataset.hsub);
  });
});

// ─── ABRAHAMIC SUB-TAB SWITCHING ──────────────────────
var hAbrahamicSubtabs = document.querySelectorAll('.h-subtabs[data-htree="abrahamic"] .h-subtab');
var hAbrahamicNetworks = document.querySelectorAll('#hierarchies-abrahamic-single > div');
var hAbrahamicSubNetworkMap = {
  genealogy:     hierarchiesNetwork3,
  kabbalah:      hierarchiesNetwork10,
  islamic_cosmos: hierarchiesNetwork11,
};

function activateAbrahamicSubtab(key) {
  hAbrahamicSubtabs.forEach(function(t) { t.classList.remove('active'); });
  hAbrahamicNetworks.forEach(function(d) { d.classList.remove('active'); });
  var tab = document.querySelector('.h-subtabs[data-htree="abrahamic"] .h-subtab[data-hsub="' + key + '"]');
  if (tab) tab.classList.add('active');
  var net = hAbrahamicSubNetworkMap[key];
  var idMap = { genealogy:'-3', kabbalah:'-10', islamic_cosmos:'-11' };
  var div = document.getElementById('hierarchies-network' + (idMap[key] || ''));
  if (div) div.classList.add('active');
  if (net) setTimeout(function() { net.fit({ animation: true }); }, 50);
}

hAbrahamicSubtabs.forEach(function(btn) {
  btn.addEventListener('click', function() {
    activateAbrahamicSubtab(this.dataset.hsub);
  });
});

// ─── EAST ASIAN SUB-TAB SWITCHING ─────────────────────
var hEastAsianSubtabs = document.querySelectorAll('.h-subtabs[data-htree="east_asian"] .h-subtab');
var hEastAsianNetworks = document.querySelectorAll('#hierarchies-east-asian-single > div');
var hEastAsianSubNetworkMap = {
  taoist:    hierarchiesNetwork12,
  confucian: hierarchiesNetwork13,
};

function activateEastAsianSubtab(key) {
  hEastAsianSubtabs.forEach(function(t) { t.classList.remove('active'); });
  hEastAsianNetworks.forEach(function(d) { d.classList.remove('active'); });
  var tab = document.querySelector('.h-subtabs[data-htree="east_asian"] .h-subtab[data-hsub="' + key + '"]');
  if (tab) tab.classList.add('active');
  var net = hEastAsianSubNetworkMap[key];
  var idMap = { taoist:'-12', confucian:'-13' };
  var div = document.getElementById('hierarchies-network' + (idMap[key] || ''));
  if (div) div.classList.add('active');
  if (net) setTimeout(function() { net.fit({ animation: true }); }, 50);
}

hEastAsianSubtabs.forEach(function(btn) {
  btn.addEventListener('click', function() {
    activateEastAsianSubtab(this.dataset.hsub);
  });
});

// Activate the first subtab by default
activateDharmicSubtab('genealogy');

// ─── SOURCE INFO POPUP ─────────────────────────────────
var hSourceBtn = document.getElementById('h-source-btn');
var hSourcePopup = document.getElementById('h-source-popup');
if (hSourceBtn) {
  hSourceBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    hSourcePopup.classList.toggle('show');
  });
  document.addEventListener('click', function(e) {
    if (!hSourcePopup.contains(e.target) && e.target !== hSourceBtn) {
      hSourcePopup.classList.remove('show');
    }
  });
}


