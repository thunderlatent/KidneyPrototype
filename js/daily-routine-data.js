/**
 * 腎臟保健日常模擬 - 數據文件
 * 包含所有時間點的場景、問題和選項數據
 */

// 主角資料
const characterData = {
    name: "小明",
    description: "第三期慢性腎臟病患者，需要謹慎管理生活習慣",
    initialHealth: 75,
    initialHydration: 60, 
    initialEnergy: 80,
    initialKidney: 70,
    maxWaterIntake: 1500, // 毫升
    currentWaterIntake: 0,
    maxSodiumIntake: 2000, // 毫克
    currentSodiumIntake: 0,
    maxProteinIntake: 60, // 克
    currentProteinIntake: 0,
    maxPhosphateIntake: 800, // 毫克
    currentPhosphateIntake: 0,
    maxPotassiumIntake: 2000, // 毫克
    currentPotassiumIntake: 0,
    medications: [
        { name: "降血壓藥", taken: false, time: "早上8:00" },
        { name: "降磷藥", taken: false, time: "餐前" },
        { name: "鐵劑", taken: false, time: "早上8:00" }
    ]
};

// 時間點設置
const timelineData = [
    {
        id: "morning_0800",
        time: "08:00",
        period: "早上",
        scene: "morning-home",
        title: "早晨 · 家裡",
        description: "新的一天開始了",
        message: "早上好！現在是早晨8點，你需要為這一天做好準備。血壓藥和鐵劑應該在早上服用，你感覺有些口渴。",
        question: "你現在應該先做什麼？",
        options: [
            {
                id: "take_medicine_first",
                title: "先服用早上的藥物",
                description: "按醫囑服用血壓藥和鐵劑",
                effects: {
                    health: +5,
                    hydration: 0,
                    energy: 0,
                    kidney: +10,
                    waterIntake: 150, // 用水吞服藥物
                    feedback: "正確！空腹服用血壓藥和鐵劑是正確的選擇，有助於藥物吸收。"
                }
            },
            {
                id: "drink_water_first",
                title: "先喝水解渴",
                description: "喝杯水補充水分",
                effects: {
                    health: 0,
                    hydration: +10,
                    energy: +2,
                    kidney: 0,
                    waterIntake: 300,
                    feedback: "喝水解渴是好習慣，但最好先服藥，確保不會忘記。"
                }
            },
            {
                id: "prepare_breakfast_first",
                title: "先準備早餐",
                description: "做早餐再考慮其他事情",
                effects: {
                    health: -2,
                    hydration: -5,
                    energy: +5,
                    kidney: -5,
                    feedback: "先準備早餐可能會讓你忘記服藥，慢性腎病患者應該養成按時服藥的習慣。"
                }
            }
        ]
    },
    {
        id: "morning_0830",
        time: "08:30",
        period: "早上",
        scene: "morning-breakfast",
        title: "早晨 · 早餐",
        description: "選擇合適的早餐",
        message: "是時候準備早餐了。作為腎臟病患者，選擇適合的早餐很重要。",
        question: "早餐你會選擇哪一種？",
        options: [
            {
                id: "kidney_friendly_breakfast",
                title: "腎友好早餐",
                description: "低鹽麥片粥、雞蛋白、少量水果",
                effects: {
                    health: +10,
                    hydration: +5,
                    energy: +15,
                    kidney: +10,
                    waterIntake: 200,
                    sodiumIntake: 150,
                    proteinIntake: 10,
                    phosphateIntake: 100,
                    potassiumIntake: 300,
                    feedback: "excellent! 低鹽、適量蛋白的早餐組合很適合腎臟病患者。"
                }
            },
            {
                id: "regular_breakfast",
                title: "一般早餐",
                description: "鹹豆漿、油條、火腿蛋",
                effects: {
                    health: -5,
                    hydration: +5,
                    energy: +20,
                    kidney: -10,
                    waterIntake: 300,
                    sodiumIntake: 800,
                    proteinIntake: 15,
                    phosphateIntake: 400,
                    potassiumIntake: 400,
                    feedback: "這種早餐含有較多鹽分和磷，對腎臟病患者不是理想選擇。"
                }
            },
            {
                id: "skip_breakfast",
                title: "跳過早餐",
                description: "節省時間，直接去工作",
                effects: {
                    health: -10,
                    hydration: -10,
                    energy: -20,
                    kidney: -5,
                    feedback: "跳過早餐會影響服藥效果，也會讓你整個上午沒有足夠能量。"
                }
            }
        ]
    },
    {
        id: "morning_1000",
        time: "10:00",
        period: "上午",
        scene: "morning-work",
        title: "上午 · 工作",
        description: "處理上午工作任務",
        message: "經過兩小時的工作，你感到有些口渴，同事也邀請你參加10分鐘的午休活動。",
        question: "你會選擇怎麼做？",
        options: [
            {
                id: "moderate_water_break",
                title: "喝適量的水，短暫休息",
                description: "補充約200毫升水，伸展活動5分鐘",
                effects: {
                    health: +5,
                    hydration: +10,
                    energy: +5,
                    kidney: +5,
                    waterIntake: 200,
                    feedback: "非常好！適量喝水並短暫休息對身體有益，也能提高工作效率。"
                }
            },
            {
                id: "excessive_water",
                title: "一次喝大量水",
                description: "一次補充500毫升水解渴",
                effects: {
                    health: -5,
                    hydration: +15,
                    energy: 0,
                    kidney: -10,
                    waterIntake: 500,
                    feedback: "腎臟病患者需要控制總水分攝入，一次喝太多水會增加腎臟負擔。"
                }
            },
            {
                id: "sugary_drink",
                title: "喝含糖飲料",
                description: "同事提供的含糖咖啡或奶茶",
                effects: {
                    health: -10,
                    hydration: +5,
                    energy: +15,
                    kidney: -15,
                    waterIntake: 300,
                    phosphateIntake: 200,
                    potassiumIntake: 300,
                    feedback: "含糖飲料通常含有高磷、高鉀成分，也增加心血管疾病風險，應盡量避免。"
                }
            }
        ]
    },
    {
        id: "noon_1200",
        time: "12:00",
        period: "中午",
        scene: "lunch-time",
        title: "中午 · 午餐",
        description: "選擇合適的午餐",
        message: "到了午餐時間，團隊決定一起去餐廳吃飯。作為腎臟病患者，你需要謹慎選擇。",
        question: "你會選擇哪種午餐？",
        options: [
            {
                id: "homemade_lunch",
                title: "自帶午餐",
                description: "自備的低鹽低磷餐食",
                effects: {
                    health: +15,
                    hydration: +5,
                    energy: +20,
                    kidney: +15,
                    waterIntake: 200,
                    sodiumIntake: 300,
                    proteinIntake: 20,
                    phosphateIntake: 150,
                    potassiumIntake: 400,
                    feedback: "自備餐食是最好的選擇，可以精確控制各種營養素攝入。"
                }
            },
            {
                id: "restaurant_careful",
                title: "餐廳進食但謹慎選擇",
                description: "白飯、清蒸魚、少量青菜",
                effects: {
                    health: +5,
                    hydration: +5,
                    energy: +15,
                    kidney: +5,
                    waterIntake: 300,
                    sodiumIntake: 600,
                    proteinIntake: 25,
                    phosphateIntake: 300,
                    potassiumIntake: 600,
                    feedback: "在餐廳吃飯時謹慎選擇是可行的，但仍需注意鹽分攝入。"
                }
            },
            {
                id: "restaurant_normal",
                title: "和同事同樣的餐點",
                description: "紅燒肉、炒青菜、米飯、湯",
                effects: {
                    health: -10,
                    hydration: +10,
                    energy: +25,
                    kidney: -15,
                    waterIntake: 500,
                    sodiumIntake: 1200,
                    proteinIntake: 30,
                    phosphateIntake: 500,
                    potassiumIntake: 800,
                    feedback: "餐廳食物通常含鹽過高，選擇一般餐點可能導致一天的鹽分攝入超標。"
                }
            }
        ]
    },
    {
        id: "noon_1230",
        time: "12:30",
        period: "中午",
        scene: "lunch-medication",
        title: "中午 · 用餐藥物",
        description: "飯後用藥",
        message: "午餐後，你記得醫生開了降磷藥，應在餐前或餐時服用。",
        question: "關於降磷藥，你會怎麼做？",
        options: [
            {
                id: "realize_missed_phosphate",
                title: "意識到忘記服用，立即補服",
                description: "雖然餐後，但立即補服藥物",
                effects: {
                    health: +5,
                    hydration: 0,
                    energy: 0,
                    kidney: +5,
                    waterIntake: 150,
                    feedback: "雖然最佳時間是餐前服用，但意識到忘記並立即補服總比不服好。降磷藥在餐中或餐後很快服用仍有一定效果。"
                }
            },
            {
                id: "postpone_medication",
                title: "決定晚餐前再服用",
                description: "覺得晚一點服用問題不大",
                effects: {
                    health: -5,
                    hydration: 0,
                    energy: 0,
                    kidney: -10,
                    feedback: "降磷藥需要與食物同時服用才能發揮作用，推遲到晚餐意味著午餐中的磷吸收不會受到控制。"
                }
            },
            {
                id: "skip_medication",
                title: "今天跳過這個藥",
                description: "偶爾漏服一次應該沒關係",
                effects: {
                    health: -10,
                    hydration: 0,
                    energy: 0,
                    kidney: -15,
                    feedback: "降磷藥對控制體內磷水平至關重要，高磷會導致副甲狀腺機能亢進和骨骼問題，不應該跳過。"
                }
            }
        ]
    },
    {
        id: "afternoon_1500",
        time: "15:00",
        period: "下午",
        scene: "afternoon-break",
        title: "下午 · 休息時間",
        description: "下午的小憩時間",
        message: "現在是下午3點，你有15分鐘的休息時間。同事們在準備茶點和飲料。",
        question: "下午茶點，你會選擇什麼？",
        options: [
            {
                id: "fruit_water",
                title: "水果切片和白開水",
                description: "選擇低鉀水果如蘋果，配白開水",
                effects: {
                    health: +10,
                    hydration: +10,
                    energy: +10,
                    kidney: +5,
                    waterIntake: 200,
                    potassiumIntake: 150,
                    feedback: "低鉀水果和白開水是腎友的好選擇，提供能量不增加腎臟負擔。"
                }
            },
            {
                id: "biscuits_tea",
                title: "餅乾和茶",
                description: "幾塊餅乾配茶飲料",
                effects: {
                    health: -5,
                    hydration: +5,
                    energy: +15,
                    kidney: -5,
                    waterIntake: 250,
                    sodiumIntake: 350,
                    phosphateIntake: 200,
                    feedback: "餅乾通常含有較高鹽分和磷添加劑，茶中也有一定咖啡因，影響藥物吸收。"
                }
            },
            {
                id: "skip_snack",
                title: "不吃點心繼續工作",
                description: "放棄休息時間繼續工作任務",
                effects: {
                    health: -5,
                    hydration: -10,
                    energy: -15,
                    kidney: -5,
                    feedback: "適當休息對身體健康和工作效率都有好處，持續工作容易疲勞並可能導致水分攝入不足。"
                }
            }
        ]
    },
    {
        id: "evening_1800",
        time: "18:00",
        period: "傍晚",
        scene: "commute-home",
        title: "傍晚 · 通勤回家",
        description: "結束工作回家途中",
        message: "下班時間到了，你準備回家。路程大約需要30分鐘，你感覺有些疲勞。",
        question: "回家途中，你會選擇？",
        options: [
            {
                id: "walk_slowly",
                title: "緩慢步行",
                description: "利用步行做輕度運動",
                effects: {
                    health: +10,
                    hydration: -10,
                    energy: -5,
                    kidney: +5,
                    feedback: "適度步行是很好的運動方式，可以改善心血管健康。記得不要走太快，避免過度疲勞。"
                }
            },
            {
                id: "take_bus",
                title: "乘坐公車",
                description: "節省體力乘坐公車回家",
                effects: {
                    health: 0,
                    hydration: -5,
                    energy: +5,
                    kidney: 0,
                    feedback: "如果感到疲勞，乘坐公車是合理的選擇，但要注意車上人多時的感染風險。"
                }
            },
            {
                id: "buy_drinks",
                title: "買飲料解渴後再回家",
                description: "在便利商店購買飲料",
                effects: {
                    health: -10,
                    hydration: +5,
                    energy: +5,
                    kidney: -10,
                    waterIntake: 500,
                    sodiumIntake: 150,
                    potassiumIntake: 200,
                    phosphateIntake: 150,
                    feedback: "市售飲料通常含有添加劑、磷、鉀等成分，不適合腎臟病患者頻繁飲用。"
                }
            }
        ]
    },
    {
        id: "evening_1900",
        time: "19:00",
        period: "晚上",
        scene: "dinner-time",
        title: "晚上 · 晚餐",
        description: "準備或選擇晚餐",
        message: "到家後，是時候準備晚餐了。作為腎臟病患者，晚餐選擇影響夜間休息和第二天的狀態。",
        question: "晚餐你會選擇？",
        options: [
            {
                id: "light_dinner",
                title: "清淡晚餐",
                description: "白飯、清蒸雞肉、燙青菜",
                effects: {
                    health: +15,
                    hydration: +5,
                    energy: +10,
                    kidney: +15,
                    waterIntake: 300,
                    sodiumIntake: 250,
                    proteinIntake: 20,
                    phosphateIntake: 200,
                    potassiumIntake: 400,
                    feedback: "清淡的晚餐有助於控制血壓和減輕腎臟負擔，同時確保足夠的營養。"
                }
            },
            {
                id: "order_delivery",
                title: "叫外賣",
                description: "方便的外賣餐點",
                effects: {
                    health: -10,
                    hydration: +5,
                    energy: +15,
                    kidney: -15,
                    waterIntake: 300,
                    sodiumIntake: 1000,
                    proteinIntake: 25,
                    phosphateIntake: 400,
                    potassiumIntake: 650,
                    feedback: "外賣食品通常含鹽量高，並且添加劑較多，不適合腎臟病患者經常食用。"
                }
            },
            {
                id: "protein_rich_dinner",
                title: "高蛋白晚餐",
                description: "大量肉類和豐富配菜",
                effects: {
                    health: -15,
                    hydration: +5,
                    energy: +20,
                    kidney: -20,
                    waterIntake: 350,
                    sodiumIntake: 800,
                    proteinIntake: 40,
                    phosphateIntake: 500,
                    potassiumIntake: 800,
                    feedback: "高蛋白飲食會增加腎臟負擔，尤其是在晚間，可能影響睡眠質量並加速腎功能下降。"
                }
            }
        ]
    },
    {
        id: "night_2100",
        time: "21:00",
        period: "夜晚",
        scene: "evening-activity",
        title: "夜晚 · 休閒活動",
        description: "選擇晚間活動",
        message: "吃完晚餐後，你有一些自由時間可以放鬆。明天還要上班，需要合理安排夜晚時間。",
        question: "晚上的時間你會？",
        options: [
            {
                id: "health_tracking",
                title: "記錄健康數據",
                description: "記錄今日飲食、服藥、測量血壓",
                effects: {
                    health: +15,
                    hydration: 0,
                    energy: -5,
                    kidney: +15,
                    feedback: "記錄健康數據有助於追蹤病情進展，也可以幫助醫生更好地調整治療方案。"
                }
            },
            {
                id: "watch_tv",
                title: "看電視放鬆",
                description: "看電視節目放鬆心情",
                effects: {
                    health: 0,
                    hydration: -5,
                    energy: +5,
                    kidney: 0,
                    feedback: "適當放鬆對心理健康有益，但要注意不要看得太晚影響睡眠。"
                }
            },
            {
                id: "late_night_snack",
                title: "享用夜宵和飲料",
                description: "吃些零食，喝些飲料",
                effects: {
                    health: -15,
                    hydration: +10,
                    energy: -10,
                    kidney: -15,
                    waterIntake: 400,
                    sodiumIntake: 600,
                    phosphateIntake: 300,
                    feedback: "睡前進食會增加腎臟負擔，影響睡眠質量，可能導致水腫和高血壓，應避免。"
                }
            }
        ]
    },
    {
        id: "night_2200",
        time: "22:00",
        period: "夜晚",
        scene: "bedtime-routine",
        title: "夜晚 · 睡前準備",
        description: "為睡眠做準備",
        message: "現在是晚上10點，是時候準備就寢了。充足的睡眠對腎臟病患者特別重要。",
        question: "睡前你會？",
        options: [
            {
                id: "proper_routine",
                title: "檢查藥物並早睡",
                description: "確認明天的藥物，刷牙後就寢",
                effects: {
                    health: +15,
                    hydration: 0,
                    energy: +25,
                    kidney: +10,
                    feedback: "良好的睡前習慣和充足的睡眠有助於身體恢復和毒素清除，對腎臟健康很重要。"
                }
            },
            {
                id: "late_water",
                title: "喝水後就寢",
                description: "睡前再喝一大杯水",
                effects: {
                    health: -10,
                    hydration: +15,
                    energy: -10,
                    kidney: -15,
                    waterIntake: 500,
                    feedback: "睡前大量飲水會增加夜間排尿，打擾睡眠質量，也可能導致水腫。腎功能下降的患者尤其要避免。"
                }
            },
            {
                id: "stay_up_late",
                title: "熬夜看手機",
                description: "再玩一會手機再睡",
                effects: {
                    health: -15,
                    hydration: -5,
                    energy: -20,
                    kidney: -10,
                    feedback: "熬夜和藍光暴露會影響睡眠質量，長期可能導致慢性疲勞和免疫力下降，加重腎臟負擔。"
                }
            }
        ]
    }
];

