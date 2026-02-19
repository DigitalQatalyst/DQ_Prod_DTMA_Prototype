import { useAuth } from "@/contexts/AuthContext";

export function useUserRoles() {
  const { role, user } = useAuth();
  return {
    data: user ? [role ?? "learner"] : [],
    isLoading: false,
  };
}
