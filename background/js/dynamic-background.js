// dynamic-background.js - シンプルな動く背景（パーティクル）

const BG_CONFIG = {
    particleCount: 40,
    particleSize: 2.5,
    particleSpeed: 0.7,
    connectionDistance: 120,
    color: 'rgba(102,126,234,0.7)',
    lineColor: 'rgba(102,126,234,0.15)'
};

class Particle {
    constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * BG_CONFIG.particleSpeed;
        this.vy = (Math.random() - 0.5) * BG_CONFIG.particleSpeed;
    }
    move(width, height) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
}

class DynamicBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.init();
    }
    init() {
        this.createCanvas();
        this.createParticles();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'dynamicBackgroundCanvas';
        this.canvas.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;`;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    createParticles() {
        this.particles = [];
        for (let i = 0; i < BG_CONFIG.particleCount; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }
    }
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw particles
        for (const p of this.particles) {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, BG_CONFIG.particleSize, 0, Math.PI * 2);
            this.ctx.fillStyle = BG_CONFIG.color;
            this.ctx.fill();
        }
        // Draw lines
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const a = this.particles[i], b = this.particles[j];
                const dist = Math.hypot(a.x - b.x, a.y - b.y);
                if (dist < BG_CONFIG.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(a.x, a.y);
                    this.ctx.lineTo(b.x, b.y);
                    this.ctx.strokeStyle = BG_CONFIG.lineColor;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    animate() {
        for (const p of this.particles) p.move(this.canvas.width, this.canvas.height);
        this.drawParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    destroy() {
        cancelAnimationFrame(this.animationId);
        if (this.canvas) this.canvas.remove();
    }
}

// ページロード時に自動初期化
window.addEventListener('DOMContentLoaded', () => {
    window.dynamicBackground = new DynamicBackground();
});
