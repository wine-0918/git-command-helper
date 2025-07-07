// contact.html専用JavaScript

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    // 言語システム初期化
    initializeLanguage();
    
    // ダークモード初期化
    initializeDarkMode();
    
    // 戻るボタンのイベントリスナー
    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = '../index.html';
    });
    
    // 最終更新日の設定
    updateLastModified();
});

// ダークモード機能
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        localStorage.setItem('darkMode', isDark);
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// 最終更新日の設定
function updateLastModified() {
    const lang = getCurrentLanguageData();
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = lang.last_updated + '2025年7月8日';
    }
}

// グローバル関数として公開
window.updateLastModified = updateLastModified;
