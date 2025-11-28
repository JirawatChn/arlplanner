import { TopNavigation } from "@/components/TopNavigation";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/HeroCard";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavigation />
      <HeroSection/>
      <FeatureCards />
      <Footer />
    </div>
  );
};

export default Home;
