
// ─── VIEW TOGGLE ──────────────────────────────────────────
let currentView = 'tree';
let hierarchyShownOnce = false;

function switchView(view) {
  currentView = view;
  document.getElementById('btn-tree-view').classList.toggle('active', view === 'tree');
  document.getElementById('btn-parallels-view').classList.toggle('active', view === 'parallels');
  document.getElementById('btn-hierarchy-view').classList.toggle('active', view === 'hierarchy');
  document.getElementById('btn-map-view').classList.toggle('active', view === 'map');
  container.style.display = view === 'tree' ? 'block' : 'none';
  document.getElementById('nav-tree').style.display = view === 'tree' ? '' : 'none';
  document.getElementById('legend').style.display = view === 'tree' ? '' : 'none';
  document.getElementById('parallels-container').classList.toggle('active', view === 'parallels');
  document.getElementById('hierarchies-container').classList.toggle('active', view === 'hierarchy');
  mapContainer.classList.toggle('active', view === 'map');
  if (view === 'map' && typeof initMap === 'function') initMap();
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
