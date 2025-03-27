/**
 * 腎好康應用廣告管理
 * 處理廣告顯示、獎勵和統計
 */

// 廣告配置
const adConfig = {
    // 橫幅廣告出現間隔（毫秒）
    bannerRefreshInterval: 60000,
    
    // 插頁廣告顯示的最小間隔（毫秒）
    interstitialMinInterval: 180000,
    
    // 獎勵廣告獎勵配置
    rewards: {
        coins: 50,        // 觀看廣告獲得的金幣
        healthPoints: 20, // 觀看廣告獲得的健康點數
        extraLife: 1,     // 觀看廣告獲得的額外生命
        doubleReward: 2,  // 獎勵翻倍系數
    },
    
    // 廣告ID配置（實際整合SDK時使用）
    adUnitIds: {
        banner: 'banner-ad-unit-id',
        interstitial: 'interstitial-ad-unit-id',
        rewarded: 'rewarded-ad-unit-id',
        rewardedInterstitial: 'rewarded-interstitial-ad-unit-id',
    },
    
    // 測試模式 (是否允許立即關閉廣告)
    testMode: true
};

// 廣告狀態
let adState = {
    lastInterstitialShown: 0,
    bannerVisible: false,
    adsInitialized: false,
    lastBannerRefresh: 0,
    adFailCount: 0
};

/**
 * 初始化廣告系統
 */
function initAds() {
    console.log('初始化廣告系統...');
    
    // 模擬廣告SDK初始化
    setTimeout(() => {
        adState.adsInitialized = true;
        console.log('廣告系統初始化完成');
        
        // 顯示初始橫幅廣告
        showBannerAd();
        
        // 預載插頁廣告
        preloadInterstitialAd();
        
        // 預載獎勵廣告
        preloadRewardedAd();
    }, 1000);
    
    // 設定橫幅廣告自動更新
    setInterval(refreshBannerAd, adConfig.bannerRefreshInterval);
}

/**
 * 顯示橫幅廣告
 * @param {string} containerId - 廣告容器ID（可選）
 */
function showBannerAd(containerId = 'ad-banner-container') {
    if (!adState.adsInitialized) {
        console.warn('廣告系統尚未初始化');
        return;
    }
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`找不到廣告容器: ${containerId}`);
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 創建模擬廣告元素
    const adElement = document.createElement('div');
    adElement.className = 'ad-container';
    adElement.textContent = '廣告區塊 - 讓您健康快樂每一天';
    adElement.style.backgroundColor = '#f2f2f7';
    adElement.style.padding = '10px';
    adElement.style.textAlign = 'center';
    adElement.style.fontSize = '14px';
    adElement.style.color = '#8e8e93';
    
    // 添加到容器
    container.appendChild(adElement);
    
    // 更新廣告狀態
    adState.bannerVisible = true;
    adState.lastBannerRefresh = Date.now();
    
    console.log('橫幅廣告顯示成功');
}

/**
 * 刷新橫幅廣告
 */
function refreshBannerAd() {
    if (adState.bannerVisible) {
        showBannerAd();
    }
}

/**
 * 隱藏橫幅廣告
 */
function hideBannerAd() {
    const container = document.getElementById('ad-banner-container');
    if (container) {
        container.innerHTML = '';
    }
    
    adState.bannerVisible = false;
    console.log('橫幅廣告已隱藏');
}

/**
 * 預載插頁廣告
 */
function preloadInterstitialAd() {
    console.log('預載插頁廣告...');
    
    // 模擬預載過程
    setTimeout(() => {
        console.log('插頁廣告預載完成');
    }, 500);
}

/**
 * 顯示插頁廣告
 * @param {Function} onClose - 廣告關閉後的回調函數
 * @returns {boolean} 是否成功顯示廣告
 */
