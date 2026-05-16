import AppButton from "@/components/AppButton";
import FieldHint from "@/components/profile/FieldHint";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PasswordState } from "@/lib/types/profile";

type PasswordTabProps = {
  pwdError: string | null;
  password: PasswordState;
  setPassword: React.Dispatch<React.SetStateAction<PasswordState>>;
  savingPassword: boolean;
  changePassword: (e: React.FormEvent) => Promise<void>;
};

export default function PasswordTab({
  pwdError,
  password,
  setPassword,
  savingPassword,
  changePassword,
}: PasswordTabProps) {
  return (
    <Card className="rounded-3xl border-white/10 bg-white/[0.03]">
      <CardContent className="p-6">
        <div className="mb-4">
          <p className="text-sm font-semibold text-white">Change password</p>
          <p className="mt-1 text-sm text-white/60">Use a strong password.</p>
        </div>

        {pwdError && (
          <div className="mb-4 rounded-2xl border border-red-300/30 bg-red-500/10 p-3 text-sm text-red-200">
            {pwdError}
          </div>
        )}

        <form onSubmit={changePassword} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="current" className="text-white/80">
              Current password
            </Label>
            <Input
              id="current"
              type="password"
              value={password.current}
              onChange={(e) =>
                setPassword((prev) => ({ ...prev, current: e.target.value }))
              }
              className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
              autoComplete="current-password"
            />
          </div>

          <div className="grid   items-start grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="new" className="text-white/80">
                New password
              </Label>
              <Input
                id="new"
                type="password"
                value={password.new}
                onChange={(e) =>
                  setPassword((prev) => ({ ...prev, new: e.target.value }))
                }
                className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                autoComplete="new-password"
              />
              <FieldHint>Minimum 8 characters.</FieldHint>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm" className="text-white/80">
                Confirm new password
              </Label>
              <Input
                id="confirm"
                type="password"
                value={password.confirm}
                onChange={(e) =>
                  setPassword((prev) => ({
                    ...prev,
                    confirm: e.target.value,
                  }))
                }
                className="h-11 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <AppButton variant="secondary" disabled={savingPassword}>
              {savingPassword ? "Updating..." : "Update password"}
            </AppButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
