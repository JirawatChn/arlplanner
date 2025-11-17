import { TopNavigation } from "@/components/TopNavigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Overview = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavigation />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <Card className="max-w-4xl mx-auto bg-card shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Overview Search</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Overview search functionality coming soon. Check back later for train schedules and departure times.
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Overview;
