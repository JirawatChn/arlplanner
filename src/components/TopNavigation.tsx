import { Link, useLocation } from "react-router-dom";
import { Train } from "lucide-react";
import { LayoutGroup, motion } from "framer-motion";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/predict", label: "ทำนายความหนาแน่น" },
  { to: "/overview", label: "ความหนาแน่นรายวัน" },
  { to: "/dashboard", label: "Dashboard" },
];

export const TopNavigation = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link className="flex items-center gap-2" to="/">
          <Train className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg text-foreground">
            ARL Planner
          </span>
        </Link>

        <LayoutGroup>
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative px-4 py-2 text-sm font-medium rounded-full"
                >
                  {/* พื้น pill สีฟ้าที่เลื่อนตามเมนู */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* ตัวอักษร */}
                  <span
                    className={`relative ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </nav>
  );
};
