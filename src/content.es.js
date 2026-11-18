// =====================================================================
// CONTENIDO DE LA APP — Club del Secreto (versión en español).
// Traducción de src/content.js. Mantén la misma estructura en los dos archivos.
// =====================================================================

export const APP = {
  "nome": "Club del Secreto",
  "frase": "No estás sola. Sin presión, solo dirección.",
  "plano": "Club Premium",
  "whatsapp": "5531996508234",
  "whatsappRotulo": "Habla con la Dra.",
  "resetUrl": "https://n8n.neonature.online/webhook/secreto-reset-db343b64bc894d8a"
}

// =====================================================================
// ENLACES DE CHECKOUT Y OFERTAS (edita aquí los enlaces y precios)
// =====================================================================
export const OFERTAS = {
  "whatsappDraUrl": "",
  "salada": {
    "checkoutUrl": "",
    "preco": "R$ 19,90",
    "cardTitulo": "Ensalada en frasco — 60 recetas",
    "cardSubtitulo": "Adelgaza sin pasar hambre",
    "badge": "Oferta exclusiva para ti",
    "titulo": "Ensalada en Frasco",
    "descricao": "60 recetas + 19 aderezos para adelgazar sin pasar hambre — listas para toda tu semana.",
    "itens": [
      "60 recetas de ensalada en frasco",
      "19 aderezos que caben en la dieta",
      "Guía: cómo armar y conservar toda la semana",
      "Lo recibes en tu correo y por WhatsApp"
    ],
    "pagamentoRotulo": "Pago único",
    "botao": "Quiero las recetas por R$ 19,90",
    "fechar": "Ahora no"
  },
  "clube": {
    "checkoutUrl": "",
    "vslUrl": "/vsl.es.html",
    "preco": "US$ 67",
    "titulo": "Club Secreto Premium",
    "subtitulo": "El Secreto de la Insulina te muestra el camino; la Dra. del Secreto te acompaña en cada paso, a cualquier hora.",
    "avisoVideo": "Mira el video antes de decidir",
    "beneficios": [
      {
        "titulo": "Protocolos para imprevistos",
        "descricao": "Fiesta, viaje, SPM, pereza — listos para usar."
      },
      {
        "titulo": "Habla con la Dra.",
        "descricao": "Resuelve tus dudas del programa al instante, dentro del app."
      },
      {
        "titulo": "Mi Evolución",
        "descricao": "Foto, peso y medidas, semana a semana."
      }
    ],
    "acessoRotulo": "Acceso completo",
    "pagamentoRotulo": "pago único",
    "resumo": "Habla con la Dra. + Protocolos para imprevistos + Mi Evolución, para siempre.",
    "garantia": "Garantía incondicional de 7 días",
    "itens": [
      "Activación inmediata después del pago",
      "Sin mensualidades, sin sorpresas",
      "Acceso con el mismo inicio de sesión"
    ],
    "botao": "Quiero el acceso Premium"
  }
}

export const SEMANAS = [
  {
    "numero": 1,
    "titulo": "Semana 1 · Reset y Organización",
    "dias": [
      1,
      7
    ]
  },
  {
    "numero": 2,
    "titulo": "Semana 2 · Activación Hormonal",
    "dias": [
      8,
      14
    ]
  },
  {
    "numero": 3,
    "titulo": "Semana 3 · Consolidación y Ritmo",
    "dias": [
      15,
      21
    ]
  }
]

export const SEGREDOS = [
  {
    "id": "segredo-1",
    "rotulo": "Secreto 1",
    "icone": "🌱",
    "titulo": "Gel Griego",
    "subtitulo": "La semilla que se vuelve gel en el estómago",
    "liquidos": [
      "Agua",
      "Té de canela tibio sin azúcar",
      "Leche vegetal sin azúcar",
      "Leche sin lactosa",
      "Leche entera"
    ],
    "ingredientes": [
      "1 cucharada de chía",
      "1 pizca de canela en polvo",
      "300 ml del líquido elegido"
    ],
    "preparo": "Licúa todo durante 20 segundos. Bébelo enseguida.",
    "dica": "La chía absorbe líquido y forma un gel que hace que el azúcar entre a la sangre mucho más despacio. Menos pico de insulina después de comer."
  },
  {
    "id": "segredo-2",
    "rotulo": "Secreto 2",
    "icone": "🍫",
    "titulo": "Chocolatada de la Insulina",
    "subtitulo": "Parece un dulce. Actúa como un remedio.",
    "liquidos": [
      "Agua",
      "Té de canela tibio sin azúcar",
      "Leche vegetal sin azúcar",
      "Leche sin lactosa",
      "Leche entera"
    ],
    "ingredientes": [
      "1 cucharada rasa de psyllium en polvo (unos 5 g)",
      "1 cucharadita de cacao 100% en polvo",
      "300 ml del líquido elegido"
    ],
    "preparo": "Licúa todo durante 20 segundos. Queda con sabor a chocolatada. Bébelo enseguida.",
    "dica": "El psyllium forma una capa en el intestino que hace más lenta la absorción del azúcar. El cacao puro ayuda a las células a recibir la glucosa con menos insulina."
  },
  {
    "id": "segredo-3",
    "rotulo": "Secreto 3",
    "icone": "✨",
    "titulo": "Activador Hormonal",
    "subtitulo": "El secreto de las mujeres que no se hinchan",
    "liquidos": [
      "Agua",
      "Té de flor de Jamaica (hibisco) tibio sin azúcar",
      "Leche vegetal sin azúcar",
      "Leche sin lactosa",
      "Leche entera"
    ],
    "ingredientes": [
      "1 cucharada de linaza dorada (de preferencia triturada o molida)",
      "1 rodaja de jengibre fresco",
      "300 ml del líquido elegido"
    ],
    "preparo": "Licúa todo durante 30 segundos. Usa la linaza de preferencia triturada o molida, para aprovecharla mejor. Bébelo enseguida.",
    "dica": "La linaza dorada ayuda a equilibrar las hormonas femeninas que causan retención de líquidos y antojo de dulce. El jengibre activa la quema de azúcar en los músculos."
  }
]

