"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Star } from "lucide-react";
import Image from "next/image";
import Lottie from "lottie-react";
import emptyAnimation from "../../../../../../public/No-Data.json";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice: number;
  currency: string;
  categoryId: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  sellerId: {
    _id: string;
    name: string;
    userImage: string;
  };
  images: string[];
  stock: number;
  ratingAvg: number;
  reviewsCount: number;
  createdAt: string;
};

export default function ProductTable({
  data,
  onEdit,
  onDelete,
}: {
  data: Product[];
  onEdit?: (p: Product) => void;
  onDelete?: (p: Product) => void;
}) {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Products</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-72 h-72">
              <Lottie animationData={emptyAnimation} loop autoplay />
            </div>
            <p className="text-gray-500 mt-4">No products found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((p) => (
                <TableRow key={p._id} className="hover:bg-gray-50 transition">
                  {/* Product */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover border shadow-sm"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{p.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image
                        src={p.categoryId.imageUrl}
                        alt={p.categoryId.name}
                        width={32}
                        height={32}
                        className="rounded-md object-cover border"
                      />
                      <span className="text-sm font-medium">
                        {p.categoryId.name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Seller */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image
                        src={p.sellerId.userImage}
                        alt={p.sellerId.name}
                        width={32}
                        height={32}
                        className="rounded-full border"
                      />
                      <span className="text-sm">{p.sellerId.name}</span>
                    </div>
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {p.currency} {p.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {p.currency} {p.compareAtPrice}
                      </span>
                    </div>
                  </TableCell>

                  {/* Stock */}
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.stock > 20
                          ? "bg-green-100 text-green-700"
                          : p.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.stock} pcs
                    </span>
                  </TableCell>

                  {/* Rating */}
                  <TableCell>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <span className="text-sm font-medium text-gray-800">
                        {p.ratingAvg}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({p.reviewsCount})
                      </span>
                    </div>
                  </TableCell>

                  {/* CreatedAt */}
                  <TableCell className="text-sm text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit?.(p)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete?.(p)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
