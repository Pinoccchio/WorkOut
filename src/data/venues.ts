import { venueImages, getImageByIndex, workspaceImages } from "@/utils/image-placeholders";

export interface Venue {
  id: number;
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  images: string[];
  amenities: string[];
  hours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  capacity: number;
  tags: string[];
  features: {
    hasWifi: boolean;
    hasPower: boolean;
    hasFood: boolean;
    hasCoffee: boolean;
    hasQuietSpace: boolean;
    hasMeetingRooms: boolean;
    hasParking: boolean;
    isAccessible: boolean;
    allowsPets: boolean;
    hasOutdoorSeating: boolean;
  };
  orderingAvailable: boolean;
}

export const venues: Venue[] = [
  {
    id: 1,
    name: "The Coffee Collective",
    description: "A bright, airy café with plenty of seating, fast WiFi, and exceptional coffee. Perfect for solo work sessions or small meetings.",
    location: {
      address: "123 Broadway",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    rating: 4.8,
    reviewCount: 124,
    pricePerHour: 4.75,
    images: [
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500096169593-8a376f13bc55?q=80&w=2864&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2940&auto=format&fit=crop',
    ],
    amenities: [
      "High-Speed WiFi",
      "Power Outlets",
      "Specialty Coffee",
      "Food Menu",
      "Restrooms",
      "Air Conditioning",
    ],
    hours: {
      monday: { open: "07:00", close: "20:00" },
      tuesday: { open: "07:00", close: "20:00" },
      wednesday: { open: "07:00", close: "20:00" },
      thursday: { open: "07:00", close: "20:00" },
      friday: { open: "07:00", close: "21:00" },
      saturday: { open: "08:00", close: "21:00" },
      sunday: { open: "08:00", close: "18:00" },
    },
    capacity: 45,
    tags: ["Coffee Shop", "Fast WiFi", "Food Available"],
    features: {
      hasWifi: true,
      hasPower: true,
      hasFood: true,
      hasCoffee: true,
      hasQuietSpace: false,
      hasMeetingRooms: false,
      hasParking: false,
      isAccessible: true,
      allowsPets: false,
      hasOutdoorSeating: true,
    },
    orderingAvailable: true,
  },
  {
    id: 2,
    name: "Urban Workspace",
    description: "A modern co-working environment with dedicated desk areas, meeting rooms, and a café on-site. Ideal for focused productivity.",
    location: {
      address: "456 Bedford Ave",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11211",
      country: "USA",
      coordinates: {
        lat: 40.7142,
        lng: -73.9614,
      },
    },
    rating: 4.6,
    reviewCount: 87,
    pricePerHour: 5.25,
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=2825&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=2970&auto=format&fit=crop',
    ],
    amenities: [
      "Gigabit WiFi",
      "Power Outlets",
      "Coffee Bar",
      "Meeting Rooms",
      "Printing Services",
      "Phone Booths",
      "Restrooms",
      "Air Conditioning",
    ],
    hours: {
      monday: { open: "08:00", close: "22:00" },
      tuesday: { open: "08:00", close: "22:00" },
      wednesday: { open: "08:00", close: "22:00" },
      thursday: { open: "08:00", close: "22:00" },
      friday: { open: "08:00", close: "22:00" },
      saturday: { open: "09:00", close: "18:00" },
      sunday: { open: "09:00", close: "18:00" },
    },
    capacity: 75,
    tags: ["Co-working Space", "Meeting Rooms", "Quiet"],
    features: {
      hasWifi: true,
      hasPower: true,
      hasFood: false,
      hasCoffee: true,
      hasQuietSpace: true,
      hasMeetingRooms: true,
      hasParking: true,
      isAccessible: true,
      allowsPets: false,
      hasOutdoorSeating: false,
    },
    orderingAvailable: true,
  },
  {
    id: 3,
    name: "The Productive Cafe",
    description: "A cozy, laptop-friendly café with comfortable seating, reliable WiFi, and a menu of healthy foods and specialty coffees.",
    location: {
      address: "789 5th Avenue",
      city: "Manhattan",
      state: "NY",
      zipCode: "10022",
      country: "USA",
      coordinates: {
        lat: 40.7624,
        lng: -73.9738,
      },
    },
    rating: 4.7,
    reviewCount: 103,
    pricePerHour: 4.50,
    images: [
      'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2947&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559728920-e4b8e3e4762c?q=80&w=2833&auto=format&fit=crop',
    ],
    amenities: [
      "Free WiFi",
      "Power Outlets",
      "Full Food Menu",
      "Specialty Coffee",
      "Restrooms",
      "Air Conditioning",
    ],
    hours: {
      monday: { open: "06:30", close: "19:00" },
      tuesday: { open: "06:30", close: "19:00" },
      wednesday: { open: "06:30", close: "19:00" },
      thursday: { open: "06:30", close: "19:00" },
      friday: { open: "06:30", close: "20:00" },
      saturday: { open: "07:00", close: "20:00" },
      sunday: { open: "07:00", close: "18:00" },
    },
    capacity: 35,
    tags: ["Coffee Shop", "Fast WiFi", "Food Available"],
    features: {
      hasWifi: true,
      hasPower: true,
      hasFood: true,
      hasCoffee: true,
      hasQuietSpace: false,
      hasMeetingRooms: false,
      hasParking: false,
      isAccessible: true,
      allowsPets: false,
      hasOutdoorSeating: true,
    },
    orderingAvailable: true,
  },
  {
    id: 4,
    name: "The Library Lounge",
    description: "A quiet, book-lined café with a focus on creating a peaceful workspace. Features comfortable seating and a curated selection of teas and coffees.",
    location: {
      address: "101 Park Ave",
      city: "New York",
      state: "NY",
      zipCode: "10178",
      country: "USA",
      coordinates: {
        lat: 40.7511,
        lng: -73.9766,
      },
    },
    rating: 4.9,
    reviewCount: 67,
    pricePerHour: 5.00,
    images: [
      'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587338885121-ac9e5f8a1c47?q=80&w=2788&auto=format&fit=crop',
    ],
    amenities: [
      "Free WiFi",
      "Power Outlets",
      "Tea & Coffee",
      "Light Snacks",
      "Restrooms",
      "Air Conditioning",
      "Reading Material",
    ],
    hours: {
      monday: { open: "08:00", close: "20:00" },
      tuesday: { open: "08:00", close: "20:00" },
      wednesday: { open: "08:00", close: "20:00" },
      thursday: { open: "08:00", close: "20:00" },
      friday: { open: "08:00", close: "20:00" },
      saturday: { open: "09:00", close: "18:00" },
      sunday: { open: "09:00", close: "18:00" },
    },
    capacity: 30,
    tags: ["Quiet Space", "Tea Selection", "Comfortable Seating"],
    features: {
      hasWifi: true,
      hasPower: true,
      hasFood: false,
      hasCoffee: true,
      hasQuietSpace: true,
      hasMeetingRooms: false,
      hasParking: false,
      isAccessible: true,
      allowsPets: false,
      hasOutdoorSeating: false,
    },
    orderingAvailable: true,
  },
  {
    id: 5,
    name: "Digital Nomad Hub",
    description: "A dedicated workspace for remote professionals with hot desks, private booths, and a vibrant community of digital nomads.",
    location: {
      address: "222 Williamsburg Bridge",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11211",
      country: "USA",
      coordinates: {
        lat: 40.7081,
        lng: -73.9571,
      },
    },
    rating: 4.5,
    reviewCount: 92,
    pricePerHour: 6.50,
    images: [
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741347686-c1e331c5ffda?q=80&w=2970&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=2942&auto=format&fit=crop',
    ],
    amenities: [
      "High-Speed WiFi",
      "Power Outlets",
      "Coffee Bar",
      "Meeting Rooms",
      "Phone Booths",
      "Printer/Scanner",
      "Restrooms",
      "Air Conditioning",
      "Community Events",
    ],
    hours: {
      monday: { open: "07:00", close: "23:00" },
      tuesday: { open: "07:00", close: "23:00" },
      wednesday: { open: "07:00", close: "23:00" },
      thursday: { open: "07:00", close: "23:00" },
      friday: { open: "07:00", close: "23:00" },
      saturday: { open: "09:00", close: "21:00" },
      sunday: { open: "09:00", close: "21:00" },
    },
    capacity: 60,
    tags: ["Co-working Space", "Digital Nomad Friendly", "Community"],
    features: {
      hasWifi: true,
      hasPower: true,
      hasFood: false,
      hasCoffee: true,
      hasQuietSpace: true,
      hasMeetingRooms: true,
      hasParking: true,
      isAccessible: true,
      allowsPets: true,
      hasOutdoorSeating: true,
    },
    orderingAvailable: true,
  },
  {
    id: 6,
    name: "The Green Café",
    description: "An eco-friendly café with plant-filled interiors, organic food and drinks, and a commitment to sustainability. A refreshing place to work.",
    location: {
      address: "333 Hudson St",
      city: "New York",
      state: "NY",
      zipCode: "10013",
      country: "USA",
      coordinates: {
        lat: 40.7266,
        lng: -74.0074,
      },
    },
    rating: 4.7,
    reviewCount: 78,
    pricePerHour: 4.75,
    images: [
      'https://images.unsplash.com/photo-1513267048331-5611cad62e41?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579389082980-8c68c5ab741f?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464979681340-bdd28a61699e?q=80&w=2880&auto=format&fit=crop',
    ],
    amenities: [
      "Free WiFi",
      "Power Outlets",
      "Organic Food & Drinks",
      "Restrooms",
      "Natural Lighting",
      "Air Purifying Plants",
    ],
    hours: {
      monday: { open: "07:30", close: "19:00" },
      tuesday: { open: "07:30", close: "19:00" },
      wednesday: { open: "07:30", close: "19:00" },
      thursday: { open: "07:30", close: "19:00" },
      friday: { open: "07:30", close: "20:00" },
      saturday: { open: "08:00", close: "20:00" },
      sunday: { open: "08:00", close: "18:00" },
    },
    capacity: 40,
    tags: ["Eco-Friendly", "Organic Food", "Plant-Filled"],
    features: {
      hasWifi: true,
      hasPower: true,
      hasFood: true,
      hasCoffee: true,
      hasQuietSpace: false,
      hasMeetingRooms: false,
      hasParking: false,
      isAccessible: true,
      allowsPets: false,
      hasOutdoorSeating: true,
    },
    orderingAvailable: true,
  },
];

