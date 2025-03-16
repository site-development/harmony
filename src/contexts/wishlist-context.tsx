"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";

export interface Property {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  slug: string;
  location: string;
  beds: number;
  baths: number;
  sqFt: number;
  description: string;
  detailedDescription?: string;
  features?: string[];
  images?: string[];
}

interface WishlistContextType {
  wishlist: Property[];
  addToWishlist: (property: Property) => void;
  removeFromWishlist: (propertyId: number) => void;
  isInWishlist: (propertyId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Property[]>([]);

  // Load wishlist from local storage on mount and when user changes
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } else {
      setWishlist([]);
    }
  }, [user]);

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = (property: Property) => {
    if (!isInWishlist(property.id)) {
      setWishlist([...wishlist, property]);
    }
  };

  const removeFromWishlist = (propertyId: number) => {
    setWishlist(wishlist.filter(property => property.id !== propertyId));
  };

  const isInWishlist = (propertyId: number) => {
    return wishlist.some(property => property.id === propertyId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
