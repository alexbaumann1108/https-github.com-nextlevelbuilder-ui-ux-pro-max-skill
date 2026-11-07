"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const overPhoto = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Hide the header's "Book a trip" while another one is on screen, so only
  // one shows at a time. Page buttons are marked with data-book.
  const [bookSeen, setBookSeen] = useState({ path: pathname, inView: false });
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-book]"));
    const seen = new Set<Element>();
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
        setBookSeen({ path: pathname, inView: seen.size > 0 });
      },
      { rootMargin: "-80px 0px 0px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  const bookInView = bookSeen.path === pathname && bookSeen.inView;
  const showBook = !open && !bookInView && pathname !== "/book";

  const clear = overPhoto && !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
          open
            ? "bg-seafoam-night text-parchment"
            : clear
              ? "bg-transparent text-paper"
              : "bg-parchment/95 text-ink shadow-[0_1px_0_rgb(185_154_114/0.45)] backdrop-blur-md"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-orange focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <Link href="/" aria-label={`${site.name}, home`} className="relative z-50 block">
            <Logo tone={clear || open ? "light" : "dark"} priority className="w-[100px] md:w-[116px]" />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-7 text-[0.9375rem] font-semibold">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative py-2 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:rounded-full after:bg-orange after:transition-transform after:duration-300 ${
                        active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className={`btn !min-h-10 !px-4 !text-[0.875rem] transition-opacity duration-300 sm:!min-h-11 sm:!px-5 sm:!text-[0.9375rem] ${clear ? "btn-sun" : "btn-primary"} ${showBook ? "" : "pointer-events-none opacity-0"}`}
              aria-hidden={!showBook}
              tabIndex={showBook ? undefined : -1}
            >
              Book a trip
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-50 -mr-2 inline-flex h-11 w-11 items-center justify-center xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-6" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-6 bg-current transition-transform duration-300 ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-6 bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-seafoam-night text-parchment xl:hidden"
      >
        <div className="shell flex min-h-full flex-col pb-10 pt-28">
          <Link href="/book" className="btn btn-sun mb-8 w-full">
            Book a trip
          </Link>
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {[{ href: "/", label: "Home" }, ...nav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block py-1.5 font-display text-[2rem] leading-tight aria-[current=page]:text-orange"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="rule my-8 opacity-60" />
          <div className="space-y-2 text-parchment/85">
            <a className="block" href={site.phoneHref}>
              {site.phone}
            </a>
            <a className="block break-all" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a className="block" href={site.instagram.url} target="_blank" rel="noopener">
              Instagram {site.instagram.handle}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