export const DIAS = [
  {
    "dia": 1,
    "titulo": "Shot Dorado & Té de Manzanilla con Toronjil",
    "resumo": "Semana 1 · Reset y Organización — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Dorado — 200 ml de agua tibia + 1/2 cucharadita de cúrcuma + 1 pizca de canela",
          "✨ Por qué este shot: Una forma sencilla de empezar el día con más atención a tu cuerpo.",
          "💡 Mezcla bien para que la cúrcuma no quede en grumos en el fondo del vaso."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Elige uno de los 3 Secretos de la Insulina. Tómalo después del shot, antes o junto con el desayuno. Cualquiera de los tres mantiene el hambre a raya hasta el almuerzo."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua. Bébelo 15 minutos antes del almuerzo. Mezcla todo si lo prefieres.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida. Si el vinagre te causa malestar, reemplázalo por agua con limón."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Cualquiera de los 3 Secretos de la Insulina. La tarde es cuando el azúcar baja después del almuerzo. Un Secreto ahora evita el hambre urgente entre las 15:00 y las 17:00."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua. Bébelo 15 minutos antes de la cena. La cena tiene el mayor riesgo de pico de insulina del día.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Toronjil: La manzanilla reduce la ansiedad y prepara el sistema nervioso para el sueño. El toronjil potencia el efecto calmante y reduce el cortisol nocturno, que cuando está alto eleva el azúcar en ayunas. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Para potenciar los resultados, procura incluir una fuente de proteína en las comidas principales. La proteína ayuda a la saciedad y reduce las ganas de picar a lo largo del día.",
          "🎯 Recuerda: No buscamos la perfección. Buscamos repetir pequeños hábitos que ayudan a sentir menos hambre, tener más saciedad y facilitar la pérdida de peso."
        ]
      }
    ]
  },
  {
    "dia": 2,
    "titulo": "Shot Termogénico Suave & Té de Manzanilla con Lavanda",
    "resumo": "Semana 1 · Reset y Organización — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Termogénico Suave — 200 ml de agua + 1 pizca de jengibre en polvo (o un pequeño trozo de jengibre fresco rallado)",
          "✨ Por qué este shot: El jengibre es un ingrediente usado tradicionalmente para dar más sensación de energía.",
          "💡 Si usas jengibre fresco, rállalo bien fino para que suelte más sabor."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Elige uno de los 3 Secretos de la Insulina. Hoy prueba cambiar el líquido que usaste ayer. El sabor cambia, pero el efecto en la insulina es el mismo."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Jugo de medio limón + 1 pizca de canela, en 1 vaso de agua. Bébelo 15 minutos antes del almuerzo.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Cualquiera de los 3 Secretos. Si la tarde está agitada, prepáralo antes y llévalo en un vaso con tapa."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua. Mezcla todo si lo prefieres.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Lavanda: La lavanda activa el sistema nervioso parasimpático. Junto con la manzanilla, crea la condición para el sueño profundo, donde ocurren la quema de grasa y la regulación hormonal. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Una comida con proteína suele generar más saciedad y menos hambre entre comidas."
        ]
      }
    ]
  },
  {
    "dia": 3,
    "titulo": "Shot Canela & Té de Toronjil con Maracuyá",
    "resumo": "Semana 1 · Reset y Organización — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Canela — 200 ml de agua tibia + 1/2 cucharadita de canela",
          "✨ Por qué este shot: Los pequeños hábitos repetidos todos los días generan grandes resultados.",
          "💡 Usa canela pura en polvo, sin mezclas con azúcar."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: El Activador Hormonal es el más ligero hoy, día de reset. Comidas más sencillas a lo largo del día."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Solo 1 vaso de agua con limón hoy. Día de reset, comida más ligera, sin necesidad de refuerzo.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Activador Hormonal, el más ligero de los 3. Día de reset, tarde más sencilla."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Té de anís sin azúcar. Día de reset, cena ligera; el té facilita la digestión.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Toronjil con Maracuyá: Día de reset. El maracuyá tiene una acción sedante suave sin dejar somnolencia por la mañana. Ideal para los días en que la cabeza está más acelerada por la noche. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Pequeñas elecciones con más proteína pueden ayudar a controlar el hambre a lo largo del día."
        ]
      }
    ]
  },
  {
    "dia": 4,
    "titulo": "Shot Dorado Plus & Té de Manzanilla con Canela",
    "resumo": "Semana 1 · Reset y Organización — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Dorado Plus — 200 ml de agua tibia + 1/2 cucharadita de cúrcuma + 1/2 cucharadita de canela + 1 pizca de jengibre en polvo (o un pequeño trozo de jengibre fresco rallado)",
          "✨ Por qué este shot: Una combinación sencilla presente en muchas estrategias de bienestar.",
          "💡 Usa agua tibia, no hirviendo, para diluir mejor las especias. Si usas jengibre fresco, rállalo bien fino para que suelte más sabor."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Cualquiera de los 3 Secretos. Si vas a caminar hoy, tómalo antes de salir. El cuerpo usará la grasa como combustible más temprano."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua. Mezcla todo si lo prefieres.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Cualquier Secreto antes de una caminata o actividad ligera de la tarde."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Té tibio con jugo de medio limón y 1 pizca de canela. Tómalo de 15 a 20 minutos antes de la cena para llegar con menos hambre a la mesa.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Canela: La canela en el té nocturno sigue regulando la insulina durante el sueño. La manzanilla garantiza la relajación para que esa regulación ocurra. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: La proteína es una de las mayores aliadas para quien desea bajar de peso sin pasar hambre.",
          "🎯 Recuerda: No buscamos la perfección. Buscamos repetir pequeños hábitos que ayudan a sentir menos hambre, tener más saciedad y facilitar la pérdida de peso."
        ]
      }
    ]
  },
  {
    "dia": 5,
    "titulo": "Shot Té Verde & Té de Anís con Manzanilla",
    "resumo": "Semana 1 · Reset y Organización — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Té Verde — 200 ml de té verde tibio, sin azúcar",
          "✨ Por qué este shot: Una alternativa práctica para quien disfruta empezar el día con una bebida caliente.",
          "💡 Evita dejar el té en infusión por más de 3 minutos, para que no amargue."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Elige lo que tu cuerpo te está pidiendo. ¿Quieres algo más dulce? Chocolatada de la Insulina. ¿Quieres algo ligero? Gel Griego. ¿Quieres activar las hormonas? Activador Hormonal."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Té tibio (el que prefieras) con jugo de medio limón y 1 pizca de canela. Bébelo 15 minutos antes del almuerzo.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Cualquiera de los 3 Secretos. Lícualo y llévalo en un vaso con tapa si vas a salir."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua. La versión rápida para antes de la cena.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Anís con Manzanilla: El anís por la noche alivia los gases del día y facilita el sueño para quien tiene una digestión más lenta. Los flavonoides también reducen el cortisol. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Antes de reducir la cantidad de comida, intenta mejorar la calidad de la proteína de tus comidas."
        ]
      }
    ]
  },
  {
    "dia": 6,
    "titulo": "Shot Menta & Té de Manzanilla con Toronjil y Lavanda",
    "resumo": "Semana 1 · Reset y Organización — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Menta — 200 ml de té de menta sin azúcar",
          "✨ Por qué este shot: Ligero, refrescante y fácil de incluir en la rutina.",
          "💡 Machaca bien las hojas antes de ponerlas en el agua caliente, para que suelten el sabor."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Si vas a salir de casa, toma el Secreto antes de irte. Reduce el hambre y estabiliza el azúcar en la sangre. Vas a tomar mejores decisiones sin sufrir."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Té de canela en rama sin azúcar, 15 minutos antes del almuerzo.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Cualquiera de los 3 Secretos de la Insulina. Incluso fuera de casa vale la pena mantener el hábito; es el que controla el hambre al final de la tarde."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Té de flor de Jamaica (hibisco) frío sin azúcar. Ayuda a digerir los carbohidratos más despacio. Bébelo 15 minutos antes.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Toronjil y Lavanda: Los tres juntos tienen un efecto más poderoso en el sistema nervioso que cualquiera por separado. La mejor combinación para el sueño profundo. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Para potenciar los resultados, procura incluir una fuente de proteína en las comidas principales. La proteína ayuda a la saciedad y reduce las ganas de picar a lo largo del día."
        ]
      }
    ]
  },
  {
    "dia": 7,
    "titulo": "Shot Manzanilla & Té de Manzanilla simple",
    "resumo": "Semana 1 · Reset y Organización — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Manzanilla — 200 ml de té de manzanilla tibio sin azúcar",
          "✨ Por qué este shot: Una opción suave para quien tiene el estómago sensible.",
          "💡 Bébelo tibio, nunca hirviendo, para conservar el efecto calmante."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Día 7. Prepara el Secreto que más te gustó esta semana."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua. Ya lo hiciste 7 veces. El hábito está formado.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Tu Secreto favorito de la Semana 1. Celebra con la bebida que más te gustó."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua. 7 días de ritual antes de la cena. Hábito formado.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla simple: Día 7. La manzanilla sola ya prepara el sistema nervioso para dormir. Simple y eficaz. Completaste la Semana 1. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Una comida con proteína suele generar más saciedad y menos hambre entre comidas.",
          "🎯 Recuerda: No buscamos la perfección. Buscamos repetir pequeños hábitos que ayudan a sentir menos hambre, tener más saciedad y facilitar la pérdida de peso."
        ]
      }
    ]
  },
  {
    "dia": 8,
    "titulo": "Shot Dorado & Té de Manzanilla con Toronjil",
    "resumo": "Semana 2 · Activación Hormonal — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Dorado — 200 ml de agua tibia + 1/2 cucharadita de cúrcuma + 1 pizca de canela",
          "✨ Por qué este shot: Una forma sencilla de empezar el día con más atención a tu cuerpo.",
          "💡 Mezcla bien para que la cúrcuma no quede en grumos en el fondo del vaso."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Hoy el enfoque es la activación hormonal. Por eso, el Activador Hormonal es la mejor elección para empezar la Semana 2."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Agua saborizada con rodajas de limón y 1 pizca de canela. Semana 2: este ritual ya forma parte de tu rutina.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Hoy el enfoque es la activación hormonal. Por eso, el Activador Hormonal es la mejor elección también para la tarde."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Jugo de medio limón + 1 pizca de canela, en 1 vaso de agua. Semana 2: este ritual ya es más natural en tu rutina.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Toronjil: En el sueño es donde se regulan la leptina y la grelina. La leptina controla la saciedad. La grelina controla el hambre. Dormir bien con manzanilla y toronjil es bajar de peso en piloto automático. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Pequeñas elecciones con más proteína pueden ayudar a controlar el hambre a lo largo del día."
        ]
      }
    ]
  },
  {
    "dia": 9,
    "titulo": "Shot Termogénico Suave & Té de Toronjil con Lavanda",
    "resumo": "Semana 2 · Activación Hormonal — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Termogénico Suave — 200 ml de agua + 1 pizca de jengibre en polvo (o un pequeño trozo de jengibre fresco rallado)",
          "✨ Por qué este shot: El jengibre es un ingrediente usado tradicionalmente para dar más sensación de energía.",
          "💡 Si usas jengibre fresco, rállalo bien fino para que suelte más sabor."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Chocolatada de la Insulina hoy con leche entera de vaca. Queda cremosa y el hambre tarda en volver."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Agua saborizada con limón bien fría y 1 pizca de canela. Versión refrescante.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Chocolatada de la Insulina por la tarde. Cremosa, saciante y controla el hambre hasta la cena."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Agua saborizada con limón bien fría y 1 pizca de canela.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Toronjil con Lavanda: La lavanda tiene un efecto ansiolítico comprobado. Para quien se despierta en medio de la noche con pensamientos, esta mezcla es la más eficaz. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: La proteína es una de las mayores aliadas para quien desea bajar de peso sin pasar hambre."
        ]
      }
    ]
  },
  {
    "dia": 10,
    "titulo": "Shot Canela & Té de Manzanilla con Anís",
    "resumo": "Semana 2 · Activación Hormonal — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Canela — 200 ml de agua tibia + 1/2 cucharadita de canela",
          "✨ Por qué este shot: Los pequeños hábitos repetidos todos los días generan grandes resultados.",
          "💡 Usa canela pura en polvo, sin mezclas con azúcar."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Activador Hormonal con té de flor de Jamaica (hibisco) sin azúcar. Día de reset. El más ligero de los 3 Secretos para un día más sencillo."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Solo 1 vaso de agua con limón. Día de reset, comida ligera, sin necesidad de refuerzo.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Día de reset. El té de flor de Jamaica (hibisco) sin azúcar tiene un efecto diurético natural. O el Activador Hormonal bien diluido."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Té de anís sin azúcar. Día de reset, cena ligera con caldo o sopa.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Anís: Segundo reset. El boldo durante el día más la manzanilla por la noche completan el ciclo de apoyo al hígado. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Antes de reducir la cantidad de comida, intenta mejorar la calidad de la proteína de tus comidas.",
          "🎯 Recuerda: No buscamos la perfección. Buscamos repetir pequeños hábitos que ayudan a sentir menos hambre, tener más saciedad y facilitar la pérdida de peso."
        ]
      }
    ]
  },
  {
    "dia": 11,
    "titulo": "Shot Dorado Plus & Té de Manzanilla con Diente de león",
    "resumo": "Semana 2 · Activación Hormonal — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Dorado Plus — 200 ml de agua tibia + 1/2 cucharadita de cúrcuma + 1/2 cucharadita de canela + 1 pizca de jengibre en polvo (o un pequeño trozo de jengibre fresco rallado)",
          "✨ Por qué este shot: Una combinación sencilla presente en muchas estrategias de bienestar.",
          "💡 Usa agua tibia, no hirviendo, para diluir mejor las especias. Si usas jengibre fresco, rállalo bien fino para que suelte más sabor."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Elige cualquier Secreto. Si quieres variar el líquido, usa agua de coco natural sin azúcar en lugar de la leche. El potasio ayuda a eliminar el líquido retenido."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 cucharada de vinagre de manzana, más 1 vaso de agua de coco natural. Misma función, sabor diferente.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Cualquier Secreto con agua de coco en lugar de la leche. Refrescante y bueno para desinflamar."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 cucharada de vinagre de manzana, más 1 vaso de agua de coco.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Diente de león: El diente de león tiene un efecto diurético suave. Ideal después de días con más sodio en la alimentación. La manzanilla garantiza el sueño. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Para potenciar los resultados, procura incluir una fuente de proteína en las comidas principales. La proteína ayuda a la saciedad y reduce las ganas de picar a lo largo del día."
        ]
      }
    ]
  },
  {
    "dia": 12,
    "titulo": "Shot Té Verde & Té de Toronjil con Canela",
    "resumo": "Semana 2 · Activación Hormonal — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Té Verde — 200 ml de té verde tibio, sin azúcar",
          "✨ Por qué este shot: Una alternativa práctica para quien disfruta empezar el día con una bebida caliente.",
          "💡 Evita dejar el té en infusión por más de 3 minutos, para que no amargue."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Chocolatada de la Insulina hoy. Versión más intensa, más impacto en los receptores de insulina."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Té verde sin azúcar, 15 minutos antes del almuerzo. El té verde mejora la sensibilidad a la insulina.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Chocolatada de la Insulina. Por la tarde el cacao da energía sin la ansiedad que da el café."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Té verde sin azúcar, 15 minutos antes de la cena.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Toronjil con Canela: La canela en el té nocturno continúa el trabajo de regulación de la insulina durante el sueño. El toronjil garantiza la calidad del sueño. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Una comida con proteína suele generar más saciedad y menos hambre entre comidas."
        ]
      }
    ]
  },
  {
    "dia": 13,
    "titulo": "Shot Menta & Té de Manzanilla simple",
    "resumo": "Semana 2 · Activación Hormonal — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Menta — 200 ml de té de menta sin azúcar",
          "✨ Por qué este shot: Ligero, refrescante y fácil de incluir en la rutina.",
          "💡 Machaca bien las hojas antes de ponerlas en el agua caliente, para que suelten el sabor."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Elige cualquiera de los 3 Secretos, con el líquido que prefieras. Lo importante es mantener el hábito."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Jugo de medio limón + 1 pizca de canela, en 1 vaso de agua. La misma receta de siempre.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Cualquiera de los 3 Secretos de la Insulina. Elige el que tengas más a la mano y mantén el hábito de la tarde."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Jugo de medio limón + 1 pizca de canela, en 1 vaso de agua. La misma receta de siempre.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla simple: La manzanilla sola ya cumple su papel. Simple y eficaz. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Pequeñas elecciones con más proteína pueden ayudar a controlar el hambre a lo largo del día.",
          "🎯 Recuerda: No buscamos la perfección. Buscamos repetir pequeños hábitos que ayudan a sentir menos hambre, tener más saciedad y facilitar la pérdida de peso."
        ]
      }
    ]
  },
  {
    "dia": 14,
    "titulo": "Shot Manzanilla & Té de Manzanilla con Toronjil y Lavanda",
    "resumo": "Semana 2 · Activación Hormonal — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Manzanilla — 200 ml de té de manzanilla tibio sin azúcar",
          "✨ Por qué este shot: Una opción suave para quien tiene el estómago sensible.",
          "💡 Bébelo tibio, nunca hirviendo, para conservar el efecto calmante."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Último día de la Semana 2. Prepara el Secreto que más te gustó esta semana. Mañana empieza la Semana 3."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Cualquier opción que hayas preferido esta semana. 14 días de ritual antes del almuerzo.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Último Secreto de la tarde de la Semana 2. 14 días manteniendo este hábito ya marcan la diferencia en tu rutina."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Cualquier opción que hayas preferido esta semana. 14 días de ritual antes de la cena.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Toronjil y Lavanda: Día 14. La mezcla completa. Ya pasaste la mitad del desafío. Este té es la recompensa más funcional que existe. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: La proteína es una de las mayores aliadas para quien desea bajar de peso sin pasar hambre."
        ]
      }
    ]
  },
  {
    "dia": 15,
    "titulo": "Shot Dorado & Té de Manzanilla con Toronjil",
    "resumo": "Semana 3 · Consolidación y Ritmo — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Dorado — 200 ml de agua tibia + 1/2 cucharadita de cúrcuma + 1 pizca de canela",
          "✨ Por qué este shot: Una forma sencilla de empezar el día con más atención a tu cuerpo.",
          "💡 Mezcla bien para que la cúrcuma no quede en grumos en el fondo del vaso."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Gel Griego para empezar la Semana 3. La canela por la mañana prepara los receptores de insulina para todo el día."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua. Semana 3: vuelta a lo básico que funciona.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Gel Griego por la tarde. Simple, práctico y eficaz."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Té tibio con jugo de medio limón y 1 pizca de canela. Vuelta a lo básico de la Semana 3.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Toronjil: La Semana 3 empieza con la dupla manzanilla y toronjil, que ya es una vieja conocida de tus noches. El sueño de esta semana consolida todo lo que se construyó en las dos semanas anteriores. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Antes de reducir la cantidad de comida, intenta mejorar la calidad de la proteína de tus comidas."
        ]
      }
    ]
  },
  {
    "dia": 16,
    "titulo": "Shot Termogénico Suave & Té de Toronjil con Lavanda",
    "resumo": "Semana 3 · Consolidación y Ritmo — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Termogénico Suave — 200 ml de agua + 1 pizca de jengibre en polvo (o un pequeño trozo de jengibre fresco rallado)",
          "✨ Por qué este shot: El jengibre es un ingrediente usado tradicionalmente para dar más sensación de energía.",
          "💡 Si usas jengibre fresco, rállalo bien fino para que suelte más sabor."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Cualquier Secreto. Hoy procura terminar tu última comida antes de las 19:00. El Secreto de la mañana ya empieza el trabajo de estabilizar la insulina."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Té tibio con jugo de medio limón y 1 pizca de canela. Hoy, si es posible, procura almorzar un poco más temprano.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Cualquier Secreto antes de la cena, alrededor de las 19:00. Si es posible, organiza la cena un poco más temprano."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua. Si es posible, cena un poco más temprano hoy.",
          "Hoy, si es posible, procura terminar tu última comida antes de las 19:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Toronjil con Lavanda: Terminar la cena más temprano hoy, alrededor de las 19:00, más este té y el gel nocturno ayudan a crear una excelente condición para el sueño reparador. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Para potenciar los resultados, procura incluir una fuente de proteína en las comidas principales. La proteína ayuda a la saciedad y reduce las ganas de picar a lo largo del día."
        ]
      }
    ]
  },
  {
    "dia": 17,
    "titulo": "Shot Canela & Té de Manzanilla con Anís",
    "resumo": "Semana 3 · Consolidación y Ritmo — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Canela — 200 ml de agua tibia + 1/2 cucharadita de canela",
          "✨ Por qué este shot: Los pequeños hábitos repetidos todos los días generan grandes resultados.",
          "💡 Usa canela pura en polvo, sin mezclas con azúcar."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Activador Hormonal con té de flor de Jamaica (hibisco) sin azúcar. El hibisco refuerza el efecto de desinflamar y reducir la absorción de carbohidratos."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Agua saborizada con limón y 1 pizca de canela. Mezcla todo si lo prefieres.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Activador Hormonal o Gel Griego. Los más ligeros para la Semana 3."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Agua saborizada con limón y 1 pizca de canela. Mezcla todo si lo prefieres.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Anís: El anís ayuda a la digestión de la cena y reduce la pesadez de estómago que perjudica el sueño. La manzanilla garantiza la relajación. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Una comida con proteína suele generar más saciedad y menos hambre entre comidas.",
          "🎯 Recuerda: No buscamos la perfección. Buscamos repetir pequeños hábitos que ayudan a sentir menos hambre, tener más saciedad y facilitar la pérdida de peso."
        ]
      }
    ]
  },
  {
    "dia": 18,
    "titulo": "Shot Dorado Plus & Té de Manzanilla con Toronjil y Lavanda",
    "resumo": "Semana 3 · Consolidación y Ritmo — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Dorado Plus — 200 ml de agua tibia + 1/2 cucharadita de cúrcuma + 1/2 cucharadita de canela + 1 pizca de jengibre en polvo (o un pequeño trozo de jengibre fresco rallado)",
          "✨ Por qué este shot: Una combinación sencilla presente en muchas estrategias de bienestar.",
          "💡 Usa agua tibia, no hirviendo, para diluir mejor las especias. Si usas jengibre fresco, rállalo bien fino para que suelte más sabor."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Cualquier Secreto. Hoy de nuevo, procura terminar tu última comida antes de las 19:00."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua. Versión rápida para hoy.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Cualquier Secreto. ¿Ya pensaste en qué vas a seguir haciendo después de los 21 días?"
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Té de manzanilla tibio sin azúcar. Ya empieza a preparar el cuerpo para el sueño mientras termina la digestión.",
          "Hoy, si es posible, procura terminar tu última comida antes de las 19:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Toronjil y Lavanda: Una noche más terminando la cena más temprano. La mezcla completa ayuda a potenciar el sueño en esta noche importante para tu descanso. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Pequeñas elecciones con más proteína pueden ayudar a controlar el hambre a lo largo del día."
        ]
      }
    ]
  },
  {
    "dia": 19,
    "titulo": "Shot Té Verde & Té de Manzanilla con Maracuyá",
    "resumo": "Semana 3 · Consolidación y Ritmo — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Té Verde — 200 ml de té verde tibio, sin azúcar",
          "✨ Por qué este shot: Una alternativa práctica para quien disfruta empezar el día con una bebida caliente.",
          "💡 Evita dejar el té en infusión por más de 3 minutos, para que no amargue."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Gel Griego o Activador Hormonal. Los dos son los más ligeros para la recta final."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: Lo que más te gustó esta semana. Mantén el hábito.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Gel Griego o Activador Hormonal para la recta final."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Lo que más te gustó esta semana.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Maracuyá: Día 19. El maracuyá ayuda a desacelerar la mente. Una noche a la vez. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: La proteína es una de las mayores aliadas para quien desea bajar de peso sin pasar hambre."
        ]
      }
    ]
  },
  {
    "dia": 20,
    "titulo": "Shot Menta & Té de Toronjil con Lavanda",
    "resumo": "Semana 3 · Consolidación y Ritmo — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Menta — 200 ml de té de menta sin azúcar",
          "✨ Por qué este shot: Ligero, refrescante y fácil de incluir en la rutina.",
          "💡 Machaca bien las hojas antes de ponerlas en el agua caliente, para que suelten el sabor."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Cualquier Secreto. Hoy procura terminar tu última comida antes de las 19:00. Mañana es el Día 21."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua. Penúltima vez en la rutina. ¿Vas a continuar después?",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Un Secreto más de la tarde. Después de los 21 días, procura mantener el hábito al menos 3 veces por semana."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Té tibio con jugo de medio limón y 1 pizca de canela. Penúltima vez.",
          "Hoy, si es posible, procura terminar tu última comida antes de las 19:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Toronjil con Lavanda: Una noche más cuidando el sueño. Terminar la cena antes de las 19:00 y dormir bien es el mejor momento de quema de grasa de toda la rutina. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Antes de reducir la cantidad de comida, intenta mejorar la calidad de la proteína de tus comidas."
        ]
      }
    ]
  },
  {
    "dia": 21,
    "titulo": "Shot Manzanilla & Té de Manzanilla con Toronjil y Lavanda",
    "resumo": "Semana 3 · Consolidación y Ritmo — Sigue el paso a paso de los 6 momentos del día con tu Secreto de la Insulina.",
    "blocos": [
      {
        "titulo": "Al despertar",
        "itens": [
          "💧 Shot del día: Shot Manzanilla — 200 ml de té de manzanilla tibio sin azúcar",
          "✨ Por qué este shot: Una opción suave para quien tiene el estómago sensible.",
          "💡 Bébelo tibio, nunca hirviendo, para conservar el efecto calmante."
        ]
      },
      {
        "titulo": "Mañana",
        "itens": [
          "🥤 Secreto de la Insulina: Prepara el Secreto que más amaste en estos 21 días. El que vas a seguir haciendo después. Este es el hábito que se queda."
        ]
      },
      {
        "titulo": "Antes del almuerzo",
        "itens": [
          "🌿 15 a 20 minutos antes: 1 cucharada de vinagre de manzana + 1 pizca de canela, más 1 vaso de agua, la misma receta del Día 1. Hoy es automático.",
          "Tómalo siempre antes de sentarte a almorzar, nunca junto con la comida."
        ]
      },
      {
        "titulo": "Tarde",
        "itens": [
          "☀️ Secreto de la Insulina: Tu Secreto favorito de toda la rutina. Última tarde. Bébelo con calma y nota lo que cambió."
        ]
      },
      {
        "titulo": "Antes de la cena",
        "itens": [
          "🌙 15 a 20 minutos antes: Jugo de medio limón + 1 pizca de canela, en 1 vaso de agua. Hoy es automático. Ya sabes qué funciona mejor para ti.",
          "Si es posible, procura terminar tu última comida entre las 19:00 y las 21:00. Después de eso, prefiere agua y té sin azúcar hasta la mañana. Esa pausa ayuda al cuerpo a descansar durante la noche."
        ]
      },
      {
        "titulo": "Antes de dormir",
        "itens": [
          "🍵 Té calmante de Manzanilla con Toronjil y Lavanda: Última noche de los 21 días. La mezcla completa para el sueño más reparador. Mañana vas a despertar y tomar el mismo shot del Día 1, pero con hábitos que ya construiste a lo largo de este camino. Bébelo tibio, sin azúcar, 30 a 40 minutos antes de dormir.",
          "💡 Habitación fresca, sin pantallas 40 minutos antes. El sueño profundo es donde ocurre la quema de grasa."
        ]
      },
      {
        "titulo": "Consejos del día",
        "itens": [
          "💪 Consejo Extra: Para potenciar los resultados, procura incluir una fuente de proteína en las comidas principales. La proteína ayuda a la saciedad y reduce las ganas de picar a lo largo del día.",
          "🎯 Recuerda: No buscamos la perfección. Buscamos repetir pequeños hábitos que ayudan a sentir menos hambre, tener más saciedad y facilitar la pérdida de peso."
        ]
      }
    ]
  }
]

