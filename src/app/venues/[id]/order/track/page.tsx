"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getVenueById } from "@/data/venues";

// Order status type
type OrderStatus = "placed" | "preparing" | "ready" | "completed" | "cancelled";

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const venueId = parseInt(params.id);
  const venue = venueId ? getVenueById(venueId) : null;
  
  // Mock order data
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("placed");
  const [creditBalance, setCreditBalance] = useState(13.00);
  const [orderId, setOrderId] = useState("WO-" + Math.floor(10000 + Math.random() * 90000));
  const [orderItems, setOrderItems] = useState([
    { name: "Latté", quantity: 1, price: 4.75 },
    { name: "Green Tea", quantity: 1, price: 3.86 }
  ]);
  
  // Mock status progression
  useEffect(() => {
    // Simulate order status updates
    const statusSequence: OrderStatus[] = ["placed", "preparing", "ready", "completed"];
    let currentIndex = 0;
    
    // Initial status is "placed"
    currentIndex = statusSequence.indexOf("placed");
    
    const intervalId = setInterval(() => {
      currentIndex++;
      
      if (currentIndex < statusSequence.length) {
        setOrderStatus(statusSequence[currentIndex]);
      } else {
        clearInterval(intervalId);
      }
    }, 8000); // Status changes every 8 seconds for demo
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Calculate order total
  const orderTotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  if (!venue) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Venue not found</p>
          <Link href="/find-workspace" className="btn-primary">
            Find a Workspace
          </Link>
        </div>
      </div>
    );
  }
  
  // Get progress step for the progress bar
  const getProgressStep = () => {
    switch (orderStatus) {
      case "placed": return 1;
      case "preparing": return 2;
      case "ready": case "completed": return 3;
      default: return 0;
    }
  };
  
  // Get status message
  const getStatusMessage = () => {
    switch (orderStatus) {
      case "placed":
        return "We've sent your order to the venue. You'll get an update once they accept it.";
      case "preparing":
        return "Your order is being prepared. This shouldn't take long!";
      case "ready":
        return "Your order is ready for pickup at the counter.";
      case "completed":
        return "Your order has been completed. Enjoy!";
      case "cancelled":
        return "Your order has been cancelled. Please contact staff for assistance.";
      default:
        return "";
    }
  };
  
  const handleCancelOrder = () => {
    setOrderStatus("cancelled");
    
    // Redirect to venue page after a delay
    setTimeout(() => {
      router.push(`/venues/${venueId}`);
    }, 3000);
  };
  
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
              <div className="font-bold">${creditBalance.toFixed(2)}</div>
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
      <main className="flex-grow p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">
            {orderStatus === "cancelled" ? "Order Cancelled" : "Order Placed!"}
          </h1>
          
          <p className="text-center text-muted-foreground mb-8">
            {getStatusMessage()}
          </p>
          
          {/* Progress Bar */}
          {orderStatus !== "cancelled" && (
            <div className="flex justify-between items-center mb-12">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${getProgressStep() >= 1 ? 'bg-primary text-white' : 'bg-accent/50 text-muted-foreground'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                  </svg>
                </div>
                <span className="text-xs text-center">Order Placed</span>
              </div>
              
              <div className={`flex-1 h-1 mx-2 ${getProgressStep() >= 2 ? 'bg-primary' : 'bg-accent/50'}`}></div>
              
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${getProgressStep() >= 2 ? 'bg-primary text-white' : 'bg-accent/50 text-muted-foreground'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                </div>
                <span className="text-xs text-center">Preparing</span>
              </div>
              
              <div className={`flex-1 h-1 mx-2 ${getProgressStep() >= 3 ? 'bg-primary' : 'bg-accent/50'}`}></div>
              
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${getProgressStep() >= 3 ? 'bg-primary text-white' : 'bg-accent/50 text-muted-foreground'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-xs text-center">Ready</span>
              </div>
            </div>
          )}
          
          {/* Order Details */}
          <div className="workout-card p-6 mb-6">
            <div className="flex justify-between mb-4 pb-4 border-b border-border">
              <div>
                <h2 className="font-medium">{venue.name}</h2>
                <p className="text-sm text-muted-foreground">{venue.location.address}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Order #{orderId}</p>
                <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between font-medium">
                <span>Item</span>
                <span>Qty.</span>
                <span>Price</span>
              </div>
              
              {orderItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              
              <div className="pt-4 mt-4 border-t border-border flex justify-between font-medium">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-4">
            {orderStatus === "placed" && (
              <button 
                onClick={handleCancelOrder}
                className="btn-primary w-full py-3 bg-red-500 hover:bg-red-600"
              >
                Cancel Order
              </button>
            )}
            
            <Link href={`/venues/${venueId}`} className="btn-outline w-full py-3 text-center inline-block">
              Return to Venue
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}