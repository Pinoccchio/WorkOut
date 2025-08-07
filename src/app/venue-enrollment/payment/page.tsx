"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EnrollmentStepper from "@/components/venue-enrollment/EnrollmentStepper";

export default function PaymentAccountSetupPage() {
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState<"direct" | "stripe" | "paypal">("direct");
  const [accountType, setAccountType] = useState<"individual" | "business">("business");
  
  const [formData, setFormData] = useState({
    // Banking details
    accountName: "",
    accountNumber: "",
    routingNumber: "",
    bankName: "",
    // Business details
    businessName: "",
    taxId: "",
    // Personal details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Address
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    // Agreement
    agreed: false
  });
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would validate the form and submit to an API
    // For now, we'll just simulate success and navigate to the confirmation page
    router.push("/venue-enrollment/confirmation");
  };
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <EnrollmentStepper currentStep={5} />
      
      <div className="workout-card p-6 mt-8">
        <h1 className="text-2xl font-bold mb-2">Payment Account Setup</h1>
        <p className="text-muted-foreground mb-6">
          Set up your payment account to receive booking fees and other payments from WorkOut. All financial information is encrypted and securely stored.
        </p>
        
        {/* Payment method selection */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Choose a Payment Method</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`border rounded-lg p-4 text-center cursor-pointer transition-colors ${
                paymentMethod === "direct" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setPaymentMethod("direct")}
            >
              <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Direct Deposit</h3>
              <p className="text-sm text-muted-foreground">
                Connect your bank account for direct deposits
              </p>
            </div>
            
            <div
              className={`border rounded-lg p-4 text-center cursor-pointer transition-colors ${
                paymentMethod === "stripe" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setPaymentMethod("stripe")}
            >
              <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z" />
                  <path d="M15 9L9 15" />
                  <path d="M9 9L15 15" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Stripe</h3>
              <p className="text-sm text-muted-foreground">
                Connect with Stripe for payments
              </p>
            </div>
            
            <div
              className={`border rounded-lg p-4 text-center cursor-pointer transition-colors ${
                paymentMethod === "paypal" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setPaymentMethod("paypal")}
            >
              <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M7 11L12 6L17 11" />
                  <path d="M12 6V18" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">PayPal</h3>
              <p className="text-sm text-muted-foreground">
                Connect your PayPal business account
              </p>
            </div>
          </div>
        </div>
        
        {paymentMethod === "direct" && (
          <form onSubmit={handleSubmit}>
            {/* Account type selection */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-3">Account Type</h2>
              
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="accountType"
                    value="business"
                    checked={accountType === "business"}
                    onChange={() => setAccountType("business")}
                    className="mr-2"
                  />
                  Business Account
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="accountType"
                    value="individual"
                    checked={accountType === "individual"}
                    onChange={() => setAccountType("individual")}
                    className="mr-2"
                  />
                  Individual Account
                </label>
              </div>
            </div>
            
            {/* Banking Information */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-3">Banking Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="accountName">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    id="accountName"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="accountNumber">
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="routingNumber">
                    Routing Number
                  </label>
                  <input
                    type="text"
                    id="routingNumber"
                    name="routingNumber"
                    value={formData.routingNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="bankName">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Business Information (if business account) */}
            {accountType === "business" && (
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">Business Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="businessName">
                      Legal Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="taxId">
                      Tax ID / EIN
                    </label>
                    <input
                      type="text"
                      id="taxId"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleChange}
                      className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Personal Information */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-3">
                {accountType === "business" ? "Contact Person" : "Personal Information"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Address Information */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-3">Address</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="address">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="city">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="state">
                      State / Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="zip">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="country">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Spain">Spain</option>
                      <option value="Italy">Italy</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terms and Agreement */}
            <div className="mb-8">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="mt-1 mr-3"
                  required
                />
                <span className="text-sm">
                  I agree to the <Link href="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link> and authorize WorkOut to send money to my bank account. I understand that payouts will be processed according to the WorkOut Payments Policy, and I am responsible for any fees associated with these transactions.
                </span>
              </label>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Link href="/venue-enrollment/documents" className="btn-outline py-2 px-4">
                Back
              </Link>
              
              <button
                type="submit"
                className="btn-primary py-2 px-6"
                disabled={!formData.agreed}
              >
                Complete Setup
              </button>
            </div>
          </form>
        )}
        
        {paymentMethod === "stripe" && (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z" />
                <path d="M15 9L9 15" />
                <path d="M9 9L15 15" />
              </svg>
            </div>
            
            <h2 className="text-xl font-medium mb-2">Connect with Stripe</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You'll be redirected to Stripe to complete the account connection process. Stripe provides secure payment processing for WorkOut.
            </p>
            
            <button
              onClick={() => router.push("/venue-enrollment/confirmation")}
              className="btn-primary py-3 px-6"
            >
              Connect Stripe Account
            </button>
            
            <div className="flex justify-center mt-8">
              <Link href="/venue-enrollment/documents" className="btn-outline py-2 px-4">
                Back
              </Link>
            </div>
          </div>
        )}
        
        {paymentMethod === "paypal" && (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M7 11L12 6L17 11" />
                <path d="M12 6V18" />
              </svg>
            </div>
            
            <h2 className="text-xl font-medium mb-2">Connect with PayPal</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You'll be redirected to PayPal to complete the account connection process. Please ensure you're connecting a PayPal Business account.
            </p>
            
            <button
              onClick={() => router.push("/venue-enrollment/confirmation")}
              className="btn-primary py-3 px-6"
            >
              Connect PayPal Account
            </button>
            
            <div className="flex justify-center mt-8">
              <Link href="/venue-enrollment/documents" className="btn-outline py-2 px-4">
                Back
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}