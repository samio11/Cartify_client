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
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Lottie from "lottie-react";
import emptyAnimation from "../../../../../../public/No-Data.json";

type Category = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
};

export default function CategoryTable({
  data,
  onEdit,
  onDelete,
}: {
  data: Category[];
  onEdit?: (cat: Category) => void;
  onDelete?: (cat: Category) => void;
}) {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Categories</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-72 h-72">
              <Lottie animationData={emptyAnimation} loop autoplay />
            </div>
            <p className="text-gray-500 mt-4">No categories found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((cat) => (
                <TableRow key={cat._id} className="hover:bg-gray-50 transition">
                  {/* Category with Image + Name */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name}
                        width={70}
                        height={70}
                        className="rounded-lg object-cover border shadow-sm"
                      />
                      <span className="font-semibold text-gray-800">
                        {cat.name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Description */}
                  <TableCell className="text-gray-600 max-w-sm truncate">
                    {cat.description}
                  </TableCell>

                  {/* Created Date */}
                  <TableCell className="text-sm text-gray-500">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit?.(cat)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete?.(cat)}
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
