import { useState } from "react";
import {
  KeyRound,
  Lock,
  Mail,
  Shield,
  UserCheck,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  learnerBody,
  learnerBodyMuted,
  learnerCaption,
  learnerBtnPrimary,
  learnerCardTitle,
  learnerIconWell,
  learnerItemTitle,
  learnerPanel,
  learnerSectionHeading,
  microLabel,
} from "@/lib/brandAccent";
import { cn } from "@/lib/utils";

const fieldLabel = "mb-1.5 block text-xs font-medium text-dq-navy";

function ProfileSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn(learnerPanel, "p-5 lg:p-6")}>
      <h3 className={cn(learnerSectionHeading, "mb-1")}>{title}</h3>
      {description ? (
        <p className={cn(learnerBodyMuted, "mb-4 text-sm")}>{description}</p>
      ) : (
        <div className="mb-4" />
      )}
      {children}
    </section>
  );
}

export default function SMSMyProfilePanel() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionAlerts, setSessionAlerts] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const getInitials = (name: string | null) => {
    if (!name) return "AM";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handlePasswordSave = () => {
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      toast({
        title: "Missing fields",
        description: "Complete all password fields before saving.",
        variant: "destructive",
      });
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      toast({
        title: "Passwords do not match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }
    setPasswordForm({ current: "", next: "", confirm: "" });
    toast({
      title: "Password updated",
      description: "Your Academy Manager account password has been changed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className={cn(learnerPanel, "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5 lg:p-6")}>
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile?.avatar_url || undefined} />
          <AvatarFallback className="bg-dq-navy text-sm text-white">
            {getInitials(profile?.full_name ?? null)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className={cn(microLabel, "mb-1 text-dq-orange")}>Academy Manager account</p>
          <h3 className={learnerCardTitle}>{profile?.full_name || "Academy Manager"}</h3>
          <p className={cn(learnerBodyMuted, "text-sm")}>
            Manage your personal platform login, security, and access settings.
          </p>
        </div>
      </div>

      <ProfileSection
        title="Email"
        description="Primary email for sign-in, security alerts, and platform notifications."
      >
        <div className="grid gap-4 sm:max-w-xl">
          <div>
            <Label htmlFor="am-email" className={fieldLabel}>
              <Mail className="mr-1.5 inline h-3.5 w-3.5" />
              Account email
            </Label>
            <Input
              id="am-email"
              value={profile?.email || ""}
              disabled
              className="h-10 bg-gray-50 text-sm"
            />
          </div>
          <p className={cn(learnerBodyMuted, "text-xs")}>
            Contact your platform administrator to change the login email on this account.
          </p>
        </div>
      </ProfileSection>

      <ProfileSection
        title="Password"
        description="Update the password used to access the Academy Manager portal."
      >
        <div className="grid gap-4 sm:max-w-xl">
          <div>
            <Label htmlFor="current-password" className={fieldLabel}>
              Current password
            </Label>
            <Input
              id="current-password"
              type="password"
              value={passwordForm.current}
              onChange={(event) =>
                setPasswordForm((prev) => ({ ...prev, current: event.target.value }))
              }
              className="h-10 text-sm"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="new-password" className={fieldLabel}>
                New password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={passwordForm.next}
                onChange={(event) =>
                  setPasswordForm((prev) => ({ ...prev, next: event.target.value }))
                }
                className="h-10 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className={fieldLabel}>
                Confirm new password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordForm.confirm}
                onChange={(event) =>
                  setPasswordForm((prev) => ({ ...prev, confirm: event.target.value }))
                }
                className="h-10 text-sm"
              />
            </div>
          </div>
          <Button type="button" className={learnerBtnPrimary} onClick={handlePasswordSave}>
            <Lock className="mr-2 h-4 w-4" />
            Update password
          </Button>
        </div>
      </ProfileSection>

      <ProfileSection
        title="Security Settings"
        description="Protect your Academy Manager account with additional security controls."
      >
        <div className="space-y-4">
          <div className={cn(learnerPanel, "flex items-start justify-between gap-4 rounded-xl p-4")}>
            <div>
              <p className={learnerItemTitle}>Two-factor authentication</p>
              <p className={cn(learnerBodyMuted, "mt-1 text-sm")}>
                Require a verification code when signing in from a new device.
              </p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>
          <div className={cn(learnerPanel, "flex items-start justify-between gap-4 rounded-xl p-4")}>
            <div>
              <p className={learnerItemTitle}>New session alerts</p>
              <p className={cn(learnerBodyMuted, "mt-1 text-sm")}>
                Email me when a new browser or location accesses this account.
              </p>
            </div>
            <Switch checked={sessionAlerts} onCheckedChange={setSessionAlerts} />
          </div>
          <Button type="button" variant="outline" className="rounded-full border-gray-200">
            <Shield className="mr-2 h-4 w-4" />
            Review active sessions
          </Button>
        </div>
      </ProfileSection>

      <ProfileSection
        title="User Credentials"
        description="Platform identity details for your Academy Manager login."
      >
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className={cn(learnerPanel, "rounded-xl border-gray-200 bg-gray-50 p-4")}>
            <dt className={cn(microLabel, "mb-1 block text-gray-400")}>Platform role</dt>
            <dd className={learnerItemTitle}>Academy Manager</dd>
          </div>
          <div className={cn(learnerPanel, "rounded-xl border-gray-200 bg-gray-50 p-4")}>
            <dt className={cn(microLabel, "mb-1 block text-gray-400")}>User ID</dt>
            <dd className={cn(learnerBody, "font-mono text-sm")}>
              {profile?.id || "am-manager-001"}
            </dd>
          </div>
          <div className={cn(learnerPanel, "rounded-xl border-gray-200 bg-gray-50 p-4")}>
            <dt className={cn(microLabel, "mb-1 block text-gray-400")}>Portal access</dt>
            <dd className={learnerItemTitle}>AMS Portal</dd>
          </div>
          <div className={cn(learnerPanel, "rounded-xl border-gray-200 bg-gray-50 p-4")}>
            <dt className={cn(microLabel, "mb-1 block text-gray-400")}>Credential status</dt>
            <dd className="flex items-center gap-2 text-sm font-medium text-emerald-700">
              <KeyRound className="h-4 w-4" />
              Verified
            </dd>
          </div>
        </dl>
      </ProfileSection>

      <ProfileSection
        title="Account Access Information"
        description="Recent access activity and account status for this platform user."
      >
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className={cn(learnerPanel, "rounded-xl p-4")}>
            <dt className={cn(microLabel, "mb-1 block text-gray-400")}>Last sign-in</dt>
            <dd className={learnerBody}>Today at 08:42 (GST)</dd>
          </div>
          <div className={cn(learnerPanel, "rounded-xl p-4")}>
            <dt className={cn(microLabel, "mb-1 block text-gray-400")}>Account status</dt>
            <dd className="flex items-center gap-2 text-sm font-medium text-emerald-700">
              <UserCheck className="h-4 w-4" />
              Active
            </dd>
          </div>
          <div className={cn(learnerPanel, "rounded-xl p-4")}>
            <dt className={cn(microLabel, "mb-1 block text-gray-400")}>Access scope</dt>
            <dd className={learnerBody}>Academy operations, billing, accreditation, finance</dd>
          </div>
          <div className={cn(learnerPanel, "rounded-xl p-4")}>
            <dt className={cn(microLabel, "mb-1 block text-gray-400")}>Password last changed</dt>
            <dd className={learnerBody}>12 Feb 2026</dd>
          </div>
        </dl>
      </ProfileSection>
    </div>
  );
}
