import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Text, Nunito_Sans, Special_Elite } from "next/font/google";
import { site, siteUrl } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileBookBar } from "@/components/mobile-book-bar";
import { LocalBusinessJsonLd } from "@/components/json-ld";
import "./globals.css";

// Classic serif for headings.
const caslon = Libre_Caslon_Text({
  variable: "--font-serif-face",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Brand text face, the closest free match to the business card lettering.
const nunito = Nunito_Sans({
  variable: "--font-text-face",
  subsets: ["latin"],
  display: "swap",
});

// Typewriter labels, like notes in a field book.
const typewriter = Special_Elite({
  variable: "--font-label-face",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const description =
  "Fly and light tackle fishing charters on Sanibel Island, Florida. Sight fishing for beach snook, tarpon and backcountry redfish around Sanibel, Captiva, Pine Island Sound and Fort Myers.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sanibel Island Fishing Charters | Fly & Light Tackle | Frigate",
    template: "%s | Frigate Fly & Light Tackle Charters",
  },
  description,
  keywords: [
    "Sanibel Island fishing charters",
    "Sanibel fishing guide",
    "Southwest Florida fly fishing",
    "Captiva fishing charter",
    "Pine Island Sound fishing",
    "snook fishing Sanibel",
    "tarpon fishing Sanibel",
    "redfish fishing Fort Myers",
    "inshore fishing charter Florida",
    "light tackle fishing",
  ],
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: "Frigate Fly & Light Tackle Charters, Sanibel Island",
    description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f4eee1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${caslon.variable} ${nunito.variable} ${typewriter.variable}`}>
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
