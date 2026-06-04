import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import WordReveal from "@/components/ui/WordReveal";
import { FileText, CheckCircle2 } from "lucide-react";

export default function Terms() {
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
                <WordReveal text="Terms of Service" />
              </h1>
              <p className="text-xs text-white/40 mt-1">Last Updated: June 2026</p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 font-medium">
              <FileText className="h-4 w-4" />
              Service Agreement
            </div>
          </div>

          <div className="space-y-6 text-sm text-white/70 leading-relaxed">
            <section>
              <h3 className="text-white font-medium text-base mb-3">1. Scope of Service</h3>
              <p>
                Market Analyzers & Research Based Solutions Pvt. Ltd. (MARS) provides conversational &ldquo;AI Employee&rdquo; accounting assistance (Abdul) and document drafting scripts (Orion) over WhatsApp and web interfaces. Our services are tools designed to assist in company recordkeeping and do not constitute certified financial accounting or tax consultancy.
              </p>
            </section>

            <section>
              <h3 className="text-white font-medium text-base mb-3">2. Fair-Use & Credit System</h3>
              <p>
                Each subscription plan includes a designated bucket of credits. Accounts executing heavy media conversions or statement imports that exceed fair-use parameters will have their automated actions paused until extra &ldquo;Overtime&rdquo; credit packs are configured. Abuse of background workers or message-bombing will trigger immediate account suspension.
              </p>
            </section>

            <section>
              <h3 className="text-white font-medium text-base mb-3">3. Liability Limitations & Accuracy</h3>
              <p>
                While our models run on advanced Google Gemini neural engines, automated transcriptions and OCR conversions can occasionally return incorrect digits or hallucinated metrics. Business owners are solely responsible for verifying the accuracy of ledger balances, salary disbursements, and GST calculations before committing them to formal tax filings or transactions.
              </p>
            </section>

            <section>
              <h3 className="text-white font-medium text-base mb-3">4. Channel Policies (WhatsApp)</h3>
              <p>
                As our interface operates on top of Meta Cloud API layers, user access is subject to Meta Policies. Users must verify they are not using our agents for spamming, distributing forbidden links, or storing highly sensitive personal identifiers (such as raw credit card codes or passwords) in chat history.
              </p>
            </section>

            <section>
              <h3 className="text-white font-medium text-base mb-3">5. Termination</h3>
              <p>
                Subscriptions are billed on monthly or annual schedules. Payments are processed securely via external processors. Users can cancel active contracts at any time. Cancelled paid tiers preserve current ledger rows in a read-only trial dashboard state.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
