import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import marsLogo from "@/assets/mars-logo.png";
import { Link, useLocation } from "react-router-dom";
import HoloConsole from "./HoloConsole";

type NavItem = { label: string; to: string };

const LEFT_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Logs", to: "/logs" },
];

const RIGHT_ITEMS: NavItem[] = [
  { label: "Work", to: "/work" },
  { label: "Process", to: "/process" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global backtick command console listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        setIsConsoleOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 mars-nav",
          (scrolled || mobileOpen) && "mars-nav--scrolled",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-0 md:px-10">
          <nav
            aria-label="Primary"
            className={cn(
              "mars-nav-shell mobile-nav-glass flex items-center justify-between md:justify-center relative transition-all duration-300",
              "w-[calc(100%-2rem)] mx-auto mt-4 rounded-full px-4 py-2.5 bg-black/50 backdrop-blur-md border border-white/10",
              "md:w-fit md:mt-3 md:rounded-full md:border md:border-white/5 md:bg-transparent md:backdrop-blur-none",
              scrolled 
                ? "md:px-8 md:py-2.5" 
                : "md:px-10 md:py-3.5",
            )}
          >
            {/* Mobile Left HUD accessories */}
            <div className="flex items-center gap-3 md:hidden absolute left-4">
              {/* Telemetry Console Toggle */}
              <button
                type="button"
                onClick={() => setIsConsoleOpen(true)}
                className="text-[9px] font-mono uppercase tracking-[0.15em] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-none flex items-center gap-1.5 animate-pulse cursor-pointer"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                SYS_ONLINE
              </button>
            </div>

            {/* Desktop Layout: Tight capsule logo-centered cluster */}
            <div className="hidden items-center gap-[1.125rem] md:flex lg:gap-6">
              {/* Left links */}
              <ul className="flex items-center gap-[1.125rem] lg:gap-6">
                {LEFT_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={item.to === "/" ? handleHomeClick : undefined}
                      className="mars-nav-link"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Center logo */}
              <Link
                to="/"
                onClick={handleHomeClick}
                className="mars-logo-mark mx-2 flex flex-col shrink-0 items-center justify-center"
                aria-label="MARS — home"
              >
                <img
                  src={marsLogo}
                  alt="MARS"
                  className="h-[2.85rem] w-[2.85rem] object-contain lg:h-[3.35rem] lg:w-[3.35rem] transition-transform duration-300"
                  draggable={false}
                />
                <span className="mars-logo-text text-[0.55rem] font-bold tracking-[0.3em] text-white/80 uppercase mt-0.5 leading-none transition-all duration-300">
                  MARS
                </span>
              </Link>

              {/* Right links */}
              <ul className="flex items-center gap-[1.125rem] lg:gap-6">
                {RIGHT_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link 
                      to={item.to} 
                      className="mars-nav-link"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile View center logo */}
            <Link
              to="/"
              onClick={handleHomeClick}
              className="mars-logo-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col shrink-0 items-center justify-center md:hidden"
              aria-label="MARS — home"
            >
              <img
                src={marsLogo}
                alt="MARS"
                className="h-[2.35rem] w-[2.35rem] object-contain"
                draggable={false}
              />
              <span className="mars-logo-text text-[0.5rem] font-bold tracking-[0.25em] text-white/80 uppercase mt-0.5 leading-none transition-all duration-300">
                MARS
              </span>
            </Link>

            {/* Mobile View hamburger menu button */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen((v) => !v);
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className={cn(
                "absolute right-4 inline-flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-none border border-white/10 bg-white/5 transition md:hidden cursor-pointer",
                scrolled ? "text-white/90 hover:text-white" : "text-white/60 hover:text-white",
              )}
            >
              {mobileOpen ? <X className="h-[0.9375rem] w-[0.9375rem]" /> : <Menu className="h-[0.9375rem] w-[0.9375rem]" />}
            </button>
          </nav>

          {/* Mobile menu drop-down list */}
          <div
            className={cn(
              "mars-nav-shell mobile-nav-glass mt-2 overflow-hidden w-[calc(100%-2rem)] mx-auto rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md md:hidden",
              mobileOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0",
              "transition-all duration-300 ease-in-out",
            )}
          >
            <ul className="flex flex-col gap-[0.1875rem] p-3">
              {[...LEFT_ITEMS, ...RIGHT_ITEMS].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={(e) => {
                      setMobileOpen(false);
                      if (item.to === "/") {
                        handleHomeClick(e);
                      }
                    }}
                    className="mars-nav-link block w-full rounded-none px-3 py-[0.5625rem]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Holographic interactive CLI terminal console */}
      <HoloConsole isOpen={isConsoleOpen} onClose={() => setIsConsoleOpen(false)} />
    </>
  );
};

export default Navbar;
