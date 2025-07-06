// コマンド操作とモーダル機能

// コマンドをコピー
function copyCommand(command, title) {
    const langData = window.getCurrentLanguageData ? window.getCurrentLanguageData() : null;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(command).then(() => {
            const message = langData && langData.copy_success ? 
                langData.copy_success.replace('{title}', title) : 
                `"${title}" をコピーしました！`;
            showNotification(message);
            addToRecentCommands(command, title);
        }).catch(err => {
            console.error('コピーに失敗しました:', err);
            const errorMessage = langData && langData.copy_error ? 
                langData.copy_error : 'コピーに失敗しました';
            showNotification(errorMessage, 'error');
        });
    } else {
        // 古いブラウザ用のフォールバック
        fallbackCopyCommand(command, title);
    }
}

// 古いブラウザ用のフォールバック関数
function fallbackCopyCommand(command, title) {
    const langData = window.getCurrentLanguageData ? window.getCurrentLanguageData() : null;
    const textArea = document.createElement('textarea');
    textArea.value = command;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        const message = langData && langData.copy_success ? 
            langData.copy_success.replace('{title}', title) : 
            `"${title}" をコピーしました！`;
        showNotification(message);
        addToRecentCommands(command, title);
    } catch (err) {
        console.error('コピーに失敗しました:', err);
        const errorMessage = langData && langData.copy_error ? 
            langData.copy_error : 'コピーに失敗しました';
        showNotification(errorMessage, 'error');
    } finally {
        document.body.removeChild(textArea);
    }
}

// モーダルを開く
function openModal(title, command, paramLabel) {
    currentModalCommand = { title, command, paramLabel };
    const langData = window.getCurrentLanguageData ? window.getCurrentLanguageData() : null;
    
    const modalTitle = document.querySelector('.modal h3');
    const modalLabel = document.querySelector('.modal label[for="paramInput"]');
    
    const paramInputTitle = langData && langData.parameter_input ? langData.parameter_input : 'パラメータ入力';
    const paramInputLabel = langData && langData.parameter_input_label ? langData.parameter_input_label : 'パラメータを入力:';
    
    if (modalTitle) modalTitle.textContent = `${title} - ${paramInputTitle}`;
    if (modalLabel) modalLabel.textContent = paramInputLabel;
    
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
    const langData = window.getCurrentLanguageData ? window.getCurrentLanguageData() : null;
    
    if (!paramValue) {
        const errorMessage = langData && langData.param_required ? 
            langData.param_required : 'パラメータを入力してください';
        showNotification(errorMessage, 'error');
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
    const langData = window.getCurrentLanguageData ? window.getCurrentLanguageData() : null;
    
    if (!command) {
        const errorMessage = langData && langData.command_required ? 
            langData.command_required : 'コマンドを入力してください';
        showNotification(errorMessage, 'error');
        return;
    }
    
    if (!description) {
        const errorMessage = langData && langData.description_required ? 
            langData.description_required : '説明を入力してください';
        showNotification(errorMessage, 'error');
        return;
    }
    
    // 重複チェック
    if (customCommands.some(cmd => cmd.command === command)) {
        const errorMessage = langData && langData.duplicate_command ? 
            langData.duplicate_command : '同じコマンドが既に登録されています';
        showNotification(errorMessage, 'error');
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
    
    const successMessage = langData && langData.custom_command_added ? 
        langData.custom_command_added : 'カスタムコマンドを追加しました！';
    showNotification(successMessage);
    renderCustomCommands();
}

// カスタムコマンドを削除
function deleteCustomCommand(id) {
    const langData = window.getCurrentLanguageData ? window.getCurrentLanguageData() : null;
    const confirmMessage = langData && langData.delete_confirm ? 
        langData.delete_confirm : 'このカスタムコマンドを削除しますか？';
    
    if (confirm(confirmMessage)) {
        customCommands = customCommands.filter(cmd => cmd.id !== id);
        saveData();
        renderCustomCommands();
        
        const successMessage = langData && langData.custom_command_deleted ? 
            langData.custom_command_deleted : 'カスタムコマンドを削除しました';
        showNotification(successMessage);
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
