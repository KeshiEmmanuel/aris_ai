import { PlanFeatures } from "@/types";

export class SubscriptionService {
  static readonly PLANS = {
    FREE: {
      maxContentGeneration: 5,
      hasEarlyAccess: false,
      hasAIEditor: false,
      share: false,
    } as PlanFeatures,
    BOOTSTRAPPER: {
      maxContentGeneration: 30,
      hasEarlyAccess: true,
      hasAIEditor: true,
      share: true,
    } as PlanFeatures,
    GROWTH: {
      maxContentGeneration: 80,
      hasEarlyAccess: true,
      hasAIEditor: true,
      share: true,
    } as PlanFeatures,
  };
}
