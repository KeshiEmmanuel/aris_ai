"use client";

import { useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Button } from "./ui/button";
import { getCurrentUser } from "@/utils/actions/auth.actions";
import { toast } from "sonner";

interface Props {
  id: string;
  name: string;
  price: number;
  caption: string;
  features: string[];
  highlighted: boolean;
  productID?: string;
}

export default function PricingCard({
  id,
  name,
  price,
  caption,
  features,
  highlighted,
  productID,
}: Props) {
  const [loading, setLoading] = useState(false);

  const checkoutProduct = async (productId: string) => {
    const currentUser = await getCurrentUser();
    setLoading(true);
    try {
      const response = await fetch(
        `${window.location.origin}/api/create-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_cart: [
              {
                product_id: productId,
                quantity: 1,
              },
            ],
            customer: {
              email: currentUser?.email,
              name: currentUser?.user_metadata.full_name,
            },
            metadata: {
              user_id: currentUser?.id,
            },
            return_url: `${window.location.origin}/dashboard`,
          }),
        },
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to create checkout session");
      }

      const { checkout_url } = await response.json();
      window.location.href = checkout_url;
      setLoading(false);
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
      toast.error("Failed to start checkout process");
    }
  };
  return (
    <article className="w-full" id={id}>
      <div className="bg-background shadow rounded-lg p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left section - Pricing info */}
          <div className="flex flex-col">
            <p className="text-xl text-left font-semibold mb-4">{name}</p>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-6xl text-orange-400 font-bold">${price}</p>
              <div className="text-sm text-gray-300">/month</div>
            </div>
            <Button
              className="mt-6 w-full bg-orange-400 lg:w-auto"
              onClick={() => checkoutProduct(productID as string, true)}
              disabled={loading}
              aria-busy={loading}
              aria-disabled={loading}
            >
              {loading ? "Starting checkout..." : "Get Started"}
            </Button>
          </div>

          {/* Right section - Features */}
          <div className="grid gap-3 content-start">
            {features.map((feature) => (
              <div
                key={feature}
                className="grid grid-cols-[auto_1fr] gap-2 items-start"
              >
                <IoCheckmarkCircleSharp
                  className="text-orange-400 mt-0.5"
                  size={20}
                />
                <p className="text-gray-300 text-left">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
