// 多言語対応機能

// 言語データ
const languages = {
    ja: {
        name: '日本語',
        data: {
            title: 'Git Command Helper',
            subtitle: 'よく使うGitコマンドを素早くコピーしよう',
            search_placeholder: 'コマンドを検索...',
            all: 'すべて',
            branch: 'ブランチ',
            commit: 'コミット',
            reset: 'リセット',
            remote: 'リモート',
            log: 'ログ',
            stash: 'スタッシュ',
            custom_command: 'カスタムコマンド',
            custom_command_placeholder: 'カスタムコマンドを入力...',
            custom_description_placeholder: '説明を入力...',
            add: '追加',
            recent_commands: '最近使用したコマンド',
            parameter_input: 'パラメータ入力',
            parameter_input_label: 'パラメータを入力:',
            generated_command: '生成されたコマンド:',
            cancel: 'キャンセル',
            copy: 'コピー',
            contact: 'お問い合わせ',
            name_placeholder: 'お名前',
            email_placeholder: 'メールアドレス',
            message_placeholder: 'お問い合わせ内容',
            send: '送信',
            command_copied: 'コマンドをコピーしました！',
            last_updated: '最終更新日: ',
            footer_text: 'あなたの開発効率を向上させるツール',
            dark_mode_toggle: 'ダークモード切り替え',
            language_toggle: '言語切り替え',
            sending: '送信中...',
            send_success: '送信完了',
            retry_send: '再送信',
            contact_success: 'お問い合わせを送信しました！確認メールもお送りしました。',
            contact_error: 'お問い合わせの送信に失敗しました。',
            copy_success: '"{title}" をコピーしました！',
            copy_error: 'コピーに失敗しました',
            param_required: 'パラメータを入力してください',
            command_required: 'コマンドを入力してください',
            description_required: '説明を入力してください',
            duplicate_command: '同じコマンドが既に登録されています',
            custom_command_added: 'カスタムコマンドを追加しました！',
            custom_command_deleted: 'カスタムコマンドを削除しました',
            delete_confirm: 'このカスタムコマンドを削除しますか？',
            // Git コマンドの説明
            commands: {
                'git checkout -b {branch_name}': {
                    title: '新しいブランチを作成して切り替え',
                    description: '新しいブランチを作成して、そのブランチに切り替えます'
                },
                'git checkout -f {branch_name}': {
                    title: 'ブランチを強制的に切り替え',
                    description: '未コミットの変更を破棄してブランチを切り替えます'
                },
                'git checkout -t origin/{branch_name}': {
                    title: 'リモートブランチを追跡してチェックアウト',
                    description: 'リモートブランチを追跡してローカルにチェックアウトします'
                },
                'git branch -d {branch_name}': {
                    title: 'ブランチを削除',
                    description: 'マージ済みのブランチを削除します'
                },
                'git branch -D {branch_name}': {
                    title: 'ブランチを強制削除',
                    description: '未マージのブランチを強制的に削除します'
                },
                'git branch -a': {
                    title: '全ブランチを表示',
                    description: 'ローカルとリモートの全ブランチを表示します'
                },
                'git commit -am "{message}"': {
                    title: '全ての変更をコミット',
                    description: '全ての変更をステージングしてコミットします'
                },
                'git commit --amend -m "{message}"': {
                    title: '直前のコミットメッセージを修正',
                    description: '直前のコミットメッセージを修正します'
                },
                'git commit --amend --no-edit': {
                    title: '直前のコミットを修正（ファイル追加）',
                    description: 'メッセージを変更せずに直前のコミットにファイルを追加します'
                },
                'git commit --allow-empty -m "{message}"': {
                    title: '空のコミットを作成',
                    description: '変更がなくても空のコミットを作成します'
                },
                'git reset --soft HEAD~1': {
                    title: '直前のコミットを取り消し（変更保持）',
                    description: '直前のコミットを取り消し、変更はステージングエリアに残します'
                },
                'git reset --hard HEAD~1': {
                    title: '直前のコミットを取り消し（変更破棄）',
                    description: '直前のコミットを取り消し、変更も破棄します'
                },
                'git reset --hard {commit_hash}': {
                    title: '特定のコミットまでリセット',
                    description: '指定したコミットまでリセットし、それ以降の変更を破棄します'
                },
                'git reset HEAD .': {
                    title: 'ステージングエリアをリセット',
                    description: 'ステージングエリアの全ての変更を取り消します'
                },
                'git push -f origin {branch_name}': {
                    title: '強制プッシュ',
                    description: 'リモートブランチを強制的に上書きします（危険）'
                },
                'git push --force-with-lease origin {branch_name}': {
                    title: '安全な強制プッシュ',
                    description: '他の人の変更を確認してから強制プッシュします'
                },
                'git push origin --delete {branch_name}': {
                    title: 'リモートブランチを削除',
                    description: 'リモートのブランチを削除します'
                },
                'git fetch --all --prune': {
                    title: 'リモート情報を取得',
                    description: '全てのリモート情報を取得し、削除されたブランチを整理します'
                },
                'git log --oneline --graph --all': {
                    title: 'グラフ付きログを表示',
                    description: 'ブランチの分岐をグラフで表示します'
                },
                'git log --follow -- {file_path}': {
                    title: '特定のファイルの変更履歴',
                    description: '特定のファイルの変更履歴を表示します'
                },
                'git log -n {number} --oneline': {
                    title: '最新のnコミットを表示',
                    description: '最新のn個のコミットを1行で表示します'
                },
                'git shortlog -sn': {
                    title: '作者別のコミット数を表示',
                    description: '作者別のコミット数を表示します'
                },
                'git stash save "{message}"': {
                    title: '変更をスタッシュ（メッセージ付き）',
                    description: '現在の変更をメッセージ付きでスタッシュに保存します'
                },
                'git stash pop': {
                    title: 'スタッシュを適用して削除',
                    description: '最新のスタッシュを適用して削除します'
                },
                'git stash apply stash@{{index}}': {
                    title: '特定のスタッシュを適用',
                    description: '指定したインデックスのスタッシュを適用します'
                },
                'git stash clear': {
                    title: '全てのスタッシュを削除',
                    description: '全てのスタッシュを削除します'
                }
            }
        }
    },
    en: {
        name: 'English',
        data: {
            title: 'Git Command Helper',
            subtitle: 'Quickly copy commonly used Git commands',
            search_placeholder: 'Search commands...',
            all: 'All',
            branch: 'Branch',
            commit: 'Commit',
            reset: 'Reset',
            remote: 'Remote',
            log: 'Log',
            stash: 'Stash',
            custom_command: 'Custom Command',
            custom_command_placeholder: 'Enter custom command...',
            custom_description_placeholder: 'Enter description...',
            add: 'Add',
            recent_commands: 'Recently Used Commands',
            parameter_input: 'Parameter Input',
            parameter_input_label: 'Enter parameter:',
            generated_command: 'Generated Command:',
            cancel: 'Cancel',
            copy: 'Copy',
            contact: 'Contact',
            name_placeholder: 'Name',
            email_placeholder: 'Email Address',
            message_placeholder: 'Message',
            send: 'Send',
            command_copied: 'Command copied!',
            last_updated: 'Last updated: ',
            footer_text: 'A tool to improve your development efficiency',
            dark_mode_toggle: 'Toggle dark mode',
            language_toggle: 'Switch language',
            sending: 'Sending...',
            send_success: 'Sent',
            retry_send: 'Retry',
            contact_success: 'Your inquiry has been sent! We also sent you a confirmation email.',
            contact_error: 'Failed to send your inquiry.',
            copy_success: '"{title}" copied!',
            copy_error: 'Failed to copy',
            param_required: 'Please enter a parameter',
            command_required: 'Please enter a command',
            description_required: 'Please enter a description',
            duplicate_command: 'This command is already registered',
            custom_command_added: 'Custom command added!',
            custom_command_deleted: 'Custom command deleted',
            delete_confirm: 'Are you sure you want to delete this custom command?',
            commands: {
                'git checkout -b {branch_name}': {
                    title: 'Create and switch to new branch',
                    description: 'Create a new branch and switch to it'
                },
                'git checkout -f {branch_name}': {
                    title: 'Force switch branch',
                    description: 'Discard uncommitted changes and switch branch'
                },
                'git checkout -t origin/{branch_name}': {
                    title: 'Track and checkout remote branch',
                    description: 'Track remote branch and checkout locally'
                },
                'git branch -d {branch_name}': {
                    title: 'Delete branch',
                    description: 'Delete a merged branch'
                },
                'git branch -D {branch_name}': {
                    title: 'Force delete branch',
                    description: 'Force delete an unmerged branch'
                },
                'git branch -a': {
                    title: 'Show all branches',
                    description: 'Show all local and remote branches'
                },
                'git commit -am "{message}"': {
                    title: 'Commit all changes',
                    description: 'Stage and commit all changes'
                },
                'git commit --amend -m "{message}"': {
                    title: 'Amend last commit message',
                    description: 'Modify the last commit message'
                },
                'git commit --amend --no-edit': {
                    title: 'Amend last commit (add files)',
                    description: 'Add files to last commit without changing message'
                },
                'git commit --allow-empty -m "{message}"': {
                    title: 'Create empty commit',
                    description: 'Create an empty commit even with no changes'
                },
                'git reset --soft HEAD~1': {
                    title: 'Undo last commit (keep changes)',
                    description: 'Undo last commit, keep changes in staging area'
                },
                'git reset --hard HEAD~1': {
                    title: 'Undo last commit (discard changes)',
                    description: 'Undo last commit and discard changes'
                },
                'git reset --hard {commit_hash}': {
                    title: 'Reset to specific commit',
                    description: 'Reset to specified commit and discard subsequent changes'
                },
                'git reset HEAD .': {
                    title: 'Reset staging area',
                    description: 'Unstage all changes in staging area'
                },
                'git push -f origin {branch_name}': {
                    title: 'Force push',
                    description: 'Force overwrite remote branch (dangerous)'
                },
                'git push --force-with-lease origin {branch_name}': {
                    title: 'Safe force push',
                    description: 'Check for others\' changes before force pushing'
                },
                'git push origin --delete {branch_name}': {
                    title: 'Delete remote branch',
                    description: 'Delete a remote branch'
                },
                'git fetch --all --prune': {
                    title: 'Fetch remote info',
                    description: 'Fetch all remote info and clean up deleted branches'
                },
                'git log --oneline --graph --all': {
                    title: 'Show log with graph',
                    description: 'Display branch divergence with graph'
                },
                'git log --follow -- {file_path}': {
                    title: 'Show file change history',
                    description: 'Show change history of a specific file'
                },
                'git log -n {number} --oneline': {
                    title: 'Show latest n commits',
                    description: 'Display latest n commits in one line'
                },
                'git shortlog -sn': {
                    title: 'Show commit count by author',
                    description: 'Display commit count grouped by author'
                },
                'git stash save "{message}"': {
                    title: 'Stash changes with message',
                    description: 'Save current changes to stash with message'
                },
                'git stash pop': {
                    title: 'Apply and remove stash',
                    description: 'Apply latest stash and remove it'
                },
                'git stash apply stash@{{index}}': {
                    title: 'Apply specific stash',
                    description: 'Apply stash at specified index'
                },
                'git stash clear': {
                    title: 'Clear all stashes',
                    description: 'Remove all stashes'
                }
            }
        }
    },
    zh: {
        name: '中文',
        data: {
            title: 'Git 命令助手',
            subtitle: '快速复制常用的Git命令',
            search_placeholder: '搜索命令...',
            all: '全部',
            branch: '分支',
            commit: '提交',
            reset: '重置',
            remote: '远程',
            log: '日志',
            stash: '暂存',
            custom_command: '自定义命令',
            custom_command_placeholder: '输入自定义命令...',
            custom_description_placeholder: '输入描述...',
            add: '添加',
            recent_commands: '最近使用的命令',
            parameter_input: '参数输入',
            parameter_input_label: '输入参数:',
            generated_command: '生成的命令:',
            cancel: '取消',
            copy: '复制',
            contact: '联系我们',
            name_placeholder: '姓名',
            email_placeholder: '邮箱地址',
            message_placeholder: '消息内容',
            send: '发送',
            command_copied: '命令已复制！',
            last_updated: '最后更新: ',
            footer_text: '提高您开发效率的工具',
            dark_mode_toggle: '切换暗黑模式',
            language_toggle: '切换语言',
            sending: '发送中...',
            send_success: '发送完成',
            retry_send: '重新发送',
            contact_success: '您的咨询已发送！我们也向您发送了确认邮件。',
            contact_error: '发送咨询失败。',
            copy_success: '"{title}" 已复制！',
            copy_error: '复制失败',
            param_required: '请输入参数',
            command_required: '请输入命令',
            description_required: '请输入描述',
            duplicate_command: '该命令已经注册',
            custom_command_added: '自定义命令已添加！',
            custom_command_deleted: '自定义命令已删除',
            delete_confirm: '您确定要删除这个自定义命令吗？',
            commands: {
                'git checkout -b {branch_name}': {
                    title: '创建并切换到新分支',
                    description: '创建一个新分支并切换到该分支'
                },
                'git checkout -f {branch_name}': {
                    title: '强制切换分支',
                    description: '丢弃未提交的更改并切换分支'
                },
                'git checkout -t origin/{branch_name}': {
                    title: '跟踪并检出远程分支',
                    description: '跟踪远程分支并在本地检出'
                },
                'git branch -d {branch_name}': {
                    title: '删除分支',
                    description: '删除已合并的分支'
                },
                'git branch -D {branch_name}': {
                    title: '强制删除分支',
                    description: '强制删除未合并的分支'
                },
                'git branch -a': {
                    title: '显示所有分支',
                    description: '显示所有本地和远程分支'
                },
                'git commit -am "{message}"': {
                    title: '提交所有更改',
                    description: '暂存并提交所有更改'
                },
                'git commit --amend -m "{message}"': {
                    title: '修改最后一次提交消息',
                    description: '修改最后一次提交的消息'
                },
                'git commit --amend --no-edit': {
                    title: '修改最后一次提交（添加文件）',
                    description: '在不更改消息的情况下向最后一次提交添加文件'
                },
                'git commit --allow-empty -m "{message}"': {
                    title: '创建空提交',
                    description: '即使没有更改也创建空提交'
                },
                'git reset --soft HEAD~1': {
                    title: '撤销最后一次提交（保留更改）',
                    description: '撤销最后一次提交，将更改保留在暂存区'
                },
                'git reset --hard HEAD~1': {
                    title: '撤销最后一次提交（丢弃更改）',
                    description: '撤销最后一次提交并丢弃更改'
                },
                'git reset --hard {commit_hash}': {
                    title: '重置到特定提交',
                    description: '重置到指定提交并丢弃后续更改'
                },
                'git reset HEAD .': {
                    title: '重置暂存区',
                    description: '取消暂存区中的所有更改'
                },
                'git push -f origin {branch_name}': {
                    title: '强制推送',
                    description: '强制覆盖远程分支（危险）'
                },
                'git push --force-with-lease origin {branch_name}': {
                    title: '安全强制推送',
                    description: '在强制推送前检查他人的更改'
                },
                'git push origin --delete {branch_name}': {
                    title: '删除远程分支',
                    description: '删除远程分支'
                },
                'git fetch --all --prune': {
                    title: '获取远程信息',
                    description: '获取所有远程信息并清理已删除的分支'
                },
                'git log --oneline --graph --all': {
                    title: '显示图形化日志',
                    description: '用图形显示分支分叉'
                },
                'git log --follow -- {file_path}': {
                    title: '显示文件更改历史',
                    description: '显示特定文件的更改历史'
                },
                'git log -n {number} --oneline': {
                    title: '显示最新的n次提交',
                    description: '以一行显示最新的n次提交'
                },
                'git shortlog -sn': {
                    title: '按作者显示提交数',
                    description: '按作者分组显示提交数'
                },
                'git stash save "{message}"': {
                    title: '带消息暂存更改',
                    description: '将当前更改保存到暂存区并附带消息'
                },
                'git stash pop': {
                    title: '应用并删除暂存',
                    description: '应用最新的暂存并删除它'
                },
                'git stash apply stash@{{index}}': {
                    title: '应用特定暂存',
                    description: '应用指定索引的暂存'
                },
                'git stash clear': {
                    title: '清除所有暂存',
                    description: '删除所有暂存'
                }
            }
        }
    }
};

