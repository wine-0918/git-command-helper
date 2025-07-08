// contact.html専用JavaScript

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    // 言語システム初期化
    if (typeof initializeLanguage === 'function') {
        initializeLanguage();
    }
    
    // ダークモード初期化
    initializeDarkMode();
    
    // 戻るボタンのイベントリスナー
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = '../index.html';
        });
    }
    
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
        
        if (isDark) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// 言語切り替え機能
function initializeLanguage() {
    const languageToggle = document.getElementById('languageToggle');
    
    if (languageToggle && typeof updateLanguage === 'function') {
        languageToggle.addEventListener('click', function() {
            // 現在の言語を取得して次の言語に切り替え
            const currentLang = localStorage.getItem('language') || 'ja';
            const languages = ['ja', 'en', 'zh'];
            const currentIndex = languages.indexOf(currentLang);
            const nextIndex = (currentIndex + 1) % languages.length;
            const nextLang = languages[nextIndex];
            
            localStorage.setItem('language', nextLang);
            updateLanguage(nextLang);
        });
        
        // 初期言語設定
        const savedLang = localStorage.getItem('language') || 'ja';
        updateLanguage(savedLang);
    }
}

// 最終更新日設定
function updateLastModified() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
        lastUpdatedElement.textContent = `最終更新日: ${formattedDate}`;
    }
}