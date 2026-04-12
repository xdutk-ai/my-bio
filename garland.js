const canvas = document.getElementById('garland-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let points = [];
let sticks = [];
const numPoints = 25; // Кількість сегментів гірлянди (більше - м'якше висить)
const gravity = 0.5;
const friction = 0.98;
const bounce = 0.9;
const tension = 0.8; // Жорсткість дроту

let mouse = { x: 0, y: 0, down: false, p: null };

// Налаштування кольорів лампочок
const bulbColors = ['#ff5f56', '#ffbd2e', '#27c93f', '#66c0f4', '#a371f7'];

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    points = [];
    sticks = [];

    // Гірлянда висить дугою від краю до краю
    const startX = -50;
    const endX = width + 50;
    const gap = (endX - startX) / (numPoints - 1);
    const sagY = 150; // Наскільки сильно провисає дуга

    for (let i = 0; i < numPoints; i++) {
        let x = startX + i * gap;
        // Параболічна дуга
        let norm = i / (numPoints - 1);
        let y = 10 + Math.sin(norm * Math.PI) * sagY;

        points.push({
            x: x,
            y: y,
            oldX: x,
            oldY: y,
            pinned: (i === 0 || i === numPoints - 1), // Закріплюємо тільки краї
            color: bulbColors[i % bulbColors.length]
        });

        if (i > 0) {
            sticks.push({
                p0: points[i - 1],
                p1: points[i],
                length: gap * 0.9 // Дріт трохи коротший за відстань, щоб тягнуло
            });
        }
    }
}

function updatePoints() {
    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        if (!p.pinned) {
            let vx = (p.x - p.oldX) * friction;
            let vy = (p.y - p.oldY) * friction;

            p.oldX = p.x;
            p.oldY = p.y;
            p.x += vx;
            p.y += vy;
            p.y += gravity;
        }
    }
}

function updateSticks() {
    for (let i = 0; i < sticks.length; i++) {
        let s = sticks[i];
        let dx = s.p1.x - s.p0.x;
        let dy = s.p1.y - s.p0.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let difference = s.length - distance;
        let percent = difference / distance / 2;
        let offsetX = dx * percent * tension;
        let offsetY = dy * percent * tension;

        if (!s.p0.pinned) {
            s.p0.x -= offsetX;
            s.p0.y -= offsetY;
        }
        if (!s.p1.pinned) {
            s.p1.x += offsetX;
            s.p1.y += offsetY;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    // Малюємо дріт
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(20, 20, 20, 0.8)';
    for (let i = 0; i < sticks.length; i++) {
        let s = sticks[i];
        ctx.moveTo(s.p0.x, s.p0.y);
        ctx.lineTo(s.p1.x, s.p1.y);
    }
    ctx.stroke();

    // Малюємо лампочки
    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        
        // Світіння (Neon Glow)
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
        
        // Сама лампочка (яскравіша серцевина)
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.shadowBlur = 0; // Прибираємо тінь для центру
        ctx.fill();
    }
}

function loop() {
    updatePoints();
    // Декілька ітерацій для стабільності пружин
    for(let i=0; i<5; i++) {
        updateSticks();
    }
    
    // Взаємодія з мишкою
    if(mouse.down && mouse.p) {
        mouse.p.x = mouse.x;
        mouse.p.y = mouse.y;
    }
    
    draw();
    requestAnimationFrame(loop);
}

// Пошук найближчої точки до мишки
function findNearestPoint(x, y) {
    let nearest = null;
    let minDst = 20; // Радіус захвату

    for(let p of points) {
        if(p.pinned) continue;
        let dx = p.x - x;
        let dy = p.y - y;
        let dst = Math.sqrt(dx*dx + dy*dy);
        if(dst < minDst) {
            minDst = dst;
            nearest = p;
        }
    }
    return nearest;
}

// Івенти мишки
window.addEventListener('mousedown', e => {
    mouse.down = true;
    mouse.p = findNearestPoint(e.clientX, e.clientY);
});
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // Змінюємо курсор, якщо навели на лампочку
    canvas.style.cursor = findNearestPoint(e.clientX, e.clientY) ? 'grab' : 'default';
});
window.addEventListener('mouseup', () => {
    mouse.down = false;
    mouse.p = null;
});

window.addEventListener('resize', init);

init();
loop();