/**
 * 腎好康應用獎勵系統
 * 處理遊戲獎勵、積分和成就系統
 */

// 獎勵系統配置
const rewardsConfig = {
    // 獎勵類型和相應的名稱
    rewardTypes: {
        coins: '金幣',
        healthPoints: '健康點數',
        exp: '經驗值',
        extraLife: '復活機會',
    },
    
    // 等級配置（每個等級需要的總經驗值）
    levels: [
        { level: 1, expRequired: 0, reward: { coins: 100 } },
        { level: 2, expRequired: 100, reward: { coins: 200 } },
        { level: 3, expRequired: 250, reward: { coins: 300 } },
        { level: 4, expRequired: 450, reward: { coins: 400 } },
        { level: 5, expRequired: 700, reward: { coins: 500, healthPoints: 50 } },
        { level: 6, expRequired: 1000, reward: { coins: 600 } },
        { level: 7, expRequired: 1350, reward: { coins: 700 } },
        { level: 8, expRequired: 1750, reward: { coins: 800 } },
        { level: 9, expRequired: 2200, reward: { coins: 900 } },
        { level: 10, expRequired: 2700, reward: { coins: 1000, healthPoints: 100 } },
    ],
    
    // 遊戲完成獎勵配置
    gameCompletionRewards: {
        quiz: { 
            coins: 20, 
            exp: 10,
            healthPoints: 5,
            bonusPerCorrectAnswer: 5 // 每答對一題額外獲得的金幣
        },
        matching: { 
            coins: 15, 
            exp: 8,
            healthPoints: 3,
            bonusPerMatchedPair: 3 // 每正確配對一組獲得的額外金幣
        },
        medication: { 
            coins: 25, 
            exp: 12,
            healthPoints: 8,
            bonusPerCorrectMed: 4 // 每正確分類一個藥物獲得的額外金幣
        },
        diet: { 
            coins: 20, 
            exp: 10,
            healthPoints: 6,
            bonusPerCorrectFood: 3 // 每正確分類一個食物獲得的額外金幣
        }
    },
    
    // 每日任務獎勵
    dailyTasks: [
        { id: 'daily_game', desc: '完成一場遊戲', reward: { coins: 50, exp: 20 } },
        { id: 'daily_quiz', desc: '完成一場問答遊戲', reward: { coins: 30, exp: 15 } },
        { id: 'daily_login', desc: '每日登入', reward: { coins: 20, exp: 10 } },
        { id: 'watch_ad', desc: '觀看一則廣告', reward: { coins: 30, exp: 10 } },
        { id: 'check_health', desc: '更新健康數據', reward: { healthPoints: 20, exp: 15 } }
    ],
    
    // 連續登入獎勵
    consecutiveLoginRewards: [
        { day: 1, reward: { coins: 20 } },
        { day: 2, reward: { coins: 30 } },
        { day: 3, reward: { coins: 40 } },
        { day: 4, reward: { coins: 50 } },
        { day: 5, reward: { coins: 60 } },
        { day: 6, reward: { coins: 70 } },
        { day: 7, reward: { coins: 100, healthPoints: 50 } }, // 一週獎勵
    ],
    
    // 成就配置
    achievements: [
        { id: 'games_played_10', desc: '遊戲新手：完成10場遊戲', requirement: 10, reward: { coins: 100, exp: 50 } },
        { id: 'games_played_50', desc: '遊戲愛好者：完成50場遊戲', requirement: 50, reward: { coins: 200, exp: 100 } },
        { id: 'games_played_100', desc: '遊戲大師：完成100場遊戲', requirement: 100, reward: { coins: 500, exp: 250 } },
        { id: 'quiz_correct_50', desc: '知識達人：答對50題問答', requirement: 50, reward: { coins: 150, exp: 75 } },
        { id: 'quiz_correct_100', desc: '知識專家：答對100題問答', requirement: 100, reward: { coins: 300, exp: 150 } },
        { id: 'quiz_correct_200', desc: '知識大師：答對200題問答', requirement: 200, reward: { coins: 600, exp: 300 } },
        { id: 'login_7_days', desc: '忠實用戶：連續登入7天', requirement: 7, reward: { coins: 200, exp: 100 } },
        { id: 'login_30_days', desc: '鐵桿粉絲：連續登入30天', requirement: 30, reward: { coins: 500, exp: 250 } },
        { id: 'watch_ads_10', desc: '廣告支持者：觀看10則廣告', requirement: 10, reward: { coins: 100, exp: 50 } },
    ]
};

