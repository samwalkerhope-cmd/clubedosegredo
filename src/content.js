// =====================================================================
// CONTEÚDO DO APP — Clube do Segredo (Segredo da Insulina)
// Extraído integralmente do projeto original (21 dias, 3 Segredos da
// Insulina, Lista de Compras, 5 Presentes em PDF, 14 Receitas Poderosas,
// 5 Rituais de 7 Minutos e 10 Protocolos de Imprevistos).
// =====================================================================

export const APP = {
  "nome": "Clube do Segredo",
  "frase": "Você não está sozinha. Sem pressão, só direção.",
  "plano": "Clube Premium",
  "whatsapp": "5531996508234",
  "whatsappRotulo": "Dra. do Segredo no WhatsApp"
}

// =====================================================================
// LINKS DE CHECKOUT E OFERTAS (edite aqui os links e valores)
// =====================================================================
export const OFERTAS = {
  "whatsappDraUrl": "",
  "salada": {
    "checkoutUrl": "",
    "preco": "R$ 19,90",
    "cardTitulo": "Salada de pote — 60 receitas",
    "cardSubtitulo": "Emagreça sem passar fome",
    "badge": "Oferta exclusiva pra você",
    "titulo": "Salada de Pote",
    "descricao": "60 receitas + 19 molhos pra emagrecer sem passar fome — prontas pra sua semana inteira.",
    "itens": [
      "60 receitas de salada no pote",
      "19 molhos que cabem na dieta",
      "Guia: como montar e conservar a semana toda",
      "Você recebe no e-mail e no WhatsApp"
    ],
    "pagamentoRotulo": "Pagamento único",
    "botao": "Quero as receitas por R$ 19,90",
    "fechar": "Agora não"
  },
  "clube": {
    "checkoutUrl": "",
    "vslUrl": "/vsl.html",
    "preco": "R$ 67",
    "titulo": "Dra. do Segredo no WhatsApp",
    "subtitulo": "O Segredo da Insulina te mostra o caminho, a Dra. do Segredo trilha esse caminho com você no WhatsApp.",
    "avisoVideo": "Assista ao vídeo antes de decidir",
    "beneficios": [
      {
        "titulo": "Protocolos para imprevistos",
        "descricao": "Festa, viagem, TPM, preguiça — prontos para usar."
      },
      {
        "titulo": "Dra. do Segredo particular no WhatsApp",
        "descricao": "Acompanhamento próximo, nunca sozinha."
      },
      {
        "titulo": "Minha Evolução",
        "descricao": "Foto, peso e medidas, semana a semana."
      }
    ],
    "acessoRotulo": "Acesso completo",
    "pagamentoRotulo": "pagamento único",
    "resumo": "Dra. do Segredo por todos os 21 dias + Protocolos e materiais pra sempre.",
    "garantia": "Garantia incondicional de 7 dias",
    "itens": [
      "Liberação imediata após o pagamento",
      "Sem mensalidade, sem surpresas",
      "Acesso pelo mesmo login"
    ],
    "botao": "Quero ter a Dra. do Segredo no meu WhatsApp"
  }
}

export const SEMANAS = [
  {
    "numero": 1,
    "titulo": "Semana 1 · Reset e Organização",
    "dias": [
      1,
      7
    ]
  },
  {
    "numero": 2,
    "titulo": "Semana 2 · Ativação Hormonal",
    "dias": [
      8,
      14
    ]
  },
  {
    "numero": 3,
    "titulo": "Semana 3 · Consolidação e Ritmo",
    "dias": [
      15,
      21
    ]
  }
]

export const SEGREDOS = [
  {
    "id": "segredo-1",
    "rotulo": "Segredo 1",
    "icone": "🌱",
    "titulo": "Gel Grego",
    "subtitulo": "A semente que vira gel no estômago",
    "liquidos": [
      "Água",
      "Chá de canela morno sem açúcar",
      "Leite vegetal sem açúcar",
      "Leite sem lactose",
      "Leite integral"
    ],
    "ingredientes": [
      "1 colher de sopa de chia",
      "1 pitada de canela em pó",
      "300 ml do líquido escolhido"
    ],
    "preparo": "Bata tudo no liquidificador por 20 segundos. Beba em seguida.",
    "dica": "A chia absorve líquido e forma um gel que deixa o açúcar entrar no sangue bem mais devagar. Menos pico de insulina depois de comer."
  },
  {
    "id": "segredo-2",
    "rotulo": "Segredo 2",
    "icone": "🍫",
    "titulo": "Achocolatado da Insulina",
    "subtitulo": "Parece doce. Age como remédio.",
    "liquidos": [
      "Água",
      "Chá de canela morno sem açúcar",
      "Leite vegetal sem açúcar",
      "Leite sem lactose",
      "Leite integral"
    ],
    "ingredientes": [
      "1 colher de sopa rasa de psyllium em pó (cerca de 5 g)",
      "1 colher de chá de cacau 100% em pó",
      "300 ml do líquido escolhido"
    ],
    "preparo": "Bata tudo no liquidificador por 20 segundos. Fica com gosto de achocolatado. Beba em seguida.",
    "dica": "O psyllium forma uma camada no intestino que deixa a absorção de açúcar mais lenta. O cacau puro ajuda as células a receber glicose com menos insulina."
  },
  {
    "id": "segredo-3",
    "rotulo": "Segredo 3",
    "icone": "✨",
    "titulo": "Ativador Hormonal",
    "subtitulo": "O segredo das mulheres que não incham",
    "liquidos": [
      "Água",
      "Chá de hibisco morno sem açúcar",
      "Leite vegetal sem açúcar",
      "Leite sem lactose",
      "Leite integral"
    ],
    "ingredientes": [
      "1 colher de sopa de linhaça dourada (preferencialmente triturada ou moída)",
      "1 rodela de gengibre fresco",
      "300 ml do líquido escolhido"
    ],
    "preparo": "Bata tudo no liquidificador por 30 segundos. Use a linhaça preferencialmente triturada ou moída, para melhor aproveitamento. Beba em seguida.",
    "dica": "A linhaça dourada ajuda a equilibrar os hormônios femininos que causam retenção de líquido e vontade de doce. O gengibre ativa a queima de açúcar nos músculos."
  }
]

