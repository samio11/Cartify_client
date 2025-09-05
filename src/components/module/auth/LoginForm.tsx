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
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { login } from "@/services/Auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(userData: z.infer<typeof loginSchema>) {
    // const toastId = toast.loading("Login...");
    const toastId = toast.loading("Login...");
    try {
      const result = await login(userData);
      if (result.success) {
        console.log(result);
        toast.success("User Login Done", { id: toastId });
        router.push("/");
      } else {
        toast.error(result?.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
      //   return err;
    }
  }

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
                  <LogIn className="h-7 w-7 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <p className="mt-3 text-center text-gray-400">
                Sign in to continue to your account
              </p>
            </CardHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                        Signing in...
                      </span>
                    </>
                  ) : (
                    <span className="relative flex items-center justify-center">
                      Sign In
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
                Don't have an account?{" "}
                <Link
                  href={"/register"}
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Register
                </Link>
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
                Secure authentication
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your data is protected with industry-standard encryption and
                security protocols. We prioritize your privacy and ensure safe
                access to your account.
              </p>
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
