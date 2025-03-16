"use client";

import { useComparison } from "@/contexts/comparison-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { X, Bed, Bath, Square } from "lucide-react";

export default function ComparisonPage() {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();

  // Features to compare
  const features = [
    { label: "Price", render: (property: any) => `$${property.price}` },
    { label: "Location", render: (property: any) => property.location },
    { label: "Bedrooms", render: (property: any) => property.beds, icon: Bed },
    { label: "Bathrooms", render: (property: any) => property.baths, icon: Bath },
    { label: "Square Feet", render: (property: any) => `${property.sqFt} sq ft`, icon: Square },
    { label: "Features",
      render: (property: any) => property.features?.slice(0, 3).map((feature: string, i: number) => (
        <div key={i} className="mb-1">{feature}</div>
      ))
    }
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Property Comparison</h1>
        <p className="text-muted-foreground max-w-2xl">
          Compare properties side by side to find the perfect match for your needs.
        </p>
      </div>

      {comparisonList.length === 0 ? (
        <div className="text-center py-16 bg-muted rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">No properties to compare</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Add properties to your comparison list by clicking the "Compare" button on property cards.
          </p>
          <Button asChild>
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={clearComparison}>
              Clear All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Header with property images */}
              <thead>
                <tr>
                  <th className="w-32 p-4 text-left"></th>
                  {comparisonList.map((property) => (
                    <th key={property.id} className="p-4 text-center min-w-[250px]">
                      <div className="relative">
                        <button
                          onClick={() => removeFromComparison(property.id)}
                          className="absolute top-0 right-0 z-10 bg-white rounded-full p-1 shadow-md"
                          aria-label="Remove from comparison"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="rounded-lg overflow-hidden mb-3 aspect-[4/3] relative">
                          <Image
                            src={property.imageUrl}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-medium">{property.title}</h3>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body with property details */}
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4 font-medium flex items-center">
                      {feature.icon && <feature.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                      {feature.label}
                    </td>
                    {comparisonList.map((property) => (
                      <td key={property.id} className="p-4 text-center">
                        {feature.render(property)}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* View Details Button */}
                <tr className="border-t">
                  <td className="p-4"></td>
                  {comparisonList.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <Button asChild>
                        <Link href={`/properties/${property.slug}`}>
                          View Details
                        </Link>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
