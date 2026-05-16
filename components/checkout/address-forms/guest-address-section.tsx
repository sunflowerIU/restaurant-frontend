"use client";

import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import AppButton from "@/components/AppButton";
import type { CheckoutAddressForm } from "../../../lib/types/checkout.types";
import { AddressEntryForm } from "./address-entry-form";
import { GuestHeader } from "./headers";

export function GuestAddressSection({
  value,
  onChange,
}: {
  value: CheckoutAddressForm;
  onChange: (next: CheckoutAddressForm) => void;
}) {
  return (
    <>
      <GuestHeader
        right={
          <AppButton asChild variant="secondary">
            <Link href="/login">Login</Link>
          </AppButton>
        }
      />

      <Separator className="my-5 bg-white/10" />

      <AddressEntryForm value={value} onChange={onChange} />
    </>
  );
}
