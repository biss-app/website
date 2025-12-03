import { getAllCategories, getAllProducts, getSale } from "@/sanity/helpers";
import HomeClient from "@/components/HomeClient";

export default async function Page() {
  const products = await getAllProducts();
  const sales = await getSale();
  const categories = await getAllCategories();

  return (
    <HomeClient
      sales={sales}
      products={products}
      categories={categories}
    />
  );
}