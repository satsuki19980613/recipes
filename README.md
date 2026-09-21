# RECIPES

つくったごはんを時系列で残していく、個人のレシピアーカイブ。
静的な HTML / CSS / JavaScript だけで動き、GitHub Pages にそのまま置けます。

公開URL: https://satsuki19980613.github.io/recipes/

---

## 構成

```
.
├── index.html            トップ（時系列の一覧・年ごとにまとまる）
├── recipe.html           レシピ詳細（?id=... で切り替わる）
├── admin.html            投稿フォーム（GUI）
├── assets/
│   ├── css/style.css     デザイン一式
│   └── js/
│       ├── site.js       共通（テーマ・日付整形・スクロール表示）
│       ├── index.js      一覧の描画・絞り込み・Txt / Img 切り替え
│       ├── recipe.js     詳細の描画
│       └── admin.js      投稿フォームと recipes.js の書き出し
├── data/recipes.js       レシピデータ（ここだけが唯一のデータ）
└── images/               料理写真
```

ページは `data/recipes.js` を読んで描画します。
レシピを増やすことは、このファイルに 1 件足すことと同じです。

---

## レシピを追加する

### 1. 投稿フォームを使う（おすすめ）

1. サイトの **Post**（`admin.html`）を開く
2. 料理名・日付・材料・手順を入力する。右側にカードの見え方が出る
3. 写真を選ぶと長辺 1600px の JPEG に変換される。**「写真を保存」** で書き出す
4. **「recipes.js を書き出す」** を押す
5. 書き出した `recipes.js` で `data/recipes.js` を置き換え、写真を `images/` に入れる
6. コミットして push すると、1〜2 分でサイトに反映される

入力内容はブラウザに自動保存されるので、途中で閉じても続きから書けます。
同じ ID のレシピがすでにあるときは、書き出し時に置き換わります（＝編集にも使えます）。

### 2. 直接書く

`data/recipes.js` の配列に追加します。並び順は気にしなくて大丈夫です
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

## これから

- [ ] 投稿フォームから GitHub に直接コミットする（Personal Access Token または GitHub Actions）
- [ ] タグでの絞り込み
- [ ] 手順ごとの写真をフォームから登録する
- [ ] 検索
