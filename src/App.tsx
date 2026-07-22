import { useEffect, useState } from "react";
import { HeroReel } from "@/components/portfolio/HeroReel";
import { Nav } from "@/components/portfolio/Nav";
import { GrainOverlay } from "@/components/portfolio/GrainOverlay";
import { MosaicSection } from "@/components/portfolio/MosaicSection";
import { ShortsSection } from "@/components/portfolio/ShortsSection";
import { VideoModal } from "@/components/portfolio/VideoModal";
import { type Work, categories } from "@/data/works";

export default function App() {
  const [open, setOpen] = useState<Work | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-[color:var(--ink-bg)] text-[color:var(--ink-fg)]">
      <GrainOverlay />
      <Nav overHero />
      <main>
        <section id="home" className="scroll-mt-0">
          <HeroReel />
        </section>

        <section id="works" className="scroll-mt-20 pt-16">
          <MosaicSection onOpen={setOpen} />
        </section>

        {categories.find(c => c.id === "shorts") && (
          <section id="shorts" className="scroll-mt-20 pt-8">
            <ShortsSection category={categories.find(c => c.id === "shorts")!} onOpen={setOpen} />
          </section>
        )}

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
