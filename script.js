/* в•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђ
   xdutk вЂ” script.js
   в•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђ */
'use strict';
document.documentElement.classList.add('loading-site');

const CS_CODE = "CSGO-sABZu-4owC8-jnHXD-Z3qXe-2TOpP";

/* в•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђ
   Р›РћРљРђР›Р†Р—РђР¦Р†РЇ
в•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђ */
const LANGS = {
    uk: {
        badge:    '\u042f \u043b\u044e\u0431\u043b\u044e \u0441\u043e\u0431\u0430\u043a <3',
        tg:       '\u043d\u0430\u043f\u0438\u0441\u0430\u0442\u0438 \u043c\u0435\u043d\u0456',
        cs:       '\u041f\u0440\u0438\u0446\u0456\u043b CS',
        mc:       '\u0417\u0431\u0456\u0440\u043a\u0430 Minecraft',
        steam:    'Steam',
        copied:   '\u0421\u043a\u043e\u043f\u0456\u0439\u043e\u0432\u0430\u043d\u043e!',
        copyFail: '\u041d\u0435 \u0432\u0434\u0430\u043b\u043e\u0441\u044f :(',
        barTitle: 'bio.app',
    },
    ru: {
        badge:    '\u042f \u043b\u044e\u0431\u043b\u044e \u0441\u043e\u0431\u0430\u043a <3',
        tg:       '\u043d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043c\u043d\u0435',
        cs:       '\u041f\u0440\u0438\u0446\u0435\u043b CS',
        mc:       '\u0421\u0431\u043e\u0440\u043a\u0430 Minecraft',
        steam:    'Steam',
        copied:   '\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e!',
        copyFail: '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c :(',
        barTitle: 'bio.app',
    },
    en: {
        badge:    'I love dogs <3',
        tg:       'write to me',
        cs:       'CS crosshair',
        mc:       'Minecraft pack',
        steam:    'Steam',
        copied:   'Copied!',
        copyFail: 'Failed :(',
        barTitle: 'bio.app',
    },
    de: {
        badge:    'Ich liebe Hunde <3',
        tg:       'Schreib mir',
        cs:       'CS Fadenkreuz',
        mc:       'Minecraft-Mod',
        steam:    'Steam',
        copied:   'Kopiert!',
        copyFail: 'Fehler :(',
        barTitle: 'bio.app',
    },
    pl: {
        badge:    'Kocham psy <3',
        tg:       'napisz do mnie',
        cs:       'Celownik CS',
        mc:       'Paczka Minecraft',
        steam:    'Steam',
        copied:   'Skopiowano!',
        copyFail: 'Blad :(',
        barTitle: 'bio.app',
    },
    fr: {
        badge:    "J'adore les chiens <3",
        tg:       'ecris-moi',
        cs:       'Viseur CS',
        mc:       'Pack Minecraft',
        steam:    'Steam',
        copied:   'Copie !',
        copyFail: 'Echec :(',
        barTitle: 'bio.app',
    },
};
function detectLang() {
    const prefs = navigator.languages || [navigator.language || 'en'];
    for (const p of prefs) {
        const s = p.toLowerCase().split('-')[0];
        if (LANGS[s]) return s;
    }
    return 'en';
}

const lang = detectLang();
const T    = LANGS[lang];

function applyLang() {
    const typedBio = document.getElementById('typed-text');
    const bio = document.querySelector('.userbio');
    if (typedBio) typedBio.textContent = T.badge;
    else if (bio) bio.textContent = T.badge;
    document.querySelectorAll('[data-key]').forEach(el => {
        const k = el.dataset.key;
        if (T[k] !== undefined) el.textContent = T[k];
    });
}

/* в•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђ
   РљРЈР РЎРћР 
в•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђ */
let curDot, curRing;
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let cursorReady = false;
let lastTrailAt = 0;
let cursorHovering = false;

