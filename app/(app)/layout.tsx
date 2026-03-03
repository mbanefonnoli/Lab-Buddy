import NavBar from "@/components/NavBar";
import UserMenu from "@/components/UserMenu";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import Link from "next/link";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Shared header */}
      <header className="flex items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2 transition-transform active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-zinc-900">
            <span className="material-symbols-outlined text-deep-mint text-xl">
              medical_services
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight text-text-main dark:text-zinc-100">
            Lab Buddy
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ProfileSwitcher />
          <UserMenu />
        </div>
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
