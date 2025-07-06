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

// グローバルに公開
window.currentFilter = currentFilter;
window.customCommands = customCommands;
window.recentCommands = recentCommands;
window.currentModalCommand = currentModalCommand;

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    loadStoredData();
    renderCommands();
    setupEventListeners();
    renderCustomCommands();
    renderRecentCommands();
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

// 最終更新日を取得して表示する
document.addEventListener("DOMContentLoaded", () => {
    const lastUpdated = document.lastModified;
    const lastUpdatedElement = document.getElementById("lastUpdated");

    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = `最終更新日: ${new Date(lastUpdated).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`;
    }
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('エラーが発生しました:', e.error);
    if (window.showNotification) {
        window.showNotification('エラーが発生しました', 'error');
    }
});
