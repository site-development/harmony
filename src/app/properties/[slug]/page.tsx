"use client";

import { useState } from "react";
import { properties } from "@/data/properties";
import { useWishlist } from "@/contexts/wishlist-context";
import { useComparison } from "@/contexts/comparison-context";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Bed, Bath, Square, Heart, Share2, BarChart2, Mail } from "lucide-react";

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const { toast } = useToast();

  // Find the property with matching slug
  const property = properties.find(p => p.slug === slug) || properties[0];

  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToComparison, removeFromComparison, isInComparison, comparisonList } = useComparison();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleWishlistToggle = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please login to add properties to your wishlist",
      });
      return;
    }

    if (isInWishlist(property.id)) {
      removeFromWishlist(property.id);
      toast({
        title: "Removed from Wishlist",
        description: "Property has been removed from your wishlist",
      });
    } else {
      addToWishlist(property);
      toast({
        title: "Added to Wishlist",
        description: "Property has been added to your wishlist",
      });
    }
  };

  const handleCompareToggle = () => {
    if (isInComparison(property.id)) {
      removeFromComparison(property.id);
      toast({
        title: "Removed from Comparison",
        description: "Property has been removed from comparison",
      });
    } else {
      if (comparisonList.length >= 4) {
        toast({
          variant: "destructive",
          title: "Comparison Limit Reached",
          description: "You can compare up to 4 properties at a time",
        });
        return;
      }

      addToComparison(property);
      toast({
        title: "Added to Comparison",
        description: "Property has been added to comparison",
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      })
      .catch(() => {
        // Fallback
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Property link has been copied to clipboard",
        });
      });
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Property link has been copied to clipboard",
      });
    }
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <Link
        href="/properties"
        className="flex items-center gap-1 text-sm font-medium mb-8 hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Property Images and Details */}
        <div className="lg:col-span-8">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-3">
              <Image
                src={property.images?.[activeImageIndex] || property.imageUrl}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>

            {property.images && property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-[16/9] w-24 rounded-md overflow-hidden ${
                      activeImageIndex === index ? 'ring-2 ring-accent' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <p className="text-muted-foreground mb-2">{property.location}</p>
                <p className="text-2xl font-bold">${property.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className={isInWishlist(property.id) ? 'text-red-500' : ''}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(property.id) ? 'fill-current' : ''}`} />
                  <span className="sr-only">Add to Wishlist</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCompareToggle}
                  className={isInComparison(property.id) ? 'text-accent' : ''}
                >
                  <BarChart2 className="h-5 w-5" />
                  <span className="sr-only">Compare</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bed className="h-5 w-5" />
                <span>{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-5 w-5" />
                <span>{property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="h-5 w-5" />
                <span>{property.sqFt} sq ft</span>
              </div>
            </div>

            <div className="prose prose-zinc max-w-none">
              <h2 className="text-xl font-semibold mb-4">About This Property</h2>
              <p className="mb-4">{property.detailedDescription || property.description}</p>

              {property.features && (
                <>
                  <h3 className="text-lg font-semibold mb-3">Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-2 w-2 bg-accent rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-8 flex">
                <Button
                  className="mr-4"
                  onClick={() => setShowContactForm(!showContactForm)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {showContactForm ? 'Hide Contact Form' : 'Contact Agent'}
                </Button>

                <Button asChild variant="outline">
                  <Link href="/comparison">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Compare Properties
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <div className="bg-muted rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact An Agent</h2>
              <p className="text-muted-foreground mb-6">
                Interested in this property? Contact our real estate agent for more information or to schedule a viewing.
              </p>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
