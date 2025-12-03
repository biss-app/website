"use client";

import { SALE_QUERYResult } from "@/sanity.types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "./ui/button";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { CircleCheckIcon } from "./ui/circle-check";

interface DiscountBannerProps {
  sales: SALE_QUERYResult;
  onScrollClick: () => void;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <div className="mb-2">{children}</div>,
  },
};

const DiscountBanner: React.FC<DiscountBannerProps> = ({
  sales,
  onScrollClick,
}) => {
  return (
    <Carousel className="w-full max-w-7xl mx-auto my-4 px-2 md:px-0">
      <CarouselContent>
        {sales?.map((sale) => (
          <CarouselItem key={sale?._id}>
            <Card>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 py-2">

                  {/* TEXT SECTION */}
                  <div className="flex-1 px-3 py-2 md:px-8">
                    <Badge
                      variant="secondary"
                      className="mb-1 text-gold capitalize"
                    >
                      {(sale.discountAmount ?? 0) > 0 &&
                        `${sale.badge} ${sale.discountAmount}% OFFERTS`}
                    </Badge>

                    <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-1">
                      {sale?.title}
                    </h2>

                    <div className="text-muted-foreground text-sm mb-2">
                      <PortableText
                        value={sale?.description ?? []}
                        components={{
                          block: {
                            normal: ({ children }) => <p className="mb-3">{children}</p>,
                            h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-xl font-medium mb-2">{children}</h3>,
                            h4: ({ children }) => <h4 className="text-lg font-medium mb-2">{children}</h4>,
                            h5: ({ children }) => <h5 className="text-base font-medium mb-1">{children}</h5>,
                            h6: ({ children }) => <h6 className="text-sm font-medium mb-1">{children}</h6>,
                            blockquote: ({ children }) => (
                              <blockquote className="pl-4 border-l-4 italic mb-4">
                                {children}
                              </blockquote>
                            ),
                          },

                          marks: {
                            strong: ({ children }) => <strong>{children}</strong>,
                            em: ({ children }) => <em>{children}</em>,
                            code: ({ children }) => (
                              <code className="bg-gray-100 px-1 py-0.5 rounded">{children}</code>
                            ),
                            underline: ({ children }) => <u>{children}</u>,
                            strike: ({ children }) => <s>{children}</s>,
                            link: ({ children, value }) => (
                              <a
                                href={value?.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                {children}
                              </a>
                            ),
                          },

                          list: {
                            bullet: ({ children }) => (
                              <ul className="mb-4 pl-6 list-disc">{children}</ul>
                            ),
                            number: ({ children }) => (
                              <ol className="mb-4 pl-6 list-decimal">{children}</ol>
                            ),
                          },

                          listItem: {
                            bullet: ({ children }) => (
                              <li className="flex mb-1">
                                <CircleCheckIcon className="w-5 h-5 text-green-500 shrink-0 mr-2.5 inline-block align-middle -mt-1" />
                                <span>{children}</span>
                              </li>
                            ),
                            number: ({ children }) => (
                              <li className="mb-1">{children}</li>
                            ),
                          },
                        }}
                      />
                    </div>

                    {/* <p className="text-sm mb-3">
                      Ajoutez vos coups de cœur au panier, et la réduction sera
                      automatiquement appliquée !
                    </p>*/}

                    <Button
                      onClick={onScrollClick}
                      className="bg-gold text-bissap px-4 py-2 rounded-xl font-semibold text-sm shadow-md shadow-gold/30 hover:bg-gold/90 hover:shadow-gold/40"
                    >
                      TROUVER MON COUP DE CŒUR
                    </Button>
                  </div>

                  {/* IMAGE SECTION */}
                  {sale?.image && (
                    <div className="w-full md:w-1/2 flex justify-center py-1 px-4 md:px-0">
                      <Image
                        src={urlFor(sale.image).url()}
                        alt={sale.title || "bannerImage"}
                        width={500}
                        height={500}
                        className="
                          object-contain 
                          max-h-[400px] 
                          h-auto 
                          w-auto 
                          transition-transform 
                          duration-300 
                          hover:scale-105
                        "
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 scale-75" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 scale-75" />
    </Carousel>
  );
};

export default DiscountBanner;