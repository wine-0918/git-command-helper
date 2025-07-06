// HTMLエスケープ関数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Git Command Helper JavaScript

// コマンドデータ
const gitCommands = [
    // ブランチ操作
    {
        title: "新しいブランチを作成して切り替え",
        command: "git checkout -b {branch_name}",
        description: "新しいブランチを作成して、そのブランチに切り替えます",
        category: "branch",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        title: "ブランチを強制的に切り替え",
        command: "git checkout -f {branch_name}",
        description: "未コミットの変更を破棄してブランチを切り替えます",
        category: "branch",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        title: "リモートブランチを追跡してチェックアウト",
        command: "git checkout -t origin/{branch_name}",
        description: "リモートブランチを追跡してローカルにチェックアウトします",
        category: "branch",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        title: "ブランチを削除",
        command: "git branch -d {branch_name}",
        description: "マージ済みのブランチを削除します",
        category: "branch",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        title: "ブランチを強制削除",
        command: "git branch -D {branch_name}",
        description: "未マージのブランチを強制的に削除します",
        category: "branch",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        title: "全ブランチを表示",
        command: "git branch -a",
        description: "ローカルとリモートの全ブランチを表示します",
        category: "branch",
        hasParams: false
    },

    // コミット操作
    {
        title: "全ての変更をコミット",
        command: "git commit -am \"{message}\"",
        description: "全ての変更をステージングしてコミットします",
        category: "commit",
        hasParams: true,
        paramLabel: "コミットメッセージ"
    },
    {
        title: "直前のコミットメッセージを修正",
        command: "git commit --amend -m \"{message}\"",
        description: "直前のコミットメッセージを修正します",
        category: "commit",
        hasParams: true,
        paramLabel: "新しいメッセージ"
    },
    {
        title: "直前のコミットを修正（ファイル追加）",
        command: "git commit --amend --no-edit",
        description: "メッセージを変更せずに直前のコミットにファイルを追加します",
        category: "commit",
        hasParams: false
    },
    {
        title: "空のコミットを作成",
        command: "git commit --allow-empty -m \"{message}\"",
        description: "変更がなくても空のコミットを作成します",
        category: "commit",
        hasParams: true,
        paramLabel: "コミットメッセージ"
    },

    // リセット操作
    {
        title: "直前のコミットを取り消し（変更保持）",
        command: "git reset --soft HEAD~1",
        description: "直前のコミットを取り消し、変更はステージングエリアに残します",
        category: "reset",
        hasParams: false
    },
    {
        title: "直前のコミットを取り消し（変更破棄）",
        command: "git reset --hard HEAD~1",
        description: "直前のコミットを取り消し、変更も破棄します",
        category: "reset",
        hasParams: false
    },
    {
        title: "特定のコミットまでリセット",
        command: "git reset --hard {commit_hash}",
        description: "指定したコミットまでリセットし、それ以降の変更を破棄します",
        category: "reset",
        hasParams: true,
        paramLabel: "コミットハッシュ"
    },
    {
        title: "ステージングエリアをリセット",
        command: "git reset HEAD .",
        description: "ステージングエリアの全ての変更を取り消します",
        category: "reset",
        hasParams: false
    },

    // リモート操作
    {
        title: "強制プッシュ",
        command: "git push -f origin {branch_name}",
        description: "リモートブランチを強制的に上書きします（危険）",
        category: "remote",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        title: "安全な強制プッシュ",
        command: "git push --force-with-lease origin {branch_name}",
        description: "他の人の変更を確認してから強制プッシュします",
        category: "remote",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        title: "リモートブランチを削除",
        command: "git push origin --delete {branch_name}",
        description: "リモートのブランチを削除します",
        category: "remote",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        title: "リモート情報を取得",
        command: "git fetch --all --prune",
        description: "全てのリモート情報を取得し、削除されたブランチを整理します",
        category: "remote",
        hasParams: false
    },

    // ログ操作
    {
        title: "グラフ付きログを表示",
        command: "git log --oneline --graph --all",
        description: "ブランチの分岐をグラフで表示します",
        category: "log",
        hasParams: false
    },
    {
        title: "特定のファイルの変更履歴",
        command: "git log --follow -- {file_path}",
        description: "特定のファイルの変更履歴を表示します",
        category: "log",
        hasParams: true,
        paramLabel: "ファイルパス"
    },
    {
        title: "最新のnコミットを表示",
        command: "git log -n {number} --oneline",
        description: "最新のn個のコミットを1行で表示します",
        category: "log",
        hasParams: true,
        paramLabel: "コミット数"
    },
    {
        title: "作者別のコミット数を表示",
        command: "git shortlog -sn",
        description: "作者別のコミット数を表示します",
        category: "log",
        hasParams: false
    },

    // スタッシュ操作
    {
        title: "変更をスタッシュ（メッセージ付き）",
        command: "git stash save \"{message}\"",
        description: "現在の変更をメッセージ付きでスタッシュに保存します",
        category: "stash",
        hasParams: true,
        paramLabel: "スタッシュメッセージ"
    },
    {
        title: "スタッシュを適用して削除",
        command: "git stash pop",
        description: "最新のスタッシュを適用して削除します",
        category: "stash",
        hasParams: false
    },
    {
        title: "特定のスタッシュを適用",
        command: "git stash apply stash@{{index}}",
        description: "指定したインデックスのスタッシュを適用します",
        category: "stash",
        hasParams: true,
        paramLabel: "スタッシュインデックス"
    },
    {
        title: "全てのスタッシュを削除",
        command: "git stash clear",
        description: "全てのスタッシュを削除します",
        category: "stash",
        hasParams: false
    }
];

