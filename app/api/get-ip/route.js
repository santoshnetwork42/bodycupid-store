import { NextResponse } from "next/server";
export const runtime = 'edge';

export async function GET(request) {
  try {
    const fwd = request.headers.get("x-forwarded-for");
    const ip = fwd ? fwd.split(",")[0] : null;
    return NextResponse.json({ ip: ip || null });
  } catch (err) {
    return NextResponse.json({ error: "Failed to get IP address" }, { status: 500 });
  }
}
