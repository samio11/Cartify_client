"use client";
import React from "react";
import Link from "next/link";

export default function ExploreMoreCard() {
  return (
    <section
      className="relative w-full h-[60vh] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blackish Gradient Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Explore More Products
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
          Discover the latest phones, laptops, headphones and more. Upgrade your
          lifestyle with top-notch gadgets.
        </p>
        <Link
          href="/products"
          className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:-translate-y-1"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
