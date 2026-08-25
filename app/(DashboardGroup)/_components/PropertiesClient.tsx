// app/(dashboard)/properties/_components/PropertiesClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ICategory, IProperty } from "@/lib/type";
import PropertyTable from "./PropertyTable";
import PropertyForm from "./PropertyForm";
import { Plus } from "lucide-react";

interface PropertiesClientProps {
  initialProperties: IProperty[];
  initialCategories: ICategory[];
}

export default function PropertiesClient({
  initialProperties,
  initialCategories,
}: PropertiesClientProps) {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [properties, setProperties] = useState(initialProperties);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshProperties = async () => {
    setIsRefreshing(true);
    try {
      // Use the API route to refresh data
      const response = await fetch("/api/properties");
      const data = await response.json();
      if (data.ok) {
        setProperties(data.properties || []);
      }
      router.refresh(); // Refresh server components
    } catch (error) {
      console.error("Failed to refresh properties:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          disabled={isRefreshing}
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </button>
      </div>

      <PropertyTable
        properties={properties}
        categories={initialCategories}
        onPropertyChange={refreshProperties}
      />

      {/* Add Property Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAddModalOpen(false);
            }
          }}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-background p-6 shadow-xl">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Add New Property</h2>
              <p className="text-sm text-muted-foreground">
                Fill in the details to list your property
              </p>
            </div>

            <PropertyForm
              categories={initialCategories}
              onSuccess={() => {
                setIsAddModalOpen(false);
                refreshProperties();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
