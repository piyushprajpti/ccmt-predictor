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
  applicationName: "CCMT College Finder",
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
    "CCMT cutoff 2026",
    "GATE score college prediction",
    "ccmt previous year cutoff",
    "ccmt counselling 2026",
    "ccmt seat allotment predictor",
    "ccmt opening closing rank",
    "ccmt admission predictor",
    "ccmt choice filling guide",
    "ccmt special round cutoff",
    "nit mtech cutoff gate score",
    "nit previous year cutoff mtech",
    "nit ccmt cutoff",
    "top nit for mtech cse",
    "best nit for gate admission",
    "low gate score nit admission",
    "nit branch wise cutoff ccmt",
    "nit cse cutoff gate",
    "nit ece cutoff gate",
    "nit mechanical mtech cutoff",
    "iiit mtech cutoff gate",
    "iiit previous year cutoff mtech",
    "iiit ccmt cutoff",
    "best iiit for mtech cse",
    "iiit placement mtech cse",
    "iiit low gate score admission",
    "iiit cse cutoff gate",
    "iiit colleges through ccmt",
    "iiit ece cutoff gate",
    "top iiit for mtech",
    "gate 300 score colleges ccmt",
    "gate 350 score nit colleges",
    "gate 400 score colleges ccmt",
    "gate 450 score nit colleges",
    "gate 500 score nit colleges",
    "gate 550 score best colleges",
    "gate 600 score top nit",
    "gate 650 score mtech colleges",
    "gate score wise college predictor",
    "colleges for low gate score",
    "ccmt choice filling order",
    "how to fill ccmt choices",
    "ccmt registration process",
    "ccmt document verification",
    "ccmt seat freezing floating sliding",
    "ccmt internal sliding explained",
    "ccmt special round process",
    "ccmt refund rules",
    "ccmt admission process step by step",
    "ccmt counselling guide for beginners",
    "nit vs iiit for mtech",
    "best nit for cse mtech",
    "top colleges through ccmt",
    "best college at 500 gate score",
    "nit ranking for mtech",
    "iiit vs nit placements mtech",
    "nit vs gfti for mtech",
    "best branch in nit for mtech",
    "iiit cse vs nit ece mtech",
    "top ccmt colleges for placement",
    "best nit for mtech cse under 500 gate score",
    "which college can i get in ccmt with 450 score",
    "nit colleges for gate score 400 obc",
    "iiit colleges for low gate score",
    "previous year ccmt cutoff for cse",
    "top colleges through ccmt for ece",
    "mtech colleges through ccmt under 350 score",
    "best iiit for cse under 500 gate score",
    "nit admission with low gate score",
    "colleges for gate 300 score general category",
    "nit trichy mtech cutoff",
    "nit surathkal gate cutoff",
    "nit warangal ccmt cutoff",
    "mnit jaipur mtech cutoff",
    "nit rourkela cse cutoff",
    "iiit allahabad mtech cutoff",
    "iiitdm jabalpur gate cutoff",
    "nit calicut mtech cutoff",
    "nit kurukshetra cutoff",
    "svnit surat gate cutoff",
    "nit colleges in rajasthan mtech",
    "nit colleges in south india gate cutoff",
    "top nit in north india for mtech",
    "iiit colleges in india for gate",
    "best nit in west india for cse",
    "mtech colleges in jaipur through gate",
    "nit colleges near delhi for mtech",
    "south india iiit cutoff gate",
    "central india nit mtech colleges",
    "state wise ccmt colleges list",
    "ccmt cutoff predictor 2026",
    "ccmt college predictor free",
    "best colleges after gate exam",
    "gate score predictor college tool",
    "free gate college predictor",
    "mtech admission predictor india",
    "ccmt rank vs score colleges",
    "nit admission predictor by score",
    "gate counselling college finder",
    "mtech college finder india"
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
        url: "/ccmt_logo.png",
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
    images: ["/ccmt_logo.png"],
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
    icon: "/ccmt_logo.png",
    shortcut: "/ccmt_logo.png",
    apple: "/ccmt_logo.png",
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
