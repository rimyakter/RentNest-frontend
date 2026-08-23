"use server";

import { api } from "@/lib/api";
import { IPayment } from "@/lib/type";


export const getMyPayments = async (): Promise<IPayment[]> => {
  const result = await api<{ payments: IPayment[] }>("/payments/my", {
    auth: true,
    cache: "no-store",
  });

  return result.ok ? result.data.payments : [];
};