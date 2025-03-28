/**
 * 腎臟保健日常模擬 - 遊戲邏輯
 * 管理遊戲狀態、時間序列和用戶選擇的效果
 */

class DailyRoutineGame {
    constructor() {
        // 載入遊戲數據
        this.character = JSON.parse(JSON.stringify(characterData));
        this.timeline = JSON.parse(JSON.stringify(timelineData));
        
        // 初始化遊戲狀態
        this.gameState = {
            health: this.character.initialHealth,
            hydration: this.character.initialHydration,
            energy: this.character.initialEnergy,
            kidney: this.character.initialKidney,
            currentTimeIndex: 0,
            completedTimepoints: [],
            choices: [],
            dayComplete: false
        };
        
        // 緩存DOM元素
        this.cacheElements();
        
        // 綁定事件處理器
        this.bindEvents();
        
        // 初始化遊戲界面
        this.initializeGame();
    }
    
    /**
     * 緩存遊戲中使用的DOM元素，提高性能
     */
    cacheElements() {
        // 狀態顯示元素
        this.healthFill = document.querySelector('.health-fill');
        this.healthValue = document.querySelector('.status-bar-item:nth-child(1) .status-value');
        this.hydrationFill = document.querySelector('.hydration-fill');
        this.hydrationValue = document.querySelector('.status-bar-item:nth-child(2) .status-value');
        this.energyFill = document.querySelector('.energy-fill');
        this.energyValue = document.querySelector('.status-bar-item:nth-child(3) .status-value');
        this.kidneyFill = document.querySelector('.kidney-fill');
        this.kidneyValue = document.querySelector('.status-bar-item:nth-child(4) .status-value');
        
        // 角色資訊元素
        this.characterName = document.querySelector('.character-name');
        this.characterDescription = document.querySelector('.character-description');
        
        // 時間顯示元素
        this.timeDisplay = document.getElementById('timeDisplay');
        
        // 場景元素
        this.sceneImage = document.querySelector('.scene-image');
        this.sceneTitle = document.querySelector('.scene-title');
        this.sceneDescription = document.querySelector('.scene-description');
        this.sceneMessage = document.querySelector('.scene-message');
        this.sceneQuestion = document.querySelector('.scene-question');
        
        // 選項顯示區域
        this.optionsContainer = document.querySelector('.activity-options');
        
        // 事件記錄元素
        this.eventList = document.getElementById('eventList');
        
        // 結果模態框
        this.resultModal = document.getElementById('resultModal');
        this.resultIcon = document.getElementById('resultIcon');
        this.resultTitle = document.getElementById('resultTitle');
        this.resultScore = document.getElementById('resultScore');
        this.resultMessage = document.getElementById('resultMessage');
        this.finalHealth = document.getElementById('finalHealth');
        this.finalHydration = document.getElementById('finalHydration');
        this.finalEnergy = document.getElementById('finalEnergy');
        this.finalKidney = document.getElementById('finalKidney');
        this.resultSummary = document.getElementById('resultSummary');
        
        // 營養攝入信息
        this.waterIntakeInfo = document.getElementById('waterIntakeInfo');
        this.sodiumIntakeInfo = document.getElementById('sodiumIntakeInfo');
        this.proteinIntakeInfo = document.getElementById('proteinIntakeInfo');
        this.phosphateIntakeInfo = document.getElementById('phosphateIntakeInfo');
        this.potassiumIntakeInfo = document.getElementById('potassiumIntakeInfo');
        
        // 按鈕
        this.backBtn = document.getElementById('backBtn');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.timeBackBtn = document.getElementById('timeBack');
        this.timeForwardBtn = document.getElementById('timeForward');
        
        // 提示元素
        this.tooltipEl = document.getElementById('sceneTooltip');
    }
    
    /**
     * 綁定遊戲中的交互事件處理器
     */
    bindEvents() {
        // 重新開始遊戲按鈕
        this.playAgainBtn.addEventListener('click', () => {
            window.location.reload();
        });
        
        // 返回遊戲模式按鈕
        this.backBtn.addEventListener('click', () => {
            window.location.href = 'game-mode.html';
        });
        
        // 時間控制按鈕僅用於審查過去的選擇，不能改變
        this.timeBackBtn.addEventListener('click', () => {
            if (this.gameState.currentTimeIndex > 0) {
                this.gameState.currentTimeIndex--;
                this.updateTimeDisplay();
                this.updateSceneDisplay();
                
                // 禁用選項但顯示過去的選擇
                this.showPastChoice();
            }
        });
        
        this.timeForwardBtn.addEventListener('click', () => {
            if (this.gameState.currentTimeIndex < this.gameState.completedTimepoints.length) {
                this.gameState.currentTimeIndex++;
                this.updateTimeDisplay();
                this.updateSceneDisplay();
                
                // 如果是當前最新的時間點，啟用選項
                if (this.gameState.currentTimeIndex === this.gameState.completedTimepoints.length) {
                    this.renderOptions();
                } else {
                    // 否則顯示過去的選擇
                    this.showPastChoice();
                }
            }
        });
    }
    
