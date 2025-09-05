import { singleProductInfo } from "@/services/Product";
import React from "react";
import { Star } from "lucide-react";

export default async function ProductInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productDetails = await singleProductInfo(id);
  const [product] = productDetails.data;

  return (
    <section className="container mx-auto px-6 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Left: Image Gallery */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-gray-100">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </div>
          </div>
          <div className="flex gap-3 mt-6 justify-center">
            {product.images.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title}-${idx}`}
                className="w-20 h-20 rounded-lg object-cover border border-gray-200 hover:border-blue-500 hover:scale-110 transition-all duration-300 cursor-pointer shadow-sm"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="space-y-8 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {product.title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.ratingAvg)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-800">
              {product.ratingAvg.toFixed(1)}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.reviewsCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-blue-600">
              {product.currency} {product.price}
            </span>
            {product.compareAtPrice && (
              <span className="text-xl text-gray-400 line-through">
                {product.currency} {product.compareAtPrice}
              </span>
            )}
          </div>

          {/* Attributes */}
          <div className="space-y-3">
            {product.attributes.map((attr: any) => (
              <div
                key={attr._id}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <span className="font-medium text-gray-700">{attr.key}</span>
                <span className="text-gray-600">{attr.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Add to Cart
            </button>
            <button className="flex-1 py-4 bg-gray-800 text-white text-lg font-semibold rounded-full hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
