'use client'

import { useRef } from "react";
import DiscountBanner from "./DiscountBanner";
import ProductList from "./ProductList";
import Container from "./Container";
import type { Sale, Product, Category } from "@/types"; // types alignés avec Sanity

interface Props {
  sales: Sale[];
  products: Product[];
  categories: Category[];
}

export default function HomeClient({ sales, products, categories }: Props) {
  const favoriteRef = useRef<HTMLDivElement>(null);

  const scrollToCategory = () => {
    if (favoriteRef.current) {
      const y =
        favoriteRef.current.getBoundingClientRect().top +
        window.scrollY -
        100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Container>
      <DiscountBanner sales={sales} onScrollClick={scrollToCategory} />
      <div ref={favoriteRef}>
        <ProductList
          products={products}
          title
          categories={categories}
        />
      </div>
    </Container>
  );
}