function initCursor() {
    curDot  = document.getElementById('cursor-dot');
    curRing = document.getElementById('cursor-ring');

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) {
        document.documentElement.classList.add('native-cursor');
        if (curDot) curDot.remove();
        if (curRing) curRing.remove();
        return;
    }

    if (!curDot || !curRing) {
        document.documentElement.classList.add('native-cursor');
        return;
    }

    document.documentElement.classList.remove('native-cursor');

    document.addEventListener('pointermove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!cursorReady) {
            ringX = mouseX;
            ringY = mouseY;
            cursorReady = true;
            curDot.classList.add('ready');
            curRing.classList.add('ready');
        }

        curDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        const now = performance.now();
        if (!cursorHovering && now - lastTrailAt > 90) {
            lastTrailAt = now;
            const t = document.createElement('div');
            t.className = 'c-trail';
            const s = 3 + Math.random() * 3;
            t.style.cssText = `left:${mouseX}px;top:${mouseY}px;width:${s}px;height:${s}px`;
            document.body.appendChild(t);
            setTimeout(() => t.remove(), 360);
        }
    }, { passive: true });

    function ringLoop() {
        ringX += (mouseX - ringX) * 0.32;
        ringY += (mouseY - ringY) * 0.32;
        curRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(ringLoop);
    }
    ringLoop();

    const hoverTargets = 'a, button, .dot, input, .avatar-wrap, .pl-pause-btn';
    document.addEventListener('pointerover', e => {
        const h = !!e.target.closest(hoverTargets);
        curDot.classList.toggle('hov', h);
        curRing.classList.toggle('hov', h);
    }, { passive: true });

    document.addEventListener('pointerout', e => {
        if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest(hoverTargets)) {
            curDot.classList.remove('hov');
            curRing.classList.remove('hov');
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        curDot.classList.remove('ready', 'hov');
        curRing.classList.remove('ready', 'hov');
        cursorReady = false;
    }, { passive: true });
}

let fwCd = false;
const PALETTES = {
    cool: ['#66c0f4','#ffffff','#bd93f9','#8be9fd','#50fa7b'],
    fire: ['#ff5555','#ffb86c','#f1fa8c','#ff79c6','#ffffff'],
    gold: ['#ffd700','#ffec8b','#fff8dc','#ffa500','#ffffff'],
    all:  ['#ff5555','#ffb86c','#f1fa8c','#50fa7b','#8be9fd','#bd93f9','#ff79c6','#ffffff'],
};

function burst(x, y, colors, count = 80, spread = 70, decay = 0.92) {
    confetti({ particleCount:count, spread, startVelocity:55, decay, gravity:0.9,
        origin:{x:x/innerWidth, y:y/innerHeight}, colors, ticks:200, scalar:1.1, shapes:['circle','square'] });
}

function shootFireworks() {
    if (fwCd) return;
    fwCd = true;
    const dot = document.getElementById('green-dot');
    dot.classList.add('cd');
    const roll = Math.random();

    if (roll < 0.33) {
        burst(innerWidth/2, innerHeight*0.55, PALETTES.all, 120, 100, 0.9);
        setTimeout(() => { burst(innerWidth*.15,innerHeight*.5,PALETTES.cool,70,80,.91); burst(innerWidth*.85,innerHeight*.5,PALETTES.fire,70,80,.91); }, 250);
        setTimeout(() => burst(innerWidth/2, innerHeight*0.4, PALETTES.gold, 100, 120, 0.89), 500);
        resetDot(dot, 3500);
    } else if (roll < 0.66) {
        [0.2,0.5,0.8,0.35,0.65].forEach((xr,i) => setTimeout(() =>
            confetti({particleCount:90,spread:55,startVelocity:75,decay:.91,gravity:.85,angle:90,
                origin:{x:xr,y:1}, colors:[PALETTES.cool,PALETTES.gold,PALETTES.fire,PALETTES.all,PALETTES.cool][i],
                ticks:250,scalar:1.15,shapes:['circle','square']}), i*300));
        resetDot(dot, 4500);
    } else {
        const end = Date.now() + 4000;
        (function frame() {
            confetti({particleCount:4,spread:80,startVelocity:8,decay:.94,gravity:.55,angle:270,
                origin:{x:Math.random(),y:-0.05},colors:PALETTES.all,ticks:260,scalar:.9,
                shapes:['circle','square'],drift:(Math.random()-.5)*.5});
            if (Date.now() < end) requestAnimationFrame(frame);
        })();
        setTimeout(() => burst(innerWidth/2,innerHeight*.5,PALETTES.all,150,130,.88), 3800);
        resetDot(dot, 5500);
    }
}
function resetDot(dot, delay) { setTimeout(() => { fwCd=false; dot.classList.remove('cd'); }, delay); }

// RAGE + SMOKE
const smkBox  = document.getElementById('smoke-box');
const avWrap  = document.getElementById('avatar-wrap');
const avNorm  = document.getElementById('av-normal');
const avAngy  = document.getElementById('av-angry');
let   smkTimer = null;