export const PRESENTES = [
  {
    "titulo": "Suero de la Delgadez — Tés",
    "descricao": "La receta completa de los tés para potenciar tus resultados.",
    "arquivo": "/presentes/suero-de-la-delgadez-tes.pdf"
  },
  {
    "titulo": "20 Batidos para Adelgazar",
    "descricao": "Batidos prácticos y nutritivos para el día a día.",
    "arquivo": "/presentes/batidos-para-adelgazar.pdf"
  },
  {
    "titulo": "20 Recetas Detox",
    "descricao": "Combinaciones naturales para desinflamar y limpiar el organismo.",
    "arquivo": "/presentes/recetas-detox.pdf"
  },
  {
    "titulo": "40 Postres que Aceleran el Metabolismo",
    "descricao": "Opciones dulces para calmar el antojo sin frenar la pérdida de peso.",
    "arquivo": "/presentes/postres-metabolismo.pdf"
  },
  {
    "titulo": "Consejos para Acelerar el Resultado",
    "descricao": "Ajustes prácticos que destraban la quema de grasa.",
    "arquivo": "/presentes/consejos-acelerar-resultado.pdf"
  }
]

export const LISTA_COMPRAS = [
  {
    "grupo": "⭐ Los esenciales (Base de los 3 Secretos — se usan todos los días)",
    "itens": [
      "Chía — 1 paquete de 200 g (para el Gel Griego, 1 cucharada por día)",
      "Psyllium en polvo — 1 frasco de 100 g a 150 g (para la Chocolatada de la Insulina, ~5 g por día)",
      "Cacao 100% en polvo — 1 frasco de 200 g (para la Chocolatada de la Insulina)",
      "Linaza dorada molida — 1 paquete de 200 g (para el Activador Hormonal)",
      "Vinagre de manzana — 1 botella de 500 ml (antes del almuerzo y de la cena, todos los días)"
    ]
  },
  {
    "grupo": "🧂 Especias secas (Duran todo el mes)",
    "itens": [
      "Canela en polvo — 1 frasco grande (en los Secretos, shots, tés y agua con limón)",
      "Cúrcuma en polvo — 1 frasco (para el Shot Dorado)",
      "Jengibre en polvo — 1 frasco (para los shots termogénicos)",
      "Canela en rama (de preferencia de Ceilán) — 1 paquetito (té de canela y Shot Canela)",
      "Clavo de olor + anís estrellado — 1 paquetito de cada uno (versiones del té de canela)",
      "Pimienta negra — para la Leche Dorada (Golden Milk)"
    ]
  },
  {
    "grupo": "🍋 Frutas y frescos (Compra por semana)",
    "itens": [
      "Limón — 15 a 20 unidades en total (para agua con limón y tés, casi todos los días)",
      "Jengibre fresco (raíz) — 1 trozo (para shots, tés y Secreto 3)",
      "Menta fresca — 1 manojo (para el shot y el té de menta)",
      "Remolacha (betabel) — 1 unidad (para el Shot Detox de remolacha)",
      "Manzana verde — 1 unidad (para el Shot Detox, suaviza el sabor)",
      "Agua de coco — 2 a 3 unidades (variación antes de las comidas)"
    ]
  },
  {
    "grupo": "🍵 Tés y hierbas (Elige los que te gusten para variar por la noche)",
    "itens": [
      "Manzanilla",
      "Toronjil (melisa)",
      "Anís",
      "Flor de Jamaica (hibisco)",
      "Té verde",
      "Diente de león",
      "Maracuyá",
      "Lavanda culinaria",
      "Miel pura (opcional, para endulzar ligeramente)"
    ]
  },
  {
    "grupo": "🥛 El líquido de los Secretos (Elige 1 de tu preferencia)",
    "itens": [
      "Agua filtrada",
      "Té de canela sin azúcar",
      "Leche vegetal sin azúcar",
      "Leche sin lactosa",
      "Leche entera"
    ]
  },
  {
    "grupo": "🍗 Para las comidas (El consejo de oro del programa)",
    "itens": [
      "Huevos",
      "Pechuga de pollo",
      "Pescado (filete)",
      "Carne magra o proteína vegetal",
      "Verduras y hojas verdes a gusto"
    ]
  }
]

export const CATEGORIAS = [
  "Mañana y Al despertar",
  "Antes de las comidas",
  "Tarde y Saciedad",
  "Noche y Antes de dormir"
]

