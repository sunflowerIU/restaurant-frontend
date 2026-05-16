import { PaymentGateway } from "@/lib/types/payment.types";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

export default function GatewayOption({
  id,
  value,
  selected,
  title,
  desc,
}: {
  id: string;
  value: PaymentGateway;
  selected: boolean;
  title: string;
  desc: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        selected
          ? "border-white/20 bg-white/[0.06]"
          : "border-white/10 bg-white/[0.02]",
      )}
    >
      <div className="flex items-start gap-3">
        <RadioGroupItem
          disabled={value === "khalti" ? true : false}
          id={id}
          value={value}
          className="mt-1 border-white/30 text-white"
        />
        <Label htmlFor={id} className="cursor-pointer">
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm text-white/60">{desc}</p>
          {value === "khalti" ? (
            <p className="mt-1 text-sm text-white">(Not available for now)</p>
          ) : (
            ""
          )}
        </Label>
      </div>
    </div>
  );
}
