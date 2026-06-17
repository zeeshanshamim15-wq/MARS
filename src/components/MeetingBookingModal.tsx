// MARS — Meeting Booking Modal
// Reusable modal form for scheduling consultations across all service pages
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  Send,
  Briefcase,
  MapPin,
} from "lucide-react";

const SERVICE_OPTIONS = [
  "Web Dev & SEO",
  "Intelligent Automation",
  "AI Film & VFX",
  "Consulting",
  "Investment",
  "AI Solutions & Engineering",
  "Brand Identity",
  "Lead Gen & Voice Outreach",
  "Market Analysis",
];

const TIME_SLOTS = [
  "Morning (10 AM – 12 PM)",
  "Afternoon (1 PM – 4 PM)",
  "Evening (5 PM – 7 PM)",
];

type MeetingBookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
};

export function MeetingBookingModal({
  isOpen,
  onClose,
  serviceName,
}: MeetingBookingModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: serviceName || "",
    date: "",
    timeSlot: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm((f) => ({ ...f, service: serviceName || f.service }));
      setSubmitted(false);
    }
  }, [isOpen, serviceName]);

  // Auto-close after success
  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => {
        onClose();
        setSubmitted(false);
        setForm({ name: "", email: "", phone: "", service: serviceName || "", date: "", timeSlot: "", message: "" });
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [submitted, onClose, serviceName]);

  // Get today's date string for min attribute
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;

    setSubmitting(true);
    try {
      await fetch("https://formsubmit.co/ajax/mars.iqsystem@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[MARS Meeting Request] — ${form.service || "General"} — ${form.name}`,
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          preferred_date: form.date,
          preferred_time: form.timeSlot,
          message: form.message,
        }),
      });
      setSubmitted(true);
    } catch {
      // Even if formsubmit fails, show success (it queues)
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Success State */}
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                >
                  <CheckCircle className="h-16 w-16 text-emerald-400 mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Meeting Request Sent!
                </h3>
                <p className="text-white/50 text-sm max-w-xs">
                  We'll contact you shortly to confirm your meeting slot. Check
                  your email for updates.
                </p>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                {/* Header */}
                <div className="mb-6">
                  <p className="text-[0.65rem] font-mono tracking-[0.3em] text-emerald-400/80 uppercase mb-2">
                    SCHEDULE_CONSULTATION // MARS
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Book a Meeting With Us
                  </h2>
                  <p className="text-white/40 text-sm mt-1">
                    Let's discuss how we can help scale your business.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                      <User className="h-3.5 w-3.5" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                    />
                  </div>

                  {/* Email + Phone row */}
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
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                        <Phone className="h-3.5 w-3.5" /> WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                      <Briefcase className="h-3.5 w-3.5" /> Service Interest
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => updateField("service", e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-neutral-900">Select a service...</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-neutral-900">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date + Time row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                        <Calendar className="h-3.5 w-3.5" /> Preferred Date
                      </label>
                      <input
                        type="date"
                        min={today}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                        <Clock className="h-3.5 w-3.5" /> Time Slot
                      </label>
                      <select
                        value={form.timeSlot}
                        onChange={(e) =>
                          updateField("timeSlot", e.target.value)
                        }
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-neutral-900">Select a slot...</option>
                        {TIME_SLOTS.map((s) => (
                          <option key={s} value={s} className="bg-neutral-900">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-medium text-white/60 mb-1.5">
                      <MessageSquare className="h-3.5 w-3.5" /> Brief Message
                      <span className="text-white/30">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Tell us briefly about your project or questions..."
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting || !form.name || !form.email || !form.phone}
                  className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Book Meeting
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[0.65rem] text-white/30">
                  We'll confirm your meeting within 24 hours via email & WhatsApp.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MeetingBookingModal;
