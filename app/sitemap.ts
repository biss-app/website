import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://biss-app.fr";

  // 🏠 Pages principales
  const mainPages: string[] = [
    "/",
    "/recherche",
    "/recherche?query=",
    "/panier",
  ];

  // ⚖️ Pages légales
  const legalPages: string[] = [
    "/mentions-legales",
    "/politique-de-confidentialite",
    "/conditions-generales-de-vente",
  ];

  // 🗂️ Catégories
  const categories: string[] = [
    "/categorie/boissons",
    "/categorie/snacks",
  ];

  // 🍹 Produits (récupérés depuis Sanity)
  const productsData = await client.fetch(`*[_type == "produit"]{
    "slug": slug.current,
    _updatedAt
  }`);

  const productPages = productsData.map((p: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/produit/${p.slug}`,
    lastModified: new Date(p._updatedAt),
  }));

  // Conversion des pages statiques en format sitemap
  const staticPages = [
    ...mainPages,
    ...legalPages,
    ...categories,
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  // Retour final
  return [
    ...staticPages,
    ...productPages,
  ];
}