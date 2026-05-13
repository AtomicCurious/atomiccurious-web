// app/es/(sections)/recursos/page.tsx
import RecursosClient from "./recursos-client"
import RecursosComingSoon from "./recursos-coming-soon"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Recursos | AtomicCurious",
  description:
    "Libros, apps, sitios web, cursos y herramientas curadas para expandir tu perspectiva, pensar mejor y mantener viva la curiosidad.",
}

const RESOURCE_LAUNCH_DATE = new Date("2026-07-18T00:00:00-04:00")

export default function RecursosPage() {
  const isComingSoon = new Date() < RESOURCE_LAUNCH_DATE

  if (isComingSoon) {
    return <RecursosComingSoon />
  }

  return <RecursosClient />
}