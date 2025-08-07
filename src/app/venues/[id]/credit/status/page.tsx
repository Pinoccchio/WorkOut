"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getVenueById } from "@/data/venues";

export default function CreditStatusPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const venueId = parseInt(params.id);
  const venue = venueId ? getVenueById(venueId) : null;
  
  // For demo purposes, randomly decide if user owes money
  const [creditBalance, setCreditBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get credit balance
    setTimeout(() => {
      // Generate a random balance between -5.00 and +5.00
      const randomBalance = (Math.random() * 10 - 5).toFixed(2);
      setCreditBalance(parseFloat(randomBalance));
      setIsLoading(false);
    }, 1000);
  }, []);
  
  if (!venue || isLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading credit balance...</p>
        </div>
      </div>
    );
  }
  
  const owesMoney = creditBalance !== null && creditBalance < 0;
  const positiveCredit = creditBalance !== null && creditBalance > 0;
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-background/90 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary">
              WorkOut
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="mr-2 text-right">
              <div className="text-sm">Remaining Credit</div>
              <div className={`font-bold ${owesMoney ? 'text-red-500' : 'text-green-500'}`}>
                {owesMoney ? '-' : ''} ${Math.abs(creditBalance).toFixed(2)}
              </div>
            </div>
            
            <button className="p-2 bg-accent/50 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-2">
            You owe
          </h1>
          
          <p className={`text-6xl font-bold mb-8 ${owesMoney ? 'text-red-500' : 'text-primary'}`}>
            ${Math.abs(owesMoney ? creditBalance : 0).toFixed(2)}
          </p>
          
          {owesMoney ? (
            <p className="text-xl mb-16">
              Please seek a member of staff
            </p>
          ) : (
            <p className="text-xl mb-16">
              See you next time!
            </p>
          )}
          
          <button
            onClick={() => router.push(`/venues/${venueId}/credit/receipt`)}
            className="btn-primary w-full py-4 text-lg"
          >
            View Receipt
          </button>
          
          {!owesMoney && (
            <Link 
              href={`/venues/${venueId}/order`}
              className="btn-outline w-full py-4 text-lg mt-4"
            >
              Order Food & Drinks
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}