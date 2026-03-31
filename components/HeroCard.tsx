// file: components/hero/hero-card-carousel.tsx
"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AppButton from "./AppButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type DishCard = {
  key: string;
  label: string;
  title: string;
  desc: string;
  price: string;
  imageSrc: string;
  stats: Array<{ top: string; bottom: string }>;
  ctaHref: string;
};
function clampIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

export default function HeroCard() {
  const cards: DishCard[] = useMemo(
    () => [
      {
        key: "momo",
        label: "Featured",
        title: "Steamed Momo Platter",
        desc: "Soft wrappers, juicy filling, spicy achar.",
        price: "NPR 120",
        imageSrc: "/momo.png",
        ctaHref: "/order",
        stats: [
          { top: "4.8★", bottom: "Ratings" },
          { top: "15–25m", bottom: "Prep time" },
          { top: "Veg + Non-veg", bottom: "Options" },
        ],
      },
      {
        key: "chowmein",
        label: "Popular",
        title: "Street Chowmein Bowl",
        desc: "Smoky wok-tossed noodles with crisp veggies.",
        price: "NPR 200",
        imageSrc: "/chowmein.png",
        ctaHref: "/order",
        stats: [
          { top: "Wok", bottom: "Tossed" },
          { top: "Medium", bottom: "Spice" },
          { top: "10–18m", bottom: "Prep time" },
        ],
      },
      {
        key: "chicken",
        label: "Chef’s Pick",
        title: "Spiced Chicken Plate",
        desc: "Tender, bold, and perfect with a side of achar.",
        price: "NPR 340",
        imageSrc: "/chicken.png",
        ctaHref: "/order",
        stats: [
          { top: "Juicy", bottom: "Bites" },
          { top: "High", bottom: "Flavor" },
          { top: "12–20m", bottom: "Prep time" },
        ],
      },
    ],
    [],
  );

  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<number | null>(null);

  // Drag-to-scroll (prevents page pan by consuming gesture)
  const draggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  const scrollToIndex = useCallback(
    (idx: number, behavior: ScrollBehavior = "smooth") => {
      const el = trackRef.current;
      const vp = viewportRef.current;
      if (!el || !vp) return;

      const nextIdx = clampIndex(idx, cards.length);
      const slideWidth = vp.clientWidth; // each slide is w-full of the viewport
      el.scrollTo({ left: nextIdx * slideWidth, behavior });
      setActive(nextIdx);
    },
    [cards.length],
  );

  const next = useCallback(
    () => scrollToIndex(active + 1),
    [active, scrollToIndex],
  );
  const prev = useCallback(
    () => scrollToIndex(active - 1),
    [active, scrollToIndex],
  );

  // Autoplay
  useEffect(() => {
    if (isPaused) return;

    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    autoplayRef.current = window.setInterval(() => {
      setActive((cur) => {
        const nxt = clampIndex(cur + 1, cards.length);
        scrollToIndex(nxt);
        return nxt;
      });
    }, 4200);

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
  }, [cards.length, isPaused, scrollToIndex]);

  // Keep active in sync with horizontal scroll position
  useEffect(() => {
    const el = trackRef.current;
    const vp = viewportRef.current;
    if (!el || !vp) return;

    const onScroll = () => {
      const slideWidth = vp.clientWidth || 1;
      const idx = Math.round(el.scrollLeft / slideWidth);
      setActive(clampIndex(idx, cards.length));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [cards.length]);

  // Pointer drag: consume gesture so it never bubbles into page horizontal pan
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest("a,button")) return;

      draggingRef.current = true;
      pointerIdRef.current = e.pointerId;
      startXRef.current = e.clientX;
      startScrollLeftRef.current = el.scrollLeft;

      setIsPaused(true);
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      if (pointerIdRef.current !== e.pointerId) return;

      // IMPORTANT: block browser from panning the page
      e.preventDefault();

      const dx = e.clientX - startXRef.current;
      el.scrollLeft = startScrollLeftRef.current - dx;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (pointerIdRef.current !== e.pointerId) return;
      draggingRef.current = false;
      pointerIdRef.current = null;

      // Snap to closest
      const vp = viewportRef.current;
      const slideWidth = vp?.clientWidth || 1;
      const idx = Math.round(el.scrollLeft / slideWidth);
      scrollToIndex(idx);

      window.setTimeout(() => setIsPaused(false), 900);
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, { passive: false }); // ✅ critical
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [scrollToIndex]);

  return (
    <div className="flex items-center justify-center">
      <Card
        className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-transparent shadow-2xl -space-y-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <CardHeader>
          <CardTitle className="text-white text-3xl">Most popular</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative">
            {/* Viewport: contains horizontal scroll and prevents scroll chaining */}
            <div
              ref={viewportRef}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur"
              style={{
                overscrollBehaviorX: "contain",
                touchAction: "pan-y",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="absolute inset-0 opacity-70 [background:radial-gradient(600px_circle_at_20%_10%,rgba(0,220,255,0.10),transparent_55%),radial-gradient(540px_circle_at_90%_20%,rgba(160,70,255,0.09),transparent_56%)]" />
              <div className="absolute inset-0 hero-card-shimmer opacity-35" />

              {/* Track */}
              <div
                ref={trackRef}
                className="relative flex snap-x snap-mandatory overflow-x-auto scrollbar-none"
                style={{
                  scrollSnapType: "x mandatory",
                  overscrollBehaviorX: "contain",
                }}
              >
                {cards.map((c) => (
                  <div key={c.key} className="w-full shrink-0 snap-start p-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <p className="text-sm text-white/60">{c.label}</p>
                        <h2 className="text-2xl font-semibold tracking-tight text-white">
                          {c.title}
                        </h2>
                        <p className="mt-1 text-sm text-white/60">{c.desc}</p>
                      </div>

                      <div className="relative aspect-square rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                        <Image
                          src={c.imageSrc}
                          alt={c.title}
                          fill
                          className="object-contain p-3"
                          sizes="220px"
                        />
                      </div>

                      <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <div>
                          <p className="text-sm text-white/60">From</p>
                          <p className="text-xl font-semibold text-white">
                            {c.price}
                          </p>
                          <p className="mt-1 text-xs text-white/55">
                            Add soup + drink combo
                          </p>
                        </div>
                        <AppButton variant="destructive" size="xs" href="/">
                          Order Now
                        </AppButton>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
                      {c.stats.map((s) => (
                        <div
                          key={s.bottom}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-white/60 backdrop-blur"
                        >
                          <p className="text-xs font-semibold text-white">
                            {s.top}
                          </p>
                          <p>{s.bottom}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPaused(true);
                    prev();
                    window.setTimeout(() => setIsPaused(false), 700);
                  }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/[0.06]"
                  aria-label="Previous card"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPaused(true);
                    next();
                    window.setTimeout(() => setIsPaused(false), 700);
                  }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/[0.06]"
                  aria-label="Next card"
                >
                  →
                </button>
              </div>

              <div className="flex items-center gap-2">
                {cards.map((c, idx) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => {
                      setIsPaused(true);
                      scrollToIndex(idx);
                      window.setTimeout(() => setIsPaused(false), 700);
                    }}
                    className={[
                      "h-2.5 rounded-full transition-all",
                      idx === active
                        ? "w-8 bg-white/70"
                        : "w-2.5 bg-white/20 hover:bg-white/35",
                    ].join(" ")}
                    aria-label={`Go to ${c.title}`}
                    aria-current={idx === active}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        .scrollbar-none {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .hero-card-shimmer {
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 255, 255, 0.08) 45%,
            rgba(0, 220, 255, 0.09) 52%,
            rgba(160, 70, 255, 0.07) 58%,
            transparent 75%
          );
          transform: translateX(-45%);
          animation: shimmer 4.2s ease-in-out infinite;
          mix-blend-mode: overlay;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-60%);
          }
          50% {
            transform: translateX(10%);
          }
          100% {
            transform: translateX(-60%);
          }
        }
      `}</style>
    </div>
  );
}
