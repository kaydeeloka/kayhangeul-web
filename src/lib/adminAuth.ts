export const ADMIN_COOKIE = "admin_session";

export function isValidAdminSession(value: string | undefined): boolean {
  return !!value && !!process.env.ADMIN_SESSION_SECRET && value === process.env.ADMIN_SESSION_SECRET;
}
