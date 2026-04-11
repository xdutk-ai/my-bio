const translations = {
    'uk': { age_prefix: 'Мені', age_suffix: 'років', steam: 'Steam Профіль', bio: 'профіль.exe', player: 'плеєр.exe' },
    'ru': { age_prefix: 'Мне', age_suffix: 'лет', steam: 'Steam Профиль', bio: 'профиль.exe', player: 'плеер.exe' },
    'en': { age_prefix: 'I am', age_suffix: 'years old', steam: 'Steam Profile', bio: 'profile.exe', player: 'player.exe' }
};

function applyLanguage() {
    let rawLang = navigator.language || navigator.userLanguage;
    let userLang = rawLang.substring(0, 2).toLowerCase();
    if (!translations[userLang]) userLang = 'en';
    const t = translations[userLang];
    document.getElementById('txt-age-prefix').innerText = t.age_prefix;
    document.getElementById('txt-age-suffix').innerText = t.age_suffix;
    document.getElementById('txt-steam').innerText = t.steam;
    document.getElementById('title-bio').innerText = t.bio;
    document.getElementById('title-player').innerText = t.player;
}

function makeDraggable(el) {
    let p1 = 0, p2 = 0, p3 = 0, p4 = 0;
    const header = el.querySelector('.card-header');
    header.onmousedown = (e) => {
        if (e.target.classList.contains('dot')) return;
        e.preventDefault();
        p3 = e.clientX; p4 = e.clientY;
        document.onmousemove = (e) => {
            p1 = p3 - e.clientX; p2 = p4 - e.clientY;
            p3 = e.clientX; p4 = e.clientY;
            el.style.top = (el.offsetTop - p2) + "px";
            el.style.left = (el.offsetLeft - p1) + "px";
            el.style.bottom = "auto";
        };
        document.onmouseup = () => { document.onmousemove = null; };
    };
}

function celebrateRandom() {
    const palletes = [['#66c0f4', '#fff'], ['#a855f7', '#ec4899'], ['#ffbd2e', '#ff5f56']];
    
    const randomX = Math.random(); 
    const randomY = Math.random() * 0.4 + 0.3; 

    confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: randomX, y: randomY },
        colors: palletes[Math.floor(Math.random() * palletes.length)]
    });
}

function toggleWin(id) {
    const w = document.getElementById(id);
    w.classList.add('hidden-win');
    setTimeout(() => w.classList.remove('hidden-win'), 2000);
}

const audio = document.getElementById('bg-audio');
const playBtn = document.getElementById('play-pause');

playBtn.onclick = () => {
    if (audio.paused) { audio.play(); playBtn.innerHTML = '<i class="fas fa-pause"></i>'; }
    else { audio.pause(); playBtn.innerHTML = '<i class="fas fa-play"></i>'; }
};

audio.ontimeupdate = () => {
    document.getElementById('progress-slider').value = (audio.currentTime / audio.duration) * 100 || 0;
    document.getElementById('current-time').innerText = Math.floor(audio.currentTime/60) + ":" + ("0"+Math.floor(audio.currentTime%60)).slice(-2);
};

audio.onloadedmetadata = () => {
    document.getElementById('duration').innerText = Math.floor(audio.duration/60) + ":" + ("0"+Math.floor(audio.duration%60)).slice(-2);
};

document.getElementById('progress-slider').oninput = (e) => audio.currentTime = (e.target.value/100) * audio.duration;
document.getElementById('volume-slider').oninput = (e) => audio.volume = e.target.value;

window.onload = () => {
    applyLanguage();
    makeDraggable(document.getElementById("bio-card"));
    makeDraggable(document.getElementById("music-player"));
    const birth = new Date(2013, 5, 10);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    if (now.getMonth() < 5 || (now.getMonth() === 5 && now.getDate() < 10)) age--;
    document.getElementById('age').innerText = age;
};