"use client"

import { SALE_QUERYResult } from '@/sanity.types';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Button } from './ui/button';
import { PortableText } from '@portabletext/react';
const DiscountBanner = ({sales, onScrollClick}:{sales:SALE_QUERYResult; onScrollClick: () => void; }) => {
  return (
  <Carousel className="w-full max-w-screen-xl mx-auto my-10">
    <CarouselContent>
      {sales?.map((sale) => (
        <CarouselItem key={sale?._id}>
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 p-6 md:px-12">
                  <Badge
                    variant="secondary"
                    className="mb-2 md:mb-4 text-gold
                    capitalize"
                  >
                    {sale?.badge} {sale?.discountAmount}%
                    OFFERTS
                  </Badge>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 md:mb-4">
                    {sale?.title}
                  </h2>
                  <div className="text-muted-foreground mb-2 md:mb-4 whitespace-pre-line">
                    <PortableText
                      value={sale.description || []}
                      components={{
                        block: {
                          normal: ({ children }: any) => <div className="mb-4">{children}</div>, // ✅ div au lieu de p
                          h1: ({ children }: any) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
                          h2: ({ children }: any) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
                          h3: ({ children }: any) => <h3 className="text-xl font-medium mb-2">{children}</h3>,
                          h4: ({ children }: any) => <h4 className="text-lg font-medium mb-2">{children}</h4>,
                          h5: ({ children }: any) => <h5 className="text-base font-medium mb-1">{children}</h5>,
                          h6: ({ children }: any) => <h6 className="text-sm font-medium mb-1">{children}</h6>,
                          blockquote: ({ children }: any) => (
                            <blockquote className="pl-4 border-l-4 italic mb-4">{children}</blockquote>
                          ),
                        },
                        marks: {
                          strong: ({ children }: any) => <strong>{children}</strong>,
                          em: ({ children }: any) => <em>{children}</em>,
                          code: ({ children }: any) => (
                            <code className="bg-gray-100 px-1 py-[2px] rounded">{children}</code>
                          ),
                          underline: ({ children }: any) => <u>{children}</u>,
                          strike: ({ children }: any) => <s>{children}</s>,
                          link: ({ children, value }: any) => (
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
                          bullet: ({ children }: any) => <ul className="mb-4 pl-6 list-disc">{children}</ul>,
                          number: ({ children }: any) => <ol className="mb-4 pl-6 list-decimal">{children}</ol>,
                        },
                        listItem: {
                          bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
                          number: ({ children }: any) => <li className="mb-1">{children}</li>,
                        },
                      }}
                    />
                  </div>
                  <p className="mb-2">
                    Ajoutez vos coups de c&oelig;ur au panier, et la réduction sera automatiquement appliquée !
                  </p>
                  <br/>
                  <Button
                    onClick={onScrollClick}
                    className="
                      bg-gold text-bissap 
                      px-8 py-4 
                      rounded-2xl 
                      font-semibold text-lg tracking-wide
                      shadow-md shadow-gold/30
                      transition-all duration-300 ease-out
                      hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/40
                      focus:outline-none
                    "
                  >
                    TROUVER MON COUP DE C&OElig;UR
                  </Button>


                </div>
                {sale?.image && (
                  <div className="w-full md:w-1/2 h-auto flex items-center justify-center py-2">
                    <Image
                      src={urlFor(sale?.image).url()}
                      alt="bannerImage"
                      width={500}
                      height={500}
                      className="h-full transition-transform
                      hover:scale-105 duration-500
                      ease-in-out"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious className="absolute left-2" />
    <CarouselNext className="absolute right-2" />
  </Carousel>
  );
};

export default DiscountBanner;