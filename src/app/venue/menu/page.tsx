"use client";

import { useState } from "react";
import Image from "next/image";
import { foodImages } from "@/utils/image-placeholders";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Hot Drinks" | "Cold Drinks" | "Food";
  available: boolean;
}

export default function VenueMenuPage() {
  // Mock menu items
  const initialMenuItems: MenuItem[] = [
    {
      id: "item-1",
      name: "Latte",
      description: "Espresso with steamed milk and a light layer of foam",
      price: 4.50,
      image: foodImages[0],
      category: "Hot Drinks",
      available: true,
    },
    {
      id: "item-2",
      name: "Cappuccino",
      description: "Equal parts espresso, steamed milk, and foam",
      price: 4.50,
      image: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?q=80&w=2873&auto=format&fit=crop",
      category: "Hot Drinks",
      available: true,
    },
    {
      id: "item-3",
      name: "Espresso",
      description: "A concentrated shot of coffee",
      price: 3.50,
      image: "https://images.unsplash.com/photo-1514664902876-824dfe29bb64?q=80&w=2787&auto=format&fit=crop",
      category: "Hot Drinks",
      available: true,
    },
    {
      id: "item-4",
      name: "Americano",
      description: "Espresso diluted with hot water",
      price: 3.75,
      image: "https://images.unsplash.com/photo-1592321675774-3de57f3ee0dc?q=80&w=2980&auto=format&fit=crop",
      category: "Hot Drinks",
      available: true,
    },
    {
      id: "item-5",
      name: "Cold Brew",
      description: "Coffee brewed with cold water over 12+ hours",
      price: 4.75,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2969&auto=format&fit=crop",
      category: "Cold Drinks",
      available: true,
    },
    {
      id: "item-6",
      name: "Iced Latte",
      description: "Espresso with cold milk and ice",
      price: 4.75,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=2787&auto=format&fit=crop",
      category: "Cold Drinks",
      available: true,
    },
    {
      id: "item-7",
      name: "Croissant",
      description: "Buttery, flaky pastry",
      price: 3.95,
      image: foodImages[2],
      category: "Food",
      available: true,
    },
    {
      id: "item-8",
      name: "Avocado Toast",
      description: "Sourdough toast with avocado, salt, pepper, and red pepper flakes",
      price: 8.95,
      image: foodImages[3],
      category: "Food",
      available: true,
    },
  ];
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [activeCategory, setActiveCategory] = useState<"All" | "Hot Drinks" | "Cold Drinks" | "Food">("All");
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Filter menu items based on category
  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);
  
  // Toggle item availability
  const toggleAvailability = (id: string) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };
  
  // Delete item
  const deleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };
  
  // Save edited item
  const saveItem = (updatedItem: MenuItem) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setEditItem(null);
  };
  
  // Add new item
  const addItem = (newItem: MenuItem) => {
    setMenuItems(prev => [...prev, { ...newItem, id: `item-${Date.now()}` }]);
    setIsAddModalOpen(false);
  };
  
  const EmptyItemForm: MenuItem = {
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "Hot Drinks",
    available: true,
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary"
        >
          Add Item
        </button>
      </div>
      
      {/* Category Tabs */}
      <div className="flex border-b border-border mb-6 overflow-x-auto">
        {["All", "Hot Drinks", "Cold Drinks", "Food"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeCategory === category
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveCategory(category as any)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className={`workout-card-hover flex ${!item.available ? 'opacity-60' : ''}`}
          >
            {/* Item Image */}
            <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
              <div className="w-full h-full rounded-l-[var(--radius)] flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full rounded-l-[var(--radius)]"
                  />
                ) : (
                  <div className="w-full h-full bg-accent/50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted-foreground">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Item Details */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
                <p className="font-semibold">${item.price.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs bg-accent px-2 py-1 rounded-full">
                  {item.category}
                </span>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`text-xs font-medium ${
                      item.available 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {item.available ? 'Available' : 'Unavailable'}
                  </button>
                  
                  <button
                    onClick={() => setEditItem(item)}
                    className="text-xs text-primary hover:underline"
                  >
                    Edit
                  </button>
                  
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="col-span-full workout-card p-8 text-center">
            <p className="text-muted-foreground">
              No items found in this category. 
              <button 
                onClick={() => setIsAddModalOpen(true)} 
                className="text-primary hover:underline ml-1"
              >
                Add an item
              </button>
            </p>
          </div>
        )}
      </div>
      
      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Menu Item</h2>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  saveItem(editItem);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={editItem.name}
                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                    className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={editItem.description}
                    onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                    rows={3}
                    className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editItem.price}
                    onChange={(e) => setEditItem({ ...editItem, price: parseFloat(e.target.value) })}
                    className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={editItem.category}
                    onChange={(e) => setEditItem({ ...editItem, category: e.target.value as any })}
                    className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Hot Drinks">Hot Drinks</option>
                    <option value="Cold Drinks">Cold Drinks</option>
                    <option value="Food">Food</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editItem.image}
                    onChange={(e) => setEditItem({ ...editItem, image: e.target.value })}
                    className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. /images/latte.jpg"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="available"
                    checked={editItem.available}
                    onChange={(e) => setEditItem({ ...editItem, available: e.target.checked })}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary mr-2"
                  />
                  <label htmlFor="available" className="text-sm">
                    Item is available
                  </label>
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditItem(null)}
                    className="btn-outline py-2"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add Menu Item</h2>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  addItem(EmptyItemForm);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={EmptyItemForm.name}
                    onChange={(e) => EmptyItemForm.name = e.target.value}
                    className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={EmptyItemForm.description}
                    onChange={(e) => EmptyItemForm.description = e.target.value}
                    rows={3}
                    className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={EmptyItemForm.price || ""}
                    onChange={(e) => EmptyItemForm.price = parseFloat(e.target.value)}
                    className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={EmptyItemForm.category}
                    onChange={(e) => EmptyItemForm.category = e.target.value as any}
                    className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Hot Drinks">Hot Drinks</option>
                    <option value="Cold Drinks">Cold Drinks</option>
                    <option value="Food">Food</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    value={EmptyItemForm.image}
                    onChange={(e) => EmptyItemForm.image = e.target.value}
                    className="w-full p-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. /images/latte.jpg"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="btn-outline py-2"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}