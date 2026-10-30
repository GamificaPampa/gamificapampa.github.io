/* Links curtos: gamificapampa.github.io/ninja leva para o jogo, /prompt para o construtor e assim por diante.
   O GitHub Pages mostra o 404.html para todo endereço que não existe; ele procura o nome aqui e redireciona.
   A página /atalhos/ mostra a mesma lista, com copiar e QR. Os jogos entram sozinhos, pelo jogos.js.
   Para outro atalho, acrescente uma linha [grupo, rótulo, endereço] e gere o QR com:
     python equipe/ferramentas/qr.py arquivo https://gamificapampa.github.io/<atalho> atalhos/qr/<atalho>.svg
   Sem rótulo, o atalho funciona mas não aparece nas listas. Carregue o jogos.js antes deste arquivo. */
const RP = 'https://gamificapampa.github.io/recursos-pedagogicos/';
const AULA = RP + 'professores/aula-engenharia-de-software/';
const AULA_IA = RP + 'professores/aula-inteligencia-artificial/';
const OFICINA = RP + 'professores/oficina-prompts/';
// Os jogos vêm do jogos.js (carregado antes deste arquivo): o link curto, o nome e o QR da pasta do jogo
const ATALHOS_DOS_JOGOS = Object.fromEntries((window.JOGOS || []).map((jogo) => [jogo.atalho, [
  jogo.materia === 'Programação' ? 'Jogos' : 'Jogos por matéria',
  jogo.materia === 'Programação' ? jogo.nome : `${jogo.nome} (${jogo.materia})`,
  RP + 'criancas/' + jogo.pasta + '/',
  '/recursos-pedagogicos/criancas/' + jogo.pasta + '/qr.svg',
]]));
const ATALHOS = {
  ...ATALHOS_DOS_JOGOS,
  mapas: ['Jogos', 'Mapas da Programação em Dupla (PDF)', RP + 'criancas/dupla/mapas.pdf'],
  aula: ['Aula com as crianças', 'Página da aula, com todos os materiais', AULA],
  slides: ['Aula com as crianças', 'Slides da aula', AULA + 'slides.html'],
  roteiro: ['Aula com as crianças', 'Roteiro da aula (PDF)', AULA + 'roteiro.pdf'],
  atividades: ['Aula com as crianças', 'Folha de atividades (PDF)', AULA + 'atividades.pdf'],
  certificado: ['Aula com as crianças', 'Certificado de Programador(a) Mirim', AULA + 'certificado.html'],
  medalhas: ['Aula com as crianças', 'Medalhas do Bit para imprimir', RP + 'professores/medalhas/'],
  'aula-ia': ['Aula sobre IA', 'Página da aula sobre IA, com todos os materiais', AULA_IA],
  'slides-ia': ['Aula sobre IA', 'Slides da aula sobre IA', AULA_IA + 'slides.html'],
  'atividades-ia': ['Aula sobre IA', 'Folha de atividades da aula sobre IA (PDF)', AULA_IA + 'atividades.pdf'],
  kit: ['Aula com as crianças', 'Kit sem internet, para pendrive (zip)', 'https://github.com/GamificaPampa/recursos-pedagogicos/releases/download/kit-sem-internet/kit-sem-internet.zip'],
  oficina: ['Oficina de Prompts', 'Página da oficina', OFICINA],
  curso: ['Oficina de Prompts', 'Curso online', OFICINA + 'curso.html'],
  'jogo-do-prompt': ['Oficina de Prompts', 'Jogo do Prompt', OFICINA + 'jogo.html'],
  prompt: ['Oficina de Prompts', 'Construtor de prompts', OFICINA + 'construtor.html'],
  maquina: ['Oficina de Prompts', 'Máquina de prompts', 'https://gamificapampa.github.io/maquina/'],
  biblioteca: ['Oficina de Prompts', 'Biblioteca de prompts', OFICINA + 'biblioteca.html'],
  frases: ['Oficina de Prompts', 'Frases que salvam', OFICINA + 'frases.html'],
  adaptar: ['Oficina de Prompts', 'Adaptador de atividades', OFICINA + 'adaptar.html'],
  gems: ['Oficina de Prompts', 'Gems prontos', OFICINA + 'gems.html'],
  guia: ['Oficina de Prompts', 'Guia do professor (PDF)', OFICINA + 'guia.pdf'],
  galeria: ['Oficina de Prompts', 'Galeria de jogos', OFICINA + 'galeria.html'],
  'passo-a-passo': ['Oficina de Prompts', 'Passo a passo no Gemini', OFICINA + 'passo-a-passo.html'],
  avaliar: ['', '', 'https://docs.google.com/forms/d/e/1FAIpQLSdZMkwO4v7j69BfUQbcLZWGtVhlDgyL12tRhPseMAruZeperg/viewform'],
  gemini: ['', '', 'https://gemini.google.com/app'],
  jogos: ['', '', 'https://gamificapampa.github.io/turma/'],
};

// Outros nomes que levam ao mesmo atalho: o nome inteiro do jogo e o jeito como as pessoas falam
const APELIDOS = {
  'detetive-da-ia': 'detetive-ia', ia: 'aula-ia', 'aula-sobre-ia': 'aula-ia', adaptador: 'adaptar', inclusao: 'adaptar',
  'bichos-do-pampa': 'bichos', infantil: 'bichos', 'educacao-infantil': 'bichos',
  pizzaria: 'fracoes', 'pizzaria-das-fracoes': 'fracoes', fracao: 'fracoes',
  fabrica: 'silabas', 'fabrica-de-silabas': 'silabas', silaba: 'silabas',
  'caminho-da-escola': 'caminho', 'balanca-do-bit': 'balanca', 'detetive-da-noticia': 'detetive',
  'reta-do-bit': 'reta', funcao: 'reta', 'laboratorio-de-equacoes': 'laboratorio', balanceamento: 'laboratorio',
  'genetica-do-bit': 'genetica', mendel: 'genetica',
  'atelie-das-cores': 'cores', artes: 'cores', 'circuito-do-bit': 'circuito',
  'educacao-fisica': 'circuito', 'ingles-com-o-bit': 'ingles', english: 'ingles',
  ciclo: 'ciclo-da-agua', agua: 'ciclo-da-agua', 'robo-pega-a-estrela': 'robo', estrela: 'robo',
  construtor: 'prompt', 'construtor-de-prompts': 'prompt', 'maquina-de-prompts': 'maquina',
  cacabugs: 'caca-bugs', missao: 'missao-dev', 'programacao-em-dupla': 'dupla',
};

// Do endereço digitado ao nome da lista: sem acento, sem maiúscula, com hífen no lugar de espaço
function atalhoDe(caminho) {
  const nome = decodeURIComponent(caminho).toLowerCase().replace(/\/index\.html$/, '').replace(/^\/+|\/+$/g, '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[\s_]+/g, '-');
  return ATALHOS[nome] ? nome : APELIDOS[nome] && ATALHOS[APELIDOS[nome]] ? APELIDOS[nome] : '';
}
