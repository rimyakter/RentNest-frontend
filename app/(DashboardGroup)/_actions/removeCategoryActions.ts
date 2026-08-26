// app/(DashboardGroup)/_actions/removeCategoryActions.ts
"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export const removeCategory = async (
  id: string,
  categoryName?: string,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const result = await api(`/categories/${id}`, {
      method: "DELETE",
      auth: true,
    });

    if (!result.ok) {
      return {
        success: false,
        message: result.message || "Failed to delete category",
      };
    }

    // Revalidate the categories page to reflect changes
    revalidatePath("/admin/categories");

    return {
      success: true,
      message: categoryName
        ? `Category "${categoryName}" deleted successfully`
        : "Category deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while deleting category",
    };
  }
};
