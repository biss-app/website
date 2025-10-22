import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { Toaster } from "react-hot-toast";
import DisableDraftMode from "@/components/DisableDraftMode";
import { VisualEditing } from "@sanity/visual-editing/react";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: "400",
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://biss-app.fr"),
  title: {
    default: "Biss'App",
    template: "%s | Biss'App",
  },
  description:
    "Voyagez en Afrique en seulement quelques clics ! Biss'App propose des boissons et snacks africains artisanaux à Clermont-Ferrand et ses alentours.",
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
    title: "Biss'App – Boissons et snacks africains artisanaux",
    description: "Boissons et snacks africains artisanaux à Clermont-Ferrand.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Biss'App – Boissons et snacks africains artisanaux",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biss'App",
    description: "Boissons et snacks africains artisanaux à Clermont-Ferrand.",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const draft = await draftMode();

  return (
    <ClerkProvider dynamic localization={frFR}>
      <html lang="fr">
        <body
          className={`${poppins.variable} antialiased min-h-screen flex flex-col`}
        >
          {draft.isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing portal={true} />
            </>
          )}

          <Header />

          <main className="flex-grow">{children}</main>

          <Footer />

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#000000",
                color: "#FFFFFF",
              },
            }}
          />

          <SanityLive />

          {/* 🧩 Données structurées Schema.org */}
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
                  "@type": "PostalAddress",
                  addressLocality: "Clermont-Ferrand",
                  postalCode: ["63000", "63100"],
                  addressCountry: "FR",
                },
                servesCuisine: "Cuisine africaine artisanale",
                priceRange: "€",
              }),
            }}
          />
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}