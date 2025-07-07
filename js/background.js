// 背景動的エフェクト

// 設定
const BACKGROUND_CONFIG = {
    particleCount: 50,
    connectionDistance: 120,
    particleSpeed: 0.5,
    particleSize: 2,
    lineOpacity: 0.1,
    particleOpacity: 0.6,
    colors: {
        light: {
            particles: 'rgba(102, 126, 234, 0.6)',
            connections: 'rgba(102, 126, 234, 0.1)'
        },
        dark: {
            particles: 'rgba(255, 255, 255, 0.4)',
            connections: 'rgba(255, 255, 255, 0.1)'
        }
    }
};

class BackgroundAnimation {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.isDarkMode = false;
        this.isReducedMotion = false;
        
        this.init();
    }

    init() {
        // ユーザーのモーション設定を確認
        this.checkReducedMotion();
        
        // モーション軽減が設定されている場合は実行しない
        if (this.isReducedMotion) {
            return;
        }

        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    checkReducedMotion() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'backgroundCanvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.8;
        `;
        
        document.body.insertBefore(this.canvas, document.body.firstChild);
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < BACKGROUND_CONFIG.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * BACKGROUND_CONFIG.particleSpeed,
                vy: (Math.random() - 0.5) * BACKGROUND_CONFIG.particleSpeed,
                size: Math.random() * BACKGROUND_CONFIG.particleSize + 1
            });
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 画面端での反射
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.vy *= -1;
            }

            // 境界内に保持
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }

    drawParticles() {
        const colors = this.isDarkMode ? 
            BACKGROUND_CONFIG.colors.dark : 
            BACKGROUND_CONFIG.colors.light;

        // パーティクル描画
        this.ctx.fillStyle = colors.particles;
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // 接続線描画
        this.ctx.strokeStyle = colors.connections;
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < BACKGROUND_CONFIG.connectionDistance) {
                    const opacity = (1 - distance / BACKGROUND_CONFIG.connectionDistance) * BACKGROUND_CONFIG.lineOpacity;
                    this.ctx.globalAlpha = opacity;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
        }
    }

    animate() {
        if (this.isReducedMotion) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawParticles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateTheme() {
        this.isDarkMode = document.body.classList.contains('dark-mode');
    }

    bindEvents() {
        // リサイズイベント
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });

        // ダークモード切り替えの監視
        const observer = new MutationObserver(() => {
            this.updateTheme();
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        // 初期テーマ設定
        this.updateTheme();

        // モーション設定の変更監視
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            if (this.isReducedMotion) {
                this.destroy();
            } else if (!this.canvas) {
                this.init();
            }
        });

        // ページの可視性変更時の制御
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }

    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resume() {
        if (!this.animationId && !this.isReducedMotion) {
            this.animate();
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
            this.canvas = null;
            this.ctx = null;
        }
    }
}

// グローバル変数として公開
let backgroundAnimation = null;

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    backgroundAnimation = new BackgroundAnimation();
});

// ページアンロード時のクリーンアップ
window.addEventListener('beforeunload', () => {
    if (backgroundAnimation) {
        backgroundAnimation.destroy();
    }
});

// グローバルに公開
window.backgroundAnimation = backgroundAnimation;
