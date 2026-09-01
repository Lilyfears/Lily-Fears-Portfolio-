import { useRef, useState } from "react";
import { categories, horizontalGalleryRows, embedUrl, hoverVideoUrl, posterUrl, type Work, type TileSize } from "@/data/works";

const allWorks: Work[] = categories.filter(c => c.id !== "shorts").flatMap((c) => c.items);
const workById = new Map(allWorks.map(w => [w.id, w]));

// Width buckets (in % of container) per size.
const widthFor = (size: TileSize): string => {
  return size === "sm" ? "26%" : size === "md" ? "34%" : "44%";
};

export function MosaicSection({ onOpen }: { onOpen: (w: Work) => void }) {
  return (
    <div className="mx-auto max-w-[1500px] px-4 pb-8 pt-4 md:pb-16 md:pt-8 md:px-10">
      <div className="grid grid-cols-2 gap-4 md:block md:gap-0">
        {horizontalGalleryRows.map((row, rowIndex) => (
          <div key={rowIndex} className="contents md:flex md:justify-center md:gap-8 md:mb-8">
            {row.videos.map(({ id, size }) => {
              const work = workById.get(id);
              if (!work) return null;
              return (
                <FloatingTile key={id} work={work} size={size} onOpen={onOpen} />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingTile({
  work,
  size,
  onOpen,
}: {
  work: Work;
  size: TileSize;
  onOpen: (w: Work) => void;
}) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;
  const poster = posterUrl(work);
  const hoverSrc = hoverVideoUrl(work); // non-null only for horizontal

  function handleMouseEnter() {
    if (!canHover) return;
    setHover(true);
    if (hoverSrc && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }

  function handleMouseLeave() {
    setHover(false);
    if (hoverSrc && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(work)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Play video"
      style={{ flexBasis: "34%" }}
      className="group relative block min-w-[140px] overflow-hidden bg-[color:var(--ink-bg)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] transition-[transform,box-shadow] duration-[600ms] ease-out hover:-translate-y-1 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.95)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ink-ember)]"
    >
      <div
        className={`relative w-full ${
          work.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {work.platform === "mp4" ? (
          <video
            src={work.videoId}
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-[0.78] transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.03] group-hover:brightness-100"
          />
        ) : work.platform === "instagram" ? (
          <iframe
            src={embedUrl(work)}
            title=""
            tabIndex={-1}
            aria-hidden
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover border-0 brightness-[0.78] transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.03] group-hover:brightness-100"
          />
        ) : poster ? (
          <img
            src={poster}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover brightness-[0.78] transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.03] group-hover:brightness-100"
          />
        ) : null}
        {/* Horizontal: native MP4 hover preview */}
        {hoverSrc && (
          <video
            ref={videoRef}
            src={hoverSrc}
            preload="none"
            muted
            playsInline
            loop
            tabIndex={-1}
            aria-hidden
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[color:var(--ink-bg)]/30" />
      </div>
    </button>
  );
}
