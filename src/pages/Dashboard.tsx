import { Footer } from "@/components/Footer";
import { TopNavigation } from "@/components/TopNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavigation />

      <main className="flex-1 container mx-auto px-6 py-8">
        <Card className="max-w-4xl mx-auto bg-card shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Dashboard functionality coming soon. Check back later for
              train schedules and departure times.
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
