"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import RegisterAni from "../../../../public/register.json"; // Add your register animation JSON
import Lottie from "lottie-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { userRegister } from "@/services/Auth/auth.service"; // You’ll need to create this service
import { useState } from "react";
import SIngleImageUploader from "@/components/shared/SIngleImageUploader";

// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be greater than 4 characters"),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [image, setImage] = useState<File | null>(null);
  const route = useRouter();
  const s1 = useSearchParams();
  const redirectPath = s1.get("redirectPath") || "/login";

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(registerInfo: z.infer<typeof registerSchema>) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(registerInfo));
    formData.append("file", image as File);
    const toastId = toast.loading("Creating account...");
    try {
      const result = await userRegister(formData);
      if (result) {
        toast.success(result?.message || "Registration successful", {
          id: toastId,
        });
        route.push(redirectPath);
      } else {
        toast.error("Registration failed", { id: toastId });
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message || "Something went wrong", { id: toastId });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left side form */}
          <div className="flex flex-col justify-center gap-6 p-6 md:p-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">
                Create Your Cartify Account
              </h1>
              <p className="text-muted-foreground text-balance">
                Register to start shopping
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. +8801234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="••••" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <SIngleImageUploader onChange={setImage}></SIngleImageUploader>

                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </Form>

            {/* Login link */}
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href={"/login"} className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </div>

          {/* Right side animation */}
          <div className="bg-muted relative hidden md:flex items-center justify-center">
            <Lottie animationData={RegisterAni} loop={true} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
