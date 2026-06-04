import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import { ArrowLeft, Cpu, ShieldCheck, Database, BarChart2, Globe, Send, Play, Sparkles } from "lucide-react";

type ProjectData = {
  title: string;
  category: string;
  client: string;
  challenge: string;
  solution: string;
  stats: { label: string; value: string }[];
  telemetryLogs: string[];
  schema: string;
};

const PROJECTS_MAP: Record<string, ProjectData> = {
  "ai-lead-gen": {
    title: "AI Lead Generation System",
    category: "Intelligent Automation",
    client: "B2B Technology Firm",
    challenge: "Client was suffering from low outbound lead volumes, high sales representative fatigue, and high error rates in logging prospect interactions. Manual calls were limited to 40/day per rep, with only 4% conversion rates.",
    solution: "Designed and deployed a fully automated AI cold-calling and lead qualification agent using ElevenLabs and n8n. The agent pulls prospective lists from CRM, places natural-sounding voice calls, fields objections in real time, and logs outcomes.",
    stats: [
      { label: "Outbound Dialing", value: "350+ / day" },
      { label: "Lead Qualification", value: "18%" },
      { label: "Manual Effort Required", value: "0%" },
      { label: "Sales Efficiency Boost", value: "+320%" }
    ],
    telemetryLogs: [
      "[10:15:22] SYNC: Synchronized contact list (250 items).",
      "[10:15:25] DIAL: Initiating Voice Call to +1 (555) 019-2834...",
      "[10:16:40] AUDIO: User answered. Voice object model active.",
      "[10:16:48] OBJECTION: Client stated budget constraints. Objection handler engaged.",
      "[10:17:15] LOG: Client qualified. Auto-scheduling demo bridge.",
      "[10:17:20] SAVE: Routed prospect details to CRM. SSH Secure Connection closed."
    ],
    schema: `{
  "agent_id": "abdul_voice_v4.2",
  "routing_gate": "voice_gateway_india_01",
  "features": ["objection_mapping", "crm_writeback", "speech_synthesis"],
  "model_provider": "gemini_voice_1.5_pro",
  "concurrency_limit": 50
}`
  },
  "digital-transformation": {
    title: "Full Digital Transformation",
    category: "Digital Marketing & Web Dev",
    client: "Regional Retail Chain",
    challenge: "A brick-and-mortar retail business lacked digital infrastructure, causing them to miss mobile consumers. Their outdated website loaded slowly (6.8s) and was not optimized for SEO.",
    solution: "End-to-end digital infrastructure overhaul: new brand identity system, lightning-fast responsive e-commerce storefront, local/technical SEO campaigns, paid media retargeting, and automatic CRM data sync.",
    stats: [
      { label: "Web Traffic Increase", value: "+120%" },
      { label: "Online Revenue Growth", value: "+45%" },
      { label: "Onboarding Window", value: "90 days" },
      { label: "Lighthouse Speed Score", value: "99/100" }
    ],
    telemetryLogs: [
      "[08:00:10] CRON: Rebuilding static site files...",
      "[08:00:14] IMAGE: Completed next-gen layout compression (140 files).",
      "[08:00:18] DEPLOY: Uploaded assets to Edge CDN nodes (12 ms latency).",
      "[08:00:20] SEO: Crawled sitemap configurations. Indexing verified.",
      "[08:00:25] SYNC: razorpay checkout links verified."
    ],
    schema: `{
  "site_framework": "nextjs_react_v14",
  "styling": "vanilla_css_vars",
  "speed_optimization": ["edge_cdn_routing", "image_compression_ocr"],
  "integrations": ["razorpay", "tally_prime_invoicing"],
  "hosting": "isolated_cloud_tenant"
}`
  },
  "ai-filmmaking": {
    title: "Brand Film & Product Launch",
    category: "AI Filmmaking & Media",
    client: "Consumer Product Brand",
    challenge: "Production limits made standard video ads prohibitively expensive (estimating $25k per video). Client needed high-quality, cinematic cinematic videos at scale for diverse audience cohorts.",
    solution: "Scripted, animated, and exported a 3-minute cinematic commercial using an AI-assisted video editing workflow, synthetic casting assets, custom soundscapes, and ElevenLabs voice narration.",
    stats: [
      { label: "Campaign Views", value: "500K+" },
      { label: "Engagement Multiple", value: "3x" },
      { label: "Production Savings", value: "70%" },
      { label: "Deliverables Completed", value: "4 Video Sets" }
    ],
    telemetryLogs: [
      "[14:30:10] PROMPT: Compiled thematic scripts for cinematic video generation.",
      "[14:30:15] GEN: Triggered frame renders on GPU farm Node 04.",
      "[14:31:05] COMPILE: Frame interpolation active. Framerate target: 60fps.",
      "[14:31:40] AUDIO: Generated speech synthesis narration overlays.",
      "[14:32:00] VIDEO: Consolidated VFX layers. Render output: complete."
    ],
    schema: `{
  "pipeline": "generative_vfx_v2.0",
  "gpu_nodes": ["gpu_node_04_rtx4090", "gpu_node_05_rtx4090"],
  "narration": "eleven_labs_synthetic_cast",
  "resolutions": ["1080p_60fps", "4k_cinematic"],
  "render_duration": "4.2h"
}`
  },
  "business-growth": {
    title: "Business Growth Consultancy",
    category: "Strategic Growth Partnership",
    client: "Service-Based SMB",
    challenge: "The business had static growth and didn't know how to scale. They had high customer acquisition costs ($120/lead) and low retention rates.",
    solution: "Embedded consultancy model: completed 3 months of hands-on operations, conducted competitor research, developed financial strategy charts, rebuilt booking site, and optimized customer lifecycle flows.",
    stats: [
      { label: "Qualified Leads Increase", value: "+60%" },
      { label: "New Revenue Streams", value: "1 Active" },
      { label: "ROI Multiple", value: "4.2x" },
      { label: "Acquisition Cost", value: "-45%" }
    ],
    telemetryLogs: [
      "[09:10:00] AUDIT: Started operations mapping analysis.",
      "[09:10:05] DATA: Tracked customer acquisition metrics database.",
      "[09:10:12] CRM: Redesigned lifecycle flows to re-engage past prospects.",
      "[09:10:20] LOG: Implemented automated follow-ups script.",
      "[09:10:25] STATS: ROI metrics calculated. Client margin increase verified."
    ],
    schema: `{
  "consulting_framework": "embedded_operations_model",
  "audit_tools": ["competitor_mapping", "customer_journey_tracing"],
  "optimization_metrics": ["cac_reduction", "retention_triggers"],
  "automation_seeding": ["automated_followups", "ledger_logging"]
}`
  }
};

