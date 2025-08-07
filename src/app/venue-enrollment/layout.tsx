import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function VenueEnrollmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow workout-container py-8">
        <div className="mb-6">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              WorkOut
            </span>
          </Link>
        </div>
        
        {children}
      </main>
      
      <Footer />
    </div>
  );
}