import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

export async function GET(req: Request) {
  // 1. Comprobar que el secreto esté configurado en el servidor.
  const secret = process.env.KEEPALIVE_SECRET;

  if (!secret) {
    return NextResponse.json(
      {
        ok: false,
        error: "Server configuration error",
      },
      {
        status: 500,
        headers: noStoreHeaders,
      }
    );
  }

  // 2. Recibir el secreto mediante el encabezado Authorization.
  const authorization = req.headers.get("authorization");

  if (authorization !== `Bearer ${secret}`) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized",
      },
      {
        status: 401,
        headers: noStoreHeaders,
      }
    );
  }

  // 3. Ejecutar una consulta mínima para generar actividad en PostgreSQL.
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        ok: true,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: noStoreHeaders,
      }
    );
  } catch (error: unknown) {
    console.error("Keepalive database query failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Database query failed",
      },
      {
        status: 500,
        headers: noStoreHeaders,
      }
    );
  }
}

