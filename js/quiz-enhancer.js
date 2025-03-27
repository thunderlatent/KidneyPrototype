// 增強錯誤答案顯示效果
document.addEventListener('DOMContentLoaded', function() {
    // 添加自定義樣式
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        .option-item.incorrect {
            border-width: 3px !important;
            animation: shake 0.5s ease-in-out;
        }
        
        .option-icon.incorrect-icon {
            font-size: 28px !important;
            font-weight: bold !important;
            text-shadow: 0 0 5px rgba(255,255,255,0.8) !important;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(styleEl);
}); 