import PricingCard from "@/components/PricingCard";
import { Button } from "@/components/ui/button";
import { pricingPlan } from "@/lib/data";
import { BiPhoneCall } from "react-icons/bi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function PricingPage() {
  return (
    <main className="max-w-[1200px] mx-auto ">
      <div className="text-center pt-20">
        <h1 className="text-4xl font-bold">Our pricing</h1>
        <p className="text-gray-300 py-1">
          Zendt learns your company, your voice, your audience. Every piece
          sounds like you wrote it because it knows your brand.
        </p>
        <div className="py-12 max-w-[1200px] mx-auto flex gap-6 flex-col lg:flex-row">
          <div className="flex p-6 rounded-lg bg-orange-400 lg:w-[1200px] gap-5 flex-col">
            {pricingPlan.slice(0, 2).map((pricing) => (
              <PricingCard {...pricing} key={pricing.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
