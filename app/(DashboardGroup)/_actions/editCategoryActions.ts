"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import { ICategory } from "@/lib/type";

export const editCategory = async (
  id: string,
  name: string,
): Promise<ICategory | null> => {
  const result = await api<{ category: ICategory }>(`/categories/${id}`, {
    method: "PUT",
    auth: true,
    body: JSON.stringify({ name }),
  });

  console.log("EDIT RESULT:", result);

  if (!result.ok) {
    return null;
  }

  revalidatePath("/admin/categories");

  return result.data.category;
};
