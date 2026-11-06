/* Os estilos visuais dos jogos que a Máquina de prompts pede (item 2.5.3 da spec da retrospectiva de 06/11).
   Cada estilo é um bloco fixo de CSS: as variáveis (cores, fonte, borda, arredondamento e sombra) e quatro regras
   (botão, cartão, certo e errado). O prompt manda a IA usar o bloco sem mudar nada, e o Criar aqui confere se ele veio.
   A miniatura de cada estilo, na máquina, é feita com as mesmas variáveis. O script equipe/ferramentas/conferir_estilos.mjs
   confere o contraste de cada um (pelo menos 4,5:1 no texto).

   id          o valor guardado na máquina
   nome        o nome no botão
   frase       o que o estilo é, numa frase, para o prompt
   fonte       o endereço da fonte no Google Fonts, ou vazio; o jogo funciona sem ela, com as fontes de reserva
   cores       as variáveis; texto sobre fundo, texto sobre cartao, botaoTexto sobre botao, certoTexto sobre certo e
               erradoTexto sobre errado precisam de contraste de 4,5:1
   extra       CSS a mais do estilo (o fundo pautado do caderno, por exemplo) */
(() => {
  const ESTILOS = [
    {
      id: 'gamificapampa',
      nome: 'GamificaPampa',
      frase: 'o céu azul do GamificaPampa, com letra redonda, contorno escuro, sombra dura e cores fortes',
      fonte: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&display=swap',
      familia: '"Fredoka", "Trebuchet MS", "Segoe UI", system-ui, sans-serif',
      cores: { fundo: '#4fadf2', fundo2: '#bfe5ff', cartao: '#ffffff', texto: '#2f2a4a', destaque: '#ffd23f', botao: '#4fd6a6', botaoTexto: '#2f2a4a', borda: '#2f2a4a', certo: '#c9f5e3', certoTexto: '#14532d', errado: '#ffd6e0', erradoTexto: '#7a1530' },
      raio: '18px', linha: '4px', sombra: '0 6px 0',
      extra: 'body { background: linear-gradient(var(--fundo), var(--fundo-2)) fixed; }',
    },
    {
      id: 'giz',
      nome: 'Quadro de giz',
      frase: 'um quadro-negro verde, com letra clara de giz e traço simples',
      fonte: 'https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap',
      familia: '"Patrick Hand", "Comic Sans MS", "Trebuchet MS", system-ui, sans-serif',
      cores: { fundo: '#1f4d3a', fundo2: '#1f4d3a', cartao: '#2a5c47', texto: '#f6f3e8', destaque: '#ffe27a', botao: '#f6f3e8', botaoTexto: '#1f4d3a', borda: '#f6f3e8', certo: '#b9f0cf', certoTexto: '#12301f', errado: '#ffc9c9', erradoTexto: '#5c0f0f' },
      raio: '10px', linha: '3px', sombra: '0 4px 0',
      extra: 'button { letter-spacing: .02em; }',
    },
    {
      id: 'caderno',
      nome: 'Caderno',
      frase: 'uma folha de caderno, clara e pautada, em azul e vermelho, sóbria e sem bichinhos',
      fonte: 'https://fonts.googleapis.com/css2?family=Nunito:wght@600;800&display=swap',
      familia: '"Nunito", "Segoe UI", "Trebuchet MS", system-ui, sans-serif',
      cores: { fundo: '#fdfbf3', fundo2: '#fdfbf3', cartao: '#ffffff', texto: '#1d2b4f', destaque: '#c8283f', botao: '#1d4ed8', botaoTexto: '#ffffff', borda: '#1d2b4f', certo: '#d9f2e3', certoTexto: '#14532d', errado: '#fde2e2', erradoTexto: '#7f1d1d' },
      raio: '10px', linha: '2px', sombra: '0 3px 0',
      extra: 'body { background: repeating-linear-gradient(var(--fundo) 0 31px, #c9d8f2 31px 32px); }',
    },
    {
      id: 'noite',
      nome: 'Noite',
      frase: 'o céu de noite, escuro, com estrelas e cores vivas, como uma aventura no espaço',
      fonte: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&display=swap',
      familia: '"Fredoka", "Trebuchet MS", "Segoe UI", system-ui, sans-serif',
      cores: { fundo: '#14122b', fundo2: '#2a2559', cartao: '#221f45', texto: '#f2f0ff', destaque: '#ffd23f', botao: '#ffd23f', botaoTexto: '#14122b', borda: '#f2f0ff', certo: '#2ecc8f', certoTexto: '#062a1a', errado: '#ff8fa8', erradoTexto: '#2b0610' },
      raio: '18px', linha: '3px', sombra: '0 5px 0',
      extra: 'body { background: radial-gradient(circle at 20% 10%, var(--fundo-2), var(--fundo) 60%) fixed; }',
    },
    {
      id: 'contraste',
      nome: 'Alto contraste',
      frase: 'alto contraste, preto, branco e amarelo, com letra grande, para baixa visão e projetor fraco',
      fonte: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap',
      familia: '"Atkinson Hyperlegible", "Verdana", "Segoe UI", system-ui, sans-serif',
      cores: { fundo: '#000000', fundo2: '#000000', cartao: '#000000', texto: '#ffffff', destaque: '#ffe600', botao: '#ffe600', botaoTexto: '#000000', borda: '#ffffff', certo: '#00e676', certoTexto: '#000000', errado: '#ff6b6b', erradoTexto: '#000000' },
      raio: '8px', linha: '4px', sombra: '0 0 0',
      extra: 'body { font-size: 22px; } button { font-size: 24px; }',
    },
  ];

  // O bloco de CSS que vai para o prompt e para o começo do <style> do jogo
  const css = (estilo) => {
    const c = estilo.cores;
    return [
      `/* Estilo ${estilo.nome}, do GamificaPampa: use sem mudar */`,
      ':root {',
      `  --fundo: ${c.fundo}; --fundo-2: ${c.fundo2}; --cartao: ${c.cartao}; --texto: ${c.texto}; --destaque: ${c.destaque};`,
      `  --botao: ${c.botao}; --botao-texto: ${c.botaoTexto}; --borda: ${c.borda};`,
      `  --certo: ${c.certo}; --certo-texto: ${c.certoTexto}; --errado: ${c.errado}; --errado-texto: ${c.erradoTexto};`,
      `  --fonte: ${estilo.familia}; --raio: ${estilo.raio}; --linha: ${estilo.linha} solid var(--borda); --sombra: ${estilo.sombra} var(--borda);`,
      '}',
      'body { margin: 0; background: var(--fundo); color: var(--texto); font: 600 20px/1.4 var(--fonte); }',
      'button { min-height: 48px; padding: 8px 20px; background: var(--botao); color: var(--botao-texto); border: var(--linha); border-radius: var(--raio); box-shadow: var(--sombra); font: 700 20px var(--fonte); cursor: pointer; }',
      '.cartao { background: var(--cartao); color: var(--texto); border: var(--linha); border-radius: var(--raio); padding: 20px; }',
      '.certo { background: var(--certo); color: var(--certo-texto); } .errado { background: var(--errado); color: var(--errado-texto); }',
      estilo.extra || '',
    ].filter(Boolean).join('\n');
  };

  // A primeira variável, para o Criar aqui conferir se o jogo veio com o bloco
  const marca = (estilo) => `--fundo: ${estilo.cores.fundo}; --fundo-2: ${estilo.cores.fundo2};`;

  const porId = (id) => ESTILOS.find((estilo) => estilo.id === id) || ESTILOS[0];
  window.ESTILOS = { lista: ESTILOS, css, marca, porId };
})();
