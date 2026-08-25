/* eslint-disable @typescript-eslint/no-explicit-any */
// app/properties/_actions/editPropertyActions.ts
"use server";

import { api } from "@/lib/api";
import { IProperty } from "@/lib/type";
import { revalidatePath } from "next/cache";

export const editProperty = async (
  id: string,
  payload: any,
): Promise<IProperty | null> => {
  try {
    console.log("=== EDIT PROPERTY ===");
    console.log("ID:", id);
    console.log("Payload:", payload);

    // If payload is FormData, convert it to JSON
    let jsonPayload = payload;
    if (payload instanceof FormData) {
      const obj: Record<string, any> = {};
      for (const [key, value] of payload.entries()) {
        obj[key] = value;
      }
      jsonPayload = obj;
    }

    const result = await api<IProperty>(`/properties/${id}`, {
      method: "PUT",
      auth: true,
      body: JSON.stringify(jsonPayload),
    });

    console.log("Result:", result);

    if (!result.ok) {
      console.error("Failed to edit property:", result.message);
      return null;
    }

    revalidatePath("/properties");
    revalidatePath("/landlord/properties");

    return result.data;
  } catch (error) {
    console.error("Error editing property:", error);
    return null;
  }
};
