export type PostFormat = "curiosity" | "ranked" | "quiz"

export type AffiliateItem = {
  name: string
  href: string
  tag?: string
  cta?: string
  description?: string
}

export type PostListItem = {
  slug: string
  title: string
  description: string
  date: Date
  format: PostFormat
  tag?: string
  readingTime?: number

  bullets?: string[]
  featured?: boolean

  affiliateItems?: AffiliateItem[]

  id: string
}

export const postsEs: PostListItem[] = [
  {
    slug: "por-que-8-hrs",
    id: "ac-001",
    title: "Por qué trabajamos 8 horas al día",
    description:
      "El origen real de la jornada laboral de 8 horas y por qué no fue diseñada para el tipo de trabajo que haces hoy.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-05-13T17:00:00-04:00"),

    format: "curiosity",
    tag: "Trabajo / Productividad",
    readingTime: 7,
    bullets: [
      "El origen real de las 8 horas",
      "Por qué tu cerebro no funciona así",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Deep Work — Cal Newport",
        href: "https://amzn.to/3OGP110",
        tag: "Libro",
        description:
          "Explora cómo la concentración profunda se volvió una ventaja escasa en la economía moderna.",
      },
      {
        name: "Rize",
        href: "https://rize.io",
        tag: "Herramienta",
        cta: "Explorar herramienta →",
        description:
          "Herramienta para visualizar tiempo de enfoque, distracciones y patrones reales de trabajo en tiempo real.",
      },
      {
        name: "Four Thousand Weeks — Oliver Burkeman",
        href: "https://amzn.to/48vWyq8",
        tag: "Libro",
        description:
          "Una reflexión sobre tiempo, productividad y los límites reales de la vida humana.",
      },
    ],
  },

  {
    slug: "habitos-con-respaldo-cientifico",
    id: "ac-002",
    title: "Top 7 hábitos más respaldados por la ciencia",
    description:
      "La mayoría de rankings de hábitos mezclan impacto científico con facilidad de implementación como si fueran lo mismo. No lo son.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-05-20T17:00:00-04:00"),

    format: "ranked",
    tag: "Salud / Hábitos",
    readingTime: 10,
    bullets: [
      "Dos criterios. Dos ganadores.",
      "Por qué el hábito #1 depende de cómo lo midas",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Why We Sleep — Matthew Walker",
        href: "https://amzn.to/4tCpg05",
        tag: "Libro",
        description:
          "Una exploración profunda sobre cómo el sueño afecta memoria, energía, salud y rendimiento cognitivo.",
      },
      {
        name: "The Circadian Code — Satchin Panda",
        href: "https://amzn.to/3PlbmBs",
        tag: "Libro",
        description:
          "Una guía clara sobre cómo los ritmos circadianos influyen en sueño, energía, metabolismo y salud diaria.",
      },
      {
        name: "Rise Science",
        href: "https://www.risescience.com",
        tag: "App",
        cta: "Explorar herramienta →",
        description:
          "Herramienta para explorar métricas de sueño, deuda de descanso, energía diaria y ritmos circadianos.",
      },
    ],
  },

  {
    slug: "la-cadena-del-wtf-flamencos",
    id: "ac-003",
    title:
      "La Cadena del WTF: cómo un flamenco rosado está conectado con tu próxima respiración",
    description:
      "Los flamencos no nacen rosados. Los camarones tampoco. Y esa cadena termina en el oxígeno que respiras.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-05-27T17:00:00-04:00"),

    format: "quiz",
    tag: "Ciencia / Sistemas",
    readingTime: 9,
    bullets: [
      "Los flamencos no nacen rosados",
      "La cadena invisible que llega hasta tu respiración",
    ],
    featured: true,

    affiliateItems: [
      {
        name: "Entangled Life — Merlin Sheldrake",
        href: "https://amzn.to/48ZOMVz",
        tag: "Libro",
        description:
          "Explora cómo redes invisibles de hongos conectan ecosistemas completos bajo la superficie.",
      },
      {
        name: "Carson MicroBrite Plus",
        href: "https://amzn.to/4dFZXW4",
        tag: "Herramienta",
        description:
          "Un microscopio de bolsillo para explorar texturas, organismos y detalles invisibles del mundo cotidiano.",
      },
      {
        name: "iNaturalist",
        href: "https://www.inaturalist.org",
        tag: "App",
        cta: "Explorar herramienta →",
        description:
          "Herramienta para identificar especies y convertir tu curiosidad en observaciones que contribuyen a la ciencia.",
      },
    ],
  },

  {
    slug: "por-que-enamorarte-te-vuelve-mas-tonto",
    id: "ac-004",
    title: "Por qué enamorarte afecta temporalmente tu juicio",
    description:
      "El amor romántico puede cambiar temporalmente tu pensamiento crítico, percepción del riesgo y toma de decisiones más de lo que imaginas.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-06-03T17:00:00-04:00"),

    format: "curiosity",
    tag: "Psicología / Neurociencia",
    readingTime: 8,

    bullets: [
      "Qué hace realmente el amor en tu cerebro",
      "Por qué enamorarte cambia tu pensamiento crítico",
    ],

    featured: false,

    affiliateItems: [
      {
        name: "Why We Love — Helen Fisher",
        href: "https://amzn.to/4nM7YfS",
        tag: "Libro",
        description:
          "La investigadora que ayudó a mapear el cerebro enamorado. Una exploración de la neurociencia y química del amor romántico.",
      },

      {
        name: "Attached — Amir Levine",
        href: "https://amzn.to/3RR4D2S",
        tag: "Libro",
        description:
          "Cómo los estilos de apego moldean vínculos, decisiones emocionales y la forma en que experimentamos las relaciones.",
      },

      {
        name: "Emotional Intelligence — Daniel Goleman",
        href: "https://amzn.to/4ujnFxf",
        tag: "Libro",
        description:
          "Por qué las emociones influyen en pensamiento, conducta y toma de decisiones mucho más de lo que solemos asumir.",
      },
    ],
  },

  {
    slug: "leer-vs-audiolibros-que-retiene-mas",
    id: "ac-005",
    title: "Leer vs escuchar: qué retiene realmente más información",
    description:
      "¿Tu cerebro aprende igual leyendo que escuchando? La respuesta es más compleja de lo que parece.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-06-10T17:00:00-04:00"),

    format: "ranked",
    tag: "Aprendizaje / Neurociencia",
    readingTime: 8,
    bullets: [
      "Cómo procesa información tu cerebro",
      "Qué método recuerda más y por qué",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Make It Stick — Peter C. Brown",
        href: "https://amzn.to/3Ql8UeG",
        tag: "Libro",
        description:
          "Un libro basado en ciencia cognitiva sobre memoria, aprendizaje y retención. Ideal para entender por qué recordar depende de la atención y la recuperación activa.",
      },
      {
        name: "Stolen Focus — Johann Hari",
        href: "https://amzn.to/4uT3SoG",
        tag: "Libro / Audiolibro",
        description:
          "Un gran complemento para el lado auditivo del tema. Explora la atención, la distracción y por qué el enfoque profundo importa cuando quieres que la información realmente se quede.",
      },
      {
        name: "Readwise Reader",
        href: "https://readwise.io/read",
        tag: "App",
        cta: "Explorar herramienta →",
        description:
          "Una app para guardar artículos, newsletters, PDFs, EPUBs y subrayados en un solo lugar, con lectura limpia y text-to-speech.",
      },
    ],
  },

  {
    slug: "tu-cerebro-vs-la-realidad-paris-en-la-la-primavera",
    id: "ac-006",
    title:
      "Tu cerebro vs la realidad: ¿puedes leer “PARIS EN LA LA PRIMAVERA” sin fallar?",
    description:
      "Tu cerebro no ve la realidad exactamente como crees. Completa, omite y reconstruye información constantemente.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-06-17T17:00:00-04:00"),

    format: "quiz",
    tag: "Cognición / Percepción",
    readingTime: 7,
    bullets: [
      "Por qué tu cerebro ignora errores obvios",
      "Cómo la percepción reconstruye la realidad",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Artículo: El cerebro predictivo",
        href: "https://www.quantamagazine.org/to-be-energy-efficient-brains-predict-their-perceptions-20211115/",
        tag:  "Lectura gratis",
        description:
          "Un artículo de Quanta Magazine sobre cómo el cerebro puede predecir la percepción en lugar de procesar cada detalle desde cero.",
      },
      {
        name: "The Invisible Gorilla — Christopher Chabris & Daniel Simons",
        href: "https://amzn.to/4xpJDRq",
        tag:  "Mejor punto de inicio",
        cta: "Ver libro →",
        description:
          "La mejor lectura para continuar con la parte de atención de este episodio. Un libro accesible sobre por qué nos perdemos más cosas de las que creemos.",
      },
      {
        name: "The Brain: The Story of You — David Eagleman",
        href: "https://amzn.to/4egC1YH",
        tag:  "Mejor introducción",
        cta:  "Ver libro →",
        description:
          "Una introducción clara y accesible a cómo el cerebro da forma a la percepción, la memoria, la identidad y la experiencia.",
      },
    ],
  },

  {
    slug: "por-que-la-ia-ya-toma-decisiones-por-ti",
    id: "ac-007",
    title:
      "La IA no entiende nada… entonces ¿por qué ya toma decisiones por ti?",
    description:
      "Los sistemas de IA no piensan como humanos, pero ya influyen en trabajo, información y decisiones cotidianas.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-06-24T17:00:00-04:00"),

    format: "curiosity",
    tag: "IA / Tecnología",
    readingTime: 10,
    bullets: [
      "Por qué la IA no “entiende” realmente",
      "Cómo aun así termina controlando decisiones",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Filterworld: How Algorithms Flattened Culture",
        href: "https://amzn.to/4w2Q8rU",
        tag: "Libro",
        cta: "Leer el libro →",
        description:
          "Un libro moderno y accesible sobre cómo los algoritmos moldean lo que vemos, escuchamos, nos gusta y descubrimos en internet.",
      },
      {
        name: "The Chaos Machine",
        href: "https://amzn.to/3SQGyK0",
        tag: "Libro",
        cta: "Leer el libro →",
        description:
          "Una mirada atrapante a cómo los sistemas de redes sociales pueden amplificar emociones, conflicto, indignación y atención.",
      },
      {
        name: "Amazon Kindle Paperwhite 16 GB",
        href: "https://amzn.to/4uFBghP",
        tag: "Tecnología",
        cta: "Explorar Kindle →",
        description:
          "Una forma simple de leer ideas más largas sin que tu feed compita por tu atención cada pocos segundos.",
      },
    ],
  },

  {
    slug: "las-7-formas-de-aprender-mas-eficientes",
    id: "ac-008",
    title: "Las 7 formas de aprender — ordenadas por lo que realmente funciona",
    description:
      "No todas las técnicas de aprendizaje funcionan igual. Algunas desperdician tiempo y otras cambian completamente la retención.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-07-01T17:00:00-04:00"),

    format: "ranked",
    tag: "Aprendizaje / Ciencia",
    readingTime: 10,
    bullets: [
      "Qué métodos tienen más respaldo científico",
      "Por qué releer suele funcionar peor",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Make It Stick",
        href: "https://amzn.to/4xCeqdx",
        tag: "Libro",
        cta: "Leer el libro →",
        description:
          "Uno de los mejores libros para entender por qué la recuperación activa, el espaciado y los métodos de estudio más difíciles suelen producir un aprendizaje más duradero.",
      },
      {
        name: "Readwise Reader",
        href: "https://readwise.io/read",
        tag: "Herramienta",
        cta: "Explorar Reader →",
        description:
          "Una herramienta para leer con más intención, guardar ideas importantes y volver a revisar tus subrayados en vez de dejarlos olvidados después de una sola lectura.",
      },
      {
        name: "Anki",
        href: "https://apps.ankiweb.net/",
        tag: "Herramienta",
        cta: "Explorar Anki →",
        description:
          "Una herramienta de repetición espaciada para practicar recuperación activa en lugar de releer el mismo material una y otra vez de forma pasiva.",
      },
    ],
  },

  {
    slug: "test-de-asociacion-que-tienen-en-comun",
    id: "ac-009",
    title:
      "¿Qué tienen en común estas imágenes? El test que revela cómo conecta patrones tu cerebro",
    description:
      "Tu cerebro detecta relaciones incluso cuando no eres consciente de ello. Este quiz pone ese sistema a prueba.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-07-08T17:00:00-04:00"),

    format: "quiz",
    tag: "Psicología / Patrones",
    readingTime: 6,
    bullets: [
      "Cómo tu cerebro conecta patrones",
      "Por qué algunas asociaciones parecen instantáneas",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Lateral Thinking",
        href: "https://amzn.to/4ezFNwj",
        tag: "Libro",
        cta: "Leer el libro →",
        description:
          "Una guía clásica para romper patrones habituales, cambiar de perspectiva y encontrar alternativas que el pensamiento convencional suele pasar por alto.",
      },
      {
        name: "A Whack on the Side of the Head",
        href: "https://amzn.to/4w459tu",
        tag: "Libro",
        cta: "Leer el libro →",
        description:
          "Una guía accesible y entretenida, llena de ejercicios, acertijos y ejemplos para superar bloqueos creativos y descubrir nuevas formas de pensar.",
      },
      {
        name: "PuzzGrid",
        href: "https://puzzgrid.com/",
        tag: "Herramienta gratuita",
        cta: "Probar PuzzGrid →",
        description:
          "Una herramienta gratuita para resolver y crear retos de conexiones, ideal para practicar el mismo tipo de reconocimiento de patrones y pensamiento lateral que explora este post.",
      },
    ],
  },

  {
    slug: "por-que-la-musica-es-un-lenguaje-universal",
    id: "ac-010",
    title: "¿Por qué la música funciona incluso sin traducción?",
    description:
      "La música activa sistemas cerebrales profundamente humanos incluso cuando no entiendes la letra.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-07-15T17:00:00-04:00"),

    format: "curiosity",
    tag: "Música / Neurociencia",
    readingTime: 8,
    bullets: [
      "Por qué la música trasciende idiomas",
      "Qué ocurre en tu cerebro al escucharla",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Tu cerebro y la música",
        href: "https://amzn.to/3SRgbni",
        tag: "Libro",
        cta: "Ver el libro →",
        description:
          "Una introducción accesible a cómo el cerebro procesa el ritmo, la melodía, la emoción, la memoria y el placer que produce la música.",
      },
      {
        name: "Musicofilia",
        href: "https://amzn.to/4oGKYza",
        tag: "Libro",
        cta: "Ver el libro →",
        description:
          "Oliver Sacks explora casos reales que muestran cómo la música se relaciona con la memoria, la identidad, el movimiento y distintos trastornos neurológicos.",
      },
      {
        name: "The Music Lab — Historia natural de la canción",
        href: "https://www.themusiclab.org/nhs",
        tag: "Recurso gratuito",
        cta: "Explorar el proyecto →",
        description:
          "Explora grabaciones, datos y experimentos del proyecto científico que estudia canciones procedentes de sociedades de todo el mundo.",
      },
    ],
  },

  {
    slug: "las-5-decisiones-financieras-mas-importantes",
    id: "ac-011",
    title: "Las 5 decisiones financieras que más cambian tu vida",
    description:
      "Las mayores diferencias financieras en la vida rara vez vienen de pequeños gastos diarios.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-07-22T17:00:00-04:00"),

    format: "ranked",
    tag: "Finanzas / Decisiones",
    readingTime: 9,
    bullets: [
      "Qué decisiones impactan más tu futuro financiero",
      "Por qué algunas importan mucho más que ahorrar café",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Money for Couples",
        href: "https://amzn.to/4xDpjMt",
        tag: "Libro",
        cta: "Leer el libro →",
        description:
          "La decisión número uno, convertida en libro. Una guía práctica para hablar sobre deudas, gastos y objetivos compartidos sin que cada conversación sobre dinero termine en una pelea.",
      },
      {
        name: "The Psychology of Money",
        href: "https://amzn.to/3SUnCtT",
        tag: "Libro",
        cta: "Leer el libro →",
        description:
          "Por qué el comportamiento importa tanto como los números. Una mirada accesible, basada en historias, a cómo la paciencia, el riesgo y las experiencias personales influyen en nuestras decisiones financieras.", 
      },
      {
        name: "Calculator.net Interest Calculator",
        href: "https://www.calculator.net/interest-calculator.html",
        tag: "Herramienta gratuita",
        cta: "Probar la calculadora →",
        description:
          "Mira la decisión número cuatro en la práctica.Cambia la cantidad, la aportación mensual, el rendimiento y el plazo para descubrir cuánto puede influir comenzar antes.",
      },
    ],
  },

  {
    slug: "imagen-real-o-hecha-por-ia",
    id: "ac-012",
    title: "¿Humano o IA? El momento en que dejamos de distinguirlos",
    description:
      "Las imágenes generadas por IA ya están cruzando el punto donde la mayoría deja de notar la diferencia.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-07-29T17:00:00-04:00"),

    format: "quiz",
    tag: "IA / Percepción",
    readingTime: 7,
    bullets: [
      "Qué hace detectable una imagen falsa",
      "Por qué cada vez es más difícil distinguirlas",
    ],
    featured: false,

