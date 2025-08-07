"use client";

import { useState } from "react";

// Mock FAQ data
const faqItems = [
  {
    question: "Why should I choose WorkOut instead of a traditional co-working space?",
    answer: "WorkOut offers flexibility that traditional co-working spaces can't match. With no membership fees or long-term commitments, you can work from different venues, explore new neighborhoods, and only pay for the time you actually use. Our partner venues offer great amenities like coffee, food, and a productive atmosphere at a fraction of the cost of dedicated co-working spaces."
  },
  {
    question: "How much does it cost to use WorkOut?",
    answer: "WorkOut venues set their own rates, typically ranging from $3-10 per hour. You can see the exact rate for each venue before booking. We offer credit packages that give you discounted rates at all participating locations. You only pay for the time you need with no membership fees or commitments."
  },
  {
    question: "What happens if I don't use all my venue credit?",
    answer: "Your WorkOut credits never expire! Any unused credit remains in your account until you're ready to use it. You can use your credits at any participating venue, making it perfect for flexible work schedules and travelers."
  },
  {
    question: "Can I bring my own food and drink?",
    answer: "Each venue has its own policy regarding outside food and drinks. This information is clearly displayed on the venue's profile page. Many of our partner venues are cafes and restaurants that appreciate your food and beverage purchases during your stay. Our in-app ordering makes it easy to order without losing your spot."
  },
  {
    question: "Can I really order at the venues?",
    answer: "Yes! At participating venues, you can browse the menu, place orders, and pay directly through the WorkOut app. This allows you to stay productive at your seat while still enjoying the venue's offerings. Look for the 'Order' icon on venue listings to identify locations with this feature."
  },
  {
    question: "How do I modify or cancel my booking?",
    answer: "You can modify or cancel your booking through the 'My Bookings' section of your account. Many venues allow free cancellation up to 1 hour before your booking time. Specific cancellation policies are displayed during the booking process and in your booking confirmation."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="workout-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Something on your mind? 🤔</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of the most frequently asked questions about WorkOut
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="border-b border-border last:border-0"
            >
              <button
                className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-medium">{item.question}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index 
                    ? "max-h-96 opacity-100 pb-4" 
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a 
            href="/contact" 
            className="btn-outline inline-flex items-center"
          >
            Contact Us
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}