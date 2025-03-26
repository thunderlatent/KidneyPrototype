// 全局變量
let currentScreen = 'home';
let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 30;
let userCoins = 100;
let userGems = 5;
let userExp = 0;

// 模擬問題數據
const quizQuestions = [
    {
        question: "洗腎患者每日建議的最大飲水量是多少？",
        options: [
            "不限量，需多喝水",
            "500-600毫升 + 前一天尿量",
            "1500-2000毫升",
            "視情況而定，無特別限制"
        ],
        correctAnswer: 1,
        explanation: "洗腎患者通常被建議的飲水量為500-600毫升加上前一天的尿量，以避免體內液體過度累積。過量飲水可能導致水腫、高血壓和心臟負擔增加。"
    },
    {
        question: "以下哪種食物對洗腎患者來說鉀含量最高，應該避免或限制攝取？",
        options: [
            "白米飯",
            "雞蛋",
            "香蕉",
            "豆腐"
        ],
        correctAnswer: 2,
        explanation: "香蕉含有高量的鉀，腎功能不全的患者應該限制攝取。高鉀水果還包括柑橘類、奇異果、西瓜等。過量的鉀攝取可能導致心律不整，甚至心臟驟停。"
    },
    {
        question: "關於洗腎患者的血管通路照護，下列哪一項是正確的？",
        options: [
            "避免在該側手臂測量血壓",
            "可配戴手錶或緊身衣物壓迫血管通路",
            "血管通路處發紅腫脹是正常現象",
            "血管通路應經常按摩以促進血液循環"
        ],
        correctAnswer: 0,
        explanation: "洗腎患者的血管通路是重要的生命線，應避免在該側手臂測量血壓、避免壓迫、避免搬重物，並且需注意異常狀況（如紅腫、感染跡象）。"
    },
    {
        question: "洗腎患者的磷控制對健康很重要，以下哪一類食物通常含磷量高？",
        options: [
            "新鮮蔬菜",
            "加工食品和碳酸飲料",
            "白米和白麵包",
            "新鮮水果"
        ],
        correctAnswer: 1,
        explanation: "加工食品、碳酸飲料、乳製品和肉類通常含有較高的磷。過量的磷會導致副甲狀腺機能亢進、骨骼問題和心血管鈣化，應適當控制攝取。"
    },
    {
        question: "洗腎治療期間出現肌肉痙攣，以下哪種處理最適當？",
        options: [
            "增加鹽分攝取",
            "立即停止透析治療",
            "通知醫護人員並適度伸展按摩",
            "大量飲水"
        ],
        correctAnswer: 2,
        explanation: "肌肉痙攣是洗腎常見副作用，可能與體液和電解質變化有關。適當的處理包括通知醫護人員、輕度伸展和按摩痙攣區域。飲水或增加鹽分可能加重問題。"
    }
];

// 模擬排行榜數據
const leaderboardData = {
    global: [
        { name: "王大明", score: 9850 },
        { name: "張小芳", score: 8720 },
        { name: "李志豪", score: 7650 },
        { name: "陳美玲", score: 6980 },
        { name: "林建國", score: 6540 },
        { name: "黃雅琪", score: 5890 },
        { name: "吳俊宏", score: 5430 },
        { name: "劉靜怡", score: 4970 },
        { name: "鄭光明", score: 4320 },
        { name: "謝佳玲", score: 3890 }
    ],
    friends: [
        { name: "陳美玲", score: 6980 },
        { name: "吳俊宏", score: 5430 },
        { name: "林建國", score: 5120 },
        { name: "張小芳", score: 4760 },
        { name: "李志豪", score: 3650 }
    ]
};

