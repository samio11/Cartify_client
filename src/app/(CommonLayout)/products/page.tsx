"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategoryData } from "@/services/category/category.services";
import {
  getAllProductData,
  getAProductDataByQuery,
} from "@/services/product/product.services";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Filter,
  Grid3X3,
  List,
  Search,
  ShoppingCart,
  Loader2,
  ChevronDown,
  X,
  View,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Product() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [loadCategory, setLoadCategory] = useState([]);
  const [loadProduct, setLoadProduct] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  const handleData = useCallback(async () => {
    setLoading(true);
    try {
      const [c1, p1] = await Promise.all([
        getAllCategoryData(),
        category
          ? getAProductDataByQuery(`categoryId=${category}`)
          : getAllProductData(),
      ]);

      setLoadCategory(c1?.data || []);

      // Apply additional filtering based on search and other criteria
      let filteredProducts = p1?.data || [];

      if (searchQuery) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      // Sort products
      if (sortBy === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === "rating") {
        filteredProducts.sort((a, b) => b.ratingAvg - a.ratingAvg);
      }

      setLoadProduct(filteredProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery, sortBy]);

  useEffect(() => {
    handleData();
  }, [handleData]);

  const clearFilters = () => {
    setCategory(undefined);
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8 p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 md:hidden"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 border-slate-200 rounded-lg">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 hover:bg-slate-50 transition-colors",
                  viewMode === "grid"
                    ? "bg-slate-100 text-slate-800"
                    : "text-slate-500"
                )}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 hover:bg-slate-50 transition-colors",
                  viewMode === "list"
                    ? "bg-slate-100 text-slate-800"
                    : "text-slate-500"
                )}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={cn(
              "md:w-72 bg-white rounded-xl shadow-sm p-6 h-fit sticky top-4 transition-all",
              showFilters ? "block" : "hidden md:block"
            )}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-medium text-slate-700 mb-3">Category</h3>
                <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger className="w-full border-slate-200 rounded-lg">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {loadCategory?.map((x) => (
                        <SelectItem key={x?._id} value={x?._id}>
                          {x?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <section className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <Loader2 className="animate-spin text-slate-400" size={32} />
              </div>
            ) : loadProduct.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="text-slate-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  No products found
                </h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                className={cn(
                  "gap-6",
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "space-y-4"
                )}
              >
                <AnimatePresence mode="popLayout">
                  {loadProduct.map((p) => (
                    <motion.div
                      key={p._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      whileHover={{ y: -6 }}
                      className={cn(
                        "bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 transition-all hover:shadow-md group",
                        viewMode === "grid"
                          ? "flex flex-col"
                          : "flex flex-col md:flex-row"
                      )}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden bg-slate-100",
                          viewMode === "grid"
                            ? "h-56 w-full"
                            : "h-48 w-full md:w-48 flex-shrink-0"
                        )}
                      >
                        <Image
                          src={p.images[0]}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {p.compareAtPrice > p.price && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                            Save ${(p.compareAtPrice - p.price).toFixed(2)}
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1">
                          {p.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                          {p.description}
                        </p>

                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < Math.round(p.ratingAvg)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-slate-300"
                              }
                            />
                          ))}
                          <span className="text-sm text-slate-500 ml-1">
                            ({p.ratingAvg})
                          </span>
                          <span className="text-sm text-slate-500 ml-1">
                            ({p.reviewsCount})
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-slate-900">
                              ${p.price}
                            </span>
                            {p.compareAtPrice > p.price && (
                              <span className="text-sm line-through text-slate-400">
                                ${p.compareAtPrice}
                              </span>
                            )}
                          </div>

                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-slate-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                            onClick={() => router.push(`/products/${p._id}`)}
                          >
                            {/* <View size={18} /> */}
                            <span className="hidden sm:inline">
                              View Details
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
