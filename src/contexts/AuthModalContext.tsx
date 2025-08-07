"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthModalContextType {
  openAuthModal: (type: "login" | "signup") => void;
  closeAuthModal: () => void;
  isOpen: boolean;
  authType: "login" | "signup";
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");

  const openAuthModal = (type: "login" | "signup") => {
    setAuthType(type);
    setIsOpen(true);
  };

  const closeAuthModal = () => {
    setIsOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal, isOpen, authType }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}