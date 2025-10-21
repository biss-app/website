"use client"

import { SALE_QUERYResult } from '@/sanity.types';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Button } from './ui/button';
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
                  <p className="text-muted-foreground mb-2 md:mb-4 whitespace-pre-line">
                    {sale?.description}
                  </p>
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