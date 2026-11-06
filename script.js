document.documentElement.classList.add('js');

// As seções que saíram do hub em 06/11 têm página própria: o endereço antigo leva até lá
const SECOES_QUE_SAIRAM = { '#projetos': '/projetos/', '#escola': '/recursos-pedagogicos/' };
if (SECOES_QUE_SAIRAM[location.hash]) location.replace(SECOES_QUE_SAIRAM[location.hash]);

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
// Todas as páginas: o botão abre e fecha o painel com o site inteiro. Fecha com Esc, com um toque fora e ao escolher.
const mapa = $('#mapa');
const mapaButton = $('#mapa-button');
const setMapa = (open) => {
  mapa.hidden = !open;
  mapaButton.setAttribute('aria-expanded', String(open));
  if (!open) mapa.dispatchEvent(new Event('fechou'));
};
mapaButton.addEventListener('click', () => setMapa(mapa.hidden));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mapa.hidden) { setMapa(false); mapaButton.focus(); }
});
document.addEventListener('click', (event) => {
  if (!mapa.hidden && !nav.contains(event.target)) setMapa(false);
});
mapa.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMapa(false)));

// No celular e no tablet, a cena do pedido desce para depois dos recursos, para os jogos e as ferramentas virem logo
// abaixo do título. Na tela larga, ela volta para o lado do título.
const bitGame = $('#estudio');
if (bitGame) {
  const home = [bitGame.parentElement, bitGame.nextSibling];
  const phoneSpot = Object.assign(document.createElement('section'), { className: 'container bit-celular' });
  phoneSpot.setAttribute('aria-label', 'Do pedido ao material');
  const small = matchMedia('(max-width: 1023px)');
  const place = () => {
    if (small.matches) {
      if (!phoneSpot.isConnected) $('#recursos').after(phoneSpot);
      phoneSpot.append(bitGame);
    } else {
      home[0].insertBefore(bitGame, home[1]);
      phoneSpot.remove();
    }
  };
  place();
  small.addEventListener('change', place);
}

// Os três níveis saíram do hub (retrospectiva de 06/11): apaga o que ficou guardado deles no aparelho
try { localStorage.removeItem('gp-lembrar:passos'); } catch {}

// Revealing sections as they enter the screen.
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
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

// Every Bit jumps when clicked, and goes back to its idle bobbing once the jump ends.
document.querySelectorAll('.bot').forEach((bot) => {
  bot.addEventListener('click', () => { if (!reducedMotion) replay(bot, 'jump'); });
  bot.addEventListener('animationend', () => bot.classList.remove('jump'));
});

