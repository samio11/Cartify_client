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
import Image from "next/image";
import Lottie from "lottie-react";
import noDataAnimation from "../../../../../../public/No-Data.json";
import Swal from "sweetalert2";
import { deleteACart } from "@/services/cart/cart.services";

type CartItem = {
  _id: string;
  productId: {
    _id: string;
    title: string;
    price: number;
    images: string[];
  };
  priceAtAdd: number;
  quantity: number;
  status: string;
  paymentId: {
    _id: string;
    transection_id: string;
    amount: number;
    status: string;
  };
};

export default function CartTable({ data }: { data: CartItem[] }) {
  const handleDelete = (id: string) => {
    console.log("Deleting cart item:", id);

    Swal.fire({
      title: "Are you sure?",
      text: `Deleting this product`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteCart = await deleteACart(id);
        console.log(deleteCart);
        if (deleteCart?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "Your item deleted failed",
            icon: "error",
          });
        }
      }
    });
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Lottie
          animationData={noDataAnimation}
          loop={true}
          className="w-64 h-64"
        />
        <p className="text-gray-600 font-medium mt-4">No cart items found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <Image
                  src={item.productId.images[0]}
                  alt={item.productId.title}
                  width={100}
                  height={70}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell className="font-medium">
                {item.productId.title}
              </TableCell>
              <TableCell>${item.priceAtAdd}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.priceAtAdd * item.quantity}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.status}
                </span>
              </TableCell>
              <TableCell>
                {item.status === "PENDING" ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                ) : (
                  <span className="text-gray-400 text-sm">N/A</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
