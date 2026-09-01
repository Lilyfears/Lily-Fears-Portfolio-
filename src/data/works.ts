export type Platform = "youtube" | "youtube-shorts" | "vimeo" | "mp4" | "instagram";
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

export type TileSize = "sm" | "md" | "lg";

export type MosaicRow = {
  videos: Array<{ id: string; size: TileSize }>;
};

export const heroReel = {
  platform: "mp4" as const,
  videoId: "/videos/main-reel.mp4",
  title: "Editing Reel",
};

// Explicit row-based layout for horizontal gallery
export const horizontalGalleryRows: MosaicRow[] = [
  {
    videos: [
      { id: "jw9u9pgFNDw", size: "md" },
      { id: "kZqPIIBZ4tg", size: "md" },
      { id: "Ma-RHYU3LOA", size: "md" },
    ],
  },
  {
    videos: [
      { id: "6bqtZcvfuws", size: "md" },
      { id: "6UIHj_-YPEE", size: "md" },
      { id: "2QSdVPY2688", size: "md" },
    ],
  },
  {
    videos: [
      { id: "Sry0blCEB8U", size: "sm" },
      { id: "GXHiis7Zt8I", size: "md" },
      { id: "SdtKDy8-Ph4", size: "sm" },
    ],
  },
  {
    videos: [
      { id: "u4gEBRSKi2E", size: "md" },
      { id: "BlpiRAAVB1A", size: "md" },
      { id: "3Eu80w5W2GI", size: "sm" },
    ],
  },
  {
    videos: [
      { id: "k94sfLpRTpY", size: "sm" },
      { id: "DbSah0vwwrU", size: "md" },
      { id: "0QCCS2eP3Q0", size: "md" },
    ],
  },
  {
    videos: [
      { id: "_a0d95ewlzY", size: "md" },
      { id: "yW-ZpSDu_b4", size: "md" },
      { id: "4RIzWIqF5s8", size: "md" },
    ],
  },
];

