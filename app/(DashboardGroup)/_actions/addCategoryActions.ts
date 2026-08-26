// app/(DashboardGroup)/_actions/addCategoryActions.ts
"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import type { ICategory } from "@/lib/type";

export const addCategory = async (
  name: string,
): Promise<{ success: boolean; data?: ICategory; message?: string }> => {
  try {
    const result = await api<{ category: ICategory }>("/categories", {
      method: "POST",
      auth: true,
      body: JSON.stringify({ name }),
    });

    if (!result.ok) {
      return {
        success: false,
        message: result.message || "Failed to add category",
      };
    }

    revalidatePath("/admin/categories");

    return {
      success: true,
      data: result.data?.category,
      message: `Category "${name}" added successfully`,
    };
  } catch (error) {
    console.error("Error adding category:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while adding category",
    };
  }
};
