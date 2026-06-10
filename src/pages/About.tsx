import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import WordReveal from "@/components/ui/WordReveal";
import { motion } from "framer-motion";
import TelemetryRadar from "@/components/TelemetryRadar";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

import {
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Compass,
  Building,
  Target,
  Sparkles,
  Search,
  Lock,
  Layers,
  HeartHandshake,
  Workflow
} from "lucide-react";

const CORE_VALUES = [
  {
    title: "Evidence-First",
    description: "Every strategy is backed by deep research. We do not gamble with guesses."
  },
  {
    title: "Full Ownership",
    description: "We treat client outcomes as our own, sharing in every hurdle and victory."
  },
  {
    title: "Practical Delivery",
    description: "We prioritize clean, working execution over bulky decks that collect dust."
  },
  {
    title: "Creativity with Discipline",
    description: "Bold ideas are valuable only when structured, budgeted, and executed."
  },
  {
    title: "Continuous Improvement",
    description: "We continuously audit, adapt, and refine. No system is ever 'done'."
  },
  {
    title: "Transparency & Ethics",
    description: "Complete visibility into workflows, budgets, and compliance safeguards."
  }
];

const TEAM_STRUCTURE = [
  { role: "Founder & CEO", name: "Umar Iqbal", description: "Product vision, core strategy, and client growth partnerships." },
  { role: "Head of Digital Marketing", name: "Chief Marketing Officer", description: "Campaign architecture, SEO, performance media, and content systems." },
  { role: "Head of IA & Integrations", name: "Chief Automation Architect", description: "AI agent sequencing, API bridges, database models, and workflow engines." },
  { role: "Head of Creative & Production", name: "Chief Creative Officer", description: "Synthetic narration, soundscapes, generative cinematic VFX, and script direction." },
  { role: "Head of Consulting & Strategy", name: "Embedded Growth Director", description: "Deep competitor analysis, custom roadmap drafts, and transition coordination." },
  { role: "Engineering & DevOps", name: "Core Developers", description: "Tenant isolation, database migration scripts, API reliability, and web servers." },
  { role: "Sales & Client Success", name: "Account Partners", description: "Smooth onboarding, metrics feedback, and operational assistance." },
  { role: "Operations & Compliance", name: "Compliance Officers", description: "SOP tracking, India DPDP audits, data minimisation enforcement, and legal scopes." }
];

const INDUSTRIES = [
  "Retail & E-Commerce",
  "Real Estate & Property",
  "Healthcare & Wellness",
  "Hospitality & Food & Beverage",
  "Manufacturing & Distribution",
  "Professional Services (Legal, Finance, Consulting)",
  "Education & EdTech",
  "Logistics & Supply Chain",
  "Technology & SaaS",
  "Media & Entertainment"
];

