import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StationLineProps {
  selectedStation: string;
  onStationSelect: (station: string) => void;
}

const stations = [
  { code: "A1", name: "Phaya Thai" },
  { code: "A2", name: "Ratchaprarop" },
  { code: "A3", name: "Makkasan" },
  { code: "A4", name: "Ramkhamhaeng" },
  { code: "A5", name: "Hua Mak" },
  { code: "A6", name: "Ban Thap Chang" },
  { code: "A7", name: "Lat Krabang" },
  { code: "A8", name: "Suvarnabhumi" },
];

export const StationLine = ({ selectedStation, onStationSelect }: StationLineProps) => {
  return (
    <Card className="w-full bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Airport Rail Link Stations</CardTitle>
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
                <span className="text-xs text-muted-foreground text-center max-w-[100px]">
                  {station.name}
                </span>
              </button>
              {index < stations.length - 1 && (
                <div className="h-0.5 w-8 bg-border mx-1" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
