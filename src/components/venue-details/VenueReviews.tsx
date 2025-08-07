"use client";

import { useState } from "react";
import StarRating from "@/components/StarRating";

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  text: string;
  date: Date;
  images?: string[];
  likes: number;
  hasLiked?: boolean;
  venue: {
    id: number;
    name: string;
  };
  categories?: {
    noise: number;
    comfort: number;
    wifi: number;
    coffee: number;
    staff: number;
  };
}

interface ReviewsSummary {
  count: number;
  average: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  categoryAverages: {
    noise: number;
    comfort: number;
    wifi: number;
    coffee: number;
    staff: number;
  };
}

interface VenueReviewsProps {
  venueId: number;
  venueName: string;
}

export default function VenueReviews({ venueId, venueName }: VenueReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "rev_1",
      userId: "user_1",
      userName: "Alex Johnson",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      rating: 4.5,
      title: "Great spot for focused work",
      text: "I visited this venue twice last week and was impressed by the quiet atmosphere and reliable WiFi. The coffee was excellent too! Perfect for getting deep work done. The staff was very helpful and accommodating when I needed to make a quick call in a quieter area.",
      date: new Date(2025, 7, 5), // August 5, 2025
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=400&fit=crop",
        "https://images.unsplash.com/photo-1528123271577-f475844f3dcf?w=500&h=400&fit=crop"
      ],
      likes: 12,
      hasLiked: false,
      venue: {
        id: venueId,
        name: venueName
      },
      categories: {
        noise: 4,
        comfort: 5,
        wifi: 5,
        coffee: 4,
        staff: 5
      }
    },
    {
      id: "rev_2",
      userId: "user_2",
      userName: "Sarah Miller",
      userAvatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      title: "My new favorite workspace",
      text: "This place has everything I need for a productive workday. The chairs are comfortable for long sessions, and the tables have plenty of space for my laptop and notes. I've been coming here 3 times a week for the past month and have gotten so much done.",
      date: new Date(2025, 7, 2), // August 2, 2025
      likes: 8,
      venue: {
        id: venueId,
        name: venueName
      },
      categories: {
        noise: 5,
        comfort: 5,
        wifi: 4,
        coffee: 5,
        staff: 5
      }
    },
    {
      id: "rev_3",
      userId: "user_3",
      userName: "Michael Chen",
      userAvatar: "https://i.pravatar.cc/150?img=8",
      rating: 3,
      title: "Good but gets crowded",
      text: "The venue itself is nice with good amenities, but it gets really crowded during peak hours. If you're looking for a quiet place to work, I'd recommend coming early in the morning or later in the evening. The WiFi can slow down when it's busy.",
      date: new Date(2025, 6, 28), // July 28, 2025
      likes: 4,
      venue: {
        id: venueId,
        name: venueName
      },
      categories: {
        noise: 2,
        comfort: 4,
        wifi: 3,
        coffee: 4,
        staff: 3
      }
    },
    {
      id: "rev_4",
      userId: "user_4",
      userName: "Emily Rodriguez",
      userAvatar: "https://i.pravatar.cc/150?img=20",
      rating: 4,
      title: "Great staff and atmosphere",
      text: "The staff here is incredibly friendly and helpful. They remember my usual order and are always willing to accommodate special requests. The atmosphere is perfect for getting work done - not too quiet, not too noisy. My only complaint is that the chairs could be a bit more comfortable for longer sessions.",
      date: new Date(2025, 6, 25), // July 25, 2025
      likes: 6,
      venue: {
        id: venueId,
        name: venueName
      },
      categories: {
        noise: 4,
        comfort: 3,
        wifi: 4,
        coffee: 5,
        staff: 5
      }
    }
  ]);
  
  const [reviewsSummary, setReviewsSummary] = useState<ReviewsSummary>({
    count: 4,
    average: 4.1,
    distribution: {
      5: 1,
      4: 2,
      3: 1,
      2: 0,
      1: 0
    },
    categoryAverages: {
      noise: 3.8,
      comfort: 4.3,
      wifi: 4.0,
      coffee: 4.5,
      staff: 4.5
    }
  });
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<"all" | "5" | "4" | "3" | "2" | "1">("all");
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest" | "most_liked">("newest");
  
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    text: "",
    categories: {
      noise: 0,
      comfort: 0,
      wifi: 0,
      coffee: 0,
      staff: 0
    }
  });
  
  // Filter reviews based on rating filter
  const filteredReviews = reviews.filter(review => {
    if (reviewFilter === "all") return true;
    
    const ratingFilter = parseInt(reviewFilter);
    return Math.floor(review.rating) === ratingFilter;
  });
  
  // Sort reviews based on sort option
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.date.getTime() - a.date.getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "most_liked":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  
  // Handle like button click
  const handleLike = (reviewId: string) => {
    setReviews(prevReviews => 
      prevReviews.map(review => {
        if (review.id === reviewId) {
          const hasLiked = review.hasLiked || false;
          return {
            ...review,
            likes: hasLiked ? review.likes - 1 : review.likes + 1,
            hasLiked: !hasLiked
          };
        }
        return review;
      })
    );
  };
  
  // Handle review form input changes
  const handleReviewChange = (field: string, value: any) => {
    setNewReview(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle category rating changes
  const handleCategoryChange = (category: string, value: number) => {
    setNewReview(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: value
      }
    }));
  };
  
  // Handle review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new review object
    const review: Review = {
      id: `rev_${Date.now()}`,
      userId: "current_user",
      userName: "You",
      userAvatar: "https://i.pravatar.cc/150?img=10",
      rating: newReview.rating,
      title: newReview.title,
      text: newReview.text,
      date: new Date(),
      likes: 0,
      hasLiked: false,
      venue: {
        id: venueId,
        name: venueName
      },
      categories: newReview.categories
    };
    
    // Add to reviews
    setReviews(prev => [review, ...prev]);
    
    // Update summary
    const newCount = reviewsSummary.count + 1;
    const newTotal = reviewsSummary.count * reviewsSummary.average + newReview.rating;
    const newAverage = newTotal / newCount;
    
    // Update distribution
    const ratingInt = Math.floor(newReview.rating);
    const newDistribution = { ...reviewsSummary.distribution };
    newDistribution[ratingInt as 1 | 2 | 3 | 4 | 5] += 1;
    
    // Update category averages
    const newCategoryAverages = { ...reviewsSummary.categoryAverages };
    Object.entries(newReview.categories).forEach(([category, rating]) => {
      const currentTotal = reviewsSummary.categoryAverages[category as keyof typeof reviewsSummary.categoryAverages] * reviewsSummary.count;
      const newTotal = currentTotal + rating;
      newCategoryAverages[category as keyof typeof newCategoryAverages] = newTotal / newCount;
    });
    
    setReviewsSummary({
      count: newCount,
      average: newAverage,
      distribution: newDistribution,
      categoryAverages: newCategoryAverages
    });
    
    // Reset form
    setNewReview({
      rating: 0,
      title: "",
      text: "",
      categories: {
        noise: 0,
        comfort: 0,
        wifi: 0,
        coffee: 0,
        staff: 0
      }
    });
    
    // Hide form
    setShowReviewForm(false);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Reviews Summary */}
        <div className="workout-card p-6 md:w-1/3">
          <h3 className="text-xl font-medium mb-2">Guest Reviews</h3>
          
          <div className="flex items-center mb-4">
            <span className="text-4xl font-bold">{reviewsSummary.average.toFixed(1)}</span>
            <div className="ml-3">
              <StarRating rating={reviewsSummary.average} size="sm" />
              <p className="text-sm text-muted-foreground">
                Based on {reviewsSummary.count} reviews
              </p>
            </div>
          </div>
          
          {/* Rating Distribution */}
          <div className="space-y-2 mb-6">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = reviewsSummary.distribution[rating as 1 | 2 | 3 | 4 | 5];
              const percentage = reviewsSummary.count > 0 
                ? Math.round((count / reviewsSummary.count) * 100) 
                : 0;
              
              return (
                <div key={rating} className="flex items-center">
                  <button
                    onClick={() => setReviewFilter(rating.toString() as "5" | "4" | "3" | "2" | "1")}
                    className={`flex items-center flex-1 ${reviewFilter === rating.toString() ? 'font-medium text-primary' : ''}`}
                  >
                    <span className="w-3">{rating}</span>
                    <svg
                      className="w-4 h-4 text-yellow-400 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    
                    <div className="mx-4 flex-1 h-2 rounded-full bg-accent/50 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    
                    <span className="text-sm text-muted-foreground w-8 text-right">
                      {count}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Category Ratings */}
          <div>
            <h4 className="font-medium mb-3">Category Ratings</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Noise Level</span>
                <StarRating rating={reviewsSummary.categoryAverages.noise} size="sm" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Comfort</span>
                <StarRating rating={reviewsSummary.categoryAverages.comfort} size="sm" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">WiFi Quality</span>
                <StarRating rating={reviewsSummary.categoryAverages.wifi} size="sm" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Food & Drinks</span>
                <StarRating rating={reviewsSummary.categoryAverages.coffee} size="sm" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Staff</span>
                <StarRating rating={reviewsSummary.categoryAverages.staff} size="sm" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews List & Form */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex items-center mb-2 sm:mb-0">
              <button 
                onClick={() => setReviewFilter("all")}
                className={`mr-2 px-3 py-1 text-sm rounded-full ${
                  reviewFilter === "all" 
                    ? "bg-primary text-white" 
                    : "bg-accent/50 hover:bg-accent/70"
                }`}
              >
                All Reviews
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm p-1 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="most_liked">Most Helpful</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-primary text-sm"
            >
              {showReviewForm ? "Cancel Review" : "Write a Review"}
            </button>
          </div>
          
          {/* Review Form */}
          {showReviewForm && (
            <div className="workout-card p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Share Your Experience</h3>
              
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Overall Rating
                  </label>
                  <StarRating 
                    rating={newReview.rating} 
                    size="lg" 
                    interactive 
                    onChange={(rating) => handleReviewChange("rating", rating)}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newReview.title}
                    onChange={(e) => handleReviewChange("title", e.target.value)}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                    placeholder="Sum up your experience"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="text" className="block text-sm font-medium mb-2">
                    Your Review
                  </label>
                  <textarea
                    id="text"
                    value={newReview.text}
                    onChange={(e) => handleReviewChange("text", e.target.value)}
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                    rows={4}
                    placeholder="Share details about your experience at this venue"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category Ratings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Noise Level</label>
                      <StarRating 
                        rating={newReview.categories.noise} 
                        size="sm" 
                        interactive 
                        onChange={(rating) => handleCategoryChange("noise", rating)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Comfort</label>
                      <StarRating 
                        rating={newReview.categories.comfort} 
                        size="sm" 
                        interactive 
                        onChange={(rating) => handleCategoryChange("comfort", rating)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">WiFi Quality</label>
                      <StarRating 
                        rating={newReview.categories.wifi} 
                        size="sm" 
                        interactive 
                        onChange={(rating) => handleCategoryChange("wifi", rating)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Food & Drinks</label>
                      <StarRating 
                        rating={newReview.categories.coffee} 
                        size="sm" 
                        interactive 
                        onChange={(rating) => handleCategoryChange("coffee", rating)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Staff</label>
                      <StarRating 
                        rating={newReview.categories.staff} 
                        size="sm" 
                        interactive 
                        onChange={(rating) => handleCategoryChange("staff", rating)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 border border-border rounded-md hover:bg-accent/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-4 py-2"
                    disabled={newReview.rating === 0 || !newReview.title.trim() || !newReview.text.trim()}
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Reviews List */}
          <div className="space-y-6">
            {sortedReviews.length === 0 ? (
              <div className="workout-card p-6 text-center">
                <p className="text-muted-foreground">No reviews match your filter criteria.</p>
              </div>
            ) : (
              sortedReviews.map((review) => (
                <div key={review.id} className="workout-card p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      {review.userAvatar ? (
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center mr-3">
                          <span className="text-muted-foreground">
                            {review.userName.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="font-medium">{review.userName}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(review.date)}
                        </p>
                      </div>
                    </div>
                    
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  
                  {review.title && (
                    <h4 className="font-medium mb-2">{review.title}</h4>
                  )}
                  
                  <p className="text-muted-foreground mb-4">{review.text}</p>
                  
                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review by ${review.userName}`}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Category Ratings */}
                  {review.categories && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4 text-xs">
                      <div className="text-center">
                        <div className="mb-1">Noise</div>
                        <StarRating rating={review.categories.noise} size="sm" />
                      </div>
                      <div className="text-center">
                        <div className="mb-1">Comfort</div>
                        <StarRating rating={review.categories.comfort} size="sm" />
                      </div>
                      <div className="text-center">
                        <div className="mb-1">WiFi</div>
                        <StarRating rating={review.categories.wifi} size="sm" />
                      </div>
                      <div className="text-center">
                        <div className="mb-1">Food</div>
                        <StarRating rating={review.categories.coffee} size="sm" />
                      </div>
                      <div className="text-center">
                        <div className="mb-1">Staff</div>
                        <StarRating rating={review.categories.staff} size="sm" />
                      </div>
                    </div>
                  )}
                  
                  {/* Like Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleLike(review.id)}
                      className={`flex items-center text-sm ${
                        review.hasLiked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill={review.hasLiked ? "currentColor" : "none"} 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-5 h-5 mr-1"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                      </svg>
                      <span>
                        {review.likes > 0 ? `Helpful (${review.likes})` : "Helpful?"}
                      </span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}