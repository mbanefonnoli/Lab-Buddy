"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function DashboardSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const d = t.dashboard;

  const NAV = [
    { href: "/dashboard", label: d.overview, icon: "home_app_logo" },
    { href: "/dashboard/reports", label: t.reportsPage.myReports, icon: "folder_open" },
    { href: "/dashboard/trends", label: t.trendsPage.healthTrends, icon: "show_chart" },
    { href: "/encyclopedia", label: t.encyclopediaPage.title, icon: "menu_book" },
    { href: "/settings", label: t.nav.settings, icon: "settings" },
  ];

  return (
    <aside className="flex h-full w-60 flex-col border-r border-pale-mint bg-white">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 border-b border-pale-mint px-6 py-5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-pale-mint">
          <span className="material-symbols-outlined text-deep-mint text-lg">
            medical_services
          </span>
        </div>
        <span className="text-lg font-black text-text-main">Lab Buddy</span>
      </Link>

      {/* Section label */}
      <p className="px-6 pb-1 pt-4 text-[10px] font-black uppercase tracking-[0.18em] text-text-main/30">
        {d.overview}
      </p>

      {/* Nav items */}
      <nav className="flex-1 space-y-0.5 px-3 pb-4">
        {NAV.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${isActive
                  ? "bg-pale-mint text-deep-mint shadow-sm"
                  : "text-text-main/50 hover:bg-pale-mint/50 hover:text-text-main"
                }`}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-deep-mint" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* New Analysis CTA */}
      <div className="border-t border-pale-mint p-4">
        <Link
          href="/app"
          onClick={onClose}
          className="flex items-center justify-center gap-2 rounded-2xl bg-magic-orange px-4 py-3 text-sm font-black text-white shadow-[0_4px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none"
        >
          <span className="material-symbols-outlined text-base">add</span>
          {d.newAnalysis}
        </Link>
        <p className="mt-3 text-center text-[10px] font-medium text-text-main/30">
          Not medical advice
        </p>
      </div>
    </aside>
  );
}
