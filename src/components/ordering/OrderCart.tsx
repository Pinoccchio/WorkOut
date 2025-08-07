"use client";

import { useState } from "react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  note?: string;
}

interface OrderCartProps {
  items: OrderItem[];
  onItemRemove: (id: string) => void;
  onItemUpdate: (id: string, quantity: number, note?: string) => void;
  onCheckout: () => void;
  creditAmount: number;
}

export default function OrderCart({ items, onItemRemove, onItemUpdate, onCheckout, creditAmount }: OrderCartProps) {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [itemNote, setItemNote] = useState<string>("");
  
  const handleEditItem = (item: OrderItem) => {
    setEditingItem(item.id);
    setItemNote(item.note || "");
  };
  
  const handleSaveNote = (id: string) => {
    onItemUpdate(id, items.find(item => item.id === id)?.quantity || 1, itemNote);
    setEditingItem(null);
  };
  
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + tax + serviceFee;
  
  const hasEnoughCredit = creditAmount >= total;
  
  return (
    <div className="workout-card h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold">Your Order</h2>
      </div>
      
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-muted-foreground mb-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <p className="text-muted-foreground">Your order is empty</p>
          <p className="text-sm text-muted-foreground mt-1">Add items from the menu to get started</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between mb-1">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      {item.note && editingItem !== item.id && (
                        <p className="text-xs text-muted-foreground mt-1">Note: {item.note}</p>
                      )}
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  
                  {editingItem === item.id ? (
                    <div className="mt-2">
                      <textarea
                        value={itemNote}
                        onChange={(e) => setItemNote(e.target.value)}
                        placeholder="Add special instructions..."
                        className="w-full p-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        rows={2}
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => setEditingItem(null)}
                          className="text-xs text-muted-foreground hover:text-foreground mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNote(item.id)}
                          className="text-xs text-primary hover:underline"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <button
                          onClick={() => onItemUpdate(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-sm"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-2 text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onItemUpdate(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-xs text-primary hover:underline"
                        >
                          Add Note
                        </button>
                        <button
                          onClick={() => onItemRemove(item.id)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-border p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service Fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-border">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>Available Credit</span>
                <span className={hasEnoughCredit ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                  ${creditAmount.toFixed(2)}
                </span>
              </div>
              {!hasEnoughCredit && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  You don't have enough credit for this order.
                </p>
              )}
            </div>
            
            <button
              onClick={onCheckout}
              disabled={!hasEnoughCredit}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hasEnoughCredit ? "Place Order" : "Add Credit to Continue"}
            </button>
            
            <p className="text-xs text-center text-muted-foreground mt-2">
              Your order will be sent to the venue for preparation
            </p>
          </div>
        </>
      )}
    </div>
  );
}