import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

const STRIPE_SHIPPING_STANDARD_ID = process.env.STRIPE_SHIPPING_STANDARD_ID!;
const STRIPE_SHIPPING_FREE_ID = process.env.STRIPE_SHIPPING_FREE_ID!;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  console.log("ℹ️ Webhook reçu, signature :", !!sig);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, STRIPE_WEBHOOK_SECRET);
    console.log("ℹ️ Type d'événement :", event.type);
  } catch (err) {
    console.error("❌ Signature invalide :", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Paiement confirmé :", session.id);
      await createOrderInSanity(session);
      console.log("✅ Commande enregistrée dans Sanity");
    }
  } catch (err) {
    console.error("❌ Erreur webhook :", err);
    return NextResponse.json({ error: "Erreur webhook" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// Upload image vers Sanity
async function uploadSanityImage(url: string) {
  try {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    const file = new File([arrayBuffer], "product.jpg", { type: "image/jpeg" });
    const asset = await backendClient.assets.upload("image", file);
    return asset._id;
  } catch (err) {
    console.error("❌ Erreur upload image :", err);
    return null;
  }
}

// Création commande dans Sanity
async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    payment_intent,
    currency,
    amount_total,
    metadata,
    customer_details,
  } = session;

  const orderNumber = metadata?.["Numéro de commande"] || `ORD-${Date.now()}`;
  const clerkUserId = metadata?.["ID d'utilisateur Clerk"] || "unknown";
  const customerEmail = metadata?.["Adresse e-mail du client"] || customer_details?.email || "";
  const customerName = metadata?.["Nom du client"] || customer_details?.name || "Client anonyme";

  // Récupération des articles achetés
  const lineItems = await stripe.checkout.sessions.listLineItems(id, { expand: ["data.price.product"] });

  const products = await Promise.all(
    lineItems.data.map(async (item) => {
      const product = item.price?.product as Stripe.Product;
      const unitAmount = item.price?.unit_amount || 0;

      let sanityImage = null;
      if (product?.images?.[0]) {
        const uploaded = await uploadSanityImage(product.images[0]);
        if (uploaded) sanityImage = { _type: "image", asset: { _type: "reference", _ref: uploaded } };
      }

      return {
        _key: crypto.randomUUID(),
        _type: "productSnapshot",
        title: product?.name || "Produit",
        description: product?.description || "",
        price: unitAmount / 100,
        quantity: item.quantity || 1,
        image: sanityImage,
      };
    })
  );

  // Ajout frais de livraison
  const shippingItem = lineItems.data.find(
    (item) => item.price?.id === STRIPE_SHIPPING_STANDARD_ID || item.price?.id === STRIPE_SHIPPING_FREE_ID
  );
  if (shippingItem) {
    products.push({
      _key: crypto.randomUUID(),
      _type: "productSnapshot",
      title: shippingItem.description || "Frais de livraison",
      description: shippingItem.description || "",
      price: (shippingItem.amount_total || 0) / 100,
      quantity: shippingItem.quantity || 1,
      image: null,
    });
  }

  const orderDoc = {
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    clerkUserId,
    customerName,
    email: customerEmail,
    currency: currency?.toUpperCase() || "EUR",
    totalPrice: (amount_total || 0) / 100,
    amountDiscount: 0,
    status: "Payée",
    orderDate: new Date().toISOString(),
    products,
  };

  return backendClient.create(orderDoc);
}