// グローバル変数
let currentFilter = 'all';
let customCommands = [];
let recentCommands = [];

// DOM要素
const searchInput = document.getElementById('searchInput');
const commandsGrid = document.getElementById('commandsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const customCommandInput = document.getElementById('customCommand');
const customDescriptionInput = document.getElementById('customDescription');
const addCustomCommandBtn = document.getElementById('addCustomCommand');
const customCommandsList = document.getElementById('customCommandsList');
const recentCommandsContainer = document.getElementById('recentCommands');
const modal = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const modalCopy = document.getElementById('modalCopy');
const paramInput = document.getElementById('paramInput');
const commandPreview = document.getElementById('commandPreview');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// 現在のモーダル用データ
let currentModalCommand = null;

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    loadStoredData();
    renderCommands();
    setupEventListeners();
    renderCustomCommands();
    renderRecentCommands();
});

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
    searchInput.addEventListener('input', handleSearch);
    
    // フィルターボタン
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    
    // カスタムコマンド追加
    addCustomCommandBtn.addEventListener('click', addCustomCommand);
    
    // Enterキーでカスタムコマンド追加
    customCommandInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addCustomCommand();
        }
    });
    
    customDescriptionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addCustomCommand();
        }
    });
    
    // モーダル関連
    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    modalCopy.addEventListener('click', copyFromModal);
    
    // モーダル外クリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // パラメータ入力でリアルタイム更新
    paramInput.addEventListener('input', updateCommandPreview);
    
    // Escキーでモーダルを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// コマンドを表示
function renderCommands() {
    const filteredCommands = gitCommands.filter(cmd => {
        const matchesFilter = currentFilter === 'all' || cmd.category === currentFilter;
        const matchesSearch = !searchInput.value || 
            cmd.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            cmd.command.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            cmd.description.toLowerCase().includes(searchInput.value.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });
    
    commandsGrid.innerHTML = '';
    
    filteredCommands.forEach(cmd => {
        const commandCard = createCommandCard(cmd);
        commandsGrid.appendChild(commandCard);
    });
    
    if (filteredCommands.length === 0) {
        commandsGrid.innerHTML = '<div class="no-results">該当するコマンドが見つかりませんでした</div>';
    }
}

// コマンドカードを作成
function createCommandCard(cmd) {
    const card = document.createElement('div');
    card.className = 'command-card';
    
    const categoryColors = {
        'branch': '#28a745',
        'commit': '#17a2b8',
        'reset': '#dc3545',
        'remote': '#fd7e14',
        'log': '#6610f2',
        'stash': '#6f42c1'
    };
    
    card.innerHTML = `
        <div class="command-header">
            <div class="command-title">${escapeHtml(cmd.title)}</div>
            <div class="command-category" style="background-color: ${categoryColors[cmd.category] || '#667eea'}">
                ${getCategoryName(cmd.category)}
            </div>
        </div>
        <div class="command-code">${escapeHtml(cmd.command)}</div>
        <div class="command-description">${escapeHtml(cmd.description)}</div>
        <div class="command-actions">
            ${cmd.hasParams ? 
                `<button class="btn-param" data-title="${escapeHtml(cmd.title)}" data-command="${escapeHtml(cmd.command)}" data-param-label="${escapeHtml(cmd.paramLabel)}">
                    <i class="fas fa-edit"></i> パラメータ入力
                </button>` : 
                `<button class="btn-copy" data-command="${escapeHtml(cmd.command)}" data-title="${escapeHtml(cmd.title)}">
                    <i class="fas fa-copy"></i> コピー
                </button>`
            }
        </div>
    `;
    
    // イベントリスナーを追加
    const paramBtn = card.querySelector('.btn-param');
    const copyBtn = card.querySelector('.btn-copy');
    
    if (paramBtn) {
        paramBtn.addEventListener('click', function() {
            openModal(cmd.title, cmd.command, cmd.paramLabel);
        });
    }
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            copyCommand(cmd.command, cmd.title);
        });
    }
    
    return card;
}

