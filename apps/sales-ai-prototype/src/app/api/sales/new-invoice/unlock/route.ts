import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "safera2a_new_invoice";
const PASSWORD = process.env.SAFER_A2A_NEW_INVOICE_PASSWORD ?? "safera2a";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password : "";
    if (password !== PASSWORD) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, "1", {
      httpOnly: true,
      path: "/sales/new-invoice",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