function startRage() {
    avWrap.classList.add('rage');
    avNorm.classList.replace('shown','hidden');
    avAngy.classList.replace('hidden','shown');
    if (!smkTimer) smkTimer = setInterval(() => {
        const rc = avWrap.getBoundingClientRect();
        for (let i=0;i<2;i++) {
            const p=document.createElement('div'); p.className='smoke-p';
            const sz=16+Math.random()*18;
            p.style.cssText=`left:${rc.left+rc.width/2+(Math.random()*54-27)}px;top:${rc.top+8}px;width:${sz}px;height:${sz}px;--dx:${(Math.random()*90-45)}px`;
            smkBox.appendChild(p); setTimeout(()=>p.remove(),1700);
        }
    }, 62);
}
function stopRage() {
    avWrap.classList.remove('rage');
    avAngy.classList.replace('shown','hidden');
    avNorm.classList.replace('hidden','shown');
    clearInterval(smkTimer); smkTimer=null;
}


function initRageHold() {
    if (!avWrap) return;
    const start = (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        startRage();
    };
    const stop = () => stopRage();
    avWrap.addEventListener('pointerdown', start);
    avWrap.addEventListener('pointerup', stop);
    avWrap.addEventListener('pointerleave', stop);
    avWrap.addEventListener('pointercancel', stop);
    avWrap.addEventListener('contextmenu', e => e.preventDefault());
}
// COPY CS
function copyCS(btn) {
    const tip = btn.querySelector('.copy-tip');
    navigator.clipboard.writeText(CS_CODE).then(() => {
        tip.textContent = T.copied;
        tip.classList.add('show');
        setTimeout(() => tip.classList.remove('show'), 1900);
    }).catch(() => {
        tip.textContent = T.copyFail;
        tip.classList.add('show');
        setTimeout(() => { tip.classList.remove('show'); tip.textContent=T.copied; }, 2100);
    });
}

// CARD CONTROLS
function closeCard() {
    const c = document.getElementById('bio-card');
    if (!c) return;
    c.classList.add('closed');
    setTimeout(() => c.classList.remove('closed'), 300);
}

function collapseCard() {
    const c = document.getElementById('bio-card');
    if (!c) return;
    c.classList.toggle('minimized');
}

// DRAG
function makeDraggable(cardId, handleId) {
    if (cardId === 'player') return;

    const card = document.getElementById(cardId);
    const hndl = document.getElementById(handleId);
    if (!card || !hndl) return;

    const margin = 14;
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    let drag = null;

    function place(left, top) {
        const maxLeft = Math.max(margin, window.innerWidth - card.offsetWidth - margin);
        const maxTop = Math.max(margin, window.innerHeight - card.offsetHeight - margin);
        card.style.left = clamp(left, margin, maxLeft) + 'px';
        card.style.top = clamp(top, margin, maxTop) + 'px';
        card.style.right = 'auto';
        card.style.bottom = 'auto';
        card.style.transform = 'none';
    }

    function centerCard() {
        place((window.innerWidth - card.offsetWidth) / 2, (window.innerHeight - card.offsetHeight) / 2);
    }

    requestAnimationFrame(centerCard);

    hndl.addEventListener('pointerdown', e => {
        if (e.target.closest('button, input, .dot')) return;
        e.preventDefault();

        const r = card.getBoundingClientRect();
        place(r.left, r.top);
        drag = {
            pointerId: e.pointerId,
            dx: e.clientX - r.left,
            dy: e.clientY - r.top
        };

        card.classList.add('dragging');
        document.documentElement.classList.add('is-dragging-window');
        hndl.setPointerCapture?.(e.pointerId);
    });

    hndl.addEventListener('pointermove', e => {
        if (!drag || e.pointerId !== drag.pointerId) return;
        place(e.clientX - drag.dx, e.clientY - drag.dy);
    });

    function stop(e) {
        if (!drag || (e && e.pointerId !== drag.pointerId)) return;
        drag = null;
        card.classList.remove('dragging');
        document.documentElement.classList.remove('is-dragging-window');
    }

    hndl.addEventListener('pointerup', stop);
    hndl.addEventListener('pointercancel', stop);

    window.addEventListener('resize', () => {
        if (!card.style.left || !card.style.top) {
            centerCard();
            return;
        }
        place(parseFloat(card.style.left), parseFloat(card.style.top));
    });
}
// PLAYER
const audio  = document.getElementById('audio');
const pIcon  = document.getElementById('play-icon');
const prog   = document.getElementById('prog');
const vol    = document.getElementById('vol');
const curT   = document.getElementById('cur-t');
const totT   = document.getElementById('tot-t');
const fmt    = t => Math.floor(t/60)+':'+('0'+Math.floor(t%60)).slice(-2);

