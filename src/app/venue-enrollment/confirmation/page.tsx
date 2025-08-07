"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VenueEnrollmentConfirmationPage() {
  const router = useRouter();
  
  // Mock application ID
  const applicationId = "VE-" + Math.floor(10000 + Math.random() * 90000);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="workout-card p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-600 dark:text-green-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your venue enrollment application has been received. We'll review your information and get back to you within 2-3 business days.
          </p>
        </div>
        
        <div className="bg-accent/50 rounded-md p-6 mb-8 text-left max-w-md mx-auto">
          <div className="flex justify-between mb-4 pb-4 border-b border-border">
            <p className="text-sm font-medium">Application ID</p>
            <p className="text-sm">{applicationId}</p>
          </div>
          
          <div className="flex justify-between mb-4 pb-4 border-b border-border">
            <p className="text-sm font-medium">Submission Date</p>
            <p className="text-sm">{new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="flex justify-between">
            <p className="text-sm font-medium">Status</p>
            <p className="text-sm bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded text-xs">Under Review</p>
          </div>
        </div>
        
        <div className="space-y-6 max-w-md mx-auto text-left mb-8">
          <h2 className="text-lg font-medium">What's Next?</h2>
          
          <ol className="space-y-4 pl-8 list-decimal">
            <li>
              <p className="font-medium">Application Review</p>
              <p className="text-sm text-muted-foreground">Our team will review your application to ensure all requirements are met.</p>
            </li>
            
            <li>
              <p className="font-medium">Verification Call</p>
              <p className="text-sm text-muted-foreground">A member of our team may schedule a brief call to discuss your venue and verify details.</p>
            </li>
            
            <li>
              <p className="font-medium">Venue Approval</p>
              <p className="text-sm text-muted-foreground">Once approved, you'll receive access to your venue dashboard where you can complete your profile.</p>
            </li>
            
            <li>
              <p className="font-medium">Go Live!</p>
              <p className="text-sm text-muted-foreground">After completing your profile, your venue will be live on the WorkOut platform, ready to welcome remote workers.</p>
            </li>
          </ol>
        </div>
        
        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-6">
            Have questions? Contact our venue support team at <span className="text-primary">venues@workoutapp.com</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="btn-outline w-full sm:w-auto">
              Return Home
            </Link>
            
            <Link href="/venue-enrollment" className="btn-primary w-full sm:w-auto">
              Submit Another Venue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}