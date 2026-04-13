// Finance & Billing — reuses the existing FinanceBillingGovernancePanel directly.
// It already covers payouts, reconciliation, exceptions, partner settlements,
// and audit history — exactly what the school manager needs.
import FinanceBillingGovernancePanel from "@/components/admin/stage4/FinanceBillingGovernancePanel";

export default function SMSFinancePanel() {
  return <FinanceBillingGovernancePanel />;
}
