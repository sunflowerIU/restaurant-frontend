"use client";

import Link from "next/link";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";

import AppButton from "@/components/AppButton";
import {
  GuestAddressSection,
  LoggedInAddressSection,
} from "@/components/checkout/address-forms/address-forms";
import { CheckoutBackground } from "@/components/checkout/CheckoutBackground";
import { OrderSummaryCard } from "@/components/checkout/OrderSummary";
import { PaymentCard } from "@/components/checkout/PaymentCard";
import { useCheckoutState } from "@/hooks/useCheckoutState";
import { proceedCheckout } from "@/lib/ServerActions";
import { isValidNepalMobile, normalizeNepalPhone } from "@/lib/validators/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { User } from "../../lib/types/profile";
import { useAuth } from "../_providers/AuthProvider";
import { useCart } from "../_providers/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, count, totalByCurrency, clear } = useCart();
  const { user } = useAuth() as { user: User };

  const st = useCheckoutState(user, count);

  const [state, dispatchAction, isPending] = React.useActionState(
    proceedCheckout,
    null,
  );

  const summaryAddress = React.useMemo(() => {
    if (!st.isLoggedIn) {
      return {
        _id: "guest",
        label: st.guestAddress.label,
        addressLine: st.guestAddress.addressLine,
        city: st.guestAddress.city,
        notes: st.guestAddress.notes,
      };
    }
    return st.chosenAddress;
  }, [st]);

  async function submitOrder() {
    if (!st.canSubmit) {
      toast.error("Please complete address details before placing the order.");
      return;
    }

    const payload = {
      userId: user?.id ?? null,
      paymentMethod: st.payment,
      items: lines.map((l) => ({
        productId: l.id,
        name: l.name,
        qty: l.qty,
        currency: l.currency,
        imageSrc: l.imageSrc,
      })),
      fullName: user
        ? st.addressMode === "temporary"
          ? st.tempAddress.fullName
          : user.name
        : st.guestAddress.fullName,
      // totals: totalByCurrency,
      shippingAddress: summaryAddress,
      phone: st.isLoggedIn
        ? normalizeNepalPhone(st.tempAddress.phone || user?.phone || "")
        : normalizeNepalPhone(st.guestAddress.phone),
    };

    if (!isValidNepalMobile(payload.phone)) {
      return toast.error("Please enter valid phone number");
    }
    if (!payload.shippingAddress) {
      return toast.error("address required");
    }
    React.startTransition(() => {
      dispatchAction(payload);
    });
  }

  React.useEffect(() => {
    if (!state) return;

    //if there is no data and success = failed
    if (!state.success && !state.data) {
      toast.error(state.message);
      return;
    }

    if (state.success && st.payment === "cod") {
      clear();
    }

    //now redirect to redirect url
    router.replace(state.data.redirectUrl);
  }, [state, router, clear]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <CheckoutBackground />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-white/70 shadow-[0_0_18px_rgba(0,220,255,0.22)]" />
              Checkout
            </p>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Complete your order
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60 md:text-base">
              Choose delivery address and payment method.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <AppButton asChild variant="secondary">
              <Link href="/menu">Add more</Link>
            </AppButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* left */}
          <div className="lg:col-span-3 space-y-5">
            <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
              <CardContent className="p-6">
                {st.isLoggedIn ? (
                  <LoggedInAddressSection
                    addresses={st.savedAddresses}
                    addressMode={st.addressMode}
                    onModeChange={st.setAddressMode}
                    selectedSavedId={st.selectedSavedId}
                    onSelectSavedId={st.setSelectedSavedId}
                    tempAddress={st.tempAddress}
                    onTempChange={st.setTempAddress}
                  />
                ) : (
                  <GuestAddressSection
                    value={st.guestAddress}
                    onChange={st.setGuestAddress}
                  />
                )}
              </CardContent>
            </Card>

            <PaymentCard payment={st.payment} onChange={st.setPayment} />
          </div>

          {/* right */}
          <div className="lg:col-span-2">
            <OrderSummaryCard
              itemCount={count}
              totals={totalByCurrency}
              payment={st.payment}
              address={summaryAddress}
              phone={
                st.isLoggedIn
                  ? st.chosenPhone
                  : normalizeNepalPhone(st.guestAddress.phone)
              }
              canSubmit={st.canSubmit}
              onSubmit={submitOrder}
              isPending={isPending}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
