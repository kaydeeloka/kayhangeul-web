import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/src/lib/adminAuth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
