import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld";

export const metadata: Metadata = {
  title: "CCMT Cutoff Explorer (2021-2025) | Institute & Program Wise Trends",
  description:
    "Analyze CCMT cutoff trends by year, round, institute, program, and category across NIT, IIIT, and GFTI admissions.",
  keywords: [
    "CCMT cutoff explorer",
    "CCMT cutoff trends",
    "CCMT round wise cutoff",
    "CCMT category wise cutoff",
    "CCMT institute wise cutoff",
    "CCMT program wise cutoff",
    "CCMT cutoff 2025",
    "CCMT cutoff 2024",
    "CCMT cutoff 2023",
    "CCMT cutoff 2022",
    "CCMT cutoff 2021",
  ],
  alternates: {
    canonical: "/explorer",
  },
  openGraph: {
    title: "CCMT Cutoff Explorer (2021-2025)",
    description:
      "Explore year-wise, round-wise, and category-wise CCMT cutoffs for NITs, IIITs, and GFTIs.",
    url: "/explorer",
    images: [
      {
        url: "/ccmt_logo.webp",
        width: 1200,
        height: 630,
        alt: "CCMT Cutoff Explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCMT Cutoff Explorer (2021-2025)",
    description: "Explore year-wise and category-wise CCMT cutoff trends.",
    images: ["/ccmt_logo.webp"],
  },
};

export default function ExplorerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Explorer", path: "/explorer" },
        ]}
      />
      {children}
    </>
  );
}
