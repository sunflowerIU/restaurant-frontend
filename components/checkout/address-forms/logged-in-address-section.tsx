"use client";

import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { LoggedInHeader } from "./headers";
import { SavedAddressList } from "./saved-address-list";
import { AddressEntryForm } from "./address-entry-form";
import type { Address } from "../../../lib/types/profile";
import type { CheckoutAddressForm } from "../../../lib/types/checkout.types";

export function LoggedInAddressSection({
  addresses,
  addressMode,
  onModeChange,
  selectedSavedId,
  onSelectSavedId,
  tempAddress,
  onTempChange,
}: {
  addresses: Address[];
  addressMode: "saved" | "temporary";
  onModeChange: (v: "saved" | "temporary") => void;
  selectedSavedId: string;
  onSelectSavedId: (id: string) => void;
  tempAddress: CheckoutAddressForm;
  onTempChange: (next: CheckoutAddressForm) => void;
}) {
  return (
    <>
      <LoggedInHeader />

      <Separator className="my-5 bg-white/10" />

      <Tabs
        value={addressMode}
        onValueChange={(v) => onModeChange(v as "saved" | "temporary")}
      >
        <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.03] p-2">
          <div className="flex w-max items-center gap-2">
            <TabsTrigger
              value="saved"
              className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
              disabled={addresses.length === 0}
            >
              Saved
            </TabsTrigger>
            <TabsTrigger
              value="temporary"
              className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
            >
              Temporary
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="saved" className="mt-4">
          <SavedAddressList
            addresses={addresses}
            selectedId={selectedSavedId}
            onSelect={onSelectSavedId}
          />
        </TabsContent>

        <TabsContent value="temporary" className="mt-4">
          <AddressEntryForm value={tempAddress} onChange={onTempChange} />
          <p className="mt-3 text-xs text-white/45">
            This address is used only for this order.
          </p>
        </TabsContent>
      </Tabs>
    </>
  );
}
