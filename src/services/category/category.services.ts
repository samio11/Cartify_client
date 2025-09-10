"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createCategory = async (categoryData: FormData) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/create`,
      {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: categoryData,
      }
    );
    revalidateTag("category");
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const getAllCategoryData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/get`,
      {
        method: "GET",
        next: {
          tags: ["category"],
        },
      }
    );
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const getACategoryDataByQuery = async (
  query: Record<string, string>
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/get?${query}`,
      { method: "GET" }
    );
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const updateACategoryData = async (
  id: string,
  categoryData: FormData
) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/update/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
        },
        body: categoryData,
      }
    );
    revalidateTag("category");
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const deleteACategory = async (id: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    revalidateTag("category");
    return await res.json();
  } catch (err) {
    throw err;
  }
};
