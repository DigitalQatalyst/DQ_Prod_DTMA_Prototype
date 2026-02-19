import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { loadCourses, loadEnrollments } from "./useCourses";

export interface EligibilityRequirement {
  id: string;
  type: "language" | "document" | "prerequisite";
  required: boolean;
  description: string;
  details?: Record<string, any>;
}

export interface EligibilityCheck {
  courseId: string;
  requirements: EligibilityRequirement[];
}

export interface EligibilityStatus {
  courseId: string;
  userId: string;
  passed: boolean;
  requirements: {
    id: string;
    type: string;
    met: boolean;
    reason?: string;
  }[];
  verifiedAt?: string;
}

export interface DocumentUpload {
  id: string;
  courseId: string;
  userId: string;
  requirementId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  status: "pending" | "approved" | "rejected";
}

// Mock eligibility requirements per course
const mockEligibilityRequirements: Record<string, EligibilityCheck> = {
  "course-1": {
    courseId: "course-1",
    requirements: [
      {
        id: "lang-1",
        type: "language",
        required: true,
        description: "English Proficiency",
        details: { minLevel: "intermediate" },
      },
      {
        id: "doc-1",
        type: "document",
        required: true,
        description: "Professional Credentials or Certification",
        details: { acceptedTypes: ["pdf", "jpg", "png"], maxSize: 5242880 },
      },
    ],
  },
  "course-2": {
    courseId: "course-2",
    requirements: [
      {
        id: "lang-2",
        type: "language",
        required: true,
        description: "English Proficiency",
        details: { minLevel: "intermediate" },
      },
      {
        id: "doc-2",
        type: "document",
        required: true,
        description: "Professional Credentials or Certification",
        details: { acceptedTypes: ["pdf", "jpg", "png"], maxSize: 5242880 },
      },
    ],
  },
  "course-3": {
    courseId: "course-3",
    requirements: [
      {
        id: "lang-3",
        type: "language",
        required: true,
        description: "English Proficiency",
        details: { minLevel: "intermediate" },
      },
      {
        id: "doc-3",
        type: "document",
        required: true,
        description: "Professional Credentials or Certification",
        details: { acceptedTypes: ["pdf", "jpg", "png"], maxSize: 5242880 },
      },
    ],
  },
};

// Storage keys
const ELIGIBILITY_STATUS_KEY = "eligibility_status";
const DOCUMENT_UPLOADS_KEY = "document_uploads";
const LANGUAGE_CONFIRMATION_KEY = "language_confirmation";

// Load eligibility status from localStorage
export const loadEligibilityStatus = (): EligibilityStatus[] => {
  const raw = localStorage.getItem(ELIGIBILITY_STATUS_KEY);
  return raw ? JSON.parse(raw) : [];
};

// Save eligibility status
export const saveEligibilityStatus = (status: EligibilityStatus[]) => {
  localStorage.setItem(ELIGIBILITY_STATUS_KEY, JSON.stringify(status));
};

// Load document uploads
export const loadDocumentUploads = (): DocumentUpload[] => {
  const raw = localStorage.getItem(DOCUMENT_UPLOADS_KEY);
  return raw ? JSON.parse(raw) : [];
};

// Save document uploads
export const saveDocumentUploads = (uploads: DocumentUpload[]) => {
  localStorage.setItem(DOCUMENT_UPLOADS_KEY, JSON.stringify(uploads));
};

// Load language confirmations
export const loadLanguageConfirmations = (): Record<string, boolean> => {
  const raw = localStorage.getItem(LANGUAGE_CONFIRMATION_KEY);
  return raw ? JSON.parse(raw) : {};
};

// Save language confirmations
export const saveLanguageConfirmations = (confirmations: Record<string, boolean>) => {
  localStorage.setItem(LANGUAGE_CONFIRMATION_KEY, JSON.stringify(confirmations));
};

// Get eligibility requirements for a course
export function useEligibilityRequirements(courseId: string) {
  return useQuery({
    queryKey: ["eligibility-requirements", courseId],
    queryFn: async () => {
      return mockEligibilityRequirements[courseId] || { courseId, requirements: [] };
    },
    enabled: !!courseId,
  });
}

// Check eligibility status for a learner
export function useCheckEligibility(courseId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["eligibility-check", user?.id, courseId],
    queryFn: async () => {
      if (!user) return { passed: false, requirements: [] };

      const requirements = mockEligibilityRequirements[courseId]?.requirements || [];
      const enrollments = loadEnrollments();
      const documentUploads = loadDocumentUploads();
      const languageConfirmations = loadLanguageConfirmations();
      const courses = loadCourses();

      const checkResults = requirements.map((req) => {
        if (req.type === "language") {
          const confirmed = languageConfirmations[`${user.id}-${courseId}`] === true;
          return {
            id: req.id,
            type: "language",
            met: confirmed,
            reason: confirmed ? undefined : "English proficiency not confirmed",
          };
        }

        if (req.type === "document") {
          const uploaded = documentUploads.some(
            (d) =>
              d.userId === user.id &&
              d.courseId === courseId &&
              d.requirementId === req.id &&
              d.status === "approved"
          );
          return {
            id: req.id,
            type: "document",
            met: uploaded,
            reason: uploaded ? undefined : "Required document not uploaded or approved",
          };
        }

        return { id: req.id, type: req.type, met: false };
      });

      const passed = checkResults.every((r) => r.met);

      return {
        courseId,
        userId: user.id,
        passed,
        requirements: checkResults,
        verifiedAt: passed ? new Date().toISOString() : undefined,
      };
    },
    enabled: !!user && !!courseId,
  });
}

// Confirm language proficiency
export function useConfirmLanguageProficiency() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) throw new Error("Must be logged in");
      const confirmations = loadLanguageConfirmations();
      confirmations[`${user.id}-${courseId}`] = true;
      saveLanguageConfirmations(confirmations);
      return confirmations;
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ["eligibility-check", user?.id, courseId] });
    },
  });
}

// Upload document for eligibility
export function useUploadEligibilityDocument() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      courseId,
      requirementId,
      file,
    }: {
      courseId: string;
      requirementId: string;
      file: File;
    }) => {
      if (!user) throw new Error("Must be logged in");

      // Validate file
      const maxSize = 5242880; // 5MB
      if (file.size > maxSize) {
        throw new Error("File size exceeds 5MB limit");
      }

      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Invalid file type. Only PDF, JPG, and PNG are allowed");
      }

      // Create document upload record
      const upload: DocumentUpload = {
        id: `doc-${Math.random().toString(36).slice(2, 10)}`,
        courseId,
        userId: user.id,
        requirementId,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        status: "approved", // Auto-approve for MVP
      };

      const uploads = loadDocumentUploads();
      uploads.push(upload);
      saveDocumentUploads(uploads);

      return upload;
    },
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["eligibility-check", user?.id, courseId] });
    },
  });
}

// Mark eligibility as verified
export function useVerifyEligibility() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) throw new Error("Must be logged in");

      const status: EligibilityStatus = {
        courseId,
        userId: user.id,
        passed: true,
        requirements: [],
        verifiedAt: new Date().toISOString(),
      };

      const statuses = loadEligibilityStatus();
      const existing = statuses.findIndex((s) => s.userId === user.id && s.courseId === courseId);
      if (existing >= 0) {
        statuses[existing] = status;
      } else {
        statuses.push(status);
      }
      saveEligibilityStatus(statuses);

      return status;
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ["eligibility-check", user?.id, courseId] });
    },
  });
}
