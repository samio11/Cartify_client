import { LoginForm } from "@/components/module/Auth/LoginForm";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Login",
  description: "Login Page",
};

export default function Login() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoginForm className="max-w-2xl w-full" />
      </div>
    </div>
  );
}
