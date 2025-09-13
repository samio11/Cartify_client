"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Edit, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { updateAUserData } from "@/services/user/user.services";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Enter a valid phone number" }),
  role: z.string().min(3),
});

export default function EditCustomerInfoModal({ userData }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      role: "",
    },
  });

  // ✅ Reset form values whenever userData updates
  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData?.name || "",
        email: userData?.email || "",
        phoneNumber: userData?.phoneNumber || "",
        role: userData?.role || "",
      });
    }
  }, [userData, form]);
  console.log(userData?._id, typeof userData?._id);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const toastId = toast.loading("User Updating...");
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    try {
      const result = await updateAUserData(formData);
      //   console.log(result);
      if (result?.success) {
        toast.success(result?.message, { id: toastId });
      } else {
        toast.error("User Update Failed", { id: toastId });
      }
    } catch (err: any) {
      //   console.log(err);
      toast.error(err?.message, { id: toastId });
    }
  }

  if (!userData) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          <Edit size={18} /> Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-center">
              <Image
                src={userData.userImage}
                alt={userData.name}
                width={80}
                height={80}
                className="rounded-full border shadow-sm"
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-2">
              <FormLabel>Verification Status</FormLabel>
              <div className="flex items-center gap-2 text-sm">
                {userData.isVerified ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle size={18} className="mr-1" /> Verified
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <XCircle size={18} className="mr-1" /> Not Verified
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <FormLabel>Joined</FormLabel>
              <p className="text-sm text-gray-500">
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
