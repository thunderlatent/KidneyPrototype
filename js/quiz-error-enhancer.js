/**
 * 錯誤答案顯示增強器
 * 這個腳本增強測驗頁面的錯誤答案顯示效果
 */
(function() {
    // 添加自定義 CSS 樣式
    function addCustomStyles() {
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
                position: relative;
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
            
            /* 增強解釋卡片樣式 */
            .explanation-card.incorrect {
                background-color: rgba(255, 59, 48, 0.1) !important;
                border-left: 5px solid #FF3B30 !important;
            }
            
            .explanation-card.incorrect .explanation-title {
                color: #FF3B30 !important;
                font-weight: 700 !important;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // 增強原始的 selectOption 函數
    function enhanceSelectOptionFunction() {
        // 儲存原始函數的引用
        const originalSelectOption = window.selectOption;
        
        // 替換為增強版本
        window.selectOption = function(optionIndex) {
            // 調用原始函數
            originalSelectOption(optionIndex);
            
            // 獲取當前問題和選項
            setTimeout(() => {
                const options = document.querySelectorAll('.option-item');
                const selectedOption = options[optionIndex];
                
                // 確認選項已被標記為不正確
                if (selectedOption && selectedOption.classList.contains('incorrect')) {
                    // 查找錯誤圖標
                    const incorrectIcon = selectedOption.querySelector('.incorrect-icon');
                    if (incorrectIcon) {
                        // 增強圖標的顯示效果
                        incorrectIcon.style.fontSize = '28px';
                        incorrectIcon.style.color = '#FF3B30';
                        incorrectIcon.style.textShadow = '0px 0px 5px rgba(255, 255, 255, 0.8)';
                    }
                }
            }, 100);
        };
    }
    
    // 當 DOM 載入完成時執行
    document.addEventListener('DOMContentLoaded', function() {
        // 添加自定義樣式
        addCustomStyles();
        
        // 增強選項函數如果存在
        if (typeof window.selectOption === 'function') {
            enhanceSelectOptionFunction();
        } else {
            // 如果函數還沒有定義，等待一下再試
            setTimeout(function() {
                if (typeof window.selectOption === 'function') {
                    enhanceSelectOptionFunction();
                }
            }, 500);
        }
    });
})(); 