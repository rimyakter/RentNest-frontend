/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(DashboardGroup)/_components/CategoryTable.tsx
"use client";

import { useState } from "react";
import type { ICategory } from "@/lib/type";
import { Pencil, Trash2 } from "lucide-react";
import CategoryForm from "./CategoryForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface CategoryTableProps {
  categories: ICategory[];
  properties?: any[];
  onPropertyChange?: (categoryId: string) => void;
}

export default function CategoryTable({
  categories,
  properties = [],
}: CategoryTableProps) {
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [deletingCategory, setDeletingCategory] = useState<ICategory | null>(
    null,
  );

  const hasProperties = properties && properties.length > 0;

  const handleDeleteClick = (category: ICategory) => {
    setDeletingCategory(category);
  };

  const handleDeleteClose = () => {
    setDeletingCategory(null);
  };

  if (categories.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No categories found. Create your first category!
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                {hasProperties && (
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Properties
                  </th>
                )}
                <th className="px-4 py-3 text-right text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">{category.name}</td>
                  {hasProperties && (
                    <td className="px-4 py-3 text-sm">
                      {category._count?.properties || 0}
                    </td>
                  )}
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="mr-2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category)}
                      className="rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Edit Category</h2>
            <CategoryForm
              category={editingCategory}
              onSuccess={() => setEditingCategory(null)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCategory && (
        <DeleteConfirmationModal
          categoryId={deletingCategory.id}
          categoryName={deletingCategory.name}
          isOpen={!!deletingCategory}
          onClose={handleDeleteClose}
        />
      )}
    </>
  );
}