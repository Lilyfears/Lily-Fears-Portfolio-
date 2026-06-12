import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeroReel } from "@/components/portfolio/HeroReel";
import { Nav } from "@/components/portfolio/Nav";
import { GrainOverlay } from "@/components/portfolio/GrainOverlay";
import { MosaicSection } from "@/components/portfolio/MosaicSection";
import { VideoModal } from "@/components/portfolio/VideoModal";
import { type Work } from "@/data/works";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lily Xiajin Fears — Editor" },
      {
        name: "description",
        content:
          "Lily Xiajin Fears — video editor. Reel, selected works, and contact.",
      },
      { property: "og:title", content: "Lily Xiajin Fears — Editor" },
      {
        property: "og:description",
        content: "Reel, selected works, and contact.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState<Work | null>(null);

  return (
    <div className="min-h-screen bg-[color:var(--ink-bg)] text-[color:var(--ink-fg)]">
      <GrainOverlay />
      <Nav overHero />
      <main>
        {/* HOME */}
        <section id="home" className="scroll-mt-0">
          <HeroReel />
        </section>

        {/* WORKS */}
        <section id="works" className="scroll-mt-20 pt-16">
          <MosaicSection onOpen={setOpen} />
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-20">
          <div className="mx-auto flex max-w-[680px] flex-col justify-center px-6 py-20 md:px-0">
            <ul className="grid gap-6 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--ink-fg)]/70">

              <li className="flex items-baseline justify-between gap-4">
                <span className="text-[color:var(--ink-fg)]/40">email</span>
                <a
                  href="mailto:lilyxfears@gmail.com"
                  className="hover:text-[color:var(--ink-ember)] transition-colors"
                >
                  LILYXFEARS@GMAIL.COM
                </a>
              </li>
              <li className="flex items-baseline justify-between gap-4">
                <span className="text-[color:var(--ink-fg)]/40">based in</span>
                <span>NEW YORK CITY · NY</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-[1600px] px-6 py-10 text-center md:px-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--ink-fg)]/40">
          EMOTION•STORYTELLING•RHYTHM
        </div>
      </footer>

      <VideoModal work={open} open={!!open} onClose={() => setOpen(null)} />
    </div>
  );
}