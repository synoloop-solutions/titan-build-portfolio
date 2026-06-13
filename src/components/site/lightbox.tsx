import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Lightbox({ images, alt = "Image", index, onClose, onIndex }: {
  images: string[]; alt?: string; index: number | null; onClose: () => void; onIndex: (i: number) => void;
}) {
  const open = index !== null;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onIndex((index! - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onIndex((index! + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onIndex]);
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-5xl border-0 bg-background/95 p-0">
        <DialogTitle className="sr-only">Image viewer</DialogTitle>
        {open && (
          <div className="relative">
            <img src={images[index!]} alt={alt} className="max-h-[80dvh] w-full rounded-md object-contain" />
            {images.length > 1 && (
              <>
                <Button variant="secondary" size="icon" aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2" onClick={() => onIndex((index! - 1 + images.length) % images.length)}>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button variant="secondary" size="icon" aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => onIndex((index! + 1) % images.length)}>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Button>
                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-foreground/70 px-2 py-1 text-xs text-background">
                  {index! + 1} / {images.length}
                </p>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function useLightbox() {
  const [i, set] = useState<number | null>(null);
  return { index: i, open: (n: number) => set(n), close: () => set(null), setIndex: set };
}
