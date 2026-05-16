"use client";

import Link from "next/link";

import type { ExtraNavItem, NavItem } from "../lib/types/navigation.types";
import AppButton from "./AppButton";

type Props = {
  items: NavItem[];
  showUserOrLogin: () => React.ReactNode;
};

export default function NavigationDesktopLinks({
  items,
  showUserOrLogin,
}: Props) {
  return (
    <div className="hidden items-center gap-2 md:flex">
      <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/2 px-2 py-1 backdrop-blur">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/6 hover:text-white"
          >
            {it.label}
          </Link>
        ))}
      </div>

      {showUserOrLogin()}
    </div>
  );
}
