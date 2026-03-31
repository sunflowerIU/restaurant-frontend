// file: components/ui/app-button.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";

import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type AppButtonProps = Omit<ComponentProps<typeof Button>, "asChild"> & {
  /**
   * When provided, renders a Next.js <Link> button.
   * If you pass `href`, you can still pass `target`, `prefetch`, `replace`, etc via `linkProps`.
   */
  href?: string;
  linkProps?: Omit<React.ComponentProps<typeof Link>, "href" | "children">;

  /**
   * Renders child as the clickable element (Radix Slot).
   * Use when you need custom element nesting.
   */
  asChild?: boolean;

  /**
   * Extra wrapper classes.
   */
  className?: string;
};

export function AppButton({
  href,
  linkProps,
  asChild,
  className,
  children,
  ...props
}: AppButtonProps) {
  // Priority:
  // 1) href => Link wrapped by shadcn Button via asChild
  // 2) asChild => Slot wrapped by shadcn Button via asChild
  // 3) normal shadcn Button
  if (href) {
    return (
      <Button className={cn("rounded-2xl", className)} asChild {...props}>
        <Link href={href} {...linkProps}>
          {children}
        </Link>
      </Button>
    );
  }

  if (asChild) {
    return (
      <Button className={cn("rounded-2xl", className)} asChild {...props}>
        <Slot>{children}</Slot>
      </Button>
    );
  }

  return (
    <Button className={cn("rounded-2xl", className)} {...props}>
      {children}
    </Button>
  );
}

export default AppButton;
