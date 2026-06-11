export type AgentProfile = {
  id: string;
  name: string;
  type: "agent" | "broker" | "developer";
  avatar?: string;
  rating: string;
  totalReviews: number;
  activeListings: number;
  soldProperties: number;
  yearsExperience: number;
  bio: string;
  specialties: string[];
  phoneNumber: string;
  email: string;
  verified: boolean;
  responseRate: string;
  responseTime: string;
  languages: string[];
};

export const sampleAgents: Record<string, AgentProfile> = {
  "agent-1": {
    id: "agent-1",
    name: "Abel Tesfaye",
    type: "broker",
    rating: "4.8",
    totalReviews: 124,
    activeListings: 28,
    soldProperties: 156,
    yearsExperience: 8,
    bio: "Experienced real estate broker specializing in luxury properties in Bole and surrounding areas. Committed to providing exceptional service and finding the perfect property for every client.",
    specialties: ["Luxury Homes", "Apartments", "Commercial Properties"],
    phoneNumber: "+251 911 234 567",
    email: "abel.tesfaye@example.com",
    verified: true,
    responseRate: "98%",
    responseTime: "Within 1 hour",
    languages: ["English", "Amharic", "Tigrinya"],
  },
  "agent-sarah": {
    id: "agent-sarah",
    name: "Sarah Bekele",
    type: "broker",
    rating: "4.9",
    totalReviews: 187,
    activeListings: 32,
    soldProperties: 250,
    yearsExperience: 8,
    bio: "Top-performing broker with a passion for helping families find their dream homes. Specializing in residential properties across Addis Ababa with a focus on customer satisfaction and long-term relationships.",
    specialties: ["Residential Properties", "Family Homes", "Investment Properties"],
    phoneNumber: "+251 911 345 678",
    email: "sarah.bekele@example.com",
    verified: true,
    responseRate: "99%",
    responseTime: "Within 30 minutes",
    languages: ["English", "Amharic"],
  },
  "agent-michael": {
    id: "agent-michael",
    name: "Michael Tadesse",
    type: "broker",
    rating: "4.8",
    totalReviews: 142,
    activeListings: 25,
    soldProperties: 180,
    yearsExperience: 5,
    bio: "Young and dynamic broker with deep market knowledge and modern approach to real estate. Focused on helping first-time buyers and investors navigate the property market with confidence.",
    specialties: ["First-Time Buyers", "Apartments", "Market Analysis"],
    phoneNumber: "+251 911 456 789",
    email: "michael.tadesse@example.com",
    verified: true,
    responseRate: "97%",
    responseTime: "Within 1 hour",
    languages: ["English", "Amharic", "Oromifa"],
  },
  "agent-daniel": {
    id: "agent-daniel",
    name: "Daniel Alemu",
    type: "broker",
    rating: "5.0",
    totalReviews: 203,
    activeListings: 45,
    soldProperties: 400,
    yearsExperience: 12,
    bio: "Veteran real estate professional with over a decade of experience in the Ethiopian property market. Known for exceptional negotiation skills and comprehensive market insights across all property types.",
    specialties: ["Luxury Properties", "Commercial Real Estate", "Investment Advisory"],
    phoneNumber: "+251 911 567 890",
    email: "daniel.alemu@example.com",
    verified: true,
    responseRate: "100%",
    responseTime: "Within 30 minutes",
    languages: ["English", "Amharic", "Tigrinya", "Oromifa"],
  },
  "dev-1": {
    id: "dev-1",
    name: "Sunshine Developers PLC",
    type: "developer",
    rating: "4.9",
    totalReviews: 89,
    activeListings: 12,
    soldProperties: 450,
    yearsExperience: 15,
    bio: "Leading real estate developer in Addis Ababa with a track record of delivering high-quality residential and commercial projects. We build communities, not just buildings.",
    specialties: ["Residential Projects", "Commercial Developments", "Off-Plan Sales"],
    phoneNumber: "+251 115 234 567",
    email: "info@sunshinedevelopers.et",
    verified: true,
    responseRate: "95%",
    responseTime: "Within 2 hours",
    languages: ["English", "Amharic"],
  },
};
