export default function InstitutesProgramsJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CCMT Institutes and Programs Directory",
    description:
      "Browse participating CCMT institutes and available programs across NITs, IIITs, and GFTIs.",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "NIT Institutes",
        url: `${siteUrl}/institutes_and_programs`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "IIIT Institutes",
        url: `${siteUrl}/institutes_and_programs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "GFTI and Other Institutes",
        url: `${siteUrl}/institutes_and_programs`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Programs Directory",
        url: `${siteUrl}/institutes_and_programs`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
