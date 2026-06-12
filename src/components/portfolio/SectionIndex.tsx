import { useEffect, useState } from "react";
import { type Category } from "@/data/works";

export function SectionIndex({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(categories[0]?.id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (!el) return;
      const ob = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(c.id);
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );
      ob.observe(el);
      observers.push(ob);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  return (
    <aside className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <ul className="pointer-events-auto flex flex-col items-end gap-4 font-mono text-[10px] uppercase tracking-[0.25em]">
        {categories.map((c) => {
          const isActive = c.id === active;
          return (
            <li key={c.id} className="group">
              <a
                href={`#${c.id}`}
                className={`flex items-center justify-end gap-3 transition-colors ${
                  isActive
                    ? "text-[color:var(--ink-fg)]"
                    : "text-[color:var(--ink-fg)]/40 hover:text-[color:var(--ink-fg)]/80"
                }`}
              >
                <span className="hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 xl:inline xl:opacity-100">
                  {c.title}
                </span>
                <span
                  className={`block h-px transition-all ${
                    isActive ? "w-6 bg-[color:var(--ink-fg)]" : "w-3 bg-current"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
