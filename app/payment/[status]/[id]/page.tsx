import AppButton from "@/components/AppButton";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ status: string; id: string }>;
}) {
  const statusType = ["success", "failed"];

  const { status, id } = await params;
  if (!statusType.includes(status)) {
    return notFound();
  }
  //   console.log(await params);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/order/check/${id}`,
  );

  if (!response.ok) return notFound();

  const { data } = await response.json();

  if (data.paymentStatus !== "paid") return notFound();
  //check if order exists and is paid

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
            ✅
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Payment successful and Order placed successfully
          </h1>

          <p className="mt-3 text-sm text-white/65 sm:text-base">
            Thank you for your order. We have received your request and will
            start processing it shortly.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Order ID
            </p>
            <p className="mt-2 break-all text-lg font-medium text-white">
              {id}
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
