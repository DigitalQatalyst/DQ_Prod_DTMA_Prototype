// API Service for BROWZ Academy
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const USE_MOCK_API = true; // Set to false when backend is ready

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

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

interface ProviderProfile {
  id: string;
  email: string;
  full_name: string;
  headline?: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  provider_type: "individual" | "institution";
  verification_status: "pending" | "approved" | "rejected";
  created_at: string;
}

class ApiClient {
  private baseUrl: string;
  private useMockApi: boolean;

  constructor(baseUrl: string, useMockApi: boolean = false) {
    this.baseUrl = baseUrl;
    this.useMockApi = useMockApi;
  }

  private generateProviderId(): string {
    return `provider-${Math.random().toString(36).slice(2, 10)}`;
  }

  private async mockRequest<T>(
    endpoint: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock responses for each endpoint
    if (endpoint.includes("/providers/register")) {
      const registrationData = data as ProviderRegistrationData;
      const mockProfile: ProviderProfile = {
        id: this.generateProviderId(),
        email: registrationData.email,
        full_name: `${registrationData.firstName} ${registrationData.lastName}`,
        headline: registrationData.headline,
        bio: registrationData.bio,
        website: registrationData.website,
        linkedin: registrationData.linkedin,
        provider_type: registrationData.providerType,
        verification_status: "pending",
        created_at: new Date().toISOString(),
      };
      return {
        success: true,
        data: mockProfile as T,
      };
    }

    if (endpoint.includes("/payouts")) {
      return {
        success: true,
        data: { success: true } as T,
      };
    }

    if (endpoint.includes("/verify-email")) {
      return {
        success: true,
        data: { success: true } as T,
      };
    }

    if (endpoint.includes("/submit-verification")) {
      const mockProfile: ProviderProfile = {
        id: this.generateProviderId(),
        email: "test@example.com",
        full_name: "Test User",
        provider_type: "individual",
        verification_status: "pending",
        created_at: new Date().toISOString(),
      };
      return {
        success: true,
        data: mockProfile as T,
      };
    }

    if (endpoint.includes("/profile")) {
      const mockProfile: ProviderProfile = {
        id: this.generateProviderId(),
        email: "test@example.com",
        full_name: "Test User",
        provider_type: "individual",
        verification_status: "pending",
        created_at: new Date().toISOString(),
      };
      return {
        success: true,
        data: mockProfile as T,
      };
    }

    // Default mock response
    return {
      success: true,
      data: {} as T,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    requestData?: any
  ): Promise<ApiResponse<T>> {
    // Use mock API if enabled
    if (this.useMockApi) {
      return this.mockRequest<T>(endpoint, requestData);
    }

    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        return {
          success: false,
          error: error.message || `HTTP ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Provider Registration
  async registerProvider(
    data: ProviderRegistrationData
  ): Promise<ApiResponse<ProviderProfile>> {
    return this.request<ProviderProfile>(
      "/providers/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      data
    );
  }

  // Update Provider Profile
  async updateProviderProfile(
    providerId: string,
    data: Partial<ProviderRegistrationData>
  ): Promise<ApiResponse<ProviderProfile>> {
    return this.request<ProviderProfile>(
      `/providers/${providerId}/profile`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
      data
    );
  }

  // Add Payout Information
  async addPayoutInfo(
    providerId: string,
    data: ProviderPayoutData
  ): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(
      `/providers/${providerId}/payouts`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      data
    );
  }

  // Get Provider Profile
  async getProviderProfile(
    providerId: string
  ): Promise<ApiResponse<ProviderProfile>> {
    return this.request<ProviderProfile>(`/providers/${providerId}`);
  }

  // Verify Provider Email
  async verifyProviderEmail(
    providerId: string,
    verificationCode: string
  ): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(
      `/providers/${providerId}/verify-email`,
      {
        method: "POST",
        body: JSON.stringify({ verificationCode }),
      },
      { verificationCode }
    );
  }

  // Submit Provider for Verification
  async submitProviderForVerification(
    providerId: string
  ): Promise<ApiResponse<ProviderProfile>> {
    return this.request<ProviderProfile>(
      `/providers/${providerId}/submit-verification`,
      {
        method: "POST",
      }
    );
  }
}

export const apiClient = new ApiClient(API_BASE_URL, USE_MOCK_API);
