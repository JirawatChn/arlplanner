import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

interface ForecastBlock {
  timeRange: string;
  passengers: number;
  density: "low" | "medium" | "high";
}

const mockForecastData: ForecastBlock[] = [
  { timeRange: "06:00 - 07:00", passengers: 589, density: "low" },
  { timeRange: "07:00 - 08:00", passengers: 1234, density: "medium" },
  { timeRange: "08:00 - 09:00", passengers: 2156, density: "high" },
  { timeRange: "09:00 - 10:00", passengers: 1567, density: "medium" },
  { timeRange: "10:00 - 11:00", passengers: 892, density: "low" },
];

const getDensityStyles = (density: "low" | "medium" | "high") => {
  switch (density) {
    case "low":
      return "bg-density-low/20 text-density-low border-density-low/30";
    case "medium":
      return "bg-density-medium/20 text-density-medium border-density-medium/30";
    case "high":
      return "bg-density-high/20 text-density-high border-density-high/30";
  }
};

export const DensityForecast = () => {
  return (
    <Card className="w-full bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Passenger Density Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {mockForecastData.map((forecast, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-accent/50 transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium text-foreground">{forecast.timeRange}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {forecast.passengers.toLocaleString()} passengers
                </div>
              </div>
              <Badge
                variant="outline"
                className={`${getDensityStyles(forecast.density)} capitalize font-medium`}
              >
                {forecast.density}
              </Badge>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20 mt-6">
          <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-foreground mb-1">Prediction Summary</div>
            <p className="text-sm text-muted-foreground">
              Peak density expected between 08:00–09:00 with approximately 2,156 passengers.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
