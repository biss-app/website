"use client";

export default function Error({ error, reset }: any) {
  return (
    <div className="text-center p-20">
      <h2>Une erreur est survenue 😕</h2>
      <button onClick={() => reset()} className="mt-4 underline">
        Réessayer
      </button>
    </div>
  );
}
