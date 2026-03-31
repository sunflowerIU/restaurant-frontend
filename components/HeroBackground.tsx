"use client";

import type { MutableRefObject } from "react";

import { BEAM_CLASSES, NEON_ORB_CLASSES } from "../lib/hero-section.constants";

type Props = {
  neonOrbRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  beamRefs: MutableRefObject<Array<HTMLDivElement | null>>;
};

export default function HeroBackground({ neonOrbRefs, beamRefs }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.90),rgba(2,6,12,0.96))]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.06),transparent_60%)]" />

      <div
        data-bg-rotate
        className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(0,220,255,0.20), rgba(160,70,255,0.16), rgba(255,120,60,0.10), rgba(0,220,255,0.20))",
        }}
      />

      {NEON_ORB_CLASSES.map((cls, i) => (
        <div
          key={cls}
          ref={(n) => {
            neonOrbRefs.current[i] = n;
          }}
          className={["absolute rounded-full blur-3xl opacity-55", cls].join(
            " ",
          )}
          style={{
            background:
              i % 2 === 0
                ? "radial-gradient(circle at 30% 30%, rgba(0,220,255,0.28), transparent 60%)"
                : "radial-gradient(circle at 30% 30%, rgba(160,70,255,0.26), transparent 60%)",
          }}
        />
      ))}

      <div className="absolute inset-0 opacity-70">
        {BEAM_CLASSES.map((cls, i) => (
          <div
            key={cls}
            ref={(n) => {
              beamRefs.current[i] = n;
            }}
            className={["absolute left-[-25%] w-[150%] blur-2xl", cls].join(
              " ",
            )}
            style={{
              background:
                i === 1
                  ? "linear-gradient(90deg, transparent, rgba(0,220,255,0.16), rgba(160,70,255,0.12), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(160,70,255,0.14), rgba(255,120,60,0.10), transparent)",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-size-[56px_56px]" />
      <div className="hero-scanlines absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_40%,transparent_30%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}
