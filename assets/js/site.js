/* =========================================================
   site.js — 全ページ共通のふるまいとユーティリティ
   ========================================================= */
(function () {
  'use strict';

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');

  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- sticky header ---------- */
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 年表示 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- スクロール連動の表示 ---------- */
  var observer = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  }

  function observeReveals(scope) {
    var nodes = (scope || document).querySelectorAll('.reveal:not(.is-in)');
    Array.prototype.forEach.call(nodes, function (node, i) {
      if (!observer) { node.classList.add('is-in'); return; }
      node.style.transitionDelay = Math.min(i, 6) * 55 + 'ms';
      observer.observe(node);
    });
  }
  observeReveals(document);

  /* ---------- 共有ヘルパー ---------- */
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function parseDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
    if (!m) return null;
    return { y: +m[1], m: +m[2], d: +m[3] };
  }

  // 2026-09-20 -> "Sep.20,2026"（参考サイトと同じ書式）
  function formatDate(iso) {
    var p = parseDate(iso);
    if (!p) return String(iso || '');
    return MONTHS[p.m - 1] + '.' + p.d + ',' + p.y;
  }

  function year(iso) {
    var p = parseDate(iso);
    return p ? String(p.y) : '—';
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // 新しい順（同日なら id の降順で安定させる）
  function byNewest(a, b) {
    if (a.date === b.date) return String(b.id).localeCompare(String(a.id));
    return String(b.date).localeCompare(String(a.date));
  }

  function allRecipes() {
    var list = window.RECIPES;
    return Array.isArray(list) ? list.slice().sort(byNewest) : [];
  }

  function placeholder(title) {
    var label = encodeURIComponent(String(title || '').slice(0, 12));
    return 'images/placeholder.svg#' + label;
  }

  window.Site = {
    formatDate: formatDate,
    year: year,
    escapeHtml: escapeHtml,
    byNewest: byNewest,
    allRecipes: allRecipes,
    observeReveals: observeReveals,
    placeholder: placeholder
  };
})();
