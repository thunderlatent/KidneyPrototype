/**
 * 生活品質類別擴充題庫
 * 擴充公眾版題庫中的生活品質類別
 */

const expandedQualityOfLifeQuestions = [
    {
        question: "透析病人如何維持良好的工作生活平衡？",
        options: [
            "完全停止工作，專注於透析治療",
            "根據透析時間調整工作安排，與雇主溝通彈性工作方式",
            "選擇夜班工作以配合透析時間",
            "減少睡眠時間以增加工作時間"
        ],
        correctAnswer: 1,
        explanation: "透析病人應該根據透析時間調整工作安排，並與雇主溝通彈性工作方式，這是維持工作生活平衡的最佳方法。透析治療確實會影響工作時間，但透過適當的安排和溝通，許多透析病人仍能維持工作。具體建議包括：與雇主討論工作時間的彈性安排（如調整上下班時間、遠距工作、部分工時等）；選擇適合的透析方式（如腹膜透析可能提供更多工作時間彈性）；提前規劃透析時間，避免影響重要工作會議；建立良好的時間管理習慣；保持與同事的溝通，讓他們了解透析需求；注意工作壓力管理，避免過度疲勞。完全停止工作可能影響經濟來源和社交生活；夜班工作可能影響睡眠品質和整體健康；減少睡眠時間會影響身體恢復和免疫功能。透析病人應了解自己的權益（如身心障礙者權益保障法），在需要時尋求職場支持。",
        difficulty: "中等",
        category: "生活品質",
        clinicalScenario: "陳先生剛開始透析治療，擔心透析會影響他的工作，詢問如何維持工作生活平衡。",
        points: 10
    },
    {
        question: "透析病人如何維持良好的社交生活？",
        options: [
            "避免社交活動，專注於透析治療",
            "主動參與透析中心活動，與其他病友交流經驗",
            "隱瞞透析事實，維持正常社交",
            "只在透析中心活動，不參與其他社交場合"
        ],
        correctAnswer: 1,
        explanation: "主動參與透析中心活動，與其他病友交流經驗是維持良好社交生活的有效方法。透析病人面臨多重挑戰，包括治療時間限制、身體狀況變化、情緒壓力等，但良好的社交支持對生活品質至關重要。具體建議包括：參與透析中心舉辦的活動和病友團體；與其他透析病人分享經驗和心得；保持與親友的聯繫，讓他們了解透析需求；利用社群媒體或線上平台與病友交流；參與社區活動，但需注意時間安排和體力負荷；培養新的興趣愛好，擴展社交圈。完全避免社交活動可能導致孤立和憂鬱；隱瞞透析事實可能增加心理負擔；只在透析中心活動可能限制社交圈。透析中心通常提供多種支持服務（如社工諮詢、心理輔導、營養指導等），病人應善加利用。",
        difficulty: "中等",
        category: "生活品質",
        clinicalScenario: "李女士透析三個月，感覺社交生活受到影響，想了解如何維持社交活動。",
        points: 10
    },
    {
        question: "透析病人如何維持良好的睡眠品質？",
        options: [
            "服用安眠藥改善睡眠",
            "建立規律的作息時間，避免睡前過度活動",
            "增加白天睡眠時間以補充夜間睡眠不足",
            "睡前大量運動以促進疲勞"
        ],
        correctAnswer: 1,
        explanation: "建立規律的作息時間，避免睡前過度活動是改善睡眠品質的正確方法。透析病人常見睡眠問題包括：失眠、睡眠中斷、不寧腿症候群、睡眠呼吸中止等。改善睡眠的具體建議包括：建立固定的作息時間表；創造適合睡眠的環境（安靜、黑暗、適當溫度）；避免睡前使用電子產品；限制咖啡因攝入；進行放鬆活動（如深呼吸、冥想）；適當運動但避免睡前劇烈運動；控制液體攝入，避免夜間頻尿；與醫療團隊討論可能的睡眠障礙原因（如貧血、副甲狀腺功能亢進等）。安眠藥可能導致依賴和副作用；增加白天睡眠可能影響夜間睡眠；睡前運動可能反而影響入睡。良好的睡眠對透析病人的整體健康和情緒穩定都很重要。",
        difficulty: "中等",
        category: "生活品質",
        clinicalScenario: "王先生透析後經常失眠，詢問如何改善睡眠品質。",
        points: 10
    },
    {
        question: "透析病人如何維持良好的運動習慣？",
        options: [
            "避免運動，以免影響透析治療",
            "根據體力狀況選擇適合的運動，循序漸進",
            "每天進行劇烈運動以增強體力",
            "只在透析中心進行運動"
        ],
        correctAnswer: 1,
        explanation: "根據體力狀況選擇適合的運動，循序漸進是維持良好運動習慣的正確方法。適當的運動對透析病人有多重好處：改善心肺功能、增強肌肉力量、提高生活品質、改善情緒、控制體重等。運動建議包括：選擇低衝擊運動（如步行、游泳、太極拳）；從短時間、低強度開始，逐漸增加；注意透析日和非透析日的運動安排；避免在瘻管手臂進行負重運動；監測運動時的身體狀況（如血壓、心跳）；保持充足水分；在適當環境下運動（避免極端天氣）。完全避免運動會導致體能下降；劇烈運動可能增加心臟負擔；只在透析中心運動可能限制運動選擇。透析病人應與醫療團隊討論適合的運動計劃，並定期評估運動效果。",
        difficulty: "中等",
        category: "生活品質",
        clinicalScenario: "張先生想開始運動，但擔心透析會影響運動能力，詢問如何安全地開始運動。",
        points: 10
    },
    {
        question: "透析病人如何維持良好的情緒狀態？",
        options: [
            "忽略負面情緒，專注於治療",
            "認識並接納情緒變化，必要時尋求專業協助",
            "服用抗憂鬱藥物改善情緒",
            "增加透析頻率以改善情緒"
        ],
        correctAnswer: 1,
        explanation: "認識並接納情緒變化，必要時尋求專業協助是維持良好情緒狀態的正確方法。透析病人面臨多重壓力源：慢性疾病、治療負擔、生活改變、社交限制等，情緒波動是常見現象。情緒管理策略包括：了解情緒變化的正常性；學習識別和表達情緒；建立支持系統（家人、朋友、病友團體）；參與放鬆活動（如冥想、深呼吸）；保持規律作息和健康生活習慣；與醫療團隊討論情緒困擾；必要時尋求心理諮商或精神科協助。忽略負面情緒可能導致情緒積壓；抗憂鬱藥物應在專業評估後使用；增加透析頻率不是改善情緒的適當方法。透析中心通常提供心理支持服務，病人應善加利用。良好的情緒管理對提高生活品質和治療依從性都很重要。",
        difficulty: "中等",
        category: "生活品質",
        clinicalScenario: "陳女士透析後經常感到焦慮和沮喪，詢問如何改善情緒狀態。",
        points: 10
    },
    {
        question: "透析病人如何維持良好的性生活？",
        options: [
            "避免性生活，以免影響透析治療",
            "與伴侶溝通，根據體力狀況調整性生活",
            "服用壯陽藥物改善性功能",
            "增加透析頻率以改善性功能"
        ],
        correctAnswer: 1,
        explanation: "與伴侶溝通，根據體力狀況調整性生活是維持良好性生活的正確方法。透析病人可能面臨多種性功能問題：性慾降低、勃起功能障礙、月經不規則等，這些可能與疾病本身、治療副作用、心理因素有關。改善性生活的建議包括：與伴侶開放溝通，互相理解和支持；選擇適當的時機（如透析後體力較好時）；注意體位選擇，避免壓迫瘻管；保持規律運動和健康生活習慣；與醫療團隊討論性功能問題；考慮諮詢性治療師。完全避免性生活可能影響親密關係；壯陽藥物應在專業評估後使用；增加透析頻率不是改善性功能的適當方法。性健康是生活品質的重要組成部分，透析病人不應忽視這方面的需求。",
        difficulty: "困難",
        category: "生活品質",
        clinicalScenario: "李先生透析後性功能下降，與伴侶關係受到影響，詢問如何改善性生活。",
        points: 15
    },
    {
        question: "透析病人如何維持良好的旅遊生活？",
        options: [
            "避免旅遊，專注於透析治療",
            "提前規劃，與醫療團隊討論旅遊安排",
            "選擇短程旅遊，避免長途旅行",
            "只在透析中心附近活動"
        ],
        correctAnswer: 1,
        explanation: "提前規劃，與醫療團隊討論旅遊安排是維持良好旅遊生活的正確方法。透析病人確實可以旅遊，但需要適當的規劃和準備。旅遊建議包括：提前與醫療團隊討論旅遊計劃；安排透析治療（可選擇旅遊目的地的透析中心或使用可攜式透析設備）；準備完整的醫療記錄和處方箋；攜帶足夠的藥物和醫療用品；注意飲食和水分控制；選擇適合的旅遊目的地和行程；購買適當的旅遊保險；準備緊急聯絡資訊。完全避免旅遊可能限制生活體驗；短程旅遊雖較容易安排，但不應完全排除長途旅行；只在透析中心附近活動可能過度限制生活。透析病人應了解自己的權益，許多透析中心提供旅遊諮詢服務，協助病人規劃安全的旅遊。",
        difficulty: "中等",
        category: "生活品質",
        clinicalScenario: "王女士想與家人出國旅遊，但擔心透析治療會影響行程，詢問如何規劃旅遊。",
        points: 10
    }
];

// 匯出擴充題庫供使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = expandedQualityOfLifeQuestions;
} 