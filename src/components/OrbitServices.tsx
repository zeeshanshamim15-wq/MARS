import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Zap,
  Video,
  Briefcase,
  TrendingUp,
  Database,
  Sparkles,
  Send,
  BarChart3,
  ArrowRight
} from "lucide-react";
import marsLogo from "@/assets/mars-logo.png";
import orbitWebdev from "@/assets/orbit-webdev.png";
import orbitAutomation from "@/assets/orbit-automation.png";
import orbitVfx from "@/assets/orbit-vfx.png";
import orbitConsulting from "@/assets/orbit-consulting.png";
import orbitInvestment from "@/assets/orbit-investment.png";
import orbitSolutions from "@/assets/orbit-solutions.png";
import orbitBrand from "@/assets/orbit-brand.png";
import orbitLeadgen from "@/assets/orbit-leadgen.jpg";
import orbitMarket from "@/assets/orbit-market.png";

type Service = {
  id: string;
  label: string;
  icon: any;
  title: string;
  description: string;
  tagline: string;
  pillars: string[];
  outcomes: string[];
  tag: string;
  accent: string;
  glowColor: string;
  path: string;
  preview?: string;
};

const SERVICES: Service[] = [
  {
    id: "web-dev",
    label: "Web Dev & SEO",
    icon: Globe,
    title: "01. Digital Marketing & Web Dev",
    description: "We design, build, and run everything a modern business needs to attract, engage, and convert customers online. We align brand identity, responsive landing pages, paid performance media, SEO, and automated CRMs.",
    tagline: "Everything a modern business needs to attract, engage, and convert customers online.",
    pillars: [
      "Responsive UI & Web Apps",
      "Google/Meta Ads Performance",
      "Brand Identity & Styling Direction"
    ],
    outcomes: [
      "Perfect Lighthouse performance",
      "Search engine crawling ready"
    ],
    tag: "DEV_CORE // SPEED_TEST",
    accent: "from-blue-400 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
    path: "/services/web-dev",
    preview: orbitWebdev
  },
  {
    id: "automation",
    label: "Automation",
    icon: Zap,
    title: "02. Intelligent Automation (IA) & AI Agents",
    description: "Our most powerful capability: engineering custom, smart automation systems capable of executing complex, multi-layered tasks. Beyond simple automated triggers, we construct reasoning AI agents that orchestrate work across CRM platforms, data pipelines, support chats, and databases, replacing friction with flawless execution.",
    tagline: "We engineer smart automation pipelines that replace manual business operations.",
    pillars: [
      "AI Outbound Voice Calling (ElevenLabs + n8n)",
      "Conversational Support & Sales Chatbots",
      "Lead Gen Prospecting & Verification Pipelines"
    ],
    outcomes: [
      "Autonomous lead scheduling",
      "Seamless CRM data sync"
    ],
    tag: "IA_CORE // PROTO_01",
    accent: "from-emerald-400 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.4)",
    path: "/services/automation",
    preview: orbitAutomation
  },
  {
    id: "filmmaking",
    label: "AI Film & VFX",
    icon: Video,
    title: "03. AI Filmmaking & Media",
    description: "We combine bleeding-edge Generative AI media tools with traditional video production disciplines. From scriptwriting to synthetic casting, high-fidelity VFX, voice synthesis, sound design, and OTT formatting, we create cinematic commercials and explainers at a fraction of standard agency costs.",
    tagline: "We produce premium cinematic commercials using advanced Generative AI pipelines.",
    pillars: [
      "Scripting & Storyboarding (AI + Human)",
      "Synthetic Casting & Narration",
      "Gen-AI VFX & Cinematic Editing"
    ],
    outcomes: [
      "Professional casting & VO",
      "4K cinematic commercial exports"
    ],
    tag: "VFX_CORE // GEN_MEDIA",
    accent: "from-purple-400 to-fuchsia-500",
    glowColor: "rgba(168, 85, 247, 0.4)",
    path: "/services/filmmaking",
    preview: orbitVfx
  },
  {
    id: "consulting",
    label: "Consulting",
    icon: Briefcase,
    title: "04. Embedded Business Consultancy",
    description: "We do not present reports and walk away. We embed ourselves in your operations, audit existing pipelines, develop a detailed execution roadmap, and take full ownership of the deliverables. We handle the tech builds, team restructuring, and campaign deployment as if it were our own.",
    tagline: "We embed in your business to audit, build, and scale operations.",
    pillars: [
      "Competitor & Strategy Audits",
      "Revenue Model Refinement",
      "Embedded Execution & Management"
    ],
    outcomes: [
      "Detailed operational audits",
      "Verified 4.2x scaling impact"
    ],
    tag: "OPS_CORE // STRAT_MAP",
    accent: "from-amber-400 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.4)",
    path: "/services/consulting",
    preview: orbitConsulting
  },
  {
    id: "investment",
    label: "Investment",
    icon: TrendingUp,
    title: "05. Strategic Investment (Roadmap)",
    description: "Our future vision includes establishing an incubator and seed investment arm. We plan to fund high-potential startups and pair capital injections with operational services (development, design, automation) provided directly by MARS to frictionlessly scale our portfolio companies.",
    tagline: "We plan to fund and operationally accelerate high-potential startups.",
    pillars: [
      "Pitch Deck Engineering",
      "Financial Modeling & Due Diligence",
      "Full Operational Growth Support"
    ],
    outcomes: [
      "Comprehensive strategic incubation",
      "Direct technical acceleration"
    ],
    tag: "STRAT_OPS // ROADMAP",
    accent: "from-rose-400 to-pink-500",
    glowColor: "rgba(244, 63, 94, 0.4)",
    path: "/services/investment",
    preview: orbitInvestment
  },
  {
    id: "ai-engineering",
    label: "AI Solutions",
    icon: Database,
    title: "06. Custom AI Solutions & Engineering",
    description: "Designing bespoke large-scale AI pipelines, training custom LLMs/LoRAs, and embedding models. We go beyond out-of-the-box API wrappers to build custom Retrieval-Augmented Generation (RAG) models, secure vector databases, and private models that operate strictly on your company's data and policies.",
    tagline: "We build custom vector databases and private data-isolated models.",
    pillars: [
      "Custom RAG & Vector Indexes",
      "Fine-tuning Open LLMs & LoRAs",
      "Secure private data-isolated models",
      "Compliant AI API Gateways"
    ],
    outcomes: [
      "Durable vector storage",
      "Offline secure model execution"
    ],
    tag: "ENG_CORE // AI_SOLUTIONS",
    accent: "from-violet-400 to-purple-600",
    glowColor: "rgba(139, 92, 246, 0.4)",
    path: "/services/ai-engineering",
    preview: orbitSolutions
  },
  {
    id: "brand-design",
    label: "Brand Identity",
    icon: Sparkles,
    title: "07. Brand Identity & Visual Systems",
    description: "Creative visual systems, logos, packaging, campaign assets, and UI design. We build cohesive brand architectures that resonate with audiences across print, web, packaging, and video. Our creative direction merges aesthetic purity with strategic marketing.",
    tagline: "We design creative visual systems and logos that attract customers.",
    pillars: [
      "Logo Systems & Visual Guidelines",
      "Physical Product Packaging Design",
      "UI/UX Visual Layout Frameworks"
    ],
    outcomes: [
      "Unforgettable design system",
      "Unified brand voice guidelines"
    ],
    tag: "CREATIVE_CORE // BRAND_DEV",
    accent: "from-fuchsia-400 to-pink-600",
    glowColor: "rgba(217, 70, 239, 0.4)",
    path: "/services/brand-design",
    preview: orbitBrand
  },
  {
    id: "lead-gen",
    label: "AI Lead Gen",
    icon: Send,
    title: "08. AI Lead Generation & Voice Outreach",
    description: "Building fully autonomous AI calling agents and extracting verified B2B B2C leads/outcomes. We build systems that scout, qualify, call, follow-up, and book appointments without human agents.",
    tagline: "We deploy autonomous AI calling agents to book qualified sales appointments.",
    pillars: [
      "Scrapes Localized Directories",
      "Verifies Contact Channels",
      "Vobiz VOIP SIP Trunking",
      "ElevenLabs Voice API"
    ],
    outcomes: [
      "CRM Syncing & Meeting Bookings",
      "350+ calls/day qualified"
    ],
    tag: "OUTREACH_CORE // DIALER",
    accent: "from-cyan-400 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.4)",
    path: "/services/lead-gen",
    preview: orbitLeadgen
  },
  {
    id: "market-analysis",
    label: "Market Analysis",
    icon: BarChart3,
    title: "09. Market Analysis & Data Intelligence",
    description: "We perform deep-dive market audits, localized directory scraping, multi-channel lead verification, and competitor benchmarking. We extract verified business data to fuel B2B strategic planning.",
    tagline: "We scrape directories and benchmark competitors for operational data intelligence.",
    pillars: [
      "Localized Registry Scouting",
      "HLR/SMTP Multi-point Ping",
      "Competitor Benchmarking Matrices"
    ],
    outcomes: [
      "Structured competitive datasets",
      "Clean verified prospect registries"
    ],
    tag: "INTEL_CORE // ANALYSIS",
    accent: "from-teal-400 to-emerald-600",
    glowColor: "rgba(20, 184, 166, 0.4)",
    path: "/services/market-analysis",
    preview: orbitMarket
  }
];

