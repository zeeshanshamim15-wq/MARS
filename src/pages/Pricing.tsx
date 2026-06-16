import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { Check, Info, BadgeDollarSign, ShieldAlert, HeartHandshake, Table, ChevronRight, Globe, Zap, Video, Briefcase, TrendingUp, Database, Sparkles, Send, BarChart3 } from "lucide-react";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";
import { PRICING_SERVICES } from "@/data/pricingData";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "web-dev": Globe,
  "automation": Zap,
  "filmmaking": Video,
  "consulting": Briefcase,
  "investment": TrendingUp,
  "ai-engineering": Database,
  "brand-design": Sparkles,
  "lead-gen": Send,
  "market-analysis": BarChart3
};

export const PLANS = [
  {
    name: "Trial (Free)",
    price: "₹0",
    period: "14 days",
    credits: "3,000 credits included",
    description: "Lowest friction hook to test capabilities. No card required.",
    features: [
      "Text expense & income logging",
      "Receipt photo OCR scans",
      "Hindi-English voice transcription",
      "Khata/udhaar ledger hooks",
      "Basic Excel reports",
      "Single owner user"
    ],
    paywalled: [
      "Bulk statement imports",
      "Document generation on letterhead",
      "Tally & GST exports",
      "Orion correspondence add-on",
      "Multi-user roles"
    ],
    isPopular: false,
    cta: "Start Free Trial",
    href: "https://mars-ai-web.onrender.com/start"
  },
  {
    name: "Abdul Intern (Lite)",
    price: "₹499 - 999",
    period: "/ month",
    credits: "15,000 credits included",
    description: "Ideal for solo operators and small neighborhood shops.",
    features: [
      "All Trial features unlocked",
      "Increased credit cap",
      "GST-aware logging categories",
      "Limited statement imports",
      "Up to 2 users (Boss + Manager)",
      "Standard support channels"
    ],
    isPopular: false,
    cta: "Hire Intern",
    href: "/onboarding?plan=intern"
  },
  {
    name: "Abdul Pro (CA-Grade)",
    price: "₹2,999",
    period: "/ month",
    credits: "40,000 credits included",
    description: "Our flagship beachhead package for growing businesses.",
    features: [
      "All Intern features unlocked",
      "Custom invoice & quote templates",
      "Multi-user role hierarchies",
      "Salary tracking & approvals",
      "Full Excel report workbooks",
      "Tally & GST export bridges"
    ],
    isPopular: true,
    cta: "Hire Pro Employee",
    href: "/onboarding?plan=pro"
  },
  {
    name: "Abdul Max (Enterprise)",
    price: "Custom",
    period: "/ month",
    credits: "100,000+ credits",
    description: "Bespoke automation for established corporations.",
    features: [
      "All Pro features unlocked",
      "Bespoke coordinate document grids",
      "Unlimited users & customized roles",
      "Dedicated infrastructure worker instances",
      "Priority 24/7 SLA channels",
      "Custom integrations"
    ],
    isPopular: false,
    cta: "Configure Max",
    href: "/onboarding?plan=max"
  }
];

export const ADDONS = [
  {
    name: "Orion Correspondence Agent",
    price: "₹1,999 / mo",
    credits: "30,000 credits",
    desc: "Autonomously drafts business letters, emails, and proposals on client letterheads. Links directly with Gmail API gateways."
  },
  {
    name: "“Hire the Team” Bundle (Pro + Orion)",
    price: "₹3,999 / mo",
    credits: "Combined pool",
    desc: "Saves ₹999/month. Combines Pro accountancy and Orion communication scripts into a unified team framework."
  }
];

export const INTERACTION_COSTS = [
  { action: "Text Expense/Income Log", credits: "~20 credits", rupee: "₹0.20", description: "Logs items like 'paid 500 for fuel' in standard ledger" },
  { action: "Voice Note Transcription & Log", credits: "~22 credits", rupee: "₹0.22", description: "Transcribes Hindi-English mixed voices and updates ledger" },
  { action: "Receipt / Bill Photo OCR", credits: "~22 credits", rupee: "₹0.22", description: "Extracts values from receipt photos, files attachments" },
  { action: "Bulk Statement Import (PDF)", credits: "~40 - 50 credits", rupee: "₹0.40 - ₹0.50", description: "Processes multi-page bank transcripts in the background" }
];

export default function Pricing() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-36 md:pt-44 pb-32 md:px-10">
        {/* Main Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
            Transparent Retainers & Setup
          </p>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white flex flex-col items-center">
            <WordReveal text="MARS Pricing" />
            <MetallicText text="Directory Hub" className="text-4xl md:text-6xl mt-2" />
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
            Calculate custom pricing bundles or explore dedicated virtual automation builds. Click on any vertical to view detailed rates and calculate bundle discounts.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRICING_SERVICES.map((service) => {
            const ServiceIcon = ICON_MAP[service.id] || Globe;
            return (
              <div
                key={service.id}
                onClick={() => navigate(`/pricing/${service.id}`)}
                className="group relative cursor-pointer"
              >
                <BorderLaserCard
                  className="p-6 h-full flex flex-col justify-between bg-black/40 hover:bg-black/60 border border-white/5 transition-all duration-300"
                  borderRadius={isMobile ? 0 : 24}
                >
                  <div>
                    {/* Top icon and identifier */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white transition-colors duration-300">
                        <ServiceIcon className="h-5 w-5" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                        {service.id.toUpperCase()}_OPS
                      </span>
                    </div>

                    {/* Header and text */}
                    <h4 className="text-white font-medium text-base mb-2 group-hover:text-white transition-colors">
                      {service.name}
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed mb-6 group-hover:text-white/70 transition-colors">
                      {service.description}
                    </p>
                  </div>

                  {/* Footer pricing info */}
                  <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-wider block font-mono">Bundle Starts At</span>
                      <span className="text-emerald-400 font-mono font-semibold text-sm">
                        ₹{service.bundlePrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="text-xs text-white/40 flex items-center gap-1 group-hover:text-white transition-colors font-mono">
                      <span>Configure</span>
                      <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </BorderLaserCard>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
