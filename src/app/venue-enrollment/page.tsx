import Link from "next/link";
import Image from "next/image";

export default function VenueEnrollmentWelcomePage() {
  const benefits = [
    {
      title: "Boost Revenue",
      description: "Turn underutilized space into profit with our flexible workspace platform.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Attract New Customers",
      description: "Connect with remote workers and digital nomads looking for great places to work.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      title: "Streamline Operations",
      description: "Manage bookings, payments, and in-venue orders through our easy-to-use platform.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
      ),
    },
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            We're excited to have you on board!
          </h1>
          <p className="text-muted-foreground mb-6">
            This 15-minute form sets up your venue listing and account, getting you ready to welcome a new wave of remote professionals. To speed things up, have your menu, venue photos, and business certificate ready. You can also review our minimum venue requirements before getting started.
          </p>
          <Link href="/venue-enrollment/steps" className="btn-primary">
            Get Started
          </Link>
        </div>
        
        <div className="md:w-1/2 relative">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/venues/coffee-shop-sample.jpg"
              alt="Coffee shop workspace"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Join WorkOut?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="workout-card p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="workout-card p-8">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <ol className="space-y-6">
          <li className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Set Up Your Profile</h3>
              <p className="text-muted-foreground">
                Complete our simple enrollment process to create your venue profile. Add photos, descriptions, and set your availability.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">Accept Bookings</h3>
              <p className="text-muted-foreground">
                Start receiving booking requests from remote workers in your area. Manage your calendar and availability through our dashboard.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Welcome Workers</h3>
              <p className="text-muted-foreground">
                Provide a great experience for remote professionals while they work from your space. Process food and drink orders directly through our platform.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-semibold mb-1">Get Paid</h3>
              <p className="text-muted-foreground">
                Receive weekly payments for all bookings and orders. Track your earnings and analytics through the venue dashboard.
              </p>
            </div>
          </li>
        </ol>
        
        <div className="mt-8 flex justify-center">
          <Link href="/venue-enrollment/steps" className="btn-primary">
            Start Your Enrollment
          </Link>
        </div>
      </div>
    </div>
  );
}