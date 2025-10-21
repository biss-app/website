import type { Metadata } from "next";
import { Poppins, Geist, Geist_Mono } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: "400",
  preload:false
});

export const metadata: Metadata = {
  title: "Biss'App",
  description: "Vente de boissons non alcoolisées et de snacks",
};

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
        </body>
      </html>
    </ClerkProvider>
  );
}
