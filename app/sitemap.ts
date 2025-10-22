import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://biss-app.fr";

  const products = await client.fetch(`*[_type == "produit"]{
    "slug": slug.current,
    _updatedAt
  }`);

  const staticRoutes: string[] = ["/", "/panier", "/mentions-legales", "/politique-de-confidentialite", "/conditions-generales-de-vente"];

  const productRoutes = products.map((p: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/produits/${p.slug}`,
    lastModified: new Date(p._updatedAt),
  }));

  return [
    ...staticRoutes.map((p: string) => ({ url: `${baseUrl}${p}`, lastModified: new Date() })),
    ...productRoutes,
  ];
}