// app/_actions/rentalRequestActions.ts
"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import type { IRentalRequest, IFormState } from "@/lib/type";

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
      message: result.message || "Failed to update rental request",
    };
  }

  revalidatePath("/dashboard/rentals");
  revalidatePath("/dashboard/my-requests");

  return {
    success: true,
    message:
      status === "APPROVED"
        ? "Rental request approved successfully."
        : "Rental request rejected successfully.",
  };
};

// You can also add getRentalRequests here if needed
export const getRentalRequests = async (): Promise<IRentalRequest[]> => {
  const result = await api<IRentalRequest[]>("/rentals", {
    method: "GET",
    auth: true,
  });

  if (!result.ok) {
    throw new Error(result.message || "Failed to fetch rental requests");
  }

  return result.data || [] ;
};
