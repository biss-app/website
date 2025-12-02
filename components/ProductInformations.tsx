"use client";

import { useEffect, useState } from "react";
import { LuList } from "react-icons/lu";
import { FaRegQuestionCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FiInfo } from "react-icons/fi";
import ShareButton from "@/components/ShareButton";
import userCartStore from "@/store";
import type { Product } from "@/types";

// Type exact des ingrédients selon ton schéma Sanity
interface Ingredient {
  _key: string;
  _type: "ingredient";
  name?: string;
  allergen?: string;
}

interface Props {
  product: Product;
}

export default function ProductInformations({ product }: Props) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { getTotalPrice } = userCartStore();
  const totalPrice = userCartStore((state) => state.getTotalPrice());

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Ligne des boutons / responsive scroll */}
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
        <button
          className={`flex items-center flex-none gap-2 text-sm hover:text-gold hoverEffect ${
            openSection === "ingredients" ? "text-gold" : "text-black"
          }`}
          onClick={() => toggleSection("ingredients")}
        >
          <LuList className="text-lg" />
          <span>Ingrédients</span>
        </button>

        <button
          className={`flex items-center flex-none gap-2 text-sm hover:text-gold hoverEffect ${
            openSection === "question" ? "text-gold" : "text-black"
          }`}
          onClick={() => toggleSection("question")}
        >
          <FaRegQuestionCircle className="text-lg" />
          <span>Poser une question</span>
        </button>

        <button
          className={`flex items-center flex-none gap-2 text-sm hover:text-gold hoverEffect ${
            openSection === "livraison" ? "text-gold" : "text-black"
          }`}
          onClick={() => toggleSection("livraison")}
        >
          <TbTruckDelivery className="text-lg" />
          <span>Livraison</span>
        </button>

        <button
          className={`flex items-center flex-none gap-2 text-sm hover:text-gold hoverEffect ${
            openSection === "détails" ? "text-gold" : "text-black"
          }`}
          onClick={() => toggleSection("détails")}
        >
          <FiInfo className="text-lg" />
          <span>Détails</span>
        </button>

        <div className="flex-none">
          <ShareButton />
        </div>
      </div>

      {/* Barre horizontale */}
      <div className="border-b border-gray-200" />

      {/* Contenu dynamique */}
      {openSection && (
        <div className="mt-2 space-y-2 text-sm text-gray-600">
          {openSection === "ingredients" && (
            <div className="flex flex-col gap-1">
              {product.ingredients?.map((ing: Ingredient) => (
                <p key={ing._key}>
                  {ing.name}
                  {ing.allergen && (
                    <span className="font-semibold"> ({ing.allergen})</span>
                  )}
                </p>
              ))}
            </div>
          )}

          {openSection === "question" && (
            <p>
              Pour toute question, veuillez nous adresser un mail à{" "}
              <a
                href="mailto:contact@biss-app.fr"
                className="text-gold underline"
              >
                contact@biss-app.fr
              </a>.
            </p>
          )}

          {openSection === "livraison" && (
            <p className="whitespace-pre-line">
              Nos produits peuvent être livrés à l&rsquo;adresse de votre choix
              ou récupérés en Click&Collect à l&rsquo;arrêt de tramway Stade M.
              Michelin.

              {"\n\n"}
              Pour toute commande passée avant 17h00 entre le lundi et le vendredi, livraison possible dès 19h00.
              Après 17h00, livraison possible dès le lendemain à partir de 12h00.

              {"\n\n"}
              Plus d&rsquo;infos dans nos{" "}
              <a
                href="/conditions-generales-de-vente"
                className="text-gold underline"
              >
                Conditions Générales de Vente
              </a>.
            </p>
          )}

          {openSection === "détails" && (
            <div className="text-sm text-gray-600 whitespace-pre-line">
              🌍{" "}
              <span className="font-semibold">
                Nos bouteilles sont fabriquées en{" "}
                  <a href="https://www.recycletheone.com/fr/quest-ce-que-le-pet/" target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-gold-700">
                    polyethylene terephthalate (PET)
                  </a>
              </span>
              <br/>
              <br/>
                Ce matériau figure parmi les plus performants pour les emballages alimentaires.
                <br/>
                Il assure une protection optimale des boissons, en préservant leurs arômes, leur fraîcheur et leurs qualités naturelles tout au long de leur conservation.
                <br/>
                <br/>
                Bien que le verre soit également recyclable et bénéficie d&rsquo;un bon taux de collecte, son empreinte carbone reste nettement plus élevée que celle du PET.
                <br/>
                Grâce à sa légèreté, sa résistance et son impact environnemental réduit, le PET représente une solution d&rsquo;emballage à la fois fiable, sécurisée et durable.
                <br/>
                <br/>
                <span className="font-semibold">
                  Nous vous encourageons, pour notre si belle planète, à réutiliser les bouteilles PET qui vous seront remises lors de la livraison.
                </span>
            </div>
          )}
        </div>
      )}

      {/* Bloc livraison offerte */}
      <div className="flex justify-center mt-4">
        {totalPrice !== null &&
          (totalPrice < 25 ? (
            <p className="bg-red-100 w-auto px-4 text-center text-red-600 text-sm py-2.5 font-semibold rounded-lg">
              🚚 Plus que {(25 - totalPrice).toFixed(2)}€ avant la LIVRAISON OFFERTE
            </p>
          ) : (
            <p className="bg-green-100 w-auto px-4 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
              🎁 LIVRAISON OFFERTE
            </p>
          ))}
      </div>
    </div>
  );
}
