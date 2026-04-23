import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld";
import InstitutesProgramsJsonLd from "@/components/seo/institutes-programs-json-ld";

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
    images: [
      {
        url: "/ccmt_logo.png",
        width: 1200,
        height: 630,
        alt: "CCMT Institutes and Programs",
      },
    ],
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
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Institutes & Programs", path: "/institutes_and_programs" },
        ]}
      />
      <InstitutesProgramsJsonLd />
      {children}
    </>
  );
}
