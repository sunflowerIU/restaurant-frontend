"use client";

import AppButton from "@/components/AppButton";
import Spinner from "@/components/Spinner";
import { useApiFetch } from "@/lib/authorization/api";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const apiFetch = useApiFetch();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const statusType = ["success", "failure"];
  const gatewayType = ["esewa", "khalti"];
  const {
    status,
    id: paymentId,
    gateway,
  } = useParams() as { status: string; id: string; gateway: string };

  const paymentResponse = useSearchParams().get("data");

  //guard
  if (
    !statusType.includes(status) ||
    !gatewayType.includes(gateway) ||
    !paymentResponse
  ) {
    return notFound();
  }
  // console.log(status, paymentId, paymentResponse, gateway);

  // if (data.paymentStatus !== "paid") return notFound();
  //check if order exists and is paid

  useEffect(() => {
    async function verifyPayment() {
      //verify payment
      try {
        const response = await apiFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/${gateway}/${status}/${paymentId}?data=${paymentResponse}`,
          {},
        );
        const data = await response.json();
        // console.log(data);
        if (data.success) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      } catch (error) {
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    }
    verifyPayment();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.92),rgba(2,6,12,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-14 sm:px-6">
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 text-3xl">
            {isSuccess ? "✅" : "❌"}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {isSuccess
              ? "Payment successful and Order placed successfully"
              : "Payment failed"}
          </h1>

          <p className="mt-3 text-sm text-white/65 sm:text-base">
            {isSuccess
              ? "Thank you for your order. We have received your request and will start processing it shortly"
              : "Please try again"}
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Order ID
            </p>
            <p className="mt-2 break-all text-lg font-medium text-white">
              {paymentId}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <AppButton href="/" variant="destructive">
              Back to home
            </AppButton>
          </div>
        </div>
      </div>
    </main>
  );
}
