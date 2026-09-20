import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";

import { site } from "@/lib/content";
import { IntroProvider } from "@/components/intro/IntroContext";
import { SiteChrome } from "@/components/site/SiteChrome";

import "./globals.css";
import "./experience.css";

/* Display — engineered geometric grotesk for monumental headlines. */
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

/* Body — highly readable neo-grotesk. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Technical — small uppercase labels, telemetry, controls. */
const monoTech = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-tech",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "intelligent infrastructure",
    "AI-driven automation",
    "cloud-native architecture",
    "Microsoft Azure",
    "software engineering",
    "multi-tier IT support",
    "enterprise networking",
    "infrastructure modernisation",
    "workflow automation",
    "enterprise architecture",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#030507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Organisation structured data.
 * Deliberately free of address, telephone, founding date and social profiles —
 * none of those have been supplied, and inventing them would be worse than
 * omitting them.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  slogan: site.tagline,
  description: site.description,
  knowsAbout: [
    "Artificial intelligence",
    "Workflow automation",
    "Cloud-native architecture",
    "Microsoft Azure",
    "Software engineering",
    "Enterprise networking",
    "Infrastructure modernisation",
    "Multi-tier IT support",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${monoTech.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Serialised server-side from a literal we control.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <IntroProvider>
          <SiteChrome>{children}</SiteChrome>
        </IntroProvider>
      </body>
    </html>
  );
}
