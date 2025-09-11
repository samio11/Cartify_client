import React from "react";
import NewProductCard from "./NewProductCard";
import { getAProductDataByQuery } from "@/services/product/product.services";

export default async function HomeNewProducts() {
  const products = await getAProductDataByQuery("sort=-createAt");
  const newProductData = products?.data?.slice(0, 6);
  //   console.log(newProductData);
  return (
    <div>
      <NewProductCard products={newProductData}></NewProductCard>
    </div>
  );
}
