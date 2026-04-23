import { cityBasePrices, locationPremiums } from "@/data/cityLocations";
import type {
  PredictionInput,
  PredictionRecord,
  PredictionResult,
} from "@/types/prediction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const STORAGE_KEY = "gujarat_predictions";

function calculatePrice(input: PredictionInput): PredictionResult {
  const basePerSqft = cityBasePrices[input.city] ?? 4000;

  // Location premium
  const cityPremiums = locationPremiums[input.city] ?? {};
  const locPremiumRate = cityPremiums[input.location] ?? 0.05;

  // Property type multiplier
  const typeMultipliers: Record<string, number> = {
    Villa: 1.45,
    Bungalow: 1.35,
    Apartment: 1.0,
    Flat: 0.95,
  };
  const typeMultiplier = typeMultipliers[input.propertyType] ?? 1.0;

  // Furnishing value
  const furnishingValues: Record<string, number> = {
    Furnished: 0.12,
    "Semi-Furnished": 0.06,
    Unfurnished: 0,
  };
  const furnishingRate = furnishingValues[input.furnishing] ?? 0;

  // Floor premium (higher floors = slight premium, ground floor = slight discount)
  const floorRatio =
    input.totalFloors > 0 ? input.floor / input.totalFloors : 0;
  const floorPremiumRate =
    floorRatio > 0.6 ? 0.08 : floorRatio < 0.1 ? -0.03 : 0.02;

  // Age discount (depreciate 0.8% per year up to 25%)
  const agingDiscountRate = Math.min(input.houseAge * 0.008, 0.25);

  // Parking value
  const parkingBonus = input.parking ? 0.04 : 0;

  // BHK / bathroom premium scaling
  const bhkMultiplier = 1 + (input.bhk - 1) * 0.04;
  const bathroomMultiplier = 1 + (input.bathrooms - 1) * 0.02;

  const effectiveBasePerSqft =
    basePerSqft * typeMultiplier * bhkMultiplier * bathroomMultiplier;

  const basePrice = effectiveBasePerSqft * input.area;
  const locationPremium = basePrice * locPremiumRate;
  const amenityValue = basePrice * parkingBonus;
  const floorPremium = basePrice * floorPremiumRate;
  const furnishingValue = basePrice * furnishingRate;
  const agingDiscount = -(basePrice * agingDiscountRate);

  const estimatedPrice =
    basePrice +
    locationPremium +
    amenityValue +
    floorPremium +
    furnishingValue +
    agingDiscount;

  const pricePerSqft = estimatedPrice / input.area;

  // Confidence based on data completeness
  const confidence =
    input.area > 0 && input.bhk > 0 && input.city && input.location
      ? locPremiumRate > 0.1
        ? "High"
        : "Medium"
      : "Low";

  return {
    estimatedPrice: Math.round(estimatedPrice),
    pricePerSqft: Math.round(pricePerSqft),
    confidence,
    breakdown: {
      basePrice: Math.round(basePrice),
      locationPremium: Math.round(locationPremium),
      amenityValue: Math.round(amenityValue),
      floorPremium: Math.round(floorPremium),
      furnishingValue: Math.round(furnishingValue),
      agingDiscount: Math.round(agingDiscount),
    },
  };
}

function loadStoredPredictions(): PredictionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PredictionRecord[]) : [];
  } catch {
    return [];
  }
}

function storePrediction(record: PredictionRecord): void {
  const existing = loadStoredPredictions();
  const updated = [record, ...existing].slice(0, 20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function usePredictPrice() {
  const queryClient = useQueryClient();

  return useMutation<PredictionResult, Error, PredictionInput>({
    mutationFn: async (input: PredictionInput) => {
      // Simulate a brief async call
      await new Promise((r) => setTimeout(r, 900));
      return calculatePrice(input);
    },
    onSuccess: (result, input) => {
      const record: PredictionRecord = {
        input,
        result,
        timestamp: Date.now(),
      };
      storePrediction(record);
      void queryClient.invalidateQueries({ queryKey: ["recentPredictions"] });
      void queryClient.invalidateQueries({ queryKey: ["predictionStats"] });
    },
  });
}

export function useRecentPredictions() {
  return useQuery<PredictionRecord[]>({
    queryKey: ["recentPredictions"],
    queryFn: () => loadStoredPredictions(),
    staleTime: 0,
  });
}

export function usePredictionStats() {
  return useQuery<number>({
    queryKey: ["predictionStats"],
    queryFn: () => loadStoredPredictions().length,
    staleTime: 0,
  });
}
