import {
  FormControl,
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
import { UseFormReturn } from "react-hook-form";
import { userInfoSchema } from "@/lib/schema";
import z from "zod";
type UserInfoFormValues = z.infer<typeof userInfoSchema>;

export default function CompanyInfoStep({
  form,
}: {
  form: UseFormReturn<UserInfoFormValues>;
}) {
  const technicalLevels = [
    "Technical",
    "Non-Technical",
    "Mixed",
    "Very Technical",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Your Target Audience</h1>
        <p className="text-sm text-gray-300">
          give us infomation about your target audience
        </p>
      </div>
      <FormField
        control={form.control}
        name="targetAudienceJobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Who are your primary users? (job titles): </FormLabel>
            <FormControl>
              <Input placeholder="e.g. Software Engineer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="targetAudienceTechnicalLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Technical level</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Technical level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Technical level</SelectLabel>
                    {technicalLevels.map((type) => (
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
