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

// ─── POSITION PERSISTENCE HELPERS (shared by all views) ──
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
