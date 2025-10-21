"use client";

import { useState } from "react";
import { LuList } from 'react-icons/lu';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import PriceView from '@/components/PriceView';
import AddToCartButton from '@/components/AddToCartButton';
import ShareButton from '@/components/ShareButton';

export default function ProductDetails({ product }: { product: any }) {
  const [showIngredients, setShowIngredients] = useState(false);

  return (
    <div className="w-full md:w-1/2 flex flex-col gap-5">
      <div>
        <p className="text-4xl font-bold mb-2">{product.name}</p>
      </div>

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

      <p className="text-sm text-gray-600 tracking-wide">
        {product.description}
      </p>

      <AddToCartButton product={product} />

      {/* Barre d'actions */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
        <div
          className="flex items-center gap-2 text-sm text-black hover:text-gold hoverEffect cursor-pointer"
          onClick={() => setShowIngredients((prev) => !prev)}
        >
          <LuList className="text-lg" />
          <p>{showIngredients ? "Fermer les ingrédients" : "Ingrédients"}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-black hover:text-gold hoverEffect">
          <FaRegQuestionCircle className="text-lg" />
          <p>Poser une question</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-black hover:text-gold hoverEffect">
          <TbTruckDelivery className="text-lg" />
          <p>Livraison</p>
        </div>
        <ShareButton />
      </div>

      {/* Liste des ingrédients */}
      {showIngredients && product.ingredients?.length > 0 && (
        <div className="mt-3 flex flex-col gap-1">
          {product.ingredients.map(
            (ing: { name: string; allergen?: string }, index: number) => (
              <p key={index} className="text-sm text-gray-600">
                {ing.name}
                {ing.allergen && (
                  <span className="italic"> ({ing.allergen})</span>
                )}
              </p>
            )
          )}
        </div>
      )}

      {/* Bloc livraison offerte */}
      <div className="flex flex-wrap items-center justify-center gap-5">
        <div className="border border-gold/20 text-center p-3 hover:border-gold hoverEffect rounded-md">
          <p className="text-base font-semibold text-black">
            LIVRAISON OFFERTE
          </p>
          <p className="text-sm text-gray-500">
            Livraison offerte dès 25€ d&apos;achats !
          </p>
        </div>
      </div>
    </div>
  );
}
