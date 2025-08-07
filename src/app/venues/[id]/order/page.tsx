"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getVenueById } from "@/data/venues";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MenuCategory from "@/components/ordering/MenuCategory";
import OrderCart from "@/components/ordering/OrderCart";
import Link from "next/link";
import { foodImages, getImageByIndex } from "@/utils/image-placeholders";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  note?: string;
}

export default function OrderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [venueId, setVenueId] = useState<number | null>(null);
  
  useEffect(() => {
    if (params && params.id) {
      setVenueId(parseInt(params.id));
    }
  }, [params]);
  
  const [activeCategory, setActiveCategory] = useState<string>("Hot Drinks");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [creditAmount, setCreditAmount] = useState<number>(15.00); // Mock credit amount
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [itemNote, setItemNote] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  
  // Mock menu data - in a real app, this would come from an API
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "item-1",
      name: "Latte",
      description: "Espresso with steamed milk and a light layer of foam",
      price: 4.50,
      image: getImageByIndex(foodImages, 0),
      category: "Hot Drinks",
    },
    {
      id: "item-2",
      name: "Cappuccino",
      description: "Equal parts espresso, steamed milk, and foam",
      price: 4.50,
      image: getImageByIndex(foodImages, 1),
      category: "Hot Drinks",
    },
    {
      id: "item-3",
      name: "Espresso",
      description: "A concentrated shot of coffee",
      price: 3.50,
      image: getImageByIndex(foodImages, 2),
      category: "Hot Drinks",
    },
    {
      id: "item-4",
      name: "Americano",
      description: "Espresso diluted with hot water",
      price: 3.75,
      image: getImageByIndex(foodImages, 3),
      category: "Hot Drinks",
    },
    {
      id: "item-5",
      name: "Cold Brew",
      description: "Coffee brewed with cold water over 12+ hours",
      price: 4.75,
      image: getImageByIndex(foodImages, 0),
      category: "Cold Drinks",
    },
    {
      id: "item-6",
      name: "Iced Latte",
      description: "Espresso with cold milk and ice",
      price: 4.75,
      image: getImageByIndex(foodImages, 1),
      category: "Cold Drinks",
    },
    {
      id: "item-7",
      name: "Croissant",
      description: "Buttery, flaky pastry",
      price: 3.95,
      image: getImageByIndex(foodImages, 2),
      category: "Food",
    },
    {
      id: "item-8",
      name: "Avocado Toast",
      description: "Sourdough toast with avocado, salt, pepper, and red pepper flakes",
      price: 8.95,
      image: getImageByIndex(foodImages, 3),
      category: "Food",
    },
  ]);
  
  const venue = venueId ? getVenueById(venueId) : null;
  
  // Get available categories
  const categories = [...new Set(menuItems.map(item => item.category))];
  
  // Filter items by category
  const filteredItems = menuItems.filter(item => item.category === activeCategory);
  
  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setItemQuantity(1);
    setItemNote("");
    setIsDetailOpen(true);
  };
  
  const handleAddToOrder = () => {
    if (!selectedItem) return;
    
    // Check if item already exists in order
    const existingItemIndex = orderItems.findIndex(item => item.id === selectedItem.id);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...orderItems];
      updatedItems[existingItemIndex].quantity += itemQuantity;
      if (itemNote) {
        updatedItems[existingItemIndex].note = itemNote;
      }
      setOrderItems(updatedItems);
    } else {
      // Add new item
      setOrderItems([
        ...orderItems,
        {
          id: selectedItem.id,
          name: selectedItem.name,
          price: selectedItem.price,
          quantity: itemQuantity,
          note: itemNote || undefined,
        },
      ]);
    }
    
    setIsDetailOpen(false);
  };
  
  const handleRemoveItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };
  
  const handleUpdateItem = (id: string, quantity: number, note?: string) => {
    setOrderItems(orderItems.map(item => 
      item.id === id 
        ? { ...item, quantity, note: note !== undefined ? note : item.note } 
        : item
    ));
  };
  
  const handleCheckout = () => {
    // Simulate successful order
    setTimeout(() => {
      router.push(`/venues/${venueId}/order/confirmation`);
    }, 1000);
  };
  
  if (!venue) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow workout-container py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Venue not found</p>
            <Link href="/find-workspace" className="text-primary hover:underline">
              Find a different venue
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Venue Info */}
        <div className="bg-accent/30">
          <div className="workout-container py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">{venue.name}</h1>
                <p className="text-sm text-muted-foreground">{venue.location.city}, {venue.location.state}</p>
              </div>
              <Link href={`/venues/${venue.id}`} className="text-sm text-primary hover:underline">
                View Venue
              </Link>
            </div>
          </div>
        </div>
        
        <div className="workout-container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Menu Section */}
            <div className="lg:col-span-2">
              {/* Category Tabs */}
              <div className="flex border-b border-border mb-6 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                      activeCategory === category
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Menu Items */}
              <MenuCategory
                title={activeCategory}
                items={filteredItems}
                onItemClick={handleItemClick}
              />
            </div>
            
            {/* Order Cart */}
            <div className="lg:col-span-1">
              <OrderCart
                items={orderItems}
                onItemRemove={handleRemoveItem}
                onItemUpdate={handleUpdateItem}
                onCheckout={handleCheckout}
                creditAmount={creditAmount}
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Item Detail Modal */}
      {isDetailOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-1">{selectedItem.name}</h2>
              <p className="text-muted-foreground mb-4">{selectedItem.description}</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Special Instructions</label>
                <textarea
                  value={itemNote}
                  onChange={(e) => setItemNote(e.target.value)}
                  placeholder="E.g. No sugar, extra hot, etc."
                  className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <button
                    onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="mx-3 w-8 text-center">{itemQuantity}</span>
                  <button
                    onClick={() => setItemQuantity(itemQuantity + 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                
                <p className="font-medium">${(selectedItem.price * itemQuantity).toFixed(2)}</p>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="btn-outline py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToOrder}
                  className="btn-primary"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}