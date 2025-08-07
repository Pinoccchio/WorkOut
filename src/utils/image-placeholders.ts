/**
 * This utility file provides placeholder image URLs for development
 * until real images are added to the public/images directory.
 * 
 * Once real images are added, update the paths here to use those images.
 */

// Hero Images - Home page and marketing sections
export const heroImages = [
  // When real images are added, replace with:
  // '/images/hero/hero-1.jpg',
  'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2837&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2674&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop',
];

// Venue Images - For featured venues and venue listings
export const venueImages = [
  // When real images are added, replace with:
  // '/images/venues/venue-1.jpg',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2178&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=2787&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513267048331-5611cad62e41?q=80&w=2940&auto=format&fit=crop',
];

// Workspace Images - For venue detail pages
export const workspaceImages = [
  // When real images are added, replace with:
  // '/images/workspaces/workspace-1.jpg',
  'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=2825&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2947&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2901&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2787&auto=format&fit=crop',
];

// User Images - For user avatars and profiles
export const userImages = [
  // When real images are added, replace with:
  // '/images/users/user-1.jpg',
  'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=2834&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2922&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2960&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2787&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop',
];

// Food Images - For menu items
export const foodImages = [
  // When real images are added, replace with:
  // '/images/food/food-1.jpg',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2787&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2787&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2880&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=2787&auto=format&fit=crop',
];

/**
 * Get a random image from the provided array
 */
export const getRandomImage = (imageArray: string[]): string => {
  const randomIndex = Math.floor(Math.random() * imageArray.length);
  return imageArray[randomIndex];
};

/**
 * Get an image by index, with fallback to first image
 */
export const getImageByIndex = (imageArray: string[], index: number): string => {
  if (index >= 0 && index < imageArray.length) {
    return imageArray[index];
  }
  return imageArray[0];
};

/**
 * Generate a consistent image for a specific ID (venue ID, user ID, etc.)
 */
export const getImageById = (imageArray: string[], id: string | number): string => {
  // Convert id to a number if it's a string
  const numericId = typeof id === 'string' ? parseInt(id.replace(/\D/g, ''), 10) || 0 : id;
  
  // Use modulo to get a consistent index based on the ID
  const index = numericId % imageArray.length;
  
  return imageArray[index];
};