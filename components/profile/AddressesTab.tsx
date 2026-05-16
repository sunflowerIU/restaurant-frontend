import AppButton from "@/components/AppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Address, NewAddressInput } from "@/lib/types/profile";

type AddressesTabProps = {
  addresses: Address[];
  newAddress: NewAddressInput;
  setNewAddress: React.Dispatch<React.SetStateAction<NewAddressInput>>;
  addAddress: (e: React.FormEvent) => void;
  removeAddress: (id: string) => void;
  updatingAddress: boolean;
};

export default function AddressesTab({
  addresses,
  newAddress,
  setNewAddress,
  addAddress,
  removeAddress,
  updatingAddress,
}: AddressesTabProps) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
      <Card className="rounded-3xl border-white/10 bg-white/[0.03] lg:col-span-2">
        <CardContent className="p-6">
          <p className="text-sm font-semibold text-white">Add address</p>
          <p className="mt-1 text-sm text-white/60">For faster delivery.</p>

          <form onSubmit={addAddress} className="mt-4 grid gap-4">
            <div className="grid gap-2">
              <Label className="text-white/80" htmlFor="label">
                Label
              </Label>
              <Input
                id="label"
                value={newAddress.label}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    label: e.target.value,
                  }))
                }
                className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                placeholder="Home / Work"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-white/80" htmlFor="line1">
                Address line
              </Label>
              <Input
                id="line1"
                value={newAddress.addressLine}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    addressLine: e.target.value,
                  }))
                }
                className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                placeholder="Street, area"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-white/80" htmlFor="city">
                City
              </Label>
              <Input
                id="city"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                placeholder="Kathmandu"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-white/80" htmlFor="notes">
                Notes (optional)
              </Label>
              <Input
                id="notes"
                value={newAddress.notes || ""}
                onChange={(e) =>
                  setNewAddress((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                placeholder="Gate, landmark..."
              />
            </div>

            <AppButton disabled={updatingAddress} variant="secondary">
              Add
            </AppButton>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-white/10 bg-white/[0.03] lg:col-span-3">
        <CardContent className="p-6">
          <p className="text-sm font-semibold text-white">Saved addresses</p>
          <p className="mt-1 text-sm text-white/60">{addresses.length} saved</p>

          <div className="mt-5 grid gap-3">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {address.label}
                    </p>
                    <p className="mt-1 text-sm text-white/65">
                      {address.addressLine}
                    </p>
                    <p className="mt-1 text-sm text-white/65">{address.city}</p>
                    {address.notes ? (
                      <p className="mt-2 text-xs text-white/50">
                        {address.notes}
                      </p>
                    ) : null}
                  </div>

                  <AppButton
                    variant="destructive"
                    onClick={() => removeAddress(address._id)}
                  >
                    Remove
                  </AppButton>
                </div>
              </div>
            ))}

            {addresses.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-white/60">
                No saved addresses.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
