
// ページ遷移ボタンのリンク一覧
const pageLinks = [
    { name: 'ホーム', url: '../index.html' },
    { name: '更新履歴', url: '../update-history.html' },
    { name: 'お問い合わせ', url: '../contact.html' }
];

function renderNavigation() {
    const header = document.querySelector('header');
    if (!header) return;
    const nav = document.createElement('nav');
    nav.className = 'page-nav';
    nav.innerHTML = pageLinks.map(link =>
        `<a href="${link.url}" class="nav-btn">${link.name}</a>`
    ).join(' ');
    header.appendChild(nav);
}

// コマンドデータ（説明文をより詳しく・初心者向けに拡充）
const gitCommands = [
    {
        command: "git init",
        category: "basic",
        title: "リポジトリを初期化",
        description: "新しいGitリポジトリを作成します。\n\nこのコマンドは、現在のディレクトリをGit管理下に置くための最初のステップです。\n実行後、.gitフォルダが作成され、以降の変更履歴を記録できるようになります。\n\n例: プロジェクト開始時に必ず実行します。"
    },
    {
        command: "git clone {repository_url}",
        category: "basic",
        title: "リポジトリをクローン",
        description: "リモートリポジトリをローカルに複製します。\n\nGitHubやGitLabなどのリモートリポジトリのURLを指定して、\n自分のPCに同じ内容のディレクトリを作成します。\n\n例: git clone https://github.com/user/repo.git"
    },
    {
        command: "git add .",
        category: "basic",
        title: "全ての変更をステージング",
        description: "すべての変更ファイルをステージングエリアに追加します。\n\nステージングとは、コミットするファイルを一時的に選択することです。\nこのコマンドで全ての変更をまとめて追加できます。"
    },
    {
        command: "git add {file_name}",
        category: "basic",
        title: "特定ファイルをステージング",
        description: "指定したファイルをステージングエリアに追加します。\n\n一部のファイルだけコミットしたい場合に便利です。\n例: git add index.html"
    },
    {
        command: "git status",
        category: "basic",
        title: "現在の状態を確認",
        description: "作業ディレクトリとステージングエリアの状態を表示します。\n\nどのファイルが変更されたか、どれがステージングされているかを一覧で確認できます。"
    },
    {
        command: "git commit -m \"{message}\"",
        category: "basic",
        title: "変更をコミット",
        description: "ステージングされた変更をコミットします。\n\nコミットは変更履歴を記録する操作です。\n-mオプションでメッセージを付けて、何をしたか分かりやすく残します。\n例: git commit -m \"初回コミット\""
    },
    {
        command: "git diff",
        category: "basic",
        title: "変更を比較",
        description: "作業ディレクトリとステージングエリアの差分を表示します。\n\nどの部分が変更されたかを詳細に確認できます。\nコミット前の確認に便利です。"
    },
    {
        command: "git pull",
        category: "basic",
        title: "リモートから最新を取得",
        description: "リモートリポジトリから最新の変更を取得してマージします。\n\n他の人が更新した内容を自分のローカルに反映させるために使います。"
    },
    {
        command: "git push",
        category: "basic",
        title: "リモートにプッシュ",
        description: "ローカルの変更をリモートリポジトリに送信します。\n\n自分の作業をチームや公開リポジトリに反映させるために使います。"
    },
    {
        command: "git merge {branch_name}",
        category: "basic",
        title: "ブランチをマージ",
        description: "指定したブランチを現在のブランチに統合します。\n\n複数人で作業した内容を1つにまとめる時に使います。\n例: git merge feature/login"
    },
    {
        command: "git rebase {branch_name}",
        category: "basic",
        title: "ブランチをリベース",
        description: "現在のブランチを指定ブランチの上にリベースします。\n\n履歴を整理したい時や、最新の内容を取り込みたい時に使います。"
    },
    {
        command: "gh pr create --base {base_branch} --head {feature_branch} --title \"{title}\" --body \"{body}\"",
        category: "pullrequest",
        title: "プルリクエストを作成 (GitHub CLI)",
        description: "GitHub CLIを使ってプルリクエストを作成します。\n\nbase_branchはマージ先（例: main）、feature_branchはマージ元（例: feature/add-login）、titleはPRタイトル、bodyは説明文です。\n\nプルリクエストは、他の人に自分の変更をレビュー・マージしてもらうための仕組みです。\nコマンド例: gh pr create --base main --head feature/add-login --title \"ログイン機能追加\" --body \"ログイン画面と認証処理を追加しました。\""
    }
    // ... 必要に応じて他のコマンドも追加 ...
];

const categoryNames = {
    'basic': '基本',
    'branch': 'ブランチ',
    'commit': 'コミット',
    'reset': 'リセット',
    'remote': 'リモート',
    'log': 'ログ',
    'stash': 'スタッシュ',
    'config': '設定',
    'troubleshoot': 'トラブルシュート',
    'pullrequest': 'プルリクエスト'
};

function renderCommandCards() {
    const list = document.getElementById('command-list');
    list.innerHTML = '';
    gitCommands.forEach(cmd => {
        const card = document.createElement('div');
        card.className = 'command-card';
        card.innerHTML = `
            <div class="command-title">${cmd.title}</div>
            <div class="command-category">${categoryNames[cmd.category] || cmd.category}</div>
            <div class="command-code">${cmd.command}</div>
            <div class="command-description">${cmd.description.replace(/\n/g, '<br>')}</div>
        `;
        list.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderNavigation();
    renderCommandCards();
});
