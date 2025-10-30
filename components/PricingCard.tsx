"use client";

import { useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Button } from "./ui/button";

interface Props {
  id: string;
  name: string;
  price: number;
  caption: string;
  features: string[];
  highlighted: boolean;
  productID: string;
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

  const startCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_cart: [{ product_id: productID, quantity: 1 }],
          allowed_payment_method_types: [
            "credit",
            "debit",
            "apple_pay",
            "google_pay",
          ],
        }),
      });

      if (res.redirected) {
        window.location.assign(res.url);
        return;
      }

      const data = await res.json().catch(() => null as any);
      if (data?.url) {
        window.location.assign(data.url);
        return;
      }

      throw new Error("No checkout URL returned");
    } catch (err) {
      console.error(err);
      alert("Unable to start checkout. Please try again.");
    } finally {
      setLoading(false);
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
              onClick={startCheckout}
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
