import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Shared header */}
      <header className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-zinc-900">
            <span className="material-symbols-outlined text-deep-mint text-xl">
              medical_services
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight text-text-main dark:text-zinc-100">
            Lab Buddy
          </span>
        </div>
        <Link
          href="/dashboard"
          className="flex h-10 items-center gap-1.5 rounded-full bg-white px-4 shadow-sm text-sm font-black text-text-main dark:bg-zinc-900 hover:bg-pale-mint transition-colors"
          aria-label="Dashboard"
        >
          <span className="material-symbols-outlined text-deep-mint text-lg leading-none">
            dashboard
          </span>
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
      </header>

      {/* Page content */}
      <main className="px-6 pb-36">
        {children}
      </main>

      {/* Bottom nav */}
      <NavBar />
    </>
  );
}