export const categories: Category[] = [
  {
    id: "music",
    index: "01",
    title: "Music Videos",
    kicker: "RHYTHM · ENERGY",
    items: [
      { id: "kZqPIIBZ4tg", platform: "youtube", videoId: "kZqPIIBZ4tg", orientation: "horizontal", title: "RUSTAGE - DREAMING ON (Official Music Video)" },
      { id: "Ma-RHYU3LOA", platform: "youtube", videoId: "Ma-RHYU3LOA", orientation: "horizontal", title: "Grace Power - The Kill (Official Music Video)" },
    ],
  },
  {
    id: "trailer",
    index: "02",
    title: "Trailer",
    kicker: "THRILLER",
    items: [
      { id: "6bqtZcvfuws", platform: "youtube", videoId: "6bqtZcvfuws", orientation: "horizontal", title: "HERE BEFORE Trailer (2022) Andrea Riseborough, Thriller Movie" },
    ],
  },
  {
    id: "alo",
    index: "03",
    title: "Alo Yoga",
    kicker: "FASHION•ATHLETICS",
    items: [
      { id: "6UIHj_-YPEE", platform: "youtube", videoId: "6UIHj_-YPEE", orientation: "horizontal", title: "Move into Wellness | Jimmy Butler | Recovery" },
      { id: "2QSdVPY2688", platform: "youtube", videoId: "2QSdVPY2688", orientation: "horizontal", title: "A Day in the Life | Georgia May Jagger" },
      { id: "Sry0blCEB8U", platform: "youtube", videoId: "Sry0blCEB8U", orientation: "horizontal", title: "Alo Atelier 2023 | Alo Wellness Club" },
      { id: "SdtKDy8-Ph4", platform: "youtube", videoId: "SdtKDy8-Ph4", orientation: "horizontal", title: "Alo Runners Global Run Club" },
    ],
  },
  {
    id: "jubilee",
    index: "04",
    title: "Jubilee",
    kicker: "REALITY·VIRAL",
    items: [
      { id: "u4gEBRSKi2E", platform: "youtube", videoId: "u4gEBRSKi2E", orientation: "horizontal", title: "What Defines Health? Fit Women vs. Overweight Women | Middle Ground" },
      { id: "BlpiRAAVB1A", platform: "youtube", videoId: "BlpiRAAVB1A", orientation: "horizontal", title: "1 woman lets 25 men shoot their shot" },
      { id: "3Eu80w5W2GI", platform: "youtube", videoId: "3Eu80w5W2GI", orientation: "horizontal", title: "6 Identical Twins vs 2 Fake | Odd One Out" },
      { id: "k94sfLpRTpY", platform: "youtube", videoId: "k94sfLpRTpY", orientation: "horizontal", title: "7 girls vs 7 guys | choose your crush" },
      { id: "DbSah0vwwrU", platform: "youtube", videoId: "DbSah0vwwrU", orientation: "horizontal", title: "Who's Autistic? Test Your Radar" },
    ],
  },
  {
    id: "featured",
    index: "00",
    title: "Featured",
    kicker: "NEW WORK",
    items: [
      { id: "jw9u9pgFNDw", platform: "youtube", videoId: "jw9u9pgFNDw", orientation: "horizontal", title: "Broken Cadence | Short Film | Canon USA" },
      { id: "GXHiis7Zt8I", platform: "youtube", videoId: "GXHiis7Zt8I", orientation: "horizontal", title: "Frozen Runner | ALO" },
      { id: "4RIzWIqF5s8", platform: "youtube", videoId: "4RIzWIqF5s8", orientation: "horizontal", title: "See You Next Summer | Short Film" },
      { id: "0QCCS2eP3Q0", platform: "youtube", videoId: "0QCCS2eP3Q0", orientation: "horizontal", title: "Freakbeast | Short Film" },
      { id: "_a0d95ewlzY", platform: "youtube", videoId: "_a0d95ewlzY", orientation: "horizontal", title: "Sapphic Steal｜Animation Short" },
      { id: "yW-ZpSDu_b4", platform: "youtube", videoId: "yW-ZpSDu_b4", orientation: "horizontal", title: "A Prickly Pair｜Animation Short" },
    ],
  },
  {
    id: "shorts",
    index: "05",
    title: "Digital / Social Content",
    kicker: "FILM/TV ADVERTISING",
    items: [
      {
        id: "DMVy9S0KB-9",
        platform: "mp4",
        videoId: "/reels/Film Marketing The Bad Guys 2.mp4",
        orientation: "vertical",
        title: "Film Marketing | The Bad Guys 2",
      },
      {
        id: "DVal52mFW85",
        platform: "mp4",
        videoId: "/reels/TV Marketing Paradise Season 2.mp4",
        orientation: "vertical",
        title: "TV Marketing | Paradise Season 2",
      },
      {
        id: "DXXG_d4jdx-",
        platform: "mp4",
        videoId: "/reels/TV Marketing Bear Grylls is Running Wild Season 1.mp4",
        orientation: "vertical",
        title: "TV Marketing | Bear Grylls is Running Wild Season 1",
      },
      {
        id: "DKhsytexR5m",
        platform: "mp4",
        videoId: "/reels/Film Marketing M3GAN 2.0.mp4",
        orientation: "vertical",
        title: "Film Marketing | M3GAN 2.0",
      },
      {
        id: "DZ3E5VWBOMQ",
        platform: "mp4",
        videoId: "/reels/TV Marketing Not Suitable For Work Season 1.mp4",
        orientation: "vertical",
        title: "TV Marketing | Not Suitable For Work Season 1",
      },
      {
        id: "dogman_h264",
        platform: "mp4",
        videoId: "/reels/Film Marketing Dog Man.mp4",
        orientation: "vertical",
        title: "Film Marketing | Dog Man",
      },
      {
        id: "fearfactor",
        platform: "mp4",
        videoId: "/reels/TV Marketing Fear Factor House of Fear Season 1.mp4",
        orientation: "vertical",
        title: "TV Marketing | Fear Factor: House of Fear Season 1",
      },
      {
        id: "songsungblue",
        platform: "mp4",
        videoId: "/reels/Film Marketing Song Sung Blue.mp4",
        orientation: "vertical",
        title: "Film Marketing | Song Sung Blue",
      },
      {
        id: "PowerBallad",
        platform: "mp4",
        videoId: "/reels/Film Marketing Power Ballad.mp4",
        orientation: "vertical",
        title: "Film Marketing | Power Ballad",
      },
      {
        id: "republicans-debate",
        platform: "mp4",
        videoId: "/reels/Film Marketing 28 Years Later.mp4",
        orientation: "vertical",
        title: "Film Marketing | 28 Years Later",
      },
    ],
  },
];

export function posterUrl(w: Work): string | null {
  if (w.platform === "instagram") return null;
  if (w.platform === "vimeo") {
    return `https://vumbnail.com/${w.videoId}.jpg`;
  }
  return `https://i.ytimg.com/vi/${w.videoId}/hqdefault.jpg`;
}

export function embedUrl(w: Work, opts: { preview?: boolean } = {}): string {
  const { preview = false } = opts;

  if (w.platform === "instagram") {
    return `https://www.instagram.com/reel/${w.videoId}/embed`;
  }

  if (w.platform === "vimeo") {
    const params = preview
      ? "background=1&muted=1&autoplay=1&loop=1"
      : "autoplay=1&title=0&byline=0&portrait=0";
    return `https://player.vimeo.com/video/${w.videoId}?${params}`;
  }

  const base = `https://www.youtube.com/embed/${w.videoId}`;
  const params = preview
    ? `mute=1&autoplay=1&controls=0&loop=1&playlist=${w.videoId}&modestbranding=1&playsinline=1&rel=0`
    : `autoplay=1&rel=0&playsinline=1&controls=1&origin=https://www.lilyxfears.com`;
  return `${base}?${params}`;
}

/** Returns the path to the local hover-preview MP4 for horizontal works, or null if none. */
export function hoverVideoUrl(w: Work): string | null {
  if (w.orientation !== "horizontal") return null;
  return `/hover/hover-${w.videoId}.mp4`;
}

