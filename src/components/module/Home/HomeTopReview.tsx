import { getAProductDataByQuery } from "@/services/product/product.services";
import React from "react";
import HomeTopReviewedCard from "./HomeTopReviewCard";

export default async function HomeTopReview() {
  const reviewData = await getAProductDataByQuery("sort=-reviewsCount");
  const topReviewed = reviewData?.data?.slice(0, 6);
  return <HomeTopReviewedCard products={topReviewed}></HomeTopReviewedCard>;
}
