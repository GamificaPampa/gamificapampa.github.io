/* Lista única dos jogos para crianças. O menu da turma (/turma/) monta os cartões a partir dela, os links curtos
   (atalhos.js, 404.html e /atalhos/) saem dela, e o kit sem internet confere se cada pasta existe. Um jogo novo entra só aqui, com a capa e o QR
   na pasta dele: recursos-pedagogicos/criancas/<pasta>/capa.svg e qr.svg.

   pasta     a pasta em recursos-pedagogicos/criancas/
   atalho    o link curto (gamificapampa.github.io/<atalho>): o atalhos.js cria o link a partir daqui
   materia   o grupo do menu da turma: Programação, Matemática, Língua Portuguesa, Ciências, Geografia...
   idade     o texto do cartão; de e ate são os números do filtro (null quando não há limite)
   cor       uma cor de cores.css, para a faixa da capa
   celular   true quando o jogo é feito para o celular de cada criança (o QR aparece em destaque)
   estande   a tela de placar para o telão, quando o jogo tem uma */
window.JOGOS = [
  { pasta: 'robo', atalho: 'robo', nome: 'Robô pega a estrela', frase: 'Com setas, monte o caminho do robô até a estrela.', materia: 'Programação', conceito: 'Algoritmo', idade: 'A partir de 6 anos', de: 6, ate: null, cor: 'blue' },
  { pasta: 'ninja', atalho: 'ninja', nome: 'Ninja dos Bugs', frase: 'Deslize o dedo para cortar os bugs, sem cortar o robô.', materia: 'Programação', conceito: 'Depuração', idade: 'A partir de 6 anos', de: 6, ate: null, cor: 'pink' },
  { pasta: 'dupla', atalho: 'dupla', nome: 'Programação em Dupla', frase: 'Um pilota o robô e o outro, que vê os bugs escondidos, mostra o caminho.', materia: 'Programação', conceito: 'Trabalho em equipe', idade: 'A partir de 7 anos', de: 7, ate: null, cor: 'mint' },
  { pasta: 'conecta', atalho: 'conecta', nome: 'Conecta o Sistema', frase: 'Ligue os cabos e faça a foto chegar do banco de dados até o celular.', materia: 'Programação', conceito: 'Sistemas', idade: 'A partir de 8 anos', de: 8, ate: null, cor: 'orange' },
  { pasta: 'arcade', atalho: 'arcade', nome: 'Arcade do Código', frase: 'Três jogos rápidos com o robô Bit e um placar para a turma.', materia: 'Programação', conceito: 'Testes e depuração', idade: 'Todas as idades', de: null, ate: null, cor: 'purple', celular: true, estande: 'estande.html' },
  { pasta: 'caca-bugs', atalho: 'caca-bugs', nome: 'Caça aos Bugs!', frase: 'Toque nos insetos para consertar o app da escola em 30 segundos.', materia: 'Programação', conceito: 'Testes', idade: '', de: null, ate: null, cor: 'yellow', celular: true, estande: 'estande.html' },
  { pasta: 'missao-dev', atalho: 'missao-dev', nome: 'Missão Dev', frase: 'Cinco desafios rápidos: montar os passos do robô, achar o bug e executar um laço.', materia: 'Programação', conceito: 'Algoritmo e laços', idade: '', de: null, ate: null, cor: 'blue', celular: true, estande: 'estande.html' },
  { pasta: 'pizzaria-das-fracoes', atalho: 'fracoes', nome: 'Pizzaria das Frações', frase: 'Leia o pedido e toque nos pedaços certos: metades, terços e quartos.', materia: 'Matemática', conceito: 'Frações', idade: '9 e 10 anos', de: 9, ate: 10, cor: 'orange' },
  { pasta: 'balanca-do-bit', atalho: 'balanca', nome: 'Balança do Bit', frase: 'Tire pesos dos dois lados e descubra quanto vale o x.', materia: 'Matemática', conceito: 'Equações', idade: '12 e 13 anos', de: 12, ate: 13, cor: 'purple' },
  { pasta: 'fabrica-de-silabas', atalho: 'silabas', nome: 'Fábrica de Sílabas', frase: 'Junte BA, BE, BI, BO e BU e monte a palavra do desenho.', materia: 'Língua Portuguesa', conceito: 'Sílabas', idade: '6 e 7 anos', de: 6, ate: 7, cor: 'pink' },
  { pasta: 'detetive-da-noticia', atalho: 'detetive', nome: 'Detetive da Notícia', frase: 'Ache as pistas de que uma notícia pode ser falsa.', materia: 'Língua Portuguesa', conceito: 'Notícias falsas', idade: '12 a 15 anos', de: 12, ate: 15, cor: 'yellow' },
  { pasta: 'ciclo-da-agua', atalho: 'ciclo-da-agua', nome: 'Ciclo da Água', frase: 'Ajude a Gotinha a dar a volta: evaporação, condensação, chuva e rio.', materia: 'Ciências', conceito: 'Ciclo da água', idade: '10 e 11 anos', de: 10, ate: 11, cor: 'blue' },
  { pasta: 'caminho-da-escola', atalho: 'caminho', nome: 'Caminho da Escola', frase: 'Use a legenda e guie o Bit pelo bairro com direita e esquerda.', materia: 'Geografia', conceito: 'Mapas e direções', idade: '8 e 9 anos', de: 8, ate: 9, cor: 'mint' },
];
