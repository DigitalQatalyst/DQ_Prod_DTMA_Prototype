import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";

interface SubscriptionPlansProps {
  currentCoursePrice: number;
  onSelectPlan: (planType: "single" | "basic" | "premium") => void;
  currentCourseId: string;
  courseTitle?: string;
}

export function SubscriptionPlans({
  currentCoursePrice,
  onSelectPlan,
  currentCourseId,
  courseTitle = "this course",
}: SubscriptionPlansProps) {
  const basicCourseIds = [
    "digital-economy-1",
    "digital-cognitive-org-1",
    "digital-business-platform-1",
  ];

  const premiumCourseIds = [
    "digital-economy-1",
    "digital-cognitive-org-1",
    "digital-business-platform-1",
    "digital-transformation-1",
    "digital-worker-1",
    "digital-accelerators-1",
  ];

  const isInBasic = basicCourseIds.includes(currentCourseId);
  const isInPremium = premiumCourseIds.includes(currentCourseId);

  const plans = [
    {
      id: "single" as const,
      name: "Single Course",
      price: currentCoursePrice,
      period: "one-time",
      description: "This course only",
      features: ["Lifetime access", "All materials", "Certificate", "AI support"],
      badge: null,
      buttonText: "Buy This Course",
      buttonVariant: "outline" as const,
    },
    {
      id: "basic" as const,
      name: "Basic Plan",
      price: 79,
      period: "month",
      description: "First 3 courses",
      features: ["3 foundational courses", "Materials & certificates", "AI support", "Cancel anytime"],
      badge: isInBasic ? "Includes This Course" : null,
      buttonText: "Subscribe to Basic",
      buttonVariant: "hero" as const,
      savings: isInBasic ? `Save $${(149 * 3 - 79).toFixed(0)}` : null,
    },
    {
      id: "premium" as const,
      name: "Premium Plan",
      price: 129,
      period: "month",
      description: "All 6 courses",
      features: ["All 6 courses", "Everything in Basic", "Priority support", "Cancel anytime"],
      badge: "Most Popular",
      buttonText: "Subscribe to Premium",
      buttonVariant: "hero" as const,
      savings: isInPremium ? `Save $${(149 * 6 - 129).toFixed(0)}` : null,
      highlight: true,
    },
  ];

  return (
    <div className="space-y-3 overflow-hidden">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-dq-navy">Choose Your Plan</h3>
        <p className="text-xs text-gray-500">Select how you&apos;d like to access &quot;{courseTitle}&quot;</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex min-w-0 flex-col rounded-xl border p-3 ${
              plan.highlight
                ? "border-dq-orange bg-orange-50/40"
                : "border-gray-200 bg-white"
            }`}
          >
            {plan.badge && (
              <Badge
                className={`absolute -top-2 left-1/2 max-w-[90%] -translate-x-1/2 truncate px-1.5 py-0 text-[10px] ${
                  plan.highlight ? "bg-dq-orange text-white" : "bg-green-600 text-white"
                }`}
              >
                {plan.highlight && <Sparkles className="mr-0.5 inline h-2.5 w-2.5" />}
                {plan.badge}
              </Badge>
            )}

            <div className="mb-2 pt-1 text-center">
              <h4 className="text-sm font-semibold text-dq-navy">{plan.name}</h4>
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-xl font-semibold text-dq-navy">${plan.price}</span>
                <span className="text-[10px] text-gray-500">/{plan.period}</span>
              </div>
              <p className="text-[10px] text-gray-500">{plan.description}</p>
              {plan.savings && (
                <Badge variant="outline" className="mt-1 border-green-600 px-1 py-0 text-[10px] text-green-600">
                  {plan.savings}
                </Badge>
              )}
            </div>

            <ul className="mb-3 flex-1 space-y-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-1.5 text-[10px] leading-tight text-gray-600">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-dq-orange" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.buttonVariant}
              size="sm"
              className={`h-8 w-full text-[11px] ${
                plan.buttonVariant === "hero"
                  ? "bg-dq-orange text-white hover:bg-[#E04020]"
                  : "border-gray-300 text-dq-navy hover:border-dq-orange hover:bg-dq-orange hover:text-white"
              }`}
              onClick={() => onSelectPlan(plan.id)}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>

      <p className="text-center text-[10px] leading-relaxed text-gray-500">
        30-day money-back guarantee · Cancel anytime · No hidden fees
      </p>
    </div>
  );
}
