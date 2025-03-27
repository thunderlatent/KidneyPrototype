/**
 * 增強測驗頁面的錯誤答案顯示效果
 */

// 等待頁面載入完成
document.addEventListener('DOMContentLoaded', function() {
    // 添加自定義樣式
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* 增強錯誤選項的視覺效果 */
        .option-item.incorrect {
            border-color: #FF3B30 !important;
            background-color: rgba(255, 59, 48, 0.15) !important;
            border-width: 3px !important;
            animation: shake 0.5s ease-in-out;
        }
        
        .option-icon.incorrect-icon {
            color: #FF3B30 !important;
            font-size: 28px !important; 
            font-weight: bold !important;
            text-shadow: 0px 0px 3px rgba(255, 255, 255, 0.7) !important;
            animation: pulseError 0.5s ease-in-out;
        }
        
        @keyframes pulseError {
            0%, 100% { transform: translateY(-50%) scale(1); }
            50% { transform: translateY(-50%) scale(1.2); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        /* 自定義叉號圖標 */
        .custom-x-icon {
            position: relative;
            display: inline-flex;
            width: 24px;
            height: 24px;
            align-items: center;
            justify-content: center;
            margin-left: 6px;
        }
        
        .custom-x-icon::before,
        .custom-x-icon::after {
            content: '';
            position: absolute;
            width: 3px;
            height: 18px;
            background-color: #FF3B30;
            border-radius: 2px;
        }
        
        .custom-x-icon::before {
            transform: rotate(45deg);
        }
        
        .custom-x-icon::after {
            transform: rotate(-45deg);
        }
    `;
    document.head.appendChild(styleElement);
    
    // 定義一個函數來增強選項選擇功能
    function enhanceOptionSelection() {
        // 保存原始函數引用
        const originalSelectOption = window.selectOption;
        
        if (typeof originalSelectOption === 'function') {
            // 重新定義選項選擇函數
            window.selectOption = function(optionIndex) {
                // 先執行原始函數
                originalSelectOption.call(window, optionIndex);
                
                // 然後應用我們的增強效果
                setTimeout(function() {
                    // 獲取所有選項元素
                    const options = document.querySelectorAll('.option-item');
                    
                    // 檢查每個帶有錯誤類別的選項
                    options.forEach(option => {
                        if (option.classList.contains('incorrect')) {
                            // 獲取錯誤圖標
                            const iconElement = option.querySelector('.incorrect-icon');
                            
                            if (iconElement) {
                                // 確保應用增強樣式
                                iconElement.style.fontSize = '28px';
                                iconElement.style.color = '#FF3B30';
                                iconElement.style.textShadow = '0px 0px 5px rgba(255, 255, 255, 0.8)';
                                
                                // 添加自定義叉號
                                if (!iconElement.querySelector('.custom-x-icon')) {
                                    const customX = document.createElement('span');
                                    customX.className = 'custom-x-icon';
                                    iconElement.appendChild(customX);
                                }
                            }
                        }
                    });
                }, 50); // 短暫延遲確保 DOM 已更新
            };
        }
    }
    
    // 嘗試立即增強，如果函數尚未定義，則設置觀察器
    if (typeof window.selectOption === 'function') {
        enhanceOptionSelection();
    } else {
        // 創建觀察器等待函數定義
        const checkInterval = setInterval(function() {
            if (typeof window.selectOption === 'function') {
                enhanceOptionSelection();
                clearInterval(checkInterval);
            }
        }, 100);
        
        // 確保不會無限等待
        setTimeout(function() {
            clearInterval(checkInterval);
        }, 5000);
    }
}); 