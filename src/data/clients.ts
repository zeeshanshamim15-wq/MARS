export interface ClientService {
  label: string;
  to: string;
}

export interface Client {
  id: string;
  clientName: string;
  dummyLogo: string; // Lucide icon name to render as logo
  logoText: string;  // Text representation for logo placeholder
  deliveredMetric: string;
  sector: string;
  overview: string;
  details: {
    challenge: string;
    solution: string;
    services: ClientService[];
    problem: string;
    goal: string;
    outcome: string;
  };
  telemetryLogs: string[];
}

export const CLIENTS_DATA: Client[] = [
  {
    id: "aptitude-tech",
    clientName: "Aptitude Technology Firm",
    dummyLogo: "Send",
    logoText: "APT",
    deliveredMetric: "350+ / Day Outbound Dials",
    sector: "B2B SaaS & Enterprise Tech",
    overview: "An enterprise B2B sales firm looking to scale target outreach and book product demo meetings.",
    details: {
      challenge: "High sales representative fatigue, low outbound dial volume, and high customer acquisition costs.",
      solution: "Scraped localized SaaS databases, verified phone channels, configured Vobiz VOIP trunking, and deployed ElevenLabs active voice calling agents.",
      services: [
        { label: "AI Lead Generation", to: "lead-gen" },
        { label: "Intelligent Automation", to: "automation" }
      ],
      problem: "Aptitude Technology suffered from a bottlenecked outbound pipeline. Sales reps spent hours manually dialing prospects, experiencing heavy fatigue, resulting in only 40 dials per day and a high Cost-Per-Acquisition (CPA).",
      goal: "Automate outbound prospecting and qualifying calls. Scale to 300+ dials per day with human-like voice synthesis, syncing hot leads directly to sales calendar tools.",
      outcome: "Deployed an outbound AI Voice Agent configured via Vobiz VOIP trunks. Handled 350+ calls daily, qualified leads via dynamic objection-handling scripts, and achieved an 18% qualification rate with zero manual calls."
    },
    telemetryLogs: [
      "SCRAPE: Aggregated 840 SaaS company entries.",
      "VERIFY: Ran SMTP pings. Verified 790 active emails.",
      "DIALER: Initiated ElevenLabs voice synthesis API gateway.",
      "VOIP: Registered outbound trunk via Vobiz.",
      "CALLS: Dispatched 352 outbound dialogues. 63 qualified.",
      "CALENDAR: Booked 12 demo slots on client CRM dashboard.",
      "STATUS: Queue processed. Outbound systems sleeping."
    ]
  },
  {
    id: "regional-retail",
    clientName: "Kalpana Retail Chain",
    dummyLogo: "Globe",
    logoText: "KRC",
    deliveredMetric: "+120% Web Traffic Boost",
    sector: "Consumer Goods & Retail",
    overview: "A regional brick-and-mortar retail business transitioning to headless mobile e-commerce.",
    details: {
      challenge: "Slow loading speeds (6.8s) causing massive cart drops, and slow manual ledger reconciliation.",
      solution: "Developed an edge-routed React landing page scoring 99+ on Lighthouse speed scores, and connected checkout logs to a WhatsApp-based bookkeeping bot.",
      services: [
        { label: "Digital Marketing", to: "web-dev" },
        { label: "Brand Design", to: "brand-design" }
      ],
      problem: "Kalpana's outdated WordPress storefront suffered from 6.8s load times, resulting in a 55% bounce rate among mobile shoppers and thousands of lost sales.",
      goal: "Build a modern, lightning-fast storefront with sub-second page loads, and automate cash reconciliations directly from checkout webhooks.",
      outcome: "Designed an edge-routed Next.js storefront scoring a perfect 99 on Lighthouse performance. Embedded a WhatsApp accounting bot (Abdul) that parsed Razorpay logs and wrote expenses straight to Supabase."
    },
    telemetryLogs: [
      "VITE: Building production assets for storefront...",
      "COMPRESS: Compressed 142 layout images. Optimized sizing.",
      "DEPLOY: Deployed storefront layout coordinates to Edge CDN.",
      "WEBHOOK: Razorpay transaction received. Reconciling...",
      "SYNC: Abdul Accountant logged payment to Supabase ledger.",
      "STATUS: Storefront online. Load speed latency: 12ms."
    ]
  },
  {
    id: "fitness-network",
    clientName: "Apex Gyms & Fitness Network",
    dummyLogo: "TrendingUp",
    logoText: "APX",
    deliveredMetric: "96.5% Contact Verify Rate",
    sector: "Healthcare & Wellness",
    overview: "A regional chain of fitness studios seeking localized member prospecting.",
    details: {
      challenge: "Sourcing and qualifying local leads manually from outdated business directories.",
      solution: "Deployed a customized market scraping script to extract clinics and gyms registry data, and ran HLR verification pings to secure a 96.5% contact precision rate.",
      services: [
        { label: "Market Analysis", to: "market-analysis" },
        { label: "AI Lead Generation", to: "lead-gen" }
      ],
      problem: "Apex Gyms relied on manual local scraping that was slow and yielded duplicate, inactive telephone records, leading to low dial conversions.",
      goal: "Harvest localized directory coordinates, verify active numbers via SMTP/HLR pings, and deliver clean databases containing 95%+ contact precision.",
      outcome: "Mapped regional fitness networks, scraped 1,120 nodes, verified active numbers, and reached a 96.5% contact verify rate. Pushed clean logs to CRM outreach queues."
    },
    telemetryLogs: [
      "SCRAPE: Crawled local wellness registries. Found 1,120 nodes.",
      "HLR: Initiated telecom carrier verification checks...",
      "VERIFY: Filtered 30 duplicates, detected 1,090 active numbers.",
      "DATABASE: Ingested leads into client Supabase tenant.",
      "STATUS: Verification complete. Data precision: 96.5%."
    ]
  },
  {
    id: "industrial-base",
    clientName: "Orion Engineering & Logistics",
    dummyLogo: "Database",
    logoText: "OEL",
    deliveredMetric: "15,000+ Pages Indexed Securely",
    sector: "Manufacturing & Distribution",
    overview: "An industrial firm needing private RAG searching capabilities for staff operations.",
    details: {
      challenge: "Technical staff spent up to 40 minutes looking up machine specs and compliance rules inside physical binders.",
      solution: "Built a private, secure pgvector PostgreSQL vector database indexing 15,000+ pages of machinery manuals with RAG retrieval speed of under 3 seconds.",
      services: [
        { label: "Custom AI Engineering", to: "ai-engineering" },
        { label: "Embedded Consulting", to: "consulting" }
      ],
      problem: "Field engineers spent excessive time looking up machinery tolerances and safety checklists within massive physical binders, stalling repair operations.",
      goal: "Create a private, offline-capable search system indexing all PDF manuals, resolving engineering queries in under 5 seconds with zero data leaks.",
      outcome: "Engineered a secure pgvector database chunking and indexing 15,000+ pages of documentation. Built a custom Retrieval-Augmented Generation (RAG) assistant, reducing query time to 3s."
    },
    telemetryLogs: [
      "INDEX: Ingesting technical machinery files PDF (480MB)...",
      "CHUNK: Sliced documents into 8,420 metadata-tagged chunks.",
      "EMBED: Computed vector weights on local GPU cores.",
      "WRITE: Wrote indices to secure private pgvector database.",
      "QUERY: Test lookup 'Node 4 Valve tolerance' resolved in 2.9ms.",
      "STATUS: Secure DPDP compliant tenant is online and active."
    ]
  },
  {
    id: "residential-agents",
    clientName: "B.T. Road Real Estate Group",
    dummyLogo: "Briefcase",
    logoText: "BTR",
    deliveredMetric: "4.2x ROI Multiple Verified",
    sector: "Real Estate & Property",
    overview: "A premium real estate developer seeking automated inbound lead booking channels.",
    details: {
      challenge: "High cost-per-lead and lag times between inquiry submission and sales team follow-up.",
      solution: "Built responsive property storefronts integrated with automated email workflows and instant SMS notifications.",
      services: [
        { label: "Embedded Consulting", to: "consulting" },
        { label: "Digital Marketing", to: "web-dev" }
      ],
      problem: "Inbound prospects experienced lag times of up to 24 hours between listing sign-ups and agent callback, leading to cold deals and a high CPL.",
      goal: "Reduce response latency to under 2 minutes, configure instant lead routing systems, and lower the CPL by 40% in 90 days.",
      outcome: "Embedded with client operations. Restructured landing pages for instant webhook triggers, connected automatic SMS dispatch, and linked calendars for instant scheduling, achieving a verified 4.2x ROI multiple."
    },
    telemetryLogs: [
      "AUDIT: Mapping customer real estate journey logs...",
      "FORM: Received webhook lead for 'Kalpana Apartment 1A'.",
      "SMS: Sent instant callback notification to agent.",
      "ROUTER: Scheduled automatic follow-up sequence. Email queued.",
      "METRICS: CPL reduction computed. Average multiple: 4.2x.",
      "STATUS: Lead routing portal active. Gateway nominal."
    ]
  },
  {
    id: "health-systems",
    clientName: "Kolkata Health Systems",
    dummyLogo: "ShieldCheck",
    logoText: "KHS",
    deliveredMetric: "99.9% Sync Uptime",
    sector: "Healthcare Operations",
    overview: "A multi-specialty regional hospital group seeking secure automated patient logs.",
    details: {
      challenge: "High processing delays in syncing emergency logs and pharmacy receipts across departments.",
      solution: "Configured pgvector database engines and custom n8n synchronization routines for secure real-time data ingestion.",
      services: [
        { label: "Custom AI Engineering", to: "ai-engineering" },
        { label: "Intelligent Automation", to: "automation" }
      ],
      problem: "Kolkata Health Systems suffered from slow database updates, creating critical delays in emergency patient updates and inventory tracking.",
      goal: "Implement automated scheduling logs and real-time database ingest routines to maintain emergency record synchronizations.",
      outcome: "Built active API gateway pipelines syncing pharmacy data streams securely, maintaining a 99.9% uptime metric for emergency access logs."
    },
    telemetryLogs: [
      "INGEST: Patient records ingestion queue initialized.",
      "VERIFY: Checked database HIPAA compliance filters.",
      "SYNC: Patient records verified (240 nodes synced).",
      "WRITE: Secure database write transaction completed.",
      "STATUS: Healthcare operations portal active. Uptime: 99.9%."
    ]
  },
  {
    id: "maple-wear",
    clientName: "Maple Girls Wear",
    dummyLogo: "Sparkles",
    logoText: "MAP",
    deliveredMetric: "3.5x Ad ROI Increase",
    sector: "E-Commerce Apparel",
    overview: "An online clothing brand seeking high-performance campaigns and storefront updates.",
    details: {
      challenge: "High customer acquisition costs on social performance media and poor checkout conversion rates.",
      solution: "Designed custom brand identity visual templates and deployed React-optimized landing pages with direct checkout webhook integrations.",
      services: [
        { label: "Digital Marketing", to: "web-dev" },
        { label: "Brand Design", to: "brand-design" }
      ],
      problem: "Maple Wear struggled to convert Instagram traffic, experiencing high advertising spends with minimal storefront click-throughs.",
      goal: "Develop rapid high-conversion storefronts and visual layouts to reduce customer acquisition costs.",
      outcome: "Built optimized static shopping pages that increased Meta/Google campaign click rates, boosting overall ROI by 3.5x."
    },
    telemetryLogs: [
      "STATIC: Rebuilding edge-cached product pages...",
      "MEDIA: Compiled advertising visual templates.",
      "CSS: Optimizing Tailwind assets for faster delivery.",
      "STATUS: Storefront optimized. Lighthouse score: 99."
    ]
  },
  {
    id: "tripti-wear",
    clientName: "Tripti Kids Wear",
    dummyLogo: "Cpu",
    logoText: "TKW",
    deliveredMetric: "+80% Organic Leads",
    sector: "Retail Clothing",
    overview: "A wholesale kids apparel retailer seeking local search optimization.",
    details: {
      challenge: "Low brand discoverability in competitive localized search registries.",
      solution: "Rebuilt technical SEO hierarchies and sitemap coordinates to direct search crawler crawlers.",
      services: [
        { label: "Digital Marketing", to: "web-dev" },
        { label: "Embedded Consulting", to: "consulting" }
      ],
      problem: "Tripti Kids Wear lacked visible online indexes, causing local distributors to choose competitors in regional web registries.",
      goal: "Optimize sitemaps, coordinate regional index terms, and double online discovery leads.",
      outcome: "Redesigned technical SEO files, crawled keyword targets, and increased organic client sign-ups by 80%."
    },
    telemetryLogs: [
      "SEO: Indexing local wholesale search tags...",
      "SITEMAP: Compiled directory tags and links.",
      "STATUS: Indexing verified. Search positions: +12 ranks."
    ]
  },
  {
    id: "cherry-brands",
    clientName: "Sweet Cherry Brands",
    dummyLogo: "Zap",
    logoText: "SCB",
    deliveredMetric: "95% Workflow Automation",
    sector: "Consumer Products",
    overview: "A consumer goods brand seeking operational workflow automation.",
    details: {
      challenge: "Manual customer message routing and spreadsheet inventory logging overhead.",
      solution: "Implemented Reasoning AI agents handling WhatsApp cloud webhooks and inventory syncing.",
      services: [
        { label: "Intelligent Automation", to: "automation" },
        { label: "Custom AI Engineering", to: "ai-engineering" }
      ],
      problem: "Sweet Cherry spent excessive overhead manually matching orders across inventory spreadsheets and email channels.",
      goal: "Automate receipt parsing, stock level updates, and customer shipping notices.",
      outcome: "Deployed Nova Chief of Staff agents and Abdul billing bots, automating 95% of back-office inventory overhead."
    },
    telemetryLogs: [
      "AGENT: Nova coordinator tracking inventory streams...",
      "OCR: Parsing bulk receipt images. OK.",
      "STATUS: Auto stock reconciliation complete."
    ]
  },
  {
    id: "tango-beverage",
    clientName: "Tango Food & Beverage",
    dummyLogo: "Globe",
    logoText: "TFB",
    deliveredMetric: "4.5x Social Engagement",
    sector: "Food & Beverage",
    overview: "A regional restaurant group seeking cinematic promotional video assets.",
    details: {
      challenge: "High media production costs and low engagement on video advertisements.",
      solution: "Produced cinematic AI film commercials and ElevenLabs narration scripts.",
      services: [
        { label: "AI Filmmaking", to: "filmmaking" },
        { label: "Brand Design", to: "brand-design" }
      ],
      problem: "Tango lacked high-quality commercial assets to launch their new food products on streaming media.",
      goal: "Create cinematic 4K promotional clips at a fraction of traditional agency costs.",
      outcome: "Scripted, storyboarded, and rendered 4K generative VFX videos, generating a 4.5x surge in social impressions."
    },
    telemetryLogs: [
      "VFX: Rendering frame timelines on Node GPU cluster...",
      "AUDIO: Synced synthetic audio scripts. Output OK.",
      "STATUS: Promo media complete and exported."
    ]
  },
  {
    id: "taeko-kids",
    clientName: "Taeko Kids Group",
    dummyLogo: "Sparkles",
    logoText: "TKG",
    deliveredMetric: "99.8% Data Accuracy",
    sector: "Education Systems",
    overview: "A specialized learning network seeking secure parent enrollment logs.",
    details: {
      challenge: "Incorrect registration data inputs causing administrative delays.",
      solution: "Built automated registration forms and webhook sanitization checkers.",
      services: [
        { label: "Custom AI Engineering", to: "ai-engineering" },
        { label: "Intelligent Automation", to: "automation" }
      ],
      problem: "Taeko Kids Group lost hours resolving typos and double-entries in student forms.",
      goal: "Automate data check logic and ingest verified names into local CRM schedules.",
      outcome: "Created ingestion nodes that verified phone lines and email patterns on submission."
    },
    telemetryLogs: [
      "FORM: Sanity checker running on student logs...",
      "STATUS: Data checks complete. Error rate: <0.2%."
    ]
  },
  {
    id: "mai-soli",
    clientName: "Mai Soli Ventures",
    dummyLogo: "TrendingUp",
    logoText: "MSV",
    deliveredMetric: "Incubated in 45 Days",
    sector: "Strategic Investment",
    overview: "An early-stage social enterprise preparing for pre-seed fundraising.",
    details: {
      challenge: "Lack of professional financial models and market benchmarking decks.",
      solution: "Assembled investor-ready pitch decks, sitemaps, and financial projection files.",
      services: [
        { label: "Strategic Investment", to: "investment" },
        { label: "Embedded Consulting", to: "consulting" }
      ],
      problem: "Mai Soli needed structured pitch documents and operational roadmaps to present to venture funds.",
      goal: "Establish capital allocation plans and build professional investor collateral.",
      outcome: "Provided embedded growth modeling, completed pitch designs, and prepared them for the pre-seed round."
    },
    telemetryLogs: [
      "VENTURES: Audit of startup cap tables complete.",
      "STATUS: Pitch deck exported to secure repository."
    ]
  },
  {
    id: "sovira-cosmetics",
    clientName: "Sovira Cosmetics",
    dummyLogo: "Send",
    logoText: "SVC",
    deliveredMetric: "+35% Conversion Rate",
    sector: "Direct-to-Consumer",
    overview: "A beauty brand seeking high-converting landing page layouts and SEO.",
    details: {
      challenge: "Low conversion rates on checkout pages and stagnant organic search visibility.",
      solution: "Re-designed visual styling architectures and optimized checkout pathways.",
      services: [
        { label: "Brand Design", to: "brand-design" },
        { label: "Digital Marketing", to: "web-dev" }
      ],
      problem: "Sovira's landing page converted visitors poorly (1.2%), making paid social campaigns unprofitable.",
      goal: "Upgrade page layouts, simplify checkout forms, and lift conversions above 3%.",
      outcome: "Deployed premium modern visual assets and clean edge routing, pushing checkout conversion rates up by 35%."
    },
    telemetryLogs: [
      "FIGMA: Syncing design tokens to styles...",
      "STATUS: Storefront conversion optimizer active."
    ]
  },
  {
    id: "simply-organic",
    clientName: "Simply Organic Co.",
    dummyLogo: "ShieldCheck",
    logoText: "SOC",
    deliveredMetric: "94.2% HLR Ping Success",
    sector: "Consumer Wellness",
    overview: "An organic health brand seeking verified localized lead directories.",
    details: {
      challenge: "Sourcing active email and phone directories for outbound newsletters.",
      solution: "Configured carrier HLR ping networks and scrubbed registry listings.",
      services: [
        { label: "Market Analysis", to: "market-analysis" },
        { label: "AI Lead Generation", to: "lead-gen" }
      ],
      problem: "Simply Organic suffered from high bounce rates (18%) in their B2C promotional campaigns.",
      goal: "Run telephone line pings, verify deliverability, and lower bounces below 2%.",
      outcome: "Scraped directories, verified numbers, and minimized campaign bounces to a verified 1.5% level."
    },
    telemetryLogs: [
      "HLR: Running pings on carrier gateway...",
      "STATUS: Target matching clean list. Bounces minimized."
    ]
  },
  {
    id: "mmgroup-kids",
    clientName: "MMGroup Kids",
    dummyLogo: "Cpu",
    logoText: "MMG",
    deliveredMetric: "-80% Back-Office Cost",
    sector: "Wholesale Distribution",
    overview: "A regional distributor seeking automated invoicing and bookkeeping sync.",
    details: {
      challenge: "High staffing overhead from manually compiling ledgers and printing shipping files.",
      solution: "Deployed automated PDF receipt parsing and synchronized invoices to CRM accounts.",
      services: [
        { label: "Intelligent Automation", to: "automation" },
        { label: "Custom AI Engineering", to: "ai-engineering" }
      ],
      problem: "MMGroup spent hours extracting invoicing metrics and booking details manually to keep inventory updated.",
      goal: "Automate billing logs, sync stock quantities, and reduce administrative payroll expenses.",
      outcome: "Constructed n8n invoice listeners and Google Sheets sync triggers, reducing back-office logistics costs by 80%."
    },
    telemetryLogs: [
      "BILLING: Invoice webhook received. Processing...",
      "STATUS: Sync complete. Tally sheet updated."
    ]
  },
  {
    id: "apex-logistics",
    clientName: "Apex Logistics Global",
    dummyLogo: "Server",
    logoText: "ALG",
    deliveredMetric: "12ms Ingest Latency",
    sector: "Supply Chain & IoT Analytics",
    overview: "A multinational shipping company needing real-time telemetry log parsing and geolocation routing.",
    details: {
      challenge: "High latency in updating shipping registries, and cargo temperature fluctuations going unnoticed.",
      solution: "Implemented edge API worker gateways and real-time n8n data check pipelines.",
      services: [
        { label: "Intelligent Automation", to: "automation" },
        { label: "Custom AI Engineering", to: "ai-engineering" }
      ],
      problem: "Apex Logistics struggled with a 3.5-minute lag in sensor reporting from refrigerated freight containers, leading to food and vaccine spoilage.",
      goal: "Achieve sub-second webhook responses, automate temperature out-of-bounds alerts, and centralize telemetry database structures.",
      outcome: "Deployed Cloudflare edge nodes handling container telemetry under 12ms. Structured automated WhatsApp alarms via Twilio, preventing inventory write-offs."
    },
    telemetryLogs: [
      "LISTEN: Ports 8080/8443 open for sensor webhooks.",
      "TELEMETRY: Temp check ping from Node #4289 (4.2°C).",
      "ALARM: Exceeded threshold on Container B12. Notification dispatched.",
      "STATUS: Latency holding steady at 11.8ms."
    ]
  },
  {
    id: "nova-biotech",
    clientName: "Nova BioTech Lab",
    dummyLogo: "Activity",
    logoText: "NBL",
    deliveredMetric: "99.99% Sequence Accuracy",
    sector: "Genomics & Clinical Research",
    overview: "A clinical research organization seeking localized genomic database parsing and semantic search capability.",
    details: {
      challenge: "Hours spent by lab techs manually matching gene variations in research databases.",
      solution: "Created pgvector indexes of genomic papers and automated compliance checks.",
      services: [
        { label: "Custom AI Solutions & Engineering", to: "ai-engineering" },
        { label: "Embedded Consulting", to: "consulting" }
      ],
      problem: "Nova BioTech had over 80,000 research archives with no centralized way to query gene sequence correlations semantic-wise.",
      goal: "Build a semantic search engine matching genome profiles to legacy research papers with sub-5 second responses.",
      outcome: "Structured private pgvector RAG database indexing all genomics files. Handled semantic matching in 1.4s with 99.99% precision."
    },
    telemetryLogs: [
      "GENOMICS: Indexing fasta sequences... (3.8GB)",
      "RAG: Created 42,000 high-dimensional vector embeddings.",
      "SEARCH: Matched sequence variant HLA-B57 to archive paper #1289.",
      "STATUS: Index sync complete. Precision verified."
    ]
  },
  {
    id: "helios-energy",
    clientName: "Helios Grid Systems",
    dummyLogo: "Zap",
    logoText: "HGS",
    deliveredMetric: "480k+ Nodes Monitored Daily",
    sector: "Renewable Energy & Infrastructure",
    overview: "A clean energy cooperative seeking automated load forecasting models and telemetry consoles.",
    details: {
      challenge: "Manual power grid scheduling resulted in high supply-demand gaps and grid stress.",
      solution: "Configured telemetry dashboards and automated pipeline routing grids.",
      services: [
        { label: "Market Analysis", to: "market-analysis" },
        { label: "Intelligent Automation", to: "automation" }
      ],
      problem: "Helios energy managers faced extreme fluctuations in solar array outputs, with manual load re-allocations taking 45 minutes.",
      goal: "Automate dynamic power load predictions and configure webhook dispatchers to level out grid stress.",
      outcome: "Programmed auto-schedulers forecasting demand curves, initiating battery dispatch triggers in 1.5 seconds during peak loads."
    },
    telemetryLogs: [
      "FORECAST: Demand prediction script executed for peak grid hours.",
      "BATTERY: Triggered dispatch webhook for Storage Unit C.",
      "METRIC: Levelized grid stress reduction calculated: -24%.",
      "STATUS: Grid telemetry nominal. 480k nodes online."
    ]
  },
  {
    id: "quantum-fintech",
    clientName: "Quantum Wealth Management",
    dummyLogo: "Lock",
    logoText: "QWM",
    deliveredMetric: "SOC-2 Ready Audit Trail",
    sector: "Financial Services & Asset Management",
    overview: "A premium wealth manager looking to audit internal compliance files and verify user onboarding data.",
    details: {
      challenge: "Regulatory compliance delays in checking investor verification forms and audit logs.",
      solution: "Built secure n8n automated check pipelines and vector-based document validation.",
      services: [
        { label: "Embedded Consulting", to: "consulting" },
        { label: "Custom AI Engineering", to: "ai-engineering" }
      ],
      problem: "Quantum Wealth's manual compliance process created a 5-day backlog for onboarding high-net-worth investors.",
      goal: "Automate background validation check chains and construct secure audit trails for SOC-2 compliance.",
      outcome: "Developed a secure validation engine running automated phone, email, and registry pings, reducing onboarding to 12 minutes."
    },
    telemetryLogs: [
      "SECURITY: Initialized SOC-2 compliant sandbox environment.",
      "VALIDATE: Ran anti-money laundering checks on investor record.",
      "AUDIT: Wrote immutable checksum trace to compliance database.",
      "STATUS: Verification finished in 11.2s. Output: APPROVED."
    ]
  },
  {
    id: "vertex-media",
    clientName: "Vertex Cinematic Agency",
    dummyLogo: "Layers",
    logoText: "VCA",
    deliveredMetric: "220+ AI Ads Produced",
    sector: "Digital Media & Advertising",
    overview: "A boutique ad agency utilizing Generative VFX and synthetic narration for localized product ads.",
    details: {
      challenge: "Exorbitant video editing fees and long delivery cycles for social media ad creatives.",
      solution: "Integrated generative video render clusters with ElevenLabs audio voice scripts.",
      services: [
        { label: "AI Filmmaking", to: "filmmaking" },
        { label: "Brand Design", to: "brand-design" }
      ],
      problem: "Vertex struggled to iterate fast enough on direct-response ad formats, spending $4k per ad on casting and shoots.",
      goal: "Create 50+ localized variations of product ads per month with hyper-realistic voice-over synthesis and visual styling.",
      outcome: "Engineered automated video rendering pipelines that generated 220+ ready-to-test ads with custom dynamic audio scripts."
    },
    telemetryLogs: [
      "RENDER: Initialized generative video synthesis cluster.",
      "AUDIO: Synced 12 regional dialect narrative tracks.",
      "EXPORT: Compiled 4K cinematic MP4 outputs.",
      "STATUS: Video ads dispatched to Meta campaigns."
    ]
  },
  {
    id: "stellar-estates",
    clientName: "Stellar Real Estate Group",
    dummyLogo: "Briefcase",
    logoText: "SRE",
    deliveredMetric: "+145% Lead Conversions",
    sector: "Real Estate & Architecture",
    overview: "A luxury property marketer needing automated outbound outreach pipelines and lead validation.",
    details: {
      challenge: "Inbound property inquiries were ignored or followed up late, causing cold leads.",
      solution: "Deployed ElevenLabs active voice agents connected via Vobiz VOIP to follow up instantly.",
      services: [
        { label: "AI Lead Generation", to: "lead-gen" },
        { label: "Digital Marketing", to: "web-dev" }
      ],
      problem: "Stellar Real Estate's luxury listing inquiries sat untouched on weekends, losing prospective buyers to faster agents.",
      goal: "Achieve instant phone call response under 60 seconds of form submissions and schedule agent showings.",
      outcome: "Integrated automated outbound calling agents, scheduling 18 visits a week with zero human manual dialing."
    },
    telemetryLogs: [
      "WEBHOOK: Luxury penthouse inquiry received from John D.",
      "DIAL: Dispatching voice outreach agent via Vobiz...",
      "CALL: Call duration: 2m 14s. Booking achieved.",
      "STATUS: Appt logged to Stellar CRM calendar."
    ]
  },
  {
    id: "aurora-wellness",
    clientName: "Aurora MedClinics Group",
    dummyLogo: "ShieldCheck",
    logoText: "AMC",
    deliveredMetric: "98.8% Patient Log Sync",
    sector: "Healthcare & Patient Care",
    overview: "A premium clinical chain needing secure HIPAA-compliant scheduling and ledger reconciliation.",
    details: {
      challenge: "Sync lag between patient check-in records and billing ledgers resulting in lost revenues.",
      solution: "Connected live webhooks to n8n database validators and Supabase ledger entries.",
      services: [
        { label: "Intelligent Automation", to: "automation" },
        { label: "Custom AI Engineering", to: "ai-engineering" }
      ],
      problem: "Aurora Clinics suffered from paper ledger updates that took 4 days, resulting in invoice tracking errors.",
      goal: "Create real-time secure syncing between patient bookings and the financial accounting core.",
      outcome: "Built automated synchronizers that verified check-in codes and updated billing queues in under 3 seconds."
    },
    telemetryLogs: [
      "HIPAA: Checking encryption keys on patient payload.",
      "SYNC: Logged appointment code P-9428 to finance core.",
      "TALLY: Reconciled copay receipt amount. OK.",
      "STATUS: Database sync complete. Uptime: 100.0%."
    ]
  },
  {
    id: "horizon-retail",
    clientName: "Horizon Consumer Brands",
    dummyLogo: "Globe",
    logoText: "HCB",
    deliveredMetric: "+3.8x E-Commerce ROI",
    sector: "Direct-to-Consumer & Retail",
    overview: "A multi-brand cosmetics company needing headless storefront development and conversion rate optimization.",
    details: {
      challenge: "Lagging page speeds on Shopify storefronts causing high mobile bounce rates.",
      solution: "Developed sub-second React storefronts and optimized advertising layouts.",
      services: [
        { label: "Digital Marketing", to: "web-dev" },
        { label: "Brand Design", to: "brand-design" }
      ],
      problem: "Horizon's mobile traffic suffered from a 6.2s load speed, yielding a high cart abandonment rate (74%).",
      goal: "Optimize page performance scoring, restructure checkout funnels, and boost return on ad spend.",
      outcome: "Built a headless static React architecture scoring 98+ on Lighthouse, increasing checkout speed and ad ROI to 3.8x."
    },
    telemetryLogs: [
      "VITE: Compiling optimized headless bundles...",
      "LIGHTHOUSE: Running performance analysis. Score: 98.",
      "WEBHOOK: Order data synced to logistics ledger.",
      "STATUS: Headless storefront active. Response: 15ms."
    ]
  },
  {
    id: "nebula-capital",
    clientName: "Nebula Ventures & Capital",
    dummyLogo: "TrendingUp",
    logoText: "NVC",
    deliveredMetric: "Incubated 8 Startups",
    sector: "Venture Capital & Incubation",
    overview: "A seed-stage investment firm seeking financial model structuring and capital allocation modeling.",
    details: {
      challenge: "Early-stage founders lacked standard pitch materials and financial projection modeling.",
      solution: "Embedded growth advisors to design investor pitch decks and financial schedules.",
      services: [
        { label: "Strategic Investment", to: "investment" },
        { label: "Embedded Consulting", to: "consulting" }
      ],
      problem: "Nebula's portfolio companies struggled to secure follow-on funding due to poorly structured pitch decks and growth projections.",
      goal: "Build institutional-grade financial models and visual pitch guides for all early-stage cohorts.",
      outcome: "Deployed embedded consultants to reconstruct pitch layouts, successfully guiding 8 startups to seed-stage closures."
    },
    telemetryLogs: [
      "FINANCE: Audit of portfolio runway logs completed.",
      "DECK: Exporting pitch design system vectors.",
      "STATUS: Investor database package assembled."
    ]
  },
  {
    id: "titan-security",
    clientName: "Titan Cyber Defense",
    dummyLogo: "ShieldCheck",
    logoText: "TCD",
    deliveredMetric: "100% Threat Isolation",
    sector: "Enterprise Cybersecurity",
    overview: "B2B security firm needing vector database lookup optimization for zero-day threat telemetry.",
    details: {
      challenge: "Processing thousands of network packets manually to flag intrusion telemetry.",
      solution: "Deployed private local LLMs and vector database indexes to classify anomalous actions.",
      services: [
        { label: "Custom AI Engineering", to: "ai-engineering" },
        { label: "Market Analysis", to: "market-analysis" }
      ],
      problem: "Titan Cyber Defense struggled to catalog high-frequency intrusion vectors in real-time, resulting in slow classification times.",
      goal: "Develop zero-day vector index models classification under 2 seconds.",
      outcome: "Configured pgvector database engines mapping network logs. Resolved threat taxonomy classification in 1.8s with complete data isolation."
    },
    telemetryLogs: [
      "INTRUSION: Received anomalous network log packet payload.",
      "VECTOR: Running pgvector threat database cosine similarity.",
      "MATCH: Intrusion vector classified: CVE-2026-9812.",
      "STATUS: Blocked socket connection. System isolated."
    ]
  }
];
