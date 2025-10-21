import { Category, Product } from "@/sanity.types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";

interface Props {
  products: Product[];
  categories: Category[];
  title?: boolean;
}
const ProductList = ({products, title, categories}: Props) => {
  return (
    <div className="pb-10">
      <Categories categories={categories} />
      {/* Product */}
      {title && (
        <div className="pb-5">
          <h2 className="text-2xl font-semibold text-gray-600">
            <span className="text-gold">Explorez{" "}</span>notre boutique
          </h2>
          <p className="text-sm text-gray-500">Votre coup de c&oelig;ur n'attend que vous !</p>
        </div>
      )}
      <ProductGrid products={products} />
    </div>
  )
};

export default ProductList