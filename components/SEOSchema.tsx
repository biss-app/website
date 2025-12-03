"use client";

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
        "https://www.instagram.com/bissapp.fr",
        "https://www.tiktok.com/@bissapp.fr",
        "https://www.facebook.com/people/BissApp/61583983762750/#",
        "https://www.linkedin.com/company/bissappfr/",
        "https://www.tripadvisor.fr/Restaurant_Review-g187091-d33988079-Reviews-Biss_App-Clermont_Ferrand_Puy_de_Dome_Auvergne_Rhone_Alpes.html"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "OfferShippingDetails",
      "shippingDestination": {
        "@type": "DefinedRegion",
        "name": "Clermont-Ferrand et alentours"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "transitTime": {
          "@type": "QuantitativeValue",
          "value": 2.5,
          "unitCode": "HUR"
        }
      },
      "handlingTime": {
        "@type": "QuantitativeValue",
        "value": 0.75,
        "unitCode": "HUR"
      },
      "shippingRate": [
        {
          "@type": "MonetaryAmount",
          "value": 2.5,
          "currency": "EUR",
          "eligibleTransactionVolume": {
            "@type": "PriceSpecification",
            "minPrice": 0,
            "maxPrice": 24.99
          },
          "shippingLabel": "Livraison à domicile"
        },
        {
          "@type": "MonetaryAmount",
          "value": 0,
          "currency": "EUR",
          "eligibleTransactionVolume": {
            "@type": "PriceSpecification",
            "minPrice": 25
          },
          "shippingLabel": "Livraison gratuite à domicile"
        }
      ],
      "additionalType": "Click&Collect gratuit à l'arrêt de tramway Stade M. Michelin"
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