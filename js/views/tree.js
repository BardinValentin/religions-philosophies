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

    linksTitle.style.display = 'none';
    linksList.innerHTML = '';
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
