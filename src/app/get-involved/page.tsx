import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function GetInvolvedPage() {
  const involvementOptions = [
    {
      title: "Join as a User",
      description: "Discover great workspaces in your area and become part of our remote work community.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      action: "Find a Workspace",
      link: "/find-workspace",
    },
    {
      title: "List Your Venue",
      description: "Partner with WorkOut to turn your space into a productive workspace for remote professionals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
      action: "Apply Now",
      link: "/venue-enrollment",
    },
    {
      title: "Become an Ambassador",
      description: "Help spread the word about WorkOut in your city and earn rewards for referring venues and users.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
        </svg>
      ),
      action: "Learn More",
      link: "#ambassador-program",
    },
    {
      title: "Corporate Partnerships",
      description: "Offer WorkOut as a benefit to your remote or hybrid team members and support local businesses.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      ),
      action: "Contact Us",
      link: "#corporate-program",
    },
  ];

  const faqItems = [
    {
      question: "What is the WorkOut Ambassador Program?",
      answer: "Our Ambassador Program allows remote work enthusiasts to help spread the word about WorkOut in their communities. Ambassadors receive referral bonuses for new venues and users they bring to the platform, exclusive perks, and early access to new features.",
    },
    {
      question: "How do I become an Ambassador?",
      answer: "To become an Ambassador, fill out the application form below. We're looking for individuals who are passionate about remote work, active in their local communities, and excited to help grow the WorkOut network in their city.",
    },
    {
      question: "What does the Corporate Partnership program include?",
      answer: "Our Corporate Partnership program offers companies the ability to provide WorkOut credits to their remote and hybrid employees. This helps companies support their team members while also contributing to local businesses. Partners receive bulk discounts, detailed usage analytics, and dedicated account management.",
    },
    {
      question: "How do WorkOut credits work?",
      answer: "WorkOut credits can be used to book workspaces or purchase food and beverages at any of our partner venues. Credits never expire and can be used across our entire network of venues.",
    },
    {
      question: "Can I suggest a venue to join WorkOut?",
      answer: "Absolutely! If you know of a great space that would be perfect for remote work, you can refer them through our Venue Referral Program. If they join our platform, you'll receive a referral bonus and credits to use at that venue.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-accent dark:bg-accent/20 py-16">
          <div className="workout-container">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Get Involved with WorkOut</h1>
              <p className="text-xl text-muted-foreground">
                Join our mission to create a world where everyone can work from anywhere but the office.
              </p>
            </div>
          </div>
        </div>
        
        {/* Ways to Get Involved */}
        <div className="workout-container py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Ways to Join Our Community</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {involvementOptions.map((option, index) => (
                <div key={index} className="workout-card p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{option.title}</h3>
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  <Link href={option.link} className="btn-primary inline-flex">
                    {option.action}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Ambassador Program */}
        <div id="ambassador-program" className="bg-accent dark:bg-accent/20 py-16">
          <div className="workout-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-2 text-center">Ambassador Program</h2>
              <p className="text-center text-muted-foreground mb-8">Help us grow the WorkOut community in your city</p>
              
              <div className="workout-card p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Program Benefits</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span>Earn $100 for each venue that joins through your referral</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span>Receive $10 in credits for each new user you refer who completes a booking</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span>Get free WorkOut credits each month to use at any partner venue</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span>Access to exclusive Ambassador events and networking opportunities</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span>Early access to new WorkOut features and products</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <h3 className="text-xl font-medium mb-3">Apply to be an Ambassador</h3>
                    <p className="text-muted-foreground mb-4">
                      We're looking for enthusiastic individuals who are passionate about remote work and building community in their cities.
                    </p>
                    
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
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
                            className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="social" className="block text-sm font-medium mb-1">
                            LinkedIn or Instagram Profile
                          </label>
                          <input
                            type="text"
                            id="social"
                            className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="why" className="block text-sm font-medium mb-1">
                          Why do you want to be a WorkOut Ambassador? *
                        </label>
                        <textarea
                          id="why"
                          rows={4}
                          className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        ></textarea>
                      </div>
                      
                      <button type="submit" className="btn-primary">
                        Submit Application
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Corporate Program */}
        <div id="corporate-program" className="workout-container py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-center">Corporate Partnership Program</h2>
            <p className="text-center text-muted-foreground mb-8">Support your remote and hybrid employees with WorkOut</p>
            
            <div className="workout-card p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">Why Partner with WorkOut?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span>Support your remote employees with flexible workspaces</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span>Boost employee productivity and satisfaction</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span>Contribute to local businesses in your community</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span>Receive volume discounts on workspace credits</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span>Access detailed usage analytics and reporting</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary flex-shrink-0 mt-0.5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <span>Get a dedicated account manager for your team</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h3 className="text-xl font-medium mb-3">Contact Us About Corporate Partnerships</h3>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="corp-name" className="block text-sm font-medium mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="corp-name"
                          className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="corp-email" className="block text-sm font-medium mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          id="corp-email"
                          className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-1">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="company"
                          className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="team-size" className="block text-sm font-medium mb-1">
                          Team Size *
                        </label>
                        <select
                          id="team-size"
                          className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select Team Size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501+">501+ employees</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Tell us about your company's remote work policy and what you're looking for in a partnership."
                        required
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="btn-primary">
                      Submit Inquiry
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="bg-accent dark:bg-accent/20 py-16">
          <div className="workout-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div key={index} className="workout-card p-6">
                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Have more questions? Contact our team at <span className="text-primary">community@workoutapp.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}