// 保健日常模擬遊戲數據
const gameScenarios = [
    {
        time: "上午 8:00",
        location: "早晨 · 家裡",
        description: "新的一天開始了",
        question: "剛起床，小明感到有些口渴。他應該怎麼做？",
        image: "morning-home.jpg",
        options: [
            {
                text: "立即喝下一大杯水解渴",
                effect: "這對一般人來說是好習慣，但對腎臟病患者，一次大量飲水會增加腎臟負擔。",
                score: 2,
                feedback: "應避免一次喝太多水，改為少量多次飲水。"
            },
            {
                text: "喝一小杯溫水，稍後再補充",
                effect: "小量多次飲水是腎臟病患者的理想方式，有助於平衡水分攝入。",
                score: 5,
                feedback: "分次少量飲水是正確的做法，有助於控制水分平衡。"
            },
            {
                text: "不喝水，先吃早餐再說",
                effect: "忽視口渴信號不是好習慣，腎臟病患者仍需合理補充水分。",
                score: 1,
                feedback: "忽略身體的口渴信號可能導致脫水問題。"
            }
        ]
    },
    {
        time: "上午 9:30",
        location: "早餐時間 · 家裡",
        description: "該準備早餐了",
        question: "小明需要準備早餐，他應該選擇什麼？",
        image: "breakfast.jpg",
        options: [
            {
                text: "鹹豆漿配油條",
                effect: "鹹豆漿鈉含量高，油條是高磷食品，兩者都不適合腎臟病患者。",
                score: 1,
                feedback: "鹹豆漿和油條的鈉、磷含量過高，不適合腎臟病患者。"
            },
            {
                text: "麥片粥配少許堅果",
                effect: "麥片富含纖維但不會增加腎臟負擔，少量堅果提供優質蛋白質。",
                score: 5,
                feedback: "麥片粥含適量碳水化合物，纖維豐富且低磷、低鉀。"
            },
            {
                text: "火腿蛋三明治",
                effect: "加工火腿含高鈉和磷添加劑，不適合腎臟病患者。",
                score: 2,
                feedback: "加工火腿含有大量鈉和磷添加劑，應減少食用頻率。"
            }
        ]
    },
    {
        time: "上午 11:00",
        location: "服藥時間 · 家裡",
        description: "該服用腎臟保護藥物了",
        question: "小明需要服用降血壓藥物及磷結合劑，應該怎麼做？",
        image: "medication.jpg",
        options: [
            {
                text: "降血壓藥物和磷結合劑一起服用",
                effect: "磷結合劑應與食物一起服用才能發揮作用，空腹服用效果不佳。",
                score: 2,
                feedback: "磷結合劑應與含磷食物一起服用，才能有效結合食物中的磷。"
            },
            {
                text: "先服降血壓藥物，等午餐時再服磷結合劑",
                effect: "正確做法，降血壓藥物按時服用，磷結合劑與食物一起服用。",
                score: 5,
                feedback: "正確區分不同藥物的服用時間，有助於藥物發揮最佳效果。"
            },
            {
                text: "感覺今天身體狀況良好，暫時不服藥",
                effect: "腎臟病患者不應自行停藥，即使症狀改善也應按醫囑服藥。",
                score: 0,
                feedback: "自行停藥是危險的，可能導致血壓波動和疾病進展。"
            }
        ]
    },
    {
        time: "中午 12:30",
        location: "午餐時間 · 辦公室",
        description: "小明需要解決午餐問題",
        question: "同事們打算訂外賣，小明應該如何選擇午餐？",
        image: "lunch.jpg",
        options: [
            {
                text: "麻辣燙套餐",
                effect: "麻辣燙通常含高鈉、高鉀，辛辣食物還可能刺激胃腸道。",
                score: 0,
                feedback: "麻辣燙通常含有大量鈉、鉀，不適合腎臟病患者。"
            },
            {
                text: "自帶的雞肉三明治和蘋果",
                effect: "提前準備的餐食更容易控制鈉、鉀、磷的攝入量。",
                score: 5,
                feedback: "自備餐食是控制飲食成分的最佳方式，值得鼓勵。"
            },
            {
                text: "便當店的魚香肉絲飯",
                effect: "外賣飯菜通常鈉含量高，不易控制調味料用量。",
                score: 2,
                feedback: "外食鈉含量通常較高，但偶爾一次可接受，應選擇少油少鹽。"
            }
        ]
    },
    {
        time: "下午 3:00",
        location: "辦公室休息時間",
        description: "小明感到有些疲勞",
        question: "小明下午感到疲勞，他應該怎麼做？",
        image: "office-break.jpg",
        options: [
            {
                text: "喝杯濃咖啡提神",
                effect: "咖啡因會增加心臟負擔和血壓，腎臟病患者應限制攝入。",
                score: 1,
                feedback: "濃咖啡可能使血壓升高，導致心率加快，應避免或限制攝入。"
            },
            {
                text: "短暫休息並做幾個伸展運動",
                effect: "適當休息和輕度運動有助於改善血液迴圈，緩解疲勞。",
                score: 5,
                feedback: "適當休息和輕度運動是緩解疲勞的健康方式。"
            },
            {
                text: "吃塊巧克力補充能量",
                effect: "巧克力含糖量高，未控制血糖的腎臟病患者應謹慎食用。",
                score: 2,
                feedback: "高糖食品會增加血糖負擔，但少量食用偶爾可接受。"
            }
        ]
    },
    {
        time: "下午 5:30",
        location: "下班時間 · 公車站",
        description: "小明正在等公車回家",
        question: "小明感到口渴，公車站附近有飲料店，他應該選擇什麼？",
        image: "bus-stop.jpg",
        options: [
            {
                text: "運動飲料",
                effect: "運動飲料含電解質，可能含高鉀、高磷，不適合腎臟病患者。",
                score: 0,
                feedback: "運動飲料通常含有高濃度電解質，不適合腎臟病患者。"
            },
            {
                text: "攜帶的常溫白開水",
                effect: "自帶白開水是腎臟病患者最安全的選擇，方便控制飲水量。",
                score: 5,
                feedback: "白開水是最佳選擇，可以控制飲水量並避免不必要的添加劑。"
            },
            {
                text: "無糖綠茶",
                effect: "茶類飲料含生物鹼，可能增加腎臟負擔，偶爾少量飲用可接受。",
                score: 2,
                feedback: "茶類飲料含有茶鹼，過量飲用可能增加腎臟負擔。"
            }
        ]
    },
    {
        time: "晚上 7:00",
        location: "晚餐時間 · 家裡",
        description: "小明在準備晚餐",
        question: "小明在準備晚餐，他應該選擇什麼烹飪方式？",
        image: "dinner-cooking.jpg",
        options: [
            {
                text: "用高湯煮一鍋燉菜",
                effect: "高湯通常鈉含量高，燉煮會使食材中的鉀溶出到湯中。",
                score: 1,
                feedback: "高湯通常含有大量鈉，燉煮使蔬菜中的鉀溶出，不易控制攝入量。"
            },
            {
                text: "先汆燙蔬菜再清炒",
                effect: "汆燙可去除部分鉀，清炒用油少且易控制鹽的用量。",
                score: 5,
                feedback: "汆燙蔬菜可去除部分鉀，清炒使用較少油鹽，適合腎臟病患者。"
            },
            {
                text: "使用現成醬料燒烤肉類",
                effect: "現成醬料通常含高鈉、高糖，燒烤產生有害物質。",
                score: 0,
                feedback: "現成醬料常含有過量鈉和磷添加劑，燒烤可能產生有害物質。"
            }
        ]
    },
    {
        time: "晚上 9:00",
        location: "休閒時間 · 家裡",
        description: "小明想放鬆一下",
        question: "小明想放鬆身心，他應該選擇什麼活動？",
        image: "relaxing-evening.jpg",
        options: [
            {
                text: "看電視吃零食",
                effect: "久坐不動加上零食攝入，可能增加鈉、鉀、磷的攝入。",
                score: 1,
                feedback: "晚間零食易導致鈉磷超標，長時間久坐對健康也不利。"
            },
            {
                text: "進行15分鐘的舒緩瑜伽",
                effect: "適當的輕度運動有助於血液循環，舒緩壓力不增加腎臟負擔。",
                score: 5,
                feedback: "溫和的瑜伽可改善血液循環，舒緩壓力，有益身心健康。"
            },
            {
                text: "和朋友外出喝酒聊天",
                effect: "酒精會增加腎臟負擔，外出環境不易控制飲食。",
                score: 0,
                feedback: "酒精會增加腎臟負擔，腎臟病患者應避免飲酒。"
            }
        ]
    },
    {
        time: "晚上 10:30",
        location: "睡前 · 家裡",
        description: "準備就寢",
        question: "睡前小明感到有點餓，他應該怎麼做？",
        image: "bedtime.jpg",
        options: [
            {
                text: "吃一個小蘋果",
                effect: "蘋果含一定量的鉀，但晚上食用新鮮水果增加夜間排尿。",
                score: 2,
                feedback: "新鮮水果晚上食用可能增加夜間排尿次數，影響睡眠質量。"
            },
            {
                text: "喝一杯溫牛奶",
                effect: "牛奶含優質蛋白質但也含磷，腎臟病患者應限量攝入。",
                score: 1,
                feedback: "牛奶含有較高的磷，晚上飲用也可能增加夜間排尿。"
            },
            {
                text: "忍耐不吃，直接睡覺",
                effect: "輕微饑餓不會影響健康，避免睡前進食有助於提高睡眠質量。",
                score: 5,
                feedback: "睡前避免進食有助於減輕腎臟負擔，提高睡眠質量。"
            }
        ]
    }
];

// 導出數據
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        characterData,
        timelineData,
        gameScenarios
    };
} 