// components/ProductJsonLD.tsx
import React from 'react';
import { PortableTextBlock } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import { getLastSentence } from '@/lib/getLastSentence';

interface ProductJsonLDProps {
  name: string;
  image: string;
  description: PortableTextBlock[];
  price: number;
  discount?: number;
  stock?: number;
  slug: string;
}

const ProductJsonLD: React.FC<ProductJsonLDProps> = ({ name, image, description, price, discount, stock, slug }) => {
  const finalPrice = discount ? price - discount : price;
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "image": image,
    "description": getLastSentence(description),
    "sku": slug,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": finalPrice,
      "availability": stock && stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `https://biss-app.fr/produit/${slug}`
    }
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
};

export default ProductJsonLD;