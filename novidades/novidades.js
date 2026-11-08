/* A lista das novidades do site. A página /novidades/ mostra todas, e os cartões do hub ganham a etiqueta
   Novo quando a novidade é de até 14 dias.

   COMO ACRESCENTAR UMA NOVIDADE */
// Ponha um objeto novo em NOVIDADES, de preferência no começo da lista. A página ordena pela data, então a ordem
// no arquivo não manda, e o bloco de cada mês aparece sozinho, com o mês mais novo em cima. Cada item tem:
//   data    o dia em que entrou no ar, no formato 'AAAA-MM-DD', por exemplo '2026-11-05'
//   titulo  o nome curto da novidade, escrito para o professor (nada de termo de programação)
//   texto   uma ou duas frases dizendo o que é e para que serve
//   icone   o nome de um ícone do identidade-visual (seção Ícones da vitrine): 'estrela', 'controle', 'livros'...
//   cor     uma cor de cores.css, para a faixa do cartão: 'blue', 'mint', 'yellow', 'orange', 'pink' ou 'purple'
//   links   lista de [rótulo, endereço, ação]. A ação dá a cor do botão: 'jogar' (verde, para jogos),
//           'conhecer' (amarelo, para páginas e materiais; é o padrão), 'baixar' (laranja, PDF ou impressão),
//           'compartilhar' (roxo) ou 'secundaria' (branco). Use endereços que começam com / (/recursos-pedagogicos/...)
// Exemplo:
//   { data: '2026-11-05', titulo: 'Jogo novo de Geografia', texto: 'Uma frase curta.', icone: 'controle', cor: 'mint',
//     links: [['Jogar', '/recursos-pedagogicos/criancas/pasta-do-jogo/', 'jogar']] },
// Sem dado de aluno, sem detalhe técnico: só o que muda para o professor.
window.NOVIDADES = [
  { data: '2026-11-08', titulo: 'Tudo para imprimir', texto: 'Uma página só com tudo o que vai para o papel: roteiros, folhas de atividades, certificado, medalhas, mapas, a folha das famílias, o guia e o baralho, com o número de folhas de cada um.', icone: 'prancheta', cor: 'orange',
    links: [['Ver os papéis', '/recursos-pedagogicos/professores/imprimir/', 'baixar']] },
  { data: '2026-11-08', titulo: 'Noite em todo o site', texto: 'O botão Noite, que deixa o céu escuro como um modo escuro, agora está em todas as páginas do professor e no menu da turma. A escolha fica guardada no aparelho, e o que se imprime continua branco.', icone: 'estrela', cor: 'purple',
    links: [['Abrir o menu da turma', '/turma/', 'jogar']] },
  { data: '2026-11-07', titulo: 'Agora no ChatGPT', texto: 'O ChatGPT passou a ser a IA principal da Oficina de Prompts: a Máquina abre o ChatGPT, o passo a passo ensina nele e o Bit vira um Projeto do ChatGPT, nos Assistentes do Bit. A conta gratuita basta. Quem prefere o Gemini continua podendo usar: os prompts são os mesmos.', icone: 'bit', cor: 'mint',
    links: [['Abrir a máquina', '/maquina/', 'conhecer'], ['Ver os Assistentes do Bit', '/recursos-pedagogicos/professores/oficina-prompts/gems.html', 'conhecer']] },
  { data: '2026-11-07', titulo: 'Máquina e Construtor viraram uma coisa só', texto: 'A Máquina de prompts ganhou o que só o Construtor tinha: colar ou anexar um material para adaptar (Word, PDF, texto ou foto), marcar as necessidades da turma, abrir o ChatGPT e guardar em Meus prompts, a mesma lista da Biblioteca. O endereço do Construtor leva à Máquina.', icone: 'engrenagem', cor: 'blue',
    links: [['Abrir a máquina', '/maquina/', 'conhecer']] },
  { data: '2026-11-06', titulo: 'Jogos com o visual que você escolher', texto: 'No jogo, a Máquina agora pergunta o visual: GamificaPampa, Quadro de giz, Caderno, Noite ou Alto contraste. A segunda mensagem traz esse visual, o que faz um jogo ensinar bem e um jogo-modelo de exemplo.', icone: 'jogo', cor: 'purple',
    links: [['Abrir a máquina', '/maquina/', 'conhecer'], ['Ver os jogos-modelo', '/maquina/modelos/', 'jogar']] },
  { data: '2026-11-06', titulo: 'Máquina mais simples, e do seu jeito', texto: 'A turma vem por etapa, só com as matérias dela, e o que criar ficou em cinco tipos. Não achou? Toque em Outra e escreva: a máquina guarda a sua opção neste aparelho para a próxima vez.', icone: 'engrenagem', cor: 'blue',
    links: [['Abrir a máquina', '/maquina/', 'conhecer']] },
  { data: '2026-11-06', titulo: 'Página dos projetos', texto: 'O Educador 5.0 e o GamificaEdu ganharam páginas próprias, com a ficha inteira e os materiais de cada projeto. O início do site ficou mais curto.', icone: 'livros', cor: 'mint',
    links: [['Ver os projetos', '/projetos/', 'conhecer']] },
  { data: '2026-11-05', titulo: 'Peça mais e Deixar mais completo', texto: 'Com o prompt pronto, a Máquina dá mensagens para pedir mais ao Gemini: revisar como especialista, mais desafio, versão para quem tem dificuldade e outras. No passo 6, você conta o objetivo, o que a turma já sabe e quanto tempo tem.',
    icone: 'livros', cor: 'purple', links: [
      ['Máquina de prompts', '/maquina/'],
    ] },
  { data: '2026-11-05', titulo: 'Prompts mais completos na Máquina', texto: 'A Máquina de prompts agora pede ao Gemini o objetivo da aula, os erros mais comuns da turma e uma conferência antes de entregar. Quizzes, planos e histórias saem mais pensados e prontos para usar.',
    icone: 'estrela', cor: 'blue', links: [
      ['Máquina de prompts', '/maquina/'],
    ] },
  { data: '2026-11-04', titulo: 'Padrão de qualidade para os jogos', texto: 'Quando o pedido é um jogo, a Máquina de prompts dá uma segunda mensagem para mandar ao Gemini: ele revisa o jogo para funcionar no celular e no projetor, sem internet, com letra grande e sem dado de aluno.',
    icone: 'controle', cor: 'yellow', links: [
      ['Máquina de prompts', '/maquina/'],
    ] },
  { data: '2026-11-03', titulo: 'Jogo do Prompt em grupo', texto: 'Na formação ou na reunião da escola, o Jogo do Prompt vai para o projetor e a sala vota levantando a mão. Depois de cada pedido, a turma discute a armadilha do Gemini.',
    icone: 'controle', cor: 'purple', links: [
      ['Jogar em grupo', '/recursos-pedagogicos/professores/oficina-prompts/jogo.html?grupo', 'jogar'],
    ] },
  { data: '2026-11-03', titulo: 'Calendário da escola', texto: 'Prompts prontos para as datas do ano, do Dia dos Povos Indígenas à Consciência Negra, de todas as etapas. A Biblioteca mostra a próxima data em destaque.',
    icone: 'livros', cor: 'orange', links: [
      ['Calendário na Biblioteca', '/recursos-pedagogicos/professores/oficina-prompts/biblioteca.html?calendario=1'],
    ] },
  { data: '2026-11-03', titulo: 'EJA em toda a Oficina', texto: 'A Educação de Jovens e Adultos virou etapa na Máquina, no Construtor, na Biblioteca e no Jogo do Prompt, com linguagem adulta e questões do Encceja.',
    icone: 'mochila', cor: 'blue', links: [
      ['Máquina de prompts', '/maquina/'],
      ['Biblioteca', '/recursos-pedagogicos/professores/oficina-prompts/biblioteca.html'],
    ] },
  { data: '2026-11-03', titulo: 'Rubrica e devolutiva', texto: 'Um tipo novo na Máquina e no Construtor: a rubrica do trabalho, a autoavaliação da turma e uma devolutiva para cada nível. Na Educação Infantil, vira registro de observação.',
    icone: 'prancheta', cor: 'mint', links: [
      ['Construtor de prompts', '/recursos-pedagogicos/professores/oficina-prompts/construtor.html'],
      ['Máquina de prompts', '/maquina/'],
    ] },
  { data: '2026-11-03', titulo: 'Certificado do curso online e Adaptador com leitura fácil', texto: 'Quem passa no teste final do curso imprime o próprio certificado. O Adaptador ganhou a leitura fácil para toda a turma e a opção de deficiência auditiva.',
    icone: 'trofeu', cor: 'yellow', links: [
      ['Curso online', '/recursos-pedagogicos/professores/oficina-prompts/curso.html'],
      ['Adaptador de atividades', '/recursos-pedagogicos/professores/oficina-prompts/adaptar.html'],
    ] },
  { data: '2026-10-30', titulo: 'Jogos que leem em voz alta e modo telão', texto: 'Os botões Ouvir e Ler sozinho leem a tela e a fala do Bit. No projetor, a tecla T aumenta tudo. Os telões do Arcade e do Caça aos Bugs ganharam o Resumo da turma.',
    icone: 'som', cor: 'purple', links: [
      ['Menu da turma', '/turma/', 'jogar'],
      ['Telão do Arcade', '/recursos-pedagogicos/criancas/arcade/estande.html'],
    ] },
  { data: '2026-10-30', titulo: 'Meus prompts e Jogo do Prompt por etapa', texto: 'Guarde na Biblioteca e no Construtor os prompts que você usa e mande para a equipe um que deu certo. O Jogo do Prompt tem rodadas para cada etapa.',
    icone: 'estrela', cor: 'pink', links: [
      ['Meus prompts', '/recursos-pedagogicos/professores/oficina-prompts/biblioteca.html?meus=1'],
      ['Jogo do Prompt', '/recursos-pedagogicos/professores/oficina-prompts/jogo.html', 'jogar'],
    ] },
  { data: '2026-10-30', titulo: 'Aula sobre IA, para o 9º ano e o Ensino Médio', texto: 'Roteiro, slides, folha de atividades e o jogo Detetive da IA, para uma aula de 50 minutos. Há também uma folha para mandar às famílias.',
    icone: 'computador', cor: 'purple', links: [
      ['Aula sobre IA', '/recursos-pedagogicos/professores/aula-inteligencia-artificial/'],
      ['Detetive da IA', '/recursos-pedagogicos/criancas/detetive-da-ia/', 'jogar'],
      ['Folha para as famílias', '/recursos-pedagogicos/professores/ia-em-casa/'],
    ] },
  { data: '2026-10-30', titulo: 'Oficina de Prompts: Adaptador e Baralho', texto: 'O Adaptador ajuda a incluir estudantes com necessidades diferentes, sem dado de aluno. O Baralho tem cartas para imprimir e montar pedidos para o Gemini.',
    icone: 'adaptar', cor: 'mint', links: [
      ['Adaptador de atividades', '/recursos-pedagogicos/professores/oficina-prompts/adaptar.html'],
      ['Baralho de prompts', '/recursos-pedagogicos/professores/oficina-prompts/baralho.html'],
      ['Baralho em PDF', '/recursos-pedagogicos/professores/oficina-prompts/baralho.pdf', 'baixar'],
    ] },
  { data: '2026-10-30', titulo: 'Para a sala: modo professor e estrelas guardadas', texto: 'Nos jogos, o modo professor (tecla P) deixa escolher a fase, mostrar a resposta e pausar. As estrelas de cada fase ficam guardadas. No placar, o apelido é sorteado e cada turma tem a sua sala.',
    icone: 'estrela', cor: 'yellow', links: [
      ['Jogos para a turma', '/turma/', 'jogar'],
      ['Arcade do Código', '/recursos-pedagogicos/criancas/arcade/', 'jogar'],
    ] },
  { data: '2026-10-30', titulo: 'Bichos do Pampa, para a Educação Infantil', texto: 'Jogo para crianças de 4 e 5 anos, com cores, formas, contagem e sombras de bichos. O Bit fala cada pedido em voz alta.',
    icone: 'broto', cor: 'pink', links: [
      ['Jogar Bichos do Pampa', '/recursos-pedagogicos/criancas/bichos-do-pampa/', 'jogar'],
    ] },
  { data: '2026-10-29', titulo: 'Quatro jogos novos por matéria', texto: 'Mapa do Bit (Geografia), Detetive da História, Galeria do Bit (Artes) e Cozinha das Misturas (Ciências). Cada um tem link curto: /geografia, /historia, /arte e /misturas.',
    icone: 'controle', cor: 'blue', links: [
      ['Mapa do Bit', '/recursos-pedagogicos/criancas/mapa-do-bit/', 'jogar'],
      ['Detetive da História', '/recursos-pedagogicos/criancas/detetive-da-historia/', 'jogar'],
      ['Galeria do Bit', '/recursos-pedagogicos/criancas/galeria-do-bit/', 'jogar'],
      ['Cozinha das Misturas', '/recursos-pedagogicos/criancas/cozinha-das-misturas/', 'jogar'],
    ] },
  { data: '2026-10-29', titulo: 'Máquina e Construtor: pedidos mais certeiros', texto: 'Frases que salvam evita os erros mais comuns do Gemini. A Máquina e o Construtor montam uma sequência didática, com três aulas sobre o mesmo tema. A Biblioteca tem mais prompts e filtro por matéria.',
    icone: 'sequencia', cor: 'orange', links: [
      ['Máquina de prompts', '/maquina/'],
      ['Construtor de prompts', '/recursos-pedagogicos/professores/oficina-prompts/construtor.html'],
      ['Frases que salvam', '/recursos-pedagogicos/professores/oficina-prompts/frases.html'],
      ['Biblioteca', '/recursos-pedagogicos/professores/oficina-prompts/biblioteca.html'],
    ] },
  { data: '2026-10-29', titulo: 'Curso com a sua etapa e Galeria de professores', texto: 'O curso online traz exemplos da etapa de cada professor, dá um selo por módulo e o comprovante cabe numa folha. A Galeria recebe os jogos que os professores criaram: mande o seu.',
    icone: 'livros', cor: 'blue', links: [
      ['Curso online', '/recursos-pedagogicos/professores/oficina-prompts/curso.html'],
      ['Galeria de jogos', '/recursos-pedagogicos/professores/oficina-prompts/galeria.html'],
    ] },
  { data: '2026-10-25', titulo: 'Ensino Médio e Enem', texto: 'Gem do Ensino Médio e do Enem, módulo extra no curso e questões no estilo do Enem na Máquina e na Biblioteca. Mais cinco jogos de exemplo: Lâmpada do Bit, Quem Pensou Isso?, Dados em Jogo, Escolas Literárias e Monte a Redação.',
    icone: 'enem', cor: 'purple', links: [
      ['Gems prontos', '/recursos-pedagogicos/professores/oficina-prompts/gems.html'],
      ['Máquina de prompts', '/maquina/'],
      ['Jogos para a turma', '/turma/', 'jogar'],
    ] },
  { data: '2026-10-22', titulo: 'Todas as matérias, da Educação Infantil ao Ensino Médio', texto: 'O hub, a Máquina, o Construtor e a Biblioteca servem a qualquer matéria. O menu da turma reúne todos os jogos, com filtro por idade e QR. As páginas lembram as suas escolhas e imprimem melhor.',
    icone: 'mochila', cor: 'mint', links: [
      ['Jogos para a turma', '/turma/', 'jogar'],
      ['Recursos pedagógicos', '/recursos-pedagogicos/'],
    ] },
  { data: '2026-10-17', titulo: 'Gem do Bit e Medalhas do Bit', texto: 'Um Gem com a ajuda do Bit dentro do Gemini e medalhas para imprimir e premiar a turma.',
    icone: 'trofeu', cor: 'pink', links: [
      ['Gems prontos', '/recursos-pedagogicos/professores/oficina-prompts/gems.html'],
      ['Medalhas do Bit', '/recursos-pedagogicos/professores/medalhas/', 'baixar'],
    ] },
];
