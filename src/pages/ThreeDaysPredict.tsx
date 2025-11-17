import { useState } from "react";
import { TopNavigation } from "@/components/TopNavigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { threedaysPrediction } from "@/api/predictions";

const ThreeDaysPredict = () => {
  const [responseData, setResponseData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const getThaiDateString = (date: Date) =>
    date.toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" }); // YYYY-MM-DD

  const handlePredict = async () => {
    setLoading(true);

    // วันนี้ (ส่งแบบ YYYY-MM-DD)
    const today = getThaiDateString(new Date());

    try {
      const res = await threedaysPrediction({ date: today });

      setResponseData(res.data); // เก็บ response API
    } catch (error) {
      setResponseData({ error: "ไม่สามารถดึงข้อมูลได้" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavigation />

      <main className="flex-1 container mx-auto px-6 py-8">
        <div>
          <div className="mb-2 text-lg font-semibold">ทำนายล่วงหน้า 3 วัน</div>

          <Button
            onClick={handlePredict}
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-11 font-medium"
          >
            {loading ? "กำลังทำนาย..." : "ทำนายล่วงหน้า"}
          </Button>
        </div>

        <div className="mt-4">
          {responseData && (
            <pre className="bg-secondary p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThreeDaysPredict;
