import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

interface ProviderRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  headline?: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  providerType: "individual" | "institution";
}

interface ProviderPayoutData {
  bankAccountHolder: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
}

export function useRegisterProvider() {
  const { signUp } = useAuth();

  return useMutation({
    mutationFn: async (data: ProviderRegistrationData) => {
      // First, create the user account via auth with providerType
      const { error: authError } = await signUp(
        data.email,
        data.password,
        `${data.firstName} ${data.lastName}`,
        "instructor",
        data.providerType // Pass providerType to auth
      );

      if (authError) {
        throw authError;
      }

      // Then register as provider via API
      const response = await apiClient.registerProvider(data);

      if (!response.success) {
        throw new Error(response.error || "Failed to register as provider");
      }

      return response.data;
    },
  });
}

export function useUpdateProviderProfile() {
  return useMutation({
    mutationFn: async ({
      providerId,
      data,
    }: {
      providerId: string;
      data: Partial<ProviderRegistrationData>;
    }) => {
      const response = await apiClient.updateProviderProfile(providerId, data);

      if (!response.success) {
        throw new Error(response.error || "Failed to update profile");
      }

      return response.data;
    },
  });
}

export function useAddPayoutInfo() {
  return useMutation({
    mutationFn: async ({
      providerId,
      data,
    }: {
      providerId: string;
      data: ProviderPayoutData;
    }) => {
      const response = await apiClient.addPayoutInfo(providerId, data);

      if (!response.success) {
        throw new Error(response.error || "Failed to add payout information");
      }

      return response.data;
    },
  });
}

export function useSubmitProviderForVerification() {
  return useMutation({
    mutationFn: async (providerId: string) => {
      const response = await apiClient.submitProviderForVerification(providerId);

      if (!response.success) {
        throw new Error(
          response.error || "Failed to submit for verification"
        );
      }

      return response.data;
    },
  });
}

export function useVerifyProviderEmail() {
  return useMutation({
    mutationFn: async ({
      providerId,
      verificationCode,
    }: {
      providerId: string;
      verificationCode: string;
    }) => {
      const response = await apiClient.verifyProviderEmail(
        providerId,
        verificationCode
      );

      if (!response.success) {
        throw new Error(response.error || "Failed to verify email");
      }

      return response.data;
    },
  });
}
