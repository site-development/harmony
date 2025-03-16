"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, BarChart2, Bed, Bath, Square } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useComparison } from "@/contexts/comparison-context";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Property } from "@/contexts/wishlist-context";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToComparison, removeFromComparison, isInComparison, comparisonList } = useComparison();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      // Redirect to login or show login modal
      alert("Please login to add properties to your wishlist");
      return;
    }

    if (isInWishlist(property.id)) {
      removeFromWishlist(property.id);
    } else {
      addToWishlist(property);
    }
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInComparison(property.id)) {
      removeFromComparison(property.id);
    } else {
      if (comparisonList.length >= 4) {
        alert("You can compare up to 4 properties at a time");
        return;
      }
      addToComparison(property);
    }
  };

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group relative block overflow-hidden rounded-xl hover:shadow-lg transition-shadow duration-300"
    >
      {/* Property image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Action buttons */}
        <div className="absolute top-3 right-3 z-10 flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full bg-white/90 backdrop-blur-sm hover:bg-white ${
                    isInWishlist(property.id) ? 'text-red-500' : 'text-gray-700'
                  }`}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(property.id) ? 'fill-current' : ''}`} />
                  <span className="sr-only">Add to Wishlist</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isInWishlist(property.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full bg-white/90 backdrop-blur-sm hover:bg-white ${
                    isInComparison(property.id) ? 'text-accent' : 'text-gray-700'
                  }`}
                  onClick={handleCompareToggle}
                >
                  <BarChart2 className="h-4 w-4" />
                  <span className="sr-only">Compare</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isInComparison(property.id) ? 'Remove from Comparison' : 'Add to Compare'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Property details */}
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{property.title}</h3>
          <p className="text-lg font-bold">${property.price}</p>
        </div>

        <p className="text-sm text-muted-foreground mt-1 mb-3">{property.location}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{property.sqFt} sq ft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PropertyCardList({ properties }: { properties: Property[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
