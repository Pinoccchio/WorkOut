"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // For demo purposes, use a simple mock login
    // In a real application, this would be an actual API call
    setTimeout(() => {
      if (email === "admin@workout.com" && password === "admin123") {
        // Successful login - redirect to admin dashboard
        router.push("/admin/dashboard");
      } else {
        // Failed login
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white dark:bg-background shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-primary">
              WorkOut
            </span>
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-8">Admin Log In</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-accent/30 dark:bg-accent/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="email@example.com"
              required
            />
          </div>
          
          <div className="mb-8">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-accent/30 dark:bg-accent/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 btn-primary py-3"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            
            <Link href="/admin/signup" className="flex-1 btn-outline py-3 text-center">
              Sign Up
            </Link>
          </div>
          
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
        </form>
        
        <div className="mt-8 pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Return to <Link href="/" className="text-primary hover:underline">main site</Link>
          </p>
        </div>
      </div>
    </div>
  );
}