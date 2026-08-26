/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/payments/page.tsx
import { notFound } from "next/navigation";
import { getMe } from "@/service/getMe";
import { getMyPayments } from "@/service/paymentActions";
import PaymentsList from "../../_components/PaymentsList";

export default async function PaymentsPage() {
  const user = await getMe();

  if (!user) {
    notFound();
  }

  // Only tenants can view payments
  if (user.role !== "TENANT") {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="rounded-lg bg-yellow-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-yellow-800">
            Access Denied
          </h2>
          <p className="text-yellow-700">
            Only tenants can view their payment history.
          </p>
        </div>
      </div>
    );
  }

  let payments: any[] = [];
  let error = null;

  try {
    const result = await getMyPayments();
    if (result.success) {
      payments = result.data || [];
    } else {
      error = result.message;
    }
  } catch (err) {
    console.error("Error fetching payments:", err);
    error = err instanceof Error ? err.message : "An error occurred";
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800">
            Error Loading Payments
          </h2>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Payments</h1>
        <p className="text-muted-foreground">
          View your payment history and transaction details.
        </p>
      </div>

      <PaymentsList payments={payments} />
    </div>
  );
}
