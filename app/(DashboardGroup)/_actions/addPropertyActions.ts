// app/properties/_actions/addPropertyActions.ts
"use server";

import { api } from "@/lib/api";
import { IProperty } from "@/lib/type";
import { revalidatePath } from "next/cache";

export const addProperty = async (payload: unknown): Promise<IProperty | null> => {
  try {
    console.log("=== ADD PROPERTY ===");
    console.log("Payload:", payload);

    const result = await api<IProperty>("/properties", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });

    console.log("Result:", result);

    if (!result.ok) {
      console.error("Failed to add property:", result.message);
      return null;
    }

    revalidatePath("/properties");
    revalidatePath("/landlord/properties");

    return result.data;
  } catch (error) {
    console.error("Error adding property:", error);
    return null;
  }
};
