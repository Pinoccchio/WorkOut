import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedVenues from "@/components/FeaturedVenues";
import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturedVenues />
        <FaqAccordion />
      </main>
      
      <Footer />
    </div>
  );
}
