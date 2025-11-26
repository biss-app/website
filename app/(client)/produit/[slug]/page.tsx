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
import type { Product } from '@/types';

// Types pour le texte portable
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

// Convertir les blocks en string simple
const portableTextToString = (blocks: PortableTextBlock[] | undefined): string => {
  if (!blocks) return "";
  return blocks
    .map(block => block.children?.map(child => child.text || "").join("") || "")
    .join("\n");
};

// Props strictement typées pour une page dynamique Next.js
interface PageProps {
  params: {
    slug: string;
  };
}

export default async function SingleProductPage({ params }: PageProps) {
  const slug = params.slug;
  const product = await getProductsBySlug(slug);

  if (!product) return <div>Produit introuvable</div>;

  const descriptionString = portableTextToString(product.description);
  const descriptionLines = descriptionString.split(/\r?\n/).filter(Boolean);
  const lastLine = descriptionLines.length ? descriptionLines[descriptionLines.length - 1] : "";

  const finalPrice = product.price != null
    ? product.discount
      ? product.price * (1 - product.discount / 100)
      : product.price
    : 0;

  return (
    <div>
      <ProductJsonLD
        name={product.name ?? "Produit Biss'App"}
        image={product.image ? urlFor(product.image).url() : "/favicon.ico"}
        description={lastLine}
        price={finalPrice}
        discount={product.discount}
        inStock={product.stock != null && product.stock > 0}
        slug={product.slug?.current ?? ""}
        label={product.label}
      />

      <Container className="flex flex-col md:flex-row gap-10 py-10">
        <div className="w-full md:w-1/2 flex flex-col shrink-0">
          <div className="relative w-full aspect-square overflow-hidden rounded-md border border-gold/20 shadow-md group">
            {product.image && (
              <Image
                src={urlFor(product.image)
                  .width(1200)
                  .height(1200)
                  .fit("crop")
                  .crop("entropy")
                  .dpr(2)
                  .quality(80)
                  .auto("format")
                  .bg("ffffff")
                  .url()}
                alt={product.name ?? "Produit Biss'App"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 rounded-md hoverEffect transition-transform duration-300"
              />
            )}
          </div>
          <div className="flex items-center justify-center mt-1">
            <p className="text-xs text-gray-500 italic text-center px-2">
              Image générée par Intelligence Artificielle, à titre illustratif uniquement. Visuel non contractuel.
              <br />
              (mais on fait de notre mieux pour que ça soit pareil !)
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <p className="text-4xl font-bold mb-2">{product.name}</p>

          <PriceView
            price={product.price}
            discount={product.discount}
            label={product.label}
            className="text-lg font-bold"
          />

          {product.stock && (
            <p className="bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
              En stock
            </p>
          )}

          <section className="text-sm text-gray-600 tracking-wide whitespace-pre-line" aria-label="Description du produit">
            <PortableText
              value={product.description as PortableTextBlock[]}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-4">{children}</p>,
                  h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-medium mb-2">{children}</h3>,
                  h4: ({ children }) => <h4 className="text-lg font-medium mb-2">{children}</h4>,
                  h5: ({ children }) => <h5 className="text-base font-medium mb-1">{children}</h5>,
                  h6: ({ children }) => <h6 className="text-sm font-medium mb-1">{children}</h6>,
                  blockquote: ({ children }) => <blockquote className="pl-4 border-l-4 italic mb-4">{children}</blockquote>,
                },
                marks: {
                  strong: ({ children }) => <strong>{children}</strong>,
                  em: ({ children }) => <em>{children}</em>,
                  code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded">{children}</code>,
                  underline: ({ children }) => <u>{children}</u>,
                  strike: ({ children }) => <s>{children}</s>,
                  link: ({ children, value }) => <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{children}</a>,
                },
                list: {
                  bullet: ({ children }) => <ul className="mb-4 pl-0">{children}</ul>,
                  number: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="flex mb-1">
                      <CircleCheckIcon className="w-5 h-5 text-green-500 shrink-0 mr-2.5 inline-block align-middle -mt-[4.25px]" />
                      <span className="align-middle">{children}</span>
                    </li>
                  ),
                  number: ({ children }) => <li className="mb-1">{children}</li>,
                },
              }}
            />
          </section>

          <AddToCartButton product={product} />
          <ProductInformations product={product} />
        </div>
      </Container>
    </div>
  );
}