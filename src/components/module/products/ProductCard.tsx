"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

interface ProductProps {
  _id?: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice: number;
  ratingAvg: number;
  images: string[];
}

export default function ProductCard({
  _id,
  title,
  description,
  price,
  compareAtPrice,
  ratingAvg,
  images,
}: ProductProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition">
      <div className="relative w-full h-56">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardHeader className="space-y-1 p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="line-clamp-2 text-sm text-gray-500">{description}</p>
      </CardHeader>
      <CardContent className="flex items-center justify-between p-4 pt-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-purple-600">${price}</span>
            <span className="text-sm text-gray-400 line-through">
              ${compareAtPrice}
            </span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star className="h-4 w-4 fill-current" />
            {ratingAvg.toFixed(1)}
          </div>
        </div>
        <Button className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90">
          <Link href={`/products/${_id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