export const RECEITAS = [
  {
    "id": "receita-01",
    "imagem": "/materiais/receita-01.jpg",
    "categoria": "Mañana y Al despertar",
    "tag": "🌅 Al despertar · 3 min",
    "titulo": "Agua de Berenjena con Limón",
    "descricao": "Una opción refrescante para aumentar la hidratación y ayudar a reducir la sensación de hinchazón a lo largo del día.",
    "tempo": "3 min",
    "rende": "Apenas te despiertes, antes que nada",
    "quandoTomar": "Apenas te despiertes, antes que nada",
    "quandoDica": "Prepárala la noche anterior y déjala en el refrigerador para facilitar la mañana",
    "beneficios": [
      {
        "icone": "🔓",
        "titulo": "La grasa empieza a usarse",
        "texto": "Con menos azúcar circulando en ayunas, el cuerpo recurre a la grasa almacenada como fuente de energía."
      },
      {
        "icone": "📉",
        "titulo": "Azúcar en ayunas más baja",
        "texto": "La berenjena tiene sustancias que bloquean la liberación de azúcar por parte del hígado durante la noche."
      },
      {
        "icone": "💧",
        "titulo": "Desinflama desde temprano",
        "texto": "El potasio de la berenjena ayuda a eliminar el líquido retenido que causa esa hinchazón de la mañana."
      },
      {
        "icone": "⚡",
        "titulo": "Un comienzo de día más ligero",
        "texto": "Con la insulina baja al despertar, sientes menos pereza y más energía para el día."
      }
    ],
    "ingredientes": [
      "2 rodajas — berenjena cruda con cáscara (aproximadamente 1 cm cada una)",
      "jugo de 1 — limón verde (lima)",
      "1 rodaja fina — jengibre fresco (aproximadamente 1 cm)",
      "300 ml — agua filtrada fría",
      "stevia al gusto — para endulzar"
    ],
    "preparo": [
      "Corta la berenjena en cubos sin quitarle la cáscara.",
      "Licúa todo durante 1 minuto y medio a velocidad alta.",
      "Cuela con un colador fino y tómala de inmediato."
    ]
  },
  {
    "id": "receita-02",
    "imagem": "/materiais/receita-02.jpg",
    "categoria": "Mañana y Al despertar",
    "tag": "🥕 Desayuno · 4 min",
    "titulo": "Smoothie de Zanahoria con Jengibre",
    "descricao": "Cremoso, nutritivo y práctico. Una excelente opción para quien quiere más saciedad y energía entre comidas.",
    "tempo": "4 min",
    "rende": "En el desayuno, antes de comer",
    "quandoTomar": "En el desayuno, antes de comer",
    "quandoDica": "La zanahoria cruda conserva más nutrientes que la cocida",
    "beneficios": [
      {
        "icone": "🫀",
        "titulo": "Hígado funcionando mejor",
        "texto": "La zanahoria tiene betacaroteno, que protege el hígado, el órgano que regula el azúcar en la sangre."
      },
      {
        "icone": "🌡️",
        "titulo": "Efecto termogénico",
        "texto": "El jengibre aumenta ligeramente la temperatura del cuerpo, lo que acelera el gasto de energía."
      },
      {
        "icone": "📉",
        "titulo": "La insulina responde mejor",
        "texto": "La canela ayuda a las células a absorber el azúcar con menos insulina, lo que facilita la pérdida de peso."
      },
      {
        "icone": "💪",
        "titulo": "Más energía",
        "texto": "Con el hígado sano y la circulación activa, sientes más energía a lo largo del día."
      }
    ],
    "ingredientes": [
      "2 unidades medianas — zanahoria cruda pelada y cortada",
      "1 rodaja — jengibre fresco (2 cm)",
      "1 cdta. — canela en polvo",
      "jugo de ½ — limón verde (lima)",
      "250 ml — agua fría",
      "hielo — al gusto"
    ],
    "preparo": [
      "Pela y corta la zanahoria en trozos pequeños para facilitar el licuado.",
      "Pon todo en la licuadora y licúa durante 2 minutos a velocidad alta.",
      "Cuela si lo prefieres y sirve con hielo."
    ]
  },
  {
    "id": "receita-03",
    "imagem": "/materiais/receita-03.jpg",
    "categoria": "Mañana y Al despertar",
    "tag": "🍌 Desayuno · 5 min",
    "titulo": "Smoothie de Banana Verde",
    "descricao": "Ayuda a prolongar la saciedad y a disminuir esa hambre que aparece poco después de comer.",
    "tempo": "5 min",
    "rende": "En el desayuno, en lugar del pan",
    "quandoTomar": "En el desayuno, en lugar del pan",
    "quandoDica": "Reemplaza el desayuno y mantiene la energía estable hasta el almuerzo",
    "beneficios": [
      {
        "icone": "🍌",
        "titulo": "Hambre controlada por horas",
        "texto": "La banana verde tiene almidón que se digiere despacio y te deja satisfecha por mucho más tiempo."
      },
      {
        "icone": "📉",
        "titulo": "Azúcar en la sangre más estable",
        "texto": "La avena y la banana verde juntas evitan ese pico de insulina justo después del desayuno."
      },
      {
        "icone": "🦠",
        "titulo": "Intestino más saludable",
        "texto": "El almidón de la banana verde alimenta a las bacterias buenas del intestino, que ayudan a adelgazar."
      },
      {
        "icone": "🌡️",
        "titulo": "Metabolismo activo",
        "texto": "La canela ayuda al cuerpo a procesar el azúcar con menos insulina, lo que acelera el metabolismo."
      }
    ],
    "ingredientes": [
      "1 unidad pequeña — banana verde, sin madurar (cuanto más verde, mejor)",
      "2 cdas. — avena en hojuelas finas",
      "200 ml — leche de avena o leche común sin azúcar",
      "1 cdta. — canela en polvo",
      "1 cdta. — miel o 2 gotas de stevia",
      "hielo — al gusto"
    ],
    "preparo": [
      "Corta la banana verde en rodajas. No necesita estar madura.",
      "Pon todos los ingredientes en la licuadora.",
      "Licúa durante 1 minuto hasta que quede bien cremoso. Tómalo de inmediato."
    ]
  },
  {
    "id": "receita-04",
    "imagem": "/materiais/receita-04.jpg",
    "categoria": "Mañana y Al despertar",
    "tag": "❤️ A cualquier hora · 5 min",
    "titulo": "Jugo de Remolacha con Naranja",
    "descricao": "Una bebida colorida y nutritiva para ayudarte a sentirte con más energía durante el día.",
    "tempo": "5 min",
    "rende": "A cualquier hora del día, incluso antes de caminar",
    "quandoTomar": "A cualquier hora del día, incluso antes de caminar",
    "quandoDica": "Tomarlo antes de una caminata potencia todavía más el efecto",
    "beneficios": [
      {
        "icone": "🩸",
        "titulo": "Mejor circulación",
        "texto": "El nitrato de la remolacha dilata los vasos y mejora el transporte de nutrientes hacia las células."
      },
      {
        "icone": "🔥",
        "titulo": "Quema de grasa activada",
        "texto": "Con mejor circulación, el oxígeno llega más fácil a los músculos y la quema de grasa aumenta."
      },
      {
        "icone": "📉",
        "titulo": "Insulina más baja",
        "texto": "La remolacha cruda tiene compuestos que mejoran la sensibilidad del cuerpo a la insulina."
      },
      {
        "icone": "💪",
        "titulo": "Más energía",
        "texto": "Sientes más energía para el día a día, lo que ayuda a moverte más y adelgazar más rápido."
      }
    ],
    "ingredientes": [
      "½ unidad mediana — remolacha (betabel) cruda, pelada y cortada",
      "1 unidad — naranja (el jugo, sin azúcar añadida)",
      "1 rodaja fina — jengibre fresco (aproximadamente 1 cm)",
      "200 ml — agua fría",
      "hielo — al gusto"
    ],
    "preparo": [
      "Pela y corta la remolacha en cubos pequeños.",
      "Exprime la naranja y pon el jugo en la licuadora con la remolacha, el jengibre y el agua.",
      "Licúa durante 2 minutos a velocidad alta. Cuela si lo prefieres y sirve con hielo."
    ]
  },
  {
    "id": "receita-05",
    "imagem": "/materiais/receita-05.jpg",
    "categoria": "Tarde y Saciedad",
    "tag": "☀️ Tarde · 3 min",
    "titulo": "Jugo de Sandía con Menta",
    "descricao": "Refrescante, ligero y perfecto para los días en que quieres algo rico sin salirte de la rutina.",
    "tempo": "3 min",
    "rende": "En la merienda, entre las 14:00 y las 17:00",
    "quandoTomar": "En la merienda, entre las 14:00 y las 17:00",
    "quandoDica": "Tómalo bien frío para potenciar la sensación de saciedad",
    "beneficios": [
      {
        "icone": "💧",
        "titulo": "Hidratación profunda",
        "texto": "La sandía es 92% agua, lo que ayuda al cuerpo a funcionar mejor y a eliminar toxinas."
      },
      {
        "icone": "🫧",
        "titulo": "Menos retención de líquidos",
        "texto": "El potasio de la sandía equilibra el sodio en el cuerpo y reduce la hinchazón y la retención."
      },
      {
        "icone": "📉",
        "titulo": "Insulina más controlada",
        "texto": "La sandía tiene citrulina, una sustancia que mejora la circulación y la respuesta a la insulina."
      },
      {
        "icone": "🌿",
        "titulo": "Adiós al antojo de dulce",
        "texto": "La menta reduce el apetito y su frescura ayuda a resistir los dulces en el horario más difícil del día."
      }
    ],
    "ingredientes": [
      "3 rebanadas medianas — sandía fresca sin semillas",
      "8 hojas — menta fresca",
      "jugo de ½ — limón verde (lima)",
      "hielo — abundante"
    ],
    "preparo": [
      "Corta la sandía en cubos y quítale las semillas.",
      "Licúa todo durante 30 segundos.",
      "Sirve de inmediato con bastante hielo. No hace falta colar."
    ]
  },
  {
    "id": "receita-06",
    "imagem": "/materiais/receita-06.jpg",
    "categoria": "Mañana y Al despertar",
    "tag": "💧 Todo el día · 3 min",
    "titulo": "Agua de Pepino con Menta",
    "descricao": "Un agua ligera y sabrosa para ayudarte a mantenerte hidratada y sentir el cuerpo menos hinchado a lo largo del día.",
    "tempo": "3 min",
    "rende": "Durante todo el día, en lugar de jugos industrializados",
    "quandoTomar": "Durante todo el día, en lugar de jugos industrializados",
    "quandoDica": "Prepara una jarra y bébela a lo largo del día",
    "beneficios": [
      {
        "icone": "💧",
        "titulo": "Hidratación que ayuda a adelgazar",
        "texto": "Mucha gente confunde la sed con el hambre. Estar bien hidratada reduce las ganas de picar."
      },
      {
        "icone": "🫧",
        "titulo": "Desinflama rápido",
        "texto": "El pepino tiene sustancias que ayudan al cuerpo a eliminar el líquido retenido."
      },
      {
        "icone": "🌿",
        "titulo": "Menos antojo de dulce",
        "texto": "La menta reduce el apetito y da una sensación de frescura que ayuda a resistir los dulces."
      },
      {
        "icone": "📉",
        "titulo": "Azúcar más controlada",
        "texto": "El limón tiene un ácido que retrasa la absorción del azúcar y mantiene la insulina más estable."
      }
    ],
    "ingredientes": [
      "½ unidad — pepino (en rebanadas, con cáscara)",
      "10 hojas — menta fresca",
      "jugo de 1 — limón verde (lima)",
      "600 ml — agua filtrada fría",
      "hielo — al gusto"
    ],
    "preparo": [
      "Corta el pepino en rodajas finas, sin quitarle la cáscara.",
      "Pon todo en la licuadora y licúa durante 30 segundos.",
      "Cuela con un colador fino, agrega hielo y bébela a lo largo del día."
    ]
  },
  {
    "id": "receita-07",
    "imagem": "/materiais/receita-07.jpg",
    "categoria": "Mañana y Al despertar",
    "tag": "🌞 Mañana · 4 min",
    "titulo": "Jugo de Piña con Cúrcuma",
    "descricao": "Una bebida sabrosa para ayudar a desinflamar, mejorar la digestión y dejarte con esa sensación de ligereza.",
    "tempo": "4 min",
    "rende": "Por la mañana, después del desayuno",
    "quandoTomar": "Por la mañana, después del desayuno",
    "quandoDica": "No lo tomes en ayunas. Funciona mejor con algo de comida en el estómago",
    "beneficios": [
      {
        "icone": "🔥",
        "titulo": "Antiinflamatorio potente",
        "texto": "La cúrcuma es una de las plantas más estudiadas para reducir la inflamación que causa resistencia a la insulina."
      },
      {
        "icone": "🫁",
        "titulo": "Intestino funcionando bien",
        "texto": "La piña tiene bromelina, una enzima que mejora la digestión y reduce la hinchazón abdominal."
      },
      {
        "icone": "📉",
        "titulo": "Insulina más sensible",
        "texto": "La curcumina de la cúrcuma ayuda a las células a responder mejor a la insulina."
      },
      {
        "icone": "✨",
        "titulo": "Mejor piel y más energía",
        "texto": "Con menos inflamación en el cuerpo, duermes mejor, tienes más energía y la piel mejora."
      }
    ],
    "ingredientes": [
      "2 rebanadas medianas — piña fresca (sin cáscara)",
      "1 cdta. — cúrcuma en polvo",
      "1 pizca — pimienta negra molida (activa la cúrcuma)",
      "jugo de ½ — limón verde (lima)",
      "200 ml — agua fría",
      "hielo — al gusto"
    ],
    "preparo": [
      "Corta la piña en cubos y ponla en la licuadora.",
      "Agrega la cúrcuma, la pimienta negra, el limón y el agua.",
      "Licúa durante 1 minuto. Cuela si lo prefieres y sirve con hielo."
    ]
  },
  {
    "id": "receita-08",
    "imagem": "/materiais/receita-08.jpg",
    "categoria": "Mañana y Al despertar",
    "tag": "🍇 Merienda · 5 min",
    "titulo": "Jugo de Uva Morada con Canela",
    "descricao": "Una opción dulce y natural para los días en que aparece ese antojo de dulce, sin salirte del plan.",
    "tempo": "5 min",
    "rende": "En la merienda, entre el almuerzo y la cena",
    "quandoTomar": "En la merienda, entre el almuerzo y la cena",
    "quandoDica": "Evita tomarlo por la noche, porque el azúcar natural de la uva puede afectar el sueño",
    "beneficios": [
      {
        "icone": "🍇",
        "titulo": "Antioxidantes de la cáscara de la uva",
        "texto": "El resveratrol de la cáscara de la uva morada protege las células del daño causado por el azúcar alto."
      },
      {
        "icone": "📉",
        "titulo": "Pico de insulina menor",
        "texto": "La fibra de la uva entera con cáscara hace que el cuerpo absorba el azúcar despacio."
      },
      {
        "icone": "🌡️",
        "titulo": "Efecto de la canela",
        "texto": "La canela imita la acción de la insulina en las células y ayuda al cuerpo a usar el azúcar con más eficiencia."
      },
      {
        "icone": "😴",
        "titulo": "Mejor sueño y mejor ánimo",
        "texto": "Los polifenoles de la uva morada ayudan a regular el cortisol, la hormona del estrés que engorda."
      }
    ],
    "ingredientes": [
      "1 racimo pequeño — uva morada con cáscara (sin semillas, si es posible)",
      "1 cdta. — canela en polvo",
      "jugo de ½ — limón verde (lima)",
      "150 ml — agua fría",
      "hielo — al gusto"
    ],
    "preparo": [
      "Lava bien las uvas y ponlas en la licuadora con la cáscara.",
      "Agrega la canela, el limón y el agua.",
      "Licúa durante 1 minuto y cuela para retirar los hollejos. Sirve con hielo."
    ]
  },
  {
    "id": "receita-09",
    "imagem": "/materiais/receita-09.jpg",
    "categoria": "Mañana y Al despertar",
    "tag": "🍓 Desayuno · 5 min",
    "titulo": "Jugo de Fresa con Chía",
    "descricao": "Parece un postre, pero te ayuda a sentirte saciada por más tiempo y a controlar las ganas de picar.",
    "tempo": "5 min",
    "rende": "En el desayuno o en la merienda",
    "quandoTomar": "En el desayuno o en la merienda",
    "quandoDica": "Deja la chía en remojo 10 minutos antes para que se forme el gel",
    "beneficios": [
      {
        "icone": "🍓",
        "titulo": "Vitamina C que adelgaza",
        "texto": "La fresa es rica en vitamina C, que el cuerpo necesita para quemar grasa durante el ejercicio."
      },
      {
        "icone": "🫘",
        "titulo": "Fibra que frena el azúcar",
        "texto": "La chía forma un gel en el estómago que impide que el azúcar pase directo al torrente sanguíneo."
      },
      {
        "icone": "😌",
        "titulo": "Sin picos de insulina",
        "texto": "La combinación de fibra y antioxidantes de la fresa mantiene la insulina en niveles bajos y estables."
      },
      {
        "icone": "🌸",
        "titulo": "Mejor piel e intestino",
        "texto": "Los antioxidantes de la fresa reducen la inflamación que afecta la piel y el funcionamiento del intestino."
      }
    ],
    "ingredientes": [
      "10 unidades — fresas (frutillas) frescas, lavadas y sin el tallo",
      "1 cda. — chía (déjala en remojo en 3 cdas. de agua durante 10 min antes)",
      "200 ml — agua fría",
      "jugo de ½ — limón verde (lima)",
      "stevia al gusto — para endulzar",
      "hielo — al gusto"
    ],
    "preparo": [
      "Deja la chía en remojo en 3 cucharadas de agua durante 10 minutos hasta que se forme un gel.",
      "Licúa las fresas con el agua y el limón durante 1 minuto.",
      "Agrega el gel de chía, mezcla bien con una cuchara y sirve con hielo."
    ]
  },
  {
    "id": "receita-10",
    "imagem": "/materiais/receita-10.jpg",
    "categoria": "Antes de las comidas",
    "tag": "🍋 Antes de las comidas · 3 min",
    "titulo": "Limonada con Jengibre y Menta",
    "descricao": "Refrescante y fácil de hacer, te ayuda a llegar a las comidas con menos hambre y más control.",
    "tempo": "3 min",
    "rende": "10 a 15 minutos antes del almuerzo o la cena",
    "quandoTomar": "10 a 15 minutos antes del almuerzo o la cena",
    "quandoDica": "El momento es importante: funciona mejor si se toma antes, no durante la comida",
    "beneficios": [
      {
        "icone": "🍋",
        "titulo": "Absorción más lenta del azúcar",
        "texto": "El ácido del limón retrasa la digestión de los carbohidratos y hace que el azúcar entre despacio a la sangre."
      },
      {
        "icone": "🫶",
        "titulo": "Menos insulina en la comida",
        "texto": "Tomarla antes de comer prepara al cuerpo para procesar el azúcar de la comida con más eficiencia."
      },
      {
        "icone": "💨",
        "titulo": "Digestión más ligera",
        "texto": "El jengibre y la menta juntos reducen la hinchazón y los gases después de las comidas."
      },
      {
        "icone": "🌿",
        "titulo": "Metabolismo activo",
        "texto": "El jengibre tiene un efecto termogénico leve: aumenta ligeramente el gasto de energía del cuerpo."
      }
    ],
    "ingredientes": [
      "jugo de 2 — limones verdes (limas)",
      "1 trozo — jengibre fresco (2 cm, rallado o en rebanadas)",
      "8 hojas — menta fresca",
      "300 ml — agua fría",
      "stevia al gusto — para endulzar",
      "hielo — al gusto"
    ],
    "preparo": [
      "Exprime los limones y pon el jugo en la licuadora.",
      "Agrega el jengibre, la menta, el agua y el endulzante.",
      "Licúa durante 30 segundos. Cuela si lo prefieres y sirve con mucho hielo."
    ]
  },
  {
    "id": "receita-11",
    "imagem": "/materiais/receita-11.jpg",
    "categoria": "Mañana y Al despertar",
    "tag": "🌅 Mañana · 4 min",
    "titulo": "Licuado de Papaya con Linaza",
    "descricao": "Un licuado suave para ayudar al intestino a funcionar mejor y reducir la sensación de pesadez en el vientre.",
    "tempo": "4 min",
    "rende": "En el desayuno, de preferencia con el estómago vacío",
    "quandoTomar": "En el desayuno, de preferencia con el estómago vacío",
    "quandoDica": "Muele la linaza en el momento para aprovechar mejor los nutrientes",
    "beneficios": [
      {
        "icone": "🧡",
        "titulo": "Intestino regulado",
        "texto": "La papaya tiene papaína, una enzima que mejora la digestión y el funcionamiento del intestino."
      },
      {
        "icone": "⚖️",
        "titulo": "Hormonas equilibradas",
        "texto": "La linaza contiene lignanos que ayudan a equilibrar el estrógeno, la hormona que afecta el peso femenino."
      },
      {
        "icone": "📉",
        "titulo": "Insulina más sensible",
        "texto": "La fibra de la linaza molida retrasa la absorción del azúcar y ayuda a controlar la insulina."
      },
      {
        "icone": "🌸",
        "titulo": "Menos hinchazón hormonal",
        "texto": "Con el estrógeno equilibrado, la hinchazón que aparece en ciertas fases del ciclo tiende a disminuir."
      }
    ],
    "ingredientes": [
      "2 rebanadas medianas — papaya madura (sin cáscara y sin semillas)",
      "1 cda. — linaza dorada recién molida",
      "200 ml — agua o leche sin azúcar",
      "jugo de ½ — limón verde (lima)",
      "1 pizca — canela en polvo",
      "hielo — al gusto"
    ],
    "preparo": [
      "Muele la linaza en la licuadora seca durante 15 segundos para activar los nutrientes.",
      "Agrega la papaya, el agua, el limón y la canela.",
      "Licúa durante 1 minuto hasta que quede cremoso. Sirve con hielo."
    ]
  },
  {
    "id": "receita-12",
    "imagem": "/materiais/receita-12.jpg",
    "categoria": "Mañana y Al despertar",
    "tag": "❤️ Mañana · 5 min",
    "titulo": "Licuado de Remolacha con Manzana",
    "descricao": "Un licuado nutritivo para empezar la mañana con más energía y ligereza.",
    "tempo": "5 min",
    "rende": "Por la mañana, hasta las 10:00",
    "quandoTomar": "Por la mañana, hasta las 10:00",
    "quandoDica": "Usa remolacha cruda. Cocida pierde buena parte de los compuestos que producen el efecto",
    "beneficios": [
      {
        "icone": "🩸",
        "titulo": "Sangre más limpia",
        "texto": "La remolacha cruda contiene betaína, una sustancia que ayuda al hígado a filtrar la sangre y a regular el azúcar."
      },
      {
        "icone": "🔓",
        "titulo": "La grasa se usa como energía",
        "texto": "Con la circulación mejorada por el nitrato de la remolacha, el oxígeno llega más fácil a las células de grasa."
      },
      {
        "icone": "📉",
        "titulo": "Pico de insulina menor",
        "texto": "La fibra de la manzana verde retrasa la absorción del azúcar de la remolacha y mantiene la insulina estable."
      },
      {
        "icone": "💪",
        "titulo": "Más resistencia física",
        "texto": "Está comprobado que los atletas usan el nitrato de la remolacha para mejorar el rendimiento y el aguante."
      }
    ],
    "ingredientes": [
      "½ unidad mediana — remolacha (betabel) cruda, pelada y cortada",
      "1 unidad pequeña — manzana verde con cáscara y sin semillas",
      "jugo de ½ — limón verde (lima)",
      "200 ml — agua fría",
      "hielo — al gusto"
    ],
    "preparo": [
      "Pela la remolacha y córtala en cubos pequeños. Corta la manzana con cáscara.",
      "Licúa todo durante 2 minutos a velocidad alta.",
      "Cuela si lo prefieres y sirve con hielo."
    ]
  },
  {
    "id": "receita-13",
    "imagem": "/materiais/receita-13.jpg",
    "categoria": "Noche y Antes de dormir",
    "tag": "🌙 Noche · 5 min",
    "titulo": "Smoothie de Maracuyá con Avena",
    "descricao": "Una bebida calmante para ayudarte a relajarte por la noche y dormir mejor, que es cuando el cuerpo descansa de verdad.",
    "tempo": "5 min",
    "rende": "30 a 40 minutos antes de dormir",
    "quandoTomar": "30 a 40 minutos antes de dormir",
    "quandoDica": "La constancia es fundamental: tómalo todas las noches durante al menos 7 días",
    "beneficios": [
      {
        "icone": "😴",
        "titulo": "Sueño más profundo",
        "texto": "El maracuyá tiene pasiflora, una sustancia natural que relaja el sistema nervioso y mejora el sueño."
      },
      {
        "icone": "📉",
        "titulo": "Insulina baja durante el sueño",
        "texto": "Un sueño de calidad mantiene las hormonas equilibradas, incluida la insulina. Eso es crucial para adelgazar."
      },
      {
        "icone": "🫃",
        "titulo": "Sin hambre por la noche",
        "texto": "La avena aporta energía de liberación lenta que evita despertar con hambre de madrugada."
      },
      {
        "icone": "⚖️",
        "titulo": "Cortisol controlado",
        "texto": "Dormir bien reduce el cortisol, que cuando está alto hace que el cuerpo guarde grasa en el abdomen."
      }
    ],
    "ingredientes": [
      "pulpa de 2 — maracuyás maduros (o 3 cdas. de pulpa sin azúcar)",
      "2 cdas. — avena en hojuelas finas",
      "200 ml — leche tibia sin azúcar",
      "1 cdta. — miel pura",
      "1 pizca — canela en polvo"
    ],
    "preparo": [
      "Pon todos los ingredientes en la licuadora.",
      "Licúa durante 1 minuto hasta que quede homogéneo.",
      "Tómalo tibio, sin hielo. El calor ayuda a relajarse antes de dormir."
    ]
  },
  {
    "id": "receita-14",
    "imagem": "/materiais/receita-14.jpg",
    "categoria": "Mañana y Al despertar",
    "tag": "🥕 Mañana · 5 min",
    "titulo": "Jugo de Zanahoria con Naranja",
    "descricao": "Una combinación colorida y rica para darle ese impulso de energía y ánimo a tu día.",
    "tempo": "5 min",
    "rende": "En el desayuno o hasta las 10:00 de la mañana",
    "quandoTomar": "En el desayuno o hasta las 10:00 de la mañana",
    "quandoDica": "La zanahoria cruda en el jugo conserva más nutrientes que la zanahoria cocida",
    "beneficios": [
      {
        "icone": "🫀",
        "titulo": "Hígado más saludable",
        "texto": "La zanahoria tiene betacaroteno, que protege el hígado, el órgano responsable de controlar el azúcar en la sangre."
      },
      {
        "icone": "🍊",
        "titulo": "Vitamina C que activa el metabolismo",
        "texto": "La naranja aporta vitamina C, que el hígado usa para transformar la grasa en energía."
      },
      {
        "icone": "📉",
        "titulo": "La insulina responde mejor",
        "texto": "La cúrcuma mejora la comunicación entre la insulina y las células, lo que facilita la entrada del azúcar."
      },
      {
        "icone": "✨",
        "titulo": "Más energía y ánimo",
        "texto": "Con el hígado funcionando bien, el cuerpo procesa los alimentos con más eficiencia y la energía aumenta."
      }
    ],
    "ingredientes": [
      "2 unidades medianas — zanahoria cruda (pelada y cortada)",
      "1 unidad — naranja (jugo exprimido)",
      "½ cdta. — cúrcuma en polvo",
      "1 pizca — pimienta negra molida (activa la cúrcuma)",
      "200 ml — agua fría",
      "hielo — al gusto"
    ],
    "preparo": [
      "Pela y corta la zanahoria en trozos pequeños.",
      "Exprime la naranja y ponla en la licuadora con la zanahoria, la cúrcuma, la pimienta y el agua.",
      "Licúa durante 2 minutos a velocidad alta. Cuela si lo prefieres y sirve con hielo."
    ]
  }
]

