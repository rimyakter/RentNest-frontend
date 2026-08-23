"use server";

import { api } from "@/lib/api";
import { IRentalRequest } from "@/lib/type";


export const getRentalRequest = async (
  id: string,
): Promise<IRentalRequest | null> => {
  const result = await api<{ rental: IRentalRequest }>(
    `/rentals/${id}`,
    {
      auth: true,
      cache: "no-store",
    },
  );

  return result.ok ? result.data.rental : null;
};