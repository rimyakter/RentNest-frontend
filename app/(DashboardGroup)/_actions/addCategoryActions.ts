"use server";

import { api } from "@/lib/api";
import { ICategory } from "@/lib/type";

export const addCategory = async (
  name: string,
): Promise<ICategory | null> => {
  const result = await api<{ category: ICategory }>("/categories", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ name }),
  });

  return result.ok ? result.data.category : null;
};