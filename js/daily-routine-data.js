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

// 導出數據
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        characterData,
        timelineData
    };
} 