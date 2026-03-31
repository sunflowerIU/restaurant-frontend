"use client";

import { useEffect, type MutableRefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FOODS } from "./hero-section.constants";

type HeroAnimationRefs = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  outerRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  innerRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  neonOrbRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  beamRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  heroLettersRef: MutableRefObject<HTMLSpanElement[]>;
  paraRefs: MutableRefObject<Array<HTMLParagraphElement | null>>;
  parallaxTweenRef: MutableRefObject<gsap.core.Tween | null>;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}

export function useHeroSectionAnimations({
  containerRef,
  outerRefs,
  innerRefs,
  neonOrbRefs,
  beamRefs,
  heroLettersRef,
  paraRefs,
  parallaxTweenRef,
}: HeroAnimationRefs) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = containerRef.current;
    if (!root) return;
    const isMobile =
      window.matchMedia?.("(max-width: 767px)")?.matches ?? false;

    heroLettersRef.current = heroLettersRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.set(heroLettersRef.current, { opacity: 0, y: 10, rotateZ: 0.001 });
      gsap.to(heroLettersRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: { each: 0.03, from: "start" },
      });

      gsap.fromTo(
        "[data-hero-fade]",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        },
      );

      paraRefs.current.forEach((p) => {
        if (!p) return;
        gsap.set(p, { opacity: 0, y: 16 });
        gsap.to(p, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: p,
            start: "top 80%",
          },
        });
      });

      innerRefs.current.forEach((el, i) => {
        if (!el) return;
        const item = FOODS[i];
        const wob = item?.wobble ?? { y: 14, rot: 8 };
        const baseDur = 3.4 + (i % 4) * 0.6;

        gsap.to(el, {
          y: `+=${wob.y}`,
          rotation: `+=${wob.rot}`,
          duration: baseDur,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "50% 50%",
        });

        gsap.to(el, {
          scale: 1.03,
          duration: 2.8 + (i % 3) * 0.55,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "50% 50%",
        });

        gsap.to(el, {
          x: `+=${item.drift.x}`,
          y: `+=${item.drift.y}`,
          duration: item.driftDuration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      neonOrbRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: 0.78,
          duration: 2.7 + (i % 3) * 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(el, {
          scale: 1.12,
          duration: 3.4 + (i % 2) * 0.9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      });

      if (!isMobile) {
        beamRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(
            el,
            { x: i % 2 === 0 ? "-35%" : "35%", opacity: 0.25 },
            {
              x: i % 2 === 0 ? "35%" : "-35%",
              opacity: 0.55,
              duration: 7 + i * 1.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            },
          );
        });

        gsap.to("[data-bg-rotate]", {
          rotation: 360,
          duration: 60,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      }
    }, root);

    let frameId: number | null = null;
    let nextDx = 0;
    let nextDy = 0;

    const applyParallax = () => {
      frameId = null;
      const dx = nextDx;
      const dy = nextDy;

      parallaxTweenRef.current?.kill();
      parallaxTweenRef.current = gsap.to(outerRefs.current, {
        x: (index: number) => dx * (index % 2 === 0 ? 1 : 0.85),
        y: (index: number) => dy * (index % 2 === 0 ? 0.9 : 1),
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      nextDx = (px - 0.5) * 16;
      nextDy = (py - 0.5) * 16;

      if (frameId == null) {
        frameId = window.requestAnimationFrame(applyParallax);
      }
    };

    const isFinePointer =
      window.matchMedia?.("(pointer:fine)")?.matches ?? false;

    if (isFinePointer) {
      root.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      if (isFinePointer) {
        root.removeEventListener("pointermove", onMove);
      }
      if (frameId != null) {
        window.cancelAnimationFrame(frameId);
      }
      parallaxTweenRef.current?.kill();
      ctx.revert();
    };
  }, [
    beamRefs,
    containerRef,
    heroLettersRef,
    innerRefs,
    neonOrbRefs,
    outerRefs,
    paraRefs,
    parallaxTweenRef,
  ]);
}
