import { lazy, Suspense, useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Group } from "three";
import MetallicText from "@/components/ui/MetallicText";
import WordReveal from "@/components/ui/WordReveal";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import MediaContainer from "@/components/ui/MediaContainer";
import useMagnetic from "@/hooks/useMagnetic";
import {
  Cpu,
  Globe,
  Video,
  Briefcase,
  Terminal,
  Send,
  ShieldCheck,
  Zap,
  Sparkles,
  Database,
  Radio,
  CheckCircle2,
  Mail,
  Lock,
  ArrowRight,
  Bot,
  Phone
} from "lucide-react";

const HeroCanvas = lazy(() => import("@/components/ParticleSphere/HeroCanvas"));
const Hero3DZoom = lazy(() => import("@/components/Hero3DZoom"));

gsap.registerPlugin(ScrollTrigger);

const DOSSIERS = [
  {
    tag: "CASE_01",
    client: "B2B Technology Firm",
    stats: "+320% Efficiency",
    quote: "MARS designed an automated objection-handling cold-caller that operates with zero manual overhead. It resolved our core scaling blocker in less than 30 days.",
    rep: "CEO, Enterprise Tech"
  },
  {
    tag: "CASE_02",
    client: "Regional Retail Chain",
    stats: "+120% Traffic // +45% Rev",
    quote: "Our slow loading site was rebuilt from scratch. Load speeds went to 99 on Lighthouse and our sales increased instantly. They took full ownership of the rollout.",
    rep: "Founder, Multi-Store Retail"
  },
  {
    tag: "CASE_03",
    client: "Service-Based SMB",
    stats: "4.2x ROI Sync Growth",
    quote: "They embedded directly inside our workflow, mapped operations, and deployed automatic client booking routes that cut our acquisition costs in half.",
    rep: "Operations VP, SMB Logistics"
  }
];

// Sector specific case study metric data
const SECTOR_STUDIES = {
  clinics: {
    title: "Healthcare & Clinics",
    metric: "+320% Scheduling Efficiency",
    detail: "Inbound and outbound voice calling agents deployed to handle patient bookings, query routing, and automated SMS appointment reminders. Operates with direct CRM syncing.",
    benefits: ["2,380+ patient appointments verified", "97.1% booking success rate", "0% manual scheduling overhead"],
    quote: "MARS designed an automated voice scheduler that resolved our booking bottleneck in less than 30 days.",
    rep: "Dr. A. Sen, Operations Lead",
    placeholder: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
  },
  gyms: {
    title: "Fitness & Wellness Chains",
    metric: "+120% Member Traffic",
    detail: "Autonomous lead generation pipelines that scrape, verify, and call fitness prospects, booking trial sessions automatically into active calendars.",
    benefits: ["1,090+ qualified leads generated", "97.3% contact verification rate", "Automatic membership enrollment paths"],
    quote: "Our front desk fatigue was completely eliminated. The calling bots qualified and booked members 24/7.",
    rep: "Founder, Peak Fitness",
    placeholder: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80"
  },
  realestate: {
    title: "Premium Real Estate",
    metric: "4.2x Lead Qualification Rate",
    detail: "Deep property lead scraping coupled with outbound conversational agents that pre-qualify prospective buyers before routing to sales agents.",
    benefits: ["4,110+ verified contacts synced", "95.1% accuracy in database matching", "Automatic follow-up campaigns over WhatsApp"],
    quote: "The CRM integrations were seamless. We received highly qualified leads directly on our dashboards.",
    rep: "VP of Sales, Apex Realty",
    placeholder: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  },
  saas: {
    title: "SaaS & Tech Platforms",
    metric: "60% Reduction in Support Overhead",
    detail: "Embedded customer support AI agents equipped with RAG access to documentation, resolving complex technical inquiries instantly over WhatsApp and web chats.",
    benefits: ["890+ technical tickets resolved", "97.7% satisfaction rating", "Database compliance under DPDP standards"],
    quote: "The RAG support system is exceptionally precise. It solved customer inquiries without escalating to developers.",
    rep: "CTO, CloudScale Inc.",
    placeholder: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
  }
};

