/**
 * 簡單的實時重新載入腳本
 * 用於在開發時自動刷新頁面
 */
(function() {
    // 檢查間隔（毫秒）
    const CHECK_INTERVAL = 2000;
    
    // 上次文件修改時間
    let lastModified = {};
    
    // 要檢查的文件列表
    const filesToCheck = [
        'index.html',
        'css/styles.css',
        'css/additional-styles.css',
        'css/launch-screen.css',
        'js/app.js'
    ];
    
    // 初始化獲取文件的最後修改時間
    async function initLastModified() {
        for (const file of filesToCheck) {
            try {
                const response = await fetch(file, { method: 'HEAD' });
                const lastMod = response.headers.get('Last-Modified');
                if (lastMod) {
                    lastModified[file] = lastMod;
                }
            } catch (error) {
                console.warn(`無法檢查文件 ${file}:`, error);
            }
        }
    }
    
    // 檢查文件是否已更改
    async function checkForChanges() {
        let hasChanges = false;
        
        for (const file of filesToCheck) {
            try {
                const response = await fetch(file, { method: 'HEAD', cache: 'no-store' });
                const currentLastMod = response.headers.get('Last-Modified');
                
                if (currentLastMod && lastModified[file] && currentLastMod !== lastModified[file]) {
                    console.log(`檢測到文件更改: ${file}`);
                    hasChanges = true;
                    lastModified[file] = currentLastMod;
                }
            } catch (error) {
                console.warn(`無法檢查文件 ${file}:`, error);
            }
        }
        
        if (hasChanges) {
            console.log('頁面將重新加載...');
            location.reload();
        }
    }
    
    // 初始化
    initLastModified().then(() => {
        console.log('實時重新載入已啟動');
        // 定期檢查更改
        setInterval(checkForChanges, CHECK_INTERVAL);
    });
})(); 