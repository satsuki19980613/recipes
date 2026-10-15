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
    id: "2026-10-15-sage-risotto",
    title: "セージのリゾット",
    date: "2026-10-15",
    category: "リゾット",
    tags: ["ハーブ", "バター", "日本米", "2人前"],
    summary: "日本米はたっぷりのお湯で茹でてから仕上げる。粘りを落とすと、本場のリゾットに近い食感になる。",
    image: "images/2026-10-15-sage-risotto-7.jpg",
    servings: "2人分",
    time: "25分",
    ingredients: [
      { name: "日本米", amount: "1合" },
      { name: "生セージ", amount: "適量" },
      { name: "にんにく", amount: "1片" },
      { name: "バター", amount: "35g" },
      { name: "牛乳", amount: "50ml" },
      { name: "水", amount: "適量" },
      { name: "塩", amount: "適量" },
      { name: "ブラックペッパー", amount: "適量" },
      { name: "◎ お好みで", amount: "" },
      { name: "パルミジャーノチーズ", amount: "適量" },
      { name: "エキストラバージンオリーブオイル", amount: "適量" }
    ],
    steps: [
      { text: "セージは生のものを使う。にんにくはみじん切り、バターはサイコロ状に切っておく。", image: "images/2026-10-15-sage-risotto-1.jpg" },
      { text: "米を軽く洗い、たっぷりの水で茹でる。日本米だとおよそ13分。少し芯が残るくらいが頃合い。", image: "images/2026-10-15-sage-risotto-2.jpg" },
      { text: "フライパンににんにくとバターの半量を入れて加熱し、弱火でにんにくに火を通す。", image: "images/2026-10-15-sage-risotto-3.jpg" },
      { text: "米が茹で上がったらザルにあげて水を切る。", image: null },
      { text: "フライパンに残りのバター、セージ、米を入れ、中火で全体を絡める。", image: "images/2026-10-15-sage-risotto-5.jpg" },
      { text: "牛乳を加え、中火のまま全体になじませる。ここで激しく混ぜてはいけない。粘り気が出ないように、全体をさっくり混ぜる。", image: null },
      { text: "皿に平たく盛り付け、上に粗く砕いた黒コショウをかけたら完成。お好みでパルミジャーノチーズやエキストラバージンオリーブオイルをかけてもいい。", image: "images/2026-10-15-sage-risotto-7.jpg" }
    ],
    notes: "日本米は粘り気が強いので、たっぷりのお湯で茹でることで本場のリゾットに近い食感を再現できる。牛乳を入れてからは混ぜすぎないこと。"
  },
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