function togglePlay() {
    if (audio.paused) { audio.play();  pIcon.className='fas fa-pause'; }
    else              { audio.pause(); pIcon.className='fas fa-play';  }
}

audio.addEventListener('timeupdate', () => {
    prog.value = (audio.currentTime/audio.duration*100)||0;
    curT.textContent = fmt(audio.currentTime);
    if (!isNaN(audio.duration)) totT.textContent = fmt(audio.duration);
});

audio.addEventListener('loadedmetadata', () => {
    const src = audio.src.split('/').pop().replace(/\.[^.]+$/,'');
    const nameEl = document.getElementById('track-name');
    if (nameEl && nameEl.textContent === 'music.mp3') nameEl.textContent = src;
});

prog.addEventListener('input', () => { audio.currentTime = prog.value/100*audio.duration; });
vol.addEventListener('input',  () => { audio.volume = vol.value; });

/* в•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђ
   INIT
в•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђв•ђ */

function initExtraEasterEggs() {
    const card = document.getElementById('bio-card');
    const title = document.getElementById('bio-drag');
    const avatar = document.getElementById('avatar-wrap');
    if (!card) return;

    let typed = '';
    const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let k = 0;

    function toast(text) {
        const box = document.getElementById('notifications');
        if (!box) return;
        const n = document.createElement('div');
        n.className = 'notification';
        n.innerHTML = '<div class="notification-icon"><i class="fas fa-star"></i></div><div><span class="notification-title">Secret</span><span class="notification-message"></span></div>';
        n.querySelector('.notification-message').textContent = text;
        box.appendChild(n);
        setTimeout(() => { n.classList.add('hiding'); setTimeout(() => n.remove(), 260); }, 2600);
    }

    document.addEventListener('keydown', (e) => {
        typed = (typed + e.key.toLowerCase()).slice(-12);
        if (typed.endsWith('duck')) {
            shootFireworks();
            toast('duck mode');
        }
        if (typed.endsWith('xdutk')) {
            card.classList.toggle('secret-glow');
            toast('glass glow toggled');
        }

        if (e.key === konami[k]) {
            k += 1;
            if (k === konami.length) {
                k = 0;
                document.body.classList.toggle('party-mode');
                shootFireworks();
                toast('party mode');
            }
        } else {
            k = e.key === konami[0] ? 1 : 0;
        }
    });

    title?.addEventListener('dblclick', () => {
        card.classList.toggle('compact-window');
        toast('window shape switched');
    });

    avatar?.addEventListener('dblclick', () => {
        shootFireworks();
        toast('duck fireworks');
    });
}
window.addEventListener('load', () => {
    applyLang();
    initCursor();                    // в†ђ РљСѓСЂСЃРѕСЂ С‚РµРїРµСЂ С–РЅС–С†С–Р°Р»С–Р·СѓС”С‚СЊСЃСЏ С‚СѓС‚
    makeDraggable('bio-card', 'bio-drag');
    initRageHold();
    initExtraEasterEggs();
});
/* === FUF INSPIRED JS START === */
function initFufInspiredFeatures() {
    const $ = (sel) => document.querySelector(sel);
    const notifications = $('#notifications');
    const loader = $('#loader');
    const loaderSpinner = $('#loader-spinner');
    const loaderEnter = $('#loader-enter');
    const spotlightOverlay = $('#spotlight-overlay');
    const spotlightInput = $('#spotlight-input');
    const spotlightResults = $('#spotlight-results');
    const contextMenu = $('#context-menu');
    const keyboardHint = $('#keyboard-hint');
    const bioCard = $('#bio-card');
    const typedText = $('#typed-text');
    const textCursor = $('#text-cursor');
    const player = $('#player');
    const plArt = $('#pl-art');
    const audio = $('#audio');

    if (!bioCard) return;

    const actions = [
        { icon: 'fab fa-telegram-plane', title: 'Telegram', desc: 'Open your Telegram', run: () => window.open('https://t.me/xdutk', '_blank') },
        { icon: 'fas fa-crosshairs', title: 'CS crosshair', desc: 'Copy your CS code', run: () => copyText(CS_CODE, 'CS crosshair', 'Copied to clipboard') },
        { icon: 'fas fa-cube', title: 'Minecraft pack', desc: 'Download your pack', run: () => window.open('https://drive.google.com/uc?export=download&id=1og3EIBfLlzkgD0lJ263zr8THlrRXuH_3', '_blank') },
        { icon: 'fab fa-steam', title: 'Steam', desc: 'Open your Steam profile', run: () => window.open('https://steamcommunity.com/profiles/76561199841630286/', '_blank') },
        { icon: 'fas fa-magic', title: 'Fireworks', desc: 'Launch the green-button effect', run: () => shootFireworks() },
        { icon: 'fas fa-music', title: 'Music', desc: 'Play or pause the track', run: () => togglePlay() },
        { icon: 'fas fa-window-minimize', title: 'Collapse card', desc: 'Toggle the bio window', run: () => collapseCard() },
        { icon: 'fas fa-search', title: 'Tip', desc: 'Shake mouse to find cursor', run: () => showNotification('Cursor', 'Shake mouse to enlarge it', 'fas fa-mouse-pointer') },
    ];

    function showNotification(title, message, icon = 'fas fa-info') {
        if (!notifications) return;
        const n = document.createElement('div');
        n.className = 'notification';
        n.innerHTML = `<div class="notification-icon"><i class="${icon}"></i></div><div><span class="notification-title"></span><span class="notification-message"></span></div>`;
        n.querySelector('.notification-title').textContent = title;
        n.querySelector('.notification-message').textContent = message;
        notifications.appendChild(n);
        n.addEventListener('click', () => dismiss(n));
        setTimeout(() => dismiss(n), 3900);
    }

    function dismiss(node) {
        if (!node || node.classList.contains('hiding')) return;
        node.classList.add('hiding');
        setTimeout(() => node.remove(), 260);
    }

    function copyText(text, title, message) {
        const fallback = () => {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
            showNotification(title, message, 'fas fa-check');
        };
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(text).then(
                () => showNotification(title, message, 'fas fa-check'),
                fallback
            );
        } else {
            fallback();
        }
    }

    function renderSpotlight(query = '') {
        if (!spotlightResults) return;
        const q = query.trim().toLowerCase();
        const list = q ? actions.filter(a => (a.title + ' ' + a.desc).toLowerCase().includes(q)) : actions;
        spotlightResults.innerHTML = '';
        if (!list.length) {
            const empty = document.createElement('div');
            empty.className = 'spotlight-empty';
            empty.textContent = 'Nothing found';
            spotlightResults.appendChild(empty);
            return;
        }
        list.forEach((item) => {
            const row = document.createElement('div');
            row.className = 'spotlight-item';
            row.innerHTML = `<div class="spotlight-item-icon"><i class="${item.icon}"></i></div><div><span class="spotlight-item-title"></span><span class="spotlight-item-desc"></span></div>`;
            row.querySelector('.spotlight-item-title').textContent = item.title;
            row.querySelector('.spotlight-item-desc').textContent = item.desc;
            row.addEventListener('click', () => {
                closeSpotlight();
                item.run();
            });
            spotlightResults.appendChild(row);
        });
    }

    function openSpotlight() {
        if (!spotlightOverlay) return;
        renderSpotlight('');
        spotlightOverlay.hidden = false;
        if (keyboardHint) keyboardHint.style.opacity = '0';
        setTimeout(() => spotlightInput?.focus(), 30);
    }

    function closeSpotlight() {
        if (!spotlightOverlay) return;
        spotlightOverlay.hidden = true;
        if (keyboardHint) keyboardHint.style.opacity = '';
        if (spotlightInput) spotlightInput.value = '';
    }

    function renderContextMenu() {
        if (!contextMenu) return;
        contextMenu.innerHTML = '';
        [
            actions[0],
            actions[1],
            { sep: true },
            actions[4],
            actions[5],
            actions[6],
            { sep: true },
            { icon: 'fas fa-search', title: 'Search', run: openSpotlight },
        ].forEach((item) => {
            if (item.sep) {
                const sep = document.createElement('div');
                sep.className = 'context-menu-separator';
                contextMenu.appendChild(sep);
                return;
            }
            const row = document.createElement('div');
            row.className = 'context-menu-item';
            row.innerHTML = `<i class="${item.icon}"></i><span></span>`;
            row.querySelector('span').textContent = item.title;
            row.addEventListener('click', () => {
                contextMenu.hidden = true;
                item.run();
            });
            contextMenu.appendChild(row);
        });
    }

    function typeBio() {
        if (!typedText) return;
        const text = T?.badge || 'I love dogs <3';
        let i = 0;
        typedText.textContent = '';
        textCursor?.classList.remove('idle');

        const typeNext = () => {
            typedText.textContent = text.slice(0, i);
            i += 1;
            if (i <= text.length) {
                setTimeout(typeNext, 42 + Math.random() * 55);
            } else {
                setTimeout(() => textCursor?.classList.add('idle'), 1600);
            }
        };

        setTimeout(typeNext, 450);
    }
    function initLoader() {
        if (!loader) return;
        let ready = false;
        setTimeout(() => {
            ready = true;
            if (loaderSpinner) loaderSpinner.hidden = true;
            if (loaderEnter) loaderEnter.hidden = false;
        }, 850);

        loader.addEventListener('mousemove', (e) => {
            if (!ready || !loaderEnter) return;
            loaderEnter.style.left = `${e.clientX}px`;
            loaderEnter.style.top = `${e.clientY}px`;
        });

        const enter = () => {
            if (!ready) return;
            loader.classList.add('fadeOut');
            document.documentElement.classList.remove('loading-site');
            showNotification('Welcome', 'Press Ctrl + K for search', 'fas fa-search');
            setTimeout(() => loader.remove(), 650);
            if (audio && audio.paused) {
                audio.volume = 0;
                audio.play().then(() => {
                    let v = 0;
                    const target = Number(document.getElementById('vol')?.value || .5);
                    const fade = setInterval(() => {
                        v += .025;
                        audio.volume = Math.min(v, target);
                        if (v >= target) clearInterval(fade);
                    }, 45);
                }).catch(() => {});
            }
        };

        loader.addEventListener('click', enter);
        loaderEnter?.addEventListener('click', enter);
    }

    function initAudioBars() {
        if (!plArt || plArt.querySelector('.audio-bars')) return;
        const bars = document.createElement('div');
        bars.className = 'audio-bars';
        bars.innerHTML = '<span></span><span></span><span></span>';
        plArt.appendChild(bars);
        const sync = () => { player?.classList.toggle('playing', !audio?.paused); const icon = document.getElementById('play-icon'); if (icon) icon.className = audio?.paused ? 'fas fa-play' : 'fas fa-pause'; };
        audio?.addEventListener('play', sync);
        audio?.addEventListener('pause', sync);
        audio?.addEventListener('ended', sync);
        sync();
    }

    function initCursorShake() {
        const ring = document.getElementById('cursor-ring');
        let lastX = 0;
        const speeds = [];
        document.addEventListener('pointermove', (e) => {
            const speed = Math.abs(e.clientX - lastX);
            lastX = e.clientX;
            speeds.push(speed);
            if (speeds.length > 8) speeds.shift();
            const avg = speeds.reduce((a, b) => a + b, 0) / speeds.length;
            ring?.classList.toggle('cursor-shake', avg > 30);
        }, { passive: true });
    }

    renderContextMenu();
    initLoader();
    initAudioBars();
    initCursorShake();
    typeBio();

    keyboardHint?.addEventListener('click', openSpotlight);
    spotlightOverlay?.addEventListener('click', closeSpotlight);
    document.getElementById('spotlight')?.addEventListener('click', (e) => e.stopPropagation());
    spotlightInput?.addEventListener('input', (e) => renderSpotlight(e.target.value));

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            spotlightOverlay?.hidden ? openSpotlight() : closeSpotlight();
        }
        if (e.key === 'Escape') {
            closeSpotlight();
            if (contextMenu) contextMenu.hidden = true;
        }
    });

    bioCard.addEventListener('contextmenu', (e) => {
        if (!contextMenu) return;
        e.preventDefault();
        contextMenu.style.left = `${Math.min(e.clientX, innerWidth - 230)}px`;
        contextMenu.style.top = `${Math.min(e.clientY, innerHeight - 260)}px`;
        contextMenu.hidden = false;
    });

    document.addEventListener('click', (e) => {
        if (contextMenu && !contextMenu.hidden && !e.target.closest('#context-menu')) {
            contextMenu.hidden = true;
        }
    });
}

window.addEventListener('load', initFufInspiredFeatures);
/* === FUF INSPIRED JS END === */