function showInterstitialAd(onClose) {
    if (!adState.adsInitialized) {
        console.warn('廣告系統尚未初始化');
        if (onClose) onClose(false);
        return false;
    }
    
    // 檢查廣告間隔
    const now = Date.now();
    if (now - adState.lastInterstitialShown < adConfig.interstitialMinInterval) {
        console.log('插頁廣告顯示過於頻繁，已略過');
        if (onClose) onClose(false);
        return false;
    }
    
    console.log('顯示插頁廣告...');
    
    // 創建模擬插頁廣告元素
    const adOverlay = document.createElement('div');
    adOverlay.className = 'ad-overlay';
    adOverlay.style.position = 'fixed';
    adOverlay.style.top = '0';
    adOverlay.style.left = '0';
    adOverlay.style.width = '100%';
    adOverlay.style.height = '100%';
    adOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    adOverlay.style.display = 'flex';
    adOverlay.style.flexDirection = 'column';
    adOverlay.style.alignItems = 'center';
    adOverlay.style.justifyContent = 'center';
    adOverlay.style.zIndex = '1000';
    
    const adContent = document.createElement('div');
    adContent.style.width = '80%';
    adContent.style.height = '60%';
    adContent.style.backgroundColor = 'white';
    adContent.style.borderRadius = '16px';
    adContent.style.display = 'flex';
    adContent.style.flexDirection = 'column';
    adContent.style.alignItems = 'center';
    adContent.style.justifyContent = 'center';
    adContent.style.padding = '20px';
    adContent.style.position = 'relative';
    
    const adTitle = document.createElement('div');
    adTitle.textContent = '贊助廣告';
    adTitle.style.fontSize = '18px';
    adTitle.style.fontWeight = 'bold';
    adTitle.style.marginBottom = '20px';
    
    const adImage = document.createElement('div');
    adImage.style.width = '100%';
    adImage.style.height = '200px';
    adImage.style.backgroundColor = '#f0f0f0';
    adImage.style.display = 'flex';
    adImage.style.alignItems = 'center';
    adImage.style.justifyContent = 'center';
    adImage.style.marginBottom = '20px';
    adImage.style.borderRadius = '8px';
    adImage.textContent = '廣告圖片';
    
    const adMessage = document.createElement('div');
    adMessage.textContent = '健康產品推薦，為您的腎臟健康保駕護航';
    adMessage.style.textAlign = 'center';
    adMessage.style.marginBottom = '30px';
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.width = '100%';
    buttonsContainer.style.justifyContent = 'space-between';
    buttonsContainer.style.gap = '10px';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '關閉廣告';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#007aff';
    closeButton.style.color = 'white';
    closeButton.style.borderRadius = '8px';
    closeButton.style.border = 'none';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.flex = '1';
    
    // 關閉廣告的事件
    closeButton.addEventListener('click', function() {
        document.body.removeChild(adOverlay);
        
        // 更新廣告狀態
        adState.lastInterstitialShown = Date.now();
        
        // 預載下一個廣告
        preloadInterstitialAd();
        
        // 執行回調
        if (onClose) onClose(true);
    });
    
    // 在測試模式下添加立即關閉按鈕
    if (adConfig.testMode) {
        const testCloseButton = document.createElement('button');
        testCloseButton.textContent = '測試關閉';
        testCloseButton.style.padding = '10px 20px';
        testCloseButton.style.backgroundColor = '#FF3B30';
        testCloseButton.style.color = 'white';
        testCloseButton.style.borderRadius = '8px';
        testCloseButton.style.border = 'none';
        testCloseButton.style.fontWeight = 'bold';
        testCloseButton.style.flex = '1';
        testCloseButton.title = '測試用：立即關閉廣告';
        
        testCloseButton.addEventListener('click', function() {
            document.body.removeChild(adOverlay);
            console.log('廣告被測試模式立即關閉');
            
            // 更新廣告狀態
            adState.lastInterstitialShown = Date.now();
            
            // 預載下一個廣告
            preloadInterstitialAd();
            
            // 執行回調
            if (onClose) onClose(true);
        });
        
        // 添加測試按鈕
        buttonsContainer.appendChild(testCloseButton);
    }
    
    // 添加正常按鈕
    buttonsContainer.appendChild(closeButton);
    
    // 組裝廣告元素
    adContent.appendChild(adTitle);
    adContent.appendChild(adImage);
    adContent.appendChild(adMessage);
    adContent.appendChild(buttonsContainer);
    adOverlay.appendChild(adContent);
    
    // 添加測試模式標記
    if (adConfig.testMode) {
        const testIndicator = document.createElement('div');
        testIndicator.textContent = '測試模式';
        testIndicator.style.position = 'absolute';
        testIndicator.style.top = '10px';
        testIndicator.style.right = '10px';
        testIndicator.style.backgroundColor = '#FF3B30';
        testIndicator.style.color = 'white';
        testIndicator.style.padding = '3px 8px';
        testIndicator.style.borderRadius = '4px';
        testIndicator.style.fontSize = '12px';
        adContent.appendChild(testIndicator);
    }
    
    // 添加到頁面
    document.body.appendChild(adOverlay);
    
    console.log('插頁廣告顯示成功');
    return true;
}

