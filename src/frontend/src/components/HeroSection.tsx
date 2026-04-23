import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/gujarat-hero.dim_1920x800.jpg')",
        }}
      />
      {/* Gradient overlay: deep navy over image */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-background/40" />

      {/* Decorative floating orbs */}
      <div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.72 0.18 55 / 0.35)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.50 0.10 255 / 0.4)" }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-24 flex flex-col items-center text-center gap-7">
        <Badge
          className="bg-accent/20 text-accent border border-accent/30 font-body text-xs px-4 py-1.5 tracking-widest uppercase animate-fade-in"
          data-ocid="hero.badge"
        >
          Gujarat's #1 Property Estimator
        </Badge>

        <h1
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.08] animate-slide-up max-w-5xl"
          style={{ animationDelay: "0.05s" }}
        >
          House Price <span className="text-gradient">Prediction</span>
        </h1>

        <p
          className="font-body text-lg md:text-2xl text-foreground/75 max-w-2xl leading-relaxed animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          Get accurate property price estimates instantly — backed by
          hyper-local market intelligence across Gujarat.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up"
          style={{ animationDelay: "0.25s" }}
        >
          <button
            type="button"
            onClick={() => scrollToSection("predict")}
            data-ocid="hero.get_estimate_button"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl gradient-accent text-accent-foreground font-display font-bold text-base shadow-glow-accent hover:opacity-90 transition-smooth"
          >
            Get Your Estimate
            <ArrowRight className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("how-it-works")}
            data-ocid="hero.how_it_works_link"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-border/60 text-foreground/80 font-display font-medium text-base hover:border-accent/40 hover:text-accent transition-smooth"
          >
            How It Works
          </button>
        </div>

        {/* Quick Stats */}
        <div
          className="flex flex-wrap justify-center gap-8 mt-6 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { label: "Cities Covered", value: "12+" },
            { label: "Localities Tracked", value: "100+" },
            { label: "Property Types", value: "4" },
            { label: "Instant Results", value: "< 1s" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-display font-bold text-3xl text-accent">
                {value}
              </span>
              <span className="font-body text-xs text-foreground/55 uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
          aria-hidden
        >
          <span className="text-xs text-foreground/50 font-body uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-accent/60" />
        </div>
      </div>
    </section>
  );
}
