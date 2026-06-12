export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--ink-fg)]/10 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ink-fg)]/50 sm:flex-row sm:items-center sm:justify-between">
        <span>EMOTION•STORYTELLING•RHYTHM</span>
      </div>
    </footer>
  );
}
