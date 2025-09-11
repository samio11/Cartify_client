"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const categorySchema = z.object({
  email: z.string(),
});

export default function Product() {
  const handleSelect = () => {
    console.log("first");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-2">
      {/* Left Side */}

      <div className="w-[20%] space-y-2">
        <div className="shadow-xl rounded-2xl">
          <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Right Side */}
      <div className="w-[75%]"></div>
    </div>
  );
}
