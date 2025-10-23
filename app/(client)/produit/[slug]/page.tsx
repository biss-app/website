import { getProductsBySlug } from '@/sanity/helpers'
import Container from "@/components/Container"
import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import PriceView from '@/components/PriceView'
import AddToCartButton from '@/components/AddToCartButton'
import ProductInformations from '@/components/ProductInformations'
import { PortableText, PortableTextBlock } from '@portabletext/react'
import { CircleCheckIcon } from '@/components/ui/circle-check'
import ProductJsonLD from '@/components/ProductJsonLD'

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const product = await getProductsBySlug(slug)!

  // ✅ Convertir la description Sanity (PortableText) en texte brut
  const plainDescription = Array.isArray(product?.description)
    ? product.description
        .map((block: any) =>
          block.children?.map((child: any) => child.text).join(" ")
        )
        .join(" ")
    : "Découvrez un produit Biss'App exceptionnel 🌿"

  return (
    <div>
      {/* ✅ Balise JSON-LD pour le SEO */}
      <ProductJsonLD
        name={product?.name ?? "Produit Biss'App"}
        image={product?.image ? urlFor(product.image).url() : "@/favicon.ico"}
        description={plainDescription}
        price={
          product?.price != null
            ? product.discount
              ? product.price * (1 - product.discount / 100)
              : product.price
            : 0
        }
        discount={product?.discount}
        slug={product?.slug?.current ?? ""}
        inStock={!!product?.stock}
      />

      <Container className="flex flex-col md:flex-row gap-10 py-10">
        {/* 🖼️ Colonne gauche : image + note IA */}
        <div className="w-full md:w-1/2 flex flex-col shrink-0">
          <div className="relative w-full aspect-square overflow-hidden rounded-md border border-gold/20 shadow-md group">
            <Image
              src={urlFor(product!.image!).url()}
              alt={product!.name!}
              fill
              className="object-cover group-hover:scale-110 rounded-md hoverEffect transition-transform duration-300"
            />
          </div>

          <div className="flex items-center justify-center mt-1">
            <p className="text-xs text-gray-500 italic text-center px-2">
              Image générée par Intelligence Artificielle, à titre illustratif uniquement.
              Visuel non contractuel.
              <br />
              (mais on fait de notre mieux pour que ça soit pareil !)
            </p>
          </div>
        </div>

        {/* 🧾 Colonne droite : infos produit + actions */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <p className="text-4xl font-bold mb-2">{product!.name}</p>

          <PriceView
            price={product!.price}
            discount={product!.discount}
            label={product!.label}
            className="text-lg font-bold"
          />

          {product!.stock && (
            <p className="bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
              En stock
            </p>
          )}

          {/* 📝 Description stylisée */}
          <section
            className="text-sm text-gray-600 tracking-wide whitespace-pre-line"
            aria-label="Description du produit"
          >
            <PortableText
              value={product!.description as PortableTextBlock[]}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-4">{children}</p>,
                  h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-medium mb-2">{children}</h3>,
                  blockquote: ({ children }) => (
                    <blockquote className="pl-4 border-l-4 italic mb-4">{children}</blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => <strong>{children}</strong>,
                  em: ({ children }) => <em>{children}</em>,
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-1 py-[2px] rounded">{children}</code>
                  ),
                  underline: ({ children }) => <u>{children}</u>,
                  strike: ({ children }) => <s>{children}</s>,
                  link: ({ children, value }) => (
                    <a
                      href={value.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {children}
                    </a>
                  ),
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

          {/* 🛒 Bouton + infos */}
          <AddToCartButton product={product!} />
          <ProductInformations product={product!} />
        </div>
      </Container>
    </div>
  )
}

export default SingleProductPage