// カテゴリ名を日本語に変換
function getCategoryName(category) {
    const categoryNames = {
        'branch': 'ブランチ',
        'commit': 'コミット',
        'reset': 'リセット',
        'remote': 'リモート',
        'log': 'ログ',
        'stash': 'スタッシュ'
    };
    return categoryNames[category] || category;
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

// コマンドをコピー
function copyCommand(command, title) {
    navigator.clipboard.writeText(command).then(() => {
        showNotification(`"${title}" をコピーしました！`);
        addToRecentCommands(command, title);
    }).catch(err => {
        console.error('コピーに失敗しました:', err);
        showNotification('コピーに失敗しました', 'error');
    });
}

// モーダルを開く
function openModal(title, command, paramLabel) {
    currentModalCommand = { title, command, paramLabel };
    
    document.querySelector('.modal h3').textContent = `${title} - パラメータ入力`;
    document.querySelector('.modal label[for="paramInput"]').textContent = `${paramLabel}を入力:`;
    
    paramInput.value = '';
    paramInput.placeholder = getPlaceholder(paramLabel);
    
    updateCommandPreview();
    
    modal.classList.add('active');
    paramInput.focus();
}

// プレースホルダーを取得
function getPlaceholder(paramLabel) {
    const placeholders = {
        'ブランチ名': 'main, feature/new-feature',
        'コミットメッセージ': 'fix: バグを修正',
        'コミットハッシュ': 'abc123',
        'ファイルパス': 'src/main.js',
        'コミット数': '10',
        'スタッシュメッセージ': 'WIP: 作業中の変更',
        'スタッシュインデックス': '0'
    };
    return placeholders[paramLabel] || '値を入力してください';
}

// コマンドプレビューを更新
function updateCommandPreview() {
    if (!currentModalCommand) return;
    
    const paramValue = paramInput.value || `{${currentModalCommand.paramLabel}}`;
    let previewCommand = currentModalCommand.command;
    
    // パラメータを置換
    previewCommand = previewCommand.replace(/\{[^}]+\}/g, paramValue);
    
    commandPreview.textContent = previewCommand;
}

// モーダルからコピー
function copyFromModal() {
    const paramValue = paramInput.value.trim();
    
    if (!paramValue) {
        showNotification('パラメータを入力してください', 'error');
        return;
    }
    
    let finalCommand = currentModalCommand.command;
    finalCommand = finalCommand.replace(/\{[^}]+\}/g, paramValue);
    
    navigator.clipboard.writeText(finalCommand).then(() => {
        showNotification(`"${currentModalCommand.title}" をコピーしました！`);
        addToRecentCommands(finalCommand, currentModalCommand.title);
        closeModal();
    }).catch(err => {
        console.error('コピーに失敗しました:', err);
        showNotification('コピーに失敗しました', 'error');
    });
}

// モーダルを閉じる
function closeModal() {
    modal.classList.remove('active');
    currentModalCommand = null;
}