/**
 * 預載獎勵廣告
 */
function preloadRewardedAd() {
    console.log('預載獎勵廣告...');
    
    // 模擬預載過程
    setTimeout(() => {
        console.log('獎勵廣告預載完成');
    }, 500);
}

/**
 * 顯示獎勵廣告
 * @param {string} rewardType - 獎勵類型（如 'coins', 'extraLife'）
 * @param {Function} onRewarded - 用戶成功獲得獎勵後的回調
 * @param {Function} onClose - 廣告關閉後的回調（無論是否獲得獎勵）
 * @returns {boolean} 是否成功顯示廣告
 */
function showRewardedAd(rewardType, onRewarded, onClose) {
    if (!adState.adsInitialized) {
        console.warn('廣告系統尚未初始化');
        if (onClose) onClose(false);
        return false;
    }
    
    if (!adConfig.rewards[rewardType]) {
        console.warn(`未知的獎勵類型: ${rewardType}`);
        if (onClose) onClose(false);
        return false;
    }
    
    console.log(`顯示獎勵廣告 (${rewardType})...`);
    
    // 創建模擬獎勵廣告元素
    const adOverlay = document.createElement('div');
    adOverlay.className = 'ad-overlay';
    adOverlay.style.position = 'fixed';
    adOverlay.style.top = '0';
    adOverlay.style.left = '0';
    adOverlay.style.width = '100%';
    adOverlay.style.height = '100%';
    adOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    adOverlay.style.display = 'flex';
    adOverlay.style.flexDirection = 'column';
    adOverlay.style.alignItems = 'center';
    adOverlay.style.justifyContent = 'center';
    adOverlay.style.zIndex = '1000';
    
    const adContent = document.createElement('div');
    adContent.style.width = '85%';
    adContent.style.height = '75%';
    adContent.style.backgroundColor = 'white';
    adContent.style.borderRadius = '16px';
    adContent.style.display = 'flex';
    adContent.style.flexDirection = 'column';
    adContent.style.alignItems = 'center';
    adContent.style.justifyContent = 'center';
    adContent.style.padding = '20px';
    adContent.style.position = 'relative';
    
    const adTitle = document.createElement('div');
    adTitle.textContent = '觀看廣告獲取獎勵';
    adTitle.style.fontSize = '18px';
    adTitle.style.fontWeight = 'bold';
    adTitle.style.marginBottom = '15px';
    
    const rewardInfo = document.createElement('div');
    rewardInfo.style.backgroundColor = '#f0f8ff';
    rewardInfo.style.borderRadius = '8px';
    rewardInfo.style.padding = '10px 15px';
    rewardInfo.style.marginBottom = '20px';
    rewardInfo.style.fontSize = '14px';
    rewardInfo.style.width = '100%';
    rewardInfo.style.textAlign = 'center';
    
    // 設定獎勵顯示文本
    switch(rewardType) {
        case 'coins':
            rewardInfo.textContent = `完整觀看廣告可獲得 ${adConfig.rewards.coins} 金幣`;
            break;
        case 'healthPoints':
            rewardInfo.textContent = `完整觀看廣告可獲得 ${adConfig.rewards.healthPoints} 健康點數`;
            break;
        case 'extraLife':
            rewardInfo.textContent = `完整觀看廣告可獲得 ${adConfig.rewards.extraLife} 次復活機會`;
            break;
        case 'doubleReward':
            rewardInfo.textContent = `完整觀看廣告可獲得 ${adConfig.rewards.doubleReward}倍 獎勵`;
            break;
    }
    
    const adImage = document.createElement('div');
    adImage.style.width = '100%';
    adImage.style.height = '200px';
    adImage.style.backgroundColor = '#f0f0f0';
    adImage.style.display = 'flex';
    adImage.style.alignItems = 'center';
    adImage.style.justifyContent = 'center';
    adImage.style.marginBottom = '15px';
    adImage.style.borderRadius = '8px';
    adImage.textContent = '廣告內容';
    
    const timer = document.createElement('div');
    timer.textContent = '廣告時間: 5秒';
    timer.style.marginBottom = '20px';
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.width = '100%';
    buttonsContainer.style.justifyContent = 'space-between';
    buttonsContainer.style.gap = '10px';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '關閉廣告 (未完成)';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#cccccc';
    closeButton.style.color = 'white';
    closeButton.style.borderRadius = '8px';
    closeButton.style.border = 'none';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.flex = '1';
    
    // 在測試模式下添加立即獲得獎勵的按鈕
    if (adConfig.testMode) {
        const testRewardButton = document.createElement('button');
        testRewardButton.textContent = '測試獲取獎勵';
        testRewardButton.style.padding = '10px 20px';
        testRewardButton.style.backgroundColor = '#34C759';
        testRewardButton.style.color = 'white';
        testRewardButton.style.borderRadius = '8px';
        testRewardButton.style.border = 'none';
        testRewardButton.style.fontWeight = 'bold';
        testRewardButton.style.flex = '1';
        testRewardButton.title = '測試用：立即獲得獎勵';
        
        // 測試獲取獎勵按鈕事件
        testRewardButton.addEventListener('click', function() {
            clearInterval(countdown);
            document.body.removeChild(adOverlay);
            
            console.log(`測試模式: 獎勵廣告觀看完成，立即獲得 ${rewardType} 獎勵`);
            
            // 給予獎勵
            if (onRewarded) {
                const rewardValue = adConfig.rewards[rewardType];
                onRewarded(rewardType, rewardValue);
            }
            
            // 預載下一個廣告
            preloadRewardedAd();
            
            // 執行關閉回調
            if (onClose) onClose(true);
        });
        
        // 添加測試按鈕
        buttonsContainer.appendChild(testRewardButton);
    }
    
    // 添加關閉按鈕（即使不能立即關閉，但在測試模式下可以）
    if (adConfig.testMode) {
        closeButton.disabled = false;
        closeButton.style.backgroundColor = '#FF3B30';
    } else {
        closeButton.disabled = true;
    }
    
    buttonsContainer.appendChild(closeButton);
    
    // 組裝廣告元素
    adContent.appendChild(adTitle);
    adContent.appendChild(rewardInfo);
    adContent.appendChild(adImage);
    adContent.appendChild(timer);
    adContent.appendChild(buttonsContainer);
    adOverlay.appendChild(adContent);
    
    // 添加測試模式標記
    if (adConfig.testMode) {
        const testIndicator = document.createElement('div');
        testIndicator.textContent = '測試模式';
        testIndicator.style.position = 'absolute';
        testIndicator.style.top = '10px';
        testIndicator.style.right = '10px';
        testIndicator.style.backgroundColor = '#FF3B30';
        testIndicator.style.color = 'white';
        testIndicator.style.padding = '3px 8px';
        testIndicator.style.borderRadius = '4px';
        testIndicator.style.fontSize = '12px';
        adContent.appendChild(testIndicator);
    }
    
    // 添加到頁面
    document.body.appendChild(adOverlay);
    
    // 模擬廣告播放
    let timeLeft = 5;
    const countdown = setInterval(() => {
        timeLeft--;
        timer.textContent = `廣告時間: ${timeLeft}秒`;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            closeButton.textContent = '獲取獎勵並關閉';
            closeButton.style.backgroundColor = '#34C759';
            closeButton.disabled = false;
            
            // 更新關閉按鈕行為 - 現在可以獲得獎勵
            closeButton.removeEventListener('click', earlyCloseHandler);
            closeButton.addEventListener('click', completeHandler);
        }
    }, 1000);
    
    // 提前關閉處理（無獎勵）
    const earlyCloseHandler = function() {
        clearInterval(countdown);
        document.body.removeChild(adOverlay);
        
        console.log('獎勵廣告被提前關閉，無獎勵');
        
        // 預載下一個廣告
        preloadRewardedAd();
        
        // 執行關閉回調
        if (onClose) onClose(false);
    };
    
    // 完成廣告處理（獲得獎勵）
    const completeHandler = function() {
        document.body.removeChild(adOverlay);
        
        console.log(`獎勵廣告觀看完成，獲得 ${rewardType} 獎勵`);
        
        // 給予獎勵
        if (onRewarded) {
            // 獎勵值
            const rewardValue = adConfig.rewards[rewardType];
            onRewarded(rewardType, rewardValue);
        }
        
        // 預載下一個廣告
        preloadRewardedAd();
        
        // 執行關閉回調
        if (onClose) onClose(true);
    };
    
    // 設定初始關閉按鈕行為
    closeButton.addEventListener('click', earlyCloseHandler);
    
    console.log('獎勵廣告顯示成功');
    return true;
}

