"use client"

export default function CinematicNoise({
  grainOpacity = 0.12,
  scanOpacity = 0.08,
}: {
  grainOpacity?: number
  scanOpacity?: number
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-[20]"
      aria-hidden="true"
    >
      {/* 🔴 DEBUG: si ves este overlay, el componente está arriba */}
      <div className="absolute inset-0 bg-red-500/5" />

      {/* Film grain — INLINE fallback (no depende de CSS) */}
      <div
        className="absolute inset-[-40%]"
        style={{
          opacity: grainOpacity,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
          backgroundSize: "220px 220px",
          mixBlendMode: "soft-light",
          filter: "contrast(120%) brightness(105%)",
          animation: "acGrainDrift 6.5s steps(10,end) infinite",
        }}
      />

      {/* Scanlines — INLINE fallback */}
      <div
        className="absolute inset-0"
        style={{
          opacity: scanOpacity,
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 7px)",
          mixBlendMode: "overlay",
          animation: "acScanMove 8s linear infinite",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 35%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 65%, rgba(0,0,0,0.22) 100%)",
          mixBlendMode: "multiply",
          opacity: 0.55,
        }}
      />
    </div>
  )
}
