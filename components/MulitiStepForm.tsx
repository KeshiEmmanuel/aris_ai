"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CompanyInfoStep from "./steps/CompanyInfoStep";
import { userInfoSchema } from "@/lib/schema";
import useMulitiStep from "@/hooks/useMultipleStep";
import TargetAudienceStep from "./steps/TargetAudienceStep";
import BrandVoiceStep from "./steps/BrandVoiceStep";
import KeyInfoStep from "./steps/KeyInfoStep";
import { Form } from "./ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { createUserCompanyPersona } from "@/utils/actions/companies.actions";

export const MulitiStepForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof userInfoSchema>>({
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

  const { back, next, currentPageIndex, step, isLastStep, steps } =
    useMulitiStep([
      <CompanyInfoStep key={1} form={form} />,
      <TargetAudienceStep key={2} form={form} />,
      <BrandVoiceStep key={3} form={form} />,
      <KeyInfoStep key={4} form={form} />,
    ]);

  function StepProgressPercent() {
    const addedIndex = currentPageIndex + 1;
    const percentage = Math.round((addedIndex / steps) * 100);
    return percentage;
  }

  const percentage = StepProgressPercent();

  // Validate current step fields before moving to next
  const handleNext = async () => {
    const fields = getFieldsForStep(currentPageIndex);
    const isValid = await form.trigger(fields);
    console.log("isValid", isValid);
    if (isValid) {
      next();
    }
  };

  // Define which fields belong to which step
  const getFieldsForStep = (
    stepIndex: number,
  ): (keyof z.infer<typeof userInfoSchema>)[] => {
    switch (stepIndex) {
      case 0:
        return ["companyName", "companyProductDescription", "companyIndustry"];
      case 1:
        return ["targetAudienceJobTitle", "targetAudienceTechnicalLevel"];
      case 2:
        return ["companyVoiceTone", "companyContentTemplate"];
      case 3:
        return ["companyProductBenefits", "companyKeyDifferentiator"];
      default:
        return [];
    }
  };

  async function onSubmit(values: z.infer<typeof userInfoSchema>) {
    console.log(values);
    try {
      await createUserCompanyPersona(values);
      toast.success("Persona created successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Error creating persona!");
    }
  }

  return (
    <section>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[600px] h-[calc(100vh-110px)] mx-auto pt-30 font-sans"
          >
            <h1 className="absolute top-10 left-5">
              <span className="text-3xl">{currentPageIndex + 1}</span>/{steps}
            </h1>
            {step}
            <div className="absolute bottom-[100px] right-[200px] font-sans flex items-center">
              <Button
                type="button"
                className="bg-white text-background mr-2 hover:bg-orange-100"
                onClick={back}
              >
                <FaChevronLeft />
              </Button>

              {isLastStep ? (
                <Button
                  className="bg-orange-400 hover:bg-orange-50 hover:text-background"
                  type="submit"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-orange-400 hover:bg-orange-50 hover:text-background"
                  onClick={handleNext}
                >
                  <FaChevronRight />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
      <div
        className={`w-full h-2 bg-black absolute bottom-0 transition-all duration-300`}
      >
        <div
          className="bg-orange-400 h-2"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </section>
  );
};
