import { Badge } from "@/components/ui/badge";
import { useRecentPredictions } from "@/hooks/usePricePrediction";
import { cn } from "@/lib/utils";

function formatINR(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} Lac`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function RecentPredictions() {
  const { data: recentPredictions } = useRecentPredictions();
  if (!recentPredictions || recentPredictions.length === 0) return null;

  return (
    <section className="py-14 bg-card/40 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-7">
          <h2 className="font-display font-bold text-xl text-foreground">
            Recent Estimates
          </h2>
          <Badge className="bg-accent/15 text-accent border-accent/25 text-xs">
            {recentPredictions.length} saved
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentPredictions.slice(0, 6).map((rec, i) => (
            <div
              key={rec.timestamp}
              className="bg-card border border-border rounded-xl p-4 shadow-card flex flex-col gap-2 hover:border-accent/40 transition-smooth"
              data-ocid={`recent.item.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-display font-semibold text-sm text-foreground truncate">
                    {rec.input.bhk} BHK {rec.input.propertyType}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {rec.input.location}, {rec.input.city}
                  </p>
                </div>
                <Badge
                  className={cn(
                    "shrink-0 text-xs",
                    rec.result.confidence === "High"
                      ? "bg-primary/15 text-primary border-primary/25"
                      : rec.result.confidence === "Medium"
                        ? "bg-accent/15 text-accent border-accent/25"
                        : "bg-muted text-muted-foreground border-border",
                  )}
                >
                  {rec.result.confidence}
                </Badge>
              </div>
              <p className="font-display font-bold text-xl text-foreground">
                {formatINR(rec.result.estimatedPrice)}
              </p>
              <p className="text-xs text-muted-foreground">
                ₹{rec.result.pricePerSqft.toLocaleString("en-IN")} / sq ft ·{" "}
                {rec.input.area.toLocaleString("en-IN")} sqft ·{" "}
                {new Date(rec.timestamp).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
