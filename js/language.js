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
            basic: '基本',
            branch: 'ブランチ',
            commit: 'コミット',
            reset: 'リセット',
            remote: 'リモート',
            log: 'ログ',
            stash: 'スタッシュ',
            config: '設定',
            troubleshoot: 'トラブルシュート',
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
            contact_cta_description: 'ご質問やご要望がございましたら、お気軽にお問い合わせください。',
            contact_form: 'お問い合わせフォーム',
            hero_description: 'Git開発を効率化する無料ツール。ブランチ操作、コミット、リモート管理など100以上のコマンドをワンクリックでコピー。',
            back: '戻る',
            contact_description: 'ご質問やご意見がございましたら、お気軽にお問い合わせください。',
            update_history: 'Webページ更新履歴',
            update_title_v1_3: 'v1.3.0 - SEO対策・UI統一・背景アニメーション追加',
            update_item_seo: 'SEO対策実装（メタタグ、構造化データ、サイトマップ）',
            update_item_animation: '背景に微細なパーティクルアニメーション追加',
            update_item_contact: 'お問い合わせフォームを専用ページに分離',
            update_item_ui: 'index.htmlとcontact.htmlのUI完全統一',
            update_item_responsive: 'モバイル対応とダークモード強化',
            update_title_v1_2: 'v1.2.0 - 多言語対応・機能拡充',
            update_item_multilang: '3言語対応（日本語・英語・中国語）',
            update_item_commands: '100以上のGitコマンド追加',
            update_item_dark: 'ダークモード実装',
            update_item_mobile: 'モバイル用ハンバーガーメニュー追加',
            update_item_custom: 'カスタムコマンド機能強化',
            update_title_v1_1: 'v1.1.0 - 基本機能実装',
            update_item_basic: '基本的なGitコマンド集実装',
            update_item_copy: 'ワンクリックコピー機能',
            update_item_filter: 'カテゴリ別フィルター機能',
            update_item_recent: '最近使用したコマンド履歴',
            update_item_search: 'コマンド検索機能',
            update_title_v1_0: 'v1.0.0 - 初回リリース',
            update_item_initial: 'Git Command Helper 初回公開',
            update_item_core: 'コアとなるGitコマンド一覧機能',
            update_item_design: '基本的なUI/UXデザイン',
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
                // 基本コマンド
                'git init': {
                    title: 'リポジトリを初期化',
                    description: '新しいGitリポジトリを初期化します'
                },
                'git clone {repository_url}': {
                    title: 'リポジトリをクローン',
                    description: 'リモートリポジトリをローカルにクローンします'
                },
                'git add .': {
                    title: '全ての変更をステージング',
                    description: 'すべての変更をステージングエリアに追加します'
                },
                'git add {file_name}': {
                    title: '特定ファイルをステージング',
                    description: '特定のファイルをステージングエリアに追加します'
                },
                'git status': {
                    title: '現在の状態を確認',
                    description: '現在のワーキングディレクトリの状態を表示します'
                },
                'git commit -m "{message}"': {
                    title: '変更をコミット',
                    description: 'ステージングされた変更をコミットします'
                },
                'git diff': {
                    title: '変更を比較',
                    description: 'ワーキングディレクトリとステージングエリアの差分を表示します'
                },
                'git diff {file_name}': {
                    title: '特定ファイルの変更を比較',
                    description: '特定ファイルの変更差分を表示します'
                },
                'git pull': {
                    title: 'リモートから最新を取得',
                    description: 'リモートから最新の変更を取得してマージします'
                },
                'git push': {
                    title: 'リモートにプッシュ',
                    description: 'ローカルの変更をリモートリポジトリにプッシュします'
                },
                'git push origin {branch_name}': {
                    title: '特定ブランチをプッシュ',
                    description: '特定のブランチをリモートにプッシュします'
                },
                'git fetch': {
                    title: 'リモート情報を取得',
                    description: 'リモートから最新の情報を取得します（マージはしません）'
                },
                'git merge {branch_name}': {
                    title: 'ブランチをマージ',
                    description: '指定したブランチを現在のブランチにマージします'
                },
                'git rebase {branch_name}': {
                    title: 'ブランチをリベース',
                    description: '現在のブランチを指定ブランチの上にリベースします'
                },
                'git checkout {branch_name}': {
                    title: 'ブランチを切り替え',
                    description: '指定したブランチに切り替えます'
                },
                'git checkout {commit_hash}': {
                    title: '特定コミットにチェックアウト',
                    description: '特定のコミットにチェックアウトします'
                },
                'git tag {tag_name}': {
                    title: 'タグを作成',
                    description: '現在のコミットにタグを作成します'
                },
                'git tag -a {tag_name} -m "{message}"': {
                    title: '注釈付きタグを作成',
                    description: '注釈付きタグを作成します'
                },
                
                // 設定コマンド
                'git config --global user.name "{name}"': {
                    title: 'ユーザー名を設定',
                    description: 'Gitで使用するユーザー名をグローバルに設定します'
                },
                'git config --global user.email "{email}"': {
                    title: 'メールアドレスを設定',
                    description: 'Gitで使用するメールアドレスをグローバルに設定します'
                },
                'git config --list': {
                    title: '設定一覧を表示',
                    description: '現在のGit設定をすべて表示します'
                },
                'git config --global core.editor "{editor}"': {
                    title: 'デフォルトエディタを設定',
                    description: 'Gitで使用するデフォルトエディタを設定します'
                },
                'git config --global init.defaultBranch {branch_name}': {
                    title: 'デフォルトブランチ名を設定',
                    description: '新しいリポジトリのデフォルトブランチ名を設定します'
                },
                
                // トラブルシュートコマンド
                'git revert {commit_hash}': {
                    title: '特定のコミットを打ち消し',
                    description: '指定したコミットの変更を打ち消すコミットを作成します'
                },
                'git revert HEAD': {
                    title: '直前のコミットを打ち消し',
                    description: '直前のコミットを打ち消すコミットを作成します'
                },
                'git blame {file_name}': {
                    title: 'ファイルの変更履歴を行別で表示',
                    description: 'ファイルの各行がいつ誰によって変更されたかを表示します'
                },
                'git show {commit_hash}': {
                    title: '特定のコミットの詳細を表示',
                    description: '指定したコミットの詳細情報を表示します'
                },
                'git reflog': {
                    title: '操作履歴を表示',
                    description: 'HEADの移動履歴を表示します（削除されたコミットも含む）'
                },
                
                // ブランチコマンド
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
            basic: 'Basic',
            branch: 'Branch',
            commit: 'Commit',
            reset: 'Reset',
            remote: 'Remote',
            log: 'Log',
            stash: 'Stash',
            config: 'Config',
            troubleshoot: 'Troubleshoot',
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
            contact_cta_description: 'If you have any questions or requests, please feel free to contact us.',
            contact_form: 'Contact Form',
            hero_description: 'Free tool to enhance Git development efficiency. Copy 100+ commands including branch operations, commits, and remote management with one click.',
            back: 'Back',
            contact_description: 'If you have any questions or feedback, please feel free to contact us.',
            update_history: 'Website Update History',
            update_title_v1_3: 'v1.3.0 - SEO Optimization, UI Unification, Background Animation',
            update_item_seo: 'SEO implementation (meta tags, structured data, sitemap)',
            update_item_animation: 'Added subtle particle background animation',
            update_item_contact: 'Separated contact form to dedicated page',
            update_item_ui: 'Complete UI unification between index.html and contact.html',
            update_item_responsive: 'Enhanced mobile support and dark mode',
            update_title_v1_2: 'v1.2.0 - Multi-language Support & Feature Enhancement',
            update_item_multilang: '3-language support (Japanese, English, Chinese)',
            update_item_commands: 'Added 100+ Git commands',
            update_item_dark: 'Dark mode implementation',
            update_item_mobile: 'Added mobile hamburger menu',
            update_item_custom: 'Enhanced custom command functionality',
            update_title_v1_1: 'v1.1.0 - Basic Feature Implementation',
            update_item_basic: 'Basic Git command collection implementation',
            update_item_copy: 'One-click copy functionality',
            update_item_filter: 'Category-based filter functionality',
            update_item_recent: 'Recently used commands history',
            update_item_search: 'Command search functionality',
            update_title_v1_0: 'v1.0.0 - Initial Release',
            update_item_initial: 'Git Command Helper initial release',
            update_item_core: 'Core Git command listing functionality',
            update_item_design: 'Basic UI/UX design',
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
                // Basic commands
                'git init': {
                    title: 'Initialize repository',
                    description: 'Initialize a new Git repository'
                },
                'git clone {repository_url}': {
                    title: 'Clone repository',
                    description: 'Clone a remote repository to local'
                },
                'git add .': {
                    title: 'Stage all changes',
                    description: 'Add all changes to staging area'
                },
                'git add {file_name}': {
                    title: 'Stage specific file',
                    description: 'Add specific file to staging area'
                },
                'git status': {
                    title: 'Check current status',
                    description: 'Show the current working directory status'
                },
                'git commit -m "{message}"': {
                    title: 'Commit changes',
                    description: 'Commit staged changes'
                },
                'git diff': {
                    title: 'Compare changes',
                    description: 'Show differences between working directory and staging area'
                },
                'git diff {file_name}': {
                    title: 'Compare specific file changes',
                    description: 'Show differences of specific file'
                },
                'git pull': {
                    title: 'Pull from remote',
                    description: 'Fetch and merge latest changes from remote'
                },
                'git push': {
                    title: 'Push to remote',
                    description: 'Push local changes to remote repository'
                },
                'git push origin {branch_name}': {
                    title: 'Push specific branch',
                    description: 'Push specific branch to remote'
                },
                'git fetch': {
                    title: 'Fetch remote info',
                    description: 'Fetch latest info from remote (without merging)'
                },
                'git merge {branch_name}': {
                    title: 'Merge branch',
                    description: 'Merge specified branch into current branch'
                },
                'git rebase {branch_name}': {
                    title: 'Rebase branch',
                    description: 'Rebase current branch onto specified branch'
                },
                'git checkout {branch_name}': {
                    title: 'Switch branch',
                    description: 'Switch to specified branch'
                },
                'git checkout {commit_hash}': {
                    title: 'Checkout specific commit',
                    description: 'Checkout to specific commit'
                },
                'git tag {tag_name}': {
                    title: 'Create tag',
                    description: 'Create tag at current commit'
                },
                'git tag -a {tag_name} -m "{message}"': {
                    title: 'Create annotated tag',
                    description: 'Create annotated tag'
                },
                
                // Config commands
                'git config --global user.name "{name}"': {
                    title: 'Set user name',
                    description: 'Set global user name for Git'
                },
                'git config --global user.email "{email}"': {
                    title: 'Set email address',
                    description: 'Set global email address for Git'
                },
                'git config --list': {
                    title: 'Show configuration',
                    description: 'Display all current Git configuration'
                },
                'git config --global core.editor "{editor}"': {
                    title: 'Set default editor',
                    description: 'Set default editor for Git'
                },
                'git config --global init.defaultBranch {branch_name}': {
                    title: 'Set default branch name',
                    description: 'Set default branch name for new repositories'
                },
                
                // Troubleshoot commands
                'git revert {commit_hash}': {
                    title: 'Revert specific commit',
                    description: 'Create commit that reverses specified commit'
                },
                'git revert HEAD': {
                    title: 'Revert last commit',
                    description: 'Create commit that reverses last commit'
                },
                'git blame {file_name}': {
                    title: 'Show file change history by line',
                    description: 'Show who and when each line of file was changed'
                },
                'git show {commit_hash}': {
                    title: 'Show commit details',
                    description: 'Display detailed information of specified commit'
                },
                'git reflog': {
                    title: 'Show operation history',
                    description: 'Show HEAD movement history (including deleted commits)'
                },
                
                // Branch commands
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
            basic: '基础',
            branch: '分支',
            commit: '提交',
            reset: '重置',
            remote: '远程',
            log: '日志',
            stash: '暂存',
            config: '配置',
            troubleshoot: '故障排除',
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
            contact_cta_description: '如果您有任何问题或建议，请随时联系我们。',
            contact_form: '联系表单',
            hero_description: '提高Git开发效率的免费工具。一键复制包括分支操作、提交、远程管理等100多个命令。',
            back: '返回',
            contact_description: '如果您有任何问题或意见，请随时与我们联系。',
            update_history: '网页更新历史',
            update_title_v1_3: 'v1.3.0 - SEO优化・UI统一・背景动画添加',
            update_item_seo: 'SEO对策实施（元标签、结构化数据、站点地图）',
            update_item_animation: '添加微妙的粒子背景动画',
            update_item_contact: '将联系表单分离到专用页面',
            update_item_ui: 'index.html和contact.html的UI完全统一',
            update_item_responsive: '增强移动设备支持和暗黑模式',
            update_title_v1_2: 'v1.2.0 - 多语言支持・功能扩充',
            update_item_multilang: '3语言支持（日语・英语・中文）',
            update_item_commands: '添加100多个Git命令',
            update_item_dark: '暗黑模式实施',
            update_item_mobile: '添加移动设备汉堡菜单',
            update_item_custom: '自定义命令功能增强',
            update_title_v1_1: 'v1.1.0 - 基本功能实施',
            update_item_basic: '基本Git命令集实施',
            update_item_copy: '一键复制功能',
            update_item_filter: '分类过滤功能',
            update_item_recent: '最近使用的命令历史',
            update_item_search: '命令搜索功能',
            update_title_v1_0: 'v1.0.0 - 初次发布',
            update_item_initial: 'Git Command Helper 初次发布',
            update_item_core: '核心Git命令列表功能',
            update_item_design: '基本UI/UX设计',
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
                // 基础命令
                'git init': {
                    title: '初始化仓库',
                    description: '初始化一个新的Git仓库'
                },
                'git clone {repository_url}': {
                    title: '克隆仓库',
                    description: '将远程仓库克隆到本地'
                },
                'git add .': {
                    title: '暂存所有更改',
                    description: '将所有更改添加到暂存区'
                },
                'git add {file_name}': {
                    title: '暂存特定文件',
                    description: '将特定文件添加到暂存区'
                },
                'git status': {
                    title: '检查当前状态',
                    description: '显示当前工作目录的状态'
                },
                'git commit -m "{message}"': {
                    title: '提交更改',
                    description: '提交暂存的更改'
                },
                'git diff': {
                    title: '比较更改',
                    description: '显示工作目录和暂存区之间的差异'
                },
                'git diff {file_name}': {
                    title: '比较特定文件的更改',
                    description: '显示特定文件的更改差异'
                },
                'git pull': {
                    title: '从远程拉取',
                    description: '从远程获取并合并最新更改'
                },
                'git push': {
                    title: '推送到远程',
                    description: '将本地更改推送到远程仓库'
                },
                'git push origin {branch_name}': {
                    title: '推送特定分支',
                    description: '将特定分支推送到远程'
                },
                'git fetch': {
                    title: '获取远程信息',
                    description: '从远程获取最新信息（不合并）'
                },
                'git merge {branch_name}': {
                    title: '合并分支',
                    description: '将指定分支合并到当前分支'
                },
                'git rebase {branch_name}': {
                    title: '变基分支',
                    description: '将当前分支变基到指定分支上'
                },
                'git checkout {branch_name}': {
                    title: '切换分支',
                    description: '切换到指定分支'
                },
                'git checkout {commit_hash}': {
                    title: '检出特定提交',
                    description: '检出到特定提交'
                },
                'git tag {tag_name}': {
                    title: '创建标签',
                    description: '在当前提交创建标签'
                },
                'git tag -a {tag_name} -m "{message}"': {
                    title: '创建注释标签',
                    description: '创建注释标签'
                },
                
                // 配置命令
                'git config --global user.name "{name}"': {
                    title: '设置用户名',
                    description: '设置Git的全局用户名'
                },
                'git config --global user.email "{email}"': {
                    title: '设置邮箱地址',
                    description: '设置Git的全局邮箱地址'
                },
                'git config --list': {
                    title: '显示配置',
                    description: '显示所有当前Git配置'
                },
                'git config --global core.editor "{editor}"': {
                    title: '设置默认编辑器',
                    description: '设置Git的默认编辑器'
                },
                'git config --global init.defaultBranch {branch_name}': {
                    title: '设置默认分支名',
                    description: '设置新仓库的默认分支名'
                },
                
                // 故障排除命令
                'git revert {commit_hash}': {
                    title: '撤销特定提交',
                    description: '创建撤销指定提交的新提交'
                },
                'git revert HEAD': {
                    title: '撤销最后提交',
                    description: '创建撤销最后提交的新提交'
                },
                'git blame {file_name}': {
                    title: '按行显示文件更改历史',
                    description: '显示文件每行是何时被谁更改的'
                },
                'git show {commit_hash}': {
                    title: '显示提交详情',
                    description: '显示指定提交的详细信息'
                },
                'git reflog': {
                    title: '显示操作历史',
                    description: '显示HEAD移动历史（包括已删除的提交）'
                },
                
                // 分支命令
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
    
    // ヒーロー説明文の更新
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription && lang.hero_description) {
        heroDescription.textContent = lang.hero_description;
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
