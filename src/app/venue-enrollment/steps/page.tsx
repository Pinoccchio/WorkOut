"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EnrollmentStepper from "@/components/venue-enrollment/EnrollmentStepper";

export default function VenueEnrollmentStepsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Account Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    
    // Venue Info
    venueName: "",
    venueType: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    
    // Venue Details
    description: "",
    capacity: "",
    amenities: [] as string[],
    openingHours: {} as Record<string, { open: string; close: string }>,
    
    // Terms and Agreement
    agreeTerms: false,
    agreePayments: false,
  });
  
  const steps = [
    {
      id: 0,
      title: "Let's get to know you",
      description: "Share a few details about yourself and set up your venue's account.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      id: 1,
      title: "Show off your space",
      description: "Upload photos, highlight what makes your venue special, and set your working hours.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "The Important Stuff",
      description: "Just a few final details, including terms and conditions, before we wrap up your application.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
        </svg>
      ),
    },
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked,
      });
      return;
    }
    
    // Handle all other inputs
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleAmenityChange = (amenity: string) => {
    const updatedAmenities = [...formData.amenities];
    
    if (updatedAmenities.includes(amenity)) {
      // Remove amenity if already selected
      const index = updatedAmenities.indexOf(amenity);
      updatedAmenities.splice(index, 1);
    } else {
      // Add amenity if not selected
      updatedAmenities.push(amenity);
    }
    
    setFormData({
      ...formData,
      amenities: updatedAmenities,
    });
  };
  
  const handleHoursChange = (day: string, type: "open" | "close", value: string) => {
    setFormData({
      ...formData,
      openingHours: {
        ...formData.openingHours,
        [day]: {
          ...formData.openingHours[day],
          [type]: value,
        },
      },
    });
  };
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit the form
      console.log("Form submitted:", formData);
      
      // Redirect to photos page for advanced enrollment
      router.push("/venue-enrollment/photos");
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const amenitiesList = [
    "WiFi",
    "Power Outlets",
    "Coffee",
    "Food Service",
    "Meeting Rooms",
    "Quiet Space",
    "Outdoor Seating",
    "Restrooms",
    "Accessible Entrance",
    "Parking",
    "Air Conditioning",
    "Printing Services",
  ];
  
  const weekdays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  
  return (
    <div className="max-w-3xl mx-auto">
      <EnrollmentStepper steps={steps} currentStep={currentStep} />
      
      <div className="workout-card p-8">
        {/* Step 1: Account Info */}
        {currentStep === 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Account Information</h2>
            
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Venue Info */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-lg font-medium mb-4">Venue Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="venueName" className="block text-sm font-medium mb-1">
                      Venue Name *
                    </label>
                    <input
                      type="text"
                      id="venueName"
                      name="venueName"
                      value={formData.venueName}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="venueType" className="block text-sm font-medium mb-1">
                      Venue Type *
                    </label>
                    <select
                      id="venueType"
                      name="venueType"
                      value={formData.venueType}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select Venue Type</option>
                      <option value="cafe">Café</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="coworking">Co-working Space</option>
                      <option value="hotel">Hotel Lobby</option>
                      <option value="library">Library</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                      ZIP/Postal Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-1">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Venue Details */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Venue Details</h2>
            
            <div className="space-y-6">
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Venue Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe your venue, workspace environment, and what makes it special for remote workers."
                  required
                />
              </div>
              
              {/* Capacity */}
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium mb-1">
                  Workspace Capacity *
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Maximum number of people that can work at once"
                  required
                />
              </div>
              
              {/* Amenities */}
              <div>
                <p className="block text-sm font-medium mb-3">
                  Amenities *
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenitiesList.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Operating Hours */}
              <div>
                <p className="block text-sm font-medium mb-3">
                  Operating Hours *
                </p>
                <div className="space-y-3">
                  {weekdays.map((day) => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-28">
                        <p className="text-sm capitalize">{day}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={formData.openingHours[day]?.open || ""}
                          onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                          className="p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={formData.openingHours[day]?.close || ""}
                          onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                          className="p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Photo Upload */}
              <div>
                <p className="block text-sm font-medium mb-1">
                  Venue Photos *
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Upload at least 3 photos of your venue. Include workspace areas, ambiance, and amenities.
                </p>
                <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-auto text-muted-foreground mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <p className="text-sm font-medium mb-1">Drag and drop photos here</p>
                  <p className="text-xs text-muted-foreground mb-3">or</p>
                  <button type="button" className="btn-outline py-2 px-4 text-sm">
                    Browse Files
                  </button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Supported formats: JPEG, PNG, WEBP. Max file size: 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Terms and Agreement */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Terms & Agreement</h2>
            
            <div className="space-y-6">
              {/* Terms of Service */}
              <div className="p-4 bg-accent/50 rounded-md max-h-60 overflow-y-auto mb-3">
                <h3 className="font-medium mb-2">Terms of Service (Excerpt)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  This Agreement is between you and WorkOut Anywhere, LLC ("WorkOut"), and governs your use of the WorkOut platform as a venue partner. By using the platform, you agree to be bound by these Terms.
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  As a venue partner, you agree to provide accurate information about your venue, maintain a safe and clean environment for users, and honor all bookings made through the platform. WorkOut charges a service fee of 10% on all bookings and orders processed through the platform.
                </p>
                <p className="text-sm text-muted-foreground">
                  You retain the right to refuse service to any user who violates your venue's policies or these Terms. WorkOut reserves the right to suspend or terminate your account for violations of these Terms or for receiving consistently poor reviews from users.
                </p>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 rounded border-border text-primary focus:ring-primary"
                  required
                />
                <label htmlFor="agreeTerms" className="ml-2 text-sm">
                  I have read and agree to the <Link href="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
                </label>
              </div>
              
              {/* Payment Agreement */}
              <div className="pt-4 border-t border-border">
                <h3 className="font-medium mb-3">Payment Agreement</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  WorkOut processes payments for all bookings and orders through our platform. Payments are held for 24 hours after service completion to allow for dispute resolution, then transferred to your account on a weekly basis.
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  A service fee of 10% is deducted from all transactions. You'll need to provide your banking information after completing this enrollment process to receive payments.
                </p>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreePayments"
                  name="agreePayments"
                  checked={formData.agreePayments}
                  onChange={handleChange}
                  className="mt-1 rounded border-border text-primary focus:ring-primary"
                  required
                />
                <label htmlFor="agreePayments" className="ml-2 text-sm">
                  I understand and agree to the payment terms outlined above.
                </label>
              </div>
              
              {/* Business Verification */}
              <div className="pt-4 border-t border-border">
                <h3 className="font-medium mb-3">Business Verification</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  To complete your enrollment, we'll need to verify your business. Please have the following documents ready to upload in the next step:
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground mb-3 space-y-1">
                  <li>Business license or registration</li>
                  <li>Tax ID or EIN documentation</li>
                  <li>Proof of insurance (if applicable)</li>
                </ul>
                <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-auto text-muted-foreground mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <p className="text-sm font-medium mb-1">Drag and drop documents here</p>
                  <p className="text-xs text-muted-foreground mb-3">or</p>
                  <button type="button" className="btn-outline py-2 px-4 text-sm">
                    Browse Files
                  </button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Supported formats: PDF, JPG, PNG. Max file size: 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-4 border-t border-border">
          <button
            type="button"
            onClick={handlePrevStep}
            className={`btn-outline py-2 ${currentStep === 0 ? 'invisible' : ''}`}
          >
            Back
          </button>
          
          <button
            type="button"
            onClick={handleNextStep}
            className="btn-primary"
          >
            {currentStep < steps.length - 1 ? "Continue" : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}