// Interactive Market Telemetry Console Component
function MarketTelemetryConsole() {
  const [sector, setSector] = useState<"clinics" | "gyms" | "realestate" | "saas">("clinics");
  const study = SECTOR_STUDIES[sector];
  const aiConsoleRef = useMagnetic(0.35, 100);

  return (
    <section
      id="telemetry"
      className="relative flex flex-col items-center justify-center px-6 pt-32 md:pt-40 pb-24 text-[hsl(0_0%_96%)] border-t border-white/5 premium-blueprint-grid"
    >
      <div className="mx-auto max-w-6xl w-full space-y-20">
        
        {/* 1. Live Test Drive Gateway Card */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-emerald-950/20 via-zinc-950/40 to-blue-950/20 p-8 sm:p-12 md:p-16 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row gap-8 items-center justify-between">
          {/* Decorative ambient background glows */}
          <div className="absolute top-0 right-1/4 h-[300px] w-[300px] bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] sm:text-xs text-white/60 tracking-wider w-fit">
              <Bot className="h-3.5 w-3.5 text-white animate-pulse" />
              Interactive Live Console
            </div>
            <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-white leading-tight">
              Experience Our <span className="font-semibold text-emerald-400 animate-pulse">Autonomous Agents</span> Live
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              We have deployed our flagship voice and ledger systems in a live sandbox environment. Talk to <strong className="text-white/80">Abdul the AI Accountant</strong>, trigger real expense reconciliation, and see how our integrations work first-hand.
            </p>
          </div>

          <div className="shrink-0">
            <a
              ref={aiConsoleRef as any}
              href="https://mars-ai-web.onrender.com/start"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn inline-flex h-14 items-center justify-center rounded-2xl bg-white px-8 text-sm font-semibold text-black shadow-xl hover:shadow-white/5 group gap-2"
            >
              <span>Access AI Console</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* 2. Sector-Specific Case Studies */}
        <div className="space-y-12">
          <div className="text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
              Industry Impact
            </p>
            <h2 className="text-4xl font-light leading-tight md:text-5xl">
              Sector-Specific <span className="font-semibold mars-text-gradient">Case Studies</span>
            </h2>
            <p className="text-xs text-white/45 mt-4">
              Select an industry below to see how our custom automation drives verified outcomes.
            </p>
          </div>

          {/* Tabs Selector */}
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto border border-white/5 bg-white/[0.02] p-1.5 rounded-2xl">
            {(["clinics", "gyms", "realestate", "saas"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSector(s)}
                className={`text-xs font-mono uppercase px-6 py-3 rounded-xl transition duration-300 flex items-center gap-2 cursor-pointer ${
                  sector === s
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{s === "realestate" ? "Real Estate" : s === "saas" ? "SaaS / Tech" : s}</span>
                {sector === s && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />}
              </button>
            ))}
          </div>

          {/* Case Details Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Left Side: Copy and Stats */}
            <div className="lg:col-span-7 flex">
              <BorderLaserCard className="p-6 sm:p-10 bg-black/40 flex-1 flex flex-col justify-between" borderRadius={24}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 gap-4 flex-wrap">
                    <h4 className="text-lg font-semibold text-white">
                      {study.title}
                    </h4>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold shrink-0 tnum tabular-nums">
                      {study.metric}
                    </span>
                  </div>
                  
                  <p className="text-sm leading-relaxed text-white/60">
                    {study.detail}
                  </p>

                  <div className="space-y-3">
                    <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Verified Outcomes</p>
                    <ul className="space-y-2 text-xs text-white/50">
                      {study.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span className="tnum tabular-nums">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 mt-8">
                  <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase block mb-1">
                    Representative Testimony
                  </span>
                  <p className="text-xs italic leading-relaxed text-white/70">
                    &ldquo;{study.quote}&rdquo;
                  </p>
                  <p className="text-[9.5px] font-mono text-white/40 mt-2">
                    — {study.rep}
                  </p>
                </div>
              </BorderLaserCard>
            </div>

            {/* Right Side: Media / Graphics Container Placeholder */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <MediaContainer
                aspectRatio="4:5"
                src={study.placeholder}
                type="image"
                title={`${study.title} Operations`}
                overlayText={`High-fidelity visualization map showing data automation pathways for the ${study.title.toLowerCase()} vertical.`}
              />
              <div key={sector} className="px-2 text-left space-y-1 animate-fade-in">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                  {study.title} Pipeline Preview
                </span>
                <p className="text-xs text-white/55 leading-relaxed">
                  High-fidelity visualization map showing data automation pathways for the {study.title.toLowerCase()} vertical.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

const SERVICE_MEDIA_DETAILS = [
  { 
    title: "Intelligent Automation (IA)", 
    description: "Visual representation of active CRM workflows, database connections, and n8n webhook routing pipelines.",
    placeholder: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tag: "IA_CORE // PROTO_01",
    pillars: [
      "n8n, Zapier & custom node bridges",
      "REST, GraphQL & Webhook API routing",
      "Automatic lead sync & retries",
      "DPDP isolated secure databases"
    ]
  },
  { 
    title: "Web Development & SEO", 
    description: "Sleek preview of responsive, speed-optimized storefronts scoring 99+ on Google Lighthouse diagnostics.",
    placeholder: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    tag: "DEV_CORE // SPEED_TEST",
    pillars: [
      "React, Next.js & Tailwind CSS",
      "Edge-Cached ISR Serverless setups",
      "Schema.org & Structured JSON-LD",
      "100/100 Core Web Vitals standard"
    ]
  },
  { 
    title: "AI Filmmaking & VFX", 
    description: "Cinematic commercial reel showcase featuring synthetic casting, AI voiceovers, and premium visual editing.",
    placeholder: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    tag: "VFX_CORE // GEN_MEDIA",
    pillars: [
      "DaVinci Resolve & Unreal Engine 5",
      "ElevenLabs voice synthesis API",
      "Dynamic 3D tracking & mockups",
      "Cinematic commercial grading"
    ]
  },
  { 
    title: "Strategic Consultancy", 
    description: "Interactive operational scaling map highlighting funnel optimizations and verified client ROI growth.",
    placeholder: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    tag: "OPS_CORE // STRAT_MAP",
    pillars: [
      "Funnel & tech stack audits",
      "Hands-on codebase integrations",
      "Daily communication & updates",
      "Quantitative ROI scaling maps"
    ]
  }
];

export default function Index() {
  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const sphereRef = useRef<Group | null>(null);
  const morphProgressRef = useRef(0);
  const explodeProgressRef = useRef(0);
  const bookCallRef = useMagnetic(0.35, 100);

  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", need: "Automation", message: "" });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Redesign state variables
  const [activeDossier, setActiveDossier] = useState(0);
  const [hoveredService, setHoveredService] = useState(0);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);
  const [diagnosticPercent, setDiagnosticPercent] = useState(0);
  const [diagnosticDone, setDiagnosticDone] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [activePhilosophy, setActivePhilosophy] = useState(0);

  const handleWorkflowScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.min(3, Math.max(0, Math.round(container.scrollLeft / (container.scrollWidth / 4))));
    setActiveWorkflow(index);
  };

  const handlePhilosophyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.min(2, Math.max(0, Math.round(container.scrollLeft / (container.scrollWidth / 3))));
    setActivePhilosophy(index);
  };

  useEffect(() => {
    const heroEl = document.getElementById("home");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSwiperScroll = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Filter out style elements and spacer containers using snap-center class
    const cards = Array.from(swiper.children).filter(
      (child) => child.classList.contains("snap-center")
    );
    if (cards.length === 0) return;

    const swiperCenter = swiper.getBoundingClientRect().left + swiper.clientWidth / 2;
    let closestIndex = -1;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - swiperCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex >= 0 && closestIndex < 4 && closestIndex !== hoveredService) {
      setHoveredService(closestIndex);
    }
  };

  const scrollToCard = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const cards = Array.from(swiper.children).filter(
      (child) => child.classList.contains("snap-center")
    );
    const card = cards[index] as HTMLElement;
    if (card) {
      const containerWidth = swiper.clientWidth;
      const cardOffsetLeft = card.offsetLeft;
      const cardWidth = card.clientWidth;
      const targetScrollLeft = cardOffsetLeft - (containerWidth - cardWidth) / 2;

      swiper.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
      setHoveredService(index);
    }
  };

  useEffect(() => {
    const diag = [
      "ESTABLISHING SECURE PROTOCOL LINK...",
      "CHECKING GATEWAY ROUTERS... ONLINE",
      "MONITORING ENCRYPTED SOCKETS: SECURE",
      "DIAGNOSTIC STATUS: READY_FOR_LOGS"
    ];
    let current = 0;
    const interval = setInterval(() => {
      if (current < diag.length) {
        setDiagnosticLogs(prev => [...prev, diag[current]]);
        setDiagnosticPercent(Math.floor(((current + 1) / diag.length) * 100));
        current++;
      } else {
        setDiagnosticDone(true);
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const handleDecryptDossier = (idx: number) => {
    setIsDecrypting(true);
    setActiveDossier(idx);
    setTimeout(() => {
      setIsDecrypting(false);
    }, 850);
  };

  useEffect(() => {
    let frameId = 0;
    let timeline: gsap.core.Timeline | null = null;

    const setupScrollAnimation = () => {
      const sphere = sphereRef.current;
      const trigger = scrollRootRef.current;

      if (!sphere || !trigger) {
        frameId = requestAnimationFrame(setupScrollAnimation);
        return;
      }

      ScrollTrigger.config({ limitCallbacks: true });

      const isMobileDevice = window.innerWidth < 768;
      const sphereScale = isMobileDevice ? 0.62 : 1.0;

      gsap.set(sphere.position, { x: 0, y: isMobileDevice ? 0.5 : 0, z: 0 });
      gsap.set(sphere.scale, { x: sphereScale, y: sphereScale, z: sphereScale });
      gsap.set(sphere.rotation, { x: 0, y: 0, z: 0 });

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top",
          end: isMobileDevice ? "+=120%" : "+=180%",
          scrub: isMobileDevice ? 0.5 : 1.2,
          fastScrollEnd: true,
          onUpdate: (self) => {
            explodeProgressRef.current = self.progress;
          }
        },
      });

      // Spin the sphere and move it downward on scroll before it blasts
      timeline
        .to(sphere.rotation, { y: Math.PI * 2.5, x: Math.PI * 0.6, ease: "none" }, 0)
        .to(sphere.position, { y: isMobileDevice ? -2.2 : -2.8, ease: "power1.out" }, 0);

      ScrollTrigger.refresh();
    };

    frameId = requestAnimationFrame(setupScrollAnimation);

    return () => {
      cancelAnimationFrame(frameId);
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
    };
  }, []);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setIsTransmitting(true);
    setTerminalLogs([]);
    setIsCompleted(false);

    // Send functional email in parallel with terminal logs
    fetch("https://formsubmit.co/ajax/mars.iqsystem@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `New Inquiry from MARS Homepage: ${form.name}`,
        name: form.name,
        email: form.email,
        need: form.need,
        message: form.message
      })
    })
    .then(res => res.json())
    .then(data => console.log("Email transmission completed:", data))
    .catch(err => console.error("Email transmission failed:", err));

    const logs = [
      "INITIALIZING DATA PACKET UPLOAD...",
      "RESOLVING SERVER DOMAIN: MARS_SECURE_TUNNEL...",
      "ENCRYPTING PAYLOAD WITH QUANTUM HASH...",
      `ISOLATING TENANT SCOPES (CLIENT: ${form.name.toUpperCase()})...`,
      "STAGING INQUIRY META CHANNELS...",
      `ROUTING TO KOLKATA HEADQUARTERS VIA GATEWAY...`,
      "TRANSMISSION COMPLETE. STATUS: 200 OK."
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logs.length) {
        setTerminalLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${logs[currentLogIdx]}`]);
        currentLogIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsTransmitting(false);
          setIsCompleted(true);
        }, 800);
      }
    }, 450);
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />

      <div 
        className="pointer-events-none fixed inset-0 z-[-1] h-screen w-screen"
        style={{ display: isHeroVisible ? "block" : "none" }}
      >
        <Suspense fallback={null}>
          <HeroCanvas sphereRef={sphereRef} morphProgressRef={morphProgressRef} explodeProgressRef={explodeProgressRef} />
        </Suspense>
      </div>

      <Navbar />

      <main ref={scrollRootRef} className="relative z-10">
        
        {/* REDESIGNED: Premium B2B Hero */}
        <section
          id="home"
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-[hsl(0_0%_96%)] premium-blueprint-grid"
        >
          {/* Ambient Grid overlay and premium lighting */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Corporate Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] sm:text-xs text-white/60 w-fit mb-8 backdrop-blur-md max-w-full text-center leading-normal break-words">
              <Sparkles className="h-3.5 w-3.5 text-white/80 animate-pulse shrink-0" />
              Embedded Growth & Systems Automation Studio
            </div>
            
            <h1 className="text-balance text-4xl sm:text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
              <WordReveal text="Stop Managing." />
              <br />
              <MetallicText text="Start Scaling." className="text-4xl sm:text-5xl md:text-7xl mt-2 sm:mt-3 inline-block" />
            </h1>
            
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-white/55 md:text-lg">
              From market analysis to deep API operations, we engineer custom digital infrastructure that runs and scales your enterprise autonomously.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 px-6 sm:px-0 w-full sm:w-auto">
              <a
                ref={bookCallRef as any}
                href="#contact"
                className="magnetic-btn inline-flex h-12 items-center justify-center rounded-2xl bg-white px-8 text-sm font-semibold text-black shadow-lg shadow-white/10"
              >
                Book a Discovery Call
              </a>
              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md px-8 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
              >
                Explore Solutions
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/30 flex flex-col items-center gap-2 select-none animate-bounce">
            Scroll To Explore
          </div>
        </section>

        {/* Scroll-scrubbed video showcase */}
        <Suspense fallback={null}>
          <Hero3DZoom />
        </Suspense>

        {/* REDESIGNED: Bento Grid Active Verticals */}
        <section
          id="services"
          className="relative flex flex-col items-center justify-center px-6 pt-32 md:pt-40 pb-24 text-[hsl(0_0%_96%)] premium-blueprint-grid"
        >
          <div className="relative z-10 mx-auto max-w-6xl w-full flex flex-col gap-16">
            
            {/* Centered Heading */}
            <div className="text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
                Active Verticals
              </p>
              <h2 className="text-3xl sm:text-4xl font-light leading-tight md:text-5xl">
                <WordReveal text="Systems that" /> <MetallicText text="do the work." />
              </h2>
              <p className="text-xs text-white/45 mt-2">
                {isMobile ? "Swipe horizontally to cycle through active cores." : "Hover to preview outcomes."}
              </p>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start w-full">
              {/* Column 1: Premium Media Visualizer */}
              <div className="hidden md:flex flex-col justify-start min-h-[480px] w-full px-6 space-y-6">
                <div className="space-y-3">
                  <MediaContainer
                    aspectRatio="16:9"
                    src={SERVICE_MEDIA_DETAILS[hoveredService].placeholder}
                    type="image"
                    title={SERVICE_MEDIA_DETAILS[hoveredService].title}
                    overlayText={SERVICE_MEDIA_DETAILS[hoveredService].description}
                    showPlayIcon={hoveredService === 2}
                  />
                  <div key={hoveredService} className="px-2 text-left space-y-1 animate-fade-in">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                      {SERVICE_MEDIA_DETAILS[hoveredService].title} Preview
                    </span>
                    <p className="text-xs text-white/55 leading-relaxed">
                      {SERVICE_MEDIA_DETAILS[hoveredService].description}
                    </p>
                  </div>
                </div>
                
                {/* Dynamic Details Specification Block */}
                <div className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl space-y-4 text-left font-mono animate-fade-in relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[10px] text-white/40 tracking-widest uppercase">System Specifications</span>
                    <span className="text-[9px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      {SERVICE_MEDIA_DETAILS[hoveredService].tag}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1">
                    {SERVICE_MEDIA_DETAILS[hoveredService].pillars.map((pillar, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-none bg-emerald-400 shrink-0 mt-1.5 animate-pulse" />
                        <span className="text-[10px] text-white/70 leading-normal">{pillar}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 2: Right column contains Bento Grid / Swiper */}
              <div className="mx-auto max-w-2xl lg:max-w-3xl text-left w-full flex flex-col gap-8 min-w-0">
                {/* Mobile HUD display */}
                {isMobile && (
                  <div className="flex md:hidden flex-col items-center justify-center gap-3 py-2 w-full px-4">
                    <MediaContainer
                      aspectRatio="16:9"
                      src={SERVICE_MEDIA_DETAILS[hoveredService].placeholder}
                      type="image"
                      title={SERVICE_MEDIA_DETAILS[hoveredService].title}
                      overlayText={SERVICE_MEDIA_DETAILS[hoveredService].description}
                      showPlayIcon={hoveredService === 2}
                    />
                    <div key={hoveredService} className="text-center space-y-1 max-w-sm animate-fade-in">
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block">
                        {SERVICE_MEDIA_DETAILS[hoveredService].title} Preview
                      </span>
                      <p className="text-[10px] text-white/55 leading-relaxed">
                        {SERVICE_MEDIA_DETAILS[hoveredService].description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Bento Grid / Swiper */}
                {isMobile ? (
                  <div className="w-full flex flex-col gap-6 max-w-full overflow-hidden">
                    {/* Horizontal Swiper Deck wrapper that clips outer horizontal overflow */}
                    <div className="w-full overflow-hidden py-4">
                      <div 
                        ref={swiperRef}
                        onScroll={handleSwiperScroll}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 w-[calc(100%+3rem)] -mx-6 px-6 no-scrollbar"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <style dangerouslySetInnerHTML={{__html: `
                          .no-scrollbar::-webkit-scrollbar {
                            display: none;
                          }
                        `}} />

                        {/* Left spacer to center first card */}
                        <div className="w-[8vw] shrink-0 pointer-events-none" />

                        {/* Vertical 1: Automation */}
                        <Link
                          to="/services/automation"
                          className={`w-[84vw] shrink-0 snap-center transition-all duration-500 ease-out origin-center gpu-accelerate block ${
                            hoveredService === 0 
                              ? "scale-100 opacity-100 shadow-[0_0_25px_rgba(255,255,255,0.12)]" 
                              : "scale-[0.85] opacity-40 blur-[0.3px]"
                          }`}
                        >
                          <BorderLaserCard className="p-4 sm:p-5 flex flex-col justify-between bg-black/40 min-h-[230px] h-full" borderRadius={isMobile ? 0 : 20} duration={6}>
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <div className="h-9 w-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center">
                                  <Cpu className="h-4.5 w-4.5 text-white/80" />
                                </div>
                                <span className="text-[8px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-none font-semibold font-mono">
                                  CORE_SYS
                                </span>
                              </div>
                              <h3 className="text-base font-semibold text-white mb-2">01. Automation (IA)</h3>
                              <p className="text-[11px] text-white/50 leading-relaxed">
                                Custom voice agents, support chatbots, automated CRMs, and system integrations built to save 100+ manual hours.
                              </p>
                            </div>
                            {/* Outcome list */}
                            <div className="mt-4 space-y-1 text-[9px] text-white/50 font-mono border-t border-white/5 pt-3">
                              <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> <span>Autonomous lead scheduling</span></div>
                              <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> <span>Seamless CRM data sync</span></div>
                            </div>
                          </BorderLaserCard>
                        </Link>

                        {/* Vertical 2: Web Dev */}
                        <Link
                          to="/services/web-dev"
                          className={`w-[84vw] shrink-0 snap-center transition-all duration-500 ease-out origin-center gpu-accelerate block ${
                            hoveredService === 1 
                              ? "scale-100 opacity-100 shadow-[0_0_25px_rgba(255,255,255,0.12)]" 
                              : "scale-[0.85] opacity-40 blur-[0.3px]"
                          }`}
                        >
                          <BorderLaserCard className="p-4 sm:p-5 flex flex-col justify-between bg-black/40 min-h-[230px] h-full" borderRadius={isMobile ? 0 : 20} duration={7}>
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <div className="h-9 w-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center">
                                  <Globe className="h-4.5 w-4.5 text-white/80" />
                                </div>
                                <span className="text-[8px] uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-none font-semibold font-mono">
                                  DEV_OPS
                                </span>
                              </div>
                              <h3 className="text-base font-semibold text-white mb-2">02. Web Dev & SEO</h3>
                              <p className="text-[11px] text-white/50 leading-relaxed">
                                High-speed storefronts and responsive platforms optimized for search engines and maximum user conversion.
                              </p>
                            </div>
                            {/* Outcome list */}
                            <div className="mt-4 space-y-1 text-[9px] text-white/50 font-mono border-t border-white/5 pt-3">
                              <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> <span>Perfect Lighthouse performance</span></div>
                              <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> <span>Search engine crawling ready</span></div>
                            </div>
                          </BorderLaserCard>
                        </Link>

                        {/* Vertical 3: Filmmaking */}
                        <Link
                          to="/services/filmmaking"
                          className={`w-[84vw] shrink-0 snap-center transition-all duration-500 ease-out origin-center gpu-accelerate block ${
                            hoveredService === 2 
                              ? "scale-100 opacity-100 shadow-[0_0_25px_rgba(255,255,255,0.12)]" 
                              : "scale-[0.85] opacity-40 blur-[0.3px]"
                          }`}
                        >
                          <BorderLaserCard className="p-4 sm:p-5 flex flex-col justify-between bg-black/40 min-h-[230px] h-full" borderRadius={isMobile ? 0 : 20} duration={5}>
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <div className="h-9 w-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center">
                                  <Video className="h-4.5 w-4.5 text-white/80" />
                                </div>
                                <span className="text-[8px] uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-none font-semibold font-mono">
                                  GEN_VFX
                                </span>
                              </div>
                              <h3 className="text-base font-semibold text-white mb-2">03. AI Film & VFX</h3>
                              <p className="text-[11px] text-white/50 leading-relaxed">
                                Cinematic video commercials and media generation with high-fidelity speech synthesis and casting.
                              </p>
                            </div>
                            {/* Outcome list */}
                            <div className="mt-4 space-y-1 text-[9px] text-white/50 font-mono border-t border-white/5 pt-3">
                              <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> <span>Professional casting & VO</span></div>
                              <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> <span>4K cinematic commercial exports</span></div>
                            </div>
                          </BorderLaserCard>
                        </Link>

                        {/* Vertical 4: Consulting */}
                        <Link
                          to="/services/consulting"
                          className={`w-[84vw] shrink-0 snap-center transition-all duration-500 ease-out origin-center gpu-accelerate block ${
                            hoveredService === 3 
                              ? "scale-100 opacity-100 shadow-[0_0_25px_rgba(255,255,255,0.12)]" 
                              : "scale-[0.85] opacity-40 blur-[0.3px]"
                          }`}
                        >
                          <BorderLaserCard className="p-4 sm:p-5 flex flex-col justify-between bg-black/40 min-h-[230px] h-full" borderRadius={isMobile ? 0 : 20} duration={8}>
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <div className="h-9 w-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center">
                                  <Briefcase className="h-4.5 w-4.5 text-white/80" />
                                </div>
                                <span className="text-[8px] uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-none font-semibold font-mono">
                                  STRAT_OPS
                                </span>
                              </div>
                              <h3 className="text-base font-semibold text-white mb-2">04. Strategic Consulting</h3>
                              <p className="text-[11px] text-white/50 leading-relaxed">
                                Direct operational audits and hands-on scaling to align product architectures and team workflows.
                              </p>
                            </div>
                            {/* Outcome list */}
                            <div className="mt-4 space-y-1 text-[9px] text-white/50 font-mono border-t border-white/5 pt-3">
                              <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> <span>Detailed operational audits</span></div>
                              <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> <span>Verified 4.2x scaling impact</span></div>
                            </div>
                          </BorderLaserCard>
                        </Link>

                        {/* Right spacer to center last card */}
                        <div className="w-[8vw] shrink-0 pointer-events-none" />
                      </div>
                    </div>

                    {/* Pagination Indicators */}
                    <div className="flex justify-center gap-2 mt-2 select-none">
                      {[0, 1, 2, 3].map((index) => (
                        <button
                          key={index}
                          onClick={() => {
                            scrollToCard(index);
                          }}
                          className={`h-1 rounded-none transition-all duration-300 ${
                            hoveredService === index
                              ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                              : "w-2.5 bg-white/20"
                          }`}
                          aria-label={`Go to service ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    {/* Vertical 1: Automation */}
                    <Link to="/services/automation" onMouseEnter={() => setHoveredService(0)} className="w-full h-full block cursor-pointer">
                      <BorderLaserCard className="p-6 flex flex-col justify-between bg-black/40 min-h-[220px] h-full" borderRadius={20} duration={6}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                              <Cpu className="h-4.5 w-4.5 text-white/80" />
                            </div>
                            <span className="text-[8px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold font-mono">
                              CORE_SYS
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-white mb-2">01. Automation (IA)</h3>
                          <p className="text-[11px] text-white/50 leading-relaxed">
                            Custom voice agents, support chatbots, automated CRMs, and system integrations built to save 100+ manual hours.
                          </p>
                        </div>
                        {/* Outcome list */}
                        <div className="mt-4 space-y-2 border-t border-white/5 pt-4 text-[10px] text-white/50 font-mono">
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> <span>Autonomous lead scheduling</span></div>
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> <span>Seamless CRM data sync</span></div>
                        </div>
                      </BorderLaserCard>
                    </Link>

                    {/* Vertical 2: Web Dev */}
                    <Link to="/services/web-dev" onMouseEnter={() => setHoveredService(1)} className="w-full h-full block cursor-pointer">
                      <BorderLaserCard className="p-6 flex flex-col justify-between bg-black/40 min-h-[220px] h-full" borderRadius={20} duration={7}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                              <Globe className="h-4.5 w-4.5 text-white/80" />
                            </div>
                            <span className="text-[8px] uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full font-semibold font-mono">
                              DEV_OPS
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-white mb-2">02. Web Dev & SEO</h3>
                          <p className="text-[11px] text-white/50 leading-relaxed">
                            High-speed storefronts and responsive platforms optimized for search engines and maximum user conversion.
                          </p>
                        </div>
                        {/* Outcome list */}
                        <div className="mt-4 space-y-2 border-t border-white/5 pt-4 text-[10px] text-white/50 font-mono">
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> <span>Perfect Lighthouse performance</span></div>
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> <span>Search engine crawling ready</span></div>
                        </div>
                      </BorderLaserCard>
                    </Link>

                    {/* Vertical 3: Filmmaking */}
                    <Link to="/services/filmmaking" onMouseEnter={() => setHoveredService(2)} className="w-full h-full block cursor-pointer">
                      <BorderLaserCard className="p-6 flex flex-col justify-between bg-black/40 min-h-[220px] h-full" borderRadius={20} duration={5}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                              <Video className="h-4.5 w-4.5 text-white/80" />
                            </div>
                            <span className="text-[8px] uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full font-semibold font-mono">
                              GEN_VFX
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-white mb-2">03. AI Film & VFX</h3>
                          <p className="text-[11px] text-white/50 leading-relaxed">
                            Cinematic video commercials and media generation with high-fidelity speech synthesis and casting.
                          </p>
                        </div>
                        {/* Outcome list */}
                        <div className="mt-4 space-y-2 border-t border-white/5 pt-4 text-[10px] text-white/50 font-mono">
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> <span>Professional casting & VO</span></div>
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> <span>4K cinematic commercial exports</span></div>
                        </div>
                      </BorderLaserCard>
                    </Link>

                    {/* Vertical 4: Consulting */}
                    <Link to="/services/consulting" onMouseEnter={() => setHoveredService(3)} className="w-full h-full block cursor-pointer">
                      <BorderLaserCard className="p-6 flex flex-col justify-between bg-black/40 min-h-[220px] h-full" borderRadius={20} duration={8}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                              <Briefcase className="h-4.5 w-4.5 text-white/80" />
                            </div>
                            <span className="text-[8px] uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-semibold font-mono">
                              STRAT_OPS
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-white mb-2">04. Strategic Consulting</h3>
                          <p className="text-[11px] text-white/50 leading-relaxed">
                            Direct operational audits and hands-on scaling to align product architectures and team workflows.
                          </p>
                        </div>
                        {/* Outcome list */}
                        <div className="mt-4 space-y-2 border-t border-white/5 pt-4 text-[10px] text-white/50 font-mono">
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> <span>Detailed operational audits</span></div>
                          <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> <span>Verified 4.2x scaling impact</span></div>
                        </div>
                      </BorderLaserCard>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTION: Apple-Style Bento Linear Workflow */}
        <section
          id="workflow"
          className="relative flex flex-col items-center justify-center px-6 pt-32 md:pt-40 pb-24 text-[hsl(0_0%_96%)] border-t border-white/5 premium-blueprint-grid"
        >
          {/* Ambient background glows */}
          <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-6xl w-full">
            <div className="text-center mb-16">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
                Operations Workflow
              </p>
              <h2 className="text-3xl sm:text-4xl font-light leading-tight md:text-5xl">
                The <span className="font-semibold mars-text-gradient">Autonomous Pipeline</span>
              </h2>
              <p className="text-xs text-white/40 mt-2">
                Four clear phases of digital agency automation running seamlessly and continuously.
              </p>
            </div>

            {/* Workflow steps container */}
            {isMobile ? (
              <div className="w-full overflow-hidden py-4 select-none">
                <div 
                  onScroll={handleWorkflowScroll}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 w-[calc(100%+3rem)] -mx-6 px-6 no-scrollbar"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {/* Step 1 */}
                  <Link
                    to="/services/market-analysis"
                    className="w-[82vw] shrink-0 snap-center mars-glass-card rounded-[24px] p-6 border border-white/5 bg-white/[0.01] flex flex-col justify-between group relative overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                        <Database className="h-5 w-5 text-white/90" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-emerald-400/70 block mb-1">PHASE_01</span>
                      <h3 className="text-lg font-medium text-white mb-3">Data Scraping</h3>
                      <p className="text-xs text-white/55 leading-relaxed font-sans">
                        Automated scouts harvest verified leads from target registers, maps, and enterprise profiles based on your sector parameters.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/30">
                      <span>INPUT: CRITERIA</span>
                      <span>STATUS: ACTIVE</span>
                    </div>
                  </Link>

                  {/* Step 2 */}
                  <Link
                    to="/services/market-analysis"
                    className="w-[82vw] shrink-0 snap-center mars-glass-card rounded-[24px] p-6 border border-white/5 bg-white/[0.01] flex flex-col justify-between group relative overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                        <ShieldCheck className="h-5 w-5 text-white/90" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-emerald-400/70 block mb-1">PHASE_02</span>
                      <h3 className="text-lg font-medium text-white mb-3">Lead Verification</h3>
                      <p className="text-xs text-white/55 leading-relaxed font-sans">
                        Raw registry profiles undergo live HLR pings and email SMTP handshake validations to purge dead coordinates.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/30">
                      <span>INPUT: SCRAPED</span>
                      <span>STATUS: VERIFYING</span>
                    </div>
                  </Link>

                  {/* Step 3 */}
                  <Link
                    to="/services/lead-gen"
                    className="w-[82vw] shrink-0 snap-center mars-glass-card rounded-[24px] p-6 border border-white/5 bg-white/[0.01] flex flex-col justify-between group relative overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                        <Phone className="h-5 w-5 text-white/90" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-emerald-400/70 block mb-1">PHASE_03</span>
                      <h3 className="text-lg font-medium text-white mb-3">AI Voice Outreach</h3>
                      <p className="text-xs text-white/55 leading-relaxed font-sans">
                        Flagship autonomous voice systems dial validated prospects, hold conversations, handle objections, and qualify bookings.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/30">
                      <span>INPUT: VERIFIED</span>
                      <span>STATUS: DIALING</span>
                    </div>
                  </Link>

                  {/* Step 4 */}
                  <Link
                    to="/services/automation"
                    className="w-[82vw] shrink-0 snap-center mars-glass-card rounded-[24px] p-6 border border-white/5 bg-white/[0.01] flex flex-col justify-between group relative overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                        <Send className="h-5 w-5 text-white/90" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-emerald-400/70 block mb-1">PHASE_04</span>
                      <h3 className="text-lg font-medium text-white mb-3">CRM Sync</h3>
                      <p className="text-xs text-white/55 leading-relaxed font-sans">
                        Qualified outcomes and calendar slots are synced directly to your database, updating team pipelines in real-time.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/30">
                      <span>INPUT: QUALIFIED</span>
                      <span>STATUS: SYNCED</span>
                    </div>
                  </Link>
                </div>
                {/* Pagination Indicators */}
                <div className="flex justify-center gap-2 mt-2 select-none">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-none transition-all duration-300 ${
                        activeWorkflow === index
                          ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                          : "w-2.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative items-stretch">
                {/* Step 1 */}
                <Link
                  to="/services/market-analysis"
                  className="mars-glass-card rounded-[24px] p-6 border border-white/5 bg-white/[0.01] flex flex-col justify-between group relative overflow-hidden transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:border-white/10 hover:shadow-[0_0_20px_rgba(52,211,153,0.05)]"
                >
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-white/20 group-hover:text-emerald-400/80 transition-colors duration-300">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all duration-300">
                      <Database className="h-5 w-5 text-white/90 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-emerald-400/70 block mb-1">PHASE_01</span>
                    <h3 className="text-lg font-medium text-white mb-3">Data Scraping</h3>
                    <p className="text-xs text-white/55 leading-relaxed font-sans">
                      Automated scouts harvest verified leads from target registers, maps, and enterprise profiles based on your sector parameters.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/30">
                    <span>INPUT: CRITERIA</span>
                    <span>STATUS: ACTIVE</span>
                  </div>
                </Link>

                {/* Step 2 */}
                <Link
                  to="/services/market-analysis"
                  className="mars-glass-card rounded-[24px] p-6 border border-white/5 bg-white/[0.01] flex flex-col justify-between group relative overflow-hidden transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:border-white/10 hover:shadow-[0_0_20px_rgba(52,211,153,0.05)]"
                >
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-white/20 group-hover:text-emerald-400/80 transition-colors duration-300">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all duration-300">
                      <ShieldCheck className="h-5 w-5 text-white/90 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-emerald-400/70 block mb-1">PHASE_02</span>
                    <h3 className="text-lg font-medium text-white mb-3">Verification</h3>
                    <p className="text-xs text-white/55 leading-relaxed font-sans">
                      AI verification engines run sandbox validation calls, filter spam honeypots, and confirm DPDP data protection alignment.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/30">
                    <span>INPUT: HARVESTED</span>
                    <span>STATUS: SECURE</span>
                  </div>
                </Link>

                {/* Step 3 */}
                <Link
                  to="/services/lead-gen"
                  className="mars-glass-card rounded-[24px] p-6 border border-white/5 bg-white/[0.01] flex flex-col justify-between group relative overflow-hidden transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:border-white/10 hover:shadow-[0_0_20px_rgba(52,211,153,0.05)]"
                >
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-white/20 group-hover:text-emerald-400/80 transition-colors duration-300">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all duration-300">
                      <Phone className="h-5 w-5 text-white/90 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-emerald-400/70 block mb-1">PHASE_03</span>
                    <h3 className="text-lg font-medium text-white mb-3">AI Voice Outreach</h3>
                    <p className="text-xs text-white/55 leading-relaxed font-sans">
                      Flagship autonomous voice systems dial validated prospects, hold conversations, handle objections, and qualify bookings.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/30">
                    <span>INPUT: VERIFIED</span>
                    <span>STATUS: DIALING</span>
                  </div>
                </Link>

                {/* Step 4 */}
                <Link
                  to="/services/automation"
                  className="mars-glass-card rounded-[24px] p-6 border border-white/5 bg-white/[0.01] flex flex-col justify-between group relative overflow-hidden transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:border-white/10 hover:shadow-[0_0_20px_rgba(52,211,153,0.05)]"
                >
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all duration-300">
                      <Send className="h-5 w-5 text-white/90 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-emerald-400/70 block mb-1">PHASE_04</span>
                    <h3 className="text-lg font-medium text-white mb-3">CRM Sync</h3>
                    <p className="text-xs text-white/55 leading-relaxed font-sans">
                      Qualified outcomes and calendar slots are synced directly to your database, updating team pipelines in real-time.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/30">
                    <span>INPUT: QUALIFIED</span>
                    <span>STATUS: SYNCED</span>
                  </div>
                </Link>
              </div>
            )}

          </div>
        </section>

        {/* NEW SECTION: Market Telemetry Console */}
        <MarketTelemetryConsole />

        {/* REDESIGNED: Glassmorphic About Bento Row */}
        <section
          id="about"
          className="relative flex flex-col min-h-screen items-center justify-center px-6 pt-32 md:pt-40 pb-24 text-[hsl(0_0%_96%)] border-t border-white/5 premium-blueprint-grid"
        >
          <div className="mx-auto max-w-6xl w-full">
            <div className="text-center mb-16">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
                Philosophy
              </p>
              <h2 className="text-3xl sm:text-4xl font-light leading-tight md:text-5xl">
                <WordReveal text="A small studio." />{" "}
                <span className="inline-block"><WordReveal text="High signal." className="font-semibold mars-text-gradient" /></span>
              </h2>
              <p className="text-xs text-white/40 mt-2">Driven by practical execution, not recommendations.</p>
            </div>

            {/* Bento Row */}
            {isMobile ? (
              <div className="w-full overflow-hidden py-4 select-none">
                <div 
                  onScroll={handlePhilosophyScroll}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 w-[calc(100%+3rem)] -mx-6 px-6 no-scrollbar"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {/* Card 1 */}
                  <div className="w-[82vw] shrink-0 snap-center mars-glass-card rounded-[24px] p-6 border border-white/5 bg-white/[0.01]">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <ShieldCheck className="h-5 w-5 text-white/90" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3">Evidence-First & Ownership</h3>
                    <p className="text-xs text-white/55 leading-relaxed">
                      Every recommendation is backed by competitor audits and system diagnostics. We take full ownership of results, treating client enterprises as if they were our own.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="w-[82vw] shrink-0 snap-center mars-glass-card rounded-[24px] p-6 border border-white/5 bg-white/[0.01]">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <Zap className="h-5 w-5 text-white/90" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3">Futuristic Autonomous Goal</h3>
                    <p className="text-xs text-white/55 leading-relaxed">
                      We work toward a future where a CEO speaks a simple task aloud (e.g. &ldquo;Log statement results&rdquo;), and custom back-office systems complete the pipeline autonomously.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="w-[82vw] shrink-0 snap-center mars-glass-card rounded-[24px] p-6 border border-white/5 bg-white/[0.01]">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <Database className="h-5 w-5 text-white/90" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3">Rigid Compliance Gates</h3>
                    <p className="text-xs text-white/55 leading-relaxed">
                      India DPDP Act compliance guides our automation builds. We enforce data minimisation, secure API key vaults, and strict database tenant isolation rules.
                    </p>
                  </div>
                </div>
                {/* Pagination Indicators */}
                <div className="flex justify-center gap-2 mt-2 select-none">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-none transition-all duration-300 ${
                        activePhilosophy === index
                          ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                          : "w-2.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
                {/* Card 1 */}
                <div className="mars-glass-card rounded-[24px] p-5 sm:p-8 border border-white/5 bg-white/[0.01]">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <ShieldCheck className="h-5 w-5 text-white/90" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3">Evidence-First & Ownership</h3>
                  <p className="text-xs text-white/55 leading-relaxed">
                    Every recommendation is backed by competitor audits and system diagnostics. We take full ownership of results, treating client enterprises as if they were our own.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="mars-glass-card rounded-[24px] p-5 sm:p-8 border border-white/5 bg-white/[0.01]">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Zap className="h-5 w-5 text-white/90" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3">Futuristic Autonomous Goal</h3>
                  <p className="text-xs text-white/55 leading-relaxed">
                    We work toward a future where a CEO speaks a simple task aloud (e.g. &ldquo;Log statement results&rdquo;), and custom back-office systems complete the pipeline autonomously.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="mars-glass-card rounded-[24px] p-5 sm:p-8 border border-white/5 bg-white/[0.01]">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Database className="h-5 w-5 text-white/90" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3">Rigid Compliance Gates</h3>
                  <p className="text-xs text-white/55 leading-relaxed">
                    India DPDP Act compliance guides our automation builds. We enforce data minimisation, secure API key vaults, and strict database tenant isolation rules.
                  </p>
                </div>
              </div>
            )}

            {/* Decrypted Mainframe Testimonials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-16 pt-16 border-t border-white/5">
              <div className="lg:col-span-5 flex flex-col justify-center">
                <p className="mb-3 text-[10px] uppercase font-mono tracking-widest text-emerald-400">
                  DECRYPTION_PANEL_V2.0
                </p>
                <h3 className="text-2xl font-light tracking-tight text-white mb-4">
                  Decrypted <span className="font-semibold text-white/90">Dossiers</span>
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-6">
                  Select a secure client record block to decrypt actual representative outcome telemetry and satisfaction quotes.
                </p>

                <div className="flex overflow-x-auto gap-2.5 pb-4 max-w-full no-scrollbar snap-x snap-mandatory md:flex-col md:overflow-visible">
                  {DOSSIERS.map((dos, dIdx) => (
                    <button
                      key={dIdx}
                      onClick={() => handleDecryptDossier(dIdx)}
                      className={`h-11 px-4 rounded-xl font-mono text-[10px] tracking-wider text-left transition border flex items-center justify-between shrink-0 snap-center ${
                        activeDossier === dIdx
                          ? "bg-white text-black border-white font-semibold"
                          : "bg-white/5 text-white/70 border-white/5 hover:bg-white/10"
                      }`}
                    >
                      <span className="truncate">{dos.tag} // {dos.client}</span>
                      {isDecrypting && activeDossier === dIdx ? (
                        <span className="text-[9px] animate-pulse ml-2">DECRYPTING...</span>
                      ) : (
                        <span className="text-[9px] opacity-40 ml-2">DECRYPTED_OK</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 flex">
                <BorderLaserCard className="p-5 sm:p-8 bg-black/60 shadow-2xl backdrop-blur-2xl flex-1 flex flex-col justify-between" borderRadius={24}>
                  <div>
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-6">
                      <Terminal className="h-4 w-4 text-white/40" />
                      <span className="text-[10px] font-mono tracking-widest text-white/50">SECURE_CLIENT_DATA_OUTPUT</span>
                    </div>

                    {isDecrypting ? (
                      <div className="py-12 flex flex-col items-center justify-center gap-3 font-mono text-xs text-emerald-400">
                        <span className="h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <span className="animate-pulse tracking-widest">RUNNING DECRYPTION CYCLES...</span>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="font-mono text-[10px] text-white/40 flex justify-between">
                          <span>CLIENT: {DOSSIERS[activeDossier].client}</span>
                          <span>IMPACT: <span className="tnum tabular-nums">{DOSSIERS[activeDossier].stats}</span></span>
                        </div>
                        <blockquote className="text-sm italic leading-relaxed text-white/80">
                          &ldquo;{DOSSIERS[activeDossier].quote}&rdquo;
                        </blockquote>
                        <div className="border-t border-white/5 pt-4">
                          <p className="text-[10px] text-white/40 font-mono">REPRESENTATIVE: {DOSSIERS[activeDossier].rep}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-[9px] font-mono text-emerald-500/60 border-t border-white/5 pt-3 mt-6 flex justify-between">
                    <span>SECURITY_STAMP: PASS</span>
                    <span>SSH_ENCRYPTED: TRUE</span>
                  </div>
                </BorderLaserCard>
              </div>
            </div>
          </div>
        </section>

        {/* REDESIGNED: Interactive Inquiry Terminal Contact */}
        <section
          id="contact"
          className="relative flex min-h-screen items-center justify-center px-6 pt-32 md:pt-40 pb-24 text-[hsl(0_0%_96%)] border-t border-white/5 premium-blueprint-grid"
        >
          <div className="mx-auto max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Terminal Left */}
            <div className="md:col-span-5 flex flex-col justify-center">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
                Secure Channel
              </p>
              <h2 className="text-3xl font-light leading-tight md:text-5xl mb-6">
                <WordReveal text="Transmit" />{" "}
                <span className="inline-block"><WordReveal text="Query" className="font-semibold mars-text-gradient" /></span>
              </h2>
              <p className="text-xs text-white/50 leading-relaxed mb-6">
                Initiate a data transmission packet to link with our embedded strategic planners. Our response gate is typically active within one business day.
              </p>

              <div className="space-y-4 text-xs text-white/40">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-white/30" />
                  <span>mars.iqsystem@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Radio className="h-4 w-4 text-white/30 animate-pulse" />
                  <span>Kolkata HQ Active (24h Window)</span>
                </div>
              </div>
            </div>

            {/* Form Right (Interactive terminal) */}
            <div className="md:col-span-7 w-full">
              <BorderLaserCard className="p-4 sm:p-8 relative bg-black/60 shadow-2xl backdrop-blur-xl" borderRadius={24}>
                {!isCompleted ? (
                  <form onSubmit={handleTransmit} className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                      <Terminal className="h-4 w-4 text-white/50" />
                      <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">TRANSMISSION_INPUT_CONSOLE</span>
                    </div>

                    {!diagnosticDone ? (
                      <div className="space-y-3 font-mono text-[9.5px] text-white/50 bg-black/40 border border-white/5 rounded-xl p-4 min-h-[220px] flex flex-col justify-between select-none">
                        <div>
                          <div className="flex gap-2 items-center text-white/40 border-b border-white/5 pb-2 mb-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                            <span>RUNNING_CLIENT_DIAGNOSTICS_CHECKS...</span>
                          </div>
                          <div className="space-y-1.5">
                            {diagnosticLogs.map((log, dIdx) => (
                              <div key={dIdx} className="flex gap-2">
                                <span className="text-emerald-500">&gt;</span>
                                <span>{log}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-emerald-400">
                          <span>SYSTEM_LOAD: VALIDATING</span>
                          <span>{diagnosticPercent}%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-fade-in">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Client Name</label>
                          <input
                            type="text"
                            required
                            disabled={isTransmitting}
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="ENTER FULL NAME"
                            className="w-full h-11 px-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-none md:rounded-xl text-white outline-none transition disabled:opacity-50"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Email Coordinates</label>
                          <input
                            type="email"
                            required
                            disabled={isTransmitting}
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="ENTER EMAIL ADDRESS"
                            className="w-full h-11 px-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-none md:rounded-xl text-white outline-none transition disabled:opacity-50"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Enterprise Needs</label>
                          <select
                            disabled={isTransmitting}
                            value={form.need}
                            onChange={(e) => setForm({ ...form, need: e.target.value })}
                            className="w-full h-11 px-4 text-xs bg-white/5 border border-white/10 rounded-none md:rounded-xl text-white/80 outline-none hover:bg-white/10 focus:bg-white/10 transition disabled:opacity-50 appearance-none cursor-pointer"
                          >
                            <option value="Automation" className="bg-[#0A0A0A] text-white">Intelligent Automation Systems</option>
                            <option value="WebDev" className="bg-[#0A0A0A] text-white">Web Development & SEO</option>
                            <option value="Filmmaking" className="bg-[#0A0A0A] text-white">AI Filmmaking & VFX</option>
                            <option value="Consulting" className="bg-[#0A0A0A] text-white">Embedded Strategic Growth</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Operational Message</label>
                          <textarea
                            disabled={isTransmitting}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="ENTER DETAILS ON BOTTLE-NECKS OR PROJECT OBJECTIVES..."
                            className="w-full h-24 p-4 text-xs bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/25 rounded-none md:rounded-xl text-white outline-none resize-none transition disabled:opacity-50"
                          />
                        </div>

                        {isTransmitting ? (
                          <div className="space-y-2 border border-white/5 bg-black/40 rounded-none md:rounded-xl p-4 font-mono text-[9px] text-emerald-400">
                            {terminalLogs.map((log, lIdx) => (
                              <div key={lIdx} className="flex gap-2">
                                <span className="text-emerald-500 shrink-0">&gt;&gt;</span>
                                <span className="leading-relaxed">{log}</span>
                              </div>
                            ))}
                            <div className="flex gap-2 items-center text-emerald-300">
                              <span className="text-emerald-500 animate-pulse">&gt;&gt;</span>
                              <span className="animate-pulse">TRANSMITTING PACKETS...</span>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="submit"
                            className="w-full h-11 bg-white hover:bg-white/95 text-black font-semibold text-xs rounded-none md:rounded-xl flex items-center justify-center gap-2 transition hover:scale-[1.01]"
                          >
                            <Send className="h-3.5 w-3.5" />
                            TRANSMIT DATA PACKET
                          </button>
                        )}
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="text-center py-10 space-y-6 animate-fade-in select-none">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">Packet Transmission Successful</h4>
                      <p className="text-xs text-white/50 mt-2 max-w-sm mx-auto leading-relaxed">
                        Secure SSH tunnel closed. Your query logs have been compiled and routed directly to our embedded team coordinates.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCompleted(false)}
                      className="inline-flex h-9 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 px-5 text-xs text-white/80 transition"
                    >
                      Transmit New Log
                    </button>
                  </div>
                )}
              </BorderLaserCard>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
