import { useState } from "react";
import { categories, embedUrl, posterUrl, type Work } from "@/data/works";

const allWorks: Work[] = categories.flatMap((c) => c.items);

function seeded(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Assign a size bucket so tiles vary but share the same gutter.
type Sized = Work & { size: "sm" | "md" | "lg" };

function sizeWorks(works: Work[]): Sized[] {
  const rand = seeded("mosaic-cluster-v2");
  return works.map((w) => {
    const r = rand();
    let size: "sm" | "md" | "lg";
    if (w.orientation === "vertical") {
      size = r < 0.5 ? "sm" : "md";
    } else {
      size = r < 0.33 ? "sm" : r < 0.75 ? "md" : "lg";
    }
    return { ...w, size };
  });
}

const sized = sizeWorks(allWorks);

// Width buckets (in % of container) per size + orientation.
const widthFor = (s: Sized): string => {
  if (s.orientation === "vertical") {
    return s.size === "sm" ? "14%" : "18%";
  }
  return s.size === "sm" ? "26%" : s.size === "md" ? "34%" : "44%";
};

const horizontals = sized.filter((w) => w.orientation === "horizontal");
const verticals = sized.filter((w) => w.orientation === "vertical");

export function MosaicSection({ onOpen }: { onOpen: (w: Work) => void }) {
  return (
    <div className="mx-auto max-w-[1500px] px-4 pb-32 pt-8 md:px-10">
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {horizontals.map((w, i) => (
          <FloatingTile key={w.id + i} work={w} onOpen={onOpen} />
        ))}
      </div>
      <div className="mt-6 flex flex-nowrap justify-center gap-6 md:mt-8 md:gap-8">
        {verticals.map((w, i) => (
          <FloatingTile key={w.id + i} work={w} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

function FloatingTile({
  work,
  onOpen,
}: {
  work: Sized;
  onOpen: (w: Work) => void;
}) {
  const [hover, setHover] = useState(false);
  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)")
      .matches;

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
        <img
          src={posterUrl(work)}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.78] transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.03] group-hover:brightness-100"
        />
        {hover && (
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
