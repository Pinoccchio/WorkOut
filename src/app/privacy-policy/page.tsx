import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow workout-container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="workout-card p-8 prose prose-headings:text-foreground prose-p:text-muted-foreground dark:prose-invert max-w-none">
            <p className="mb-6">
              Last Updated: August 7, 2025
            </p>
            
            <h2>1. Introduction</h2>
            <p>
              At WorkOut ("we," "our," or "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Service").
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
            </p>
            
            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Register for an account</li>
              <li>Make a booking</li>
              <li>List a venue</li>
              <li>Contact customer support</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>
              This information may include:
            </p>
            <ul>
              <li>Contact information (such as name, email address, phone number)</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Profile information (such as profile picture, occupation)</li>
              <li>Preferences and settings</li>
            </ul>
            
            <h3>Automatically Collected Information</h3>
            <p>
              When you use our Service, we may automatically collect certain information about your device and usage, including:
            </p>
            <ul>
              <li>Device information (such as IP address, device type, operating system)</li>
              <li>Browser information</li>
              <li>Usage data (such as pages visited, features used, time spent on the Service)</li>
              <li>Location information (with your consent)</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We may use the information we collect for various purposes, including to:
            </p>
            <ul>
              <li>Provide, maintain, and improve the Service</li>
              <li>Process and manage bookings</li>
              <li>Facilitate payments and transactions</li>
              <li>Communicate with you about the Service</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Respond to your requests and inquiries</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Prevent, detect, and address technical issues or fraudulent activities</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2>4. How We Share Your Information</h2>
            <p>
              We may share your information with the following parties:
            </p>
            <ul>
              <li><strong>Venues:</strong> When you make a booking, we share necessary information with the venue to facilitate your reservation.</li>
              <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, and contractors who perform services on our behalf.</li>
              <li><strong>Payment Processors:</strong> We share payment information with our payment processors to facilitate transactions.</li>
              <li><strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale, your information may be transferred as a business asset.</li>
            </ul>
            
            <h2>5. Your Choices and Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access the personal information we hold about you</li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@workoutapp.com.
            </p>
            
            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2>7. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            
            <h2>8. Children's Privacy</h2>
            <p>
              Our Service is not directed to children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you believe that your child has provided us with personal information, please contact us immediately.
            </p>
            
            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
            </p>
            
            <h2>10. Third-Party Links</h2>
            <p>
              Our Service may contain links to third-party websites, services, or applications that are not operated by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            
            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <address className="not-italic">
              <p>Email: privacy@workoutapp.com</p>
              <p>
                WorkOut Anywhere, LLC<br />
                800 N King Street<br />
                Suite 304 #1972<br />
                Wilmington, DE 19801<br />
                United States
              </p>
            </address>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}