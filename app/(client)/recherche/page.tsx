import ProductGrid from '@/components/ProductGrid';
import { searchProductsByName } from '@/sanity/helpers';
import Container from '@/components/Container';
import React from 'react';

interface Props {
  searchParams: {
    query: string;
  };
}

const SearchPage = async ({ searchParams }: Props) => {
  const { query } = searchParams; // ✅ on n'await pas searchParams
  const products = await searchProductsByName(query);

  if (!products?.length) {
    return (
      <div className="flex justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 h-40 rounded-lg shadow-md w-full md:max-w-4xl text-center">
          <h1 className="text-3xl font-bold mb-3">
            Aucun produit n&rsquo;est nommé <span className="text-gold">{query}</span>
          </h1>
          <p className="text-gray-600">Essayez de chercher avec un autre mot-clé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100">
      <Container className="p-8 bg-white rounded-lg shadow-md mt-3">
        <h1 className="text-3xl font-bold mb-3">
          Résultats pour la recherche <span className="text-gold">{query}</span>
        </h1>
        <ProductGrid products={products} />
      </Container>
    </div>
  );
};

export default SearchPage;