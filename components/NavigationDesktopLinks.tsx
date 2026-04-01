"use client";

import Link from "next/link";

import AppButton from "./AppButton";
import type { ExtraNavItem, NavItem } from "../lib/navigation.types";
import { DropdownMenuUser } from "./DropdownMenuUser";

type Props = {
  items: NavItem[];
  otherNavItems: ExtraNavItem[];
};

export default function NavigationDesktopLinks({
  items,
  otherNavItems,
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

      {otherNavItems.map((item) => (
        <AppButton variant={item.variant} key={item.href} href={item.href}>
          {item.label}
        </AppButton>
      ))}

      <DropdownMenuUser mobileNav={false} />
    </div>
  );
}
