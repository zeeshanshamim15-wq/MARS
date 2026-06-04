import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import marsLogo from "@/assets/mars-logo.png";

const SERVICES = [
  { label: "Digital Marketing", to: "/services" },
  { label: "AI Automation", to: "/services" },
  { label: "AI Filmmaking", to: "/services" },
  { label: "Consulting", to: "/services" },
];

const COMPANY = [
  { label: "Home", to: "/" },
  { label: "Work / Case Studies", to: "/work" },
  { label: "Process", to: "/process" },
  { label: "About", to: "/about" },
  { label: "Pricing", to: "/pricing" },
  { label: "System Logs", to: "/logs" }
];

const LEGAL = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
];

export const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden px-6 py-12 sm:px-10 md:px-16 lg:px-24 border-t border-white/5 bg-transparent"
    >
      {/* Ambient blurred light streaks behind the panel */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full opacity-[0.10] blur-[120px]"
          style={{ background: "radial-gradient(circle, #ffffff, transparent 60%)" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1320px] z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left: Brand & CTA (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="flex items-center gap-3">
              <img
                src={marsLogo}
                alt="MARS"
                className="h-9 w-9 object-contain"
                draggable={false}
              />
              <span className="text-base font-semibold tracking-[0.18em] text-white">
                MARS
              </span>
            </div>
            
            <h2 className="mt-6 text-balance text-2xl font-light leading-tight text-white md:text-3xl">
              Let&apos;s build something that{" "}
              <span className="font-semibold mars-text-gradient">runs your business.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              From strategy to automation, we design systems that execute and scale.
            </p>

            <Link
              to="/about"
              className="mt-6 w-fit inline-flex h-9 items-center justify-center rounded-full bg-white px-6 text-xs font-semibold text-black transition-transform duration-200 hover:scale-[1.02] shadow-lg shadow-white/5"
            >
              Get Started
            </Link>
          </div>

          {/* Right: Layout Columns (7 columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            
            {/* Services */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.15em] text-white/90 uppercase mb-4">
                Services
              </h3>
              <ul className="space-y-2.5">
                {SERVICES.map((item, index) => (
                  <li key={index}>
                    <Link to={item.to} className="text-sm text-white/60 hover:text-white transition duration-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.15em] text-white/90 uppercase mb-4">
                Company
              </h3>
              <ul className="space-y-2.5">
                {COMPANY.map((item, index) => (
                  <li key={index}>
                    <Link to={item.to} className="text-sm text-white/60 hover:text-white transition duration-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.15em] text-white/90 uppercase mb-4">
                Contact
              </h3>
              <ul className="space-y-3.5 text-sm text-white/60">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" />
                  <span className="leading-relaxed text-xs">
                    38C B.T. Road (Kalpana Apartment), 1st Floor, Flat 1A, Kolkata – 700056
                  </span>
                </li>
                <li>
                  <a
                    href="mailto:mars.iqsystem@gmail.com"
                    className="inline-flex items-center gap-2.5 hover:text-white transition duration-200"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-white/40" />
                    <span className="text-xs">mars.iqsystem@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+917003939432"
                    className="inline-flex items-center gap-2.5 hover:text-white transition duration-200"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-white/40" />
                    <span className="text-xs">+91 70039 39432</span>
                  </a>
                </li>
                <li className="text-[10px] text-white/30 italic">
                  Typically responds within 24 hours
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-white/40">
          <p>© 2026 MARS Corp. All rights reserved.</p>

          <div className="flex items-center gap-6">
            {LEGAL.map((item, index) => (
              <Link key={index} to={item.to} className="hover:text-white transition duration-200">
                {item.label}
              </Link>
            ))}

            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition duration-200"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
