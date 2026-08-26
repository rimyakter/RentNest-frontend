// app/(DashboardGroup)/_actions/editCategoryActions.ts
"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import type { ICategory } from "@/lib/type";

export const editCategory = async (
  id: string,
  name: string,
): Promise<{ success: boolean; data?: ICategory; message?: string }> => {
  try {
    const result = await api<{ category: ICategory }>(`/categories/${id}`, {
      method: "PUT",
      auth: true,
      body: JSON.stringify({ name }),
    });

    console.log("EDIT RESULT:", result);

    if (!result.ok) {
      return {
        success: false,
        message: result.message || "Failed to update category",
      };
    }

    revalidatePath("/admin/categories");

    return {
      success: true,
      data: result.data?.category,
      message: `Category updated to "${name}" successfully`,
    };
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while updating category",
    };
  }
};
