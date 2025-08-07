import { getVenueById } from "@/data/venues";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  let venueId = 0;
  let venue = null;
  
  if (params && params.id) {
    venueId = parseInt(params.id);
    venue = getVenueById(venueId);
  }
  
  // Mock order data
  const orderNumber = "WO-" + Math.floor(10000 + Math.random() * 90000);
  const estimatedTime = "10-15 minutes";
  
  if (!venue) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow workout-container py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Venue not found</p>
            <Link href="/find-workspace" className="text-primary hover:underline">
              Find a different venue
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow workout-container py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-600 dark:text-green-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
            <p className="text-muted-foreground">
              Your order has been sent to {venue.name} for preparation.
            </p>
          </div>
          
          <div className="workout-card p-6 mb-8">
            <div className="flex justify-between mb-4 pb-4 border-b border-border">
              <div className="text-left">
                <h2 className="font-medium">{venue.name}</h2>
                <p className="text-sm text-muted-foreground">{venue.location.address}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Order #{orderNumber}</p>
                <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mb-4 pb-4 border-b border-border">
              <div className="flex justify-between mb-2">
                <p className="text-sm font-medium">Estimated Preparation Time</p>
                <p className="text-sm">{estimatedTime}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Pickup Location</p>
                <p className="text-sm">Counter</p>
              </div>
            </div>
            
            <div className="text-left">
              <p className="text-sm font-medium mb-2">Instructions:</p>
              <ol className="text-sm text-muted-foreground space-y-2 pl-5 list-decimal">
                <li>Wait for notification that your order is ready</li>
                <li>Proceed to the counter and show your order number</li>
                <li>Enjoy your order!</li>
              </ol>
            </div>
          </div>
          
          <div className="space-y-4">
            <Link href={`/venues/${venueId}`} className="btn-outline inline-block">
              Return to Venue
            </Link>
            <Link href="/user/bookings" className="btn-primary inline-block ml-4">
              View My Bookings
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}