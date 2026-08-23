"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      data-active={isActive || undefined}
      className={cn(
        "press relative rounded-md px-3 py-1.5 text-sm text-muted-foreground",
        "transition-colors duration-150 hover:text-foreground",
        "data-active:text-foreground data-active:font-medium",
      )}>
      {children}
      {isActive && (
        <span className="absolute inset-x-3 -bottom-px h-px bg-foreground" />
      )}
    </Link>
  );
}
