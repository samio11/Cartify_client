"use server";
export const showProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get`,
    { method: "GET" }
  );
  return await res.json();
};
export const singleProductInfo = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get?_id=${id}`,
    { method: "GET" }
  );
  return await res.json();
};
