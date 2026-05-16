"use client";
import { initiatePayment } from "@/lib/ServerActions";
import { PaymentInitiateSchema } from "@/lib/types/order";
import { OrderItem, PaymentGateway } from "@/lib/types/payment.types";
import { Address } from "@/lib/types/profile";
import Image from "next/image";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import AppButton from "../AppButton";
import { Card, CardContent } from "../ui/card";
import { RadioGroup } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import BadgeForStatus from "./BadgeForStatus";
import GatewayOption from "./GatewayOption";

function PaymentPage({
  order,
}: {
  order: {
    id: string;
    items: OrderItem[];
    phone: string;
    userId: string;
    createdAt: string;
    shippingAddress: Address;
    shippingFee: string;
    price: string;
    totalAmount: string;
  };
}) {
  const [gateway, setGateway] = React.useState<PaymentGateway>("esewa");
  const [state, dispatchAction, isPending] = useActionState(
    initiatePayment,
    null,
  );

  const formRef = useRef<HTMLFormElement>(null);

  //start payment function
  async function startPayment() {
    // console.log(order);
    const payload: PaymentInitiateSchema = {
      gateway,
      items: order.items,
      phone: order.phone,
      orderId: order.id,
    };

    // console.log(payload);
    startTransition(() => {
      dispatchAction(payload);
    });
  }

  useEffect(() => {
    if (state?.data.gateway === "esewa") {
      console.log(state.data);
      formRef.current?.submit();
    }
  }, [state]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* hidden esewa form */}
      {state?.data?.gateway === "esewa" && (
        <form ref={formRef} action={state.data.formAction} method="POST">
          {Object.entries(state.data.fields).map(([key, value]) => {
            return (
              <input
                key={key}
                type="hidden"
                name={key}
                value={`${value}`}
                required
              />
            );
          })}
        </form>
      )}

      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.92),rgba(2,6,12,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-white/70 shadow-[0_0_18px_rgba(0,220,255,0.22)]" />
              Payment
            </p>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Pay for your order
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Choose a payment method and complete checkout.
            </p>
          </div>

          <AppButton asChild href="/checkout" variant="destructive">
            Back to orders
          </AppButton>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* Left: order details */}
          <div className="lg:col-span-3">
            <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Order {order.id}
                    </p>
                    <p className="mt-1 text-sm text-white/60">
                      {new Date(order.createdAt).toString()}
                    </p>
                  </div>
                  <BadgeForStatus />
                </div>

                <Separator className="my-5 bg-white/10" />

                <div className="space-y-3">
                  {order.items.map((it) => (
                    <div
                      key={it.productId}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                          <Image
                            src={it.imageSrc}
                            alt={it.name}
                            fill
                            className="object-contain p-2"
                            sizes="56px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            {it.name}
                          </p>
                          <div className="flex   gap-2">
                            <p className="mt-1 text-xs text-white/55">
                              Qty: {it.qty}
                            </p>
                            <p className="mt-1 text-xs text-white/55">
                              price: {it.price}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Rs. {+it.price * it.qty}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="my-5 bg-white/10" />

                <div className="grid gap-3 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-white/65">Delivery</span>
                    <span className="max-w-[360px] text-right text-white/80">
                      {order.shippingAddress.addressLine +
                        "-" +
                        order.shippingAddress.city +
                        " / " +
                        order.shippingAddress.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/65">Phone</span>
                    <span className="text-white/80">{order.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/65">Shipping Fee</span>
                    <span className="text-white/80">
                      Rs. {order.shippingFee}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/65">Total</span>
                    <span className="text-white/80">
                      Rs. {order.totalAmount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: gateway selection + totals */}
          <div className="lg:col-span-2">
            <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
              <CardContent className="p-6">
                <p className="text-sm font-semibold text-white">
                  Payment method
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Choose eSewa or Khalti.
                </p>

                <Separator className="my-5 bg-white/10" />

                <RadioGroup
                  value={gateway}
                  onValueChange={(v) => setGateway(v as PaymentGateway)}
                  className="grid gap-3"
                >
                  <GatewayOption
                    id="pay-esewa"
                    value="esewa"
                    selected={gateway === "esewa"}
                    title="eSewa"
                    desc="Pay using eSewa wallet."
                  />
                  <GatewayOption
                    id="pay-khalti"
                    value="khalti"
                    selected={gateway === "khalti"}
                    title="Khalti"
                    desc="Pay using Khalti wallet."
                  />
                </RadioGroup>

                <Separator className="my-5 bg-white/10" />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/65">Total </span>
                    <span className="font-semibold text-white">
                      Rs. {order.totalAmount}
                    </span>
                  </div>
                </div>

                <AppButton
                  variant="secondary"
                  className="mt-6 w-full rounded-2xl"
                  onClick={startPayment}
                  disabled={isPending}
                >
                  {isPending
                    ? "Redirecting..."
                    : gateway === "esewa"
                      ? "Pay with esewa"
                      : "Pay with khalti"}
                </AppButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaymentPage;
