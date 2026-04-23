import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PriceBreakdown {
    amenityBonus: number;
    floorBonus: number;
    locationMultiplier: number;
    basePrice: number;
    ageDiscount: number;
}
export interface PredictionInput {
    bhk: bigint;
    floor: bigint;
    totalFloors: bigint;
    propertyType: string;
    area: number;
    city: string;
    houseAge: bigint;
    bathrooms: bigint;
    furnishing: string;
    parking: boolean;
    location: string;
}
export interface PredictionResult {
    estimatedPrice: number;
    breakdown: PriceBreakdown;
    pricePerSqft: number;
    confidence: string;
}
export interface PredictionRecord {
    result: PredictionResult;
    timestamp: bigint;
    input: PredictionInput;
}
export interface backendInterface {
    getPredictionStats(): Promise<bigint>;
    getRecentPredictions(): Promise<Array<PredictionRecord>>;
    predictPrice(input: PredictionInput): Promise<PredictionResult>;
}
