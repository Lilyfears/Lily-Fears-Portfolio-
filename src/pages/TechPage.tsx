import { useEffect, useState } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { VideoModal } from "@/components/portfolio/VideoModal";
import { SocialCutThumb, TechVideo } from "@/components/tech/TechVideo";
import { contactEmail, techProjects, techServices } from "@/data/tech";
import type { Work } from "@/data/works";

const PAGE_TITLE = "Video editing for tech companies | Lily Xiajin Fears";
const PAGE_DESCRIPTION =
  "Lily Xiajin Fears edits product videos, event content, and social media videos for technology companies.";

// Shared two-column grid: video column ~38% of the content width.
const rowGrid = "grid gap-6 md:grid-cols-[38%_minmax(0,1fr)] md:gap-x-12 lg:gap-x-16";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--tech-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--tech-bg)]";

// Projects and social cuts without a video source yet are left off the page.
const visibleProjects = techProjects
  .filter((p) => p.video.videoId)
  .map((p) => ({ ...p, socialCuts: p.socialCuts?.filter((c) => c.videoId) }));

export default function TechPage() {
  const [open, setOpen] = useState<Work | null>(null);

  useEffect(() => {
    document.title = PAGE_TITLE;
    document.querySelector('meta[name="description"]')?.setAttribute("content", PAGE_DESCRIPTION);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[color:var(--tech-bg)] font-grotesk text-[color:var(--tech-body)] antialiased">
      <Nav page="tech" />

      <main className="mx-auto max-w-[1120px] px-6 md:px-10">
        {/* Hero */}
        <section aria-labelledby="tech-hero" className={`${rowGrid} pb-14 pt-32 md:pb-20 md:pt-40`}>
          <h1
            id="tech-hero"
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-[color:var(--tech-head)] md:col-span-2"
          >
            Video editing for tech companies.
          </h1>
          <p className="max-w-[44ch] text-[17px] leading-relaxed md:col-start-2 md:text-[19px]">
            I edit product videos, event content, and social media videos for technology companies.
          </p>
        </section>

        {/* Selected work */}
        <section id="work" aria-labelledby="tech-work" className="scroll-mt-24">
          <h2 id="tech-work" className="sr-only">
            Selected work
          </h2>
          <ul>
            {visibleProjects.map((p) => (
              <li key={p.id} className="border-t border-[color:var(--tech-line)] py-10 md:py-14">
                <article aria-labelledby={`project-${p.id}`} className={rowGrid}>
                  <div className="min-w-0 md:col-start-1 md:row-start-1">
                    <TechVideo work={p.video} />
                  </div>

                  <div
                    className={`min-w-0 md:col-start-2 md:row-start-1 md:pt-1 ${p.socialCuts?.length ? "md:row-span-2" : ""}`}
                  >
                    <h3
                      id={`project-${p.id}`}
                      className="text-[26px] font-medium leading-tight tracking-[-0.01em] text-[color:var(--tech-head)] md:text-[30px]"
                    >
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[15px] text-[color:var(--tech-dim)]">{p.type}</p>
                    <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed">{p.description}</p>
                  </div>

                  {/* Social cuts: under the main video on desktop, after the details on mobile */}
                  {p.socialCuts && p.socialCuts.length > 0 && (
                    <div className="min-w-0 md:col-start-1 md:row-start-2 md:-mt-1">
                      <p
                        id={`project-${p.id}-cuts`}
                        className="mb-3 text-[13px] font-medium text-[color:var(--tech-dim)]"
                      >
                        Social cuts
                      </p>
                      <ul aria-labelledby={`project-${p.id}-cuts`} className="flex gap-3">
                        {p.socialCuts.map((cut) => (
                          <li
                            key={cut.id}
                            className="w-[76px] shrink-0 sm:w-[88px] lg:w-[104px] xl:w-[112px]"
                          >
                            <SocialCutThumb work={cut} onOpen={setOpen} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* Services */}
        <section
          aria-labelledby="tech-services"
          className="border-t border-[color:var(--tech-line)] py-14 md:py-20"
        >
          <h2
            id="tech-services"
            className="text-[22px] font-medium tracking-[-0.01em] text-[color:var(--tech-head)] md:text-[24px]"
          >
            What I edit
          </h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            {techServices.map((s) => (
              <li key={s.title} className="border-t border-[color:var(--tech-line)] pt-5">
                <h3 className="text-[17px] font-medium text-[color:var(--tech-head)]">{s.title}</h3>
                <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section
          id="contact"
          aria-labelledby="tech-contact"
          className={`${rowGrid} scroll-mt-24 border-t border-[color:var(--tech-line)] py-16 md:py-24`}
        >
          <h2
            id="tech-contact"
            className="text-[clamp(1.875rem,3.6vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[color:var(--tech-head)]"
          >
            Need a video editor for your team?
          </h2>
          <div className="md:pt-2">
            <p className="max-w-[44ch] text-[17px] leading-relaxed">
              Available for individual projects and ongoing editing partnerships.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={`mailto:${contactEmail}`}
                className={`inline-flex items-center rounded-[3px] bg-[color:var(--tech-blue-solid)] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#2557d1] ${focusRing}`}
              >
                Get in touch
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className={`text-[15px] text-[color:var(--tech-body)] underline decoration-[color:var(--tech-line)] underline-offset-4 transition-colors hover:text-[color:var(--tech-blue)] hover:decoration-[color:var(--tech-blue)] ${focusRing}`}
              >
                {contactEmail}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[color:var(--tech-line)]">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-2 px-6 py-8 text-[14px] text-[color:var(--tech-dim)] sm:flex-row sm:items-center sm:justify-between md:px-10">
          <span>Lily Xiajin Fears, video editor in New York City</span>
          <a
            href="/"
            className={`text-[color:var(--tech-body)] transition-colors hover:text-[color:var(--tech-blue)] ${focusRing}`}
          >
            View the full portfolio
          </a>
        </div>
      </footer>

      <VideoModal
        work={open}
        open={!!open}
        onClose={() => setOpen(null)}
        tone="tech"
        autoPlay={false}
      />
    </div>
  );
}
