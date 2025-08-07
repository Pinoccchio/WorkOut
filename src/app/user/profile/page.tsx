"use client";

import { useState } from "react";
import Image from "next/image";
import { userImages } from "@/utils/image-placeholders";

export default function UserProfilePage() {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    birthdate: "1990-01-01",
    preferredLocation: "New York, NY",
    preferredWorkingHours: "9:00 AM - 5:00 PM",
    bio: "Freelance designer and developer working remotely. Love exploring new coffee shops and coworking spaces.",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to save profile
    setTimeout(() => {
      setIsEditing(false);
    }, 500);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? "btn-outline" : "btn-primary py-2"}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
      
      <div className="workout-card p-6">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First & Last Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              {/* Email & Phone */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {/* Birthdate & Location */}
              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium mb-1">
                  Birthdate
                </label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={profileData.birthdate}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="preferredLocation" className="block text-sm font-medium mb-1">
                  Preferred Location
                </label>
                <input
                  type="text"
                  id="preferredLocation"
                  name="preferredLocation"
                  value={profileData.preferredLocation}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {/* Working Hours */}
              <div>
                <label htmlFor="preferredWorkingHours" className="block text-sm font-medium mb-1">
                  Preferred Working Hours
                </label>
                <input
                  type="text"
                  id="preferredWorkingHours"
                  name="preferredWorkingHours"
                  value={profileData.preferredWorkingHours}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 9:00 AM - 5:00 PM"
                />
              </div>
            </div>
            
            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden relative">
                <Image 
                  src={userImages[0]}
                  alt="Profile picture"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold">{profileData.firstName} {profileData.lastName}</h2>
                <p className="text-muted-foreground">{profileData.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                <p>{profileData.phone || "Not provided"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Birthdate</h3>
                <p>{new Date(profileData.birthdate).toLocaleDateString() || "Not provided"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Preferred Location</h3>
                <p>{profileData.preferredLocation || "Not provided"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Preferred Working Hours</h3>
                <p>{profileData.preferredWorkingHours || "Not provided"}</p>
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Bio</h3>
              <p className="text-sm">{profileData.bio || "No bio provided"}</p>
            </div>
            
            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button className="text-sm text-primary hover:underline">
                  Change Password
                </button>
                <button className="block text-sm text-primary hover:underline">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}