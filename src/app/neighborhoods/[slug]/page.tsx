"use client";

import { neighborhoods } from "@/data/neighborhoods";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the map component to prevent SSR issues
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-xl"></div>
});

export default function NeighborhoodDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  // Find the neighborhood with matching slug
  const neighborhood = neighborhoods.find(n => n.slug === slug) || neighborhoods[0];

  // Find properties in this neighborhood
  const neighborhoodProperties = properties.filter(p =>
    neighborhood.properties.includes(p.id)
  );

  return (
    <main className="container mx-auto px-4 py-12">
      <Link
        href="/neighborhoods"
        className="flex items-center gap-1 text-sm font-medium mb-8 hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All Neighborhoods
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Neighborhood Image and Info */}
        <div className="lg:col-span-7">
          <div className="rounded-xl overflow-hidden relative aspect-[4/3]">
            <Image
              src={neighborhood.imageUrl}
              alt={neighborhood.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 text-accent mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold">{neighborhood.name}</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            {neighborhood.description}
          </p>

          <div>
            <h2 className="text-lg font-semibold mb-3">Neighborhood Highlights</h2>
            <ul className="space-y-2">
              {neighborhood.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-2 w-2 bg-accent rounded-full mr-3"></div>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Location</h2>
        <div className="h-[400px] rounded-xl overflow-hidden">
          <Map
            center={[neighborhood.location.lat, neighborhood.location.lng]}
            zoom={14}
            markers={[
              {
                position: [neighborhood.location.lat, neighborhood.location.lng],
                title: neighborhood.name
              }
            ]}
          />
        </div>
      </div>

      {/* Properties in this neighborhood */}
      {neighborhoodProperties.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Properties in {neighborhood.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoodProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
