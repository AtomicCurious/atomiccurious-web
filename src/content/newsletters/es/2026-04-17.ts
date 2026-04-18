// src/content/newsletters/es/2026-04-15.ts

import type { NewsletterEdition } from "@/lib/newsletter/types"

export const newsletter: NewsletterEdition = {
  slug: "2026-04-15-es-launch",
  locale: "es",
  subject: "AtomicCurious — La señal acaba de encenderse",
  preheader: "Esto no es otro newsletter. Es el inicio de algo distinto.",
  scheduledFor: "2026-04-15T00:00:00.000Z",
  title: "Bienvenido al universo",
  intro:
    "AtomicCurious nació con una intención clara: diseñar tu curiosidad. No acumularla, no saturarla — diseñarla. Esto es lo primero que queremos que sepas sobre nosotros.",
  sections: [
    {
      title: "Por qué existimos",
      body: "Vivimos en la era del exceso de información. Hay contenido para todo, sobre todo y en todo momento — pero muy poco de él está pensado para quedarse. AtomicCurious existe para ser la excepción: un universo editorial donde cada pieza tiene intención, cada idea tiene estructura y cada pregunta merece una respuesta que valga la pena. No estamos aquí para sorprenderte. Estamos aquí para que entiendas.",
    },
    {
      title: "Cómo funciona este universo",
      body: "AtomicCurious no es un canal. Es un sistema. Tres perspectivas — diseño, claridad e impulso — que orbitan una misma pregunta: ¿cómo convertir la curiosidad en criterio propio? En cada edición de este boletín encontrarás ideas seleccionadas con cuidado, descubrimientos que vale la pena detenerse a leer y una pregunta que esperamos no te deje indiferente.",
    },
    {
      title: "Una pregunta para empezar",
      body: "¿Cuándo fue la última vez que aprendiste algo por puro gusto — sin que nadie te lo pidiera, sin un examen al final, solo porque algo dentro de ti quiso saber más? Eso es exactamente lo que queremos provocar aquí. Responde este correo si tienes una respuesta. Las leemos todas.",
    },
  ],
  cta: {
    label: "Conoce AtomicCurious",
    href: "https://atomiccurious.com/es/about",
  },
}