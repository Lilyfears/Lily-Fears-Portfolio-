import type { Work } from "./works";

/**
 * Content for the /tech landing page.
 *
 * VIDEO SOURCES STILL NEEDED: none of these videos exist in the repo yet.
 * Fill in each `videoId` (and `platform`) below, using the same formats as
 * src/data/works.ts:
 *   - Local file:  platform "mp4",     videoId "/tech/turbopuffer.mp4"  (file in public/tech/)
 *   - YouTube:     platform "youtube", videoId "kZqPIIBZ4tg"
 *   - Vimeo:       platform "vimeo",   videoId "1162197723"
 * A project (or social cut) with an empty videoId is hidden from the page
 * until its video is added.
 */

export type TechProject = {
  id: string;
  title: string;
  type: string;
  description: string;
  video: Work;
  socialCuts?: Work[];
};

export const techProjects: TechProject[] = [
  {
    id: "turbopuffer",
    title: "Turbopuffer",
    type: "Product commercial",
    description: "A product-focused commercial that explains what Turbopuffer does.",
    video: {
      id: "turbopuffer",
      platform: "youtube",
      videoId: "neaCaCYDTmQ",
      orientation: "horizontal",
      title: "Turbopuffer product commercial",
    },
  },
  {
    id: "tolan",
    title: "Tolan",
    type: "Product commercial",
    description: "A commercial that communicates how Tolan's product differs from other chatbots.",
    video: {
      id: "tolan",
      platform: "mp4",
      videoId: "", // TODO: add Tolan commercial
      orientation: "horizontal",
      title: "Tolan product commercial",
    },
  },
  {
    id: "rilian",
    title: "Rilian",
    type: "Conference highlights and social content",
    description: "Highlights and short-form videos created from conference presentations.",
    video: {
      id: "rilian-sizzle",
      platform: "youtube",
      videoId: "THoZcULkiM8",
      orientation: "horizontal",
      title: "Rilian conference sizzle",
    },
    socialCuts: [
      {
        id: "rilian-social-1",
        platform: "mp4",
        videoId: "/tech/rilian-social-1.mp4",
        orientation: "vertical",
        title: "Rilian social cut 1",
      },
      {
        id: "rilian-social-2",
        platform: "mp4",
        videoId: "/tech/rilian-social-2.mp4",
        orientation: "vertical",
        title: "Rilian social cut 2",
      },
      {
        id: "rilian-social-3",
        platform: "mp4",
        videoId: "/tech/rilian-social-3.mp4",
        orientation: "vertical",
        title: "Rilian social cut 3",
      },
    ],
  },
];

export const techServices = [
  {
    title: "Product videos",
    body: "Commercials, product explainers, and launch videos.",
  },
  {
    title: "Events and interviews",
    body: "Conference highlights, presentation edits, and interview content.",
  },
  {
    title: "Social media content",
    body: "Short-form videos adapted from existing footage and longer edits.",
  },
];

export const contactEmail = "lilyxfears@gmail.com";
