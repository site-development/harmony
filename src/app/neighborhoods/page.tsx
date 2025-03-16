import { neighborhoods } from "@/data/neighborhoods";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function NeighborhoodsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Explore Our Neighborhoods
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Discover the unique character of each neighborhood to find the perfect location for your next home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {neighborhoods.map((neighborhood) => (
          <Link
            key={neighborhood.id}
            href={`/neighborhoods/${neighborhood.slug}`}
            className="group block overflow-hidden rounded-xl hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-[16/10] relative">
              <Image
                src={neighborhood.imageUrl}
                alt={neighborhood.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <div className="flex items-center text-white mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <h3 className="text-xl font-medium">{neighborhood.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {neighborhood.properties.length > 0 && (
                    <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm">
                      {neighborhood.properties.length} Properties
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground line-clamp-2">
                {neighborhood.description}
              </p>

              <div className="mt-4">
                <span className="text-sm font-medium text-accent group-hover:underline">
                  Explore {neighborhood.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
