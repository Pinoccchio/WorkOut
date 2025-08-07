import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow workout-container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="workout-card p-8 prose prose-headings:text-foreground prose-p:text-muted-foreground dark:prose-invert max-w-none">
            <p className="mb-6">
              Last Updated: August 7, 2025
            </p>
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to WorkOut ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of the WorkOut platform, including our website, mobile applications, and services (collectively, the "Service"). 
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
            </p>
            
            <h2>2. Definitions</h2>
            <p>
              <strong>"User"</strong> refers to any individual who accesses or uses the Service, including individuals who register accounts on the Service.
            </p>
            <p>
              <strong>"Venue"</strong> refers to any business or establishment that lists workspace availability on the Service.
            </p>
            <p>
              <strong>"Booking"</strong> refers to a reservation made by a User to use workspace at a Venue through the Service.
            </p>
            
            <h2>3. User Accounts</h2>
            <p>
              To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>
            
            <h2>4. Bookings and Payments</h2>
            <p>
              Users may make Bookings through the Service subject to availability and pricing set by Venues. By making a Booking, you agree to pay all applicable fees.
            </p>
            <p>
              Payments processed through the Service are handled by our third-party payment processors. By making a payment, you agree to the terms and conditions of our payment processors.
            </p>
            <p>
              Cancellation policies are set by individual Venues and will be displayed at the time of Booking. Users are responsible for reviewing and understanding the cancellation policy for each Booking.
            </p>
            
            <h2>5. Venue Listings</h2>
            <p>
              Venues may list workspace availability on the Service subject to our approval. Venues are responsible for ensuring the accuracy of their listings, including descriptions, images, pricing, and availability.
            </p>
            <p>
              We reserve the right to remove or edit Venue listings at our sole discretion.
            </p>
            
            <h2>6. User Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Use the Service in any way that violates applicable laws or regulations</li>
              <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
              <li>Collect or store personal data about other users without their consent</li>
              <li>Use the Service for any purpose that is harmful, fraudulent, or otherwise objectionable</li>
            </ul>
            
            <h2>7. Intellectual Property</h2>
            <p>
              The Service and its content, features, and functionality are owned by WorkOut and are protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, distribute, modify, or create derivative works of our intellectual property without our express written consent.
            </p>
            
            <h2>8. Privacy</h2>
            <p>
              Our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> describes how we collect, use, and share information about you when you use the Service. By using the Service, you agree to the collection, use, and sharing of your information as described in the Privacy Policy.
            </p>
            
            <h2>9. Disclaimers and Limitations of Liability</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WORKOUT BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES, OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA, OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SERVICE.
            </p>
            
            <h2>10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless WorkOut, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.
            </p>
            
            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2>13. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the State of Delaware, without regard to its conflict of law provisions.
            </p>
            
            <h2>14. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <Link href="/contact" className="text-primary hover:underline">legal@workoutapp.com</Link>.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}