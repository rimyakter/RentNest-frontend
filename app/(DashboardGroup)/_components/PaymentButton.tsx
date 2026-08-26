// app/dashboard/_components/PaymentButton.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { createCheckoutSession } from "@/service/paymentActions";

interface PaymentButtonProps {
  rentalRequestId: string;
  amount: number;
  disabled?: boolean;
}

export default function PaymentButton({
  rentalRequestId,
  amount,
  disabled = false,
}: PaymentButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    startTransition(async () => {
      setIsLoading(true);
      try {
        const result = await createCheckoutSession(rentalRequestId);

        if (!result.success) {
          toast.error(result.message || "Failed to initiate payment");
          return;
        }

        if (result.data?.checkoutUrl) {
          // Redirect to Stripe checkout
          window.location.href = result.data.checkoutUrl;
        } else {
          toast.error("No checkout URL received");
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Payment failed");
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isPending || isLoading}
      className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 size-4" />
          Pay ৳{amount.toLocaleString()}
        </>
      )}
    </Button>
  );
}
