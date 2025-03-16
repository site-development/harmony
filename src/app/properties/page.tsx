"use client";

import { useState } from "react";
import { properties } from "@/data/properties";
import { PropertyCardList } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bed, Bath, DollarSign, MapPin, Search, SlidersHorizontal } from "lucide-react";

export default function PropertiesPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    minBaths: "",
    location: ""
  });

  // Filter properties based on search params
  const filteredProperties = properties.filter(property => {
    const matchesSearch = searchParams.search
      ? property.title.toLowerCase().includes(searchParams.search.toLowerCase()) ||
        property.description.toLowerCase().includes(searchParams.search.toLowerCase()) ||
        property.location.toLowerCase().includes(searchParams.search.toLowerCase())
      : true;

    const matchesMinPrice = searchParams.minPrice
      ? parseFloat(property.price.replace(/,/g, "")) >= parseFloat(searchParams.minPrice)
      : true;

    const matchesMaxPrice = searchParams.maxPrice
      ? parseFloat(property.price.replace(/,/g, "")) <= parseFloat(searchParams.maxPrice)
      : true;

    const matchesMinBeds = searchParams.minBeds
      ? property.beds >= parseInt(searchParams.minBeds)
      : true;

    const matchesMaxBeds = searchParams.maxBeds
      ? property.beds <= parseInt(searchParams.maxBeds)
      : true;

    const matchesMinBaths = searchParams.minBaths
      ? property.baths >= parseInt(searchParams.minBaths)
      : true;

    const matchesLocation = searchParams.location
      ? property.location.toLowerCase().includes(searchParams.location.toLowerCase())
      : true;

    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesMinBeds &&
           matchesMaxBeds && matchesMinBaths && matchesLocation;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setSearchParams({
      search: "",
      minPrice: "",
      maxPrice: "",
      minBeds: "",
      maxBeds: "",
      minBaths: "",
      location: ""
    });
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Properties</h1>
        <p className="text-muted-foreground max-w-3xl">
          Browse our comprehensive selection of properties to find your perfect home. Use the filters to narrow down your search.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              name="search"
              value={searchParams.search}
              onChange={handleInputChange}
              placeholder="Search properties..."
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto w-full"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {showFilters && (
          <div className="bg-muted p-6 rounded-lg mb-6">
            <h2 className="text-lg font-medium mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium flex items-center mb-2">
                  <DollarSign className="h-4 w-4 mr-1" /> Price Range
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    name="minPrice"
                    value={searchParams.minPrice}
                    onChange={handleInputChange}
                    placeholder="Min"
                    type="number"
                    min="0"
                  />
                  <span>-</span>
                  <Input
                    name="maxPrice"
                    value={searchParams.maxPrice}
                    onChange={handleInputChange}
                    placeholder="Max"
                    type="number"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center mb-2">
                  <Bed className="h-4 w-4 mr-1" /> Bedrooms
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    name="minBeds"
                    value={searchParams.minBeds}
                    onChange={handleInputChange}
                    placeholder="Min"
                    type="number"
                    min="0"
                  />
                  <span>-</span>
                  <Input
                    name="maxBeds"
                    value={searchParams.maxBeds}
                    onChange={handleInputChange}
                    placeholder="Max"
                    type="number"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center mb-2">
                  <Bath className="h-4 w-4 mr-1" /> Bathrooms
                </label>
                <Input
                  name="minBaths"
                  value={searchParams.minBaths}
                  onChange={handleInputChange}
                  placeholder="Minimum bathrooms"
                  type="number"
                  min="0"
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-1" /> Location
                </label>
                <Input
                  name="location"
                  value={searchParams.location}
                  onChange={handleInputChange}
                  placeholder="City, neighborhood, address..."
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={handleReset} className="mr-2">
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
          </h2>
        </div>

        {filteredProperties.length > 0 ? (
          <PropertyCardList properties={filteredProperties} />
        ) : (
          <div className="text-center py-16 bg-muted rounded-xl">
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search filters to find more properties.
            </p>
            <Button onClick={handleReset}>Reset Filters</Button>
          </div>
        )}
      </div>
    </main>
  );
}
