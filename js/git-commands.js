// Git Commands データとユーティリティ関数

// HTMLエスケープ関数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// コマンドデータ（多言語対応版）
const gitCommands = [
    // 基本操作
    {
        command: "git init",
        category: "basic",
        hasParams: false
    },
    {
        command: "git clone {repository_url}",
        category: "basic",
        hasParams: true,
        paramLabel: "リポジトリURL"
    },
    {
        command: "git add .",
        category: "basic",
        hasParams: false
    },
    // プルリクエスト作成（GitHub CLI例）
    {
        command: "gh pr create --base {base_branch} --head {feature_branch} --title \"{title}\" --body \"{body}\"",
        category: "pullrequest",
        hasParams: true,
        paramLabel: "ベースブランチ, フィーチャーブランチ, タイトル, 本文"
    },
    {
        command: "git add {file_name}",
        category: "basic",
        hasParams: true,
        paramLabel: "ファイル名"
    },
    {
        command: "git status",
        category: "basic",
        hasParams: false
    },
    {
        command: "git commit -m \"{message}\"",
        category: "basic",
        hasParams: true,
        paramLabel: "コミットメッセージ"
    },
    {
        command: "git diff",
        category: "basic",
        hasParams: false
    },
    {
        command: "git diff {file_name}",
        category: "basic",
        hasParams: true,
        paramLabel: "ファイル名"
    },
    {
        command: "git pull",
        category: "basic",
        hasParams: false
    },
    {
        command: "git push",
        category: "basic",
        hasParams: false
    },
    {
        command: "git push origin {branch_name}",
        category: "basic",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git fetch",
        category: "basic",
        hasParams: false
    },
    {
        command: "git merge {branch_name}",
        category: "basic",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git rebase {branch_name}",
        category: "basic",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git checkout {branch_name}",
        category: "basic",
        hasParams: true,
        paramLabel: "ブランチ名"
    },
    {
        command: "git checkout {commit_hash}",
        category: "basic",
        hasParams: true,
        paramLabel: "コミットハッシュ"
    },
    {
        command: "git tag {tag_name}",
        category: "basic",
        hasParams: true,
        paramLabel: "タグ名"
    },
    {
        command: "git tag -a {tag_name} -m \"{message}\"",
        category: "basic",
        hasParams: true,
        paramLabel: "タグ名"
    },

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
    },

    // 設定
    {
        command: "git config --global user.name \"{name}\"",
        category: "config",
        hasParams: true,
        paramLabel: "ユーザー名"
    },
    {
        command: "git config --global user.email \"{email}\"",
        category: "config",
        hasParams: true,
        paramLabel: "メールアドレス"
    },
    {
        command: "git config --list",
        category: "config",
        hasParams: false
    },
    {
        command: "git config --global core.editor \"{editor}\"",
        category: "config",
        hasParams: true,
        paramLabel: "エディタ名"
    },
    {
        command: "git config --global init.defaultBranch {branch_name}",
        category: "config",
        hasParams: true,
        paramLabel: "デフォルトブランチ名"
    },

    // トラブルシュート
    {
        command: "git revert {commit_hash}",
        category: "troubleshoot",
        hasParams: true,
        paramLabel: "コミットハッシュ"
    },
    {
        command: "git revert HEAD",
        category: "troubleshoot",
        hasParams: false
    },
    {
        command: "git blame {file_name}",
        category: "troubleshoot",
        hasParams: true,
        paramLabel: "ファイル名"
    },
    {
        command: "git show {commit_hash}",
        category: "troubleshoot",
        hasParams: true,
        paramLabel: "コミットハッシュ"
    },
    {
        command: "git reflog",
        category: "troubleshoot",
        hasParams: false
    }
];

