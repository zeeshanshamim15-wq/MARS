import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import WordReveal from "@/components/ui/WordReveal";
import MetallicText from "@/components/ui/MetallicText";
import BorderLaserCard from "@/components/ui/BorderLaserCard";
import { 
  ArrowLeft, Cpu, Globe, Video, Briefcase, TrendingUp, 
  Database, Sparkles, Send, CheckCircle2, ShieldCheck, Zap, BarChart3
} from "lucide-react";
import { useEffect, useState, useRef, useMemo, useCallback, memo } from "react";

// Structure for Service details data
type ServiceData = {
  title: string;
  category: string;
  iconName: string;
  description: string;
  pipeline: {
    title: string;
    steps: { name: string; desc: string }[];
  };
  capabilities: string[];
  caseStudy: {
    title: string;
    details: string;
    outcome: string;
    stats: { label: string; value: string }[];
  };
  schema: string;
  telemetryLogs: string[];
};

const SERVICES_MAP: Record<string, ServiceData> = {
  "web-dev": {
    title: "Digital Marketing & Web Dev",
    category: "Digital Growth",
    iconName: "Globe",
    description: "We design, build, and run everything a modern business needs to attract, engage, and convert customers online. We align brand identity, responsive landing pages, paid performance media, technical SEO, and automated CRM pipelines into a single high-conversion sales machine.",
    pipeline: {
      title: "DIGITAL_ACQUISITION_FUNNEL",
      steps: [
        { name: "01. Competitor & Market Audit", desc: "Map existing landing pages, tracking mechanisms, traffic channels, and pricing benchmarks." },
        { name: "02. Brand Visual Design", desc: "Design creative visual directions, responsive landing pages, and marketing visual assets." },
        { name: "03. Performance Web Development", desc: "Construct lightning-fast static or headless React storefronts with 99+ Lighthouse speed scores." },
        { name: "04. Technical SEO Mapping", desc: "Optimize crawlability, sitemaps, structured schemas, and local search index rankings." },
        { name: "05. Funnel Launch & CRO", desc: "Deploy performance media (Google/Meta), run A/B testing grids, and build live dashboards." }
      ]
    },
    capabilities: [
      "High-Performance responsive storefronts & web apps",
      "Technical, local, and on-page SEO optimization",
      "Paid media & performance marketing (Meta/Google Ads)",
      "Conversion rate optimization (CRO) & analytics dashboards",
      "CRM database synchronization and automated email flows"
    ],
    caseStudy: {
      title: "Full Digital Transformation",
      details: "A brick-and-mortar retail business lacked digital infrastructure, causing them to miss mobile consumers and suffer slow load speeds (6.8s). We built an edge-routed static storefront and automated checkout data sync.",
      outcome: "+120% web traffic and +45% online revenue in 90 days.",
      stats: [
        { label: "Web Traffic", value: "+120%" },
        { label: "Revenue Growth", value: "+45%" },
        { label: "Lighthouse Speed", value: "99/100" },
        { label: "Deployment Time", value: "90 Days" }
      ]
    },
    schema: `{
  "site_framework": "nextjs_react_v14",
  "styling": "vanilla_css_vars",
  "speed_optimization": ["edge_cdn_routing", "image_compression_ocr"],
  "integrations": ["razorpay", "tally_prime_invoicing"],
  "hosting": "isolated_cloud_tenant"
}`,
    telemetryLogs: [
      "CRON: Rebuilding static site files...",
      "IMAGE: Completed next-gen layout compression (140 files).",
      "DEPLOY: Uploaded assets to Edge CDN nodes (12 ms latency).",
      "SEO: Crawled sitemap configurations. Indexing verified.",
      "SYNC: Razorpay checkout links verified.",
      "STATUS: Edge nodes operational. Lighthouse performance score: 99+."
    ]
  },
  "automation": {
    title: "Intelligent Automation (IA) & AI Agents",
    category: "Systems Engineering",
    iconName: "Cpu",
    description: "Our most powerful capability: engineering custom, smart automation systems capable of executing complex, multi-layered tasks. Beyond simple automated triggers, we construct reasoning AI agents that orchestrate work across CRM platforms, data pipelines, support chats, and databases, replacing friction with flawless execution.",
    pipeline: {
      title: "COGNITIVE_WORKFLOW_ORCHESTRATION",
      steps: [
        { name: "01. Operational Process Audit", desc: "Audit back-office processes, manual file movements, database inputs, and bottleneck nodes." },
        { name: "02. Workflow Logic Design", desc: "Design n8n automation pipelines, parsing triggers, and data translation models." },
        { name: "03. Cognitive Agent Training", desc: "Configure system prompts, safety gates, and multi-agent intent routing patterns." },
        { name: "04. API Integration Sync", desc: "Link agents to Google API services, Supabase PostgreSQL, CRM platforms, and Gmail systems." },
        { name: "05. Worker Deployment", desc: "Launch cron-schedulers and durable background worker queues for statements/reminders." }
      ]
    },
    capabilities: [
      "AI Voice Calling (ElevenLabs + n8n) running 24/7",
      "WhatsApp-based text/voice/photo receipt OCR logging",
      "Automatic bulk bank statement parsing and review batches",
      "Lead generation verification and CRM push pipelines",
      "Autonomous multi-agent intent routing engines"
    ],
    caseStudy: {
      title: "Enterprise Operations Automation",
      details: "Client was suffering from high sales representative fatigue, low outbound call volume, and massive delays in manual ledger booking. We deployed Abdul (the AI Accountant) on a WhatsApp production number, handling ledger reconciliation, photo OCR, and Tally exports.",
      outcome: "Replaced hours of weekly manual back-office overhead with zero-friction automation.",
      stats: [
        { label: "Ledger Reconciliation", value: "100% Auto" },
        { label: "Weekly Overhead", value: "-95% Hours" },
        { label: "Execution Time", value: "Instant" },
        { label: "Log Error Rate", value: "<0.1%" }
      ]
    },
    schema: `{
  "agent_id": "abdul_accountant_v2.0",
  "routing_gate": "whatsapp_cloud_api",
  "features": ["receipt_ocr", "voice_transcription", "tally_export"],
  "model_provider": "gemini_2.5_flash",
  "database": "supabase_postgresql_rls"
}`,
    telemetryLogs: [
      "INGESTION: Received photo receipt via WhatsApp webhook.",
      "OCR: Processing document structure using Gemini Flash-Lite...",
      "EXTRACT: Extracted expense (EXP-0089: ₹2,450, Fuel, Cash).",
      "WRITE: Saved entry to Supabase secure ledger.",
      "NOTIFY: Outbound notification sent back to client.",
      "STATUS: System operating at 100% efficiency, 0 lag nodes."
    ]
  },
  "filmmaking": {
    title: "AI Filmmaking & Media Production",
    category: "Generative Media",
    iconName: "Video",
    description: "We combine bleeding-edge Generative AI media tools with traditional video production disciplines. From scriptwriting to synthetic casting, high-fidelity VFX, voice synthesis, sound design, and OTT formatting, we create cinematic commercials and explainers at a fraction of standard agency costs.",
    pipeline: {
      title: "SYNTHETIC_MEDIA_PIPELINE",
      steps: [
        { name: "01. Creative Storyboarding", desc: "Write scripts and detailed scene-by-scene scriptboards using custom LLMs." },
        { name: "02. Voice Synthesis Setup", desc: "Synthesize realistic digital actors and design custom vocal profiles using ElevenLabs." },
        { name: "03. Video Frame Generation", desc: "Render cinematic scenes on GPU clusters using Runway Gen-3 and Stable Diffusion." },
        { name: "04. Gen-AI VFX & Assembly", desc: "Edit visual assets, apply motion graphics, apply filters, and consolidate layers." },
        { name: "05. Soundscapes Composition", desc: "Merge narration, generate background scores, and format for social platforms or OTT." }
      ]
    },
    capabilities: [
      "Scriptwriting & AI Creative Direction",
      "Synthetic casting & digital visual avatars",
      "ElevenLabs high-fidelity voice synthesis & voice clones",
      "Gen-AI VFX and advanced cinematic editing",
      "Platform-optimized video formats (Vertical Reels, 4K YouTube)"
    ],
    caseStudy: {
      title: "Brand Film & Product Launch",
      details: "A consumer brand needed high-quality product video campaigns at scale for multiple audience demographics, but traditional video production was prohibitively expensive ($25k estimate). We scripted and animated a 3-minute cinematic video.",
      outcome: "500K+ views and 3x higher engagement at 70% lower production cost.",
      stats: [
        { label: "Campaign Views", value: "500K+" },
        { label: "Engagement Rate", value: "3x Higher" },
        { label: "VFX Cost Saved", value: "70%" },
        { label: "Target Framerate", value: "60 FPS" }
      ]
    },
    schema: `{
  "pipeline": "generative_vfx_v2.0",
  "gpu_nodes": ["gpu_node_04_rtx4090", "gpu_node_05_rtx4090"],
  "narration": "eleven_labs_synthetic_cast",
  "resolutions": ["1080p_60fps", "4k_cinematic"],
  "render_duration": "4.2h"
}`,
    telemetryLogs: [
      "PROMPT: Compiled thematic scripts for cinematic video generation.",
      "GEN: Triggered frame renders on GPU farm Node 04.",
      "COMPILE: Frame interpolation active. Framerate target: 60fps.",
      "AUDIO: Generated speech synthesis narration overlays.",
      "VIDEO: Consolidated VFX layers. Render output: complete.",
      "VFX: Generation successful. Rendering finalized."
    ]
  },
  "consulting": {
    title: "Embedded Business Consultancy",
    category: "Operations Advisory",
    iconName: "Briefcase",
    description: "We do not present reports and walk away. We embed ourselves in your operations, audit existing pipelines, develop a detailed execution roadmap, and take full ownership of the deliverables. We handle the tech builds, team restructuring, and campaign deployment as if it were our own.",
    pipeline: {
      title: "EMBEDDED_GROWTH_MODEL",
      steps: [
        { name: "01. Operational Auditing", desc: "Analyze product pricing, margins, employee workflows, and backend system blockers." },
        { name: "02. Competitor Benchmarking", desc: "Map out the target market, competitor positioning, and untapped sales channels." },
        { name: "03. Business Plan Proposal", desc: "Design a comprehensive marketing, operations, automation, and hiring strategy." },
        { name: "04. Shared Team Execution", desc: "Deploy MARS developers, copywriters, and automation engineers directly into client pipelines." },
        { name: "05. Continuous Optimization", desc: "Monitor transaction loops and client conversion indicators to refine workflows daily." }
      ]
    },
    capabilities: [
      "Full-stack operational workflow audits",
      "Competitor benchmarking and market positioning",
      "Bespoke digital roadmaps co-creation",
      "Embedded execution (we build it for you)",
      "Operational restructuring & campaign oversight"
    ],
    caseStudy: {
      title: "Business Growth Consultancy",
      details: "A service-based company had stagnant growth, high customer acquisition costs ($120/lead), and low conversion rates. We embedded with the client, audited operations, and designed automated scheduling.",
      outcome: "+60% increase in qualified leads and a 45% reduction in lead acquisition costs in 90 days.",
      stats: [
        { label: "Qualified Leads", value: "+60%" },
        { label: "Acquisition Cost", value: "-45%" },
        { label: "ROI Multiple", value: "4.2x" },
        { label: "Embedded Window", value: "90 Days" }
      ]
    },
    schema: `{
  "consulting_framework": "embedded_operations_model",
  "audit_tools": ["competitor_mapping", "customer_journey_tracing"],
  "optimization_metrics": ["cac_reduction", "retention_triggers"],
  "automation_seeding": ["automated_followups", "ledger_logging"]
}`,
    telemetryLogs: [
      "AUDIT: Started operations mapping analysis.",
      "DATA: Tracked customer acquisition metrics database.",
      "CRM: Redesigned lifecycle flows to re-engage past prospects.",
      "LOG: Implemented automated follow-ups script.",
      "STATS: ROI metrics calculated. Client margin increase verified.",
      "STATUS: embedded partnership active. Goals achieved."
    ]
  },
  "investment": {
    title: "Strategic Investment & Startups Incubator",
    category: "Capital & Scale",
    iconName: "TrendingUp",
    description: "Our future vision includes establishing an incubator and seed investment arm. We plan to fund high-potential startups and pair capital injections with operational services (development, design, automation) provided directly by MARS to frictionlessly scale our portfolio companies.",
    pipeline: {
      title: "CAPITAL_&_ACCELERATION_FLOW",
      steps: [
        { name: "01. Deal Sourcing", desc: "Identify promising pre-seed and seed stage startups in target B2B industries." },
        { name: "02. Technical Auditing", desc: "Evaluate the startup's codebases, systems, sitemaps, and core growth potential." },
        { name: "03. Capital & Talent Allocation", desc: "Provide seed capital combined with dedicated MARS developer/designer blocks." },
        { name: "04. Acceleration Deployment", desc: "Deploy digital platforms, technical SEO, and back-office automation configurations." },
        { name: "05. Scaling & Next Rounds", desc: "Design investor-ready pitch decks, financial models, and facilitate investor network introductions." }
      ]
    },
    capabilities: [
      "Seed capital combined with operational support",
      "Investor-ready Pitch Deck engineering",
      "Bespoke Financial modeling & projections",
      "Operational growth support (devs & designers)",
      "Incubation services & strategic introductions"
    ],
    caseStudy: {
      title: "Startups Acceleration Pilot",
      details: "We are incubating early B2B SaaS concepts, building sitemaps, paid acquisition sequences, and custom bookkeeping bots, preparing them for institutional seed fundraising.",
      outcome: "Piloted the framework with 2 seed concepts, building complete digital platforms inside 45 days.",
      stats: [
        { label: "Concepts Incubated", value: "2 Active" },
        { label: "Setup Timeline", value: "45 Days" },
        { label: "Codebase Seeding", value: "100% Core" },
        { label: "Funding Prep", value: "CA-Grade" }
      ]
    },
    schema: `{
  "investment_arm": "mars_ventures_v1.0",
  "operational_support": ["pitch_deck_engineering", "developer_staffing"],
  "incubation_period": "6_months",
  "accelerator_features": ["ai_seeding", "seo_boost_packages"]
}`,
    telemetryLogs: [
      "VENTURES: Screening startup pitch decks...",
      "AUDIT: Initiated code audit for SaaS concept #01.",
      "SEEDING: Allocating n8n automation flow configurations.",
      "COMPILING: Seed pitch deck financial model finalized.",
      "STATUS: Setup stage completed. Incubation active.",
      "INCUBATOR: Pitch deck files exported to pdf."
    ]
  },
  "ai-engineering": {
    title: "Custom AI Solutions & Engineering",
    category: "AI Engineering",
    iconName: "Database",
    description: "Designing bespoke large-scale AI pipelines, training custom LLMs/LoRAs, and embedding models. We go beyond out-of-the-box API wrappers to build custom Retrieval-Augmented Generation (RAG) models, secure vector databases, and private models that operate strictly on your company's data and policies.",
    pipeline: {
      title: "BESPOKE_AI_PIPELINE",
      steps: [
        { name: "01. Private Data Discovery", desc: "Identify unstructured files, manual documents, internal wikis, and database tables." },
        { name: "02. RAG System Design", desc: "Configure vector stores (pgvector/Pinecone) and index chunks with metadata tags." },
        { name: "03. LLM Customization", desc: "Fine-tune open-source models (Llama-3, Mistral) on localized context parameters." },
        { name: "04. API Integration", desc: "Establish secure API links with enterprise access controls and RLS rules." },
        { name: "05. Audit & Compliance", desc: "Build admin feedback tools and compliance audit logs to secure text output." }
      ]
    },
    capabilities: [
      "Custom RAG (Retrieval-Augmented Generation) setups",
      "Vector database indexing & PGVector databases",
      "Fine-tuning open-source LLMs & LoRAs",
      "Private data-isolated model deployments",
      "Security-compliant AI gateway engineering"
    ],
    caseStudy: {
      title: "Enterprise Knowledge Base AI",
      details: "An industrial firm needed a secure way for engineers to search 15,000+ pages of machine manuals and compliance checklists without exposing data to public LLMs. We built a secure pgvector system.",
      outcome: "Reduced query lookup time from 40 minutes to 3 seconds with zero data leaks.",
      stats: [
        { label: "Manuals Indexed", value: "15,000+ Pages" },
        { label: "Query Time", value: "3 Seconds" },
        { label: "Lookup Speedup", value: "80x Faster" },
        { label: "Data Leakage", value: "0% (Secure)" }
      ]
    },
    schema: `{
  "database_type": "pgvector_postgresql",
  "embedding_model": "text-embedding-004",
  "orchestration": "langchain_typescript",
  "model_provider": "gemini_private_tenant",
  "compliance_tier": "india_dpdp_compliant"
}`,
    telemetryLogs: [
      "PARSER: Ingesting machine manuals PDF files (500MB).",
      "CHUNKER: Completed text slicing and meta tagging (8,400 chunks).",
      "EMBEDDING: Processing vectors on GPU clusters... Complete.",
      "PGVECTOR: Writing indices to secure Supabase database.",
      "TEST: Simulated query lookup... Resolved in 2.8ms.",
      "COMPLIANCE: India DPDP Act RLS keys active."
    ]
  },
  "brand-design": {
    title: "Brand Identity & Visual Systems",
    category: "Creative Systems",
    iconName: "Sparkles",
    description: "Creative visual systems, logos, packaging, campaign assets, and UI design. We build cohesive brand architectures that resonate with audiences across print, web, packaging, and video. Our creative direction merges aesthetic purity with strategic marketing principles to make brands unforgettable.",
    pipeline: {
      title: "BRAND_IDENTITY_ARCHITECTURE",
      steps: [
        { name: "01. Creative Exploration", desc: "Map target visual styling benchmarks, product positioning, and client goals." },
        { name: "02. Visual Framework Design", desc: "Design draft concepts, visual templates, color palettes, and visual guidelines." },
        { name: "03. Brand Standards Guide", desc: "Compile visual rules, spacing regulations, sitemaps, and typography files." },
        { name: "04. Collateral Design", desc: "Design physical packaging assets, corporate stationery, and digital templates." },
        { name: "05. Frontend Application", desc: "Align with developers to configure responsive UI coordinates, web fonts, and margins." }
      ]
    },
    capabilities: [
      "Logo systems and visual typography",
      "Visual guidelines and brand books",
      "Physical packaging & product design",
      "Marketing campaign collateral",
      "UI/UX visual frameworks & asset exports"
    ],
    caseStudy: {
      title: "Visual Identity Redesign",
      details: "A consumer SaaS company felt their brand looked outdated and 'cheap', leading to low conversions. We designed a clean, premium visual language and integrated the styling across their landing pages.",
      outcome: "Conversion rate increased by 35% on landing pages post-redesign.",
      stats: [
        { label: "Conversion Rate", value: "+35%" },
        { label: "Asset Exports", value: "240+ Files" },
        { label: "Brand Alignment", value: "Unified" },
        { label: "Style Audits", value: "100% Clean" }
      ]
    },
    schema: `{
  "design_framework": "mars_visual_architecture",
  "color_space": "hsl_tailored",
  "typography_family": ["Outfit", "Urbanist"],
  "deliverables": ["vector_assets", "brand_standards_book"],
  "format_types": ["svg", "figma_tokens"]
}`,
    telemetryLogs: [
      "ART: Initiating style guide asset development.",
      "COLOR: Selected HSL tailored color palette values.",
      "TYPO: Mapping web fonts (Outfit, Urbanist) to layouts.",
      "EXPORT: Exported vector logo marks and layouts.",
      "COMPILE: Completed Brand Visual Standards guidelines.",
      "STATUS: Visual system assets compiled successfully."
    ]
  },
  "lead-gen": {
    title: "AI Lead Generation & Voice Outreach",
    category: "Outreach Systems",
    iconName: "Send",
    description: "Building fully autonomous AI calling agents and extracting verified business data for targeted B2B outreach. We build systems that scout, qualify, call, follow-up, and book appointments without human agents.",
    pipeline: {
      title: "AI_OUTREACH_SEQUENCE",
      steps: [
        { name: "01. Localized Data Scraping", desc: "Extract targeted business lists (clinics, gyms, real estate firms) from localized directories." },
        { name: "02. Data Scrubbing & Verification", desc: "Scrub contact numbers, clean emails, log address fields, and eliminate duplicates." },
        { name: "03. SIP Trunking Integration", desc: "Setup VOIP trunk connections via Vobiz and establish gateways to ElevenLabs API." },
        { name: "04. Voice Agent Scripts Seeding", desc: "Deploy outbound calling bots trained on custom objection mapping scripts." },
        { name: "05. CRM Sync & Booking Automations", desc: "Autonomously log qualified targets, send meeting alerts, and update CRM deals." }
      ]
    },
    capabilities: [
      "Localized data extraction (clinics, gyms, real estate)",
      "Deep data scrubbing & phone/email verification",
      "VOIP SIP trunking config (Vobiz + ElevenLabs)",
      "Inbound/Outbound AI voice agents with natural speech",
      "Auto-booking & CRM lead synchronization"
    ],
    caseStudy: {
      title: "AI Outbound Lead Gen & Voice Campaign",
      details: "A B2B tech client needed to source and call leads in specific cities. We compiled localized datasets, verified the contact records, configured Vobiz SIP trunking, and deployed an outbound voice calling agent.",
      outcome: "Thousands of verified prospect nodes generated with active AI voice routing protocols.",
      stats: [
        { label: "Outbound Dialing", value: "350+ / Day" },
        { label: "Prospect Nodes", value: "1,000s Active" },
        { label: "Qualification Rate", value: "18%" },
        { label: "Cost Reduction", value: "-80%" }
      ]
    },
    schema: `{
  "extraction_node": "localized_directory_scraper",
  "sip_provider": "vobiz_voip_trunking",
  "speech_gateway": "eleven_labs_voice_v3",
  "lead_verification": "phone_ping_status_check",
  "target_sectors": ["clinics", "gyms", "real_estate"]
}`,
    telemetryLogs: [
      "SCRAPE: Aggregated 1,200 localized prospect records.",
      "VERIFY: Verified phone line statuses (980/1200 active).",
      "SIP: Registered trunk connection via Vobiz.",
      "DIALER: Initiated ElevenLabs voice synthesis outbound calls.",
      "CRM: Logged 12 qualified prospects and booked meetings.",
      "STATUS: Lead qualification queue active. Dialing capacity normal."
    ]
  },
  "market-analysis": {
    title: "Market Analysis & Data Intelligence",
    category: "Intelligence & Analytics",
    iconName: "BarChart3",
    description: "We perform deep-dive market audits, localized directory scraping, multi-channel lead verification, and competitor benchmarking. By translating raw market nodes into verified B2B intelligence, we supply the core evidence-first foundation for outreach campaigns and operational roadmaps.",
    pipeline: {
      title: "INTELLIGENCE_AUDITING_PIPELINE",
      steps: [
        { name: "01. Targeted Directory Scraping", desc: "Harvest prospect datasets from localized business coordinates (clinics, gyms, real estate)." },
        { name: "02. Multi-channel Data Verification", desc: "Ping phone numbers and verify emails via HLR/SMTP delivery checks to scrub out bad contacts." },
        { name: "03. Competitor Benchmarking", desc: "Map out rival offerings, service tiers, pricing bands, and market position gaps." },
        { name: "04. Database Processing & Ingestion", desc: "Structure, normalize, and load qualified prospect profiles into private PostgreSQL systems." },
        { name: "05. Live Telemetry & Reporting", desc: "Deploy interactive KPI dashboards and sync verified lead pipelines directly to active client CRMs." }
      ]
    },
    capabilities: [
      "Localized directory scraping & extraction engines",
      "Multi-point contact verification (HLR/SMTP pings)",
      "Competitor pricing matrices & offering benchmarks",
      "Database schema structuring & secure ingestion",
      "Interactive KPI reporting & custom data visualization"
    ],
    caseStudy: {
      title: "B2B Market Scouting & Verification Campaign",
      details: "A healthcare distributor struggled with duplicate contact records and low conversion rates on cold contacts. We compiled a localized registry, ping-verified the nodes, and mapped competitor pricing segments.",
      outcome: "Generated 4,500+ verified prospects with an active data precision rate of 99.8%.",
      stats: [
        { label: "Verified Leads", value: "4,500+" },
        { label: "HLR Ping Match", value: "94.2%" },
        { label: "Data Quality", value: "99.8%" },
        { label: "Processing Time", value: "12 Days" }
      ]
    },
    schema: `{
  "audit_mode": "localized_directory_extraction",
  "scraping_nodes": ["clinics", "gyms", "real_estate"],
  "verification_gateways": ["hlr_lookup_ping", "smtp_deliverability"],
  "destination_db": "supabase_postgresql",
  "kpi_metrics": ["lead_density", "competitor_positioning"]
}`,
    telemetryLogs: [
      "SCRAPING: Crawling local clinics registry nodes...",
      "INGEST: Found 1,480 raw profiles.",
      "CLEAN: Running validation checks. Filtering duplicates.",
      "VERIFY: Running HLR pings. Verified 1,394/1,480 active numbers.",
      "DATABASE: Ingested 1,394 verified coordinates into Supabase.",
      "METRICS: Scraped Node density mapped. Accuracy score: 99.8%."
    ]
  }
};

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

