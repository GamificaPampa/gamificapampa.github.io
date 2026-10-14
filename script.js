document.documentElement.classList.add('js');

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (selector) => document.querySelector(selector);

// Restarting a CSS animation class, so the same effect can play again on every hit.
const replay = (element, className) => {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
};

// Opening and closing the section menu on small screens, and closing it after a pick.
const nav = $('.nav');
const menuButton = $('#menu-button');
const setMenu = (open) => {
  nav.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
};
menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
nav.querySelectorAll('.nav__links a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

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
      setTimeout(() => element.append(plus), 900);
      setTimeout(() => plus.remove(), 2000);
    }
    revealObserver.unobserve(element);
  }
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Sliding the striped XP bar under the nav as the visitor scrolls the page.
const scrollBar = $('#scrollxp');
const updateScrollBar = () => {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  const progress = scrollable > 0 ? (scrollY / scrollable) * 100 : 0;
  scrollBar.style.transform = `translateX(${progress - 100}%)`;
};
addEventListener('scroll', updateScrollBar, { passive: true });
updateScrollBar();

// Running the hero mini game, where clicks on the trophy and coins earn XP and level up.
const game = $('#game');
const effects = $('#fx');
const heroBot = $('#hero-bot');
const missions = [
  'Missão desbloqueada: criar sua primeira aula gamificada',
  'Missão desbloqueada: montar um ranking da turma',
  'Missão desbloqueada: dar medalhas por conquista',
  'Missão desbloqueada: criar desafios com ajuda da IA',
  'Você zerou o jogo! Agora é a vez da sua turma.',
];
let experience = 0;
let level = 1;

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
const burst = (x, y, count, spread, colors = ['#ffd23f', '#ff5f8f', '#4fd6a6', '#4da3ff', '#ffffff']) => {
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
  replay($('#level'), 'bump');
  $('#caption').textContent = missions[Math.min(level - 1, missions.length - 1)];
  replay(game, 'level-up');
  if (!reducedMotion) replay(heroBot, 'jump');
  const box = game.getBoundingClientRect();
  spawn('banner', box.width / 2, box.height * 0.42, {}, 'SUBIU DE NÍVEL!');
  burst(box.width / 2, box.height * 0.45, 48, 260);
};

// Letting Bit go back to its idle bobbing once the jump ends.
heroBot.addEventListener('animationend', () => heroBot.classList.remove('jump'));

const gain = (points, x, y) => {
  experience += points;
  spawn('plus', x, y - 20, {}, `+${points} XP`);
  if (experience >= 100) {
    experience -= 100;
    levelUp();
  }
  $('#xp').style.transform = `translateX(${experience - 100}%)`;
  $('#xp-count').textContent = (level - 1) * 100 + experience;
  replay($('#xp-count'), 'bump');
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
    burst(point.x, point.y, 10, 70, ['#ffd23f', '#ffffff']);
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

// Opening each project sheet in a dialog, closing it on the X, on Esc or on a click outside.
document.querySelectorAll('[data-ficha]').forEach((button) => {
  const sheet = document.getElementById(button.dataset.ficha);
  button.addEventListener('click', () => sheet.showModal());
});
document.querySelectorAll('dialog.ficha').forEach((sheet) => {
  sheet.addEventListener('click', (event) => { if (event.target === sheet) sheet.close(); });
});

// Building the e-mail to both coordinators from the form, so the visitor only needs to press send.
const mailer = document.forms.mailer;
const recipients = 'silvioquincozes@unipampa.edu.br,paulosilas@unipampa.edu.br';
const projectNames = { ambos: 'o Educador 5.0 e o GamificaEdu', educador: 'o Educador 5.0', gamificaedu: 'o GamificaEdu' };
const roles = {
  professor: (school) => `sou professor(a) na escola ${school}`,
  gestao: (school) => `faço parte da equipe gestora da escola ${school}`,
  outro: (school) => `trabalho na escola ${school}`,
};
const composeMail = () => {
  const name = mailer.elements.nome.value.trim() || '[seu nome]';
  const school = mailer.elements.escola.value.trim() || '[nome da escola]';
  const projects = projectNames[mailer.elements.projeto.value];
  const extra = mailer.elements.mensagem.value.trim();
  const subject = `Interesse em levar ${projects} para a escola ${school}`;
  const body = [
    'Olá, Prof. Silvio e Prof. Paulo!',
    '',
    `Meu nome é ${name} e ${roles[mailer.elements.funcao.value](school)}.`,
    `Conheci o GamificaPampa e tenho interesse em levar ${projects} para a nossa escola. Podemos conversar sobre os próximos passos?`,
    ...(extra ? ['', extra] : []),
    '',
    'Obrigado(a)!',
    name,
  ].join('\n');
  return { subject, body };
};
const updateMail = () => {
  const { subject, body } = composeMail();
  const encoded = { su: encodeURIComponent(subject), body: encodeURIComponent(body) };
  $('#mail-app').href = `mailto:${recipients}?subject=${encoded.su}&body=${encoded.body}`;
  $('#mail-gmail').href = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipients}&su=${encoded.su}&body=${encoded.body}`;
};
mailer.addEventListener('input', updateMail);
mailer.addEventListener('submit', (event) => event.preventDefault());
updateMail();

// Copying the addresses and the message, for people who use another webmail.
$('#mail-copy').addEventListener('click', async (event) => {
  const label = event.currentTarget.querySelector('span');
  const { subject, body } = composeMail();
  try {
    await navigator.clipboard.writeText(`Para: ${recipients.replace(',', ', ')}\nAssunto: ${subject}\n\n${body}`);
    label.textContent = 'Mensagem copiada!';
  } catch {
    label.textContent = 'Não deu para copiar';
  }
  setTimeout(() => { label.textContent = 'Copiar mensagem'; }, 2200);
});

// Jumping from a project sheet to the e-mail form with that project already picked.
document.querySelectorAll('[data-contato]').forEach((link) => {
  link.addEventListener('click', () => {
    link.closest('dialog').close();
    mailer.elements.projeto.value = link.dataset.contato;
    updateMail();
  });
});