// カテゴリ名を日本語に変換（従来の互換性のため残す）
function getCategoryName(category) {
    const categoryNames = {
        'basic': '基本',
        'branch': 'ブランチ',
        'commit': 'コミット',
        'reset': 'リセット',
        'remote': 'リモート',
        'log': 'ログ',
        'stash': 'スタッシュ',
        'config': '設定',
        'troubleshoot': 'トラブルシュート'
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
        'ファイル名': 'index.html',
        'リポジトリURL': 'https://github.com/user/repo.git',
        'コミット数': '10',
        'スタッシュメッセージ': 'WIP: 作業中の変更',
        'スタッシュインデックス': '0',
        'ユーザー名': 'Your Name',
        'メールアドレス': 'your.email@example.com',
        'エディタ名': 'code',
        'デフォルトブランチ名': 'main',
        'タグ名': 'v1.0.0'
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
        // 基本コマンド
        "git init": "リポジトリを初期化",
        "git clone {repository_url}": "リポジトリをクローン",
        "git add .": "全ての変更をステージング",
        "git add {file_name}": "特定ファイルをステージング",
        "git status": "現在の状態を確認",
        "git commit -m \"{message}\"": "変更をコミット",
        "git diff": "変更を比較",
        "git diff {file_name}": "特定ファイルの変更を比較",
        "git pull": "リモートから最新を取得",
        "git push": "リモートにプッシュ",
        "git push origin {branch_name}": "特定ブランチをプッシュ",
        "git fetch": "リモート情報を取得",
        "git merge {branch_name}": "ブランチをマージ",
        // プルリクエスト
        "gh pr create --base {base_branch} --head {feature_branch} --title \"{title}\" --body \"{body}\"": "プルリクエストを作成 (GitHub CLI)",
        "git rebase {branch_name}": "ブランチをリベース",
        "git checkout {branch_name}": "ブランチを切り替え",
        "git checkout {commit_hash}": "特定コミットにチェックアウト",
        "git tag {tag_name}": "タグを作成",
        "git tag -a {tag_name} -m \"{message}\"": "注釈付きタグを作成",
        
        // ブランチコマンド
        "git checkout -b {branch_name}": "新しいブランチを作成して切り替え",
        "git checkout -f {branch_name}": "ブランチを強制的に切り替え",
        "git checkout -t origin/{branch_name}": "リモートブランチを追跡してチェックアウト",
        "git branch -d {branch_name}": "ブランチを削除",
        "git branch -D {branch_name}": "ブランチを強制削除",
        "git branch -a": "全ブランチを表示",
        
        // コミットコマンド
        "git commit -am \"{message}\"": "全ての変更をコミット",
        "git commit --amend -m \"{message}\"": "直前のコミットメッセージを修正",
        "git commit --amend --no-edit": "直前のコミットを修正（ファイル追加）",
        "git commit --allow-empty -m \"{message}\"": "空のコミットを作成",
        
        // リセットコマンド
        "git reset --soft HEAD~1": "直前のコミットを取り消し（変更保持）",
        "git reset --hard HEAD~1": "直前のコミットを取り消し（変更破棄）",
        "git reset --hard {commit_hash}": "特定のコミットまでリセット",
        "git reset HEAD .": "ステージングエリアをリセット",
        
        // リモートコマンド
        "git push -f origin {branch_name}": "強制プッシュ",
        "git push --force-with-lease origin {branch_name}": "安全な強制プッシュ",
        "git push origin --delete {branch_name}": "リモートブランチを削除",
        "git fetch --all --prune": "リモート情報を取得",
        
        // ログコマンド
        "git log --oneline --graph --all": "グラフ付きログを表示",
        "git log --follow -- {file_path}": "特定のファイルの変更履歴",
        "git log -n {number} --oneline": "最新のnコミットを表示",
        "git shortlog -sn": "作者別のコミット数を表示",
        
        // スタッシュコマンド
        "git stash save \"{message}\"": "変更をスタッシュ（メッセージ付き）",
        "git stash pop": "スタッシュを適用して削除",
        "git stash apply stash@{{index}}": "特定のスタッシュを適用",
        "git stash clear": "全てのスタッシュを削除",
        
        // 設定コマンド
        "git config --global user.name \"{name}\"": "ユーザー名を設定",
        "git config --global user.email \"{email}\"": "メールアドレスを設定",
        "git config --list": "設定一覧を表示",
        "git config --global core.editor \"{editor}\"": "デフォルトエディタを設定",
        "git config --global init.defaultBranch {branch_name}": "デフォルトブランチ名を設定",
        
        // トラブルシュートコマンド
        "git revert {commit_hash}": "特定のコミットを打ち消し",
        "git revert HEAD": "直前のコミットを打ち消し",
        "git blame {file_name}": "ファイルの変更履歴を行別で表示",
        "git show {commit_hash}": "特定のコミットの詳細を表示",
        "git reflog": "操作履歴を表示"
    };
    
    const fallbackDescriptions = {
        // 基本コマンド
        "git init": "新しいGitリポジトリを初期化します",
        "git clone {repository_url}": "リモートリポジトリをローカルにクローンします",
        "git add .": "すべての変更をステージングエリアに追加します",
        "git add {file_name}": "特定のファイルをステージングエリアに追加します",
        "git status": "現在のワーキングディレクトリの状態を表示します",
        "git commit -m \"{message}\"": "ステージングされた変更をコミットします",
        "git diff": "ワーキングディレクトリとステージングエリアの差分を表示します",
        "git diff {file_name}": "特定ファイルの変更差分を表示します",
        "git pull": "リモートから最新の変更を取得してマージします",
        "git push": "ローカルの変更をリモートリポジトリにプッシュします",
        "git push origin {branch_name}": "特定のブランチをリモートにプッシュします",
        "git fetch": "リモートから最新の情報を取得します（マージはしません）",
        "git merge {branch_name}": "指定したブランチを現在のブランチにマージします",
        "git rebase {branch_name}": "現在のブランチを指定ブランチの上にリベースします",
        "git checkout {branch_name}": "指定したブランチに切り替えます",
        "git checkout {commit_hash}": "特定のコミットにチェックアウトします",
        "git tag {tag_name}": "現在のコミットにタグを作成します",
        "git tag -a {tag_name} -m \"{message}\"": "注釈付きタグを作成します",
        // プルリクエスト
        "gh pr create --base {base_branch} --head {feature_branch} --title \"{title}\" --body \"{body}\"": "GitHub CLIを使ってプルリクエストを作成します。base_branchはマージ先、feature_branchはマージ元、titleはPRタイトル、bodyは説明文です。",
        
        // ブランチコマンド
        "git checkout -b {branch_name}": "新しいブランチを作成して、そのブランチに切り替えます",
        "git checkout -f {branch_name}": "未コミットの変更を破棄してブランチを切り替えます",
        "git checkout -t origin/{branch_name}": "リモートブランチを追跡してローカルにチェックアウトします",
        "git branch -d {branch_name}": "マージ済みのブランチを削除します",
        "git branch -D {branch_name}": "未マージのブランチを強制的に削除します",
        "git branch -a": "ローカルとリモートの全ブランチを表示します",
        
        // コミットコマンド
        "git commit -am \"{message}\"": "全ての変更をステージングしてコミットします",
        "git commit --amend -m \"{message}\"": "直前のコミットメッセージを修正します",
        "git commit --amend --no-edit": "メッセージを変更せずに直前のコミットにファイルを追加します",
        "git commit --allow-empty -m \"{message}\"": "変更がなくても空のコミットを作成します",
        
        // リセットコマンド
        "git reset --soft HEAD~1": "直前のコミットを取り消し、変更はステージングエリアに残します",
        "git reset --hard HEAD~1": "直前のコミットを取り消し、変更も破棄します",
        "git reset --hard {commit_hash}": "指定したコミットまでリセットし、それ以降の変更を破棄します",
        "git reset HEAD .": "ステージングエリアの全ての変更を取り消します",
        
        // リモートコマンド
        "git push -f origin {branch_name}": "リモートブランチを強制的に上書きします（危険）",
        "git push --force-with-lease origin {branch_name}": "他の人の変更を確認してから強制プッシュします",
        "git push origin --delete {branch_name}": "リモートのブランチを削除します",
        "git fetch --all --prune": "全てのリモート情報を取得し、削除されたブランチを整理します",
        
        // ログコマンド
        "git log --oneline --graph --all": "ブランチの分岐をグラフで表示します",
        "git log --follow -- {file_path}": "特定のファイルの変更履歴を表示します",
        "git log -n {number} --oneline": "最新のn個のコミットを1行で表示します",
        "git shortlog -sn": "作者別のコミット数を表示します",
        
        // スタッシュコマンド
        "git stash save \"{message}\"": "現在の変更をメッセージ付きでスタッシュに保存します",
        "git stash pop": "最新のスタッシュを適用して削除します",
        "git stash apply stash@{{index}}": "指定したインデックスのスタッシュを適用します",
        "git stash clear": "全てのスタッシュを削除します",
        
        // 設定コマンド
        "git config --global user.name \"{name}\"": "Gitで使用するユーザー名をグローバルに設定します",
        "git config --global user.email \"{email}\"": "Gitで使用するメールアドレスをグローバルに設定します",
        "git config --list": "現在のGit設定をすべて表示します",
        "git config --global core.editor \"{editor}\"": "Gitで使用するデフォルトエディタを設定します",
        "git config --global init.defaultBranch {branch_name}": "新しいリポジトリのデフォルトブランチ名を設定します",
        
        // トラブルシュートコマンド
        "git revert {commit_hash}": "指定したコミットの変更を打ち消すコミットを作成します",
        "git revert HEAD": "直前のコミットを打ち消すコミットを作成します",
        "git blame {file_name}": "ファイルの各行がいつ誰によって変更されたかを表示します",
        "git show {commit_hash}": "指定したコミットの詳細情報を表示します",
        "git reflog": "HEADの移動履歴を表示します（削除されたコミットも含む）"
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
