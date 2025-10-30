import { Webhooks } from "@dodopayments/nextjs";

/**
 * Dodo Payments Webhook Handler
 * Docs: https://docs.dodopayments.com/developer-resources/nextjs-adaptor
 *
 * Ensure the following env var is set:
 * - DODO_WEBHOOK_SECRET
 *
 * Configure your Dodo dashboard to POST webhooks to the deployed URL ending with `/webhook`.
 */
export const POST = Webhooks({
  webhookKey: process.env.DODO_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    // Called for every verified event
    console.log("Dodo webhook:", payload.type);
  },

  // Payment lifecycle
  onPaymentSucceeded: async (payload) => {
    console.log("payment.succeeded:", payload.data?.payment_id);
    // TODO: Mark payment as successful in your DB and grant entitlements if applicable
  },
  onPaymentFailed: async (payload) => {
    console.log("payment.failed:", payload.data?.payment_id);
    // TODO: Record failure and surface to user or retry flows
  },
  onPaymentProcessing: async (payload) => {
    console.log("payment.processing:", payload.data?.payment_id);
  },
  onPaymentCancelled: async (payload) => {
    console.log("payment.cancelled:", payload.data?.payment_id);
  },

  // Subscription lifecycle
  onSubscriptionActive: async (payload) => {
    console.log("subscription.active:", payload.data?.subscription_id);
    // TODO: Grant user access to paid features
  },
  onSubscriptionRenewed: async (payload) => {
    console.log("subscription.renewed:", payload.data?.subscription_id);
  },
  onSubscriptionPlanChanged: async (payload) => {
    console.log("subscription.plan_changed:", payload.data?.subscription_id);
  },
  onSubscriptionCancelled: async (payload) => {
    console.log("subscription.cancelled:", payload.data?.subscription_id);
    // TODO: Revoke or schedule downgrade
  },
  onSubscriptionFailed: async (payload) => {
    console.log("subscription.failed:", payload.data?.subscription_id);
  },
  onSubscriptionExpired: async (payload) => {
    console.log("subscription.expired:", payload.data?.subscription_id);
  },

  // Refunds
  onRefundSucceeded: async (payload) => {
    console.log("refund.succeeded:", payload.data?.refund_id);
  },
  onRefundFailed: async (payload) => {
    console.log("refund.failed:", payload.data?.refund_id);
  },

  // Disputes
  onDisputeOpened: async (payload) => {
    console.log("dispute.opened:", payload.data?.dispute_id);
  },
  onDisputeExpired: async (payload) => {
    console.log("dispute.expired:", payload.data?.dispute_id);
  },
  onDisputeAccepted: async (payload) => {
    console.log("dispute.accepted:", payload.data?.dispute_id);
  },
  onDisputeCancelled: async (payload) => {
    console.log("dispute.cancelled:", payload.data?.dispute_id);
  },
  onDisputeChallenged: async (payload) => {
    console.log("dispute.challenged:", payload.data?.dispute_id);
  },
  onDisputeWon: async (payload) => {
    console.log("dispute.won:", payload.data?.dispute_id);
  },
  onDisputeLost: async (payload) => {
    console.log("dispute.lost:", payload.data?.dispute_id);
  },

  // License keys
  onLicenseKeyCreated: async (payload) => {
    console.log("license_key.created:", payload.data?.id);
  },
});
