import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  CheckCircle,
  CreditCard,
  AlertCircle,
} from "lucide-react";

const MasterclassBooking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<"confirmation" | "payment" | "success">("confirmation");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    agreeTerms: false,
    agreeRefund: false,
  });
  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Mock session data
  const session = {
    id: 1,
    title: "Advanced Facial Contouring Masterclass",
    date: "18–19 March 2026",
    location: "Dubai",
    price: 1200,
  };

  const handleConfirmation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms || !formData.agreeRefund) {
      toast({
        title: "Please agree to terms",
        description: "You must agree to the terms and refund policy to proceed.",
        variant: "destructive",
      });
      return;
    }

    setCurrentStep("payment");
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !paymentData.cardName ||
      !paymentData.cardNumber ||
      !paymentData.expiryDate ||
      !paymentData.cvv
    ) {
      toast({
        title: "Missing payment details",
        description: "Please fill in all payment information.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Save booking to localStorage
      const bookings = JSON.parse(localStorage.getItem("masterclass_bookings") || "[]");
      bookings.push({
        id: Date.now(),
        sessionId: id,
        sessionTitle: session.title,
        sessionDate: session.date,
        sessionLocation: session.location,
        price: session.price,
        bookingDate: new Date().toISOString(),
        status: "confirmed",
        confirmationNumber: `MC-${Date.now()}`,
      });
      localStorage.setItem("masterclass_bookings", JSON.stringify(bookings));

      setIsProcessing(false);
      setCurrentStep("success");

      toast({
        title: "Booking confirmed!",
        description: "Check your email for confirmation details.",
      });
    }, 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h1 className="text-3xl font-semibold text-foreground mb-4">
                Sign In Required
              </h1>
              <p className="text-muted-foreground mb-8">
                Please sign in to your account to complete your booking.
              </p>
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <Link
              to={`/masterclass/${id}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to session
            </Link>

            <h1 className="text-4xl font-semibold text-foreground mb-2">
              Complete Your Booking
            </h1>
            <p className="text-muted-foreground mb-12">
              {session.title} • {session.date}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                {/* Step Indicator */}
                <div className="flex gap-4 mb-12">
                  <div
                    className={`flex-1 h-2 rounded-full transition-colors ${
                      currentStep === "confirmation" ||
                      currentStep === "payment" ||
                      currentStep === "success"
                        ? "bg-primary"
                        : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`flex-1 h-2 rounded-full transition-colors ${
                      currentStep === "payment" || currentStep === "success"
                        ? "bg-primary"
                        : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`flex-1 h-2 rounded-full transition-colors ${
                      currentStep === "success" ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                </div>

                {/* Confirmation Step */}
                {currentStep === "confirmation" && (
                  <form onSubmit={handleConfirmation} className="space-y-6">
                    <div className="bg-card rounded-2xl border border-border p-6">
                      <h2 className="text-xl font-semibold text-foreground mb-4">
                        Booking Confirmation
                      </h2>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between pb-4 border-b border-border">
                          <span className="text-muted-foreground">
                            Attendee Name
                          </span>
                          <span className="font-medium text-foreground">
                            {user.email}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pb-4 border-b border-border">
                          <span className="text-muted-foreground">Session</span>
                          <span className="font-medium text-foreground">
                            {session.title}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-medium text-foreground">
                            {session.date}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <Checkbox
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                agreeTerms: checked as boolean,
                              })
                            }
                            className="mt-1"
                          />
                          <span className="text-sm text-muted-foreground">
                            I agree to the Terms of Service and understand the
                            session details
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                          <Checkbox
                            checked={formData.agreeRefund}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                agreeRefund: checked as boolean,
                              })
                            }
                            className="mt-1"
                          />
                          <span className="text-sm text-muted-foreground">
                            I understand the refund policy: Full refund if
                            cancelled 30 days before, 50% if 15-29 days before,
                            no refund within 14 days
                          </span>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                )}

                {/* Payment Step */}
                {currentStep === "payment" && (
                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="bg-card rounded-2xl border border-border p-6">
                      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Details
                      </h2>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={paymentData.cardName}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                cardName: e.target.value,
                              })
                            }
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="4532 1234 5678 9010"
                            value={paymentData.cardNumber}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                cardNumber: e.target.value,
                              })
                            }
                            className="mt-2"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={paymentData.expiryDate}
                              onChange={(e) =>
                                setPaymentData({
                                  ...paymentData,
                                  expiryDate: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentData.cvv}
                              onChange={(e) =>
                                setPaymentData({
                                  ...paymentData,
                                  cvv: e.target.value,
                                })
                              }
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => setCurrentStep("confirmation")}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Complete Booking"}
                      </Button>
                    </div>
                  </form>
                )}

                {/* Success Step */}
                {currentStep === "success" && (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-semibold text-foreground mb-4">
                      Booking Confirmed!
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Your booking for {session.title} has been confirmed. Check
                      your email for confirmation details and pre-session
                      information.
                    </p>

                    <div className="bg-card rounded-2xl border border-border p-6 mb-8 text-left">
                      <h3 className="font-semibold text-foreground mb-4">
                        What's Next?
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            Check your email for confirmation
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            Add to your calendar
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            Review pre-session checklist
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        asChild
                      >
                        <Link to="/masterclasses">View Other Sessions</Link>
                      </Button>
                      <Button
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        asChild
                      >
                        <Link to="/dashboard">Go to Dashboard</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar - Order Summary */}
              <div className="md:col-span-1">
                <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6 pb-6 border-b border-border">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Session
                      </p>
                      <p className="font-medium text-foreground">
                        {session.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date</p>
                      <p className="font-medium text-foreground">
                        {session.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Location
                      </p>
                      <p className="font-medium text-foreground">
                        {session.location}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">
                        ${session.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium text-foreground">$0</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${session.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MasterclassBooking;