// Cena do topo: o pedido aparece no notebook, uma parte de cada vez (Papel, Tarefa, Contexto e Formato), a IA pensa
// e saem dois materiais: a folha e o jogo de verdade do site. Roda uma vez quando aparece na tela e para no resultado;
// Ver de novo repete. Com as animações paradas, a cena já aparece pronta
const EXEMPLO = {
  partes: [['p', 'Você é professora do 4º ano.'], ['t', 'Crie uma atividade de frações'], ['c', 'para crianças de 9 anos, com pizza e chocolate.'], ['f', 'Uma folha A4 com 5 exercícios e o gabarito.']],
  folha: ['Folha de exercícios', '5 questões e o gabarito'],
  jogo: ['Pizzaria das Frações', 'pizzaria-das-fracoes', '/fracoes'],
};
const I = '#2f2a4a';
const FOLHA = `<svg width="34" height="34" viewBox="0 0 32 32"><path d="M8 4h12l5 5v19H8z" fill="#fff" stroke="${I}" stroke-width="2.4" stroke-linejoin="round"/><path d="M12 14h9M12 19h9M12 24h5" stroke="#4da3ff" stroke-width="2.4" stroke-linecap="round"/><path d="M20 4v5h5" fill="none" stroke="${I}" stroke-width="2.2"/></svg>`;
const estudio = $('#estudio');
if (estudio) {
  const prompt = $('#estudio-prompt');
  const saidas = $('#estudio-saidas');
  const deNovo = $('#estudio-de-novo');
  saidas.innerHTML = `<li class="saida"><span class="saida__arte" style="--c: var(--blue-claro)">${FOLHA}</span><span><b>${EXEMPLO.folha[0]}</b><small>${EXEMPLO.folha[1]}</small></span></li>`
    + `<li class="saida saida--jogo"><span class="saida__arte" style="--c: var(--white)"><img src="/recursos-pedagogicos/criancas/${EXEMPLO.jogo[1]}/capa.svg" alt="" width="54" height="54"></span><span><b><a href="${EXEMPLO.jogo[2]}">${EXEMPLO.jogo[0]}</a></b><small>O jogo já está pronto no site</small><span class="saida__jogar"><svg width="12" height="12" viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z" fill="#fff" stroke="#2f2a4a" stroke-width="3" stroke-linejoin="round"/></svg>Jogar</span></span></li>`;
  const cartoes = [...saidas.children];
  const pecas = EXEMPLO.partes.map(([tipo, texto]) => {
    const parte = Object.assign(document.createElement('span'), { className: `parte parte--${tipo}` });
    parte.innerHTML = `<b>${tipo.toUpperCase()}</b>`;
    parte.append(texto);
    return parte;
  });
  let relogios = [];
  const depois = (ms, f) => relogios.push(setTimeout(f, ms));
  const mostrar = () => {
    relogios.forEach(clearTimeout);
    relogios = [];
    estudio.classList.remove('is-pensando', 'is-enviando', 'is-pronto');
    prompt.replaceChildren();
    cartoes.forEach((cartao) => cartao.classList.remove('is-fora'));
    const escrever = (parte, i) => prompt.append(parte, i < pecas.length - 1 ? ' ' : '');
    if (reducedMotion || window.Animacoes?.paradas) {
      pecas.forEach(escrever);
      cartoes.forEach((cartao) => cartao.classList.add('is-fora'));
      return;
    }
    pecas.forEach((parte, i) => depois(300 + i * 650, () => escrever(parte, i)));
    const enviou = 300 + pecas.length * 650;
    depois(enviou, () => estudio.classList.add('is-enviando'));
    depois(enviou + 400, () => estudio.classList.add('is-pensando'));
    depois(enviou + 1400, () => estudio.classList.remove('is-pensando', 'is-enviando'));
    cartoes.forEach((cartao, i) => depois(enviou + 1500 + i * 400, () => cartao.classList.add('is-fora')));
    depois(enviou + 1500 + cartoes.length * 400 + 300, () => estudio.classList.add('is-pronto'));
  };
  deNovo.addEventListener('click', mostrar);
  // Só começa quando a cena está na tela
  let comecou = false;
  const comecar = () => { if (!comecou) { comecou = true; mostrar(); } };
  const aVista = () => { const caixa = estudio.getBoundingClientRect(); return caixa.top < innerHeight * .8 && caixa.bottom > 0; };
  if (aVista()) comecar();
  else {
    const olho = new IntersectionObserver(([item]) => { if (item.isIntersecting) { comecar(); olho.disconnect(); } }, { threshold: .3 });
    olho.observe(estudio);
  }
  window.Animacoes?.aoMudar?.(() => { if (comecou) mostrar(); });
}

// O botão de parar as animações fica no fim do painel Todas as páginas, no computador e no celular
if (window.Animacoes) $('#mapa-rodape').append(Animacoes.botao({ texto: true }));

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
}

// The whole resource card opens its game, not only the button.
document.querySelectorAll('.game').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    card.querySelector('.game__actions a').click();
  });
});

// The share dialog closes on a click outside it.
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

