// app/(publicGroup)/_actions/rentalRequestActions.ts
"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import type { IRentalRequest, IFormState } from "@/lib/type";

// This is the action for creating rental requests (used by tenants)
export const createRentalRequestAction = async (
  prevState: IFormState,
  formData: FormData,
): Promise<IFormState> => {
  console.log("=== CREATING RENTAL REQUEST ===");

  const propertyId = formData.get("propertyId");
  const moveInDate = formData.get("moveInDate");
  const duration = formData.get("duration");
  const message = formData.get("message");

  console.log({
    propertyId,
    moveInDate,
    duration,
    message,
  });

  if (!propertyId) {
    return {
      success: false,
      message: "Property is required.",
    };
  }

  if (!moveInDate) {
    return {
      success: false,
      message: "Move-in date is required.",
    };
  }

  const result = await api<IRentalRequest>("/rentals", {
    method: "POST",
    auth: true,
    body: JSON.stringify({
      propertyId,
      moveInDate,
      duration: duration ? Number(duration) : undefined,
      message: message || undefined,
    }),
  });

  if (!result.ok) {
    return {
      success: false,
      message: result.message || "Failed to submit rental request",
    };
  }

  revalidatePath(`/properties/${propertyId}`);
  revalidatePath("/dashboard/my-requests");

  return {
    success: true,
    message: "Rental request submitted successfully.",
  };
};
