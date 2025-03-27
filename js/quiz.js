/**
 * 腎好康 - 問答遊戲核心邏輯
 * 處理問題載入、答題邏輯、分數計算和視覺反饋
 */

// 全域變數
let currentQuestions = []; // 目前載入的問題集
let currentIndex = 0;     // 當前問題索引
let score = 0;            // 用戶得分
let totalScore = 0;       // 可獲得的總分
let answeredQuestions = 0; // 已回答的問題數
let correctAnswers = 0;   // 正確回答數
let questionBank = [];    // 題庫

/**
 * 初始化問答遊戲
 * @param {Array} questions - 題庫陣列
 */
function initQuiz(questions) {
    // 儲存題庫
    questionBank = questions;
    
    // 隨機排序問題
    currentQuestions = [...questionBank].sort(() => Math.random() - 0.5);
    
    // 計算總分
    totalScore = currentQuestions.reduce((total, question) => total + (question.points || 10), 0);
    
    // 重設遊戲狀態
    currentIndex = 0;
    score = 0;
    answeredQuestions = 0;
    correctAnswers = 0;
    
    // 顯示第一個問題
    displayQuestion();
    
    // 更新進度指示器
    updateProgressIndicator();
    
    // 初始化分數顯示
    updateScoreDisplay();
}

/**
 * 顯示當前問題
 */
function displayQuestion() {
    if (currentIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }
    
    const question = currentQuestions[currentIndex];
    
    // 更新問題標題和選項
    document.getElementById('question-text').innerText = question.question;
    
    // 清除舊選項
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    // 添加難度標籤
    const difficultyLabel = document.createElement('div');
    difficultyLabel.className = `difficulty-badge ${question.difficulty ? question.difficulty.toLowerCase() : 'normal'}`;
    difficultyLabel.innerText = question.difficulty || '普通';
    document.getElementById('question-metadata').innerHTML = '';
    document.getElementById('question-metadata').appendChild(difficultyLabel);
    
    // 添加分類標籤（如果有）
    if (question.category) {
        const categoryTag = document.createElement('div');
        categoryTag.className = 'category-tag';
        categoryTag.innerText = question.category;
        document.getElementById('question-metadata').appendChild(categoryTag);
    }
    
    // 添加分數信息
    const pointsInfo = document.createElement('div');
    pointsInfo.className = 'points-info';
    pointsInfo.innerText = `${question.points || 10} 分`;
    document.getElementById('question-metadata').appendChild(pointsInfo);
    
    // 顯示臨床情境（如果有）
    if (question.clinicalScenario) {
        const scenarioContainer = document.getElementById('clinical-scenario') || document.createElement('div');
        scenarioContainer.id = 'clinical-scenario';
        scenarioContainer.className = 'clinical-scenario';
        scenarioContainer.innerHTML = `<i class="fas fa-user-md"></i> <span>${question.clinicalScenario}</span>`;
        
        // 如果臨床情境容器不在DOM中，則添加它
        if (!document.getElementById('clinical-scenario')) {
            document.querySelector('.quiz-container').insertBefore(
                scenarioContainer, 
                document.getElementById('options-container')
            );
        }
    } else {
        // 如果沒有臨床情境，則刪除之前可能存在的容器
        const existingScenario = document.getElementById('clinical-scenario');
        if (existingScenario) {
            existingScenario.remove();
        }
    }
    
    // 添加新選項
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option-card';
        optionElement.innerHTML = option;
        optionElement.setAttribute('data-index', index);
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // 隱藏解釋和下一題按鈕
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    
    // 啟用所有選項
    enableOptions();
    
    // 更新進度指示器
    updateProgressIndicator();
}

/**
 * 選擇選項
 * @param {number} selectedIndex - 所選選項的索引
 */
function selectOption(selectedIndex) {
    const question = currentQuestions[currentIndex];
    const correctIndex = question.correctAnswer;
    const optionCards = document.querySelectorAll('.option-card');
    
    // 禁用所有選項，防止多次選擇
    disableOptions();
    
    // 增加已回答問題計數
    answeredQuestions++;
    
    // 獲取選中的選項卡
    const selectedCard = optionCards[selectedIndex];
    
    // 判斷回答是否正確
    if (selectedIndex === correctIndex) {
        // 正確回答
        correctAnswers++;
        selectedCard.classList.add('correct');
        selectedCard.innerHTML += '<span class="result-icon correct">✓</span>';
        
        // 添加動畫效果
        selectedCard.classList.add('pulse-animation');
        
        // 加分
        score += question.points || 10;
        
        // 播放正確音效
        playSound('correct');
    } else {
        // 錯誤回答
        selectedCard.classList.add('incorrect');
        selectedCard.innerHTML += '<span class="result-icon incorrect">✗</span>';
        
        // 標示正確答案
        const correctCard = optionCards[correctIndex];
        correctCard.classList.add('correct');
        correctCard.innerHTML += '<span class="result-icon correct">✓</span>';
        
        // 播放錯誤音效
        playSound('incorrect');
    }
    
    // 顯示解釋
    const explanationElement = document.getElementById('explanation');
    explanationElement.innerHTML = `<div class="explanation-header">解釋</div>${question.explanation}`;
    explanationElement.style.display = 'block';
    
    // 顯示下一題按鈕
    document.getElementById('next-btn').style.display = 'block';
    
    // 更新分數顯示
    updateScoreDisplay();
}

