import { sanityFetch } from "../lib/live";
import { 
  CATEGORIES_QUERY, 
  MY_ORDERS_QUERY, 
  PRODUCT_BY_CATEGORY_QUERY, 
  PRODUCT_BY_SLUG, 
  PRODUCT_SEARCH_QUERY, 
  PRODUCTS_BY_ORDERRANK_QUERY, 
  SALES_BY_ORDERRANK_QUERY 
} from "./queries";

// ---------------------------
// Produits triés par orderRank
// ---------------------------
export const getAllProducts = async () => {
  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_ORDERRANK_QUERY,
    });
    return products?.data || [];
  } catch (error) {
    console.error("All products fetching Error:", error);
    return [];
  }
};

// ---------------------------
// Annonces triées par orderRank
// ---------------------------
export const getSale = async () => {
  try {
    const sales = await sanityFetch({
      query: SALES_BY_ORDERRANK_QUERY,
    });
    return sales?.data || [];
  } catch (error) {
    console.error("Error fetching Sale data:", error);
    return [];
  }
};

// ---------------------------
// Catégories
// ---------------------------
export const getAllCategories = async () => {
  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories?.data || [];
  } catch (error) {
    console.error("All categories fetching Error:", error);
    return [];
  }
};

// ---------------------------
// Catégorie par slug
// ---------------------------
export const getCategoryBySlug = async (slug: string) => {
  try {
    const category = await sanityFetch({
      query: `*[_type == "category" && slug.current == $slug][0]`,
      params: { slug },
    });
    return category?.data || null;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
};

// ---------------------------
// Produit par slug
// ---------------------------
export const getProductsBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG,
      params: { slug },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Product fetching Error:", error);
    return null;
  }
};

// ---------------------------
// Recherche produits
// ---------------------------
export const searchProductsByName = async (searchParam: string) => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: { searchParam },
    });
    return products?.data || [];
  } catch (error) {
    console.error("Fetching product by name Error:", error);
    return [];
  }
};

// ---------------------------
// Produits par catégorie
// ---------------------------
export const getProductsByCategory = async (categorySlug: string) => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: { categorySlug },
    });
    return products?.data || [];
  } catch (error) {
    console.error("Fetching product by category Error:", error);
    return [];
  }
};

// ---------------------------
// Commandes utilisateur
// ---------------------------
export const getMyOrders = async (userId: string) => {
  if (!userId) throw new Error("Le User ID est requis");

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};