    /**
     * 初始化遊戲狀態和界面
     */
    initializeGame() {
        // 設置角色信息
        this.characterName.textContent = this.character.name;
        this.characterDescription.textContent = this.character.description;
        
        // 更新初始狀態顯示
        this.updateStatusDisplay();
        
        // 設置初始場景
        this.updateTimeDisplay();
        this.updateSceneDisplay();
        
        // 渲染初始選項
        this.renderOptions();
        
        // 添加首個事件
        const firstTimepoint = this.timeline[0];
        this.addEventLog(firstTimepoint.time, `你開始了新的一天。今天的目標是妥善管理腎臟健康。`);
    }
    
    /**
     * 更新狀態條和數值顯示
     */
    updateStatusDisplay() {
        // 確保數值在0-100範圍內
        this.gameState.health = Math.max(0, Math.min(100, this.gameState.health));
        this.gameState.hydration = Math.max(0, Math.min(100, this.gameState.hydration));
        this.gameState.energy = Math.max(0, Math.min(100, this.gameState.energy));
        this.gameState.kidney = Math.max(0, Math.min(100, this.gameState.kidney));
        
        // 更新狀態條寬度
        this.healthFill.style.width = `${this.gameState.health}%`;
        this.hydrationFill.style.width = `${this.gameState.hydration}%`;
        this.energyFill.style.width = `${this.gameState.energy}%`;
        this.kidneyFill.style.width = `${this.gameState.kidney}%`;
        
        // 更新數值顯示
        this.healthValue.textContent = `${this.gameState.health}%`;
        this.hydrationValue.textContent = `${this.gameState.hydration}%`;
        this.energyValue.textContent = `${this.gameState.energy}%`;
        this.kidneyValue.textContent = `${this.gameState.kidney}%`;
        
        // 根據健康狀況改變顏色
        if (this.gameState.health < 30) {
            this.healthFill.style.backgroundColor = 'var(--ios-danger)';
        } else if (this.gameState.health < 60) {
            this.healthFill.style.backgroundColor = 'var(--ios-warning)';
        } else {
            this.healthFill.style.backgroundColor = 'var(--ios-success)';
        }
        
        if (this.gameState.kidney < 30) {
            this.kidneyFill.style.backgroundColor = 'var(--ios-danger)';
        } else if (this.gameState.kidney < 60) {
            this.kidneyFill.style.backgroundColor = 'var(--ios-warning)';
        } else {
            this.kidneyFill.style.backgroundColor = 'var(--ios-purple)';
        }
    }
    
    /**
     * 更新時間顯示
     */
    updateTimeDisplay() {
        const currentTimepoint = this.timeline[this.gameState.currentTimeIndex];
        this.timeDisplay.textContent = `${currentTimepoint.period} ${currentTimepoint.time}`;
    }
    
    /**
     * 更新場景顯示
     */
    updateSceneDisplay() {
        const currentTimepoint = this.timeline[this.gameState.currentTimeIndex];
        
        // 更新場景圖片和信息
        this.sceneImage.style.backgroundImage = `url('images/scenes/${currentTimepoint.scene}.jpg')`;
        this.sceneTitle.textContent = currentTimepoint.title;
        this.sceneDescription.textContent = currentTimepoint.description;
        this.sceneMessage.textContent = currentTimepoint.message;
        this.sceneQuestion.textContent = currentTimepoint.question;
    }
    