// Function to filter venues based on search parameters
export const filterVenues = (
  query: string = "",
  location: string = "",
  amenities: string[] = [],
  minPrice: number = 0,
  maxPrice: number = 100,
  minRating: number = 0,
  minCapacity: number = 0,
  tags: string[] = [],
  hours: { open: string, close: string } = { open: "", close: "" },
  features: {
    hasQuietSpace?: boolean,
    hasMeetingRooms?: boolean,
    hasOutdoorSeating?: boolean,
    isAccessible?: boolean,
    allowsPets?: boolean,
    orderingAvailable?: boolean
  } = {}
) => {
  return venues.filter((venue) => {
    // Filter by name or description
    const matchesQuery =
      query === "" ||
      venue.name.toLowerCase().includes(query.toLowerCase()) ||
      venue.description.toLowerCase().includes(query.toLowerCase());

    // Filter by location
    const matchesLocation =
      location === "" ||
      venue.location.city.toLowerCase().includes(location.toLowerCase()) ||
      venue.location.state.toLowerCase().includes(location.toLowerCase()) ||
      venue.location.zipCode.includes(location);

    // Filter by amenities
    const matchesAmenities =
      amenities.length === 0 ||
      amenities.every((amenity) =>
        venue.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
      );

    // Filter by price
    const matchesPrice = venue.pricePerHour >= minPrice && venue.pricePerHour <= maxPrice;
    
    // Filter by rating
    const matchesRating = venue.rating >= minRating;
    
    // Filter by capacity
    const matchesCapacity = venue.capacity >= minCapacity;
    
    // Filter by tags
    const matchesTags = 
      tags.length === 0 ||
      tags.some(tag => venue.tags.includes(tag));
    
    // Filter by hours
    const matchesHours = 
      (hours.open === "" || venue.hours.monday.open <= hours.open) &&
      (hours.close === "" || venue.hours.monday.close >= hours.close);
    
    // Filter by features
    const matchesFeatures = Object.entries(features).every(([key, value]) => {
      if (!value) return true; // Skip this feature if it's not required
      return venue.features[key as keyof typeof venue.features] === value;
    });
    
    return matchesQuery && 
           matchesLocation && 
           matchesAmenities && 
           matchesPrice && 
           matchesRating && 
           matchesCapacity && 
           matchesTags && 
           matchesHours && 
           matchesFeatures;
  });
};

export const getVenueById = (id: number): Venue | undefined => {
  return venues.find((venue) => venue.id === id);
};