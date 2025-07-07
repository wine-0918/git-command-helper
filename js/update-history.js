// 更新履歴管理

// 更新履歴データ（開発者が編集する用）
const updateHistory = [
    {
        date: '2025年7月8日',
        version: 'v1.3.0',
        title: {
            ja: 'v1.3.0 - SEO対策・UI統一・背景アニメーション追加',
            en: 'v1.3.0 - SEO Optimization, UI Unification, Background Animation',
            zh: 'v1.3.0 - SEO优化・UI统一・背景动画添加'
        },
        items: [
            {
                ja: 'SEO対策実装（メタタグ、構造化データ、サイトマップ）',
                en: 'SEO implementation (meta tags, structured data, sitemap)',
                zh: 'SEO对策实施（元标签、结构化数据、站点地图）'
            },
            {
                ja: '背景に微細なパーティクルアニメーション追加',
                en: 'Added subtle particle background animation',
                zh: '添加微妙的粒子背景动画'
            },
            {
                ja: 'お問い合わせフォームを専用ページに分離',
                en: 'Separated contact form to dedicated page',
                zh: '将联系表单分离到专用页面'
            },
            {
                ja: 'index.htmlとcontact.htmlのUI完全統一',
                en: 'Complete UI unification between index.html and contact.html',
                zh: 'index.html和contact.html的UI完全统一'
            },
            {
                ja: 'モバイル対応とダークモード強化',
                en: 'Enhanced mobile support and dark mode',
                zh: '增强移动设备支持和暗黑模式'
            }
        ]
    },
    {
        date: '2025年7月7日',
        version: 'v1.2.0',
        title: {
            ja: 'v1.2.0 - 多言語対応・機能拡充',
            en: 'v1.2.0 - Multi-language Support & Feature Enhancement',
            zh: 'v1.2.0 - 多语言支持・功能扩充'
        },
        items: [
            {
                ja: '3言語対応（日本語・英語・中国語）',
                en: '3-language support (Japanese, English, Chinese)',
                zh: '3语言支持（日语・英语・中文）'
            },
            {
                ja: '100以上のGitコマンド追加',
                en: 'Added 100+ Git commands',
                zh: '添加100多个Git命令'
            },
            {
                ja: 'ダークモード実装',
                en: 'Dark mode implementation',
                zh: '暗黑模式实施'
            },
            {
                ja: 'モバイル用ハンバーガーメニュー追加',
                en: 'Added mobile hamburger menu',
                zh: '添加移动设备汉堡菜单'
            },
            {
                ja: 'カスタムコマンド機能強化',
                en: 'Enhanced custom command functionality',
                zh: '自定义命令功能增强'
            }
        ]
    },
    {
        date: '2025年7月6日',
        version: 'v1.1.0',
        title: {
            ja: 'v1.1.0 - 基本機能実装',
            en: 'v1.1.0 - Basic Feature Implementation',
            zh: 'v1.1.0 - 基本功能实施'
        },
        items: [
            {
                ja: '基本的なGitコマンド集実装',
                en: 'Basic Git command collection implementation',
                zh: '基本Git命令集实施'
            },
            {
                ja: 'ワンクリックコピー機能',
                en: 'One-click copy functionality',
                zh: '一键复制功能'
            },
            {
                ja: 'カテゴリ別フィルター機能',
                en: 'Category-based filter functionality',
                zh: '分类过滤功能'
            },
            {
                ja: '最近使用したコマンド履歴',
                en: 'Recently used commands history',
                zh: '最近使用的命令历史'
            },
            {
                ja: 'コマンド検索機能',
                en: 'Command search functionality',
                zh: '命令搜索功能'
            }
        ]
    },
    {
        date: '2025年7月5日',
        version: 'v1.0.0',
        title: {
            ja: 'v1.0.0 - 初回リリース',
            en: 'v1.0.0 - Initial Release',
            zh: 'v1.0.0 - 初次发布'
        },
        items: [
            {
                ja: 'Git Command Helper 初回公開',
                en: 'Git Command Helper initial release',
                zh: 'Git Command Helper 初次发布'
            },
            {
                ja: 'コアとなるGitコマンド一覧機能',
                en: 'Core Git command listing functionality',
                zh: '核心Git命令列表功能'
            },
            {
                ja: '基本的なUI/UXデザイン',
                en: 'Basic UI/UX design',
                zh: '基本UI/UX设计'
            }
        ]
    }
];

// 更新履歴を動的に生成する関数（サマリー表示：最新3件）
function generateUpdateHistory() {
    const container = document.querySelector('.update-timeline');
    if (!container) return;

    const currentLang = window.currentLanguage || 'ja';
    container.innerHTML = '';

    // 最新3件のみ表示
    const recentUpdates = updateHistory.slice(0, 3);

    recentUpdates.forEach(update => {
        const updateItem = document.createElement('div');
        updateItem.className = 'update-item';

        const dateDiv = document.createElement('div');
        dateDiv.className = 'update-date';
        dateDiv.textContent = update.date;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'update-content';

        const titleH3 = document.createElement('h3');
        titleH3.textContent = update.title[currentLang] || update.title.ja;

        const itemsList = document.createElement('ul');
        update.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item[currentLang] || item.ja;
            itemsList.appendChild(li);
        });

        contentDiv.appendChild(titleH3);
        contentDiv.appendChild(itemsList);

        updateItem.appendChild(dateDiv);
        updateItem.appendChild(contentDiv);

        container.appendChild(updateItem);
    });

    // 「もっと見る」リンクを追加（index.htmlでのみ）
    if (document.querySelector('.update-history-section')) {
        const moreLink = document.createElement('div');
        moreLink.className = 'update-more-link';
        moreLink.innerHTML = `
            <a href="update-history.html" class="btn-primary">
                <i class="fas fa-history"></i>
                <span data-key="view_all_updates">すべての更新履歴を見る</span>
            </a>
        `;
        container.appendChild(moreLink);
    }
}

// 詳細な更新履歴を生成する関数（全件表示）
function renderFullUpdateHistory() {
    const container = document.querySelector('#fullUpdateTimeline');
    if (!container) return;

    const currentLang = window.currentLanguage || 'ja';
    container.innerHTML = '';

    updateHistory.forEach(update => {
        const updateItem = document.createElement('div');
        updateItem.className = 'update-item';

        const dateDiv = document.createElement('div');
        dateDiv.className = 'update-date';
        dateDiv.textContent = update.date;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'update-content';

        const titleH3 = document.createElement('h3');
        titleH3.textContent = update.title[currentLang] || update.title.ja;

        const itemsList = document.createElement('ul');
        update.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item[currentLang] || item.ja;
            itemsList.appendChild(li);
        });

        contentDiv.appendChild(titleH3);
        contentDiv.appendChild(itemsList);

        updateItem.appendChild(dateDiv);
        updateItem.appendChild(contentDiv);

        container.appendChild(updateItem);
    });
}

// 新しい更新情報を追加するヘルパー関数（開発者用）
function addUpdateEntry(date, version, title, items) {
    const newEntry = {
        date,
        version,
        title,
        items
    };
    
    updateHistory.unshift(newEntry); // 最新を先頭に追加
    generateUpdateHistory(); // 再描画
}

// 言語変更時に更新履歴も再生成
document.addEventListener('languageChanged', () => {
    generateUpdateHistory();
});

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    generateUpdateHistory();
});

// グローバルに公開
window.updateHistory = updateHistory;
window.addUpdateEntry = addUpdateEntry;
window.generateUpdateHistory = generateUpdateHistory;
window.renderFullUpdateHistory = renderFullUpdateHistory;
