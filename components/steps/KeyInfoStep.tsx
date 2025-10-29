import { userInfoSchema } from "@/lib/schema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import z from "zod";
import { UseFormReturn } from "react-hook-form";

type UserInfoFormValues = z.infer<typeof userInfoSchema>;

export default function KeyInfoStep({
  form,
}: {
  form: UseFormReturn<UserInfoFormValues>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Key Information</h1>
        <p className="text-sm text-gray-300">
          Key information is crucial for establishing a strong brand identity
          and differentiating your company from competitors.
        </p>
      </div>
      <FormField
        control={form.control}
        name="companyProductBenefits"
        render={({ field }) => (
          <FormItem>
            <FormLabel>3 main product benefits:</FormLabel>
            <div className="space-y-3">
              {[0, 1, 2].map((index) => (
                <FormControl key={index}>
                  <Input
                    placeholder={`Benefit ${index + 1}`}
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
    </div>
  );
}
