import { getProductsBySlug } from '@/sanity/helpers';
import Container from "@/components/Container";
import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import PriceView from '@/components/PriceView';
import AddToCartButton from '@/components/AddToCartButton';
import ProductInformations from '@/components/ProductInformations';
import { PortableText } from '@portabletext/react';
import { CircleCheckIcon } from '@/components/ui/circle-check';
import ProductJsonLD from '@/components/ProductJsonLD';

interface PortableTextChild {
  _type: string;
  text?: string;
  marks?: string[];
  _key: string;
}

interface PortableTextBlock {
  _type: string;
  style?: string;
  children?: PortableTextChild[];
  _key: string;
}

const portableTextToString = (blocks: PortableTextBlock[] | undefined): string => {
  if (!blocks) return "";
  return blocks
    .map((block) =>
      block.children?.map((child) => child.text || "").join("") || ""
    )
    .join("\n");
};

export default async function SingleProductPage(
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await params;
  const product = await getProductsBySlug(slug)!;

  const descriptionString = portableTextToString(product?.description);
  const descriptionLines = descriptionString.split(/\r?\n/).filter(Boolean);
  const lastLine =
    descriptionLines.length ? descriptionLines[descriptionLines.length - 1] : "";

  const finalPrice =
    product?.price != null
      ? product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price
      : 0;

  return (
    <div>
      <ProductJsonLD
        name={product?.name ?? "Produit Biss&apos;App"}
        image={product?.image ? urlFor(product.image).url() : "/favicon.ico"}
        description={lastLine}
        price={finalPrice}
        discount={product?.discount}
        inStock={product?.stock != null && product.stock > 0}
        slug={product?.slug?.current ?? ""}
        label={product?.label}
      />

      <Container className="flex flex-col md:flex-row gap-6 lg:gap-10 py-8 md:py-10 px-4 sm:px-6">
        {/* Image */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <div className="relative w-full max-w-md md:max-w-none aspect-square overflow-hidden rounded-md border border-gold/20 shadow-md group">
            {product?.image && (
              <Image
                src={urlFor(product.image).url()}
                alt={product.name ?? "Produit"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-md hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>

          <p className="mt-2 text-xs text-gray-500 italic text-center px-2">
            Image générée par Intelligence Artificielle, à titre illustratif uniquement.<br />
            Visuel non contractuel.
          </p>
        </div>

        {/* Informations */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-5">
          <h1 className="text-3xl sm:text-4xl font-bold">{product?.name}</h1>

          <PriceView
            price={product?.price}
            discount={product?.discount}
            label={product?.label}
            className="text-lg font-bold"
          />

          {product?.stock && (
            <p className="bg-green-100 w-28 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
              En stock
            </p>
          )}

          <section
            className="text-sm text-gray-600 tracking-wide whitespace-pre-line"
            aria-label="Description du produit"
          >
            <PortableText
              value={product?.description ?? []}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-3">{children}</p>,
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="flex mb-1">
                      <CircleCheckIcon className="w-5 h-5 text-green-500 shrink-0 mr-2.5 inline-block align-middle -mt-1" />
                      <span>{children}</span>
                    </li>
                  ),
                },
              }}
            />
          </section>

          <AddToCartButton product={product!} />
          <ProductInformations product={product!} />
        </div>
      </Container>
    </div>
  );
}