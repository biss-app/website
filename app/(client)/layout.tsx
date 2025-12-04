import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { Toaster } from "react-hot-toast";
import DisableDraftMode from "@/components/DisableDraftMode";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { draftMode } from "next/headers";
import SEOSchema from "@/components/SEOSchema";

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
  // … (tout le reste est OK)
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
          {draft.isEnabled && <DisableDraftMode />}

          <Header />

          <main className="grow">
            {children}
          </main>

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
          
          <SEOSchema />

          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}