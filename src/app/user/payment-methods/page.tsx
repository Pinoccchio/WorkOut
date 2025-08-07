"use client";

import { useState } from "react";
import Link from "next/link";

// Mock payment method data
interface PaymentMethod {
  id: string;
  type: "credit" | "debit" | "paypal";
  name: string;
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: "credit",
      name: "Visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: "pm_2",
      type: "debit",
      name: "Mastercard",
      last4: "5678",
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    },
    {
      id: "pm_3",
      type: "paypal",
      name: "PayPal",
      last4: "",
      isDefault: false
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: ""
  });
  
  // Function to set a payment method as default
  const setAsDefault = (id: string) => {
    setPaymentMethods(prevMethods => 
      prevMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };
  
  // Function to remove a payment method
  const removePaymentMethod = (id: string) => {
    setPaymentMethods(prevMethods => 
      prevMethods.filter(method => method.id !== id)
    );
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new payment method (frontend only, no validation)
    const newPaymentMethod: PaymentMethod = {
      id: `pm_${Math.random().toString(36).substring(2, 9)}`,
      type: "credit",
      name: newCard.nameOnCard.includes("Visa") ? "Visa" : "Mastercard",
      last4: newCard.cardNumber.slice(-4),
      expiryMonth: parseInt(newCard.expiryMonth),
      expiryYear: parseInt(newCard.expiryYear),
      isDefault: paymentMethods.length === 0
    };
    
    setPaymentMethods(prev => [...prev, newPaymentMethod]);
    setShowAddForm(false);
    setNewCard({
      cardNumber: "",
      nameOnCard: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: ""
    });
  };
  
  // Render payment method card
  const renderPaymentMethodCard = (method: PaymentMethod) => {
    return (
      <div key={method.id} className={`workout-card p-4 mb-4 relative ${method.isDefault ? 'border-primary' : ''}`}>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-md bg-accent/50 flex items-center justify-center mr-4">
            {method.type === "credit" || method.type === "debit" ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
              </svg>
            )}
          </div>
          <div className="flex-grow">
            <div className="flex justify-between">
              <h3 className="font-medium">{method.name}</h3>
              {method.isDefault && (
                <span className="text-sm text-primary">Default</span>
              )}
            </div>
            {method.type !== "paypal" ? (
              <p className="text-sm text-muted-foreground">
                •••• •••• •••• {method.last4} | Expires {method.expiryMonth}/{method.expiryYear}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Connected Account</p>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          {!method.isDefault && (
            <button
              onClick={() => setAsDefault(method.id)}
              className="text-sm py-1 px-3 bg-accent/50 hover:bg-accent rounded-md"
            >
              Set as Default
            </button>
          )}
          <button
            onClick={() => removePaymentMethod(method.id)}
            className="text-sm py-1 px-3 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-md"
          >
            Remove
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>
      
      {paymentMethods.length === 0 ? (
        <div className="workout-card p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">No Payment Methods</h2>
          <p className="text-muted-foreground mb-6">You haven't added any payment methods yet.</p>
          <button 
            onClick={() => setShowAddForm(true)} 
            className="btn-primary py-2 px-4"
          >
            Add Payment Method
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            {paymentMethods.map(renderPaymentMethodCard)}
          </div>
          
          {!showAddForm && (
            <button 
              onClick={() => setShowAddForm(true)} 
              className="flex items-center text-primary mb-8"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Payment Method
            </button>
          )}
        </>
      )}
      
      {showAddForm && (
        <div className="workout-card p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Add Payment Method</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={newCard.cardNumber}
                onChange={handleInputChange}
                placeholder="•••• •••• •••• ••••"
                className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="nameOnCard">
                Name on Card
              </label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                value={newCard.nameOnCard}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="expiryMonth">
                  Expiry Month
                </label>
                <input
                  type="text"
                  id="expiryMonth"
                  name="expiryMonth"
                  value={newCard.expiryMonth}
                  onChange={handleInputChange}
                  placeholder="MM"
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="expiryYear">
                  Expiry Year
                </label>
                <input
                  type="text"
                  id="expiryYear"
                  name="expiryYear"
                  value={newCard.expiryYear}
                  onChange={handleInputChange}
                  placeholder="YYYY"
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="cvv">
                  Security Code (CVV)
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={newCard.cvv}
                  onChange={handleInputChange}
                  placeholder="•••"
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="py-2 px-4 bg-accent/50 hover:bg-accent rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 btn-primary"
              >
                Save Card
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="mt-4">
        <Link 
          href="/user/payment-history" 
          className="text-primary flex items-center hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          View Payment History
        </Link>
      </div>
    </div>
  );
}