import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CCMT Institutes & Programs | NIT, IIIT, GFTI Program Directory",
  description:
    "Browse participating CCMT institutes and programs, compare options, and plan preference filling with confidence.",
  keywords: [
    "CCMT institutes",
    "CCMT programs list",
    "NIT IIIT GFTI CCMT institutes",
    "CCMT participating institutes list",
    "CCMT participating programs list",
    "MTech programs offered through CCMT",
    "NIT MTech admission through CCMT",
    "IIIT MTech admission through CCMT",
    "GFTI MTech admission through CCMT",
  ],
  alternates: {
    canonical: "/institutes_and_programs",
  },
  openGraph: {
    title: "CCMT Institutes & Programs Directory",
    description:
      "Explore participating NITs, IIITs, and GFTIs with available programs in CCMT counseling.",
    url: "/institutes_and_programs",
    images: ["/ccmt_logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCMT Institutes & Programs Directory",
    description: "Browse CCMT participating institutes and MTech programs.",
    images: ["/ccmt_logo.png"],
  },
};

export default function InstitutesAndProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
