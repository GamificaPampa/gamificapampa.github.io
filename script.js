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

// Effects inside the hero game screen: pixel bursts and the banner, placed relative to the screen.
const effects = $('#fx');
const heroBot = $('#hero-bot');

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

// Every Bit jumps when clicked, and goes back to its idle bobbing once the jump ends.
document.querySelectorAll('.bot').forEach((bot) => {
  bot.addEventListener('click', () => { if (!reducedMotion) replay(bot, 'jump'); });
  bot.addEventListener('animationend', () => bot.classList.remove('jump'));
});

// The hero mini game: arrows build a program, Rodar runs it, and Bit walks the board to the star.
// Three phases, from a straight line to a path around the bugs, like the Robô pega a estrela game.
const levels = [
  { start: [0, 1], star: [3, 1], bugs: [], intro: 'Fase 1: a estrela está três casas à direita do Bit. Monte as setas e aperte Rodar.' },
  { start: [0, 0], star: [4, 2], bugs: [[2, 0], [2, 1]], intro: 'Fase 2: a estrela está mais abaixo, e há bugs no caminho reto. Desvie deles.' },
  { start: [0, 3], star: [5, 0], bugs: [[1, 2], [2, 0], [3, 2], [4, 1]], intro: 'Fase 3: a estrela está no canto de cima, à direita. Ache um caminho entre os bugs.' },
];
const steps = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const words = { up: 'cima', down: 'baixo', left: 'esquerda', right: 'direita' };
const columns = 6;
const rows = 4;
const maxMoves = 10;
const board = $('#board');
const gameStatus = $('#bit-status');
const programList = $('#program');
const pad = $('#pad');
const greeting = $('#hero-bubble').textContent;
let levelIndex = 0;
let program = [];
let running = false;

const cellAt = (x, y) => board.children[y * columns + x];
const same = (a, b) => a[0] === b[0] && a[1] === b[1];
const isBug = (x, y) => levels[levelIndex].bugs.some((bug) => same(bug, [x, y]));
const outside = (x, y) => x < 0 || y < 0 || x >= columns || y >= rows;
const placeBit = (x, y) => {
  bitToken.style.setProperty('--x', x);
  bitToken.style.setProperty('--y', y);
};

const bitToken = Object.assign(document.createElement('div'), { className: 'board__bit' });
bitToken.innerHTML = '<svg viewBox="0 0 100 100"><use href="#bot"/></svg>';

const drawLevel = () => {
  const level = levels[levelIndex];
  board.replaceChildren();
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const cell = Object.assign(document.createElement('div'), { className: 'cell' });
      if (same(level.star, [x, y])) {
        cell.classList.add('cell--star');
        cell.innerHTML = '<svg><use href="#star"/></svg>';
      } else if (isBug(x, y)) {
        cell.classList.add('cell--bug');
        cell.innerHTML = '<svg><use href="#bug"/></svg>';
      }
      board.append(cell);
    }
  }
  board.append(bitToken);
  placeBit(...level.start);
  $('#phase').textContent = `FASE ${levelIndex + 1} DE ${levels.length}`;
  gameStatus.textContent = level.intro;
  program = [];
  drawProgram();
};

// Showing the program as arrows and its path on the board, with an X where Bit would crash.
const drawProgram = () => {
  programList.replaceChildren(...program.map((move) => {
    const item = document.createElement('li');
    item.dataset.dir = move;
    item.innerHTML = `<svg width="18" height="18" aria-hidden="true"><use href="#arrow"/></svg><span class="sr">${words[move]}</span>`;
    return item;
  }));
  board.querySelectorAll('.cell').forEach((cell) => cell.classList.remove('is-plan', 'is-plan-bad'));
  let [x, y] = levels[levelIndex].start;
  for (const move of program) {
    x += steps[move][0];
    y += steps[move][1];
    if (outside(x, y)) break;
    if (isBug(x, y)) { cellAt(x, y).classList.add('is-plan-bad'); break; }
    cellAt(x, y).classList.add('is-plan');
  }
};

const addMove = (move) => {
  if (running || program.length >= maxMoves) return;
  program.push(move);
  drawProgram();
};

const finishGame = () => {
  pad.hidden = true;
  programList.hidden = true;
  $('#bit-end').hidden = false;
  gameStatus.textContent = 'Você programou o Bit! É assim que as crianças aprendem algoritmo nos nossos jogos: uma sequência de passos, na ordem certa.';
  $('#hero-bubble').textContent = 'Você me programou! Na turma, isso vira uma aula de algoritmo.';
};

