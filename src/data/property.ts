export const propertySegments = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
] as const;

export type PropertyItem = {
  id: string;
  title: string;
  location: string;
  age: string;
  price: string;
  beds: number;
  baths: number;
  area: number;
  featured: boolean;
  forSale: boolean;
  verified: boolean;
  image: string;
};

export const sampleProperties: PropertyItem[] = [
  {
    id: "1",
    title: "5BR Executive Villa \u2013 Bole",
    location: "Bole, Addis Ababa",
    age: "New (0-2 yrs)",
    price: "ETB 9,500,000",
    beds: 5,
    baths: 4,
    area: 420,
    featured: true,
    forSale: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Modern 3BR Apartment \u2013 Kazanchis",
    location: "Kazanchis, Addis Ababa",
    age: "Resale",
    price: "ETB 4,200,000",
    beds: 3,
    baths: 2,
    area: 150,
    featured: false,
    forSale: true,
    verified: true,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
];

export type CityItem = {
  id: string;
  name: string;
  icon: string;
  subtext?: string;
};

export const ethiopianCities: CityItem[] = [
  { id: "addis-ababa", name: "Addis Ababa", icon: "🏙️", subtext: "→ Areas" },
  { id: "adama", name: "Adama", icon: "🌍" },
  { id: "hawassa", name: "Hawassa", icon: "🏞️" },
  { id: "bahir-dar", name: "Bahir Dar", icon: "💧" },
  { id: "dire-dawa", name: "Dire Dawa", icon: "🛣️" },
  { id: "mekelle", name: "Mekelle", icon: "⛰️" },
  { id: "jimma", name: "Jimma", icon: "🌾" },
  { id: "gondar", name: "Gondar", icon: "🏰" },
  { id: "bishoftu", name: "Bishoftu", icon: "🌋" },
  { id: "all", name: "Browse All", icon: "🗺️" },
];
