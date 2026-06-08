import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import { CLIENTS_DATA } from "@/data/clients";
import { 
  Send, Globe, TrendingUp, Database, Briefcase, 
  ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap,
  Cpu, Server, Activity, Lock, Layers
} from "lucide-react";

function ClientLogoIcon({ name }: { name: string }) {
  const props = { className: "h-6 w-6 text-emerald-400" };
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

export default function Clients() {
  const [isMobile, setIsMobile] = useState(false);

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
            Dossier Catalogue
          </p>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white flex flex-col items-center">
            <WordReveal text="Partner Networks &" />
            <MetallicText text="Client Dossiers" className="text-4xl md:text-6xl mt-2" />
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
            A comprehensive record of localized verification pipelines, active AI outreach agents, and secure database infrastructures deployed for high-growth enterprises.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-32">
          {CLIENTS_DATA.map((client, idx) => (
            <Link 
              key={client.id}
              to={`/clients/${client.id}`}
              className="block group cursor-pointer transition duration-300 hover:scale-[1.02] hover:-translate-y-1"
            >
              <BorderLaserCard 
                className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[220px] bg-black/40 backdrop-blur-xl border border-white/5 animate-crt-scan group-hover:border-emerald-500/30" 
                borderRadius={isMobile ? 0 : 20}
                duration={6 + (idx % 3)}
              >
                {/* Logo box */}
                <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/5 flex items-center justify-center transition-all duration-300 mb-4 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                  <ClientLogoIcon name={client.dummyLogo} />
                </div>

                {/* Client Name */}
                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300 mb-3">
                  {client.clientName}
                </h3>

                {/* Delivered Metric Badge */}
                <span className="text-[8.5px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-semibold mt-auto">
                  {client.deliveredMetric}
                </span>
              </BorderLaserCard>
            </Link>
          ))}
        </div>

        {/* Global Network Live Statistics */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/[0.02] border border-white/5 rounded-[32px] p-8 md:p-12 backdrop-blur-md">
          <div className="absolute top-0 right-1/4 h-[300px] w-[300px] bg-white/5 rounded-full filter blur-[80px] pointer-events-none" />

          {/* Stats info */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/70 w-fit mb-6">
              <Sparkles className="h-3 w-3 text-white/80 animate-pulse" />
              Operational Network Node Status
            </div>
            <h2 className="text-3xl font-light tracking-tight text-white mb-4 md:text-4xl">
              Systems that <span className="font-semibold mars-text-gradient">Deliver outcomes.</span>
            </h2>
            <p className="text-white/60 leading-relaxed text-sm">
              We operate an evidence-first delivery framework. Our integration model ensures that all target analysis metrics translate straight into code workflows, content deployments, and pipeline scheduling systems, delivering verified ROI multiples.
            </p>
          </div>

          {/* Stats count grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 w-full">
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 font-mono">
              <div className="text-3xl font-bold text-white tracking-tight">100%</div>
              <div className="text-[9px] uppercase tracking-widest text-white/40 mt-1">Operational Accountability</div>
            </div>
            
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 font-mono">
              <div className="text-3xl font-bold text-emerald-400 tracking-tight">35,000+</div>
              <div className="text-[9px] uppercase tracking-widest text-white/40 mt-1">Daily Scrape & Verify Nodes</div>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 font-mono">
              <div className="text-3xl font-bold text-blue-400 tracking-tight">4.2x</div>
              <div className="text-[9px] uppercase tracking-widest text-white/40 mt-1">Average ROI Improvement</div>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 font-mono">
              <div className="text-3xl font-bold text-white tracking-tight">&lt; 3.0s</div>
              <div className="text-[9px] uppercase tracking-widest text-white/40 mt-1">RAG Data Ingest Latency</div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
