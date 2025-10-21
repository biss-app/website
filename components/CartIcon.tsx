"use client";
import userCartStore from '@/store';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CartIcon = () => {
  const [isClient, setIsClient] = useState(false);
  const groupedItems = userCartStore((state) => state.getGroupedItems())
  useEffect(() => {
    setIsClient(true);
  }, []);

  if(!isClient) {
    return null;
  }

  return (
    <Link
      href={"/panier"}
      className="flex items-center text-xs md:text-sm gap-1 md:gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect">
      <ShoppingBag className="text-gold w-5 h-5 md:w-6 md:h-6"/>
      <div className="flex flex-col">
        <p className="text-xs">
          <span className="font-semibold">
            {groupedItems?.length ?? 0}
          </span>{" "}
          {(groupedItems?.length ?? 0) <= 1 ? "article" : "articles"}
        </p>
        <p className="font-semibold">Panier</p>
      </div>
    </Link>
  );
};

export default CartIcon;