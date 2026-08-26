// app/_actions/paymentActions.ts
"use server";

import { api } from "@/lib/api";
import type { IPayment, ICheckoutResponse } from "@/lib/type";
import { revalidatePath } from "next/cache";

export const createCheckoutSession = async (
  rentalRequestId: string,
): Promise<{
  success: boolean;
  data?: ICheckoutResponse;
  message?: string;
}> => {
  try {
    const result = await api<ICheckoutResponse>(
      `/payments/checkout/${rentalRequestId}`,
      {
        method: "POST",
        auth: true,
      },
    );

    if (!result.ok) {
      return {
        success: false,
        message: result.message || "Failed to create checkout session",
      };
    }

    return {
      success: true,
      data: result.data,
      message: "Checkout session created successfully",
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const getMyPayments = async (): Promise<{
  success: boolean;
  data?: IPayment[];
  message?: string;
}> => {
  try {
    const result = await api<{ payments: IPayment[] }>("/payments/my", {
      method: "GET",
      auth: true,
    });

    if (!result.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch payments",
      };
    }

    return {
      success: true,
      data: result.data?.payments || [],
      message: "Payments fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching payments:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};
