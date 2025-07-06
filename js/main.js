// Git Command Helper メイン機能

// グローバル変数
let currentFilter = 'all';
let customCommands = [];
let recentCommands = [];

// DOM要素
let searchInput, commandsGrid, filterButtons, customCommandInput, customDescriptionInput;
let addCustomCommandBtn, customCommandsList, recentCommandsContainer;
let modal, modalClose, modalCancel, modalCopy, paramInput, commandPreview;
let notification, notificationText;

// 現在のモーダル用データ
let currentModalCommand = null;

// 最終更新日を取得して表示する
function updateLastModified() {
    const lastUpdatedElement = document.getElementById("lastUpdated");
    if (lastUpdatedElement) {
        const langData = getCurrentLanguageData && getCurrentLanguageData();
        const today = new Date();
        let locale = 'ja-JP';
        
        if (window.currentLanguage === 'en') {
            locale = 'en-US';
        } else if (window.currentLanguage === 'zh') {
            locale = 'zh-CN';
        }
        
        const formattedDate = today.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const prefix = langData ? langData.last_updated : '最終更新日: ';
        lastUpdatedElement.textContent = `${prefix}${formattedDate}`;
    }
}

// ダークモード切り替え機能
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    // 初期状態の設定
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }
    
    // ダークモード切り替えボタンのイベントリスナー
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        // ライトモードに切り替え
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        updateDarkModeIcon(false);
    } else {
        // ダークモードに切り替え
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        updateDarkModeIcon(true);
    }
}

function updateDarkModeIcon(isDarkMode) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
            if (isDarkMode) {
                icon.className = 'fas fa-sun'; // ダークモード時は太陽アイコン
            } else {
                icon.className = 'fas fa-moon'; // ライトモード時は月アイコン
            }
        }
    }
}

// グローバルに公開
window.currentFilter = currentFilter;
window.customCommands = customCommands;
window.recentCommands = recentCommands;
window.currentModalCommand = currentModalCommand;
window.updateLastModified = updateLastModified;
window.initializeDarkMode = initializeDarkMode;
window.toggleDarkMode = toggleDarkMode;
window.updateDarkModeIcon = updateDarkModeIcon;

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    loadStoredData();
    
    // 言語システムの初期化
    if (window.initializeLanguage) {
        initializeLanguage();
    }
    
    // ダークモードの初期化
    initializeDarkMode();
    
    renderCommands();
    setupEventListeners();
    renderCustomCommands();
    renderRecentCommands();
    
    // 最終更新日を設定
    updateLastModified();
});

// DOM要素を取得
function initializeElements() {
    searchInput = document.getElementById('searchInput');
    commandsGrid = document.getElementById('commandsGrid');
    filterButtons = document.querySelectorAll('.filter-btn');
    customCommandInput = document.getElementById('customCommand');
    customDescriptionInput = document.getElementById('customDescription');
    addCustomCommandBtn = document.getElementById('addCustomCommand');
    customCommandsList = document.getElementById('customCommandsList');
    recentCommandsContainer = document.getElementById('recentCommands');
    modal = document.getElementById('modalOverlay');
    modalClose = document.getElementById('modalClose');
    modalCancel = document.getElementById('modalCancel');
    modalCopy = document.getElementById('modalCopy');
    paramInput = document.getElementById('paramInput');
    commandPreview = document.getElementById('commandPreview');
    notification = document.getElementById('notification');
    notificationText = document.getElementById('notificationText');
}

// ローカルストレージからデータを読み込み
function loadStoredData() {
    const storedCustomCommands = localStorage.getItem('gitHelperCustomCommands');
    const storedRecentCommands = localStorage.getItem('gitHelperRecentCommands');
    
    if (storedCustomCommands) {
        customCommands = JSON.parse(storedCustomCommands);
    }
    
    if (storedRecentCommands) {
        recentCommands = JSON.parse(storedRecentCommands);
    }
}

// データをローカルストレージに保存
function saveData() {
    localStorage.setItem('gitHelperCustomCommands', JSON.stringify(customCommands));
    localStorage.setItem('gitHelperRecentCommands', JSON.stringify(recentCommands));
}

// イベントリスナーの設定
function setupEventListeners() {
    // 検索機能
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // フィルターボタン
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    
    // カスタムコマンド追加
    if (addCustomCommandBtn) {
        addCustomCommandBtn.addEventListener('click', addCustomCommand);
    }
    
    // Enterキーでカスタムコマンド追加
    if (customCommandInput) {
        customCommandInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addCustomCommand();
            }
        });
    }
    
    if (customDescriptionInput) {
        customDescriptionInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addCustomCommand();
            }
        });
    }
    
    // モーダル関連
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalCancel) modalCancel.addEventListener('click', closeModal);
    if (modalCopy) modalCopy.addEventListener('click', copyFromModal);
    
    // モーダル外クリックで閉じる
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // パラメータ入力でリアルタイム更新
    if (paramInput) {
        paramInput.addEventListener('input', updateCommandPreview);
    }
    
    // Escキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 検索処理
function handleSearch() {
    renderCommands();
}

// フィルター変更処理
function handleFilterChange(e) {
    // 全てのフィルターボタンからactiveクラスを削除
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // クリックされたボタンにactiveクラスを追加
    e.target.classList.add('active');
    
    // 現在のフィルターを更新
    currentFilter = e.target.dataset.category;
    
    // コマンドを再表示
    renderCommands();
}

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('エラーが発生しました:', e.error);
    if (window.showNotification) {
        window.showNotification('エラーが発生しました', 'error');
    }
});
