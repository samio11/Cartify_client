"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Lottie from "lottie-react";
import emptyAnimation from "../../../../../../public/No-Data.json";
type CartItem = {
  _id: string;
  userId: {
    name: string;
    userImage: string;
  };
  productId: {
    title: string;
    images: string[];
  };
  priceAtAdd: number;
  quantity: number;
  status: string;
  createdAt: string;
};

export default function CartTable({ data }: { data: CartItem[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <div className="w-72 h-72">
          <Lottie animationData={emptyAnimation} loop autoplay />
        </div>
        <h2 className="text-lg font-semibold text-gray-600 mt-4">
          No Cart Data Available
        </h2>
        <p className="text-sm text-gray-500">Please check back later</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border shadow-md p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cart Management</h2>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100">
            <TableHead className="text-gray-700">Customer</TableHead>
            <TableHead className="text-gray-700">Product</TableHead>
            <TableHead className="text-gray-700">Price</TableHead>
            <TableHead className="text-gray-700">Qty</TableHead>
            <TableHead className="text-gray-700">Total</TableHead>
            <TableHead className="text-gray-700">Status</TableHead>
            <TableHead className="text-gray-700">Order Date</TableHead>
            <TableHead className="text-right text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item._id}
              className={`hover:bg-gray-50 transition ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {/* Customer */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={item.userId.userImage}
                    alt={item.userId.name}
                    width={40}
                    height={40}
                    className="rounded-full border object-cover"
                  />
                  <span className="font-medium">{item.userId.name}</span>
                </div>
              </TableCell>

              {/* Product */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={item.productId.images[0]}
                    alt={item.productId.title}
                    width={48}
                    height={48}
                    className="rounded-lg border object-cover"
                  />
                  <span className="font-medium">{item.productId.title}</span>
                </div>
              </TableCell>

              {/* Price */}
              <TableCell className="text-center text-gray-700 whitespace-nowrap">
                ${item.priceAtAdd}
              </TableCell>

              {/* Quantity */}
              <TableCell className="text-center text-gray-700">
                {item.quantity}
              </TableCell>

              {/* Total */}
              <TableCell className="text-center font-semibold text-gray-800">
                ${item.priceAtAdd * item.quantity}
              </TableCell>

              {/* Status */}
              <TableCell className="text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : item.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </TableCell>

              {/* CreatedAt */}
              <TableCell className="text-center text-gray-600 whitespace-nowrap">
                {new Date(item.createdAt).toLocaleDateString("en-GB")}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right whitespace-nowrap">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => console.log("Edit", item._id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full"
                    onClick={() => console.log("Delete", item._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
