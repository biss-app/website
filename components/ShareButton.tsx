"use client";

import { useState } from "react";
import { FiShare2 } from "react-icons/fi";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof window === "undefined") return;

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      // Réinitialiser l'état après 2 secondes
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Impossible de copier le lien :", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 text-sm text-black hover:text-gold hoverEffect"
      >
        <FiShare2 className="text-lg" />
        <p>Partager</p>
      </button>

      {copied && (
        <div className="absolute right-0 mt-2 w-48 bg-green-100 text-green-600 border border-green-200 rounded-md shadow-md p-2 text-center text-sm">
          Lien copié dans le presse-papier !
        </div>
      )}
    </div>
  );
}