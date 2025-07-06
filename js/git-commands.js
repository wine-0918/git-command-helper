// Git Commands データとユーティリティ関数

// HTMLエスケープ関数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

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

// グローバルに公開
window.gitCommands = gitCommands;
window.escapeHtml = escapeHtml;
window.getCategoryName = getCategoryName;
window.getPlaceholder = getPlaceholder;
