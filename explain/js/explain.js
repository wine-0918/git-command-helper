
// ページ遷移ボタンのリンク一覧
const pageLinks = [
    { name: 'ホーム', url: '../index.html' },
    // { name: '更新履歴', url: '../update-history.html' },
    // { name: 'お問い合わせ', url: '../contact.html' }
];

function renderNavigation() {
    const header = document.querySelector('header');
    if (!header) return;
    const nav = document.createElement('nav');
    nav.className = 'page-nav';
    nav.innerHTML = pageLinks.map(link => {
        // explain.htmlから見た相対パスに統一
        if (link.name === 'ホーム') return `<a href="../index.html" class="nav-btn">${link.name}</a>`;
        // if (link.name === '更新履歴') return `<a href="../update-history.html" class="nav-btn">${link.name}</a>`;
        // if (link.name === 'お問い合わせ') return `<a href="../contact.html" class="nav-btn">${link.name}</a>`;
        return `<a href="${link.url}" class="nav-btn">${link.name}</a>`;
    }).join(' ');
    header.appendChild(nav);
}

// コマンドデータ（説明文をより詳しく・初心者向けに拡充）
const gitCommands = [
    {
        command: "gh repo clone {owner}/{repo}",
        category: "gh",
        title: "GitHubリポジトリをクローン",
        description: "GitHub CLIで指定したリポジトリをローカルに複製します。\n\n例: gh repo clone wine-0918/git-command-helper"
    },
    {
        command: "gh repo create",
        category: "gh",
        title: "新規リポジトリ作成",
        description: "GitHub CLIで新しいリポジトリを作成します。\n\n対話形式でリポジトリ名や公開/非公開を選択できます。"
    },
    {
        command: "gh issue list",
        category: "gh",
        title: "Issue一覧表示",
        description: "GitHub CLIで現在のリポジトリのIssue一覧を表示します。\n\n例: gh issue list --state open"
    },
    {
        command: "gh issue create",
        category: "gh",
        title: "Issue作成",
        description: "GitHub CLIで新しいIssueを作成します。\n\nタイトルや本文、ラベルなどを対話形式で入力できます。"
    },
    {
        command: "gh pr list",
        category: "gh",
        title: "プルリクエスト一覧表示",
        description: "GitHub CLIで現在のリポジトリのプルリクエスト一覧を表示します。\n\n例: gh pr list --state open"
    },
    {
        command: "gh pr create",
        category: "gh",
        title: "プルリクエスト作成",
        description: "GitHub CLIで新しいプルリクエストを作成します。\n\nマージ元・マージ先・タイトル・本文などを対話形式で入力できます。"
    },
    {
        command: "gh pr checkout {number}",
        category: "gh",
        title: "プルリクエストのブランチに切り替え",
        description: "指定したプルリクエスト番号のブランチに切り替えます。\n\n例: gh pr checkout 12"
    },
    {
        command: "gh pr merge {number}",
        category: "gh",
        title: "プルリクエストをマージ",
        description: "指定したプルリクエスト番号をマージします。\n\n例: gh pr merge 12 --merge"
    },
    {
        command: "gh pr view {number}",
        category: "gh",
        title: "プルリクエスト詳細表示",
        description: "指定したプルリクエスト番号の詳細を表示します。\n\n例: gh pr view 12 --web"
    },
    {
        command: "gh gist create {file}",
        category: "gh",
        title: "Gist作成",
        description: "指定したファイルをGistとしてGitHubに公開します。\n\n例: gh gist create README.md"
    },
    {
        command: "gh auth login",
        category: "gh",
        title: "GitHub認証（ログイン）",
        description: "GitHub CLIでGitHubアカウントに認証・ログインします。\n\n初回利用時やトークン再発行時に使用します。"
    },
    {
        command: "gh release list",
        category: "gh",
        title: "リリース一覧表示",
        description: "GitHub CLIでリポジトリのリリース一覧を表示します。\n\n例: gh release list"
    },
    {
        command: "gh release create {tag}",
        category: "gh",
        title: "新規リリース作成",
        description: "指定したタグ名で新しいリリースを作成します。\n\n例: gh release create v1.0.0"
    },
    {
        command: "gh workflow list",
        category: "gh",
        title: "GitHub Actionsワークフロー一覧",
        description: "GitHub CLIでActionsワークフローの一覧を表示します。\n\n例: gh workflow list"
    },
    {
        command: "gh workflow run {workflow}",
        category: "gh",
        title: "ワークフロー手動実行",
        description: "指定したワークフローを手動で実行します。\n\n例: gh workflow run build.yml"
    },
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
