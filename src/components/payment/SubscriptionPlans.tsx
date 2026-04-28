import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";

interface SubscriptionPlansProps {
  currentCoursePrice: number;
  onSelectPlan: (planType: 'single' | 'basic' | 'premium') => void;
  currentCourseId: string;
}

export function SubscriptionPlans({ currentCoursePrice, onSelectPlan, currentCourseId }: SubscriptionPlansProps) {
  // Define which courses are included in each tier
  const basicCourseIds = [
    'digital-economy-1',
    'digital-cognitive-org-1',
    'digital-business-platform-1',
  ];

  const premiumCourseIds = [
    'digital-economy-1',
    'digital-cognitive-org-1',
    'digital-business-platform-1',
    'digital-transformation-1',
    'digital-worker-1',
    'digital-accelerators-1',
  ];

  const isInBasic = basicCourseIds.includes(currentCourseId);
  const isInPremium = premiumCourseIds.includes(currentCourseId);

  const plans = [
    {
      id: 'single',
      name: 'Single Course',
      price: currentCoursePrice,
      period: 'one-time',
      description: 'Access to this course only',
      features: [
        'Lifetime access to this course',
        'All course materials',
        'Certificate upon completion',
        'Course Tutor AI support',
      ],
      badge: null,
      buttonText: 'Buy This Course',
      buttonVariant: 'outline' as const,
      available: true,
    },
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 79,
      period: 'month',
      description: 'Access to first 3 courses',
      features: [
        'Access to 3 foundational courses',
        'Mastering Economy 4.0',
        'Digital Cognitive Organisations',
        'Digital Business Platforms',
        'All course materials & certificates',
        'Course Tutor AI support',
      ],
      badge: isInBasic ? 'Includes This Course' : null,
      buttonText: 'Subscribe to Basic',
      buttonVariant: 'hero' as const,
      available: true,
      savings: isInBasic ? `Save $${(149 * 3 - 79).toFixed(0)}` : null,
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 129,
      period: 'month',
      description: 'Access to all 6 courses',
      features: [
        'Access to ALL 6 courses',
        'All Basic Plan courses',
        'Digital Transformation 2.0',
        'Digital Workers & Workspaces',
        'Digital Accelerators',
        'Priority support',
      ],
      badge: 'Most Popular',
      buttonText: 'Subscribe to Premium',
      buttonVariant: 'hero' as const,
      available: true,
      savings: isInPremium ? `Save $${(149 * 6 - 129).toFixed(0)}` : null,
      highlight: true,
    },
  ];

  return (
    <div className="space-y-4 max-h-[80vh] overflow-y-auto">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-1">Choose Your Plan</h3>
        <p className="text-sm text-muted-foreground">
          Select how you'd like to access "Mastering Economy 4.0"
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl border-2 p-4 transition-all ${
              plan.highlight
                ? 'border-[#ff6b4d] bg-[#ff6b4d]/5 shadow-lg scale-[1.02]'
                : 'border-border bg-card hover:border-[#ff6b4d]/50'
            }`}
          >
            {plan.badge && (
              <Badge
                className={`absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 ${
                  plan.highlight
                    ? 'bg-[#ff6b4d] text-white'
                    : 'bg-green-600 text-white'
                }`}
              >
                {plan.highlight && <Sparkles className="w-3 h-3 mr-1" />}
                {plan.badge}
              </Badge>
            )}

            <div className="text-center mb-4">
              <h4 className="text-base font-semibold mb-1">{plan.name}</h4>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-2xl font-bold">${plan.price}</span>
                <span className="text-xs text-muted-foreground">/{plan.period}</span>
              </div>
              <p className="text-xs text-muted-foreground">{plan.description}</p>
              {plan.savings && (
                <Badge variant="outline" className="mt-1 text-xs border-green-600 text-green-600">
                  {plan.savings}
                </Badge>
              )}
            </div>

            <ul className="space-y-1.5 mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-xs">
                  <Check className="w-3 h-3 text-[#ff6b4d] flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.buttonVariant}
              size="sm"
              className={`w-full text-xs ${
                plan.buttonVariant === 'hero'
                  ? 'bg-[#ff6b4d] hover:bg-[#e56045] text-white'
                  : plan.buttonVariant === 'outline'
                  ? 'border-[#1e2348] text-[#1e2348] hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]'
                  : ''
              }`}
              onClick={() => onSelectPlan(plan.id as 'single' | 'basic' | 'premium')}
              disabled={!plan.available}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <p>All plans include 30-day money-back guarantee</p>
        <p className="mt-0.5">Cancel subscription anytime • No hidden fees</p>
      </div>
    </div>
  );
}
