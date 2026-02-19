import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { mockCourses, seedUsers } from "@/mocks/data";

// Get all users (admin only) from local seed/auth store
export function useAdminUsers() {
  const { role, user } = useAuth();

  return useQuery({
    queryKey: ["admin-users", user?.id],
    queryFn: async () => seedUsers.map((u) => ({ ...u, created_at: "" })),
    enabled: role === "admin",
  });
}

// Get all courses (mock)
export function useAdminCourses() {
  const { role } = useAuth();

  return useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => mockCourses,
    enabled: role === "admin",
  });
}

// Get pending review courses (none in mock)
export function usePendingCourses() {
  const { role } = useAuth();

  return useQuery({
    queryKey: ["pending-courses"],
    queryFn: async () => [],
    enabled: role === "admin",
  });
}

// Approve or reject a course (no-op in mock)
export function useReviewCourse() {
  return useMutation({
    mutationFn: async () => {
      return;
    },
  });
}

// Update user role (mock)
export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      role,
    }: {
      userId: string;
      role: "learner" | "instructor" | "admin";
    }) => ({ userId, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
}

// Get platform analytics (mock)
export function useAdminAnalytics() {
  const { role } = useAuth();

  return useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const usersByRole = {
        learner: seedUsers.filter((u) => u.role === "learner").length,
        instructor: seedUsers.filter((u) => u.role === "instructor").length,
        admin: seedUsers.filter((u) => u.role === "admin").length,
      };

      return {
        totalUsers: seedUsers.length,
        totalCourses: mockCourses.length,
        publishedCourses: mockCourses.length,
        totalEnrollments: 1,
        completedEnrollments: 0,
        certificatesIssued: 0,
        pendingReviews: 0,
        usersByRole,
        completionRate: 0,
      };
    },
    enabled: role === "admin",
  });
}
