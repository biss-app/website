"use client"

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function SEOSchema() {
  const pathname = usePathname();
  const isProductPage = pathname?.startsWith("/produit");

  if (isProductPage) return null;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Biss'App",
      image: "https://biss-app.fr/og-image.png",
      url: "https://biss-app.fr",
      address: {
        "@type": "PostalAddress",
        streetAddress: "14 bis rue Vaucanson",
        addressLocality: "Clermont-Ferrand",
        postalCode: ["63000", "63100"],
        addressCountry: "FR",
      },
      servesCuisine: "Cuisine africaine artisanale",
      priceRange: "€",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Biss'App",
      url: "https://biss-app.fr",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://biss-app.fr/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Biss'App",
      url: "https://biss-app.fr",
      logo: "https://biss-app.fr/og-image.png",
      sameAs: [
        "https://www.instagram.com/toncompte",
        "https://www.facebook.com/toncompte"
      ]
    }
  ];

  return (
    <Script
      id="seo-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}