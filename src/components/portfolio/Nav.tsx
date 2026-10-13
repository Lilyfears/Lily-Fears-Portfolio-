import { useEffect, useState } from "react";

type NavPage = "home" | "tech";

export function Nav({ overHero = false, page = "home" }: { overHero?: boolean; page?: NavPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTech = page === "tech";

  const links = [
    { label: isTech ? "Home" : "home", href: isTech ? "/" : "#home" },
    { label: isTech ? "Tech" : "tech", href: "/tech", current: isTech },
  ];

  if (isTech) {
    return (
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-[color:var(--tech-line)] bg-[color:var(--tech-bg)]/85 backdrop-blur-md"
            : "border-transparent bg-[color:var(--tech-bg)]"
        }`}
      >
        <nav className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-3 px-6 py-4 font-grotesk sm:flex-row md:px-10">
          <a
            href="/"
            className="text-[15px] font-medium text-[color:var(--tech-head)] transition-colors hover:text-[color:var(--tech-blue)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--tech-blue)]"
          >
            Lily Xiajin Fears
          </a>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={l.current ? "page" : undefined}
                  className={`transition-colors hover:text-[color:var(--tech-blue)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--tech-blue)] ${
                    l.current ? "text-[color:var(--tech-head)]" : "text-[color:var(--tech-body)]"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    );
  }

  const showBg = scrolled || !overHero;

  const linkCls = "hover:text-[color:var(--ink-ember)] transition-colors";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        showBg ? "backdrop-blur-md bg-[color:var(--ink-bg)]/60" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex flex-col md:flex-row max-w-[1600px] items-center justify-between gap-3 px-6 py-4 md:py-5 md:px-10">
        <span className="font-serif text-base text-center italic tracking-tight text-[color:var(--ink-ember)] transition-colors">
          Lily Xiajin Fears • Editor
        </span>
        <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--ink-fg)]/70">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={linkCls}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