// 用戶獎勵狀態
let userRewards = {
    coins: 0,            // 金幣
    healthPoints: 0,     // 健康點數
    exp: 0,              // 經驗值
    level: 1,            // 當前等級
    extraLives: 0,       // 復活機會次數
    
    // 累計數據
    stats: {
        totalGamesPlayed: 0,
        quizCorrectAnswers: 0,
        matchingPairsFound: 0,
        medicationsClassified: 0,
        foodsClassified: 0,
        adsWatched: 0,
        loginDays: 0,
        consecutiveLoginDays: 0
    },
    
    // 完成的每日任務
    completedDailyTasks: [],
    
    // 獲得的成就
    achievements: [],
    
    // 最後登入日期
    lastLoginDate: null
};

/**
 * 初始化獎勵系統
 */
function initRewards() {
    console.log('初始化獎勵系統...');
    
    // 從本地存儲加載用戶獎勵數據
    loadRewardsFromStorage();
    
    // 檢查每日登入
    checkDailyLogin();
    
    // 處理待處理的獎勵（如果有）
    processPendingRewards();
}

/**
 * 從localStorage加載獎勵數據
 */
function loadRewardsFromStorage() {
    const savedRewards = localStorage.getItem('userRewards');
    
    if (savedRewards) {
        try {
            userRewards = JSON.parse(savedRewards);
            console.log('已從存儲加載獎勵數據');
        } catch (e) {
            console.error('解析獎勵數據時出錯:', e);
            // 加載失敗時使用默認值
        }
    } else {
        console.log('未找到已保存的獎勵數據，使用默認值');
    }
}

/**
 * 保存獎勵數據到localStorage
 */
function saveRewardsToStorage() {
    try {
        localStorage.setItem('userRewards', JSON.stringify(userRewards));
        console.log('獎勵數據已保存到存儲');
    } catch (e) {
        console.error('保存獎勵數據時出錯:', e);
    }
}

/**
 * 處理待處理的獎勵（例如從廣告模塊獲得的）
 */
function processPendingRewards() {
    if (window.pendingRewards && window.pendingRewards.length > 0) {
        console.log(`處理 ${window.pendingRewards.length} 個待處理獎勵`);
        
        window.pendingRewards.forEach(pendingReward => {
            addReward(pendingReward.type, pendingReward.value);
        });
        
        // 清空待處理獎勵
        window.pendingRewards = [];
    }
}

/**
 * 檢查每日登入並更新連續登入計數
 */
function checkDailyLogin() {
    const today = new Date().toDateString();
    
    if (userRewards.lastLoginDate !== today) {
        // 更新登入統計
        userRewards.stats.loginDays++;
        
        // 檢查是否是連續登入
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toDateString();
        
        if (userRewards.lastLoginDate === yesterdayString) {
            // 連續登入
            userRewards.stats.consecutiveLoginDays++;
        } else {
            // 連續登入中斷
            userRewards.stats.consecutiveLoginDays = 1;
        }
        
        // 更新最後登入日期
        userRewards.lastLoginDate = today;
        
        // 處理每日登入獎勵
        const dailyLoginTask = rewardsConfig.dailyTasks.find(task => task.id === 'daily_login');
        if (dailyLoginTask) {
            // 標記每日登入任務為已完成
            completeTask('daily_login');
            
            // 給予獎勵
            if (dailyLoginTask.reward) {
                addMultipleRewards(dailyLoginTask.reward);
            }
        }
        
        // 處理連續登入獎勵
        const consecutiveDay = userRewards.stats.consecutiveLoginDays;
        const consecutiveReward = rewardsConfig.consecutiveLoginRewards.find(r => r.day === consecutiveDay);
        
        if (consecutiveReward) {
            console.log(`獲得連續登入${consecutiveDay}天獎勵`);
            addMultipleRewards(consecutiveReward.reward);
            
            // 顯示連續登入獎勵提示
            showConsecutiveLoginReward(consecutiveDay, consecutiveReward.reward);
        }
        
        // 檢查連續登入相關的成就
        checkAchievements();
        
        // 保存更新後的數據
        saveRewardsToStorage();
    }
}

