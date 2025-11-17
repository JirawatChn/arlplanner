import { useState } from "react";
import { TopNavigation } from "@/components/TopNavigation";
import { PredictionSettings } from "@/components/PredictionSettings";
import { StationLine } from "@/components/StationLine";
import {
  DensityForecast,
  ForecastBlock,
  PredictionResult,
} from "@/components/DensityForecast";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import {
  fetchPredictions,
  fetchRecommendation,
  isApiError,
} from "@/api/predictions";

const Predict = () => {
  const [selectedStation, setSelectedStation] = useState("A8");
  const [predictedStation, setPredictedStation] = useState("A8");
  const [showForecast, setShowForecast] = useState(false);
  const [forecastData, setForecastData] = useState<ForecastBlock[] | null>(
    null
  );
  const [finalDate, setFinalDate] = useState("");
  const [mode, setMode] = useState<"predict" | "recommend">("predict");

  const [predictionStatus, setPredictionStatus] = useState<
    "idle" | "success" | "error" | "no-data"
  >("idle");

  const handleStationChange = (station: string) => {
    setSelectedStation(station);
  };

  const getThaiDateString = (date: Date) =>
    date.toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" });

  function getCurrentHour(): number {
    return new Date().getHours(); // 0–23
  }

  const handlePredict = async (params: {
    station: string;
    predictionDate: string;
    timeRange: string;
  }) => {
    const d = new Date();
    let finalDateValue = "";
    setMode('predict');

    // ✓ แปลงวันที่ไทย (today / tomorrow / day-after)
    if (params.predictionDate === "today") {
      finalDateValue = getThaiDateString(d);
    } else if (params.predictionDate === "tomorrow") {
      d.setDate(d.getDate() + 1);
      finalDateValue = getThaiDateString(d);
    } else if (params.predictionDate === "day-after") {
      d.setDate(d.getDate() + 2);
      finalDateValue = getThaiDateString(d);
    }

    setFinalDate(finalDateValue);

    // ✓ แปลงเวลา
    let finalHour: number;

    if (params.timeRange === "now") {
      const currentHour = getCurrentHour(); // 0–23
      finalHour = currentHour <= 5 ? 6 : currentHour; // ARL เปิด 6–23
    } else {
      finalHour = Number(params.timeRange);
    }

    const sendData = {
      station: params.station,
      date: finalDateValue,
      hour: finalHour,
    };

    setPredictedStation(params.station);

    try {
      setPredictionStatus("idle");
      setShowForecast(false);

      const apiResponse = await fetchPredictions(sendData);

      if (!apiResponse.results || apiResponse.results.length === 0) {
        setForecastData(null);
        setPredictionStatus("no-data");
        setShowForecast(true);
        toast.error("ไม่พบข้อมูลทำนายในช่วงเวลานี้");
        return;
      }

      const mappedData: ForecastBlock[] = apiResponse.results.map(
        (item: PredictionResult) => ({
          hour: item.hour,
          passengers: item.prediction_passenger,
          station: item.station,
        })
      );

      setForecastData(mappedData);
      setPredictionStatus("success");
      setShowForecast(true);

      toast.success("แสดงผลการทำนายความหนาแน่นแล้ว");
    } catch (error: unknown) {
      console.error("Prediction Error:", error);

      let status: number | undefined = undefined;

      if (isApiError(error)) {
        status = error.status ?? error.response?.status;
      }

      if (status === 404) {
        setForecastData(null);
        setPredictionStatus("no-data");
        setShowForecast(true);
        toast.error("ไม่พบข้อมูลทำนายในช่วงเวลานี้");
        return;
      }

      setForecastData(null);
      setPredictionStatus("error");
      setShowForecast(true);
      toast.error("ดึงข้อมูลทำนายไม่สำเร็จ");
    }
  };

  const handleRecommendation = async (params: {
  station: string;
  predictionDate: string; // "today" | "tomorrow" | "day-after"
  timeRange: string; // มีมาก็ไม่เป็นไร เราไม่ใช้
}) => {
  const d = new Date();
  let finalDateValue = "";
  setMode("recommend");

  // ใช้ logic เดียวกับ handlePredict แปลงเป็น YYYY-MM-DD
  if (params.predictionDate === "today") {
    finalDateValue = getThaiDateString(d);
  } else if (params.predictionDate === "tomorrow") {
    d.setDate(d.getDate() + 1);
    finalDateValue = getThaiDateString(d);
  } else if (params.predictionDate === "day-after") {
    d.setDate(d.getDate() + 2);
    finalDateValue = getThaiDateString(d);
  }

  setFinalDate(finalDateValue);
  setPredictedStation(params.station);

  try {
    setPredictionStatus("idle");
    setShowForecast(false);

    // 🔹 เรียก API แนะนำ
    const apiResponse = await fetchRecommendation({
      station: params.station,
      date: finalDateValue,
    });

    if (!apiResponse.results || apiResponse.results.length === 0) {
      setForecastData(null);
      setPredictionStatus("no-data");
      setShowForecast(true);
      toast.error("ไม่พบช่วงเวลาที่คนน้อยสำหรับวันและสถานีนี้");
      return;
    }

    // 🔹 เรียงตามเวลา (hour จากน้อยไปมาก)
    const sortedResults = [...apiResponse.results].sort(
      (a: PredictionResult, b: PredictionResult) => a.hour - b.hour
    );

    const mappedData: ForecastBlock[] = sortedResults.map(
      (item: PredictionResult) => ({
        hour: String(item.hour),          // ถ้า ForecastBlock.hour เป็น string
        passengers: item.prediction_passenger,
        station: item.station,
      })
    );

    setForecastData(mappedData);
    setPredictionStatus("success");
    setShowForecast(true);

    toast.success("แนะนำช่วงเวลาที่มีผู้โดยสารน้อยแล้ว");
  } catch (error: unknown) {
    console.error("Recommendation Error:", error);

    let status: number | undefined = undefined;
    if (isApiError(error)) {
      status = error.status ?? error.response?.status;
    }

    if (status === 404) {
      setForecastData(null);
      setPredictionStatus("no-data");
      setShowForecast(true);
      toast.error("ไม่พบข้อมูลทำนายในวันและสถานีนี้");
      return;
    }

    setForecastData(null);
    setPredictionStatus("error");
    setShowForecast(true);
    toast.error("ดึงข้อมูลคำแนะนำไม่สำเร็จ");
  }
};


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavigation />

      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Prediction Settings */}
          <div className="lg:col-span-1 sticky top-6 h-fit">
            <PredictionSettings
              selectedStation={selectedStation}
              onStationChange={handleStationChange}
              onPredict={handlePredict}
              OnRecommendation={handleRecommendation}
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
                status={predictionStatus}
                mode={mode}
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
