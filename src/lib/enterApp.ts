import type { NavigateFunction } from "react-router-dom";
import type { DemoJourneyId } from "@/contexts/AuthContext";

export const JOURNEY_DASHBOARD: Record<DemoJourneyId, string> = {
  learner: "/dashboard",
  instructor: "/dashboard",
  admin: "/admin",
  "academy-manager": "/sms-admin",
};

type SignInAsDemo = (journey: DemoJourneyId) => Promise<{ error: Error | null }>;

export async function enterAppAsJourney(
  journeyId: DemoJourneyId,
  signInAsDemo: SignInAsDemo,
  navigate: NavigateFunction,
  redirectTo?: string | null
): Promise<{ error: Error | null }> {
  const { error } = await signInAsDemo(journeyId);
  if (error) return { error };

  const destination = redirectTo ?? JOURNEY_DASHBOARD[journeyId];
  navigate(destination, { replace: true });
  return { error: null };
}
