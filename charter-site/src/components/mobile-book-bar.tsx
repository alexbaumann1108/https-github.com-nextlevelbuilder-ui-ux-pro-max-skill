"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** A booking shortcut pinned to the bottom of small screens once scrolling. */
export function MobileBookBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/book") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-abyss/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href="/book"
        tabIndex={visible ? 0 : -1}
        className="btn btn-primary w-full"
      >
        Book your charter
      </Link>
    </div>
  );
}
