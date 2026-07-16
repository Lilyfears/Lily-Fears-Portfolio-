import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { embedUrl, type Work } from "@/data/works";
import { X } from "lucide-react";

export function VideoModal({
  work,
  open,
  onClose,
}: {
  work: Work | null;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        onClick={onClose}
        className="max-w-none w-screen h-screen translate-x-[-50%] translate-y-[-50%] border-0 bg-[color:var(--ink-bg)] p-0 sm:rounded-none flex items-center justify-center [&>button]:hidden"
      >
        <DialogTitle className="sr-only">{work?.title ?? "Video"}</DialogTitle>
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-6 top-6 z-10 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--ink-fg)]/70 hover:text-[color:var(--ink-ember)] transition-colors flex items-center gap-2"
        >
          <X className="size-4" /> close
        </button>
        {work && (
          <div className="pointer-events-none flex h-full w-full items-center justify-center p-6 md:p-12">
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
                  autoPlay
                  controls
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <iframe
                  key={work.id}
                  src={embedUrl(work, { preview: false })}
                  title={work.title ?? "Video"}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className={`absolute inset-0 h-full w-full ${work.platform === "instagram" ? "border-0" : ""}`}
                />
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
