"use server";

import { api } from "@/lib/api";
import { IReview } from "@/lib/type";

export const getReviews = async (): Promise<IReview[]> => {
  const result = await api<{ reviews: IReview[] }>("/reviews", {
    cache: "no-store",
  });

  return result.ok ? result.data.reviews : [];
};
