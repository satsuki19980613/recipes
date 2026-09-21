/* =========================================================
   recipes.js — レシピデータ
   ---------------------------------------------------------
   ここが唯一のデータ置き場です。新しいレシピは配列の先頭
   （または末尾）に追加してください。並び順は date を見て
   サイト側が自動で新しい順に並べ替えます。

   1件の形：
   {
     id:          "2026-09-21-nameko-peperoncino",  // URLに使う一意の文字列
     title:       "なめこのペペロンチーノ",
     date:        "2026-09-21",            // YYYY-MM-DD
     category:    "パスタ",
     tags:        ["きのこ", "オイル系"],
     summary:     "一覧と詳細に出る短い説明",
     image:       "images/〜.jpg",          // null にすると自動でプレースホルダ
     servings:    "1人分",
     time:        "20分",
     ingredients: [{ name: "なめこ", amount: "1パック" }],
     steps:       [{ text: "手順のテキスト", image: "images/〜.jpg" }],  // image は null でも可
     notes:       "気づいたことのメモ"
   }

   写真は images/ に置き、長辺1600pxくらいのJPEGにしておくと
   表示が速い。手順の image は省略（null）してもよい。
   ========================================================= */

window.RECIPES = [
  {
    id: "2026-09-21-nameko-peperoncino",
    title: "なめこのペペロンチーノ",
    date: "2026-09-21",
    category: "パスタ",
    tags: ["きのこ", "オイル系", "1人前"],
    summary: "なめこは最初に強火で水分を飛ばしきる。焦げ目がつくまで炒めると、香りがまったく別のものになる。",
    image: "images/2026-09-21-nameko-peperoncino-8.jpg",
    servings: "1人分",
    time: "20分",
    ingredients: [
      { name: "なめこ", amount: "1パック" },
      { name: "パスタ", amount: "80g" },
      { name: "にんにく", amount: "2片" },
      { name: "鷹の爪", amount: "1本" },
      { name: "イタリアンパセリ", amount: "適量" },
      { name: "ピュアオリーブオイル（加熱用）", amount: "大さじ1" },
      { name: "エキストラバージンオリーブオイル（仕上げ用）", amount: "適量" },
      { name: "水", amount: "適量" },
      { name: "塩", amount: "適量" }
    ],
    steps: [
      { text: "にんにくをみじん切りにする。", image: "images/2026-09-21-nameko-peperoncino-1.jpg" },
      { text: "なめこを洗い、フライパンにピュアオリーブオイルを敷いて、最初は強火で炒める。ここでなめこの水分をしっかり飛ばす。", image: "images/2026-09-21-nameko-peperoncino-2.jpg" },
      { text: "水分がある程度飛んでしんなりしてきたら、刻んだにんにくと半分に割った鷹の爪を加える。鷹の爪は種が辛いので好みで加減を。辛いのが苦手なら割らずに入れる。", image: "images/2026-09-21-nameko-peperoncino-3.jpg" },
      { text: "これくらい水分が飛んで、なめこにしっかり焦げ目がついたらベースの完成。", image: "images/2026-09-21-nameko-peperoncino-4.jpg" },
      { text: "パスタを茹でる。種類は好みでいいが、オイルベースなのでブロンズタイプよりテフロンタイプのほうがおすすめ。", image: "images/2026-09-21-nameko-peperoncino-5.jpg" },
      { text: "茹でている間に、庭でイタリアンパセリを摘んでくる。今日はバジルもあったので飾りに使う。量が少ないので全部あとのせにする。", image: "images/2026-09-21-nameko-peperoncino-6.jpg" },
      { text: "パスタが茹で上がったらザルでしっかり水気を切り、フライパンでベースと合わせる。ここで仕上げのエキストラバージンオリーブオイルを適量加え、軽く煽って絡める。激しく混ぜるとパスタの表面が傷つくので注意。", image: "images/2026-09-21-nameko-peperoncino-7.jpg" },
      { text: "皿に盛り付け、刻んだパセリとバジルを散らして完成。Buon appetito!", image: "images/2026-09-21-nameko-peperoncino-8.jpg" }
    ],
    notes: "なめこは炒めはじめの強火で水分を飛ばしきるのがすべて。しんなりで止めずに、焦げ目がつくまで待つと香りが変わる。鷹の爪は種を残すとかなり辛くなるので、好みで割らずに使ってもいい。"
  }
];
