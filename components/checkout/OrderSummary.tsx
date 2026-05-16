"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { addressToString } from "@/lib/types/checkout.types";
import type { PaymentMethod } from "../../lib/types/checkout.types";
import type { Address } from "../../lib/types/profile";
import AppButton from "../AppButton";

export function OrderSummaryCard({
  itemCount,
  totals,
  payment,
  address,
  phone,
  canSubmit,
  onSubmit,
  isPending,
}: {
  itemCount: number;
  totals: Record<string, number>;
  payment: PaymentMethod;
  address: Address | null;
  phone: string;
  canSubmit: boolean;
  onSubmit: () => void;
  isPending: boolean;
}) {
  return (
    <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
      <CardContent className="p-6">
        <p className="text-sm font-semibold text-white">Order summary</p>
        <p className="mt-1 text-sm text-white/60">
          {itemCount} item{itemCount === 1 ? "" : "s"}
        </p>

        <Separator className="my-5 bg-white/10" />

        <div className="space-y-2 text-sm">
          {Object.entries(totals).length === 0 ? (
            <p className="text-white/60">Cart is empty.</p>
          ) : (
            Object.entries(totals).map(([currency, total]) => (
              <div key={currency} className="flex items-center justify-between">
                <span className="text-white/65">Total ({currency})</span>
                <span className="font-semibold text-white">
                  {currency === "Rs"
                    ? `Rs ${total.toFixed(0)}`
                    : `$${total.toFixed(2)}`}
                </span>
              </div>
            ))
          )}
        </div>

        <Separator className="my-5 bg-white/10" />

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-white/65">Payment</span>
            <span className="text-white/80">
              {payment === "cod" ? "Pay on delivery" : "Prepaid"}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="text-white/65">Address</span>
            <span className="max-w-[260px] text-right text-white/80">
              {address ? addressToString(address) : "—"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/65">Phone</span>
            <span className="text-white/80">{phone || "—"}</span>
          </div>
        </div>

        <AppButton
          className="w-full"
          variant="destructive"
          disabled={!canSubmit || isPending}
          onClick={onSubmit}
        >
          {isPending ? "Placing order..." : "Place order"}
        </AppButton>
      </CardContent>
    </Card>
  );
}
