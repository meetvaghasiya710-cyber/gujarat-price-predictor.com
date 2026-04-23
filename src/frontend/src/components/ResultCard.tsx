import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PredictionResult } from "@/types/prediction";
import { IndianRupee, Minus, TrendingDown, TrendingUp } from "lucide-react";

interface ResultCardProps {
  result: PredictionResult;
  area: number;
}

function formatINR(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} Lac`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

interface BreakdownRow {
  label: string;
  value: number;
  total: number;
}

function BreakdownBar({ label, value, total }: BreakdownRow) {
  const pct = total > 0 ? Math.abs(value / total) * 100 : 0;
  const isNeg = value < 0;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="font-body text-xs text-muted-foreground truncate min-w-0">
          {label}
        </span>
        <span
          className={cn(
            "font-display font-semibold text-sm shrink-0 flex items-center gap-0.5",
            isNeg ? "text-destructive" : "text-foreground",
          )}
        >
          {isNeg ? (
            <TrendingDown className="size-3.5" />
          ) : value === 0 ? (
            <Minus className="size-3.5 text-muted-foreground" />
          ) : (
            <TrendingUp className="size-3.5 text-accent" />
          )}
          {formatINR(Math.abs(value))}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-border overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            isNeg
              ? "bg-destructive/60"
              : "bg-gradient-to-r from-accent/60 to-accent",
          )}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}

export function ResultCard({ result, area }: ResultCardProps) {
  const confidenceConfig = {
    High: {
      label: "High Confidence",
      className: "bg-primary/15 text-primary border-primary/25",
    },
    Medium: {
      label: "Medium Confidence",
      className: "bg-accent/15 text-accent border-accent/25",
    },
    Low: {
      label: "Low Confidence",
      className: "bg-muted text-muted-foreground border-border",
    },
  };
  const conf =
    confidenceConfig[result.confidence as keyof typeof confidenceConfig] ??
    confidenceConfig.Low;

  const breakdownItems = [
    { label: "Base Price", value: result.breakdown.basePrice },
    { label: "Location Premium", value: result.breakdown.locationPremium },
    { label: "Furnishing Value", value: result.breakdown.furnishingValue },
    { label: "Floor Adjustment", value: result.breakdown.floorPremium },
    { label: "Parking / Amenity", value: result.breakdown.amenityValue },
    { label: "Age Discount", value: result.breakdown.agingDiscount },
  ];

  return (
    <div
      data-ocid="prediction.success_state"
      className="mt-6 bg-card border border-accent/25 rounded-2xl shadow-glow-accent p-6 md:p-8 animate-scale-in"
    >
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="text-xs font-display text-accent uppercase tracking-widest font-bold mb-2">
            Estimated Market Value
          </p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-display font-bold text-5xl md:text-6xl text-foreground leading-none">
              {formatINR(result.estimatedPrice)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
            <IndianRupee className="size-3.5" />
            {result.pricePerSqft.toLocaleString("en-IN")} per sq ft ·{" "}
            {area > 0 ? `${area.toLocaleString("en-IN")} sq ft` : ""}
          </p>
        </div>
        <Badge
          className={cn("text-sm px-3 py-1.5 font-semibold", conf.className)}
        >
          {conf.label}
        </Badge>
      </div>

      {/* Decorative price range */}
      <div className="mb-8 p-4 rounded-xl bg-background border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-xs text-muted-foreground font-body mb-0.5">
            Conservative Estimate
          </p>
          <p className="font-display font-bold text-xl text-foreground">
            {formatINR(Math.round(result.estimatedPrice * 0.93))}
          </p>
        </div>
        <div className="h-px w-full sm:h-8 sm:w-px bg-border" />
        <div className="text-center">
          <p className="text-xs text-accent font-body mb-0.5 font-semibold uppercase tracking-wider">
            Best Estimate
          </p>
          <p className="font-display font-bold text-2xl text-accent">
            {formatINR(result.estimatedPrice)}
          </p>
        </div>
        <div className="h-px w-full sm:h-8 sm:w-px bg-border" />
        <div className="text-center sm:text-right">
          <p className="text-xs text-muted-foreground font-body mb-0.5">
            Optimistic Estimate
          </p>
          <p className="font-display font-bold text-xl text-foreground">
            {formatINR(Math.round(result.estimatedPrice * 1.07))}
          </p>
        </div>
      </div>

      {/* Breakdown */}
      <div>
        <h4 className="font-display font-bold text-sm text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="h-px flex-1 bg-border" />
          Price Breakdown
          <span className="h-px flex-1 bg-border" />
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {breakdownItems.map(({ label, value }) => (
            <BreakdownBar
              key={label}
              label={label}
              value={value}
              total={result.estimatedPrice}
            />
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6 font-body border-t border-border pt-4">
        * Estimates are indicative and based on current market trends. Actual
        transaction prices may vary. Consult a real estate professional for
        exact valuations.
      </p>
    </div>
  );
}
