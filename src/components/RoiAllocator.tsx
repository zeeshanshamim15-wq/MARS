import { useEffect, useState } from "react";
import { Cpu, DollarSign, Hourglass, TrendingUp } from "lucide-react";
import BorderLaserCard from "./ui/BorderLaserCard";

export default function RoiAllocator() {
  const [budget, setBudget] = useState(50000);
  const [volume, setVolume] = useState(10000);
  const [channel, setChannel] = useState<"leads" | "calls">("leads");

  // Output states for scrambler
  const [leadsVal, setLeadsVal] = useState("0");
  const [hoursVal, setHoursVal] = useState("0");
  const [roiVal, setRoiVal] = useState("0");

  const [isScrambling, setIsScrambling] = useState(false);

  // Math equations for values
  const targetLeads = Math.floor((budget * 0.003) + (volume * 0.02));
  const targetHours = Math.floor(volume * 0.12 + (budget / 2000));
  const targetRoi = Math.floor(budget * (channel === "leads" ? 4.2 : 3.6) + (volume * 2.5));

  useEffect(() => {
    setIsScrambling(true);
    let frames = 0;
    const maxFrames = 12;

    const interval = setInterval(() => {
      if (frames >= maxFrames) {
        clearInterval(interval);
        setLeadsVal(targetLeads.toLocaleString());
        setHoursVal(targetHours.toLocaleString());
        setRoiVal("₹" + targetRoi.toLocaleString());
        setIsScrambling(false);
      } else {
        // Scramble with random chars/digits
        setLeadsVal(Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(""));
        setHoursVal(Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join(""));
        setRoiVal("₹" + Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join(""));
        frames++;
      }
    }, 30);

    return () => clearInterval(interval);
  }, [budget, volume, channel, targetLeads, targetHours, targetRoi]);

  return (
    <div className="w-full max-w-5xl mx-auto my-16 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-none border border-emerald-500/20 bg-emerald-500/10 px-3 py-0.5 text-[9px] font-mono tracking-widest text-emerald-400 uppercase mb-3">
          SYSTEM_UTILITY // DECISION_ENGINE
        </div>
        <h2 className="text-2xl font-light tracking-tight text-white md:text-3xl font-mono">
          RESOURCE <span className="font-semibold text-emerald-400">ALLOCATOR</span>
        </h2>
        <p className="text-xs text-white/50 max-w-md mx-auto mt-2">
          Toggle automation cores and budget vectors to project efficiency telemetry.
        </p>
      </div>

      <BorderLaserCard className="p-6 md:p-8 bg-black/80 backdrop-blur-md shadow-2xl relative" borderRadius={0}>
        {/* Decorative corner highlights */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-7 space-y-8 font-mono">
            {/* Console Channel Toggles */}
            <div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-3">Select Core Channel:</span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setChannel("leads");
                  }}
                  className={`flex-1 py-2 px-4 border text-xs text-center transition-all ${
                    channel === "leads"
                      ? "bg-white text-black border-white font-semibold"
                      : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
                  }`}
                >
                  [ CORE: B2B_LEADGEN ]
                </button>
                <button
                  onClick={() => {
                    setChannel("calls");
                  }}
                  className={`flex-1 py-2 px-4 border text-xs text-center transition-all ${
                    channel === "calls"
                      ? "bg-white text-black border-white font-semibold"
                      : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10"
                  }`}
                >
                  [ CORE: AI_AGENTS_VOICE ]
                </button>
              </div>
            </div>

            {/* Slider 1: Monthly Ad Budget */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-white/60 tracking-wider">MONTHLY_AD_BUDGET:</span>
                <span className="text-emerald-400 font-bold">₹{budget.toLocaleString()}</span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 appearance-none outline-none cursor-pointer accent-white [&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black"
                />
              </div>
              <div className="flex justify-between text-[8px] text-white/30">
                <span>MIN: ₹10,000</span>
                <span>MID: ₹250,000</span>
                <span>MAX: ₹500,000</span>
              </div>
            </div>

            {/* Slider 2: AI Call / Interact Volume */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-white/60 tracking-wider">AUTOMATION_CALL_VOLUME:</span>
                <span className="text-emerald-400 font-bold">{volume.toLocaleString()} interactions</span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 appearance-none outline-none cursor-pointer accent-white [&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black"
                />
              </div>
              <div className="flex justify-between text-[8px] text-white/30">
                <span>MIN: 1,000 / mo</span>
                <span>MID: 50,000 / mo</span>
                <span>MAX: 100,000 / mo</span>
              </div>
            </div>
          </div>

          {/* Odometer Output Display Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <div className="border border-white/10 bg-white/[0.01] p-5 font-mono relative">
              <div className="absolute top-2 right-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[7px] text-emerald-400/80 tracking-widest uppercase">SYS_PROJECTION_READY</span>
              </div>

              {/* Indicator 1: Projected Leads */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-white/40 text-[9px] tracking-wider uppercase mb-1">
                  <Cpu className="h-3 w-3 text-white/30" />
                  PROJECTED_MONTHLY_LEADS
                </div>
                <div className={`text-2xl font-bold tracking-tight text-white ${isScrambling ? "text-emerald-500/70" : ""}`}>
                  {leadsVal}
                </div>
              </div>

              {/* Indicator 2: Hours Saved */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-white/40 text-[9px] tracking-wider uppercase mb-1">
                  <Hourglass className="h-3 w-3 text-white/30" />
                  MANUAL_HOURS_SAVED
                </div>
                <div className={`text-2xl font-bold tracking-tight text-white ${isScrambling ? "text-emerald-500/70" : ""}`}>
                  {hoursVal} hrs
                </div>
              </div>

              {/* Indicator 3: ROI Val */}
              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center gap-1.5 text-white/40 text-[9px] tracking-wider uppercase mb-1">
                  <TrendingUp className="h-3 w-3 text-white/30" />
                  EXPECTED_EFFICIENCY_VALUE
                </div>
                <div className={`text-3xl font-extrabold tracking-tight text-emerald-400 ${isScrambling ? "text-emerald-500/70" : ""}`}>
                  {roiVal}
                </div>
              </div>
            </div>

            <div className="text-[9px] text-white/35 font-mono leading-relaxed bg-white/5 border border-white/5 p-3">
              * Calculations are simulated using standard platform parameters (India DPDP DP-2023 isolated routing filters, 1 paisa token cost matching). Actual numbers fluctuate based on industry vectors and prompt schemas.
            </div>
          </div>
        </div>
      </BorderLaserCard>
    </div>
  );
}
