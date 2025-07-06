// コマンド操作とモーダル機能

// コマンドをコピー
function copyCommand(command, title) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(command).then(() => {
            showNotification(`"${title}" をコピーしました！`);
            addToRecentCommands(command, title);
        }).catch(err => {
            console.error('コピーに失敗しました:', err);
            showNotification('コピーに失敗しました', 'error');
        });
    } else {
        // 古いブラウザ用のフォールバック
        fallbackCopyCommand(command, title);
    }
}

// 古いブラウザ用のフォールバック関数
function fallbackCopyCommand(command, title) {
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

// モーダルを開く
function openModal(title, command, paramLabel) {
    currentModalCommand = { title, command, paramLabel };
    
    const modalTitle = document.querySelector('.modal h3');
    const modalLabel = document.querySelector('.modal label[for="paramInput"]');
    
    if (modalTitle) modalTitle.textContent = `${title} - パラメータ入力`;
    if (modalLabel) modalLabel.textContent = `${paramLabel}を入力:`;
    
    if (paramInput) {
        paramInput.value = '';
        paramInput.placeholder = getPlaceholder(paramLabel);
    }
    
    updateCommandPreview();
    
    if (modal) {
        modal.classList.add('active');
    }
    if (paramInput) {
        paramInput.focus();
    }
}

// コマンドプレビューを更新
function updateCommandPreview() {
    if (!currentModalCommand || !paramInput || !commandPreview) return;
    
    const paramValue = paramInput.value || `{${currentModalCommand.paramLabel}}`;
    let previewCommand = currentModalCommand.command;
    
    // パラメータを置換
    previewCommand = previewCommand.replace(/\{[^}]+\}/g, paramValue);
    
    commandPreview.textContent = previewCommand;
}

// モーダルからコピー
function copyFromModal() {
    if (!paramInput || !currentModalCommand) return;
    
    const paramValue = paramInput.value.trim();
    
    if (!paramValue) {
        showNotification('パラメータを入力してください', 'error');
        return;
    }
    
    let finalCommand = currentModalCommand.command;
    finalCommand = finalCommand.replace(/\{[^}]+\}/g, paramValue);
    
    copyCommand(finalCommand, currentModalCommand.title);
    closeModal();
}

// モーダルを閉じる
function closeModal() {
    if (modal) {
        modal.classList.remove('active');
    }
    currentModalCommand = null;
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

// カスタムコマンドを追加
function addCustomCommand() {
    if (!customCommandInput || !customDescriptionInput) return;
    
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

// カスタムコマンドを削除
function deleteCustomCommand(id) {
    if (confirm('このカスタムコマンドを削除しますか？')) {
        customCommands = customCommands.filter(cmd => cmd.id !== id);
        saveData();
        renderCustomCommands();
        showNotification('カスタムコマンドを削除しました');
    }
}

// グローバルに公開
window.copyCommand = copyCommand;
window.openModal = openModal;
window.updateCommandPreview = updateCommandPreview;
window.copyFromModal = copyFromModal;
window.closeModal = closeModal;
window.addToRecentCommands = addToRecentCommands;
window.addCustomCommand = addCustomCommand;
window.deleteCustomCommand = deleteCustomCommand;
