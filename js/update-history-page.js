// update-history.html専用JavaScript

// ページ初期化
document.addEventListener('DOMContentLoaded', function() {
    // 言語とダークモードの初期化
    initializeLanguage();
    initializeDarkMode();
    
    // 背景アニメーション初期化
    if (typeof initBackground === 'function') {
        initBackground();
    }
    
    // 詳細な更新履歴の表示
    if (typeof renderFullUpdateHistory === 'function') {
        renderFullUpdateHistory();
    }
    
    // 戻るボタンのイベントリスナー
    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = '../index.html';
    });
    
    // ダークモードトグル
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    
    // 言語切り替え
    document.getElementById('languageToggle').addEventListener('click', switchLanguage);
    
    // 最終更新日の設定
    updateLastModified();
});

// 言語切り替え関数
function switchLanguage() {
    const currentLang = localStorage.getItem('language') || 'ja';
    const languages = ['ja', 'en', 'zh'];
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLang = languages[nextIndex];
    
    localStorage.setItem('language', nextLang);
    
    // 現在の言語を更新
    window.currentLanguage = nextLang;
    
    // UI更新
    if (typeof updateUI === 'function') {
        updateUI();
    }
    
    // 現在の言語表示を更新
    const languageNames = { ja: '日本語', en: 'English', zh: '中文' };
    document.getElementById('currentLang').textContent = languageNames[nextLang];
    
    // 更新履歴を再レンダリング
    if (typeof renderFullUpdateHistory === 'function') {
        renderFullUpdateHistory();
    }
    
    // 最終更新日を更新
    updateLastModified();
}

// ダークモード切り替え関数
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    const icon = document.querySelector('#darkModeToggle i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// ダークモード初期化
function initializeDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#darkModeToggle i');
        icon.className = 'fas fa-sun';
    }
}

// 最終更新日の設定
function updateLastModified() {
    const currentLang = window.currentLanguage || localStorage.getItem('language') || 'ja';
    const langData = {
        ja: { last_updated: '最終更新日: ' },
        en: { last_updated: 'Last updated: ' },
        zh: { last_updated: '最后更新: ' }
    };
    
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = langData[currentLang].last_updated + '2025年7月8日';
    }
}

// グローバル関数として公開
window.updateLastModified = updateLastModified;
