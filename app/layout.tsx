import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/json-ld";
import GoogleAnalytics from "@/components/google-analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
const siteUrl = new URL(SITE_URL);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "CCMT College Finder & Predictor | GATE Cutoff Analysis for NIT, IIIT, GFTI",
    template: "%s | CCMT College Finder",
  },
  description:
    "Explore CCMT cutoffs (2021-2025), predict colleges using your GATE score, and build smarter CCMT preference lists for NITs, IIITs, and GFTIs.",
  keywords: [
    "CCMT college predictor",
    "CCMT college finder",
    "CCMT cutoff predictor",
    "GATE college predictor CCMT",
    "CCMT preference filling",
    "CCMT counseling predictor",
    "NIT IIIT GFTI predictor",
    "CCMT cutoff trends",
    "CCMT cutoff 2025",
    "GATE score college prediction",
  ],
  authors: [{ name: "CCMT College Finder" }],
  creator: "CCMT College Finder",
  publisher: "CCMT College Finder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION!,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl.toString(),
    title: "CCMT College Finder & Predictor | GATE Cutoff Analysis for NIT, IIIT, GFTI",
    description:
      "Explore CCMT cutoffs (2021-2025), predict colleges using your GATE score, and build smarter CCMT preference lists for NITs, IIITs, and GFTIs.",
    siteName: "CCMT College Finder",
    images: [
      {
        url: "/ccmt_logo.webp",
        width: 1200,
        height: 630,
        alt: "CCMT College Finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCMT College Finder 2025 | Best GATE Post-Graduation Tool",
    description: "The most advanced predictor and explorer for CCMT 2025. Data-driven insights for NITs, IIITs and GFTIs.",
    images: ["/ccmt_logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/ccmt_logo.webp",
    shortcut: "/ccmt_logo.webp",
    apple: "/ccmt_logo.webp",
  },
};

import { ClientShell } from "@/components/client-shell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme) {
                    theme = supportDarkMode ? 'dark' : 'light';
                    localStorage.setItem('theme', theme);
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <ClientShell>{children}</ClientShell>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}
