const CS_CODE = "CSGO-sABZu-4owC8-jnHXD-Z3qXe-2TOpP";
let isCelebrationActive = false;
let smokeTimer = null;

const cursor = document.getElementById('custom-cursor');
const smokeBox = document.getElementById('smoke-global-container');
const avatarBox = document.getElementById('main-avatar-container');
const imgNormal = document.getElementById('avatar-normal');
const imgAngry = document.getElementById('avatar-angry');
const greenDot = document.getElementById('green-dot-trigger');

// ЛОГИКА КУРСОРА
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('button, a, .dot, .avatar-frame-circle, input[type=range]').forEach(el => {
    el.onmouseenter = () => cursor.classList.add('cursor-hover-state');
    el.onmouseleave = () => cursor.classList.remove('cursor-hover-state');
});

// ЛОГИКА ДЫМА ПРИ НАЖАТИИ
function startRage(e) {
    avatarBox.classList.add('rage-mode-active');
    imgNormal.classList.replace('visible-layer', 'hidden-layer');
    imgAngry.classList.replace('hidden-layer', 'visible-layer');
    if (!smokeTimer) {
        smokeTimer = setInterval(() => {
            const rect = avatarBox.getBoundingClientRect();
            const p = document.createElement('div');
            p.className = 'smoke-particle-element';
            p.style.left = (rect.left + rect.width / 2 + (Math.random() * 40 - 20)) + 'px';
            p.style.top = (rect.top + 20) + 'px';
            p.style.setProperty('--random-x', (Math.random() * 100 - 50) + 'px');
            smokeBox.appendChild(p);
            setTimeout(() => p.remove(), 1500);
        }, 80);
    }
}

function stopRage() {
    avatarBox.classList.remove('rage-mode-active');
    imgAngry.classList.replace('visible-layer', 'hidden-layer');
    imgNormal.classList.replace('hidden-layer', 'visible-layer');
    clearInterval(smokeTimer);
    smokeTimer = null;
}

// ЭФФЕКТЫ КОНФЕТТИ С ШАНСОМ
function celebrateRandom() {
    if (isCelebrationActive) return;
    isCelebrationActive = true;
    greenDot.classList.add('dot-on-cooldown');

    const chance = Math.random() * 100;

    if (chance < 33) {
        // Эффект 1: Нижний взрыв
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.9 },
            colors: ['#66c0f4', '#ffffff', '#27c93f']
        });
        resetCooldown(3000);
    } else if (chance < 66) {
        // Эффект 2: Боковые взрывы
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: ['#66c0f4', '#ffbd2e']
        });
        setTimeout(() => {
            confetti({
                particleCount: 100,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.7 },
                colors: ['#66c0f4', '#ff5f56']
            });
        }, 300);
        resetCooldown(4000);
    } else {
        // Эффект 3: Снегопад
        const duration = 5000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 1,
                angle: 90,
                spread: 360,
                ticks: 200,
                origin: { x: Math.random(), y: -0.1 },
                colors: ['#ffffff'],
                gravity: 0.4,
                scalar: 0.8,
                drift: Math.random() * 0.4 - 0.2
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
        resetCooldown(6000);
    }
}

function resetCooldown(time) {
    setTimeout(() => { 
        isCelebrationActive = false; 
        greenDot.classList.remove('dot-on-cooldown');
    }, time);
}

// УПРАВЛЕНИЕ ОКНАМИ
function closeWin(id) {
    const el = document.getElementById(id);
    el.classList.add('window-is-closed');
    setTimeout(() => el.classList.remove('window-is-closed'), 3000);
}

function collapseWin(id) {
    document.getElementById(id).classList.toggle('window-is-collapsed');
}

function setupDrag(elId, hId) {
    const el = document.getElementById(elId);
    const h = document.getElementById(hId);
    h.onmousedown = (e) => {
        if (e.target.classList.contains('dot')) return;
        let mx = e.clientX, my = e.clientY;
        document.onmousemove = (de) => {
            el.style.top = (el.offsetTop - (my - de.clientY)) + "px";
            el.style.left = (el.offsetLeft - (mx - de.clientX)) + "px";
            mx = de.clientX; my = de.clientY;
            el.style.bottom = 'auto'; el.style.right = 'auto';
        };
        document.onmouseup = () => document.onmousemove = null;
    };
}

// ЛОГИКА ПЛЕЕРА
const audio = document.getElementById('background-audio-element');
const btn = document.getElementById('play-pause-toggle');
const icon = document.getElementById('play-icon');
const pSlider = document.getElementById('track-progress-slider');
const vSlider = document.getElementById('track-volume-slider');

btn.onclick = () => {
    if (audio.paused) { audio.play(); icon.classList.replace('fa-play', 'fa-pause'); }
    else { audio.pause(); icon.classList.replace('fa-pause', 'fa-play'); }
};

audio.ontimeupdate = () => {
    pSlider.value = (audio.currentTime / audio.duration) * 100 || 0;
    const f = (t) => Math.floor(t/60) + ":" + ("0" + Math.floor(t%60)).slice(-2);
    document.getElementById('current-time-val').innerText = f(audio.currentTime);
    if (!isNaN(audio.duration)) document.getElementById('total-duration-val').innerText = f(audio.duration);
};

pSlider.oninput = () => audio.currentTime = (pSlider.value / 100) * audio.duration;
vSlider.oninput = () => audio.volume = vSlider.value;

function copyCrosshair(b) {
    navigator.clipboard.writeText(CS_CODE).then(() => {
        const t = b.querySelector('.copy-success-tooltip');
        t.classList.add('tooltip-visible');
        setTimeout(() => t.classList.remove('tooltip-visible'), 1800);
    });
}

window.onload = () => {
    setupDrag('bio-card', 'bio-handle');
    setupDrag('music-player-window', 'player-handle');
};