    /**
     * 渲染當前時間點的選項
     */
    renderOptions() {
        const currentTimepoint = this.timeline[this.gameState.currentTimeIndex];
        this.optionsContainer.innerHTML = '';
        
        currentTimepoint.options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'activity-option';
            optionEl.dataset.optionId = option.id;
            
            // 創建選項內容
            optionEl.innerHTML = `
                <div class="activity-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="activity-info">
                    <div class="activity-title">${option.title}</div>
                    <div class="activity-description">${option.description}</div>
                </div>
            `;
            
            // 添加點擊事件處理
            optionEl.addEventListener('click', () => this.handleOptionSelection(option));
            
            // 添加到容器
            this.optionsContainer.appendChild(optionEl);
        });
    }
    
    /**
     * 顯示過去選擇的選項（已禁用但有標記）
     */
    showPastChoice() {
        const currentTime = this.timeline[this.gameState.currentTimeIndex];
        const pastChoice = this.gameState.choices.find(
            choice => choice.timepointId === currentTime.id
        );
        
        if (!pastChoice) return;
        
        this.optionsContainer.innerHTML = '';
        
        currentTime.options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'activity-option';
            
            // 標記選擇過的選項
            if (option.id === pastChoice.optionId) {
                optionEl.className += ' selected-option';
            } else {
                optionEl.className += ' disabled-option';
            }
            
            // 創建選項內容
            optionEl.innerHTML = `
                <div class="activity-icon">
                    ${option.id === pastChoice.optionId ? 
                      '<i class="fas fa-check-circle"></i>' : 
                      '<i class="fas fa-circle"></i>'}
                </div>
                <div class="activity-info">
                    <div class="activity-title">${option.title}</div>
                    <div class="activity-description">${option.description}</div>
                </div>
            `;
            
            // 添加到容器
            this.optionsContainer.appendChild(optionEl);
        });
    }
    
    /**
     * 處理選項選擇
     * @param {Object} option 選擇的選項
     */
    handleOptionSelection(option) {
        const currentTimepoint = this.timeline[this.gameState.currentTimeIndex];
        
        // 保存選擇
        this.gameState.choices.push({
            timepointId: currentTimepoint.id,
            optionId: option.id,
            timeIndex: this.gameState.currentTimeIndex
        });
        
        // 應用選項效果
        this.applyOptionEffects(option.effects);
        
        // 添加事件日誌
        this.addEventLog(currentTimepoint.time, option.effects.feedback);
        
        // 顯示反饋提示
        this.showTooltip(option.effects.feedback);
        
        // 將當前時間點標記為已完成
        this.gameState.completedTimepoints.push(currentTimepoint.id);
        
        // 延遲後前進到下一個時間點或結束遊戲
        setTimeout(() => {
            if (this.gameState.currentTimeIndex < this.timeline.length - 1) {
                // 前進到下一個時間點
                this.gameState.currentTimeIndex++;
                this.updateTimeDisplay();
                this.updateSceneDisplay();
                this.renderOptions();
            } else {
                // 遊戲結束，顯示結果
                this.gameState.dayComplete = true;
                this.showResults();
            }
        }, 1500);
    }
    
    /**
     * 應用選項效果到遊戲狀態
     * @param {Object} effects 效果對象
     */
    applyOptionEffects(effects) {
        // 應用基本數值影響
        if (effects.health) this.gameState.health += effects.health;
        if (effects.hydration) this.gameState.hydration += effects.hydration;
        if (effects.energy) this.gameState.energy += effects.energy;
        if (effects.kidney) this.gameState.kidney += effects.kidney;
        
        // 應用營養攝入量
        if (effects.waterIntake) {
            this.character.currentWaterIntake += effects.waterIntake;
        }
        
        if (effects.sodiumIntake) {
            this.character.currentSodiumIntake += effects.sodiumIntake;
        }
        
        if (effects.proteinIntake) {
            this.character.currentProteinIntake += effects.proteinIntake;
        }
        
        if (effects.phosphateIntake) {
            this.character.currentPhosphateIntake += effects.phosphateIntake;
        }
        
        if (effects.potassiumIntake) {
            this.character.currentPotassiumIntake += effects.potassiumIntake;
        }
        
        // 更新界面顯示
        this.updateStatusDisplay();
    }
    
    /**
     * 添加事件到日誌
     * @param {String} time 事件時間
     * @param {String} content 事件內容
     */
    addEventLog(time, content) {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item fade-in';
        eventItem.innerHTML = `
            <div class="event-time">${time}</div>
            <div class="event-content">${content}</div>
        `;
        this.eventList.prepend(eventItem);
    }
    
    /**
     * 顯示反饋提示
     * @param {String} message 提示訊息
     */
    showTooltip(message) {
        this.tooltipEl.textContent = message;
        this.tooltipEl.classList.add('visible');
        
        setTimeout(() => {
            this.tooltipEl.classList.remove('visible');
        }, 3000);
    }
    
    /**
     * 計算並顯示遊戲結果
     */
    showResults() {
        // 計算最終分數
        const finalScore = this.calculateFinalScore();
        
        // 設置結果數據
        this.finalHealth.textContent = `${this.gameState.health}%`;
        this.finalHydration.textContent = `${this.gameState.hydration}%`;
        this.finalEnergy.textContent = `${this.gameState.energy}%`;
        this.finalKidney.textContent = `${this.gameState.kidney}%`;
        this.resultScore.textContent = finalScore;
        
        // 營養攝入信息
        this.waterIntakeInfo.textContent = `${this.character.currentWaterIntake} / ${this.character.maxWaterIntake} 毫升`;
        this.sodiumIntakeInfo.textContent = `${this.character.currentSodiumIntake} / ${this.character.maxSodiumIntake} 毫克`;
        this.proteinIntakeInfo.textContent = `${this.character.currentProteinIntake} / ${this.character.maxProteinIntake} 克`;
        this.phosphateIntakeInfo.textContent = `${this.character.currentPhosphateIntake} / ${this.character.maxPhosphateIntake} 毫克`;
        this.potassiumIntakeInfo.textContent = `${this.character.currentPotassiumIntake} / ${this.character.maxPotassiumIntake} 毫克`;
        
        // 修改水分攝入條的顏色
        const waterIntakeBar = document.getElementById('waterIntakeBar');
        const waterPercentage = (this.character.currentWaterIntake / this.character.maxWaterIntake) * 100;
        waterIntakeBar.style.width = `${Math.min(100, waterPercentage)}%`;
        
        if (waterPercentage > 100) {
            waterIntakeBar.style.backgroundColor = 'var(--ios-danger)';
        } else if (waterPercentage > 90) {
            waterIntakeBar.style.backgroundColor = 'var(--ios-warning)';
        } else {
            waterIntakeBar.style.backgroundColor = 'var(--ios-primary)';
        }
        
        // 根據分數設置不同的結果信息
        if (finalScore >= 80) {
            this.resultIcon.className = 'result-icon success';
            this.resultIcon.innerHTML = '<i class="fas fa-trophy"></i>';
            this.resultTitle.textContent = '做得太棒了！';
            this.resultMessage.textContent = '你出色地管理了自己的腎臟健康！';
            this.resultSummary.textContent = this.generatePositiveSummary();
        } else if (finalScore >= 60) {
            this.resultIcon.className = 'result-icon warning';
            this.resultIcon.innerHTML = '<i class="fas fa-medal"></i>';
            this.resultTitle.textContent = '做得不錯！';
            this.resultMessage.textContent = '你的健康管理還有改進空間。';
            this.resultSummary.textContent = this.generateMixedSummary();
        } else {
            this.resultIcon.className = 'result-icon error';
            this.resultIcon.innerHTML = '<i class="fas fa-heart-crack"></i>';
            this.resultTitle.textContent = '需要改進';
            this.resultMessage.textContent = '你的健康管理需要更多關注。';
            this.resultSummary.textContent = this.generateNegativeSummary();
        }
        
        // 顯示結果模態框
        this.resultModal.classList.add('active');
    }
    
    /**
     * 計算最終得分
     * @returns {Number} 最終得分(0-100)
     */
    calculateFinalScore() {
        // 基本狀態權重
        const healthWeight = 0.20;
        const hydrationWeight = 0.15;
        const energyWeight = 0.10;
        const kidneyWeight = 0.25;
        
        // 營養指標權重 (負面影響，超標越多分數越低)
        const waterIntakeFactor = 0.1;
        const sodiumIntakeFactor = 0.1;
        const proteinIntakeFactor = 0.1;
        const phosphateIntakeFactor = 0.05;
        const potassiumIntakeFactor = 0.05;
        
        // 計算基本狀態分數
        let baseScore = (
            this.gameState.health * healthWeight +
            this.gameState.hydration * hydrationWeight +
            this.gameState.energy * energyWeight +
            this.gameState.kidney * kidneyWeight
        );
        
        // 計算營養指標扣分
        let nutritionPenalty = 0;
        
        // 水分攝入扣分 (過多或過少都會扣分)
        const waterRatio = this.character.currentWaterIntake / this.character.maxWaterIntake;
        if (waterRatio > 1.2) {
            nutritionPenalty += (waterRatio - 1.2) * 100 * waterIntakeFactor;
        } else if (waterRatio < 0.7) {
            nutritionPenalty += (0.7 - waterRatio) * 100 * waterIntakeFactor;
        }
        
        // 鈉攝入扣分
        const sodiumRatio = this.character.currentSodiumIntake / this.character.maxSodiumIntake;
        if (sodiumRatio > 1.0) {
            nutritionPenalty += (sodiumRatio - 1.0) * 100 * sodiumIntakeFactor;
        }
        
        // 蛋白質攝入扣分
        const proteinRatio = this.character.currentProteinIntake / this.character.maxProteinIntake;
        if (proteinRatio > 1.0) {
            nutritionPenalty += (proteinRatio - 1.0) * 100 * proteinIntakeFactor;
        }
        
        // 磷攝入扣分
        const phosphateRatio = this.character.currentPhosphateIntake / this.character.maxPhosphateIntake;
        if (phosphateRatio > 1.0) {
            nutritionPenalty += (phosphateRatio - 1.0) * 100 * phosphateIntakeFactor;
        }
        
        // 鉀攝入扣分
        const potassiumRatio = this.character.currentPotassiumIntake / this.character.maxPotassiumIntake;
        if (potassiumRatio > 1.0) {
            nutritionPenalty += (potassiumRatio - 1.0) * 100 * potassiumIntakeFactor;
        }
        
        // 計算最終分數
        const finalScore = Math.max(0, Math.min(100, baseScore - nutritionPenalty));
        
        return Math.round(finalScore);
    }
    
    /**
     * 生成正面總結
     * @returns {String} 總結文字
     */
    generatePositiveSummary() {
        return `今天你做出了許多有益腎臟健康的選擇：控制水分攝入、留意飲食鹽分和蛋白質、按時服藥、適量運動。這些習慣對維護腎功能、控制血壓和減少併發症風險非常重要。繼續保持這些好習慣！`;
    }
    
    /**
     * 生成中性總結
     * @returns {String} 總結文字
     */
    generateMixedSummary() {
        let issues = [];
        
        if (this.character.currentWaterIntake > this.character.maxWaterIntake) {
            issues.push("水分攝入過多");
        }
        
        if (this.character.currentSodiumIntake > this.character.maxSodiumIntake) {
            issues.push("鹽分攝入過高");
        }
        
        if (this.character.currentProteinIntake > this.character.maxProteinIntake) {
            issues.push("蛋白質攝入過多");
        }
        
        if (this.character.currentPhosphateIntake > this.character.maxPhosphateIntake) {
            issues.push("磷攝入過高");
        }
        
        if (this.character.currentPotassiumIntake > this.character.maxPotassiumIntake) {
            issues.push("鉀攝入過高");
        }
        
        return `你的一天管理總體不錯，但有一些方面需要改進：${issues.join("、")}。腎臟病患者需要更加謹慎地控制這些指標，建議更仔細地計劃飲食和生活習慣。`;
    }
    
    /**
     * 生成負面總結
     * @returns {String} 總結文字
     */
    generateNegativeSummary() {
        return `今天的生活習慣對腎臟健康有多處不利影響，包括：飲食控制不當、服藥不規律、水分攝入不合理。這些可能會加速腎功能下降、增加尿毒症風險和心血管併發症。建議諮詢醫護人員獲取更詳細的生活指導，並嚴格按照醫囑調整生活方式。`;
    }
}

