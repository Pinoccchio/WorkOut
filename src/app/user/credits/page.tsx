"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { heroImages } from "@/utils/image-placeholders";

interface CreditTransaction {
  id: string;
  date: string;
  type: "earned" | "redeemed" | "expired" | "purchased";
  amount: number;
  description: string;
}

export default function UserCreditsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "history">("all");
  
  // Sample data for credit balance and transactions
  const creditBalance = 750;
  const creditsExpiringSoon = 250;
  const expirationDate = "September 15, 2025";
  
  const transactions: CreditTransaction[] = [
    {
      id: "tx-001",
      date: "Aug 7, 2025",
      type: "earned",
      amount: 100,
      description: "Booking at The Coffee Collective"
    },
    {
      id: "tx-002",
      date: "Aug 5, 2025",
      type: "redeemed",
      amount: 50,
      description: "Discount on booking at Urban Workspace"
    },
    {
      id: "tx-003",
      date: "Aug 1, 2025",
      type: "purchased",
      amount: 500,
      description: "Credit pack purchase"
    },
    {
      id: "tx-004",
      date: "Jul 25, 2025",
      type: "earned",
      amount: 50,
      description: "Referral bonus - Sarah Johnson"
    },
    {
      id: "tx-005",
      date: "Jul 20, 2025",
      type: "redeemed",
      amount: 100,
      description: "Discount on booking at The Study Hub"
    },
    {
      id: "tx-006",
      date: "Jul 15, 2025",
      type: "expired",
      amount: 75,
      description: "Credits expired"
    }
  ];
  
  // Get transaction type badge class
  const getTransactionBadgeClass = (type: string) => {
    switch (type) {
      case "earned":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "redeemed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "purchased":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Your WorkOut Credits</h1>
        
        <button className="btn-primary py-2 px-4 inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Buy Credits
        </button>
      </div>
      
      {/* Credit Balance Card */}
      <div className="workout-card bg-gradient-to-r from-primary/80 to-primary text-white mb-8 overflow-hidden relative">        
        <div className="absolute inset-0 opacity-10">
          <Image 
            src={heroImages[2]}
            alt="Credits background"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Available Credits</p>
              <h2 className="text-4xl font-bold">{creditBalance}</h2>
              {creditsExpiringSoon > 0 && (
                <p className="text-sm mt-2">
                  {creditsExpiringSoon} credits expiring on {expirationDate}
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-md transition-colors">
                Transfer Credits
              </button>
              <Link href="/user/credits/redeem" className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-md transition-colors">
                Redeem
              </Link>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-black/20">
          <p className="text-sm">Use your credits for discounts on bookings and food orders.</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "all"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Transactions
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "history"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Credits History
        </button>
      </div>
      
      {/* Transaction History */}
      <div className="workout-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-accent/10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransactionBadgeClass(transaction.type)}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                    {transaction.type === "earned" || transaction.type === "purchased" ? (
                      <span className="text-emerald-600 dark:text-emerald-400">+{transaction.amount}</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">-{transaction.amount}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="workout-card p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <Image 
              src={heroImages[1]}
              alt="Earn credits background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
          <h3 className="text-lg font-medium mb-4">How to Earn Credits</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Book Workspaces</p>
                <p className="text-sm text-muted-foreground">Earn 100 credits for every $50 spent on bookings</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Refer Friends</p>
                <p className="text-sm text-muted-foreground">Get 50 credits for each friend who signs up and books</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Purchase Credit Packs</p>
                <p className="text-sm text-muted-foreground">Buy credits directly at discounted rates</p>
              </div>
            </li>
          </ul>
          </div>
        </div>
        
        <div className="workout-card p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <Image 
              src={heroImages[0]}
              alt="Use credits background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
          <h3 className="text-lg font-medium mb-4">Using Your Credits</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Booking Discounts</p>
                <p className="text-sm text-muted-foreground">Apply credits during checkout for instant discounts</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Food & Beverage</p>
                <p className="text-sm text-muted-foreground">Pay for orders using your credits balance</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Premium Features</p>
                <p className="text-sm text-muted-foreground">Unlock special workspaces and premium amenities</p>
              </div>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}