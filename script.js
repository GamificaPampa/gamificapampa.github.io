document.documentElement.classList.add('js');

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (selector) => document.querySelector(selector);

// Revealing sections and filling the level blocks as they enter the screen.
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const element = entry.target;
    element.classList.add('is-visible');
    if (element.matches('.level')) {
      const progress = Number(element.dataset.progress);
      element.querySelectorAll('.blocks span').forEach((block, index) => block.classList.toggle('on', index < progress));
      const plus = Object.assign(document.createElement('span'), { className: 'plus', textContent: `+${progress * 10} XP` });
      setTimeout(() => element.append(plus), 700);
      setTimeout(() => plus.remove(), 1800);
    }
    revealObserver.unobserve(element);
  }
}, { threshold: 0.25 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Growing the striped XP bar under the nav as the visitor scrolls the page.
const scrollBar = $('#scrollxp');
const updateScrollBar = () => {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  scrollBar.style.width = `${scrollable > 0 ? (scrollY / scrollable) * 100 : 0}%`;
};
addEventListener('scroll', updateScrollBar, { passive: true });
updateScrollBar();

// Running the hero mini game, where clicks on the trophy and coins earn XP and level up.
const game = $('#game');
const effects = $('#fx');
const missions = [
  'Missão desbloqueada: criar sua primeira aula gamificada',
  'Missão desbloqueada: montar um ranking da turma',
  'Missão desbloqueada: dar medalhas por conquista',
  'Missão desbloqueada: criar desafios com ajuda da IA',
  'Você zerou o jogo! Agora é a vez da sua turma.',
];
let experience = 0;
let level = 1;

const bump = (element) => {
  element.classList.remove('bump');
  void element.offsetWidth;
  element.classList.add('bump');
};

// Positioning each effect relative to the game screen, at the point of the click.
const pointIn = (event) => {
  const box = game.getBoundingClientRect();
  return { x: event.clientX - box.left, y: event.clientY - box.top };
};

const spawn = (className, x, y, styles = {}, text = '') => {
  const element = Object.assign(document.createElement('span'), { className, textContent: text });
  Object.assign(element.style, { left: `${x}px`, top: `${y}px`, ...styles });
  effects.append(element);
  element.addEventListener('animationend', () => element.remove());
};

// Throwing square pixels in random directions, like the debris of a retro explosion.
const burst = (x, y, count, spread, colors = ['#F07916', '#FFFFFF', '#FCE4CC']) => {
  if (reducedMotion) return;
  for (let index = 0; index < count; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const distance = spread * (0.4 + Math.random() * 0.6);
    spawn('bit', x, y, {
      '--x': `${Math.cos(angle) * distance}px`,
      '--y': `${Math.sin(angle) * distance + spread * 0.3}px`,
      '--r': `${Math.random() * 360}deg`,
      '--t': `${0.6 + Math.random() * 0.6}s`,
      '--c': colors[index % colors.length],
    });
  }
};

const levelUp = () => {
  level += 1;
  $('#level').textContent = level;
  bump($('#level'));
  $('#caption').textContent = missions[Math.min(level - 1, missions.length - 1)];
  game.classList.remove('level-up');
  void game.offsetWidth;
  game.classList.add('level-up');
  const box = game.getBoundingClientRect();
  spawn('banner', box.width / 2, box.height * 0.42, {}, 'SUBIU DE NÍVEL!');
  burst(box.width / 2, box.height * 0.45, 48, 260);
};

const gain = (points, x, y) => {
  experience += points;
  spawn('plus', x, y - 20, {}, `+${points} XP`);
  if (experience >= 100) {
    experience -= 100;
    levelUp();
  }
  $('#xp').style.width = `${experience}%`;
  $('#xp-count').textContent = (level - 1) * 100 + experience;
  bump($('#xp-count'));
};

$('#trophy').addEventListener('click', (event) => {
  const point = event.detail ? pointIn(event) : { x: game.clientWidth / 2, y: game.clientHeight / 2 };
  const trophy = event.currentTarget;
  trophy.classList.add('hit');
  setTimeout(() => trophy.classList.remove('hit'), 120);
  burst(point.x, point.y, 12, 90);
  gain(10, point.x, point.y);
});

// Collecting a floating coin gives more XP, and the coin comes back after a few seconds.
document.querySelectorAll('.coin').forEach((coin) => {
  coin.addEventListener('click', (event) => {
    const point = pointIn(event);
    coin.classList.add('collected');
    burst(point.x, point.y, 10, 70, ['#F07916', '#FCE4CC']);
    gain(25, point.x, point.y);
    setTimeout(() => coin.classList.remove('collected'), 3000);
  });
});

// Filling part of the bar on load, so the first visit already shows progress.
setTimeout(() => gain(40, game.clientWidth * 0.62, 70), reducedMotion ? 0 : 900);

// Tilting the game screen in 3D as the mouse moves over the hero.
if (!reducedMotion && matchMedia('(pointer: fine)').matches) {
  $('.hero').addEventListener('pointermove', (event) => {
    const box = game.getBoundingClientRect();
    const tiltX = ((event.clientX - box.left) / box.width - 0.5) * 10;
    const tiltY = ((event.clientY - box.top) / box.height - 0.5) * -10;
    game.style.transform = `perspective(900px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
  });
  $('.hero').addEventListener('pointerleave', () => { game.style.transform = ''; });
}