// Sharing a resource: the dialog shows its QR code, to project for the class, and the link for WhatsApp, Classroom or copying.
// The QR code is a file of its own, loaded only when the dialog opens.
const shares = {
  site: { title: 'GamificaPampa', url: 'https://gamificapampa.github.io', qr: '/atalhos/qr/site.svg' },
  bichos: { title: 'Bichos do Pampa', url: 'https://gamificapampa.github.io/bichos', qr: '/recursos-pedagogicos/criancas/bichos-do-pampa/qr.svg' },
  fracoes: { title: 'Pizzaria das Frações', url: 'https://gamificapampa.github.io/fracoes', qr: '/recursos-pedagogicos/criancas/pizzaria-das-fracoes/qr.svg' },
  reta: { title: 'Reta do Bit', url: 'https://gamificapampa.github.io/reta', qr: '/recursos-pedagogicos/criancas/reta-do-bit/qr.svg' },
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

// Busca dentro de Todas as páginas: procura nas páginas do painel e nos jogos do jogos.js, sem acento e sem maiúscula.
// Com o campo vazio, o painel mostra os grupos; ao digitar, mostra os resultados no lugar deles.
// Ctrl K ou / abre o painel com o cursor no campo; as setas escolhem e o Enter abre
const BUSCA_EXTRA = {
  'Máquina de prompts': 'plano de aula atividade quiz prova avaliação rubrica devolutiva eja encceja história',
  'Construtor de prompts': 'montar prompt passo a passo',
  'Biblioteca de prompts': 'modelos exemplos prontos calendário datas',
  'Adaptador de atividades': 'inclusão tea autismo tdah dislexia adaptar acessível',
  'Gems prontos': 'gem gemini assistente ensino médio',
  'Frases que salvam': 'armadilhas erros consertar resposta',
  'Curso online': 'módulos certificado comprovante à distância',
  'Jogo do Prompt': 'aprender quatro partes papel tarefa contexto formato',
  'Jogo do Prompt em grupo': 'projetor formação reunião votar',
  'Passo a passo no Gemini': 'canvas gem como usar tutorial',
  'Baralho de prompts': 'cartas imprimir sortear',
  'Aula com os jogos': 'engenharia de software programação crianças 50 minutos',
  'Aula sobre IA': 'inteligência artificial 9º ano ensino médio',
  'IA em casa, para as famílias': 'pais responsáveis família',
  'Medalhas do Bit': 'premiar imprimir recompensa',
  'Certificado de Programador(a) Mirim': 'diploma',
  'Jogos para a turma': 'projetor celular qr crianças',
  'Publicar meu jogo': 'canvas link qr github hospedar',
  'Kit sem internet (zip)': 'offline sem rede baixar zip notebook',
  'Novidades': 'o que mudou novo',
  'Links curtos com QR': 'atalhos endereço curto',
  'Fale com a equipe': 'contato levar escola formação',
};
const tirarAcento = (texto) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const CORES_GRUPO = { 'Planejar com IA': 'var(--blue-claro)', 'Aprender a pedir': 'var(--yellow-claro)', 'Aulas prontas': 'var(--mint-claro)', 'Para a turma': 'var(--pink-claro)', 'Do projeto': 'var(--purple-claro)' };
const grupos = [...document.querySelectorAll('.mapa__grupo')];
const indiceBusca = [
  ...grupos.flatMap((grupo) => {
    const nome = grupo.querySelector('.mapa__titulo').textContent.trim();
    return [...grupo.querySelectorAll('a')].map((link) => ({ titulo: link.textContent.trim(), onde: nome, href: link.getAttribute('href'), icone: 'lupa', cor: CORES_GRUPO[nome] }));
  }),
  ...(window.JOGOS || []).map((jogo) => ({ titulo: jogo.nome, onde: `Jogo de ${jogo.materia}${jogo.idade ? ' · ' + jogo.idade : ''}`, href: `/recursos-pedagogicos/criancas/${jogo.pasta}/`, icone: 'controle', cor: `var(--${jogo.cor}-claro, var(--mint-claro))`, extra: [jogo.materia, jogo.conceito, jogo.frase].join(' ') })),
].map((item) => ({ ...item, palavras: tirarAcento(`${item.titulo} ${item.onde} ${item.extra || ''} ${BUSCA_EXTRA[item.titulo] || ''}`).split(/[^a-z0-9º]+/).filter(Boolean), nome: tirarAcento(item.titulo) }));

const campo = $('#busca-campo');
const lista = $('#busca-lista');
if (campo && lista) {
  let achados = [];
  let escolhido = 0;
  const desenharBusca = () => {
    const palavras = tirarAcento(campo.value.trim()).split(/\s+/).filter(Boolean);
    const buscando = palavras.length > 0;
    grupos.forEach((grupo) => { grupo.hidden = buscando; });
    lista.hidden = !buscando;
    achados = [];
    escolhido = 0;
    if (!buscando) { lista.replaceChildren(); return; }
    // Cada palavra digitada tem de começar uma palavra da página: "gem" acha Gems, mas não "imagem"
    achados = indiceBusca.filter((item) => palavras.every((p) => item.palavras.some((w) => w.startsWith(p))))
      .map((item) => ({ item, nota: (item.nome.startsWith(palavras[0]) ? 3 : 0) + (palavras.every((p) => item.nome.includes(p)) ? 2 : 0) }))
      .sort((a, b) => b.nota - a.nota).slice(0, 8).map(({ item }) => item);
    lista.replaceChildren(...achados.map((item, i) => {
      const li = document.createElement('li');
      const link = Object.assign(document.createElement('a'), { className: 'busca__item', href: item.href, id: `busca-${i}` });
      link.setAttribute('role', 'option');
      link.setAttribute('aria-selected', String(i === escolhido));
      link.innerHTML = `<i style="--c: ${item.cor}"><svg aria-hidden="true"><use href="#icone-${item.icone}"/></svg></i><span><b></b><small></small></span>`;
      link.querySelector('b').textContent = item.titulo;
      link.querySelector('small').textContent = item.onde;
      link.addEventListener('click', () => { setMapa(false); setMenu(false); });
      li.append(link);
      return li;
    }));
    if (!achados.length) lista.append(Object.assign(document.createElement('li'), { className: 'busca__vazio', textContent: 'Nada com essas palavras. Tente outra, ou apague para ver todas as páginas.' }));
  };
  const marcar = (i) => {
    escolhido = (i + achados.length) % achados.length;
    lista.querySelectorAll('.busca__item').forEach((link, k) => link.setAttribute('aria-selected', String(k === escolhido)));
    lista.querySelector(`#busca-${escolhido}`)?.scrollIntoView({ block: 'nearest' });
  };
  const abrirBusca = () => {
    if (matchMedia('(max-width: 1023px)').matches) setMenu(true);
    setMapa(true);
    campo.focus();
    campo.select();
  };
  campo.addEventListener('input', desenharBusca);
  // Ao fechar o painel, a busca volta vazia
  mapa.addEventListener('fechou', () => { campo.value = ''; desenharBusca(); });
  campo.addEventListener('keydown', (evento) => {
    if (!achados.length) return;
    if (evento.key === 'ArrowDown') { evento.preventDefault(); marcar(escolhido + 1); }
    if (evento.key === 'ArrowUp') { evento.preventDefault(); marcar(escolhido - 1); }
    if (evento.key === 'Enter') { evento.preventDefault(); location.href = achados[escolhido].href; }
  });
  addEventListener('keydown', (evento) => {
    const digitando = evento.target.closest?.('input, textarea, select, [contenteditable]');
    if ((evento.key === 'k' || evento.key === 'K') && (evento.ctrlKey || evento.metaKey)) { evento.preventDefault(); abrirBusca(); }
    else if (evento.key === '/' && !digitando) { evento.preventDefault(); abrirBusca(); }
  });
}

// Recursos: as abas Para você planejar e Para a turma. A escolha fica lembrada neste aparelho
const abasRecursos = [...document.querySelectorAll('.aba-recursos')];
const mostrarAba = (aba, foco = false) => {
  abasRecursos.forEach((outra) => {
    const ativa = outra === aba;
    outra.setAttribute('aria-selected', String(ativa));
    outra.tabIndex = ativa ? 0 : -1;
    $('#' + outra.getAttribute('aria-controls')).hidden = !ativa;
  });
  if (foco) aba.focus();
  try { localStorage.setItem('gp-lembrar:aba-recursos', aba.id); } catch {}
};
abasRecursos.forEach((aba, i) => {
  aba.addEventListener('click', () => mostrarAba(aba));
  aba.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowRight' || evento.key === 'ArrowLeft') mostrarAba(abasRecursos[(i + (evento.key === 'ArrowRight' ? 1 : -1) + abasRecursos.length) % abasRecursos.length], true);
  });
});
try { const salva = $('#' + localStorage.getItem('gp-lembrar:aba-recursos')); if (salva && abasRecursos.includes(salva)) mostrarAba(salva); } catch {}
// O que entrou nas novidades nos últimos 14 dias ganha a etiqueta Novo
document.querySelectorAll('.ferramenta').forEach((cartao) => {
  const caminho = cartao.getAttribute('href');
  const recente = (window.NOVIDADES || []).some((n) => (Date.now() - new Date(n.data + 'T12:00:00').getTime()) / 864e5 <= 14 && (n.links || []).some(([, href]) => href.split('?')[0] === caminho));
  if (recente) cartao.append(Object.assign(document.createElement('span'), { className: 'ferramenta__novo', textContent: 'Novo' }));
});
