"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="cursor-pointer rounded-xl border border-cherry-pink/30 px-4 py-2 font-sans text-sm font-bold text-text-light transition-colors hover:bg-light-pink"
    >
      Logout
    </button>
  );
}
