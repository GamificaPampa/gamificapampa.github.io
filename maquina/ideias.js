// Sugestões de tema da Máquina de prompts, por matéria e faixa da turma. Cada sugestão traz:
//   tema      o que aparece no botão e vai para o campo Tema (curto, com artigo quando natural: "as frações")
//   objetivo  o que a turma deve conseguir fazer no fim, começando por um verbo no infinitivo
//   erro      onde a turma dessa idade costuma errar nesse tema, começando por um verbo na 3ª pessoa do plural ("acham que...", "confundem...")
// Faixas: infantil, anos12 (1º e 2º ano), anos35 (3º ao 5º), finais67 (6º e 7º), finais89 (8º e 9º), medio, eja1 (EJA anos iniciais), eja2 (EJA anos finais e Ensino Médio).
// "geral" vale quando o professor não escolhe matéria.
window.IDEIAS = {
  geral: {
    infantil: [
      { tema: 'as cores e as formas', objetivo: 'separar objetos da sala pela cor e pela forma', erro: 'chamam de bola qualquer forma redonda e confundem o quadrado com o retângulo' },
      { tema: 'contar até dez', objetivo: 'contar objetos até dez, tocando um de cada vez', erro: 'recitam os números sem apontar e contam o mesmo objeto duas vezes' },
      { tema: 'os bichos do Pampa', objetivo: 'reconhecer e imitar bichos do campo, como a vaca, a ovelha e o quero-quero', erro: 'acham que todo bicho que voa é passarinho, até a borboleta' },
    ],
    anos12: [
      { tema: 'as letras do alfabeto', objetivo: 'reconhecer as letras do alfabeto e escrever o próprio nome', erro: 'confundem letras espelhadas, como b e d, p e q' },
      { tema: 'a adição e a subtração', objetivo: 'resolver contas de mais e de menos até 20 com material concreto', erro: 'contam tudo de novo desde o 1 em vez de continuar a partir do maior número' },
      { tema: 'os animais e onde vivem', objetivo: 'dizer onde vivem e o que comem três animais diferentes', erro: 'acham que todo animal do campo é de criação e foi posto lá pelas pessoas' },
    ],
    anos35: [
      { tema: 'a interpretação de texto', objetivo: 'achar no texto a resposta de uma pergunta e grifar o trecho', erro: 'respondem pelo que imaginam, sem voltar ao texto para conferir' },
      { tema: 'a multiplicação', objetivo: 'resolver problemas de multiplicação com números de até dois algarismos', erro: 'esquecem o "vai um" e desalinham as casas ao armar a conta' },
      { tema: 'o ciclo da água', objetivo: 'explicar as etapas do ciclo da água com um desenho', erro: 'acham que as nuvens são fumaça ou algodão e que a água some quando seca' },
    ],
    finais67: [
      { tema: 'as frações', objetivo: 'comparar e somar frações com o mesmo denominador', erro: 'somam numeradores e denominadores juntos, e 1/2 + 1/2 vira 2/4' },
      { tema: 'o resumo de texto', objetivo: 'resumir um texto em poucas frases com as ideias principais', erro: 'copiam frases inteiras do texto em vez de dizer com as próprias palavras' },
      { tema: 'os biomas brasileiros', objetivo: 'localizar no mapa os biomas do Brasil e citar uma marca de cada um', erro: 'acham que o Pampa é parte da Mata Atlântica e que bioma é sempre floresta' },
    ],
    finais89: [
      { tema: 'as equações do 1º grau', objetivo: 'resolver equações do 1º grau e conferir a resposta', erro: 'passam o número para o outro lado sem trocar a operação' },
      { tema: 'a argumentação', objetivo: 'defender uma opinião com dois argumentos e um exemplo', erro: 'confundem opinião com argumento e justificam com "porque sim" ou "porque é certo"' },
      { tema: 'as notícias falsas', objetivo: 'checar uma notícia em duas fontes antes de compartilhar', erro: 'acreditam em qualquer notícia com foto, vídeo ou muitos compartilhamentos' },
    ],
    medio: [
      { tema: 'a redação dissertativa', objetivo: 'escrever uma introdução com tese clara e anunciar dois argumentos', erro: 'deixam a tese só para o fim e escrevem argumentos sem exemplo nem dado' },
      { tema: 'as funções do 1º grau', objetivo: 'montar e ler o gráfico de uma função afim a partir de uma situação', erro: 'confundem a taxa de variação com o ponto onde a reta corta o eixo y' },
      { tema: 'o projeto de vida', objetivo: 'traçar metas para os próximos três anos com passos concretos', erro: 'escrevem sonhos sem passos e confundem meta com desejo' },
    ],
    eja1: [
      { tema: 'as contas da casa', objetivo: 'achar numa conta de luz o valor, o consumo e o vencimento', erro: 'confundem o valor a pagar com o consumo em kWh e com o mês de referência' },
      { tema: 'os documentos pessoais', objetivo: 'preencher uma ficha de cadastro com nome, endereço e documentos', erro: 'trocam o número do RG com o do CPF e deixam campos obrigatórios em branco' },
      { tema: 'a receita médica', objetivo: 'ler numa receita o nome do remédio, a dose e os horários', erro: 'confundem "de 8 em 8 horas" com "8 vezes ao dia"' },
    ],
    eja2: [
      { tema: 'o contracheque', objetivo: 'ler um contracheque e conferir salário, descontos e férias', erro: 'confundem salário bruto com líquido e acham que o FGTS sai do salário' },
      { tema: 'a porcentagem no dia a dia', objetivo: 'calcular desconto, juros e aumento em compras e contas', erro: 'acham que um aumento de 10% seguido de um desconto de 10% volta ao preço inicial' },
      { tema: 'o Pampa e o trabalho no campo', objetivo: 'explicar como a pecuária e o arroz mudam o campo da região de Alegrete', erro: 'acham que o campo nativo é terra parada, que só vale se virar lavoura' },
    ],
  },

  portugues: {
    anos12: [
      { tema: 'as sílabas', objetivo: 'separar as sílabas de palavras de duas e três sílabas', erro: 'contam letras em vez de sílabas e separam dígrafos como ch e nh' },
      { tema: 'as rimas', objetivo: 'achar palavras que rimam num poema curto e criar novos pares', erro: 'acham que rimam palavras que só começam igual, como bola e boca' },
      { tema: 'o bilhete', objetivo: 'escrever um bilhete curto com destinatário, recado e assinatura', erro: 'esquecem de dizer para quem é o bilhete e quem está escrevendo' },
    ],
    anos35: [
      { tema: 'os substantivos e os adjetivos', objetivo: 'identificar substantivos e adjetivos numa frase e trocar os adjetivos', erro: 'chamam de adjetivo só as qualidades boas e não reconhecem cor e tamanho' },
      { tema: 'as fábulas', objetivo: 'contar uma fábula com começo, meio, fim e moral', erro: 'confundem a moral da história com o resumo dela' },
      { tema: 'as lendas gaúchas', objetivo: 'recontar uma lenda gaúcha na ordem dos fatos, com começo, meio e fim', erro: 'trocam a ordem dos fatos e contam a lenda como se fosse notícia de verdade' },
    ],
    finais67: [
      { tema: 'a pontuação', objetivo: 'pontuar um texto com vírgula, ponto final e dois-pontos', erro: 'põem vírgula entre o sujeito e o verbo, onde ela não pode ficar' },
      { tema: 'a notícia', objetivo: 'achar numa notícia o que, quem, quando, onde e por quê', erro: 'confundem notícia com opinião e não diferenciam o título do lide' },
      { tema: 'os tempos verbais', objetivo: 'reescrever um texto do presente para o passado sem erro de concordância', erro: 'misturam presente e passado no mesmo parágrafo e escrevem "fizerão" no lugar de "fizeram"' },
    ],
    finais89: [
      { tema: 'o artigo de opinião', objetivo: 'escrever um artigo de opinião com tese, dois argumentos e conclusão', erro: 'só contam o que pensam, sem dar razão nem exemplo' },
      { tema: 'a concordância verbal', objetivo: 'corrigir a concordância em frases com o sujeito depois do verbo', erro: 'escrevem "falta dez dias" e "chegou as cartas" quando o sujeito vem depois' },
      { tema: 'os contos gauchescos', objetivo: 'reconhecer no conto o narrador, o tempo e as palavras do falar gaúcho', erro: 'confundem o narrador com o autor e acham que as palavras regionais estão erradas' },
    ],
    medio: [
      { tema: 'a redação do Enem', objetivo: 'escrever uma proposta de intervenção com agente, ação, meio e finalidade', erro: 'propõem soluções vagas, como "o governo deve fazer algo", sem dizer como' },
      { tema: 'as escolas literárias', objetivo: 'comparar trechos do Romantismo e do Realismo e apontar as diferenças', erro: 'decoram datas e autores, mas não reconhecem as marcas de cada escola no texto' },
      { tema: 'as figuras de linguagem', objetivo: 'identificar metáfora, ironia e hipérbole em letras de música e anúncios', erro: 'confundem metáfora com comparação e levam a ironia ao pé da letra' },
    ],
    eja1: [
      { tema: 'a leitura de avisos', objetivo: 'ler avisos do posto de saúde, do ônibus e do mercado', erro: 'leem palavra por palavra e perdem o sentido da frase inteira' },
      { tema: 'a mensagem de celular', objetivo: 'escrever uma mensagem clara avisando uma falta ao trabalho', erro: 'escrevem como falam, sem dizer quem é, o dia e o motivo' },
      { tema: 'a receita de cozinha', objetivo: 'ler uma receita e separar ingredientes, quantidades e modo de fazer', erro: 'confundem abreviações como "c. sopa" e "c. chá" e pulam etapas do modo de fazer' },
    ],
    eja2: [
      { tema: 'o currículo', objetivo: 'montar um currículo de uma página com experiências e contato', erro: 'colocam RG e CPF no currículo e esquecem de contar o que sabem fazer' },
      { tema: 'a leitura de contratos', objetivo: 'achar num contrato de aluguel ou de compra os prazos, as multas e os deveres', erro: 'assinam sem ler as letras miúdas e confundem multa com juros' },
      { tema: 'a reclamação formal', objetivo: 'escrever uma reclamação com fatos, datas, pedido e prazo', erro: 'escrevem com raiva e sem fatos, datas e pedido claro' },
    ],
  },

  matematica: {
    anos12: [
      { tema: 'os números até 100', objetivo: 'contar, ler e escrever números até 100 e dizer o vizinho de cada um', erro: 'escrevem trinta e um como 301 e trocam a ordem dos algarismos, como 12 e 21' },
      { tema: 'as medidas de comprimento', objetivo: 'medir objetos da sala com palmo, pé e régua e comparar', erro: 'começam a medir do número 1 da régua, e não do zero' },
      { tema: 'o dinheiro e o troco', objetivo: 'juntar moedas e notas para pagar valores até 20 reais', erro: 'acham que ter mais moedas é sempre ter mais dinheiro' },
    ],
    anos35: [
      { tema: 'a tabuada', objetivo: 'usar a tabuada do 2 ao 9 para resolver problemas do dia a dia', erro: 'decoram a tabuada sem entender que 3 x 4 é juntar três grupos de quatro' },
      { tema: 'as frações', objetivo: 'representar metade, terço e quarto com desenhos e dobraduras', erro: 'acham que 1/4 é maior que 1/3, porque 4 é maior que 3' },
      { tema: 'os gráficos e as tabelas', objetivo: 'montar e ler um gráfico de colunas com dados da turma', erro: 'leem a altura da coluna sem olhar a escala e trocam a legenda pelo valor' },
    ],
    finais67: [
      { tema: 'os números decimais', objetivo: 'comparar e ordenar números decimais, como 0,5 e 0,45', erro: 'acham que 0,45 é maior que 0,5, porque 45 é maior que 5' },
      { tema: 'os números inteiros', objetivo: 'somar e subtrair números negativos usando a reta e o termômetro', erro: 'acham que -8 é maior que -3, porque 8 é maior que 3' },
      { tema: 'a área e o perímetro', objetivo: 'calcular a área e o perímetro de terrenos e salas retangulares', erro: 'confundem área com perímetro e somam os lados para achar a área' },
    ],
    finais89: [
      { tema: 'o teorema de Pitágoras', objetivo: 'achar a medida que falta num triângulo retângulo', erro: 'somam os lados em vez dos quadrados e usam o teorema em qualquer triângulo' },
      { tema: 'as equações do 2º grau', objetivo: 'resolver equações do 2º grau e dizer quantas raízes reais elas têm', erro: 'erram o sinal de b na fórmula e não percebem que delta negativo não dá raiz real' },
      { tema: 'a porcentagem e os juros', objetivo: 'calcular juros simples e comparar o preço à vista com o parcelado', erro: 'aplicam a porcentagem sobre o valor errado e somam taxas de meses diferentes' },
    ],
    medio: [
      { tema: 'a função exponencial', objetivo: 'reconhecer crescimento exponencial em juros compostos e em epidemias', erro: 'confundem crescimento exponencial com linear, como se dobrar fosse somar sempre o mesmo' },
      { tema: 'a probabilidade', objetivo: 'calcular a chance de eventos simples e compostos com dados e cartas', erro: 'acham que depois de cinco caras seguidas a coroa fica mais provável' },
      { tema: 'a média, a moda e a mediana', objetivo: 'calcular média, moda e mediana e dizer qual representa melhor os dados', erro: 'acham que a média é sempre o valor do meio e não veem o peso de um valor muito alto' },
    ],
    eja1: [
      { tema: 'as contas do mercado', objetivo: 'somar uma lista de compras e calcular o troco', erro: 'fazem certo de cabeça, mas erram ao armar a conta no papel' },
      { tema: 'as medidas do dia a dia', objetivo: 'converter quilo em gramas e litro em mililitros em receitas e compras', erro: 'leem 1,5 kg como um quilo e cinco gramas' },
      { tema: 'as horas e os prazos', objetivo: 'calcular prazos de vencimento e horas trabalhadas', erro: 'contam a hora como se tivesse 100 minutos: de 7h50 às 8h10 dão 60 minutos' },
    ],
    eja2: [
      { tema: 'os juros e o crediário', objetivo: 'comparar o preço à vista com o parcelado e achar o juro escondido', erro: 'olham só o valor da parcela e não multiplicam pelo número de parcelas' },
      { tema: 'a regra de três', objetivo: 'resolver problemas de proporção, como receitas e consumo de combustível', erro: 'usam a regra de três direta quando as grandezas são inversas, como trabalhadores e dias' },
      { tema: 'o hectare e as medidas do campo', objetivo: 'calcular a área de um terreno em metros quadrados e passar para hectares', erro: 'acham que 1 hectare tem 1.000 m², quando tem 10.000 m²' },
    ],
  },

  ciencias: {
    anos12: [
      { tema: 'os cuidados com o corpo', objetivo: 'dizer hábitos de higiene e quando lavar as mãos', erro: 'acham que as mãos estão limpas se não parecem sujas' },
      { tema: 'as plantas', objetivo: 'dizer as partes da planta e do que ela precisa para crescer', erro: 'acham que a planta come a terra pela raiz' },
      { tema: 'o dia e a noite', objetivo: 'contar o que muda no céu e nas atividades do dia e da noite', erro: 'acham que à noite o Sol vai embora ou se esconde atrás do morro' },
    ],
    anos35: [
      { tema: 'o sistema solar', objetivo: 'dizer a ordem dos planetas e por que existem o dia e a noite', erro: 'acham que o dia e a noite acontecem porque o Sol gira em volta da Terra' },
      { tema: 'os microrganismos', objetivo: 'explicar como os micróbios causam doenças e também fazem pão e iogurte', erro: 'acham que todo micróbio faz mal à saúde' },
      { tema: 'a cadeia alimentar do Pampa', objetivo: 'montar uma cadeia alimentar com plantas e bichos do Pampa', erro: 'invertem o sentido das setas e acham que o bicho maior come todos os outros' },
    ],
    finais67: [
      { tema: 'as células', objetivo: 'diferenciar a célula animal da vegetal num desenho ou no microscópio', erro: 'acham que só os animais têm células, e as plantas não' },
      { tema: 'as misturas e a separação', objetivo: 'escolher o método para separar misturas, como filtração e decantação', erro: 'acham que o sal dissolvido na água sumiu e não dá mais para separar' },
      { tema: 'o bioma Pampa', objetivo: 'citar plantas e bichos do Pampa e as ameaças ao campo nativo', erro: 'acham que campo é pasto vazio e que só a floresta tem biodiversidade' },
    ],
    finais89: [
      { tema: 'a puberdade e a reprodução', objetivo: 'explicar as mudanças da puberdade e os métodos de prevenção', erro: 'acham que não dá para engravidar na primeira relação' },
      { tema: 'as fontes de energia', objetivo: 'comparar fontes de energia e o consumo dos aparelhos de casa', erro: 'acham que a hidrelétrica não causa nenhum impacto no ambiente' },
      { tema: 'a hereditariedade', objetivo: 'explicar como as características passam dos pais para os filhos', erro: 'acham que o filho é uma mistura igual dos pais e que o gene recessivo some' },
    ],
    eja1: [
      { tema: 'a pressão alta e o sal', objetivo: 'ler o rótulo e achar quanto sódio tem um alimento', erro: 'acham que só o sal do saleiro conta e esquecem o dos embutidos e enlatados' },
      { tema: 'a dengue', objetivo: 'achar os focos de água parada em casa e saber como acabar com eles', erro: 'acham que o mosquito só nasce em água suja' },
      { tema: 'as vacinas', objetivo: 'ler a caderneta de vacinação e saber quais doses faltam', erro: 'acham que adulto não precisa mais tomar vacina' },
    ],
    eja2: [
      { tema: 'o uso de antibióticos', objetivo: 'explicar quando o antibiótico funciona e por que tomar até o fim', erro: 'tomam antibiótico para gripe e param quando os sintomas passam' },
      { tema: 'a energia e a conta de luz', objetivo: 'calcular o consumo de um aparelho em kWh e o custo no mês', erro: 'não percebem que o chuveiro elétrico gasta muito mais que a TV' },
      { tema: 'os agrotóxicos e a saúde', objetivo: 'ler o rótulo de um agrotóxico e dizer os cuidados no uso', erro: 'dispensam luva e máscara e acham que o cheiro forte é o único perigo' },
    ],
  },

  historia: {
    anos12: [
      { tema: 'a minha história', objetivo: 'montar uma linha do tempo com fatos da própria vida', erro: 'confundem antes e depois e acham que os avós sempre foram velhos' },
      { tema: 'as brincadeiras de antigamente', objetivo: 'comparar as brincadeiras de hoje com as do tempo dos avós', erro: 'acham que no passado as crianças não tinham brinquedo nenhum' },
      { tema: 'a cidade antigamente', objetivo: 'comparar fotos antigas e atuais da cidade e dizer o que mudou', erro: 'acham que a cidade sempre foi do jeito que é hoje' },
    ],
    anos35: [
      { tema: 'a chegada dos portugueses', objetivo: 'contar como foi o encontro entre indígenas e portugueses em 1500', erro: 'acham que o Brasil estava vazio quando os portugueses chegaram' },
      { tema: 'a escravidão e a abolição', objetivo: 'explicar a escravidão no Brasil e a luta das pessoas escravizadas', erro: 'acham que a liberdade veio só da Lei Áurea, sem a luta dos escravizados' },
      { tema: 'os povos indígenas do RS', objetivo: 'citar povos indígenas do Rio Grande do Sul e o que deixaram na língua e no chimarrão', erro: 'acham que os indígenas só existiram no passado e vivem todos do mesmo jeito' },
    ],
    finais67: [
      { tema: 'o Egito antigo', objetivo: 'explicar por que o rio Nilo foi tão importante para o Egito', erro: 'acham que todos os povos antigos viveram na mesma época' },
      { tema: 'a democracia em Atenas', objetivo: 'comparar a democracia de Atenas com a do Brasil de hoje', erro: 'acham que em Atenas todo mundo votava, inclusive mulheres e escravizados' },
      { tema: 'as Missões jesuíticas', objetivo: 'explicar como viviam os guaranis nas reduções dos Sete Povos das Missões', erro: 'acham que as Missões eram só igrejas e esquecem o trabalho e a cultura guarani' },
    ],
    finais89: [
      { tema: 'a Revolução Farroupilha', objetivo: 'explicar as causas e o fim da Revolução Farroupilha', erro: 'acham que os farrapos venceram e que o Rio Grande do Sul virou país de vez' },
      { tema: 'a Segunda Guerra Mundial', objetivo: 'explicar as causas da Segunda Guerra e a participação do Brasil', erro: 'confundem a Primeira com a Segunda Guerra e não sabem que o Brasil lutou' },
      { tema: 'a ditadura militar', objetivo: 'explicar o que foi a ditadura de 1964 a 1985 e o que mudou com a democracia', erro: 'acham que na ditadura não havia censura nem perseguição' },
    ],
    medio: [
      { tema: 'a Revolução Industrial', objetivo: 'relacionar a Revolução Industrial com as condições de trabalho de hoje', erro: 'acham que foi só a invenção de máquinas, sem mudança no trabalho e nas cidades' },
      { tema: 'a Era Vargas', objetivo: 'explicar as leis trabalhistas da Era Vargas e o Estado Novo', erro: 'veem Vargas só como "pai dos pobres" ou só como ditador, sem juntar as duas faces' },
      { tema: 'a Constituição de 1988', objetivo: 'citar direitos da Constituição de 1988 e como eles chegam à escola', erro: 'confundem direito com favor e acham que a Constituição só vale para adultos' },
    ],
    eja1: [
      { tema: 'a história do trabalho', objetivo: 'contar como surgiram a carteira de trabalho e os direitos do trabalhador', erro: 'acham que os direitos sempre existiram e não foram conquistados' },
      { tema: 'a cultura afro-brasileira', objetivo: 'reconhecer a herança africana na comida, na música e na língua', erro: 'acham que a cultura afro está só no samba e na capoeira' },
      { tema: 'a história do bairro', objetivo: 'registrar com os moradores mais antigos como era o bairro', erro: 'acham que história é só a dos livros, e não a das pessoas comuns' },
    ],
    eja2: [
      { tema: 'a volta da democracia', objetivo: 'explicar as Diretas Já e quem ganhou o direito de votar depois de 1985', erro: 'acham que o voto sempre foi direto e para todos, inclusive para quem não lê' },
      { tema: 'o êxodo rural', objetivo: 'relacionar a ida do campo para a cidade com a história da própria família', erro: 'acham que quem saiu do campo foi por escolha, sem ver a falta de terra e de trabalho' },
      { tema: 'a Revolução Farroupilha', objetivo: 'separar o que é fato e o que é tradição na história farroupilha', erro: 'acham que a Semana Farroupilha comemora uma vitória dos farrapos' },
    ],
  },

  geografia: {
    anos12: [
      { tema: 'o caminho de casa até a escola', objetivo: 'desenhar o caminho de casa até a escola com pontos de referência', erro: 'trocam direita e esquerda e desenham tudo do mesmo tamanho' },
      { tema: 'o campo e a cidade', objetivo: 'comparar o trabalho e a paisagem do campo e da cidade', erro: 'acham que a comida nasce no mercado e não sabem que vem do campo' },
      { tema: 'as estações do ano', objetivo: 'dizer o que muda no frio e no calor: roupa, comida e paisagem', erro: 'confundem a geada com neve e acham que o frio vem da chuva' },
    ],
    anos35: [
      { tema: 'os pontos cardeais', objetivo: 'achar o leste pelo nascer do Sol e usar os pontos cardeais num mapa', erro: 'acham que o norte é "para cima" e o sul "para baixo", até no chão da sala' },
      { tema: 'o município e o estado', objetivo: 'diferenciar bairro, município, estado e país num mapa', erro: 'acham que Alegrete é um estado ou que o Rio Grande do Sul é um país' },
      { tema: 'o rio Ibirapuitã', objetivo: 'explicar a importância do rio Ibirapuitã para Alegrete e como cuidar dele', erro: 'acham que o rio leva o lixo embora e que ele não volta para a cidade' },
    ],
    finais67: [
      { tema: 'o tempo e o clima', objetivo: 'diferenciar tempo e clima com dados da semana e do ano', erro: 'usam tempo e clima como se fossem a mesma coisa' },
      { tema: 'o relevo e os rios', objetivo: 'reconhecer planície, planalto e bacias hidrográficas num mapa', erro: 'acham que os rios correm de cima para baixo no mapa, do norte para o sul' },
      { tema: 'a pecuária e o arroz no Pampa', objetivo: 'explicar como a pecuária e o arroz irrigado ocupam o campo da Fronteira Oeste', erro: 'acham que a lavoura e o gado não mudam nada no bioma' },
    ],
    finais89: [
      { tema: 'a globalização', objetivo: 'mostrar com objetos de casa de onde vêm os produtos que usamos', erro: 'acham que globalização é só internet, sem efeito no trabalho e nos preços' },
      { tema: 'a população e a pirâmide etária', objetivo: 'ler uma pirâmide etária e dizer se a população está envelhecendo', erro: 'leem a pirâmide invertida e não sabem que a base são os mais novos' },
      { tema: 'o Mercosul e a fronteira', objetivo: 'explicar o Mercosul e o que a fronteira com Uruguai e Argentina muda no comércio', erro: 'acham que a fronteira é só uma linha no mapa, sem efeito na vida das cidades' },
    ],
    eja1: [
      { tema: 'a água e o saneamento', objetivo: 'explicar de onde vem a água da torneira e para onde vai o esgoto', erro: 'acham que a água da torneira vem direto do rio, sem tratamento' },
      { tema: 'o mapa no celular', objetivo: 'achar um endereço no mapa do celular e escolher o melhor caminho', erro: 'se perdem quando o mapa gira e confundem a própria posição com o destino' },
      { tema: 'o clima e o preço da comida', objetivo: 'relacionar a seca e o excesso de chuva com o preço dos alimentos', erro: 'acham que o preço sobe só por causa do mercado, sem ligar ao clima' },
    ],
    eja2: [
      { tema: 'a cidade e a moradia', objetivo: 'explicar por que as cidades crescem para a periferia', erro: 'acham que quem mora longe do centro escolheu, sem ver o preço da terra' },
      { tema: 'o agronegócio e a exportação', objetivo: 'explicar para onde vão a soja e a carne produzidas no Brasil', erro: 'acham que tudo o que se planta aqui fica no Brasil' },
      { tema: 'as enchentes no Rio Grande do Sul', objetivo: 'relacionar as enchentes com o clima e a ocupação das margens dos rios', erro: 'acham que enchente é só azar, sem ligação com a ocupação das margens' },
    ],
  },

  arte: {
    anos12: [
      { tema: 'as cores primárias', objetivo: 'misturar as cores primárias e criar as secundárias com tinta', erro: 'acham que o verde é cor primária e não sabem que vem do azul com o amarelo' },
      { tema: 'o autorretrato', objetivo: 'desenhar o próprio rosto olhando no espelho', erro: 'desenham os olhos no alto da cabeça e esquecem o pescoço e as orelhas' },
      { tema: 'os sons do corpo', objetivo: 'criar um ritmo simples com palmas, pés e estalos', erro: 'confundem som forte com som agudo e som alto com som rápido' },
    ],
    anos35: [
      { tema: 'o teatro de sombras', objetivo: 'montar uma cena de teatro de sombras com fantoches de papel', erro: 'deixam o fantoche longe da tela e a luz no lugar errado, e a sombra sai borrada' },
      { tema: 'os grafismos indígenas', objetivo: 'criar padrões inspirados na cerâmica e na cestaria indígena', erro: 'acham que todo desenho indígena é igual e serve só de enfeite' },
      { tema: 'a música gaúcha', objetivo: 'reconhecer o som da gaita e o ritmo do vanerão e da milonga', erro: 'acham que toda música gaúcha é igual e não percebem a diferença de ritmo' },
    ],
  },

  ingles: {
    finais67: [
      { tema: 'as apresentações', objetivo: 'apresentar-se em inglês dizendo nome, idade e de onde é', erro: 'dizem "I have 12 years" em vez de "I am 12 years old"' },
      { tema: 'os objetos da escola', objetivo: 'perguntar e responder "What is this?" com objetos e cores da sala', erro: 'põem a cor depois do objeto, como em "pencil red"' },
      { tema: 'a rotina diária', objetivo: 'contar a própria rotina usando o presente simples', erro: 'esquecem o -s da terceira pessoa e dizem "she play" em vez de "she plays"' },
    ],
    finais89: [
      { tema: 'o passado simples', objetivo: 'contar o que fez no fim de semana usando verbos no passado', erro: 'põem -ed em verbos irregulares, como "goed" e "buyed"' },
      { tema: 'os falsos cognatos', objetivo: 'reconhecer falsos cognatos em textos curtos', erro: 'acham que "pretend" é pretender e que "push" é puxar' },
      { tema: 'o inglês dos jogos e aplicativos', objetivo: 'entender instruções em inglês de jogos e aplicativos', erro: 'traduzem palavra por palavra e não percebem as expressões fixas' },
    ],
  },

  biologia: {
    medio: [
      { tema: 'as leis de Mendel', objetivo: 'montar um quadro de Punnett e calcular a chance de um filho herdar uma característica', erro: 'acham que chance de 1/4 quer dizer que só um em cada quatro filhos terá a característica' },
      { tema: 'a evolução das espécies', objetivo: 'explicar a seleção natural com o exemplo das bactérias resistentes', erro: 'acham que o ser vivo muda porque precisa, como a girafa que esticou o pescoço' },
      { tema: 'a ecologia do Pampa', objetivo: 'explicar por que o campo nativo do Pampa guarda biodiversidade e carbono no solo', erro: 'acham que plantar árvores no campo nativo sempre ajuda o ambiente' },
    ],
  },

  fisica: {
    medio: [
      { tema: 'as leis de Newton', objetivo: 'explicar o movimento de um carro freando com as leis de Newton', erro: 'acham que é preciso força para manter um corpo em movimento constante' },
      { tema: 'a eletricidade em casa', objetivo: 'calcular a potência e o consumo dos aparelhos da casa', erro: 'confundem potência com energia, e kW com kWh' },
      { tema: 'as energias renováveis', objetivo: 'comparar energia solar, eólica e hidrelétrica em custo e impacto', erro: 'acham que energia renovável não tem nenhum impacto ambiental' },
    ],
  },

  quimica: {
    medio: [
      { tema: 'a tabela periódica', objetivo: 'achar na tabela o grupo e o período de um elemento e dizer se é metal', erro: 'tentam decorar a tabela em vez de entender a lógica das linhas e colunas' },
      { tema: 'o balanceamento de equações', objetivo: 'balancear equações químicas simples, como a combustão do metano', erro: 'mudam os índices das fórmulas em vez dos coeficientes' },
      { tema: 'o pH e a acidez', objetivo: 'medir o pH de produtos de casa com o indicador de repolho roxo', erro: 'acham que todo ácido corrói e que todo produto de limpeza é ácido' },
    ],
  },
};
