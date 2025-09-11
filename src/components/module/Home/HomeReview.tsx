import { getAReviewDataByQuery } from "@/services/review/review.services";
import React from "react";
import HomeReviewCard from "./HomeReviewCard";

export default async function HomeReview() {
  const data1 = await getAReviewDataByQuery("sort=-rating");
  const topReviewed = data1?.data?.splice(0, 3);
  //   console.log(topReviewed);
  return (
    <div>
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Customer Review
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our Happy Customer Review
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
        {topReviewed.map((review: any) => (
          <HomeReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}
