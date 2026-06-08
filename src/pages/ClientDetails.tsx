import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import { CLIENTS_DATA } from "@/data/clients";
import { 
  ArrowLeft, ArrowRight, Cpu, Globe, Video, Briefcase, TrendingUp, 
  Database, Sparkles, Send, CheckCircle2, ShieldCheck, Zap,
  Server, Activity, Lock, Layers
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Log simulator component for live terminals
function TerminalLogs({ logs }: { logs: string[] }) {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayedLogs([]);
    if (!logs || logs.length === 0) return;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < logs.length) {
        setDisplayedLogs(prev => [...prev, logs[idx]]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [logs]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLogs]);

  return (
    <div 
      ref={containerRef}
      className="font-mono text-[9px] text-emerald-400/80 bg-[#090909]/90 p-4 border border-white/5 rounded-xl h-48 overflow-y-auto flex flex-col gap-1.5 w-full scrollbar-thin"
    >
      {displayedLogs.map((log, i) => (
        <div key={i} className="leading-relaxed break-all">
          <span className="text-emerald-500 mr-2">&gt;</span>
          {log}
        </div>
      ))}
      {displayedLogs.length < logs.length && (
        <div className="text-emerald-500/40 animate-pulse">&gt; STREAMING TELEMETRY DATA...</div>
      )}
    </div>
  );
}

// Icon helper mapping strings to elements
function ClientLogoIcon({ name }: { name: string }) {
  const props = { className: "h-6 w-6 text-white" };
  switch (name) {
    case "Globe": return <Globe {...props} />;
    case "Database": return <Database {...props} />;
    case "TrendingUp": return <TrendingUp {...props} />;
    case "Briefcase": return <Briefcase {...props} />;
    case "Send": return <Send {...props} />;
    case "Sparkles": return <Sparkles {...props} />;
    case "ShieldCheck": return <ShieldCheck {...props} />;
    case "Zap": return <Zap {...props} />;
    case "Cpu": return <Cpu {...props} />;
    case "Server": return <Server {...props} />;
    case "Activity": return <Activity {...props} />;
    case "Lock": return <Lock {...props} />;
    case "Layers": return <Layers {...props} />;
    default: return <Briefcase {...props} />;
  }
}

export default function ClientDetails() {
  const { clientId } = useParams();
  const client = clientId ? CLIENTS_DATA.find(c => c.id === clientId) : null;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!client) {
    return (
      <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground flex flex-col justify-between">
        <ParallaxBackground src="/nebula.jpg" />
        <Navbar />
        <main className="relative z-10 mx-auto max-w-7xl px-6 py-48 text-center flex-1 flex flex-col justify-center items-center">
          <h2 className="text-2xl text-white font-light mb-4">Client Dossier Coordinate Not Found</h2>
          <p className="text-xs text-white/50 mb-8 max-w-sm">The dossier index logs could not be resolved in our databases.</p>
          <Link to="/clients" className="inline-flex items-center gap-2 text-xs text-white/70 hover:text-white border border-white/10 rounded-full px-5 py-2 hover:bg-white/5 transition">
            <ArrowLeft className="h-4 w-4" />
            Back to Clients
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-36 md:pt-44 pb-32 md:px-10">
        
        {/* Back Link */}
        <Link to="/clients" className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white mb-12 transition">
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Link>

        {/* Header */}
        <div className="mx-auto max-w-4xl text-left mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-semibold font-mono">
            {client.sector}
          </span>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white mt-4 flex items-center gap-4 flex-wrap">
            <WordReveal text={client.clientName} />
          </h1>
          <p className="mt-4 text-xs text-white/45 font-mono">CLIENT_NODE: {client.id.toUpperCase()} // STATUS: ACTIVE_PARTNER</p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column - Core Info & Transformation (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Overview Card */}
            <BorderLaserCard className="p-5 sm:p-8 bg-black/40 backdrop-blur-xl" borderRadius={24}>
              <div className="flex gap-4 items-start mb-6">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <ClientLogoIcon name={client.dummyLogo} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-1">01_The Context</h3>
                  <h4 className="text-lg font-medium text-white mb-2">Partner Background</h4>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-light">{client.overview}</p>
            </BorderLaserCard>

            {/* The Transformation Journey Stack */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono ml-1">02_Transformation_Journey</h3>
              
              <div className="grid grid-cols-1 gap-6">
                {/* Problem */}
                <BorderLaserCard className="p-5 sm:p-6 bg-[#0D0D0D]/60 backdrop-blur-md" borderRadius={20}>
                  <h4 className="text-[10px] font-mono uppercase text-red-400 tracking-wider mb-2">01_The Problem (Operational Blocker)</h4>
                  <p className="text-xs text-white/70 leading-relaxed font-light">{client.details.problem}</p>
                </BorderLaserCard>

                {/* Goal */}
                <BorderLaserCard className="p-5 sm:p-6 bg-[#0D0D0D]/60 backdrop-blur-md" borderRadius={20}>
                  <h4 className="text-[10px] font-mono uppercase text-blue-400 tracking-wider mb-2">02_The Goal (Target Criteria)</h4>
                  <p className="text-xs text-white/70 leading-relaxed font-light">{client.details.goal}</p>
                </BorderLaserCard>

                {/* Outcome */}
                <BorderLaserCard className="p-5 sm:p-6 bg-[#0D0D0D]/60 backdrop-blur-md animate-crt-scan" borderRadius={20}>
                  <h4 className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider mb-2">03_What Changed (Outcome Metrics)</h4>
                  <p className="text-xs text-white/80 leading-relaxed font-light">{client.details.outcome}</p>
                </BorderLaserCard>
              </div>
            </div>

          </div>

          {/* Right Column - Metrics, Active Logs & Services (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Delivered Metrics Card */}
            <BorderLaserCard className="p-5 sm:p-8 bg-black/40 backdrop-blur-xl" borderRadius={24}>
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-6">
                <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-white/60 uppercase">DELIVERED_OUTCOME</span>
              </div>
              
              <div className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl p-6 font-mono text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">{client.deliveredMetric}</div>
                <div className="text-[7.5px] uppercase tracking-wider text-white/40 mt-2">Verified Result</div>
              </div>
            </BorderLaserCard>

            {/* Ingestion Telemetry Logs */}
            <BorderLaserCard className="p-5 bg-[#090909]/80 flex flex-col gap-4" borderRadius={24}>
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Cpu className="h-3.5 w-3.5 text-white/40" />
                <span className="text-[10px] font-mono tracking-widest text-white/50">ACTIVE_INTEGRATION_LOGS</span>
              </div>
              
              <TerminalLogs logs={client.telemetryLogs} />

              <div className="flex items-center gap-1.5 text-emerald-500 text-[8.5px] font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>MONITORING TUNNEL: SECURE</span>
              </div>
            </BorderLaserCard>

            {/* Services Rendered Card */}
            <BorderLaserCard className="p-5 sm:p-6 bg-black/40 backdrop-blur-md" borderRadius={20}>
              <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-4">03_Services_Rendered</h3>
              <div className="flex flex-col gap-2">
                {client.details.services.map((srv, sIdx) => (
                  <Link 
                    key={sIdx}
                    to={`/services/${srv.to}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 text-xs text-white/70 hover:text-white font-mono transition group"
                  >
                    <span>{srv.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-white/30 group-hover:text-emerald-400 transition group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </BorderLaserCard>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