// 當文檔加載完成後初始化遊戲
document.addEventListener('DOMContentLoaded', function() {
    // 檢查遊戲所需圖片資源
    const requiredImages = [
        'images/scenes/morning-home.jpg',
        'images/scenes/morning-breakfast.jpg',
        'images/scenes/morning-work.jpg',
        'images/scenes/lunch-time.jpg',
        'images/scenes/lunch-medication.jpg',
        'images/scenes/afternoon-break.jpg',
        'images/scenes/commute-home.jpg',
        'images/scenes/dinner-time.jpg',
        'images/scenes/evening-activity.jpg',
        'images/scenes/bedtime-routine.jpg'
    ];
    
    // 顯示資源載入中的提示
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'loading-message';
    loadingMessage.innerHTML = `
        <div class="loading-spinner"></div>
        <div>載入遊戲資源中...</div>
    `;
    document.body.appendChild(loadingMessage);
    
    // 預加載圖片
    let loadedImages = 0;
    requiredImages.forEach(src => {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            if (loadedImages === requiredImages.length) {
                // 所有圖片加載完成，移除載入提示並初始化遊戲
                document.body.removeChild(loadingMessage);
                window.gameInstance = new DailyRoutineGame();
            }
        };
        img.onerror = () => {
            console.warn(`無法加載圖片: ${src}`);
            loadedImages++;
            if (loadedImages === requiredImages.length) {
                document.body.removeChild(loadingMessage);
                window.gameInstance = new DailyRoutineGame();
            }
        };
        img.src = src;
    });
}); 