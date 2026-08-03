import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/adminAuth";
import PurchasesUploadPanel from "./PurchasesUploadPanel";

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-warm-linen px-6 py-12 md:px-20">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="font-sans text-3xl font-black text-text-dark">Admin — Purchases</h1>
        <PurchasesUploadPanel />
      </div>
    </main>
  );
}
