import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former tech exec who struggled to find good workspaces while traveling. Founded WorkOut to solve her own problem.",
      image: "/team/placeholder-1.jpg",
    },
    {
      name: "David Rodriguez",
      role: "Head of Partnerships",
      bio: "Restaurant industry veteran who connects WorkOut with amazing venues across the country.",
      image: "/team/placeholder-2.jpg",
    },
    {
      name: "Mia Johnson",
      role: "CTO",
      bio: "Tech leader passionate about creating seamless digital experiences for both workers and venues.",
      image: "/team/placeholder-3.jpg",
    },
    {
      name: "Jason Park",
      role: "Head of Marketing",
      bio: "Digital marketing expert who's helping spread the word about finding better places to work.",
      image: "/team/placeholder-4.jpg",
    },
  ];

  const timeline = [
    {
      year: "2021",
      title: "The Idea",
      description: "After struggling to find good places to work remotely, our founder Sarah realized there was an opportunity to connect remote workers with underutilized spaces.",
    },
    {
      year: "2022",
      title: "Launch in San Francisco",
      description: "WorkOut launched as a pilot in San Francisco with 15 partner venues, quickly growing to over 50 within six months.",
    },
    {
      year: "2023",
      title: "National Expansion",
      description: "We expanded to 10 major cities across the US, helping thousands of remote workers find their perfect workspace.",
    },
    {
      year: "2024",
      title: "Adding Food & Beverage Ordering",
      description: "We launched in-app ordering to make it even easier for workers to enjoy their time at partner venues.",
    },
    {
      year: "2025",
      title: "The Future",
      description: "We're expanding internationally and building more features to support the future of flexible work.",
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h1>
              <p className="text-xl text-muted-foreground">
                We're reimagining where work happens, one workspace at a time.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mission Statement */}
        <div className="workout-container py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-8">
              At WorkOut, we believe you should be able to work productively from anywhere but the office. 
              We're creating a world where remote workers can easily find inspiring places to work, 
              and local businesses can thrive by welcoming them.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="workout-card p-6 max-w-xs">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">For Workers</h3>
                <p className="text-muted-foreground">
                  We help remote professionals discover and book inspiring workspaces that boost productivity and wellbeing.
                </p>
              </div>
              
              <div className="workout-card p-6 max-w-xs">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">For Venues</h3>
                <p className="text-muted-foreground">
                  We connect local businesses with paying customers during traditionally slow hours, creating new revenue streams.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Story Timeline */}
        <div className="bg-accent dark:bg-accent/20 py-16">
          <div className="workout-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Our Journey</h2>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4 flex flex-col items-center md:items-end">
                      <div className="bg-primary text-white text-lg font-bold py-2 px-4 rounded-md">
                        {item.year}
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="hidden md:block w-px h-full bg-border ml-4 mt-2"></div>
                      )}
                    </div>
                    
                    <div className="md:w-3/4 workout-card p-6">
                      <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="workout-container py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="workout-card p-4 text-center">
                  <div className="aspect-square rounded-full overflow-hidden relative mb-4 max-w-[120px] mx-auto">
                    <div className="bg-primary/10 absolute inset-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-primary/30">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary/10 dark:bg-primary/5 py-16">
          <div className="workout-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Join the WorkOut Community</h2>
              <p className="text-lg mb-8">
                Whether you're looking for a place to work or want to list your venue, 
                we're here to help you be part of the future of flexible work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/find-workspace" className="btn-primary">
                  Find a Workspace
                </Link>
                <Link href="/venue-enrollment" className="btn-outline">
                  List Your Venue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}