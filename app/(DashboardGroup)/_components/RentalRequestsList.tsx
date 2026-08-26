// app/dashboard/_components/RentalRequestsList.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, HomeIcon, UserIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IRentalRequest } from "@/lib/type";
import ApproveRejectForm from "./ApproveRejectForm";

interface RentalRequestsListProps {
  requests: IRentalRequest[];
  userRole: string;
}

// Fixed: Use only valid Badge variants
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "PENDING":
      return "secondary";
    case "APPROVED":
      return "default"; // Changed from "success" to "default"
    case "REJECTED":
      return "destructive";
    case "ACTIVE":
      return "default";
    case "COMPLETED":
      return "outline";
    default:
      return "secondary";
  }
};

// Optional: Add custom styling for better visual distinction
const getStatusBadgeClassName = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-100";
    case "APPROVED":
      return "bg-green-100 text-green-800 border-green-300 hover:bg-green-100";
    case "REJECTED":
      return "bg-red-100 text-red-800 border-red-300 hover:bg-red-100";
    case "ACTIVE":
      return "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-100";
    case "COMPLETED":
      return "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-100";
    default:
      return "";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500";
    case "APPROVED":
      return "bg-green-500";
    case "REJECTED":
      return "bg-red-500";
    case "ACTIVE":
      return "bg-blue-500";
    case "COMPLETED":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

export default function RentalRequestsList({
  requests,
  userRole,
}: RentalRequestsListProps) {
  const [selectedRequest, setSelectedRequest] = useState<IRentalRequest | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApproveReject = (request: IRentalRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-muted p-4">
              <HomeIcon className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No Rental Requests</h3>
            <p className="text-sm text-muted-foreground">
              You don&apos;t have any rental requests for your properties yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Rental Requests</CardTitle>
          <CardDescription>
            {requests.length} request{requests.length > 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Move-in Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <HomeIcon className="size-4 text-muted-foreground" />
                        <span className="font-medium">
                          {request.property?.title || "Unknown Property"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserIcon className="size-4 text-muted-foreground" />
                        <span>{request.renter?.name || "Unknown Tenant"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="size-4 text-muted-foreground" />
                        <span>
                          {request.moveInDate
                            ? format(
                                new Date(request.moveInDate),
                                "MMM d, yyyy",
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {request.duration ? `${request.duration} months` : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-2 rounded-full ${getStatusColor(request.status)}`}
                        />
                        <Badge
                          variant={getStatusBadgeVariant(request.status)}
                          className={getStatusBadgeClassName(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {request.status === "PENDING" &&
                        userRole === "LANDLORD" && (
                          <Button
                            size="sm"
                            onClick={() => handleApproveReject(request)}>
                            Review
                          </Button>
                        )}
                      {request.status !== "PENDING" && (
                        <span className="text-sm text-muted-foreground">
                          {request.status === "APPROVED"
                            ? "Approved"
                            : request.status === "ACTIVE"
                              ? "Active"
                              : request.status === "COMPLETED"
                                ? "Completed"
                                : "Rejected"}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div>Showing {requests.length} requests</div>
          <div>
            {requests.filter((r) => r.status === "PENDING").length} pending
          </div>
        </CardFooter>
      </Card>

      {/* Approve/Reject Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Rental Request</DialogTitle>
            <DialogDescription>
              Approve or reject this rental request from{" "}
              {selectedRequest?.renter?.name}.
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Property
                  </p>
                  <p className="font-semibold">
                    {selectedRequest.property?.title}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tenant
                  </p>
                  <p className="font-semibold">
                    {selectedRequest.renter?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Move-in Date
                  </p>
                  <p className="font-semibold">
                    {selectedRequest.moveInDate
                      ? format(
                          new Date(selectedRequest.moveInDate),
                          "MMM d, yyyy",
                        )
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Duration
                  </p>
                  <p className="font-semibold">
                    {selectedRequest.duration
                      ? `${selectedRequest.duration} months`
                      : "N/A"}
                  </p>
                </div>
              </div>

              {selectedRequest.message && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Message
                  </p>
                  <p className="rounded-md bg-muted p-3 text-sm">
                    {selectedRequest.message}
                  </p>
                </div>
              )}

              <div className="rounded-md bg-yellow-50 p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Approving this request will notify the
                  tenant and proceed with the rental agreement.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="w-full sm:w-auto">
              Cancel
            </Button>
            {selectedRequest && (
              <ApproveRejectForm
                requestId={selectedRequest.id}
                onComplete={() => setIsDialogOpen(false)}
              />
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
