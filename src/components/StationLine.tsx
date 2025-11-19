import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stations } from "@/data/stations";

interface StationLineProps {
  selectedStation: string;
  onStationSelect: (station: string) => void;
  page: "predict" | "overview";
}

export const StationLine = ({
  selectedStation,
  onStationSelect,
  page,
}: StationLineProps) => {
  return (
    <Card className="w-full bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              สถานีแอร์พอร์ต เรล ลิงก์
            </span>
            <span className="text-sm text-muted-foreground">
              Airport Rail Link Stations
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2 py-4">
          {stations.map((station, index) => (
            <div key={station.code} className="flex items-center">
              <button
                onClick={() => onStationSelect(station.code)}
                className={`flex flex-col items-center gap-2 transition-all ${
                  selectedStation === station.code
                    ? "scale-110"
                    : "hover:scale-105"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-colors ${
                    selectedStation === station.code
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-background text-foreground border-border hover:border-accent"
                  }`}
                >
                  {station.code}
                </div>

                {/* 🇹🇭 ชื่อไทย */}
                <span className="text-xs text-foreground text-center leading-tight">
                  {station.name.th}
                </span>

                {/* 🇬🇧 ชื่ออังกฤษ */}
                <span className="text-[12px] text-muted-foreground text-center leading-tight">
                  {station.name.en}
                </span>
              </button>

              {index < stations.length - 1 && (
                <div
                  className={`h-0.5 bg-border mx-1 ${
                    page === "predict" ? "w-8" : "w-20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
