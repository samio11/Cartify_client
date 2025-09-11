"use client";
import { useState } from "react";
import Image from "next/image";
import {
  StarIcon,
  ShoppingCart,
  CreditCard,
  Heart,
  Share,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { TRole } from "@/middleware";

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice: number;
  currency: string;
  categoryId: string;
  sellerId: string;
  images: string[];
  stock: number;
  attributes: { key: string; value: string; _id: string }[];
  ratingAvg: number;
  reviewsCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductPageProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);
  const { user, setIsLoading } = useUser();
  const [wishlisted, setWishlisted] = useState(false);

  const calculateDiscount = (price: number, compareAtPrice: number) => {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-5 h-5 ${
          i < Math.round(rating)
            ? "text-amber-400 fill-amber-400"
            : "text-gray-300"
        }`}
      />
    ));
  };
  const handleCart = async () => {
    console.log(`Cart Clicked`);
  };
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Home / Electronics / Smartphones / {product.title}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Product Images */}
          <div className="space-y-4">
            <div className="relative w-full h-[480px] bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                className="object-contain p-4 transition-opacity duration-300"
                priority
              />
              {product.compareAtPrice > product.price && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                  {calculateDiscount(product.price, product.compareAtPrice)}%
                  OFF
                </span>
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`p-2 rounded-full shadow-md ${
                    wishlisted
                      ? "bg-red-100 text-red-500"
                      : "bg-white text-gray-600"
                  } hover:bg-red-50 hover:text-red-500 transition-colors`}
                >
                  <Heart
                    className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`}
                  />
                </button>
                <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto py-2">
              {product.images.map((img) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(img)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center mt-4">
              <div className="flex">{renderStars(product.ratingAvg)}</div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                {product.ratingAvg.toFixed(1)}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                {product.reviewsCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.compareAtPrice > product.price && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            {/* Stock */}
            <div className="mt-4">
              <p
                className={`text-sm font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Attributes */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Specifications
              </h3>
              <div className="space-y-2">
                {product.attributes.map((attr) => (
                  <div key={attr._id} className="flex">
                    <span className="text-gray-500 w-32 flex-shrink-0">
                      {attr.key}:
                    </span>
                    <span className="text-gray-700 font-medium">
                      {attr.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <Truck className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium">Free delivery</span>
              </div>
              <div className="flex items-center mb-2">
                <RotateCcw className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium">
                  30-day return policy
                </span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium">2-year warranty</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                disabled={!user}
                onClick={handleCart}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 rounded-lg hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button
                disabled={!user}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-5 h-5" /> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
