import { useState } from "react";
import { TopNavigation } from "@/components/TopNavigation";
import { PredictionSettings } from "@/components/PredictionSettings";
import { StationLine } from "@/components/StationLine";
import { DensityForecast, ForecastBlock } from "@/components/DensityForecast";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const Predict = () => {
  const [selectedStation, setSelectedStation] = useState("A8");
  const [predictedStation, setPredictedStation] = useState("A8"); // 👈 ใช้กับผลทำนาย
  const [showForecast, setShowForecast] = useState(false);
  const [forecastData, setForecastData] = useState<ForecastBlock[] | null>(
    null
  );
  const [finalDate, setFinalDate] = useState("");

  const handleStationChange = (station: string) => {
    setSelectedStation(station);
  };

  // ฟังก์ชัน mock API (ตอนนี้ยังไม่ยิง backend จริง)
  const mockFetchForecast = (station: string): ForecastBlock[] => {
    return [
      { station, timeRange: "6", passengers: 589 },
      { station, timeRange: "7", passengers: 1234 },
      { station, timeRange: "8", passengers: 2156 },
      { station, timeRange: "9", passengers: 1567 },
      { station, timeRange: "23", passengers: 892 },
    ];
  };

  function getCurrentHour(): number {
    return new Date().getHours(); // 0–23
  }

  const handlePredict = (params: {
    station: string;
    predictionDate: string;
    timeRange: string;
  }) => {
    // console.log("Predict Params:", params);
    const d = new Date();

    if (params.predictionDate === "today") {
      setFinalDate(d.toISOString().split("T")[0]);
    } else if (params.predictionDate === "tomorrow") {
      d.setDate(d.getDate() + 1);
      setFinalDate(d.toISOString().split("T")[0]);
    } else if (params.predictionDate === "day-after") {
      d.setDate(d.getDate() + 2);
      setFinalDate(d.toISOString().split("T")[0]);
    }

    let finalHour: number;

    if (params.timeRange === "now") {
      const currentHour = getCurrentHour(); // 0–23

      // ถ้าเวลาอยู่ช่วง ARL ปิด (00:00–05:59)
      if (currentHour >= 0 && currentHour <= 5) {
        finalHour = 6; // ปัดเป็น 6
      } else {
        finalHour = currentHour;
      }
    } else {
      finalHour = Number(params.timeRange); // เช่น "6" → 6
    }

    const sendData = {
      station: params.station,
      date: finalDate,
      hour: finalHour,
    };

    // console.log(sendData);
    setPredictedStation(params.station);

    const data = mockFetchForecast(params.station);
    setForecastData(data);
    setShowForecast(true);

    toast.success("แสดงผลการทำนายความหนาแน่นแล้ว");
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
            {showForecast && (
              <DensityForecast
                stationCode={predictedStation}
                predictionDate={finalDate}
                forecast={forecastData}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Predict;
