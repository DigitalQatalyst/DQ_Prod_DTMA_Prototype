import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

export interface EligibilityTest {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  passing_score: number;
  time_limit_minutes: number | null;
  is_required: boolean;
}

export interface EligibilityQuestion {
  id: string;
  test_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  sort_order: number;
}

export interface EligibilityAttempt {
  id: string;
  user_id: string;
  test_id: string;
  course_id: string;
  score: number;
  passed: boolean;
  answers: Record<string, number> | null;
  attempted_at: string;
}

// All eligibility flows are mocked out for the front-end only experience.

export function useEligibilityTest(courseId: string) {
  return useQuery({
    queryKey: ["eligibility-test", courseId],
    queryFn: async () => null as EligibilityTest | null,
    enabled: !!courseId,
  });
}

export function useEligibilityQuestions(testId: string | undefined) {
  return useQuery({
    queryKey: ["eligibility-questions", testId],
    queryFn: async () => [],
    enabled: !!testId,
  });
}

export function useEligibilityStatus(courseId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["eligibility-status", user?.id, courseId],
    queryFn: async () => ({
      hasPassed: true,
      attempts: 0,
      lastAttempt: null,
    }),
    enabled: !!user && !!courseId,
  });
}

export function useSubmitEligibilityTest() {
  return { mutateAsync: async () => ({ passed: true, score: 100 }), isPending: false };
}
