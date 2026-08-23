"use server";

import { api } from "@/lib/api";
import type { IProperty } from "@/lib/type";

export const getProperties = async (): Promise<IProperty[]> => {
  const result = await api<IProperty[]>("/properties", {
    cache: "no-store",
  });

  return result.ok ? result.data : [];
};
