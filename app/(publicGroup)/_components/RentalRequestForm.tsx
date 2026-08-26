// app/(publicGroup)/_components/RentalRequestForm.tsx
"use client";

import { useActionState } from "react";

import type { IProperty } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Add this import - make sure the path is correct
import { createRentalRequestAction } from "@/app/(publicGroup)/_actions/rentalRequestActions";

const initialState = {
  success: false,
  message: "",
};

const RentalRequestForm = ({ property }: { property: IProperty }) => {
  const [state, formAction, pending] = useActionState(
    createRentalRequestAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5 py-6">
      <input type="hidden" name="propertyId" value={property.id} />

      <div className="space-y-2">
        <label htmlFor="moveInDate" className="text-sm font-medium">
          Move-in date
        </label>

        <Input id="moveInDate" name="moveInDate" type="date" required />
      </div>

      <div className="space-y-2">
        <label htmlFor="duration" className="text-sm font-medium">
          Lease duration
        </label>

        <Input
          id="duration"
          name="duration"
          type="number"
          min={1}
          placeholder="e.g. 12"
        />

        <p className="text-xs text-muted-foreground">Duration in months</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>

        <textarea
          id="message"
          name="message"
          placeholder="Write a message to the landlord..."
          rows={4}
          className="border-input bg-background flex min-h-20 w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {state.message && (
        <p
          className={
            state.success
              ? "text-sm text-green-600"
              : "text-sm text-destructive"
          }>
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending || state.success}
        className="w-full">
        {pending
          ? "Submitting..."
          : state.success
            ? "Request Submitted"
            : "Request to Rent"}
      </Button>
    </form>
  );
};

export default RentalRequestForm;