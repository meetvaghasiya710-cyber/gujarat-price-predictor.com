import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cityLocations, gujaratCities } from "@/data/cityLocations";
import { usePredictPrice } from "@/hooks/usePricePrediction";
import { cn } from "@/lib/utils";
import type { PredictionInput } from "@/types/prediction";
import {
  AlertCircle,
  Bath,
  BedDouble,
  Building,
  Building2,
  Car,
  ChevronDown,
  Clock,
  Home,
  Loader2,
  MapPin,
  Maximize2,
  Navigation,
  Sofa,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ResultCard } from "./ResultCard";

const DEFAULT_FORM: PredictionInput = {
  area: 0,
  bhk: 2,
  bathrooms: 2,
  houseAge: 0,
  floor: 2,
  totalFloors: 10,
  city: "",
  location: "",
  propertyType: "Apartment",
  furnishing: "Semi-Furnished",
  parking: true,
};

const propertyTypes = ["Flat", "Apartment", "Bungalow", "Villa"];
const furnishingTypes = ["Furnished", "Semi-Furnished", "Unfurnished"];

interface SelectFieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  placeholder?: string;
  "data-ocid"?: string;
  disabled?: boolean;
}

function SelectField({
  label,
  icon,
  value,
  options,
  onChange,
  placeholder = "Select...",
  "data-ocid": ocid,
  disabled,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <span className="text-accent opacity-80">{icon}</span>
        {label}
      </Label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          data-ocid={ocid}
          className={cn(
            "w-full h-11 pl-3 pr-8 rounded-xl border border-input bg-input text-sm",
            "appearance-none cursor-pointer transition-smooth",
            "hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
            "disabled:opacity-40 disabled:cursor-not-allowed",
          )}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-card text-foreground">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

interface NumericFieldProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  "data-ocid"?: string;
}

function NumericField({
  label,
  icon,
  value,
  onChange,
  min = 0,
  max,
  placeholder,
  "data-ocid": ocid,
}: NumericFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <span className="text-accent opacity-80">{icon}</span>
        {label}
      </Label>
      <Input
        type="number"
        value={value === 0 ? "" : value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        placeholder={placeholder}
        data-ocid={ocid}
        className="h-11 rounded-xl bg-input border-input hover:border-accent/50 focus:border-accent focus:ring-accent/30 transition-smooth"
      />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px flex-1 bg-border" />
      <span className="font-display font-semibold text-xs text-accent uppercase tracking-widest whitespace-nowrap">
        {children}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export function PredictionForm() {
  const [form, setForm] = useState<PredictionInput>(DEFAULT_FORM);
  const [otherLocation, setOtherLocation] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof PredictionInput | "otherLocation", string>>
  >({});
  const {
    mutate: predict,
    data: result,
    isPending,
    isError,
    reset,
  } = usePredictPrice();

  const availableLocations = form.city ? (cityLocations[form.city] ?? []) : [];

  useEffect(() => {
    if (form.city) {
      setForm((f) => ({ ...f, location: "" }));
      setOtherLocation("");
    }
  }, [form.city]);

  function update<K extends keyof PredictionInput>(
    key: K,
    value: PredictionInput[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof PredictionInput | "otherLocation", string>> =
      {};
    if (!form.area || form.area <= 0) e.area = "Area must be greater than 0";
    if (!form.bhk || form.bhk <= 0) e.bhk = "Enter a valid BHK (min 1)";
    if (!form.bathrooms || form.bathrooms <= 0)
      e.bathrooms = "Enter valid bathrooms";
    if (!form.city) e.city = "Please select a city";
    if (!form.location && !otherLocation)
      e.location = "Select a location or enter a custom one";
    if (!form.propertyType) e.propertyType = "Select property type";
    if (!form.furnishing) e.furnishing = "Select furnishing status";
    if (form.totalFloors > 0 && form.floor > form.totalFloors)
      e.floor = "Floor cannot exceed total floors";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    reset();
    if (!validate()) return;
    const finalForm = { ...form };
    if (!finalForm.location && otherLocation) {
      finalForm.location = otherLocation;
    }
    predict(finalForm);
  }

  return (
    <section id="predict" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 text-xs uppercase tracking-widest">
            Price Estimator
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">
            Estimate Your Property Price
          </h2>
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Fill in the details below to receive an instant, data-driven price
            estimate for your Gujarat property.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl shadow-elevated p-6 md:p-10"
            data-ocid="prediction.form"
          >
            {/* Property Specs */}
            <SectionTitle>Property Specifications</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
              <div className="sm:col-span-2 md:col-span-1">
                <NumericField
                  label="Area (sq ft)"
                  icon={<Maximize2 className="size-3.5" />}
                  value={form.area}
                  onChange={(v) => update("area", v)}
                  placeholder="e.g. 1200"
                  min={100}
                  data-ocid="prediction.area_input"
                />
                {errors.area && (
                  <p
                    className="text-xs text-destructive mt-1.5 flex items-center gap-1"
                    data-ocid="prediction.area_field_error"
                  >
                    <AlertCircle className="size-3 shrink-0" />
                    {errors.area}
                  </p>
                )}
              </div>

              <div>
                <NumericField
                  label="BHK"
                  icon={<BedDouble className="size-3.5" />}
                  value={form.bhk}
                  onChange={(v) => update("bhk", v)}
                  placeholder="e.g. 2"
                  min={1}
                  max={10}
                  data-ocid="prediction.bhk_input"
                />
                {errors.bhk && (
                  <p
                    className="text-xs text-destructive mt-1.5"
                    data-ocid="prediction.bhk_field_error"
                  >
                    {errors.bhk}
                  </p>
                )}
              </div>

              <div>
                <NumericField
                  label="Bathrooms"
                  icon={<Bath className="size-3.5" />}
                  value={form.bathrooms}
                  onChange={(v) => update("bathrooms", v)}
                  placeholder="e.g. 2"
                  min={1}
                  max={10}
                  data-ocid="prediction.bathrooms_input"
                />
                {errors.bathrooms && (
                  <p
                    className="text-xs text-destructive mt-1.5"
                    data-ocid="prediction.bathrooms_field_error"
                  >
                    {errors.bathrooms}
                  </p>
                )}
              </div>

              <div>
                <NumericField
                  label="House Age (yrs)"
                  icon={<Clock className="size-3.5" />}
                  value={form.houseAge}
                  onChange={(v) => update("houseAge", v)}
                  placeholder="e.g. 5"
                  min={0}
                  max={100}
                  data-ocid="prediction.house_age_input"
                />
              </div>

              <div>
                <NumericField
                  label="Floor Number"
                  icon={<Building2 className="size-3.5" />}
                  value={form.floor}
                  onChange={(v) => update("floor", v)}
                  placeholder="e.g. 3"
                  min={0}
                  data-ocid="prediction.floor_input"
                />
                {errors.floor && (
                  <p
                    className="text-xs text-destructive mt-1.5"
                    data-ocid="prediction.floor_field_error"
                  >
                    {errors.floor}
                  </p>
                )}
              </div>

              <div>
                <NumericField
                  label="Total Floors"
                  icon={<Building className="size-3.5" />}
                  value={form.totalFloors}
                  onChange={(v) => update("totalFloors", v)}
                  placeholder="e.g. 15"
                  min={1}
                  data-ocid="prediction.total_floors_input"
                />
              </div>
            </div>

            {/* Location & Type */}
            <SectionTitle>Location &amp; Property Type</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <SelectField
                  label="City"
                  icon={<MapPin className="size-3.5" />}
                  value={form.city}
                  options={gujaratCities}
                  onChange={(v) => update("city", v)}
                  placeholder="Select city..."
                  data-ocid="prediction.city_select"
                />
                {errors.city && (
                  <p
                    className="text-xs text-destructive mt-1.5 flex items-center gap-1"
                    data-ocid="prediction.city_field_error"
                  >
                    <AlertCircle className="size-3 shrink-0" />
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <SelectField
                  label="Location / Area"
                  icon={<Navigation className="size-3.5" />}
                  value={form.location}
                  options={availableLocations}
                  onChange={(v) => update("location", v)}
                  placeholder={
                    form.city ? "Select location..." : "Choose city first"
                  }
                  disabled={!form.city}
                  data-ocid="prediction.location_select"
                />
                {errors.location && (
                  <p
                    className="text-xs text-destructive mt-1.5 flex items-center gap-1"
                    data-ocid="prediction.location_field_error"
                  >
                    <AlertCircle className="size-3 shrink-0" />
                    {errors.location}
                  </p>
                )}
                {/* Other Location */}
                {form.city && (
                  <div className="mt-2.5 flex flex-col gap-1.5">
                    <Label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
                      Other Location (optional)
                    </Label>
                    <Input
                      type="text"
                      placeholder="Type your locality..."
                      value={otherLocation}
                      onChange={(e) => {
                        setOtherLocation(e.target.value);
                        if (e.target.value) update("location", "");
                      }}
                      data-ocid="prediction.other_location_input"
                      className="h-11 rounded-xl bg-input border-input hover:border-accent/50 focus:border-accent focus:ring-accent/30 transition-smooth"
                    />
                  </div>
                )}
              </div>

              <div>
                <SelectField
                  label="Property Type"
                  icon={<Home className="size-3.5" />}
                  value={form.propertyType}
                  options={propertyTypes}
                  onChange={(v) => update("propertyType", v)}
                  data-ocid="prediction.property_type_select"
                />
                {errors.propertyType && (
                  <p
                    className="text-xs text-destructive mt-1.5"
                    data-ocid="prediction.property_type_field_error"
                  >
                    {errors.propertyType}
                  </p>
                )}
              </div>

              <div>
                <SelectField
                  label="Furnishing Status"
                  icon={<Sofa className="size-3.5" />}
                  value={form.furnishing}
                  options={furnishingTypes}
                  onChange={(v) => update("furnishing", v)}
                  data-ocid="prediction.furnishing_select"
                />
                {errors.furnishing && (
                  <p
                    className="text-xs text-destructive mt-1.5"
                    data-ocid="prediction.furnishing_field_error"
                  >
                    {errors.furnishing}
                  </p>
                )}
              </div>
            </div>

            {/* Parking */}
            <div className="mb-8">
              <Label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <span className="text-accent opacity-80">
                  <Car className="size-3.5" />
                </span>
                Parking Availability
              </Label>
              <div className="flex gap-3">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => update("parking", val)}
                    data-ocid={`prediction.parking_${val ? "yes" : "no"}_toggle`}
                    className={cn(
                      "flex-1 py-3 rounded-xl border text-sm font-display font-semibold transition-smooth",
                      form.parking === val
                        ? "bg-accent/20 border-accent text-accent shadow-glow-accent"
                        : "bg-background border-border text-muted-foreground hover:border-accent/40 hover:text-foreground",
                    )}
                  >
                    {val ? "✓ Parking Included" : "✗ No Parking"}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="prediction.submit_button"
              className="w-full h-14 gradient-accent text-accent-foreground font-display font-bold text-lg rounded-xl shadow-glow-accent hover:opacity-90 transition-smooth disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  Calculating Price...
                </>
              ) : (
                <>
                  <TrendingUp className="size-5 mr-2" />
                  Predict Price →
                </>
              )}
            </Button>

            {isError && (
              <div
                data-ocid="prediction.error_state"
                className="mt-4 flex items-center gap-2 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm"
              >
                <AlertCircle className="size-4 shrink-0" />
                Something went wrong. Please check your inputs and try again.
              </div>
            )}
          </form>

          {/* Loading Skeleton */}
          {isPending && (
            <div
              data-ocid="prediction.loading_state"
              className="mt-6 bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              <div className="skeleton-shimmer h-5 w-40 rounded-md mb-3" />
              <div className="skeleton-shimmer h-14 w-60 rounded-lg mb-2" />
              <div className="skeleton-shimmer h-4 w-32 rounded-md mb-8" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
                  <div key={k} className="skeleton-shimmer h-20 rounded-xl" />
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {result && !isPending && (
            <ResultCard result={result} area={form.area} />
          )}
        </div>
      </div>
    </section>
  );
}
