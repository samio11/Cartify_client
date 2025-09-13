"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUserData = async () => {
  try {
    const token = (await cookies())?.get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-users`,
      {
        method: "GET",
        next: {
          tags: ["user"],
        },
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const getAUserDataByQuery = async (query: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-users?${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
        next: {
          tags: ["user1"],
        },
      }
    );

    return await res.json();
  } catch (err) {
    console.error("Error fetching user data:", err);
    throw err;
  }
};

export const updateAUserData = async (userData: FormData) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update-user`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
        },
        body: userData,
      }
    );
    const result = await res.json();
    // console.log(result);

    revalidateTag("user1");
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
