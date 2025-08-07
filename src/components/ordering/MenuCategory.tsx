"use client";

import Image from "next/image";
import { foodImages, getImageById } from "@/utils/image-placeholders";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface MenuCategoryProps {
  title: string;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

export default function MenuCategory({ title, items, onItemClick }: MenuCategoryProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            className="workout-card-hover w-full text-left flex items-center p-3"
            onClick={() => onItemClick(item)}
          >
            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
              {item.image ? (
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image 
                  src={getImageById(foodImages, item.id)} 
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            
            <div className="ml-4 flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
              <p className="text-sm font-medium mt-1">${item.price.toFixed(2)}</p>
            </div>
          </button>
        ))}
        
        {items.length === 0 && (
          <div className="text-center p-4 text-muted-foreground">
            No items available in this category
          </div>
        )}
      </div>
    </div>
  );
}