export const DIAS = [
  {
    "dia": 1,
    "titulo": "Shot Dourado & Chá de Camomila com Melissa",
    "resumo": "Semana 1 · Reset e Organização — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Dourado — 200ml de água morna + 1/2 colher de chá de cúrcuma + 1 pitada de canela",
          "✨ Por que esse shot: Uma forma simples de começar o dia com mais atenção ao seu corpo.",
          "💡 Misture bem para a cúrcuma não ficar em grumos no fundo do copo."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Escolha um dos 3 Segredos da Insulina. Tome após o shot, antes ou junto com o café da manhã. Qualquer um dos três segura a fome até o almoço."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água. Beba 15 minutos antes do almoço. Misture tudo se preferir.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição. Se o vinagre causar desconforto, substitua por água com limão."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Qualquer um dos 3 Segredos da Insulina. A tarde é quando o açúcar cai depois do almoço. Um Segredo agora evita a fome urgente entre 15h e 17h."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água. Beba 15 minutos antes do jantar. O jantar tem o maior risco de pico de insulina do dia.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Melissa: A camomila reduz a ansiedade e prepara o sistema nervoso para o sono. A melissa potencializa o efeito calmante e reduz o cortisol noturno, que quando alto eleva o açúcar em jejum. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Para potencializar os resultados, procure incluir uma fonte de proteína nas principais refeições. A proteína ajuda na saciedade e reduz a vontade de beliscar ao longo do dia.",
          "🎯 Lembre-se: Não buscamos perfeição. Buscamos repetir pequenos hábitos que ajudam a sentir menos fome, ter mais saciedade e facilitar o emagrecimento."
        ]
      }
    ]
  },
  {
    "dia": 2,
    "titulo": "Shot Termogênico Suave & Chá de Camomila com Lavanda",
    "resumo": "Semana 1 · Reset e Organização — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Termogênico Suave — 200ml de água + 1 pitada de gengibre em pó (ou um pequeno pedaço de gengibre fresco ralado)",
          "✨ Por que esse shot: O gengibre é um ingrediente tradicionalmente usado para dar mais sensação de disposição.",
          "💡 Se usar gengibre fresco, rale bem fino para soltar mais sabor."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Escolha um dos 3 Segredos da Insulina. Hoje experimente trocar o líquido que usou ontem. O sabor muda mas o efeito na insulina é o mesmo."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Suco de meio limão + 1 pitada de canela, em 1 copo de água. Beba 15 minutos antes do almoço.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Qualquer um dos 3 Segredos. Se a tarde está agitada, prepare antes e leve em copo com tampa."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água. Misture tudo se preferir.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Lavanda: A lavanda ativa o sistema nervoso parassimpático. Junto com a camomila, cria a condição para o sono profundo, onde acontece a queima de gordura e a regulação hormonal. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Uma refeição com proteína costuma gerar mais saciedade e menos fome entre as refeições."
        ]
      }
    ]
  },
  {
    "dia": 3,
    "titulo": "Shot Canela & Chá de Melissa com Maracujá",
    "resumo": "Semana 1 · Reset e Organização — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Canela — 200ml de água morna + 1 colher de café de canela",
          "✨ Por que esse shot: Pequenos hábitos repetidos todos os dias geram grandes resultados.",
          "💡 Use canela pura em pó, sem misturas com açúcar."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Ativador Hormonal é o mais leve hoje, dia de reset. Refeições mais simples ao longo do dia."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Só 1 copo de água com limão hoje. Dia de reset, refeição mais leve, sem precisar de reforço.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Ativador Hormonal, o mais leve dos 3. Dia de reset, tarde mais simples."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Chá de erva doce sem açúcar. Dia de reset, jantar leve, o chá facilita a digestão.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Melissa com Maracujá: Dia de reset. O maracujá tem ação sedativa suave sem deixar sonolência pela manhã. Ótimo para os dias em que a cabeça fica mais acelerada à noite. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Pequenas escolhas com mais proteína podem ajudar a controlar a fome ao longo do dia."
        ]
      }
    ]
  },
  {
    "dia": 4,
    "titulo": "Shot Dourado Plus & Chá de Camomila com Canela",
    "resumo": "Semana 1 · Reset e Organização — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Dourado Plus — 200ml de água morna + 1/2 colher de chá de cúrcuma + 1 colher de café de canela + 1 pitada de gengibre em pó (ou um pequeno pedaço de gengibre fresco ralado)",
          "✨ Por que esse shot: Uma combinação simples presente em muitas estratégias de bem-estar.",
          "💡 Use a água morna, não fervente, para diluir melhor os temperos. Se usar gengibre fresco, rale bem fino para soltar mais sabor."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Qualquer um dos 3 Segredos. Se for caminhar hoje, tome antes de sair. O corpo vai usar a gordura como combustível mais cedo."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água. Misture tudo se preferir.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Qualquer Segredo antes de uma caminhada ou atividade leve da tarde."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Chá morno com suco de meio limão e 1 pitada de canela. Tome de 15 a 20 minutos antes do jantar para chegar com menos fome à mesa.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Canela: A canela no chá noturno continua regulando a insulina durante o sono. A camomila garante o relaxamento para que essa regulação aconteça. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Proteína é uma das maiores aliadas para quem deseja perder peso sem passar fome.",
          "🎯 Lembre-se: Não buscamos perfeição. Buscamos repetir pequenos hábitos que ajudam a sentir menos fome, ter mais saciedade e facilitar o emagrecimento."
        ]
      }
    ]
  },
  {
    "dia": 5,
    "titulo": "Shot Chá Verde & Chá de Erva doce com Camomila",
    "resumo": "Semana 1 · Reset e Organização — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Chá Verde — 200ml de chá verde morno, sem açúcar",
          "✨ Por que esse shot: Uma alternativa prática para quem gosta de começar o dia com uma bebida quente.",
          "💡 Evite deixar o chá em infusão por mais de 3 minutos, para não amargar."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Escolha o que seu corpo está pedindo. Quer algo mais doce? Achocolatado da Insulina. Quer algo leve? Gel Grego. Quer ativar os hormônios? Ativador Hormonal."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Chá morno (de sua preferência) com suco de meio limão e 1 pitada de canela. Beba 15 minutos antes do almoço.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Qualquer um dos 3 Segredos. Bata no liquidificador e leve num copo com tampa se for sair."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água. A versão rápida para antes do jantar.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Erva doce com Camomila: A erva doce à noite alivia os gases do dia e facilita o sono para quem tem digestão mais lenta. Os flavonoides também reduzem o cortisol. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Antes de reduzir a quantidade de comida, tente melhorar a qualidade da proteína das refeições."
        ]
      }
    ]
  },
  {
    "dia": 6,
    "titulo": "Shot Hortelã & Chá de Camomila com Melissa e Lavanda",
    "resumo": "Semana 1 · Reset e Organização — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Hortelã — 200ml de chá de hortelã sem açúcar",
          "✨ Por que esse shot: Leve, refrescante e fácil de incluir na rotina.",
          "💡 Esmague bem as folhas antes de colocar na água quente, para soltar o sabor."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Se vai sair de casa, tome o Segredo antes de ir. Ele reduz a fome e estabiliza o açúcar no sangue. Você vai fazer escolhas melhores sem sofrimento."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Chá de canela em pau sem açúcar, 15 minutos antes do almoço.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Qualquer um dos 3 Segredos da Insulina. Mesmo fora de casa, vale a pena manter o hábito, é ele que segura a fome no fim da tarde."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Chá de hibisco gelado sem açúcar. Ajuda a digerir carboidratos mais devagar. Beba 15 minutos antes.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Melissa e Lavanda: Os três juntos têm efeito mais poderoso no sistema nervoso do que qualquer um isolado. A melhor combinação para o sono profundo. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Para potencializar os resultados, procure incluir uma fonte de proteína nas principais refeições. A proteína ajuda na saciedade e reduz a vontade de beliscar ao longo do dia."
        ]
      }
    ]
  },
  {
    "dia": 7,
    "titulo": "Shot Camomila & Chá de Camomila simples",
    "resumo": "Semana 1 · Reset e Organização — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Camomila — 200ml de chá de camomila morno sem açúcar",
          "✨ Por que esse shot: Uma opção suave para quem tem estômago sensível.",
          "💡 Beba morno, nunca fervendo, para preservar o efeito calmante."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Dia 7. Faça o Segredo que você mais gostou essa semana."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água. Você já fez isso 7 vezes. O hábito está formado.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: O Segredo favorito da Semana 1. Comemore com a bebida que mais gostou."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água. 7 dias de ritual antes do jantar. Hábito formado.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila simples: Dia 7. A camomila sozinha já prepara o sistema nervoso para dormir. Simples e eficaz. Você completou a Semana 1. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Uma refeição com proteína costuma gerar mais saciedade e menos fome entre as refeições.",
          "🎯 Lembre-se: Não buscamos perfeição. Buscamos repetir pequenos hábitos que ajudam a sentir menos fome, ter mais saciedade e facilitar o emagrecimento."
        ]
      }
    ]
  },
  {
    "dia": 8,
    "titulo": "Shot Dourado & Chá de Camomila com Melissa",
    "resumo": "Semana 2 · Ativação Hormonal — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Dourado — 200ml de água morna + 1/2 colher de chá de cúrcuma + 1 pitada de canela",
          "✨ Por que esse shot: Uma forma simples de começar o dia com mais atenção ao seu corpo.",
          "💡 Misture bem para a cúrcuma não ficar em grumos no fundo do copo."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Hoje o foco é a ativação hormonal. Por isso, o Ativador Hormonal é a melhor escolha para começar a Semana 2."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Água aromatizada com rodelas de limão e 1 pitada de canela. Semana 2, esse ritual já faz parte da sua rotina.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Hoje o foco é a ativação hormonal. Por isso, o Ativador Hormonal é a melhor escolha para a tarde também."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Suco de meio limão + 1 pitada de canela, em 1 copo de água. Semana 2, esse ritual já está mais natural na sua rotina.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Melissa: O sono é onde a leptina e a grelina se regulam. Leptina controla a saciedade. Grelina controla a fome. Dormir bem com camomila e melissa é emagrecimento no piloto automático. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Pequenas escolhas com mais proteína podem ajudar a controlar a fome ao longo do dia."
        ]
      }
    ]
  },
  {
    "dia": 9,
    "titulo": "Shot Termogênico Suave & Chá de Melissa com Lavanda",
    "resumo": "Semana 2 · Ativação Hormonal — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Termogênico Suave — 200ml de água + 1 pitada de gengibre em pó (ou um pequeno pedaço de gengibre fresco ralado)",
          "✨ Por que esse shot: O gengibre é um ingrediente tradicionalmente usado para dar mais sensação de disposição.",
          "💡 Se usar gengibre fresco, rale bem fino para soltar mais sabor."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Achocolatado da Insulina hoje com leite de vaca integral. Fica cremoso e a fome demora a voltar."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Água aromatizada com limão bem gelada e 1 pitada de canela. Versão refrescante.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Achocolatado da Insulina à tarde. Cremoso, saciante e segura a fome até o jantar."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Água aromatizada com limão bem gelada e 1 pitada de canela.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Melissa com Lavanda: A lavanda tem efeito ansiolítico comprovado. Para quem acorda no meio da noite com pensamentos, este blend é o mais eficaz. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Proteína é uma das maiores aliadas para quem deseja perder peso sem passar fome."
        ]
      }
    ]
  },
  {
    "dia": 10,
    "titulo": "Shot Canela & Chá de Camomila com Erva doce",
    "resumo": "Semana 2 · Ativação Hormonal — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Canela — 200ml de água morna + 1 colher de café de canela",
          "✨ Por que esse shot: Pequenos hábitos repetidos todos os dias geram grandes resultados.",
          "💡 Use canela pura em pó, sem misturas com açúcar."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Ativador Hormonal com chá de hibisco sem açúcar. Dia de reset. O mais leve dos 3 Segredos para um dia mais simples."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Só 1 copo de água com limão. Dia de reset, refeição leve, sem necessidade de reforço.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Dia de reset. Chá de hibisco sem açúcar tem efeito diurético natural. Ou Ativador Hormonal bem diluído."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Chá de erva doce sem açúcar. Dia de reset, jantar leve com caldo ou sopa.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Erva doce: Segundo reset. O boldo durante o dia mais a camomila à noite completam o ciclo de apoio ao fígado. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Antes de reduzir a quantidade de comida, tente melhorar a qualidade da proteína das refeições.",
          "🎯 Lembre-se: Não buscamos perfeição. Buscamos repetir pequenos hábitos que ajudam a sentir menos fome, ter mais saciedade e facilitar o emagrecimento."
        ]
      }
    ]
  },
  {
    "dia": 11,
    "titulo": "Shot Dourado Plus & Chá de Camomila com Dente de leão",
    "resumo": "Semana 2 · Ativação Hormonal — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Dourado Plus — 200ml de água morna + 1/2 colher de chá de cúrcuma + 1 colher de café de canela + 1 pitada de gengibre em pó (ou um pequeno pedaço de gengibre fresco ralado)",
          "✨ Por que esse shot: Uma combinação simples presente em muitas estratégias de bem-estar.",
          "💡 Use a água morna, não fervente, para diluir melhor os temperos. Se usar gengibre fresco, rale bem fino para soltar mais sabor."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Escolha qualquer Segredo. Se quiser variar o líquido, use água de coco natural sem açúcar no lugar do leite. O potássio ajuda a eliminar líquido retido."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã, mais 1 copo de água de coco natural. Mesma função, sabor diferente.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Qualquer Segredo com água de coco no lugar do leite. Refrescante e bom para desinchar."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã, mais 1 copo de água de coco.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Dente de leão: O dente de leão tem efeito diurético suave. Ideal após dias com mais sódio na alimentação. A camomila garante o sono. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Para potencializar os resultados, procure incluir uma fonte de proteína nas principais refeições. A proteína ajuda na saciedade e reduz a vontade de beliscar ao longo do dia."
        ]
      }
    ]
  },
  {
    "dia": 12,
    "titulo": "Shot Chá Verde & Chá de Melissa com Canela",
    "resumo": "Semana 2 · Ativação Hormonal — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Chá Verde — 200ml de chá verde morno, sem açúcar",
          "✨ Por que esse shot: Uma alternativa prática para quem gosta de começar o dia com uma bebida quente.",
          "💡 Evite deixar o chá em infusão por mais de 3 minutos, para não amargar."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Achocolatado da Insulina hoje. Versão mais intensa, mais impacto nos receptores de insulina."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Chá verde sem açúcar, 15 minutos antes do almoço. O chá verde melhora a sensibilidade à insulina.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Achocolatado da Insulina. À tarde o cacau dá energia sem a ansiedade que o café dá."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Chá verde sem açúcar, 15 minutos antes do jantar.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Melissa com Canela: A canela no chá noturno continua o trabalho de regulação de insulina durante o sono. A melissa garante a qualidade do sono. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Uma refeição com proteína costuma gerar mais saciedade e menos fome entre as refeições."
        ]
      }
    ]
  },
  {
    "dia": 13,
    "titulo": "Shot Hortelã & Chá de Camomila simples",
    "resumo": "Semana 2 · Ativação Hormonal — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Hortelã — 200ml de chá de hortelã sem açúcar",
          "✨ Por que esse shot: Leve, refrescante e fácil de incluir na rotina.",
          "💡 Esmague bem as folhas antes de colocar na água quente, para soltar o sabor."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Escolha qualquer um dos 3 Segredos, o líquido que preferir. O importante é manter o hábito."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Suco de meio limão + 1 pitada de canela, em 1 copo de água. A mesma receita de sempre.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Qualquer um dos 3 Segredos da Insulina. Escolha o que tiver mais à mão e mantenha o hábito da tarde."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Suco de meio limão + 1 pitada de canela, em 1 copo de água. A mesma receita de sempre.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila simples: A camomila sozinha já cumpre o papel. Simples e eficaz. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Pequenas escolhas com mais proteína podem ajudar a controlar a fome ao longo do dia.",
          "🎯 Lembre-se: Não buscamos perfeição. Buscamos repetir pequenos hábitos que ajudam a sentir menos fome, ter mais saciedade e facilitar o emagrecimento."
        ]
      }
    ]
  },
  {
    "dia": 14,
    "titulo": "Shot Camomila & Chá de Camomila com Melissa e Lavanda",
    "resumo": "Semana 2 · Ativação Hormonal — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Camomila — 200ml de chá de camomila morno sem açúcar",
          "✨ Por que esse shot: Uma opção suave para quem tem estômago sensível.",
          "💡 Beba morno, nunca fervendo, para preservar o efeito calmante."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Último dia da Semana 2. Faça o Segredo que mais gostou essa semana. Amanhã começa a Semana 3."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Qualquer opção que você preferiu nessa semana. 14 dias de ritual antes do almoço.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Último Segredo da tarde da Semana 2. 14 dias mantendo esse hábito já fazem diferença na sua rotina."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Qualquer opção que você preferiu nessa semana. 14 dias de ritual antes do jantar.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Melissa e Lavanda: Dia 14. O blend completo. Você já passou da metade do desafio. Este chá é a recompensa mais funcional que existe. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Proteína é uma das maiores aliadas para quem deseja perder peso sem passar fome."
        ]
      }
    ]
  },
  {
    "dia": 15,
    "titulo": "Shot Dourado & Chá de Camomila com Melissa",
    "resumo": "Semana 3 · Consolidação e Ritmo — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Dourado — 200ml de água morna + 1/2 colher de chá de cúrcuma + 1 pitada de canela",
          "✨ Por que esse shot: Uma forma simples de começar o dia com mais atenção ao seu corpo.",
          "💡 Misture bem para a cúrcuma não ficar em grumos no fundo do copo."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Gel Grego para começar a Semana 3. A canela de manhã prepara os receptores de insulina para o dia inteiro."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água. Semana 3, volta ao básico que funciona.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Gel Grego à tarde. Simples, prático e eficaz."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Chá morno com suco de meio limão e 1 pitada de canela. Volta ao básico da Semana 3.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Melissa: Semana 3 começa com a dupla camomila e melissa, que já virou velha conhecida das suas noites. O sono desta semana consolida tudo que foi construído nas duas semanas anteriores. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Antes de reduzir a quantidade de comida, tente melhorar a qualidade da proteína das refeições."
        ]
      }
    ]
  },
  {
    "dia": 16,
    "titulo": "Shot Termogênico Suave & Chá de Melissa com Lavanda",
    "resumo": "Semana 3 · Consolidação e Ritmo — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Termogênico Suave — 200ml de água + 1 pitada de gengibre em pó (ou um pequeno pedaço de gengibre fresco ralado)",
          "✨ Por que esse shot: O gengibre é um ingrediente tradicionalmente usado para dar mais sensação de disposição.",
          "💡 Se usar gengibre fresco, rale bem fino para soltar mais sabor."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Qualquer Segredo. Hoje, procure encerrar sua última refeição até as 19h. O Segredo da manhã já começa o trabalho de estabilizar a insulina."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Chá morno com suco de meio limão e 1 pitada de canela. Hoje, se possível, procure almoçar um pouco mais cedo.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Qualquer Segredo antes do jantar, por volta das 19h. Se possível, organize o jantar um pouco mais cedo."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água. Se possível, jante um pouco mais cedo hoje.",
          "Hoje, se possível, procure finalizar sua última refeição até as 19h. Depois disso, prefira água e chá sem açúcar até a manhã."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Melissa com Lavanda: Encerrar o jantar mais cedo hoje, por volta das 19h, mais este chá e o gel noturno ajudam a criar uma ótima condição para o sono reparador. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Para potencializar os resultados, procure incluir uma fonte de proteína nas principais refeições. A proteína ajuda na saciedade e reduz a vontade de beliscar ao longo do dia."
        ]
      }
    ]
  },
  {
    "dia": 17,
    "titulo": "Shot Canela & Chá de Camomila com Erva doce",
    "resumo": "Semana 3 · Consolidação e Ritmo — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Canela — 200ml de água morna + 1 colher de café de canela",
          "✨ Por que esse shot: Pequenos hábitos repetidos todos os dias geram grandes resultados.",
          "💡 Use canela pura em pó, sem misturas com açúcar."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Ativador Hormonal com chá de hibisco sem açúcar. O hibisco reforça o efeito de desinchar e reduzir a absorção de carboidratos."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: Água aromatizada com limão e 1 pitada de canela. Misture tudo se preferir.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Ativador Hormonal ou Gel Grego. Os mais leves para a Semana 3."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Água aromatizada com limão e 1 pitada de canela. Misture tudo se preferir.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Erva doce: A erva doce ajuda na digestão do jantar e reduz o estômago pesado que atrapalha o sono. Camomila garante o relaxamento. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Uma refeição com proteína costuma gerar mais saciedade e menos fome entre as refeições.",
          "🎯 Lembre-se: Não buscamos perfeição. Buscamos repetir pequenos hábitos que ajudam a sentir menos fome, ter mais saciedade e facilitar o emagrecimento."
        ]
      }
    ]
  },
  {
    "dia": 18,
    "titulo": "Shot Dourado Plus & Chá de Camomila com Melissa e Lavanda",
    "resumo": "Semana 3 · Consolidação e Ritmo — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Dourado Plus — 200ml de água morna + 1/2 colher de chá de cúrcuma + 1 colher de café de canela + 1 pitada de gengibre em pó (ou um pequeno pedaço de gengibre fresco ralado)",
          "✨ Por que esse shot: Uma combinação simples presente em muitas estratégias de bem-estar.",
          "💡 Use a água morna, não fervente, para diluir melhor os temperos. Se usar gengibre fresco, rale bem fino para soltar mais sabor."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Qualquer Segredo. Hoje de novo, procure encerrar sua última refeição até as 19h."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água. Versão rápida para hoje.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Qualquer Segredo. Já pensou no que vai continuar fazendo depois dos 21 dias?"
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Chá de camomila morno sem açúcar. Já começa a preparar o corpo para o sono enquanto termina a digestão.",
          "Hoje, se possível, procure finalizar sua última refeição até as 19h. Depois disso, prefira água e chá sem açúcar até a manhã."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Melissa e Lavanda: Mais uma noite encerrando o jantar mais cedo. O blend completo ajuda a potencializar o sono nesta noite importante para o seu descanso. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Pequenas escolhas com mais proteína podem ajudar a controlar a fome ao longo do dia."
        ]
      }
    ]
  },
  {
    "dia": 19,
    "titulo": "Shot Chá Verde & Chá de Camomila com Maracujá",
    "resumo": "Semana 3 · Consolidação e Ritmo — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Chá Verde — 200ml de chá verde morno, sem açúcar",
          "✨ Por que esse shot: Uma alternativa prática para quem gosta de começar o dia com uma bebida quente.",
          "💡 Evite deixar o chá em infusão por mais de 3 minutos, para não amargar."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Gel Grego ou Ativador Hormonal. Os dois são os mais leves para a reta final."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: O que você mais gostou nessa semana. Mantenha o hábito.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Gel Grego ou Ativador Hormonal para a reta final."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: O que você mais gostou nessa semana.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Maracujá: Dia 19. O maracujá ajuda a desacelerar a mente. Uma noite de cada vez. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Proteína é uma das maiores aliadas para quem deseja perder peso sem passar fome."
        ]
      }
    ]
  },
  {
    "dia": 20,
    "titulo": "Shot Hortelã & Chá de Melissa com Lavanda",
    "resumo": "Semana 3 · Consolidação e Ritmo — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Hortelã — 200ml de chá de hortelã sem açúcar",
          "✨ Por que esse shot: Leve, refrescante e fácil de incluir na rotina.",
          "💡 Esmague bem as folhas antes de colocar na água quente, para soltar o sabor."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Qualquer Segredo. Hoje, procure encerrar sua última refeição até as 19h. Amanhã é o Dia 21."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água. Penúltima vez na rotina. Vai continuar depois?",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Mais um Segredo da tarde. Depois dos 21 dias, procure manter o hábito pelo menos 3 vezes por semana."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Chá morno com suco de meio limão e 1 pitada de canela. Penúltima vez.",
          "Hoje, se possível, procure finalizar sua última refeição até as 19h. Depois disso, prefira água e chá sem açúcar até a manhã."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Melissa com Lavanda: Mais uma noite caprichando no sono. Encerrar o jantar até as 19h e dormir bem é o melhor momento de queima de gordura de toda a rotina. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Antes de reduzir a quantidade de comida, tente melhorar a qualidade da proteína das refeições."
        ]
      }
    ]
  },
  {
    "dia": 21,
    "titulo": "Shot Camomila & Chá de Camomila com Melissa e Lavanda",
    "resumo": "Semana 3 · Consolidação e Ritmo — Siga o passo a passo dos 6 momentos do dia com seu Segredo da Insulina.",
    "blocos": [
      {
        "titulo": "Ao acordar",
        "itens": [
          "💧 Shot do dia: Shot Camomila — 200ml de chá de camomila morno sem açúcar",
          "✨ Por que esse shot: Uma opção suave para quem tem estômago sensível.",
          "💡 Beba morno, nunca fervendo, para preservar o efeito calmante."
        ]
      },
      {
        "titulo": "Manhã",
        "itens": [
          "🥤 Segredo da Insulina: Faça o Segredo que mais amou nesses 21 dias. Aquele que vai continuar fazendo depois. Este é o hábito que fica."
        ]
      },
      {
        "titulo": "Antes do almoço",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 colher de sopa de vinagre de maçã + 1 pitada de canela, mais 1 copo de água, a mesma receita do Dia 1. Hoje é automático.",
          "Tome sempre antes de sentar para almoçar, nunca junto com a refeição."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Segredo da Insulina: Seu Segredo favorito de toda a rotina. Última tarde. Beba com calma e perceba o que mudou."
        ]
      },
      {
        "titulo": "Antes do jantar",
        "itens": [
          "🌙 15 a 20 minutos antes: Suco de meio limão + 1 pitada de canela, em 1 copo de água. Hoje é automático. Você já sabe o que funciona melhor para você.",
          "Se possível, procure finalizar sua última refeição entre 19h e 21h. Depois disso, prefira água e chá sem açúcar até a manhã. Essa pausa ajuda o corpo a descansar durante a noite."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Chá calmante de Camomila com Melissa e Lavanda: Última noite dos 21 dias. O blend completo para o sono mais reparador. Amanhã você vai acordar e tomar o mesmo shot do Dia 1, mas com hábitos que você já construiu ao longo dessa jornada. Beba morno, sem açúcar, 30 a 40 minutos antes de dormir.",
          "💡 Quarto fresco, sem tela 40 minutos antes. O sono profundo é onde a queima de gordura acontece."
        ]
      },
      {
        "titulo": "Dicas do dia",
        "itens": [
          "💪 Dica Extra: Para potencializar os resultados, procure incluir uma fonte de proteína nas principais refeições. A proteína ajuda na saciedade e reduz a vontade de beliscar ao longo do dia.",
          "🎯 Lembre-se: Não buscamos perfeição. Buscamos repetir pequenos hábitos que ajudam a sentir menos fome, ter mais saciedade e facilitar o emagrecimento."
        ]
      }
    ]
  }
]

