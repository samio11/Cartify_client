"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createCart = async (cartData: FieldValues) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/create`,
      {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: JSON.stringify(cartData),
      }
    );
    revalidateTag("cart");
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const getAllCartDataByUser = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/get`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
      next: {
        tags: ["cart"],
      },
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const deleteACart = async (cartId: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/delete/${cartId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    revalidateTag("cart");
    return await res.json();
  } catch (err) {
    throw err;
  }
};
