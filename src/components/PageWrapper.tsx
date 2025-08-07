"use client";

import { ReactNode } from "react";
import { useAuthModal } from "@/contexts/AuthModalContext";
import AuthModal from "./auth/AuthModal";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const { isOpen, authType, closeAuthModal } = useAuthModal();

  return (
    <>
      {children}
      <AuthModal 
        isOpen={isOpen}
        onClose={closeAuthModal}
        initialType={authType}
      />
    </>
  );
}