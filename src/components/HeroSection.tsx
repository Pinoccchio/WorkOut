import Image from "next/image";
import Link from "next/link";
import WorkspaceSearch from "./WorkspaceSearch";
import { heroImages } from "@/utils/image-placeholders";

export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-0 top-0 -z-10 opacity-20 dark:opacity-10">
          <svg
            width="650"
            height="650"
            viewBox="0 0 650 650"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <circle cx="325" cy="325" r="325" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute left-0 bottom-0 -z-10 opacity-20 dark:opacity-10">
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-secondary"
          >
            <circle cx="200" cy="200" r="200" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className="workout-container">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Hero Content */}
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              <span className="text-foreground">Work </span>
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Anywhere</span>
              <br />
              <span className="text-foreground">but the Office</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              Find and book comfortable workspaces in cafes, hotels, and co-working spaces near you. 
              Enjoy great coffee, fast WiFi, and a productive environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/find-workspace" className="btn-primary">
                Find a Workspace
              </Link>
              <Link href="/list-your-venue" className="btn-outline">
                List Your Venue
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative rounded-xl overflow-hidden max-w-5xl mx-auto w-full aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={heroImages[0]}
              alt="Person working in a cafe"
              fill
              priority
              className="object-cover"
            />

            {/* Overlaid messages */}
            <div className="absolute left-[15%] top-[20%] bg-white dark:bg-secondary/90 rounded-lg p-3 shadow-md max-w-[200px] animate-fade-in-up">
              <p className="text-sm font-medium">
                "Great coffee, fast WiFi, and the perfect work environment!"
              </p>
            </div>

            <div className="absolute right-[10%] bottom-[25%] bg-white dark:bg-secondary/90 rounded-lg p-3 shadow-md max-w-[220px] animate-fade-in-up animation-delay-300">
              <p className="text-sm font-medium">
                "Love being able to explore new places while getting my work done."
              </p>
            </div>
          </div>

          {/* Search Component */}
          <div className="max-w-4xl mx-auto w-full -mt-5 md:-mt-10 z-10">
            <WorkspaceSearch />
          </div>
          
          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Browse & Book</h3>
              <p className="text-muted-foreground">Find the perfect workspace by location, amenities, and availability.</p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Pay Now Save Later</h3>
              <p className="text-muted-foreground">Flexible payment options with credits for future bookings.</p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Order From Your Seat</h3>
              <p className="text-muted-foreground">Skip the line with in-app ordering at participating locations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}