"use client";
import Lottie from "lottie-react";
import React from "react";
import NoData from "../../public/NoData.json";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Animation */}
      <div className="w-full max-w-md">
        <Lottie animationData={NoData} loop={true} />
      </div>

      {/* Text */}
      <h1 className="text-3xl font-bold mt-6 text-gray-800">Page Not Found</h1>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          Go Back
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
        >
          Home
        </button>
      </div>
    </div>
  );
}
