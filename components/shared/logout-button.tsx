"use client";

import { LogOut } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/(auth)/_actions/authActions";

export function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <form action={logoutAction}>
      <Button
        type="submit"
        size="sm"
        variant="outline"
        disabled={pending}
        className="press">
        <LogOut />
        <span className="hidden sm:inline">
          {pending ? "Signing out..." : "Logout"}
        </span>
      </Button>
    </form>
  );
}
