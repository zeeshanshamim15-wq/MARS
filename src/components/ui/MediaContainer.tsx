import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaContainerProps {
  aspectRatio?: "16:9" | "9:16" | "4:5" | "square";
  src?: string;
  type?: "image" | "video";
  className?: string;
  title?: string;
  overlayText?: string;
  showPlayIcon?: boolean;
}

export const MediaContainer = ({
  aspectRatio = "16:9",
  src,
  type = "image",
  className,
  title = "Media Placeholder",
  overlayText,
  showPlayIcon = false,
}: MediaContainerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const aspectClass = {
    "16:9": "aspect-video",
    "9:16": "aspect-[9/16]",
    "4:5": "aspect-[4/5]",
    "square": "aspect-square",
  }[aspectRatio];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:border-white/20 group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
        aspectClass,
        className
      )}
    >
      {/* Laser light edge hover effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 z-20 animate-pulse">
          <div className="h-8 w-8 rounded-full border-t-2 border-white/25 border-r-2 animate-spin mb-3" />
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Loading Assets...</span>
        </div>
      )}

      {src ? (
        type === "image" ? (
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onCanPlay={() => setIsLoading(false)}
          />
        )
      ) : (
        /* Empty High-Fidelity Placeholder style */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-radial-glow font-mono select-none">
          {/* Subtle grid lines in background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {showPlayIcon && (
              <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                <Play className="h-5 w-5 text-current translate-x-0.5" />
              </div>
            )}
            
            <span className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-2">
              {aspectRatio} Frame
            </span>
            <h4 className="text-xs font-semibold text-white/60 tracking-wider group-hover:text-white transition duration-300">
              {title}
            </h4>
            {overlayText && (
              <p className="text-[9px] text-white/40 mt-1 max-w-[200px] leading-relaxed">
                {overlayText}
              </p>
            )}
          </div>
          
          {/* Code frame status brackets */}
          <div className="absolute bottom-3 left-4 text-[8px] text-white/20">READY_FOR_ASSET</div>
          <div className="absolute bottom-3 right-4 text-[8px] text-white/20">MARS_STUDIO</div>
        </div>
      )}
    </div>
  );
};

export default MediaContainer;
