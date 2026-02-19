import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

export interface Invite {
  id: string;
  code: string;
  role: "admin" | "instructor";
  email: string | null;
  created_by: string;
  expires_at: string;
  used_at: string | null;
  used_by: string | null;
  revoked_at: string | null;
  created_at: string;
}

// Invites are unused in the mock front-end; return empty data and no-ops.
export function useInvites() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["invites", user?.id],
    queryFn: async () => [],
    enabled: !!user,
  });
}

export function useCreateInvite() {
  return { mutateAsync: async () => {}, isPending: false };
}

export function useRevokeInvite() {
  return { mutateAsync: async () => {}, isPending: false };
}

export function useRedeemInvite() {
  return { mutateAsync: async () => ({ success: true }), isPending: false };
}

export function useValidateInvite(code: string | null) {
  return useQuery({
    queryKey: ["invite-validation", code],
    queryFn: async () => null,
    enabled: !!code,
  });
}
