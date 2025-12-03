"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Erreur Next.js :", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h2 className="text-2xl font-semibold">Une erreur est survenue</h2>

      <p className="text-gray-600 mt-2 max-w-md">
        Pas d&rsquo;inquiétude, réessayez ou revenez en arrière.
      </p>

      <button
        onClick={reset}
        className="mt-4 px-4 py-2 rounded-lg bg-black text-white hover:bg-gold transition"
      >
        Réessayer
      </button>
    </div>
  );
}