export const PRESENTES = [
  {
    "titulo": "Soro da Magreza — Chás",
    "descricao": "A receita completa dos chás para potencializar seus resultados.",
    "arquivo": "/presentes/soro-da-magreza-chas.pdf"
  },
  {
    "titulo": "20 Shakes Emagrecedores",
    "descricao": "Shakes práticos e nutritivos para o dia a dia.",
    "arquivo": "/presentes/shakes-emagrecedores.pdf"
  },
  {
    "titulo": "20 Receitas Detox",
    "descricao": "Combinações naturais para desinchar e limpar o organismo.",
    "arquivo": "/presentes/receitas-detox.pdf"
  },
  {
    "titulo": "40 Sobremesas que Aceleram o Metabolismo",
    "descricao": "Opções doces para matar a vontade sem travar o emagrecimento.",
    "arquivo": "/presentes/sobremesas-metabolismo.pdf"
  },
  {
    "titulo": "Dicas para Acelerar o Resultado",
    "descricao": "Ajustes práticos que destravam a queima de gordura.",
    "arquivo": "/presentes/dicas-acelerar-resultado.pdf"
  }
]

export const LISTA_COMPRAS = [
  {
    "grupo": "⭐ Os essenciais (Base dos 3 Segredos — usa todo dia)",
    "itens": [
      "Chia — 1 pacote de 200g (para o Gel Grego, 1 colher de sopa por dia)",
      "Psyllium em pó — 1 pote de 100g a 150g (para o Achocolatado da Insulina, ~5g por dia)",
      "Cacau 100% em pó — 1 pote de 200g (para o Achocolatado da Insulina)",
      "Linhaça dourada moída — 1 pacote de 200g (para o Ativador Hormonal)",
      "Vinagre de maçã — 1 garrafa de 500ml (antes do almoço e do jantar, todo dia)"
    ]
  },
  {
    "grupo": "🧂 Especiarias secas (Duram o mês todo)",
    "itens": [
      "Canela em pó — 1 vidro maior (nos Segredos, shots, chás e água com limão)",
      "Cúrcuma em pó (açafrão-da-terra) — 1 pote (para o Shot Dourado)",
      "Gengibre em pó — 1 pote (para os shots termogênicos)",
      "Pau de canela (de preferência do Ceilão) — 1 pacotinho (chá de canela e Shot Canela)",
      "Cravo-da-índia + anis-estrelado — 1 pacotinho de cada (versões do chá de canela)",
      "Pimenta-do-reino — para o Leite Dourado (Golden Milk)"
    ]
  },
  {
    "grupo": "🍋 Frutas e frescos (Compre por semana)",
    "itens": [
      "Limão — 15 a 20 unidades no total (para água com limão e chás, quase todo dia)",
      "Gengibre fresco (raiz) — 1 pedaço (para shots, chás e Segredo 3)",
      "Hortelã fresca — 1 maço (para o shot e o chá de hortelã)",
      "Beterraba — 1 unidade (para o Shot Detox de beterraba)",
      "Maçã verde — 1 unidade (para o Shot Detox, suaviza o sabor)",
      "Água de coco — 2 a 3 unidades (variação antes das refeições)"
    ]
  },
  {
    "grupo": "🍵 Chás e ervas (Escolha os que gostar para variar à noite)",
    "itens": [
      "Camomila",
      "Melissa (erva-cidreira)",
      "Erva-doce",
      "Hibisco",
      "Chá verde",
      "Dente-de-leão",
      "Maracujá",
      "Lavanda culinária",
      "Mel puro (opcional, para adoçar levinho)"
    ]
  },
  {
    "grupo": "🥛 O líquido dos Segredos (Escolha 1 da sua preferência)",
    "itens": [
      "Água filtrada",
      "Chá de canela sem açúcar",
      "Leite vegetal sem açúcar",
      "Leite sem lactose",
      "Leite integral"
    ]
  },
  {
    "grupo": "🍗 Para as refeições (A dica de ouro do programa)",
    "itens": [
      "Ovos",
      "Peito de frango",
      "Peixe (filé)",
      "Carne magra ou proteína vegetal",
      "Legumes e folhas à vontade"
    ]
  }
]

export const CATEGORIAS = [
  "Manhã e Ao acordar",
  "Antes das refeições",
  "Tarde e Saciedade",
  "Noite e Antes de dormir"
]