// DOM 載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    // 顯示啟動畫面
    setTimeout(() => {
        document.querySelector('.launch-screen').classList.add('hidden');
    }, 2000);
    
    // 初始化畫面
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000);
    navigateToScreen('home');
    
    // 註冊導航按鈕事件
    document.querySelectorAll('[data-navigate]').forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-navigate');
            navigateToScreen(target);
        });
    });
    
    // 註冊開始遊戲按鈕事件
    document.getElementById('start-quiz-btn').addEventListener('click', () => {
        startQuiz();
    });
    
    // 註冊排行榜標籤切換事件
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabType = e.currentTarget.getAttribute('data-tab');
            switchLeaderboardTab(tabType);
        });
    });
    
    // 註冊健康管理設定事件
    document.getElementById('save-dialysis-reminder').addEventListener('click', saveDialysisReminder);
    document.getElementById('calculate-water-intake').addEventListener('click', calculateWaterIntake);
    
    // 註冊提示按鈕事件
    document.getElementById('hint-btn').addEventListener('click', useHint);
    
    // 註冊獎勵視窗關閉事件
    document.getElementById('continue-btn').addEventListener('click', () => {
        document.querySelector('.reward-modal').classList.remove('active');
        navigateToScreen('home');
    });
    
    // 初始化用戶資訊
    updateUserInfo();
    
    // 更新商店金幣顯示
    document.getElementById('store-coins').textContent = userCoins;
});

// 更新狀態欄時間
function updateStatusBarTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeElement = document.querySelector('.status-bar .time');
    
    timeElement.textContent = `${hours}:${minutes}`;
}

