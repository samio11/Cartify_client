"use client";
import Lottie from "lottie-react";
import React from "react";
import LoadingAni from "../../public/loading.json";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Animation */}
      <div className="w-full max-w-[200px]">
        <Lottie animationData={LoadingAni} loop={true} />
      </div>

      {/* Text */}
      <h1 className="text-lg font-semibold mt-4 text-gray-700 animate-pulse">
        Loading, please wait...
      </h1>
    </div>
  );
}
