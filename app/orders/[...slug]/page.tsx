import AppButton from "@/components/AppButton";
import { notFound, redirect, RedirectType } from "next/navigation";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug[0] !== "success" || !slug[1]) return notFound();

  //check if order exists with that order id
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/order/check/${slug[1]}`,
  );

  await response.json();

  if (!response.ok) {
    return notFound();
  }

  async function handleClick() {
    "use server";
    redirect("/", RedirectType.replace);
  }

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
            Order placed successfully
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
              {slug[1]}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <form action={handleClick}>
              <AppButton variant="destructive">Back to home</AppButton>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
