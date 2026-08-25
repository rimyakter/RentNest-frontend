"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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

    if (!trimmedName) return;

    startTransition(async () => {
      const result = isEditing
        ? await editCategory(category!.id, trimmedName)
        : await addCategory(trimmedName);

      if (!result) {
        console.error("Category update failed");
        return;
      }

      // Refresh Server Component data
      router.refresh();

      // Close modal
      onSuccess?.();

      // Only clear input when adding
      if (!isEditing) {
        setName("");
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
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onSuccess}
          disabled={isPending}
          className="rounded-md border px-4 py-2 text-sm">
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
          {isPending ? "Saving..." : isEditing ? "Update" : "Add Category"}
        </button>
      </div>
    </form>
  );
}
