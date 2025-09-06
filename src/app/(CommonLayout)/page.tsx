import ProductCard from "@/components/module/products/ProductCard";
import { userInfo } from "@/services/Auth";
import { showProducts } from "@/services/Product";
import React from "react";

export default async function page() {
  const productData = await showProducts();
  //   console.log(productData.data);
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {productData?.data?.map((x: any) => (
          <ProductCard
            key={x._id}
            _id={x._id}
            title={x.title}
            description={x.description}
            price={x.price}
            compareAtPrice={x.compareAtPrice}
            ratingAvg={x.ratingAvg}
            images={x.images}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
}
