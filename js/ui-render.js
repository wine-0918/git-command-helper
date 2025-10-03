// UI表示とレンダリング機能

// コマンドを表示
function renderCommands() {
    if (!window.gitCommands || !searchInput || !commandsGrid) return;
    
    const filteredCommands = window.gitCommands.filter(cmd => {
        const cmdInfo = getCommandInfo(cmd);
        const matchesFilter = currentFilter === 'all' || cmd.category === currentFilter;
        const searchValue = searchInput.value.toLowerCase();
        const matchesSearch = !searchValue || 
            cmdInfo.title.toLowerCase().includes(searchValue) ||
            cmd.command.toLowerCase().includes(searchValue) ||
            cmdInfo.description.toLowerCase().includes(searchValue);
        
        return matchesFilter && matchesSearch;
    });
    
    commandsGrid.innerHTML = '';
    
    filteredCommands.forEach(cmd => {
        const commandCard = createCommandCard(cmd);
        commandsGrid.appendChild(commandCard);
    });
    
    if (filteredCommands.length === 0) {
        commandsGrid.innerHTML = '<div class="no-results" style="text-align:center;color:#e06c75;font-size:1.3rem;padding:2rem;font-weight:bold;">該当するコマンドがありません</div>';
    }
}

// コマンドカードを作成
function createCommandCard(cmd) {
    const card = document.createElement('div');
    card.className = 'command-card';
    
    const cmdInfo = getCommandInfo(cmd);
    const langData = getCurrentLanguageData();
    
    const categoryColors = {
        'branch': '#28a745',
        'commit': '#17a2b8',
        'reset': '#dc3545',
        'remote': '#fd7e14',
        'log': '#6610f2',
        'stash': '#6f42c1',
        'gh': '#24292f' // GitHubカテゴリ用（黒系）
    };
    
    // カテゴリ名の翻訳
    const categoryName = langData ? langData[cmd.category] || (cmd.category === 'gh' ? 'GitHub' : getCategoryName(cmd.category)) : (cmd.category === 'gh' ? 'GitHub' : getCategoryName(cmd.category));
    
    card.innerHTML = `
        <div class="command-header">
            <div class="command-title">${escapeHtml(cmdInfo.title)}</div>
            <div class="command-category" style="background-color: ${categoryColors[cmd.category] || '#667eea'}">
                ${categoryName}
            </div>
        </div>
        <div class="command-code">${escapeHtml(cmd.command)}</div>
        <div class="command-description">${escapeHtml(cmdInfo.description)}</div>
        <div class="command-actions">
            ${cmd.hasParams ? 
                `<button class="btn-param" data-title="${escapeHtml(cmdInfo.title)}" data-command="${escapeHtml(cmd.command)}" data-param-label="${escapeHtml(cmd.paramLabel)}">
                    <i class="fas fa-edit"></i> ${langData ? langData.parameter_input || 'パラメータ入力' : 'パラメータ入力'}
                </button>` : 
                `<button class="btn-copy" data-command="${escapeHtml(cmd.command)}" data-title="${escapeHtml(cmdInfo.title)}">
                    <i class="fas fa-copy"></i> ${langData ? langData.copy || 'コピー' : 'コピー'}
                </button>`
            }
        </div>
    `;
    
    // イベントリスナーを追加
    const paramBtn = card.querySelector('.btn-param');
    const copyBtn = card.querySelector('.btn-copy');
    
    if (paramBtn) {
        paramBtn.addEventListener('click', function() {
            openModal(cmdInfo.title, cmd.command, cmd.paramLabel);
        });
    }
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            copyCommand(cmd.command, cmdInfo.title);
        });
    }
    
    return card;
}

// 最近使用したコマンドを表示
function renderRecentCommands() {
    if (!recentCommandsContainer) return;
    
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

// カスタムコマンドを表示
function renderCustomCommands() {
    if (!customCommandsList) return;
    
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

// 通知を表示
function showNotification(message, type = 'success') {
    if (!notification || !notificationText) {
        console.warn('通知要素が見つかりません');
        return;
    }
    
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

// グローバルに公開
window.renderCommands = renderCommands;
window.renderRecentCommands = renderRecentCommands;
window.renderCustomCommands = renderCustomCommands;
window.showNotification = showNotification;
