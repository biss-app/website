// components/ProductJsonLD.tsx
import React from "react"

type ProductJsonLDProps = {
  name: string
  image: string
  description: string
  price: number
  discount?: number
  slug: string
  inStock: boolean
  label?: string
}

export default function ProductJsonLD({
  name,
  image,
  description,
  price,
  discount = 0,
  slug,
  inStock,
  label,
}: ProductJsonLDProps) {
  const finalPrice = price * (1 - discount / 100)
  const today = new Date()
  const validUntil = new Date("2025-11-21")

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name,
    image,
    description,
    sku: slug,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: finalPrice.toFixed(2),
      availability: inStock
        ? "http://schema.org/InStock"
        : "http://schema.org/OutOfStock",
      url: `https://biss-app.fr/produit/${slug}`,
    },
  }

  if (label) jsonLd.category = label

  if (today <= validUntil) jsonLd.offers.priceValidUntil = "2025-11-21"

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}