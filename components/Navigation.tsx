// file: app/(marketing)/_components/hero-nav.tsx
"use client";

import { useEffect, useState } from "react";

import CartSheet from "@/app/_providers/CartSheet";
import NavigationDesktopLinks from "./NavigationDesktopLinks";
import NavigationLogo from "./NavigationLogo";
import {
  NavigationMobileDrawer,
  NavigationMobileToggle,
} from "./NavigationMobileMenu";
import type { ExtraNavItem, NavItem } from "../lib/navigation.types";

const items: NavItem[] = [
  { label: "Menu", href: "/menu" },
  { label: "Contact", href: "/contact" },
];

const otherNavItems: ExtraNavItem[] = [
  { label: "Login", href: "/login", variant: "secondary" },
  { label: "Explore Menu", href: "/menu", variant: "destructive" },
];

export default function Navigation({
  logoSrc = "/momo.png",
  brand = "Nepali Kitchen",
}: {
  /** Put your logo in /public/logo.png (or pass another path) */
  logoSrc?: string;
  brand?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Nav sits on top of hero, fully transparent */}
      <header className="absolute inset-x-0 top-0 z-50 ">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex items-center justify-between py-5">
            <NavigationLogo logoSrc={logoSrc} brand={brand} />
            <NavigationDesktopLinks
              items={items}
              otherNavItems={otherNavItems}
            />

            {/* Right: always-visible cart + mobile menu toggle */}
            <div className="flex items-center gap-2">
              <CartSheet />
              <NavigationMobileToggle
                open={open}
                onToggle={() => setOpen((v) => !v)}
              />
            </div>
          </nav>
        </div>
      </header>

      <NavigationMobileDrawer
        open={open}
        logoSrc={logoSrc}
        brand={brand}
        items={items}
        onClose={() => setOpen(false)}
        otherNavitems={otherNavItems}
      />
    </>
  );
}
