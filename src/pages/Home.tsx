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
      
      <main className="flex-1 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">
              Airport Rail Link
              <br />
              <span className="text-primary">Passenger Density Prediction</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plan your journey with confidence. Get real-time predictions of passenger density across all Airport Rail Link stations.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/predict")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-12 px-8"
            >
              Start Predicting
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/timetable")}
              className="rounded-lg h-12 px-8"
            >
              View Timetable
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Accurate Predictions</h3>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms analyze historical data to provide reliable passenger density forecasts.
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Train className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">All Stations Covered</h3>
              <p className="text-sm text-muted-foreground">
                Get insights for all 8 stations from Phaya Thai to Suvarnabhumi Airport.
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-Time Updates</h3>
              <p className="text-sm text-muted-foreground">
                Access current and future density predictions to plan your travel effectively.
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
