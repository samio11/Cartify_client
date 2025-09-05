"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, UserPlus, Upload, User } from "lucide-react";
import { useState, useRef } from "react";

const registerSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    phoneNumber: z.string().min(10, {
      message: "Please enter a valid phone number.",
    }),
    role: z.string(),
    profileImage: z.instanceof(File).optional(),
  })
  .refine((data) => {
    // Additional validation if needed
    return true;
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "customer",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    console.log(values);
    const profilePicture = values?.profileImage?.name;
    console.log("Profile Picture", profilePicture);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("profileImage", file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMzNzM3NDAiIHN0cm9rZS13aWR0aD0iMSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

      <Card className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/70 via-gray-800/50 to-gray-900/70 shadow-2xl backdrop-blur-md">
        <CardContent className="grid gap-0 md:grid-cols-2">
          {/* Left side - form */}
          <div className="p-8 md:p-10">
            <CardHeader className="p-0 mb-8">
              <div className="mb-6 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg">
                  <UserPlus className="h-7 w-7 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Create Account
              </CardTitle>
              <p className="mt-3 text-center text-gray-400">
                Join us today and unlock exclusive features
              </p>
            </CardHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center mb-4">
                  <div className="relative">
                    <div
                      className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-white/20"
                      onClick={triggerFileInput}
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-10 w-10 text-white" />
                      )}
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center border-2 border-gray-900 hover:bg-purple-500 transition-colors"
                      onClick={triggerFileInput}
                    >
                      <Upload className="h-4 w-4 text-white" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Click to upload profile photo
                  </p>
                </div>

                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 text-sm font-medium">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="bg-gray-900/40 border-gray-700/70 text-white pl-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl h-12 transition-all duration-200"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 text-sm font-medium">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="you@example.com"
                            {...field}
                            className="bg-gray-900/40 border-gray-700/70 text-white pl-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl h-12 transition-all duration-200"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 text-sm font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="bg-gray-900/40 border-gray-700/70 text-white pl-10 pr-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl h-12 transition-all duration-200"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 text-sm font-medium">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="+1 (555) 123-4567"
                            {...field}
                            className="bg-gray-900/40 border-gray-700/70 text-white pl-10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl h-12 transition-all duration-200"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Role Selection */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 text-sm font-medium">
                        Account Type
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: "customer", label: "Customer" },
                            { value: "seller", label: "Seller" },
                            { value: "admin", label: "Admin" },
                          ].map((role) => (
                            <button
                              type="button"
                              key={role.value}
                              className={`rounded-xl py-3 text-sm font-medium transition-all duration-200 ${
                                field.value === role.value
                                  ? "bg-purple-600 text-white shadow-md"
                                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                              }`}
                              onClick={() => field.onChange(role.value)}
                            >
                              {role.label}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 py-3 text-white font-medium shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-blue-600 hover:shadow-purple-500/20 hover:scale-[1.02] relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 animate-pulse"></div>
                      <span className="relative flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating Account...
                      </span>
                    </>
                  ) : (
                    <span className="relative flex items-center justify-center">
                      Create Account
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>

          {/* Right side - decorative */}
          <div className="relative hidden md:flex flex-col justify-between bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-gray-900/50 p-10 border-l border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent from-20% to-purple-900/10 to-90%]"></div>
            <div className="relative">
              <div className="mb-8">
                <div className="inline-flex rounded-2xl bg-purple-500/10 p-4 backdrop-blur-sm">
                  <svg
                    className="h-8 w-8 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                Join our community
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Create an account to access exclusive features, personalized
                content, and connect with other members of our platform.
              </p>

              <div className="space-y-4">
                {[
                  "Access exclusive content and features",
                  "Personalized experience based on your role",
                  "Connect with other community members",
                  "Secure data protection with encryption",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-purple-400 mt-0.5 mr-3 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-12 w-12 rounded-full border-2 border-gray-800/70 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-lg"
                  >
                    <span className="text-xs font-medium text-gray-400">
                      U{item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Join over{" "}
                <span className="text-purple-400 font-semibold">10,000+</span>{" "}
                users who trust our platform
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
