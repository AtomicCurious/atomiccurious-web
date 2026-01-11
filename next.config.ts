import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 🔁 Inglés viejo con /en → raíz
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