// Interactive Graph for Market Analysis subpage
const InteractiveAnalysisGraph = memo(function InteractiveAnalysisGraph() {
  const [activeSector, setActiveSector] = useState<"clinics" | "gyms" | "realestate">("clinics");

  // Chart coordinate data for the sectors
  const sectorData = useMemo(() => ({
    clinics: {
      nodes: "1,450",
      verified: "94.2%",
      points: [
        { x: 30, y: 150 },
        { x: 80, y: 110 },
        { x: 130, y: 130 },
        { x: 180, y: 70 },
        { x: 230, y: 90 },
        { x: 280, y: 40 }
      ],
      label: "Prospect Lead Density (Healthcare Clinics)"
    },
    gyms: {
      nodes: "840",
      verified: "96.5%",
      points: [
        { x: 30, y: 140 },
        { x: 80, y: 130 },
        { x: 130, y: 90 },
        { x: 180, y: 110 },
        { x: 230, y: 60 },
        { x: 280, y: 50 }
      ],
      label: "Prospect Lead Density (Fitness & Gyms)"
    },
    realestate: {
      nodes: "2,100",
      verified: "92.8%",
      points: [
        { x: 30, y: 160 },
        { x: 80, y: 120 },
        { x: 130, y: 140 },
        { x: 180, y: 100 },
        { x: 230, y: 80 },
        { x: 280, y: 30 }
      ],
      label: "Prospect Lead Density (Real Estate Agencies)"
    }
  }), []);

  const current = sectorData[activeSector];

  // SVG Line path string generator
  const makeLinePath = useCallback((points: { x: number; y: number }[]) => {
    return points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, "");
  }, []);

  // SVG Gradient Area path string generator
  const makeAreaPath = useCallback((points: { x: number; y: number }[]) => {
    const linePath = makeLinePath(points);
    return `${linePath} L 280 180 L 30 180 Z`;
  }, [makeLinePath]);

  const currentLinePath = useMemo(() => makeLinePath(current.points), [current.points, makeLinePath]);
  const currentAreaPath = useMemo(() => makeAreaPath(current.points), [current.points, makeAreaPath]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <h4 className="text-xs font-semibold font-mono text-white uppercase tracking-wider">LIVE_AUDIT_VISUALIZER</h4>
        </div>
        
        {/* Buttons to change active sector */}
        <div className="flex gap-1">
          {(["clinics", "gyms", "realestate"] as const).map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`text-[9px] font-mono uppercase px-2 py-1 border transition ${
                activeSector === sector
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-white/5 text-white/50 border-white/5 hover:border-white/10"
              }`}
            >
              {sector === "realestate" ? "Real Estate" : sector}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center select-none">
        <div className="bg-white/[0.01] border border-white/5 rounded-xl p-2.5">
          <div className="text-white font-mono text-sm font-semibold">{current.nodes}</div>
          <div className="text-[7.5px] text-white/40 uppercase tracking-widest mt-0.5">Scraped Nodes</div>
        </div>
        <div className="bg-white/[0.01] border border-white/5 rounded-xl p-2.5">
          <div className="text-emerald-400 font-mono text-sm font-semibold">{current.verified}</div>
          <div className="text-[7.5px] text-white/40 uppercase tracking-widest mt-0.5">HLR Verification</div>
        </div>
        <div className="bg-white/[0.01] border border-white/5 rounded-xl p-2.5">
          <div className="text-blue-400 font-mono text-sm font-semibold">99.8%</div>
          <div className="text-[7.5px] text-white/40 uppercase tracking-widest mt-0.5">Database Quality</div>
        </div>
      </div>

      {/* SVG Interactive Line Chart */}
      <div className="relative bg-black/40 border border-white/5 rounded-xl p-3 h-44 flex items-center justify-center">
        <svg viewBox="0 0 310 190" className="w-full h-full text-white/5" fill="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.25)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="30" y1="30" x2="280" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="30" y1="70" x2="280" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="30" y1="110" x2="280" y2="110" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="30" y1="150" x2="280" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 4" />
          
          <line x1="80" y1="30" x2="80" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <line x1="130" y1="30" x2="130" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <line x1="180" y1="30" x2="180" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <line x1="230" y1="30" x2="230" y2="180" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

          {/* Axis */}
          <line x1="30" y1="180" x2="280" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="30" y1="30" x2="30" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          {/* Glowing Area under line */}
          <path
            d={currentAreaPath}
            fill="url(#chartGradient)"
            className="transition-all duration-500 ease-in-out"
          />

          {/* Glowing line */}
          <path
            d={currentLinePath}
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500 ease-in-out"
            style={{ filter: "drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))" }}
          />

          {/* Data point dots */}
          {current.points.map((p, pIdx) => (
            <circle
              key={pIdx}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="#FFFFFF"
              stroke="#10B981"
              strokeWidth="1.5"
              className="transition-all duration-500 ease-in-out"
            />
          ))}

          {/* Graph labels */}
          <text x="30" y="192" fill="rgba(255,255,255,0.3)" className="font-mono text-[6px]">M1</text>
          <text x="80" y="192" fill="rgba(255,255,255,0.3)" className="font-mono text-[6px]">M2</text>
          <text x="130" y="192" fill="rgba(255,255,255,0.3)" className="font-mono text-[6px]">M3</text>
          <text x="180" y="192" fill="rgba(255,255,255,0.3)" className="font-mono text-[6px]">M4</text>
          <text x="230" y="192" fill="rgba(255,255,255,0.3)" className="font-mono text-[6px]">M5</text>
          <text x="280" y="192" fill="rgba(255,255,255,0.3)" className="font-mono text-[6px]">M6</text>
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-2 left-4 text-[7px] font-mono text-white/35">
          {current.label}
        </div>
      </div>
    </div>
  );
});

