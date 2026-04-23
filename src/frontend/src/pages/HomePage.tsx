import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { PredictionForm } from "@/components/PredictionForm";
import { RecentPredictions } from "@/components/RecentPredictions";

export function HomePage() {
  return (
    <div className="dark">
      <HeroSection />
      <PredictionForm />
      <HowItWorks />
      <FeaturesSection />
      <RecentPredictions />
    </div>
  );
}
