/**
 * 腎好康應用用戶管理系統
 * 處理用戶註冊、登入、個人資料管理等
 */

// 用戶資料結構
const defaultUserData = {
    userId: null,               // 用戶ID
    username: '',               // 用戶名
    email: '',                  // 電子郵件
    nickname: '',               // 暱稱
    avatar: 'default',          // 頭像
    registrationDate: null,     // 註冊日期
    lastLoginDate: null,        // 上次登入日期
    
    // 個人資料
    profile: {
        fullName: '',           // 全名
        birthdate: '',          // 出生日期
        gender: '',             // 性別
        patientType: '',        // 患者類型（透析、移植、保守治療等）
        dialysisStartDate: '',  // 透析開始日期（如適用）
        dialysisType: '',       // 透析類型（血液透析、腹膜透析等）
        treatmentCenter: '',    // 治療中心/醫院
        emergencyContact: {
            name: '',
            relationship: '',
            phone: ''
        }
    },
    
    // 健康數據
    healthData: {
        recentRecords: [],      // 最近的健康記錄
        medications: []         // 藥物清單
    },
    
    // 使用統計
    stats: {
        totalGamesPlayed: 0,
        quizCorrectAnswers: 0,
        loginDays: 0,
        consecutiveLoginDays: 0,
        lastCompletedTasks: []
    },
    
    // 隱私和設定
    settings: {
        notifications: true,    // 通知開關
        dataSharing: false,     // 數據分享設定
        theme: 'light',         // 主題設定
        language: 'zh-TW'       // 語言設定
    },
    
    // 驗證狀態
    verified: false,            // 是否已驗證電子郵件
    verificationToken: null,    // 驗證令牌
    
    // 隱私保護相關
    isPhoneNumberVerified: false,
    isDataSubjectToResearch: false
};

// 當前登入的用戶
let currentUser = null;

/**
 * 初始化用戶系統
 */
function initUserSystem() {
    console.log('初始化用戶系統...');
    
    // 從本地存儲加載用戶數據
    loadUserFromStorage();
    
    // 檢查登入狀態
    checkLoginStatus();
    
    // 如果已登入，更新最後登入時間
    if (isLoggedIn()) {
        updateLastLoginDate();
    }
}

/**
 * 從localStorage加載用戶數據
 */
function loadUserFromStorage() {
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            console.log('已從存儲加載用戶數據');
        } catch (e) {
            console.error('解析用戶數據時出錯:', e);
            currentUser = null;
        }
    } else {
        console.log('未找到已保存的用戶數據');
        currentUser = null;
    }
}

/**
 * 保存用戶數據到localStorage
 */
function saveUserToStorage() {
    if (currentUser) {
        try {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            console.log('用戶數據已保存到存儲');
        } catch (e) {
            console.error('保存用戶數據時出錯:', e);
        }
    } else {
        // 如果沒有當前用戶，清除存儲
        localStorage.removeItem('currentUser');
    }
}

/**
 * 檢查用戶登入狀態
 * @returns {boolean} 是否已登入
 */
function checkLoginStatus() {
    // 檢查是否有當前用戶
    const isLogged = !!currentUser;
    
    // 更新UI顯示登入/未登入狀態
    updateUserUI(isLogged);
    
    return isLogged;
}

/**
 * 檢查是否已登入
 * @returns {boolean} 是否已登入
 */
function isLoggedIn() {
    return !!currentUser;
}

/**
 * 註冊新用戶
 * @param {string} username - 用戶名
 * @param {string} email - 電子郵件
 * @param {string} password - 密碼
 * @param {string} nickname - 暱稱
 * @returns {Promise<Object>} 結果
 */
