"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function NavBar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const NAV_ITEMS = [
    { href: "/app", label: t.nav.home, icon: "home" },
    { href: "/results", label: t.nav.results, icon: "analytics" },
    { href: "/encyclopedia", label: t.nav.explore, icon: "menu_book" },
    { href: "/chat", label: t.nav.chat, icon: "chat_bubble" },
    { href: "/settings", label: t.nav.settings, icon: "settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between rounded-t-[3rem] bg-white px-8 pb-10 pt-5 shadow-[0_-10px_25px_rgba(0,0,0,0.03)] dark:bg-zinc-900 dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive
                ? "text-deep-mint"
                : "text-zinc-300 hover:text-deep-mint/60 dark:text-zinc-600"
            }`}
          >
            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
