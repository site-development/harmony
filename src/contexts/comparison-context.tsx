"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Property } from "@/contexts/wishlist-context";

interface ComparisonContextType {
  comparisonList: Property[];
  addToComparison: (property: Property) => void;
  removeFromComparison: (propertyId: number) => void;
  isInComparison: (propertyId: number) => boolean;
  clearComparison: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonList, setComparisonList] = useState<Property[]>([]);

  // Load comparison list from local storage on mount
  useEffect(() => {
    const savedComparison = localStorage.getItem('property_comparison');
    if (savedComparison) {
      setComparisonList(JSON.parse(savedComparison));
    }
  }, []);

  // Save comparison list to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('property_comparison', JSON.stringify(comparisonList));
  }, [comparisonList]);

  const addToComparison = (property: Property) => {
    if (comparisonList.length < 4 && !isInComparison(property.id)) {
      setComparisonList([...comparisonList, property]);
    }
  };

  const removeFromComparison = (propertyId: number) => {
    setComparisonList(comparisonList.filter(property => property.id !== propertyId));
  };

  const isInComparison = (propertyId: number) => {
    return comparisonList.some(property => property.id === propertyId);
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
}
