type ProductJsonLDProps = {
  name: string
  image: string
  description: string
  price: number
  discount?: number
  slug: string
  inStock: boolean
}

export default function ProductJsonLD({
  name,
  image,
  description,
  price,
  discount,
  slug,
  inStock,
}: ProductJsonLDProps) {
  // ✅ Calcul sécurisé du prix final
  const finalPrice = Math.max(
    discount ? price * (1 - discount / 100) : price,
    0
  )

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name,
    image: image || "https://biss-app.fr/favicon.ico",
    description,
    sku: slug,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: finalPrice.toFixed(2),
      priceValidUntil: "2025-11-21",
      availability: inStock
        ? "http://schema.org/InStock"
        : "http://schema.org/OutOfStock",
      url: `https://biss-app.fr/produit/${slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}