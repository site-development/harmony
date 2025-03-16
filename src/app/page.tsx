import Image from "next/image";
import Link from "next/link";
import { properties } from "@/data/properties";
import { neighborhoods } from "@/data/neighborhoods";
import { ArrowRight, Home, Map, Search, Users } from "lucide-react";
import { PropertyCardList } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  // Get featured properties (first 3)
  const featuredProperties = properties.slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://web-assets.same.dev/3932108541/2364874334.jpeg"
            alt="Luxury home exterior"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
            Discover luxury properties in the most desirable locations
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
              <Link href="/properties">View Properties</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
            <p className="text-muted-foreground">
              Explore our handpicked selection of premium properties
            </p>
          </div>
          <Link
            href="/properties"
            className="flex items-center text-sm font-medium hover:underline"
          >
            View all properties <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <PropertyCardList properties={featuredProperties} />
      </section>

      {/* Neighborhoods */}
      <section className="bg-muted py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Explore Neighborhoods</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the unique character of each neighborhood to find the perfect location for your next home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {neighborhoods.map((neighborhood) => (
              <Link
                key={neighborhood.id}
                href={`/neighborhoods/${neighborhood.slug}`}
                className="group block overflow-hidden rounded-xl bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-[16/10] relative">
                  <Image
                    src={neighborhood.imageUrl}
                    alt={neighborhood.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{neighborhood.name}</h3>
                  <p className="text-muted-foreground line-clamp-2 mb-4">
                    {neighborhood.description}
                  </p>
                  <span className="text-sm font-medium text-accent group-hover:underline">
                    Explore neighborhood
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">Why Choose Harmony Real Estate</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a premium experience with advanced tools to help you find your perfect home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="bg-accent/10 text-accent rounded-full p-4 inline-flex mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
            <p className="text-muted-foreground">
              Find your ideal property with our powerful search tools and filters.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-accent/10 text-accent rounded-full p-4 inline-flex mb-4">
              <Home className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Property Comparison</h3>
            <p className="text-muted-foreground">
              Compare multiple properties side by side to make informed decisions.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-accent/10 text-accent rounded-full p-4 inline-flex mb-4">
              <Map className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Neighborhood Guides</h3>
            <p className="text-muted-foreground">
              Detailed information about neighborhoods to help you choose the best location.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-accent/10 text-accent rounded-full p-4 inline-flex mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Agents</h3>
            <p className="text-muted-foreground">
              Our agents provide personalized support throughout the buying process.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your search today and let us help you find the perfect property.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
