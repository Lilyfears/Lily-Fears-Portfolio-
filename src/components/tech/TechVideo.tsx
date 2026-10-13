import { useState } from "react";
import { Play } from "lucide-react";
import { embedUrl, posterUrl, type Work } from "@/data/works";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--tech-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--tech-bg)]";

/** Shown while a video slot in src/data/tech.ts has no source yet. */
function MissingVideo({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`${label} (video not added yet)`}
      className="absolute inset-0 flex items-center justify-center border border-dashed border-[color:var(--tech-line)] bg-[color:var(--tech-raised)] text-center text-[color:var(--tech-dim)]"
    >
      <span className={compact ? "px-1 text-[10px] leading-tight" : "text-[13px]"}>
        Video not added yet
      </span>
    </div>
  );
}

function PlayMark({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-8" : "size-14";
  const icon = size === "sm" ? "size-3.5" : "size-5";
  return (
    <span
      aria-hidden
      className={`absolute left-1/2 top-1/2 flex ${box} -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 transition-colors group-hover:bg-[color:var(--tech-blue-solid)] group-hover:ring-transparent`}
    >
      <Play className={`${icon} translate-x-[1px] fill-current`} />
    </span>
  );
}

/**
 * Main project video: fixed 16:9 frame so every project lines up.
 * Local MP4s use native controls; YouTube/Vimeo show a poster and load the
 * player only when clicked (reusing embedUrl from works.ts).
 */
export function TechVideo({ work }: { work: Work }) {
  const [loaded, setLoaded] = useState(false);
  const label = work.title ?? "Video";

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      {!work.videoId ? (
        <MissingVideo label={label} />
      ) : work.platform === "mp4" ? (
        <video
          src={`${work.videoId}#t=0.1`}
          controls
          playsInline
          preload="metadata"
          aria-label={label}
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : loaded ? (
        <iframe
          src={embedUrl(work)}
          title={label}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Play ${label}`}
          className={`group absolute inset-0 h-full w-full ${focusRing}`}
        >
          {posterUrl(work) && (
            <img
              src={posterUrl(work)!}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
          <PlayMark />
        </button>
      )}
    </div>
  );
}

/** Small portrait thumbnail that opens the video in the modal. */
export function SocialCutThumb({ work, onOpen }: { work: Work; onOpen: (w: Work) => void }) {
  const label = work.title ?? "Social cut";

  if (!work.videoId) {
    return (
      <div className="relative aspect-[9/16] w-full">
        <MissingVideo label={label} compact />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(work)}
      aria-label={`Play ${label}`}
      aria-haspopup="dialog"
      className={`group relative block aspect-[9/16] w-full overflow-hidden bg-black ring-1 ring-[color:var(--tech-line)] transition-shadow hover:ring-[color:var(--tech-blue)] ${focusRing}`}
    >
      {work.platform === "mp4" ? (
        <video
          src={`${work.videoId}#t=0.1`}
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : (
        posterUrl(work) && (
          <img
            src={posterUrl(work)!}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
          />
        )
      )}
      <PlayMark size="sm" />
    </button>
  );
}
