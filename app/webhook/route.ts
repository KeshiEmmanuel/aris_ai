import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
const webhook = new Webhook(process.env.DODO_WEBHOOK_KEY!); // Replace with your secret key generated from the Dodo Payments Dashboard

export async function POST(request: Request) {
  const headersList = headers();
  const rawBody = await request.text();

  const webhookHeaders = {
    "webhook-id": (await headersList).get("webhook-id") || "",
    "webhook-signature": (await headersList).get("webhook-signature") || "",
    "webhook-timestamp": (await headersList).get("webhook-timestamp") || "",
  };

  await webhook.verify(rawBody, webhookHeaders);
  const payload = JSON.parse(rawBody);

  console.log(payload);

  // Process the payload according to your business logic
}
