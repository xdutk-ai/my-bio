// ТВІЙ ОНОВЛЕНИЙ ПРИЦІЛ
const myCrosshair = "CSGO-sABZu-4owC8-jnHXD-Z3qXe-2TOpP"; 

// Функція копіювання прицілу
function copyCrosshair() {
    navigator.clipboard.writeText(myCrosshair).then(() => {
        alert("Приціл скопійовано!");
    });
}

// Пасхалка з аватаром
let avatarClicks = 0;
function clickAvatar() {
    avatarClicks++;
    if (avatarClicks >= 5) {
        const avatar = document.getElementById('main-avatar');
        avatar.classList.add('shake-it');
        setTimeout(() => {
            avatar.classList.remove('shake-it');
            avatarClicks = 0;
        }, 1500);
    }
}

// Функція перетягування вікон (з обмеженням екрана)
function makeDraggable(el, handleId) {
    let p1 = 0, p2 = 0, p3 = 0, p4 = 0;
    const handle = document.getElementById(handleId);
    handle.onmousedown = (e) => {
        if (e.target.classList.contains('dot')) return;
        e.preventDefault();
        p3 = e.clientX; p4 = e.clientY;
        document.onmousemove = (e) => {
            p1 = p3 - e.clientX; p2 = p4 - e.clientY;
            p3 = e.clientX; p4 = e.clientY;
            
            let newTop = el.offsetTop - p2;
            let newLeft = el.offsetLeft - p1;

            // ОБМЕЖЕННЯ (Борти екрана)
            const maxTop = window.innerHeight - el.offsetHeight;
            const maxLeft = window.innerWidth - el.offsetWidth;

            if (newTop < 0) newTop = 0;
            if (newTop > maxTop) newTop = maxTop;
            if (newLeft < 0) newLeft = 0;
            if (newLeft > maxLeft) newLeft = maxLeft;

            el.style.top = newTop + "px";
            el.style.left = newLeft + "px";
            el.style.bottom = "auto"; el.style.right = "auto";
        };
        document.onmouseup = () => { document.onmousemove = null; };
    };
}

// Конфеті
function celebrateRandom() {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}

// Анімація закриття/відкриття (зменшення)
function toggleWin(id) {
    const w = document.getElementById(id);
    w.style.opacity = "0.2";
    w.style.transform = "scale(0.95)"; 
    setTimeout(() => {
        w.style.opacity = "1";
        w.style.transform = "scale(1)";
    }, 1200);
}

// Музичний плеєр
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

document.getElementById('progress-slider').oninput = (e) => audio.currentTime = (e.target.value/100) * audio.duration;
document.getElementById('volume-slider').oninput = (e) => audio.volume = e.target.value;

// Запуск при завантаженні
window.onload = () => {
    makeDraggable(document.getElementById("bio-card"), "bio-handle");
    makeDraggable(document.getElementById("music-player"), "player-handle");
};