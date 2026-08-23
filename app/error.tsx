"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-sm text-muted-foreground text-pretty">
        The page failed to load. Try again in a moment.
      </p>

      <Button onClick={reset} className="press mt-2">
        Try again
      </Button>
    </main>
  );
}
