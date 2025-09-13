"use client";

import * as React from "react";
import Image from "next/image";
import { StarIcon, Minus, Plus, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createCart } from "@/services/cart/cart.services";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: {
    _id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    ratingAvg: number;
  };
}

export function CartModal({ open, onOpenChange, cart }: CartModalProps) {
  const [quantity, setQuantity] = React.useState(1);
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    const payload = {
      productId: cart._id,
      quantity,
      priceAtAdd: cart.price,
    };

    const toastId = toast.loading("Creating Product to Cart...");
    try {
      const result = await createCart(payload);

      if (result?.success) {
        toast.success(result?.message, { id: toastId });
        onOpenChange(false);
      } else {
        toast.error("Cart Added Failed", { id: toastId });
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message, { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Add to Cart
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Product Image */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <Image
              src={cart.images[0]}
              alt={cart.title}
              fill
              className="object-contain bg-gray-50"
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{cart.title}</h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {cart.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < Math.round(cart.ratingAvg)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {cart.ratingAvg.toFixed(1)}
                </span>
              </div>

              {/* Price */}
              <p className="mt-4 text-2xl font-bold text-blue-600">
                ${cart.price.toFixed(2)}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center mt-5">
                <span className="text-gray-700 font-medium mr-3">
                  Quantity:
                </span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={handleDecrease}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-gray-900 font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="mt-6 flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800 h-12 rounded-xl shadow-md transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
