// app/properties/_components/PropertyTable.tsx (updated with onPropertyChange)
"use client";

import { useState, useTransition } from "react";
import type { ICategory, IProperty } from "@/lib/type";
import { removeProperty } from "../_actions/removePropertyActions";
import PropertyForm from "./PropertyForm";
import Image from "next/image";

interface PropertyTableProps {
  properties: IProperty[];
  categories: ICategory[];
  onPropertyChange?: () => void;
}

export default function PropertyTable({
  properties,
  categories,
  onPropertyChange,
}: PropertyTableProps) {
  const [isPending, startTransition] = useTransition();
  const [editingProperty, setEditingProperty] = useState<IProperty | null>(
    null,
  );

  const handleDelete = (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`,
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await removeProperty(id);
      if (!result) {
        console.error("Failed to delete property");
        return;
      }
      // Refresh data
      onPropertyChange?.();
    });
  };

  if (!properties.length) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No properties found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Location
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  Beds
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  Baths
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Category
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {properties.map((property) => (
                <tr
                  key={property.id}
                  className="border-b last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-3">
                    {property.image ? (
                      <div className="relative h-12 w-12 overflow-hidden rounded-md">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          No img
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-medium">{property.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {property.description}
                    </div>
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    ${property.price.toLocaleString()}
                    <div className="text-xs font-normal text-muted-foreground">
                      /month
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div>{property.address}</div>
                    <div className="text-xs text-muted-foreground">
                      {property.city}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">{property.bedrooms}</td>
                  <td className="px-4 py-3 text-center">
                    {property.bathrooms}
                  </td>

                  <td className="px-4 py-3">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">
                      {property.category?.name || "Uncategorized"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        property.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                      {property.available ? "Available" : "Not Available"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingProperty(property)}
                        disabled={isPending}
                        className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-50">
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() =>
                          handleDelete(property.id, property.title)
                        }
                        className="rounded-md bg-destructive px-3 py-1.5 text-sm text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProperty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setEditingProperty(null);
            }
          }}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-background p-6 shadow-xl">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Edit Property</h2>
              <p className="text-sm text-muted-foreground">
                Update property details
              </p>
            </div>

            <PropertyForm
              property={editingProperty}
              categories={categories}
              onSuccess={() => {
                setEditingProperty(null);
                onPropertyChange?.();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
