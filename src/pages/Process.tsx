import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import WordReveal from "@/components/ui/WordReveal";
import { CheckCircle2, ClipboardList, Eye, Milestone, PlayCircle, Settings, Users } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { audioSfx } from "@/lib/audioSfx";

interface MatrixDecryptProps {
  text: string;
  speed?: number;
  delay?: number;
  trigger?: any;
}

function MatrixDecrypt({ text, speed = 20, delay = 0, trigger }: MatrixDecryptProps) {
  const [displayText, setDisplayText] = useState("");
  const chars = "X01%@#$&*[]<>_?/\\+=!-:;";

  useEffect(() => {
    let iterations = 0;
    
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iterations) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        });

        if (iterations >= text.length) {
          clearInterval(interval);
        }
        iterations += 1;
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [text, speed, delay, trigger]);

  const scrambledPlaceholder = text
    .split("")
    .map(c => (c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]))
    .join("");

  return <>{displayText || scrambledPlaceholder}</>;
}


const STAGES = [
  {
    week: "Week 0",
    title: "Discovery & Goal Setting",
    description: "Initial discovery session to deep-dive into your operational layout, current strategy constraints, and growth metrics. We define what success looks like and document the initial project borders.",
    icon: ClipboardList,
    bulletPoints: [
      "Understand business margins and pricing model",
      "Identify existing marketing/development bottlenecks",
      "Define quantitative targets for automation and leads"
    ]
  },
  {
    week: "Week 1",
    title: "Deep Audit & Strategic Roadmap",
    description: "Our team audits your active websites, automation scripts, CRM pipelines, and tech channels. We perform competitor strategy mappings and deliver a prioritized execution checklist.",
    icon: Milestone,
    bulletPoints: [
      "Perform technical SEO and speed analytics tests",
      "Draft database schema maps for custom automation fields",
      "Deliver prioritized implementation roadmap for review"
    ]
  },
  {
    week: "Week 2–4",
    title: "Quick Wins & Pilot Stage",
    description: "Immediate activation of high-impact fixes (e.g. database cleanups, first chatbot pilot, core landing page adjustments). We capture trial outcomes to secure early alignment.",
    icon: PlayCircle,
    bulletPoints: [
      "Release quick-fix code patches to production",
      "Deploy first custom automated n8n workflow or chatbot",
      "Analyze pilot engagement logs and review with your team"
    ]
  },
  {
    week: "Month 2+",
    title: "Full Scale & Continuous Optimization",
    description: "We deploy the full scope of agreed strategies: scaling paid campaigns, hardcoding custom database RLS security, and refining models. We monitor KPI dashboards continuously.",
    icon: Settings,
    bulletPoints: [
      "Scale marketing budgets and pipeline volumes",
      "Release Tally exports and custom invoice generators",
      "Continuous optimization audits based on user traffic logs"
    ]
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-36 md:pt-44 pb-32 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
            Our Methods
          </p>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white">
            <WordReveal text="Structured" />{" "}
            <span className="inline-block"><WordReveal text="Onboarding" className="font-semibold mars-text-gradient" /></span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
            We follow a structured, hands-on timeline designed to secure early wins and align teams with zero friction.
          </p>
        </div>

        {/* Segmented Timeline Tab Deck for mobile screens */}
        {isMobile && (
          <div className="flex flex-wrap justify-center gap-2 mb-10 bg-black/40 border border-white/5 p-2 rounded-none max-w-lg mx-auto font-mono text-[9px] tracking-wider select-none">
            {STAGES.map((stage, idx) => (
              <button
                key={idx}
                onMouseEnter={() => audioSfx.playHover()}
                onClick={() => {
                  audioSfx.playClick();
                  setActiveTab(idx);
                }}
                className={`flex-1 min-w-[70px] py-2 px-2.5 text-center border transition-all duration-300 rounded-none ${
                  activeTab === idx
                    ? "bg-white text-black border-white font-semibold shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                    : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10"
                }`}
              >
                {stage.week}
              </button>
            ))}
          </div>
        )}

        {/* Timeline */}
        <div ref={containerRef} className="max-w-4xl mx-auto mb-24 relative">
          {/* Vertical line connector track */}
          <div className="absolute left-[39px] top-6 bottom-6 w-px bg-white/5 hidden md:block" />
          {/* Glowing active progress line */}
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[39px] top-6 bottom-6 w-px bg-gradient-to-b from-white to-white/40 shadow-[0_0_8px_rgba(255,255,255,0.5)] hidden md:block" 
          />

          <div className="space-y-12 w-full">
            {isMobile ? (
              // Mobile View: Segmented Tab Content
              <div className="flex flex-col gap-6 relative items-center w-full">
                {/* Tactical chamfered header containing Icon + week info */}
                <div className="flex gap-4 items-center justify-between w-full max-w-md bg-white/[0.02] border border-white/10 p-4 relative">
                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/30" />
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/30" />
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/30" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/30" />

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      {(() => {
                        const IconComp = STAGES[activeTab].icon;
                        return <IconComp className="h-5 w-5 text-white/80" />;
                      })()}
                    </div>
                    <div className="text-left font-mono">
                      <p className="text-[8px] uppercase tracking-widest text-white/35">ACTIVE_STAGE_NODE</p>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">{STAGES[activeTab].week}</p>
                    </div>
                  </div>
                </div>

                {/* Glassmorphic card */}
                <div className="w-full max-w-md mars-glass-card rounded-none border border-white/10 p-5 bg-white/[0.01] relative">
                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />

                  <h3 className="text-lg font-mono font-semibold text-white mb-3">
                    <MatrixDecrypt text={STAGES[activeTab].title} trigger={activeTab} speed={15} />
                  </h3>
                  <p className="text-xs leading-relaxed text-white/55 mb-6 min-h-[70px] select-none font-sans">
                    <MatrixDecrypt text={STAGES[activeTab].description} trigger={activeTab} speed={6} />
                  </p>

                  <div className="border-t border-white/5 pt-4">
                    <p className="text-[9px] uppercase tracking-wider text-white/40 mb-3 font-semibold font-mono">
                      [ DELIVERABLES_COORDINATES ]
                    </p>
                    <ul className="grid grid-cols-1 gap-2 text-xs text-white/50">
                      {STAGES[activeTab].bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="flex items-center gap-2 font-mono text-[10px]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/80 shrink-0" />
                          <span>
                            <MatrixDecrypt text={bp} trigger={activeTab} speed={10} delay={bpIdx * 100} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              // Desktop View (Unchanged)
              STAGES.map((stage, idx) => {
                const IconComp = stage.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col md:flex-row gap-8 relative items-start"
                  >
                    {/* Timeline icon */}
                    <div className="h-20 w-20 shrink-0 rounded-none md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white z-10 backdrop-blur-md">
                      <IconComp className="h-8 w-8 text-white/80" />
                    </div>

                    {/* Glassmorphic card */}
                    <div className="flex-1 mars-glass-card rounded-none md:rounded-[24px] p-6 md:p-8 relative overflow-hidden bg-white/[0.01]">
                      <div className="absolute top-4 right-6 text-xs uppercase tracking-widest text-white/30 font-semibold bg-white/5 border border-white/5 px-3 py-1 rounded-none">
                        {stage.week}
                      </div>

                      <h3 className="text-xl font-medium text-white mb-3 mt-4 md:mt-0">{stage.title}</h3>
                      <p className="text-xs leading-relaxed text-white/60 mb-6">{stage.description}</p>

                      <div className="border-t border-white/5 pt-4">
                        <p className="text-[10px] uppercase tracking-wider text-white/40 mb-3 font-semibold">Deliverables include:</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/50">
                          {stage.bulletPoints.map((bp, bpIdx) => (
                            <li key={bpIdx} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/80 shrink-0" />
                              <span>{bp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Onboarding Split Policy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Self-serve Card */}
          <div className="mars-glass-card rounded-none md:rounded-[24px] p-8 border border-white/5 bg-white/[0.01]">
            <span className="text-[10px] text-white/40 uppercase tracking-widest bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-none font-semibold">
              Free Trial Only
            </span>
            <h3 className="text-lg font-medium text-white mt-4 mb-3">Self-Serve Signup</h3>
            <p className="text-xs leading-relaxed text-white/55 mb-6">
              Create an account in seconds via our public landing page. Only basic inputs required: business name, preferred language, and WhatsApp contact. Data-free transition: moving to paid plans keeps your existing trial ledger intact.
            </p>
            <ul className="text-xs text-white/40 space-y-2 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> WhatsApp activation link</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Auto-seeded standard categories</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 14 Days / 3000 credits allocated</li>
            </ul>
          </div>
 
          {/* Manual Card */}
          <div className="mars-glass-card rounded-none md:rounded-[24px] p-8 border border-white/5 bg-white/[0.01]">
            <span className="text-[10px] text-white/40 uppercase tracking-widest bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-none font-semibold">
              Paid Tiers
            </span>
            <h3 className="text-lg font-medium text-white mt-4 mb-3">Guided Setup Onboarding</h3>
            <p className="text-xs leading-relaxed text-white/55 mb-6">
              Paid tiers (Intern, Pro, Max) require custom document generation, template stamping coordinates, and client directory tables. Our team completes setup manually during an onboarding call, configuring credentials and templates.
            </p>
            <ul className="text-xs text-white/40 space-y-2 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Letterhead & Invoice template mapping</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Master Client & Product table imports</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Encrypted Gmail/Tally API bridges</li>
            </ul>
          </div>
        </div>
 
        {/* Rule of thumb banner */}
        <div className="max-w-5xl mx-auto mt-8 p-4 rounded-none md:rounded-xl border border-white/5 bg-white/[0.01] text-center text-xs text-white/45 italic">
          &ldquo;Rule of Thumb: If a feature reads a master table or custom template, that tier is onboarded manually. If it only writes ledger rows (simple logging, khata), it is self-serve.&rdquo;
        </div>
      </main>

      <Footer />
    </div>
  );
}
