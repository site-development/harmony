"use client";

import { useEffect } from "react";
import { AuthProvider } from "@/contexts/auth-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { ComparisonProvider } from "@/contexts/comparison-context";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
      <AuthProvider>
        <WishlistProvider>
          <ComparisonProvider>
            <MainNav />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </ComparisonProvider>
        </WishlistProvider>
      </AuthProvider>
    </body>
  );
}
