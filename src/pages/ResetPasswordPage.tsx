import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { updatePassword, session } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validSession, setValidSession] = useState<boolean | null>(null);

  // Check if user has a valid recovery session
  useEffect(() => {
    // The reset link will have a hash fragment with the token
    // Supabase automatically handles this and creates a session
    const checkSession = async () => {
      // Give Supabase time to process the URL hash and establish session
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (session) {
        setValidSession(true);
      } else {
        // Check if we have hash params (recovery token)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');
        
        if (accessToken && type === 'recovery') {
          // Wait a bit more for the auth state to update
          await new Promise(resolve => setTimeout(resolve, 1000));
          setValidSession(!!session);
        } else {
          setValidSession(false);
        }
      }
    };

    checkSession();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    
    // Validate passwords
    const result = passwordSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      const errors: { password?: string; confirmPassword?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'password') {
          errors.password = err.message;
        } else if (err.path[0] === 'confirmPassword') {
          errors.confirmPassword = err.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    
    try {
      const { error: authError } = await updatePassword(password);
      
      if (authError) {
        setError(authError.message || "Failed to update password. Please try again.");
        return;
      }
      
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Loading state while checking session
  if (validSession === null) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="glass-card p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-dark via-primary to-blue-light flex items-center justify-center shadow-glow-blue animate-pulse">
                  <span className="text-primary-foreground font-bold text-lg">H</span>
                </div>
                <p className="text-muted-foreground">Verifying reset link...</p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Invalid or expired link
  if (validSession === false) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="glass-card p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-dark via-primary to-blue-light flex items-center justify-center shadow-glow-blue">
                  <span className="text-primary-foreground font-bold text-lg">H</span>
                </div>
                <h1 className="font-display text-2xl font-bold mb-2">Invalid or expired link</h1>
                <p className="text-muted-foreground text-sm mb-6">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
                <Link to="/forgot-password">
                  <Button variant="gold" className="w-full">
                    Request new reset link
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

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
                <h1 className="font-display text-2xl font-bold mb-2">
                  {success ? "Password updated" : "Set new password"}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {success 
                    ? "Your password has been successfully updated" 
                    : "Enter your new password below"}
                </p>
              </div>

              {success ? (
                // Success state
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-foreground">
                    You can now log in with your new password.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to login...
                  </p>
                  <Link to="/login">
                    <Button variant="gold" className="w-full">
                      Go to login
                    </Button>
                  </Link>
                </div>
              ) : (
                // Form state
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="password">New password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="text-destructive text-xs mt-1">{fieldErrors.password}</p>
                    )}
                    <p className="text-muted-foreground text-xs mt-1">
                      Must be 8+ characters with uppercase, lowercase, and number
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="text-destructive text-xs mt-1">{fieldErrors.confirmPassword}</p>
                    )}
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
                    {loading ? "Updating..." : "Set new password"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResetPasswordPage;