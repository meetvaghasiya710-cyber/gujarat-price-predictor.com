import { Badge } from "@/components/ui/badge";
import { ClipboardList, Cpu, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <ClipboardList className="size-6" />,
    title: "Enter Property Details",
    desc: "Fill in your property information across key parameters — area, BHK, floor, city, and more.",
  },
  {
    step: "02",
    icon: <Cpu className="size-6" />,
    title: "Smart Analysis",
    desc: "Our algorithm analyses location premiums, market trends, and property characteristics to compute a fair value.",
  },
  {
    step: "03",
    icon: <TrendingUp className="size-6" />,
    title: "Get Your Estimate",
    desc: "Receive an accurate price estimate in Indian Rupees with a full factor-by-factor breakdown in under a second.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-card/40 border-y border-border"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4 text-xs uppercase tracking-widest">
            Simple &amp; Transparent
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">
            How It Works
          </h2>
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Three simple steps to unlock accurate property valuations across
            Gujarat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-border"
            aria-hidden
          />

          {steps.map(({ step, icon, title, desc }, i) => (
            <div
              key={step}
              className="relative bg-card border border-border rounded-2xl p-7 shadow-card flex flex-col gap-4 hover:border-accent/40 hover:shadow-glow-accent transition-smooth group"
              data-ocid={`how_it_works.item.${i + 1}`}
            >
              {/* Step badge */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center shadow-glow-accent shrink-0">
                  <span className="font-display font-bold text-sm text-accent-foreground">
                    {step}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-smooth">
                  {icon}
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">
                {title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