export default function About() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCoreValue, setActiveCoreValue] = useState(0);
  const [activeTeam, setActiveTeam] = useState(0);

  const handleCoreValueScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.min(5, Math.max(0, Math.round(container.scrollLeft / (container.scrollWidth / 6))));
    setActiveCoreValue(index);
  };

  const handleTeamScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.min(7, Math.max(0, Math.round(container.scrollLeft / (container.scrollWidth / 8))));
    setActiveTeam(index);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
        <div className="mx-auto max-w-3xl text-center mb-20">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
            Who We Are
          </p>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white">
            <WordReveal text="We exist to close the" />{" "}
            <span className="inline-block"><WordReveal text="execution gap." className="font-semibold mars-text-gradient" /></span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
            Market Analyzers & Research Based Solutions Pvt. Ltd. (MARS) is a multidisciplinary embedded growth partner founded in 2024.
          </p>
        </div>

        {/* Vision & Mission Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="mars-glass-card rounded-none md:rounded-[24px] p-5 sm:p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-white/[0.02] rounded-bl-full pointer-events-none" />
            <div className="h-10 w-10 rounded-none md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Compass className="h-5 w-5 text-white/90" />
            </div>
            <h3 className="text-xl font-medium text-white mb-4">Our Vision</h3>
            <p className="text-sm leading-relaxed text-white/60">
              To become the most trusted embedded growth partner for companies worldwide — one where data, automation, and creativity combine seamlessly so that business leaders can focus on what they do best, while MARS handles everything else. Our ultimate vision: a future where a CEO speaks a task aloud and intelligent systems complete it — autonomously, accurately, and without friction.
            </p>
          </div>

          <div className="mars-glass-card rounded-none md:rounded-[24px] p-5 sm:p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-white/[0.02] rounded-bl-full pointer-events-none" />
            <div className="h-10 w-10 rounded-none md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Target className="h-5 w-5 text-white/90" />
            </div>
            <h3 className="text-xl font-medium text-white mb-4">Our Mission</h3>
            <p className="text-sm leading-relaxed text-white/60">
              To enable sustainable, measurable growth for every client by researching their market, designing their strategy, and delivering the complete execution — from digital marketing and web development to automation workflows, AI-assisted media, and staffing. MARS removes every obstacle between a business idea and its outcome.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light tracking-tight text-white md:text-3xl">
              <WordReveal text="Our Core" />{" "}
              <span className="inline-block"><WordReveal text="Values" className="font-semibold text-white/90" /></span>
            </h3>
            <p className="text-xs text-white/40 uppercase tracking-[0.2em] mt-2">The rules we live by</p>
          </div>
          {isMobile ? (
            <div className="w-full overflow-hidden py-4 select-none">
              <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}} />
              <div 
                onScroll={handleCoreValueScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 w-[calc(100%+3rem)] -mx-6 px-6 no-scrollbar"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="w-[4vw] shrink-0 pointer-events-none" />
                {CORE_VALUES.map((value, i) => (
                  <div
                    key={i}
                    className="w-[82vw] shrink-0 snap-center mars-glass-card rounded-none p-5 sm:p-6 border border-white/5 bg-white/[0.01]"
                  >
                    <div className="h-8 w-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-xs font-semibold text-white/80">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h4 className="text-white font-medium mb-2">{value.title}</h4>
                    <p className="text-xs leading-relaxed text-white/55">{value.description}</p>
                  </div>
                ))}
              </div>
              {/* Pagination Indicators */}
              <div className="flex justify-center gap-2 mt-2 select-none">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-none transition-all duration-300 ${
                      activeCoreValue === index
                        ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        : "w-2.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {CORE_VALUES.map((value, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="mars-glass-card rounded-none md:rounded-2xl p-5 sm:p-6 border border-white/5 bg-white/[0.01]"
                >
                  <div className="h-8 w-8 rounded-none md:rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-xs font-semibold text-white/80">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4 className="text-white font-medium mb-2">{value.title}</h4>
                  <p className="text-xs leading-relaxed text-white/55">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Team Org Structure */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light tracking-tight text-white md:text-3xl">
              <WordReveal text="Organisational" />{" "}
              <span className="inline-block"><WordReveal text="Structure" className="font-semibold text-white/90" /></span>
            </h3>
            <p className="text-xs text-white/40 uppercase tracking-[0.2em] mt-2">The architecture of our execution engine</p>
          </div>
          {isMobile ? (
            <div className="w-full overflow-hidden py-4 select-none">
              <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}} />
              <div 
                onScroll={handleTeamScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 w-[calc(100%+3rem)] -mx-6 px-6 no-scrollbar"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="w-[4vw] shrink-0 pointer-events-none" />
                {TEAM_STRUCTURE.map((member, i) => (
                  <div
                    key={i}
                    className="w-[82vw] shrink-0 snap-center mars-glass-card rounded-none p-5 sm:p-6 flex flex-col justify-between border border-white/5 bg-white/[0.01]"
                  >
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{member.role}</p>
                      <h4 className="text-sm font-semibold text-white mb-3">{member.name}</h4>
                      <p className="text-xs text-white/50 leading-relaxed">{member.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination Indicators */}
              <div className="flex justify-center gap-2 mt-2 select-none">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-none transition-all duration-300 ${
                      activeTeam === index
                        ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        : "w-2.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {TEAM_STRUCTURE.map((member, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="mars-glass-card rounded-none md:rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-white/5 bg-white/[0.01]"
                >
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{member.role}</p>
                    <h4 className="text-sm font-semibold text-white mb-3">{member.name}</h4>
                    <p className="text-xs text-white/50 leading-relaxed">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Target Industries */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light tracking-tight text-white md:text-3xl">
              <WordReveal text="Industries" />{" "}
              <span className="inline-block"><WordReveal text="Served" className="font-semibold text-white/90" /></span>
            </h3>
            <p className="text-xs text-white/40 uppercase tracking-[0.2em] mt-2">B2B & B2C Sectors we scale</p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          >
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="mars-glass-card rounded-none md:rounded-xl p-3 sm:p-4 flex items-center justify-center text-center bg-white/[0.01] hover:bg-white/[0.03] transition-all border border-white/5"
              >
                <span className="text-xs text-white/70 font-medium">{ind}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Live Telemetry Radar Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light tracking-tight text-white md:text-3xl">
              <WordReveal text="Global Nodes" />{" "}
              <span className="inline-block"><WordReveal text="Telemetry" className="font-semibold text-white/90" /></span>
            </h3>
            <p className="text-xs text-white/40 uppercase tracking-[0.2em] mt-2">Active routing and agent transaction blips</p>
          </div>
          <TelemetryRadar />
        </div>

        {/* Compliance, Security & Ethics */}
        <div className="mars-glass-card rounded-none md:rounded-[32px] p-5 sm:p-8 md:p-12 border border-white/10 bg-white/[0.01]">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="h-14 w-14 shrink-0 rounded-none md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-none border border-emerald-500/20 bg-emerald-500/10 px-3 py-0.5 text-[10px] text-emerald-400 font-medium mb-4">
                <ShieldCheck className="h-3 w-3" />
                India DPDP Act Compliant (2026)
              </div>
              <h3 className="text-2xl font-light tracking-tight text-white mb-4">
                <WordReveal text="Compliance, Security &" />{" "}
                <span className="inline-block"><WordReveal text="Ethics" className="font-semibold text-white/90" /></span>
              </h3>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                Given the advanced automation pipelines and conversational AI agents we architect, MARS prioritizes rigid security compliance. We enforce structured protection models throughout our databases and client integrations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-white/50">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span><strong>Data Minimisation:</strong> Custom records hold only parameters required for marketing or processing logic, avoiding unnecessary collection.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span><strong>DPDP Consent Model:</strong> Explicit user sign-off is captured during trial activation, ensuring user control over data deletion queries within 7 days.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span><strong>Tenant Isolation:</strong> Strict scopes segregate database entries. Row-level security guarantees data of one organization never overlaps with another.</span>
                  </li>
                </ul>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span><strong>Outreach Boundaries:</strong> Outbound voice dialers check local telemarketing rules and filter blacklists, executing only inside designated hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span><strong>Vault Key Protection:</strong> Client access credentials (Gmail, n8n, CRM accounts, API tokens) are encrypted at rest with hardware storage.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span><strong>Human Escalations:</strong> Complex tasks that require auditing contain quick fallback alerts, preventing automated loops.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
