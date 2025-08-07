import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ListYourVenuePage() {
  const benefits = [
    {
      title: "Increase Revenue",
      description: "Turn your quiet hours into profitable ones by welcoming remote workers to your space.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Simple Management",
      description: "Our platform handles bookings, payments, and customer service so you can focus on your business.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
    },
    {
      title: "Boost F&B Sales",
      description: "Workers stay longer and order more, increasing your average order value and total revenue.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
        </svg>
      ),
    },
    {
      title: "New Customer Base",
      description: "Reach a growing market of remote professionals looking for great places to work.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
  ];

  const testimonials = [
    {
      quote: "Partnering with WorkOut has transformed our weekday mornings. We've seen a 30% increase in revenue during what used to be our slowest hours.",
      author: "Emma Chen",
      venue: "Coastal Coffee House, San Francisco",
      rating: 5,
    },
    {
      quote: "The platform is incredibly easy to use. We love that WorkOut handles all the bookings and payments while we focus on providing a great experience.",
      author: "Michael Torres",
      venue: "Gather Coworking, Chicago",
      rating: 5,
    },
    {
      quote: "Our restaurant was mostly empty until lunch, but now we have a steady stream of workers who often stay through lunch and into the afternoon.",
      author: "Priya Patel",
      venue: "Fusion Bistro, Austin",
      rating: 4,
    },
  ];

  const requirements = [
    "Reliable WiFi (minimum 50 Mbps download/upload)",
    "Power outlets accessible to customers",
    "Clean, comfortable seating suitable for working",
    "Restroom facilities",
    "At least 4 hours of continuous availability on weekdays",
    "Food and/or beverage service (preferred)",
    "Business license and insurance",
  ];

  const faqs = [
    {
      question: "How much does it cost to list my venue?",
      answer: "There's no upfront cost to list your venue. WorkOut operates on a commission model, taking 10% of each booking and order processed through our platform.",
    },
    {
      question: "How are payments handled?",
      answer: "WorkOut processes all payments through our secure platform. We handle payment collection from users and transfer funds to venues weekly, minus our service fee.",
    },
    {
      question: "Can I set custom hours for workspace availability?",
      answer: "Absolutely! You have complete control over when your space is available for booking, including setting different hours for different days.",
    },
    {
      question: "What if I need to close unexpectedly?",
      answer: "Our platform makes it easy to temporarily close your venue due to emergencies or special events. We'll handle communication with affected customers.",
    },
    {
      question: "How long does the approval process take?",
      answer: "Most venues are reviewed and approved within 2-3 business days. Once approved, you can complete your profile and start accepting bookings immediately.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/30 dark:from-primary/10 dark:to-accent/10 py-16">
          <div className="workout-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Turn Your Space into a Profitable Workspace
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of venues earning extra revenue by welcoming remote workers during traditionally slow hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/venue-enrollment" className="btn-primary">
                    List Your Venue
                  </Link>
                  <Link href="#requirements" className="btn-outline">
                    View Requirements
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <div className="bg-primary/10 absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-primary/30">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="workout-container py-16">
          <h2 className="text-2xl font-bold mb-12 text-center">
            Why Partner with WorkOut?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="workout-card p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* How It Works */}
        <div className="bg-accent dark:bg-accent/20 py-16">
          <div className="workout-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">
                How It Works
              </h2>
              
              <div className="workout-card p-8">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">List Your Space</h3>
                      <p className="text-muted-foreground">
                        Complete our simple application process with details about your venue, 
                        photos, and available hours. Our team will review your application.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Set Your Schedule</h3>
                      <p className="text-muted-foreground">
                        Define when your space is available for bookings, pricing, and capacity. 
                        You maintain complete control over your calendar.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Receive Bookings</h3>
                      <p className="text-muted-foreground">
                        Remote workers discover and book your space through our platform. 
                        You'll receive notifications for new bookings.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Welcome Workers</h3>
                      <p className="text-muted-foreground">
                        Provide a great experience for workers who visit your venue. 
                        They can also order food and drinks directly through our app.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Get Paid</h3>
                      <p className="text-muted-foreground">
                        Receive weekly payouts for all bookings and orders processed through our platform. 
                        Track your earnings in your venue dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="workout-container py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Hear From Our Venue Partners
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="workout-card p-6">
                <div className="flex text-amber-400 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Requirements */}
        <div id="requirements" className="bg-accent dark:bg-accent/20 py-16">
          <div className="workout-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">
                Venue Requirements
              </h2>
              
              <div className="workout-card p-8">
                <p className="mb-6 text-muted-foreground">
                  To ensure a great experience for remote workers, all WorkOut partner venues must meet these minimum requirements:
                </p>
                
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Meet these requirements? We'd love to have you join our network!
                  </p>
                  <Link href="/venue-enrollment" className="btn-primary">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="workout-container py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="workout-card p-6">
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Have more questions? Contact our venue support team at <span className="text-primary">venues@workoutapp.com</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary/10 dark:bg-primary/5 py-16">
          <div className="workout-container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8">
                Join our growing network of venue partners and start earning additional revenue from your space.
              </p>
              <Link href="/venue-enrollment" className="btn-primary">
                List Your Venue Today
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}