"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CategoriesSection = ({ categories }: any) => {
  const router = useRouter();

  const handleCategoryClick = (categoryName: any) => {
    router.push(
      `/products?category=${encodeURIComponent(categoryName.toLowerCase())}`
    );
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-light text-gray-900 tracking-wide">
            CATEGORIES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories?.map((category: any) => (
            <div
              key={category?._id}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category?.imageUrl}
                  alt={category?.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-medium text-white tracking-widest uppercase">
                  {category?.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
