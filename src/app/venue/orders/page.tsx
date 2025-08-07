"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Mock order data
interface Order {
  id: number;
  table: number;
  items: Array<{
    name: string;
    quantity: number;
    options: Array<string>;
    note?: string;
  }>;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  createdAt: Date;
  timeSinceCreation: string; // This will be calculated dynamically
}

const initialOrders: Order[] = [
  {
    id: 101,
    table: 2,
    items: [
      {
        name: "Latte",
        quantity: 1,
        options: ["Small", "Sub Oat Milk", "Double Shot"]
      }
    ],
    status: "preparing",
    createdAt: new Date(Date.now() - 11 * 60 * 1000), // 11 minutes ago
    timeSinceCreation: ""
  },
  {
    id: 102,
    table: 3,
    items: [
      {
        name: "Milk Tea",
        quantity: 1,
        options: ["Large", "\"No sugar please\""]
      }
    ],
    status: "preparing",
    createdAt: new Date(Date.now() - 8 * 60 * 1000 - 6 * 1000), // 8 min 6 sec ago
    timeSinceCreation: ""
  },
  {
    id: 103,
    table: 15,
    items: [
      {
        name: "Latte",
        quantity: 1,
        options: ["Small", "Sub Oat Milk", "Double Shot"]
      }
    ],
    status: "preparing",
    createdAt: new Date(Date.now() - 6 * 60 * 1000 - 12 * 1000), // 6 min 12 sec ago
    timeSinceCreation: ""
  },
  {
    id: 104,
    table: 8,
    items: [
      {
        name: "Latte",
        quantity: 1,
        options: ["Small", "Sub Oat Milk", "Double Shot"]
      }
    ],
    status: "preparing",
    createdAt: new Date(Date.now() - 4 * 60 * 1000 - 22 * 1000), // 4 min 22 sec ago
    timeSinceCreation: ""
  },
  {
    id: 105,
    table: 1,
    items: [
      {
        name: "Latte",
        quantity: 1,
        options: ["Small", "Sub Oat Milk", "Double Shot"]
      }
    ],
    status: "pending",
    createdAt: new Date(Date.now() - 3 * 60 * 1000 - 16 * 1000), // 3 min 16 sec ago
    timeSinceCreation: ""
  },
  {
    id: 106,
    table: 12,
    items: [
      {
        name: "Latte",
        quantity: 1,
        options: ["Small", "Sub Oat Milk", "Double Shot"]
      }
    ],
    status: "pending",
    createdAt: new Date(Date.now() - 3 * 60 * 1000 - 16 * 1000), // 3 min 16 sec ago
    timeSinceCreation: ""
  },
];

export default function VenueLiveOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  
  // Update time since creation every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => {
          const seconds = Math.floor((new Date().getTime() - order.createdAt.getTime()) / 1000);
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = seconds % 60;
          
          return {
            ...order,
            timeSinceCreation: `${minutes}m ${remainingSeconds}s`
          };
        })
      );
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Handle accepting an order
  const handleAcceptOrder = (orderId: number) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: "preparing" } 
          : order
      )
    );
  };
  
  // Handle rejecting an order
  const handleRejectOrder = (orderId: number) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: "cancelled" } 
          : order
      )
    );
    
    // Remove the cancelled order after a delay
    setTimeout(() => {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    }, 3000);
  };
  
  // Handle completing an order
  const handleCompleteOrder = (orderId: number) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: "completed" } 
          : order
      )
    );
    
    // Remove the completed order after a delay
    setTimeout(() => {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    }, 3000);
  };
  
  // Filter out completed and cancelled orders
  const activeOrders = orders.filter(order => 
    order.status !== "completed" && order.status !== "cancelled"
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Live Orders</h1>
      
      {activeOrders.length === 0 ? (
        <div className="workout-card p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-muted-foreground mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          <h2 className="text-xl font-medium mb-2">No Active Orders</h2>
          <p className="text-muted-foreground">When customers place orders, they will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeOrders.map((order) => (
            <div key={order.id} className="workout-card p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Table {order.table}</h2>
                <div className="text-right">
                  <p className="text-primary font-medium">{order.timeSinceCreation}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                {order.items.map((item, index) => (
                  <div key={index}>
                    <p className="font-medium">{item.quantity} × {item.name}</p>
                    <div className="text-sm text-muted-foreground">
                      {item.options.map((option, optIndex) => (
                        <p key={optIndex}>{option}</p>
                      ))}
                      {item.note && <p className="italic">"{item.note}"</p>}
                    </div>
                  </div>
                ))}
              </div>
              
              {order.status === "pending" ? (
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleRejectOrder(order.id)}
                    className="flex-1 py-2 bg-accent/50 hover:bg-accent rounded-md text-sm font-medium"
                  >
                    Reject Order
                  </button>
                  <button 
                    onClick={() => handleAcceptOrder(order.id)}
                    className="flex-1 py-2 btn-primary"
                  >
                    Accept Order
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => handleCompleteOrder(order.id)}
                  className="w-full py-2 btn-primary"
                >
                  Complete Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}