import { RegisterForm } from "@/components/module/Auth/RegisterForm";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Register",
  description: "Register Page",
};

export default function Login() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <RegisterForm className="max-w-2xl w-full" />
      </div>
    </div>
  );
}
