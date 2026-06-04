import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import WordReveal from "@/components/ui/WordReveal";
import { ShieldCheck, Calendar, Lock } from "lucide-react";

export default function Privacy() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[hsl(210_24%_5%)] text-foreground">
      <ParallaxBackground src="/nebula.jpg" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-36 md:pt-44 pb-32 md:px-10">
        <div className="mars-glass-card rounded-[32px] p-5 sm:p-8 md:p-12 border border-white/10 bg-white/[0.01]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-white/5 pb-8 mb-8">
            <div>
              <h1 className="text-3xl font-light text-white tracking-tight">
                <WordReveal text="Privacy Policy" />
              </h1>
              <p className="text-xs text-white/40 mt-1">Last Updated: June 2026</p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="h-4 w-4" />
              India DPDP Act Compliant
            </div>
          </div>

          <div className="space-y-6 text-sm text-white/70 leading-relaxed">
            <section>
              <h3 className="text-white font-medium text-base mb-3">1. Data Fiduciary Status</h3>
              <p>
                Under India&apos;s Digital Personal Data Protection (DPDP) Act, Market Analyzers & Research Based Solutions Pvt. Ltd. (MARS) operates as a Data Fiduciary. We collect, store, and process business metadata under clear, explicit user consent agreements captured during trial signup.
              </p>
            </section>

            <section>
              <h3 className="text-white font-medium text-base mb-3">2. Information We Collect</h3>
              <p>
                We capture only the bare minimum details required to operate our WhatsApp bookkeeping agents and marketing grids:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-white/50">
                <li>Authorized WhatsApp phone numbers and corporate nicknames.</li>
                <li>Ledger transactions (expense, income description and amount).</li>
                <li>Receipt photos and voice transcripts processed via Google Gemini OCR channels.</li>
                <li>Customer email coordinates used solely for magic-link authentications.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-medium text-base mb-3">3. Data Isolation and Storage</h3>
              <p>
                We enforce database multi-tenancy. Every transaction holds a unique company identifier, isolated via database query filters and RLS parameters. Personal metadata is stored within secure encrypted cloud server arrays. Payment transaction records remain locked inside India-specific processing databases hosted by Razorpay.
              </p>
            </section>

            <section>
              <h3 className="text-white font-medium text-base mb-3">4. Right to Deletion (Erase-to-Forget)</h3>
              <p>
                In compliance with DPDP frameworks, users retain complete authority to request total account erasure. Upon receiving a verified request sent to our grievance contact email, all database rows, receipt documents, and audit logs will be permanently purged within 7 business days.
              </p>
            </section>

            <section>
              <h3 className="text-white font-medium text-base mb-3">5. Grievance Redressal</h3>
              <p>
                For any data-protection audits, withdrawal of consent, or security reporting, contact our data coordinator:
              </p>
              <div className="mt-3 p-4 rounded-xl border border-white/5 bg-white/[0.01] text-xs text-white/50">
                <p className="font-semibold text-white">Grievance Coordinator: Umar Iqbal</p>
                <p className="mt-1">Email: mars.iqsystem@gmail.com</p>
                <p>Address: 38C B.T. Road, Kolkata – 700056, India</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