/**
 * 顯示連續登入獎勵提示
 * @param {number} days - 連續登入天數
 * @param {Object} reward - 獎勵數據
 */
function showConsecutiveLoginReward(days, reward) {
    // 這裡實現連續登入獎勵提示UI
    // 在實際應用中可能會顯示一個彈窗或通知
    
    console.log(`顯示連續登入${days}天獎勵提示:`, reward);
    
    let rewardText = '';
    for (const [type, value] of Object.entries(reward)) {
        const typeName = rewardsConfig.rewardTypes[type] || type;
        rewardText += `${typeName} x${value} `;
    }
    
    // 創建獎勵通知元素
    const toast = document.createElement('div');
    toast.className = 'reward-toast';
    toast.style.position = 'fixed';
    toast.style.top = '20%';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(52, 199, 89, 0.9)';
    toast.style.color = 'white';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '12px';
    toast.style.fontSize = '16px';
    toast.style.zIndex = '1001';
    toast.style.minWidth = '250px';
    toast.style.textAlign = 'center';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    
    const title = document.createElement('div');
    title.textContent = `🎉 連續登入 ${days} 天！`;
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '8px';
    
    const content = document.createElement('div');
    content.textContent = `獲得獎勵: ${rewardText}`;
    
    toast.appendChild(title);
    toast.appendChild(content);
    
    // 添加到頁面
    document.body.appendChild(toast);
    
    // 自動移除通知
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            toast.style.transition = 'opacity 0.5s, transform 0.5s';
            
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 500);
        }
    }, 4000);
}

/**
 * 添加獎勵
 * @param {string} rewardType - 獎勵類型
 * @param {number} value - 獎勵數值
 */
function addReward(rewardType, value) {
    if (!rewardsConfig.rewardTypes[rewardType]) {
        console.warn(`未知的獎勵類型: ${rewardType}`);
        return;
    }
    
    // 添加獎勵
    if (userRewards[rewardType] !== undefined) {
        userRewards[rewardType] += value;
        console.log(`添加獎勵: ${rewardType} +${value}, 總計: ${userRewards[rewardType]}`);
        
        // 如果是經驗值，檢查升級
        if (rewardType === 'exp') {
            checkLevelUp();
        }
        
        // 保存獎勵數據
        saveRewardsToStorage();
        
        // 更新UI顯示
        updateRewardsUI();
        
        return userRewards[rewardType];
    } else {
        console.warn(`獎勵類型 ${rewardType} 未在用戶獎勵中定義`);
        return 0;
    }
}

/**
 * 添加多種獎勵
 * @param {Object} rewards - 獎勵對象，例如 {coins: 100, exp: 50}
 */
function addMultipleRewards(rewards) {
    for (const [type, value] of Object.entries(rewards)) {
        addReward(type, value);
    }
}

/**
 * 使用獎勵
 * @param {string} rewardType - 獎勵類型
 * @param {number} value - 消耗數值
 * @returns {boolean} 是否成功消耗
 */
function useReward(rewardType, value) {
    if (!rewardsConfig.rewardTypes[rewardType]) {
        console.warn(`未知的獎勵類型: ${rewardType}`);
        return false;
    }
    
    // 檢查是否有足夠獎勵
    if (userRewards[rewardType] >= value) {
        userRewards[rewardType] -= value;
        console.log(`使用獎勵: ${rewardType} -${value}, 剩餘: ${userRewards[rewardType]}`);
        
        // 保存獎勵數據
        saveRewardsToStorage();
        
        // 更新UI顯示
        updateRewardsUI();
        
        return true;
    } else {
        console.log(`獎勵不足: ${rewardType} ${userRewards[rewardType]} < ${value}`);
        return false;
    }
}

