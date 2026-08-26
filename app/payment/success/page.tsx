// app/payment/success/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <CheckCircle2 className="size-16 text-green-500" />
          </div>
          <CardTitle className="mt-4 text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Your payment has been processed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
            <p>
              Your rental request has been activated. You can now move forward with your rental agreement.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/dashboard/my-requests">
              <Button className="w-full">View My Requests</Button>
            </Link>
            <Link href="/dashboard/payments">
              <Button variant="outline" className="w-full">View Payment History</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}