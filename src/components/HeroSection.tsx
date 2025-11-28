import { Button } from "@/components/ui/button";
import { Train, Map, ArrowRight } from "lucide-react";
import background from "/background.jpg";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Logo/Emblem */}
        <div className="animate-slide-up mb-8">
          <div
            className="inline-flex items-center justify-center 
      w-32 h-32 md:w-40 md:h-40 
      rounded-full bg-primary-foreground/95 shadow-2xl "
          >
            <img
              src={logo}
              alt="ARL Planner Logo"
              className="w-full h-full rounded-full object-cover shadow-md"
            />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 tracking-tight">
          ARL Planner
        </h1>

        {/* Subheadline in Thai */}
        <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
          วางแผนการเดินทางได้มั่นใจยิ่งขึ้น
          <br className="hidden md:block" />
          พร้อมดูการคาดการณ์ความหนาแน่นผู้โดยสาร ในแต่ละสถานี
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate("/predict")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-12 px-8"
          >
            เริ่มทำนายความหนาแน่น
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/overview")}
            className="rounded-lg h-12 px-8"
          >
            ดูความหนาแน่นตลอดวัน
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
