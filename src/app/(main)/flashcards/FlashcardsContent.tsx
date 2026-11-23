'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { topics, categories } from '@/content/topics'

type Flashcard = {
  id: string
  topicId: string
  front: string
  back: string
  note: string
}

const cards: Flashcard[] = [
  // Estrutura e função celular
  { id: 'cel-01', topicId: 'celula-estrutura', front: 'Qual é a função da membrana plasmática?', back: 'Controlar a entrada e a saída de substâncias da célula.', note: 'É formada principalmente por uma bicamada de fosfolipídios com proteínas. Sua permeabilidade seletiva mantém condições adequadas no meio intracelular.' },
  { id: 'cel-02', topicId: 'celula-estrutura', front: 'O que é transporte passivo?', back: 'É o transporte de substâncias sem gasto direto de energia pela célula.', note: 'Ocorre a favor do gradiente de concentração. Difusão simples, difusão facilitada e osmose são exemplos.' },
  { id: 'cel-03', topicId: 'celula-estrutura', front: 'O que caracteriza o transporte ativo?', back: 'O movimento de substâncias com gasto de energia, geralmente contra o gradiente de concentração.', note: 'A bomba de sódio e potássio é um exemplo: utiliza ATP para transportar íons através da membrana.' },
  { id: 'cel-04', topicId: 'celula-estrutura', front: 'Qual é a principal função das mitocôndrias?', back: 'Realizar etapas da respiração celular aeróbia e produzir ATP.', note: 'A maior parte do ATP é formada na membrana interna, por meio da cadeia transportadora de elétrons e da ATP sintase.' },
  { id: 'cel-05', topicId: 'celula-estrutura', front: 'Qual organela realiza a fotossíntese?', back: 'O cloroplasto.', note: 'Possui clorofila nos tilacoides. A fase fotoquímica ocorre nas membranas dos tilacoides; o ciclo de Calvin ocorre no estroma.' },
  { id: 'cel-06', topicId: 'celula-estrutura', front: 'Onde ocorre a síntese de proteínas?', back: 'Nos ribossomos, que podem estar livres no citoplasma ou ligados ao retículo endoplasmático rugoso.', note: 'Os ribossomos leem os códons do RNA mensageiro e unem aminoácidos na ordem indicada.' },
  { id: 'cel-07', topicId: 'celula-estrutura', front: 'Qual é a função do complexo golgiense?', back: 'Modificar, armazenar e distribuir substâncias produzidas pela célula.', note: 'Também participa da formação de lisossomos e da secreção celular.' },
  { id: 'cel-08', topicId: 'celula-estrutura', front: 'O que diferencia células procarióticas de eucarióticas?', back: 'Procariontes não possuem núcleo delimitado por membrana nem organelas membranosas.', note: 'Bactérias e arqueias são procariontes. Animais, plantas, fungos e protistas são eucariontes.' },
  { id: 'cel-09', topicId: 'celula-estrutura', front: 'O que acontece com uma célula animal em meio hipertônico?', back: 'Ela perde água por osmose e diminui de volume.', note: 'A água se desloca para o meio com maior concentração efetiva de solutos.' },
  { id: 'cel-10', topicId: 'celula-estrutura', front: 'Quais estruturas são características de células vegetais?', back: 'Parede celular de celulose, plastídios — como cloroplastos — e um grande vacúolo central.', note: 'A parede oferece sustentação; o vacúolo participa do armazenamento e do equilíbrio osmótico; os cloroplastos realizam fotossíntese.' },

  // Divisão celular
  { id: 'div-01', topicId: 'divisao-celular', front: 'Quais etapas compõem a intérfase?', back: 'G1, S e G2.', note: 'Em G1 a célula cresce; em S ocorre a duplicação do DNA; em G2 há preparação para a divisão.' },
  { id: 'div-02', topicId: 'divisao-celular', front: 'Em que fase do ciclo celular o DNA é duplicado?', back: 'Na fase S da intérfase.', note: 'Após a duplicação, cada cromossomo passa a apresentar duas cromátides-irmãs unidas pelo centrômero.' },
  { id: 'div-03', topicId: 'divisao-celular', front: 'Qual é o resultado geral da mitose?', back: 'Duas células-filhas geneticamente semelhantes à célula que iniciou a divisão.', note: 'Em geral, o número de cromossomos é mantido. A mitose é importante para crescimento, renovação e reparo dos tecidos.' },
  { id: 'div-04', topicId: 'divisao-celular', front: 'Qual é o resultado geral da meiose?', back: 'Quatro células haploides, geralmente geneticamente diferentes.', note: 'Duas divisões sucessivas reduzem o número de cromossomos à metade e contribuem para a variabilidade genética.' },
  { id: 'div-05', topicId: 'divisao-celular', front: 'O que é crossing-over e quando ocorre?', back: 'É a troca de segmentos entre cromátides de cromossomos homólogos, durante a prófase I da meiose.', note: 'A troca de trechos gera novas combinações de alelos nos cromossomos.' },
  { id: 'div-06', topicId: 'divisao-celular', front: 'O que se separa na anáfase da mitose?', back: 'As cromátides-irmãs.', note: 'Na anáfase I da meiose separam-se os cromossomos homólogos; na anáfase II, as cromátides-irmãs.' },
  { id: 'div-07', topicId: 'divisao-celular', front: 'O que se separa na primeira divisão da meiose?', back: 'Os cromossomos homólogos de cada par.', note: 'Essa separação reduz a ploidia: uma célula diploide origina células com um conjunto cromossômico.' },
  { id: 'div-08', topicId: 'divisao-celular', front: 'Por que a meiose aumenta a variabilidade genética?', back: 'Pelo crossing-over e pela segregação independente dos cromossomos homólogos.', note: 'Esses processos produzem gametas com diferentes combinações de alelos.' },
  { id: 'div-09', topicId: 'divisao-celular', front: 'O que é não-disjunção cromossômica?', back: 'É uma falha na separação dos cromossomos homólogos ou das cromátides durante a divisão celular.', note: 'Pode formar gametas com número anormal de cromossomos e levar a alterações numéricas, como trissomias.' },
  { id: 'div-10', topicId: 'divisao-celular', front: 'Como alterações no controle do ciclo celular podem favorecer tumores?', back: 'Podem permitir que células com falhas no DNA continuem se dividindo.', note: 'Proto-oncogenes e genes supressores tumorais participam do controle da proliferação e dos pontos de checagem.' },

  // DNA, RNA e síntese proteica
  { id: 'dna-01', topicId: 'dna-rna-proteina', front: 'Quais são as bases nitrogenadas do DNA?', back: 'Adenina, timina, citosina e guanina.', note: 'A adenina pareia com timina; a citosina pareia com guanina.' },
  { id: 'dna-02', topicId: 'dna-rna-proteina', front: 'O que significa dizer que a replicação do DNA é semiconservativa?', back: 'Cada molécula nova conserva uma fita da molécula original e possui uma fita recém-sintetizada.', note: 'Cada fita antiga atua como molde para a formação de uma fita complementar.' },
  { id: 'dna-03', topicId: 'dna-rna-proteina', front: 'O que é transcrição?', back: 'É a produção de uma molécula de RNA usando uma sequência de DNA como molde.', note: 'A enzima responsável é a RNA-polimerase. Em células eucarióticas, a transcrição ocorre no núcleo.' },
  { id: 'dna-04', topicId: 'dna-rna-proteina', front: 'Qual é a função do RNA mensageiro?', back: 'Levar a informação genética do DNA até os ribossomos.', note: 'Sua sequência é organizada em códons, que orientam a ordem dos aminoácidos na proteína.' },
  { id: 'dna-05', topicId: 'dna-rna-proteina', front: 'O que é tradução?', back: 'É a produção de uma cadeia polipeptídica a partir da sequência de códons do RNA mensageiro.', note: 'O processo ocorre nos ribossomos, com participação dos RNAs transportadores.' },
  { id: 'dna-06', topicId: 'dna-rna-proteina', front: 'Qual base aparece no RNA no lugar da timina?', back: 'Uracila (U).', note: 'No RNA, a adenina pareia com uracila.' },
  { id: 'dna-07', topicId: 'dna-rna-proteina', front: 'Qual é a função do RNA transportador?', back: 'Levar aminoácidos até o ribossomo durante a tradução.', note: 'Seu anticódon reconhece o códon complementar do RNA mensageiro.' },
  { id: 'dna-08', topicId: 'dna-rna-proteina', front: 'O que é um códon?', back: 'É uma sequência de três nucleotídeos do RNA mensageiro.', note: 'Cada códon especifica um aminoácido ou um sinal de início ou término da tradução.' },
  { id: 'dna-09', topicId: 'dna-rna-proteina', front: 'O que é uma mutação gênica?', back: 'É uma alteração na sequência de nucleotídeos do material genético.', note: 'Pode ser causada por substituição, inserção ou deleção. Seus efeitos podem ser neutros, prejudiciais ou, em certos contextos, vantajosos.' },
  { id: 'dna-10', topicId: 'dna-rna-proteina', front: 'Qual é a diferença entre genoma e gene?', back: 'Genoma é o conjunto do material genético de um organismo; gene é uma região do DNA que contribui para um produto funcional.', note: 'Nem toda sequência do genoma corresponde a um gene que codifica proteína; há também regiões reguladoras e genes de RNA.' },

  // Genética mendeliana
  { id: 'gen-01', topicId: 'genetica-mendeliana', front: 'Qual é a diferença entre genótipo e fenótipo?', back: 'Genótipo é a constituição genética; fenótipo é a característica observável.', note: 'O fenótipo resulta da interação entre genótipo e ambiente.' },
  { id: 'gen-02', topicId: 'genetica-mendeliana', front: 'O que diz a primeira Lei de Mendel?', back: 'Os dois alelos de um gene se separam durante a formação dos gametas.', note: 'Cada gameta recebe apenas um alelo de cada par.' },
  { id: 'gen-03', topicId: 'genetica-mendeliana', front: 'Qual é a proporção genotípica do cruzamento Aa × Aa?', back: '1 AA : 2 Aa : 1 aa.', note: 'Com dominância completa, a proporção fenotípica esperada é 3 dominantes para 1 recessivo.' },
  { id: 'gen-04', topicId: 'genetica-mendeliana', front: 'O que é um indivíduo heterozigoto?', back: 'É aquele que possui dois alelos diferentes para um gene.', note: 'Exemplo: Aa. Um indivíduo AA ou aa é homozigoto.' },
  { id: 'gen-05', topicId: 'genetica-mendeliana', front: 'O que é codominância?', back: 'É o padrão em que os dois alelos se expressam no heterozigoto.', note: 'No sistema ABO, os alelos IA e IB são codominantes e, juntos, produzem o tipo sanguíneo AB.' },
  { id: 'gen-06', topicId: 'genetica-mendeliana', front: 'O que é dominância incompleta?', back: 'É quando o heterozigoto apresenta fenótipo intermediário entre os dois homozigotos.', note: 'Um exemplo didático é o cruzamento de flores vermelhas com brancas que produz flores rosas.' },
  { id: 'gen-07', topicId: 'genetica-mendeliana', front: 'Como funciona o sistema ABO de grupos sanguíneos?', back: 'É determinado pelos alelos IA, IB e i. IA e IB são codominantes; i é recessivo.', note: 'Os genótipos IAIB produzem sangue AB; ii produz sangue O.' },
  { id: 'gen-08', topicId: 'genetica-mendeliana', front: 'Por que características recessivas ligadas ao X podem ser mais frequentes em homens?', back: 'Porque indivíduos XY possuem apenas um cromossomo X; um alelo recessivo nesse cromossomo pode se manifestar.', note: 'Em indivíduos XX, geralmente são necessárias duas cópias recessivas para a manifestação de uma característica recessiva ligada ao X.' },
  { id: 'gen-09', topicId: 'genetica-mendeliana', front: 'Para que serve o cruzamento-teste?', back: 'Para investigar o genótipo de um indivíduo com fenótipo dominante.', note: 'O indivíduo é cruzado com um homozigoto recessivo. A presença de descendentes recessivos indica que ele é heterozigoto.' },
  { id: 'gen-10', topicId: 'genetica-mendeliana', front: 'O que um heredograma representa?', back: 'A transmissão de uma característica genética ao longo das gerações de uma família.', note: 'Quadrados representam homens, círculos representam mulheres e símbolos preenchidos indicam indivíduos que apresentam a característica estudada.' },

  // Evolução
  { id: 'evo-01', topicId: 'evolucao', front: 'Sobre o que a seleção natural atua?', back: 'Sobre diferenças hereditárias entre indivíduos de uma população.', note: 'Indivíduos com características que favorecem a sobrevivência e a reprodução naquele ambiente tendem a deixar mais descendentes.' },
  { id: 'evo-02', topicId: 'evolucao', front: 'Qual é a principal fonte de novos alelos?', back: 'Mutações no material genético.', note: 'A recombinação genética reorganiza alelos existentes; mutações podem originar novas variantes.' },
  { id: 'evo-03', topicId: 'evolucao', front: 'O que é deriva genética?', back: 'É a alteração aleatória das frequências dos alelos de uma população.', note: 'Seu efeito pode ser intenso em populações pequenas. Efeito fundador e gargalo populacional são exemplos.' },
  { id: 'evo-04', topicId: 'evolucao', front: 'O que é fluxo gênico?', back: 'É a transferência de alelos entre populações por meio da migração e reprodução de indivíduos.', note: 'O fluxo gênico pode reduzir diferenças genéticas entre populações.' },
  { id: 'evo-05', topicId: 'evolucao', front: 'O que caracteriza a especiação?', back: 'A formação de novas espécies a partir de populações que acumulam diferenças e passam a apresentar isolamento reprodutivo.', note: 'O isolamento geográfico pode favorecer o processo, mas não é obrigatório em todos os casos.' },
  { id: 'evo-06', topicId: 'evolucao', front: 'O que são órgãos homólogos?', back: 'Estruturas com a mesma origem evolutiva, que podem exercer funções diferentes.', note: 'O braço humano e a asa de um morcego apresentam um plano estrutural relacionado a um ancestral comum.' },
  { id: 'evo-07', topicId: 'evolucao', front: 'O que são órgãos análogos?', back: 'Estruturas com funções semelhantes, mas origens evolutivas diferentes.', note: 'As asas de aves e insetos permitem o voo, mas não têm a mesma origem evolutiva.' },
  { id: 'evo-08', topicId: 'evolucao', front: 'O que são órgãos vestigiais?', back: 'Estruturas herdadas de ancestrais que perderam parte ou a maior parte de sua função original.', note: 'São evidências de mudanças evolutivas ao longo das linhagens.' },
  { id: 'evo-09', topicId: 'evolucao', front: 'Como surge a resistência bacteriana a antibióticos?', back: 'Variantes resistentes são favorecidas pela seleção natural e deixam mais descendentes.', note: 'O antibiótico não cria a mutação necessária: ele seleciona variantes que já apresentam resistência.' },
  { id: 'evo-10', topicId: 'evolucao', front: 'Quais são algumas evidências da evolução?', back: 'Fósseis, anatomia comparada, embriologia, biogeografia e semelhanças moleculares.', note: 'Em conjunto, essas evidências ajudam a reconstruir relações de parentesco e ancestralidade comum.' },

  // Ecologia
  { id: 'eco-01', topicId: 'ecologia', front: 'O que é população em Ecologia?', back: 'Conjunto de indivíduos da mesma espécie que vivem em uma mesma área durante determinado período.', note: 'Uma comunidade reúne populações de espécies diferentes.' },
  { id: 'eco-02', topicId: 'ecologia', front: 'O que é ecossistema?', back: 'É o conjunto formado pela comunidade de seres vivos e pelos fatores abióticos com os quais ela interage.', note: 'Luz, água, solo, temperatura, organismos e suas relações integram o ecossistema.' },
  { id: 'eco-03', topicId: 'ecologia', front: 'Qual é o papel dos produtores em uma cadeia alimentar?', back: 'Produzir matéria orgânica a partir de substâncias inorgânicas, geralmente utilizando energia luminosa.', note: 'Plantas, algas e algumas bactérias são produtores e formam a base de muitas cadeias alimentares.' },
  { id: 'eco-04', topicId: 'ecologia', front: 'Qual é a função dos decompositores?', back: 'Degradar restos e resíduos orgânicos, devolvendo nutrientes ao ambiente.', note: 'Fungos e bactérias participam da ciclagem da matéria em todos os ecossistemas.' },
  { id: 'eco-05', topicId: 'ecologia', front: 'Por que a energia diminui ao longo dos níveis tróficos?', back: 'Porque parte da energia é utilizada no metabolismo e dissipada como calor a cada transferência.', note: 'A matéria pode ser reciclada; a energia flui pelo ecossistema e não retorna integralmente ao nível anterior.' },
  { id: 'eco-06', topicId: 'ecologia', front: 'O que diferencia uma cadeia alimentar de uma teia alimentar?', back: 'A cadeia representa uma sequência linear de alimentação; a teia reúne várias cadeias interligadas.', note: 'Uma espécie pode participar de diferentes relações alimentares e ocupar mais de um nível trófico.' },
  { id: 'eco-07', topicId: 'ecologia', front: 'Qual processo retira dióxido de carbono da atmosfera no ciclo do carbono?', back: 'A fotossíntese.', note: 'Respiração, decomposição e combustão devolvem carbono ao ambiente.' },
  { id: 'eco-08', topicId: 'ecologia', front: 'Qual é o papel das bactérias no ciclo do nitrogênio?', back: 'Realizar transformações como fixação, nitrificação e desnitrificação.', note: 'Esses processos tornam o nitrogênio disponível ou o devolvem à atmosfera.' },
  { id: 'eco-09', topicId: 'ecologia', front: 'O que é sucessão ecológica?', back: 'É a mudança gradual na composição das comunidades de um ambiente ao longo do tempo.', note: 'Na sucessão primária não há solo formado no início; na secundária, o solo já existe.' },
  { id: 'eco-10', topicId: 'ecologia', front: 'O que é eutrofização?', back: 'É o enriquecimento excessivo da água por nutrientes, especialmente nitrogênio e fósforo.', note: 'Pode provocar proliferação de algas e redução do oxigênio dissolvido, prejudicando organismos aquáticos.' },

  // Fisiologia humana
  { id: 'fis-01', topicId: 'fisiologia-humana', front: 'O que é homeostase?', back: 'É a manutenção de condições internas relativamente estáveis, mesmo diante de mudanças externas.', note: 'O feedback negativo corrige desvios, como no controle da temperatura e da glicemia.' },
  { id: 'fis-02', topicId: 'fisiologia-humana', front: 'Qual é a função dos neurônios?', back: 'Receber, processar e transmitir informações por sinais elétricos e químicos.', note: 'Dendritos recebem sinais, o corpo celular integra informações e o axônio conduz o impulso nervoso.' },
  { id: 'fis-03', topicId: 'fisiologia-humana', front: 'Como ocorre a transmissão em uma sinapse química?', back: 'O neurônio pré-sináptico libera neurotransmissores, que se ligam a receptores na célula seguinte.', note: 'A comunicação química permite transmitir sinais entre neurônios ou entre neurônios e outras células.' },
  { id: 'fis-04', topicId: 'fisiologia-humana', front: 'Qual é a função da insulina?', back: 'Reduzir a concentração de glicose no sangue, favorecendo sua captação e armazenamento.', note: 'É produzida pelas células beta do pâncreas. O glucagon atua de forma oposta, elevando a glicemia.' },
  { id: 'fis-05', topicId: 'fisiologia-humana', front: 'Onde ocorre a hematose?', back: 'Nos alvéolos pulmonares, por difusão entre o ar e o sangue dos capilares.', note: 'O oxigênio passa para o sangue e o dióxido de carbono passa do sangue para o interior dos alvéolos.' },
  { id: 'fis-06', topicId: 'fisiologia-humana', front: 'Qual é a função da hemoglobina?', back: 'Transportar a maior parte do oxigênio no sangue.', note: 'É uma proteína presente nas hemácias. Também participa do transporte de parte do dióxido de carbono e do equilíbrio ácido-base.' },
  { id: 'fis-07', topicId: 'fisiologia-humana', front: 'Qual é o papel das enzimas digestivas?', back: 'Acelerar a quebra de moléculas dos alimentos em unidades menores que podem ser absorvidas.', note: 'Amilases atuam sobre carboidratos; proteases, sobre proteínas; lipases, sobre lipídios.' },
  { id: 'fis-08', topicId: 'fisiologia-humana', front: 'Qual é a unidade funcional dos rins?', back: 'O néfron.', note: 'Realiza filtração do sangue, reabsorção de substâncias úteis e secreção de compostos para formar a urina.' },
  { id: 'fis-09', topicId: 'fisiologia-humana', front: 'Qual é a diferença entre imunidade inata e adaptativa?', back: 'A inata é uma defesa rápida e inespecífica; a adaptativa é específica e pode formar memória imunológica.', note: 'A imunidade adaptativa envolve principalmente linfócitos B e T.' },
  { id: 'fis-10', topicId: 'fisiologia-humana', front: 'Como as vacinas contribuem para a proteção do organismo?', back: 'Apresentam antígenos ao sistema imune e estimulam a formação de uma resposta e de células de memória.', note: 'Em uma exposição futura ao mesmo agente, a resposta imunológica tende a ser mais rápida e eficiente.' },

  // Botânica
  { id: 'bot-01', topicId: 'botanica', front: 'Qual é a função geral da fotossíntese?', back: 'Converter energia luminosa em energia química armazenada em moléculas orgânicas.', note: 'Na fotossíntese oxigênica, água e dióxido de carbono são utilizados e há liberação de oxigênio.' },
  { id: 'bot-02', topicId: 'botanica', front: 'O que acontece na fase fotoquímica da fotossíntese?', back: 'A energia luminosa é captada e utilizada para produzir ATP e NADPH, com liberação de oxigênio pela quebra da água.', note: 'Ocorre nas membranas dos tilacoides dos cloroplastos.' },
  { id: 'bot-03', topicId: 'botanica', front: 'O que acontece no ciclo de Calvin?', back: 'O carbono do CO₂ é incorporado a moléculas orgânicas, utilizando ATP e NADPH.', note: 'O ciclo ocorre no estroma dos cloroplastos e não depende diretamente da luz, embora dependa dos produtos da fase fotoquímica.' },
  { id: 'bot-04', topicId: 'botanica', front: 'O que o xilema transporta?', back: 'Água e sais minerais, que formam a seiva bruta.', note: 'O transporte ocorre predominantemente das raízes para as partes aéreas da planta.' },
  { id: 'bot-05', topicId: 'botanica', front: 'O que o floema transporta?', back: 'Açúcares e outras substâncias orgânicas, que compõem a seiva elaborada.', note: 'O transporte ocorre entre regiões-fonte, que fornecem açúcares, e regiões-dreno, que os utilizam ou armazenam.' },
  { id: 'bot-06', topicId: 'botanica', front: 'Qual é a função dos estômatos?', back: 'Regular as trocas gasosas e a perda de água por transpiração.', note: 'A abertura e o fechamento são controlados pelas células-guarda.' },
  { id: 'bot-07', topicId: 'botanica', front: 'Qual é a função da auxina?', back: 'Participar do crescimento vegetal, especialmente do alongamento celular.', note: 'A distribuição desigual de auxina pode causar o fototropismo, orientando o crescimento em direção à luz.' },
  { id: 'bot-08', topicId: 'botanica', front: 'Qual hormônio vegetal está associado ao amadurecimento de frutos?', back: 'Etileno.', note: 'É um hormônio gasoso que participa do amadurecimento de frutos climatéricos, como banana e tomate.' },
  { id: 'bot-09', topicId: 'botanica', front: 'O que se forma a partir do óvulo e do ovário após a fecundação nas angiospermas?', back: 'O óvulo origina a semente e o ovário origina o fruto.', note: 'A semente abriga o embrião e reservas nutritivas; o fruto participa da proteção e dispersão das sementes.' },
  { id: 'bot-10', topicId: 'botanica', front: 'Qual é a principal diferença reprodutiva entre gimnospermas e angiospermas?', back: 'Gimnospermas possuem sementes não envolvidas por frutos; angiospermas produzem flores e frutos.', note: 'Nas angiospermas, as sementes ficam protegidas pelo fruto, formado a partir do ovário.' },

  // Zoologia
  { id: 'zoo-01', topicId: 'zoologia', front: 'Qual é a principal característica dos poríferos?', back: 'Possuem corpo com poros e realizam alimentação por filtração.', note: 'Não apresentam tecidos verdadeiros nem órgãos. A água circula pelo corpo e permite a captura de partículas alimentares.' },
  { id: 'zoo-02', topicId: 'zoologia', front: 'Qual estrutura é característica dos cnidários?', back: 'Os cnidócitos, células que possuem estruturas urticantes utilizadas na defesa e captura de presas.', note: 'Águas-vivas, corais e anêmonas são exemplos de cnidários.' },
  { id: 'zoo-03', topicId: 'zoologia', front: 'Qual é a característica geral dos platelmintos?', back: 'São animais de corpo achatado dorsoventralmente e acelomados.', note: 'O grupo inclui espécies de vida livre e parasitas, como planárias e tênias.' },
  { id: 'zoo-04', topicId: 'zoologia', front: 'O que caracteriza os anelídeos?', back: 'O corpo segmentado em anéis.', note: 'Minhocas e sanguessugas são exemplos. Muitos apresentam circulação fechada.' },
  { id: 'zoo-05', topicId: 'zoologia', front: 'Quais estruturas caracterizam os moluscos?', back: 'Manto, massa visceral e pé muscular.', note: 'Caracóis, ostras e polvos pertencem ao filo dos moluscos.' },
  { id: 'zoo-06', topicId: 'zoologia', front: 'O que caracteriza os artrópodes?', back: 'Apêndices articulados e exoesqueleto de quitina.', note: 'O crescimento ocorre por ecdise, a troca periódica do exoesqueleto.' },
  { id: 'zoo-07', topicId: 'zoologia', front: 'Qual é uma característica exclusiva dos equinodermos?', back: 'O sistema ambulacrário, relacionado à locomoção, alimentação e percepção do ambiente.', note: 'Estrelas-do-mar, ouriços-do-mar e pepinos-do-mar são exemplos de equinodermos marinhos.' },
  { id: 'zoo-08', topicId: 'zoologia', front: 'Quais características definem os cordados em alguma fase da vida?', back: 'Notocorda, tubo nervoso dorsal e fendas faringianas.', note: 'Nos vertebrados, a notocorda é substituída total ou parcialmente pela coluna vertebral durante o desenvolvimento.' },
  { id: 'zoo-09', topicId: 'zoologia', front: 'O que é metamorfose?', back: 'É uma transformação importante da forma corporal durante o desenvolvimento do animal.', note: 'Pode ser completa, como em borboletas, ou incompleta, como em gafanhotos.' },
  { id: 'zoo-10', topicId: 'zoologia', front: 'Qual é a diferença entre simetria radial e bilateral?', back: 'Na radial, partes do corpo se organizam ao redor de um eixo central; na bilateral, há um único plano que divide o corpo em metades semelhantes.', note: 'A simetria bilateral está frequentemente associada à cefalização e ao deslocamento orientado.' },

  // Biotecnologia
  { id: 'bio-01', topicId: 'biotecnologia', front: 'Para que serve a técnica de PCR?', back: 'Amplificar um trecho específico de DNA, produzindo muitas cópias dessa sequência.', note: 'A reação envolve ciclos de desnaturação, anelamento dos primers e extensão pela DNA-polimerase.' },
  { id: 'bio-02', topicId: 'biotecnologia', front: 'O que são enzimas de restrição?', back: 'Enzimas que reconhecem sequências específicas de DNA e realizam cortes nessas regiões.', note: 'São utilizadas em técnicas de DNA recombinante e em diferentes procedimentos de análise genética.' },
  { id: 'bio-03', topicId: 'biotecnologia', front: 'O que é um plasmídeo?', back: 'Uma pequena molécula de DNA geralmente circular, separada do cromossomo bacteriano e capaz de se replicar.', note: 'Plasmídeos são usados como vetores para transportar fragmentos de DNA em engenharia genética.' },
  { id: 'bio-04', topicId: 'biotecnologia', front: 'O que é DNA recombinante?', back: 'É uma molécula de DNA formada pela união de fragmentos de origens distintas.', note: 'Pode ser inserida em um vetor e introduzida em uma célula para replicação ou produção de uma proteína.' },
  { id: 'bio-05', topicId: 'biotecnologia', front: 'O que define um organismo transgênico?', back: 'A presença de material genético introduzido por engenharia genética, geralmente proveniente de outra espécie.', note: 'A transgenia pode conferir características agrícolas, médicas ou industriais.' },
  { id: 'bio-06', topicId: 'biotecnologia', front: 'Qual é a função do RNA guia no sistema CRISPR-Cas9?', back: 'Reconhecer a sequência-alvo e direcionar a proteína Cas9 até o local correspondente no DNA.', note: 'A Cas9 realiza um corte no DNA; o sistema de reparo celular pode produzir alterações nessa região.' },
  { id: 'bio-07', topicId: 'biotecnologia', front: 'O que é terapia gênica?', back: 'É uma abordagem que busca tratar doenças por meio da introdução, remoção ou alteração de material genético em células.', note: 'As estratégias variam conforme a doença e podem utilizar vetores para levar o material genético às células-alvo.' },
  { id: 'bio-08', topicId: 'biotecnologia', front: 'O que caracteriza uma célula-tronco?', back: 'A capacidade de autorrenovação e de diferenciação em outros tipos celulares.', note: 'A potência varia: células totipotentes, pluripotentes e multipotentes apresentam diferentes possibilidades de diferenciação.' },
  { id: 'bio-09', topicId: 'biotecnologia', front: 'Qual é a diferença entre clonagem reprodutiva e terapêutica?', back: 'A reprodutiva busca gerar um organismo; a terapêutica busca obter células ou tecidos para pesquisa e possíveis aplicações médicas.', note: 'As duas abordagens envolvem questões técnicas e bioéticas importantes.' },
  { id: 'bio-10', topicId: 'biotecnologia', front: 'Quais questões são discutidas pela bioética na biotecnologia?', back: 'Segurança, consentimento, privacidade genética, impactos ambientais, justiça e acesso às tecnologias.', note: 'A análise considera riscos e benefícios para indivíduos, comunidades e gerações futuras.' },
]

