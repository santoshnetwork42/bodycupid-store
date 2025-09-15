import { NextResponse } from "next/server";
export const runtime = 'edge';
import { revalidatePath } from "next/cache";

const { REVALIDATE_SECRET = "secret" } = process.env;

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body?.path) return NextResponse.json({ message: "Please provide path in body" }, { status: 400 });
    revalidatePath(body.path);
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: "POST only" }, { status: 404 });
}
