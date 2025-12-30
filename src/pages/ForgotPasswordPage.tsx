import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" });

const ForgotPasswordPage = () => {
  const { resetPasswordRequest } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    
    try {
      const { error: authError } = await resetPasswordRequest(email);
      
      if (authError) {
        // Only show technical errors, not "user not found" type errors
        if (authError.message?.toLowerCase().includes("rate limit")) {
          setError("Too many requests. Please try again later.");
        } else if (authError.message?.toLowerCase().includes("network")) {
          setError("Network error. Please check your connection and try again.");
        }
        // For other errors (like user not found), still show success to prevent email enumeration
      }
      
      // Always show success to prevent email enumeration
      setSubmitted(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="glass-card p-8">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-dark via-primary to-blue-light flex items-center justify-center shadow-glow-blue">
                  <span className="text-primary-foreground font-bold text-lg">H</span>
                </div>
                <h1 className="font-display text-2xl font-bold mb-2">Reset your password</h1>
                <p className="text-muted-foreground text-sm">
                  {submitted 
                    ? "Check your email for a reset link" 
                    : "Enter your email and we'll send you a reset link"}
                </p>
              </div>

              {submitted ? (
                // Success state
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-foreground">
                    If an account exists for this email, we sent a reset link.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Didn't receive an email? Check your spam folder or try again.
                  </p>
                  <div className="pt-4 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSubmitted(false);
                        setEmail("");
                      }}
                    >
                      Try another email
                    </Button>
                    <Link to="/login" className="block">
                      <Button variant="gold" className="w-full">
                        Back to login
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                // Form state
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    {error && (
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                        {error}
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      variant="gold" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send reset link"}
                    </Button>
                  </form>

                  {/* Back to login */}
                  <div className="mt-6 text-center">
                    <Link 
                      to="/login" 
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPasswordPage;