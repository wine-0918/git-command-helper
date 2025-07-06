// Git Commands データとユーティリティ関数

// HTMLエスケープ関数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// コマンドデータ（多言語対応版）
const gitCommands = [
    // ブランチ操作
    {
        command: "git checkout -b {branch_name}",
        category: "branch",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git checkout -f {branch_name}",
        category: "branch",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git checkout -t origin/{branch_name}",
        category: "branch",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git branch -d {branch_name}",
        category: "branch",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git branch -D {branch_name}",
        category: "branch",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git branch -a",
        category: "branch",
        hasParams: false
    },

    // コミット操作
    {
        command: "git commit -am \"{message}\"",
        category: "commit",
        hasParams: true,
        paramLabel: "コミットメッセージ"
    },
    {
        command: "git commit --amend -m \"{message}\"",
        category: "commit",
        hasParams: true,
        paramLabel: "新しいメッセージ"
    },
    {
        command: "git commit --amend --no-edit",
        category: "commit",
        hasParams: false
    },
    {
        command: "git commit --allow-empty -m \"{message}\"",
        category: "commit",
        hasParams: true,
        paramLabel: "コミットメッセージ"
    },

    // リセット操作
    {
        command: "git reset --soft HEAD~1",
        category: "reset",
        hasParams: false
    },
    {
        command: "git reset --hard HEAD~1",
        category: "reset",
        hasParams: false
    },
    {
        command: "git reset --hard {commit_hash}",
        category: "reset",
        hasParams: true,
        paramLabel: "コミットハッシュ"
    },
    {
        command: "git reset HEAD .",
        category: "reset",
        hasParams: false
    },

    // リモート操作
    {
        command: "git push -f origin {branch_name}",
        category: "remote",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git push --force-with-lease origin {branch_name}",
        category: "remote",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git push origin --delete {branch_name}",
        category: "remote",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git fetch --all --prune",
        category: "remote",
        hasParams: false
    },

    // ログ操作
    {
        command: "git log --oneline --graph --all",
        category: "log",
        hasParams: false
    },
    {
        command: "git log --follow -- {file_path}",
        category: "log",
        hasParams: true,
        paramLabel: "ファイルパス"
    },
    {
        command: "git log -n {number} --oneline",
        category: "log",
        hasParams: true,
        paramLabel: "コミット数"
    },
    {
        command: "git shortlog -sn",
        category: "log",
        hasParams: false
    },

    // スタッシュ操作
    {
        command: "git stash save \"{message}\"",
        category: "stash",
        hasParams: true,
        paramLabel: "スタッシュメッセージ"
    },
    {
        command: "git stash pop",
        category: "stash",
        hasParams: false
    },
    {
        command: "git stash apply stash@{{index}}",
        category: "stash",
        hasParams: true,
        paramLabel: "スタッシュインデックス"
    },
    {
        command: "git stash clear",
        category: "stash",
        hasParams: false
    }
];

// カテゴリ名を日本語に変換（従来の互換性のため残す）
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

