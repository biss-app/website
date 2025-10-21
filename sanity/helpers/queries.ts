import { defineQuery } from "next-sanity";

export const SALE_QUERY= defineQuery(
  `*[_type == "sale"] | order(orderRank asc)`);

export const PRODUCTS_QUERY= defineQuery(
  `*[_type == "product"] | order(orderRank asc)`
);

export const CATEGORIES_QUERY= defineQuery(
  `*[_type == "category"] | order(orderRank asc)`
);

export const PRODUCT_BY_SLUG=defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(orderRank asc)[0]`
);

export const PRODUCT_SEARCH_QUERY=defineQuery(
  `*[_type == "product" && name match $searchParam] | order(orderRank asc)`
);

export const PRODUCT_BY_CATEGORY_QUERY=defineQuery(
  `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(orderRank asc)`
);

export const PRODUCTS_BY_ORDERRANK_QUERY = `*[_type == "product"] | order(orderRank asc)`;
export const SALES_BY_ORDERRANK_QUERY = `*[_type == "sale"] | order(orderRank asc)`;


export const MY_ORDERS_QUERY =
defineQuery(`*[_type =='order' && clerkUserId == $userId] | order(orderData desc){
  ..., products[]{
  ..., product->
  }
}`);