import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Instrument_Sans } from "next/font/google";
import { site, siteUrl, inArea } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileBookBar } from "@/components/mobile-book-bar";
import { LocalBusinessJsonLd } from "@/components/json-ld";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const description = `${inArea("Private boat and yacht charters")}: sunset cruises, sandbar days, island hopping, dolphin watching and fishing. Send a booking request in minutes.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${inArea("Private boat & yacht charters")}`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b2236",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodoni.variable} ${instrument.variable}`}>
      <body className="flex min-h-svh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileBookBar />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
