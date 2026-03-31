// file: app/(marketing)/_components/hero-nav.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import CartSheet from "@/app/_providers/CartSheet";
import { cn } from "@/lib/utils";
import AppButton from "./AppButton";

type NavItem = { label: string; href: string };

export default function HeroNav({
  logoSrc = "/momo.png",
  brand = "Nepali Kitchen",
  items = [
    { label: "Menu", href: "/menu" },
    { label: "Order", href: "/order" },
    { label: "Contact", href: "/contact" },
  ],
}: {
  /** Put your logo in /public/logo.png (or pass another path) */
  logoSrc?: string;
  brand?: string;
  items?: NavItem[];
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
            {/* Left: logo */}
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="relative h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
                <Image
                  src={logoSrc}
                  alt={`${brand} logo`}
                  fill
                  className="object-contain p-1.5"
                  sizes="40px"
                  priority
                />
              </span>

              <div className="leading-tight">
                <p className="text-sm font-semibold text-white">{brand}</p>
                <p className="text-xs text-white/60">Momo • Chowmein • Achar</p>
              </div>
            </Link>

            {/* Right: desktop links */}
            <div className="hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.02] px-2 py-1 backdrop-blur">
                {items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    {it.label}
                  </Link>
                ))}
              </div>

              <AppButton variant="destructive">Order Now</AppButton>
            </div>

            {/* Right: always-visible cart + mobile menu toggle */}
            <div className="flex items-center gap-2">
              <CartSheet />
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-2 text-white/85 backdrop-blur md:hidden"
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
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile sheet (still transparent nav; sheet has glass bg) */}
      <div
        className={cn(
          "md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setOpen(false);
            }
          }}
          aria-label="Close menu overlay"
          tabIndex={0}
          className={cn(
            "fixed inset-0 z-40 bg-black/10 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0",
            "cursor-pointer",
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
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2"
            >
              <span className="relative h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <Image
                  src={logoSrc}
                  alt={`${brand} logo`}
                  fill
                  className="object-contain p-1.5"
                  sizes="40px"
                />
              </span>
              <p className="text-sm font-semibold text-white">{brand}</p>
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white/85"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="px-5 pb-6">
            <div className="grid gap-2">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {it.label}
                </Link>
              ))}
            </div>

            <AppButton className="mt-4" size="lg" variant="destructive">
              Order Now
            </AppButton>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/70">
              <p className="font-medium text-white">Contact</p>
              <p className="mt-1 text-white/60">Call: +977-98XXXXXXXX</p>
              <p className="mt-2 text-white/55">Open: 11:00 AM – 10:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