/**
 * 播放音效
 * @param {string} type - 音效類型（correct 或 incorrect）
 */
function playSound(type) {
    // 如果實現了音效功能，可在此處添加程式碼
    // 目前此功能是預留的佔位符
}

/**
 * 禁用所有選項
 */
function disableOptions() {
    const options = document.querySelectorAll('.option-card');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
}

/**
 * 啟用所有選項
 */
function enableOptions() {
    const options = document.querySelectorAll('.option-card');
    options.forEach(option => {
        option.style.pointerEvents = 'auto';
    });
}

/**
 * 進入下一題
 */
function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

/**
 * 結束問答遊戲
 */
function endQuiz() {
    // 清空問題區域
    document.getElementById('question-text').innerText = '測驗完成！';
    document.getElementById('options-container').innerHTML = '';
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    
    // 清除臨床情境（如果有）
    const existingScenario = document.getElementById('clinical-scenario');
    if (existingScenario) {
        existingScenario.remove();
    }
    
    // 顯示結果
    const resultContainer = document.createElement('div');
    resultContainer.className = 'quiz-result';
    
    // 計算百分比
    const percentage = Math.round((score / totalScore) * 100);
    
    // 根據成績添加不同的消息和表情
    let resultMessage = '';
    let emoji = '';
    
    if (percentage >= 90) {
        resultMessage = '太厲害了！腎臟科專家就是你！';
        emoji = '🏆';
    } else if (percentage >= 70) {
        resultMessage = '很好！你對腎臟透析有很深的了解！';
        emoji = '👍';
    } else if (percentage >= 50) {
        resultMessage = '還不錯！繼續加油學習！';
        emoji = '😊';
    } else {
        resultMessage = '有進步空間！再多學習一些腎臟知識吧！';
        emoji = '📚';
    }
    
    // 構建結果HTML
    resultContainer.innerHTML = `
        <div class="result-emoji">${emoji}</div>
        <h2>你的得分：${score}/${totalScore} (${percentage}%)</h2>
        <p>正確回答：${correctAnswers}/${answeredQuestions} 題</p>
        <p class="result-message">${resultMessage}</p>
        <button onclick="restartQuiz()" class="restart-btn">再玩一次</button>
        <button onclick="returnToHome()" class="home-btn">回到首頁</button>
    `;
    
    document.getElementById('options-container').appendChild(resultContainer);
    
    // 在本地儲存中保存分數（如果實現了這個功能）
    saveScore(score, percentage);
}

/**
 * 保存分數到本地儲存
 * @param {number} score - 分數
 * @param {number} percentage - 百分比
 */
function saveScore(score, percentage) {
    // 如果實現了分數保存功能，可在此處添加程式碼
    // 目前此功能是預留的佔位符
}

/**
 * 重新開始問答遊戲
 */
function restartQuiz() {
    initQuiz(questionBank);
}

/**
 * 返回首頁
 */
function returnToHome() {
    window.location.href = 'index.html';
}

/**
 * 更新進度指示器
 */
function updateProgressIndicator() {
    const progressContainer = document.getElementById('quiz-progress');
    if (!progressContainer) return;
    
    // 清空進度容器
    progressContainer.innerHTML = '';
    
    // 添加進度文字
    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.innerText = `問題 ${currentIndex + 1}/${currentQuestions.length}`;
    progressContainer.appendChild(progressText);
    
    // 添加進度條
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressFill.style.width = `${((currentIndex + 1) / currentQuestions.length) * 100}%`;
    
    progressBar.appendChild(progressFill);
    progressContainer.appendChild(progressBar);
}

/**
 * 更新分數顯示
 */
function updateScoreDisplay() {
    const scoreContainer = document.getElementById('quiz-score');
    if (!scoreContainer) return;
    
    scoreContainer.innerHTML = `
        <div class="score-number">${score}</div>
        <div class="score-label">分數</div>
    `;
    
    // 添加分數變化動畫
    scoreContainer.classList.add('score-update');
    setTimeout(() => {
        scoreContainer.classList.remove('score-update');
    }, 500);
}

/**
 * 篩選題目
 * @param {string} category - 類別名稱
 * @param {string} difficulty - 難度等級
 */
function filterQuestions(category = null, difficulty = null) {
    let filteredQuestions = [...questionBank];
    
    // 按類別篩選
    if (category && category !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => q.category === category);
    }
    
    // 按難度篩選
    if (difficulty && difficulty !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => 
            q.difficulty && q.difficulty.toLowerCase() === difficulty.toLowerCase()
        );
    }
    
    // 如果沒有匹配的問題，顯示提示
    if (filteredQuestions.length === 0) {
        alert('沒有符合條件的問題！請嘗試其他篩選條件。');
        return;
    }
    
    // 初始化篩選後的問題集
    currentQuestions = filteredQuestions.sort(() => Math.random() - 0.5);
    
    // 重設遊戲狀態
    currentIndex = 0;
    score = 0;
    answeredQuestions = 0;
    correctAnswers = 0;
    
    // 重新計算總分
    totalScore = currentQuestions.reduce((total, question) => total + (question.points || 10), 0);
    
    // 開始問答
    displayQuestion();
    updateProgressIndicator();
    updateScoreDisplay();
}

// 導出函數以供其他檔案使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initQuiz,
        filterQuestions
    };
} 