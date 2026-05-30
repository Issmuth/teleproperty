export type SearchFilterOption = {
  key: string;
  label: string;
};

export type SearchFilterSelectField = {
  id: string;
  label: string;
  value: string;
  options: readonly SearchFilterOption[];
};

export type SearchFilterSection =
  | {
      kind: "segmented";
      id: string;
      label: string;
      options: readonly SearchFilterOption[];
      selectedKey: string;
    }
  | {
      kind: "dual-select";
      id: string;
      fields: readonly [SearchFilterSelectField, SearchFilterSelectField];
    }
  | {
      kind: "range";
      id: string;
      label: string;
      minLabel: string;
      maxLabel: string;
      quickOptions: readonly SearchFilterOption[];
      selectedKey: string;
    }
  | {
      kind: "chips";
      id: string;
      label: string;
      options: readonly SearchFilterOption[];
      selectedKeys: readonly string[];
      multiSelect?: boolean;
    }
  | {
      kind: "toggle";
      id: string;
      label: string;
      description: string;
      value: boolean;
    };

export type SearchFiltersConfig = {
  title: string;
  subtitle?: string;
  leadingIcon?: "filters";
  sections: readonly SearchFilterSection[];
};

const listingTypeOptions = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
] as const;

const cityOptions = [
  { key: "all-cities", label: "All Cities" },
  { key: "addis-ababa", label: "Addis Ababa" },
  { key: "adama", label: "Adama" },
  { key: "hawassa", label: "Hawassa" },
  { key: "bahir-dar", label: "Bahir Dar" },
] as const;

const propertyTypeOptions = [
  { key: "all-types", label: "All Types" },
  { key: "apartment", label: "Apartment" },
  { key: "house", label: "House" },
  { key: "villa", label: "Villa" },
  { key: "land", label: "Land" },
] as const;

const priceRangeOptions = [
  { key: "lt-1m", label: "< 1M" },
  { key: "1m-3m", label: "1M-3M" },
  { key: "3m-8m", label: "3M-8M" },
  { key: "8m-plus", label: "8M+" },
  { key: "lt-20k", label: "< 20K/mo" },
] as const;

const bedroomOptions = [
  { key: "any", label: "Any" },
  { key: "studio", label: "Studio" },
  { key: "1", label: "1" },
  { key: "2", label: "2" },
  { key: "3", label: "3" },
  { key: "4", label: "4" },
  { key: "5-plus", label: "5+" },
] as const;

const bathroomOptions = [
  { key: "any", label: "Any" },
  { key: "1", label: "1" },
  { key: "2", label: "2" },
  { key: "3", label: "3" },
  { key: "4-plus", label: "4+" },
] as const;

const propertyAgeOptions = [
  { key: "any-age", label: "Any Age" },
  { key: "new", label: "New (0–2 yrs)" },
  { key: "recent", label: "Recent (3–5 yrs)" },
  { key: "mid", label: "5–10 yrs" },
  { key: "older", label: "10–20 yrs" },
  { key: "very-old", label: "20+ yrs" },
] as const;

const amenityOptions = [
  { key: "parking", label: "Parking" },
  { key: "generator", label: "Generator" },
  { key: "elevator", label: "Elevator" },
  { key: "security", label: "24/7 Security" },
  { key: "water-tank", label: "Water Tank" },
  { key: "furnished", label: "Furnished" },
  { key: "balcony", label: "Balcony" },
  { key: "compound", label: "Garden / Compound" },
  { key: "cctv", label: "CCTV" },
  { key: "wifi", label: "WiFi / Fibre" },
  { key: "gym", label: "Gym" },
  { key: "pool", label: "Swimming Pool" },
] as const;

const sortOptions = [
  { key: "newest", label: "Newest" },
  { key: "price-low", label: "Price: Low-High" },
  { key: "price-high", label: "Price: High-Low" },
  { key: "popular", label: "Most Popular" },
] as const;

