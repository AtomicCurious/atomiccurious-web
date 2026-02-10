export type CharacterMode = "atom" | "iris" | "core"

export type SectionKey =
  | "startHere"
  | "posts"
  | "about"
  | "newsletter"
  | "resources"
  | "community"
  | "contact"
  | "home"

type VoicePack = {
  label: string
  tagline: string
  styleHints: string[]
  sections: Record<
    SectionKey,
    {
      title?: string
      intro: string
      cta?: string
    }
  >
}

export const voices: Record<CharacterMode, VoicePack> = {
  atom: {
    label: "Atom",
    tagline: "Crisp. Técnico. Directo.",
    styleHints: ["claridad", "precisión", "estructura", "pasos"],
    sections: {
      home: { intro: "Exploraciones rápidas, datos limpios y curiosidad con método.", cta: "Empezar" },
      startHere: { intro: "Te pongo el mapa: qué ver primero, por qué, y cómo avanzar sin perderte.", cta: "Dame el camino" },
      posts: { intro: "Ideas destiladas: lectura clara, conceptos fuertes, cero relleno.", cta: "Ver posts" },
      about: { intro: "Lo que construimos aquí: ciencia, cultura y futuro con narrativa y diseño.", cta: "Conocer más" },
      newsletter: { intro: "Una dosis semanal: lo mejor, lo raro, lo útil. Sin spam.", cta: "Suscribirme" },
      resources: { intro: "Herramientas, plantillas y recursos listos para usar.", cta: "Abrir recursos" },
      community: { intro: "Comunidad para aprender, crear y compartir hallazgos.", cta: "Unirme" },
      contact: { intro: "¿Colab? ¿Idea? ¿Feedback? Escríbeme.", cta: "Contactar" },
    },
  },

  iris: {
    label: "Iris",
    tagline: "Elegante. Humana. Cinemática.",
    styleHints: ["emocional", "metáforas", "ritmo", "sensación premium"],
    sections: {
      home: { intro: "Aquí venimos a sentir la curiosidad: un viaje breve, hermoso y honesto.", cta: "Acompáñame" },
      startHere: { intro: "Si es tu primera vez, te guío con calma: lo esencial primero, lo mágico después.", cta: "Guíame" },
      posts: { intro: "Historias e ideas: para leer lento, pensar profundo, y salir distinto.", cta: "Explorar" },
      about: { intro: "La intención detrás de AtomicCurious: aprender sin perder el asombro.", cta: "Ver la historia" },
      newsletter: { intro: "Cartas cortas con brillo: descubrimientos, preguntas y pequeñas revelaciones.", cta: "Recibir cartas" },
      resources: { intro: "Recursos con estética y utilidad: elegantes, claros, listos.", cta: "Quiero recursos" },
      community: { intro: "Un lugar bonito para pensar en voz alta con gente curiosa.", cta: "Entrar" },
      contact: { intro: "Si algo te movió, dilo. Si algo te sirve, compártelo.", cta: "Escribir" },
    },
  },

  core: {
    label: "Core",
    tagline: "Cósmico. Preciso. Extraño (en el buen sentido).",
    styleHints: ["misterio", "pulsos", "curiosidades", "voz AI/galáctica"],
    sections: {
      home: { intro: "Señal detectada. Curiosidad lista. ¿Abrimos una grieta en lo obvio?", cta: "Iniciar" },
      startHere: { intro: "Protocolo de entrada: elige ruta y sincroniza tu curiosidad.", cta: "Sincronizar" },
      posts: { intro: "Archivos de anomalías: ideas que no encajan… hasta que encajan.", cta: "Abrir archivo" },
      about: { intro: "Origen: una narrativa para explorar lo humano desde el borde de lo posible.", cta: "Ver origen" },
      newsletter: { intro: "Transmisión semanal: señales, patrones, hallazgos.", cta: "Recibir señal" },
      resources: { intro: "Módulos útiles: plantillas, mapas, herramientas.", cta: "Descargar módulos" },
      community: { intro: "Red activa: comparte descubrimientos, teorías y pruebas.", cta: "Conectar" },
      contact: { intro: "Canal abierto. Envía mensaje.", cta: "Transmitir" },
    },
  },
}
