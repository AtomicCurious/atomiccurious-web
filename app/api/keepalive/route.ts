import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  // 1) Validate keepalive secret
  const secret = process.env.KEEPALIVE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "KEEPALIVE_SECRET not set" },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const provided = url.searchParams.get("secret");

  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // 2) Debug + call Supabase
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing env vars",
          hasUrl: Boolean(supabaseUrl),
          hasAnonKey: Boolean(supabaseAnonKey),
        },
        { status: 500 }
      );
    }

    // Minimal request to Supabase PostgREST (counts as activity)
    const res = await fetch(`${supabaseUrl}/rest/v1/Lead?select=id&limit=1`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      cache: "no-store",
    });

    const text = await res.text().catch(() => "");

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      bodyPreview: text.slice(0, 200),
      ts: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Supabase request failed" },
      { status: 500 }
    );
  }
}