import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertCircle,
  FileUp,
  Loader2,
  X,
} from "lucide-react";
import {
  useCheckEligibility,
  useConfirmLanguageProficiency,
  useUploadEligibilityDocument,
} from "@/hooks/useEligibilityCheck";
import { useToast } from "@/hooks/use-toast";

interface EligibilityCheckModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  courseName: string;
  onEligibilityVerified: () => void;
}

export function EligibilityCheckModal({
  open,
  onOpenChange,
  courseId,
  courseName,
  onEligibilityVerified,
}: EligibilityCheckModalProps) {
  const { toast } = useToast();
  const { data: eligibility, isLoading } = useCheckEligibility(courseId);
  const confirmLanguage = useConfirmLanguageProficiency();
  const uploadDocument = useUploadEligibilityDocument();
  const [languageConfirmed, setLanguageConfirmed] = useState(false);
  const [uploadingRequirementId, setUploadingRequirementId] = useState<string | null>(null);

  const handleLanguageConfirm = async () => {
    try {
      await confirmLanguage.mutateAsync(courseId);
      setLanguageConfirmed(true);
      toast({
        title: "Language proficiency confirmed",
        description: "You've confirmed your English proficiency.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDocumentUpload = async (
    requirementId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingRequirementId(requirementId);
    try {
      await uploadDocument.mutateAsync({
        courseId,
        requirementId,
        file,
      });
      toast({
        title: "Document uploaded",
        description: "Your document has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingRequirementId(null);
    }
  };

  const handleProceed = () => {
    if (eligibility?.passed) {
      onEligibilityVerified();
      onOpenChange(false);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const allMet = eligibility?.passed ?? false;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Eligibility Check</DialogTitle>
          <DialogDescription>
            Before enrolling in "{courseName}", please complete the following requirements.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* Status Summary */}
          <div
            className={`rounded-lg p-4 border ${
              allMet
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
            }`}
          >
            <div className="flex items-start gap-3">
              {allMet ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h3
                  className={`font-semibold ${
                    allMet
                      ? "text-green-800 dark:text-green-200"
                      : "text-amber-800 dark:text-amber-200"
                  }`}
                >
                  {allMet ? "All Requirements Met" : "Complete Requirements"}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    allMet
                      ? "text-green-700 dark:text-green-300"
                      : "text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {allMet
                    ? "You're eligible to proceed with enrollment."
                    : `${eligibility?.requirements.filter((r) => !r.met).length || 0} requirement(s) remaining`}
                </p>
              </div>
            </div>
          </div>

          {/* Requirements List */}
          <div className="space-y-4">
            {eligibility?.requirements.map((req) => {
              const requirement = eligibility.requirements.find((r) => r.id === req.id);
              const isMet = req.met;

              return (
                <div
                  key={req.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  {/* Requirement Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {isMet ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {req.type === "language" && "English Proficiency"}
                          {req.type === "document" && "Document Upload"}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {req.reason || "Requirement met"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        isMet
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {isMet ? "✓ Met" : "Pending"}
                    </span>
                  </div>

                  {/* Requirement Actions */}
                  {!isMet && (
                    <div className="pt-2 border-t">
                      {req.type === "language" && (
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={languageConfirmed}
                            onChange={(e) => {
                              setLanguageConfirmed(e.target.checked);
                              if (e.target.checked) {
                                handleLanguageConfirm();
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-foreground">
                            I confirm that I can understand and communicate in English
                          </span>
                        </label>
                      )}

                      {req.type === "document" && (
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Accepted formats: PDF, JPG, PNG (Max 5MB)
                          </p>
                          <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <FileUp className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {uploadingRequirementId === req.id
                                ? "Uploading..."
                                : "Click to upload document"}
                            </span>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleDocumentUpload(req.id, e)}
                              disabled={uploadingRequirementId === req.id}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="hero"
            onClick={handleProceed}
            disabled={!allMet || confirmLanguage.isPending || uploadDocument.isPending}
          >
            {confirmLanguage.isPending || uploadDocument.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Proceed to Checkout"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
