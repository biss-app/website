"use server";

import stripe from "@/lib/stripe";
import type Stripe from "stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import { portableTextToString } from "@/lib/utils";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  deliveryMode: "click&collect" | "livraison";
  deliveryDate?: string;
  deliveryTime?: string;
  deliveryCity?: string;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

const STRIPE_SHIPPING_STANDARD_ID = process.env.STRIPE_SHIPPING_STANDARD_ID!;
const STRIPE_SHIPPING_FREE_ID = process.env.STRIPE_SHIPPING_FREE_ID!;

const formatDeliveryMode = (mode: "click&collect" | "livraison") =>
  mode === "livraison" ? "Livraison à domicile" : "Click & Collect";

const formatDate = (isoDate?: string) => {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata
) {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0)
      throw new Error("Certains articles n'ont pas de prix");

    // 🧾 Création des line_items produits
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => ({
        price_data: {
          currency: "EUR",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.label
              ? `${item.product.name} (${item.product.label})`
              : item.product.name || "Produit sans nom",
            description:
              portableTextToString(item.product.description) ||
              "Aucune description",
            metadata: { id: item.product._id },
            images:
              item.product.image &&
              typeof item.product.image === "object" &&
              "asset" in item.product.image
                ? [urlFor(item.product.image).url()]
                : typeof item.product.image === "string"
                ? [item.product.image]
                : undefined,
          },
        },
        quantity: item.quantity,
      })
    );

    const subtotal = items.reduce(
      (acc, item) => acc + (item.product.price || 0) * item.quantity,
      0
    );

    // 📦 Gestion livraison
    const deliveryInfo =
      metadata.deliveryMode === "livraison"
        ? `${formatDeliveryMode(metadata.deliveryMode)} à ${
            metadata.deliveryCity || ""
          } le ${formatDate(metadata.deliveryDate)} à ${metadata.deliveryTime}`
        : `${formatDeliveryMode(metadata.deliveryMode)} le ${formatDate(
            metadata.deliveryDate
          )} à ${metadata.deliveryTime}`;

    const stripeMetadata: Record<string, string> = {
      "Nom du client": metadata.customerName,
      "Adresse e-mail du client": metadata.customerEmail,
      "Informations de livraison": deliveryInfo,
      "Numéro de commande": metadata.orderNumber,
      "ID d'utilisateur Clerk": metadata.clerkUserId,
    };

    // 👤 Recherche ou création du client Stripe
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    const customerId = customers.data.length > 0 ? customers.data[0].id : "";

    // 🧾 Construction du payload
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/panier`,
      line_items,
      payment_intent_data: { metadata: stripeMetadata },
    };

    // 🚚 Ajout des shipping options si livraison
    if (metadata.deliveryMode === "livraison") {
      sessionPayload.shipping_address_collection = {
        allowed_countries: ["FR"],
      };
      sessionPayload.shipping_options = [
        {
          shipping_rate:
            subtotal < 25
              ? STRIPE_SHIPPING_STANDARD_ID
              : STRIPE_SHIPPING_FREE_ID,
        },
      ];
    }

    if (customerId) sessionPayload.customer = customerId;
    else sessionPayload.customer_email = metadata.customerEmail;

    const session = await stripe.checkout.sessions.create(sessionPayload);
    console.log("✅ Checkout session créée :", session.id);
    return session.url;
  } catch (error) {
    console.error("💥 Erreur création session Stripe :", error);
    throw error;
  }
}