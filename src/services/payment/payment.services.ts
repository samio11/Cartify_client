"use server";

import { cookies } from "next/headers";

export const getAllPaymentDataByAdmin = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/get-admin`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
        next: {
          tags: ["payment"],
        },
      }
    );
    const result = await res.json();
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};
export const createPayment = async (cartId: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/create/${cartId}`,
      {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const result = await res.json();
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};
