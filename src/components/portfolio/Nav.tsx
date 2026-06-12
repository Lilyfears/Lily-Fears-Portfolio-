import { useEffect, useState } from "react";

export function Nav({ overHero = false }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showBg = scrolled || !overHero;

  const linkCls =
    "hover:text-[color:var(--ink-ember)] transition-colors";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        showBg ? "backdrop-blur-md bg-[color:var(--ink-bg)]/60" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <span className="font-serif text-base italic tracking-tight text-[color:var(--ink-ember)] transition-colors">
          Lily Xiajin Fears • Editor
        </span>
        <ul className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--ink-fg)]/70">
          <li><a href="#home" className={linkCls}>home</a></li>
          <li><a href="#works" className={linkCls}>works</a></li>
          <li><a href="#contact" className={linkCls}>contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
