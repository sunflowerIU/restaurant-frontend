"use client";

import * as React from "react";

export function LoggedInHeader() {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-white">Delivery address</p>
        <p className="mt-1 text-sm text-white/60">
          Select a saved address or use a temporary one for this order.
        </p>
      </div>
    </div>
  );
}

export function GuestHeader({ right }: { right?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-white">Delivery address</p>
        <p className="mt-1 text-sm text-white/60">
          Enter your address and phone number.
        </p>
      </div>
      {right}
    </div>
  );
}
