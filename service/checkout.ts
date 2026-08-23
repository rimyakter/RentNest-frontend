"use server";

import { api } from "@/lib/api";

export const checkout = async (
  rentalRequestId: string,
): Promise<string | null> => {
  const result = await api<{ paymentUrl: string }>(
    `/payments/checkout/${rentalRequestId}`,
    {
      method: "POST",
      auth: true,
    },
  );

  return result.ok ? result.data.paymentUrl : null;
};