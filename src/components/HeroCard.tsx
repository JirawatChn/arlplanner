import { BarChart, Clock, Train } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  delay: string;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <div
      className={`group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover 
  transition-all duration-500 hover:-translate-y-2 animate-slide-up 
  flex flex-col items-center text-center ${delay}`}
    >
      {/* Icon Container */}
      <div className="w-16 h-16 rounded-xl bg-icon-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <div className="text-primary">{icon}</div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-card-foreground mb-3">{title}</h3>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">{description}</p>

      {/* Hover Accent Line */}
      <div className="mt-6 h-1 w-0 bg-primary rounded-full group-hover:w-16 transition-all duration-500" />
    </div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      icon: <BarChart className="w-8 h-8" strokeWidth={1.5} />,
      title: "แสดงความหนาแน่นผู้โดยสาร",
      description: (
        <>
          แสดงข้อมูลการคาดการณ์ความหนาแน่นล่วงหน้า <br />
          เพื่อช่วยให้คุณตัดสินใจได้ง่ายขึ้น
        </>
      ),
      delay: "animation-delay-100",
    },
    {
      icon: <Train className="w-8 h-8" strokeWidth={1.5} />,
      title: "ช่วยวางแผนเวลาการเดินทาง",
      description: (
        <>
          เลือกช่วงเวลาที่เหมาะสม ลดความไม่แน่นอน <br />
          และเลี่ยงช่วงที่ผู้โดยสารหนาแน่น
        </>
      ),
      delay: "animation-delay-200",
    },
    {
      icon: <Clock className="w-8 h-8" strokeWidth={1.5} />,
      title: "เลือกช่วงเวลาที่ไม่แออัด",
      description: (
        <>
          ดูช่วงเวลาที่คนน้อยกว่าปกติ <br />
          เพื่อการเดินทางที่สะดวกและรวดเร็วยิ่งขึ้น
        </>
      ),
      delay: "animation-delay-300",
    },
  ];

  return (
    <section className="py-20 md:py-28 hidden lg:block">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            บริการของเรา
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            เครื่องมือที่ช่วยให้การเดินทางของคุณง่ายและสะดวกยิ่งขึ้น
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
