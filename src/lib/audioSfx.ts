// Web Audio API Synthetic SFX Engine for MARS Portfolio

let audioCtx: AudioContext | null = null;
let isMuted = true;

// Initialize mute state from localStorage (default to true/muted)
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("mars-audio-muted");
  isMuted = stored === null ? true : stored === "true";
}

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const audioSfx = {
  getMuteState: () => isMuted,
  
  setMuteState: (muted: boolean) => {
    isMuted = muted;
    localStorage.setItem("mars-audio-muted", String(muted));
    if (!muted) {
      initAudioContext();
      // Play a diagnostic chirp on activation
      setTimeout(() => audioSfx.playBeep(), 50);
    }
  },

  playHover: () => {
    if (isMuted) return;
    try {
      const ctx = initAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // Extremely quick high click sound
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);
      
      gain.gain.setValueAtTime(0.005, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {
      console.warn("SFX error:", e);
    }
  },

  playClick: () => {
    if (isMuted) return;
    try {
      const ctx = initAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // Crisp high frequency chime
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("SFX error:", e);
    }
  },

  playBeep: () => {
    if (isMuted) return;
    try {
      const ctx = initAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // Short square wave synthesizer chirp
      osc.type = "square";
      osc.frequency.setValueAtTime(980, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn("SFX error:", e);
    }
  },

  playSuccess: () => {
    if (isMuted) return;
    try {
      const ctx = initAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // Ascending triple-tone chime
      osc.type = "sine";
      const now = ctx.currentTime;
      
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6
      
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.setValueAtTime(0.03, now + 0.16);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      
      osc.start();
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn("SFX error:", e);
    }
  }
};
