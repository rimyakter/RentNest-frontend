"use server";

import { api } from "@/lib/api";
import { ICategory } from "@/lib/type";

export const getCategory = async (id: string): Promise<ICategory | null> => {
  const result = await api<ICategory>(`/categories/${id}`, {
    cache: "no-store",
  });

  return result.ok ? result.data : null;
};
