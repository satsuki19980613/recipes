/* =========================================================
   recipe.js — レシピ詳細ページの描画（?id=... で切り替え）
   ========================================================= */
(function () {
  'use strict';

  var S = window.Site;
  var mount = document.getElementById('detail');
  if (!mount) return;

  var recipes = S.allRecipes();                       // 新しい順
  var id = new URLSearchParams(location.search).get('id');
  var pos = recipes.findIndex(function (r) { return r.id === id; });

  if (pos === -1) {
    mount.innerHTML =
      '<p class="empty">レシピが見つかりませんでした。' +
      '<a class="link" href="index.html">一覧へ戻る</a></p>';
    return;
  }

  var r = recipes[pos];
  var newer = recipes[pos - 1] || null;   // ひとつ新しい
  var older = recipes[pos + 1] || null;   // ひとつ古い

  document.title = r.title + ' — RECIPES';
  var desc = document.querySelector('meta[name="description"]');
  if (desc && r.summary) desc.setAttribute('content', r.summary);

  /* ---------- 部品 ---------- */
  function specHtml(label, value) {
    if (!value) return '';
    return '<div class="spec"><dt>' + S.escapeHtml(label) + '</dt>' +
           '<dd>' + S.escapeHtml(value) + '</dd></div>';
  }

  function ingredientHtml(item) {
    // 見出し行（材料のグループ分け）: { name: "◎ 合わせ調味料" } のように amount なし
    var amount = item.amount
      ? '<span class="dots"></span><span class="amount">' + S.escapeHtml(item.amount) + '</span>'
      : '';
    return '<li><span class="name">' + S.escapeHtml(item.name) + '</span>' + amount + '</li>';
  }

  function stepHtml(step) {
    var text = typeof step === 'string' ? step : step.text;
    var image = typeof step === 'string' ? null : step.image;
    var fig = image
      ? '<figure><img src="' + S.escapeHtml(image) + '" alt="" loading="lazy" decoding="async"></figure>'
      : '';
    return '<li class="step reveal"><p>' + S.escapeHtml(text) + '</p>' + fig + '</li>';
  }

  function navLinkHtml(item, dir) {
    if (!item) return '<span></span>';
    return '<a class="' + dir + '" href="recipe.html?id=' + encodeURIComponent(item.id) + '">' +
             '<span class="mono">' + (dir === 'prev' ? 'Newer' : 'Older') + '</span>' +
             '<strong>' + S.escapeHtml(item.title) + '</strong>' +
           '</a>';
  }

  /* ---------- 組み立て ---------- */
  var tags = (r.tags || []).map(function (t) {
    return '<span class="pill">' + S.escapeHtml(t) + '</span>';
  }).join('');

  var hero = r.image
    ? '<div class="detail__hero reveal"><img src="' + S.escapeHtml(r.image) +
      '" alt="' + S.escapeHtml(r.title) + '"></div>'
    : '';

  var ingredients = (r.ingredients || []).map(ingredientHtml).join('');
  var steps = (r.steps || []).map(stepHtml).join('');

  mount.innerHTML = '' +
    '<div class="detail__head">' +
      '<p class="detail__back mono"><a class="link" href="index.html">&larr; Index</a></p>' +
      '<p class="detail__sub">' + S.escapeHtml(S.formatDate(r.date)) +
        (r.category ? ' / ' + S.escapeHtml(r.category) : '') + '</p>' +
      '<h1 class="detail__title">' + S.escapeHtml(r.title) + '</h1>' +
      (r.summary ? '<p class="detail__lede">' + S.escapeHtml(r.summary) + '</p>' : '') +
      (tags ? '<div class="detail__pills">' + tags + '</div>' : '') +
    '</div>' +

    hero +

    '<dl class="specs">' +
      specHtml('Date', S.formatDate(r.date)) +
      specHtml('Servings', r.servings) +
      specHtml('Time', r.time) +
      specHtml('Category', r.category) +
    '</dl>' +

    '<div class="detail__cols">' +
      '<section class="ingredients">' +
        '<h2 class="block__title">Ingredients' +
          (r.servings ? ' — ' + S.escapeHtml(r.servings) : '') + '</h2>' +
        (ingredients
          ? '<ul class="ing-list">' + ingredients + '</ul>'
          : '<p class="mono">材料は未記入です</p>') +
      '</section>' +
      '<section>' +
        '<h2 class="block__title">Steps</h2>' +
        (steps
          ? '<ol class="steps">' + steps + '</ol>'
          : '<p class="mono">手順は未記入です</p>') +
        (r.notes
          ? '<div class="notes reveal"><h3 class="block__title">Notes</h3><p>' +
            S.escapeHtml(r.notes).replace(/\n/g, '<br>') + '</p></div>'
          : '') +
      '</section>' +
    '</div>' +

    '<nav class="detail__nav" aria-label="前後のレシピ">' +
      navLinkHtml(newer, 'prev') +
      navLinkHtml(older, 'next') +
    '</nav>';

  S.observeReveals(mount);
})();
