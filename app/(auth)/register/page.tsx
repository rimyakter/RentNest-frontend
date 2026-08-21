import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";
import { Car } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="hero-mesh flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="rise space-y-3 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10">
            <Car className="size-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Start renting in under a minute.</p>
        </div>

        <div className="rise mt-8" style={{ animationDelay: "60ms" }}>
          <RegisterForm />
        </div>

        <p className="rise mt-6 text-center text-sm text-muted-foreground" style={{ animationDelay: "120ms" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}