/**
 * 檢查等級提升
 */
function checkLevelUp() {
    const currentExp = userRewards.exp;
    const currentLevel = userRewards.level;
    
    // 查找下一個可能的等級
    const nextLevel = rewardsConfig.levels.find(level => 
        level.level > currentLevel && currentExp >= level.expRequired
    );
    
    if (nextLevel) {
        const oldLevel = userRewards.level;
        userRewards.level = nextLevel.level;
        
        console.log(`升級! 從 ${oldLevel} 到 ${nextLevel.level}`);
        
        // 給予升級獎勵
        if (nextLevel.reward) {
            addMultipleRewards(nextLevel.reward);
            
            // 顯示升級獎勵提示
            showLevelUpReward(nextLevel.level, nextLevel.reward);
        }
        
        // 繼續檢查是否可以再次升級
        checkLevelUp();
    }
}

/**
 * 顯示升級獎勵提示
 * @param {number} level - 新等級
 * @param {Object} reward - 獎勵數據
 */
function showLevelUpReward(level, reward) {
    console.log(`顯示升級到 ${level} 級獎勵提示:`, reward);
    
    let rewardText = '';
    for (const [type, value] of Object.entries(reward)) {
        const typeName = rewardsConfig.rewardTypes[type] || type;
        rewardText += `${typeName} x${value} `;
    }
    
    // 創建獎勵通知元素
    const toast = document.createElement('div');
    toast.className = 'level-up-toast';
    toast.style.position = 'fixed';
    toast.style.top = '30%';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(255, 204, 0, 0.95)';
    toast.style.color = '#000';
    toast.style.padding = '20px 30px';
    toast.style.borderRadius = '16px';
    toast.style.fontSize = '18px';
    toast.style.zIndex = '1002';
    toast.style.minWidth = '280px';
    toast.style.textAlign = 'center';
    toast.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
    
    const title = document.createElement('div');
    title.textContent = `🎊 恭喜升級到 ${level} 級！`;
    title.style.fontSize = '22px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '12px';
    
    const content = document.createElement('div');
    content.textContent = `獲得獎勵: ${rewardText}`;
    content.style.marginBottom = '15px';
    
    const button = document.createElement('button');
    button.textContent = '太棒了!';
    button.style.backgroundColor = '#fff';
    button.style.color = '#000';
    button.style.border = 'none';
    button.style.borderRadius = '20px';
    button.style.padding = '8px 24px';
    button.style.fontSize = '16px';
    button.style.fontWeight = 'bold';
    button.style.cursor = 'pointer';
    
    // 添加按鈕點擊事件
    button.addEventListener('click', function() {
        if (toast.parentNode) {
            document.body.removeChild(toast);
        }
    });
    
    toast.appendChild(title);
    toast.appendChild(content);
    toast.appendChild(button);
    
    // 添加到頁面
    document.body.appendChild(toast);
}

/**
 * 完成遊戲時獲得獎勵
 * @param {string} gameType - 遊戲類型 (quiz, matching, medication, diet)
 * @param {Object} gameResults - 遊戲結果，包含分數和統計
 */
