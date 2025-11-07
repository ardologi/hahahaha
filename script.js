// 🌌 Background bintang
const canvasStars = document.getElementById("stars");
const ctxStars = canvasStars.getContext("2d");
let w, h, stars;

function initStars() {
  w = canvasStars.width = window.innerWidth;
  h = canvasStars.height = window.innerHeight;
  stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.2,
    d: Math.random() * 0.5,
  }));
}

function drawStars() {
  ctxStars.clearRect(0, 0, w, h);
  ctxStars.fillStyle = "white";
  stars.forEach((s) => {
    ctxStars.beginPath();
    ctxStars.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctxStars.fill();
  });
  moveStars();
}

function moveStars() {
  stars.forEach((s) => {
    s.y += s.d;
    if (s.y > h) s.y = 0;
  });
}

function animateStars() {
  drawStars();
  requestAnimationFrame(animateStars);
}
window.addEventListener("resize", initStars);
initStars();
animateStars();

// 💗 Hati klik animasi teks & partikel
const heart = document.getElementById("heart");
const words = [
  "Hi Nadine",
  "Halo Nadine",
  "Nadine",
  "Nadine Nadine",
  "P Nadine",
  "Hai Nadine",
  "💫",
  "Nadine Nadine Nadine",
  "Nadine Nadine Nadine Nadine",
];

heart.addEventListener("click", () => {
  const rect = heart.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 💬 Animasi teks
  for (let i = 0; i < 8; i++) {
    const text = document.createElement("div");
    text.className = "text";
    text.textContent = words[Math.floor(Math.random() * words.length)];
    document.body.appendChild(text);
    text.style.left = `${centerX}px`;
    text.style.top = `${centerY}px`;
    text.style.opacity = 1;

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 200;
    const targetX = centerX + Math.cos(angle) * distance;
    const targetY = centerY + Math.sin(angle) * distance;
    const rotation = (Math.random() - 0.5) * 60;

    text.animate(
      [
        { transform: `translate(0,0) scale(0.6) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate(${targetX - centerX}px, ${
            targetY - centerY
          }px) scale(1.2) rotate(${rotation}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 3500 + Math.random() * 1500,
        easing: "ease-out",
        fill: "forwards",
      }
    );

    setTimeout(() => text.remove(), 5000);
  }

  // ✨ Partikel “debu cinta”
  spawnParticles(centerX, centerY);
});

// 🌟 Efek partikel kecil
const canvasParticles = document.getElementById("particles");
const ctxP = canvasParticles.getContext("2d");
canvasParticles.width = window.innerWidth;
canvasParticles.height = window.innerHeight;
let particles = [];

function spawnParticles(x, y) {
  for (let i = 0; i < 40; i++) {
    particles.push({
      x,
      y,
      size: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 30 + 330}, 100%, ${
        Math.random() * 40 + 50
      }%)`,
      velocityX: (Math.random() - 0.5) * 5,
      velocityY: (Math.random() - 0.5) * 5,
      life: 1,
    });
  }
}

function animateParticles() {
  ctxP.clearRect(0, 0, canvasParticles.width, canvasParticles.height);
  particles.forEach((p, i) => {
    p.x += p.velocityX;
    p.y += p.velocityY;
    p.life -= 0.02;
    p.size *= 0.97;
    if (p.life <= 0) particles.splice(i, 1);
    ctxP.beginPath();
    ctxP.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctxP.fillStyle = p.color;
    ctxP.globalAlpha = p.life;
    ctxP.fill();
    ctxP.globalAlpha = 1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

const audio = document.getElementById("bg-music");
const bars = document.querySelectorAll(".bar");

window.addEventListener("load", () => {
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Beberapa browser butuh interaksi user dulu
      document.body.addEventListener("click", () => audio.play(), {
        once: true,
      });
    });
  }
});

setInterval(() => {
  bars.forEach((bar) => {
    bar.style.height = `${10 + Math.random() * 25}px`;
  });
}, 180);
