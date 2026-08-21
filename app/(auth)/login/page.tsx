import { Suspense } from "react";
import Link from "next/link";
import { Car } from "lucide-react";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <main className="hero-mesh flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="rise space-y-3 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10">
            <Car className="size-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage your bookings.</p>
        </div>

        <div className="rise mt-8" style={{ animationDelay: "60ms" }}>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

        <p className="rise mt-6 text-center text-sm text-muted-foreground" style={{ animationDelay: "120ms" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}