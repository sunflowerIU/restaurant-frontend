"use client";

import Image from "next/image";
import type { MutableRefObject } from "react";

import { FOODS } from "../lib/hero-section.constants";

type Props = {
  outerRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  innerRefs: MutableRefObject<Array<HTMLDivElement | null>>;
};

export default function HeroFloatingFoods({ outerRefs, innerRefs }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {FOODS.map((f, idx) => (
        <div
          key={`${f.src}-${idx}`}
          ref={(node) => {
            outerRefs.current[idx] = node;
          }}
          className={[
            "absolute select-none will-change-transform",
            f.className,
          ].join(" ")}
          style={{ width: f.size, height: f.size }}
        >
          <div
            ref={(node) => {
              innerRefs.current[idx] = node;
            }}
            className="relative h-full w-full hero-neon-outline"
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              priority={idx < 2}
              className="object-contain"
              sizes="(max-width: 768px) 120px, 200px"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
