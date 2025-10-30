import { Checkout } from "@dodopayments/nextjs";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { origin } = new URL(req.url);
  const handler = Checkout({
    bearerToken: process.env.DODO_TEST_PAYMENTS_API_KEY!,
    returnUrl: `${origin}/dashboard`,
    environment:
      process.env.NODE_ENV === "development" ? "test_mode" : "live_mode",
    type: "static",
  });

  return handler(req);
};

export const POST = async (req: NextRequest) => {
  const { origin } = new URL(req.url);
  const handler = Checkout({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
    returnUrl: `${origin}/dashboard`,
    environment:
      process.env.NODE_ENV === "development" ? "test_mode" : "live_mode",
    type: "session",
  });

  return handler(req);
};
