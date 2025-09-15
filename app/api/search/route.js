import { NextResponse } from "next/server";
export const runtime = 'edge';

const { TTM_CLIENT_URL, TTM_CLIENT_API_KEY, TTM_CLIENT_THRESHOLD } = process.env;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("search");
  if (!q) return NextResponse.json({ message: "Search term is required" }, { status: 401 });

  const url = `${TTM_CLIENT_URL}/search?query=${encodeURIComponent(q)}&threshold=${TTM_CLIENT_THRESHOLD}`;
  const resp = await fetch(url, { headers: { Authorization: `Bearer ${TTM_CLIENT_API_KEY}` } });
  const data = await resp.json();
  return NextResponse.json(data);
}
