import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { ArrowUpRight, CheckCircle2, TrendingUp, Users, Play, Award } from "lucide-react";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";
import { Link } from "react-router-dom";

const PROJECTS = [
  {
    slug: "ai-lead-gen",
    title: "AI Lead Generation System",
    category: "Intelligent Automation",
    client: "B2B Technology Firm",
    solution: "Designed and deployed a fully automated AI cold-calling and lead qualification agent using ElevenLabs and n8n. The agent pulls prospective lists from CRM, places natural-sounding voice calls, fields objections in real time, and logs outcomes.",
    stats: [
      { label: "Outbound Dialing", value: "350+ / day" },
      { label: "Lead Qualification", value: "18%" },
      { label: "Manual Effort", value: "0%" }
    ],
    accent: "from-emerald-500/20 to-teal-500/5",
    glow: "shadow-emerald-500/10"
  },
  {
    slug: "digital-transformation",
    title: "Full Digital Transformation",
    category: "Digital Marketing & Web Dev",
    client: "Regional Retail Chain",
    solution: "End-to-end digital infrastructure overhaul: new brand identity system, lightning-fast responsive e-commerce storefront, local/technical SEO campaigns, paid media retargeting, and automatic CRM data sync.",
    stats: [
      { label: "Web Traffic Increase", value: "+120%" },
      { label: "Online Revenue", value: "+45%" },
      { label: "Onboarding Window", value: "90 days" }
    ],
    accent: "from-blue-500/20 to-indigo-500/5",
    glow: "shadow-blue-500/10"
  },
  {
    slug: "ai-filmmaking",
    title: "Brand Film & Product Launch",
    category: "AI Filmmaking & Media",
    client: "Consumer Product Brand",
    solution: "Scripted, animated, and exported a 3-minute cinematic commercial using an AI-assisted video editing workflow, synthetic casting assets, custom soundscapes, and ElevenLabs voice narration.",
    stats: [
      { label: "Campaign Views", value: "500K+" },
      { label: "Engagement Mult.", value: "3x" },
      { label: "Production Savings", value: "70%" }
    ],
    accent: "from-purple-500/20 to-pink-500/5",
    glow: "shadow-purple-500/10"
  },
  {
    slug: "business-growth",
    title: "Business Growth Consultancy",
    category: "Strategic Growth Partnership",
    client: "Service-Based SMB",
    solution: "Embedded consultancy model: completed 3 months of hands-on operations, conducted competitor research, developed financial strategy charts, rebuilt booking site, and optimized customer lifecycle flows.",
    stats: [
      { label: "Qualified Leads", value: "+60%" },
      { label: "New Revenue Streams", value: "1" },
      { label: "ROI Multiple", value: "4.2x" }
    ],
    accent: "from-orange-500/20 to-amber-500/5",
    glow: "shadow-orange-500/10"
  }
];

export default function Work() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-36 md:pt-44 pb-32 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-white/50">
            Case Studies
          </p>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white flex flex-col items-center">
            <WordReveal text="Quiet systems," />
            <MetallicText text="loud outcomes." className="text-4xl md:text-6xl mt-2" />
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">
            We measure success in saved hours and unlocked margins. Explore our representative business transformations.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {PROJECTS.map((project, index) => {
            const cardContent = (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded-none font-mono">
                        {project.category}
                      </span>
                      <h3 className="text-lg md:text-xl font-medium text-white mt-3 leading-snug">{project.title}</h3>
                    </div>
                    <Link
                      to={`/work/${project.slug}`}
                      className="h-8 w-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer shrink-0 ml-4"
                      onClick={(e) => isMobile && e.stopPropagation()}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <p className="text-[10px] text-white/40 mb-2 font-mono">CLIENT_ID // {project.client.toUpperCase()}</p>
                  
                  {/* Collapsible content wrapper */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    !isMobile || expandedIdx === index 
                      ? "max-h-[500px] opacity-100 mt-2" 
                      : "max-h-0 opacity-0 mt-0"
                  }`}>
                    <p className="text-xs leading-relaxed text-white/60 mb-6">{project.solution}</p>
                    
                    {/* Stats Block (Tactical rectangular boxes, stacked vertically on mobile) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-t border-white/5 pt-5 mt-4">
                      {project.stats.map((stat, sIndex) => (
                        <div 
                          key={sIndex} 
                          className="flex justify-between items-center md:flex-col md:text-center bg-white/[0.02] border border-white/5 rounded-none p-3 font-mono relative"
                        >
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30" />
                          <p className="text-[8px] uppercase tracking-widest text-white/35 order-1 md:order-2">{stat.label}</p>
                          <p className="text-xs md:text-base font-bold text-white tracking-tight order-2 md:order-1 font-mono">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {isMobile && expandedIdx !== index && (
                  <div className="w-full mt-3 py-1.5 border border-white/5 bg-white/[0.02] font-mono text-[9px] tracking-widest text-white/45 flex items-center justify-center gap-1.5 transition">
                    <span>[ TAP TO DECRYPT DOSSIER ]</span>
                  </div>
                )}
                {isMobile && expandedIdx === index && (
                  <div className="w-full mt-4 py-1.5 border border-white/10 bg-white/5 font-mono text-[9px] tracking-widest text-emerald-400/80 flex items-center justify-center gap-1.5 transition">
                    <span>[ CLOSE_ENCRYPTED_TUNNEL ]</span>
                  </div>
                )}
              </div>
            );

            return isMobile ? (
              <div
                key={index}
                onClick={() => toggleExpand(index)}
                className={`p-4 bg-gradient-to-br ${project.accent} shadow-2xl ${project.glow} border border-white/10 relative transition-all duration-300 cursor-pointer`}
              >
                {/* Corner Brackets on Mobile */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />
                {cardContent}
              </div>
            ) : (
              <BorderLaserCard
                key={index}
                className={`p-8 md:p-10 bg-gradient-to-br ${project.accent} shadow-2xl ${project.glow} flex flex-col justify-between h-full hover:scale-[1.01] transition-transform duration-300`}
                borderRadius={28}
              >
                {cardContent}
              </BorderLaserCard>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
