import { motion } from "framer-motion";
import { type Category, type Work } from "@/data/works";
import { VideoTile } from "./VideoTile";

// Pre-defined asymmetric layouts: [colStart, colSpan, mtClass]
// Tuned so a category fits in roughly one viewport: 2x2 grid for 4 items,
// smaller spans overall, staggered offsets preserved for varied feel.
const LAYOUTS: Array<Array<{ col: string; mt: string }>> = [
  // 1 item
  [{ col: "md:col-start-4 md:col-span-6", mt: "" }],
  // 2 items — side by side, slight stagger
  [
    { col: "md:col-start-2 md:col-span-5", mt: "" },
    { col: "md:col-start-7 md:col-span-5", mt: "md:mt-8" },
  ],
  // 3 items
  [
    { col: "md:col-start-2 md:col-span-5", mt: "" },
    { col: "md:col-start-7 md:col-span-4", mt: "md:mt-10" },
    { col: "md:col-start-4 md:col-span-5", mt: "md:mt-6" },
  ],
  // 4 items — 2 rows x 2 cols with varied sizes
  [
    { col: "md:col-start-2 md:col-span-5", mt: "" },
    { col: "md:col-start-7 md:col-span-4", mt: "md:mt-8" },
    { col: "md:col-start-2 md:col-span-4", mt: "md:mt-4" },
    { col: "md:col-start-6 md:col-span-5", mt: "md:mt-10" },
  ],
];

export function CategorySection({
  category,
  onOpen,
}: {
  category: Category;
  onOpen: (w: Work) => void;
}) {
  const n = category.items.length;
  const layout = LAYOUTS[Math.min(n, 4) - 1] ?? LAYOUTS[3];

  return (
    <section id={category.id} className="relative scroll-mt-24 px-6 py-10 md:px-12 md:py-14">
      {/* Section header */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-4 mb-6 md:mb-8">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--ink-fg)]/40">
            — {category.index}
          </div>
          <h2 className="mt-4 font-rx100 text-4xl italic leading-[0.95] text-[color:var(--ink-fg)] md:text-6xl">
            {category.title}
          </h2>
          {category.kicker && (
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--ink-fg)]/50">
              {category.kicker}
            </div>
          )}
        </div>
      </div>

      {/* Staggered items */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-4 md:gap-6">
        {category.items.map((item, i) => {
          const l = layout[i % layout.length];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`col-span-12 ${l.col} ${l.mt}`}
            >
              <VideoTile work={item} onOpen={onOpen} caption />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
