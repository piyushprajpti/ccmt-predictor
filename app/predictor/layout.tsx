import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld";
import PredictorJsonLd from "@/components/seo/predictor-json-ld";

export const metadata: Metadata = {
  title: "CCMT College Predictor by GATE Score | NIT, IIIT, GFTI Chances",
  description:
    "Enter your GATE score and category to predict eligible CCMT colleges and programs using historical cutoff patterns.",
  keywords: [
    "CCMT college predictor",
    "GATE college predictor CCMT",
    "CCMT counseling predictor",
    "GATE score college prediction",
    "CCMT admission chance checker",
    "NIT IIIT GFTI predictor",
    "CCMT seat allotment predictor",
    "CCMT choice filling tool",
  ],
  alternates: {
    canonical: "/predictor",
  },
  openGraph: {
    title: "CCMT College Predictor by GATE Score",
    description:
      "Predict your CCMT college and program chances for NITs, IIITs, and GFTIs using historical data.",
    url: "/predictor",
    images: [
      {
        url: "/og/predictor-og.png",
        width: 1200,
        height: 630,
        alt: "CCMT College Predictor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCMT College Predictor by GATE Score",
    description: "Predict CCMT admission chances using your GATE score.",
    images: ["/og/predictor-og.png"],
  },
};

export default function PredictorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Predictor", path: "/predictor" },
        ]}
      />
      <PredictorJsonLd />
      {children}
    </>
  );
}
