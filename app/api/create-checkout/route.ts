
import { DodoPaymentsEnvironment } from "@/lib/dodopayments";
import { Checkout } from "@dodopayments/nextjs";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { origin } = new URL(req.url);
  const handler = Checkout({
    bearerToken: process.env.DODO_API_KEY_TEST!,
    returnUrl: `${origin}/dashboard`,
    environment: process.env
      .DODO_PAYMENTS_ENVIRONMENT as DodoPaymentsEnvironment,
    type: "static",
  });

  return handler(req);
};

export const POST = async (req: NextRequest) => {
  const { origin } = new URL(req.url);
  const handler = Checkout({
    bearerToken: process.env.DODO_API_KEY_TEST!,
    returnUrl: `${origin}/dashboard`,
    environment: process.env
      .DODO_PAYMENTS_ENVIRONMENT as DodoPaymentsEnvironment,
    type: "session",
  });

  return handler(req);
};