"use client";

import { useActionState, useEffect } from "react";

import { registerAction } from "../_actions/authActions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ROLES = [
  { value: "TENANT", label: "Rent Properties" },
  { value: "LANDLORD", label: "List my properties" },
];

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card className="p-6">
      <form action={action} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Jane Renter"
            autoComplete="name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="At least 6 characters"
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        <fieldset className="space-y-2">
          <legend className="mb-2 text-sm leading-none font-medium">
            I want to
          </legend>

          <div className="grid grid-cols-2 gap-2">
            {ROLES.map(({ value, label }, i) => (
              <label
                key={value}
                className="press cursor-pointer rounded-lg border p-3 text-sm transition-colors duration-150 hover:bg-muted has-checked:border-primary has-checked:bg-primary/5">
                <input
                  type="radio"
                  name="role"
                  value={value}
                  defaultChecked={i === 0}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="press w-full">
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </Card>
  );
};

export default RegisterForm;
