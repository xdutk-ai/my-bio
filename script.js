// --- КОНФИГУРАЦИЯ ---
const myCrosshair = "CSGO-sABZu-4owC8-jnHXD-Z3qXe-2TOpP"; 
let canCelebrate = true; 
const cooldownTime = 3000; 

// Элементы аватара
const avatarContainer = document.getElementById('main-avatar');
const imgNormal = document.getElementById('avatar-normal');
const imgAngry = document.getElementById('avatar-angry');
const smokeContainer = document.getElementById('smoke');
let smokeInterval;

// --- ЛОГИКА РЕЖИМА ЯРОСТИ (ЗАЖАТИЕ) ---
function startRage() {
    clearInterval(smokeInterval);
    avatarContainer.classList.add('rage-active');
    
    // Переключаем на злую утку
    imgNormal.classList.remove('visible');
    imgNormal.classList.add('hidden');
    imgAngry.classList.remove('hidden');
    imgAngry.classList.add('visible');

    // Запуск дыма
    smokeInterval = setInterval(() => {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = (Math.random() * 40 - 20) + 'px';
        smokeContainer.appendChild(p);
        setTimeout(() => p.remove(), 1200);
    }, 80);
}

function stopRage() {
    avatarContainer.classList.remove('rage-active');
    // Возвращаем добрую утку
    imgAngry.classList.remove('visible');
    imgAngry.classList.add('hidden');
    imgNormal.classList.remove('hidden');
    imgNormal.classList.add('visible');
    clearInterval(smokeInterval);
}

// --- ФУНКЦИЯ СНЕГА (ВЛЕВО И ДОЛГО) ---
function startSnowfall() {
    var duration = 6 * 1000; 
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: 400,
            gravity: 0.5,
            origin: {
                x: Math.random(),
                y: Math.random() * 0.9 - 0.2
            },
            colors: ['#ffffff'], 
            shapes: ['circle'],
            scalar: 0.7,
            drift: -1.5, 
            angle: 110   
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// --- РАНДОМАЙЗЕР КОНФЕТТИ С КД И ШАНСАМИ ---
function celebrateRandom() {
    if (!canCelebrate) return;

    const colors = ['#66c0f4', '#ffbd2e', '#ff5f56', '#27c93f', '#a371f7'];
    const chance = Math.random() * 100;

    if (chance <= 15) {
        startSnowfall();
    } else if (chance <= 40) {
        confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: colors
        });
        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: colors
            });
        }, 150);
    } else if (chance <= 70) {
        confetti({
            particleCount: 100,
            spread: 160,
            origin: { y: 0, x: 0.5 },
            colors: colors
        });
    } else {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 1, x: 0.5 },
            colors: colors
        });
    }

    canCelebrate = false;
    const btn = event.currentTarget; 
    
    if (btn && btn.style) {
        btn.style.opacity = "0.5";
        btn.style.cursor = "default"; 
    }

    setTimeout(() => {
        canCelebrate = true;
        if (btn && btn.style) {
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        }
    }, cooldownTime);
}

// --- КОПИРОВАНИЕ ПРИЦЕЛА ---
function copyCrosshair(btn) {
    navigator.clipboard.writeText(myCrosshair).then(() => {
        const tip = btn.querySelector('.copy-tooltip');
        tip.classList.add('show');
        setTimeout(() => tip.classList.remove('show'), 1200);
    });
}

// --- ПЕРЕТЯГИВАНИЕ ОКОН (БЕЗ СТРЕЛОЧЕК) ---
function makeDraggable(el, handleId) {
    let p1 = 0, p2 = 0, p3 = 0, p4 = 0;
    const handle = document.getElementById(handleId);
    
    handle.style.cursor = "pointer"; 

    handle.onmousedown = (e) => {
        if (e.target.classList.contains('dot')) return;
        e.preventDefault();
        handle.style.cursor = "grabbing"; 
        p3 = e.clientX; 
        p4 = e.clientY;
        
        document.onmousemove = (e) => {
            p1 = p3 - e.clientX; 
            p2 = p4 - e.clientY;
            p3 = e.clientX; 
            p4 = e.clientY;
            
            let newTop = el.offsetTop - p2;
            let newLeft = el.offsetLeft - p1;

            const maxTop = window.innerHeight - el.offsetHeight;
            const maxLeft = window.innerWidth - el.offsetWidth;

            if (newTop < 0) newTop = 0;
            if (newTop > maxTop) newTop = maxTop;
            if (newLeft < 0) newLeft = 0;
            if (newLeft > maxLeft) newLeft = maxLeft;

            el.style.top = newTop + "px";
            el.style.left = newLeft + "px";
            el.style.bottom = "auto"; 
            el.style.right = "auto";
        };
        
        document.onmouseup = () => { 
            document.onmousemove = null; 
            handle.style.cursor = "pointer"; 
        };
    };
}

function toggleWin(id) {
    const w = document.getElementById(id);
    w.style.opacity = "0.2";
    w.style.transform = "scale(0.95)"; 
    setTimeout(() => {
        w.style.opacity = "1";
        w.style.transform = "scale(1)";
    }, 1000);
}

// --- МУЗЫКАЛЬНЫЙ ПЛЕЕР ---
const audio = document.getElementById('bg-audio');
const playBtn = document.getElementById('play-pause');

playBtn.onclick = () => {
    if (audio.paused) { 
        audio.play(); 
        playBtn.innerHTML = '<i class="fas fa-pause"></i>'; 
    } else { 
        audio.pause(); 
        playBtn.innerHTML = '<i class="fas fa-play"></i>'; 
    }
};

audio.ontimeupdate = () => {
    const slider = document.getElementById('progress-slider');
    const currentTime = document.getElementById('current-time');
    slider.value = (audio.currentTime / audio.duration) * 100 || 0;
    const m = Math.floor(audio.currentTime / 60);
    const s = ("0" + Math.floor(audio.currentTime % 60)).slice(-2);
    currentTime.innerText = m + ":" + s;
};

document.getElementById('progress-slider').oninput = (e) => {
    audio.currentTime = (e.target.value / 100) * audio.duration;
};

document.getElementById('volume-slider').oninput = (e) => {
    audio.volume = e.target.value;
};

// --- ЗАПУСК И СТИЛИЗАЦИЯ ТЕКСТА ВОЗРАСТА ---
window.onload = () => {
    makeDraggable(document.getElementById("bio-card"), "bio-handle");
    makeDraggable(document.getElementById("music-player"), "player-handle");

    // Прямо здесь делаем текст возраста меньше и тусклее
    const ageBadge = document.querySelector('.age-badge');
    if (ageBadge) {
        ageBadge.style.fontSize = "0.75rem"; // уменьшили размер
        ageBadge.style.opacity = "0.6";      // сделали тусклее
        ageBadge.style.fontWeight = "400";   // убрали жирность, если была
    }
};