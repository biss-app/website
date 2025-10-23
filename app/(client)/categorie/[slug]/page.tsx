import { getAllCategories, getProductsByCategory } from '@/sanity/helpers';
import Container from "@/components/Container";
import React from 'react'
import ProductList from '@/components/ProductList';

interface Props {
  params: Promise<{slug: string}>;
}

const CategoriesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const categories = await getAllCategories();
  const products = await getProductsByCategory(slug);
  console.log(products)
  
  return (
    <div className="flex flex-col items-center bg-gray-100">
      <Container className="p-8 bg-white rounded-lg shadow-md mt-3 w-full">
        <h1 className="text-2xl md:text-3xl font-bold">
          Résultats de recherche pour la catégorie{" "}
          <span className="text-gold">
            {slug
            .split("-")
            .map(word => word.toLowerCase())
            .map((word, index) =>
              index === 0
            ? word.charAt(0).toUpperCase() + word.slice(1)
            : word)
            .join(" ")}{" "}
          </span>
        </h1>
        <ProductList products={products} categories={categories} />
      </Container>
    </div>
  )
}

export default CategoriesPage