export function FlashcardsContent() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeTopic, setActiveTopic] = useState<string>('all')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [known, setKnown] = useState<string[]>([])
  const [seen, setSeen] = useState<string[]>([])

  // Abre diretamente o baralho do módulo quando a página recebe ?topico=...
  useEffect(() => {
    const topicId = new URLSearchParams(window.location.search).get('topico')
    if (!topicId) return

    const selectedTopic = topics.find((topic) => topic.id === topicId)
    if (!selectedTopic) return

    setActiveCategory(selectedTopic.category)
    setActiveTopic(selectedTopic.id)
    setActiveIndex(0)
    setIsFlipped(false)
  }, [])

  const filteredCards = useMemo(() => cards.filter((card) => {
    const topic = topics.find((item) => item.id === card.topicId)
    const categoryMatch = activeCategory === 'all' || topic?.category === activeCategory
    const topicMatch = activeTopic === 'all' || card.topicId === activeTopic
    return categoryMatch && topicMatch
  }), [activeCategory, activeTopic])

  const current = filteredCards[activeIndex]
  const currentTopic = current ? topics.find((item) => item.id === current.topicId) : undefined
  const categoryName = categories.find((item) => item.id === currentTopic?.category)?.name || 'Biologia'
  const knownCount = filteredCards.filter((card) => known.includes(card.id)).length
  const seenCount = filteredCards.filter((card) => seen.includes(card.id)).length
  const currentTopicCards = current ? filteredCards.filter((card) => card.topicId === current.topicId) : []
  const topicCardNumber = current ? currentTopicCards.findIndex((card) => card.id === current.id) + 1 : 0

  const changeCategory = (category: string) => {
    setActiveCategory(category)
    setActiveTopic('all')
    setActiveIndex(0)
    setIsFlipped(false)
  }

  const changeTopic = (topicId: string) => {
    setActiveTopic(topicId)
    setActiveIndex(0)
    setIsFlipped(false)
  }

  const goTo = (index: number) => {
    if (!filteredCards.length) return
    const next = (index + filteredCards.length) % filteredCards.length
    setActiveIndex(next)
    setIsFlipped(false)
    const nextId = filteredCards[next].id
    setSeen((previous) => previous.includes(nextId) ? previous : [...previous, nextId])
  }

  const markKnown = () => {
    if (!current) return
    setKnown((previous) => previous.includes(current.id) ? previous : [...previous, current.id])
    goTo(activeIndex + 1)
  }

  const shuffle = () => {
    if (filteredCards.length < 2) return
    const options = filteredCards.map((card, index) => index).filter((index) => filteredCards[index].id !== current?.id)
    goTo(options[Math.floor(Math.random() * options.length)])
  }

  const toggleCard = () => {
    if (current) {
      setIsFlipped((previous) => !previous)
      setSeen((previous) => previous.includes(current.id) ? previous : [...previous, current.id])
    }
  }

  return (
    <div className="section-sm">
      <div className="container-custom">
        <motion.header initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-8 max-w-4xl text-center">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[.24em] text-[#75836f]">Biologia ENEM · caderno de revisão</div>
          <h1 className="mb-3 font-display text-display-xl font-semibold tracking-tight text-tinta-900">Flashcards de Biologia</h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-tinta-600">
            Pergunte, tente recordar e só então vire o cartão. Conceitos essenciais organizados por tópico, com explicações para fixar o conteúdo.
          </p>
        </motion.header>

        <div className="mx-auto mb-7 grid max-w-4xl grid-cols-3 gap-3">
          <div className="border-y border-[#dddcd2] py-3 text-center">
            <div className="font-display text-2xl font-semibold text-tinta-900">{filteredCards.length}</div>
            <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[.13em] text-tinta-500">cartões neste baralho</div>
          </div>
          <div className="border-y border-[#dddcd2] py-3 text-center">
            <div className="font-display text-2xl font-semibold text-[#617b65]">{seenCount}</div>
            <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[.13em] text-tinta-500">já revisados</div>
          </div>
          <div className="border-y border-[#dddcd2] py-3 text-center">
            <div className="font-display text-2xl font-semibold text-[#8d6748]">{knownCount}</div>
            <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[.13em] text-tinta-500">já dominados</div>
          </div>
        </div>

        <section className="mx-auto mb-8 max-w-5xl border-y border-[#deddd3] py-4" aria-label="Filtros dos flashcards">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg font-semibold text-tinta-900">Escolha o baralho</h2>
            <button type="button" onClick={() => changeCategory('all')} className="text-xs font-semibold text-[#58745c] underline-offset-4 hover:underline">Mostrar todos</button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => changeCategory('all')} className={activeCategory === 'all' ? 'border border-[#506d55] bg-[#506d55] px-3.5 py-2 text-xs font-semibold text-white' : 'border border-[#d8d8ce] bg-[#fffefa] px-3.5 py-2 text-xs font-medium text-tinta-700 hover:bg-[#f0f1e9]'}>Todos</button>
            {categories.map((category) => (
              <button key={category.id} type="button" onClick={() => changeCategory(category.id)}
                className={activeCategory === category.id ? 'border border-[#506d55] bg-[#506d55] px-3.5 py-2 text-xs font-semibold text-white' : 'border border-[#d8d8ce] bg-[#fffefa] px-3.5 py-2 text-xs font-medium text-tinta-700 hover:bg-[#f0f1e9]'}>
                {category.name}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-[#e7e5dc] pt-4 sm:flex-row sm:items-center">
            <label htmlFor="flashcard-topic" className="text-xs font-semibold text-tinta-600">Tópico específico</label>
            <select id="flashcard-topic" value={activeTopic} onChange={(event) => changeTopic(event.target.value)} className="w-full max-w-md border border-[#d8d8ce] bg-[#fffefa] px-3 py-2.5 text-sm text-tinta-800 outline-none transition focus:border-[#718b71] focus:ring-2 focus:ring-[#e3eadf]">
              <option value="all">Todos os tópicos desta seleção</option>
              {topics.filter((topic) => activeCategory === 'all' || topic.category === activeCategory).map((topic) => <option key={topic.id} value={topic.id}>{topic.title}</option>)}
            </select>
          </div>
        </section>

        {current ? (
          <div className="mx-auto max-w-3xl">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div className="text-xs text-tinta-500">
                <span className="font-semibold text-tinta-800">{activeIndex + 1}</span> / {filteredCards.length}
                <span className="mx-2 text-[#b3b2a8]">|</span>{categoryName}
              </div>
              <div className="text-xs text-tinta-500">{Math.round((seenCount / Math.max(filteredCards.length, 1)) * 100)}% revisado</div>
            </div>
            <div className="mb-5 h-[3px] bg-[#e7e5dc]">
              <div className="h-full bg-[#70876e] transition-all duration-300" style={{ width: (seenCount / Math.max(filteredCards.length, 1) * 100) + '%' }} />
            </div>

            <motion.div key={current.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative">
              <button type="button" onClick={toggleCard} aria-pressed={isFlipped}
                aria-label={isFlipped ? 'Voltar à pergunta' : 'Revelar resposta'}
                className="group relative flex min-h-[390px] w-full flex-col border border-[#d9d8cf] bg-[#fffefa] text-left shadow-[0_18px_48px_-38px_rgba(45,51,42,.45)] transition-shadow hover:shadow-[0_22px_52px_-38px_rgba(45,51,42,.55)] focus:outline-none focus:ring-2 focus:ring-[#718b71] focus:ring-offset-4 sm:min-h-[430px]">
                <div className="h-1 w-full bg-[#607a62]" />
                <div className="flex flex-1 flex-col p-6 sm:p-9">
                  <div className="flex items-start justify-between gap-4 border-b border-[#e8e6dd] pb-4">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#7d8778]">{currentTopic?.title}</div>
                      <div className="mt-1 text-[11px] text-[#a09f94]">Cartão {topicCardNumber} de {currentTopicCards.length}</div>
                    </div>
                    <div className="text-right text-[10px] font-semibold uppercase tracking-[.16em] text-[#7f8878]">{isFlipped ? 'Verso' : 'Frente'}</div>
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
                    {!isFlipped ? (
                      <motion.div key="front" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                        <div className="mb-4 text-[10px] font-semibold uppercase tracking-[.24em] text-[#8a9384]">Pergunta</div>
                        <h2 className="font-display text-[27px] font-medium leading-[1.28] text-[#29372e] sm:text-[34px]">{current.front}</h2>
                      </motion.div>
                    ) : (
                      <motion.div key="back" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                        <div className="mb-4 text-[10px] font-semibold uppercase tracking-[.24em] text-[#71866f]">Resposta</div>
                        <h2 className="font-display text-[25px] font-semibold leading-[1.3] text-[#3f6246] sm:text-[31px]">{current.back}</h2>
                        <div className="mx-auto mt-6 max-w-xl border-t border-[#e7e5dc] pt-4">
                          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-[#8a9384]">Para fixar</div>
                          <p className="text-sm leading-7 text-[#646c62]">{current.note}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex items-center justify-center border-t border-[#e8e6dd] pt-4 text-[11px] font-medium text-[#81877c]">
                    {isFlipped ? 'Clique no cartão para voltar à pergunta' : 'Tente responder antes de revelar o verso'}
                  </div>
                </div>
              </button>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <button type="button" onClick={() => goTo(activeIndex - 1)} className="border border-[#d5d5cb] bg-[#fffefa] px-4 py-2.5 text-sm font-medium text-tinta-700 transition hover:bg-[#f0f1e9]">Anterior</button>
                <button type="button" onClick={shuffle} className="border border-[#d5d5cb] bg-[#fffefa] px-4 py-2.5 text-sm font-medium text-tinta-700 transition hover:bg-[#f0f1e9]">Embaralhar</button>
                <button type="button" onClick={markKnown} disabled={known.includes(current.id)} className="border border-[#607a62] bg-[#607a62] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4e684f] disabled:cursor-default disabled:border-[#e0e7dc] disabled:bg-[#e0e7dc] disabled:text-[#536b55]">
                  {known.includes(current.id) ? 'Já dominado' : 'Já sei esta'}
                </button>
                <button type="button" onClick={() => goTo(activeIndex + 1)} className="border border-[#333f34] bg-[#333f34] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263128]">Próximo</button>
              </div>
            </motion.div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-tinta-500">
              <span>{seenCount} revisados</span>
              <span>{knownCount} dominados</span>
              <span>O progresso desta sessão fica ativo enquanto a página estiver aberta.</span>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl border border-[#d9d8cf] bg-[#fffefa] p-10 text-center">
            <h2 className="font-display text-2xl font-semibold text-tinta-900">Nenhum cartão neste filtro</h2>
            <p className="mt-2 text-sm text-tinta-500">Escolha outra área ou volte para todos os tópicos.</p>
            <button type="button" onClick={() => changeCategory('all')} className="mt-5 border border-[#607a62] bg-[#607a62] px-5 py-2.5 text-sm font-semibold text-white">Mostrar todos</button>
          </div>
        )}

        <div className="mx-auto mt-8 max-w-3xl border-t border-[#deddd3] pt-4 text-center text-xs leading-6 text-[#85877d]">
          Estude um cartão por vez: tente recordar o conceito, confira a explicação e marque como dominado quando conseguir explicá-lo sem consultar.
        </div>
      </div>
    </div>
  )
}
