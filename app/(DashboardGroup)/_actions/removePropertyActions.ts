// app/properties/_actions/removePropertyActions.ts
"use server";

import { api } from "@/lib/api";

export const removeProperty = async (id: string): Promise<boolean> => {
  const result = await api(`/properties/${id}`, {
    method: "DELETE",
    auth: true,
  });

  return result.ok;
};
