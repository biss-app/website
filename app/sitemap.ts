import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://biss-app.fr";
  const routes = [
    "/",
    "/panier",

    "/categorie/boissons",
    "/categorie/snacks",

    "/produit/original-25cL",
    "/produit/vitamine-25cL",
    "/produit/booster-25cL",
    "/produit/ginger-boost-25cL",
    "/produit/chips-100g",
    "/produit/mikates-5",

    "/mentions-legales",
    "/politique-de-confidentialite",
    "/conditions-generales-de-vente"
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}