"use client";

import AccountTab from "@/components/profile/AccountTab";
import AddressesTab from "@/components/profile/AddressesTab";
import PasswordTab from "@/components/profile/PasswordTab";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfilePage } from "@/hooks/useProfilePage";

export default function ProfilePageClient() {
  const {
    user,
    setUser,
    savingProfile,
    saveProfile,
    savingPassword,
    password,
    setPassword,
    pwdError,
    changePassword,
    addresses,
    newAddress,
    setNewAddress,
    addAddress,
    removeAddress,
    updatingAddress,
  } = useProfilePage();

  if (!user) {
    return null;
  }
  // console.log(optimisticAddress);
  return (
    <main className="relative min-h-screen overflow-hidden lg:max-h-screen">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,12,0.92),rgba(2,6,12,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,220,255,0.10),transparent_56%),radial-gradient(820px_circle_at_85%_18%,rgba(160,70,255,0.10),transparent_58%),radial-gradient(900px_circle_at_55%_95%,rgba(255,120,60,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_40%,transparent_35%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <ProfileHeader />

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.03] p-2">
            <div className="flex w-max items-center gap-2">
              <TabsTrigger
                value="account"
                className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
              >
                Password
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="shrink-0 rounded-xl px-4 py-2 text-white/70 data-[state=active]:bg-white/[0.10] data-[state=active]:text-white"
              >
                Addresses
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="account" className="mt-5">
            <AccountTab
              user={user}
              setUser={setUser}
              savingProfile={savingProfile}
              saveProfile={saveProfile}
            />
          </TabsContent>

          <TabsContent value="security" className="mt-5">
            <PasswordTab
              pwdError={pwdError}
              password={password}
              setPassword={setPassword}
              savingPassword={savingPassword}
              changePassword={changePassword}
            />
          </TabsContent>

          <TabsContent value="addresses" className="mt-5">
            <AddressesTab
              addresses={addresses}
              newAddress={newAddress}
              setNewAddress={setNewAddress}
              addAddress={addAddress}
              removeAddress={removeAddress}
              updatingAddress={updatingAddress}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
