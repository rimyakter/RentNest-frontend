/* eslint-disable react/no-unescaped-entities */
// app/dashboard/_components/PaymentsList.tsx
"use client";

import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  Clock,
  XCircle,
  Home,
  Calendar,
  DollarSign,
} from "lucide-react";
import type { IPayment } from "@/lib/type";

interface PaymentsListProps {
  payments: IPayment[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      );
    case "PENDING":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      );
    case "FAILED":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return <CheckCircle className="size-5 text-green-500" />;
    case "PENDING":
      return <Clock className="size-5 text-yellow-500" />;
    case "FAILED":
      return <XCircle className="size-5 text-red-500" />;
    default:
      return null;
  }
};

export default function PaymentsList({ payments }: PaymentsListProps) {
  if (payments.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-muted p-4">
              <DollarSign className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No Payments Found</h3>
            <p className="text-sm text-muted-foreground">
              You haven't made any payments yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>
          {payments.length} payment{payments.length > 1 ? "s" : ""} found
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transaction ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Home className="size-4 text-muted-foreground" />
                      <span className="font-medium">
                        {payment.rentalRequest?.property?.title ||
                          "Unknown Property"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="size-4 text-muted-foreground" />
                      <span className="font-semibold">
                        ৳{payment.amount.toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-muted-foreground" />
                      <span>
                        {payment.createdAt
                          ? format(new Date(payment.createdAt), "MMM d, yyyy")
                          : "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{payment.method}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      {getStatusBadge(payment.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-muted-foreground">
                      {payment.transactionId.slice(0, 12)}...
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
