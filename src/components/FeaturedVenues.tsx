import Image from "next/image";
import Link from "next/link";
import { venueImages, getImageByIndex } from "@/utils/image-placeholders";

// Mock data for featured venues
const featuredVenues = [
  {
    id: 1,
    name: "The Coffee Collective",
    location: "New York, NY",
    rating: 4.8,
    price: 4.75,
    image: getImageByIndex(venueImages, 0),
    tags: ["Fast WiFi", "Power Outlets", "Coffee"],
  },
  {
    id: 2,
    name: "Urban Workspace",
    location: "Brooklyn, NY",
    rating: 4.6,
    price: 5.25,
    image: getImageByIndex(venueImages, 1),
    tags: ["Quiet", "Meeting Rooms", "Coffee"],
  },
  {
    id: 3,
    name: "The Productive Cafe",
    location: "Manhattan, NY",
    rating: 4.7,
    price: 4.50,
    image: getImageByIndex(venueImages, 2),
    tags: ["Fast WiFi", "Food", "Coffee"],
  },
];

export default function FeaturedVenues() {
  return (
    <section className="py-16 bg-accent/50">
      <div className="workout-container">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Workspaces</h2>
              <p className="text-muted-foreground">Discover top-rated workspaces in your area</p>
            </div>
            <Link href="/find-workspace" className="btn-outline">
              View All Workspaces
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVenues.map((venue) => (
              <Link key={venue.id} href={`/venues/${venue.id}`}>
                <div className="workout-card-hover h-full flex flex-col">
                  <div className="relative h-48 w-full">
                    <div className="absolute top-3 right-3 z-10 bg-white dark:bg-secondary px-2 py-1 rounded-full text-sm font-medium">
                      ${venue.price}/hr
                    </div>
                    <Image 
                      src={venue.image} 
                      alt={venue.name}
                      fill
                      className="object-cover rounded-t-[var(--radius)]"
                    />
                  </div>
                  
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{venue.name}</h3>
                      <div className="flex items-center text-sm">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          className="w-5 h-5 text-yellow-500 mr-1"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        {venue.rating}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3">{venue.location}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {venue.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="bg-accent px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}