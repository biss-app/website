import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount?: number | undefined;
  className?: string;
  label?: string;
}
const PriceView = ({ price, discount, label, className }: Props) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        {price && discount ? (
          <>
            <PriceFormatter
              amount={price * (1 - discount / 100)}
              className={className}
            />
            <PriceFormatter
              amount={price}
              className={cn("text-xs font-medium line-through text-gray-500", className)}
            />
          </>
        ) : (
          <PriceFormatter amount={price} className={className} />
        )}
      </div>
      {label && <p className="text-gray-500">{label}</p>}
    </div>
  )
}

export default PriceView