import type { Metadata } from "next";

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
    images: ["/ccmt_logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCMT College Predictor by GATE Score",
    description: "Predict CCMT admission chances using your GATE score.",
    images: ["/ccmt_logo.png"],
  },
};

export default function PredictorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
