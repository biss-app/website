import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations"
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import DisableDraftMode from "@/components/DisableDraftMode";
import { VisualEditing } from "next-sanity";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: "400",
  preload:false
});

export const metadata: Metadata = {
  metadataBase: new URL("https://biss-app.fr"),
  title: {
    default: "Biss'App – Boissons & Snacks à Clermont-Ferrand",
    template: "%s | Biss'App",
  },
  description:
    "Biss'App propose du bissap, du jus de gingembre, des chips de banane plantain, des mikatés et plus encore à Clermont-Ferrand et alentours.",
  keywords: [
    "bissap",
    "jus de gingembre",
    "chips de banane plantain",
    "mikatés",
    "snacks africains",
    "Clermont-Ferrand",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://biss-app.fr",
    siteName: "Biss'App",
    title: "Biss'App – Boissons et Snacks à Clermont-Ferrand",
    description:
      "Boissons et snacks africains artisanaux à Clermont-Ferrand.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Biss'App – Boissons et snacks africains",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biss'App",
    description:
      "Vente de boissons et snacks africains à Clermont-Ferrand.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://biss-app.fr",
  },
  robots: {
    index: true,
    follow: true,
  },
};

<Script
  id="schema-localbusiness"
  type="application/ld+json"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FoodEstablishment",
      name: "Biss'App",
      image: "https://biss-app.fr/og-image.png",
      url: "https://biss-app.fr",
      address: {
        "@type": "City",
        addressLocality: "Clermont-Ferrand",
        postalCode: ["63000", "63100"],
        addressCountry: "FR",
      },
      servesCuisine: "Cuisine africaine artisanale",
      priceRange: "€",
    }),
  }}
/>

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic localization={frFR}>
      <html lang="fr">
        <body className={`${poppins.variable} antialiased min-h-screen flex flex-col`}>
          {(await draftMode()).isEnabled && (
            <>
             <DisableDraftMode />
             <VisualEditing />
            </>
          )}
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" toastOptions={{
            style:{
              background: "#000000",
              color: "#FFFFFF",
            },
          }} />
          <SanityLive />
        <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
