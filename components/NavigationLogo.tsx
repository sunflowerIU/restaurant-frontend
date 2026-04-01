"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  logoSrc: string;
  brand: string;
  onClick?: () => void;
  compact?: boolean;
};

export default function NavigationLogo({
  logoSrc,
  brand,
  onClick,
  compact = false,
}: Props) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-flex items-center ${compact ? "gap-2" : "gap-3"} group`}
    >
      <span className="relative h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-white/2 backdrop-blur">
        <Image
          src={logoSrc}
          alt={`${brand} logo`}
          fill
          className="object-contain p-1.5"
          sizes="40px"
          priority={!compact}
        />
      </span>

      {compact ? (
        <p className="text-sm font-semibold text-white">{brand}</p>
      ) : (
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">{brand}</p>
          <p className="text-xs text-white/60">Momo • Chowmein • Achar</p>
        </div>
      )}
    </Link>
  );
}