async function registerUser(username, email, password, nickname) {
    // 驗證輸入
    if (!username || !email || !password) {
        return { success: false, message: '請填寫所有必填欄位' };
    }
    
    // 檢查用戶名和電子郵件是否已存在
    if (checkUserExists(username, email)) {
        return { success: false, message: '用戶名或電子郵件已存在' };
    }
    
    try {
        // 在實際應用中，這裡應該向後端API發送註冊請求
        // 這裡我們模擬本地註冊
        
        // 創建新用戶
        const newUser = {
            ...JSON.parse(JSON.stringify(defaultUserData)), // 深複製默認用戶數據
            userId: generateUserId(),
            username: username,
            email: email,
            nickname: nickname || username,
            registrationDate: new Date().toISOString(),
            lastLoginDate: new Date().toISOString(),
            verificationToken: generateToken()
        };
        
        // 模擬密碼加密（實際應用中應在後端進行）
        const hashedPassword = await simulatePasswordHash(password);
        
        // 儲存用戶資料（在實際應用中這應該是後端操作）
        saveNewUser(newUser, hashedPassword);
        
        // 自動登入新註冊的用戶
        currentUser = newUser;
        saveUserToStorage();
        
        // 更新UI
        updateUserUI(true);
        
        // 模擬發送驗證郵件
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        
        return { success: true, message: '註冊成功！', user: newUser };
    } catch (error) {
        console.error('註冊時出錯:', error);
        return { success: false, message: '註冊時發生錯誤，請稍後再試' };
    }
}

/**
 * 用戶登入
 * @param {string} username - 用戶名或電子郵件
 * @param {string} password - 密碼
 * @returns {Promise<Object>} 結果
 */
async function loginUser(username, password) {
    // 驗證輸入
    if (!username || !password) {
        return { success: false, message: '請輸入用戶名和密碼' };
    }
    
    try {
        // 在實際應用中，這裡應該向後端API發送登入請求
        // 這裡我們模擬本地登入
        
        // 檢查用戶是否存在並驗證密碼
        const user = getUserByUsernameOrEmail(username);
        
        if (!user) {
            return { success: false, message: '用戶名或密碼不正確' };
        }
        
        // 驗證密碼（在實際應用中應在後端進行）
        const isPasswordValid = await verifyPassword(password, getUserPassword(user.userId));
        
        if (!isPasswordValid) {
            return { success: false, message: '用戶名或密碼不正確' };
        }
        
        // 更新登入時間
        user.lastLoginDate = new Date().toISOString();
        
        // 設置當前用戶
        currentUser = user;
        saveUserToStorage();
        
        // 更新UI
        updateUserUI(true);
        
        return { success: true, message: '登入成功！', user: user };
    } catch (error) {
        console.error('登入時出錯:', error);
        return { success: false, message: '登入時發生錯誤，請稍後再試' };
    }
}

/**
 * 用戶登出
 */
function logoutUser() {
    // 清除當前用戶
    currentUser = null;
    saveUserToStorage();
    
    // 清除獎勵系統的用戶數據
    resetUserRewards();
    
    // 更新UI
    updateUserUI(false);
    
    // 重定向到首頁
    window.location.href = 'index.html';
}

/**
 * 更新用戶UI顯示
 * @param {boolean} isLoggedIn - 是否已登入
 */
function updateUserUI(isLoggedIn) {
    // 這個函數在各個頁面中實現，更新UI以反映登入狀態
    // 例如顯示/隱藏登入按鈕、用戶資料等
    
    // 發送登入狀態變更事件，讓不同頁面監聽並更新UI
    window.dispatchEvent(new CustomEvent('loginStatusChanged', {
        detail: { isLoggedIn, user: currentUser }
    }));
}

/**
 * 更新最後登入日期
 */
function updateLastLoginDate() {
    if (currentUser) {
        currentUser.lastLoginDate = new Date().toISOString();
        saveUserToStorage();
    }
}

// 模擬後端功能的輔助函數 (在實際應用中這些將在後端實現)

// 本地用戶存儲（模擬資料庫）
const localUserDB = {
    users: {},
    passwords: {}
};

/**
 * 檢查用戶是否已存在
 * @param {string} username - 用戶名
 * @param {string} email - 電子郵件
 * @returns {boolean} 是否存在
 */
function checkUserExists(username, email) {
    // 從本地存儲檢查所有用戶
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    
    for (const userId in allUsers) {
        const user = allUsers[userId];
        if (user.username === username || user.email === email) {
            return true;
        }
    }
    
    return false;
}

/**
 * 保存新用戶
 * @param {Object} user - 用戶資料
 * @param {string} hashedPassword - 加密後的密碼
 */
function saveNewUser(user, hashedPassword) {
    // 從本地存儲獲取所有用戶
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    const allPasswords = JSON.parse(localStorage.getItem('userPasswords') || '{}');
    
    // 添加新用戶
    allUsers[user.userId] = user;
    allPasswords[user.userId] = hashedPassword;
    
    // 保存回本地存儲
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    localStorage.setItem('userPasswords', JSON.stringify(allPasswords));
}

