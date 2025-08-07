"use client";

import { useState } from "react";
import Link from "next/link";
import StarRating from "@/components/StarRating";

interface Review {
  id: string;
  venueName: string;
  venueId: number;
  rating: number;
  title: string;
  text: string;
  date: Date;
  likes: number;
  categories?: {
    noise: number;
    comfort: number;
    wifi: number;
    coffee: number;
    staff: number;
  };
}

export default function UserReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "rev_1",
      venueName: "Urban Coffee Co.",
      venueId: 1,
      rating: 4.5,
      title: "Great spot for focused work",
      text: "I visited this venue twice last week and was impressed by the quiet atmosphere and reliable WiFi. The coffee was excellent too! Perfect for getting deep work done.",
      date: new Date(2025, 7, 5), // August 5, 2025
      likes: 12,
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
      venueName: "Tech Hub",
      venueId: 2,
      rating: 3.5,
      title: "Good but gets crowded",
      text: "The venue itself is nice with good amenities, but it gets really crowded during peak hours. If you're looking for a quiet place to work, I'd recommend coming early in the morning or later in the evening.",
      date: new Date(2025, 6, 28), // July 28, 2025
      likes: 5,
      categories: {
        noise: 2,
        comfort: 4,
        wifi: 4,
        coffee: 3,
        staff: 3
      }
    },
    {
      id: "rev_3",
      venueName: "The Book Cafe",
      venueId: 3,
      rating: 5,
      title: "Hidden gem with excellent service",
      text: "This is my favorite workspace in the city. It's quiet, has great coffee, and the staff is incredibly friendly. The WiFi is super reliable and there are plenty of power outlets.",
      date: new Date(2025, 6, 15), // July 15, 2025
      likes: 18,
      categories: {
        noise: 5,
        comfort: 5,
        wifi: 5,
        coffee: 5,
        staff: 5
      }
    }
  ]);
  
  const [filter, setFilter] = useState<"all" | "recent" | "highest" | "lowest">("all");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
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
  
  // Filter and sort reviews
  const filteredReviews = [...reviews].sort((a, b) => {
    switch (filter) {
      case "recent":
        return b.date.getTime() - a.date.getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return b.date.getTime() - a.date.getTime();
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
  
  // Handle delete review
  const handleDeleteReview = (id: string) => {
    setReviews(prevReviews => prevReviews.filter(review => review.id !== id));
  };
  
  // Handle edit review
  const handleEditReview = (review: Review) => {
    setEditingReviewId(review.id);
    setEditForm({
      rating: review.rating,
      title: review.title,
      text: review.text,
      categories: review.categories || {
        noise: 0,
        comfort: 0,
        wifi: 0,
        coffee: 0,
        staff: 0
      }
    });
  };
  
  // Handle edit form input changes
  const handleEditFormChange = (field: string, value: any) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle category rating changes
  const handleCategoryChange = (category: string, value: number) => {
    setEditForm(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: value
      }
    }));
  };
  
  // Handle save edited review
  const handleSaveEdit = (id: string) => {
    setReviews(prevReviews => 
      prevReviews.map(review => {
        if (review.id === id) {
          return {
            ...review,
            rating: editForm.rating,
            title: editForm.title,
            text: editForm.text,
            categories: editForm.categories,
            date: new Date() // Update date to current time
          };
        }
        return review;
      })
    );
    
    setEditingReviewId(null);
  };
  
  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      
      {reviews.length === 0 ? (
        <div className="workout-card p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">No Reviews Yet</h2>
          <p className="text-muted-foreground mb-6">You haven't reviewed any workspaces yet.</p>
          <Link href="/find-workspace" className="btn-primary py-2 px-4">
            Find a Workspace
          </Link>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="text-sm p-1 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
            
            <Link href="/find-workspace" className="text-primary text-sm hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Write a New Review
            </Link>
          </div>
          
          {/* Reviews List */}
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="workout-card p-6">
                {editingReviewId === review.id ? (
                  /* Edit Form */
                  <div>
                    <h3 className="text-lg font-medium mb-4">Edit Your Review</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Rating
                      </label>
                      <StarRating 
                        rating={editForm.rating} 
                        size="lg" 
                        interactive 
                        onChange={(rating) => handleEditFormChange("rating", rating)}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Review Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={editForm.title}
                        onChange={(e) => handleEditFormChange("title", e.target.value)}
                        className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="text" className="block text-sm font-medium mb-2">
                        Your Review
                      </label>
                      <textarea
                        id="text"
                        value={editForm.text}
                        onChange={(e) => handleEditFormChange("text", e.target.value)}
                        className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Category Ratings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-1">Noise Level</label>
                          <StarRating 
                            rating={editForm.categories.noise} 
                            size="sm" 
                            interactive 
                            onChange={(rating) => handleCategoryChange("noise", rating)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Comfort</label>
                          <StarRating 
                            rating={editForm.categories.comfort} 
                            size="sm" 
                            interactive 
                            onChange={(rating) => handleCategoryChange("comfort", rating)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">WiFi Quality</label>
                          <StarRating 
                            rating={editForm.categories.wifi} 
                            size="sm" 
                            interactive 
                            onChange={(rating) => handleCategoryChange("wifi", rating)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Food & Drinks</label>
                          <StarRating 
                            rating={editForm.categories.coffee} 
                            size="sm" 
                            interactive 
                            onChange={(rating) => handleCategoryChange("coffee", rating)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Staff</label>
                          <StarRating 
                            rating={editForm.categories.staff} 
                            size="sm" 
                            interactive 
                            onChange={(rating) => handleCategoryChange("staff", rating)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 border border-border rounded-md hover:bg-accent/50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(review.id)}
                        className="btn-primary px-4 py-2"
                        disabled={editForm.rating === 0 || !editForm.title.trim() || !editForm.text.trim()}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Review Display */
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <Link 
                        href={`/venues/${review.venueId}`}
                        className="font-medium text-lg hover:text-primary"
                      >
                        {review.venueName}
                      </Link>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    
                    <h3 className="font-medium mb-2">{review.title}</h3>
                    <p className="text-muted-foreground mb-4">{review.text}</p>
                    
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
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-muted-foreground">
                        {formatDate(review.date)} • {review.likes} people found this helpful
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEditReview(review)}
                          className="text-primary hover:underline flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          Edit
                        </button>
                        
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-red-500 dark:text-red-400 hover:underline flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}