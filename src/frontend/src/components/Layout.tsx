import { Building2 } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-card backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/20 border border-accent/30">
              <Building2 className="size-5 text-accent" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-semibold text-base text-foreground tracking-tight">
                PricePredict
              </span>
              <span className="text-[10px] text-accent font-body font-medium tracking-widest uppercase">
                Gujarat
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#predict"
              className="text-sm font-body text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              Predict Price
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-body text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-sm font-body text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              Features
            </a>
          </nav>

          <a
            href="#predict"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-display font-semibold hover:bg-accent/90 transition-smooth shadow-xs"
            data-ocid="header.predict_cta"
          >
            Get Estimate
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-accent/20 border border-accent/30">
                <Building2 className="size-4 text-accent" />
              </div>
              <span className="font-display font-semibold text-sm text-foreground">
                PricePredict Gujarat
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-body text-center">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline transition-colors duration-200"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs text-muted-foreground font-body">
              Accurate property estimates across Gujarat
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
