export type SubService = {
  name: string;
  price: number;
  description: string;
};

export type PricingService = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  subServices: SubService[];
  bundleName: string;
  bundlePrice: number;
  originalPrice: number;
  savings: number;
  salesPitch: string;
  accent: string;
  glowColor: string;
};

export const PRICING_SERVICES: PricingService[] = [
  {
    id: "web-dev",
    name: "Web Dev & SEO",
    tagline: "Everything a modern business needs to attract, engage, and convert customers online.",
    description: "High-performance websites, custom UI/UX design, and search engine optimization mapped to conversion funnels.",
    subServices: [
      { name: "Premium UI/UX Design (Figma)", price: 15000, description: "Custom layouts, visual systems, and user flows designed in Figma." },
      { name: "Frontend Development (React/Next.js)", price: 25000, description: "Fast, responsive, and interactive frontend built on modern frameworks." },
      { name: "Backend & CRM Integration", price: 20000, description: "Secure APIs, database setup, and syncing with marketing CRMs." },
      { name: "SEO & Performance Speed Optimization", price: 10000, description: "Perfect Lighthouse scoring, indexing configurations, and metadata audits." }
    ],
    bundleName: "Full-Stack Corporate Identity",
    bundlePrice: 49999,
    originalPrice: 70000,
    savings: 20001,
    salesPitch: "Get a perfect Lighthouse 99+ storefront connected to your business workflows. Selecting the full bundle saves you ₹20,000+ compared to separate builds.",
    accent: "from-blue-400 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.4)"
  },
  {
    id: "automation",
    name: "Intelligent Automation & AI Employees",
    tagline: "Custom autonomous automation pipelines that replace manual business operations.",
    description: "Bespoke digital AI employees that handle database reconciliations, accounting, and automated communication sweeps.",
    subServices: [
      { name: "Custom Database/CRM Integrations", price: 15000, description: "Integrate platforms like Supabase, Salesforce, or Hubspot securely." },
      { name: "AI Accountant Setup (Abdul Agent)", price: 10000, description: "WhatsApp-based ledger system that processes text, receipts, and voice notes." },
      { name: "Orion Correspondence Agent Setup", price: 10000, description: "Email/proposal generator configured to send communications on official letterheads." },
      { name: "Custom Workflow Automations (n8n/Make)", price: 15000, description: "Automated trigger pipelines connecting your services and messaging tools." }
    ],
    bundleName: "Autonomous Operations Suite",
    bundlePrice: 34999,
    originalPrice: 50000,
    savings: 15001,
    salesPitch: "Completely automate your backend administration. Save over ₹15,000 by setting up the entire automated accountant & correspondence agent bundle.",
    accent: "from-emerald-400 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.4)"
  },
  {
    id: "filmmaking",
    name: "AI Film & VFX",
    tagline: "Cinematic commercial video production powered by generative AI pipelines.",
    description: "Combine advanced AI video, voice synthesis, and cinematic editing for premium product explainers.",
    subServices: [
      { name: "Scriptwriting & AI Storyboarding", price: 10000, description: "Narrative scripts paired with visual prompts and AI storyboards." },
      { name: "AI Voice Synthesis & Casting", price: 15000, description: "High-fidelity synthetic voices casting for professional voiceover scripts." },
      { name: "Cinematic VFX & Video Editing", price: 25000, description: "Premium post-production visual effects, editing, and pacing." },
      { name: "4K Commercial Rendering & Formats", price: 10000, description: "Optimized resolution formats for social media campaigns and streaming." }
    ],
    bundleName: "Cinematic Brand Explainer",
    bundlePrice: 42500,
    originalPrice: 60000,
    savings: 17500,
    salesPitch: "Create breathtaking advertisements at a fraction of traditional production costs. This bundle packages all cinematic video elements for ₹42,500.",
    accent: "from-purple-400 to-fuchsia-500",
    glowColor: "rgba(168, 85, 247, 0.4)"
  },
  {
    id: "consulting",
    name: "Embedded Business Consultancy",
    tagline: "We embed directly in your operations to audit, build, and scale your tech systems.",
    description: "On-site diagnostic analysis, operational audits, and technical execution roadmaps managed directly by MARS partners.",
    subServices: [
      { name: "Competitor & Pipeline Audit", price: 15000, description: "In-depth review of your technical stack, operations, and competitor positions." },
      { name: "Growth Strategy Roadmap", price: 15000, description: "Comprehensive roadmap for scaling systems, team structures, and products." },
      { name: "Embedded Execution & Management", price: 25000, description: "MARS partners embed directly into operations to build and launch deliverables." }
    ],
    bundleName: "Embedded Scale Accelerator",
    bundlePrice: 39999,
    originalPrice: 55000,
    savings: 15001,
    salesPitch: "Don't just receive a report. Partner with us to execute the strategy. Save ₹15,000+ by bundling audits and hands-on operational management.",
    accent: "from-amber-400 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.4)"
  },
  {
    id: "investment",
    name: "Strategic Investment Advisory",
    tagline: "Operational startup acceleration, investor pitch engineering, and seed roadmap prep.",
    description: "Build institutional-grade pitch decks, financial models, and operational incubator structures.",
    subServices: [
      { name: "Pitch Deck Engineering", price: 15000, description: "Investors-facing slide decks with high-impact copywriting and premium design." },
      { name: "Financial Modeling & Valuation", price: 20000, description: "Multi-year spreadsheets mapping unit economics, expenses, and growth targets." },
      { name: "Venture Incubation Roadmap", price: 15000, description: "Structure operational incubation milestones and compliance prep." }
    ],
    bundleName: "Venture Capital Ready Bundle",
    bundlePrice: 35000,
    originalPrice: 50000,
    savings: 15000,
    salesPitch: "Get your startup fully equipped for investor presentation. Our comprehensive bundle saves you ₹15,000 on financial engineering and design assets.",
    accent: "from-rose-400 to-pink-500",
    glowColor: "rgba(244, 63, 94, 0.4)"
  },
  {
    id: "ai-engineering",
    name: "Custom AI Solutions & Engineering",
    tagline: "Proprietary vector databases, open LLM fine-tuning, and private local model builds.",
    description: "Enterprise-grade secure AI systems operating strictly on your proprietary data without leakage.",
    subServices: [
      { name: "Custom RAG & Vector Database Indexing", price: 25000, description: "Retrieval-Augmented Generation pipeline connecting internal document databases." },
      { name: "Open LLM & LoRA Fine-Tuning", price: 35000, description: "Train model behaviors using specialized company knowledge base logs." },
      { name: "Secure Private Model Deployment", price: 30000, description: "Host data-isolated private models that operate strictly behind client firewalls." },
      { name: "Enterprise API Gateway Security", price: 15000, description: "Integrate rate limits, token telemetry, and compliant privacy firewalls." }
    ],
    bundleName: "Enterprise Custom AI Core",
    bundlePrice: 79999,
    originalPrice: 105000,
    savings: 25001,
    salesPitch: "Build a highly secure, private intelligence core for your enterprise. Bundling saves ₹25,000+ and establishes full database-to-model integration.",
    accent: "from-violet-400 to-purple-600",
    glowColor: "rgba(139, 92, 246, 0.4)"
  },
  {
    id: "brand-design",
    name: "Brand Identity & Visual Systems",
    tagline: "Logo systems, typography guidelines, physical packaging, and visual layout frameworks.",
    description: "Premium visual designs that merge aesthetic purity with conversion-oriented marketing structures.",
    subServices: [
      { name: "Logo Systems & Visual Guidelines", price: 15000, description: "Cohesive vector logos, fonts, palettes, and brand guidelines." },
      { name: "Product Packaging Design", price: 20000, description: "Physical box/container templates, material mockups, and prints." },
      { name: "Digital Layouts & UI Kits", price: 15000, description: "UI visual design components, Figma variables, and brand imagery assets." }
    ],
    bundleName: "Unified Brand Visual Kit",
    bundlePrice: 36500,
    originalPrice: 50000,
    savings: 13500,
    salesPitch: "Create a memorable brand that turns heads. The Unified Brand Visual Kit saves you ₹13,500 on full visual design, packaging, and digital layout rules.",
    accent: "from-fuchsia-400 to-pink-600",
    glowColor: "rgba(217, 70, 239, 0.4)"
  },
  {
    id: "lead-gen",
    name: "AI Lead Gen & Voice Outreach",
    tagline: "Autonomous outbound dialing systems and verified directory scraper networks.",
    description: "Deploy custom calling agents that qualify prospects, make warm followups, and schedule meetings.",
    subServices: [
      { name: "AI Voice Call Scripting & Prompts", price: 10000, description: "Scripting conversation flows and agent instructions for phone agents." },
      { name: "Multi-Channel Scraper & Lead Finder", price: 15000, description: "Localized directories search engines finding business channels." },
      { name: "Outbound VoIP & Dialer Server", price: 15000, description: "Configure secure trunking servers for high-volume automated dialers." },
      { name: "CRM Integration & Appointment Hand-off", price: 10000, description: "Calendar integrations to route successful voice call leads to calendars." }
    ],
    bundleName: "Zero-Touch Sales Machine",
    bundlePrice: 34999,
    originalPrice: 50000,
    savings: 15001,
    salesPitch: "A fully hands-off outbound pipeline. Save ₹15,000+ by bundling automated scrapers, dialing infrastructure, and CRM appointment booking handlers.",
    accent: "from-cyan-400 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.4)"
  },
  {
    id: "market-analysis",
    name: "Market Analysis & Intelligence",
    tagline: "Data scraping sweeps, multi-point email ping check, and competitor benchmarking.",
    description: "Perform detailed database searches and competitor matrices to feed localized B2B campaigns.",
    subServices: [
      { name: "Localized Registry Scouting", price: 15000, description: "Extract niche target directories and physical address registries." },
      { name: "HLR & SMTP Multi-point Ping Check", price: 10000, description: "Validate phone numbers and email domains to guarantee zero bounce rates." },
      { name: "Competitor Benchmarking Matrix", price: 15000, description: "Full report evaluating local competitor offerings, ads, and speed scores." }
    ],
    bundleName: "Complete Market Blueprint",
    bundlePrice: 29999,
    originalPrice: 40000,
    savings: 10001,
    salesPitch: "Gather perfect competitive intelligence before launching campaigns. Save ₹10,000+ with the Complete Market Blueprint package.",
    accent: "from-teal-400 to-emerald-600",
    glowColor: "rgba(20, 184, 166, 0.4)"
  }
];
