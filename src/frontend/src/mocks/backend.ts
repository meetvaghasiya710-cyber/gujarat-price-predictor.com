import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  getPredictionStats: async () => BigInt(142),
  getRecentPredictions: async () => [
    {
      result: {
        estimatedPrice: 7500000,
        breakdown: {
          amenityBonus: 300000,
          floorBonus: 150000,
          locationMultiplier: 1.2,
          basePrice: 6500000,
          ageDiscount: 450000,
        },
        pricePerSqft: 5000,
        confidence: "High",
      },
      timestamp: BigInt(1714000000000000000),
      input: {
        bhk: BigInt(3),
        floor: BigInt(5),
        totalFloors: BigInt(12),
        propertyType: "Apartment",
        area: 1500,
        city: "Ahmedabad",
        houseAge: BigInt(3),
        bathrooms: BigInt(2),
        furnishing: "Semi-Furnished",
        parking: true,
        location: "Prahlad Nagar",
      },
    },
    {
      result: {
        estimatedPrice: 12000000,
        breakdown: {
          amenityBonus: 600000,
          floorBonus: 0,
          locationMultiplier: 1.4,
          basePrice: 10000000,
          ageDiscount: 1000000,
        },
        pricePerSqft: 5500,
        confidence: "High",
      },
      timestamp: BigInt(1714000001000000000),
      input: {
        bhk: BigInt(4),
        floor: BigInt(0),
        totalFloors: BigInt(2),
        propertyType: "Bungalow",
        area: 2200,
        city: "Surat",
        houseAge: BigInt(2),
        bathrooms: BigInt(4),
        furnishing: "Furnished",
        parking: true,
        location: "Vesu",
      },
    },
  ],
  predictPrice: async (input) => ({
    estimatedPrice: 9500000,
    breakdown: {
      amenityBonus: 400000,
      floorBonus: 200000,
      locationMultiplier: 1.3,
      basePrice: 8000000,
      ageDiscount: 500000,
    },
    pricePerSqft: 5200,
    confidence: "High",
  }),
};
