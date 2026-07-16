import { useState } from "react";
import { embedUrl, posterUrl, type Work } from "@/data/works";
import { Play } from "lucide-react";

export function VideoTile({
  work,
  onOpen,
  className = "",
  caption,
}: {
  work: Work;
  onOpen: (w: Work) => void;
  className?: string;
  caption?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;

  return (
    <button
      type="button"
      onClick={() => onOpen(work)}
      onMouseEnter={() => canHover && setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`Play ${work.title ?? "video"}`}
      className={`group relative block w-full overflow-hidden bg-[color:var(--ink-bg)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ink-ember)] ${className}`}
    >
      <div
        className={`relative w-full ${work.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"}`}
      >
        {work.platform === "mp4" ? (
          <video
            src={work.videoId}
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-90 transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.02] group-hover:brightness-100"
          />
        ) : work.platform === "instagram" ? (
          <iframe
            src={embedUrl(work)}
            title=""
            tabIndex={-1}
            aria-hidden
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover border-0 brightness-90 transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.02] group-hover:brightness-100"
          />
        ) : (
          posterUrl(work) && (
            <img
              src={posterUrl(work)!}
              alt={work.title ?? "Video thumbnail"}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.02] brightness-90 group-hover:brightness-100"
            />
          )
        )}
        {hover && work.platform !== "instagram" && work.platform !== "mp4" && (
          <iframe
            src={embedUrl(work, { preview: true })}
            title=""
            tabIndex={-1}
            aria-hidden
            allow="autoplay; muted"
            className="absolute inset-0 h-full w-full pointer-events-none scale-[1.35]"
          />
        )}
        {/* dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--ink-bg)]/40" />
        {/* play mark */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ink-fg)] opacity-70 group-hover:opacity-100 transition-opacity">
          <Play className="size-3 fill-current" />
          play
        </div>
      </div>
      {caption && (work.title || work.year || work.role) && (
        <div className="mt-3 flex flex-wrap gap-x-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-fg)]/60">
          {work.title && <span>{work.title}</span>}
          {work.role && <span>· {work.role}</span>}
          {work.year && <span>· {work.year}</span>}
        </div>
      )}
    </button>
  );
}