affiliateItems: [
  {
    name: "FAIK",
    href: "https://amzn.to/43KdlTz",
    tag: "Libro",
    cta: "Ver el libro →",
    description:
      "Una guía actual, práctica y accesible para comprender los deepfakes, las estafas impulsadas por IA y los engaños digitales, sin necesidad de conocimientos técnicos.",
  },
  {
    name: "Verified",
    href: "https://amzn.to/4eGF38F",
    tag: "Libro",
    cta: "Ver el libro →",
    description:
      "Una guía clara para comprobar afirmaciones en línea, rastrear las fuentes originales y tomar mejores decisiones sobre qué creer y compartir.",
  },
  {
    name: "TinEye",
    href: "https://tineye.com/",
    tag: "Herramienta gratuita",
    cta: "Buscar una imagen →",
    description:
      "Una herramienta gratuita de búsqueda inversa para encontrar dónde ha aparecido una imagen en línea, localizar versiones anteriores y descubrir fotografías reales reutilizadas con un contexto falso.",
  },
],

  },

  {
    slug: "por-que-el-entretenimiento-moderno-evita-el-aburrimiento",
    id: "ac-013",
    title: "El entretenimiento moderno fue diseñado para no soltarte",
    description:
      "Las plataformas modernas compiten por algo más profundo que tu atención: tu capacidad de aburrirte.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-08-05T17:00:00-04:00"),

    format: "curiosity",
    tag: "Tecnología / Psicología",
    readingTime: 9,
    bullets: [
      "Cómo las plataformas optimizan retención",
      "Por qué aburrirse se volvió raro",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "El valor de la atención",
        href: "https://amzn.to/4f1oip5",
        tag: "Libro",
        cta: "Leer el libro →",
        description:
          "Una investigación narrativa y accesible sobre las fuerzas personales, sociales y tecnológicas que están afectando nuestra capacidad para prestar atención.",
      },
      {
        name: "one sec",
        href: "https://one-sec.app/es/",
        tag: "Herramienta",
        cta: "Probar one sec →",
        description:
          "Una herramienta que introduce una breve pausa antes de abrir aplicaciones que suelen distraerte, ayudándote a interrumpir hábitos automáticos y decidir si realmente quieres continuar.",
      },
      {
        name: "Despertador digital DreamSky",
        href: "https://amzn.to/4aeTtvt",
        tag: "Dispositivo",
        cta: "Ver el despertador →",
        description:
          "Una alternativa sencilla para dejar de usar el teléfono como alarma y mantener la pantalla fuera del dormitorio durante la noche.",
      },
    ],
  },

  {
    slug: "las-7-cosas-inutiles-que-te-enseno-la-escuela",
    id: "ac-014",
    title: "Las 7 cosas que aprendiste en la escuela… y casi nunca usas",
    description:
      "La escuela enseña muchísimas cosas útiles. Pero también dedica años completos a habilidades que rara vez vuelves a usar.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-08-12T17:00:00-04:00"),

    format: "ranked",
    tag: "Educación / Sociedad",
    readingTime: 9,
    bullets: [
      "Qué conocimientos terminan olvidándose",
      "Por qué el sistema educativo prioriza ciertas habilidades",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "¿Por qué a los estudiantes no les gusta la escuela?",
        href: "https://amzn.to/4uNcvk1",
        tag: "Libro",
        cta: "Leer el libro →",
        description:
          "Una explicación clara y basada en evidencia sobre cómo la memoria, el conocimiento, la atención y la curiosidad influyen en el aprendizaje.",
      },
      {
        name: "¿Cómo aprendemos?",
        href: "https://amzn.to/3QXshuz",
        tag: "Libro",
        cta: "Leer el libro →",
        description:
          "Stanislas Dehaene explora la atención, la participación activa, la retroalimentación ante el error y la consolidación: cuatro bases del aprendizaje duradero.",
      },
      {
        name: "The Learning Scientists",
        href: "https://www.learningscientists.org/",
        tag: "Recurso gratuito",
        cta: "Explorar las estrategias →",
        description:
          "Guías gratuitas basadas en investigación para aplicar recuperación activa, espaciado, intercalado, elaboración, ejemplos concretos y codificación dual.",
      },
    ],
  },

  {
    slug: "cuantos-corazones-tiene-un-pulpo",
    id: "ac-015",
    title: "¿Cuántos corazones tiene un pulpo? El quiz que casi todos fallan",
    description:
      "Los pulpos parecen criaturas alienígenas por una razón: gran parte de su biología rompe intuiciones humanas.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-08-19T17:00:00-04:00"),

    format: "quiz",
    tag: "Biología / Quiz",
    readingTime: 6,
    bullets: [
      "Por qué los pulpos son tan extraños",
      "El sistema biológico que casi nadie conoce",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Libro relacionado pendiente",
        href: "https://example.com",
        tag: "Libro",
        description:
          "Recurso pendiente para explorar pulpos, biología marina e inteligencia animal.",
      },
      {
        name: "Herramienta relacionada pendiente",
        href: "https://example.com",
        tag: "Herramienta",
        cta: "Explorar herramienta →",
        description:
          "Herramienta pendiente para explorar especies marinas, biodiversidad o aprendizaje visual de biología.",
      },
      {
        name: "Recurso adicional pendiente",
        href: "https://example.com",
        tag: "Recurso",
        description:
          "Recurso complementario pendiente para profundizar en anatomía, evolución y comportamiento animal.",
      },
    ],
  },

  {
    slug: "por-que-cada-generacion-critica-a-la-anterior",
    id: "ac-016",
    title:
      "¿Por qué todas las generaciones creen que la siguiente está arruinada?",
    description:
      "Cada generación piensa que la siguiente perdió valores, disciplina o inteligencia. Y esto lleva siglos ocurriendo.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-08-26T17:00:00-04:00"),

    format: "curiosity",
    tag: "Sociedad / Psicología",
    readingTime: 8,
    bullets: [
      "Por qué este patrón se repite históricamente",
      "Cómo la nostalgia distorsiona percepción",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Libro relacionado pendiente",
        href: "https://example.com",
        tag: "Libro",
        description:
          "Recurso pendiente para explorar generaciones, nostalgia, cambio social y percepción histórica.",
      },
      {
        name: "Herramienta relacionada pendiente",
        href: "https://example.com",
        tag: "Herramienta",
        cta: "Explorar herramienta →",
        description:
          "Herramienta pendiente para comparar datos generacionales, historia cultural o cambios sociales.",
      },
      {
        name: "Recurso adicional pendiente",
        href: "https://example.com",
        tag: "Recurso",
        description:
          "Recurso complementario pendiente para entender sesgos generacionales y memoria colectiva.",
      },
    ],
  },

  {
    slug: "introvertido-vs-extrovertido-quien-tiene-ventaja",
    id: "ac-017",
    title:
      "Introvertidos vs extrovertidos: quién tiene ventaja en el mundo actual",
    description:
      "La personalidad influye mucho más de lo que parece en trabajo, relaciones y adaptación social.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-09-02T17:00:00-04:00"),

    format: "ranked",
    tag: "Psicología / Personalidad",
    readingTime: 9,
    bullets: [
      "Qué ventajas tiene cada personalidad",
      "Por qué el mundo moderno favorece ciertos rasgos",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Libro relacionado pendiente",
        href: "https://example.com",
        tag: "Libro",
        description:
          "Recurso pendiente para explorar personalidad, introversión, extroversión y adaptación social.",
      },
      {
        name: "Herramienta relacionada pendiente",
        href: "https://example.com",
        tag: "Herramienta",
        cta: "Explorar herramienta →",
        description:
          "Herramienta pendiente para explorar rasgos de personalidad, autoconocimiento o dinámicas sociales.",
      },
      {
        name: "Recurso adicional pendiente",
        href: "https://example.com",
        tag: "Recurso",
        description:
          "Recurso complementario pendiente para entender comportamiento, comunicación y diferencias individuales.",
      },
    ],
  },

  {
    slug: "adivina-la-secuencia",
    id: "ac-018",
    title: "La secuencia imposible: el patrón que tu cerebro quiere completar",
    description:
      "Tu cerebro odia dejar patrones incompletos. Y eso revela mucho sobre cómo funciona la cognición humana.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-09-09T17:00:00-04:00"),

    format: "quiz",
    tag: "Cognición / Quiz",
    readingTime: 6,
    bullets: [
      "Por qué el cerebro busca patrones constantemente",
      "Cómo funciona la predicción mental",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Libro relacionado pendiente",
        href: "https://example.com",
        tag: "Libro",
        description:
          "Recurso pendiente para explorar patrones, predicción mental y resolución de secuencias.",
      },
      {
        name: "Herramienta relacionada pendiente",
        href: "https://example.com",
        tag: "Herramienta",
        cta: "Explorar herramienta →",
        description:
          "Herramienta pendiente para practicar lógica, patrones, memoria o pensamiento analítico.",
      },
      {
        name: "Recurso adicional pendiente",
        href: "https://example.com",
        tag: "Recurso",
        description:
          "Recurso complementario pendiente para profundizar en cognición, predicción y razonamiento.",
      },
    ],
  },
]

// Filtra solo posts ya publicados (permite programación automática por fecha)
export const publishedPostsEs: PostListItem[] = postsEs.filter(
  (post) => post.date <= new Date()
)

// Ordena por fecha descendente usando solo los publicados
export const latestPostEs = [...publishedPostsEs].sort(
  (a, b) => b.date.getTime() - a.date.getTime()
)[0]