// app/dashboard/_components/ApproveRejectForm.tsx
"use client";

import { useState, useTransition} from "react";
import { Button } from "@/components/ui/button";

import type { IRentalRequestStatus } from "@/lib/type";
import { updateRentalRequestAction } from "@/service/rentalRequestActions";


interface ApproveRejectFormProps {
  requestId: string;
  onComplete: () => void;
}

export default function ApproveRejectForm({
  requestId,
  onComplete,
}: ApproveRejectFormProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAction = async (status: IRentalRequestStatus) => {
    const formData = new FormData();
    formData.append("requestId", requestId);
    formData.append("status", status);

    startTransition(async () => {
      const result = await updateRentalRequestAction(
        { success: false, message: "" },
        formData,
      );

      setMessage(result.message);
      setSuccess(result.success);

      if (result.success) {
        // Close dialog after success
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          onClick={() => handleAction("APPROVED")}
          variant="default"
          disabled={isPending}
          className="flex-1">
          {isPending ? "Processing..." : "Approve"}
        </Button>

        <Button
          type="button"
          onClick={() => handleAction("REJECTED")}
          variant="destructive"
          disabled={isPending}
          className="flex-1">
          {isPending ? "Processing..." : "Reject"}
        </Button>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          onClick={() => handleAction("ACTIVE")}
          variant="outline"
          disabled={isPending}
          className="flex-1">
          {isPending ? "Processing..." : "Activate"}
        </Button>

        <Button
          type="button"
          onClick={() => handleAction("COMPLETED")}
          variant="secondary"
          disabled={isPending}
          className="flex-1">
          {isPending ? "Processing..." : "Complete"}
        </Button>
      </div>

      {message && (
        <p className={`text-sm ${success ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