// 現在の言語
let currentLanguage = localStorage.getItem('language') || 'ja';

// 言語切り替え関数
function switchLanguage(lang) {
    if (!languages[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // UI要素の更新
    updateUI();
    
    // 現在の言語表示を更新
    document.getElementById('currentLang').textContent = languages[lang].name;
    
    // モバイルフィルターの表示名も更新
    if (window.updateCurrentFilterName) {
        window.updateCurrentFilterName();
    }
    
    // コマンドリストを再描画
    if (window.renderCommands) {
        window.renderCommands();
    }
}

// UI要素を更新
function updateUI() {
    const lang = languages[currentLanguage].data;
    
    // data-key属性を持つ要素を更新
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (lang[key]) {
            element.textContent = lang[key];
        }
    });
    
    // プレースホルダーの更新
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = lang.search_placeholder;
    }
    
    const customCommand = document.getElementById('customCommand');
    if (customCommand) {
        customCommand.placeholder = lang.custom_command_placeholder;
    }
    
    const customDescription = document.getElementById('customDescription');
    if (customDescription) {
        customDescription.placeholder = lang.custom_description_placeholder;
    }
    
    // フィルターボタンの更新
    document.querySelectorAll('.filter-btn, .mobile-filter-btn').forEach(btn => {
        const category = btn.getAttribute('data-category');
        if (lang[category]) {
            btn.textContent = lang[category];
        }
    });
    
    // 現在のフィルター名も更新
    const currentFilterName = document.getElementById('currentFilterName');
    if (currentFilterName) {
        const currentCategory = currentFilterName.getAttribute('data-key');
        if (lang[currentCategory]) {
            currentFilterName.textContent = lang[currentCategory];
        }
    }
    
    // その他の要素
    const addButton = document.querySelector('#addCustomCommand');
    if (addButton) {
        addButton.innerHTML = `<i class="fas fa-plus"></i> ${lang.add}`;
    }
    
    // ツールチップの更新
    document.querySelectorAll('[data-tooltip-key]').forEach(element => {
        const key = element.getAttribute('data-tooltip-key');
        if (lang[key]) {
            element.title = lang[key];
        }
    });
    
    // フォーム要素
    const nameInput = document.querySelector('input[name="user_name"]');
    if (nameInput) {
        nameInput.placeholder = lang.name_placeholder;
    }
    
    const emailInput = document.querySelector('input[name="user_email"]');
    if (emailInput) {
        emailInput.placeholder = lang.email_placeholder;
    }
    
    const messageInput = document.querySelector('textarea[name="message"]');
    if (messageInput) {
        messageInput.placeholder = lang.message_placeholder;
    }
    
    const sendButton = document.querySelector('#contactForm button[type="submit"]');
    if (sendButton) {
        sendButton.textContent = lang.send;
    }
    
    // 最終更新日
    if (window.updateLastModified) {
        window.updateLastModified();
    }
    
    // フッター
    const footer = document.querySelector('footer p:first-child');
    if (footer) {
        footer.innerHTML = `&copy; 2025 Git Command Helper - ${lang.footer_text}`;
    }
    
    // 画面サイズに応じた表示制御を確実に実行
    if (window.handleWindowResize) {
        window.handleWindowResize();
    }
}

// 翻訳されたコマンド情報を取得
function getTranslatedCommand(command) {
    const lang = languages[currentLanguage].data;
    return lang.commands[command] || null;
}

// 現在の言語のデータを取得
function getCurrentLanguageData() {
    return languages[currentLanguage].data;
}

// 初期化
function initializeLanguage() {
    // 言語切り替えボタンのイベントリスナー
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            const langKeys = Object.keys(languages);
            const currentIndex = langKeys.indexOf(currentLanguage);
            const nextIndex = (currentIndex + 1) % langKeys.length;
            switchLanguage(langKeys[nextIndex]);
        });
    }
    
    // 初期表示の更新
    updateUI();
}

// グローバルに公開
window.switchLanguage = switchLanguage;
window.getTranslatedCommand = getTranslatedCommand;
window.getCurrentLanguageData = getCurrentLanguageData;
window.initializeLanguage = initializeLanguage;
window.currentLanguage = currentLanguage;
