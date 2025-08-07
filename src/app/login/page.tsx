import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

function AuthFormSuspense({ type }: { type: "login" | "signup" }) {
  return (
    <Suspense fallback={
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    }>
      <AuthForm type={type} />
    </Suspense>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow workout-container py-12">
        <div className="flex flex-col items-center">
          <Link href="/" className="inline-block mb-8">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              WorkOut
            </span>
          </Link>
          
          <AuthFormSuspense type="login" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}