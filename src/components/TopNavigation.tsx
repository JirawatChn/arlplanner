import { Train } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export const TopNavigation = () => {
  return (
    <nav className="w-full bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Train className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg text-foreground">Airport Rail Link</span>
        </div>
        
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          >
            Home
          </NavLink>
          <NavLink
            to="/predict"
            className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          >
            Predict Passenger Density
          </NavLink>
          <NavLink
            to="/timetable"
            className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          >
            Timetable Search
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
