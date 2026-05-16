"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { PaymentMethod } from "../../lib/types/checkout.types";
import { useAuth } from "@/app/_providers/AuthProvider";

export function PaymentCard({
  payment,
  onChange,
}: {
  payment: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
}) {
  const uid = React.useId();
  const codId = `pay-cod-${uid}`;
  const prepaidId = `pay-prepaid-${uid}`;
  const { user } = useAuth();

  return (
    <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
      <CardContent className="p-6">
        <p className="text-sm font-semibold text-white">Payment</p>
        <p className="mt-1 text-sm text-white/60">
          Choose how you want to pay.
        </p>

        <Separator className="my-5 bg-white/10" />

        <RadioGroup
          value={payment}
          onValueChange={(v) => onChange(v as PaymentMethod)}
          className="grid gap-3"
        >
          <div
            className={cn(
              "rounded-2xl border p-4",
              payment === "cod"
                ? "border-white/20 bg-white/[0.06]"
                : "border-white/10 bg-white/[0.02]",
            )}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem
                id={codId}
                value="cod"
                className="mt-1 border-white/30 text-white"
              />
              <Label htmlFor={codId} className="cursor-pointer">
                <p className="text-sm font-semibold text-white">
                  Pay on delivery
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Pay when your order arrives.
                </p>
              </Label>
            </div>
          </div>

          <div
            className={cn(
              "rounded-2xl border p-4",
              payment === "prepaid"
                ? "border-white/20 bg-white/[0.06]"
                : "border-white/10 bg-white/[0.02]",
            )}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem
                disabled={user ? false : true}
                id={prepaidId}
                value="prepaid"
                className="mt-1 border-white/30 text-white"
              />
              <Label htmlFor={prepaidId} className="cursor-pointer">
                <p className="text-sm font-semibold text-white">Prepaid</p>
                <p className="mt-1 text-sm text-white/60">
                  {user ? "Pay now" : "Please login to pay now"}
                </p>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
