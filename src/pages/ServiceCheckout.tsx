// MARS — Service Checkout Page
// Handles purchase flow for all non-Automation services
import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import MeetingBookingModal from "@/components/MeetingBookingModal";
import { useRazorpay } from "@/hooks/useRazorpay";
import { PRICING_SERVICES } from "@/data/pricingData";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  CreditCard,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  ArrowRight,
  Sparkles,
  Terminal,
  Calendar,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Steps ──────────────────────────────────────────
const STEPS = [
  { num: "01", label: "ORDER_SUMMARY" },
  { num: "02", label: "CLIENT_DETAILS" },
  { num: "03", label: "CHECKOUT" },
  { num: "04", label: "CONFIRMED" },
];

const BUSINESS_TYPES = [
  "Retail / E-commerce",
  "Healthcare / Clinic",
  "Real Estate",
  "Fitness / Wellness",
  "Education / Coaching",
  "SaaS / Technology",
  "Agency / Consulting",
  "Food & Beverage",
  "Other",
];

export default function ServiceCheckout() {
  const { serviceId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openCheckout, isSimulation } = useRazorpay();

  const currentService = PRICING_SERVICES.find((s) => s.id === serviceId);

  // Parse selected module indices from URL
  const modulesParam = searchParams.get("modules");
  const packageType = searchParams.get("package") || "bundle";

  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [step, setStep] = useState(1);
  const [meetingOpen, setMeetingOpen] = useState(false);

  // Client form
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    businessName: "",
    businessType: "",
    city: "",
    gstin: "",
  });
  const [consent, setConsent] = useState(false);

  // Payment state
  const [paymentId, setPaymentId] = useState("");
  const [simModalOpen, setSimModalOpen] = useState(false);
  const [simTab, setSimTab] = useState<"card" | "upi">("card");

  // Provisioning animation
  const [provLines, setProvLines] = useState<string[]>([]);
  const provRef = useRef<HTMLDivElement>(null);

  // Initialize selected modules
  useEffect(() => {
    if (!currentService) return;
    if (modulesParam) {
      const indices = modulesParam.split(",").map(Number).filter((n) => !isNaN(n) && n >= 0 && n < currentService.subServices.length);
      setSelectedIndices(indices.length > 0 ? indices : currentService.subServices.map((_, i) => i));
    } else {
      setSelectedIndices(currentService.subServices.map((_, i) => i));
    }
  }, [serviceId, modulesParam, currentService]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  if (!currentService) {
    return (
      <div className="relative min-h-screen bg-black text-white">
        <ParallaxBackground />
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <p className="text-white/40 font-mono text-sm">SERVICE_NOT_FOUND</p>
          <Link to="/pricing" className="text-emerald-400 underline text-sm">
            ← Back to Pricing
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Pricing calculations
  const allSelected = selectedIndices.length === currentService.subServices.length;
  const subtotal = selectedIndices.reduce(
    (sum, idx) => sum + currentService.subServices[idx].price,
    0
  );
  const finalPrice = allSelected ? currentService.bundlePrice : subtotal;
  const gst = Math.round(finalPrice * 0.18);
  const total = finalPrice + gst;

  const updateField = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const isFormValid =
    form.name.trim() && form.email.trim() && form.whatsapp.trim() && consent;

  // Toggle module selection
  const toggleModule = (idx: number) => {
    setSelectedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Handle payment
  const handlePayment = () => {
    if (isSimulation) {
      setSimModalOpen(true);
      return;
    }
    openCheckout({
      amount: total,
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.whatsapp,
      },
      description: `${currentService.name} — ${allSelected ? currentService.bundleName : "Custom Build"}`,
      onSuccess: (id) => {
        setPaymentId(id);
        setStep(4);
        startProvisioning();
      },
      onDismiss: () => {
        setSimModalOpen(true);
      },
    });
  };

  // Simulated payment
  const handleSimPayment = () => {
    const fakeId = `pay_sim_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setPaymentId(fakeId);
    setSimModalOpen(false);
    setStep(4);
    startProvisioning();

    // Also send form data via formsubmit
    fetch("https://formsubmit.co/ajax/mars.iqsystem@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `[MARS Purchase] — ${currentService.name} — ${form.name}`,
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp,
        business_name: form.businessName,
        business_type: form.businessType,
        city: form.city,
        gstin: form.gstin,
        service: currentService.name,
        package: allSelected ? currentService.bundleName : "Custom Build",
        selected_modules: selectedIndices.map((i) => currentService.subServices[i].name).join(", "),
        total_amount: `₹${total.toLocaleString("en-IN")}`,
        payment_id: fakeId,
      }),
    }).catch(() => {});
  };

  // Provisioning animation
  const startProvisioning = () => {
    const lines = [
      `> Initializing ${currentService.name} workspace...`,
      `> Client: ${form.name} | ${form.businessName || "Individual"}`,
      `> Allocating project resources...`,
      `> Configuring service modules (${selectedIndices.length} active)...`,
      ...selectedIndices.map(
        (i) => `  ✓ ${currentService.subServices[i].name} — activated`
      ),
      `> Assigning dedicated project manager...`,
      `> Setting up communication channels...`,
      `> Generating project timeline & milestones...`,
      `> ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `> STATUS: PROJECT_INITIALIZED // ALL SYSTEMS GO`,
    ];
    let idx = 0;
    setProvLines([]);
    const interval = setInterval(() => {
      if (idx < lines.length) {
        setProvLines((prev) => [...prev, lines[idx]]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 350);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <ParallaxBackground />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pt-28 pb-20">
        {/* Back navigation */}
        <button
          onClick={() => navigate(`/pricing/${serviceId}`)}
          className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-mono tracking-wider mb-8 transition cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> BACK_TO_CONFIGURATOR
        </button>

        {/* Service header */}
        <div className="mb-8">
          <p className="text-[0.65rem] font-mono tracking-[0.3em] text-emerald-400/80 uppercase mb-2">
            SECURE_CHECKOUT // {currentService.id.toUpperCase().replace("-", "_")}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {currentService.name}
          </h1>
          <p className="text-white/40 text-sm mt-1">{currentService.tagline}</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2 shrink-0">
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-lg border text-[0.6rem] font-mono font-bold transition-all ${
                  step === i + 1
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : step > i + 1
                    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-500/50"
                    : "border-white/10 bg-white/5 text-white/30"
                }`}
              >
                {step > i + 1 ? <Check className="h-3.5 w-3.5" /> : s.num}
              </div>
              <span
                className={`text-[0.6rem] font-mono tracking-wider ${
                  step === i + 1 ? "text-white/70" : "text-white/25"
                }`}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div className="w-6 h-px bg-white/10 mx-1" />
              )}
            </div>
          ))}
        </div>

        {/* ═══════════════ STEP 1: ORDER SUMMARY ═══════════════ */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Module checklist */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-xs font-mono tracking-wider text-white/60 mb-4">
                SELECTED_MODULES
              </h2>
              <div className="space-y-3">
                {currentService.subServices.map((sub, idx) => {
                  const isSelected = selectedIndices.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleModule(idx)}
                      className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-all text-left cursor-pointer ${
                        isSelected
                          ? "border-emerald-500/30 bg-emerald-500/5"
                          : "border-white/5 bg-white/[0.02] opacity-50"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 h-5 w-5 rounded-md border flex items-center justify-center mt-0.5 ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-white/20"
                        }`}
                      >
                        {isSelected && (
                          <Check className="h-3 w-3 text-black" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">
                          {sub.name}
                        </p>
                        <p className="text-xs text-white/40 mt-0.5">
                          {sub.description}
                        </p>
                      </div>
                      <span className="text-sm font-mono text-white/60 shrink-0">
                        ₹{sub.price.toLocaleString("en-IN")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price summary */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-xs font-mono tracking-wider text-white/60 mb-4">
                PRICE_BREAKDOWN
              </h2>
              <div className="space-y-2">
                {selectedIndices.map((idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-white/60"
                  >
                    <span>{currentService.subServices[idx].name}</span>
                    <span className="font-mono">
                      ₹{currentService.subServices[idx].price.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
                <div className="h-px bg-white/10 my-3" />
                {allSelected && (
                  <>
                    <div className="flex justify-between text-sm text-white/40">
                      <span>Subtotal (À-la-carte)</span>
                      <span className="font-mono line-through">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-emerald-400">
                      <span>Bundle Discount</span>
                      <span className="font-mono">
                        -₹{currentService.savings.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-sm text-white/40">
                  <span>GST (18%)</span>
                  <span className="font-mono">
                    ₹{gst.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="h-px bg-white/10 my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-white/60 tracking-wider">
                    TOTAL_DUE
                  </span>
                  <span className="text-xl font-bold font-mono text-white">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {allSelected && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <p className="text-xs text-emerald-400">
                    🎉 Bundle discount unlocked! You save ₹
                    {currentService.savings.toLocaleString("en-IN")} with the{" "}
                    {currentService.bundleName}.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={selectedIndices.length === 0}
              className="w-full py-3.5 bg-white text-black font-semibold rounded-xl text-sm font-mono tracking-wider hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue to Details <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* ═══════════════ STEP 2: CLIENT DETAILS ═══════════════ */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <h2 className="text-xs font-mono tracking-wider text-white/60 mb-6">
                CLIENT_PROFILE
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                    <User className="h-3.5 w-3.5" /> Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                  />
                </div>

                {/* Email + WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                      <Mail className="h-3.5 w-3.5" /> Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                      <Phone className="h-3.5 w-3.5" /> WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.whatsapp}
                      onChange={(e) => updateField("whatsapp", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Business Name + Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                      <Building2 className="h-3.5 w-3.5" /> Business Name
                    </label>
                    <input
                      type="text"
                      value={form.businessName}
                      onChange={(e) =>
                        updateField("businessName", e.target.value)
                      }
                      placeholder="Company / Brand name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                      <Sparkles className="h-3.5 w-3.5" /> Business Type
                    </label>
                    <select
                      value={form.businessType}
                      onChange={(e) =>
                        updateField("businessType", e.target.value)
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-neutral-900">
                        Select type...
                      </option>
                      {BUSINESS_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-neutral-900">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* City + GSTIN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                      <MapPin className="h-3.5 w-3.5" /> City
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="e.g. Kolkata"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                      <FileText className="h-3.5 w-3.5" /> GSTIN{" "}
                      <span className="text-white/30">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={form.gstin}
                      onChange={(e) => updateField("gstin", e.target.value)}
                      placeholder="22AAAAA0000A1Z5"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Consent */}
                <label className="flex items-start gap-3 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500/30 cursor-pointer"
                  />
                  <span className="text-xs text-white/40 leading-relaxed">
                    I agree to the MARS{" "}
                    <Link to="/privacy" className="text-emerald-400 underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link to="/terms" className="text-emerald-400 underline">
                      Terms of Service
                    </Link>
                    . I consent to MARS processing my data for service delivery.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3.5 border border-white/10 text-white/60 hover:text-white rounded-xl text-sm font-mono tracking-wider transition cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!isFormValid}
                className="flex-1 py-3.5 bg-white text-black font-semibold rounded-xl text-sm font-mono tracking-wider hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══════════════ STEP 3: CHECKOUT ═══════════════ */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Invoice */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-mono tracking-wider text-white/60">
                  INVOICE_PREVIEW
                </h2>
                <Shield className="h-4 w-4 text-emerald-400/50" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Client</span>
                  <span className="text-white font-medium">{form.name}</span>
                </div>
                {form.businessName && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Business</span>
                    <span className="text-white/80">{form.businessName}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Service</span>
                  <span className="text-white/80">{currentService.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Package</span>
                  <span className="text-white/80">
                    {allSelected ? currentService.bundleName : `Custom (${selectedIndices.length} modules)`}
                  </span>
                </div>
              </div>

              <div className="h-px bg-white/10 my-4" />

              <div className="space-y-2">
                {selectedIndices.map((idx) => (
                  <div key={idx} className="flex justify-between text-sm text-white/50">
                    <span>{currentService.subServices[idx].name}</span>
                    <span className="font-mono">
                      ₹{currentService.subServices[idx].price.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}

                {allSelected && (
                  <>
                    <div className="h-px bg-white/10 my-3" />
                    <div className="flex justify-between text-sm text-white/40">
                      <span>Subtotal</span>
                      <span className="font-mono line-through">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-emerald-400">
                      <span>Bundle Discount</span>
                      <span className="font-mono">
                        -₹{currentService.savings.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </>
                )}

                <div className="h-px bg-white/10 my-3" />
                <div className="flex justify-between text-sm text-white/50">
                  <span>Base Amount</span>
                  <span className="font-mono">₹{finalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-white/50">
                  <span>CGST @9%</span>
                  <span className="font-mono">₹{Math.round(gst / 2).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-white/50">
                  <span>SGST @9%</span>
                  <span className="font-mono">₹{Math.round(gst / 2).toLocaleString("en-IN")}</span>
                </div>
                <div className="h-px bg-white/10 my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-white/60 tracking-wider">
                    TOTAL_PAYABLE
                  </span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3.5 border border-white/10 text-white/60 hover:text-white rounded-xl text-sm font-mono tracking-wider transition cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 py-3.5 bg-emerald-500 text-black font-bold rounded-xl text-sm font-mono tracking-wider hover:bg-emerald-400 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <CreditCard className="h-4 w-4" />
                Pay via Razorpay
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══════════════ STEP 4: CONFIRMATION ═══════════════ */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Provisioning terminal */}
            <div className="rounded-2xl border border-emerald-500/20 bg-black/60 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-mono text-emerald-400/80 tracking-wider">
                  PROJECT_PROVISIONING
                </span>
              </div>
              <div
                ref={provRef}
                className="font-mono text-xs space-y-1.5 max-h-[300px] overflow-y-auto"
              >
                {provLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={
                      line.includes("STATUS:")
                        ? "text-emerald-400 font-bold mt-2"
                        : line.startsWith("  ✓")
                        ? "text-emerald-400/70 pl-2"
                        : "text-white/50"
                    }
                  >
                    {line}
                  </motion.p>
                ))}
                {provLines.length > 0 &&
                  provLines.length <
                    selectedIndices.length + 7 && (
                    <span className="inline-block h-3 w-1.5 bg-emerald-400 animate-pulse" />
                  )}
              </div>
            </div>

            {/* Success card */}
            {provLines.some((l) => l.includes("STATUS:")) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center"
              >
                <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">
                  Project Confirmed!
                </h2>
                <p className="text-white/50 text-sm mb-2">
                  Your {currentService.name} project is now in our pipeline.
                </p>
                <p className="text-xs font-mono text-white/30 mb-6">
                  Payment ID: {paymentId}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/917003939432?text=Hi%20MARS%2C%20I%20just%20made%20a%20purchase%20and%20want%20to%20discuss%20my%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-emerald-500 text-black font-semibold rounded-xl text-sm hover:bg-emerald-400 transition flex items-center justify-center gap-2"
                  >
                    💬 Chat on WhatsApp
                  </a>
                  <button
                    onClick={() => setMeetingOpen(true)}
                    className="px-6 py-3 border border-white/10 text-white/70 hover:text-white rounded-xl text-sm font-medium transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Kickoff Meeting
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── Meeting CTA (shown on steps 1-3) ────────────── */}
        {step < 4 && (
          <div className="mt-12 text-center">
            <p className="text-white/30 text-sm mb-2">
              Wanna know more about this service?
            </p>
            <button
              onClick={() => setMeetingOpen(true)}
              className="text-emerald-400 text-sm font-medium hover:text-emerald-300 underline underline-offset-4 transition cursor-pointer"
            >
              Book a meeting with us →
            </button>
          </div>
        )}
      </main>

      {/* ── Simulated Payment Modal ────────────────────── */}
      <AnimatePresence>
        {simModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSimModalOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-emerald-600 px-6 py-4 text-center">
                <p className="text-xs text-emerald-100/80 font-mono">
                  RAZORPAY SECURE CHECKOUT
                </p>
                <p className="text-lg font-bold text-white mt-1">
                  ₹{total.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setSimTab("card")}
                  className={`flex-1 py-3 text-xs font-mono transition cursor-pointer ${
                    simTab === "card"
                      ? "text-emerald-400 border-b-2 border-emerald-400"
                      : "text-white/40"
                  }`}
                >
                  💳 Card Payment
                </button>
                <button
                  onClick={() => setSimTab("upi")}
                  className={`flex-1 py-3 text-xs font-mono transition cursor-pointer ${
                    simTab === "upi"
                      ? "text-emerald-400 border-b-2 border-emerald-400"
                      : "text-white/40"
                  }`}
                >
                  📱 UPI
                </button>
              </div>

              <div className="p-6 space-y-4">
                {simTab === "card" ? (
                  <>
                    <input
                      readOnly
                      value="4111 1111 1111 1111"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 font-mono"
                    />
                    <div className="flex gap-3">
                      <input
                        readOnly
                        value="12/30"
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 font-mono"
                      />
                      <input
                        readOnly
                        value="123"
                        className="w-20 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 font-mono"
                      />
                    </div>
                  </>
                ) : (
                  <input
                    readOnly
                    value="success@razorpay"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 font-mono"
                  />
                )}

                <button
                  onClick={handleSimPayment}
                  className="w-full py-3 bg-emerald-500 text-black font-bold rounded-xl text-sm hover:bg-emerald-400 transition cursor-pointer"
                >
                  Authorize Simulated Payment
                </button>
                <button
                  onClick={() => setSimModalOpen(false)}
                  className="w-full py-2 text-white/40 text-xs hover:text-white/60 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meeting Modal */}
      <MeetingBookingModal
        isOpen={meetingOpen}
        onClose={() => setMeetingOpen(false)}
        serviceName={currentService.name}
      />

      <Footer />
    </div>
  );
}
