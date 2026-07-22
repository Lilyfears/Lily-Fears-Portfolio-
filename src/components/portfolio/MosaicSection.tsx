import { useState } from "react";
import { categories, horizontalGalleryRows, embedUrl, posterUrl, type Work, type TileSize } from "@/data/works";

const allWorks: Work[] = categories.filter(c => c.id !== "shorts").flatMap((c) => c.items);
const workById = new Map(allWorks.map(w => [w.id, w]));

// Width buckets (in % of container) per size.
const widthFor = (size: TileSize): string => {
  return size === "sm" ? "26%" : size === "md" ? "34%" : "44%";
};

export function MosaicSection({ onOpen }: { onOpen: (w: Work) => void }) {
  return (
    <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 md:px-10">
      {/* Horizontal gallery with explicit row layout */}
      {horizontalGalleryRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-6 md:gap-8 mb-6 md:mb-8">
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
  );
}

function FloatingTile({
  work,
  onOpen,
}: {
  work: Work;
  onOpen: (w: Work) => void;
}) {
  const [hover, setHover] = useState(false);
  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;
  const poster = posterUrl(work);

  return (
    <button
      type="button"
      onClick={() => onOpen(work)}
      onMouseEnter={() => canHover && setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Play video"
      style={{ flexBasis: widthFor(work) }}
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
        {hover && work.platform !== "instagram" && work.platform !== "mp4" && (
          <iframe
            src={embedUrl(work, { preview: true })}
            title=""
            tabIndex={-1}
            aria-hidden
            allow="autoplay; muted"
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.35]"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[color:var(--ink-bg)]/30" />
      </div>
    </button>
  );
}
