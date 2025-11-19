import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stations } from "@/data/stations";
import { useState } from "react";
import { Button } from "./ui/button";

interface OverviewSettingsProps {
  selectedStation: string;
  onStationChange: (station: string) => void;
  onPredict: (params: { station: string; predictionDate: string }) => void;
}

export const OverviewSettings = ({
  selectedStation,
  onStationChange,
  onPredict,
}: OverviewSettingsProps) => {
  const [predictionDate, setPredictionDate] = useState("today");

  return (
    <Card className="w-full bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              ดูความหนาแน่นผู้โดยสารรายวัน
            </span>
            <span className="text-sm text-muted-foreground">
              View Daily Passenger Density
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">สถานี</label>
            <Select value={selectedStation} onValueChange={onStationChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Station" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {stations.map((station) => (
                  <SelectItem key={station.code} value={station.code}>
                    {station.code} - {station.name.th}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              วันที่ต้องการทำนาย
            </label>
            <Select value={predictionDate} onValueChange={setPredictionDate}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="today">วันนี้</SelectItem>
                <SelectItem value="tomorrow">1 วันข้างหน้า</SelectItem>
                <SelectItem value="day-after">2 วันข้างหน้า</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Button
            onClick={() =>
              onPredict({
                station: selectedStation,
                predictionDate,
              })
            }
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-11 font-medium"
          >
            ดูความหนาแน่นผู้โดยสาร
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
