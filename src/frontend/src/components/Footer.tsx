import { Building2 } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-8 border-b border-border">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/20 border border-accent/30 shrink-0">
              <Building2 className="size-5 text-accent" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-base text-foreground tracking-tight">
                PricePredict Gujarat
              </span>
              <span className="text-[10px] text-accent font-body font-medium tracking-widest uppercase">
                Property Price Intelligence
              </span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground font-body max-w-xs leading-relaxed text-center md:text-right">
            Estimates are indicative only. Consult a real estate professional
            for exact valuations. Data reflects current market trends in
            Gujarat.
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-body">
            © {year} PricePredict Gujarat. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-body">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
