"use server";

import { api } from "@/lib/api";
import { IProperty } from "@/lib/type";

export const getProperty = async (id: string): Promise<IProperty | null> => {
  const result = await api<IProperty>(`/properties/${id}`, {
    cache: "no-store",
  });

  return result.ok ? result.data : null;
};
