import { motion, AnimatePresence } from "framer-motion";
import { useState, MouseEvent, useRef, useEffect } from "react";
import { heroReel, posterUrl } from "@/data/works";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export function HeroReel() {
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  const title = "EDITING REEL";
  const sub = "LILY FEARS";

  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Control audio state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const handleVideoClick = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }

    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress(videoRef.current.currentTime / videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pos * videoRef.current.duration;
    setProgress(pos);
  };

  return (
    <section
      onClick={handleVideoClick}
      className="relative h-[65svh] md:h-[100svh] w-full overflow-hidden bg-[color:var(--ink-bg)]"
    >
      {/* Video — cover via scale */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-0 md:block">
        <video
          ref={videoRef}
          src="/videos/main-reel.mp4"
          autoPlay
          loop
          muted={muted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="w-full aspect-video md:aspect-auto pointer-events-none md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-[56.25vw] md:min-h-full md:w-[177.77vh] md:min-w-full md:scale-[1.15] object-cover"
        />
      </div>



      {/* Darken */}
      <div className="absolute inset-0 bg-[color:var(--ink-bg)]/45" />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, color-mix(in oklab, var(--ink-bg) 80%, transparent) 100%)",
        }}
      />

      {/* Title */}
      <AnimatePresence>
        {showTitle && muted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 hidden h-full flex-col items-center justify-center px-6 text-center md:flex"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-[color:var(--ink-fg)]/70"
            >
              <br />
            </motion.div>
            <h1 className="mt-6 whitespace-nowrap font-rx100 text-[14vw] italic leading-[0.9] text-[color:var(--ink-fg)] md:text-[8rem]">
              {title.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: "60%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.04, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--ink-fg)]/60"
            >
              {sub}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-6 left-6 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--ink-fg)]/60 md:bottom-8 md:left-10">
        <span className="inline-block animate-pulse">↓ scroll</span>
      </div>
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-4 md:gap-5 md:bottom-8 md:right-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (videoRef.current?.paused) {
              videoRef.current.play();
              setIsPlaying(true);
            } else {
              videoRef.current?.pause();
              setIsPlaying(false);
            }
          }}
          className="flex items-center justify-center text-[color:var(--ink-fg)]/70 hover:text-[color:var(--ink-ember)] transition-colors"
          aria-label="Play or Pause"
        >
          {isPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
        </button>

        <div
          className="w-[120px] sm:w-[200px] md:w-[280px] h-6 flex items-center cursor-pointer touch-none group"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => {
            e.stopPropagation();
            e.currentTarget.setPointerCapture(e.pointerId);
            handleSeek(e);
          }}
          onPointerMove={(e) => {
            e.stopPropagation();
            if (e.buttons === 1) handleSeek(e);
          }}
        >
          <div className="relative w-full h-[2px] bg-[color:var(--ink-fg)]/20 rounded-full">
            <div
              className="absolute left-0 top-0 bottom-0 bg-[color:var(--ink-fg)]/70 group-hover:bg-[color:var(--ink-ember)] transition-colors"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[color:var(--ink-fg)] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress * 100}% - 5px)` }}
            />
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setMuted((m) => !m);
          }}
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--ink-fg)]/70 hover:text-[color:var(--ink-ember)] transition-colors"
        >
          {muted ? <VolumeX className="size-3" /> : <Volume2 className="size-3" />}
          <span className="hidden sm:inline">sound {muted ? "off" : "on"}</span>
        </button>
      </div>
    </section>
  );
}
