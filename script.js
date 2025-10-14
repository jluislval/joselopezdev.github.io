// Animación del fondo
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x; this.y = y;
    this.dirX = dirX; this.dirY = dirY;
    this.size = size; this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0)
      this.dirX = -this.dirX;
    if (this.y + this.size > canvas.height || this.y - this.size < 0)
      this.dirY = -this.dirY;
    this.x += this.dirX;
    this.y += this.dirY;
    this.draw();
  }
}

let particlesArray = [];
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * (innerWidth - size * 2) + size;
    const y = Math.random() * (innerHeight - size * 2) + size;
    const dirX = (Math.random() - 0.5) * 0.5;
    const dirY = (Math.random() - 0.5) * 0.5;
    const color = '#58a6ff';
    particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
  }
}
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particlesArray.forEach(p => p.update());
}
window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  initParticles();
});
initParticles();
animate();

// Cargar proyectos dinámicamente
async function cargarProyectos() {
  try {
    const res = await fetch('projects.json');
    const data = await res.json();
    const contenedor = document.getElementById('projectGrid');

    data.forEach(proy => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h3>${proy.titulo}</h3>
        <p>${proy.descripcion}</p>
        <a href="${proy.url}" target="_blank">Ver proyecto</a>
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar los proyectos:", error);
  }
}

document.addEventListener('DOMContentLoaded', cargarProyectos);
