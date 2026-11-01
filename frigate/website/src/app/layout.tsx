import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import { site, siteUrl, inArea } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileBookBar } from "@/components/mobile-book-bar";
import { LocalBusinessJsonLd } from "@/components/json-ld";
import "./globals.css";

// Display serif echoing the "Frigate" lettering on the brand board.
const cormorant = Cormorant_Garamond({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

// Brand text face (closest free match to the business card lettering).
const nunito = Nunito_Sans({
  variable: "--font-text-face",
  subsets: ["latin"],
  display: "swap",
});

const description = `Inshore fly fishing and light tackle charters on Sanibel Island and Southwest Florida. Snook, redfish, tarpon and more, from the boat or wading. Book your trip online.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${inArea("Fly fishing charters")}`,
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
  themeColor: "#3e2e21",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${nunito.variable}`}>
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
