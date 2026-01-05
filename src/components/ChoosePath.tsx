import Link from "next/link"
import Image from "next/image"
import { characters } from "@/content/characters"

type Props = {
  locale: "es" | "en"
}

const copy = {
  es: {
    title: "Elige tu camino",
    subtitle: "Tres formatos distintos. Una sola curiosidad.",
    ctas: {
      curiosity: "Explorar Curiosity",
      ranked: "Explorar Ranked",
      quiz: "Explorar Quiz",
    },
    cards: {
      curiosity: {
        eyebrow: "CURIOSITY · ATOM",
        title: "Grandes preguntas y momentos “¿cómo es posible?”",
        desc: "Datos increíbles, fenómenos extraños e historias que te hacen decir: “espera… ¿qué?”",
      },
      ranked: {
        eyebrow: "RANKED · IRIS",
        title: "Rankings, comparaciones y claridad",
        desc: "Listas, rankings y marcos claros para entender temas complejos sin perderte.",
      },
      quiz: {
        eyebrow: "QUIZ · CORE",
        title: "Retos rápidos y aprendizaje interactivo",
        desc: "Quizzes y dinámicas que revelan lo que sabes—y lo que vas a disfrutar aprender después.",
      },
    },
  },
  en: {
    title: "Choose your path",
    subtitle: "Three formats. One universe.",
    ctas: {
      curiosity: "Explore Curiosity",
      ranked: "Explore Ranked",
      quiz: "Explore Quiz",
    },
    cards: {
      curiosity: {
        eyebrow: "CURIOSITY · ATOM",
        title: "Big questions & “wait… how is that possible?” moments",
        desc: "Strange phenomena, wild facts, and cinematic explainers that hook fast.",
      },
      ranked: {
        eyebrow: "RANKED · IRIS",
        title: "Rankings, comparisons & clarity",
        desc: "Lists and frameworks that give structure—the cleanest path through complexity.",
      },
      quiz: {
        eyebrow: "QUIZ · CORE",
        title: "Quick challenges & interactive learning",
        desc: "Playful quizzes that reveal what you know—and what you’ll love learning next.",
      },
    },
  },
} as const

export default function ChoosePath({ locale }: Props) {
  const t = copy[locale]

  const items = [
    {
      id: "atom",
      eyebrow: t.cards.curiosity.eyebrow,
      title: t.cards.curiosity.title,
      desc: t.cards.curiosity.desc,
      href: `/${locale}/posts?format=curiosity`,
      cta: t.ctas.curiosity,
    },
    {
      id: "iris",
      eyebrow: t.cards.ranked.eyebrow,
      title: t.cards.ranked.title,
      desc: t.cards.ranked.desc,
      href: `/${locale}/posts?format=ranked`,
      cta: t.ctas.ranked,
    },
    {
      id: "core",
      eyebrow: t.cards.quiz.eyebrow,
      title: t.cards.quiz.title,
      desc: t.cards.quiz.desc,
      href: `/${locale}/posts?format=quiz`,
      cta: t.ctas.quiz,
    },
  ] as const

  return (
    <section className="mt-14 border-t border-border pt-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-text">
          {t.title}
        </h2>
        <p className="text-muted">{t.subtitle}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const c = characters[item.id]
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft"
            >
              {/* mini header */}
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-border bg-bg/40">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover object-center"
                    sizes="56px"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wide text-muted">
                    {item.eyebrow}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text">
                    {c.name} · {c.age}
                  </p>
                </div>
              </div>

              <h3 className="mt-6 text-lg font-semibold text-text">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>

              <Link
                href={item.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent"
              >
                {item.cta} <span aria-hidden>→</span>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