const INNER_SERVICES = [
  { ...SERVICES[0], originalIndex: 0 },
  { ...SERVICES[1], originalIndex: 1 },
  { ...SERVICES[2], originalIndex: 2 },
  { ...SERVICES[3], originalIndex: 3 },
  { ...SERVICES[7], originalIndex: 7 }
];

const OUTER_SERVICES = [
  { ...SERVICES[4], originalIndex: 4 },
  { ...SERVICES[5], originalIndex: 5 },
  { ...SERVICES[6], originalIndex: 6 },
  { ...SERVICES[8], originalIndex: 8 }
];

export default function OrbitServices() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [innerRadius, setInnerRadius] = useState(160);
  const [outerRadius, setOuterRadius] = useState(250);
  const [hasHover, setHasHover] = useState(true);

  // Animation values driven via Web Animations API
  const orbitCwRef = useRef<HTMLDivElement>(null);
  const orbitCcwRef = useRef<HTMLDivElement>(null);
  const planetsCwRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const planetsCcwRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const animationsRef = useRef<Animation[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover)");
    setHasHover(media.matches);
    const listener = (e: MediaQueryListEvent) => setHasHover(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 360) {
        setInnerRadius(75);
        setOuterRadius(120);
      } else if (w < 400) {
        setInnerRadius(88);
        setOuterRadius(140);
      } else if (w < 480) {
        setInnerRadius(95);
        setOuterRadius(155);
      } else if (w < 640) {
        setInnerRadius(110);
        setOuterRadius(180);
      } else if (w < 768) {
        setInnerRadius(125);
        setOuterRadius(200);
      } else if (w < 1024) {
        setInnerRadius(145);
        setOuterRadius(235);
      } else {
        setInnerRadius(165);
        setOuterRadius(265);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize Web Animations on mount for rings and planets
  useEffect(() => {
    // Clear any previous animations
    animationsRef.current.forEach((anim) => anim.cancel());
    animationsRef.current = [];

    const anims: Animation[] = [];

    // CW Ring: 360 deg in 40s
    if (orbitCwRef.current) {
      const anim = orbitCwRef.current.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(360deg)" }
        ],
        {
          duration: 40000,
          iterations: Infinity,
          easing: "linear"
        }
      );
      anims.push(anim);
    }

    // CCW Ring: -360 deg in 45s
    if (orbitCcwRef.current) {
      const anim = orbitCcwRef.current.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(-360deg)" }
        ],
        {
          duration: 45000,
          iterations: Infinity,
          easing: "linear"
        }
      );
      anims.push(anim);
    }

    // CW Planets counter-rotation
    planetsCwRefs.current.forEach((planet) => {
      if (planet) {
        const anim = planet.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-360deg)" }
          ],
          {
            duration: 40000,
            iterations: Infinity,
            easing: "linear"
          }
        );
        anims.push(anim);
      }
    });

    // CCW Planets counter-rotation
    planetsCcwRefs.current.forEach((planet) => {
      if (planet) {
        const anim = planet.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(360deg)" }
          ],
          {
            duration: 45000,
            iterations: Infinity,
            easing: "linear"
          }
        );
        anims.push(anim);
      }
    });

    animationsRef.current = anims;

    // Apply speed based on current paused state
    const rate = paused ? 0.25 : 1.0;
    anims.forEach((anim) => anim.updatePlaybackRate(rate));

    return () => {
      anims.forEach((anim) => anim.cancel());
      animationsRef.current = [];
    };
  }, []);

  // Update speed multipliers dynamically when hovering / pausing
  useEffect(() => {
    animationsRef.current.forEach((anim) => {
      const rate = paused ? 0.25 : 1.0;
      if (anim.playState !== "finished") {
        anim.updatePlaybackRate(rate);
      }
    });
  }, [paused]);

  // Autoplay handler
  const AUTOPLAY_MS = 4000;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActiveIdx((i) => (i + 1) % SERVICES.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(t);
  }, [paused]);

  const active = SERVICES[activeIdx];

  return (
    <section className="relative w-full overflow-hidden py-10 md:py-16">
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-1/3 h-[450px] w-[450px] -translate-x-1/2 rounded-full opacity-20 filter blur-3xl transition-colors duration-1000"
          style={{ backgroundColor: active.glowColor }}
        />
        <div
          className="absolute right-1/4 top-1/2 h-[350px] w-[350px] rounded-full opacity-15 filter blur-3xl transition-colors duration-1000"
          style={{ backgroundColor: active.glowColor }}
        />
      </div>

      <div className="relative mx-auto grid grid-cols-1 items-center gap-16 px-0 sm:px-6 lg:grid-cols-2">
        {/* LEFT — Concentric Orbit */}
        <div
          className="relative -mx-6 sm:mx-auto flex h-[300px] w-[300px] min-[360px]:h-[340px] min-[360px]:w-[340px] min-[400px]:h-[370px] min-[400px]:w-[370px] min-[480px]:h-[420px] min-[480px]:w-[420px] sm:h-[480px] sm:w-[480px] md:h-[560px] md:w-[560px] lg:h-[620px] lg:w-[620px] items-center justify-center select-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* inner orbit ring */}
          <div
            className="absolute rounded-full border border-white/10 pointer-events-none"
            style={{ width: innerRadius * 2, height: innerRadius * 2 }}
          />

          {/* outer orbit ring */}
          <div
            className="absolute rounded-full border border-white/5 pointer-events-none"
            style={{ width: outerRadius * 2, height: outerRadius * 2 }}
          />

          {/* central orb */}
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 flex-col items-center justify-center rounded-full bg-transparent border border-white/10 transition-shadow duration-700 pointer-events-none"
            style={{
              boxShadow: `0 0 50px ${active.glowColor}`
            }}
          >
            <img
              src={marsLogo}
              alt="MARS"
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain transition-transform duration-300"
              draggable={false}
            />
            <span className="text-[0.45rem] sm:text-[0.5rem] font-bold tracking-[0.3em] text-white/80 uppercase mt-1 leading-none">
              MARS
            </span>
          </motion.div>

          {/* INNER ORBIT RING (Clockwise rotation) */}
          <div ref={orbitCwRef} className="absolute inset-0 pointer-events-none">
            {INNER_SERVICES.map((s, i) => {
              const angle = (i / INNER_SERVICES.length) * 2 * Math.PI;
              const x = Math.cos(angle) * innerRadius;
              const y = Math.sin(angle) * innerRadius;
              const isActive = s.originalIndex === activeIdx;

              return (
                <div
                  key={s.id}
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                  }}
                >
                  <button
                    ref={(el) => {
                      planetsCwRefs.current[i] = el;
                    }}
                    onMouseEnter={() => {
                      if (hasHover) setActiveIdx(s.originalIndex);
                    }}
                    onClick={(e) => {
                      if (!hasHover) {
                        e.preventDefault();
                        setActiveIdx(s.originalIndex);
                      } else {
                        navigate(s.path);
                      }
                    }}
                    aria-label={`Select ${s.label}`}
                    className="relative flex flex-col items-center justify-center group cursor-pointer focus:outline-none pointer-events-auto h-10 w-10 md:h-12 md:w-12"
                  >
                    <div
                      className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl transition-all duration-500 border ${
                        isActive
                          ? `bg-gradient-to-br ${s.accent} border-white scale-110`
                          : "bg-black/60 border-white/10 group-hover:border-white/40 group-hover:scale-105"
                      }`}
                      style={{
                        boxShadow: isActive ? `0 0 20px ${s.glowColor}` : undefined
                      }}
                    >
                      <s.icon className={`h-4.5 w-4.5 md:h-5 md:w-5 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                      }`} />
                    </div>

                    <span
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[9px] md:text-[10px] font-semibold tracking-wider transition-all duration-300 ${
                        isActive
                          ? "text-white block opacity-100 scale-100"
                          : "text-white/40 group-hover:block hidden md:block"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* OUTER ORBIT RING (Counter-Clockwise rotation) */}
          <div ref={orbitCcwRef} className="absolute inset-0 pointer-events-none">
            {OUTER_SERVICES.map((s, i) => {
              const angle = (i / OUTER_SERVICES.length) * 2 * Math.PI + Math.PI / 4;
              const x = Math.cos(angle) * outerRadius;
              const y = Math.sin(angle) * outerRadius;
              const isActive = s.originalIndex === activeIdx;

              return (
                <div
                  key={s.id}
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                  }}
                >
                  <button
                    ref={(el) => {
                      planetsCcwRefs.current[i] = el;
                    }}
                    onMouseEnter={() => {
                      if (hasHover) setActiveIdx(s.originalIndex);
                    }}
                    onClick={(e) => {
                      if (!hasHover) {
                        e.preventDefault();
                        setActiveIdx(s.originalIndex);
                      } else {
                        navigate(s.path);
                      }
                    }}
                    aria-label={`Select ${s.label}`}
                    className="relative flex flex-col items-center justify-center group cursor-pointer focus:outline-none pointer-events-auto h-10 w-10 md:h-12 md:w-12"
                  >
                    <div
                      className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl transition-all duration-500 border ${
                        isActive
                          ? `bg-gradient-to-br ${s.accent} border-white scale-110`
                          : "bg-black/60 border-white/10 group-hover:border-white/40 group-hover:scale-105"
                      }`}
                      style={{
                        boxShadow: isActive ? `0 0 20px ${s.glowColor}` : undefined
                      }}
                    >
                      <s.icon className={`h-4.5 w-4.5 md:h-5 md:w-5 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                      }`} />
                    </div>

                    <span
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[9px] md:text-[10px] font-semibold tracking-wider transition-all duration-300 ${
                        isActive
                          ? "text-white block opacity-100 scale-100"
                          : "text-white/40 group-hover:block hidden md:block"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Detail Card */}
        <div className="relative min-h-[460px] w-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              aria-live="polite"
              className="overflow-hidden rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl p-5 flex flex-col gap-6 h-full min-h-[460px] relative shadow-2xl"
            >
              {/* Dynamic top-right ambient glow inside card */}
              <div
                className="absolute -right-24 -top-24 h-48 w-48 rounded-full filter blur-[70px] opacity-20 transition-colors duration-700"
                style={{ backgroundColor: active.glowColor }}
              />

              {/* Hero Image Area (Gradient Block or Real Preview Image) */}
              <div className="w-full h-60 sm:h-64 rounded-2xl relative overflow-hidden border border-white/5 bg-zinc-950 flex items-center justify-center">
                {active.preview ? (
                  <>
                    <img
                      src={active.preview}
                      alt={active.label}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    {/* Soft top-right icon badge when preview image is displayed */}
                    <div className="absolute top-4 right-4 h-10 w-10 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md flex items-center justify-center z-10">
                      <active.icon className="h-5 w-5 text-white" />
                    </div>
                  </>
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${active.accent} flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                    <active.icon className="h-14 w-14 sm:h-16 sm:w-16 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] z-10" />
                  </div>
                )}
              </div>

              {/* Title & Tagline */}
              <div className="flex flex-col gap-2 z-10 relative px-1">
                <h3 className="text-2xl font-bold text-white tracking-wide">
                  {active.label}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  {active.tagline}
                </p>
              </div>

              {/* Action Button */}
              <div className="z-10 relative mt-auto flex px-1">
                <Link
                  to={active.path}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white hover:bg-white/95 text-black px-6 py-3 text-xs sm:text-sm font-semibold shadow-lg shadow-white/5 transition-all duration-300 w-full sm:w-auto"
                >
                  Explore Service <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
