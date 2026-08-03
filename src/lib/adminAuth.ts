import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_session";

export function isValidAdminSession(value: string | undefined): boolean {
  return !!value && !!process.env.ADMIN_SESSION_SECRET && value === process.env.ADMIN_SESSION_SECRET;
}

export async function requireAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(ADMIN_COOKIE)?.value);
}
