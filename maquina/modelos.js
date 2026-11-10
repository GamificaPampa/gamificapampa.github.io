/* Os jogos-modelo da Máquina de prompts (item 2.5.4.3 da spec da retrospectiva de 06/11): três jogos de um arquivo só,
   no padrão do prompt-base e no estilo GamificaPampa, em /maquina/modelos/. O prompt de um jogo leva o link dos três e o
   esqueleto do mais parecido com o pedido, escolhido pela turma. O esqueleto mostra a estrutura, não o conteúdo:
   a IA troca o tema, as perguntas e o estilo.

   Desde 09/11, o "Que tipo de jogo?" da máquina escolhe o modelo pela forma de jogar (jeitos), e cada modelo traz a
   regra da tela dele, no lugar de "uma pergunta por tela", que deixava todo jogo com cara de quiz.

   id        o arquivo em /maquina/modelos/<id>.html
   nome      o nome do modelo
   mecanica  como se joga, numa frase
   regra     a linha de "Como o jogo funciona" que diz o que tem em cada tela
   jeitos    palavras do "Que tipo de jogo?" que levam a este modelo
   turmas    as turmas da máquina para as quais ele é o mais parecido, quando o professor não escolhe o tipo
   esqueleto até 60 linhas */
(() => {
  const BASE = 'https://gamificapampa.github.io/maquina/modelos/';
  const comum = {
    inicio: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nome do jogo</title>
<link rel="stylesheet" href="(a fonte do estilo)">
<style>
/* 1. o bloco do estilo, sem mudar */
/* 2. o CSS do jogo: main com largura máxima, .tela, .tela[hidden] { display: none } */
</style>
</head>
<body>
<main>
  <section class="tela cartao" id="inicio">
    <h1>Nome do jogo</h1>
    <p><b>Objetivo:</b> o que a turma vai conseguir fazer.</p>
    <p>Instruções em até 3 frases.</p>
    <button id="jogar">Jogar</button>
  </section>`,
    fim: `  <section class="tela cartao" id="fim" hidden>
    <h1>Fim de jogo!</h1>
    <p class="estrelas" id="estrelas"></p>
    <p>Uma frase do que a turma aprendeu.</p>
    <button id="denovo">Jogar de novo</button>
  </section>
</main>`,
  };
  const MODELOS = [
    {
      id: 'figuras',
      nome: 'Cores e Formas do Pampa',
      mecanica: 'a criança ouve o pedido (botão Ouvir) e toca na figura certa, desenhada em SVG',
      regra: 'Um pedido por tela, com no máximo 4 figuras grandes para tocar.',
      jeitos: ['voz', 'tocar na resposta'],
      turmas: ['infantil', '1', '2', 'eja1'],
      esqueleto: `${comum.inicio}
  <section class="tela cartao" id="jogo" hidden>
    <p class="progresso" id="progresso">Fase 1 de 3</p>
    <p class="pergunta" id="pergunta"></p>
    <button id="ouvir">Ouvir</button>  <!-- lê com speechSynthesis, lang pt-BR -->
    <div class="figuras" id="figuras"></div>  <!-- 3 botões grandes, cada um com um SVG e aria-label -->
    <p class="retorno" id="retorno" role="status" aria-live="polite"></p>
    <button id="proxima" hidden>Próxima</button>
  </section>
${comum.fim}
<script>
const FASES = [
  { nome: 'Cores', perguntas: [
    { texto: 'Toque na figura amarela.', opcoes: [
      { fig: '<svg>...</svg>', nome: 'círculo amarelo', certa: true, porque: 'Isso! Amarelo como o ipê.' },
      { fig: '<svg>...</svg>', nome: 'círculo azul', porque: 'Esse é azul. Procure o amarelo, como o sol.' } ] } ] },
  // mais 2 fases, cada uma um pouco mais difícil
];
// desenhar(): mostra a pergunta, fala o texto e cria os botões das figuras
// responder(op): desliga os botões, marca .certo ou .errado, mostra ✓ ou ✗ com op.porque, fala e toca o som
// avancar(): próxima pergunta ou fase; no fim, as estrelas
// som(certo): Web Audio, um tom curto; falar(texto): speechSynthesis em pt-BR
</script>
</body>
</html>`,
    },
    {
      id: 'quiz-fases',
      nome: 'Pizzaria das Frações',
      mecanica: 'um quiz em 3 fases, uma pergunta por tela, em que cada resposta errada explica o erro dela',
      regra: 'Uma pergunta ou desafio por tela, com no máximo 4 opções.',
      jeitos: ['quiz', 'perguntas'],
      turmas: ['3', '4', '5', '6', '7'],
      esqueleto: `${comum.inicio}
  <section class="tela cartao" id="jogo" hidden>
    <p class="progresso" id="progresso">Fase 1 de 3: Metade</p>
    <p class="pergunta" id="pergunta"></p>
    <div class="opcoes" id="opcoes"></div>  <!-- até 4 botões do mesmo tamanho -->
    <p class="retorno" id="retorno" role="status" aria-live="polite"></p>
    <button id="proxima" hidden>Próxima</button>
  </section>
${comum.fim}
<script>
const FASES = [
  { nome: 'Metade', perguntas: [
    { texto: 'A pizza tem 8 pedaços. Quantos pedaços são a metade?', opcoes: [
      { t: '4 pedaços', certa: true, porque: 'Metade é dividir em 2 partes iguais: 8 ÷ 2 = 4.' },
      { t: '2 pedaços', porque: '2 é o número de partes, não o tamanho de cada uma.' } ] } ] },
  // mais 2 fases, do fácil ao difícil; as erradas vêm de erros comuns
];
let fase = 0, pergunta = 0, acertos = 0, total = 0;
// desenhar(): "Fase X de 3", a pergunta e um <button> por opção; o foco vai para a primeira
// responder(op, botao): desliga as opções, .certo ou .errado, "✓ Certo!" ou "✗ Ainda não." + op.porque, som
// avancar(): próxima pergunta, próxima fase ou terminar(): 3, 2 ou 1 estrelas e o total de acertos
</script>
</body>
</html>`,
    },
    {
      id: 'ordenar',
      nome: 'Linha do Tempo do Brasil',
      mecanica: 'tocar nos itens na ordem certa; cada acerto entra numa linha, e o erro diz onde o item fica',
      regra: 'Em cada fase, de 3 a 5 itens embaralhados para pôr em ordem, um toque por vez.',
      jeitos: ['ordem'],
      turmas: ['8', '9', 'em1', 'em2', 'em3', 'eja2', 'eja3'],
      esqueleto: `${comum.inicio}
  <section class="tela cartao" id="jogo" hidden>
    <p class="progresso" id="progresso">Fase 1 de 3: 3 fatos</p>
    <p class="pergunta" id="pergunta">Qual fato veio primeiro?</p>
    <div class="fatos" id="fatos"></div>  <!-- os itens embaralhados, um <button> cada -->
    <ol class="linha" id="linha"></ol>  <!-- os acertos entram aqui, em ordem -->
    <p class="retorno" id="retorno" role="status" aria-live="polite"></p>
    <button id="proxima" hidden>Próxima fase</button>
  </section>
${comum.fim}
<script>
const ITENS = [
  { ano: 1500, t: 'Chegada dos portugueses' },
  { ano: 1822, t: 'Independência do Brasil' },
  // a ordem certa é a ordem desta lista
];
const FASES = [[0, 1, 3], [0, 1, 2, 3], [0, 1, 2, 3, 4]];  // cada fase com um item a mais
// desenhar(): embaralha os itens da fase em botões
// tocar(i): se for o próximo da ordem, sai dos botões e entra na linha com .certo e "✓";
//           se não, "✗ Ainda não." dizendo quando o item acontece e qual vem antes, e conta o erro
// avancar(): próxima fase; no fim, estrelas pelo número de erros
</script>
</body>
</html>`,
    },
    {
      id: 'memoria',
      nome: 'Memória das Frações',
      mecanica: 'um jogo da memória em que cada par são duas cartas que valem o mesmo (a fração e o desenho dela, depois duas frações equivalentes)',
      regra: 'Em cada fase, de 3 a 6 pares de cartas viradas para baixo; o jogador vira duas por vez, e as duas cartas de um par valem o mesmo (a fração e o desenho, a palavra e o significado), nunca duas cartas iguais.',
      jeitos: ['memória'],
      turmas: [],
      esqueleto: `${comum.inicio}
  <section class="tela cartao" id="jogo" hidden>
    <p class="progresso" id="progresso">Fase 1 de 3: Número e desenho</p>
    <p class="pergunta" id="pergunta">Ache o desenho de cada fração.</p>
    <div class="cartas" id="cartas"></div>  <!-- um <button> por carta, com "?" e aria-label até virar -->
    <p class="retorno" id="retorno" role="status" aria-live="polite"></p>
    <button id="proxima" hidden>Próxima fase</button>
  </section>
${comum.fim}
<script>
const FASES = [
  { nome: 'Número e desenho', pares: [
    [{ t: '1/2', diz: '1/2, um de 2 pedaços' }, { pizza: [1, 2], diz: 'o desenho com 1 de 2 pedaços pintado' }] ] },
  // mais pares a cada fase; na última, os pares são frações equivalentes, como 1/2 e 2/4
];
// desenhar(): embaralha as cartas de todos os pares, viradas para baixo
// virar(i): abre a carta (texto ou SVG desenhado no próprio arquivo); com duas abertas, confere o par:
//   iguais ficam abertas com .certo; diferentes ficam com .errado e "✗ Ainda não." + o que cada uma vale,
//   e fecham quando a próxima carta é virada
// fim da fase: todos os pares achados; no fim, estrelas pelo número de erros
</script>
</body>
</html>`,
    },
    {
      id: 'grupos',
      nome: 'Sólido, Líquido ou Gasoso?',
      mecanica: 'separar cartões em grupos: o jogador toca no grupo certo para o cartão da vez, e o cartão errado volta para o fim da fila com a explicação',
      regra: 'Em cada fase, de 2 a 3 grupos e de 4 a 6 cartões; o jogador toca no grupo certo para o cartão da vez (funciona no celular e no teclado, sem precisar arrastar), e cada grupo mostra o que já entrou nele.',
      jeitos: ['grupos', 'arrastar', 'classificar', 'separar'],
      turmas: [],
      esqueleto: `${comum.inicio}
  <section class="tela cartao" id="jogo" hidden>
    <p class="progresso" id="progresso">Fase 1 de 3: Sólido ou líquido</p>
    <p class="pergunta" id="pergunta">Em qual grupo fica?</p>
    <p class="vez" id="vez"></p>  <!-- o cartão da vez, grande -->
    <div class="grupos" id="grupos"></div>  <!-- um <button> por grupo, com uma <ul> do que já entrou -->
    <p class="retorno" id="retorno" role="status" aria-live="polite"></p>
    <button id="proxima" hidden>Próxima fase</button>
  </section>
${comum.fim}
<script>
const FASES = [
  { nome: 'Sólido ou líquido', grupos: ['Sólido', 'Líquido'], cartoes: [
    { t: 'Pedra', g: 0, porque: 'A pedra tem forma própria: não muda de forma no pote. É sólida.' },
    { t: 'Leite', g: 1, porque: 'O leite escorre e toma a forma da caneca. É líquido.' } ] },
  // mais 2 fases: um grupo a mais e, na última, um jeito novo de pensar o tema (como as mudanças de estado)
];
// desenhar(): embaralha os cartões numa fila e cria um botão por grupo
// colocar(g): certo, o cartão entra na lista do grupo com "✓ Certo!" + porque; errado, "✗ Ainda não." + porque,
//   e o cartão volta para o fim da fila; com a fila vazia, aparece Próxima fase
// no fim, estrelas pelo número de erros
</script>
</body>
</html>`,
    },
    {
      id: 'cadeado',
      nome: 'Fuga do Laboratório',
      mecanica: 'uma fuga com cadeados: cada fase é uma porta com 3 enigmas, e a resposta certa de cada um é um número do segredo do cadeado',
      regra: 'Em cada fase, uma porta com um cadeado de 3 números e 3 enigmas; a resposta certa de cada enigma é um número de 0 a 9, que aparece no cadeado; no erro, uma pista que não entrega a resposta, a opção errada fica desligada e o jogador tenta de novo.',
      jeitos: ['cadeado', 'fuga', 'tesouro', 'pistas'],
      turmas: [],
      esqueleto: `${comum.inicio}
  <section class="tela cartao" id="jogo" hidden>
    <p class="progresso" id="progresso">Porta 1 de 3: Tabuada. Enigma 1 de 3</p>
    <p class="missao" id="missao">Porta 1: o cadeado da entrada.</p>
    <ol class="cadeado" id="cadeado"></ol>  <!-- 3 espaços com "?", que viram o número certo -->
    <p class="pergunta" id="pergunta"></p>
    <div class="opcoes" id="opcoes"></div>  <!-- 3 ou 4 botões com números -->
    <p class="retorno" id="retorno" role="status" aria-live="polite"></p>
    <button id="proxima" hidden>Próximo enigma</button>
  </section>
${comum.fim}
<script>
const FASES = [
  { nome: 'Tabuada', missao: 'Porta 1: o cadeado da entrada.', enigmas: [
    { texto: 'Quanto é 3 × 3?', opcoes: [
      { t: '9', certa: true, porque: '3 × 3 são 3 grupos de 3: 3 + 3 + 3 = 9.' },
      { t: '6', porque: '6 é 3 + 3. Multiplicar é somar o 3 três vezes.' } ] } ] },  // a pista não entrega a resposta
  // mais 2 portas, do fácil ao difícil; toda resposta certa é um número de 0 a 9
];
// desenhar(): o cadeado com os números já achados, o enigma e as opções
// responder(op, botao): errado, "✗ Ainda não." + a pista de op.porque, e só aquele botão desliga; certo, o número entra no cadeado;
//   com os 3 números, "A porta abriu!" e o botão leva à próxima porta
// no fim, estrelas pelos enigmas certos na primeira tentativa
</script>
</body>
</html>`,
    },
    {
      id: 'escolhas',
      nome: 'Um Mês com o Salário',
      mecanica: 'uma história com escolhas: cada situação tem 2 ou 3 escolhas, que mudam um painel sempre visível e mostram a consequência',
      regra: 'Em cada fase, 2 ou 3 situações com 2 ou 3 escolhas; cada escolha muda um painel sempre visível (como dinheiro, saúde, tempo ou meio ambiente) e mostra a consequência, e as escolhas que custaram caro voltam no fim, em "Vale lembrar".',
      jeitos: ['escolhas', 'estudo de caso', 'situações'],
      turmas: [],
      esqueleto: `${comum.inicio}
  <section class="tela cartao" id="jogo" hidden>
    <p class="progresso" id="progresso">Parte 1 de 3: No mercado</p>
    <dl class="painel" aria-label="Como está o mês">  <!-- o painel muda a cada escolha -->
      <div><dt>Livre</dt><dd id="livre"></dd></div>
      <div><dt>Reserva</dt><dd id="reserva"></dd></div>
      <div><dt>Dívidas</dt><dd id="divida"></dd></div>
    </dl>
    <p class="pergunta" id="pergunta"></p>  <!-- a situação -->
    <div class="opcoes" id="opcoes"></div>  <!-- 2 ou 3 escolhas -->
    <p class="retorno" id="retorno" role="status" aria-live="polite"></p>
    <button id="proxima" hidden>Continuar</button>
  </section>
${comum.fim}  <!-- no fim, também a lista "Vale lembrar" com o que as escolhas ruins ensinam -->
<script>
const FASES = [
  { nome: 'No mercado', situacoes: [
    { texto: 'O pacote de 1 kg de arroz custa R$ 6, e o de 5 kg, R$ 25. A família usa 5 kg no mês.', escolhas: [
      { t: 'Levar o pacote de 5 kg', boa: true, efeito: { livre: -25 }, porque: 'Cada quilo saiu a R$ 5.' },
      { t: 'Levar 5 pacotes de 1 kg', efeito: { livre: -30 }, porque: 'Os mesmos 5 kg custaram R$ 5 a mais.',
        lembrar: 'Compare o preço por quilo, não o preço do pacote.' } ] } ] },
  // mais 2 partes, com situações que pedem pensar no depois
];
// escolher(esc, botao): soma o efeito no painel, ✓ ou ✗ com esc.porque, e guarda esc.lembrar se a escolha custou caro
// no fim: estrelas pelas boas escolhas, como ficou o painel e a lista "Vale lembrar"
</script>
</body>
</html>`,
    },
  ];
  // O caminho das telas vai escrito em todo esqueleto: no teste de 10/11 no ChatGPT, três dos quatro jogos travaram
  // porque a posição da pergunta ou o "já respondeu" não voltavam ao começo numa fase nova, no desafio ou no treino
  const FLUXO = `// O caminho das telas, igual em todo jogo:
// comecar(): fase = 0, pergunta = 0, erros = [], acertos = 0, e mostra a primeira pergunta
// avancar(): pergunta += 1; se a fase acabou, fase += 1 e pergunta = 0 (sem zerar, o jogo trava na fase seguinte)
// cada rodada nova (fase, desafio final ou Treinar os erros) começa com "já respondeu" = falso e os botões ligados`;
  for (const modelo of MODELOS) modelo.esqueleto = modelo.esqueleto.replace('</script>', `${FLUXO}
</script>`);
  const paraTurma = (turma) => MODELOS.find((modelo) => modelo.turmas.includes(turma)) || MODELOS[1];
  // O tipo de jogo escolhido na máquina vale mais que a turma: "jogo da memória" leva à Memória das Frações
  const paraJeito = (jeito) => {
    const texto = String(jeito || '').toLowerCase();
    return texto ? MODELOS.find((modelo) => modelo.jeitos.some((palavra) => texto.includes(palavra))) : undefined;
  };
  window.MODELOS = { lista: MODELOS, paraTurma, paraJeito, link: (modelo) => `${BASE}${modelo.id}.html`, pagina: BASE };
})();