// 翻訳されたコマンド情報を取得する関数
function getCommandInfo(command) {
    // 多言語対応システムが利用可能な場合は翻訳を使用
    if (window.getTranslatedCommand) {
        const translated = window.getTranslatedCommand(command.command);
        if (translated) {
            return {
                title: translated.title,
                description: translated.description
            };
        }
    }
    
    // フォールバック（従来の日本語固定）
    const fallbackTitles = {
        "git checkout -b {branch_name}": "新しいブランチを作成して切り替え",
        "git checkout -f {branch_name}": "ブランチを強制的に切り替え",
        "git checkout -t origin/{branch_name}": "リモートブランチを追跡してチェックアウト",
        "git branch -d {branch_name}": "ブランチを削除",
        "git branch -D {branch_name}": "ブランチを強制削除",
        "git branch -a": "全ブランチを表示",
        "git commit -am \"{message}\"": "全ての変更をコミット",
        "git commit --amend -m \"{message}\"": "直前のコミットメッセージを修正",
        "git commit --amend --no-edit": "直前のコミットを修正（ファイル追加）",
        "git commit --allow-empty -m \"{message}\"": "空のコミットを作成",
        "git reset --soft HEAD~1": "直前のコミットを取り消し（変更保持）",
        "git reset --hard HEAD~1": "直前のコミットを取り消し（変更破棄）",
        "git reset --hard {commit_hash}": "特定のコミットまでリセット",
        "git reset HEAD .": "ステージングエリアをリセット",
        "git push -f origin {branch_name}": "強制プッシュ",
        "git push --force-with-lease origin {branch_name}": "安全な強制プッシュ",
        "git push origin --delete {branch_name}": "リモートブランチを削除",
        "git fetch --all --prune": "リモート情報を取得",
        "git log --oneline --graph --all": "グラフ付きログを表示",
        "git log --follow -- {file_path}": "特定のファイルの変更履歴",
        "git log -n {number} --oneline": "最新のnコミットを表示",
        "git shortlog -sn": "作者別のコミット数を表示",
        "git stash save \"{message}\"": "変更をスタッシュ（メッセージ付き）",
        "git stash pop": "スタッシュを適用して削除",
        "git stash apply stash@{{index}}": "特定のスタッシュを適用",
        "git stash clear": "全てのスタッシュを削除"
    };
    
    const fallbackDescriptions = {
        "git checkout -b {branch_name}": "新しいブランチを作成して、そのブランチに切り替えます",
        "git checkout -f {branch_name}": "未コミットの変更を破棄してブランチを切り替えます",
        "git checkout -t origin/{branch_name}": "リモートブランチを追跡してローカルにチェックアウトします",
        "git branch -d {branch_name}": "マージ済みのブランチを削除します",
        "git branch -D {branch_name}": "未マージのブランチを強制的に削除します",
        "git branch -a": "ローカルとリモートの全ブランチを表示します",
        "git commit -am \"{message}\"": "全ての変更をステージングしてコミットします",
        "git commit --amend -m \"{message}\"": "直前のコミットメッセージを修正します",
        "git commit --amend --no-edit": "メッセージを変更せずに直前のコミットにファイルを追加します",
        "git commit --allow-empty -m \"{message}\"": "変更がなくても空のコミットを作成します",
        "git reset --soft HEAD~1": "直前のコミットを取り消し、変更はステージングエリアに残します",
        "git reset --hard HEAD~1": "直前のコミットを取り消し、変更も破棄します",
        "git reset --hard {commit_hash}": "指定したコミットまでリセットし、それ以降の変更を破棄します",
        "git reset HEAD .": "ステージングエリアの全ての変更を取り消します",
        "git push -f origin {branch_name}": "リモートブランチを強制的に上書きします（危険）",
        "git push --force-with-lease origin {branch_name}": "他の人の変更を確認してから強制プッシュします",
        "git push origin --delete {branch_name}": "リモートのブランチを削除します",
        "git fetch --all --prune": "全てのリモート情報を取得し、削除されたブランチを整理します",
        "git log --oneline --graph --all": "ブランチの分岐をグラフで表示します",
        "git log --follow -- {file_path}": "特定のファイルの変更履歴を表示します",
        "git log -n {number} --oneline": "最新のn個のコミットを1行で表示します",
        "git shortlog -sn": "作者別のコミット数を表示します",
        "git stash save \"{message}\"": "現在の変更をメッセージ付きでスタッシュに保存します",
        "git stash pop": "最新のスタッシュを適用して削除します",
        "git stash apply stash@{{index}}": "指定したインデックスのスタッシュを適用します",
        "git stash clear": "全てのスタッシュを削除します"
    };
    
    return {
        title: fallbackTitles[command.command] || command.command,
        description: fallbackDescriptions[command.command] || ''
    };
}

// グローバルに公開
window.gitCommands = gitCommands;
window.escapeHtml = escapeHtml;
window.getCategoryName = getCategoryName;
window.getPlaceholder = getPlaceholder;
window.getCommandInfo = getCommandInfo;
