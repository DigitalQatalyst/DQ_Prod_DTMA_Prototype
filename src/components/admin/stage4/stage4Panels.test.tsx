import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AnalyticsPerformanceInsightsPanel from "./AnalyticsPerformanceInsightsPanel";
import FinanceBillingGovernancePanel from "./FinanceBillingGovernancePanel";
import OperationsSupportPanel from "./OperationsSupportPanel";
import PartnerAccreditationReportingPanel from "./PartnerAccreditationReportingPanel";
import RecordsCertificationGovernancePanel from "./RecordsCertificationGovernancePanel";

describe("Stage 4 admin panels", () => {
  it("renders the finance governance workspace", () => {
    render(<FinanceBillingGovernancePanel />);

    expect(screen.getByText("Stage 4 Finance Governance")).toBeInTheDocument();
    expect(screen.getByText("Pending payout exposure")).toBeInTheDocument();
    expect(screen.getByText("Revenue matched rate")).toBeInTheDocument();
  });

  it("renders the partner and reporting workspace", () => {
    render(<PartnerAccreditationReportingPanel />);

    expect(screen.getByText("Partner, Accreditation & External Reporting")).toBeInTheDocument();
    expect(screen.getByText("Verification Console")).toBeInTheDocument();
    expect(screen.getByText("Submission History")).toBeInTheDocument();
  });

  it("renders the platform analytics workspace", () => {
    render(<AnalyticsPerformanceInsightsPanel />);

    expect(screen.getByText("Courses & Faculty")).toBeInTheDocument();
    expect(screen.getAllByText("Course Performance").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Enrolled/).length).toBeGreaterThan(0);
  });

  it("renders the platform operations workspace", () => {
    render(<OperationsSupportPanel />);

    expect(screen.getByText("Platform Operations, Support & User Provisioning")).toBeInTheDocument();
    expect(screen.getByText("Support Ticket Dashboard")).toBeInTheDocument();
    expect(screen.getByText("System Health Status")).toBeInTheDocument();
  });

  it("renders the records and certification workspace", () => {
    render(<RecordsCertificationGovernancePanel />);

    expect(screen.getByText("Records, Certification & Assessment Governance")).toBeInTheDocument();
    expect(screen.getByText("Validation Queue")).toBeInTheDocument();
    expect(screen.getByText("Fulfillment Dashboard")).toBeInTheDocument();
  });
});
