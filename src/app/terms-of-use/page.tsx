import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsOfUsePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow workout-container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
          
          <div className="workout-card p-8 prose prose-headings:text-foreground prose-p:text-muted-foreground dark:prose-invert max-w-none">
            <p className="mb-6">
              Last Updated: August 7, 2025
            </p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the WorkOut platform, including our website and mobile applications (collectively, the "Platform"), you agree to be bound by these Terms of Use. If you do not agree to these Terms of Use, you may not access or use the Platform.
            </p>
            
            <h2>2. Platform Access and Use</h2>
            <p>
              Subject to these Terms of Use, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for your personal, non-commercial use.
            </p>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Use the Platform in any way that violates any applicable laws or regulations</li>
              <li>Use the Platform to send, knowingly receive, upload, download, or use any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
              <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
              <li>Interfere with or disrupt the Platform or servers or networks connected to the Platform</li>
              <li>Attempt to gain unauthorized access to any portion of the Platform or any other accounts, computer systems, or networks connected to the Platform</li>
              <li>Use any robot, spider, scraper, or other automated means to access the Platform for any purpose</li>
              <li>Mirror or frame any part of the Platform without our express written permission</li>
              <li>Take any action that imposes an unreasonable or disproportionately large load on our infrastructure</li>
            </ul>
            
            <h2>3. User Accounts</h2>
            <p>
              To access certain features of the Platform, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <p>
              You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during the registration process</li>
              <li>Maintain and promptly update your registration information to keep it accurate, current, and complete</li>
              <li>Notify us immediately of any unauthorized use of your account or any other breach of security</li>
              <li>Be responsible for all activities that occur under your account</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users of the Platform, us, or third parties, or for any other reason.
            </p>
            
            <h2>4. User Content</h2>
            <p>
              The Platform may allow you to post, upload, publish, submit, or transmit content, including but not limited to text, images, and videos ("User Content").
            </p>
            <p>
              By making any User Content available through the Platform, you grant us a non-exclusive, transferable, sublicensable, worldwide, royalty-free license to use, copy, modify, create derivative works based upon, distribute, publicly display, and publicly perform your User Content in connection with operating and providing the Platform.
            </p>
            <p>
              You are solely responsible for your User Content and the consequences of posting or publishing it. You represent and warrant that:
            </p>
            <ul>
              <li>You own or have the necessary rights to use and authorize us to use your User Content</li>
              <li>Your User Content does not violate the privacy rights, publicity rights, copyright rights, or other rights of any person</li>
              <li>Your User Content does not contain any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable</li>
            </ul>
            
            <h2>5. Intellectual Property Rights</h2>
            <p>
              The Platform and its content, features, and functionality are owned by WorkOut and are protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, distribute, modify, or create derivative works of our intellectual property without our express written consent.
            </p>
            
            <h2>6. Links to Third-Party Websites</h2>
            <p>
              The Platform may contain links to third-party websites or resources that are not owned or controlled by us. We are not responsible for the content or availability of such third-party websites or resources. Links to such websites or resources do not imply any endorsement by us of such websites or resources or the content, products, or services available from such websites or resources.
            </p>
            
            <h2>7. Termination</h2>
            <p>
              We may terminate or suspend your access to the Platform immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Use.
            </p>
            <p>
              Upon termination, your right to use the Platform will immediately cease. If you wish to terminate your account, you may simply discontinue using the Platform.
            </p>
            
            <h2>8. Disclaimer of Warranties</h2>
            <p>
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE PLATFORM OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
            
            <h2>9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WORKOUT BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES, OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA, OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE PLATFORM.
            </p>
            
            <h2>10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless WorkOut, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms of Use or your use of the Platform.
            </p>
            
            <h2>11. Changes to Terms of Use</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms of Use at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2>12. Governing Law</h2>
            <p>
              These Terms of Use shall be governed by the laws of the State of Delaware, without regard to its conflict of law provisions.
            </p>
            
            <h2>13. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at <Link href="/contact" className="text-primary hover:underline">legal@workoutapp.com</Link>.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}