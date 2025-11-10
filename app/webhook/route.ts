import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/utils/actions/auth.actions";
import { Webhooks } from "@dodopayments/nextjs";

export const POST = Webhooks({
  webhookKey: process.env.DODO_WEBHOOK_SECRET!,

  onPaymentSucceeded: async (payload) => {
    await handlePaymentSuceeded(payload);
    console.log("Payment succeeded:", payload);
    // Update your database, send confirmation email, etc.
  },

  // Handle failed payments
  onPaymentFailed: async (payload) => {
    await handlePaymentFailed(payload);
    console.log("Payment failed:", payload);
    // Notify customer, log for review, etc.
  },

  // Handle subscription renewals
  onSubscriptionRenewed: async (payload) => {
    await handleSubscriptionRenewed(payload);

    console.log("Subscription renewed:", payload);
    // Extend user access, update billing date, etc.
  },
  onSubscriptionActive: async (payload) => {
    await manageSubscription(payload);
    console.log("Subscription Active:", payload);
    // Extend user access, update billing date, etc.
  },

  // Handle subscription cancellations
  onSubscriptionCancelled: async (payload) => {
    await handleSubscriptionCancelled(payload);
    console.log("Subscription cancelled:", payload);
    // Revoke access, send exit survey, etc.
  },
  // Handle subscription cancellations
  onSubscriptionExpired: async (payload) => {
    console.log("Subscription expired:", payload);
    // Revoke access, send exit survey, etc.
  },

  onRefundSucceeded: async (payload) => {
    await manageRefund(payload);
  },
  // Catch-all for any other events
  onPayload: async (payload) => {
    console.log("Other webhook event:", payload);
  },
});

const manageRefund = async (payload: any) => {
  const supabase = await createAdminClient();
  const refund = payload.data;
  console.log("💸 Refund created:", refund.refund_id);

  await supabase.from("refunds").insert({
    refund_id: refund.refund_id,
    payment_id: refund.payment_id,
    amount: refund.amount,
    reason: refund.reason,
    status: "pending",
    created_at: new Date().toISOString(),
  });
};

const manageSubscription = async (event: any) => {
  const { data } = event;

  const supabase = await createAdminClient();
  // Update or insert subscription in your database
  const { error } = await supabase.from("subscriptions").upsert(
    {
      subscription_id: data.subscription_id,
      customer_id: data.customer.customer_id,
      user_id: data.metadata?.user_id,
      product_id: data.product_id,
      status: data.status,
      price_cents: data.recurring_pre_tax_amount,
      currency: data.currency,
      billing_period: `${data.payment_frequency_count}_${data.payment_frequency_interval}`,
      quantity: data.quantity,
      current_period_start: data.previous_billing_date,
      current_period_end: data.next_billing_date,
      cancel_at_period_end: data.cancel_at_next_billing_date,
      cancelled_at: data.cancelled_at,
      trial_period_days: data.trial_period_days,
      tax_inclusive: data.tax_inclusive,
      on_demand: data.on_demand,
      metadata: data.metadata,
      billing_address: data.billing,
      updated_at: new Date().toISOString(),
      created_at: data.created_at,
    },
    {
      onConflict: "subscription_id",
    },
  );

  if (error) {
    console.error("❌ Error upserting subscription:", error);
    throw error;
  }
};

const handleSubscriptionCancelled = async (payload: any) => {
  const { data } = payload;
  const supabase = await createAdminClient();
  console.log("❌ Subscription cancelled:", data.subscription_id);

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: data.status,
      cancel_at_period_end: data.cancel_at_next_billing_date,
      cancelled_at: data.cancelled_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("subscription_id", data.subscription_id);

  if (error) throw error;
};

const handlePaymentSuceeded = async (payload: any) => {
  const payment = payload.data;
  const supabase = await createAdminClient();
  console.log(
    "💳 Payment succeeded:",
    payment.payment_id,
    `$${payment.amount / 100}`,
  );

  const { error } = await supabase.from("payments").insert({
    payment_id: payment.payment_id,
    customer_id: payment.customer.customer_id,
    subscription_id: payment.subscription_id,
    amount: payment.total_amount,
    currency: payment.currency,
    status: payment.status,
    payment_method: payment.payment_method, // 'card'
    created_at: payment.created_at || new Date().toISOString(),
  });

  if (error) throw error;

  // Update subscription with last successful payment
  if (payment.subscription_id) {
    await supabase
      .from("subscriptions")
      .update({
        last_payment_at: new Date().toISOString(),
        status: "active",
        updated_at: new Date().toISOString(),
      })
      .eq("subscription_id", payment.subscription_id);
  }
};

const handlePaymentFailed = async (payload: any) => {
  const supabase = await createAdminClient();
  const payment = payload.data;
  console.log("❌ Payment failed:", payment.payment_id);

  await supabase.from("payments").insert({
    payment_id: payment.payment_id,
    customer_id: payment.customer?.customer_id || payment.customer_id,
    subscription_id: payment.subscription_id,
    amount: payment.total_amount,
    currency: payment.settlement_currency || "USD",
    status: "failed",
    error_message: payment.error_message || payment.failure_reason,
    created_at: new Date().toISOString(),
  });

  // Mark subscription as past_due
  if (payment.subscription_id) {
    await supabase
      .from("subscriptions")
      .update({
        status: "past_due",
        updated_at: new Date().toISOString(),
      })
      .eq("subscription_id", payment.subscription_id);
  }
};

const handleSubscriptionRenewed = async (payload: any) => {
  const supabase = await createAdminClient();
  const { data } = payload;
  console.log("🔄 Subscription renewed:", data.subscription_id);

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: "active",
      current_period_start: data.previous_billing_date,
      current_period_end: data.next_billing_date,
      updated_at: new Date().toISOString(),
    })
    .eq("subscription_id", data.subscription_id);

  if (error) throw error;
};