// 通知を表示
function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    
    if (type === 'error') {
        notification.style.backgroundColor = '#dc3545';
        notification.querySelector('i').className = 'fas fa-exclamation-circle';
    } else {
        notification.style.backgroundColor = '#28a745';
        notification.querySelector('i').className = 'fas fa-check-circle';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 最近使用したコマンドに追加
function addToRecentCommands(command, title) {
    const now = new Date().toLocaleString('ja-JP');
    
    // 既存のコマンドがあれば削除
    recentCommands = recentCommands.filter(cmd => cmd.command !== command);
    
    // 新しいコマンドを先頭に追加
    recentCommands.unshift({
        command,
        title,
        timestamp: now
    });
    
    // 最大10件まで保持
    if (recentCommands.length > 10) {
        recentCommands = recentCommands.slice(0, 10);
    }
    
    saveData();
    renderRecentCommands();
}

// 最近使用したコマンドを表示
function renderRecentCommands() {
    if (recentCommands.length === 0) {
        recentCommandsContainer.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">まだコマンドを使用していません</p>';
        return;
    }
    
    recentCommandsContainer.innerHTML = '';
    
    recentCommands.forEach(cmd => {
        const item = document.createElement('div');
        item.className = 'recent-command-item';
        item.innerHTML = `
            <div class="recent-command-info">
                <div class="recent-command-code">${escapeHtml(cmd.command)}</div>
                <div class="recent-command-time">${escapeHtml(cmd.timestamp)}</div>
            </div>
            <button class="btn-copy" data-command="${escapeHtml(cmd.command)}" data-title="${escapeHtml(cmd.title)}">
                <i class="fas fa-copy"></i> コピー
            </button>
        `;
        
        // イベントリスナーを追加
        const copyBtn = item.querySelector('.btn-copy');
        copyBtn.addEventListener('click', function() {
            copyCommand(cmd.command, cmd.title);
        });
        
        recentCommandsContainer.appendChild(item);
    });
}

// カスタムコマンドを追加
function addCustomCommand() {
    const command = customCommandInput.value.trim();
    const description = customDescriptionInput.value.trim();
    
    if (!command) {
        showNotification('コマンドを入力してください', 'error');
        return;
    }
    
    if (!description) {
        showNotification('説明を入力してください', 'error');
        return;
    }
    
    // 重複チェック
    if (customCommands.some(cmd => cmd.command === command)) {
        showNotification('同じコマンドが既に登録されています', 'error');
        return;
    }
    
    const newCommand = {
        id: Date.now(),
        command,
        description,
        timestamp: new Date().toLocaleString('ja-JP')
    };
    
    customCommands.push(newCommand);
    saveData();
    
    customCommandInput.value = '';
    customDescriptionInput.value = '';
    
    showNotification('カスタムコマンドを追加しました！');
    renderCustomCommands();
}

// カスタムコマンドを表示
function renderCustomCommands() {
    if (customCommands.length === 0) {
        customCommandsList.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">カスタムコマンドはありません</p>';
        return;
    }
    
    customCommandsList.innerHTML = '';
    
    customCommands.forEach(cmd => {
        const item = document.createElement('div');
        item.className = 'custom-command-item';
        item.innerHTML = `
            <div class="custom-command-info">
                <div class="custom-command-code">${escapeHtml(cmd.command)}</div>
                <div class="custom-command-desc">${escapeHtml(cmd.description)}</div>
            </div>
            <div class="custom-command-actions">
                <button class="btn-copy" data-command="${escapeHtml(cmd.command)}" data-title="${escapeHtml(cmd.description)}">
                    <i class="fas fa-copy"></i> コピー
                </button>
                <button class="btn-delete" data-id="${cmd.id}">
                    <i class="fas fa-trash"></i> 削除
                </button>
            </div>
        `;
        
        // イベントリスナーを追加
        const copyBtn = item.querySelector('.btn-copy');
        const deleteBtn = item.querySelector('.btn-delete');
        
        copyBtn.addEventListener('click', function() {
            copyCommand(cmd.command, cmd.description);
        });
        
        deleteBtn.addEventListener('click', function() {
            deleteCustomCommand(cmd.id);
        });
        
        customCommandsList.appendChild(item);
    });
}

// カスタムコマンドを削除
function deleteCustomCommand(id) {
    if (confirm('このカスタムコマンドを削除しますか？')) {
        customCommands = customCommands.filter(cmd => cmd.id !== id);
        saveData();
        renderCustomCommands();
        showNotification('カスタムコマンドを削除しました');
    }
}

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('エラーが発生しました:', e.error);
    showNotification('エラーが発生しました', 'error');
});

// クリップボードAPIがサポートされていない場合のフォールバック
if (!navigator.clipboard) {
    // 古いブラウザ用のフォールバック関数
    function copyCommand(command, title) {
        const textArea = document.createElement('textarea');
        textArea.value = command;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification(`"${title}" をコピーしました！`);
            addToRecentCommands(command, title);
        } catch (err) {
            console.error('コピーに失敗しました:', err);
            showNotification('コピーに失敗しました', 'error');
        } finally {
            document.body.removeChild(textArea);
        }
    }
}