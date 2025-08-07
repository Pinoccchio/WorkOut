"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Mock pending venue data
const mockPendingVenues = [
  {
    id: 101,
    name: "Quiet Corner",
    type: "Café",
    address: "123 Main St, San Francisco, CA",
    submittedDate: "06/01/2025",
    contactName: "Jennifer Lee",
    contactEmail: "jennifer@quietcorner.com",
    documents: ["business_license.pdf", "insurance.pdf", "menu.pdf"],
    images: ["/venues/coffee-shop-sample.jpg", "/venues/cafe-1.jpg", "/venues/cafe-2.jpg"],
    status: "pending"
  },
  {
    id: 102,
    name: "Urban Hub",
    type: "Co-working Space",
    address: "456 Market St, San Francisco, CA",
    submittedDate: "06/03/2025",
    contactName: "Michael Ross",
    contactEmail: "m.ross@urbanhub.co",
    documents: ["business_license.pdf", "tax_certificate.pdf", "floor_plan.pdf"],
    images: ["/venues/workspace-sample.jpg", "/venues/workspace-1.jpg", "/venues/workspace-2.jpg"],
    status: "pending"
  },
  {
    id: 103,
    name: "Books & Brew",
    type: "Bookstore Café",
    address: "789 Oak St, Oakland, CA",
    submittedDate: "06/05/2025",
    contactName: "Sarah Chen",
    contactEmail: "sarah@booksandbrew.com",
    documents: ["business_license.pdf", "insurance.pdf"],
    images: ["/venues/bookstore-1.jpg", "/venues/bookstore-2.jpg", "/venues/bookstore-3.jpg"],
    status: "pending"
  }
];

export default function AdminPendingVenuesPage() {
  const [pendingVenues, setPendingVenues] = useState(mockPendingVenues);
  const [selectedVenue, setSelectedVenue] = useState<typeof mockPendingVenues[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Handle view details
  const handleViewDetails = (venue: typeof mockPendingVenues[0]) => {
    setSelectedVenue(venue);
    setIsDetailOpen(true);
  };

  // Handle approve venue
  const handleApprove = (venueId: number) => {
    // In a real app, this would be an API call
    setPendingVenues(pendingVenues.filter(venue => venue.id !== venueId));
    setIsDetailOpen(false);
  };

  // Handle reject venue
  const handleReject = (venueId: number) => {
    // In a real app, this would be an API call
    setPendingVenues(pendingVenues.filter(venue => venue.id !== venueId));
    setIsDetailOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pending Venue Approval</h1>
        
        <Link 
          href="/admin/venues" 
          className="btn-outline py-2"
        >
          Back to All Venues
        </Link>
      </div>
      
      {pendingVenues.length === 0 ? (
        <div className="workout-card p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-muted-foreground mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-medium mb-2">No Pending Venues</h2>
          <p className="text-muted-foreground">All venue applications have been reviewed.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingVenues.map((venue) => (
            <div key={venue.id} className="workout-card p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="relative aspect-video rounded-md overflow-hidden">
                    <div className="bg-accent absolute inset-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-muted-foreground">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/4">
                  <h2 className="text-xl font-medium mb-1">{venue.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{venue.type} • {venue.address}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Contact Person</p>
                      <p className="text-sm text-muted-foreground">{venue.contactName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{venue.contactEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Submitted</p>
                      <p className="text-sm text-muted-foreground">{venue.submittedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Documents</p>
                      <p className="text-sm text-muted-foreground">{venue.documents.length} files</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/4 flex flex-col justify-center items-center md:items-end gap-3 md:mt-0 mt-4">
                  <button 
                    onClick={() => handleViewDetails(venue)}
                    className="btn-primary py-2 w-full md:w-auto"
                  >
                    View Details
                  </button>
                  
                  <div className="flex gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => handleApprove(venue.id)}
                      className="flex-1 md:flex-initial bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 py-2 px-4 rounded-md text-sm"
                    >
                      Approve
                    </button>
                    
                    <button 
                      onClick={() => handleReject(venue.id)}
                      className="flex-1 md:flex-initial bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 py-2 px-4 rounded-md text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Venue Detail Modal */}
      {isDetailOpen && selectedVenue && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{selectedVenue.name}</h2>
                
                <button 
                  onClick={() => setIsDetailOpen(false)}
                  className="p-2 rounded-full hover:bg-accent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-8">
                {/* Venue Images */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Venue Images</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedVenue.images.map((image, index) => (
                      <div key={index} className="aspect-video relative rounded-md overflow-hidden bg-accent">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-muted-foreground">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Venue Details */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Venue Information</h3>
                  <div className="workout-card p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Venue Type</p>
                        <p className="text-sm text-muted-foreground">{selectedVenue.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">{selectedVenue.address}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Contact Person</p>
                        <p className="text-sm text-muted-foreground">{selectedVenue.contactName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{selectedVenue.contactEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Submitted Date</p>
                        <p className="text-sm text-muted-foreground">{selectedVenue.submittedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Documents */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Uploaded Documents</h3>
                  <div className="workout-card p-4">
                    <div className="space-y-3">
                      {selectedVenue.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-accent/30 rounded-md">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mr-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <span className="text-sm">{doc}</span>
                          </div>
                          <button className="text-primary hover:underline text-sm">View</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <button 
                    onClick={() => handleReject(selectedVenue.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 py-2 px-6 rounded-md"
                  >
                    Reject
                  </button>
                  
                  <button 
                    onClick={() => handleApprove(selectedVenue.id)}
                    className="bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 py-2 px-6 rounded-md"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}