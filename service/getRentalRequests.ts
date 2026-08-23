"use server";

import { api } from "@/lib/api";
import { IRentalRequest } from "@/lib/type";


export const getRentalRequests = async (): Promise<IRentalRequest[]> => {
  const result = await api<{ rentals: IRentalRequest[] }>("/rentals", {
    auth: true,
    cache: "no-store",
  });

  return result.ok ? result.data.rentals : [];
};