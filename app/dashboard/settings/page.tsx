"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Building2, Target, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { CompanyContext, userInfoSchema } from "@/lib/schema";
import { useEffect, useState } from "react";
import getUserPersona, {
  updateUserPersona,
} from "@/utils/actions/companies.actions";

const SettingsPage = () => {
  const [newUserPersona, setNewUserPersona] = useState<CompanyContext>();

  useEffect(() => {
    async function fetchUserPersona() {
      const data = await getUserPersona();
      console.log(data);
      const currentCompany: CompanyContext = {
        companyName: data.company_name,
        companyProductDescription: data.product_description,
        companyIndustry: data.industry,
        targetAudienceJobTitle: data.target_audience,
        targetAudienceTechnicalLevel: data.technical_level,
        companyVoiceTone: data.brand_voice_style,
        companyContentTemplate: data.brand_voice_samples,
        companyProductBenefits: data.key_benefits,
        companyKeyDifferentiator: data.differentiator,
      };
      setNewUserPersona(currentCompany);
    }
    fetchUserPersona();
  }, []);

  const form = useForm<CompanyContext>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      companyName: "",
      companyProductDescription: "",
      companyIndustry: "",
      targetAudienceJobTitle: "",
      targetAudienceTechnicalLevel: "",
      companyContentTemplate: [""],
      companyVoiceTone: "",
      companyProductBenefits: [""],
      companyKeyDifferentiator: "",
    },
  });

  useEffect(() => {
    if (newUserPersona) {
      form.reset({
        companyName: newUserPersona.companyName,
        companyProductDescription: newUserPersona.companyProductDescription,
        companyIndustry: newUserPersona.companyIndustry,
        targetAudienceJobTitle: newUserPersona.targetAudienceJobTitle,
        targetAudienceTechnicalLevel:
          newUserPersona.targetAudienceTechnicalLevel,
        companyContentTemplate: newUserPersona.companyContentTemplate || [
          "",
          "",
        ],
        companyVoiceTone: newUserPersona.companyVoiceTone,
        companyProductBenefits: newUserPersona.companyProductBenefits || [""],
        companyKeyDifferentiator: newUserPersona.companyKeyDifferentiator,
      });
    }
  }, [form, newUserPersona]);

  const onSubmit = async (data: CompanyContext) => {
    console.log("Form data:", data);

    try {
      await updateUserPersona(data);
      toast.success("Company information updated successfully!", {
        description: "Your business profile has been saved.",
      });
    } catch (error) {
      console.error("Error updating user persona:", error);
      toast.error("Failed to update company information!", {
        description: "Please try again later.",
      });
      return;
    }

    toast.success("Company information updated successfully!", {
      description: "Your business profile has been saved.",
    });
  };

  const addContentTemplate = () => {
    const current = form.getValues("companyContentTemplate");
    if (current.length < 3) {
      form.setValue("companyContentTemplate", [...current, ""]);
    }
  };

  const removeContentTemplate = (index: number) => {
    const current = form.getValues("companyContentTemplate");
    if (current.length > 2) {
      form.setValue(
        "companyContentTemplate",
        current.filter((_, i) => i !== index),
      );
    }
  };

  const addBenefit = () => {
    const current = form.getValues("companyProductBenefits");
    form.setValue("companyProductBenefits", [...current, ""]);
  };

  const removeBenefit = (index: number) => {
    const current = form.getValues("companyProductBenefits");
    if (current.length > 1) {
      form.setValue(
        "companyProductBenefits",
        current.filter((_, i) => i !== index),
      );
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Company Information
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us understand your business to deliver personalized content and
            insights
          </p>
        </div>

        <div className=" rounded-2xl shadow-lg border border-border p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Company Basics Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Company Basics
                  </h2>
                </div>

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corporation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyIndustry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="SaaS, E-commerce, Healthcare..."
                          {...field}
                        />
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
                      <FormLabel>Product Description</FormLabel>
                      <FormDescription>
                        Describe your product or service in detail
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="We provide an AI-powered platform that helps businesses..."
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Target Audience Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <Target className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Target Audience
                  </h2>
                </div>

                <FormField
                  control={form.control}
                  name="targetAudienceJobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Job Titles</FormLabel>
                      <FormDescription>
                        Who are your ideal customers? (e.g., Marketing
                        Directors, CTOs)
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Marketing Directors, Growth Managers, CMOs..."
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
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
                      <FormLabel>Technical Level</FormLabel>
                      <FormDescription>
                        How technical is your audience?
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Non-technical business users"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Content Templates Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Content Examples
                  </h2>
                </div>

                <div className="space-y-4">
                  <FormLabel>Content Templates</FormLabel>
                  <FormDescription>
                    Provide 2-3 examples of your existing content (2 minimum, 3
                    maximum)
                  </FormDescription>

                  {form.watch("companyContentTemplate").map((_, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`companyContentTemplate.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormControl>
                              <Textarea
                                placeholder={`Content example ${index + 1}...`}
                                className="min-h-[120px] resize-none flex-1"
                                {...field}
                              />
                            </FormControl>
                            {form.watch("companyContentTemplate").length >
                              2 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeContentTemplate(index)}
                                className="shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}

                  {form.watch("companyContentTemplate").length < 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addContentTemplate}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Content Example
                    </Button>
                  )}
                </div>
              </div>

              {/* Voice & Messaging Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Voice & Messaging
                  </h2>
                </div>

                <FormField
                  control={form.control}
                  name="companyVoiceTone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voice & Tone</FormLabel>
                      <FormDescription>
                        How would you describe your brand's voice?
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Professional, friendly, and approachable"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyKeyDifferentiator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Differentiator</FormLabel>
                      <FormDescription>
                        What makes your company unique in the market?
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Unlike other solutions, we offer..."
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormLabel>Product Benefits</FormLabel>
                  <FormDescription>
                    List the key benefits of your product
                  </FormDescription>

                  {form.watch("companyProductBenefits").map((_, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`companyProductBenefits.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input
                                placeholder={`Benefit ${index + 1}`}
                                {...field}
                                className="flex-1"
                              />
                            </FormControl>
                            {form.watch("companyProductBenefits").length >
                              1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeBenefit(index)}
                                className="shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addBenefit}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Benefit
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 h-12 text-base font-semibold"
                >
                  Save Information
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  className="h-12"
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
