import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { Check, Info, BadgeDollarSign, ShieldAlert, HeartHandshake, Table } from "lucide-react";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";

const PLANS = [
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

const ADDONS = [
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

const INTERACTION_COSTS = [
  { action: "Text Expense/Income Log", credits: "~20 credits", rupee: "₹0.20", description: "Logs items like 'paid 500 for fuel' in standard ledger" },
  { action: "Voice Note Transcription & Log", credits: "~22 credits", rupee: "₹0.22", description: "Transcribes Hindi-English mixed voices and updates ledger" },
  { action: "Receipt / Bill Photo OCR", credits: "~22 credits", rupee: "₹0.22", description: "Extracts values from receipt photos, files attachments" },
  { action: "Bulk Statement Import (PDF)", credits: "~40 - 50 credits", rupee: "₹0.40 - ₹0.50", description: "Processes multi-page bank transcripts in the background" }
];

export default function Pricing() {
  const [isMobile, setIsMobile] = useState(false);
  const [activePlan, setActivePlan] = useState(0);
  const [activeAddon, setActiveAddon] = useState(0);

  const handlePlanScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.min(3, Math.max(0, Math.round(container.scrollLeft / (container.scrollWidth / 4))));
    setActivePlan(index);
  };

  const handleAddonScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.min(1, Math.max(0, Math.round(container.scrollLeft / (container.scrollWidth / 2))));
    setActiveAddon(index);
  };

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
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
            Fair Allocation
          </p>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white flex flex-col items-center">
            <WordReveal text="AI Employees." />
            <MetallicText text="Real Salaries" className="text-4xl md:text-6xl mt-2" />
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
            We position our software as &ldquo;hiring an AI employee and paying its salary.&rdquo; Compare a ₹2,999 Pro salary to a ₹15,000 human bookkeeping role.
          </p>
        </div>

        {/* Salary Positioning Pitch */}
        <div className="mars-glass-card rounded-none md:rounded-[24px] p-5 sm:p-8 border border-white/5 max-w-4xl mx-auto mb-20 bg-white/[0.01]">
          <div className="flex gap-4 items-start">
            <div className="h-10 w-10 rounded-none md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shrink-0">
              <BadgeDollarSign className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Our Pricing Model: Base Salary + Overtime</h3>
              <p className="text-xs leading-relaxed text-white/55">
                Every subscription includes a large credit bucket matching average monthly business needs. Unused credits carry forward, while heavy monthly operations are funded by buying &ldquo;Overtime&rdquo; credit packs near cost. Paying for 10 months up-front unlocks a full 12-month contract (2 months free!).
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Tiers Grid */}
        {isMobile ? (
          <div className="w-full overflow-hidden py-4 select-none mb-20">
            <style dangerouslySetInnerHTML={{__html: `
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}} />
            <div 
              onScroll={handlePlanScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 w-[calc(100%+3rem)] -mx-6 px-6 no-scrollbar"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="w-[4vw] shrink-0 pointer-events-none" />
              {PLANS.map((plan, index) => (
                <div key={index} className="w-[82vw] shrink-0 snap-center">
                  <BorderLaserCard
                    key={index}
                    className={`p-5 sm:p-6 flex flex-col justify-between h-full relative ${
                      plan.isPopular ? "shadow-emerald-500/5 shadow-xl" : ""
                    }`}
                    borderRadius={0}
                  >
                    {plan.isPopular && (
                      <span className="absolute -top-3 right-6 bg-emerald-500 text-black text-[9px] uppercase tracking-widest font-semibold px-3 py-1 rounded-none z-20">
                        Beachhead Choice
                      </span>
                    )}
                    <div>
                      <h4 className="text-white font-medium text-lg mb-2">{plan.name}</h4>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl font-semibold text-white">{plan.price}</span>
                        <span className="text-xs text-white/40">{plan.period}</span>
                      </div>
                      <p className="text-[10px] font-semibold text-emerald-400/90 tracking-wide uppercase mb-4">{plan.credits}</p>
                      <p className="text-xs text-white/50 leading-relaxed mb-6 border-b border-white/5 pb-4">{plan.description}</p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {plan.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-white/70">
                            <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                        {plan.paywalled && plan.paywalled.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-white/30 line-through">
                            <span className="h-1.5 w-1.5 rounded-full bg-white/20 shrink-0 mt-1.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {plan.href.startsWith("http") ? (
                      <a
                        href={plan.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2.5 rounded-none text-xs font-semibold transition z-20 relative flex items-center justify-center ${
                          plan.isPopular
                            ? "bg-white text-black hover:scale-[1.02]"
                            : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {plan.cta}
                      </a>
                    ) : (
                      <Link
                        to={plan.href}
                        className={`w-full py-2.5 rounded-none text-xs font-semibold transition z-20 relative flex items-center justify-center ${
                          plan.isPopular
                            ? "bg-white text-black hover:scale-[1.02]"
                            : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {plan.cta}
                      </Link>
                    )}
                  </BorderLaserCard>
                </div>
              ))}
            </div>
            {/* Pagination Indicators */}
            <div className="flex justify-center gap-2 mt-2 select-none">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`h-1 rounded-none transition-all duration-300 ${
                    activePlan === index
                      ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      : "w-2.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {PLANS.map((plan, index) => (
              <BorderLaserCard
                key={index}
                className={`p-5 sm:p-6 flex flex-col justify-between h-full relative ${
                  plan.isPopular ? "shadow-emerald-500/5 shadow-xl" : ""
                }`}
                borderRadius={isMobile ? 0 : 24}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 right-6 bg-emerald-500 text-black text-[9px] uppercase tracking-widest font-semibold px-3 py-1 rounded-none z-20">
                    Beachhead Choice
                  </span>
                )}
                <div>
                  <h4 className="text-white font-medium text-lg mb-2">{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-semibold text-white">{plan.price}</span>
                    <span className="text-xs text-white/40">{plan.period}</span>
                  </div>
                  <p className="text-[10px] font-semibold text-emerald-400/90 tracking-wide uppercase mb-4">{plan.credits}</p>
                  <p className="text-xs text-white/50 leading-relaxed mb-6 border-b border-white/5 pb-4">{plan.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-white/70">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                    {plan.paywalled && plan.paywalled.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-white/30 line-through">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/20 shrink-0 mt-1.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {plan.href.startsWith("http") ? (
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 rounded-none md:rounded-xl text-xs font-semibold transition z-20 relative flex items-center justify-center ${
                      plan.isPopular
                        ? "bg-white text-black hover:scale-[1.02]"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <Link
                    to={plan.href}
                    className={`w-full py-2.5 rounded-none md:rounded-xl text-xs font-semibold transition z-20 relative flex items-center justify-center ${
                      plan.isPopular
                        ? "bg-white text-black hover:scale-[1.02]"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </BorderLaserCard>
            ))}
          </div>
        )}

        {/* Add-ons & Bundles */}
        <div className="mb-24">
          <div className="text-center mb-8">
            <h3 className="text-xl font-light tracking-tight text-white md:text-2xl">
              Add-ons & Team <span className="font-semibold">Bundles</span>
            </h3>
          </div>
          {isMobile ? (
            <div className="w-full overflow-hidden py-4 select-none">
              <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}} />
              <div 
                onScroll={handleAddonScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 w-[calc(100%+3rem)] -mx-6 px-6 no-scrollbar"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="w-[4vw] shrink-0 pointer-events-none" />
                {ADDONS.map((ao, idx) => (
                  <div
                    key={idx}
                    className="w-[82vw] shrink-0 snap-center mars-glass-card rounded-none p-6 border border-white/5 bg-white/[0.01]"
                  >
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="text-white font-medium text-sm">{ao.name}</h4>
                      <span className="text-emerald-400 font-semibold text-xs shrink-0">{ao.price}</span>
                    </div>
                    <p className="text-[10px] text-white/40 font-semibold mb-3 uppercase tracking-wider">{ao.credits} included</p>
                    <p className="text-xs text-white/50 leading-relaxed">{ao.desc}</p>
                  </div>
                ))}
              </div>
              {/* Pagination Indicators */}
              <div className="flex justify-center gap-2 mt-2 select-none">
                {[0, 1].map((index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-none transition-all duration-300 ${
                      activeAddon === index
                        ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        : "w-2.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {ADDONS.map((ao, idx) => (
                <div key={idx} className="mars-glass-card rounded-none md:rounded-[24px] p-6 border border-white/5 bg-white/[0.01]">
                  <div className="flex justify-between items-baseline mb-3">
                    <h4 className="text-white font-medium text-sm">{ao.name}</h4>
                    <span className="text-emerald-400 font-semibold text-xs shrink-0">{ao.price}</span>
                  </div>
                  <p className="text-[10px] text-white/40 font-semibold mb-3 uppercase tracking-wider">{ao.credits} included</p>
                  <p className="text-xs text-white/50 leading-relaxed">{ao.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Credit Economics / Token Costs */}
        <div className="max-w-4xl mx-auto border border-white/5 rounded-none md:rounded-3xl bg-white/[0.01] p-6 md:p-8 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-none md:rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
              <Table className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">Credit Billing Metrics Explained</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">1 Credit = ₹0.01 (one paisa)</p>
            </div>
          </div>

          <p className="text-xs text-white/50 leading-relaxed mb-6">
            To prevent margins from eroding, credits map directly to Google API expenses. Chat and voice utilize Gemini 2.5 Flash; media OCR reads are routed to the cheaper Flash-Lite, absorbing costs dynamically.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase tracking-widest text-[9px]">
                  <th className="pb-3 font-semibold">User Interaction</th>
                  <th className="pb-3 font-semibold text-center">Credit Load</th>
                  <th className="pb-3 font-semibold text-center">Rupee Value</th>
                  <th className="pb-3 font-semibold">Operational Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                {INTERACTION_COSTS.map((ic, index) => (
                  <tr key={index}>
                    <td className="py-3.5 font-medium text-white">{ic.action}</td>
                    <td className="py-3.5 text-center text-emerald-400 font-medium">{ic.credits}</td>
                    <td className="py-3.5 text-center text-white font-semibold">{ic.rupee}</td>
                    <td className="py-3.5 text-white/40 text-[11px]">{ic.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
