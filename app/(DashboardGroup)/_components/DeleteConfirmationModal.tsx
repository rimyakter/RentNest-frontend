// app/(DashboardGroup)/_components/DeleteConfirmationModal.tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { X } from "lucide-react";
import { removeCategory } from "../_actions/removeCategoryActions";

interface DeleteConfirmationModalProps {
  categoryId: string;
  categoryName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteConfirmationModal({
  categoryId,
  categoryName,
  isOpen,
  onClose,
}: DeleteConfirmationModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await removeCategory(categoryId);

        if (!result.success) {
          toast.error(result.message || "Failed to delete category");
          return;
        }

        toast.success(result.message || "Category deleted successfully");
        router.refresh();
        onClose();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An error occurred",
        );
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Delete Category</h2>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-muted">
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete the category{" "}
            <strong className="text-foreground">{categoryName}</strong>?
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-md border px-4 py-2 text-sm hover:bg-muted">
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-md bg-destructive px-4 py-2 text-sm text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50">
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