export const RECEITAS = [
  {
    "id": "receita-01",
    "imagem": "/materiais/receita-01.jpg",
    "categoria": "Manhã e Ao acordar",
    "tag": "🌅 Ao acordar · 3 min",
    "titulo": "Água de Berinjela com Limão",
    "descricao": "Uma opção refrescante para aumentar a hidratação e ajudar a reduzir a sensação de inchaço ao longo do dia.",
    "tempo": "3 min",
    "rende": "Assim que acordar, antes de qualquer coisa",
    "quandoTomar": "Assim que acordar, antes de qualquer coisa",
    "quandoDica": "Prepare na noite anterior e deixe na geladeira para facilitar a manhã",
    "beneficios": [
      {
        "icone": "🔓",
        "titulo": "Gordura começa a ser usada",
        "texto": "Com menos açúcar circulando em jejum, o corpo recorre à gordura guardada como fonte de energia."
      },
      {
        "icone": "📉",
        "titulo": "Açúcar em jejum mais baixo",
        "texto": "A berinjela tem substâncias que bloqueiam a liberação de açúcar pelo fígado durante a noite."
      },
      {
        "icone": "💧",
        "titulo": "Desincha desde cedo",
        "texto": "O potássio da berinjela ajuda a eliminar o líquido retido que causa aquele inchaço da manhã."
      },
      {
        "icone": "⚡",
        "titulo": "Começo de dia mais leve",
        "texto": "Com a insulina baixa ao acordar, você sente menos preguiça e mais disposição para o dia."
      }
    ],
    "ingredientes": [
      "2 rodelas — berinjela crua com casca (cerca de 1 cm cada)",
      "suco de 1 — limão tahiti",
      "1 rodela fina — gengibre fresco (cerca de 1 cm)",
      "300 ml — água filtrada gelada",
      "stevia a gosto — para adoçar"
    ],
    "preparo": [
      "Corte a berinjela em cubos sem retirar a casca.",
      "Bata tudo no liquidificador por 1 minuto e meio em velocidade alta.",
      "Coe com peneira fina e tome imediatamente."
    ]
  },
  {
    "id": "receita-02",
    "imagem": "/materiais/receita-02.jpg",
    "categoria": "Manhã e Ao acordar",
    "tag": "🥕 Café da manhã · 4 min",
    "titulo": "Smoothie de Cenoura com Gengibre",
    "descricao": "Cremoso, nutritivo e prático. Uma ótima opção para quem quer mais saciedade e energia entre as refeições.",
    "tempo": "4 min",
    "rende": "No café da manhã, antes de comer",
    "quandoTomar": "No café da manhã, antes de comer",
    "quandoDica": "A cenoura crua preserva mais nutrientes do que cozida",
    "beneficios": [
      {
        "icone": "🫀",
        "titulo": "Fígado funcionando melhor",
        "texto": "A cenoura tem betacaroteno que protege o fígado, que é o órgão que regula o açúcar no sangue."
      },
      {
        "icone": "🌡️",
        "titulo": "Efeito termogênico",
        "texto": "O gengibre aumenta levemente a temperatura do corpo, o que acelera o gasto de energia."
      },
      {
        "icone": "📉",
        "titulo": "Insulina respondendo melhor",
        "texto": "A canela ajuda as células a absorverem o açúcar com menos insulina, facilitando o emagrecimento."
      },
      {
        "icone": "💪",
        "titulo": "Mais disposição",
        "texto": "Com o fígado saudável e a circulação ativa, você sente mais energia ao longo do dia."
      }
    ],
    "ingredientes": [
      "2 unidades médias — cenoura crua descascada e cortada",
      "1 rodela — gengibre fresco (2 cm)",
      "1 col. de chá — canela em pó",
      "suco de ½ — limão tahiti",
      "250 ml — água gelada",
      "gelo — a gosto"
    ],
    "preparo": [
      "Descasque e corte a cenoura em pedaços pequenos para facilitar o liquidificador.",
      "Coloque tudo no liquidificador e bata por 2 minutos em velocidade alta.",
      "Coe se preferir e sirva com gelo."
    ]
  },
  {
    "id": "receita-03",
    "imagem": "/materiais/receita-03.jpg",
    "categoria": "Manhã e Ao acordar",
    "tag": "🍌 Café da manhã · 5 min",
    "titulo": "Smoothie de Banana Verde",
    "descricao": "Ajuda a prolongar a saciedade e diminuir aquela fome que aparece logo depois de comer.",
    "tempo": "5 min",
    "rende": "No café da manhã, no lugar do pão",
    "quandoTomar": "No café da manhã, no lugar do pão",
    "quandoDica": "Substitui o café da manhã e mantém a energia estável até o almoço",
    "beneficios": [
      {
        "icone": "🍌",
        "titulo": "Fome controlada por horas",
        "texto": "A banana verde tem amido que digere devagar, deixando você satisfeita por muito mais tempo."
      },
      {
        "icone": "📉",
        "titulo": "Açúcar no sangue mais estável",
        "texto": "A aveia e a banana verde juntas evitam aquele pico de insulina logo depois do café."
      },
      {
        "icone": "🦠",
        "titulo": "Intestino mais saudável",
        "texto": "O amido da banana verde alimenta as bactérias boas do intestino, que ajudam no emagrecimento."
      },
      {
        "icone": "🌡️",
        "titulo": "Metabolismo ativo",
        "texto": "A canela ajuda o corpo a processar o açúcar com menos insulina, acelerando o metabolismo."
      }
    ],
    "ingredientes": [
      "1 unidade pequena — banana verde (quanto mais verde, melhor)",
      "2 col. de sopa — aveia em flocos finos",
      "200 ml — leite de aveia ou leite comum sem açúcar",
      "1 col. de chá — canela em pó",
      "1 col. de chá — mel ou 2 gotas de stevia",
      "gelo — a gosto"
    ],
    "preparo": [
      "Corte a banana verde em rodelas. Não precisa estar madura.",
      "Coloque todos os ingredientes no liquidificador.",
      "Bata por 1 minuto até ficar bem cremoso. Tome imediatamente."
    ]
  },
  {
    "id": "receita-04",
    "imagem": "/materiais/receita-04.jpg",
    "categoria": "Manhã e Ao acordar",
    "tag": "❤️ Qualquer hora · 5 min",
    "titulo": "Suco de Beterraba com Laranja",
    "descricao": "Uma bebida colorida e nutritiva para ajudar você a se sentir mais disposta durante o dia.",
    "tempo": "5 min",
    "rende": "A qualquer hora do dia, inclusive antes de caminhar",
    "quandoTomar": "A qualquer hora do dia, inclusive antes de caminhar",
    "quandoDica": "Tomar antes de uma caminhada potencializa ainda mais o efeito",
    "beneficios": [
      {
        "icone": "🩸",
        "titulo": "Circulação melhorada",
        "texto": "O nitrato da beterraba dilata os vasos e melhora o transporte de nutrientes para as células."
      },
      {
        "icone": "🔥",
        "titulo": "Queima de gordura ativada",
        "texto": "Com melhor circulação, o oxigênio chega mais fácil aos músculos e a queima de gordura aumenta."
      },
      {
        "icone": "📉",
        "titulo": "Insulina mais baixa",
        "texto": "A beterraba crua tem compostos que melhoram a sensibilidade do corpo à insulina."
      },
      {
        "icone": "💪",
        "titulo": "Mais disposição",
        "texto": "Você sente mais energia para o dia a dia, o que ajuda a se mover mais e emagrecer mais rápido."
      }
    ],
    "ingredientes": [
      "½ unidade média — beterraba crua (descascada e cortada)",
      "1 unidade — laranja (suco, sem adição de açúcar)",
      "1 rodela fina — gengibre fresco (cerca de 1 cm)",
      "200 ml — água gelada",
      "gelo — a gosto"
    ],
    "preparo": [
      "Descasque e corte a beterraba em cubos pequenos.",
      "Esprema a laranja e coloque o suco no liquidificador com a beterraba, o gengibre e a água.",
      "Bata por 2 minutos em velocidade alta. Coe se preferir e sirva com gelo."
    ]
  },
  {
    "id": "receita-05",
    "imagem": "/materiais/receita-05.jpg",
    "categoria": "Tarde e Saciedade",
    "tag": "☀️ Tarde · 3 min",
    "titulo": "Suco de Melancia com Hortelã",
    "descricao": "Refrescante, leve e perfeita para os dias em que você quer algo gostoso sem sair da rotina.",
    "tempo": "3 min",
    "rende": "No lanche da tarde, entre 14h e 17h",
    "quandoTomar": "No lanche da tarde, entre 14h e 17h",
    "quandoDica": "Tome bem gelado para potencializar a sensação de saciedade",
    "beneficios": [
      {
        "icone": "💧",
        "titulo": "Hidratação profunda",
        "texto": "A melancia é 92% água, o que ajuda o corpo a funcionar melhor e a eliminar toxinas."
      },
      {
        "icone": "🫧",
        "titulo": "Menos retenção de líquido",
        "texto": "O potássio da melancia equilibra o sódio no corpo, reduzindo o inchaço e a retenção."
      },
      {
        "icone": "📉",
        "titulo": "Insulina mais controlada",
        "texto": "A melancia tem citrulina, substância que melhora a circulação e a resposta à insulina."
      },
      {
        "icone": "🌿",
        "titulo": "Vontade de doce embora",
        "texto": "A hortelã reduz o apetite e o frescor ajuda a resistir aos doces no horário mais difícil do dia."
      }
    ],
    "ingredientes": [
      "3 fatias médias — melancia fresca sem sementes",
      "8 folhas — hortelã fresca",
      "suco de ½ — limão tahiti",
      "gelo — abundante"
    ],
    "preparo": [
      "Corte a melancia em cubos, retirando as sementes.",
      "Bata tudo no liquidificador por 30 segundos.",
      "Sirva imediatamente com bastante gelo. Não precisa coar."
    ]
  },
  {
    "id": "receita-06",
    "imagem": "/materiais/receita-06.jpg",
    "categoria": "Manhã e Ao acordar",
    "tag": "💧 O dia todo · 3 min",
    "titulo": "Água de Pepino com Hortelã",
    "descricao": "Uma água leve e saborosa para ajudar você a se manter hidratada e sentir o corpo menos inchado ao longo do dia.",
    "tempo": "3 min",
    "rende": "Durante o dia inteiro, no lugar de sucos industrializados",
    "quandoTomar": "Durante o dia inteiro, no lugar de sucos industrializados",
    "quandoDica": "Prepare uma jarra e beba ao longo do dia",
    "beneficios": [
      {
        "icone": "💧",
        "titulo": "Hidratação que ajuda a emagrecer",
        "texto": "Muita gente confunde sede com fome. Ficar bem hidratada reduz a vontade de beliscar."
      },
      {
        "icone": "🫧",
        "titulo": "Desincha rápido",
        "texto": "O pepino tem substâncias que ajudam o corpo a eliminar o líquido retido."
      },
      {
        "icone": "🌿",
        "titulo": "Menos vontade de comer doce",
        "texto": "A hortelã reduz o apetite e dá uma sensação de frescor que ajuda a resistir aos doces."
      },
      {
        "icone": "📉",
        "titulo": "Açúcar mais controlado",
        "texto": "O limão tem ácido que retarda a absorção do açúcar, mantendo a insulina mais estável."
      }
    ],
    "ingredientes": [
      "½ unidade — pepino japonês (fatiado, com casca)",
      "10 folhas — hortelã fresca",
      "suco de 1 — limão tahiti",
      "600 ml — água filtrada gelada",
      "gelo — a gosto"
    ],
    "preparo": [
      "Fatie o pepino em rodelas finas, sem retirar a casca.",
      "Coloque tudo no liquidificador e bata por 30 segundos.",
      "Coe com peneira fina, coloque gelo e beba ao longo do dia."
    ]
  },
  {
    "id": "receita-07",
    "imagem": "/materiais/receita-07.jpg",
    "categoria": "Manhã e Ao acordar",
    "tag": "🌞 Manhã · 4 min",
    "titulo": "Suco de Abacaxi com Cúrcuma",
    "descricao": "Uma bebida saborosa para ajudar a desinchar, melhorar a digestão e deixar você com aquela sensação de leveza.",
    "tempo": "4 min",
    "rende": "De manhã, após o café da manhã",
    "quandoTomar": "De manhã, após o café da manhã",
    "quandoDica": "Não tome em jejum. Funciona melhor com alguma comida no estômago",
    "beneficios": [
      {
        "icone": "🔥",
        "titulo": "Anti-inflamatório potente",
        "texto": "A cúrcuma é uma das plantas mais estudadas para reduzir a inflamação que causa resistência à insulina."
      },
      {
        "icone": "🫁",
        "titulo": "Intestino funcionando bem",
        "texto": "O abacaxi tem bromelina, uma enzima que melhora a digestão e reduz o inchaço abdominal."
      },
      {
        "icone": "📉",
        "titulo": "Insulina mais sensível",
        "texto": "A curcumina da cúrcuma ajuda as células a responderem melhor à insulina."
      },
      {
        "icone": "✨",
        "titulo": "Pele e energia melhores",
        "texto": "Com menos inflamação no corpo, você dorme melhor, tem mais energia e a pele melhora."
      }
    ],
    "ingredientes": [
      "2 fatias médias — abacaxi fresco (sem a casca)",
      "1 col. de chá — cúrcuma em pó",
      "1 pitada — pimenta-preta moída (ativa a cúrcuma)",
      "suco de ½ — limão tahiti",
      "200 ml — água gelada",
      "gelo — a gosto"
    ],
    "preparo": [
      "Corte o abacaxi em cubos e coloque no liquidificador.",
      "Adicione a cúrcuma, a pimenta-preta, o limão e a água.",
      "Bata por 1 minuto. Coe se preferir e sirva com gelo."
    ]
  },
  {
    "id": "receita-08",
    "imagem": "/materiais/receita-08.jpg",
    "categoria": "Manhã e Ao acordar",
    "tag": "🍇 Lanche · 5 min",
    "titulo": "Suco de Uva Roxa com Canela",
    "descricao": "Uma opção docinha e natural para os dias em que bate aquela vontade de doce, sem sair da linha.",
    "tempo": "5 min",
    "rende": "No lanche da tarde, entre o almoço e o jantar",
    "quandoTomar": "No lanche da tarde, entre o almoço e o jantar",
    "quandoDica": "Evite tomar à noite, pois o açúcar natural da uva pode atrapalhar o sono",
    "beneficios": [
      {
        "icone": "🍇",
        "titulo": "Antioxidantes da casca da uva",
        "texto": "O resveratrol da casca da uva roxa protege as células contra o dano causado pelo açúcar alto."
      },
      {
        "icone": "📉",
        "titulo": "Pico de insulina menor",
        "texto": "A fibra da uva inteira com casca faz o açúcar ser absorvido devagar pelo corpo."
      },
      {
        "icone": "🌡️",
        "titulo": "Efeito da canela",
        "texto": "A canela imita a ação da insulina nas células, ajudando o corpo a usar o açúcar com mais eficiência."
      },
      {
        "icone": "😴",
        "titulo": "Sono e humor melhores",
        "texto": "Os polifenóis da uva roxa ajudam a regular o cortisol, o hormônio do estresse que engorda."
      }
    ],
    "ingredientes": [
      "1 cacho pequeno — uva roxa com casca (sem sementes, se possível)",
      "1 col. de chá — canela em pó",
      "suco de ½ — limão tahiti",
      "150 ml — água gelada",
      "gelo — a gosto"
    ],
    "preparo": [
      "Lave bem as uvas e coloque no liquidificador com a casca.",
      "Adicione a canela, o limão e a água.",
      "Bata por 1 minuto e coe para retirar as películas. Sirva com gelo."
    ]
  },
  {
    "id": "receita-09",
    "imagem": "/materiais/receita-09.jpg",
    "categoria": "Manhã e Ao acordar",
    "tag": "🍓 Café da manhã · 5 min",
    "titulo": "Suco de Morango com Chia",
    "descricao": "Parece sobremesa, mas ajuda você a se sentir saciada por mais tempo e a segurar a vontade de beliscar.",
    "tempo": "5 min",
    "rende": "No café da manhã ou no lanche da tarde",
    "quandoTomar": "No café da manhã ou no lanche da tarde",
    "quandoDica": "Deixe a chia de molho 10 minutos antes para o gel se formar",
    "beneficios": [
      {
        "icone": "🍓",
        "titulo": "Vitamina C que emagrece",
        "texto": "O morango é rico em vitamina C, que o corpo precisa para queimar gordura durante o exercício."
      },
      {
        "icone": "🫘",
        "titulo": "Fibra que segura o açúcar",
        "texto": "A chia forma um gel no estômago que impede o açúcar de cair direto na corrente sanguínea."
      },
      {
        "icone": "😌",
        "titulo": "Sem picos de insulina",
        "texto": "A combinação de fibra e antioxidantes do morango mantém a insulina em níveis baixos e estáveis."
      },
      {
        "icone": "🌸",
        "titulo": "Pele e intestino melhores",
        "texto": "Os antioxidantes do morango reduzem a inflamação que afeta a pele e o funcionamento do intestino."
      }
    ],
    "ingredientes": [
      "10 unidades — morangos frescos (lavados e sem o cabo)",
      "1 col. de sopa — chia (deixe de molho em 3 col. de água por 10 min antes)",
      "200 ml — água gelada",
      "suco de ½ — limão tahiti",
      "stevia a gosto — para adoçar",
      "gelo — a gosto"
    ],
    "preparo": [
      "Deixe a chia de molho em 3 colheres de água por 10 minutos até virar um gel.",
      "Bata os morangos com a água e o limão no liquidificador por 1 minuto.",
      "Adicione o gel de chia, misture bem com uma colher e sirva com gelo."
    ]
  },
  {
    "id": "receita-10",
    "imagem": "/materiais/receita-10.jpg",
    "categoria": "Antes das refeições",
    "tag": "🍋 Antes das refeições · 3 min",
    "titulo": "Limonada com Gengibre e Hortelã",
    "descricao": "Refrescante e fácil de fazer, ajuda você a chegar nas refeições com menos fome e mais no controle.",
    "tempo": "3 min",
    "rende": "10 a 15 minutos antes do almoço ou jantar",
    "quandoTomar": "10 a 15 minutos antes do almoço ou jantar",
    "quandoDica": "O timing é importante: funciona melhor tomado antes, não durante a refeição",
    "beneficios": [
      {
        "icone": "🍋",
        "titulo": "Absorção mais lenta do açúcar",
        "texto": "O ácido do limão retarda a digestão dos carboidratos, fazendo o açúcar entrar devagar no sangue."
      },
      {
        "icone": "🫶",
        "titulo": "Menos insulina na refeição",
        "texto": "Tomar antes de comer prepara o corpo para processar o açúcar da refeição com mais eficiência."
      },
      {
        "icone": "💨",
        "titulo": "Digestão mais leve",
        "texto": "O gengibre e a hortelã juntos reduzem o inchaço e os gases após as refeições."
      },
      {
        "icone": "🌿",
        "titulo": "Metabolismo ativo",
        "texto": "O gengibre tem efeito termogênico leve: aumenta levemente o gasto de energia do corpo."
      }
    ],
    "ingredientes": [
      "suco de 2 — limões tahiti",
      "1 pedaço — gengibre fresco (2 cm, ralado ou fatiado)",
      "8 folhas — hortelã fresca",
      "300 ml — água gelada",
      "stevia a gosto — para adoçar",
      "gelo — a gosto"
    ],
    "preparo": [
      "Esprema os limões e coloque o suco no liquidificador.",
      "Adicione o gengibre, a hortelã, a água e o adoçante.",
      "Bata por 30 segundos. Coe se preferir e sirva com muito gelo."
    ]
  },
  {
    "id": "receita-11",
    "imagem": "/materiais/receita-11.jpg",
    "categoria": "Manhã e Ao acordar",
    "tag": "🌅 Manhã · 4 min",
    "titulo": "Vitamina de Mamão com Linhaça",
    "descricao": "Uma vitamina suave para ajudar o intestino a funcionar melhor e reduzir a sensação de barriga pesada.",
    "tempo": "4 min",
    "rende": "No café da manhã, de preferência com o estômago vazio",
    "quandoTomar": "No café da manhã, de preferência com o estômago vazio",
    "quandoDica": "Triture a linhaça na hora para aproveitar melhor os nutrientes",
    "beneficios": [
      {
        "icone": "🧡",
        "titulo": "Intestino regulado",
        "texto": "O mamão tem papaína, uma enzima que melhora a digestão e o funcionamento do intestino."
      },
      {
        "icone": "⚖️",
        "titulo": "Hormônios equilibrados",
        "texto": "A linhaça contém lignanas que ajudam a equilibrar o estrogênio, hormônio que afeta o peso feminino."
      },
      {
        "icone": "📉",
        "titulo": "Insulina mais sensível",
        "texto": "A fibra da linhaça triturada retarda a absorção de açúcar, ajudando a controlar a insulina."
      },
      {
        "icone": "🌸",
        "titulo": "Menos inchaço hormonal",
        "texto": "Com o estrogênio equilibrado, o inchaço que aparece em certas fases do ciclo tende a diminuir."
      }
    ],
    "ingredientes": [
      "2 fatias médias — mamão maduro (sem casca e sem sementes)",
      "1 col. de sopa — linhaça dourada triturada na hora",
      "200 ml — água ou leite sem açúcar",
      "suco de ½ — limão tahiti",
      "1 pitada — canela em pó",
      "gelo — a gosto"
    ],
    "preparo": [
      "Triture a linhaça no liquidificador seco por 15 segundos para ativar os nutrientes.",
      "Adicione o mamão, a água, o limão e a canela.",
      "Bata por 1 minuto até ficar cremoso. Sirva com gelo."
    ]
  },
  {
    "id": "receita-12",
    "imagem": "/materiais/receita-12.jpg",
    "categoria": "Manhã e Ao acordar",
    "tag": "❤️ Manhã · 5 min",
    "titulo": "Vitamina de Beterraba com Maçã",
    "descricao": "Uma vitamina nutritiva para começar a manhã com mais disposição e leveza.",
    "tempo": "5 min",
    "rende": "Pela manhã, até as 10h",
    "quandoTomar": "Pela manhã, até as 10h",
    "quandoDica": "Use beterraba crua. Cozida perde boa parte dos compostos que fazem o efeito",
    "beneficios": [
      {
        "icone": "🩸",
        "titulo": "Sangue mais limpo",
        "texto": "A beterraba crua contém betaína, substância que ajuda o fígado a filtrar o sangue e a regular o açúcar."
      },
      {
        "icone": "🔓",
        "titulo": "Gordura sendo usada como energia",
        "texto": "Com a circulação melhorada pelo nitrato da beterraba, o oxigênio chega mais fácil às células de gordura."
      },
      {
        "icone": "📉",
        "titulo": "Pico de insulina menor",
        "texto": "A fibra da maçã verde retarda a absorção do açúcar da beterraba, mantendo a insulina estável."
      },
      {
        "icone": "💪",
        "titulo": "Mais resistência física",
        "texto": "O nitrato da beterraba é comprovadamente usado por atletas para melhorar o desempenho e o fôlego."
      }
    ],
    "ingredientes": [
      "½ unidade média — beterraba crua descascada e cortada",
      "1 unidade pequena — maçã verde com casca sem sementes",
      "suco de ½ — limão tahiti",
      "200 ml — água gelada",
      "gelo — a gosto"
    ],
    "preparo": [
      "Descasque a beterraba e corte em cubos pequenos. Corte a maçã com casca.",
      "Bata tudo no liquidificador por 2 minutos em velocidade alta.",
      "Coe se preferir e sirva com gelo."
    ]
  },
  {
    "id": "receita-13",
    "imagem": "/materiais/receita-13.jpg",
    "categoria": "Noite e Antes de dormir",
    "tag": "🌙 Noite · 5 min",
    "titulo": "Smoothie de Maracujá com Aveia",
    "descricao": "Uma bebida calmante para ajudar você a relaxar à noite e dormir melhor, que é quando o corpo descansa de verdade.",
    "tempo": "5 min",
    "rende": "30 a 40 minutos antes de dormir",
    "quandoTomar": "30 a 40 minutos antes de dormir",
    "quandoDica": "A consistência é fundamental: tome todas as noites por pelo menos 7 dias",
    "beneficios": [
      {
        "icone": "😴",
        "titulo": "Sono mais profundo",
        "texto": "O maracujá tem passiflora, substância natural que relaxa o sistema nervoso e melhora o sono."
      },
      {
        "icone": "📉",
        "titulo": "Insulina baixa durante o sono",
        "texto": "Um sono de qualidade mantém os hormônios equilibrados, incluindo a insulina. Isso é crucial para emagrecer."
      },
      {
        "icone": "🫃",
        "titulo": "Sem fome à noite",
        "texto": "A aveia fornece energia de liberação lenta que evita acordar com fome de madrugada."
      },
      {
        "icone": "⚖️",
        "titulo": "Cortisol controlado",
        "texto": "Dormir bem reduz o cortisol, que quando alto faz o corpo guardar gordura na barriga."
      }
    ],
    "ingredientes": [
      "polpa de 2 — maracujás maduros (ou 3 col. de sopa de polpa sem açúcar)",
      "2 col. de sopa — aveia em flocos finos",
      "200 ml — leite morno sem açúcar",
      "1 col. de chá — mel puro",
      "1 pitada — canela em pó"
    ],
    "preparo": [
      "Coloque todos os ingredientes no liquidificador.",
      "Bata por 1 minuto até ficar homogêneo.",
      "Tome morno, sem gelo. O calor ajuda no relaxamento antes de dormir."
    ]
  },
  {
    "id": "receita-14",
    "imagem": "/materiais/receita-14.jpg",
    "categoria": "Manhã e Ao acordar",
    "tag": "🥕 Manhã · 5 min",
    "titulo": "Suco de Cenoura com Laranja",
    "descricao": "Uma combinação colorida e gostosa para dar aquele gás de energia e disposição no seu dia.",
    "tempo": "5 min",
    "rende": "No café da manhã ou até as 10h da manhã",
    "quandoTomar": "No café da manhã ou até as 10h da manhã",
    "quandoDica": "Cenoura crua no suco preserva mais nutrientes do que cenoura cozida",
    "beneficios": [
      {
        "icone": "🫀",
        "titulo": "Fígado mais saudável",
        "texto": "A cenoura tem betacaroteno que protege o fígado, órgão responsável por controlar o açúcar no sangue."
      },
      {
        "icone": "🍊",
        "titulo": "Vitamina C que ativa o metabolismo",
        "texto": "A laranja fornece vitamina C que o fígado usa para transformar gordura em energia."
      },
      {
        "icone": "📉",
        "titulo": "Insulina respondendo melhor",
        "texto": "A cúrcuma melhora a comunicação entre a insulina e as células, facilitando a entrada do açúcar."
      },
      {
        "icone": "✨",
        "titulo": "Mais disposição e ânimo",
        "texto": "Com o fígado funcionando bem, o corpo processa os alimentos com mais eficiência e a energia aumenta."
      }
    ],
    "ingredientes": [
      "2 unidades médias — cenoura crua (descascada e cortada)",
      "1 unidade — laranja (suco espremido)",
      "½ col. de chá — cúrcuma em pó",
      "1 pitada — pimenta-preta moída (ativa a cúrcuma)",
      "200 ml — água gelada",
      "gelo — a gosto"
    ],
    "preparo": [
      "Descasque e corte a cenoura em pedaços pequenos.",
      "Esprema a laranja e coloque no liquidificador com a cenoura, a cúrcuma, a pimenta e a água.",
      "Bata por 2 minutos em velocidade alta. Coe se preferir e sirva com gelo."
    ]
  }
]

