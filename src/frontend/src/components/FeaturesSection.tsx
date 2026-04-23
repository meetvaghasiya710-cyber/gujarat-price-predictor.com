import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Zap } from "lucide-react";

const features = [
  {
    icon: <Zap className="size-6" />,
    title: "Lightning Fast",
    desc: "Instant results with no waiting — estimates are delivered in under a second using intelligent market algorithms.",
    highlight: "< 1 second",
  },
  {
    icon: <Target className="size-6" />,
    title: "Highly Accurate",
    desc: "Trained on Gujarat real estate market data. Covers 100+ localities across 12 major cities for precise estimates.",
    highlight: "100+ localities",
  },
  {
    icon: <Sparkles className="size-6" />,
    title: "Smart & Adaptive",
    desc: "Accounts for 11 different property factors — location, age, floor, furnishing, parking, and more for reliable results.",
    highlight: "11 factors",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 text-xs uppercase tracking-widest">
            Why PricePredict
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">
            Built for Smart Buyers
          </h2>
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Our platform combines deep local market knowledge with algorithmic
            precision to deliver estimates you can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map(({ icon, title, desc, highlight }, i) => (
            <div
              key={title}
              className="group relative bg-card border border-border rounded-2xl p-7 shadow-card overflow-hidden flex flex-col gap-5 hover:border-accent/40 hover:shadow-glow-accent transition-smooth"
              data-ocid={`features.item.${i + 1}`}
            >
              {/* Decorative corner glow */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-smooth blur-2xl"
                style={{ background: "oklch(0.72 0.18 55)" }}
                aria-hidden
              />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:bg-accent/25 transition-smooth shrink-0">
                {icon}
              </div>

              {/* Highlight chip */}
              <Badge className="self-start bg-accent/10 text-accent border-accent/20 text-xs font-mono tracking-wider">
                {highlight}
              </Badge>

              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-card border border-border rounded-2xl px-8 py-6 shadow-card">
            <div className="text-left">
              <p className="font-display font-bold text-xl text-foreground mb-1">
                Ready to find your property's value?
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Join thousands of Gujarat buyers making smarter decisions.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("predict")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="features.cta_button"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-accent-foreground font-display font-bold text-sm shadow-glow-accent hover:opacity-90 transition-smooth"
            >
              Predict My Price →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
