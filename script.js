document.documentElement.classList.add('js');

// Quem parou as animações (botão redondo do topo, lembrado no aparelho) também fica sem os efeitos feitos em script
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches || Boolean(window.Animacoes?.paradas);
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
// The menu also closes with Esc and with a tap anywhere outside it.
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuButton.focus(); }
});
document.addEventListener('click', (event) => {
  if (nav.classList.contains('is-open') && !nav.contains(event.target)) setMenu(false);
});
nav.querySelectorAll('.nav__links a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

// On phones and tablets, the prompt scene and the Bit's bubble move below the resources, so the games and the
// teacher tools are the first thing under the title. On wide screens they go back to the side of the title.
const bitGame = $('#estudio');
const bitHello = $('.hero .hello');
if (bitGame && bitHello) {
  const homes = [[bitHello, bitHello.parentElement, bitHello.nextSibling], [bitGame, bitGame.parentElement, bitGame.nextSibling]];
  const phoneSpot = Object.assign(document.createElement('section'), { className: 'container bit-celular' });
  phoneSpot.setAttribute('aria-label', 'Do pedido ao material');
  const small = matchMedia('(max-width: 1023px)');
  const place = () => {
    if (small.matches) {
      if (!phoneSpot.isConnected) $('#recursos').after(phoneSpot);
      phoneSpot.append(bitHello, bitGame);
    } else {
      homes.forEach(([element, parent, next]) => parent.insertBefore(element, next));
      phoneSpot.remove();
    }
  };
  place();
  small.addEventListener('change', place);
}

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

const heroBot = $('#hero-bot');

// Every Bit jumps when clicked, and goes back to its idle bobbing once the jump ends.
document.querySelectorAll('.bot').forEach((bot) => {
  bot.addEventListener('click', () => { if (!reducedMotion) replay(bot, 'jump'); });
  bot.addEventListener('animationend', () => bot.classList.remove('jump'));
});

// Cena do topo: o pedido se escreve no notebook, parte por parte (Papel, Tarefa, Contexto e Formato), a IA pensa
// e os materiais saem voando. Cada exemplo termina num jogo de verdade do site. A cena passa sozinha pelos três
// exemplos; tocar numa aba mostra aquele e para a troca automática
const EXEMPLOS = [
  {
    partes: [['p', 'Você é professora do 4º ano.'], ['t', 'Crie uma atividade de frações'], ['c', 'para crianças de 9 anos, com pizza e chocolate.'], ['f', 'Uma folha A4 com 5 exercícios e o gabarito.']],
    saidas: [['Plano de aula', 'Frações na pizzaria, 50 minutos', 'prancheta', 'var(--yellow-claro)'], ['Folha de exercícios', '5 questões e o gabarito', 'folha', 'var(--blue-claro)']],
    jogo: ['Pizzaria das Frações', 'pizzaria-das-fracoes', '/fracoes'],
    legenda: 'Um pedido com as quatro partes vira o plano, a folha e o jogo da aula de frações.',
  },
  {
    partes: [['p', 'Você é professor de Ciências do 5º ano.'], ['t', 'Explique o ciclo da água'], ['c', 'para crianças de 10 anos, com o rio Ibirapuitã.'], ['f', 'Uma história curta e 4 perguntas.']],
    saidas: [['História', 'A viagem da Gotinha pelo Ibirapuitã', 'livro', 'var(--mint-claro)'], ['Quiz', '4 perguntas para a turma', 'balao', 'var(--purple-claro)']],
    jogo: ['Ciclo da Água', 'ciclo-da-agua', '/ciclo-da-agua'],
    legenda: 'O rio da cidade entra no pedido, e a explicação chega mais perto da turma.',
  },
  {
    partes: [['p', 'Você é professora de alfabetização.'], ['t', 'Crie um jogo de sílabas'], ['c', 'para o 1º ano, com os bichos do Pampa.'], ['f', 'Cartas para recortar e as regras em 4 passos.']],
    saidas: [['Cartas para recortar', 'QUE-RO, QUE-RO e outras sílabas', 'tesoura', 'var(--pink-claro)'], ['Regras do jogo', '4 passos para a roda', 'lista', 'var(--orange-claro)']],
    jogo: ['Fábrica de Sílabas', 'fabrica-de-silabas', '/silabas'],
    legenda: 'Até um jogo de mesa sai do pedido. E a turma ainda pode jogar a versão no projetor.',
  },
];
const I = '#2f2a4a';
const ARTES = {
  prancheta: `<svg width="34" height="34" viewBox="0 0 32 32"><rect x="7" y="5" width="18" height="23" rx="3" fill="#fff" stroke="${I}" stroke-width="2.4"/><rect x="11" y="3" width="10" height="5" rx="2" fill="#ffd23f" stroke="${I}" stroke-width="2"/><path d="M11 14h10M11 19h10M11 24h6" stroke="${I}" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  folha: `<svg width="34" height="34" viewBox="0 0 32 32"><path d="M8 4h12l5 5v19H8z" fill="#fff" stroke="${I}" stroke-width="2.4" stroke-linejoin="round"/><path d="M12 14h9M12 19h9M12 24h5" stroke="#4da3ff" stroke-width="2.4" stroke-linecap="round"/><path d="M20 4v5h5" fill="none" stroke="${I}" stroke-width="2.2"/></svg>`,
  livro: `<svg width="34" height="34" viewBox="0 0 32 32"><path d="M16 8C12 5 7 5 4 6v19c3-1 8-1 12 2 4-3 9-3 12-2V6c-3-1-8-1-12 2z" fill="#fff" stroke="${I}" stroke-width="2.4" stroke-linejoin="round"/><path d="M16 8v19" stroke="${I}" stroke-width="2.2"/></svg>`,
  balao: `<svg width="34" height="34" viewBox="0 0 32 32"><path d="M5 6h22a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H14l-6 5v-5H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" fill="#fff" stroke="${I}" stroke-width="2.4" stroke-linejoin="round"/><text x="16" y="19" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="11" fill="${I}">?</text></svg>`,
  tesoura: `<svg width="34" height="34" viewBox="0 0 32 32"><rect x="5" y="6" width="12" height="16" rx="3" fill="#fff" stroke="${I}" stroke-width="2.4" transform="rotate(-8 11 14)"/><rect x="15" y="9" width="12" height="16" rx="3" fill="#ffd23f" stroke="${I}" stroke-width="2.4" transform="rotate(8 21 17)"/><text x="21" y="21" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="8" fill="${I}">BA</text></svg>`,
  lista: `<svg width="34" height="34" viewBox="0 0 32 32"><rect x="6" y="5" width="20" height="23" rx="3" fill="#fff" stroke="${I}" stroke-width="2.4"/><path d="M10 12l2 2 3-4M10 20l2 2 3-4" fill="none" stroke="#4fd6a6" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 12h5M18 20h5" stroke="${I}" stroke-width="2.2" stroke-linecap="round"/></svg>`,
};
const estudio = $('#estudio');
if (estudio) {
  const prompt = $('#estudio-prompt');
  const saidas = $('#estudio-saidas');
  const bit = $('#estudio-bit');
  const legenda = $('#estudio-legenda');
  const abas = [...estudio.querySelectorAll('.estudio__aba')];
  const pose = (nome) => { bit.src = `/identidade-visual/mascote/bit-${nome}.svg`; };
  let relogios = [];
  let atual = 0;
  let sozinho = true;
  const depois = (ms, f) => relogios.push(setTimeout(f, ms));
  const limpar = () => { relogios.forEach(clearTimeout); relogios = []; };

  const mostrar = (n) => {
    limpar();
    atual = n;
    const exemplo = EXEMPLOS[n];
    abas.forEach((aba, i) => aba.setAttribute('aria-pressed', String(i === n)));
    estudio.classList.remove('is-pensando', 'is-enviando');
    legenda.textContent = '';
    prompt.textContent = '';
    saidas.innerHTML = [...exemplo.saidas.map(([titulo, texto, arte, cor]) => `<li class="saida"><span class="saida__arte" style="--c: ${cor}">${ARTES[arte]}</span><span><b>${titulo}</b><small>${texto}</small></span></li>`),
      `<li class="saida saida--jogo"><span class="saida__arte" style="--c: var(--white)"><img src="/recursos-pedagogicos/criancas/${exemplo.jogo[1]}/capa.svg" alt="" width="54" height="54"></span><span><b><a href="${exemplo.jogo[2]}">${exemplo.jogo[0]}</a></b><small>O jogo já está pronto no site</small><span class="saida__jogar"><svg width="12" height="12" viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z" fill="#fff" stroke="#2f2a4a" stroke-width="3" stroke-linejoin="round"/></svg>Jogar</span></span></li>`].join('');
    const pecas = exemplo.partes.map(([tipo, texto]) => {
      const parte = Object.assign(document.createElement('span'), { className: `parte parte--${tipo}` });
      parte.innerHTML = `<b>${tipo.toUpperCase()}</b>`;
      parte.append(Object.assign(document.createElement('span'), { textContent: '' }));
      return [parte, texto];
    });
    const cartoes = [...saidas.children];
    // Parado, a cena aparece pronta
    if (reducedMotion || window.Animacoes?.paradas) {
      pecas.forEach(([parte, texto], i) => { parte.lastChild.textContent = texto; prompt.append(parte, i < pecas.length - 1 ? ' ' : ''); });
      cartoes.forEach((cartao) => cartao.classList.add('is-fora'));
      pose('comemorando');
      legenda.textContent = exemplo.legenda;
      return;
    }
    pose('pensando');
    // O pedido se escreve letra por letra, uma parte de cada vez
    let tempo = 400;
    pecas.forEach(([parte, texto], i) => {
      depois(tempo, () => prompt.append(parte, i < pecas.length - 1 ? ' ' : ''));
      [...texto].forEach((_, k) => { depois(tempo + 30 + k * 28, () => { parte.lastChild.textContent = texto.slice(0, k + 1); }); });
      tempo += texto.length * 28 + 260;
    });
    depois(tempo, () => { estudio.classList.add('is-enviando'); pose('acenando'); });
    depois(tempo + 450, () => estudio.classList.add('is-pensando'));
    depois(tempo + 1700, () => { estudio.classList.remove('is-pensando', 'is-enviando'); pose('comemorando'); legenda.textContent = exemplo.legenda; });
    cartoes.forEach((cartao, i) => depois(tempo + 1800 + i * 380, () => cartao.classList.add('is-fora')));
    depois(tempo + 1800 + 3 * 380 + 4200, () => { if (sozinho) mostrar((atual + 1) % EXEMPLOS.length); });
  };

  abas.forEach((aba, i) => aba.addEventListener('click', () => { sozinho = false; mostrar(i); }));
  // Só anima quando a cena está na tela
  let comecou = false;
  const comecar = () => { if (!comecou) { comecou = true; mostrar(0); } };
  const aVista = () => { const caixa = estudio.getBoundingClientRect(); return caixa.top < innerHeight * .8 && caixa.bottom > 0; };
  if (aVista()) comecar();
  else {
    const olho = new IntersectionObserver(([item]) => { if (item.isIntersecting) { comecar(); olho.disconnect(); } }, { threshold: .3 });
    olho.observe(estudio);
    addEventListener('scroll', () => { if (aVista()) comecar(); }, { passive: true });
  }
  window.Animacoes?.aoMudar?.(() => { if (comecou) mostrar(atual); });
}

// O botão de parar as animações fica no topo, antes do Jogos para a turma; no celular, dentro do Menu
if (window.Animacoes) {
  $('.nav__cta').before(Animacoes.botao());
  $('#menu').append(Animacoes.botao({ texto: true }));
}

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
// The QR code is a file of its own, loaded only when the dialog opens.
const shares = {
  fracoes: { title: 'Pizzaria das Frações', url: 'https://gamificapampa.github.io/fracoes', qr: '/recursos-pedagogicos/criancas/pizzaria-das-fracoes/qr.svg' },
  'ciclo-da-agua': { title: 'Ciclo da Água', url: 'https://gamificapampa.github.io/ciclo-da-agua', qr: '/recursos-pedagogicos/criancas/ciclo-da-agua/qr.svg' },
  silabas: { title: 'Fábrica de Sílabas', url: 'https://gamificapampa.github.io/silabas', qr: '/recursos-pedagogicos/criancas/fabrica-de-silabas/qr.svg' },
  robo: { title: 'Robô pega a estrela', url: 'https://gamificapampa.github.io/robo', qr: '/recursos-pedagogicos/criancas/robo/qr.svg' },
  maquina: { title: 'Máquina de prompts', url: 'https://gamificapampa.github.io/maquina', qr: '/atalhos/qr/maquina.svg' },
};
const shareSheet = $('#partilha');
const copyButton = $('#partilha-copiar');
const moreButton = $('#partilha-mais');
let shared = null;

document.querySelectorAll('[data-share]').forEach((button) => {
  button.addEventListener('click', () => {
    shared = shares[button.dataset.share];
    const qr = shareSheet.querySelector('.partilha__qr');
    qr.src = shared.qr;
    qr.alt = `QR code de ${shared.title}`;
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