function completeGame(gameType, gameResults) {
    if (!rewardsConfig.gameCompletionRewards[gameType]) {
        console.warn(`未知的遊戲類型: ${gameType}`);
        return;
    }
    
    console.log(`完成遊戲: ${gameType}`, gameResults);
    
    // 基礎獎勵
    const baseRewards = rewardsConfig.gameCompletionRewards[gameType];
    
    // 計算額外獎勵
    let bonusCoins = 0;
    
    switch (gameType) {
        case 'quiz':
            bonusCoins = gameResults.correctAnswers * baseRewards.bonusPerCorrectAnswer;
            // 更新答對題目統計
            userRewards.stats.quizCorrectAnswers += gameResults.correctAnswers;
            break;
            
        case 'matching':
            bonusCoins = gameResults.matchedPairs * baseRewards.bonusPerMatchedPair;
            // 更新配對統計
            userRewards.stats.matchingPairsFound += gameResults.matchedPairs;
            break;
            
        case 'medication':
            bonusCoins = gameResults.correctMeds * baseRewards.bonusPerCorrectMed;
            // 更新藥物分類統計
            userRewards.stats.medicationsClassified += gameResults.correctMeds;
            break;
            
        case 'diet':
            bonusCoins = gameResults.correctFoods * baseRewards.bonusPerCorrectFood;
            // 更新食物分類統計
            userRewards.stats.foodsClassified += gameResults.correctFoods;
            break;
    }
    
    // 更新遊戲總數統計
    userRewards.stats.totalGamesPlayed++;
    
    // 給予基礎獎勵
    const totalRewards = {...baseRewards};
    
    // 添加額外金幣獎勵
    if (bonusCoins > 0) {
        totalRewards.coins += bonusCoins;
    }
    
    // 給予所有獎勵
    addMultipleRewards(totalRewards);
    
    // 標記相關每日任務為已完成
    completeTask('daily_game');
    
    // 如果是問答遊戲，也標記問答任務為已完成
    if (gameType === 'quiz') {
        completeTask('daily_quiz');
    }
    
    // 檢查成就
    checkAchievements();
    
    return totalRewards;
}

/**
 * 完成每日任務
 * @param {string} taskId - 任務ID
 */
function completeTask(taskId) {
    if (userRewards.completedDailyTasks.includes(taskId)) {
        // 任務已完成
        return false;
    }
    
    const task = rewardsConfig.dailyTasks.find(t => t.id === taskId);
    if (!task) {
        console.warn(`未知的任務: ${taskId}`);
        return false;
    }
    
    // 標記任務為已完成
    userRewards.completedDailyTasks.push(taskId);
    
    console.log(`完成任務: ${task.desc}`);
    
    // 給予任務獎勵
    if (task.reward) {
        addMultipleRewards(task.reward);
    }
    
    // 保存獎勵數據
    saveRewardsToStorage();
    
    return true;
}

/**
 * 重置每日任務
 */
function resetDailyTasks() {
    userRewards.completedDailyTasks = [];
    saveRewardsToStorage();
    
    console.log('每日任務已重置');
}

/**
 * 檢查成就完成情況
 */
function checkAchievements() {
    rewardsConfig.achievements.forEach(achievement => {
        // 檢查成就是否已獲得
        if (userRewards.achievements.includes(achievement.id)) {
            return; // 已獲得此成就，跳過
        }
        
        let achieved = false;
        
        // 根據成就ID檢查不同的條件
        switch (achievement.id) {
            case 'games_played_10':
            case 'games_played_50':
            case 'games_played_100':
                achieved = userRewards.stats.totalGamesPlayed >= achievement.requirement;
                break;
                
            case 'quiz_correct_50':
            case 'quiz_correct_100':
            case 'quiz_correct_200':
                achieved = userRewards.stats.quizCorrectAnswers >= achievement.requirement;
                break;
                
            case 'login_7_days':
            case 'login_30_days':
                achieved = userRewards.stats.consecutiveLoginDays >= achievement.requirement;
                break;
                
            case 'watch_ads_10':
                achieved = userRewards.stats.adsWatched >= achievement.requirement;
                break;
        }
        
        if (achieved) {
            // 獲得成就
            userRewards.achievements.push(achievement.id);
            
            console.log(`獲得成就: ${achievement.desc}`);
            
            // 給予成就獎勵
            if (achievement.reward) {
                addMultipleRewards(achievement.reward);
                
                // 顯示成就獎勵提示
                showAchievementReward(achievement);
            }
        }
    });
    
    // 保存獎勵數據
    saveRewardsToStorage();
}

/**
 * 顯示成就獎勵提示
 * @param {Object} achievement - 成就對象
 */
