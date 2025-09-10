"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const userLogin = async (userData: FieldValues) => {
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
    const result = await res?.json();
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (err) {
    throw err;
  }
};

export const userInfo = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    let decoded = null;
    if (token) {
      decoded = await jwtDecode(token);
      return decoded;
    }
    return null;
  } catch (err) {
    throw err;
  }
};

export const userLogout = async () => {
  (await cookies()).delete("accessToken");
};

export const userRegister = async (userData: FormData) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/create-user`,
      {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: userData,
      }
    );
    return await res.json();
  } catch (err) {
    throw err;
  }
};