/**
 * 處理獎勵發放
 * @param {string} rewardType - 獎勵類型
 * @param {number} rewardValue - 獎勵數值
 */
function handleReward(rewardType, rewardValue) {
    console.log(`處理獎勵: ${rewardType} = ${rewardValue}`);
    
    // 這裡可以整合遊戲獎勵系統
    if (window.app && window.app.rewards) {
        window.app.rewards.addReward(rewardType, rewardValue);
    } else {
        // 如果獎勵系統尚未載入，則緩存獎勵
        console.log('獎勵系統尚未載入，緩存獎勵');
        
        // 創建一個臨時緩存
        window.pendingRewards = window.pendingRewards || [];
        window.pendingRewards.push({
            type: rewardType,
            value: rewardValue,
            timestamp: Date.now()
        });
    }
    
    // 顯示獎勵通知
    showRewardToast(rewardType, rewardValue);
}

/**
 * 顯示獎勵通知
 * @param {string} rewardType - 獎勵類型
 * @param {number} rewardValue - 獎勵數值
 */
function showRewardToast(rewardType, rewardValue) {
    // 創建通知元素
    const toast = document.createElement('div');
    toast.className = 'reward-toast';
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '16px';
    toast.style.zIndex = '1001';
    toast.style.minWidth = '200px';
    toast.style.textAlign = 'center';
    
    // 設定獎勵顯示文本
    switch(rewardType) {
        case 'coins':
            toast.textContent = `恭喜獲得 ${rewardValue} 金幣！`;
            break;
        case 'healthPoints':
            toast.textContent = `恭喜獲得 ${rewardValue} 健康點數！`;
            break;
        case 'extraLife':
            toast.textContent = `恭喜獲得 ${rewardValue} 次復活機會！`;
            break;
        case 'doubleReward':
            toast.textContent = `恭喜獲得 ${rewardValue}倍 獎勵！`;
            break;
        default:
            toast.textContent = `恭喜獲得獎勵！`;
    }
    
    // 添加到頁面
    document.body.appendChild(toast);
    
    // 自動移除通知
    setTimeout(() => {
        if (toast.parentNode) {
            document.body.removeChild(toast);
        }
    }, 3000);
}

// 導出廣告相關函數
window.app = window.app || {};
window.app.ads = {
    initAds,
    showBannerAd,
    hideBannerAd,
    showInterstitialAd,
    showRewardedAd,
    handleReward
};

// 當文檔載入完成時自動初始化廣告系統
document.addEventListener('DOMContentLoaded', function() {
    // 檢查是否需要初始化廣告
    // 在實際應用中，可能需要等待用戶同意隱私政策後才初始化
    initAds();
}); 