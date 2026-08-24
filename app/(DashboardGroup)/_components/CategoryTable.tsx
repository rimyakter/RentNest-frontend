"use client";

import { useState, useTransition } from "react";
import type { ICategory } from "@/lib/type";
import { removeCategory } from "../_actions/removeCategoryActions";
import CategoryForm from "./CategoryForm";

interface CategoryTableProps {
  categories: ICategory[];
}

export default function CategoryTable({ categories }: CategoryTableProps) {
  const [isPending, startTransition] = useTransition();

  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );

  const handleDelete = (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );

    if (!confirmed) return;

    startTransition(async () => {
      await removeCategory(id);
    });
  };

  if (!categories.length) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No categories found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead className="bg-muted">
            <tr className="border-b">
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>

              <th className="px-4 py-3 text-left text-sm font-medium">
                Properties
              </th>

              <th className="px-4 py-3 text-right text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">{category.name}</td>

                <td className="px-4 py-3">
                  {category._count?.properties ?? 0}
                </td>

                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingCategory(category)}
                      disabled={isPending}
                      className="rounded-md border px-3 py-1.5 text-sm">
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDelete(category.id, category.name)}
                      className="rounded-md bg-destructive px-3 py-1.5 text-sm text-destructive-foreground disabled:opacity-50">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setEditingCategory(null);
            }
          }}>
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-xl">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Edit Category</h2>

              <p className="text-sm text-muted-foreground">Update</p>
            </div>

            <CategoryForm
              category={editingCategory}
              onSuccess={() => setEditingCategory(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
