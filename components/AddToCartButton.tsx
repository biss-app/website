"use client";
import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import QuantityButtons from "./QuantityButtons";
import PriceFormatter from "./PriceFormatter";
import { useEffect, useState } from "react";
import userCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
}
const AddToCartButton = ({product, className}: Props) => {
  const [isClient,setisClient]=useState(false);
  const {addItem, getItemCount}=userCartStore();

  useEffect(() => {
    setisClient(true);
  }, []);
  if(!isClient){
    return null;
  }

  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock ===0;
  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product?.name} a été ajouté au panier`);
  };

  return (
  <div>
    {itemCount? (
    <div className="text-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Quantité</span>
        <QuantityButtons product={product} />
      </div>
      <div className="flex items-center justify-between border-t pt-1">
        <span>Sous-total</span>
        <PriceFormatter 
          amount={product?.price && product?.discount ? (
            product.price * (1 - product.discount / 100) * itemCount
          ) : (
            product?.price ? product?.price * itemCount : 0
          )}
        />
      </div>
    </div>
    ) : (
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn(
          "bg-gold/10 text-bissap border-gold border py-2 mt-2 w-full rounded-md font-medium hover:bg-gold hover:text-white hoverEffect disabled:hover:cursor-not-allowed disabled:bg-gold/10 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:border-gold/10",
          className
        )}
      >
        Ajouter au panier
      </Button>
      )}
    </div>
  );
};

export default AddToCartButton
