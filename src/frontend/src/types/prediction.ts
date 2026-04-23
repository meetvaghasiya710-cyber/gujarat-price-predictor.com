export interface PredictionInput {
  area: number;
  bhk: number;
  bathrooms: number;
  houseAge: number;
  floor: number;
  totalFloors: number;
  city: string;
  location: string;
  propertyType: string;
  furnishing: string;
  parking: boolean;
}

export interface PriceBreakdown {
  basePrice: number;
  locationPremium: number;
  amenityValue: number;
  floorPremium: number;
  furnishingValue: number;
  agingDiscount: number;
}

export interface PredictionResult {
  estimatedPrice: number;
  pricePerSqft: number;
  confidence: string;
  breakdown: PriceBreakdown;
}

export interface PredictionRecord {
  input: PredictionInput;
  result: PredictionResult;
  timestamp: number;
}

export type PropertyType = "Flat" | "Apartment" | "Bungalow" | "Villa";
export type Furnishing = "Furnished" | "Semi-Furnished" | "Unfurnished";
