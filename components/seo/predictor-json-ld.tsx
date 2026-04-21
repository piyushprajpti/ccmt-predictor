export default function PredictorJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ccmtcollegefinder.web.app";

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CCMT College Predictor",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/predictor`,
    description:
      "Predict eligible CCMT colleges and programs from GATE score, category, and year using historical cutoff trends.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
