import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { embedUrl, type Work } from "@/data/works";
import { X } from "lucide-react";
import { useRef } from "react";

type Tone = "ink" | "tech";

const toneCls: Record<
  Tone,
  {
    content: string;
    close: string;
    closeLabel: string;
    caption: string;
    media: string;
  }
> = {
  ink: {
    closeLabel: "close",
    content: "bg-[color:var(--ink-bg)] [&>button:last-child]:hidden",
    close:
      "font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--ink-fg)]/70 hover:text-[color:var(--ink-ember)]",
    caption: "font-mono text-[11px] uppercase tracking-[0.2em] text-white/60",
    media: "object-cover",
  },
  tech: {
    closeLabel: "Close",
    content: "bg-[color:var(--tech-bg)]/95 [&>button:last-child]:hidden",
    close:
      "font-grotesk text-[14px] font-medium text-[color:var(--tech-head)] hover:text-[color:var(--tech-blue)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--tech-blue)] px-2 py-1",
    caption: "font-grotesk text-[14px] text-[color:var(--tech-body)]",
    media: "object-contain bg-black",
  },
};

export function VideoModal({
  work,
  open,
  onClose,
  tone = "ink",
  autoPlay = true,
}: {
  work: Work | null;
  open: boolean;
  onClose: () => void;
  tone?: Tone;
  autoPlay?: boolean;
}) {
  const t = toneCls[tone];

  // The modal is opened from state, not a Radix trigger, so remember what had
  // focus when it opened and return focus there on close.
  const returnFocus = useRef<HTMLElement | null>(null);
  if (open && !returnFocus.current && typeof document !== "undefined") {
    returnFocus.current = document.activeElement as HTMLElement | null;
  }
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        onClick={onClose}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          returnFocus.current?.focus();
          returnFocus.current = null;
        }}
        className={`max-w-none w-screen h-screen translate-x-[-50%] translate-y-[-50%] border-0 ${t.content} p-0 sm:rounded-none flex items-center justify-center`}
      >
        <DialogTitle className="sr-only">{work?.title ?? "Video"}</DialogTitle>
        <button
          aria-label="Close"
          onClick={onClose}
          className={`absolute right-6 top-6 z-10 transition-colors flex items-center gap-2 ${t.close}`}
        >
          <X className="size-4" /> {t.closeLabel}
        </button>
        {work && (
          <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center p-6 md:p-12">
            <div
              onClick={(e) => e.stopPropagation()}
              className={`pointer-events-auto relative w-full ${
                work.orientation === "vertical"
                  ? "max-h-full aspect-[9/16] max-w-[min(420px,calc(100vh-8rem)*9/16)]"
                  : "aspect-video max-w-[min(1600px,calc(100vh-8rem)*16/9)]"
              }`}
            >
              {work.platform === "mp4" ? (
                <video
                  key={work.id}
                  src={work.videoId}
                  autoPlay={autoPlay}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={work.title ?? "Video"}
                  className={`absolute inset-0 h-full w-full ${t.media}`}
                />
              ) : (
                <iframe
                  key={work.id}
                  src={embedUrl(work, { preview: false, autoplay: autoPlay })}
                  title={work.title ?? "Video"}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className={`absolute inset-0 h-full w-full ${work.platform === "instagram" ? "border-0" : ""}`}
                />
              )}
            </div>
            {work.title && (
              <div
                onClick={(e) => e.stopPropagation()}
                className={`pointer-events-auto mt-3 w-full ${
                  tone === "tech" && work.orientation === "vertical"
                    ? "max-w-[min(420px,calc(100vh-8rem)*9/16)]"
                    : "max-w-[min(1600px,calc(100vh-8rem)*16/9)]"
                } ${t.caption}`}
              >
                {work.title}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
