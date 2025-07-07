// SEO対策とメタデータ管理

class SEOManager {
    constructor() {
        this.defaultMeta = {
            ja: {
                title: 'Git Command Helper - よく使うGitコマンドを素早くコピー | 開発効率向上ツール',
                description: 'Git Command Helperは、よく使うGitコマンドを素早くコピーできる無料の開発支援ツールです。ブランチ操作、コミット、リモート管理など100以上のGitコマンドを網羅。カスタムコマンド登録機能付き。',
                keywords: 'Git,コマンド,開発,プログラミング,バージョン管理,GitHub,開発効率,ツール,無料,ブランチ,コミット,リモート'
            },
            en: {
                title: 'Git Command Helper - Quickly Copy Common Git Commands | Development Efficiency Tool',
                description: 'Git Command Helper is a free development tool that allows you to quickly copy frequently used Git commands. Features 100+ commands including branch operations, commits, remote management, and custom command registration.',
                keywords: 'Git,commands,development,programming,version control,GitHub,efficiency,tool,free,branch,commit,remote'
            },
            zh: {
                title: 'Git 命令助手 - 快速复制常用Git命令 | 开发效率工具',
                description: 'Git 命令助手是一个免费的开发工具，可以快速复制常用的Git命令。包含100多个命令，涵盖分支操作、提交、远程管理等功能，支持自定义命令注册。',
                keywords: 'Git,命令,开发,编程,版本控制,GitHub,效率,工具,免费,分支,提交,远程'
            }
        };
        
        this.contactMeta = {
            ja: {
                title: 'お問い合わせ - Git Command Helper | ご質問・ご要望はこちら',
                description: 'Git Command Helperに関するご質問、ご要望、不具合報告などお気軽にお問い合わせください。開発者が迅速に対応いたします。'
            },
            en: {
                title: 'Contact - Git Command Helper | Questions & Feedback',
                description: 'Feel free to contact us with any questions, requests, or bug reports about Git Command Helper. Our developers will respond promptly.'
            },
            zh: {
                title: '联系我们 - Git 命令助手 | 问题与反馈',
                description: '如果您对Git命令助手有任何问题、建议或错误报告，请随时联系我们。我们的开发人员将迅速回应。'
            }
        };
        
        this.init();
    }
    
    init() {
        this.updateMetaForCurrentPage();
        this.addStructuredData();
        this.addHrefLangTags();
        
        // 言語変更時のメタデータ更新
        if (window.addEventListener) {
            document.addEventListener('languageChanged', () => {
                this.updateMetaForCurrentPage();
            });
        }
    }
    
    updateMetaForCurrentPage() {
        const currentLang = window.currentLanguage || 'ja';
        const currentPage = this.getCurrentPageType();
        
        let meta;
        if (currentPage === 'contact') {
            meta = this.contactMeta[currentLang];
        } else {
            meta = this.defaultMeta[currentLang];
        }
        
        if (meta) {
            this.updateTitle(meta.title);
            this.updateMetaTag('description', meta.description);
            if (meta.keywords) {
                this.updateMetaTag('keywords', meta.keywords);
            }
            this.updateOGTags(meta);
        }
    }
    
    getCurrentPageType() {
        const path = window.location.pathname;
        if (path.includes('contact')) {
            return 'contact';
        } else if (path.includes('privacy')) {
            return 'privacy';
        }
        return 'index';
    }
    
    updateTitle(title) {
        document.title = title;
        
        // OGタイトルも更新
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', title);
        }
        
        // Twitterタイトルも更新
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', title);
        }
    }
    
    updateMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }
    
    updateOGTags(meta) {
        // OG description
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.setAttribute('content', meta.description);
        }
        
        // Twitter description
        const twitterDesc = document.querySelector('meta[name="twitter:description"]');
        if (twitterDesc) {
            twitterDesc.setAttribute('content', meta.description);
        }
    }
    
    addStructuredData() {
        // ページタイプに応じた構造化データの追加
        if (this.getCurrentPageType() === 'index' && !document.querySelector('script[type="application/ld+json"]')) {
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Git Command Helper",
                "description": "よく使うGitコマンドを素早くコピーできる無料の開発支援ツール",
                "url": window.location.origin,
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "JPY"
                },
                "creator": {
                    "@type": "Organization",
                    "name": "Git Command Helper"
                },
                "keywords": ["Git", "コマンド", "開発", "プログラミング", "バージョン管理"],
                "inLanguage": ["ja", "en", "zh"],
                "featureList": [
                    "100以上のGitコマンド収録",
                    "ワンクリックコピー機能",
                    "カテゴリ別フィルター",
                    "カスタムコマンド登録",
                    "多言語対応（日本語・英語・中国語）",
                    "ダークモード対応",
                    "モバイル対応"
                ]
            };
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }
    }
    
    addHrefLangTags() {
        // 既に存在する場合は削除
        const existingHrefLang = document.querySelectorAll('link[hreflang]');
        existingHrefLang.forEach(link => link.remove());
        
        // 新しいhreflangタグを追加
        const languages = ['ja', 'en', 'zh'];
        const currentUrl = window.location.href;
        
        languages.forEach(lang => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            link.href = currentUrl; // 実際の運用では言語別URLに変更
            document.head.appendChild(link);
        });
        
        // x-defaultも追加
        const defaultLink = document.createElement('link');
        defaultLink.rel = 'alternate';
        defaultLink.hreflang = 'x-default';
        defaultLink.href = currentUrl;
        document.head.appendChild(defaultLink);
    }
    
    // Google Analytics やその他の分析ツール用のイベント送信
    trackPageView() {
        // Google Analytics 4の例
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }
    
    // 検索エンジン向けのサイト内検索結果の構造化データ
    addSearchResultsStructuredData(searchTerm, results) {
        const existingScript = document.querySelector('#search-results-structured-data');
        if (existingScript) {
            existingScript.remove();
        }
        
        if (results && results.length > 0) {
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "SearchResultsPage",
                "mainEntity": {
                    "@type": "ItemList",
                    "itemListElement": results.slice(0, 10).map((result, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "item": {
                            "@type": "SoftwareApplication",
                            "name": result.title || result.command,
                            "description": result.description
                        }
                    }))
                }
            };
            
            const script = document.createElement('script');
            script.id = 'search-results-structured-data';
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }
    }
}

// グローバル変数として公開
let seoManager = null;

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    seoManager = new SEOManager();
});

// グローバルに公開
window.seoManager = seoManager;
