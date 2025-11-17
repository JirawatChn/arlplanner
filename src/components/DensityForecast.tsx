import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { stations } from "@/data/stations";
import { formatThaiDate } from "@/utils/date";
import { hourToRange } from "@/utils/time";

export interface PredictionResult {
  hour: number;
  station: string;
  prediction_passenger: number;
  prediction_date: string;
  model_version: string;
}

export interface ForecastBlock {
  hour: string;
  passengers: number;
  station: string;
}

interface DensityForecastProps {
  stationCode: string;
  predictionDate: string;
  forecast: ForecastBlock[] | null;
  status: "idle" | "success" | "error" | "no-data";
  mode: "predict" | "recommend";
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
      return "bg-density-low/25 text-density-low border-density-low/50";
    case "ปานกลาง":
      return "bg-density-medium/25 text-density-medium border-density-medium/50";
    case "คนเยอะ":
      return "bg-density-high/25 text-density-high border-density-high/50";
    case "หนาแน่นมาก":
      return "bg-density-veryhigh/25 text-density-veryhigh border-density-veryhigh/50";
  }
};

export const DensityForecast = ({
  stationCode,
  predictionDate,
  forecast,
  status,
  mode,
}: DensityForecastProps) => {
  const stationInfo = stations.find((s) => s.code === stationCode);
  const stationNameTH = stationInfo?.name.th || "";

  const predictionDateLabel = predictionDate
    ? formatThaiDate(predictionDate)
    : "";

  // 🟡 เคสไม่มีข้อมูล (เช่น backend คืน 404 แล้ว frontend set status = "no-data")
  if (status === "no-data") {
    return (
      <Card className="w-full bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            <div className="flex flex-col">
              <span className="text-xl font-semibold">
                ความหนาแน่นผู้โดยสาร
              </span>
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

          <div className="mt-4 rounded-lg border border-dashed border-muted-foreground/40 p-6 text-center text-sm text-muted-foreground">
            ไม่มีข้อมูลการทำนายในช่วงเวลานี้
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card className="w-full bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            <div className="flex flex-col">
              <span className="text-xl font-semibold">
                ความหนาแน่นผู้โดยสาร
              </span>
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

          <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-destructive">
            ไม่สามารถดึงข้อมูลการทำนายได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง
          </div>
        </CardContent>
      </Card>
    );
  }

  // กันไว้เผื่อ status ยังไม่พร้อม
  if (!forecast || forecast.length === 0) return null;

  // ---------- คำนวณสรุปสำหรับ Prediction Summary ----------
  const minSlot = forecast.reduce((a, b) =>
    a.passengers < b.passengers ? a : b
  );
  const maxSlot = forecast.reduce((a, b) =>
    a.passengers > b.passengers ? a : b
  );
  const recommendation = `ควรเดินทางช่วง ${hourToRange(
    Number(minSlot.hour)
  )} ซึ่งเป็นช่วงที่คนน้อยที่สุด (ประมาณ ${minSlot.passengers.toLocaleString()} คน)`;
  // --------------------------------------------------------

  return (
    <Card className="w-full bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <div className="flex flex-col">
            {mode === "predict" ? (
              <>
                <span className="text-xl font-semibold">
                  ความหนาแน่นผู้โดยสาร
                </span>
                <span className="text-sm text-muted-foreground">
                  Passenger Density
                </span>
              </>
            ) : (
              <>
                <span className="text-xl font-semibold">
                  3 ช่วงเวลาที่คนน้อยที่สุด
                </span>
                <span className="text-sm text-muted-foreground">
                  Recommended Low-Density Hours
                </span>
              </>
            )}
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

            const isMin = item.hour === minSlot.hour;
            const isMax = item.hour === maxSlot.hour;

            const blockStyle =
              mode === "recommend"
                ? "bg-background border-border"
                : isMin
                ? "bg-density-low/10 border-density-low"
                : isMax
                ? "bg-density-veryhigh/10 border-density-veryhigh"
                : "bg-background border-border hover:border-accent/50";

            return (
              <div
                key={index}
                className={`
                  flex items-center justify-between p-4 rounded-lg border transition-colors
                  ${blockStyle}
                `}
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {hourToRange(Number(item.hour))}
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

        {/* Suggestion / Prediction Summary */}
        {mode === "predict" && (
          <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20 mt-6">
            <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground mb-1">
                Prediction Summary
              </div>
              <p className="text-sm text-muted-foreground">
                ช่วงที่คนน้อยที่สุด: <b>{hourToRange(Number(minSlot.hour))}</b>{" "}
                ประมาณ {minSlot.passengers.toLocaleString()} คน
                <br />
                ช่วงที่หนาแน่นที่สุด: <b>
                  {hourToRange(Number(maxSlot.hour))}
                </b>{" "}
                ประมาณ {maxSlot.passengers.toLocaleString()} คน
                <br />
              </p>
              <p className="text-sm text-accent mt-2 font-medium">
                {recommendation}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