export const RITUAIS = [
  {
    "id": "ritual-01",
    "imagem": "/materiais/rituais-01.jpg",
    "tag": "🩸 Circulación · 10–15 min · 4 ejercicios",
    "titulo": "Activa tu Circulación",
    "descricao": "Movimientos simples para ayudar a tu cuerpo a desinflamarse, aliviar la sensación de piernas pesadas y aumentar tu energía en pocos minutos.",
    "quandoFazer": "A cualquier hora del día. Ideal al despertar o después de pasar mucho tiempo sentada",
    "quandoDica": "Repite la secuencia 2 veces para potenciar el efecto",
    "introEditorial": "Piernas pesadas, hormigueo, cansancio sin motivo. Es la circulación pidiendo auxilio.",
    "introTexto": "Cuando la sangre circula mal, el cuerpo retiene líquidos, se cansa más rápido y quema menos grasa. Estos 4 movimientos activan la bomba muscular de las piernas y mejoran el retorno venoso en menos de 15 minutos.",
    "beneficios": [
      {
        "icone": "🦵",
        "titulo": "Piernas más ligeras",
        "texto": "La contracción muscular de las piernas empuja la sangre de vuelta al corazón y alivia la pesadez y la hinchazón."
      },
      {
        "icone": "⚡",
        "titulo": "Más energía en minutos",
        "texto": "Con la circulación activa, el oxígeno llega más rápido a las células y sientes la diferencia al instante."
      },
      {
        "icone": "🔥",
        "titulo": "Quema de grasa encendida",
        "texto": "Circulación activa = metabolismo acelerado. El cuerpo empieza a usar la grasa como combustible."
      },
      {
        "icone": "😴",
        "titulo": "Sueño más reparador",
        "texto": "Ejercitarte por la noche mejora la circulación periférica y facilita la relajación profunda."
      }
    ],
    "exercicios": [
      {
        "icone": "🦶",
        "numero": "01",
        "nome": "Elevación de Pantorrillas de Pie",
        "series": "3 series · 20 repeticiones",
        "comoFazer": "Ponte de pie, con los pies al ancho de las caderas. Sube a la punta de los pies lentamente (2 segundos para subir, 2 para bajar). Mantén 1 segundo arriba. Puedes apoyar las manos en la pared.",
        "porQueFunciona": "A la pantorrilla la llaman «el segundo corazón». Cada contracción bombea sangre venosa de vuelta al corazón y reduce la acumulación de líquido en las piernas.",
        "dica": "Hazlo despacio. La velocidad no importa: lo que activa la circulación es la contracción completa del músculo."
      },
      {
        "icone": "🚶",
        "numero": "02",
        "nome": "Marcha en el Lugar con Rodillas Altas",
        "series": "2 series · 60 segundos",
        "comoFazer": "De pie, eleva las rodillas de forma alternada hasta la altura de la cadera, como si estuvieras marchando. Balancea los brazos naturalmente. Mantén el abdomen ligeramente contraído.",
        "porQueFunciona": "Activa al mismo tiempo los músculos de los muslos, los glúteos y el abdomen, lo que aumenta el flujo sanguíneo en toda la parte inferior del cuerpo y estimula el sistema linfático.",
        "dica": "Si tienes las rodillas sensibles, elévalas menos. Lo importante es el movimiento continuo."
      },
      {
        "icone": "🧘",
        "numero": "03",
        "nome": "Piernas en Alto, Acostada",
        "series": "1 vez · 5 minutos",
        "comoFazer": "Acuéstate boca arriba cerca de una pared. Levanta las piernas y apóyalas en la pared, formando una L. Relaja los brazos a los lados del cuerpo. Respira profundo y quédate así durante 5 minutos.",
        "porQueFunciona": "La gravedad ayuda a que la sangre acumulada en las piernas vuelva al corazón. Es uno de los movimientos más poderosos para desinflamar y activar la circulación venosa sin ningún esfuerzo.",
        "dica": "Pon un cojín debajo de la cadera para elevarla ligeramente. Eso potencia el retorno venoso."
      },
      {
        "icone": "⭕",
        "numero": "04",
        "nome": "Rotación de Tobillos",
        "series": "3 series · 15 rotaciones hacia cada lado",
        "comoFazer": "Sentada o acostada, extiende una pierna. Haz círculos con el pie: 15 veces en el sentido de las agujas del reloj y 15 en sentido contrario. Cambia de pierna. Mueve solo el tobillo, sin mover la rodilla.",
        "porQueFunciona": "La articulación del tobillo tiene una rica red de vasos sanguíneos y linfáticos. Moverla activa la microcirculación local y previene el edema que se forma a lo largo del día.",
        "dica": "Ideal para hacer mientras ves la TV o antes de dormir. Hazlo 2 a 3 veces al día si pasas mucho tiempo sentada."
      }
    ]
  },
  {
    "id": "ritual-02",
    "imagem": "/materiais/rituais-02.jpg",
    "tag": "💧 Desinflamar · 10–15 min · 4 ejercicios",
    "titulo": "Desinflámate de una Vez",
    "descricao": "Cuando el cuerpo está menos hinchado, te sientes más ligera, más cómoda y hasta la ropa te queda mejor.",
    "quandoFazer": "Por la mañana al despertar. Es cuando el cuerpo más retiene líquidos",
    "quandoDica": "Toma un vaso de agua antes de empezar para facilitar el drenaje",
    "introEditorial": "La hinchazón no es grasa. Es líquido detenido esperando una orden para salir.",
    "introTexto": "El sistema linfático no tiene bomba propia: depende del movimiento muscular para funcionar. Cuando te quedas quieta, el líquido se acumula. Estos 4 ejercicios son la bomba que faltaba.",
    "beneficios": [
      {
        "icone": "🫧",
        "titulo": "Vientre menos hinchado",
        "texto": "El movimiento abdominal estimula el drenaje linfático intestinal, que causa gran parte de la hinchazón visible."
      },
      {
        "icone": "🦵",
        "titulo": "Piernas sin pesadez",
        "texto": "Las contracciones musculares activan los vasos linfáticos de las piernas y eliminan el líquido retenido en las células."
      },
      {
        "icone": "💨",
        "titulo": "Menos gases y retención",
        "texto": "Los ejercicios de respiración y torsión activan el peristaltismo y reducen la producción de gases."
      },
      {
        "icone": "✨",
        "titulo": "Rostro y ojos deshinchados",
        "texto": "El drenaje linfático empieza en la cabeza y baja. Activarlo reduce la hinchazón en el rostro y alrededor de los ojos."
      }
    ],
    "exercicios": [
      {
        "icone": "🌬️",
        "numero": "01",
        "nome": "Respiración Diafragmática",
        "series": "3 series · 10 respiraciones",
        "comoFazer": "Acuéstate o siéntate cómodamente. Pon una mano en el pecho y la otra en el vientre. Inhala por la nariz en 4 tiempos, sintiendo que el vientre se expande (no el pecho). Exhala por la boca en 6 tiempos, contrayendo el abdomen.",
        "porQueFunciona": "El diafragma funciona como una bomba para el sistema linfático. Cada respiración profunda crea variaciones de presión que mueven la linfa por el cuerpo, especialmente en el tronco y el abdomen.",
        "dica": "Si el pecho sube antes que el vientre, estás respirando mal. Practica despacio hasta sentir que el vientre se mueve primero."
      },
      {
        "icone": "🔄",
        "numero": "02",
        "nome": "Torsión de Tronco Sentada",
        "series": "3 series · 10 repeticiones por lado",
        "comoFazer": "Siéntate en el suelo con las piernas cruzadas. Inhala con la espalda recta. Al exhalar, gira el tronco hacia la derecha, apoyando la mano izquierda en la rodilla derecha. Mantén 3 respiraciones. Vuelve y repite hacia el otro lado.",
        "porQueFunciona": "La torsión comprime y descomprime los órganos y los vasos linfáticos abdominales como una esponja, lo que obliga a la linfa a moverse y arrastra con ella toxinas y líquido retenido.",
        "dica": "Gira desde la cintura, no desde los hombros. Siente el estiramiento en el costado del tronco: eso es lo que estimula el drenaje."
      },
      {
        "icone": "🏋️",
        "numero": "03",
        "nome": "Sentadilla Parcial Lenta",
        "series": "3 series · 15 repeticiones",
        "comoFazer": "De pie, con los pies al ancho de los hombros. Baja hasta 90 grados (o hasta donde puedas sin dolor) en 3 segundos. Sube en 1 segundo. Mantén las rodillas alineadas con los pies y el pecho erguido.",
        "porQueFunciona": "Los grandes músculos de los muslos y los glúteos son los mayores activadores del sistema linfático. Contraerlos empuja hacia arriba la linfa acumulada en las piernas y en la región pélvica.",
        "dica": "La bajada lenta es más importante que la sentadilla completa. Si te duele la rodilla, baja solo hasta donde te resulte cómodo."
      },
      {
        "icone": "🌉",
        "numero": "04",
        "nome": "Puente en el Suelo con Respiración",
        "series": "3 series · 12 repeticiones",
        "comoFazer": "Acuéstate boca arriba, con las rodillas dobladas y los pies en el suelo al ancho de la cadera. Inhala profundo. Al exhalar, levanta la cadera contrayendo glúteos y abdomen. Mantén 2 segundos arriba. Baja inhalando.",
        "porQueFunciona": "Activa glúteos, isquiotibiales y abdomen al mismo tiempo. La compresión de la región pélvica al subir estimula el drenaje linfático de la parte baja del abdomen y de las piernas.",
        "dica": "En la parte más alta del movimiento, aprieta bien los glúteos. No dejes que las rodillas se abran: eso indica que el glúteo no está trabajando."
      }
    ]
  },
  {
    "id": "ritual-03",
    "imagem": "/materiais/rituais-03.jpg",
    "tag": "💆 Dolores · 10–15 min · 4 ejercicios",
    "titulo": "Alivio para los Dolores del Cuerpo",
    "descricao": "Movimientos suaves para reducir la rigidez del cuerpo y ayudarte a sentirte más cómoda durante el día.",
    "quandoFazer": "Al despertar y antes de dormir. Son los momentos en que el alivio es más rápido",
    "quandoDica": "Nunca fuerces el estiramiento. Llega hasta donde sientas tensión, no dolor",
    "introEditorial": "El dolor en el cuerpo no es señal de vejez. Es señal de que el músculo estuvo quieto demasiado tiempo.",
    "introTexto": "Dolor de espalda, tensión en el cuello, cadera rígida: casi siempre son músculos acortados y articulaciones que necesitan movimiento. Estos 4 estiramientos deshacen los nudos más comunes del día a día.",
    "beneficios": [
      {
        "icone": "🔓",
        "titulo": "Columna más libre",
        "texto": "Los estiramientos específicos liberan la tensión acumulada entre las vértebras y alivian el dolor lumbar."
      },
      {
        "icone": "😌",
        "titulo": "Cuello y hombros sueltos",
        "texto": "Los movimientos de movilidad cervical deshacen la tensión causada por horas frente a la pantalla."
      },
      {
        "icone": "🦴",
        "titulo": "Cadera más abierta",
        "texto": "Abrir la cadera alivia la zona lumbar, mejora la postura y reduce los dolores que se irradian a las piernas."
      },
      {
        "icone": "💤",
        "titulo": "Sueño sin dolor",
        "texto": "Un cuerpo suelto por la noche duerme más profundo y despierta sin esa rigidez matutina."
      }
    ],
    "exercicios": [
      {
        "icone": "🐱",
        "numero": "01",
        "nome": "Gato y Vaca en el Suelo",
        "series": "3 series · 10 repeticiones",
        "comoFazer": "En cuatro apoyos (manos y rodillas en el suelo). Inhala arqueando la espalda hacia abajo y mirando hacia arriba (vaca). Exhala curvando la espalda hacia arriba como un gato enojado, con la cabeza entre los brazos. Movimiento fluido y lento.",
        "porQueFunciona": "Moviliza todas las vértebras de la columna, lubrica los discos intervertebrales y libera la tensión de los músculos paravertebrales, los principales responsables del dolor lumbar crónico.",
        "dica": "Hazlo al despertar, incluso en la cama si quieres. 10 repeticiones lentas ya marcan una diferencia enorme en la rigidez matutina."
      },
      {
        "icone": "🧎",
        "numero": "02",
        "nome": "Una Rodilla al Suelo. Apertura de Cadera",
        "series": "3 series · 30 segundos por lado",
        "comoFazer": "Apoya una rodilla en el suelo y pon el otro pie adelante (posición de caballero). Empuja la cadera ligeramente hacia adelante y hacia abajo, sintiendo el estiramiento en la parte delantera del muslo y en la cadera de la rodilla que está en el suelo. Mantén.",
        "porQueFunciona": "Estira el psoasilíaco, el músculo más acortado en quien pasa mucho tiempo sentada. Ese músculo acortado tira de la zona lumbar hacia adelante y es la principal causa de dolor de espalda en mujeres sedentarias.",
        "dica": "Pon un cojín debajo de la rodilla que está en el suelo. No te inclines hacia adelante: mantén el tronco erguido para que el estiramiento funcione."
      },
      {
        "icone": "🧠",
        "numero": "03",
        "nome": "Estiramiento de Cuello y Trapecio",
        "series": "3 series · 30 segundos por lado",
        "comoFazer": "Sentada con la espalda recta. Inclina la cabeza hacia la derecha, llevando la oreja hacia el hombro. Con la mano derecha, aplica una presión suave en el lado izquierdo de la cabeza. Siente el estiramiento en el cuello y el hombro izquierdo. Cambia de lado.",
        "porQueFunciona": "El trapecio superior es el músculo más tenso en el 90% de las mujeres que trabajan sentadas. Este estiramiento específico libera la tensión que causa dolor de cabeza, cuello y hombros.",
        "dica": "Presión muy suave, sin tirar con fuerza. Respira profundo durante el estiramiento y exhala soltando más la tensión."
      },
      {
        "icone": "🙏",
        "numero": "04",
        "nome": "Postura del Niño",
        "series": "2 series · 60 segundos",
        "comoFazer": "Arrodíllate y siéntate sobre los talones. Extiende los brazos al frente y baja el tronco hacia el suelo, con la frente tocando la colchoneta. Respira profundo, sintiendo cómo la espalda se expande con cada inhalación.",
        "porQueFunciona": "Estira al mismo tiempo la zona lumbar, la cadera, el sacro y los hombros. También tiene un efecto calmante en el sistema nervioso: reduce el cortisol y le indica al cuerpo que es seguro relajarse.",
        "dica": "Abre las rodillas un poco más que el ancho de la cadera si el vientre te estorba. Mantén los brazos extendidos para sentir el estiramiento también en los hombros."
      }
    ]
  },
  {
    "id": "ritual-04",
    "imagem": "/materiais/rituais-04.jpg",
    "tag": "🌿 Intestino · 10–15 min · 4 ejercicios",
    "titulo": "Intestino en Movimiento",
    "descricao": "Una secuencia simple para ayudar al intestino a funcionar mejor y reducir esa sensación de vientre pesado e hinchado.",
    "quandoFazer": "Por la mañana en ayunas. Es cuando el intestino está más receptivo al estímulo",
    "quandoDica": "Toma 1 vaso de agua tibia antes. Eso ya inicia el reflejo gastrocólico",
    "introEditorial": "Estreñimiento, vientre hinchado, sensación de pesadez. El cuerpo está pidiendo movimiento, no medicamentos.",
    "introTexto": "El intestino no funciona solo. Necesita la contracción de los músculos abdominales y la gravedad para mover su contenido. Estos 4 ejercicios son un masaje interno que activa el tránsito intestinal de forma natural.",
    "beneficios": [
      {
        "icone": "🌀",
        "titulo": "Tránsito intestinal activo",
        "texto": "Los movimientos abdominales y de torsión activan el peristaltismo: las contracciones que mueven el contenido por el intestino."
      },
      {
        "icone": "💨",
        "titulo": "Menos gases e hinchazón",
        "texto": "La presión y descompresión abdominal libera los gases atrapados y reduce la distensión que causa malestar."
      },
      {
        "icone": "🔥",
        "titulo": "Quema de grasa abdominal",
        "texto": "Un intestino saludable absorbe menos calorías en exceso y procesa mejor los nutrientes."
      },
      {
        "icone": "😊",
        "titulo": "Mejor ánimo y más energía",
        "texto": "El 90% de la serotonina se produce en el intestino. Estimularlo mejora el ánimo y reduce la ansiedad."
      }
    ],
    "exercicios": [
      {
        "icone": "🤲",
        "numero": "01",
        "nome": "Masaje Abdominal en I-L-U",
        "series": "2 series · 2 minutos",
        "comoFazer": "Acuéstate boca arriba con las rodillas dobladas. Con las manos, haz una presión suave en el abdomen siguiendo el recorrido del intestino grueso: sube por el lado derecho (I), ve de derecha a izquierda justo debajo de las costillas (L) y baja por el lado izquierdo (U). Haz movimientos circulares lentos.",
        "porQueFunciona": "Sigue el recorrido real del colon ascendente, transverso y descendente. La presión suave empuja el contenido intestinal en la dirección correcta y estimula el tránsito de forma mecánica y directa.",
        "dica": "Presión suave, como amasar ligeramente. Si sientes dolor, disminuye la presión. Hazlo en ayunas para un efecto máximo."
      },
      {
        "icone": "🦵",
        "numero": "02",
        "nome": "Rodillas al Pecho Alternadas",
        "series": "3 series · 15 repeticiones por lado",
        "comoFazer": "Acuéstate boca arriba. Lleva una rodilla hacia el pecho con las dos manos, manteniendo la otra pierna extendida. Mantén 2 segundos. Alterna. El movimiento debe ser suave y controlado.",
        "porQueFunciona": "Comprime el colon descendente y el sigmoide, las últimas partes del intestino grueso, donde el contenido se queda detenido en el estreñimiento. La compresión y la liberación imitan el movimiento natural del peristaltismo.",
        "dica": "Para potenciarlo: después de sostener la rodilla, haz pequeños movimientos circulares con ella. Eso aumenta la presión abdominal de forma localizada."
      },
      {
        "icone": "🔄",
        "numero": "03",
        "nome": "Torsión Acostada con Rodillas Juntas",
        "series": "3 series · 30 segundos por lado",
        "comoFazer": "Acuéstate boca arriba, con las rodillas dobladas y juntas. Extiende los brazos en T. Deja caer las rodillas hacia el lado derecho mientras giras la cabeza hacia la izquierda. Respira profundo y mantén. Vuelve al centro y cambia.",
        "porQueFunciona": "La torsión comprime y descomprime alternadamente los órganos digestivos como una esponja. Eso estimula el flujo sanguíneo hacia el intestino y activa las glándulas que producen los jugos digestivos.",
        "dica": "No fuerces las rodillas hasta el suelo si no llegan: usa la gravedad y la respiración para ir bajando naturalmente durante los 30 segundos."
      },
      {
        "icone": "🔥",
        "numero": "04",
        "nome": "Respiración de Fuego (Lenta)",
        "series": "3 series · 20 respiraciones",
        "comoFazer": "Siéntate en una posición cómoda, con la columna recta. Exhala con fuerza por la nariz, contrayendo el abdomen hacia adentro y hacia arriba. Deja que la inhalación ocurra naturalmente, sin esfuerzo. Mantén un ritmo moderado, no muy rápido.",
        "porQueFunciona": "La contracción rápida del abdomen al exhalar masajea directamente los órganos digestivos. Cada exhalación forzada mueve el intestino. También estimula el nervio vago, que coordina toda la digestión.",
        "dica": "Si sientes mareo, baja el ritmo. Empieza con 10 respiraciones y aumenta gradualmente. Evítala durante la menstruación o si tienes una hernia abdominal."
      }
    ]
  },
  {
    "id": "ritual-05",
    "imagem": "/materiais/rituais-05.jpg",
    "tag": "🔥 Adelgazar · 10–15 min · 4 ejercicios",
    "titulo": "Muévete y Adelgaza",
    "descricao": "Unos minutos de movimiento ayudan a gastar energía, mejorar el ánimo y apoyar tu proceso de pérdida de peso.",
    "quandoFazer": "Por la mañana en ayunas para la máxima quema de grasa, o a cualquier hora que puedas",
    "quandoDica": "3 veces por semana ya generan un resultado visible en 30 días",
    "introEditorial": "No necesitas gimnasio. No necesitas 1 hora. Necesitas constancia y los movimientos correctos.",
    "introTexto": "Estos 4 ejercicios fueron elegidos porque activan los grupos musculares más grandes del cuerpo, lo que genera el mayor gasto calórico posible en poco tiempo. Y lo mejor: el efecto continúa durante horas después de que terminas.",
    "beneficios": [
      {
        "icone": "🔥",
        "titulo": "Metabolismo acelerado",
        "texto": "Los músculos grandes exigen más energía, incluso en reposo. Entrenarlos aumenta la quema calórica las 24 horas del día."
      },
      {
        "icone": "💪",
        "titulo": "Masa muscular preservada",
        "texto": "Los ejercicios de fuerza preservan el músculo durante la pérdida de peso y evitan el efecto rebote."
      },
      {
        "icone": "📉",
        "titulo": "Insulina más baja",
        "texto": "Los ejercicios breves de alta intensidad mejoran la sensibilidad a la insulina, clave para desbloquear la quema de grasa."
      },
      {
        "icone": "😊",
        "titulo": "Bienestar inmediato",
        "texto": "En 10 minutos de ejercicio el cuerpo libera endorfinas, dopamina y serotonina. El ánimo cambia al instante."
      }
    ],
    "exercicios": [
      {
        "icone": "🏋️",
        "numero": "01",
        "nome": "Sentadilla Libre",
        "series": "4 series · 15 repeticiones",
        "comoFazer": "Pies al ancho de los hombros, con las puntas ligeramente hacia afuera. Baja como si fueras a sentarte en una silla imaginaria, con las rodillas detrás de las puntas de los pies y el pecho erguido. Sube exhalando con fuerza. Brazos al frente para mantener el equilibrio.",
        "porQueFunciona": "Activa cuádriceps, glúteos, isquiotibiales y core al mismo tiempo: los músculos más grandes del cuerpo. Cuanto más grande es el músculo activado, mayor es el gasto calórico durante y después del ejercicio (EPOC).",
        "dica": "Baja hasta que las rodillas queden a 90 grados o más abajo. Cuanto más profundo, más glúteo y menos rodilla. Mantén el peso en los talones."
      },
      {
        "icone": "⭐",
        "numero": "02",
        "nome": "Saltos de Tijera",
        "series": "4 series · 40 segundos",
        "comoFazer": "De pie, con los pies juntos y los brazos a los lados. Salta abriendo las piernas y llevando los brazos por encima de la cabeza al mismo tiempo. Salta de vuelta a la posición inicial. Mantén un ritmo constante y aterriza suavemente.",
        "porQueFunciona": "Eleva rápidamente la frecuencia cardíaca y convierte el ejercicio en cardio de alta intensidad. En 40 segundos, el corazón trabaja en la zona de quema de grasa sin necesidad de equipo.",
        "dica": "Si te molesta el impacto en las rodillas o el suelo, haz la versión sin salto: paso lateral abriendo las piernas de forma alternada, subiendo los brazos al mismo tiempo."
      },
      {
        "icone": "👟",
        "numero": "03",
        "nome": "Zancada Alternada",
        "series": "3 series · 12 repeticiones por pierna",
        "comoFazer": "De pie, da un paso largo al frente con el pie derecho. Baja la rodilla izquierda hacia el suelo (sin tocarlo). Vuelve. Alterna las piernas. Mantén el tronco erguido y la rodilla de adelante detrás de la punta del pie.",
        "porQueFunciona": "Trabaja cada pierna de forma independiente, lo que exige más estabilidad y activa el core. Glúteos y cuádriceps trabajan juntos en el mismo movimiento, duplicando el gasto calórico en comparación con la sentadilla.",
        "dica": "El paso debe ser lo bastante largo para que la rodilla de atrás no pase del dedo gordo del pie de adelante. Un paso corto sobrecarga la rodilla."
      },
      {
        "icone": "💪",
        "numero": "04",
        "nome": "Plancha Abdominal",
        "series": "3 series · 30 a 60 segundos",
        "comoFazer": "Apoya los antebrazos y las puntas de los pies en el suelo. El cuerpo en línea recta de la cabeza a los talones. Contrae el abdomen y no dejes que la cadera caiga ni suba. Respira de forma controlada todo el tiempo.",
        "porQueFunciona": "Activa el core profundo (transverso abdominal), que sostiene la columna y le da forma al abdomen. También mantiene elevada la frecuencia cardíaca, lo que convierte un ejercicio estático en quema de grasa.",
        "dica": "La calidad importa más que el tiempo. 20 segundos con el abdomen contraído valen más que 60 segundos con la cadera caída. Aumenta 5 segundos por semana."
      }
    ]
  }
]

