// app/(DashboardGroup)/_components/CategoryForm.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ICategory } from "@/lib/type";
import { addCategory } from "../_actions/addCategoryActions";
import { editCategory } from "../_actions/editCategoryActions";

interface CategoryFormProps {
  category?: ICategory;
  onSuccess?: () => void;
}

export default function CategoryForm({
  category,
  onSuccess,
}: CategoryFormProps) {
  const router = useRouter();

  const [name, setName] = useState(category?.name ?? "");
  const [isPending, startTransition] = useTransition();

  const isEditing = Boolean(category);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Category name is required");
      return;
    }

    startTransition(async () => {
      try {
        const result = isEditing
          ? await editCategory(category!.id, trimmedName)
          : await addCategory(trimmedName);

        if (!result.success) {
          toast.error(
            result.message ||
              (isEditing
                ? "Failed to update category"
                : "Failed to add category"),
          );
          return;
        }

        toast.success(
          result.message ||
            (isEditing
              ? "Category updated successfully"
              : "Category added successfully"),
        );

        // Refresh Server Component data
        router.refresh();

        // Close modal
        onSuccess?.();

        // Only clear input when adding
        if (!isEditing) {
          setName("");
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An error occurred",
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="category-name" className="text-sm font-medium">
          Category name
        </label>

        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Apartment"
          disabled={isPending}
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onSuccess}
          disabled={isPending}
          className="rounded-md border px-4 py-2 text-sm hover:bg-muted">
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
          {isPending ? "Saving..." : isEditing ? "Update" : "Add Category"}
        </button>
      </div>
    </form>
  );
}
