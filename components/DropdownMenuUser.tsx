"use client";
import { IceCreamBowl, LogOutIcon, UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import AppButton from "./AppButton";
import { NavigationAvatar } from "./NavigationAvatar";
import { useAuth } from "@/app/_providers/AuthProvider";
import { logoutUser } from "@/lib/auth-client";

export function DropdownMenuUser({
  mobileNav = false,
  onClose,
}: {
  mobileNav: boolean;
  onClose: () => void;
}) {
  const { setUser } = useAuth();
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
          <Link
            onClick={onClose}
            href="/profile"
            className="flex items-center gap-2"
          >
            <UserIcon className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            onClick={onClose}
            href="/orders"
            className="flex items-center gap-2"
          >
            <IceCreamBowl className="h-4 w-4" />
            <span>My Orders</span>
          </Link>
        </DropdownMenuItem>{" "}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logoutUser(setUser)}
          variant="destructive"
        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