export default function ProjectDetails() {
  const { projectId } = useParams();
  const project = projectId ? PROJECTS_MAP[projectId] : null;

  if (!project) {
    return (
      <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground flex flex-col justify-between">
        <ParallaxBackground src="/nebula.jpg" />
        <Navbar />
        <main className="relative z-10 mx-auto max-w-7xl px-6 py-48 text-center flex-1 flex flex-col justify-center items-center">
          <h2 className="text-2xl text-white font-light mb-4">Project Dossier Not Found</h2>
          <p className="text-xs text-white/50 mb-8 max-w-sm">The project coordinate records could not be resolved in our database logs.</p>
          <Link to="/work" className="inline-flex items-center gap-2 text-xs text-white/70 hover:text-white border border-white/10 rounded-full px-5 py-2 hover:bg-white/5 transition">
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
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
        <Link to="/work" className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white mb-12 transition">
          <ArrowLeft className="h-4 w-4" />
          Back to Case Studies
        </Link>

        {/* Header */}
        <div className="mx-auto max-w-4xl text-left mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-semibold">
            {project.category}
          </span>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white mt-4">
            <WordReveal text={project.title} />
          </h1>
          <p className="mt-4 text-xs text-white/45 font-mono">CLIENT_IDENTITY: {project.client} // FILE_STATUS: DECRYPTED</p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Main Info (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <BorderLaserCard className="p-5 sm:p-8 bg-black/40 backdrop-blur-xl flex-1" borderRadius={28}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-2">01_The Challenge</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{project.challenge}</p>
                </div>
                <div className="border-t border-white/5 pt-6">
                  <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-2">02_The Solution</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{project.solution}</p>
                </div>
              </div>
            </BorderLaserCard>

            {/* Project Stats (Grid of 4) */}
            <div className="grid grid-cols-2 gap-4">
              {project.stats.map((stat, sIdx) => (
                <BorderLaserCard key={sIdx} className="p-5 bg-[#0D0D0D]/60 backdrop-blur-md" borderRadius={20}>
                  <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                  <p className="text-[9px] uppercase tracking-widest text-white/40 mt-1">{stat.label}</p>
                </BorderLaserCard>
              ))}
            </div>
          </div>

          {/* Technical Telemetry (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Live Logs */}
            <BorderLaserCard className="p-6 bg-[#090909]/80 font-mono text-[9px] text-emerald-400/80 flex-1 flex flex-col justify-between" borderRadius={24}>
              <div>
                <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                  <Cpu className="h-3.5 w-3.5 text-white/40" />
                  <span className="text-[10px] font-mono tracking-widest text-white/50">OPERATIONAL_TELEMETRY_LOGS</span>
                </div>
                <div className="space-y-3">
                  {project.telemetryLogs.map((log, lIdx) => (
                    <div key={lIdx} className="flex gap-2">
                      <span className="text-emerald-500 shrink-0">&gt;</span>
                      <span className="leading-relaxed">{log}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-500 border-t border-white/5 pt-3 mt-4 text-[8.5px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>MONITORING STREAM: ACTIVE</span>
              </div>
            </BorderLaserCard>

            {/* Scheme Config */}
            <BorderLaserCard className="p-5 sm:p-6 bg-black/40 backdrop-blur-md" borderRadius={20}>
              <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-3">03_Deployment_Schema</h3>
              <pre className="font-mono text-[9px] text-white/50 bg-white/5 p-4 rounded-xl overflow-x-auto leading-relaxed border border-white/5">
                {project.schema}
              </pre>
            </BorderLaserCard>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
