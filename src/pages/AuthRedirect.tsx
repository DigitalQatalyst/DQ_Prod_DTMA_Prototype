import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth, type DemoJourneyId } from "@/contexts/AuthContext";
import { enterAppAsJourney } from "@/lib/enterApp";

type AuthRedirectProps = {
  journey: DemoJourneyId;
};

const AuthRedirect = ({ journey }: AuthRedirectProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signInAsDemo, loading } = useAuth();
  const redirectTo = searchParams.get("redirect");

  useEffect(() => {
    if (loading) return;
    void enterAppAsJourney(journey, signInAsDemo, navigate, redirectTo);
  }, [loading, journey, signInAsDemo, navigate, redirectTo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-8 h-8 animate-spin text-[#ff4500]" />
    </div>
  );
};

export default AuthRedirect;
