import z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

import { UseFormReturn } from "react-hook-form";
import { userInfoSchema } from "@/lib/schema";
type UserInfoFormValues = z.infer<typeof userInfoSchema>;

export default function BrandVoiceStep({
  form,
}: {
  form: UseFormReturn<UserInfoFormValues>;
}) {
  const brandTones = [
    "Professional & formal",
    "Friendly & conversational",
    "Technical & detailed",
    "Humorous & witty",
    "Casual & relaxed",
    "Bold & disruptive",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Your Brand Voice</h1>
        <p className="text-sm text-gray-300">
          This is what that will define your brand's personality, tone, and
          style.
        </p>
      </div>
      <FormField
        control={form.control}
        name="companyContentTemplate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Upload or paste 2-3 examples of your best content
            </FormLabel>
            <div className="space-y-3">
              {[0, 1, 2].map((index) => (
                <FormControl key={index}>
                  <Textarea
                    className="resize-none h-[100px]"
                    placeholder={`Example ${index + 1}`}
                    value={field.value?.[index] || ""}
                    onChange={(e) => {
                      const newValue = [...(field.value || [])];
                      newValue[index] = e.target.value;
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="companyVoiceTone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select voice tone:</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select your voice tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Technical level</SelectLabel>
                    {brandTones.map((type) => (
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