export const homeSearchFiltersConfig: SearchFiltersConfig = {
  title: "Advanced Filters",
  subtitle:
    "Refine home searches by listing type, location, and property details",
  leadingIcon: "filters",
  sections: [
    // {
    //   kind: "segmented",
    //   id: "listingType",
    //   label: "Listing Type",
    //   options: listingTypeOptions,
    //   selectedKey: "buy",
    // },
    {
      kind: "dual-select",
      id: "locationAndType",
      fields: [
        {
          id: "city",
          label: "City",
          value: "All Cities",
          options: cityOptions,
        },
        {
          id: "propertyType",
          label: "Property Type",
          value: "All Types",
          options: propertyTypeOptions,
        },
      ],
    },
    {
      kind: "range",
      id: "priceRange",
      label: "Price Range (ETB)",
      minLabel: "Min 0",
      maxLabel: "Max Any",
      quickOptions: priceRangeOptions,
      selectedKey: "1m-3m",
    },
    {
      kind: "chips",
      id: "bedrooms",
      label: "Bedrooms",
      options: bedroomOptions,
      selectedKeys: ["any"],
    },
    {
      kind: "chips",
      id: "bathrooms",
      label: "Bathrooms",
      options: bathroomOptions,
      selectedKeys: ["any"],
    },
    {
      kind: "chips",
      id: "propertyAge",
      label: "Property Age",
      options: propertyAgeOptions,
      selectedKeys: ["any-age"],
    },
    {
      kind: "chips",
      id: "amenities",
      label: "Amenities",
      options: amenityOptions,
      selectedKeys: ["parking", "elevator", "furnished"],
      multiSelect: true,
    },
  ],
};

export const propertySearchFiltersConfig: SearchFiltersConfig = {
  title: "Advanced Filters",
  subtitle: "Refine property listings and sort by what matters most",
  leadingIcon: "filters",
  sections: [
    {
      kind: "dual-select",
      id: "locationAndType",
      fields: [
        {
          id: "city",
          label: "City",
          value: "All Cities",
          options: cityOptions,
        },
        {
          id: "propertyType",
          label: "Property Type",
          value: "All Types",
          options: propertyTypeOptions,
        },
      ],
    },
    {
      kind: "range",
      id: "priceRange",
      label: "Price Range (ETB)",
      minLabel: "Min 0",
      maxLabel: "Max Any",
      quickOptions: priceRangeOptions,
      selectedKey: "1m-3m",
    },
    {
      kind: "chips",
      id: "bedrooms",
      label: "Bedrooms",
      options: bedroomOptions,
      selectedKeys: ["any"],
    },
    {
      kind: "chips",
      id: "bathrooms",
      label: "Bathrooms",
      options: bathroomOptions,
      selectedKeys: ["any"],
    },
    {
      kind: "chips",
      id: "propertyAge",
      label: "Property Age",
      options: propertyAgeOptions,
      selectedKeys: ["any-age"],
    },
    {
      kind: "chips",
      id: "amenities",
      label: "Amenities",
      options: amenityOptions,
      selectedKeys: ["parking", "generator", "elevator"],
      multiSelect: true,
    },
    {
      kind: "toggle",
      id: "verifiedOnly",
      label: "Verified Listings Only",
      description: "Show only TeleProperty verified properties",
      value: true,
    },
    {
      kind: "chips",
      id: "sortBy",
      label: "Sort By",
      options: sortOptions,
      selectedKeys: ["newest"],
    },
  ],
};

export const projectsSearchFiltersConfig: SearchFiltersConfig = {
  title: "Project Filters",
  subtitle: "Filter by city, project status, and verified developers",
  leadingIcon: "filters",
  sections: [
    {
      kind: "dual-select",
      id: "cityAndDeveloper",
      fields: [
        {
          id: "city",
          label: "City",
          value: "All Cities",
          options: cityOptions,
        },
        {
          id: "developer",
          label: "Developer",
          value: "All Developers",
          options: [
            { key: "all-developers", label: "All Developers" },
            { key: "capital-real-estate", label: "Capital Real Estate" },
            { key: "sunshine-developers", label: "Sunshine Developers PLC" },
            { key: "modern-developments", label: "Modern Developments Ltd" },
            { key: "blue-horizon", label: "Blue Horizon Homes" },
          ],
        },
      ],
    },
    {
      kind: "segmented",
      id: "projectStatus",
      label: "Status",
      options: [
        { key: "all", label: "All" },
        { key: "off-plan", label: "Off-plan" },
        { key: "u-c", label: "U/C" },
        { key: "ready", label: "Ready" },
      ],
      selectedKey: "all",
    },
    {
      kind: "toggle",
      id: "verifiedDevelopersOnly",
      label: "Verified Developers Only",
      description: "Show only developers verified by TeleProperty",
      value: true,
    },
  ],
};
