// 1. ВІК
function updateAge() {
    const birth = new Date(2013, 5, 10);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    if (now.getMonth() < 5 || (now.getMonth() === 5 && now.getDate() < 10)) age--;
    document.getElementById('age').innerText = age;
}
updateAge();

// 2. ТРЯСІННЯ АВАТАРКИ
const avatar = document.getElementById('main-avatar');
let clickCount = 0;
avatar.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        avatar.classList.add('shake-me');
        setTimeout(() => { avatar.classList.remove('shake-me'); clickCount = 0; }, 600);
    }
});

// 3. ЛОГІКА ПЛЕЄРА
const audio = document.getElementById('bg-audio');
const playBtn = document.getElementById('play-pause');
const volumeSlider = document.getElementById('volume-slider');
const progressSlider = document.getElementById('progress-slider');
const currTimeText = document.getElementById('current-time');
const durationText = document.getElementById('duration');

function formatTime(s) {
    if (isNaN(s)) return "0:00";
    let m = Math.floor(s / 60);
    let sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' + sec : sec}`;
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

audio.addEventListener('timeupdate', () => {
    progressSlider.value = (audio.currentTime / audio.duration) * 100 || 0;
    currTimeText.innerText = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => { durationText.innerText = formatTime(audio.duration); });
progressSlider.addEventListener('input', () => { audio.currentTime = (progressSlider.value / 100) * audio.duration; });
volumeSlider.addEventListener('input', (e) => { audio.volume = e.target.value; });

// 4. УНІВЕРСАЛЬНЕ ПЕРЕТЯГУВАННЯ
function makeDraggable(el) {
    const header = el.querySelector('.card-header');
    header.onmousedown = (e) => {
        // Запобігаємо перетягуванню, якщо натиснули на цятки
        if (e.target.classList.contains('dot')) return; 
        
        let p3 = e.clientX, p4 = e.clientY;
        document.onmousemove = (e) => {
            el.style.top = (el.offsetTop - (p4 - e.clientY)) + "px";
            el.style.left = (el.offsetLeft - (p3 - e.clientX)) + "px";
            p3 = e.clientX; p4 = e.clientY;
        };
        document.onmouseup = () => { document.onmousemove = null; };
    };
}
makeDraggable(document.getElementById("bio-card"));
makeDraggable(document.getElementById("music-player"));

// ==========================================
// 5. ЛОГІКА ЦЯТОК (ЗГОРТАННЯ ТА ВИПАДКОВЕ КОНФЕТІ)
// ==========================================

const bioCard = document.getElementById('bio-card');
const playerCard = document.getElementById('music-player');

// Функція згортання
function minimizeWindow(window) {
    window.classList.add('hidden-win');
    setTimeout(() => window.classList.remove('hidden-win'), 2000);
}

// Функція випадкових конфеті
function celebrateRandom() {
    // 1. Випадкові форми
    const shapes = ['circle', 'square', 'star'];
    // Іноді додаємо емодзі або сніжинки
    if (Math.random() > 0.5) shapes.push('emoji'); 
    
    // 2. Випадкова кількість частинок (від 80 до 220)
    const particleCount = Math.floor(Math.random() * 140) + 80;
    
    // 3. Випадковий розмах (spread) та сила вибуху (startVelocity)
    const spread = Math.floor(Math.random() * 60) + 50; // 50-110
    const startVelocity = Math.floor(Math.random() * 20) + 30; // 30-50
    
    // 4. Позиція ( origin: { x, y } )
    // За замовчуванням вибух з центру ( x: 0.5, y: 0.6 )
    // Іноді робимо вибух з випадкової точки
    const origin = (Math.random() > 0.7) ? 
        { x: Math.random(), y: Math.random() * 0.5 + 0.3 } : 
        { x: 0.5, y: 0.6 };

    // 5. Випадкова колірна палітра
    const colorPalettes = [
        ['#66c0f4', '#ffffff', '#ffbd2e'], // Синій, білий, жовтий
        ['#27c93f', '#ff5f56', '#ffffff'], // Зелений, червоний, білий (Армія)
        ['#a855f7', '#ec4899', '#f97316'], // Фіолетовий, рожевий, помаранчевий
        ['#fbbf24', '#f59e0b', '#fff']     // Золотий
    ];
    const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

    // Запускаємо салют
    confetti({ particleCount, spread, startVelocity, origin, colors, shapes, ticks: 120, zIndex: 1000 });
}

// Прив'язка до кнопок
// Картка БІО
document.querySelector('#red-dot-bio').addEventListener('click', () => minimizeWindow(bioCard));
document.querySelector('#yellow-dot-bio').addEventListener('click', () => minimizeWindow(bioCard));
document.querySelector('#green-dot-bio').addEventListener('click', celebrateRandom);

// Картка ПЛЕЄРА
document.querySelector('#red-dot-player').addEventListener('click', () => minimizeWindow(playerCard));
document.querySelector('#yellow-dot-player').addEventListener('click', () => minimizeWindow(playerCard));
document.querySelector('#green-dot-player').addEventListener('click', celebrateRandom);