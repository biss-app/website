import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Biss'App",
  description: "Vente de boissons non alcoolisées et de snacks",
};

const RootLayout = ({ children }: { children: React.ReactNode })=>{
    return (
        <html lang="fr">
          <body>
           {children} 
          </body>
        </html>
    );
    
};

export default RootLayout;