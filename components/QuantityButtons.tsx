import { Product } from "@/sanity.types";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import userCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
  borderStyle?: string;
}

const QuantityButtons = ({product, className, borderStyle}: Props) => {
  const {addItem, removeItem, getItemCount} = userCartStore()
  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if(itemCount > 1) {
      toast.success("La gourmandise est un vilain défaut ... que vous savez gérer ! 😎")
    }else{
      toast.success(`${product?.name} a été retiré du panier`)
    }
  };
  const handleAddProduct = () => {
    addItem(product);
    toast.success("Vous en voulez encore ?! Vous allez vous régaler ! 😋");
  };
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;
  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6"
        onClick={handleRemoveProduct}
      >
        <HiMinus/>
      </Button>
      <span className="font-semibold w-8 text-center text-gold">{itemCount}</span>
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6"
        onClick={handleAddProduct}
      >
        <HiPlus/>
      </Button>
    </div>
  )
}

export default QuantityButtons