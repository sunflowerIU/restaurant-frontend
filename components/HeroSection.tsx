// file: app/(marketing)/_components/hero-nepali-restaurant.tsx
"use client";

import { memo, useRef } from "react";

import { useHeroSectionAnimations } from "@/lib/useHeroSectionAnimations";
import { FEATURE_CHIPS } from "../lib/hero-section.constants";
import AppButton from "./AppButton";
import HeroBackground from "./HeroBackground";
import HeroCard from "./HeroCard";
import HeroFloatingFoods from "./HeroFloatingFoods";
import HeroHeadline from "./HeroHeadline";
import { FaPhone } from "react-icons/fa6";

function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const outerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const innerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const neonOrbRefs = useRef<Array<HTMLDivElement | null>>([]);
  const beamRefs = useRef<Array<HTMLDivElement | null>>([]);
  const heroLettersRef = useRef<HTMLSpanElement[]>([]);
  const paraRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const parallaxTweenRef = useRef<gsap.core.Tween | null>(null);

  useHeroSectionAnimations({
    containerRef,
    outerRefs,
    innerRefs,
    neonOrbRefs,
    beamRefs,
    heroLettersRef,
    paraRefs,
    parallaxTweenRef,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background md:h-screen"
      aria-label="Nepali restaurant hero section"
    >
      <HeroBackground neonOrbRefs={neonOrbRefs} beamRefs={beamRefs} />
      <HeroFloatingFoods outerRefs={outerRefs} innerRefs={innerRefs} />

      <div className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-start gap-10 px-6 py-8 mt-15 md:h-full md:min-h-0 md:grid-cols-2 md:items-center md:mt-0 md:py-6">
        {/* Left */}
        <div className="flex flex-col justify-center ">
          <p
            data-hero-fade
            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1 text-sm text-white/70 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-white/70 shadow-[0_0_18px_rgba(0,220,255,0.28)]" />
            Late-night glow • Nepali comfort food
          </p>

          <div className="text-white">
            <HeroHeadline
              text={"Dark, cozy, and spicy momo hits different."}
              highlight={"momo"}
              lettersRef={heroLettersRef}
            />
          </div>

          <p
            ref={(n) => {
              paraRefs.current[0] = n;
            }}
            className="mt-4 max-w-xl text-pretty text-base text-white/70 md:text-lg"
          >
            Add items to your cart and proceed to checkout or call us directly.
          </p>

          <p
            ref={(n) => {
              paraRefs.current[1] = n;
            }}
            className="mt-3 max-w-xl text-pretty text-sm text-white/55 md:text-base"
          >
            Order food without creating your account.
          </p>

          <div data-hero-fade className="mt-7 flex flex-wrap gap-3">
            {/* <Button asChild size="lg" className="rounded-2xl">
              <Link href="/menu">Explore Menu</Link>
            </Button> */}
            <AppButton variant="destructive" href="/menu" size="xl">
              Explore Menu
            </AppButton>
            <AppButton href="tel:+9779861911983" variant="outline" size="xl">
              <FaPhone /> Call Now
            </AppButton>
          </div>

          <div data-hero-fade className="mt-7 flex flex-wrap gap-3 text-sm">
            {FEATURE_CHIPS.map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-white/10 bg-white/3 px-4 py-2 text-white/70 backdrop-blur"
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <HeroCard />
      </div>
    </section>
  );
}

export default memo(HeroSection);