export const RITUAIS = [
  {
    "id": "ritual-01",
    "imagem": "/materiais/rituais-01.jpg",
    "tag": "🩸 Circulação · 10–15 min · 4 exercícios",
    "titulo": "Ative sua Circulação",
    "descricao": "Movimentos simples para ajudar seu corpo a desinchar, aliviar a sensação de pernas pesadas e aumentar sua disposição em poucos minutos.",
    "quandoFazer": "Qualquer hora do dia. ideal ao acordar ou após ficar muito tempo sentada",
    "quandoDica": "Repita a sequência 2 vezes para potencializar o efeito",
    "introEditorial": "Pernas pesadas, formigamento, cansaço sem motivo. É a circulação pedindo socorro.",
    "introTexto": "Quando o sangue circula mal, o corpo retém líquido, cansa mais rápido e queima menos gordura. Esses 4 movimentos ativam a bomba muscular das pernas e melhoram o retorno venoso em menos de 15 minutos.",
    "beneficios": [
      {
        "icone": "🦵",
        "titulo": "Pernas mais leves",
        "texto": "A contração muscular das pernas empurra o sangue de volta ao coração, aliviando o peso e o inchaço."
      },
      {
        "icone": "⚡",
        "titulo": "Mais energia em minutos",
        "texto": "Com a circulação ativa, o oxigênio chega mais rápido às células e você sente a diferença na hora."
      },
      {
        "icone": "🔥",
        "titulo": "Queima de gordura ligada",
        "texto": "Circulação ativa = metabolismo acelerado. O corpo começa a usar gordura como combustível."
      },
      {
        "icone": "😴",
        "titulo": "Sono mais reparador",
        "texto": "Exercitar à noite melhora a circulação periférica e facilita o relaxamento profundo."
      }
    ],
    "exercicios": [
      {
        "icone": "🦶",
        "numero": "01",
        "nome": "Elevação de Panturrilha em Pé",
        "series": "3 séries · 20 repetições",
        "comoFazer": "Fique em pé, pés na largura dos quadris. Suba na ponta dos pés lentamente (2 segundos para subir, 2 para descer). Segure 1 segundo no topo. Pode apoiar as mãos na parede.",
        "porQueFunciona": "A panturrilha é chamada de 'segundo coração'. Cada contração bombeia sangue venoso de volta para o coração, reduzindo o acúmulo de líquido nas pernas.",
        "dica": "Faça devagar. A velocidade não importa. o que ativa a circulação é a contração completa do músculo."
      },
      {
        "icone": "🚶",
        "numero": "02",
        "nome": "Marcha no Lugar com Joelho Alto",
        "series": "2 séries · 60 segundos",
        "comoFazer": "Em pé, eleve os joelhos alternadamente até a altura do quadril, como se estivesse marchando. Balanceie os braços naturalmente. Mantenha o abdômen levemente contraído.",
        "porQueFunciona": "Ativa simultaneamente os músculos das coxas, glúteos e abdômen, aumentando o fluxo sanguíneo em todo o corpo inferior e estimulando o sistema linfático.",
        "dica": "Se tiver joelho sensível, eleve menos o joelho. O importante é o movimento contínuo."
      },
      {
        "icone": "🧘",
        "numero": "03",
        "nome": "Pernas para o Alto Deitada",
        "series": "1 vez · 5 minutos",
        "comoFazer": "Deite de costas perto de uma parede. Levante as pernas e apoie-as na parede, formando um L. Relaxe os braços ao lado do corpo. Respire fundo e fique assim por 5 minutos.",
        "porQueFunciona": "A gravidade ajuda o sangue acumulado nas pernas a voltar ao coração. É um dos movimentos mais poderosos para desinchar e ativar a circulação venosa sem nenhum esforço.",
        "dica": "Coloque uma almofada sob o quadril para elevar levemente o quadril. Isso potencializa o retorno venoso."
      },
      {
        "icone": "⭕",
        "numero": "04",
        "nome": "Rotação de Tornozelos",
        "series": "3 séries · 15 rotações para cada lado",
        "comoFazer": "Sentada ou deitada, estenda uma perna. Faça círculos com o pé. 15 vezes no sentido horário, 15 no anti-horário. Troque de perna. Mova somente o tornozelo, sem mexer o joelho.",
        "porQueFunciona": "A articulação do tornozelo tem uma rica rede de vasos sanguíneos e linfáticos. Movimentá-la ativa a microcirculação local e previne o edema que se forma ao longo do dia.",
        "dica": "Ótimo para fazer durante a TV ou antes de dormir. Faça 2 a 3 vezes ao dia para quem fica muito tempo sentada."
      }
    ]
  },
  {
    "id": "ritual-02",
    "imagem": "/materiais/rituais-02.jpg",
    "tag": "💧 Desinchar · 10–15 min · 4 exercícios",
    "titulo": "Desinche de Vez",
    "descricao": "Quando o corpo está menos inchado, você se sente mais leve, mais confortável e até as roupas vestem melhor.",
    "quandoFazer": "Pela manhã ao acordar. é quando o corpo mais retém líquido",
    "quandoDica": "Beba um copo de água antes de começar para facilitar a drenagem",
    "introEditorial": "O inchaço não é gordura. É líquido parado esperando uma ordem para sair.",
    "introTexto": "O sistema linfático não tem bomba própria. ele depende do movimento muscular para funcionar. Quando você fica parada, o líquido se acumula. Esses 4 exercícios são a bomba que faltava.",
    "beneficios": [
      {
        "icone": "🫧",
        "titulo": "Barriga menos inchada",
        "texto": "O movimento abdominal estimula a drenagem linfática intestinal, que causa grande parte do inchaço visível."
      },
      {
        "icone": "🦵",
        "titulo": "Pernas sem peso",
        "texto": "Contrações musculares ativam os vasos linfáticos das pernas e eliminam o líquido retido nas células."
      },
      {
        "icone": "💨",
        "titulo": "Menos gases e retenção",
        "texto": "Exercícios de respiração e torção ativam o peristaltismo e reduzem a produção de gases."
      },
      {
        "icone": "✨",
        "titulo": "Rosto e olhos desinchados",
        "texto": "A drenagem linfática começa na cabeça e desce. Ativá-la reduz o inchaço no rosto e ao redor dos olhos."
      }
    ],
    "exercicios": [
      {
        "icone": "🌬️",
        "numero": "01",
        "nome": "Respiração Diafragmática",
        "series": "3 séries · 10 respirações",
        "comoFazer": "Deite ou sente confortavelmente. Coloque uma mão no peito e outra na barriga. Inspire pelo nariz em 4 tempos, sentindo a barriga expandir (não o peito). Expire pela boca em 6 tempos, contraindo o abdômen.",
        "porQueFunciona": "O diafragma funciona como uma bomba para o sistema linfático. Cada respiração profunda cria variações de pressão que movem a linfa pelo corpo, especialmente no tronco e abdômen.",
        "dica": "Se o peito subir antes da barriga, você está respirando errado. Pratique devagar até sentir a barriga se mover primeiro."
      },
      {
        "icone": "🔄",
        "numero": "02",
        "nome": "Torção de Tronco Sentada",
        "series": "3 séries · 10 repetições por lado",
        "comoFazer": "Sente no chão com as pernas cruzadas. Inspire ereto. Ao expirar, gire o tronco para a direita, apoiando a mão esquerda no joelho direito. Fique 3 respirações. Volte e repita para o outro lado.",
        "porQueFunciona": "A torção comprime e descomprime órgãos e vasos linfáticos abdominais como uma esponja, forçando a linfa a se mover e arrastando toxinas e líquido retido junto.",
        "dica": "Gire a partir da cintura, não dos ombros. Sinta o alongamento na lateral do tronco. é isso que estimula a drenagem."
      },
      {
        "icone": "🏋️",
        "numero": "03",
        "nome": "Agachamento Parcial Lento",
        "series": "3 séries · 15 repetições",
        "comoFazer": "Em pé, pés na largura dos ombros. Desça até 90 graus (ou até onde conseguir sem dor) em 3 segundos. Suba em 1 segundo. Mantenha os joelhos alinhados com os pés e o peito ereto.",
        "porQueFunciona": "Os grandes músculos das coxas e glúteos são os maiores ativadores do sistema linfático. Contraí-los empurra a linfa acumulada nas pernas e na região pélvica para cima.",
        "dica": "A descida lenta é mais importante que o agachamento completo. Se tiver dor no joelho, vá só até onde for confortável."
      },
      {
        "icone": "🌉",
        "numero": "04",
        "nome": "Ponte no Chão com Respiração",
        "series": "3 séries · 12 repetições",
        "comoFazer": "Deite de costas, joelhos dobrados, pés no chão na largura do quadril. Inspire fundo. Ao expirar, levante o quadril contraindo glúteo e abdômen. Segure 2 segundos no topo. Desça inspirando.",
        "porQueFunciona": "Ativa glúteos, isquiotibiais e abdômen ao mesmo tempo. A compressão da região pélvica na subida estimula a drenagem linfática da região abdominal baixa e das pernas.",
        "dica": "No topo do movimento, aperte bem os glúteos. Não deixe os joelhos abrirem. isso indica que o glúteo não está trabalhando."
      }
    ]
  },
  {
    "id": "ritual-03",
    "imagem": "/materiais/rituais-03.jpg",
    "tag": "💆 Dores · 10–15 min · 4 exercícios",
    "titulo": "Alívio para as Dores do Corpo",
    "descricao": "Movimentos suaves para reduzir a rigidez do corpo e ajudar você a se sentir mais confortável durante o dia.",
    "quandoFazer": "Ao acordar e antes de dormir. são os momentos em que o alívio é mais rápido",
    "quandoDica": "Nunca force o alongamento. Vá até onde sentir tensão, não dor",
    "introEditorial": "A dor no corpo não é sinal de velhice. É sinal de que o músculo ficou parado tempo demais.",
    "introTexto": "Dor nas costas, tensão no pescoço, quadril preso. quase sempre são músculos encurtados e articulações que precisam de movimento. Esses 4 alongamentos desfazem os nós mais comuns do dia a dia.",
    "beneficios": [
      {
        "icone": "🔓",
        "titulo": "Coluna mais livre",
        "texto": "Alongamentos específicos liberam a tensão acumulada entre as vértebras e aliviam a dor lombar."
      },
      {
        "icone": "😌",
        "titulo": "Pescoço e ombros soltos",
        "texto": "Movimentos de mobilidade cervical desfazem a tensão causada por horas à frente de tela."
      },
      {
        "icone": "🦴",
        "titulo": "Quadril mais aberto",
        "texto": "Abrir o quadril alivia a lombar, melhora a postura e reduz dores irradiadas nas pernas."
      },
      {
        "icone": "💤",
        "titulo": "Sono sem dor",
        "texto": "Um corpo solto à noite dorme mais profundamente e acorda sem aquela rigidez matinal."
      }
    ],
    "exercicios": [
      {
        "icone": "🐱",
        "numero": "01",
        "nome": "Gato e Vaca no Chão",
        "series": "3 séries · 10 repetições",
        "comoFazer": "De quatro apoios (mãos e joelhos no chão). Inspire arqueando as costas para baixo e olhando para cima (vaca). Expire curvando as costas para cima como um gato irritado, cabeça entre os braços. Movimento fluido e lento.",
        "porQueFunciona": "Mobiliza todas as vértebras da coluna, lubrifica os discos intervertebrais e libera a tensão dos músculos paravertebrais. os principais responsáveis pela dor lombar crônica.",
        "dica": "Faça ao acordar, ainda na cama se quiser. 10 repetições lentas já fazem diferença enorme na rigidez matinal."
      },
      {
        "icone": "🧎",
        "numero": "02",
        "nome": "Meio Joelho ao Chão. Abertura de Quadril",
        "series": "3 séries · 30 segundos por lado",
        "comoFazer": "Coloque um joelho no chão e o outro pé à frente (posição de cavaleiro). Empurre o quadril levemente para frente e para baixo, sentindo o alongamento na frente da coxa e no quadril do joelho que está no chão. Segure.",
        "porQueFunciona": "Alonga o iliopsoas. o músculo mais encurtado em quem fica sentada. Esse músculo encurtado puxa a lombar para frente e é a principal causa de dor nas costas em mulheres sedentárias.",
        "dica": "Coloque uma almofada sob o joelho que está no chão. Não se incline para a frente. mantenha o tronco ereto para o alongamento funcionar."
      },
      {
        "icone": "🧠",
        "numero": "03",
        "nome": "Alongamento do Pescoço e Trapézio",
        "series": "3 séries · 30 segundos por lado",
        "comoFazer": "Sentada ereta. Incline a cabeça para a direita, orelha em direção ao ombro. Com a mão direita, aplique uma pressão suave no lado esquerdo da cabeça. Sinta o alongamento no pescoço e ombro esquerdo. Troque de lado.",
        "porQueFunciona": "O trapézio superior é o músculo mais tenso em 90% das mulheres que trabalham sentadas. Esse alongamento específico libera a tensão que causa dor de cabeça, pescoço e ombros.",
        "dica": "Pressão muito suave. sem puxar com força. Respire fundo durante o alongamento e expire soltando mais a tensão."
      },
      {
        "icone": "🙏",
        "numero": "04",
        "nome": "Posição da Criança",
        "series": "2 séries · 60 segundos",
        "comoFazer": "Ajoelhe e sente sobre os calcanhares. Estenda os braços à frente e abaixe o tronco em direção ao chão, testa tocando o colchonete. Respire fundo, sentindo as costas expandirem a cada inspiração.",
        "porQueFunciona": "Alonga simultaneamente a lombar, o quadril, o sacro e os ombros. Também tem efeito calmante no sistema nervoso. reduz o cortisol e sinaliza ao corpo que está seguro para relaxar.",
        "dica": "Abra os joelhos um pouco mais que o quadril se a barriga atrapalhar. Mantenha os braços estendidos para sentir o alongamento nos ombros também."
      }
    ]
  },
  {
    "id": "ritual-04",
    "imagem": "/materiais/rituais-04.jpg",
    "tag": "🌿 Intestino · 10–15 min · 4 exercícios",
    "titulo": "Intestino em Movimento",
    "descricao": "Uma sequência simples para ajudar o intestino a funcionar melhor e reduzir aquela sensação de barriga pesada e estufada.",
    "quandoFazer": "Pela manhã em jejum. é quando o intestino está mais receptivo ao estímulo",
    "quandoDica": "Beba 1 copo de água morna antes. Isso já inicia o reflexo gastrocólico",
    "introEditorial": "Intestino preso, barriga inchada, sensação de peso. O corpo está pedindo movimento. não remédio.",
    "introTexto": "O intestino não funciona sozinho. Ele precisa da contração dos músculos abdominais e da gravidade para mover o conteúdo. Esses 4 exercícios são uma massagem interna que ativa o trânsito intestinal de forma natural.",
    "beneficios": [
      {
        "icone": "🌀",
        "titulo": "Trânsito intestinal ativo",
        "texto": "Movimentos abdominais e de torção ativam o peristaltismo. as contrações que movem o conteúdo pelo intestino."
      },
      {
        "icone": "💨",
        "titulo": "Menos gases e inchaço",
        "texto": "A pressão e descompressão abdominal libera gases presos e reduz o distensão que causa desconforto."
      },
      {
        "icone": "🔥",
        "titulo": "Queima de gordura abdominal",
        "texto": "Um intestino saudável absorve menos calorias em excesso e processa melhor os nutrientes."
      },
      {
        "icone": "😊",
        "titulo": "Humor e energia melhores",
        "texto": "90% da serotonina é produzida no intestino. Estimulá-lo melhora o humor e reduz a ansiedade."
      }
    ],
    "exercicios": [
      {
        "icone": "🤲",
        "numero": "01",
        "nome": "Massagem Abdominal em I-L-U",
        "series": "2 séries · 2 minutos",
        "comoFazer": "Deite de costas com os joelhos dobrados. Com as mãos, faça pressão suave no abdômen seguindo o caminho do intestino grosso: suba pelo lado direito (I), vá da direita para a esquerda logo abaixo da costela (L), e desça pelo lado esquerdo (U). Faça movimentos circulares lentos.",
        "porQueFunciona": "Segue o caminho real do cólon ascendente, transverso e descendente. A pressão suave empurra o conteúdo intestinal na direção certa, estimulando o trânsito de forma mecânica e direta.",
        "dica": "Pressão suave. como amassar levemente. Se sentir dor, diminua a pressão. Faça em jejum para máximo efeito."
      },
      {
        "icone": "🦵",
        "numero": "02",
        "nome": "Joelhos ao Peito Alternados",
        "series": "3 séries · 15 repetições por lado",
        "comoFazer": "Deite de costas. Puxe um joelho em direção ao peito com as duas mãos, mantendo a outra perna estendida. Segure 2 segundos. Alterne. O movimento deve ser suave e controlado.",
        "porQueFunciona": "Comprime o cólon descendente e o sigmoide. as últimas partes do intestino grosso, onde o conteúdo fica preso na constipação. A compressão e liberação imitam o movimento natural do peristaltismo.",
        "dica": "Para potencializar: após segurar o joelho, faça pequenos movimentos circulares com ele. Isso aumenta a pressão abdominal de forma localizada."
      },
      {
        "icone": "🔄",
        "numero": "03",
        "nome": "Torção Deitada com Joelhos Juntos",
        "series": "3 séries · 30 segundos por lado",
        "comoFazer": "Deite de costas, joelhos dobrados e juntos. Estenda os braços em T. Deixe os joelhos caírem para o lado direito enquanto vira a cabeça para a esquerda. Respire fundo e segure. Volte ao centro e troque.",
        "porQueFunciona": "A torção comprime e descomprime alternadamente os órgãos digestivos como uma esponja. Isso estimula o fluxo sanguíneo para o intestino e ativa as glândulas que produzem os sucos digestivos.",
        "dica": "Não force os joelhos até o chão se não chegarem. use a gravidade e a respiração para ir afundando naturalmente durante os 30 segundos."
      },
      {
        "icone": "🔥",
        "numero": "04",
        "nome": "Respiração do Fogo (Lenta)",
        "series": "3 séries · 20 respirações",
        "comoFazer": "Sente em posição confortável, coluna ereta. Expire com força pelo nariz, contraindo o abdômen para dentro e para cima. Deixe a inspiração acontecer naturalmente, sem esforço. Mantenha ritmo moderado. não muito rápido.",
        "porQueFunciona": "A contração rápida do abdômen na expiração massageia diretamente os órgãos digestivos. Cada expiração forçada move o intestino. Também estimula o nervo vago, que coordena toda a digestão.",
        "dica": "Se sentir tontura, diminua o ritmo. Comece com 10 respirações e aumente gradualmente. Evite durante a menstruação ou se tiver hérnia abdominal."
      }
    ]
  },
  {
    "id": "ritual-05",
    "imagem": "/materiais/rituais-05.jpg",
    "tag": "🔥 Emagrecimento · 10–15 min · 4 exercícios",
    "titulo": "Mova-se e Emagreça",
    "descricao": "Alguns minutos de movimento ajudam a gastar energia, melhorar a disposição e apoiar o seu processo de emagrecimento.",
    "quandoFazer": "De manhã em jejum para máxima queima de gordura. ou qualquer hora que conseguir",
    "quandoDica": "3 vezes por semana já geram resultado visível em 30 dias",
    "introEditorial": "Não precisa de academia. Não precisa de 1 hora. Precisa de consistência e dos movimentos certos.",
    "introTexto": "Esses 4 exercícios foram escolhidos por ativarem os maiores grupos musculares do corpo. o que gera o maior gasto calórico possível em pouco tempo. E o melhor: o efeito continua por horas depois que você para.",
    "beneficios": [
      {
        "icone": "🔥",
        "titulo": "Metabolismo acelerado",
        "texto": "Músculos grandes exigem mais energia. mesmo em repouso. Treiná-los aumenta a queima calórica 24 horas por dia."
      },
      {
        "icone": "💪",
        "titulo": "Massa muscular preservada",
        "texto": "Exercícios de força preservam o músculo durante o emagrecimento, evitando o efeito sanfona."
      },
      {
        "icone": "📉",
        "titulo": "Insulina mais baixa",
        "texto": "Exercícios de alta intensidade breve melhoram a sensibilidade à insulina. chave para desbloquear a queima de gordura."
      },
      {
        "icone": "😊",
        "titulo": "Bem-estar imediato",
        "texto": "Em 10 minutos de exercício o corpo libera endorfina, dopamina e serotonina. O humor muda na hora."
      }
    ],
    "exercicios": [
      {
        "icone": "🏋️",
        "numero": "01",
        "nome": "Agachamento Livre",
        "series": "4 séries · 15 repetições",
        "comoFazer": "Pés na largura dos ombros, dedos levemente para fora. Desça como se fosse sentar numa cadeira imaginária, joelhos atrás dos pés, peito ereto. Suba expirando com força. Braços à frente para equilíbrio.",
        "porQueFunciona": "Ativa quadríceps, glúteos, isquiotibiais e core ao mesmo tempo. os maiores músculos do corpo. Quanto maior o músculo ativado, maior o gasto calórico durante e após o exercício (EPOC).",
        "dica": "Desça até os joelhos ficarem a 90 graus ou mais baixo. Quanto mais fundo, mais glúteo e menos joelho. Mantenha o peso nos calcanhares."
      },
      {
        "icone": "⭐",
        "numero": "02",
        "nome": "Polichinelo",
        "series": "4 séries · 40 segundos",
        "comoFazer": "Em pé, pés juntos e braços ao lado. Salte abrindo pernas e levando os braços acima da cabeça ao mesmo tempo. Salte de volta à posição inicial. Mantenha ritmo constante e aterrisse suavemente.",
        "porQueFunciona": "Eleva rapidamente a frequência cardíaca, transformando o exercício em cardio de alta intensidade. Em 40 segundos, o coração trabalha na zona de queima de gordura sem precisar de equipamento.",
        "dica": "Se tiver impacto no joelho ou chão, faça a versão sem salto: passo lateral abrindo as pernas alternadamente, braços subindo junto."
      },
      {
        "icone": "👟",
        "numero": "03",
        "nome": "Afundo (Avanço) Alternado",
        "series": "3 séries · 12 repetições por perna",
        "comoFazer": "Em pé, passo grande à frente com o pé direito. Desça o joelho esquerdo em direção ao chão (sem encostar). Volte. Alterne as pernas. Mantenha o tronco ereto e o joelho da frente atrás do pé.",
        "porQueFunciona": "Trabalha cada perna independentemente, exigindo mais estabilidade e ativando o core. Glúteo e quadríceps trabalham juntos no mesmo movimento, dobrando o gasto calórico em relação ao agachamento.",
        "dica": "O passo precisa ser grande o suficiente para o joelho de trás não passar do dedão do pé da frente. Um passo pequeno sobrecarrega o joelho."
      },
      {
        "icone": "💪",
        "numero": "04",
        "nome": "Prancha Abdominal",
        "series": "3 séries · 30 a 60 segundos",
        "comoFazer": "Apoie os antebraços e as pontas dos pés no chão. Corpo em linha reta da cabeça ao calcanhar. Contraia o abdômen, não deixe o quadril cair ou subir. Respire de forma controlada durante todo o tempo.",
        "porQueFunciona": "Ativa o core profundo (transverso abdominal) que sustenta a coluna e dá forma ao abdômen. Também mantém a frequência cardíaca elevada, transformando um exercício estático em queima de gordura.",
        "dica": "Qualidade é melhor que tempo. 20 segundos com abdômen contraído vale mais que 60 segundos com o quadril caído. Aumente 5 segundos por semana."
      }
    ]
  }
]

