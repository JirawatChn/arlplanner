import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { stations } from "@/data/stations";
import { useState } from "react";
import { formatThaiDate } from "@/utils/date";
import { hourToRange } from "@/utils/time";

export interface ForecastBlock {
  timeRange: string;
  passengers: number;
  station: string;
}
interface DensityForecastProps {
  stationCode: string;
  predictionDate: string;
  forecast: ForecastBlock[] | null;
}

type DensityLevel = "คนน้อย" | "ปานกลาง" | "คนเยอะ" | "หนาแน่นมาก";

function getDensityLevel(passengers: number): DensityLevel {
  if (passengers <= 700) return "คนน้อย";
  if (passengers <= 1200) return "ปานกลาง";
  if (passengers <= 1500) return "คนเยอะ";
  return "หนาแน่นมาก";
}

const getDensityStyles = (density: DensityLevel) => {
  switch (density) {
    case "คนน้อย":
      return "bg-density-low/20 text-density-low border-density-low/30";
    case "ปานกลาง":
      return "bg-density-medium/20 text-density-medium border-density-medium/30";
    case "คนเยอะ":
      return "bg-density-high/20 text-density-high border-density-high/30";
    case "หนาแน่นมาก":
      return "bg-density-veryhigh/20 text-density-veryhigh border-density-veryhigh/30";
  }
};

export const DensityForecast = ({
  stationCode,
  predictionDate,
  forecast,
}: DensityForecastProps) => {
  const stationInfo = stations.find((s) => s.code === stationCode);
  const stationNameTH = stationInfo?.name.th || "";

  const predictionDateLabel = predictionDate
    ? formatThaiDate(predictionDate)
    : "";

  if (!forecast) return null; // กัน error เวลายังไม่มี data

  return (
    <Card className="w-full bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">ความหนาแน่นผู้โดยสาร</span>
            <span className="text-sm text-muted-foreground">
              Passenger Density
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-muted-foreground">
          สถานี{stationNameTH} ({stationCode}) — {predictionDateLabel}
        </div>

        <div className="space-y-3">
          {forecast.map((item, index) => {
            const density = getDensityLevel(item.passengers);

            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {hourToRange(Number(item.timeRange))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {item.passengers.toLocaleString()} คน
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={`${getDensityStyles(density)} font-medium`}
                >
                  {density}
                </Badge>
              </div>
            );
          })}
        </div>
        {/* <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20 mt-6">
          <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-foreground mb-1">Prediction Summary</div>
            <p className="text-sm text-muted-foreground">
              Peak density expected between 08:00–09:00 with approximately 2,156 passengers.
            </p>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
};
