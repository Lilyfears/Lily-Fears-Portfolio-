import { motion } from "framer-motion";
import { useState, MouseEvent, useRef, useEffect } from "react";
import { heroReel } from "@/data/works";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";

export function HeroReel() {
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Keep src stable to prevent iframe reloads when muted changes
  const src = `https://www.youtube.com/embed/${heroReel.videoId}?autoplay=1&loop=1&playlist=${heroReel.videoId}&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1`;

  const title = "EDITING REEL";
  const sub = "LILY FEARS";

  // Control audio state via postMessage instead of recreating/reloading the iframe
  useEffect(() => {
    if (!iframeRef.current) return;
    const command = muted ? "mute" : "unMute";
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: "" }),
      "*",
    );
  }, [muted]);

  const handleVideoClick = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }

    if (!iframeRef.current) return;

    setIsPlaying((prev) => {
      const next = !prev;
      const command = next ? "playVideo" : "pauseVideo";
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: command, args: "" }),
        "*",
      );
      return next;
    });
  };

  const handleRestartClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "seekTo", args: [0, true] }),
      "*",
    );
  };

  return (
    <section
      onClick={handleVideoClick}
      className="relative h-[100svh] w-full overflow-hidden bg-[color:var(--ink-bg)]"
    >
      {/* Video — cover via scale */}
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          src={src}
          title="Editing Reel"
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[56.25vw] min-h-full w-[177.77vh] min-w-full"
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
      {muted && (
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2 }}
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-[color:var(--ink-fg)]/70"
          >
            <br />
          </motion.div>
          <h1 className="mt-6 whitespace-nowrap font-serif text-[14vw] italic leading-[0.9] text-[color:var(--ink-fg)] md:text-[8rem]">
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
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--ink-fg)]/60"
          >
            {sub}
          </motion.div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-6 left-6 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--ink-fg)]/60 md:bottom-8 md:left-10">
        <span className="inline-block animate-pulse">↓ scroll</span>
      </div>
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-4 md:bottom-8 md:right-10">
        <button
          onClick={handleRestartClick}
          className="flex items-center justify-center text-[color:var(--ink-fg)]/70 hover:text-[color:var(--ink-ember)] transition-colors"
          aria-label="Restart video"
        >
          <RotateCcw className="size-3" />
        </button>
        <button
          onClick={() => setMuted((m) => !m)}
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--ink-fg)]/70 hover:text-[color:var(--ink-ember)] transition-colors"
        >
          {muted ? <VolumeX className="size-3" /> : <Volume2 className="size-3" />}
          sound {muted ? "off" : "on"}
        </button>
      </div>
    </section>
  );
}
