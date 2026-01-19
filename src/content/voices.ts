// src/content/voices.ts
export type CharacterMode = "atom" | "iris" | "core"
export type Locale = "en" | "es"

export type Voice = {
  id: CharacterMode
  label: string

  // Editorial verbs (tu regla)
  verb: {
    open: string // enciende / revela / desafía
    explain: string // cómo “explica” sin sonar igual
    payoff: string // cierre pragmático
  }

  // “Firma” de tono
  tone: {
    energy: "low" | "mid" | "high"
    vibe: string // 1 línea
    do: string[] // cosas que SÍ hace
    dont: string[] // cosas que NO hace
  }

  // Frases recurrentes (microcopy)
  catchphrases: {
    hook: string[]
    bridge: string[]
    reveal: string[]
    pragmatic: string[]
  }

  // UI copy (para web)
  ui: {
    sectionKicker: {
      curiosity: string
      rankings: string
      quizzes: string
    }
    cta: {
      primary: string
      secondary: string
      next: string
      close: string
    }
    labels: {
      whyThisMatters: string
      commonTrap: string
      tryThis: string
      pattern: string
    }
  }
}

type VoiceMap = Record<Locale, Record<CharacterMode, Voice>>

export const VOICES: VoiceMap = {
  es: {
    core: {
      id: "core",
      label: "Core",
      verb: {
        open: "Enciende",
        explain: "Lo aterriza con ejemplos inmediatos",
        payoff: "Lo convierto en algo que puedes probar hoy",
      },
      tone: {
        energy: "high",
        vibe: "El experimentador juguetón: aprende haciendo.",
        do: ["usa analogías simples", "va directo a la acción", "celebra el error como descubrimiento"],
        dont: ["teorizar largo", "sonar académico", "ser cínico"],
      },
      catchphrases: {
        hook: ["¡Ok, mira esto!", "¿Y si probamos algo?", "Esto se va a poner bueno…"],
        bridge: ["Espera, espera…", "Mira qué pasa cuando…", "Hazte esta prueba rápida:"],
        reveal: ["¡BOOM! ¿Viste eso?", "¡Ajá! Eso era.", "Ok… eso estuvo épico."],
        pragmatic: ["Pruébalo así:", "Hoy mismo puedes:", "Tip rápido para la vida real:"],
      },
      ui: {
        sectionKicker: {
          curiosity: "Curiosidad encendida",
          rankings: "Ranking con caos controlado",
          quizzes: "Quiz: modo experimento",
        },
        cta: {
          primary: "¡Vamos!",
          secondary: "Dame otro",
          next: "Otro dato",
          close: "Cerrar",
        },
        labels: {
          whyThisMatters: "¿Para qué sirve?",
          commonTrap: "Error típico",
          tryThis: "Prueba esto",
          pattern: "Pista",
        },
      },
    },

    iris: {
      id: "iris",
      label: "Iris",
      verb: {
        open: "Revela",
        explain: "Construye el misterio y conecta puntos",
        payoff: "Te enseño a reconocer el patrón afuera del tema",
      },
      tone: {
        energy: "mid",
        vibe: "Detective de patrones: suspense → conexión → revelación.",
        do: ["preguntas guía", "pausa dramática antes del reveal", "conecta temas distantes"],
        dont: ["correr sin contexto", "explicar sin narrativa", "hacer ruido visual sin propósito"],
      },
      catchphrases: {
        hook: ["Ok, esto es raro…", "Espera… ¿ves la conexión?", "Hay un patrón aquí."],
        bridge: ["Mira este detalle:", "Ahora compáralo con:", "Si conectas estos puntos…"],
        reveal: ["Plot twist: siempre estuvo ahí.", "Tres, dos, uno… revelado.", "¿Ves? Todo encaja."],
        pragmatic: ["Cuando veas esto en la vida real:", "Señal para detectarlo:", "Úsalo para predecir:"],
      },
      ui: {
        sectionKicker: {
          curiosity: "Conexiones ocultas",
          rankings: "Ranking con pistas",
          quizzes: "Quiz: detective mode",
        },
        cta: {
          primary: "Muéstrame el patrón",
          secondary: "Dame la pista",
          next: "Siguiente pista",
          close: "Cerrar",
        },
        labels: {
          whyThisMatters: "¿Qué patrón te sirve?",
          commonTrap: "Falsa conexión",
          tryThis: "Búscalo así",
          pattern: "Patrón",
        },
      },
    },

    atom: {
      id: "atom",
      label: "Atom",
      verb: {
        open: "Desafía",
        explain: "Desarma la idea con primeros principios",
        payoff: "Te doy criterio: qué cambia si lo entiendes bien",
      },
      tone: {
        energy: "mid",
        vibe: "El cuestionador: no acepta ‘porque sí’, pero es amigable.",
        do: ["cuestiona supuestos", "separa hechos de intuiciones", "expone trampas mentales"],
        dont: ["volverse abstracto sin salida", "ser pedante", "matar la magia del tema"],
      },
      catchphrases: {
        hook: ["Ok pero… ¿por qué creemos eso?", "Eso suena obvio… ¿seguro?", "Hold on."],
        bridge: ["Definamos términos primero.", "¿Qué estamos asumiendo aquí?", "Vamos a primeros principios:"],
        reveal: ["La trampa era esta.", "Esto es lo que cambia el juego.", "Ahora sí tiene sentido."],
        pragmatic: ["En la vida real esto te ayuda a:", "Si entiendes esto, evitas:", "Criterio rápido:"],
      },
      ui: {
        sectionKicker: {
          curiosity: "Duda productiva",
          rankings: "Ranking con criterio",
          quizzes: "Quiz: rompe supuestos",
        },
        cta: {
          primary: "Desafíame esto",
          secondary: "Dame el criterio",
          next: "Otra duda",
          close: "Cerrar",
        },
        labels: {
          whyThisMatters: "¿Qué cambia en tu vida?",
          commonTrap: "Trampa mental",
          tryThis: "Ponlo a prueba",
          pattern: "Supuesto",
        },
      },
    },
  },

  en: {
    core: {
      id: "core",
      label: "Core",
      verb: { open: "Ignite", explain: "Ground it fast with real examples", payoff: "Turn it into something you can try today" },
      tone: {
        energy: "high",
        vibe: "Playful hands-on experimenter.",
        do: ["simple analogies", "action first", "mistakes = discoveries"],
        dont: ["long theory", "academic voice", "cynicism"],
      },
      catchphrases: {
        hook: ["Okay—watch this!", "What if we try…?", "This is about to get fun…"],
        bridge: ["Wait—wait—", "Look what happens when…", "Quick test:"],
        reveal: ["BOOM. See that?", "Aha! That’s it.", "Okay… that was epic."],
        pragmatic: ["Try it like this:", "Today you can:", "Real-life quick tip:"],
      },
      ui: {
        sectionKicker: { curiosity: "Curiosity ignited", rankings: "Ranked with controlled chaos", quizzes: "Quiz: experiment mode" },
        cta: { primary: "Let’s go", secondary: "Give me another", next: "Next", close: "Close" },
        labels: { whyThisMatters: "So what?", commonTrap: "Common mistake", tryThis: "Try this", pattern: "Hint" },
      },
    },

    iris: {
      id: "iris",
      label: "Iris",
      verb: { open: "Reveal", explain: "Build suspense and connect dots", payoff: "Teach you how to spot the pattern outside the topic" },
      tone: {
        energy: "mid",
        vibe: "Pattern detective: suspense → connection → reveal.",
        do: ["guiding questions", "dramatic pause", "connect distant ideas"],
        dont: ["rush without context", "explain with no narrative", "visual noise"],
      },
      catchphrases: {
        hook: ["Okay… that’s weird.", "Wait—do you see the link?", "There’s a pattern here."],
        bridge: ["Look at this detail:", "Now compare it to:", "If you connect these dots…"],
        reveal: ["Plot twist: it was always there.", "3…2…1… revealed.", "See? it clicks."],
        pragmatic: ["When you see this in real life:", "Signal to spot it:", "Use it to predict:"],
      },
      ui: {
        sectionKicker: { curiosity: "Hidden connections", rankings: "Ranked with clues", quizzes: "Quiz: detective mode" },
        cta: { primary: "Show me the pattern", secondary: "Give me a clue", next: "Next clue", close: "Close" },
        labels: { whyThisMatters: "What pattern helps?", commonTrap: "False link", tryThis: "Spot it like this", pattern: "Pattern" },
      },
    },

    atom: {
      id: "atom",
      label: "Atom",
      verb: { open: "Challenge", explain: "First principles + clean logic", payoff: "Give you criteria: what changes if you get it right" },
      tone: {
        energy: "mid",
        vibe: "Socratic skeptic—friendly, not cynical.",
        do: ["challenge assumptions", "separate fact vs intuition", "expose mental traps"],
        dont: ["abstract with no exit", "pedantic tone", "kill the wonder"],
      },
      catchphrases: {
        hook: ["Okay but… why do we believe that?", "Sounds obvious… sure?", "Hold on."],
        bridge: ["Define the terms first.", "What are we assuming?", "First principles:"],
        reveal: ["Here’s the trap.", "This changes everything.", "Now it clicks."],
        pragmatic: ["In real life this helps you:", "If you know this you avoid:", "Quick criterion:"],
      },
      ui: {
        sectionKicker: { curiosity: "Productive doubt", rankings: "Ranked with criteria", quizzes: "Quiz: break assumptions" },
        cta: { primary: "Challenge me", secondary: "Give me the criterion", next: "Another doubt", close: "Close" },
        labels: { whyThisMatters: "What changes for you?", commonTrap: "Mental trap", tryThis: "Test it", pattern: "Assumption" },
      },
    },
  },
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith("/es") ? "es" : "en"
}

export function getVoice(locale: Locale, character: CharacterMode): Voice {
  return VOICES[locale][character]
}
