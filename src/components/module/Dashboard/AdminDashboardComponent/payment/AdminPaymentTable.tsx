"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Lottie from "lottie-react";
import emptyAnimation from "../../../../../../public/No-Data.json";

type Cart = {
  _id: string;
  userId: string;
  productId: string;
  priceAtAdd: number;
  quantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentId: string;
};

type Payment = {
  _id: string;
  cartId?: Cart | null;
  transection_id: string;
  amount: number;
  status: "SUCCESS" | "FAILED" | "PENDING";
};

export default function PaymentTable({
  data,
  onEdit,
  onDelete,
}: {
  data: Payment[];
  onEdit?: (payment: Payment) => void;
  onDelete?: (payment: Payment) => void;
}) {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Payment Records</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-72 h-72">
              <Lottie animationData={emptyAnimation} loop autoplay />
            </div>
            <p className="text-gray-500 mt-4">No payment records found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Cart ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell className="font-medium">
                    {payment.transection_id.slice(0, 12)}...
                  </TableCell>
                  <TableCell>
                    {payment.cartId?._id ? payment.cartId._id : "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        payment.status === "SUCCESS"
                          ? "bg-green-500"
                          : payment.status === "FAILED"
                          ? "bg-red-500"
                          : "bg-yellow-500 text-black"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit?.(payment)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete?.(payment)}
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
