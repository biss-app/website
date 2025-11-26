'use client';

import { useEffect, useState } from "react";
import { LuList } from "react-icons/lu";
import { FaRegQuestionCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import ShareButton from "@/components/ShareButton";
import userCartStore from "@/store";
import type { Product } from "@/types";
import { FiInfo } from "react-icons/fi";

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
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [getTotalPrice]);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Détermine si on doit afficher les détails
  const showDetails = !["Chips de banane plantain", "Mikatés"].includes(product?.name || "");

  return (
    <div className="flex flex-col gap-4">
      {/* Ligne horizontale des boutons */}
      <div className="flex items-center justify-between gap-4">
        <button
          className={`flex items-center gap-2 text-sm hover:text-gold hoverEffect ${
            openSection === "ingredients" ? "text-gold" : "text-black"
          }`}
          onClick={() => toggleSection("ingredients")}
        >
          <LuList className="text-lg" />
          <p>Ingrédients</p>
        </button>

        <button
          className={`flex items-center gap-2 text-sm hover:text-gold hoverEffect ${
            openSection === "question" ? "text-gold" : "text-black"
          }`}
          onClick={() => toggleSection("question")}
        >
          <FaRegQuestionCircle className="text-lg" />
          <p>Poser une question</p>
        </button>

        <button
          className={`flex items-center gap-2 text-sm hover:text-gold hoverEffect ${
            openSection === "livraison" ? "text-gold" : "text-black"
          }`}
          onClick={() => toggleSection("livraison")}
        >
          <TbTruckDelivery className="text-lg" />
          <p>Livraison</p>
        </button>

        {showDetails && (
          <button
            className={`flex items-center gap-2 text-sm hover:text-gold hoverEffect ${
              openSection === "détails" ? "text-gold" : "text-black"
            }`}
            onClick={() => toggleSection("détails")}
          >
            <FiInfo className="text-lg" />
            <p>Détails</p>
          </button>
        )}

        <ShareButton />
      </div>

      {/* Barre horizontale */}
      <div className="border-b border-b-gray-200 pb-2" />

      {/* Contenu dynamique */}
      {openSection && (
        <div className="mt-2">
          {openSection === "ingredients" && (
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              {product.ingredients?.map((ing: Ingredient) => (
                <p key={ing._key}>
                  {ing.name}
                  {ing.allergen && (
                    <span className="font-semibold" aria-label={`Allergène : ${ing.allergen}`}>
                      {" "}({ing.allergen})
                    </span>
                  )}
                </p>
              ))}
            </div>
          )}

          {openSection === "question" && (
            <div className="text-sm text-gray-600">
              Pour toute question, veuillez nous adresser un mail à l&apos;adresse{" "}
              <a href="mailto:contact@biss-app.fr" className="text-gold underline">
                contact@biss-app.fr
              </a>.
            </div>
          )}

          {openSection === "livraison" && (
            <div className="text-sm text-gray-600 whitespace-pre-line">
              Nos produits peuvent être livrés à l&apos;adresse de votre choix ou
              récupérés en Click&Collect à l&apos;arrêt de tramway Stade M. Michelin.{"\n\n"}
              Pour toute commande passée avant midi, celle-ci pourra être remise
              dès le lendemain. Les commandes passées après midi ne pourront être
              remises moins de 2 jours après le passage de la commande.{"\n\n"}
              Pour plus d&apos;informations, veuillez consulter nos{" "}
              <a href="/conditions-generales-de-vente" className="text-gold underline hover:text-gold-700">
                Conditions Générales de Vente
              </a>.
            </div>
          )}

          {openSection === "détails" && showDetails && (
            <div className="text-sm text-gray-600 whitespace-pre-line">
              🌍 <span className="font-semibold">Nos bouteilles sont fabriquées en <a href="https://www.recycletheone.com/fr/quest-ce-que-le-pet/" target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-gold-700">polyethylene terephthalate (PET)</a></span>
              <br/><br/>
              Ce matériau figure parmi les plus performants pour les emballages alimentaires.
              <br/>
              Il assure une protection optimale des boissons, en préservant leurs arômes, leur fraîcheur et leurs qualités naturelles tout au long de leur conservation.
              <br/><br/>
              Bien que le verre soit également recyclable et bénéficie d&rsquo;un bon taux de collecte, son empreinte carbone reste nettement plus élevée que celle du PET.
              <br/>
              Grâce à sa légèreté, sa résistance et son impact environnemental réduit, le PET représente une solution d&rsquo;emballage à la fois fiable, sécurisée et durable.
              <br/><br/>
              <span className="font-semibold">
                Nous vous encourageons, pour notre si belle planète, à réutiliser les bouteilles PET qui vous seront remises lors de la livraison.
              </span>
            </div>
          )}
        </div>
      )}

      {/* Bloc livraison offerte */}
      <div className="flex justify-center mt-4">
        {totalPrice !== null && (
          totalPrice < 25 ? (
            <p className="bg-red-100 w-56 text-center text-red-600 text-sm py-2.5 font-semibold rounded-lg">
              🚚 Plus que {(25 - totalPrice).toFixed(2)}€ avant la LIVRAISON OFFERTE
            </p>
          ) : (
            <p className="bg-green-100 w-56 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
              🎁 LIVRAISON OFFERTE
            </p>
          )
        )}
      </div>
    </div>
  );
}