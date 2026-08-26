import Link from "next/link";
import { CreditCard, TableProperties } from "lucide-react";
import { getMe } from "@/service/getMe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavLink } from "./nav-link";
import ThemeToggle from "./theme-toggle";
import { LogoutButton } from "./logout-button";

export async function Navbar() {
  const user = await getMe();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4">
        <Link
          href="/"
          className="press flex items-center gap-2 pr-2 font-semibold tracking-tight">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
            <TableProperties className="size-4 text-primary" />
          </div>
          <span className="hidden sm:inline">RentNext</span>
        </Link>

        <div className="flex items-center gap-0.5">
          {user && <NavLink href="/dashboard">Dashboard</NavLink>}
          {user?.role === "TENANT" && (
            <NavLink href="/dashboard/payments">Payments</NavLink>
          )}

          {user?.role === "LANDLORD" && (
            <NavLink href="/landlord/properties">Properties</NavLink>
          )}
          {user?.role === "ADMIN" && (
            <>
              <NavLink href="/admin/users">Users</NavLink>
              <NavLink href="/admin/categories">Categories</NavLink>
            </>
          )}
          {user?.role === "TENANT" && (
            <NavLink href="/dashboard/my-requests">My Rental Requests</NavLink>
          )}

          {(user?.role === "LANDLORD" || user?.role === "ADMIN") && (
            <NavLink href="/dashboard/rentals">Manage Rental Requests</NavLink>
          )}
          {user?.role === "TENANT" && (
            <Link
              href="/dashboard/payments"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground">
              <CreditCard className="size-4" />
              My Payments
            </Link>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="text-sm font-medium">{user.name}</span>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-0">
                  {user.role}
                </Badge>
              </div>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button size="sm" variant="ghost" className="press">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="press">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