export const PROTOCOLOS = [
  {
    "id": "protocolo-01-manha",
    "imagem": "/materiais/protocolo-01-manha.jpg",
    "tag": "☀️ Manhã · 15 a 20 min",
    "titulo": "Protocolo da Manhã",
    "descricao": "Os primeiros 20 minutos do dia determinam como sua insulina vai se comportar nas próximas 12 horas.",
    "acontece": "Você acorda sem tempo, sem energia, sem saber o que comer. E aí improvisa. E o improviso quase sempre sabota.",
    "solucao": "Com 3 decisões simples logo ao acordar, você coloca a insulina no lugar certo e segue o dia sem culpa e sem fome fora de hora.",
    "frase": "Você não precisa de uma manhã perfeita. Precisa apenas de alguns minutos para começar o dia sem sair no piloto automático.",
    "passos": [
      {
        "icone": "💧",
        "numero": "01",
        "titulo": "Antes de qualquer coisa: água",
        "texto": "Tome 1 copo de água assim que acordar, antes do café, antes do celular. O corpo passa 7 a 8 horas sem água. Reidratar primeiro melhora o metabolismo, reduz o cortisol matinal e diminui a fome logo cedo.",
        "dica": "Deixe o copo cheio na cabeceira da cama na noite anterior. Sem esforço."
      },
      {
        "icone": "🥣",
        "numero": "02",
        "titulo": "Café da manhã com proteína e fibra",
        "texto": "Evite começar com pão, tapioca, fruta sozinha ou biscoito. Esses alimentos disparam a insulina logo cedo e geram fome em 1 hora. Prefira ovos, iogurte natural, queijo, abacate, aveia com chia.",
        "dica": "Se não tiver tempo: 2 ovos mexidos em 3 minutos. Simples, barato e segura a fome até o almoço."
      },
      {
        "icone": "🚶",
        "numero": "03",
        "titulo": "5 minutos de movimento",
        "texto": "Não precisa de treino. Só 5 minutos de caminhada leve, marcha no lugar ou alongamento já ativam a circulação, acordam o metabolismo e reduzem a resistência à insulina do dia.",
        "dica": "Faça enquanto o café esquenta. Ninguém não tem 5 minutos."
      },
      {
        "icone": "📵",
        "numero": "04",
        "titulo": "Celular depois do café",
        "texto": "Olhar o celular antes de comer aumenta o cortisol logo cedo. Cortisol alto eleva o açúcar no sangue mesmo sem comer nada. Reserve o celular para depois do café da manhã.",
        "dica": "Parece fora do assunto, mas tem impacto real na insulina. Tente por 7 dias e observe a diferença no seu nível de energia."
      }
    ],
    "evitar": [
      "Pular o café da manhã achando que emagrece mais",
      "Começar com suco de fruta ou fruta sozinha",
      "Olhar o celular antes de comer",
      "Tomar café em jejum se sentir ansiedade ou palpitação"
    ],
    "lembre": "Uma manhã boa não precisa ser perfeita. Precisa ser consistente."
  },
  {
    "id": "protocolo-02-noite",
    "imagem": "/materiais/protocolo-02-noite.jpg",
    "tag": "🌙 Noite · últimas 2 horas antes de dormir",
    "titulo": "Protocolo da Noite",
    "descricao": "O que você faz nas 2 horas antes de dormir impacta diretamente a insulina do dia seguinte.",
    "acontece": "Você chega cansada, belisca o que tiver na frente, fica no celular até tarde e dorme mal. No dia seguinte a insulina está alta, a fome aparece cedo e o ciclo se repete.",
    "solucao": "4 atitudes simples nas últimas 2 horas do dia protegem o sono, baixam a insulina em jejum e fazem você acordar mais leve.",
    "frase": "Uma boa noite começa muito antes de deitar. Pequenos ajustes podem ajudar você a dormir melhor e acordar com mais disposição.",
    "passos": [
      {
        "icone": "🍽️",
        "numero": "01",
        "titulo": "Jantar leve e no horário certo",
        "texto": "Tente jantar pelo menos 2 horas antes de dormir. O corpo não digere bem deitado, e a insulina elevada à noite prejudica a queima de gordura que acontece durante o sono. Prefira proteína leve com legumes.",
        "dica": "Se sentir fome depois do jantar, tome um chá de camomila ou melissa. Geralmente é ansiedade, não fome real."
      },
      {
        "icone": "📱",
        "numero": "02",
        "titulo": "Tela fora 1 hora antes de dormir",
        "texto": "A luz azul do celular inibe a melatonina, o hormônio que controla o sono. Sem melatonina, o cortisol sobe. E cortisol alto à noite é insulina alta de manhã. Troque a tela por um livro, música ou conversa.",
        "dica": "Use o modo de descanso do celular a partir das 21h. Ele reduz a luz azul e já ajuda."
      },
      {
        "icone": "🌡️",
        "numero": "03",
        "titulo": "Quarto fresco e escuro",
        "texto": "A temperatura ideal para dormir é entre 18 e 20 graus. Quartos quentes ou com luz prejudicam o sono profundo. Sono superficial aumenta o cortisol e, consequentemente, a insulina do dia seguinte.",
        "dica": "Uma meia-calça ou coberta leve nos pés ajuda a redistribuir o calor corporal e facilita adormecer."
      },
      {
        "icone": "✍️",
        "numero": "04",
        "titulo": "Esvazie a cabeça antes de deitar",
        "texto": "Anote numa folha de papel tudo o que está na sua cabeça: tarefas do amanhã, preocupações, recados. Isso libera o cérebro do modo de alerta e permite que o sistema nervoso entre em modo de descanso.",
        "dica": "Não precisa ser diário nem nada elaborado. Uma lista de 5 linhas já reduz a ansiedade noturna."
      }
    ],
    "evitar": [
      "Comer doce ou carboidrato pesado depois das 20h",
      "Ficar no celular deitada até apagar",
      "Beber café ou chá com cafeína depois das 17h",
      "Dormir com a TV ligada ou com luz acesa"
    ],
    "lembre": "Cada noite bem dormida é um dia de emagrecimento no piloto automático."
  },
  {
    "id": "protocolo-03-festa",
    "imagem": "/materiais/protocolo-03-festa.jpg",
    "tag": "🎉 Festa · antes, durante e depois",
    "titulo": "Protocolo da Festa",
    "descricao": "Você não precisa recusar convite, comer antes de ir nem se sentir culpada no dia seguinte.",
    "acontece": "Você vai à festa decidida a ser comportada. Aí vê a mesa, come tudo, bebe mais do que planejou e acorda no dia seguinte com culpa e inchaço. O problema não foi a festa. Foi a falta de um plano.",
    "solucao": "Com 4 atitudes simples, você aproveita a festa, come o que gosta e não sai do trilho.",
    "frase": "Uma festa não destrói seus resultados. O que faz diferença é saber aproveitar sem transformar uma refeição em um fim de semana inteiro fora do controle.",
    "passos": [
      {
        "icone": "🥗",
        "numero": "01",
        "titulo": "Coma antes de sair de casa",
        "texto": "Não chegue na festa com fome. Um lanche leve com proteína (ovo, iogurte, queijo) antes de sair reduz a insulina e controla o apetite. Quem chega com fome come rápido, não mastiga e perde o controle da quantidade.",
        "dica": "Um iogurte natural com uma fruta 1 hora antes já resolve. Simples e eficaz."
      },
      {
        "icone": "🥩",
        "numero": "02",
        "titulo": "Na mesa: proteína primeiro",
        "texto": "Quando for se servir, comece pelas proteínas e saladas. Elas desaceleram a digestão dos carboidratos que virão depois. Isso reduz o pico de insulina mesmo que você coma doce na sequência.",
        "dica": "Um prato de proteína antes do salgadinho já faz diferença. Não precisa evitar nada, só muda a ordem."
      },
      {
        "icone": "🥂",
        "numero": "03",
        "titulo": "Se beber, escolha melhor",
        "texto": "Álcool eleva a insulina e bloqueia a queima de gordura por até 24 horas. Se for beber, prefira vinho seco ou destilado com água com gás. Evite cerveja, drinks açucarados e caipirinha com açúcar.",
        "dica": "Intercale cada drinque com um copo de água. Além de hidratar, você bebe menos no total."
      },
      {
        "icone": "🌅",
        "numero": "04",
        "titulo": "No dia seguinte: retome sem drama",
        "texto": "Não faça jejum punitivo, não pule refeição, não se pese nessa manhã. Tome água, coma proteína no café da manhã e volte à rotina normal. Um dia fora não desfaz semanas de consistência.",
        "dica": "O que engorda não é a festa. É o ciclo de culpa, restrição e compensação que vem depois."
      }
    ],
    "evitar": [
      "Chegar na festa com fome",
      "Começar pela mesa de doce e salgadinhos",
      "Beber refrigerante ou drinks açucarados",
      "Fazer jejum punitivo no dia seguinte"
    ],
    "lembre": "Uma festa não precisa ser sabotagem. Pode ser só uma festa."
  },
  {
    "id": "protocolo-04-viagem",
    "imagem": "/materiais/protocolo-04-viagem.jpg",
    "tag": "✈️ Viagem · antes e durante",
    "titulo": "Protocolo da Viagem",
    "descricao": "Viagem não precisa ser sinônimo de abandono total. Com pequenas escolhas, você mantém o ritmo sem abrir mão do passeio.",
    "acontece": "Na viagem, a rotina some. Você come fora de hora, anda mais, dorme diferente, bebe menos água. Quando volta, sente que perdeu tudo que conquistou.",
    "solucao": "Não precisa seguir o protocolo perfeito em viagem. Precisa seguir o mínimo que impede o retrocesso.",
    "frase": "Viajar não significa abandonar sua rotina. O segredo é adaptar, não desistir.",
    "passos": [
      {
        "icone": "🎒",
        "numero": "01",
        "titulo": "Leve lanches na bolsa",
        "texto": "Castanhas, nozes, barra de proteína, fruta seca sem açúcar. Ter um lanche saudável na bolsa evita que a fome te obrigue a comer o que aparecer pela frente no aeroporto, posto de gasolina ou lanchonete de beira de estrada.",
        "dica": "Um pacotinho de castanhas e uma fruta já salvam a refeição em situações de emergência."
      },
      {
        "icone": "💧",
        "numero": "02",
        "titulo": "Água é prioridade",
        "texto": "Em viagem a gente esquece de beber água. Avião desidrata, carro distrai, passeio consome. Desidratação leve já causa fome falsa, cansaço e retenção de líquido. Carregue sempre uma garrafinha.",
        "dica": "No avião, peça água a cada vez que a comissária passar. Não espere sentir sede."
      },
      {
        "icone": "🍽️",
        "numero": "03",
        "titulo": "No restaurante: escolhas simples",
        "texto": "Não precisa pedir o prato mais saudável do cardápio. Só aplique a regra: proteína primeiro. Peça a proteína principal, coma antes, depois coma o acompanhamento. Isso já controla a insulina na refeição.",
        "dica": "Grelhado, assado ou cozido em vez de frito. Não é sacrifício, é só uma escolha entre opções parecidas."
      },
      {
        "icone": "🚶",
        "numero": "04",
        "titulo": "Aproveite o movimento natural",
        "texto": "Em viagem você geralmente anda mais do que em casa. Subir escada em vez de elevador, caminhar para o restaurante, explorar o destino a pé. Isso já conta como exercício e ativa a queima de gordura sem precisar de academia.",
        "dica": "Não force um treino em viagem se não der. Mas aproveite cada desculpa para andar mais."
      }
    ],
    "evitar": [
      "Ficar horas sem comer esperando o restaurante perfeito",
      "Exagerar no álcool só porque está de férias",
      "Parar completamente com a hidratação",
      "Se pesar ao voltar e entrar em modo de punição"
    ],
    "lembre": "Viagem é para aproveitar. Só não precisa aproveitar tudo de uma vez."
  },
  {
    "id": "protocolo-05-visita",
    "imagem": "/materiais/protocolo-05-visita.jpg",
    "tag": "🏠 Visita · quando receber ou ser recebida",
    "titulo": "Protocolo da Visita",
    "descricao": "Receber visita não precisa virar sabotagem. Você pode ser uma boa anfitriã e continuar no seu processo.",
    "acontece": "A visita chegou, veio bolo, veio salgadinho, veio refrigerante. Você come por educação, por ansiedade ou porque não sabe o que fazer. E depois a culpa vem junto com os convidados.",
    "solucao": "Ser uma boa anfitriã não significa comer tudo. Significa criar um ambiente gostoso onde você também se sente bem.",
    "frase": "Você não precisa escolher entre ser educada e cuidar de você. Dá para fazer os dois.",
    "passos": [
      {
        "icone": "🫖",
        "numero": "01",
        "titulo": "Ofereça o que você também pode tomar",
        "texto": "Sirva chá gelado de hibisco, água aromatizada com limão e hortelã, suco natural diluído. São opções bonitas, saborosas e que você pode tomar sem culpa. Ninguém vai reclamar.",
        "dica": "Uma jarra de água com limão e gelo em cima da mesa já resolve a bebida de todo mundo."
      },
      {
        "icone": "🧀",
        "numero": "02",
        "titulo": "Tenha uma opção proteica na mesa",
        "texto": "Castanhas, queijo, ovos de codorna, palitinhos de legumes com homus. Coloque junto com o que os outros trouxeram. Você terá o que comer sem precisar atacar o bolo inteiro.",
        "dica": "Não precisa esconder que está comendo diferente. Só coloque e quem quiser come."
      },
      {
        "icone": "🍰",
        "numero": "03",
        "titulo": "Se quiser comer, coma com consciência",
        "texto": "Uma fatia de bolo não desanda o processo. Comer o bolo todo porque estava na frente, sim. Se for comer, escolha o que mais gosta, sente, mastigue devagar e aprecie. Sem culpa e sem repetição.",
        "dica": "Comer com prazer e atenção gera muito mais satisfação do que comer rápido e repetir."
      },
      {
        "icone": "💬",
        "numero": "04",
        "titulo": "Você não precisa explicar suas escolhas",
        "texto": "Se não quiser comer algo, um sorriso e 'estou bem, obrigada' resolve. Você não deve satisfações sobre o que coloca no prato. Ninguém vai embora com fome por causa de uma recusa educada.",
        "dica": "Quanto menos explicação, menos pressão. Uma resposta simples encerra o assunto."
      }
    ],
    "evitar": [
      "Comer por obrigação ou para não constranger",
      "Ficar de pé na cozinha beliscando enquanto arruma",
      "Beber refrigerante porque não tinha outra opção",
      "Entrar em modo de punição depois que a visita foi embora"
    ],
    "lembre": "Sua casa, suas regras. Com leveza e sem drama."
  },
  {
    "id": "protocolo-06-preguica-cansaco",
    "imagem": "/materiais/protocolo-06-preguica-cansaco.jpg",
    "tag": "😴 Preguiça e Cansaço · dias difíceis",
    "titulo": "Protocolo da Preguiça",
    "descricao": "Nos dias em que você não tem energia nem vontade. O segredo é não deixar o cansaço virar abandono.",
    "acontece": "Você está cansada, sem disposição e com vontade de comer tudo que vê pela frente. O sofa, o chocolate e o delivery parecem a única saída. E quando passa, a culpa aparece.",
    "solucao": "Existe um modo mínimo de funcionamento para dias difíceis. Ele não vai te fazer emagrecer mais rápido. Mas vai impedir que você volte à estaca zero.",
    "frase": "Nem todos os dias você vai estar motivada. E tudo bem. O objetivo é continuar mesmo nos dias em que a vontade não aparece.",
    "passos": [
      {
        "icone": "💧",
        "numero": "01",
        "titulo": "Comece só com água",
        "texto": "Antes de decidir qualquer coisa, tome 1 copo grande de água. Cansaço e desânimo muitas vezes são desidratação disfarçada. Espere 10 minutos. Com frequência, a disposição melhora sozinha.",
        "dica": "Adicione limão ou folhas de hortelã. Água com sabor hidrata mais porque você bebe mais."
      },
      {
        "icone": "🍳",
        "numero": "02",
        "titulo": "A refeição mínima aceitável",
        "texto": "Não precisa cozinhar. Mas precisa comer algo de verdade. Ovo mexido com queijo, iogurte natural, fruta com pasta de amendoim. Qualquer coisa com proteína que não seja ultra processado. O objetivo é não deixar o vazio guiar as escolhas.",
        "dica": "Ovo mexido pronto em 3 minutos. É o alimento de emergência oficial de qualquer dia difícil."
      },
      {
        "icone": "🚶",
        "numero": "03",
        "titulo": "5 minutos de movimento, só isso",
        "texto": "Não precisa treinar. Só levanta do sofá e anda pela casa por 5 minutos. Ou faça 20 agachamentos. O movimento quebra o ciclo de letargia, libera um pouco de dopamina e muda levemente o estado mental.",
        "dica": "Coloque uma música que você gosta e ande. Muitas vezes os 5 minutos viram 15 naturalmente."
      },
      {
        "icone": "🛏️",
        "numero": "04",
        "titulo": "Se precisar descansar, descanse de verdade",
        "texto": "Tem dias que o melhor que você pode fazer pelo seu corpo é descansar. Dormir uma hora, deitar sem tela, relaxar de verdade. Isso não é preguiça, é recuperação. O problema é quando o descanso vira descontrole alimentar.",
        "dica": "Descanso sem comida ruim é produtivo. Sofá com salgadinho e série é outra história."
      }
    ],
    "evitar": [
      "Usar o cansaço como justificativa para comer ultra processado",
      "Ficar sem comer o dia todo e atacar à noite",
      "Se culpar por não ter feito o treino",
      "Pedir delivery sem olhar as opções mais proteicas do cardápio"
    ],
    "lembre": "Um dia ruim não desfaz seu processo. Desistir, sim."
  },
  {
    "id": "protocolo-07-marmita",
    "imagem": "/materiais/protocolo-07-marmita.jpg",
    "tag": "🥡 Marmita · montar sem erro e sem sofrimento",
    "titulo": "Protocolo da Marmita",
    "descricao": "Marmita certa é a melhor estratégia contra o improviso. Você decide em casa, onde tem controle. Não na fila do restaurante.",
    "acontece": "Você chega no trabalho sem marmita, o restaurante só tem fritura e prato feito carregado. Aí cede. Não por fraqueza, por falta de alternativa.",
    "solucao": "Uma marmita bem montada resolve o almoço, evita a fila e ainda economiza dinheiro. E não precisa ser elaborada.",
    "frase": "Quando você tem comida pronta, faz escolhas melhores sem precisar depender só da força de vontade.",
    "passos": [
      {
        "icone": "🏗️",
        "numero": "01",
        "titulo": "A estrutura de toda marmita certa",
        "texto": "Toda marmita eficiente tem 4 partes: proteína (frango, ovo, atum, carne), legume refogado ou assado, folha crua ou cozida, e uma porção pequena de carboidrato complexo (arroz integral, batata-doce, mandioca). Nessa ordem de prioridade.",
        "dica": "Proteína e legume são obrigatórios. Carboidrato é opcional. Folha é bônus."
      },
      {
        "icone": "📦",
        "numero": "02",
        "titulo": "Prepare em lote na segunda-feira",
        "texto": "Cozinhe o frango, asse a batata-doce e refogue os legumes de uma vez. Divide em potes e guarda na geladeira. Nos outros dias é só montar em 2 minutos. Sem cozinhar todo dia, sem desculpa de falta de tempo.",
        "dica": "Frango assado dura 4 dias na geladeira. Batata-doce cozida, 3 dias. Faça tudo de uma vez."
      },
      {
        "icone": "🚫",
        "numero": "03",
        "titulo": "O que não coloca na marmita",
        "texto": "Evite misturar muitos carboidratos (arroz + massa + pão). Evite molhos prontos, maionese industrial e temperos de pacote com muito sódio. Esses itens inflamam, retêm líquido e elevam a insulina mesmo em porções pequenas.",
        "dica": "Tempere com azeite, limão, alho, cebola, ervas frescas. Fica mais gostoso e sem os extras indesejados."
      },
      {
        "icone": "⏰",
        "numero": "04",
        "titulo": "Horário de comer importa tanto quanto o que comer",
        "texto": "Tente comer no mesmo horário todos os dias. O corpo regula a insulina também pelo ritmo circadiano. Comer sempre nos mesmos horários treina o metabolismo e reduz os picos de fome fora de hora.",
        "dica": "Programe um alarme discreto no celular para o horário do almoço. Parece bobo, mas funciona."
      }
    ],
    "evitar": [
      "Montar marmita só de carboidrato por praticidade",
      "Usar molho pronto ou tempero de pacote industrializado",
      "Pular a marmita e comer qualquer coisa porque estava com pressa",
      "Misturar mais de 2 fontes de carboidrato no mesmo pote"
    ],
    "lembre": "Marmita ruim ainda é melhor que restaurante por quilo sem critério."
  },
  {
    "id": "protocolo-08-fim-de-semana",
    "imagem": "/materiais/protocolo-08-fim-de-semana.jpg",
    "tag": "🌅 Fim de Semana · sem perder o fio",
    "titulo": "Protocolo do Fim de Semana",
    "descricao": "O fim de semana é onde a maioria perde o que conquistou durante a semana. Não por acidente. Por falta de plano.",
    "acontece": "De segunda a sexta você vai bem. No sábado come o que não comeu a semana toda. No domingo compensa mais. Na segunda começa tudo do zero. E o progresso nunca aparece.",
    "solucao": "Flexibilidade com estrutura. Você pode relaxar, comer diferente e aproveitar. Mas mantendo 3 âncoras que impedem o retrocesso.",
    "frase": "Você não engorda entre segunda e sexta. Geralmente os excessos se acumulam no fim de semana. Por isso, pequenos cuidados aqui fazem muita diferença.",
    "passos": [
      {
        "icone": "☀️",
        "numero": "01",
        "titulo": "Mantenha o café da manhã",
        "texto": "Mesmo no fim de semana, mesmo dormindo mais, faça um café da manhã com proteína. Essa âncora regula a insulina do dia inteiro e evita que a fome acumulada leve a exageros no almoço ou no jantar.",
        "dica": "Ovo mexido, iogurte ou queijo. Não precisa ser elaborado. Precisa ter proteína."
      },
      {
        "icone": "🚶",
        "numero": "02",
        "titulo": "Uma caminhada ou atividade prazerosa",
        "texto": "Não precisa ser treino. Uma caminhada no parque, nadar, dançar, brincar com as crianças. Qualquer movimento que você goste e que dure pelo menos 20 minutos já ativa o metabolismo e melhora o humor do dia.",
        "dica": "Convide alguém. Atividade com companhia tem muito mais chance de acontecer."
      },
      {
        "icone": "🍽️",
        "numero": "03",
        "titulo": "Escolha 1 refeição livre de verdade",
        "texto": "Em vez de comer mal o dia todo, escolha 1 refeição para comer o que quiser com prazer. Isso satisfaz a vontade, evita a culpa e mantém o resto do dia equilibrado. Uma refeição livre não desfaz o processo.",
        "dica": "Escolha com antecedência o que vai ser a refeição livre. Assim você antecipa o prazer e não cede a todos os impulsos do dia."
      },
      {
        "icone": "💤",
        "numero": "04",
        "titulo": "Durma bem e acorde sem punição",
        "texto": "Aproveite o fim de semana para dormir melhor. E se comeu mais do que planejou no sábado, acorde no domingo sem punição. Retome o café da manhã com proteína e siga em frente. Sem compensação extrema.",
        "dica": "O que acontece no fim de semana fica no fim de semana. Segunda é sempre um recomeço limpo."
      }
    ],
    "evitar": [
      "Pular o café da manhã porque acordou mais tarde",
      "Comer mal o dia todo porque 'é fim de semana'",
      "Compensar no domingo o que comeu no sábado",
      "Passar o fim de semana inteiro no sofá sem nenhum movimento"
    ],
    "lembre": "Dois dias não desfazem cinco. A menos que você deixe."
  },
  {
    "id": "protocolo-09-tpm-ciclo",
    "imagem": "/materiais/protocolo-09-tpm-ciclo.jpg",
    "tag": "🌸 TPM e Ciclo · os dias mais difíceis do mês",
    "titulo": "Protocolo da TPM e do Ciclo",
    "descricao": "A TPM não é desculpa, mas é real. Seu corpo muda, suas necessidades mudam. Saber disso muda tudo.",
    "acontece": "Na semana da TPM a vontade de doce explode, o inchaço aparece, o humor cai e a motivação some. Você come o que não planejou, sente culpa e acha que fracassou.",
    "solucao": "A TPM tem causas hormonais reais. Combatê-la com os alimentos e atitudes certos reduz os sintomas e protege o processo de emagrecimento.",
    "frase": "Existem fases do ciclo em que a fome aumenta, o inchaço aparece e a vontade de doce fica mais intensa. Isso não é falta de força de vontade. É parte do processo.",
    "passos": [
      {
        "icone": "🍫",
        "numero": "01",
        "titulo": "A vontade de doce tem uma causa",
        "texto": "A queda de progesterona antes da menstruação reduz a serotonina, gerando vontade intensa de carboidrato e doce. Em vez de resistir e ceder de forma exagerada, satisfaça com qualidade: chocolate 70% cacau, tâmara, fruta com pasta de amendoim.",
        "dica": "2 quadradinhos de chocolate amargo com uma castanha resolem a vontade de doce sem picotar a insulina."
      },
      {
        "icone": "🧂",
        "numero": "02",
        "titulo": "Reduza o sódio para desinchar",
        "texto": "O inchaço da TPM é causado por retenção de líquido mediada por hormônios. Reduzir sal, embutidos e ultra processados nos dias anteriores à menstruação já reduz visivelmente o inchaço. Aumente a água.",
        "dica": "Chá de dente-de-leão ou de hibisco tem efeito diurético natural e ajuda a eliminar o líquido retido."
      },
      {
        "icone": "🥦",
        "numero": "03",
        "titulo": "Magnésio é sua aliada",
        "texto": "O magnésio reduz as cólicas, melhora o humor e diminui a vontade de doce da TPM. Fontes acessíveis: banana, aveia, feijão, castanha-do-pará (só 1 por dia), sementes de abóbora. Prefira a comida ao suplemento.",
        "dica": "Uma colher de sopa de sementes de abóbora no iogurte ou na salada já entrega boa dose de magnésio."
      },
      {
        "icone": "🛁",
        "numero": "04",
        "titulo": "Exercício leve, não punição",
        "texto": "Durante a TPM e a menstruação, treinos intensos podem piorar os sintomas. Prefira caminhada, yoga, alongamento, hidroginástica. O movimento leve alivia a cólica, melhora o humor e não sobrecarrega o corpo.",
        "dica": "Se não quiser se exercitar, não se puna. Uma caminhada de 15 minutos ao ar livre já faz diferença no humor."
      }
    ],
    "evitar": [
      "Comer muito doce achando que vai passar a vontade",
      "Restringir água com medo de inchar mais",
      "Fazer treino intenso durante a cólica forte",
      "Se pesar durante a TPM e interpretar o peso como fracasso"
    ],
    "lembre": "O peso na balança na semana da TPM não é gordura. É líquido. Ele passa."
  },
  {
    "id": "protocolo-10-estresse-ansiedade",
    "imagem": "/materiais/protocolo-10-estresse-ansiedade.jpg",
    "tag": "😤 Estresse e Ansiedade · quando a cabeça atrapalha o corpo",
    "titulo": "Protocolo do Estresse",
    "descricao": "Estresse crônico é um dos maiores bloqueadores do emagrecimento. Não pelo que você come. Pelo que ele faz com seus hormônios.",
    "acontece": "Você está estressada, come sem fome, come rápido, come o que aparece. Depois sente que não tem autocontrole. Mas não é fraqueza. É cortisol controlando suas escolhas.",
    "solucao": "Você não vai eliminar o estresse da vida. Mas pode impedir que ele comande o que você come.",
    "frase": "Muitas vezes a fome não vem do estômago. Ela vem do cansaço, da preocupação e da vontade de se sentir melhor.",
    "passos": [
      {
        "icone": "🫁",
        "numero": "01",
        "titulo": "Respire antes de comer",
        "texto": "Quando estiver ansiosa e com vontade de atacar a geladeira, pare e respire fundo 5 vezes antes. Inspire pelo nariz em 4 tempos, expire pela boca em 6 tempos. Isso ativa o sistema nervoso parassimpático e reduz o cortisol em segundos.",
        "dica": "O simples ato de parar 1 minuto antes de comer muda completamente a qualidade da escolha que vem depois."
      },
      {
        "icone": "🚶",
        "numero": "02",
        "titulo": "Movimento como válvula de escape",
        "texto": "Quando o estresse chegar, troque a geladeira por uma caminhada de 10 minutos. O exercício consome o cortisol que estava circulando e libera endorfina no lugar. Você volta calma e com as escolhas mais claras.",
        "dica": "Saia de casa mesmo que seja só para a calçada. Mudar o ambiente muda o estado mental."
      },
      {
        "icone": "🍵",
        "numero": "03",
        "titulo": "Substitua o belisco ansioso",
        "texto": "Se a mão vai automático para a comida no estresse, tenha uma alternativa pronta: chá morno, água com limão, uma castanha. Ocupar a mão e a boca com algo neutro quebra o ciclo automático sem gerar culpa.",
        "dica": "Chá de camomila, melissa ou maracujá têm ação ansiolítica comprovada. Mantenha em casa."
      },
      {
        "icone": "📋",
        "numero": "04",
        "titulo": "Identifique o gatilho, não a comida",
        "texto": "Toda vez que comer sob estresse, anote: o que aconteceu antes? Qual sentimento veio? A comida foi a resposta para que situação? Entender o gatilho é mais poderoso que qualquer dieta.",
        "dica": "Não precisa de terapeuta para fazer isso. Um caderninho pequeno no bolso já resolve."
      }
    ],
    "evitar": [
      "Usar comida como recompensa por um dia difícil",
      "Comer na frente do computador ou durante reuniões",
      "Comprar snacks ultra processados como 'estoque de emergência'",
      "Ignorar o estresse esperando que ele passe sozinho"
    ],
    "lembre": "Você não está sem autocontrole. Está com cortisol alto. São coisas diferentes."
  }
]

export const RECEITA_DO_DIA = {
  "1": "receita-01",
  "2": "receita-02",
  "3": "receita-03",
  "4": "receita-04",
  "5": "receita-05",
  "6": "receita-06",
  "7": "receita-07",
  "8": "receita-08",
  "9": "receita-09",
  "10": "receita-10",
  "11": "receita-11",
  "12": "receita-12",
  "13": "receita-13",
  "14": "receita-14",
  "15": "receita-01",
  "16": "receita-03",
  "17": "receita-05",
  "18": "receita-07",
  "19": "receita-09",
  "20": "receita-11",
  "21": "receita-13"
}
