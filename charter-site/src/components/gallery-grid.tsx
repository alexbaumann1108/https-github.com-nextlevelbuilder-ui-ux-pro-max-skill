"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Item = {
  alt: string;
  wide: boolean;
  thumb: React.ReactNode;
  full: React.ReactNode;
};

export function GalleryGrid({ items }: { items: Item[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };

  // Stop the page behind the viewer from scrolling while it is open.
  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    body.style.setProperty("overflow", "hidden");
    return () => {
      body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const go = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setIndex((i) => {
        if (i !== null) triggerRefs.current[i]?.focus();
        return null;
      });
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className="grid grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {items.map((item, i) => (
          <li key={i} className={item.wide ? "sm:col-span-2" : ""}>
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => open(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden bg-mist md:aspect-auto md:h-[22rem]"
              aria-label={`View full screen: ${item.alt}`}
            >
              <span className="absolute inset-0 block transition-transform duration-[1.2s] ease-[var(--ease-tide)] group-hover:scale-[1.03]">
                {item.thumb}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onKeyDown={onKeyDown}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-abyss/97 p-0 text-white backdrop:bg-abyss/80"
      >
        {current && index !== null && (
          <div
            className="flex h-full flex-col"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <p className="text-sm text-foam" aria-live="polite">
                {index + 1} of {items.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 items-center gap-2 px-2 text-sm"
                autoFocus
              >
                Close
                <span aria-hidden="true" className="text-xl leading-none">×</span>
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
              <figure key={index} className="flex h-full w-full max-w-6xl flex-col justify-center [animation:rise_0.45s_var(--ease-tide)_both]">
                <div className="relative aspect-[16/10] max-h-full w-full overflow-hidden">{current.full}</div>
                <figcaption className="mt-4 text-center text-foam">{current.alt}</figcaption>
              </figure>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-1 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center text-3xl text-white/80 hover:text-white sm:flex"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-1 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center text-3xl text-white/80 hover:text-white sm:flex"
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
            <div className="flex justify-center gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:hidden">
              <button type="button" onClick={() => go(-1)} className="btn btn-light flex-1">
                Previous
              </button>
              <button type="button" onClick={() => go(1)} className="btn btn-light flex-1">
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
