"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { categories, type Category, type GalleryPhoto } from "@/content/gallery";
import { site } from "@/content/site";

type Filter = Category | "all";

/** Category from the address bar hash, e.g. /gallery#snook. */
function readHash(): Filter {
  if (typeof window === "undefined") return "all";
  const h = window.location.hash.slice(1);
  return categories.some((c) => c.id === h) ? (h as Category) : "all";
}

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const sync = () => setFilter(readHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const shown = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.category === filter)),
    [filter, photos],
  );

  const choose = (f: Filter) => {
    setFilter(f);
    history.replaceState(null, "", f === "all" ? location.pathname : `#${f}`);
  };

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const go = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + shown.length) % shown.length)),
    [shown.length],
  );

  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    body.style.setProperty("overflow", "hidden");
    return () => {
      body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () =>
      setIndex((i) => {
        if (i !== null) triggers.current[i]?.focus();
        return null;
      });
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const current = index === null ? null : shown[index];
  const counts = Object.fromEntries(
    categories.map((c) => [c.id, photos.filter((p) => p.category === c.id).length]),
  ) as Record<Category, number>;

  return (
    <>
      <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
        {([{ id: "all", label: "All photos" }, ...categories] as { id: Filter; label: string }[]).map((c) => {
          const active = filter === c.id;
          const n = c.id === "all" ? photos.length : counts[c.id as Category];
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => choose(c.id)}
              className={`rounded-full border-[1.5px] px-4 py-2 text-sm font-bold transition-colors ${
                active
                  ? "border-seafoam-deep bg-seafoam-deep text-paper"
                  : "border-tan text-ink hover:border-seafoam-deep"
              }`}
            >
              {c.label}
              <span className={`ml-1.5 font-normal ${active ? "text-paper/75" : "text-ink-soft"}`}>{n}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} photos
      </p>

      {shown.length === 0 ? (
        <div className="mt-10 rounded-[3px] border-[1.5px] border-dashed border-tan p-10 text-center">
          <p className="font-display text-[1.6rem]">No photos here yet.</p>
          <p className="mt-2 text-ink-soft">
            New catches go up on Instagram first:{" "}
            <a href={site.instagram.url} target="_blank" rel="noopener" className="link font-semibold text-ink">
              {site.instagram.handle}
            </a>
          </p>
        </div>
      ) : (
        <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          {shown.map((p, i) => (
            <li key={p.src} data-cat={p.category} className="break-inside-avoid">
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => open(i)}
                className="group relative block w-full overflow-hidden rounded-[3px] bg-parchment-deep"
                aria-label={`View full screen: ${p.alt}`}
              >
                <Image
                  src={p.src}
                  alt=""
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="h-auto w-full transition-transform duration-700 ease-[var(--ease-tide)] group-hover:scale-[1.035]"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-seafoam-night p-0 text-parchment backdrop:bg-ink/80"
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
              <p className="label text-parchment/80" aria-live="polite">
                {index + 1} of {shown.length}
              </p>
              <button type="button" onClick={close} className="inline-flex h-11 items-center gap-2 px-2 text-sm font-bold" autoFocus>
                Close <span aria-hidden="true" className="text-xl leading-none">×</span>
              </button>
            </div>
            <figure key={current.src} className="relative mx-2 min-h-0 flex-1 rise sm:mx-16">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </figure>
            <div className="flex justify-center gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
              <button type="button" onClick={() => go(-1)} className="btn btn-ghost flex-1 sm:flex-none">
                Previous
              </button>
              <button type="button" onClick={() => go(1)} className="btn btn-ghost flex-1 sm:flex-none">
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
