import { NextResponse } from "next/server";
export const runtime = 'edge';
import { WORDPRESS_AUTH, WORDPRESS_URL } from "~/config";

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await fetch(WORDPRESS_URL, {
      headers: { "Content-Type": "application/json", Authorization: WORDPRESS_AUTH },
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) return NextResponse.json({ error: "Error fetching data" }, { status: response.status });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
