"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createProduct = async (productData: FormData) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/create`,
      {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: productData,
      }
    );
    revalidateTag("product");
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const getAllProductData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get`,
      {
        method: "GET",
        next: {
          tags: ["product"],
        },
      }
    );
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const getAProductDataByQuery = async (query: Record<string, string>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get?${query}`,
      { method: "GET" }
    );
    return await res.json();
  } catch (err) {
    throw err;
  }
};
