import Sidebar from "./Sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-warm-linen">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden px-6 py-8 md:px-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
