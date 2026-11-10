/* As ações do GamificaPampa nas escolas: oficinas, aulas e visitas. A página /acoes/ mostra cada uma como uma
   postagem, com o relato e as fotos, e junta todas as fotos na galeria.

   COMO ACRESCENTAR UMA AÇÃO */
// 1. Escolha as fotos. Nada de nome ou dado de criança, e rosto de criança só com autorização de uso de imagem:
//    sem autorização, borre (--borrar) ou use foto de professor, de mãos e de materiais.
// 2. Reduza as fotos e tire os metadados com o script do repositório equipe, numa pasta com o id da ação:
//      python equipe/ferramentas/fotos_acoes.py <pasta-das-fotos> gamificapampa.github.io/acoes/fotos/<id> IMG_1 IMG_2 ...
//    Ele grava 01.webp, 02.webp... (até 1600 px) e mini/01.webp... (480 px), na ordem dos nomes.
// 3. Ponha um objeto novo em ACOES. A página ordena pela data, a mais nova em cima. Cada item tem:
//   id      a pasta das fotos: a data e um nome curto, como '2026-11-04-tancredo-neves'. Vira o link #id da postagem
//   data    o dia da ação, no formato 'AAAA-MM-DD'
//   tipo    'oficina', 'aula' ou 'visita' (dá a cor, o ícone e o filtro)
//   titulo  o nome curto da ação
//   local   a escola ou o lugar, e a cidade
//   posicao (opcional) o ponto da capa que não pode ser cortado, como '50% 80%' (o padrão é o centro). A capa é
//           a foto 01, mostrada em 4:3: prefira uma foto deitada, com a turma e a equipe
//   resumo  uma frase, que aparece em destaque
//   texto   lista de parágrafos curtos: o que aconteceu, quem participou (sem nomes de alunos), o que mudou depois
//   fotos   lista de legendas, uma por foto, na ordem dos arquivos (01.webp, 02.webp...). A legenda também é o texto
//           alternativo, então descreva o que se vê
//   links   (opcional) lista de [rótulo, endereço, ação], como nas novidades: 'jogar', 'conhecer', 'baixar',
//           'compartilhar' ou 'secundaria'
// Depois, acrescente um item em novidades/novidades.js com o link /acoes/#<id>.
window.ACOES = [
  {
    id: '2026-11-04-tancredo-neves',
    data: '2026-11-04',
    tipo: 'oficina',
    titulo: 'Oficina na Escola Tancredo Neves',
    local: 'EEEM Tancredo de Almeida Neves, Alegrete',
    resumo: 'Um dia inteiro na escola: de manhã com os professores dos Anos Finais e de tarde com os dos Anos Iniciais.',
    texto: [
      'A equipe do Educador 5.0 e do GamificaEdu levou a oficina Aperte START para a Escola Tancredo Neves. Foram dois turnos, cada um com cerca de duas horas.',
      'Primeiro, a conversa sobre o que é gamificação, o que é um prompt e como montar um bom pedido com papel, tarefa, contexto e formato. Depois do café, a equipe criou e publicou um jogo ao vivo, do prompt ao QR Code.',
      'Na prática, cada grupo criou um jogo para a própria turma, no seu computador, e a equipe passou de mesa em mesa. O que os professores disseram virou mudança no site na mesma semana: a Máquina de prompts ficou mais estruturada e prática, e o início do site, mais curto.',
      'Obrigado ao corpo docente e à direção da escola pela acolhida.',
    ],
    fotos: [
      'A turma da tarde reunida com a equipe no fim da oficina',
      'A equipe na entrada da escola',
      'De manhã, a abertura: gamificação é usar elementos de jogo na aula',
      'Os professores dos Anos Finais acompanham a conversa',
      'Aperte PAUSE: a hora do café',
      'O café, entre a conversa e a prática',
      'A equipe ajuda um grupo de perto, na tela do computador',
      'A turma da manhã reunida com a equipe',
      'De tarde, a mesma conversa com os professores dos Anos Iniciais',
    ],
    links: [
      ['O que mudou no site', '/novidades/', 'conhecer'],
      ['Abrir a máquina', '/maquina/', 'conhecer'],
    ],
  },
];
