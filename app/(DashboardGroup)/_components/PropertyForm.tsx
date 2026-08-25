/* eslint-disable @typescript-eslint/no-explicit-any */
// app/properties/_components/PropertyForm.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ICategory, IProperty } from "@/lib/type";
import { addProperty } from "../_actions/addPropertyActions";
import { editProperty } from "../_actions/editPropertyActions";

interface PropertyFormProps {
  categories: ICategory[];
  property?: IProperty;
  onSuccess?: () => void;
}

export default function PropertyForm({
  categories,
  property,
  onSuccess,
}: PropertyFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: property?.title ?? "",
    description: property?.description ?? "",
    price: property?.price?.toString() ?? "",
    bedrooms: property?.bedrooms?.toString() ?? "",
    bathrooms: property?.bathrooms?.toString() ?? "",
    address: property?.address ?? "",
    city: property?.city ?? "",
    categoryId: property?.categoryId ?? "",
    available: property?.available ?? true,
    image: property?.image ?? "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    property?.image ?? "",
  );
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(property);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limit to 100KB for base64
      if (file.size > 100 * 1024) {
        setError("Image size should be less than 100KB for upload");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.categoryId) {
      setError("Category is required");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError("Valid price is required");
      return;
    }

    startTransition(async () => {
      try {
        // Prepare JSON payload - ALWAYS include image field
        const payload: any = {
          title: formData.title.trim(),
          description: formData.description.trim(),
          price: parseFloat(formData.price),
          bedrooms: parseInt(formData.bedrooms) || 0,
          bathrooms: parseFloat(formData.bathrooms) || 0,
          address: formData.address.trim(),
          city: formData.city.trim(),
          categoryId: formData.categoryId,
          available: formData.available,
          image: "", // Default empty string
        };

        // If there's an image file, convert to base64
        if (imageFile) {
          if (imageFile.size > 100 * 1024) {
            setError("Image too large. Please use an image under 100KB.");
            return;
          }
          const base64Image = await convertImageToBase64(imageFile);
          payload.image = base64Image;
        } else if (formData.image) {
          // Use existing image URL if editing
          payload.image = formData.image;
        }

        console.log("Sending payload:", {
          ...payload,
          image: payload.image
            ? `${payload.image.substring(0, 50)}...`
            : "empty",
        });

        let result;
        if (isEditing) {
          result = await editProperty(property!.id, payload);
        } else {
          result = await addProperty(payload);
        }

        if (!result) {
          setError("Failed to save property. Please try again.");
          return;
        }

        router.refresh();
        onSuccess?.();

        if (!isEditing) {
          setFormData({
            title: "",
            description: "",
            price: "",
            bedrooms: "",
            bathrooms: "",
            address: "",
            city: "",
            categoryId: "",
            available: true,
            image: "",
          });
          setImageFile(null);
          setImagePreview("");
        }
      } catch (error) {
        console.error("Submit error:", error);
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Beautiful Apartment in Downtown"
          disabled={isPending}
          required
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your property..."
          disabled={isPending}
          required
          rows={4}
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium">
            Price (per month) *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="1500"
            disabled={isPending}
            required
            min="0"
            step="0.01"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category *
          </label>
          <select
            id="category"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            disabled={isPending}
            required
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2">
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="bedrooms" className="text-sm font-medium">
            Bedrooms *
          </label>
          <input
            id="bedrooms"
            name="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={handleChange}
            placeholder="2"
            disabled={isPending}
            required
            min="0"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="bathrooms" className="text-sm font-medium">
            Bathrooms *
          </label>
          <input
            id="bathrooms"
            name="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="1"
            disabled={isPending}
            required
            min="0"
            step="0.5"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Address *
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St"
            disabled={isPending}
            required
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">
            City *
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="New York"
            disabled={isPending}
            required
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="text-sm font-medium">
          Property Image (max 100KB for upload)
        </label>
        <input
          id="image"
          name="image"
          type="file"
          onChange={handleImageChange}
          disabled={isPending}
          accept="image/*"
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
        />
        {imagePreview && (
          <div className="mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Property preview"
              className="h-32 w-32 rounded-md object-cover"
            />
            {imageFile && (
              <p className="text-xs text-muted-foreground mt-1">
                Size: {(imageFile.size / 1024).toFixed(2)} KB
              </p>
            )}
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Or use image URL:
          <input
            type="url"
            name="imageUrl"
            value={formData.image}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.value }))
            }
            placeholder="https://example.com/image.jpg"
            disabled={isPending}
            className="w-full mt-1 rounded-md border px-3 py-2 outline-none focus:ring-2"
          />
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="available"
          name="available"
          type="checkbox"
          checked={formData.available}
          onChange={handleChange}
          disabled={isPending}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="available" className="text-sm font-medium">
          Available for rent
        </label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onSuccess}
          disabled={isPending}
          className="rounded-md border px-4 py-2 text-sm hover:bg-muted">
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
          {isPending ? "Saving..." : isEditing ? "Update" : "Add Property"}
        </button>
      </div>
    </form>
  );
}
