import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { stations } from "@/data/stations";
interface PredictionSettingsProps {
  selectedStation: string;
  onStationChange: (station: string) => void;
  onPredict: (params: {
    station: string;
    predictionDate: string;
    timeRange: string;
  }) => void;
}

export const PredictionSettings = ({
  selectedStation,
  onStationChange,
  onPredict,
}: PredictionSettingsProps) => {
  const [predictionDate, setPredictionDate] = useState("today");
  const [timeRange, setTimeRange] = useState("now");

  return (
    <Card className="w-full bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              ทำนายความหนาแน่นผู้โดยสาร
            </span>
            <span className="text-sm text-muted-foreground">
              Passenger Density Prediction
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            ช่วงเวลาที่ต้องการทำนาย
          </label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="now">ตอนนี้</SelectItem>
              <SelectItem value="5">05:00 - 06:00</SelectItem>
              <SelectItem value="6">06:00 - 07:00</SelectItem>
              <SelectItem value="7">07:00 - 08:00</SelectItem>
              <SelectItem value="8">08:00 - 09:00</SelectItem>
              <SelectItem value="9">09:00 - 10:00</SelectItem>
              <SelectItem value="10">10:00 - 11:00</SelectItem>
              <SelectItem value="11">11:00 - 12:00</SelectItem>
              <SelectItem value="12">12:00 - 13:00</SelectItem>
              <SelectItem value="13">13:00 - 14:00</SelectItem>
              <SelectItem value="14">14:00 - 15:00</SelectItem>
              <SelectItem value="15">15:00 - 16:00</SelectItem>
              <SelectItem value="16">16:00 - 17:00</SelectItem>
              <SelectItem value="17">17:00 - 18:00</SelectItem>
              <SelectItem value="18">18:00 - 19:00</SelectItem>
              <SelectItem value="19">19:00 - 20:00</SelectItem>
              <SelectItem value="20">20:00 - 21:00</SelectItem>
              <SelectItem value="21">21:00 - 22:00</SelectItem>
              <SelectItem value="22">22:00 - 23:00</SelectItem>
              <SelectItem value="23">23:00 - 00:00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() =>
            onPredict({
              station: selectedStation,
              predictionDate,
              timeRange,
            })
          }
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-11 font-medium"
        >
          ดูความหนาแน่นผู้โดยสาร
        </Button>
      </CardContent>
    </Card>
  );
};
