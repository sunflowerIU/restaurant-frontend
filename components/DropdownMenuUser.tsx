"use client";
import {
  CreditCardIcon,
  IceCreamBowl,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppButton from "./AppButton";
import { NavigationAvatar } from "./NavigationAvatar";
import Link from "next/link";

export function DropdownMenuUser({
  mobileNav = false,
}: {
  mobileNav: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AppButton>
          <NavigationAvatar />
          {mobileNav ? "My Profile" : ""}
        </AppButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <IceCreamBowl className="h-4 w-4" />
            <span>My Orders</span>
          </Link>
        </DropdownMenuItem>{" "}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
