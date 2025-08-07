"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import AuthForm from "./AuthForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, initialType = "login" }: AuthModalProps) {
  const [authType, setAuthType] = useState<"login" | "signup">(initialType);

  useEffect(() => {
    setAuthType(initialType);
  }, [initialType]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg mx-4 animate-in slide-in-from-bottom duration-300">
        <div className="relative bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal content */}
          <div className="max-h-[90vh] overflow-y-auto">
            <AuthFormModal 
              type={authType} 
              onTypeChange={setAuthType}
              onSuccess={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface AuthFormModalProps {
  type: "login" | "signup";
  onTypeChange: (type: "login" | "signup") => void;
  onSuccess: () => void;
}

function AuthFormModal({ type, onTypeChange, onSuccess }: AuthFormModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    agreeTerms: false,
  });
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Validation
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all required fields");
      }
      
      if (type === "signup") {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        
        if (!formData.firstName || !formData.lastName) {
          throw new Error("Please provide your full name");
        }
        
        if (!formData.agreeTerms) {
          throw new Error("You must agree to the terms and conditions");
        }
      }
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Show not implemented message
      throw new Error(
        "Authentication is not yet implemented. Please use the 'Switch view to' menu in the header to access the User Dashboard, Venue Dashboard, or Admin Dashboard to explore the features."
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          {type === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-muted-foreground">
          {type === "login" 
            ? "Sign in to your WorkOut account" 
            : "Join WorkOut to find your perfect workspace"}
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className={`${
          error.includes("not yet implemented") 
            ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400" 
            : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
        } p-4 rounded-lg mb-6 text-sm`}>
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              {error}
              {error.includes("not yet implemented") && (
                <div className="mt-2 text-xs">
                  Look for the <strong>"Switch view to"</strong> dropdown in the navigation bar above.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="modal-email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="modal-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="your@email.com"
            required
          />
        </div>
        
        {/* Password */}
        <div>
          <label htmlFor="modal-password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="modal-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        
        {/* Sign Up Fields */}
        {type === "signup" && (
          <>
            {/* Confirm Password */}
            <div>
              <label htmlFor="modal-confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="modal-confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="modal-firstName" className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="modal-firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="modal-lastName" className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="modal-lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            
            {/* Terms */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="modal-agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="modal-agreeTerms" className="text-muted-foreground">
                  I agree to the{" "}
                  <a href="/terms-of-service" target="_blank" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" target="_blank" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
          </>
        )}
        
        {/* Login Extras */}
        {type === "login" && (
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="modal-remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="modal-remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="/forgot-password" className="text-primary hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>
        )}
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn-primary py-3 text-base font-medium"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : type === "login" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>

      {/* Social Login */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-background border border-border py-2.5 px-3 text-sm font-medium hover:bg-accent transition-colors"
      >
        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
          <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.08L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
          <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
          <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.075C15.0054 18.785 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.2154 17.14 5.2704 14.295L1.2804 17.39C3.2554 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Switch between login/signup */}
      <div className="mt-6 text-center text-sm">
        {type === "login" ? (
          <>
            Don't have an account?{" "}
            <button
              onClick={() => onTypeChange("signup")}
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => onTypeChange("login")}
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}