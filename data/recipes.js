/* =========================================================
   recipes.js — レシピデータ
   ---------------------------------------------------------
   ここが唯一のデータ置き場です。新しいレシピは配列の先頭
   （または末尾）に追加してください。並び順は date を見て
   サイト側が自動で新しい順に並べ替えます。

   1件の形：
   {
     id:          "2026-09-20-nikujaga",   // URL に使う一意の文字列
     title:       "肉じゃが",
     date:        "2026-09-20",            // YYYY-MM-DD
     category:    "和食",
     tags:        ["煮物", "定番"],
     summary:     "一覧と詳細に出る短い説明",
     image:       "images/nikujaga.svg",   // 省略可（null で自動プレースホルダ）
     servings:    "2人分",
     time:        "45分",
     ingredients: [{ name: "牛こま切れ肉", amount: "200g" }],
     steps:       [{ text: "手順のテキスト", image: null }],
     notes:       "気づいたことのメモ"
   }

   ※ 投稿フォーム（admin.html）が、この形のコードを
      そのまま生成します。
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
  },
  {
    id: "2026-09-20-nikujaga",
    title: "肉じゃが",
    date: "2026-09-20",
    category: "和食",
    tags: ["煮物", "定番", "作り置き"],
    summary: "だしを多めに取って、砂糖は控えめに。翌日のほうが味がしみておいしい。",
    image: "images/nikujaga.svg",
    servings: "2〜3人分",
    time: "45分",
    ingredients: [
      { name: "牛こま切れ肉", amount: "200g" },
      { name: "じゃがいも（男爵）", amount: "3個" },
      { name: "にんじん", amount: "1本" },
      { name: "玉ねぎ", amount: "1個" },
      { name: "糸こんにゃく", amount: "1袋" },
      { name: "サラダ油", amount: "大さじ1" },
      { name: "だし汁", amount: "400ml" },
      { name: "しょうゆ", amount: "大さじ3" },
      { name: "みりん", amount: "大さじ2" },
      { name: "砂糖", amount: "大さじ1" },
      { name: "酒", amount: "大さじ2" }
    ],
    steps: [
      { text: "じゃがいもは4等分、にんじんは乱切り、玉ねぎはくし形に切る。糸こんにゃくは下ゆでして食べやすく切る。", image: null },
      { text: "鍋に油を熱し、牛肉を色が変わるまで炒める。玉ねぎを加えて透き通るまで炒め合わせる。", image: null },
      { text: "じゃがいも、にんじん、糸こんにゃくを加えて全体に油をまわす。", image: null },
      { text: "だし汁と酒を入れて中火にかけ、沸いたらアクを丁寧に取る。", image: null },
      { text: "砂糖・みりん・しょうゆの順に加え、落としぶたをして弱めの中火で20分煮る。", image: null },
      { text: "火を止めて10分おき、味を含ませる。器に盛って完成。", image: null }
    ],
    notes: "砂糖を大さじ2にすると甘すぎた。大さじ1でちょうどいい。落としぶたはクッキングシートで代用可。"
  },
  {
    id: "2026-09-07-mapo-tofu",
    title: "麻婆豆腐",
    date: "2026-09-07",
    category: "中華",
    tags: ["辛い", "15分"],
    summary: "花椒を仕上げに追加するのがポイント。豆腐は木綿で崩れにくく。",
    image: "images/mapo.svg",
    servings: "2人分",
    time: "20分",
    ingredients: [
      { name: "木綿豆腐", amount: "1丁" },
      { name: "豚ひき肉", amount: "150g" },
      { name: "長ねぎ", amount: "1/2本" },
      { name: "にんにく・しょうが（みじん切り）", amount: "各1片" },
      { name: "豆板醤", amount: "小さじ2" },
      { name: "甜麺醤", amount: "大さじ1" },
      { name: "鶏がらスープ", amount: "200ml" },
      { name: "しょうゆ", amount: "大さじ1" },
      { name: "水溶き片栗粉", amount: "大さじ2" },
      { name: "花椒（粉）", amount: "小さじ1/2" },
      { name: "ごま油", amount: "小さじ1" }
    ],
    steps: [
      { text: "豆腐は2cm角に切り、塩を入れた湯で2分ゆでて水気を切る。", image: null },
      { text: "フライパンでひき肉を強火で炒め、しっかり色づくまで動かさない。", image: null },
      { text: "にんにく・しょうが・豆板醤を加えて弱火で香りを出し、甜麺醤を加えて炒める。", image: null },
      { text: "鶏がらスープとしょうゆを加え、豆腐を入れて3分煮る。", image: null },
      { text: "水溶き片栗粉を2回に分けて加え、とろみをつける。", image: null },
      { text: "長ねぎ、ごま油、花椒を加えてひと混ぜして火を止める。", image: null }
    ],
    notes: "とろみは一度で決めようとすると固まりすぎる。2回に分けるのが正解だった。"
  },
  {
    id: "2026-08-15-cold-pasta",
    title: "トマトの冷製パスタ",
    date: "2026-08-15",
    category: "パスタ",
    tags: ["夏", "冷たい"],
    summary: "湯むきしたトマトを30分マリネする。麺は表示時間より1分長めに。",
    image: "images/pasta.svg",
    servings: "1人分",
    time: "30分（マリネ時間を除く）",
    ingredients: [
      { name: "カッペリーニ", amount: "80g" },
      { name: "トマト（中）", amount: "2個" },
      { name: "にんにく", amount: "1/2片" },
      { name: "オリーブオイル", amount: "大さじ2" },
      { name: "塩", amount: "小さじ1/3" },
      { name: "バジル", amount: "5枚" },
      { name: "レモン汁", amount: "小さじ1" }
    ],
    steps: [
      { text: "トマトは湯むきして1cm角に切り、塩・オリーブオイル・すりおろしにんにく・レモン汁と合わせて冷蔵庫で30分マリネする。", image: null },
      { text: "たっぷりの湯に塩を入れ、カッペリーニを表示時間＋1分でゆでる。", image: null },
      { text: "氷水でしめて、水気をしっかり切る。ここで水が残ると味がぼやける。", image: null },
      { text: "マリネ液ごとトマトと和え、ちぎったバジルを散らす。", image: null }
    ],
    notes: "水気を切るのをサボったら味が薄くなった。キッチンペーパーで押さえるくらいでちょうどいい。"
  },
  {
    id: "2026-06-02-oyakodon",
    title: "親子丼",
    date: "2026-06-02",
    category: "和食",
    tags: ["丼", "15分"],
    summary: "卵は2回に分けて。二度目は火を止める直前に流して半熟で仕上げる。",
    image: "images/oyakodon.svg",
    servings: "1人分",
    time: "15分",
    ingredients: [
      { name: "鶏もも肉", amount: "120g" },
      { name: "玉ねぎ", amount: "1/4個" },
      { name: "卵", amount: "2個" },
      { name: "だし汁", amount: "80ml" },
      { name: "しょうゆ", amount: "大さじ1" },
      { name: "みりん", amount: "大さじ1" },
      { name: "砂糖", amount: "小さじ1" },
      { name: "ごはん", amount: "1杯" },
      { name: "三つ葉", amount: "適量" }
    ],
    steps: [
      { text: "鶏肉はひと口大、玉ねぎは薄切りにする。卵は軽くほぐす（白身を切りすぎない）。", image: null },
      { text: "小鍋にだし汁・しょうゆ・みりん・砂糖を入れて煮立て、玉ねぎを2分煮る。", image: null },
      { text: "鶏肉を加えて5分、火が通るまで煮る。", image: null },
      { text: "卵の2/3を回し入れ、ふたをして30秒。残りを流して火を止め、余熱で半熟にする。", image: null },
      { text: "ごはんにのせ、三つ葉を散らす。", image: null }
    ],
    notes: "卵を溶きすぎるとムラのない均一な黄色になってしまう。白身が少し残るくらいが見た目もいい。"
  },
  {
    id: "2025-12-24-roast-chicken",
    title: "ローストチキン",
    date: "2025-12-24",
    category: "オーブン",
    tags: ["イベント", "時間をかける"],
    summary: "前日から塩をして一晩。焼く1時間前に常温に戻すと火の入りが均一になる。",
    image: "images/chicken.svg",
    servings: "4人分",
    time: "2時間（塩をして一晩）",
    ingredients: [
      { name: "丸鶏", amount: "1.2kg" },
      { name: "塩", amount: "鶏の重さの1.2%" },
      { name: "黒こしょう", amount: "適量" },
      { name: "にんにく", amount: "1株" },
      { name: "ローズマリー", amount: "2枝" },
      { name: "じゃがいも", amount: "3個" },
      { name: "オリーブオイル", amount: "大さじ2" }
    ],
    steps: [
      { text: "前日：丸鶏の水気を拭き、全体と腹の中に塩をすり込む。ラップをせず冷蔵庫で一晩おいて皮を乾かす。", image: null },
      { text: "当日：焼く1時間前に冷蔵庫から出して常温に戻す。オーブンは220℃に予熱。", image: null },
      { text: "腹ににんにくとローズマリーを詰め、脚を縛る。全体にオリーブオイルとこしょうをまぶす。", image: null },
      { text: "天板にじゃがいもを並べ、その上に鶏をのせて220℃で20分焼く。", image: null },
      { text: "180℃に下げてさらに60分。途中30分で天板の脂をスプーンで回しかける。", image: null },
      { text: "焼き上がったらアルミホイルをかけて20分休ませてから切り分ける。", image: null }
    ],
    notes: "皮を乾かす一晩が効く。休ませずに切ったら肉汁が全部流れ出てしまった年があったので、20分は必ず待つ。"
  }
];
