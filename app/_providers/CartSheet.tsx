// file: app/(providers)/cart/cart-sheet.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { formatMoney, useCart } from "./CartContext";
import AppButton from "@/components/AppButton";

export default function CartSheet() {
  const { lines, inc, dec, remove, clear, count, totalByCurrency } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <AppButton variant="outline">
          Cart
          <span className="ml-2 rounded-full border bg-destructive/10 px-2 py-0.5 text-sm text-destructive">
            {count}
          </span>
        </AppButton>
      </SheetTrigger>

      <SheetContent className="border-white/10 bg-black/80 p-2 text-white backdrop-blur-xl sm:p-3">
        <SheetHeader>
          <SheetTitle className="text-white">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex h-[calc(100dvh-110px)] min-h-0 flex-col">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">
              {count} item{count === 1 ? "" : "s"}
            </p>
            <Button
              variant="ghost"
              className="h-9 rounded-2xl text-white/75 hover:bg-white/[0.06] hover:text-white"
              onClick={clear}
              disabled={lines.length === 0}
            >
              Clear
            </Button>
          </div>

          <Separator className="my-3 bg-white/10" />

          <ScrollArea className="min-h-0 flex-1 pr-1 sm:pr-3">
            <div className="space-y-3">
              {lines.map((l) => (
                <div
                  key={l.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3"
                >
                  <div className="flex gap-2.5 sm:gap-3">
                    <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:h-14 sm:w-16">
                      <Image
                        src={l.imageSrc}
                        alt={l.name}
                        fill
                        className="object-contain p-2"
                        sizes="64px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{l.name}</p>
                      <p className="mt-1 text-xs text-white/60">
                        {formatMoney(l.currency, l.price)}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Button
                          variant="secondary"
                          className="h-8 w-8 rounded-xl bg-white/[0.06] p-0 text-white hover:bg-white/[0.10]"
                          onClick={() => dec(l.id)}
                        >
                          −
                        </Button>
                        <span className="w-8 text-center text-sm text-white/80">
                          {l.qty}
                        </span>
                        <Button
                          variant="secondary"
                          className="h-8 w-8 rounded-xl bg-white/[0.06] p-0 text-white hover:bg-white/[0.10]"
                          onClick={() => inc(l.id)}
                        >
                          +
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-8 w-8 rounded-xl text-white/70 hover:bg-white/[0.06] hover:text-white"
                          onClick={() => remove(l.id)}
                          aria-label={`Remove ${l.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {lines.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-white/60">
                  Cart is empty.
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator className="my-3 bg-white/10" />

          <div className="space-y-2">
            {Object.entries(totalByCurrency).map(([currency, total]) => (
              <div
                key={currency}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-white/70">Total ({currency})</span>
                <span className="font-semibold text-white">
                  {currency === "Rs"
                    ? `Rs ${total.toFixed(0)}`
                    : `$${total.toFixed(2)}`}
                </span>
              </div>
            ))}

            <Button
              className="mt-2 w-full rounded-2xl"
              disabled={lines.length === 0}
            >
              Checkout
            </Button>
            <p className="text-xs text-white/45">
              Hook this up to your real checkout later.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
