"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";

export const removeCategory = async (id: string): Promise<boolean> => {
  const result = await api(`/categories/${id}`, {
    method: "DELETE",
    auth: true,
  });

  if (!result.ok) {
    return false;
  }

  revalidatePath("/admin/categories");

  return true;
};
