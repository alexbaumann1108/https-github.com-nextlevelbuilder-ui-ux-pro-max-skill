import Link from "next/link";
import { Seascape } from "@/components/seascape";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[90svh] items-end overflow-hidden bg-abyss text-white">
      <Seascape scene="dusk" seed="lost" className="absolute inset-0 -z-10 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-abyss/90 to-abyss/30" />
      <div className="shell pb-16 pt-32">
        <h1 className="display-lg max-w-2xl">This page has drifted off course.</h1>
        <p className="lede mt-5 max-w-xl text-foam">
          The link may be old or mistyped. Head back to the charters, or start
          a booking request.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Return home
          </Link>
          <Link href="/charters" className="btn btn-light">
            Explore our charters
          </Link>
        </div>
      </div>
    </section>
  );
}
