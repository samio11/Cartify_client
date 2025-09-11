"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

interface ProductsSectionProps {
  products: Product[];
}

const HomeTopReviewedCard = ({ products }: ProductsSectionProps) => {
  const router = useRouter();
  const [visibleProducts, setVisibleProducts] = useState(3);

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 6);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price);
  };

  const calculateDiscount = (price: number, compareAtPrice: number) => {
    return 0;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Top Rated Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked by our customers — these products earned the best ratings
            and reviews.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {products.slice(0, visibleProducts).map((product) => (
            <div
              key={product._id}
              className="group bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}

                {/* Discount Badge
                {product.compareAtPrice > product.price && (
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold bg-red-500 text-white rounded-full shadow">
                    -{calculateDiscount(product.price, product.compareAtPrice)}%
                  </span>
                )} */}

                {/* Stock Badge */}
                {product.stock === 0 && (
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold bg-gray-800 text-white rounded-full shadow">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-5 text-center">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  {product.compareAtPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.compareAtPrice, product.currency)}
                    </span>
                  )}
                </div>

                {/* Ratings */}
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.ratingAvg)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviewsCount})
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => router.push(`/products/${product._id}`)}
                  className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleProducts < products.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeTopReviewedCard;
