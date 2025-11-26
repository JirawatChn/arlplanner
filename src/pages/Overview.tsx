import { TopNavigation } from "@/components/TopNavigation";
import { Footer } from "@/components/Footer";
import { StationLine } from "@/components/StationLine";
import {
  DensityForecast,
  ForecastBlock,
  PredictionResult,
} from "@/components/DensityForecast";
import { useEffect, useRef, useState } from "react";
import { OverviewSettings } from "@/components/OverviewSettings";
import { getThaiDateString } from "@/utils/date";
import { fetchOverview, isApiError } from "@/api/predictions";

const Overview = () => {
  const [selectedStation, setSelectedStation] = useState("A8");
  const [predictedStation, setPredictedStation] = useState("A8");
  const [showForecast, setShowForecast] = useState(false);
  const [forecastData, setForecastData] = useState<ForecastBlock[] | null>(
    null
  );
  const [finalDate, setFinalDate] = useState("");
  const [predictionStatus, setPredictionStatus] = useState<
    "idle" | "success" | "error" | "no-data" | "loading"
  >("idle");
  const firstStation = useRef(selectedStation);

  const handleStationChange = (station: string) => {
    setSelectedStation(station);
  };
  const mode = "overview";

  const handlePredict = async (params: {
    station: string;
    predictionDate: string;
  }) => {
    const d = new Date();
    let finalDateValue = "";

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

    const sendData = {
      station: params.station,
      date: finalDateValue,
    };

    setPredictedStation(params.station);

    try {
      setPredictionStatus("loading");
      setShowForecast(true);

      const apiResponse = await fetchOverview(sendData);

      if (!apiResponse.results || apiResponse.results.length === 0) {
        setForecastData(null);
        setPredictionStatus("no-data");
        setShowForecast(true);
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
        return;
      }

      setForecastData(null);
      setPredictionStatus("error");
      setShowForecast(true);
    }
  };

  useEffect(() => {
    handlePredict({ station: firstStation.current, predictionDate: "today" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavigation />

      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="lg:col-span-3 space-y-6">
          <OverviewSettings
            selectedStation={selectedStation}
            onStationChange={handleStationChange}
            onPredict={handlePredict}
          />

          <div className="hidden lg:block">
            <StationLine
              selectedStation={selectedStation}
              onStationSelect={handleStationChange}
              page={mode}
            />
          </div>

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
      </main>

      <Footer />
    </div>
  );
};

export default Overview;