/**
 * 通過用戶名或電子郵件獲取用戶
 * @param {string} usernameOrEmail - 用戶名或電子郵件
 * @returns {Object|null} 用戶資料
 */
function getUserByUsernameOrEmail(usernameOrEmail) {
    // 從本地存儲獲取所有用戶
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
    
    for (const userId in allUsers) {
        const user = allUsers[userId];
        if (user.username === usernameOrEmail || user.email === usernameOrEmail) {
            return user;
        }
    }
    
    return null;
}

/**
 * 獲取用戶密碼
 * @param {string} userId - 用戶ID
 * @returns {string|null} 加密後的密碼
 */
function getUserPassword(userId) {
    // 從本地存儲獲取所有密碼
    const allPasswords = JSON.parse(localStorage.getItem('userPasswords') || '{}');
    return allPasswords[userId] || null;
}

/**
 * 生成用戶ID
 * @returns {string} 用戶ID
 */
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * 生成令牌
 * @returns {string} 令牌
 */
function generateToken() {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 16);
}

/**
 * 模擬密碼加密
 * @param {string} password - 原始密碼
 * @returns {Promise<string>} 加密後的密碼
 */
async function simulatePasswordHash(password) {
    // 實際應用中應使用適當的加密方法，如bcrypt
    // 這裡僅為演示，不要在實際產品中使用
    return 'hashed_' + password + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * 驗證密碼
 * @param {string} password - 輸入的密碼
 * @param {string} hashedPassword - 存儲的加密密碼
 * @returns {Promise<boolean>} 是否有效
 */
async function verifyPassword(password, hashedPassword) {
    // 實際應用中應使用適當的密碼比對方法
    // 這裡僅為演示，不要在實際產品中使用
    if (!hashedPassword) return false;
    
    // 模擬檢查密碼（非常不安全，僅用於演示）
    return hashedPassword.startsWith('hashed_' + password);
}

/**
 * 模擬發送驗證郵件
 * @param {string} email - 電子郵件
 * @param {string} token - 驗證令牌
 */
function sendVerificationEmail(email, token) {
    console.log(`模擬發送驗證郵件到 ${email}，令牌: ${token}`);
    // 實際應用中應調用郵件服務API
}

/**
 * 重設用戶獎勵系統數據
 * 在用戶登出時調用
 */
function resetUserRewards() {
    // 如果獎勵系統已加載，重設獎勵資料
    if (window.resetRewardsSystem) {
        window.resetRewardsSystem();
    }
}

/**
 * 獲取當前用戶資料
 * @returns {Object|null} 用戶資料
 */
function getCurrentUser() {
    return currentUser;
}

/**
 * 更新用戶資料
 * @param {Object} updatedData - 更新的資料
 * @returns {Object} 結果
 */
function updateUserProfile(updatedData) {
    if (!currentUser) {
        return { success: false, message: '未登入' };
    }
    
    try {
        // 更新可編輯的欄位
        if (updatedData.nickname) currentUser.nickname = updatedData.nickname;
        if (updatedData.avatar) currentUser.avatar = updatedData.avatar;
        
        // 更新個人資料
        if (updatedData.profile) {
            Object.assign(currentUser.profile, updatedData.profile);
        }
        
        // 更新設定
        if (updatedData.settings) {
            Object.assign(currentUser.settings, updatedData.settings);
        }
        
        // 保存更新後的用戶資料
        saveUserToStorage();
        
        // 在本地用戶數據庫中更新
        const allUsers = JSON.parse(localStorage.getItem('allUsers') || '{}');
        if (allUsers[currentUser.userId]) {
            allUsers[currentUser.userId] = currentUser;
            localStorage.setItem('allUsers', JSON.stringify(allUsers));
        }
        
        return { success: true, message: '資料已更新', user: currentUser };
    } catch (error) {
        console.error('更新用戶資料時出錯:', error);
        return { success: false, message: '更新資料時發生錯誤' };
    }
}

// 導出模組函數
window.userSystem = {
    init: initUserSystem,
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
    isLoggedIn,
    getCurrentUser,
    updateProfile: updateUserProfile
};

// 自動初始化用戶系統
document.addEventListener('DOMContentLoaded', initUserSystem); 