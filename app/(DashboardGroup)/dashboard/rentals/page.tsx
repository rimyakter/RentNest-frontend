// app/dashboard/rentals/page.tsx
import { notFound } from "next/navigation";
import { getMe } from "@/service/getMe";
import { getRentalRequests } from "@/service/getRentalRequests";
import RentalRequestsList from "../../_components/RentalRequestsList";

export default async function RentalsPage() {
  const user = await getMe();

  if (!user) {
    notFound();
  }

  // Only landlords and admins can view all rental requests
  if (user.role !== "LANDLORD" && user.role !== "ADMIN") {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="rounded-lg bg-yellow-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-yellow-800">
            Access Denied
          </h2>
          <p className="text-yellow-700">
            Only landlords and administrators can view rental requests.
          </p>
        </div>
      </div>
    );
  }

  // Fetch data outside try/catch
  let requests;
  let error = null;

  try {
    requests = await getRentalRequests();
    console.log("Fetched rental requests:", requests);
  } catch (err) {
    console.error("Error fetching rental requests:", err);
    error = err instanceof Error ? err.message : "An error occurred";
  }

  // Show error state if there was an error
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800">
            Error Loading Requests
          </h2>
          <p className="text-red-700">
            There was an error loading the rental requests. Please try again.
          </p>
        </div>
      </div>
    );
  }

  // Success state - render the component
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Rental Requests</h1>
        <p className="text-muted-foreground">
          Manage all rental requests for your properties
        </p>
      </div>

      <RentalRequestsList requests={requests || []} userRole={user.role} />
    </div>
  );
}
