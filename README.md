# RECIPES

作ったご飯の備忘録。つくった順に並ぶ、個人用のレシピ記録。
静的な HTML / CSS / JavaScript だけで動き、GitHub Pages にそのまま置けます。

公開URL: https://satsuki19980613.github.io/recipes/

---

## 構成

```
.
├── index.html            トップ（時系列の一覧・年ごとにまとまる）
├── recipe.html           レシピ詳細（?id=... で切り替わる）
├── assets/
│   ├── css/style.css     デザイン一式
│   └── js/
│       ├── site.js       共通（テーマ・日付整形・スクロール表示）
│       ├── index.js      一覧の描画・絞り込み・Txt / Img 切り替え
│       └── recipe.js     詳細の描画
├── data/recipes.js       レシピデータ（ここだけが唯一のデータ）
├── images/               サイトが表示する写真（縮小済み）
└── originals/            元写真の保管庫（サイトからは参照しない）
    └── <レシピのid>/      1.jpg, 2.jpg ... は手順番号に対応
```

ページは `data/recipes.js` を読んで描画します。
レシピを増やすことは、このファイルに 1 件足すことと同じです。

---

## レシピを追加する

`data/recipes.js` の配列に 1 件足して、写真を `images/` に置き、
コミットして push すれば 1〜2 分でサイトに反映されます。並び順は気にしなくて大丈夫です
（`date` を見てサイト側が新しい順に並べ替えます）。

```js
{
  id: "2026-09-20-nikujaga",   // URL に使う一意の文字列
  title: "肉じゃが",
  date: "2026-09-20",          // YYYY-MM-DD
  category: "和食",
  tags: ["煮物", "定番"],
  summary: "一覧と詳細に出る短い説明",
  image: "images/nikujaga.jpg", // null にすると自動でプレースホルダ
  servings: "2人分",
  time: "45分",
  ingredients: [
    { name: "牛こま切れ肉", amount: "200g" }
  ],
  steps: [
    { text: "手順のテキスト", image: null }
  ],
  notes: "気づいたことのメモ"
}
```

`ingredients` の `amount` を空にすると、材料の見出し行として使えます
（例：`{ name: "◎ 合わせ調味料", amount: "" }`）。

---

## GitHub Pages の設定

リポジトリの **Settings → Pages** で

- Source: `Deploy from a branch`
- Branch: `main` / `(root)`

を選んで保存します。数分後に公開されます。

`.nojekyll` を置いているので、Jekyll の処理は通りません（ファイルがそのまま配信されます）。

---

## ローカルで確認する

`data/recipes.js` を `<script>` で読んでいるため、`index.html` をダブルクリックしても動きます。
サーバーで見たいときは、このフォルダで次のどれかを実行してください。

```bash
python -m http.server 8000
```

ブラウザで http://localhost:8000 を開きます。

---

## デザインについて

- 配色：オフホワイト `#f6f6f4` と黒。差し色にテラコッタ `#b4472b` を一箇所だけ
- 書体：本文 Inter / 日付・ラベルは Courier Prime（等幅）
- 日付は `Sep.20,2026` の書式で揃える
- 一覧は **Img**（写真グリッド）と **Txt**（一行のリスト）を切り替えられる
- OS のダークモードに追従。右上のボタンで手動でも切り替えられる

配色や余白は `assets/css/style.css` の先頭にある変数（`:root`）にまとまっています。

---

## 写真について

写真は 2 か所に置きます。

- `originals/<レシピのid>/` … カメラから出したままの元写真。保管用で、サイトは読みません
- `images/<レシピのid>-N.jpg` … サイトが表示する縮小版

縮小版は長辺 1600px・画質 82 の JPEG です。スマホの写真は EXIF に
回転情報が入っていて向きが崩れることがあるので、向きを焼き込んで
から保存します（同時に EXIF も落ちます）。

```bash
python -c "from PIL import Image, ImageOps; im=ImageOps.exif_transpose(Image.open('originals/<id>/1.jpg')).convert('RGB'); im.thumbnail((1600,1600), Image.LANCZOS); im.save('images/<id>-1.jpg','JPEG',quality=82,optimize=True,progressive=True)"
```

元写真も含めて 1 レシピあたり約 10MB です。GitHub Pages の目安は
サイト全体で 1GB なので、100 レシピ程度までは余裕があります。
元写真を増やしたくなくなったら `originals/` ごと消しても、
サイトの表示には影響しません。

---

## これから

- [ ] タグでの絞り込み
- [ ] 検索