// 畫面導航
function navigateToScreen(screenId) {
    // 隱藏當前畫面
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // 顯示目標畫面
    const targetScreen = document.getElementById(`${screenId}-screen`);
    targetScreen.classList.add('active');
    
    // 更新底部導航欄選中狀態
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`.tab-item[data-navigate="${screenId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // 更新當前畫面
    currentScreen = screenId;
    
    // 特殊處理
    if (screenId === 'leaderboard') {
        loadLeaderboard('global');
    }
}

// 開始問答遊戲
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    navigateToScreen('quiz');
    loadQuestion();
}

// 載入問題
function loadQuestion() {
    const questionData = quizQuestions[currentQuestionIndex];
    const questionContainer = document.querySelector('.question-card');
    const questionTitle = questionContainer.querySelector('.question-title');
    const optionsContainer = questionContainer.querySelector('.options-container');
    
    // 更新問題標題
    questionTitle.textContent = questionData.question;
    
    // 更新選項
    optionsContainer.innerHTML = '';
    questionData.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'answer-option';
        optionButton.textContent = option;
        optionButton.setAttribute('data-index', index);
        optionButton.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionButton);
    });
    
    // 重置計時器
    resetTimer();
    
    // 更新進度
    updateQuizProgress();
}

// 選擇答案
function selectAnswer(selectedIndex) {
    clearInterval(timer);
    
    const questionData = quizQuestions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.answer-option');
    const correctIndex = questionData.correctAnswer;
    
    // 標記正確答案和用戶選擇
    optionButtons.forEach((button, index) => {
        if (index === correctIndex) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('incorrect');
        }
        
        // 禁用所有選項
        button.disabled = true;
    });
    
    // 計算得分
    if (selectedIndex === correctIndex) {
        score += 100 + timeLeft * 5;
    }
    
    // 顯示解釋
    const explanationElement = document.createElement('div');
    explanationElement.className = 'explanation';
    explanationElement.innerHTML = `<h3>答案解析</h3><p>${questionData.explanation}</p>`;
    document.querySelector('.quiz-container').appendChild(explanationElement);
    
    // 顯示下一題按鈕
    const nextButton = document.createElement('button');
    nextButton.className = 'button';
    nextButton.textContent = currentQuestionIndex < quizQuestions.length - 1 ? '下一題' : '完成測驗';
    nextButton.addEventListener('click', nextQuestion);
    document.querySelector('.quiz-container').appendChild(nextButton);
}

// 進入下一題或完成測驗
function nextQuestion() {
    // 移除解釋和下一題按鈕
    const explanationElement = document.querySelector('.explanation');
    const nextButton = document.querySelector('.quiz-container > .button');
    
    if (explanationElement) {
        explanationElement.remove();
    }
    
    if (nextButton) {
        nextButton.remove();
    }
    
    // 檢查是否還有下一題
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

// 完成測驗
function finishQuiz() {
    // 增加用戶金幣和經驗值
    const earnedCoins = Math.floor(score / 10);
    const earnedExp = Math.floor(score / 5);
    
    userCoins += earnedCoins;
    userExp += earnedExp;
    
    updateUserInfo();
    
    // 顯示獎勵視窗
    const rewardModal = document.querySelector('.reward-modal');
    document.getElementById('final-score').textContent = score;
    document.getElementById('coins-earned').textContent = `+${earnedCoins}`;
    document.getElementById('exp-earned').textContent = `+${earnedExp}`;
    
    rewardModal.classList.add('active');
}

// 使用提示
function useHint() {
    if (userCoins >= 20) {
        const questionData = quizQuestions[currentQuestionIndex];
        const correctIndex = questionData.correctAnswer;
        const optionButtons = document.querySelectorAll('.answer-option');
        
        // 隨機選擇一個錯誤答案隱藏
        let wrongOptions = [];
        optionButtons.forEach((button, index) => {
            if (index !== correctIndex) {
                wrongOptions.push(button);
            }
        });
        
        const randomWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        randomWrong.style.opacity = '0.3';
        randomWrong.disabled = true;
        
        // 扣除金幣
        userCoins -= 20;
        updateUserInfo();
    } else {
        alert('金幣不足！');
    }
}

// 更新測驗進度
function updateQuizProgress() {
    const progressElement = document.getElementById('quiz-progress');
    progressElement.textContent = `問題 ${currentQuestionIndex + 1}/${quizQuestions.length}`;
}

// 設定計時器
function resetTimer() {
    timeLeft = 30;
    updateTimerDisplay();
    
    if (timer) {
        clearInterval(timer);
    }
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // 自動選擇答案 (超時)
            selectAnswer(-1);
        }
    }, 1000);
}

// 更新計時器顯示
function updateTimerDisplay() {
    const timerElement = document.querySelector('.timer');
    timerElement.textContent = `${timeLeft}秒`;
    
    if (timeLeft <= 10) {
        timerElement.style.color = 'red';
    } else {
        timerElement.style.color = '';
    }
}

// 切換排行榜標籤
function switchLeaderboardTab(tabType) {
    // 更新標籤樣式
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelector(`.tab-button[data-tab="${tabType}"]`).classList.add('active');
    
    // 載入對應排行榜數據
    loadLeaderboard(tabType);
}

// 載入排行榜
function loadLeaderboard(tabType) {
    const leaderboardContainer = document.querySelector('.leaderboard-list');
    leaderboardContainer.innerHTML = '';
    
    const data = leaderboardData[tabType];
    data.forEach((item, index) => {
        const rankItem = document.createElement('div');
        rankItem.className = 'rank-item';
        
        rankItem.innerHTML = `
            <div class="rank-number">${index + 1}</div>
            <div class="rank-user">${item.name}</div>
            <div class="rank-score">${item.score}</div>
        `;
        
        leaderboardContainer.appendChild(rankItem);
    });
}

// 更新用戶資訊
function updateUserInfo() {
    document.getElementById('user-coins').textContent = userCoins;
    document.getElementById('user-gems').textContent = userGems;
    document.getElementById('user-exp').textContent = userExp;
    document.getElementById('store-coins').textContent = userCoins;
}

// 儲存洗腎提醒設定
function saveDialysisReminder() {
    const days = Array.from(document.querySelectorAll('.day-checkbox:checked')).map(checkbox => checkbox.value);
    const time = document.getElementById('dialysis-time').value;
    
    if (days.length === 0 || !time) {
        alert('請選擇至少一天並設定時間！');
        return;
    }
    
    alert(`已設定洗腎提醒：每週 ${days.join('、')} 的 ${time}`);
}

// 計算建議飲水量
function calculateWaterIntake() {
    const urineOutput = parseInt(document.getElementById('urine-output').value);
    
    if (isNaN(urineOutput)) {
        alert('請輸入有效的尿量！');
        return;
    }
    
    const recommendedIntake = 600 + urineOutput;
    document.getElementById('water-result').textContent = `您的建議飲水量為 ${recommendedIntake} 毫升`;
} 