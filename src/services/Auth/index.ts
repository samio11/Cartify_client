"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const login = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    } else {
      console.log(result);
    }
    return result;
  } catch (err: any) {
    throw err;
  }
};

export const register = async (userData: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/create-user`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
  const result = await res.json();
  return result;
};

export const userInfo = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/info`);
  return await res.json();
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};
