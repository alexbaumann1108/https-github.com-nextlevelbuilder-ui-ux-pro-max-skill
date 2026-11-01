import Link from "next/link";
import { FishSketch } from "@/components/fish-sketch";

export default function NotFound() {
  return (
    <section className="pb-24 pt-36 md:pt-44">
      <div className="shell grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="label text-orange-ink">Page not found</p>
          <h1 className="display-lg mt-4">This one got off the hook.</h1>
          <p className="lede mt-5 max-w-xl text-ink-soft">
            The link may be old or mistyped. Head back to the homepage, or start
            a booking inquiry.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary">
              Back to the homepage
            </Link>
            <Link href="/book" className="btn btn-ink">
              Book a trip
            </Link>
          </div>
        </div>
        <div className="md:col-span-5">
          <FishSketch species="snook" className="w-full text-ink/85" />
        </div>
      </div>
    </section>
  );
}
