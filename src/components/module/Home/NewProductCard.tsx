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

const NewArrivalsSection = ({ products }: ProductsSectionProps) => {
  const router = useRouter();
  const [visibleProducts, setVisibleProducts] = useState(3);

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  const calculateDiscount = (price: number, compareAtPrice: number) => {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection of products, carefully curated to
            bring you the newest trends and styles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.slice(0, visibleProducts).map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/products/${product._id}`)}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>

                {product.compareAtPrice > product.price && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-md">
                      {calculateDiscount(product.price, product.compareAtPrice)}
                      % OFF
                    </span>
                  </div>
                )}

                {product.stock === 0 && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-gray-700 text-white text-xs font-semibold rounded-md">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-gray-900 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    {product.compareAtPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.compareAtPrice, product.currency)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.ratingAvg)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-600">
                      ({product.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProducts < products.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
