import { Footer } from "@/components/Footer";
import { TopNavigation } from "@/components/TopNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavigation />

      <main className="flex-1 container mx-auto px-6 py-8">
        <Card className="w-full mx-auto bg-card shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              <div className="flex flex-col">
                <span className="text-xl font-semibold">แดช์บอร์ด</span>
                <span className="text-sm text-muted-foreground">Dashboard</span>
              </div>
            </CardTitle>{" "}
          </CardHeader>

          <CardContent>
            <iframe
              width="100%"
              height="600"
              src="https://lookerstudio.google.com/embed/reporting/885fa0bc-1541-4be9-b344-2d954b732bc5/page/p_0g5czmctxd"
              style={{ border: 0 }}
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
