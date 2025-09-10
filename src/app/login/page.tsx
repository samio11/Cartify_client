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
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}
