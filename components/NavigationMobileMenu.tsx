"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import AppButton from "./AppButton";
import NavigationLogo from "./NavigationLogo";
import type { ExtraNavItem, NavItem } from "../lib/types/navigation.types";
import { DropdownMenuUser } from "./DropdownMenuUser";

type ToggleProps = {
  open: boolean;
  onToggle: () => void;
};

export function NavigationMobileToggle({ open, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/2 px-3 py-2 text-white/85 backdrop-blur md:hidden"
      aria-label="Toggle menu"
      aria-expanded={open}
    >
      <div className="relative h-4 w-6">
        <span
          className={cn(
            "absolute left-0 top-0 block h-[2px] w-6 bg-white transition-transform duration-200",
            open ? "translate-y-[7px] rotate-45" : "",
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-[7px] block h-[2px] w-6 bg-white transition-opacity duration-200",
            open ? "opacity-0" : "opacity-100",
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-[14px] block h-[2px] w-6 bg-white transition-transform duration-200",
            open ? "translate-y-[-7px] -rotate-45" : "",
          )}
        />
      </div>
    </button>
  );
}

type DrawerProps = {
  open: boolean;
  logoSrc: string;
  brand: string;
  items: NavItem[];
  onClose: () => void;
  showUserOrLogin: () => React.ReactNode;
};

export function NavigationMobileDrawer({
  open,
  logoSrc,
  brand,
  items,
  onClose,
  showUserOrLogin,
}: DrawerProps) {
  return (
    <div
      className={cn(
        "md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        aria-label="Close menu overlay"
        tabIndex={0}
        className={cn(
          "fixed inset-0 z-40 cursor-pointer bg-black/10 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
        style={{ border: "none", background: "none", padding: 0 }}
      />
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-dvh w-[86%] max-w-sm",
          "border-l border-white/10 bg-black/60 backdrop-blur-xl",
          "transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <NavigationLogo
            logoSrc={logoSrc}
            brand={brand}
            compact
            onClick={onClose}
          />

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/2 px-3 py-2 text-sm text-white/85"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="px-5 pb-6">
          <div className="text-white flex mb-5 items-center">
            {showUserOrLogin()}
          </div>
          <div className="grid gap-2">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={onClose}
                className="rounded-2xl border border-white/10 bg-white/2 px-4 py-3 text-white/80 transition hover:bg-white/6 hover:text-white"
              >
                {it.label}
              </Link>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/2 p-4 text-sm text-white/70">
            <p className="font-medium text-white">Contact</p>
            <p className="mt-1 text-white/60">Call: +977-98XXXXXXXX</p>
            <p className="mt-2 text-white/55">Open: 11:00 AM – 10:30 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
