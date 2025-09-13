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
import Image from "next/image";
import Lottie from "lottie-react";
import emptyAnimation from "../../../../../../public/No-Data.json";

type User = {
  _id: string;
  name: string;
  email: string;
  userImage: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
};

export default function UserTable({
  data,
  onEdit,
  onDelete,
}: {
  data: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}) {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Users</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-72 h-72">
              <Lottie animationData={emptyAnimation} loop autoplay />
            </div>
            <p className="text-gray-500 mt-4">No users found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Image
                      src={user.userImage}
                      alt={user.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.role === "admin" ? "bg-purple-600" : "bg-blue-500"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.isVerified
                          ? "bg-green-500"
                          : "bg-gray-400 text-black"
                      }
                    >
                      {user.isVerified ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit?.(user)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete?.(user)}
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
