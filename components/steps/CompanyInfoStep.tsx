"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { userInfoSchema } from "@/lib/schema";
import z from "zod";
type UserInfoFormValues = z.infer<typeof userInfoSchema>;

export default function CompanyInfoStep({
  form,
}: {
  form: UseFormReturn<UserInfoFormValues>;
}) {
  const companyTypes = [
    "Finance",
    "AI",
    "DevOps",
    "HR",
    "Marketing",
    "Entertainment",
    "Technology",
    "Travel",
    "Other",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Your Company Information</h1>
        <p className="text-sm text-gray-300">
          Enter your company information below.
        </p>
      </div>
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input placeholder="Your company name" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="companyProductDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What does your product do?</FormLabel>
            <FormControl>
              <Input placeholder="Your product description" {...field} />
            </FormControl>
            <FormDescription>
              Your company product description ensure it is one sentence
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="companyKeyDifferentiator"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What makes you different from others?</FormLabel>
            <FormControl>
              <Input placeholder="e.g Faster and affordable" {...field} />
            </FormControl>
            <FormDescription>
              What makes you unique and stand out in your industry?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="companyIndustry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Industry</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industry</SelectLabel>
                    {companyTypes.map((type) => (
                      <SelectItem
                        className="dark font-sans"
                        key={type}
                        value={type}
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
