/* =========================================================
   admin.js — 投稿フォーム
   入力内容から data/recipes.js を組み立てて書き出す。
   ========================================================= */
(function () {
  'use strict';

  var S = window.Site;
  var $ = function (id) { return document.getElementById(id); };

  var form = $('postForm');
  if (!form) return;

  var DRAFT_KEY = 'recipe-draft';
  var existing = Array.isArray(window.RECIPES) ? window.RECIPES.slice() : [];

  /* =========================================================
     トースト
     ========================================================= */
  var toastEl = $('toast');
  var toastTimer = null;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2600);
  }

  /* =========================================================
     くり返し入力行（材料・手順）
     ========================================================= */
  function rowHtml(kind, index) {
    var idx = String(index + 1).padStart(2, '0');
    var pair = kind === 'ingredient'
      ? '<div class="pair">' +
          '<input type="text" data-field="name" placeholder="材料名">' +
          '<input type="text" data-field="amount" placeholder="分量">' +
        '</div>'
      : '<textarea data-field="text" rows="2" placeholder="手順を書く"></textarea>';

    return '<div class="repeat-row" data-kind="' + kind + '">' +
             '<span class="idx">' + idx + '</span>' +
             pair +
             '<button type="button" class="del" aria-label="この行を削除">&times;</button>' +
           '</div>';
  }

  function renumber(container) {
    Array.prototype.forEach.call(container.querySelectorAll('.idx'), function (el, i) {
      el.textContent = String(i + 1).padStart(2, '0');
    });
  }

  function addRow(container, kind, values) {
    var wrap = document.createElement('div');
    wrap.innerHTML = rowHtml(kind, container.children.length);
    var row = wrap.firstChild;
    container.appendChild(row);

    if (values) {
      Object.keys(values).forEach(function (key) {
        var input = row.querySelector('[data-field="' + key + '"]');
        if (input) input.value = values[key] || '';
      });
    }
    renumber(container);
    return row;
  }

  var ingredientsEl = $('ingredients');
  var stepsEl = $('steps');

  $('addIngredient').addEventListener('click', function () {
    addRow(ingredientsEl, 'ingredient').querySelector('input').focus();
  });
  $('addStep').addEventListener('click', function () {
    addRow(stepsEl, 'step').querySelector('textarea').focus();
  });

  form.addEventListener('click', function (e) {
    var del = e.target.closest('.del');
    if (!del) return;
    var row = del.closest('.repeat-row');
    var container = row.parentNode;
    row.remove();
    renumber(container);
    update();
  });

  /* =========================================================
     写真（長辺1600pxのJPEGに変換）
     ========================================================= */
  var imageState = { dataUrl: null, blob: null, ext: 'jpg' };
  var dropzone = $('dropzone');
  var fileInput = $('f-image');
  var dropPreview = $('dropPreview');
  var dropLabel = $('dropLabel');
  var btnSaveImage = $('btnSaveImage');
  var btnClearImage = $('btnClearImage');

  function loadImage(file) {
    if (!file || !/^image\//.test(file.type)) {
      toast('画像ファイルを選んでください');
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 1600;
        var scale = Math.min(1, max / Math.max(img.width, img.height));
        var canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(function (blob) {
          imageState.blob = blob;
          imageState.ext = 'jpg';
          imageState.dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          dropPreview.src = imageState.dataUrl;
          dropPreview.hidden = false;
          dropLabel.textContent = canvas.width + ' x ' + canvas.height;
          btnSaveImage.disabled = false;
          btnClearImage.disabled = false;
          update();
        }, 'image/jpeg', 0.82);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  fileInput.addEventListener('change', function () {
    if (fileInput.files && fileInput.files[0]) loadImage(fileInput.files[0]);
  });

  ['dragenter', 'dragover'].forEach(function (type) {
    dropzone.addEventListener(type, function (e) {
      e.preventDefault();
      dropzone.classList.add('is-over');
    });
  });
  ['dragleave', 'drop'].forEach(function (type) {
    dropzone.addEventListener(type, function (e) {
      e.preventDefault();
      dropzone.classList.remove('is-over');
    });
  });
  dropzone.addEventListener('drop', function (e) {
    var files = e.dataTransfer && e.dataTransfer.files;
    if (files && files[0]) loadImage(files[0]);
  });

  btnClearImage.addEventListener('click', function () {
    imageState = { dataUrl: null, blob: null, ext: 'jpg' };
    fileInput.value = '';
    dropPreview.hidden = true;
    dropPreview.removeAttribute('src');
    dropLabel.textContent = 'クリック、またはここに画像をドロップ';
    btnSaveImage.disabled = true;
    btnClearImage.disabled = true;
    update();
  });

  btnSaveImage.addEventListener('click', function () {
    if (!imageState.blob) return;
    download(imageState.blob, imageFileName());
    toast('images/ に入れてください');
  });

  /* =========================================================
     値の読み取り
     ========================================================= */
  function val(id) { return ($(id).value || '').trim(); }

  function slug(text) {
    return String(text)
      .trim()
      .toLowerCase()
      .replace(/[\s　]+/g, '-')
      .replace(/[\/\\?#\[\]@!$&'()*+,;=%"<>|^`{}~.]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function autoId() {
    var date = val('f-date') || new Date().toISOString().slice(0, 10);
    var name = slug(val('f-title'));
    return name ? date + '-' + name : date;
  }

  function currentId() {
    return val('f-id') || autoId();
  }

  function imageFileName() {
    return currentId() + '.' + imageState.ext;
  }

  function rows(container, kind) {
    return Array.prototype.map.call(container.children, function (row) {
      if (kind === 'ingredient') {
        return {
          name: (row.querySelector('[data-field="name"]').value || '').trim(),
          amount: (row.querySelector('[data-field="amount"]').value || '').trim()
        };
      }
      return { text: (row.querySelector('[data-field="text"]').value || '').trim(), image: null };
    }).filter(function (item) {
      return kind === 'ingredient' ? item.name : item.text;
    });
  }

  function collect() {
    var tags = val('f-tags')
      .split(/[,、]/)
      .map(function (t) { return t.trim(); })
      .filter(Boolean);

    return {
      id: currentId(),
      title: val('f-title'),
      date: val('f-date'),
      category: val('f-category'),
      tags: tags,
      summary: val('f-summary'),
      image: imageState.dataUrl ? 'images/' + imageFileName() : null,
      servings: val('f-servings'),
      time: val('f-time'),
      ingredients: rows(ingredientsEl, 'ingredient'),
      steps: rows(stepsEl, 'step'),
      notes: val('f-notes')
    };
  }

  /* =========================================================
     プレビュー
     ========================================================= */
  var previewCard = $('previewCard');

  function renderPreview(r) {
    var src = imageState.dataUrl || 'images/placeholder.svg';
    var meta = [r.category, r.time].filter(Boolean).map(S.escapeHtml).join(' / ');

    previewCard.innerHTML =
      '<div class="card">' +
        '<div class="card__media"><img src="' + src + '" alt="">' +
          '<span class="card__index">No.' + String(existing.length + 1).padStart(3, '0') + '</span>' +
        '</div>' +
        '<div class="card__body">' +
          '<h3 class="card__title">' + S.escapeHtml(r.title || '（料理名）') + '</h3>' +
          '<p class="card__meta">' +
            '<span>' + S.escapeHtml(r.date ? S.formatDate(r.date) : '—') + '</span>' +
            (meta ? '<span>' + meta + '</span>' : '') +
          '</p>' +
        '</div>' +
      '</div>';
  }

  /* =========================================================
     コード生成
     ========================================================= */
  var HEADER = [
    '/* =========================================================',
    '   recipes.js — レシピデータ',
    '   admin.html（投稿フォーム）から書き出されたファイルです。',
    '   手で編集しても問題ありません。並び順は date を見て',
    '   サイト側が自動で新しい順に並べ替えます。',
    '   ========================================================= */',
    ''
  ].join('\n');

  function q(value) { return JSON.stringify(value == null ? '' : String(value)); }

  function serializeRecipe(r, indent) {
    var pad = indent;
    var inner = pad + '  ';
    var lines = [];

    lines.push(pad + '{');
    lines.push(inner + 'id: ' + q(r.id) + ',');
    lines.push(inner + 'title: ' + q(r.title) + ',');
    lines.push(inner + 'date: ' + q(r.date) + ',');
    lines.push(inner + 'category: ' + q(r.category) + ',');
    lines.push(inner + 'tags: [' + (r.tags || []).map(q).join(', ') + '],');
    lines.push(inner + 'summary: ' + q(r.summary) + ',');
    lines.push(inner + 'image: ' + (r.image ? q(r.image) : 'null') + ',');
    lines.push(inner + 'servings: ' + q(r.servings) + ',');
    lines.push(inner + 'time: ' + q(r.time) + ',');

    if ((r.ingredients || []).length) {
      lines.push(inner + 'ingredients: [');
      r.ingredients.forEach(function (item, i, arr) {
        lines.push(inner + '  { name: ' + q(item.name) + ', amount: ' + q(item.amount) + ' }' +
          (i < arr.length - 1 ? ',' : ''));
      });
      lines.push(inner + '],');
    } else {
      lines.push(inner + 'ingredients: [],');
    }

    if ((r.steps || []).length) {
      lines.push(inner + 'steps: [');
      r.steps.forEach(function (item, i, arr) {
        var image = item.image ? q(item.image) : 'null';
        lines.push(inner + '  { text: ' + q(item.text) + ', image: ' + image + ' }' +
          (i < arr.length - 1 ? ',' : ''));
      });
      lines.push(inner + '],');
    } else {
      lines.push(inner + 'steps: [],');
    }

    lines.push(inner + 'notes: ' + q(r.notes));
    lines.push(pad + '}');
    return lines.join('\n');
  }

  function mergedList(r) {
    var list = existing.filter(function (item) { return item.id !== r.id; });
    list.push(r);
    return list.sort(S.byNewest);
  }

  function buildFile(r) {
    var list = mergedList(r);
    return HEADER + '\nwindow.RECIPES = [\n' +
      list.map(function (item) { return serializeRecipe(item, '  '); }).join(',\n') +
      '\n];\n';
  }

  /* =========================================================
     書き出し
     ========================================================= */
  function download(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function validate(r) {
    if (!r.title) { toast('料理名を入れてください'); $('f-title').focus(); return false; }
    if (!r.date) { toast('つくった日を入れてください'); $('f-date').focus(); return false; }
    return true;
  }

  $('btnDownload').addEventListener('click', function () {
    var r = collect();
    if (!validate(r)) return;
    download(new Blob([buildFile(r)], { type: 'text/javascript;charset=utf-8' }), 'recipes.js');
    var replaced = existing.some(function (item) { return item.id === r.id; });
    toast(replaced ? '既存の同じIDを置き換えました' : 'recipes.js を書き出しました');
  });

  $('btnCopy').addEventListener('click', function () {
    var r = collect();
    if (!validate(r)) return;
    var text = serializeRecipe(r, '  ') + ',';
    var done = function () { toast('1件ぶんをコピーしました'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  });

  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { toast('コピーできませんでした'); }
    ta.remove();
  }

  $('btnReset').addEventListener('click', function () {
    if (!confirm('入力した内容を消します。よろしいですか？')) return;
    try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
    location.reload();
  });

  /* =========================================================
     下書きの保存と復元
     ========================================================= */
  function saveDraft(r) {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        id: $('f-id').value, title: r.title, date: r.date, category: r.category,
        tags: $('f-tags').value, summary: r.summary, servings: r.servings, time: r.time,
        ingredients: r.ingredients, steps: r.steps, notes: r.notes
      }));
    } catch (e) {}
  }

  function restoreDraft() {
    var raw = null;
    try { raw = localStorage.getItem(DRAFT_KEY); } catch (e) {}
    if (!raw) return false;

    var d;
    try { d = JSON.parse(raw); } catch (e) { return false; }
    if (!d || (!d.title && !(d.steps || []).length)) return false;

    $('f-id').value = d.id || '';
    $('f-title').value = d.title || '';
    $('f-date').value = d.date || '';
    $('f-category').value = d.category || '';
    $('f-tags').value = d.tags || '';
    $('f-summary').value = d.summary || '';
    $('f-servings').value = d.servings || '';
    $('f-time').value = d.time || '';
    $('f-notes').value = d.notes || '';

    (d.ingredients || []).forEach(function (item) { addRow(ingredientsEl, 'ingredient', item); });
    (d.steps || []).forEach(function (item) { addRow(stepsEl, 'step', item); });
    return true;
  }

  /* =========================================================
     更新
     ========================================================= */
  var outputEl = $('output');

  function update() {
    var r = collect();
    $('f-id').placeholder = autoId();
    renderPreview(r);
    outputEl.textContent = serializeRecipe(r, '  ') + ',';
    saveDraft(r);
  }

  form.addEventListener('input', update);

  /* =========================================================
     初期化
     ========================================================= */
  (function init() {
    // カテゴリの候補を既存データから
    var datalist = $('categoryList');
    var seen = [];
    existing.forEach(function (r) {
      if (r.category && seen.indexOf(r.category) === -1) seen.push(r.category);
    });
    datalist.innerHTML = seen.map(function (c) {
      return '<option value="' + S.escapeHtml(c) + '"></option>';
    }).join('');

    var restored = restoreDraft();

    if (!$('f-date').value) {
      var now = new Date();
      var local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
      $('f-date').value = local.toISOString().slice(0, 10);
    }
    if (!ingredientsEl.children.length) {
      for (var i = 0; i < 3; i++) addRow(ingredientsEl, 'ingredient');
    }
    if (!stepsEl.children.length) {
      for (var j = 0; j < 3; j++) addRow(stepsEl, 'step');
    }

    update();
    if (restored) toast('前回の下書きを復元しました');
  })();
})();
