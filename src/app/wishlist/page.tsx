"use client";

import { useWishlist } from "@/contexts/wishlist-context";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { PropertyCardList } from "@/components/PropertyCard";
import { LoginForm } from "@/components/auth/AuthForms";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { user, loading } = useAuth();
  const { wishlist } = useWishlist();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      // Optional: Redirect to login page
      // router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Please sign in to view and manage your saved properties.
          </p>
          <LoginForm />
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
        <p className="text-muted-foreground max-w-2xl">
          Here are the properties you've saved. You can remove them anytime by clicking the heart icon.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-muted rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Add properties to your wishlist by clicking the heart icon on property cards.
          </p>
          <Button asChild>
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      ) : (
        <PropertyCardList properties={wishlist} />
      )}
    </main>
  );
}
