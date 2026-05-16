"use client";

export function CheckoutBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.92),rgba(2,6,12,0.98))]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.05),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
    </div>
  );
}
