const CS_CODE = "CSGO-sABZu-4owC8-jnHXD-Z3qXe-2TOpP";
let isCelebrationActive = false;
let smokeTimer = null;

const cursor = document.getElementById('custom-cursor');
const smokeBox = document.getElementById('smoke-global-container');
const avatarBox = document.getElementById('main-avatar-container');
const imgNormal = document.getElementById('avatar-normal');
const imgAngry = document.getElementById('avatar-angry');
const greenDot = document.getElementById('green-dot-trigger');

// ЛОГИКА КУРСОРА с улучшенной анимацией
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Добавляем трейл эффект к курсору
let lastX = 0, lastY = 0;
document.addEventListener('mousemove', (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    
    // Создаем маленькие частицы вокруг курсора при быстром движении
    if (Math.sqrt(dx * dx + dy * dy) > 10) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'radial-gradient(circle, rgba(102, 192, 244, 0.8), rgba(102, 192, 244, 0))';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = 'fadeOutScale 0.6s ease-out forwards';
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
    }
    
    lastX = e.clientX;
    lastY = e.clientY;
});

// Добавляем анимацию в стиль для трейла
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOutScale {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0) translateY(-20px); }
    }
`;
document.head.appendChild(style);

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
    if (chance < 40) {
        launchFireworkBurst(0.5, 0.12, ['#66c0f4', '#ffffff', '#27c93f', '#7c4dff']);
        launchFireworkBurst(0.35, 0.18, ['#ff5f56', '#ffd54f', '#66c0f4']);
        resetCooldown(3200);
    } else if (chance < 75) {
        launchFireworkBurst(0.15, 0.15, ['#66c0f4', '#ffbd2e', '#ffffff']);
        setTimeout(() => launchFireworkBurst(0.85, 0.15, ['#66c0f4', '#ff5f56', '#ffffff']), 220);
        setTimeout(() => launchFireworkBurst(0.5, 0.08, ['#7c4dff', '#00e676', '#ffffff'], 120, 200, 0.36), 420);
        resetCooldown(4200);
    } else {
        launchSparkleRain();
        resetCooldown(5200);
    }
}

function launchFireworkBurst(x, y, colors, particleCount = 80, spread = 140, gravity = 0.48) {
    confetti({
        particleCount,
        angle: 90,
        spread,
        startVelocity: 70,
        origin: { x, y },
        colors,
        gravity,
        ticks: 130,
        scalar: 0.85,
        drift: 0.1
    });
}

function launchSparkleRain() {
    const colors = ['#ffffff', '#66c0f4', '#ffbd2e'];
    const duration = 4200;
    const end = Date.now() + duration;
    (function frame() {
        confetti({
            particleCount: 2,
            angle: 90,
            spread: 60,
            origin: { x: Math.random(), y: -0.1 },
            colors,
            gravity: 0.28,
            ticks: 220,
            scalar: 0.75,
            drift: Math.random() * 0.3 - 0.15
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
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
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    h.onmousedown = (e) => {
        if (e.target.classList.contains('dot')) return;
        e.preventDefault();

        const rect = el.getBoundingClientRect();
        if (window.getComputedStyle(el).transform !== 'none') {
            el.style.transform = 'none';
            el.style.top = rect.top + 'px';
            el.style.left = rect.left + 'px';
        }

        el.classList.add('dragging');
        let mx = e.clientX, my = e.clientY;

        document.onmousemove = (de) => {
            const newTop = el.offsetTop - (my - de.clientY);
            const newLeft = el.offsetLeft - (mx - de.clientX);
            const maxLeft = window.innerWidth - el.offsetWidth - 10;
            const maxTop = window.innerHeight - el.offsetHeight - 10;

            el.style.top = clamp(newTop, 10, maxTop) + 'px';
            el.style.left = clamp(newLeft, 10, maxLeft) + 'px';
            mx = de.clientX; my = de.clientY;
            el.style.bottom = 'auto';
            el.style.right = 'auto';
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            el.classList.remove('dragging');
        };
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
    const tooltip = b.querySelector('.copy-success-tooltip');
    navigator.clipboard.writeText(CS_CODE)
        .then(() => {
            if (!tooltip) return;
            tooltip.textContent = 'Скопійовано!';
            tooltip.classList.add('tooltip-visible');
            setTimeout(() => tooltip.classList.remove('tooltip-visible'), 1800);
        })
        .catch(() => {
            if (!tooltip) return;
            tooltip.textContent = 'Не вдалося скопіювати';
            tooltip.classList.add('tooltip-visible');
            setTimeout(() => {
                tooltip.classList.remove('tooltip-visible');
                tooltip.textContent = 'Скопійовано!';
            }, 2200);
        });
}

window.onload = () => {
    setupDrag('bio-card', 'bio-handle');
};