export const PROTOCOLOS = [
  {
    "id": "protocolo-01-manha",
    "imagem": "/materiais/protocolo-01-manha.jpg",
    "tag": "☀️ Mañana · 15 a 20 min",
    "titulo": "Protocolo de la Mañana",
    "descricao": "Los primeros 20 minutos del día determinan cómo se va a comportar tu insulina en las próximas 12 horas.",
    "acontece": "Te despiertas sin tiempo, sin energía, sin saber qué comer. Y entonces improvisas. Y la improvisación casi siempre sabotea.",
    "solucao": "Con 3 decisiones simples apenas te despiertas, pones la insulina en su lugar y sigues el día sin culpa y sin hambre a deshoras.",
    "frase": "No necesitas una mañana perfecta. Solo necesitas unos minutos para empezar el día sin salir en piloto automático.",
    "passos": [
      {
        "icone": "💧",
        "numero": "01",
        "titulo": "Antes que nada: agua",
        "texto": "Toma 1 vaso de agua apenas te despiertes, antes del café, antes del celular. El cuerpo pasa de 7 a 8 horas sin agua. Rehidratarte primero mejora el metabolismo, reduce el cortisol matutino y disminuye el hambre a primera hora.",
        "dica": "Deja el vaso lleno en la mesa de noche la noche anterior. Sin esfuerzo."
      },
      {
        "icone": "🥣",
        "numero": "02",
        "titulo": "Desayuno con proteína y fibra",
        "texto": "Evita empezar con pan, tortillas, fruta sola o galletas. Esos alimentos disparan la insulina a primera hora y generan hambre en 1 hora. Prefiere huevos, yogur natural, queso, aguacate, avena con chía.",
        "dica": "Si no tienes tiempo: 2 huevos revueltos en 3 minutos. Simple, económico y te mantiene sin hambre hasta el almuerzo."
      },
      {
        "icone": "🚶",
        "numero": "03",
        "titulo": "5 minutos de movimiento",
        "texto": "No necesitas entrenar. Solo 5 minutos de caminata ligera, marcha en el lugar o estiramiento ya activan la circulación, despiertan el metabolismo y reducen la resistencia a la insulina del día.",
        "dica": "Hazlo mientras se calienta el café. Todas tenemos 5 minutos."
      },
      {
        "icone": "📵",
        "numero": "04",
        "titulo": "El celular, después del desayuno",
        "texto": "Mirar el celular antes de comer aumenta el cortisol a primera hora. El cortisol alto eleva el azúcar en la sangre incluso sin comer nada. Deja el celular para después del desayuno.",
        "dica": "Parece que no tiene que ver, pero tiene un impacto real en la insulina. Pruébalo por 7 días y observa la diferencia en tu nivel de energía."
      }
    ],
    "evitar": [
      "Saltarte el desayuno creyendo que así adelgazas más",
      "Empezar con jugo de fruta o fruta sola",
      "Mirar el celular antes de comer",
      "Tomar café en ayunas si sientes ansiedad o palpitaciones"
    ],
    "lembre": "Una buena mañana no necesita ser perfecta. Necesita ser constante."
  },
  {
    "id": "protocolo-02-noite",
    "imagem": "/materiais/protocolo-02-noite.jpg",
    "tag": "🌙 Noche · últimas 2 horas antes de dormir",
    "titulo": "Protocolo de la Noche",
    "descricao": "Lo que haces en las 2 horas antes de dormir impacta directamente en la insulina del día siguiente.",
    "acontece": "Llegas cansada, picas lo que tengas enfrente, te quedas en el celular hasta tarde y duermes mal. Al día siguiente la insulina está alta, el hambre aparece temprano y el ciclo se repite.",
    "solucao": "4 acciones simples en las últimas 2 horas del día protegen el sueño, bajan la insulina en ayunas y hacen que te despiertes más ligera.",
    "frase": "Una buena noche empieza mucho antes de acostarte. Pequeños ajustes pueden ayudarte a dormir mejor y a despertar con más energía.",
    "passos": [
      {
        "icone": "🍽️",
        "numero": "01",
        "titulo": "Cena ligera y a la hora correcta",
        "texto": "Intenta cenar al menos 2 horas antes de dormir. El cuerpo no digiere bien acostado, y la insulina elevada por la noche perjudica la quema de grasa que ocurre durante el sueño. Prefiere proteína ligera con verduras.",
        "dica": "Si sientes hambre después de la cena, toma un té de manzanilla o toronjil. Generalmente es ansiedad, no hambre real."
      },
      {
        "icone": "📱",
        "numero": "02",
        "titulo": "Pantallas apagadas 1 hora antes de dormir",
        "texto": "La luz azul del celular inhibe la melatonina, la hormona que controla el sueño. Sin melatonina, el cortisol sube. Y cortisol alto por la noche es insulina alta por la mañana. Cambia la pantalla por un libro, música o una conversación.",
        "dica": "Usa el modo descanso del celular a partir de las 21:00. Reduce la luz azul y ya ayuda."
      },
      {
        "icone": "🌡️",
        "numero": "03",
        "titulo": "Habitación fresca y oscura",
        "texto": "La temperatura ideal para dormir está entre 18 y 20 grados. Las habitaciones calurosas o con luz perjudican el sueño profundo. El sueño superficial aumenta el cortisol y, en consecuencia, la insulina del día siguiente.",
        "dica": "Unas medias o una manta ligera en los pies ayudan a redistribuir el calor corporal y facilitan conciliar el sueño."
      },
      {
        "icone": "✍️",
        "numero": "04",
        "titulo": "Vacía la cabeza antes de acostarte",
        "texto": "Anota en una hoja de papel todo lo que tienes en la cabeza: tareas de mañana, preocupaciones, pendientes. Eso libera al cerebro del modo de alerta y permite que el sistema nervioso entre en modo de descanso.",
        "dica": "No tiene que ser un diario ni nada elaborado. Una lista de 5 líneas ya reduce la ansiedad nocturna."
      }
    ],
    "evitar": [
      "Comer dulces o carbohidratos pesados después de las 20:00",
      "Quedarte en el celular acostada hasta dormirte",
      "Tomar café o té con cafeína después de las 17:00",
      "Dormir con la TV encendida o con la luz prendida"
    ],
    "lembre": "Cada noche bien dormida es un día de adelgazar en piloto automático."
  },
  {
    "id": "protocolo-03-festa",
    "imagem": "/materiais/protocolo-03-festa.jpg",
    "tag": "🎉 Fiesta · antes, durante y después",
    "titulo": "Protocolo de la Fiesta",
    "descricao": "No necesitas rechazar la invitación, comer antes de ir ni sentirte culpable al día siguiente.",
    "acontece": "Vas a la fiesta decidida a portarte bien. Entonces ves la mesa, comes de todo, bebes más de lo que planeaste y despiertas al día siguiente con culpa e hinchazón. El problema no fue la fiesta. Fue la falta de un plan.",
    "solucao": "Con 4 acciones simples disfrutas la fiesta, comes lo que te gusta y no te sales del camino.",
    "frase": "Una fiesta no destruye tus resultados. Lo que marca la diferencia es saber disfrutar sin convertir una comida en un fin de semana entero fuera de control.",
    "passos": [
      {
        "icone": "🥗",
        "numero": "01",
        "titulo": "Come antes de salir de casa",
        "texto": "No llegues a la fiesta con hambre. Un refrigerio ligero con proteína (huevo, yogur, queso) antes de salir reduce la insulina y controla el apetito. Quien llega con hambre come rápido, no mastica y pierde el control de la cantidad.",
        "dica": "Un yogur natural con una fruta 1 hora antes ya lo resuelve. Simple y eficaz."
      },
      {
        "icone": "🥩",
        "numero": "02",
        "titulo": "En la mesa: primero la proteína",
        "texto": "Cuando vayas a servirte, empieza por las proteínas y las ensaladas. Desaceleran la digestión de los carbohidratos que vendrán después. Eso reduce el pico de insulina incluso si comes dulce enseguida.",
        "dica": "Un plato de proteína antes de los bocadillos ya marca la diferencia. No necesitas evitar nada, solo cambiar el orden."
      },
      {
        "icone": "🥂",
        "numero": "03",
        "titulo": "Si bebes, elige mejor",
        "texto": "El alcohol eleva la insulina y bloquea la quema de grasa hasta por 24 horas. Si vas a beber, prefiere vino seco o un destilado con agua mineral con gas. Evita la cerveza, los cócteles azucarados y los tragos con azúcar.",
        "dica": "Alterna cada trago con un vaso de agua. Además de hidratarte, bebes menos en total."
      },
      {
        "icone": "🌅",
        "numero": "04",
        "titulo": "Al día siguiente: retoma sin drama",
        "texto": "No hagas ayuno de castigo, no te saltes comidas, no te peses esa mañana. Toma agua, come proteína en el desayuno y vuelve a la rutina normal. Un día fuera no deshace semanas de constancia.",
        "dica": "Lo que engorda no es la fiesta. Es el ciclo de culpa, restricción y compensación que viene después."
      }
    ],
    "evitar": [
      "Llegar a la fiesta con hambre",
      "Empezar por la mesa de dulces y bocadillos",
      "Tomar gaseosas o cócteles azucarados",
      "Hacer ayuno de castigo al día siguiente"
    ],
    "lembre": "Una fiesta no tiene que ser sabotaje. Puede ser solo una fiesta."
  },
  {
    "id": "protocolo-04-viagem",
    "imagem": "/materiais/protocolo-04-viagem.jpg",
    "tag": "✈️ Viaje · antes y durante",
    "titulo": "Protocolo del Viaje",
    "descricao": "Viajar no tiene que ser sinónimo de abandono total. Con pequeñas elecciones mantienes el ritmo sin renunciar al paseo.",
    "acontece": "En el viaje, la rutina desaparece. Comes a deshoras, caminas más, duermes distinto, tomas menos agua. Cuando vuelves, sientes que perdiste todo lo que habías logrado.",
    "solucao": "No necesitas seguir el protocolo perfecto de viaje. Necesitas seguir lo mínimo que impide el retroceso.",
    "frase": "Viajar no significa abandonar tu rutina. El secreto es adaptarte, no rendirte.",
    "passos": [
      {
        "icone": "🎒",
        "numero": "01",
        "titulo": "Lleva refrigerios en el bolso",
        "texto": "Almendras, nueces, barra de proteína, fruta deshidratada sin azúcar. Tener un refrigerio saludable en el bolso evita que el hambre te obligue a comer lo que aparezca en el aeropuerto, la gasolinera o el puesto de la carretera.",
        "dica": "Un paquetito de frutos secos y una fruta ya salvan la comida en situaciones de emergencia."
      },
      {
        "icone": "💧",
        "numero": "02",
        "titulo": "El agua es prioridad",
        "texto": "De viaje nos olvidamos de tomar agua. El avión deshidrata, el auto distrae, el paseo desgasta. Una deshidratación leve ya causa hambre falsa, cansancio y retención de líquidos. Lleva siempre una botellita.",
        "dica": "En el avión, pide agua cada vez que pase la azafata. No esperes a sentir sed."
      },
      {
        "icone": "🍽️",
        "numero": "03",
        "titulo": "En el restaurante: elecciones simples",
        "texto": "No necesitas pedir el plato más saludable del menú. Solo aplica la regla: primero la proteína. Pide la proteína principal, cómela primero y después el acompañamiento. Eso ya controla la insulina en la comida.",
        "dica": "A la plancha, al horno o cocido en lugar de frito. No es un sacrificio, es solo elegir entre opciones parecidas."
      },
      {
        "icone": "🚶",
        "numero": "04",
        "titulo": "Aprovecha el movimiento natural",
        "texto": "De viaje generalmente caminas más que en casa. Subir escaleras en lugar del ascensor, caminar al restaurante, explorar el destino a pie. Eso ya cuenta como ejercicio y activa la quema de grasa sin necesidad de gimnasio.",
        "dica": "No fuerces un entrenamiento en el viaje si no se puede. Pero aprovecha cada excusa para caminar más."
      }
    ],
    "evitar": [
      "Pasar horas sin comer esperando el restaurante perfecto",
      "Excederte con el alcohol solo porque estás de vacaciones",
      "Dejar por completo la hidratación",
      "Pesarte al volver y entrar en modo castigo"
    ],
    "lembre": "El viaje es para disfrutar. Solo que no hace falta disfrutarlo todo de una vez."
  },
  {
    "id": "protocolo-05-visita",
    "imagem": "/materiais/protocolo-05-visita.jpg",
    "tag": "🏠 Visita · cuando recibes o te reciben",
    "titulo": "Protocolo de la Visita",
    "descricao": "Recibir visitas no tiene que convertirse en sabotaje. Puedes ser una buena anfitriona y seguir con tu proceso.",
    "acontece": "Llegó la visita, llegó el pastel, llegaron los bocadillos, llegó la gaseosa. Comes por educación, por ansiedad o porque no sabes qué hacer. Y después la culpa llega junto con los invitados.",
    "solucao": "Ser una buena anfitriona no significa comer de todo. Significa crear un ambiente agradable donde tú también te sientas bien.",
    "frase": "No tienes que elegir entre ser amable y cuidarte. Se pueden hacer las dos cosas.",
    "passos": [
      {
        "icone": "🫖",
        "numero": "01",
        "titulo": "Ofrece lo que tú también puedes tomar",
        "texto": "Sirve té frío de flor de Jamaica (hibisco), agua saborizada con limón y menta, jugo natural diluido. Son opciones bonitas, sabrosas y que puedes tomar sin culpa. Nadie se va a quejar.",
        "dica": "Una jarra de agua con limón y hielo sobre la mesa ya resuelve la bebida de todos."
      },
      {
        "icone": "🧀",
        "numero": "02",
        "titulo": "Ten una opción proteica en la mesa",
        "texto": "Frutos secos, queso, huevos de codorniz, bastones de verduras con hummus. Ponlos junto con lo que trajeron los demás. Tendrás qué comer sin necesidad de atacar el pastel entero.",
        "dica": "No necesitas esconder que estás comiendo distinto. Solo ponlo en la mesa y que coma quien quiera."
      },
      {
        "icone": "🍰",
        "numero": "03",
        "titulo": "Si quieres comer, come con conciencia",
        "texto": "Una rebanada de pastel no arruina el proceso. Comerte todo el pastel porque estaba enfrente, sí. Si vas a comer, elige lo que más te gusta, siéntate, mastica despacio y disfruta. Sin culpa y sin repetir.",
        "dica": "Comer con placer y atención genera mucha más satisfacción que comer rápido y repetir."
      },
      {
        "icone": "💬",
        "numero": "04",
        "titulo": "No necesitas explicar tus elecciones",
        "texto": "Si no quieres comer algo, una sonrisa y un «estoy bien, gracias» lo resuelve. No le debes explicaciones a nadie sobre lo que pones en tu plato. Nadie se va a ir con hambre por una negativa amable.",
        "dica": "Cuanta menos explicación, menos presión. Una respuesta simple cierra el tema."
      }
    ],
    "evitar": [
      "Comer por obligación o para no incomodar",
      "Quedarte de pie en la cocina picando mientras ordenas",
      "Tomar gaseosa porque no había otra opción",
      "Entrar en modo castigo después de que la visita se fue"
    ],
    "lembre": "Tu casa, tus reglas. Con ligereza y sin drama."
  },
  {
    "id": "protocolo-06-preguica-cansaco",
    "imagem": "/materiais/protocolo-06-preguica-cansaco.jpg",
    "tag": "😴 Pereza y Cansancio · días difíciles",
    "titulo": "Protocolo de la Pereza",
    "descricao": "Para los días en que no tienes energía ni ganas. El secreto es no dejar que el cansancio se convierta en abandono.",
    "acontece": "Estás cansada, sin ánimo y con ganas de comerte todo lo que ves. El sofá, el chocolate y el delivery parecen la única salida. Y cuando pasa, aparece la culpa.",
    "solucao": "Existe un modo mínimo de funcionamiento para los días difíciles. No te hará adelgazar más rápido. Pero impedirá que vuelvas al punto de partida.",
    "frase": "No todos los días vas a estar motivada. Y está bien. El objetivo es continuar incluso los días en que las ganas no aparecen.",
    "passos": [
      {
        "icone": "💧",
        "numero": "01",
        "titulo": "Empieza solo con agua",
        "texto": "Antes de decidir cualquier cosa, toma 1 vaso grande de agua. El cansancio y el desánimo muchas veces son deshidratación disfrazada. Espera 10 minutos. Con frecuencia, el ánimo mejora solo.",
        "dica": "Agrega limón u hojas de menta. El agua con sabor hidrata más porque tomas más."
      },
      {
        "icone": "🍳",
        "numero": "02",
        "titulo": "La comida mínima aceptable",
        "texto": "No necesitas cocinar. Pero sí necesitas comer algo de verdad. Huevo revuelto con queso, yogur natural, fruta con mantequilla de maní. Cualquier cosa con proteína que no sea ultraprocesada. El objetivo es no dejar que el vacío guíe tus elecciones.",
        "dica": "Huevo revuelto listo en 3 minutos. Es el alimento de emergencia oficial de cualquier día difícil."
      },
      {
        "icone": "🚶",
        "numero": "03",
        "titulo": "5 minutos de movimiento, solo eso",
        "texto": "No necesitas entrenar. Solo levántate del sofá y camina por la casa durante 5 minutos. O haz 20 sentadillas. El movimiento rompe el ciclo de letargo, libera un poco de dopamina y cambia ligeramente el estado mental.",
        "dica": "Pon una canción que te guste y camina. Muchas veces los 5 minutos se convierten en 15 naturalmente."
      },
      {
        "icone": "🛏️",
        "numero": "04",
        "titulo": "Si necesitas descansar, descansa de verdad",
        "texto": "Hay días en que lo mejor que puedes hacer por tu cuerpo es descansar. Dormir una hora, acostarte sin pantallas, relajarte de verdad. Eso no es pereza, es recuperación. El problema es cuando el descanso se convierte en descontrol con la comida.",
        "dica": "Descansar sin comida chatarra es productivo. Sofá con frituras y series es otra historia."
      }
    ],
    "evitar": [
      "Usar el cansancio como justificación para comer ultraprocesados",
      "Pasar todo el día sin comer y atacar la comida por la noche",
      "Culparte por no haber entrenado",
      "Pedir delivery sin mirar las opciones más proteicas del menú"
    ],
    "lembre": "Un mal día no deshace tu proceso. Rendirte, sí."
  },
  {
    "id": "protocolo-07-marmita",
    "imagem": "/materiais/protocolo-07-marmita.jpg",
    "tag": "🥡 Lonchera · armarla sin errores y sin sufrir",
    "titulo": "Protocolo de la Lonchera",
    "descricao": "La lonchera correcta es la mejor estrategia contra la improvisación. Decides en casa, donde tienes el control. No en la fila del restaurante.",
    "acontece": "Llegas al trabajo sin lonchera y el restaurante solo tiene frituras y platos cargados. Entonces cedes. No por debilidad, sino por falta de alternativa.",
    "solucao": "Una lonchera bien armada resuelve el almuerzo, evita la fila y además ahorra dinero. Y no necesita ser elaborada.",
    "frase": "Cuando tienes la comida lista, tomas mejores decisiones sin depender solo de la fuerza de voluntad.",
    "passos": [
      {
        "icone": "🏗️",
        "numero": "01",
        "titulo": "La estructura de toda lonchera correcta",
        "texto": "Toda lonchera eficiente tiene 4 partes: proteína (pollo, huevo, atún, carne), verdura salteada o al horno, hoja verde cruda o cocida, y una porción pequeña de carbohidrato complejo (arroz integral, camote, yuca). En ese orden de prioridad.",
        "dica": "La proteína y la verdura son obligatorias. El carbohidrato es opcional. La hoja verde es un extra."
      },
      {
        "icone": "📦",
        "numero": "02",
        "titulo": "Prepara por tandas el lunes",
        "texto": "Cocina el pollo, hornea el camote y saltea las verduras de una sola vez. Divídelo en recipientes y guárdalo en el refrigerador. Los demás días es solo armar en 2 minutos. Sin cocinar todos los días, sin la excusa de la falta de tiempo.",
        "dica": "El pollo al horno dura 4 días en el refrigerador. El camote cocido, 3 días. Haz todo de una vez."
      },
      {
        "icone": "🚫",
        "numero": "03",
        "titulo": "Lo que no va en la lonchera",
        "texto": "Evita mezclar muchos carbohidratos (arroz + pasta + pan). Evita las salsas listas, la mayonesa industrial y los sazonadores de sobre con mucho sodio. Esos productos inflaman, retienen líquidos y elevan la insulina incluso en porciones pequeñas.",
        "dica": "Sazona con aceite de oliva, limón, ajo, cebolla, hierbas frescas. Queda más rico y sin los extras indeseados."
      },
      {
        "icone": "⏰",
        "numero": "04",
        "titulo": "La hora de comer importa tanto como lo que comes",
        "texto": "Intenta comer a la misma hora todos los días. El cuerpo también regula la insulina por el ritmo circadiano. Comer siempre a las mismas horas entrena el metabolismo y reduce los picos de hambre a deshoras.",
        "dica": "Programa una alarma discreta en el celular para la hora del almuerzo. Parece una tontería, pero funciona."
      }
    ],
    "evitar": [
      "Armar la lonchera solo con carbohidratos por practicidad",
      "Usar salsa lista o sazonador de sobre industrializado",
      "Saltarte la lonchera y comer cualquier cosa porque tenías prisa",
      "Mezclar más de 2 fuentes de carbohidrato en el mismo recipiente"
    ],
    "lembre": "Una lonchera regular sigue siendo mejor que un bufé sin criterio."
  },
  {
    "id": "protocolo-08-fim-de-semana",
    "imagem": "/materiais/protocolo-08-fim-de-semana.jpg",
    "tag": "🌅 Fin de Semana · sin perder el hilo",
    "titulo": "Protocolo del Fin de Semana",
    "descricao": "El fin de semana es donde la mayoría pierde lo que logró durante la semana. No por accidente. Por falta de plan.",
    "acontece": "De lunes a viernes te va bien. El sábado comes lo que no comiste en toda la semana. El domingo compensas más. El lunes empiezas todo de cero. Y el progreso nunca aparece.",
    "solucao": "Flexibilidad con estructura. Puedes relajarte, comer distinto y disfrutar. Pero manteniendo 3 anclas que impiden el retroceso.",
    "frase": "No engordas entre lunes y viernes. Generalmente los excesos se acumulan el fin de semana. Por eso, pequeños cuidados aquí marcan mucha diferencia.",
    "passos": [
      {
        "icone": "☀️",
        "numero": "01",
        "titulo": "Mantén el desayuno",
        "texto": "Incluso el fin de semana, incluso durmiendo más, haz un desayuno con proteína. Esa ancla regula la insulina de todo el día y evita que el hambre acumulada te lleve a excesos en el almuerzo o la cena.",
        "dica": "Huevo revuelto, yogur o queso. No necesita ser elaborado. Necesita tener proteína."
      },
      {
        "icone": "🚶",
        "numero": "02",
        "titulo": "Una caminata o actividad placentera",
        "texto": "No tiene que ser entrenamiento. Una caminata en el parque, nadar, bailar, jugar con los niños. Cualquier movimiento que te guste y que dure al menos 20 minutos ya activa el metabolismo y mejora el ánimo del día.",
        "dica": "Invita a alguien. La actividad en compañía tiene muchas más posibilidades de ocurrir."
      },
      {
        "icone": "🍽️",
        "numero": "03",
        "titulo": "Elige 1 comida libre de verdad",
        "texto": "En lugar de comer mal todo el día, elige 1 comida para comer lo que quieras con placer. Eso satisface el antojo, evita la culpa y mantiene el resto del día equilibrado. Una comida libre no deshace el proceso.",
        "dica": "Elige con anticipación cuál será la comida libre. Así anticipas el placer y no cedes a todos los impulsos del día."
      },
      {
        "icone": "💤",
        "numero": "04",
        "titulo": "Duerme bien y despierta sin castigo",
        "texto": "Aprovecha el fin de semana para dormir mejor. Y si comiste más de lo que planeaste el sábado, despierta el domingo sin castigarte. Retoma el desayuno con proteína y sigue adelante. Sin compensaciones extremas.",
        "dica": "Lo que pasa el fin de semana se queda en el fin de semana. El lunes siempre es un nuevo comienzo limpio."
      }
    ],
    "evitar": [
      "Saltarte el desayuno porque te despertaste más tarde",
      "Comer mal todo el día porque «es fin de semana»",
      "Compensar el domingo lo que comiste el sábado",
      "Pasar todo el fin de semana en el sofá sin ningún movimiento"
    ],
    "lembre": "Dos días no deshacen cinco. A menos que tú lo permitas."
  },
  {
    "id": "protocolo-09-tpm-ciclo",
    "imagem": "/materiais/protocolo-09-tpm-ciclo.jpg",
    "tag": "🌸 SPM y Ciclo · los días más difíciles del mes",
    "titulo": "Protocolo del SPM y del Ciclo",
    "descricao": "El síndrome premenstrual (SPM) no es una excusa, pero es real. Tu cuerpo cambia, tus necesidades cambian. Saberlo lo cambia todo.",
    "acontece": "En la semana del SPM el antojo de dulce se dispara, aparece la hinchazón, el ánimo cae y la motivación desaparece. Comes lo que no planeaste, sientes culpa y crees que fracasaste.",
    "solucao": "El SPM tiene causas hormonales reales. Combatirlo con los alimentos y las acciones correctas reduce los síntomas y protege el proceso de pérdida de peso.",
    "frase": "Hay fases del ciclo en las que el hambre aumenta, aparece la hinchazón y el antojo de dulce se vuelve más intenso. Eso no es falta de fuerza de voluntad. Es parte del proceso.",
    "passos": [
      {
        "icone": "🍫",
        "numero": "01",
        "titulo": "El antojo de dulce tiene una causa",
        "texto": "La caída de progesterona antes de la menstruación reduce la serotonina, lo que genera un antojo intenso de carbohidratos y dulces. En lugar de resistir y luego ceder de forma exagerada, satisfácelo con calidad: chocolate 70% cacao, dátil, fruta con mantequilla de maní.",
        "dica": "2 cuadritos de chocolate amargo con una nuez resuelven el antojo de dulce sin disparar la insulina."
      },
      {
        "icone": "🧂",
        "numero": "02",
        "titulo": "Reduce el sodio para desinflamar",
        "texto": "La hinchazón del SPM es causada por una retención de líquidos mediada por hormonas. Reducir la sal, los embutidos y los ultraprocesados en los días previos a la menstruación ya reduce visiblemente la hinchazón. Aumenta el agua.",
        "dica": "El té de diente de león o de flor de Jamaica (hibisco) tiene un efecto diurético natural y ayuda a eliminar el líquido retenido."
      },
      {
        "icone": "🥦",
        "numero": "03",
        "titulo": "El magnesio es tu aliado",
        "texto": "El magnesio reduce los cólicos, mejora el ánimo y disminuye el antojo de dulce del SPM. Fuentes accesibles: plátano (banana), avena, frijoles, nuez de Brasil (solo 1 por día), semillas de calabaza. Prefiere la comida al suplemento.",
        "dica": "Una cucharada de semillas de calabaza en el yogur o en la ensalada ya aporta una buena dosis de magnesio."
      },
      {
        "icone": "🛁",
        "numero": "04",
        "titulo": "Ejercicio ligero, no castigo",
        "texto": "Durante el SPM y la menstruación, los entrenamientos intensos pueden empeorar los síntomas. Prefiere caminata, yoga, estiramiento, ejercicios en el agua. El movimiento ligero alivia el cólico, mejora el ánimo y no sobrecarga el cuerpo.",
        "dica": "Si no quieres hacer ejercicio, no te castigues. Una caminata de 15 minutos al aire libre ya marca la diferencia en el ánimo."
      }
    ],
    "evitar": [
      "Comer mucho dulce creyendo que así se te pasará el antojo",
      "Restringir el agua por miedo a hincharte más",
      "Hacer entrenamiento intenso durante un cólico fuerte",
      "Pesarte durante el SPM e interpretar el peso como un fracaso"
    ],
    "lembre": "El peso en la báscula en la semana del SPM no es grasa. Es líquido. Y pasa."
  },
  {
    "id": "protocolo-10-estresse-ansiedade",
    "imagem": "/materiais/protocolo-10-estresse-ansiedade.jpg",
    "tag": "😤 Estrés y Ansiedad · cuando la cabeza le estorba al cuerpo",
    "titulo": "Protocolo del Estrés",
    "descricao": "El estrés crónico es uno de los mayores bloqueadores de la pérdida de peso. No por lo que comes. Por lo que les hace a tus hormonas.",
    "acontece": "Estás estresada, comes sin hambre, comes rápido, comes lo que aparece. Después sientes que no tienes autocontrol. Pero no es debilidad. Es el cortisol controlando tus elecciones.",
    "solucao": "No vas a eliminar el estrés de tu vida. Pero sí puedes impedir que mande sobre lo que comes.",
    "frase": "Muchas veces el hambre no viene del estómago. Viene del cansancio, de la preocupación y de las ganas de sentirte mejor.",
    "passos": [
      {
        "icone": "🫁",
        "numero": "01",
        "titulo": "Respira antes de comer",
        "texto": "Cuando estés ansiosa y con ganas de atacar el refrigerador, detente y respira profundo 5 veces antes. Inhala por la nariz en 4 tiempos, exhala por la boca en 6 tiempos. Eso activa el sistema nervioso parasimpático y reduce el cortisol en segundos.",
        "dica": "El simple hecho de detenerte 1 minuto antes de comer cambia por completo la calidad de la elección que viene después."
      },
      {
        "icone": "🚶",
        "numero": "02",
        "titulo": "El movimiento como válvula de escape",
        "texto": "Cuando llegue el estrés, cambia el refrigerador por una caminata de 10 minutos. El ejercicio consume el cortisol que estaba circulando y libera endorfinas en su lugar. Vuelves tranquila y con las ideas más claras.",
        "dica": "Sal de casa aunque sea solo a la acera. Cambiar de ambiente cambia el estado mental."
      },
      {
        "icone": "🍵",
        "numero": "03",
        "titulo": "Reemplaza el picoteo ansioso",
        "texto": "Si en el estrés la mano se va sola hacia la comida, ten una alternativa lista: té tibio, agua con limón, una nuez. Ocupar la mano y la boca con algo neutro rompe el ciclo automático sin generar culpa.",
        "dica": "Los tés de manzanilla, toronjil o maracuyá tienen una acción ansiolítica comprobada. Tenlos en casa."
      },
      {
        "icone": "📋",
        "numero": "04",
        "titulo": "Identifica el detonante, no la comida",
        "texto": "Cada vez que comas por estrés, anota: ¿qué pasó antes? ¿Qué sentimiento apareció? ¿La comida fue la respuesta a qué situación? Entender el detonante es más poderoso que cualquier dieta.",
        "dica": "No necesitas un terapeuta para hacerlo. Una libretita en el bolsillo ya lo resuelve."
      }
    ],
    "evitar": [
      "Usar la comida como recompensa por un día difícil",
      "Comer frente a la computadora o durante las reuniones",
      "Comprar snacks ultraprocesados como «reserva de emergencia»",
      "Ignorar el estrés esperando que pase solo"
    ],
    "lembre": "No te falta autocontrol. Tienes el cortisol alto. Son cosas distintas."
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
