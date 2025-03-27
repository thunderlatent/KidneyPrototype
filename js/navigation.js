/**
 * 腎好康應用導航管理
 * 處理頁面切換、歷史記錄和框架導航
 */

// 頁面路由配置
const routes = {
    home: 'pages/home.html',
    games: 'pages/games-center.html',
    profile: 'pages/profile.html',
    community: 'pages/community.html',
    learn: 'pages/learning.html',
    
    // 遊戲頁面
    quiz: 'pages/games/quiz.html',
    matching: 'pages/games/matching.html',
    medication: 'pages/games/medication.html',
    diet: 'pages/games/diet.html',
    
    // 設定和其他頁面
    settings: 'pages/settings.html',
    rewards: 'pages/rewards.html',
    notifications: 'pages/notifications.html'
};

// 頁面歷史記錄
let pageHistory = [];
let currentPage = '';

/**
 * 初始化導航系統
 */
function initNavigation() {
    // 在主框架載入完成後初始化
    window.addEventListener('DOMContentLoaded', () => {
        // 初始化頁面歷史
        currentPage = 'home';
        pageHistory.push(currentPage);
        
        // 設定後退按鈕行為
        window.addEventListener('popstate', handlePopState);
    });
}

/**
 * 導航到指定頁面
 * @param {string} pageName - 頁面名稱，對應routes中的key
 * @param {Object} params - 導航參數
 */
function navigateTo(pageName, params = {}) {
    if (!routes[pageName]) {
        console.error(`頁面 "${pageName}" 不存在`);
        return;
    }
    
    // 獲取主框架
    const mainFrame = window.parent.document.getElementById('mainFrame');
    if (!mainFrame) {
        console.error('找不到主框架元素');
        return;
    }
    
    // 構建URL（包含查詢參數）
    let url = routes[pageName];
    if (Object.keys(params).length > 0) {
        const queryString = new URLSearchParams(params).toString();
        url = `${url}?${queryString}`;
    }
    
    // 更新框架src
    mainFrame.src = url;
    
    // 更新歷史記錄
    pageHistory.push(pageName);
    currentPage = pageName;
    
    // 更新狀態
    window.history.pushState({ page: pageName }, '', '');
    
    // 觸發頁面切換事件
    window.dispatchEvent(new CustomEvent('pageChanged', { 
        detail: { page: pageName, params: params }
    }));
}

/**
 * 處理返回上一頁
 */
function goBack() {
    if (pageHistory.length > 1) {
        // 移除當前頁面
        pageHistory.pop();
        // 獲取上一頁
        const previousPage = pageHistory[pageHistory.length - 1];
        
        // 獲取主框架
        const mainFrame = window.parent.document.getElementById('mainFrame');
        if (!mainFrame) {
            console.error('找不到主框架元素');
            return;
        }
        
        // 更新框架src
        mainFrame.src = routes[previousPage];
        
        // 更新當前頁面
        currentPage = previousPage;
        
        // 觸發頁面切換事件
        window.dispatchEvent(new CustomEvent('pageChanged', { 
            detail: { page: previousPage, params: {} }
        }));
        
        return true;
    }
    
    return false;
}

/**
 * 處理popstate事件（瀏覽器後退按鈕）
 */
function handlePopState(event) {
    goBack();
}

/**
 * 獲取當前頁面名稱
 * @returns {string} 當前頁面名稱
 */
function getCurrentPage() {
    return currentPage;
}

/**
 * 獲取URL參數
 * @returns {Object} URL參數對象
 */
function getUrlParams() {
    const params = {};
    const urlParams = new URLSearchParams(window.location.search);
    
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }
    
    return params;
}

/**
 * 更新底部導航標籤活動狀態
 */
function updateTabBar() {
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(item => {
        const tabPage = item.getAttribute('data-page');
        
        if (tabPage === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * 初始化底部導航欄事件
 */
function initTabBar() {
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tabPage = this.getAttribute('data-page');
            navigateTo(tabPage);
            
            // 更新標籤欄狀態
            tabItems.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * 初始化頁面返回按鈕
 */
function initBackButton() {
    const backButton = document.querySelector('.nav-back');
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            goBack();
        });
    }
}

// 導出頁面導航函數
window.app = window.app || {};
window.app.navigation = {
    navigateTo,
    goBack,
    getCurrentPage,
    getUrlParams,
    initTabBar,
    initBackButton
};

// 自動初始化導航系統
document.addEventListener('DOMContentLoaded', function() {
    // 在框架內頁執行的初始化
    initTabBar();
    initBackButton();
    updateTabBar();
}); 