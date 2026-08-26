// app/dashboard/_components/MyRentalRequestsList.tsx
"use client";

import { format } from "date-fns";
import { CalendarIcon, HomeIcon, MapPinIcon, UserIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { IRentalRequest } from "@/lib/type";

interface MyRentalRequestsListProps {
  requests: IRentalRequest[];
}

// Update to use only valid Badge variants
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "PENDING":
      return "secondary"; // Changed from "default" to "secondary"
    case "APPROVED":
      return "default"; // Changed from "success" to "default" (or you can use "outline" with custom styling)
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

// Optional: Add custom styling for statuses
const getStatusClassName = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "APPROVED":
      return "bg-green-100 text-green-800 border-green-300";
    case "REJECTED":
      return "bg-red-100 text-red-800 border-red-300";
    case "ACTIVE":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "COMPLETED":
      return "bg-gray-100 text-gray-800 border-gray-300";
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

export default function MyRentalRequestsList({
  requests,
}: MyRentalRequestsListProps) {
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
              You haven&apos;t submitted any rental requests yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((request) => (
        <Card key={request.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">
                  {request.property?.title || "Unknown Property"}
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPinIcon className="size-3" />
                  {request.property?.address || "Address not available"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`size-2 rounded-full ${getStatusColor(request.status)}`}
                />
                <Badge
                  variant={getStatusBadgeVariant(request.status)}
                  className={getStatusClassName(request.status)}>
                  {request.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="size-4 text-muted-foreground" />
              <span>
                Move-in:{" "}
                {request.moveInDate
                  ? format(new Date(request.moveInDate), "MMM d, yyyy")
                  : "N/A"}
              </span>
            </div>

            {request.duration && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span>{request.duration} months</span>
              </div>
            )}

            {request.message && (
              <div className="mt-3 rounded-md bg-muted p-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {request.message}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserIcon className="size-4" />
              <span>Landlord: {request.property?.owner?.name || "N/A"}</span>
            </div>

            {request.property?.price && (
              <div className="mt-2 rounded-md bg-primary/5 p-2 text-center">
                <span className="text-sm font-semibold">
                  ৳{request.property.price.toLocaleString()}/month
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
