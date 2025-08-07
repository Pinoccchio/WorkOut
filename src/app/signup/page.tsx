import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

export default function SignupPage() {
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
          
          <AuthForm type="signup" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}