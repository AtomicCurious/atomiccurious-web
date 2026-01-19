import Image from "next/image"

export type Host = "atom" | "iris" | "core"
export type SpriteVariant = "presenter" | "experiment" | "callout"

type Props = {
  host: Host
  variant: SpriteVariant
  alt?: string
  size?: number
  className?: string
  priority?: boolean
}

const SPRITES: Record<Host, Record<SpriteVariant, string>> = {
  atom: {
    presenter: "/images/hosts/atom-presenter.webp",
    experiment: "/images/hosts/atom-experiment.webp",
    callout: "/images/hosts/atom-callout.webp",
  },
  iris: {
    presenter: "/images/hosts/iris-presenter.webp",
    experiment: "/images/hosts/iris-experiment.webp",
    callout: "/images/hosts/iris-callout.webp",
  },
  core: {
    presenter: "/images/hosts/core-presenter.webp",
    experiment: "/images/hosts/core-experiment.webp",
    callout: "/images/hosts/core-callout.webp",
  },
}

export default function CharacterSprite({
  host,
  variant,
  alt,
  size = 64,
  className,
  priority,
}: Props) {
  const src = SPRITES[host]?.[variant]
  const a11y = alt ?? `${host} ${variant}`

  return (
    <span
      className={[
        "relative inline-block shrink-0 rounded-full",
        "ring-1 ring-white/10 bg-white/[0.03] backdrop-blur",
        className ?? "",
      ].join(" ")}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={a11y}
        fill
        sizes={`${size}px`}
        className="rounded-full object-cover"
        priority={priority}
      />
    </span>
  )
}