const winPhase = () => {
  const stars = $('#stars').children;
  stars[levelIndex].classList.add('is-on');
  $('#stars').setAttribute('aria-label', `${levelIndex + 1} de 3 estrelas`);
  replay(machineScreen, 'is-won');
  const box = machineScreen.getBoundingClientRect();
  spawn('banner', box.width / 2, box.height * 0.4, {}, levelIndex === levels.length - 1 ? 'VOCÊ ZEROU!' : 'FASE CONCLUÍDA!');
  burst(box.width / 2, box.height * 0.4, 36, 200);
  if (!reducedMotion) replay(heroBot, 'jump');
  setTimeout(() => {
    running = false;
    pad.classList.remove('is-busy');
    if (levelIndex === levels.length - 1) { finishGame(); return; }
    levelIndex += 1;
    drawLevel();
  }, 1500);
};

// Running the program one step at a time; a bug, a wall or a short program sends Bit back to the start.
const run = () => {
  if (running) return;
  if (!program.length) { gameStatus.textContent = 'Primeiro monte o caminho com as setas.'; return; }
  running = true;
  pad.classList.add('is-busy');
  const level = levels[levelIndex];
  let [x, y] = level.start;
  let index = 0;
  const fail = (message) => {
    gameStatus.textContent = message;
    replay(bitToken, 'is-hit');
    setTimeout(() => {
      placeBit(...level.start);
      programList.querySelectorAll('.is-now').forEach((item) => item.classList.remove('is-now'));
      running = false;
      pad.classList.remove('is-busy');
    }, 900);
  };
  const tick = () => {
    programList.querySelectorAll('.is-now').forEach((item) => item.classList.remove('is-now'));
    if (index === program.length) {
      if (same([x, y], level.star)) winPhase();
      else fail('O Bit parou antes da estrela. Acrescente mais setas e rode de novo.');
      return;
    }
    const move = program[index];
    programList.children[index].classList.add('is-now');
    const next = [x + steps[move][0], y + steps[move][1]];
    if (outside(...next)) { fail('Ops! O Bit ia sair do tabuleiro. Mude as setas e tente de novo.'); return; }
    [x, y] = next;
    placeBit(x, y);
    if (isBug(x, y)) { fail('Ops! O Bit bateu num bug. Mude as setas e tente de novo.'); return; }
    index += 1;
    setTimeout(tick, reducedMotion ? 150 : 380);
  };
  gameStatus.textContent = 'Rodando o programa...';
  tick();
};

const machineScreen = $('#bit-game');
pad.querySelectorAll('[data-move]').forEach((key) => key.addEventListener('click', () => addMove(key.dataset.move)));
$('#undo').addEventListener('click', () => { if (!running) { program.pop(); drawProgram(); } });
$('#run').addEventListener('click', run);
$('#again').addEventListener('click', () => {
  levelIndex = 0;
  [...$('#stars').children].forEach((star) => star.classList.remove('is-on'));
  $('#stars').setAttribute('aria-label', '0 de 3 estrelas');
  pad.hidden = false;
  programList.hidden = false;
  $('#bit-end').hidden = true;
  $('#hero-bubble').textContent = greeting;
  drawLevel();
});
// The arrow keys also build the program while the focus is inside the game.
machineScreen.addEventListener('keydown', (event) => {
  const move = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }[event.key];
  if (move) { event.preventDefault(); addMove(move); }
  if (event.key === 'Backspace' && !running) { event.preventDefault(); program.pop(); drawProgram(); }
});
drawLevel();

if (!reducedMotion && matchMedia('(pointer: fine)').matches) {

  // Tilting the cards toward the mouse, with a glare at the pointer.
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      card.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
      card.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
      card.style.setProperty('--gx', `${x * 100}%`);
      card.style.setProperty('--gy', `${y * 100}%`);
      card.classList.add('is-tilting');
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      ['--rx', '--ry', '--gx', '--gy'].forEach((name) => card.style.removeProperty(name));
    });
  });

  // Bit in the hero follows the mouse with its eyes.
  const eyes = $('#hero-eyes');
  addEventListener('pointermove', (event) => {
    const box = heroBot.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height * 0.45);
    const length = Math.hypot(dx, dy) || 1;
    const reach = Math.min(1, length / 200) * 3;
    eyes.setAttribute('transform', `translate(${(dx / length) * reach} ${(dy / length) * reach})`);
  }, { passive: true });
}

// The whole resource card opens its game, not only the button.
document.querySelectorAll('.game').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    card.querySelector('.game__actions a').click();
  });
});

