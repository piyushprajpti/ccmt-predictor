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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ccmtcollegefinder.web.app";
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
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      "ZO7FTfgr-Wtjz-ZA84HLxA4cQgqYP53F8gTcb1ahz2s",
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
        url: "/og/home-og.png",
        width: 1200,
        height: 630,
        alt: "CCMT College Finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCMT College Finder & Predictor",
    description:
      "Analyze CCMT cutoffs and predict colleges for NIT, IIIT, and GFTI admissions.",
    images: ["/og/home-og.png"],
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

import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { NavigationProvider } from "@/components/navigation-provider";

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
        <NavigationProvider>
          <Topbar />
          <PageTransition>
            <main className="flex-1 pt-16">{children}</main>
          </PageTransition>
          <Footer />
        </NavigationProvider>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
      </body>
    </html>
  );
}
