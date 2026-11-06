/* Os jogos-modelo da Máquina de prompts (item 2.5.4.3 da spec da retrospectiva de 06/11): três jogos de um arquivo só,
   no padrão do prompt-base e no estilo GamificaPampa, em /maquina/modelos/. O prompt de um jogo leva o link dos três e o
   esqueleto do mais parecido com o pedido, escolhido pela turma. O esqueleto mostra a estrutura, não o conteúdo:
   a IA troca o tema, as perguntas e o estilo.

   id        o arquivo em /maquina/modelos/<id>.html
   nome      o nome do modelo
   mecanica  como se joga, numa frase
   turmas    as turmas da máquina para as quais ele é o mais parecido
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
  ];
  const paraTurma = (turma) => MODELOS.find((modelo) => modelo.turmas.includes(turma)) || MODELOS[1];
  window.MODELOS = { lista: MODELOS, paraTurma, link: (modelo) => `${BASE}${modelo.id}.html`, pagina: BASE };
})();
