/**
 * 擴充的食物分類遊戲題庫
 * 擴充原有的食物分類遊戲題庫至100題
 */

const expandedFoodDatabase = [
    // 保留原有的10個食物項目
    {
        id: "food1",
        name: "蘋果",
        description: "新鮮水果，富含維生素",
        nutrients: { "鉀": "中", "磷": "低" },
        image: "images/food/apple.jpg",
        category: "good",
        explanation: "蘋果的鉀含量為中等，磷含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food2",
        name: "白米飯",
        description: "主食，熱量來源",
        nutrients: { "鉀": "低", "磷": "中" },
        image: "images/food/rice.jpg",
        category: "good",
        explanation: "白米飯的鉀含量低，是適合腎臟病患者的主食選擇。"
    },
    {
        id: "food3",
        name: "香蕉",
        description: "水果，富含鉀",
        nutrients: { "鉀": "高", "磷": "中" },
        image: "images/food/banana.jpg",
        category: "bad",
        explanation: "香蕉富含鉀，腎臟病患者應限制食用，避免血鉀升高。"
    },
    {
        id: "food4",
        name: "菠菜",
        description: "綠葉蔬菜，富含鐵質",
        nutrients: { "鉀": "高", "磷": "高", "鈉": "低" },
        image: "images/food/spinach.jpg",
        category: "bad",
        explanation: "菠菜的鉀和磷含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food5",
        name: "白麵包",
        description: "麥製品，烘焙食品",
        nutrients: { "鉀": "低", "磷": "低", "鈉": "中" },
        image: "images/food/bread.jpg",
        category: "good",
        explanation: "白麵包的鉀和磷含量都低，是腎臟病患者的良好選擇。"
    },
    {
        id: "food6",
        name: "巧克力",
        description: "甜點，含可可成分",
        nutrients: { "鉀": "高", "磷": "高" },
        image: "images/food/chocolate.jpg",
        category: "bad",
        explanation: "巧克力中的鉀和磷含量都很高，腎臟病患者應避免食用。"
    },
    {
        id: "food7",
        name: "白蘿蔔",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "低", "磷": "低", "鈉": "低" },
        image: "images/food/radish.jpg",
        category: "good",
        explanation: "白蘿蔔的鉀、磷和鈉含量都低，是腎臟病患者的理想蔬菜選擇。"
    },
    {
        id: "food8",
        name: "起司",
        description: "乳製品，含鈣質",
        nutrients: { "鉀": "低", "磷": "高", "鈉": "高" },
        image: "images/food/cheese.jpg",
        category: "bad",
        explanation: "起司的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food9",
        name: "草莓",
        description: "漿果類水果",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/strawberry.jpg",
        category: "good",
        explanation: "草莓的磷和鈉含量低，鉀含量為中等，適合腎臟病患者適量食用。"
    },
    {
        id: "food10",
        name: "加工肉類",
        description: "火腿、臘腸等",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "高" },
        image: "images/food/processed-meat.jpg",
        category: "bad",
        explanation: "加工肉類的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    // 新增90個食物項目
    {
        id: "food11",
        name: "青江菜",
        description: "綠葉蔬菜，富含維生素",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/bok-choy.jpg",
        category: "good",
        explanation: "青江菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food12",
        name: "西瓜",
        description: "夏季水果，水分含量高",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/watermelon.jpg",
        category: "bad",
        explanation: "西瓜的鉀含量高，且水分含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food13",
        name: "豆腐",
        description: "豆製品，植物性蛋白質",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/tofu.jpg",
        category: "good",
        explanation: "豆腐的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food14",
        name: "馬鈴薯",
        description: "根莖類蔬菜，澱粉質",
        nutrients: { "鉀": "高", "磷": "中", "鈉": "低" },
        image: "images/food/potato.jpg",
        category: "bad",
        explanation: "馬鈴薯的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food15",
        name: "雞胸肉",
        description: "瘦肉，優質蛋白質",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/chicken-breast.jpg",
        category: "good",
        explanation: "雞胸肉的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food16",
        name: "優格",
        description: "發酵乳製品",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "低" },
        image: "images/food/yogurt.jpg",
        category: "bad",
        explanation: "優格的磷含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food17",
        name: "高麗菜",
        description: "十字花科蔬菜",
        nutrients: { "鉀": "低", "磷": "低", "鈉": "低" },
        image: "images/food/cabbage.jpg",
        category: "good",
        explanation: "高麗菜的鉀、磷和鈉含量都低，是腎臟病患者的理想蔬菜選擇。"
    },
    {
        id: "food18",
        name: "柳橙",
        description: "柑橘類水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/orange.jpg",
        category: "bad",
        explanation: "柳橙的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food19",
        name: "鮭魚",
        description: "深海魚類，富含omega-3",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/salmon.jpg",
        category: "good",
        explanation: "鮭魚的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food20",
        name: "冰淇淋",
        description: "乳製品甜點",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "中" },
        image: "images/food/ice-cream.jpg",
        category: "bad",
        explanation: "冰淇淋的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food21",
        name: "花椰菜",
        description: "十字花科蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/broccoli.jpg",
        category: "good",
        explanation: "花椰菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food22",
        name: "葡萄",
        description: "水果，富含抗氧化物質",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/grape.jpg",
        category: "bad",
        explanation: "葡萄的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food23",
        name: "雞蛋",
        description: "優質蛋白質來源",
        nutrients: { "鉀": "低", "磷": "中", "鈉": "低" },
        image: "images/food/egg.jpg",
        category: "good",
        explanation: "雞蛋的鉀含量低，磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food24",
        name: "番茄",
        description: "茄科蔬菜",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/tomato.jpg",
        category: "bad",
        explanation: "番茄的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food25",
        name: "白麵條",
        description: "麵食，澱粉質",
        nutrients: { "鉀": "低", "磷": "低", "鈉": "低" },
        image: "images/food/noodles.jpg",
        category: "good",
        explanation: "白麵條的鉀、磷和鈉含量都低，是腎臟病患者的良好主食選擇。"
    },
    {
        id: "food26",
        name: "牛奶",
        description: "乳製品，鈣質來源",
        nutrients: { "鉀": "高", "磷": "高", "鈉": "低" },
        image: "images/food/milk.jpg",
        category: "bad",
        explanation: "牛奶的鉀和磷含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food27",
        name: "青椒",
        description: "茄科蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/bell-pepper.jpg",
        category: "good",
        explanation: "青椒的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food28",
        name: "奇異果",
        description: "水果，富含維生素C",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/kiwi.jpg",
        category: "bad",
        explanation: "奇異果的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food29",
        name: "豬里肌肉",
        description: "瘦肉，優質蛋白質",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/pork-tenderloin.jpg",
        category: "good",
        explanation: "豬里肌肉的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food30",
        name: "蛋糕",
        description: "烘焙甜點",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "中" },
        image: "images/food/cake.jpg",
        category: "bad",
        explanation: "蛋糕的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food31",
        name: "小白菜",
        description: "綠葉蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/baby-bok-choy.jpg",
        category: "good",
        explanation: "小白菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food32",
        name: "芒果",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/mango.jpg",
        category: "bad",
        explanation: "芒果的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food33",
        name: "豆腐皮",
        description: "豆製品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/tofu-skin.jpg",
        category: "good",
        explanation: "豆腐皮的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food34",
        name: "地瓜",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "高", "磷": "中", "鈉": "低" },
        image: "images/food/sweet-potato.jpg",
        category: "bad",
        explanation: "地瓜的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food35",
        name: "雞腿肉",
        description: "雞肉，優質蛋白質",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/chicken-leg.jpg",
        category: "good",
        explanation: "雞腿肉的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food36",
        name: "優酪乳",
        description: "發酵乳製品",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "低" },
        image: "images/food/yogurt-drink.jpg",
        category: "bad",
        explanation: "優酪乳的磷含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food37",
        name: "空心菜",
        description: "綠葉蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/water-spinach.jpg",
        category: "good",
        explanation: "空心菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food38",
        name: "鳳梨",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/pineapple.jpg",
        category: "bad",
        explanation: "鳳梨的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food39",
        name: "豆腐乳",
        description: "發酵豆製品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "高" },
        image: "images/food/fermented-tofu.jpg",
        category: "bad",
        explanation: "豆腐乳的鈉含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food40",
        name: "山藥",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/yam.jpg",
        category: "good",
        explanation: "山藥的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food41",
        name: "雞翅",
        description: "雞肉，優質蛋白質",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/chicken-wings.jpg",
        category: "good",
        explanation: "雞翅的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food42",
        name: "布丁",
        description: "乳製品甜點",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "中" },
        image: "images/food/pudding.jpg",
        category: "bad",
        explanation: "布丁的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food43",
        name: "芥菜",
        description: "綠葉蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/mustard-greens.jpg",
        category: "good",
        explanation: "芥菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food44",
        name: "木瓜",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/papaya.jpg",
        category: "bad",
        explanation: "木瓜的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food45",
        name: "豆干",
        description: "豆製品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "高" },
        image: "images/food/dried-tofu.jpg",
        category: "bad",
        explanation: "豆干的鈉含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food46",
        name: "蓮藕",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/lotus-root.jpg",
        category: "good",
        explanation: "蓮藕的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food47",
        name: "雞胸肉絲",
        description: "雞肉，優質蛋白質",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/shredded-chicken.jpg",
        category: "good",
        explanation: "雞胸肉絲的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food48",
        name: "優格冰淇淋",
        description: "乳製品甜點",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "中" },
        image: "images/food/frozen-yogurt.jpg",
        category: "bad",
        explanation: "優格冰淇淋的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food49",
        name: "莧菜",
        description: "綠葉蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/amaranth.jpg",
        category: "good",
        explanation: "莧菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food50",
        name: "火龍果",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/dragon-fruit.jpg",
        category: "bad",
        explanation: "火龍果的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food51",
        name: "豆皮",
        description: "豆製品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/tofu-sheet.jpg",
        category: "good",
        explanation: "豆皮的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food52",
        name: "芋頭",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "高", "磷": "中", "鈉": "低" },
        image: "images/food/taro.jpg",
        category: "bad",
        explanation: "芋頭的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food53",
        name: "雞肉丸",
        description: "雞肉加工品",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "高" },
        image: "images/food/chicken-balls.jpg",
        category: "bad",
        explanation: "雞肉丸的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food54",
        name: "優格飲料",
        description: "乳製品飲料",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "中" },
        image: "images/food/yogurt-drink.jpg",
        category: "bad",
        explanation: "優格飲料的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food55",
        name: "油菜",
        description: "綠葉蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/rapeseed.jpg",
        category: "good",
        explanation: "油菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food56",
        name: "百香果",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/passion-fruit.jpg",
        category: "bad",
        explanation: "百香果的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food57",
        name: "豆漿",
        description: "豆類飲品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/soy-milk.jpg",
        category: "good",
        explanation: "豆漿的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food58",
        name: "山藥",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/yam.jpg",
        category: "good",
        explanation: "山藥的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food59",
        name: "雞肉漢堡",
        description: "速食",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "高" },
        image: "images/food/chicken-burger.jpg",
        category: "bad",
        explanation: "雞肉漢堡的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food60",
        name: "優格蛋糕",
        description: "乳製品甜點",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "中" },
        image: "images/food/yogurt-cake.jpg",
        category: "bad",
        explanation: "優格蛋糕的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food61",
        name: "芥蘭菜",
        description: "綠葉蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/kale.jpg",
        category: "good",
        explanation: "芥蘭菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food62",
        name: "榴槤",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "中", "鈉": "低" },
        image: "images/food/durian.jpg",
        category: "bad",
        explanation: "榴槤的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food63",
        name: "豆腐絲",
        description: "豆製品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/tofu-strips.jpg",
        category: "good",
        explanation: "豆腐絲的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food64",
        name: "馬鈴薯",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "高", "磷": "中", "鈉": "低" },
        image: "images/food/potato.jpg",
        category: "bad",
        explanation: "馬鈴薯的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food65",
        name: "雞肉三明治",
        description: "速食",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "高" },
        image: "images/food/chicken-sandwich.jpg",
        category: "bad",
        explanation: "雞肉三明治的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food66",
        name: "優格慕斯",
        description: "乳製品甜點",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "中" },
        image: "images/food/yogurt-mousse.jpg",
        category: "bad",
        explanation: "優格慕斯的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food67",
        name: "青椒",
        description: "茄科蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/bell-pepper.jpg",
        category: "good",
        explanation: "青椒的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food68",
        name: "荔枝",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/litchi.jpg",
        category: "bad",
        explanation: "荔枝的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food69",
        name: "豆腐乳",
        description: "發酵豆製品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "高" },
        image: "images/food/fermented-tofu.jpg",
        category: "bad",
        explanation: "豆腐乳的鈉含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food70",
        name: "山藥",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/yam.jpg",
        category: "good",
        explanation: "山藥的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food71",
        name: "雞肉沙拉",
        description: "健康餐點",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/chicken-salad.jpg",
        category: "good",
        explanation: "雞肉沙拉的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food72",
        name: "優格果昔",
        description: "乳製品飲料",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "中" },
        image: "images/food/yogurt-smoothie.jpg",
        category: "bad",
        explanation: "優格果昔的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food73",
        name: "茄子",
        description: "茄科蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/eggplant.jpg",
        category: "good",
        explanation: "茄子的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food74",
        name: "龍眼",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/longan.jpg",
        category: "bad",
        explanation: "龍眼的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food75",
        name: "豆干",
        description: "豆製品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "高" },
        image: "images/food/dried-tofu.jpg",
        category: "bad",
        explanation: "豆干的鈉含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food76",
        name: "山藥",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/yam.jpg",
        category: "good",
        explanation: "山藥的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food77",
        name: "雞肉湯",
        description: "湯品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "高" },
        image: "images/food/chicken-soup.jpg",
        category: "bad",
        explanation: "雞肉湯的鈉含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food78",
        name: "優格派",
        description: "乳製品甜點",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "中" },
        image: "images/food/yogurt-pie.jpg",
        category: "bad",
        explanation: "優格派的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food79",
        name: "青江菜",
        description: "綠葉蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/bok-choy.jpg",
        category: "good",
        explanation: "青江菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food80",
        name: "芒果",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/mango.jpg",
        category: "bad",
        explanation: "芒果的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food81",
        name: "豆腐皮",
        description: "豆製品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/tofu-skin.jpg",
        category: "good",
        explanation: "豆腐皮的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food82",
        name: "地瓜",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "高", "磷": "中", "鈉": "低" },
        image: "images/food/sweet-potato.jpg",
        category: "bad",
        explanation: "地瓜的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food83",
        name: "雞腿肉",
        description: "雞肉，優質蛋白質",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/chicken-leg.jpg",
        category: "good",
        explanation: "雞腿肉的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food84",
        name: "優酪乳",
        description: "發酵乳製品",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "低" },
        image: "images/food/yogurt-drink.jpg",
        category: "bad",
        explanation: "優酪乳的磷含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food85",
        name: "空心菜",
        description: "綠葉蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/water-spinach.jpg",
        category: "good",
        explanation: "空心菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food86",
        name: "鳳梨",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/pineapple.jpg",
        category: "bad",
        explanation: "鳳梨的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food87",
        name: "豆腐乳",
        description: "發酵豆製品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "高" },
        image: "images/food/fermented-tofu.jpg",
        category: "bad",
        explanation: "豆腐乳的鈉含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food88",
        name: "山藥",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/yam.jpg",
        category: "good",
        explanation: "山藥的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food89",
        name: "雞翅",
        description: "雞肉，優質蛋白質",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/chicken-wings.jpg",
        category: "good",
        explanation: "雞翅的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food90",
        name: "布丁",
        description: "乳製品甜點",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "中" },
        image: "images/food/pudding.jpg",
        category: "bad",
        explanation: "布丁的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food91",
        name: "芥菜",
        description: "綠葉蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/mustard-greens.jpg",
        category: "good",
        explanation: "芥菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food92",
        name: "木瓜",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/papaya.jpg",
        category: "bad",
        explanation: "木瓜的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food93",
        name: "豆干",
        description: "豆製品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "高" },
        image: "images/food/dried-tofu.jpg",
        category: "bad",
        explanation: "豆干的鈉含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food94",
        name: "蓮藕",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/lotus-root.jpg",
        category: "good",
        explanation: "蓮藕的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food95",
        name: "雞胸肉絲",
        description: "雞肉，優質蛋白質",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/shredded-chicken.jpg",
        category: "good",
        explanation: "雞胸肉絲的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food96",
        name: "優格冰淇淋",
        description: "乳製品甜點",
        nutrients: { "鉀": "中", "磷": "高", "鈉": "中" },
        image: "images/food/frozen-yogurt.jpg",
        category: "bad",
        explanation: "優格冰淇淋的磷和鈉含量都高，腎臟病患者應限制食用。"
    },
    {
        id: "food97",
        name: "莧菜",
        description: "綠葉蔬菜",
        nutrients: { "鉀": "中", "磷": "低", "鈉": "低" },
        image: "images/food/amaranth.jpg",
        category: "good",
        explanation: "莧菜的鉀含量為中等，磷和鈉含量低，適合腎臟病患者適量食用。"
    },
    {
        id: "food98",
        name: "火龍果",
        description: "熱帶水果",
        nutrients: { "鉀": "高", "磷": "低", "鈉": "低" },
        image: "images/food/dragon-fruit.jpg",
        category: "bad",
        explanation: "火龍果的鉀含量高，腎臟病患者應限制食用。"
    },
    {
        id: "food99",
        name: "豆皮",
        description: "豆製品",
        nutrients: { "鉀": "中", "磷": "中", "鈉": "低" },
        image: "images/food/tofu-sheet.jpg",
        category: "good",
        explanation: "豆皮的鉀和磷含量為中等，是腎臟病患者的良好蛋白質來源。"
    },
    {
        id: "food100",
        name: "芋頭",
        description: "根莖類蔬菜",
        nutrients: { "鉀": "高", "磷": "中", "鈉": "低" },
        image: "images/food/taro.jpg",
        category: "bad",
        explanation: "芋頭的鉀含量高，腎臟病患者應限制食用。"
    }
];

// 匯出擴充題庫供使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = expandedFoodDatabase;
} 