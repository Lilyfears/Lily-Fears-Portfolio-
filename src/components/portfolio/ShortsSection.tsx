import { motion } from "framer-motion";
import { type Category, type Work } from "@/data/works";
import { VideoTile } from "./VideoTile";

// Staggered single-row layout for vertical (9:16) tiles
const SHORTS_LAYOUT: Array<{ mt: string }> = [
  { mt: "md:mt-0" },
  { mt: "md:mt-8" },
  { mt: "md:mt-2" },
  { mt: "md:mt-12" },
  { mt: "md:mt-4" },
  { mt: "md:mt-10" },
];

export function ShortsSection({
  category,
  onOpen,
}: {
  category: Category;
  onOpen: (w: Work) => void;
}) {
  return (
    <section id={category.id} className="relative scroll-mt-24 px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-4 mb-8 md:mb-12">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--ink-fg)]/40">
            — {category.index}
          </div>
          <h2 className="mt-4 font-serif text-4xl italic leading-[0.95] text-[color:var(--ink-fg)] md:text-6xl">
            {category.title}
          </h2>
          {category.kicker && (
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--ink-fg)]/50">
              {category.kicker}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:flex max-w-[1600px] gap-3 md:gap-5 pb-4 md:pb-0">
        {category.items.map((item, i) => {
          const l = SHORTS_LAYOUT[i % SHORTS_LAYOUT.length];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full md:w-auto md:flex-1 md:min-w-0 ${l.mt}`}
            >
              <VideoTile work={item} onOpen={onOpen} caption />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
