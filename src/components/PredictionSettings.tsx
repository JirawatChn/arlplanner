import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface PredictionSettingsProps {
  selectedStation: string;
  onStationChange: (station: string) => void;
  onPredict: () => void;
}

export const PredictionSettings = ({ selectedStation, onStationChange, onPredict }: PredictionSettingsProps) => {
  const [predictionDate, setPredictionDate] = useState("today");
  const [timeRange, setTimeRange] = useState("now");

  const stations = [
    { value: "A1", label: "A1 - Phaya Thai" },
    { value: "A2", label: "A2 - Ratchaprarop" },
    { value: "A3", label: "A3 - Makkasan" },
    { value: "A4", label: "A4 - Ramkhamhaeng" },
    { value: "A5", label: "A5 - Hua Mak" },
    { value: "A6", label: "A6 - Ban Thap Chang" },
    { value: "A7", label: "A7 - Lat Krabang" },
    { value: "A8", label: "A8 - Suvarnabhumi" },
  ];

  return (
    <Card className="w-full bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Prediction Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Station</label>
          <Select value={selectedStation} onValueChange={onStationChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Station" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {stations.map((station) => (
                <SelectItem key={station.value} value={station.value}>
                  {station.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Prediction Date</label>
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
          <label className="text-sm font-medium text-foreground">Time Range</label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="now">ตอนนี้ (Now)</SelectItem>
              <SelectItem value="05-06">05:00 - 06:00</SelectItem>
              <SelectItem value="06-07">06:00 - 07:00</SelectItem>
              <SelectItem value="07-08">07:00 - 08:00</SelectItem>
              <SelectItem value="08-09">08:00 - 09:00</SelectItem>
              <SelectItem value="09-10">09:00 - 10:00</SelectItem>
              <SelectItem value="10-11">10:00 - 11:00</SelectItem>
              <SelectItem value="11-12">11:00 - 12:00</SelectItem>
              <SelectItem value="12-13">12:00 - 13:00</SelectItem>
              <SelectItem value="13-14">13:00 - 14:00</SelectItem>
              <SelectItem value="14-15">14:00 - 15:00</SelectItem>
              <SelectItem value="15-16">15:00 - 16:00</SelectItem>
              <SelectItem value="16-17">16:00 - 17:00</SelectItem>
              <SelectItem value="17-18">17:00 - 18:00</SelectItem>
              <SelectItem value="18-19">18:00 - 19:00</SelectItem>
              <SelectItem value="19-20">19:00 - 20:00</SelectItem>
              <SelectItem value="20-21">20:00 - 21:00</SelectItem>
              <SelectItem value="21-22">21:00 - 22:00</SelectItem>
              <SelectItem value="22-23">22:00 - 23:00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={onPredict}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-11 font-medium"
        >
          Predict Passenger Density
        </Button>
      </CardContent>
    </Card>
  );
};
