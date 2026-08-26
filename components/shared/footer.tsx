import {  House } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <House className="size-4" />
          <span>&copy; {new Date().getFullYear()} RentNext</span>
        </div>

        <p className="text-xs text-muted-foreground/60">Built for Rent Properties</p>
      </div>
    </footer>
  );
}
