import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-3xl font-bold tracking-tight">Nothing here</h1>
      <p className="max-w-sm text-muted-foreground text-pretty">
        This page doesn&apos;t exist, or your role doesn&apos;t have access to
        it.
      </p>

      <Link href="/" className="mt-2">
        <Button className="press">Back home</Button>
      </Link>
    </main>
  );
}
