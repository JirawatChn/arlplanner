import { useState } from "react";
import { TopNavigation } from "@/components/TopNavigation";
import { PredictionSettings } from "@/components/PredictionSettings";
import { StationLine } from "@/components/StationLine";
import { DensityForecast } from "@/components/DensityForecast";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const Predict = () => {
  const [selectedStation, setSelectedStation] = useState("A1");
  const [showForecast, setShowForecast] = useState(false);

  const handleStationChange = (station: string) => {
    setSelectedStation(station);
  };

  const handlePredict = () => {
    setShowForecast(true);
    toast.success("Prediction generated successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavigation />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Prediction Settings */}
          <div className="lg:col-span-1">
            <PredictionSettings
              selectedStation={selectedStation}
              onStationChange={handleStationChange}
              onPredict={handlePredict}
            />
          </div>

          {/* Right Panel - Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <StationLine
              selectedStation={selectedStation}
              onStationSelect={handleStationChange}
            />
            {showForecast && <DensityForecast />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Predict;
