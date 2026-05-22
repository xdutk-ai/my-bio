/**
 * garland.js
 * Р¤РѕРЅРѕРІС‹Р№ СЌС„С„РµРєС‚ + РЅР°СЃС‚РѕСЏС‰Р°СЏ РіРёСЂР»СЏРЅРґР° С‚РѕР»СЊРєРѕ 10 РёСЋРЅСЏ
 */

const canvas = document.getElementById('garland-canvas');
const ctx = canvas.getContext('2d');
let juneGarland = document.getElementById('june-garland');
let particles = [];
let isDraggingGarland = false;
let dragStart = { x: 0, y: 0 };
let currentOffset = { x: 0, y: 0 };
let releaseEase = 0;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.speedY = (Math.random() - 0.5) * 0.35;
        this.alpha = Math.random() * 0.45 + 0.35;
        this.fade = Math.random() * 0.02 + 0.008;
        this.color = '#66c0f4';
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.04 + 0.01;
    }

    update() {
        this.x += this.speedX + Math.sin(this.wobble) * 0.08;
        this.y += this.speedY + Math.cos(this.wobble) * 0.05;
        this.wobble += this.wobbleSpeed;
        this.alpha += this.fade;

        if (this.alpha > 0.8 || this.alpha < 0.15) {
            this.fade *= -1;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initEffects() {
    resize();
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

function isJune10() {
    const now = new Date();
    const params = new URLSearchParams(location.search);
    return (now.getMonth() === 5 && now.getDate() === 10) || params.get('birthday') === '1';
}

function setupJuneGarland() {
    if (!juneGarland) {
        juneGarland = document.createElement('div');
        juneGarland.id = 'june-garland';
        juneGarland.className = 'june-garland hidden';
        document.body.appendChild(juneGarland);
    }
    if (!isJune10()) {
        juneGarland.classList.remove('visible');
        juneGarland.classList.add('hidden');
        juneGarland.innerHTML = '';
        return;
    }

    juneGarland.classList.remove('hidden');
    juneGarland.classList.add('visible');
    juneGarland.style.pointerEvents = 'auto';
    juneGarland.innerHTML = `
        <div class="garland-wire"></div>
        <div class="garland-bulbs"></div>
    `;

    const bulbsContainer = juneGarland.querySelector('.garland-bulbs');
    const colors = [
        'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255, 88, 88, 0.92))',
        'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255, 209, 92, 0.92))',
        'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(100, 230, 255, 0.92))',
        'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(110, 115, 255, 0.92))',
        'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(120, 255, 160, 0.92))'
    ];

    for (let i = 0; i < 10; i++) {
        const bulb = document.createElement('div');
        bulb.className = 'garland-bulb glow';
        bulb.style.background = colors[i % colors.length];
        bulb.dataset.index = i;
        bulb.style.setProperty('--n', i);
        bulb.style.setProperty('--twist', `${Math.sin(i / 2) * 8}deg`);
        bulb.style.transform = `rotate(${Math.sin(i / 2) * 6}deg)`;
        bulbsContainer.appendChild(bulb);
    }

    juneGarland.addEventListener('pointerdown', startGarlandDrag);
    window.addEventListener('pointermove', moveGarlandDrag);
    window.addEventListener('pointerup', endGarlandDrag);
    window.addEventListener('pointercancel', endGarlandDrag);
}

function startGarlandDrag(event) {
    if (!isJune10()) return;
    isDraggingGarland = true;
    dragStart.x = event.clientX;
    dragStart.y = event.clientY;
    currentOffset.x = 0;
    currentOffset.y = 0;
    releaseEase = 0;
    event.preventDefault();
}

function moveGarlandDrag(event) {
    if (!isDraggingGarland) return;
    const dx = event.clientX - dragStart.x;
    const dy = event.clientY - dragStart.y;
    currentOffset.x = Math.max(-80, Math.min(80, dx));
    currentOffset.y = Math.max(-40, Math.min(40, dy));
    updateGarlandTransform();
}

function endGarlandDrag() {
    if (!isDraggingGarland) return;
    isDraggingGarland = false;
    releaseEase = 1;
    requestAnimationFrame(animateGarlandRelease);
}

function updateGarlandTransform() {
    const bulbs = juneGarland.querySelectorAll('.garland-bulb');
    bulbs.forEach((bulb, index) => {
        const factor = (index / (bulbs.length - 1)) * 2 - 1;
        const sway = factor * currentOffset.x * 0.18;
        const drop = Math.abs(factor) * currentOffset.y * 0.45;
        bulb.style.transform = `translate(${sway}px, ${drop}px) rotate(${sway * 0.2 + parseFloat(bulb.dataset.index) * 1.2}deg)`;
    });
    const wire = juneGarland.querySelector('.garland-wire');
    if (wire) {
        const middle = currentOffset.y * 0.15;
        wire.style.transform = `translateY(${middle}px)`;
    }
}

function animateGarlandRelease() {
    if (releaseEase <= 0 || isDraggingGarland) return;
    currentOffset.x *= 0.92;
    currentOffset.y *= 0.88;
    if (Math.abs(currentOffset.x) < 0.6) currentOffset.x = 0;
    if (Math.abs(currentOffset.y) < 0.4) currentOffset.y = 0;
    updateGarlandTransform();
    if (currentOffset.x !== 0 || currentOffset.y !== 0) {
        requestAnimationFrame(animateGarlandRelease);
    }
}

window.addEventListener('resize', resize);
window.addEventListener('load', () => {
    resize();
    initEffects();
    setupJuneGarland();
    animate();
    requestAnimationFrame(animateGarlandRelease);
});


