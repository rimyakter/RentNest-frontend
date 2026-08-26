/* eslint-disable react/no-unescaped-entities */
// app/payment/cancel/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <XCircle className="size-16 text-yellow-500" />
          </div>
          <CardTitle className="mt-4 text-2xl">Payment Cancelled</CardTitle>
          <CardDescription>Your payment was not completed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
            <p>
              You cancelled the payment process. You can try again when you're
              ready.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/dashboard/my-requests">
              <Button className="w-full">Go to My Requests</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Browse Properties
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