// Icon helper mapping strings to elements
function ServiceIcon({ name }: { name: string }) {
  const props = { className: "h-6 w-6 text-white" };
  switch (name) {
    case "Globe": return <Globe {...props} />;
    case "Cpu": return <Cpu {...props} />;
    case "Video": return <Video {...props} />;
    case "Briefcase": return <Briefcase {...props} />;
    case "TrendingUp": return <TrendingUp {...props} />;
    case "Database": return <Database {...props} />;
    case "Sparkles": return <Sparkles {...props} />;
    case "Send": return <Send {...props} />;
    case "BarChart3": return <BarChart3 {...props} />;
    default: return <Sparkles {...props} />;
  }
}

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const service = serviceId ? SERVICES_MAP[serviceId] : null;

  if (!service) {
    return (
      <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground flex flex-col justify-between">
        <ParallaxBackground src="/nebula.jpg" />
        <Navbar />
        <main className="relative z-10 mx-auto max-w-7xl px-6 py-48 text-center flex-1 flex flex-col justify-center items-center">
          <h2 className="text-2xl text-white font-light mb-4">Service Coordinate Not Found</h2>
          <p className="text-xs text-white/50 mb-8 max-w-sm">The service record could not be resolved in our database logs.</p>
          <Link to="/services" className="inline-flex items-center gap-2 text-xs text-white/70 hover:text-white border border-white/10 rounded-full px-5 py-2 hover:bg-white/5 transition">
            <ArrowLeft className="h-4 w-4" />
            Back to Services
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
        <Link to="/services" className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white mb-12 transition">
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>

        {/* Header */}
        <div className="mx-auto max-w-4xl text-left mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-semibold">
            {service.category}
          </span>
          <h1 className="text-balance text-4xl font-light tracking-tight md:text-6xl text-white mt-4 flex items-center gap-4 flex-wrap">
            <WordReveal text={service.title} />
          </h1>
          <p className="mt-4 text-xs text-white/45 font-mono">SERVICE_NODE: {serviceId.toUpperCase()} // STATUS: DEPLOYED_&_ACTIVE</p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column - Core Info & Pipeline (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* What is it & Description */}
            <BorderLaserCard className="p-5 sm:p-8 bg-black/40 backdrop-blur-xl" borderRadius={24}>
              <div className="flex gap-4 items-start mb-6">
                <div className="h-12 w-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <ServiceIcon name={service.iconName} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-1">01_The Definition</h3>
                  <h4 className="text-lg font-medium text-white mb-2">Service Overview</h4>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-light">{service.description}</p>
            </BorderLaserCard>

            {/* Execution Process Chain */}
            <BorderLaserCard className="p-5 sm:p-8 bg-black/40 backdrop-blur-xl" borderRadius={24}>
              <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-6">02_Execution_Chain // {service.pipeline.title}</h3>
              <div className="relative border-l border-white/10 pl-6 ml-2 space-y-6">
                {service.pipeline.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Ring dot indicator */}
                    <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full bg-white border border-black shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    <h4 className="text-xs font-semibold text-white font-mono">{step.name}</h4>
                    <p className="text-xs text-white/50 mt-1 font-light leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </BorderLaserCard>

            {/* Included Capabilities */}
            <BorderLaserCard className="p-5 sm:p-8 bg-[#0D0D0D]/60 backdrop-blur-md" borderRadius={24}>
              <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-4">03_Capabilities_Matrix</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/70">
                {service.capabilities.map((cap, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="h-4.5 w-4.5 text-white/60 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </BorderLaserCard>

            {serviceId === "market-analysis" && (
              <BorderLaserCard className="p-5 sm:p-8 bg-[#0D0D0D]/60 backdrop-blur-md" borderRadius={24}>
                <InteractiveAnalysisGraph />
              </BorderLaserCard>
            )}

          </div>

          {/* Right Column - Case Study, Logs & Config (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Live Case Study */}
            <BorderLaserCard className="p-5 sm:p-8 bg-black/40 backdrop-blur-xl" borderRadius={24}>
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                <Sparkles className="h-4 w-4 text-white/60 animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-white/60 uppercase">CASE_STUDY_METRICS</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-2">{service.caseStudy.title}</h4>
              <p className="text-xs text-white/50 leading-relaxed font-light mb-4">{service.caseStudy.details}</p>
              
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 mb-6">
                <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">OUTCOME:</p>
                <p className="text-xs text-white font-medium mt-1 leading-relaxed">{service.caseStudy.outcome}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {service.caseStudy.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="bg-white/[0.01] border border-white/5 rounded-xl p-3 font-mono">
                    <div className="text-lg font-bold text-white tracking-tight">{stat.value}</div>
                    <div className="text-[7.5px] uppercase tracking-wider text-white/40 mt-1 truncate">{stat.label}</div>
                  </div>
                ))}
              </div>
            </BorderLaserCard>

            {/* Operational Logs Terminal */}
            <BorderLaserCard className="p-5 bg-[#090909]/80 flex flex-col gap-4" borderRadius={24}>
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Cpu className="h-3.5 w-3.5 text-white/40" />
                <span className="text-[10px] font-mono tracking-widest text-white/50">OPERATIONAL_TELEMETRY_LOGS</span>
              </div>
              
              <TerminalLogs logs={service.telemetryLogs} />

              <div className="flex items-center gap-1.5 text-emerald-500 text-[8.5px] font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>MONITORING STREAM: ACTIVE</span>
              </div>
            </BorderLaserCard>

            {/* Deployment Schema Config */}
            <BorderLaserCard className="p-5 sm:p-6 bg-black/40 backdrop-blur-md" borderRadius={20}>
              <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono mb-3">04_Deployment_Schema</h3>
              <pre className="font-mono text-[9px] text-white/50 bg-white/5 p-4 rounded-xl overflow-x-auto leading-relaxed border border-white/5">
                {service.schema}
              </pre>
            </BorderLaserCard>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