// Opening each project sheet in a dialog, closing it on the X, on Esc or on a click outside.
document.querySelectorAll('[data-ficha]').forEach((button) => {
  const sheet = document.getElementById(button.dataset.ficha);
  button.addEventListener('click', () => sheet.showModal());
});
document.querySelectorAll('dialog.ficha').forEach((sheet) => {
  sheet.addEventListener('click', (event) => { if (event.target === sheet) sheet.close(); });
});

// Sending the contact form to Formspree in the background, so the message arrives
// without the visitor opening an e-mail app. Without JavaScript, the form still posts normally.
const mailer = document.forms.mailer;
mailer.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = mailer.querySelector('button[type="submit"]');
  const status = $('#mail-status');
  const data = new FormData(mailer);
  data.set('_subject', `Interesse no GamificaPampa: ${data.get('escola')}`);
  button.disabled = true;
  status.classList.remove('is-error');
  status.textContent = 'Enviando...';

  // Reporting success only when Formspree accepts the message, and offering the e-mail addresses otherwise.
  try {
    const response = await fetch(mailer.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(response.statusText);
    mailer.reset();
    mailer.classList.add('is-sent');
    $('#mail-done').hidden = false;
    $('#mail-done h3').focus();
  } catch {
    status.classList.add('is-error');
    status.innerHTML = 'Não deu para enviar agora. Escreva para <a href="mailto:silvioquincozes@unipampa.edu.br,paulosilas@unipampa.edu.br">silvioquincozes@unipampa.edu.br e paulosilas@unipampa.edu.br</a>.';
  }
  button.disabled = false;
});

// Showing the empty form again when the visitor wants to send another message.
$('#mail-again').addEventListener('click', () => {
  mailer.classList.remove('is-sent');
  $('#mail-done').hidden = true;
  $('#mail-status').textContent = 'A mensagem vai direto para a coordenação do Educador 5.0 e do GamificaEdu.';
});

// Closing the project sheet when the visitor jumps from it to the e-mail form.
document.querySelectorAll('[data-contato]').forEach((link) => {
  link.addEventListener('click', () => link.closest('dialog').close());
});

// Sharing a resource: the dialog shows its QR code, to project for the class, and the link for WhatsApp, Classroom or copying.
const shares = {
  turma: { title: 'Jogos para a turma', url: 'https://gamificapampa.github.io/turma/' },
  oficina: { title: 'Oficina de Prompts', url: 'https://gamificapampa.github.io/oficina' },
  fracoes: { title: 'Pizzaria das Frações', url: 'https://gamificapampa.github.io/fracoes' },
  'ciclo-da-agua': { title: 'Ciclo da Água', url: 'https://gamificapampa.github.io/ciclo-da-agua' },
  silabas: { title: 'Fábrica de Sílabas', url: 'https://gamificapampa.github.io/silabas' },
  robo: { title: 'Robô pega a estrela', url: 'https://gamificapampa.github.io/robo' },
  maquina: { title: 'Máquina de prompts', url: 'https://gamificapampa.github.io/maquina' },
};
const shareSheet = $('#partilha');
const copyButton = $('#partilha-copiar');
const moreButton = $('#partilha-mais');
let shared = null;

document.querySelectorAll('[data-share]').forEach((button) => {
  button.addEventListener('click', () => {
    shared = shares[button.dataset.share];
    const qr = shareSheet.querySelector('.partilha__qr');
    qr.querySelector('use').setAttribute('href', `#qr-${button.dataset.share}`);
    qr.setAttribute('aria-label', `QR code de ${shared.title}`);
    $('#partilha-titulo').textContent = shared.title;
    $('#partilha-link').textContent = shared.url.replace('https://', '');
    $('#partilha-whatsapp').href = `https://wa.me/?text=${encodeURIComponent(`${shared.title}, do GamificaPampa: ${shared.url}`)}`;
    $('#partilha-classroom').href = `https://classroom.google.com/share?url=${encodeURIComponent(shared.url)}&title=${encodeURIComponent(shared.title)}`;
    copyButton.textContent = 'Copiar o link';
    moreButton.hidden = !navigator.share;
    shareSheet.showModal();
  });
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(shared.url);
    copyButton.textContent = 'Link copiado!';
  } catch {
    getSelection().selectAllChildren($('#partilha-link'));
    copyButton.textContent = 'Link selecionado para copiar';
  }
});

moreButton.addEventListener('click', () => navigator.share({ title: shared.title, url: shared.url }).catch(() => {}));
