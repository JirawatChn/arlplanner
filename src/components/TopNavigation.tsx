import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Train, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/predict", label: "ทำนายความหนาแน่น" },
  { to: "/overview", label: "ความหนาแน่นรายวัน" },
  { to: "/dashboard", label: "Dashboard" },
];

export const TopNavigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const renderNavLinks = ({
    containerClassName,
    linkClassName = "",
    onNavigate,
  }: {
    containerClassName: string;
    linkClassName?: string;
    onNavigate?: () => void;
  }) => (
    <div className={containerClassName}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`
            relative px-4 py-2 text-sm font-medium rounded-full transition-colors
            ${linkClassName}
            ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }
          `}
          >
            <span className="relative">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="h-16 flex items-center justify-between gap-4">
          <Link className="flex items-center gap-2" to="/">
            <Train className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg text-foreground">
              ARL Planner
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            {renderNavLinks({
              containerClassName: "flex items-center gap-2",
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu List */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } lg:hidden flex-col border-t border-border pb-4 pt-3`}
        >
          {renderNavLinks({
            containerClassName: "flex flex-col gap-2",
            linkClassName: "w-full text-left",
            onNavigate: () => setIsMenuOpen(false),
          })}
        </div>
      </div>
    </nav>
  );
};
