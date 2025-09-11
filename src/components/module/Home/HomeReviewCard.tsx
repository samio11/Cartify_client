"use client";

import React from "react";
import Image from "next/image";
import { Star, Calendar, Quote } from "lucide-react";

type Product = {
  _id: string;
  title: string;
  images: string[];
};

type Review = {
  _id: string;
  productId: Product;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
};

interface ReviewSectionProps {
  review: Review;
}

export default function HomeReviewCard({ review }: ReviewSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
      {/* Header with product info */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
          <Image
            src={review?.productId?.images[0]}
            alt={review?.productId?.title}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {review.productId?.title}
          </h2>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.round(review.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-gray-600 text-sm font-medium">
              {review?.rating?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Review content */}
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="p-2 bg-blue-50 rounded-lg mr-4">
            <Quote className="text-blue-400" size={20} />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mt-1">
            {review?.title}
          </h3>
        </div>

        <p className="text-gray-600 leading-relaxed mb-6 pl-10">
          {review?.comment}
        </p>

        <div className="flex items-center text-sm text-gray-500 pl-10">
          <Calendar size={16} className="mr-1" />
          <span>
            Reviewed on{" "}
            {new Date(review?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
