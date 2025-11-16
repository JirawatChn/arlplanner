import { TopNavigation } from "@/components/TopNavigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Train, Clock } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavigation />

      {/* โลโก้ด้านบน */}
      <div className="flex justify-center mt-8">
        <img
          src="/logo.png"
          alt="ARL Planner Logo"
          className="h-44 rounded-full object-cover shadow-md"
        />
      </div>

      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto text-center space-y-10">
          {/* หัวข้อหลัก */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Airport Rail Link
              <br />
              <span className="text-primary">
                ระบบทำนายความหนาแน่นผู้โดยสาร
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              วางแผนการเดินทางได้มั่นใจยิ่งขึ้น
              พร้อมดูการคาดการณ์ความหนาแน่นผู้โดยสาร ในแต่ละสถานี
            </p>
          </div>

          {/* ปุ่มหลัก */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/predict")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-12 px-8"
            >
              เริ่มทำนายความหนาแน่น
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/timetable")}
              className="rounded-lg h-12 px-8"
            >
              ค้นหาเวลาที่เหมาะสม
            </Button>
          </div>

          {/* 3 Block ฟีเจอร์ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            {/* Block 1 */}
            <div className="p-8 bg-card rounded-2xl border border-border shadow-sm h-full flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">
                แสดงความหนาแน่นผู้โดยสาร
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                แสดงข้อมูลการคาดการณ์ความหนาแน่นล่วงหน้า <br />
                เพื่อช่วยให้คุณตัดสินใจได้ง่ายขึ้น
              </p>
            </div>

            {/* Block 2 */}
            <div className="p-8 bg-card rounded-2xl border border-border shadow-sm h-full flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Train className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">
                ช่วยวางแผนเวลาการเดินทาง
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                เลือกช่วงเวลาที่เหมาะสม ลดความไม่แน่นอน <br />
                และเลี่ยงช่วงที่ผู้โดยสารหนาแน่น
              </p>
            </div>

            {/* Block 3 */}
            <div className="p-8 bg-card rounded-2xl border border-border shadow-sm h-full flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">
                เลือกช่วงเวลาที่ไม่แออัด
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ดูช่วงเวลาที่คนน้อยกว่าปกติ <br />
                เพื่อการเดินทางที่สะดวกและรวดเร็วยิ่งขึ้น
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
