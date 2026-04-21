type StructuredData = {
  "@context": string;
  "@type": string;
  name: string;
  image: string;
  description: string;
  url: string;
  sameAs: string[];
  hasOfferCatalog: {
    "@type": string;
    name: string;
    itemListElement: Array<{
      "@type": string;
      itemOffered: {
        "@type": string;
        name: string;
      };
    }>;
  };
  potentialAction: {
    "@type": string;
    target: string;
    "query-input": string;
  };
};

export default function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const schema: StructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CCMT College Finder",
    image: `${siteUrl}/ccmt_logo.png`,
    description:
      "Explore CCMT cutoffs (2021-2025), predict colleges from GATE score, and plan preference filling for NIT, IIIT, and GFTI.",
    url: siteUrl,
    sameAs: [
      "https://github.com/piyushprajpti/ccmt-predictor",
      "https://linkedin.com/in/piyushprajpti",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "CCMT Tools",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "CCMT Cutoff Explorer" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "CCMT College Predictor" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Institutes and Programs Directory" } },
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/explorer?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
