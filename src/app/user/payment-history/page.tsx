"use client";

import { useState } from "react";
import Link from "next/link";

// Mock payment data
interface Payment {
  id: string;
  date: Date;
  amount: number;
  type: "booking" | "order" | "membership" | "credit";
  status: "completed" | "pending" | "failed" | "refunded";
  reference: string;
  venue?: string;
  paymentMethod: string;
}

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "inv_1",
      date: new Date(2025, 7, 5), // August 5, 2025
      amount: 25.99,
      type: "booking",
      status: "completed",
      reference: "WO-78423",
      venue: "Urban Coffee Co.",
      paymentMethod: "Visa •••• 4242"
    },
    {
      id: "inv_2",
      date: new Date(2025, 7, 3), // August 3, 2025
      amount: 8.75,
      type: "order",
      status: "completed",
      reference: "WO-78120",
      venue: "Urban Coffee Co.",
      paymentMethod: "Visa •••• 4242"
    },
    {
      id: "inv_3",
      date: new Date(2025, 7, 1), // August 1, 2025
      amount: 15.00,
      type: "credit",
      status: "completed",
      reference: "CR-45678",
      paymentMethod: "Visa •••• 4242"
    },
    {
      id: "inv_4",
      date: new Date(2025, 6, 28), // July 28, 2025
      amount: 22.50,
      type: "booking",
      status: "refunded",
      reference: "WO-77985",
      venue: "Tech Hub",
      paymentMethod: "Mastercard •••• 5678"
    },
    {
      id: "inv_5",
      date: new Date(2025, 6, 25), // July 25, 2025
      amount: 49.99,
      type: "membership",
      status: "completed",
      reference: "MEM-10022",
      paymentMethod: "PayPal"
    }
  ]);
  
  const [filter, setFilter] = useState<string>("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  
  // Filter payments based on selection
  const filteredPayments = filter === "all" 
    ? payments 
    : payments.filter(payment => payment.type === filter);
  
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      case "refunded":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-accent/50 text-muted-foreground";
    }
  };
  
  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "booking":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
        );
      case "order":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.38a48.474 48.474 0 0 0-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265z" />
          </svg>
        );
      case "membership":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
        );
      case "credit":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
          </svg>
        );
    }
  };
  
  // Format payment type for display
  const formatType = (type: string) => {
    switch (type) {
      case "booking":
        return "Workspace Booking";
      case "order":
        return "Food & Beverage";
      case "membership":
        return "Membership Fee";
      case "credit":
        return "Credit Purchase";
      default:
        return type;
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>
      
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${filter === "all" ? "bg-primary text-white" : "bg-accent/50 hover:bg-accent"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("booking")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${filter === "booking" ? "bg-primary text-white" : "bg-accent/50 hover:bg-accent"}`}
        >
          Bookings
        </button>
        <button
          onClick={() => setFilter("order")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${filter === "order" ? "bg-primary text-white" : "bg-accent/50 hover:bg-accent"}`}
        >
          Food & Beverage
        </button>
        <button
          onClick={() => setFilter("membership")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${filter === "membership" ? "bg-primary text-white" : "bg-accent/50 hover:bg-accent"}`}
        >
          Membership
        </button>
        <button
          onClick={() => setFilter("credit")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${filter === "credit" ? "bg-primary text-white" : "bg-accent/50 hover:bg-accent"}`}
        >
          Credits
        </button>
      </div>
      
      {filteredPayments.length === 0 ? (
        <div className="workout-card p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">No Payments Found</h2>
          <p className="text-muted-foreground">You don't have any payment records matching your filter.</p>
        </div>
      ) : (
        <div className="workout-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Reference</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-accent/30">
                    <td className="px-4 py-3">
                      {payment.date.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="mr-2">{getTypeIcon(payment.type)}</span>
                        <span>{formatType(payment.type)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div>{payment.reference}</div>
                        {payment.venue && (
                          <div className="text-sm text-muted-foreground">{payment.venue}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">${payment.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusBadge(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="text-primary hover:underline text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Payment details modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto p-6 m-4">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-medium">Payment Details</h2>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="workout-card p-4">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
                  <div>
                    <h3 className="font-medium">{formatType(selectedPayment.type)}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPayment.reference}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(selectedPayment.status)}`}>
                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{selectedPayment.date.toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">${selectedPayment.amount.toFixed(2)}</span>
                  </div>
                  
                  {selectedPayment.venue && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Venue</span>
                      <span>{selectedPayment.venue}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span>{selectedPayment.paymentMethod}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="py-2 px-4 bg-accent/50 hover:bg-accent rounded-md"
                >
                  Close
                </button>
                <button
                  className="py-2 px-4 btn-primary"
                >
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <Link 
          href="/user/payment-methods" 
          className="text-primary flex items-center hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
          </svg>
          Manage Payment Methods
        </Link>
      </div>
    </div>
  );
}