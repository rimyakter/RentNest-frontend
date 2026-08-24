"use server";

import { revalidatePath } from "next/cache";

import { api } from "@/lib/api";
import { IFormState, IRentalRequest } from "@/lib/type";

export const createRentalRequestAction = async (
  prevState: IFormState,
  formData: FormData,
): Promise<IFormState> => {
  console.log("=== RENTAL ACTION ===");

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

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
      message: result.message,
    };
  }

  revalidatePath(`/properties/${propertyId}`);
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Rental request submitted successfully.",
  };
};

export const updateRentalRequestAction = async (
  prevState: IFormState,
  formData: FormData,
): Promise<IFormState> => {
  const requestId = formData.get("requestId");
  const status = formData.get("status");

  if (!requestId) {
    return {
      success: false,
      message: "Rental request ID is required.",
    };
  }

  if (status !== "APPROVED" && status !== "REJECTED") {
    return {
      success: false,
      message: "Invalid rental request status.",
    };
  }

  const result = await api<IRentalRequest>(`/rentals/${requestId}`, {
    method: "PUT",
    auth: true,
    body: JSON.stringify({
      status,
    }),
  });

  if (!result.ok) {
    return {
      success: false,
      message: result.message,
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/rentals");

  return {
    success: true,
    message:
      status === "APPROVED"
        ? "Rental request approved."
        : "Rental request rejected.",
  };
};
