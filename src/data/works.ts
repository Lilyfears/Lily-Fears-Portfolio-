export type Platform = "youtube" | "youtube-shorts" | "vimeo" | "mp4";
export type Orientation = "horizontal" | "vertical";

export type Work = {
  id: string;
  platform: Platform;
  videoId: string;
  title?: string;
  year?: string;
  role?: string;
  orientation: Orientation;
};

export type Category = {
  id: string;
  index: string; // "01", "02"…
  title: string;
  kicker?: string;
  items: Work[];
};

export const heroReel = {
  platform: "youtube" as const,
  videoId: "A9VmgUbaZNM",
  title: "Editing Reel",
};

export const categories: Category[] = [
  {
    id: "music",
    index: "01",
    title: "Music Videos",
    kicker: "RHYTHM · ENERGY",
    items: [
      { id: "kZqPIIBZ4tg", platform: "youtube", videoId: "kZqPIIBZ4tg", orientation: "horizontal" },
      { id: "Ma-RHYU3LOA", platform: "youtube", videoId: "Ma-RHYU3LOA", orientation: "horizontal" },
    ],
  },
  {
    id: "trailer",
    index: "02",
    title: "Trailer",
    kicker: "THRILLER",
    items: [
      { id: "6bqtZcvfuws", platform: "youtube", videoId: "6bqtZcvfuws", orientation: "horizontal" },
    ],
  },
  {
    id: "alo",
    index: "03",
    title: "Alo Yoga",
    kicker: "FASHION•ATHLETICS",
    items: [
      { id: "6UIHj_-YPEE", platform: "youtube", videoId: "6UIHj_-YPEE", orientation: "horizontal" },
      { id: "2QSdVPY2688", platform: "youtube", videoId: "2QSdVPY2688", orientation: "horizontal" },
      { id: "Sry0blCEB8U", platform: "youtube", videoId: "Sry0blCEB8U", orientation: "horizontal" },
      { id: "SdtKDy8-Ph4", platform: "youtube", videoId: "SdtKDy8-Ph4", orientation: "horizontal" },
    ],
  },
  {
    id: "jubilee",
    index: "04",
    title: "Jubilee",
    kicker: "REALITY·VIRAL",
    items: [
      { id: "u4gEBRSKi2E", platform: "youtube", videoId: "u4gEBRSKi2E", orientation: "horizontal" },
      { id: "BlpiRAAVB1A", platform: "youtube", videoId: "BlpiRAAVB1A", orientation: "horizontal" },
      { id: "3Eu80w5W2GI", platform: "youtube", videoId: "3Eu80w5W2GI", orientation: "horizontal" },
      { id: "k94sfLpRTpY", platform: "youtube", videoId: "k94sfLpRTpY", orientation: "horizontal" },
    ],
  },
  {
    id: "shorts",
    index: "05",
    title: "Digital / Shorts",
    kicker: "FILM ADVERTISING",
    items: [
      { id: "gW5RIOzweo4", platform: "youtube-shorts", videoId: "gW5RIOzweo4", orientation: "vertical" },
      { id: "UNK_33ex4ZY", platform: "youtube-shorts", videoId: "UNK_33ex4ZY", orientation: "vertical" },
      { id: "HePZSxN5kZM", platform: "youtube-shorts", videoId: "HePZSxN5kZM", orientation: "vertical" },
      { id: "c4dq0q7Ehv0", platform: "youtube-shorts", videoId: "c4dq0q7Ehv0", orientation: "vertical" },
    ],
  },
];

export function posterUrl(w: Work): string {
  if (w.platform === "vimeo") {
    // Vimeo poster requires oEmbed; fall back to a dark frame placeholder.
    return `https://vumbnail.com/${w.videoId}.jpg`;
  }
  return `https://i.ytimg.com/vi/${w.videoId}/hqdefault.jpg`;
}

export function embedUrl(w: Work, opts: { preview?: boolean } = {}): string {
  const { preview = false } = opts;
  if (w.platform === "vimeo") {
    const params = preview
      ? "background=1&muted=1&autoplay=1&loop=1"
      : "autoplay=1&title=0&byline=0&portrait=0";
    return `https://player.vimeo.com/video/${w.videoId}?${params}`;
  }
  // youtube & youtube-shorts
  const base = `https://www.youtube.com/embed/${w.videoId}`;
  const params = preview
    ? `mute=1&autoplay=1&controls=0&loop=1&playlist=${w.videoId}&modestbranding=1&playsinline=1&rel=0`
    : `autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  return `${base}?${params}`;
}
