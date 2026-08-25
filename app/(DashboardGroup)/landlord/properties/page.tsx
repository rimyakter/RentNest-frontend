// app/(dashboard)/properties/page.tsx
import "server-only";
import { Suspense } from "react";
import { api } from "@/lib/api";
import type { ICategory, IProperty } from "@/lib/type";
import PropertiesClient from "../../_components/PropertiesClient";


export default async function PropertiesPage() {
  // Fetch properties and categories on the server using the api utility
  const [propertiesResult, categoriesResult] = await Promise.all([
    api<IProperty[]>("/properties", {
      method: "GET",
      auth: true,
    }),
    api<ICategory[]>("/categories", {
      method: "GET",
    }),
  ]);

  // Access data directly - your API returns the array
  const properties = propertiesResult.ok ? propertiesResult.data || [] : [];
  const categories = categoriesResult.ok ? categoriesResult.data || [] : [];

  // Handle error states
  if (!propertiesResult.ok) {
    console.error("Failed to fetch properties:", propertiesResult.message);
  }

  if (!categoriesResult.ok) {
    console.error("Failed to fetch categories:", categoriesResult.message);
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Properties</h1>
          <p className="text-sm text-muted-foreground">
            Manage your property listings
          </p>
        </div>
      </div>

      <Suspense fallback={<PropertiesLoading />}>
        <PropertiesClient
          initialProperties={properties}
          initialCategories={categories}
        />
      </Suspense>
    </div>
  );
}

// Loading component
function PropertiesLoading() {
  return (
    <div className="rounded-lg border p-8">
      <div className="space-y-3">
        <div className="h-8 w-full animate-pulse rounded bg-muted" />
        <div className="h-8 w-full animate-pulse rounded bg-muted" />
        <div className="h-8 w-full animate-pulse rounded bg-muted" />
        <div className="h-8 w-full animate-pulse rounded bg-muted" />
        <div className="h-8 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
