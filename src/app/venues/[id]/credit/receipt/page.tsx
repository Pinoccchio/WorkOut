"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getVenueById } from "@/data/venues";

export default function CreditReceiptPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const venueId = parseInt(params.id);
  const venue = venueId ? getVenueById(venueId) : null;
  
  const [isLoading, setIsLoading] = useState(true);
  const [receipt, setReceipt] = useState<{
    bookingId: string;
    date: string;
    venueCharge: number;
    foodOrders: Array<{ name: string; price: number; }>;
    creditApplied: number;
    totalDue: number;
  } | null>(null);
  
  useEffect(() => {
    // Simulate API call to get receipt data
    setTimeout(() => {
      // Mock receipt data
      setReceipt({
        bookingId: "WO-" + Math.floor(10000 + Math.random() * 90000),
        date: new Date().toLocaleDateString(),
        venueCharge: 15.00,
        foodOrders: [
          { name: "Cappuccino", price: 4.50 },
          { name: "Avocado Toast", price: 8.95 },
        ],
        creditApplied: 15.00,
        totalDue: 13.45 - 15.00, // Negative means they have remaining credit
      });
      
      setIsLoading(false);
    }, 1000);
  }, []);
  
  if (!venue || isLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading receipt...</p>
        </div>
      </div>
    );
  }
  
  if (!receipt) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Receipt not found</p>
          <Link href={`/venues/${venueId}`} className="btn-primary">
            Return to Venue
          </Link>
        </div>
      </div>
    );
  }
  
  const owesMoney = receipt.totalDue > 0;
  
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
                {owesMoney ? '-' : ''} ${Math.abs(receipt.totalDue).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Receipt</h1>
          
          <div className="workout-card p-6 mb-6">
            <div className="flex justify-between mb-4 pb-4 border-b border-border">
              <div>
                <h2 className="font-medium">{venue.name}</h2>
                <p className="text-sm text-muted-foreground">{venue.location.address}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Booking #{receipt.bookingId}</p>
                <p className="text-sm text-muted-foreground">{receipt.date}</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <p>Workspace</p>
                <p>${receipt.venueCharge.toFixed(2)}</p>
              </div>
              
              {receipt.foodOrders.length > 0 && (
                <>
                  <div className="pt-3 border-t border-border">
                    <p className="font-medium mb-2">Food & Beverage</p>
                    {receipt.foodOrders.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <p>{item.name}</p>
                        <p>${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between">
                  <p>Credit Applied</p>
                  <p>-${receipt.creditApplied.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between font-bold">
                  <p>Total Due</p>
                  <p className={owesMoney ? 'text-red-500' : 'text-green-500'}>
                    {owesMoney ? '' : '-'}${Math.abs(receipt.totalDue).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Thank you for using WorkOut!</p>
              <p>Need assistance? Contact support@workoutapp.com</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <Link href={`/venues/${venueId}/credit/status`} className="btn-outline w-full py-3 text-center">
              Back to Status
            </Link>
            
            <Link href={`/venues/${venueId}`} className="btn-primary w-full py-3 text-center">
              Return to Venue
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}