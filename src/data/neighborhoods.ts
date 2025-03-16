export interface Neighborhood {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  properties: number[]; // IDs of properties in this neighborhood
}

export const neighborhoods: Neighborhood[] = [
  {
    id: 1,
    name: "Downtown",
    slug: "downtown",
    description: "Urban living at its finest with walkable streets, trendy restaurants, and vibrant nightlife.",
    imageUrl: "https://web-assets.same.dev/767928406/3393756900.jpeg",
    location: {
      lat: 39.7392,
      lng: -104.9903
    },
    highlights: [
      "Walkable urban environment",
      "Vibrant arts and culture scene",
      "Premium dining and shopping",
      "Excellent public transportation"
    ],
    properties: [1, 5]
  },
  {
    id: 2,
    name: "Cherry Creek",
    slug: "cherry-creek",
    description: "Upscale neighborhood featuring luxury homes, high-end shopping, and beautiful parks.",
    imageUrl: "https://web-assets.same.dev/767590216/3900071358.jpeg",
    location: {
      lat: 39.7181,
      lng: -104.9522
    },
    highlights: [
      "Luxury homes and condominiums",
      "Premier shopping district",
      "Fine dining restaurants",
      "Beautiful public spaces and recreation"
    ],
    properties: [2, 4]
  },
  {
    id: 3,
    name: "Highland",
    slug: "highland",
    description: "Historic district with charming Victorian homes, trendy eateries, and boutique shops.",
    imageUrl: "https://web-assets.same.dev/1072060437/4214051532.jpeg",
    location: {
      lat: 39.7627,
      lng: -105.0142
    },
    highlights: [
      "Historic architecture",
      "Family-friendly atmosphere",
      "Trendy restaurant scene",
      "Park access with city views"
    ],
    properties: [3, 6]
  }
];