function showAchievementReward(achievement) {
    console.log(`顯示成就獎勵提示: ${achievement.desc}`);
    
    let rewardText = '';
    for (const [type, value] of Object.entries(achievement.reward)) {
        const typeName = rewardsConfig.rewardTypes[type] || type;
        rewardText += `${typeName} x${value} `;
    }
    
    // 創建成就通知元素
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(88, 86, 214, 0.95)';
    toast.style.color = 'white';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '16px';
    toast.style.fontSize = '16px';
    toast.style.zIndex = '1001';
    toast.style.minWidth = '250px';
    toast.style.textAlign = 'center';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    
    const title = document.createElement('div');
    title.textContent = `🏆 成就解鎖!`;
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '8px';
    
    const desc = document.createElement('div');
    desc.textContent = achievement.desc;
    desc.style.marginBottom = '8px';
    
    const reward = document.createElement('div');
    reward.textContent = `獎勵: ${rewardText}`;
    reward.style.fontSize = '14px';
    
    toast.appendChild(title);
    toast.appendChild(desc);
    toast.appendChild(reward);
    
    // 添加到頁面
    document.body.appendChild(toast);
    
    // 自動移除通知
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            toast.style.transition = 'opacity 0.5s, transform 0.5s';
            
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 500);
        }
    }, 5000);
}

/**
 * 更新獎勵UI顯示
 */
function updateRewardsUI() {
    // 更新金幣顯示
    const coinsElement = document.getElementById('user-coins');
    if (coinsElement) {
        coinsElement.textContent = userRewards.coins;
    }
    
    // 更新健康點數顯示
    const healthPointsElement = document.getElementById('user-health-points');
    if (healthPointsElement) {
        healthPointsElement.textContent = userRewards.healthPoints;
    }
    
    // 更新等級顯示
    const levelElement = document.getElementById('user-level');
    if (levelElement) {
        levelElement.textContent = userRewards.level;
    }
    
    // 更新經驗值進度條
    updateExpProgressBar();
}

/**
 * 更新經驗值進度條
 */
function updateExpProgressBar() {
    const progressBarElement = document.getElementById('exp-progress-bar');
    const progressTextElement = document.getElementById('exp-progress-text');
    
    if (!progressBarElement || !progressTextElement) {
        return;
    }
    
    const currentLevel = rewardsConfig.levels.find(level => level.level === userRewards.level);
    const nextLevel = rewardsConfig.levels.find(level => level.level === userRewards.level + 1);
    
    if (!currentLevel || !nextLevel) {
        // 已達最高等級或找不到等級配置
        progressBarElement.style.width = '100%';
        progressTextElement.textContent = '最高等級';
        return;
    }
    
    const currentExp = userRewards.exp;
    const levelStartExp = currentLevel.expRequired;
    const nextLevelExp = nextLevel.expRequired;
    const expNeeded = nextLevelExp - levelStartExp;
    const expProgress = currentExp - levelStartExp;
    const progressPercentage = Math.min(100, Math.max(0, (expProgress / expNeeded) * 100));
    
    progressBarElement.style.width = `${progressPercentage}%`;
    progressTextElement.textContent = `${expProgress}/${expNeeded}`;
}

/**
 * 獲取用戶獎勵數據
 * @returns {Object} 用戶獎勵數據
 */
function getUserRewards() {
    return {...userRewards};
}

/**
 * 觀看廣告後處理獎勵
 * @param {string} rewardType - 獎勵類型
 * @param {number} rewardValue - 獎勵數值
 */
function handleAdReward(rewardType, rewardValue) {
    // 添加獎勵
    addReward(rewardType, rewardValue);
    
    // 更新廣告觀看統計
    userRewards.stats.adsWatched++;
    
    // 標記相關每日任務為已完成
    completeTask('watch_ad');
    
    // 檢查成就
    checkAchievements();
}

// 導出獎勵相關函數
window.app = window.app || {};
window.app.rewards = {
    initRewards,
    addReward,
    useReward,
    completeGame,
    completeTask,
    getUserRewards,
    handleAdReward
};

// 當文檔載入完成時自動初始化獎勵系統
document.addEventListener('DOMContentLoaded', function() {
    initRewards();
}); 