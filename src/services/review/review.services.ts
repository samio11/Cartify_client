"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createReview = async (reviewData: FormData) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/create`,
      {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: reviewData,
      }
    );
    revalidateTag("review");
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const getAllReviewData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/get`,
      {
        method: "GET",
        next: {
          tags: ["review"],
        },
      }
    );
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const getAReviewDataByQuery = async (query: Record<string, string>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/get?${query}`,
      { method: "GET" }
    );
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const updateAReviewData = async (id: string, reviewData: FormData) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/update/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
        },
        body: reviewData,
      }
    );
    revalidateTag("review");
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const deleteAReview = async (id: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    revalidateTag("review");
    return await res.json();
  } catch (err) {
    throw err;
  }
};
