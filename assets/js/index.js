/* =========================================================
   index.js — 一覧（時系列アーカイブ）の描画
   ========================================================= */
(function () {
  'use strict';

  var S = window.Site;
  var archive = document.getElementById('archive');
  var filtersEl = document.getElementById('filters');
  var btnTxt = document.getElementById('viewTxt');
  var btnImg = document.getElementById('viewImg');
  if (!archive) return;

  var recipes = S.allRecipes();          // 新しい順
  var total = recipes.length;
  var activeCategory = 'ALL';

  /* ---------- 通し番号（古いものを No.001 に） ---------- */
  var serial = {};
  recipes.forEach(function (r, i) {
    serial[r.id] = total - i;
  });

  /* ---------- カテゴリの絞り込みボタン ---------- */
  function categories() {
    var seen = [];
    recipes.forEach(function (r) {
      if (r.category && seen.indexOf(r.category) === -1) seen.push(r.category);
    });
    return seen;
  }

  function renderFilters() {
    if (!filtersEl) return;
    var items = ['ALL'].concat(categories());
    filtersEl.innerHTML = items.map(function (name) {
      var label = name === 'ALL' ? 'All (' + total + ')' : name;
      return '<button type="button" class="pill" data-cat="' + S.escapeHtml(name) + '" ' +
             'aria-pressed="' + (name === activeCategory) + '">' + S.escapeHtml(label) + '</button>';
    }).join('');
  }

  if (filtersEl) {
    filtersEl.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-cat]');
      if (!btn) return;
      activeCategory = btn.dataset.cat;
      renderFilters();
      renderArchive();
    });
  }

  /* ---------- カード ---------- */
  function cardHtml(r) {
    var img = r.image
      ? '<img src="' + S.escapeHtml(r.image) + '" alt="" loading="lazy" decoding="async">'
      : '<img src="images/placeholder.svg" alt="" loading="lazy" decoding="async">';

    var meta = [];
    if (r.category) meta.push(S.escapeHtml(r.category));
    if (r.time) meta.push(S.escapeHtml(r.time));

    return '' +
      '<a class="card reveal" href="recipe.html?id=' + encodeURIComponent(r.id) + '">' +
        '<div class="card__media">' + img +
          '<span class="card__index">No.' + String(serial[r.id]).padStart(3, '0') + '</span>' +
        '</div>' +
        '<div class="card__body">' +
          '<span class="card__date">' + S.escapeHtml(S.formatDate(r.date)) + '</span>' +
          '<h3 class="card__title">' + S.escapeHtml(r.title) + '</h3>' +
          '<p class="card__meta">' +
            '<span>' + S.escapeHtml(S.formatDate(r.date)) + '</span>' +
            (meta.length ? '<span>' + meta.join(' / ') + '</span>' : '') +
          '</p>' +
        '</div>' +
      '</a>';
  }

  /* ---------- 年ごとにまとめて描画 ---------- */
  function renderArchive() {
    var list = recipes.filter(function (r) {
      return activeCategory === 'ALL' || r.category === activeCategory;
    });

    if (!list.length) {
      archive.innerHTML = '<p class="empty">まだレシピがありません。' +
        '<a class="link" href="admin.html">投稿フォーム</a>から追加してください。</p>';
      return;
    }

    var groups = [];
    list.forEach(function (r) {
      var y = S.year(r.date);
      var g = groups[groups.length - 1];
      if (!g || g.year !== y) groups.push({ year: y, items: [r] });
      else g.items.push(r);
    });

    archive.innerHTML = groups.map(function (g) {
      return '' +
        '<section class="year-group">' +
          '<div class="year-group__label"><b>' + S.escapeHtml(g.year) + '</b><i></i>' +
            '<b>' + String(g.items.length).padStart(2, '0') + '</b></div>' +
          '<div class="cards">' + g.items.map(cardHtml).join('') + '</div>' +
        '</section>';
    }).join('');

    S.observeReveals(archive);
  }

  /* ---------- Txt / Img 切り替え ---------- */
  function setView(mode) {
    archive.classList.toggle('view-txt', mode === 'txt');
    archive.classList.toggle('view-img', mode !== 'txt');
    if (btnTxt) btnTxt.setAttribute('aria-pressed', String(mode === 'txt'));
    if (btnImg) btnImg.setAttribute('aria-pressed', String(mode !== 'txt'));
    try { localStorage.setItem('view', mode); } catch (e) {}
  }

  if (btnTxt) btnTxt.addEventListener('click', function () { setView('txt'); });
  if (btnImg) btnImg.addEventListener('click', function () { setView('img'); });

  var savedView = 'img';
  try { savedView = localStorage.getItem('view') || 'img'; } catch (e) {}

  /* ---------- About の数値 ---------- */
  function renderStats() {
    var count = document.getElementById('statCount');
    var cats = document.getElementById('statCats');
    var latest = document.getElementById('statLatest');
    if (count) count.textContent = String(total).padStart(2, '0');
    if (cats) cats.textContent = String(categories().length).padStart(2, '0');
    if (latest) latest.textContent = total ? S.formatDate(recipes[0].date) : '—';
  }

  renderFilters();
  renderArchive();
  setView(savedView);
  renderStats();
})();
