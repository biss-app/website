import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { productSnapshot } from "./productSnapshot";

export const orderType = defineType({
  name: "order",
  title: "Commandes",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({ name: "orderNumber", title: "Numéro de commande", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "stripeCheckoutSessionId", title: "ID de session Stripe", type: "string" }),
    defineField({ name: "stripePaymentIntentId", title: "ID de paiement Stripe", type: "string" }),
    defineField({ name: "stripeCustomerId", title: "Email client (Stripe)", type: "string" }),
    defineField({ name: "clerkUserId", title: "ID utilisateur Clerk", type: "string" }),
    defineField({ name: "customerName", title: "Nom du client", type: "string" }),
    defineField({ name: "email", title: "Email du client", type: "string" }),
    defineField({ name: "products", title: "Produits achetés (snapshot)", type: "array", of: [defineArrayMember({ type: "productSnapshot" })] }),
    defineField({ name: "totalPrice", title: "Prix total", type: "number", validation: (Rule) => Rule.required().min(0) }),
    defineField({ name: "amountDiscount", title: "Montant de la remise", type: "number", initialValue: 0 }),
    defineField({ name: "currency", title: "Devise", type: "string" }),
    defineField({ name: "status", title: "Statut", type: "string", options: { list: [
      { title: "En attente", value: "En attente" },
      { title: "Payée", value: "Payée" },
      { title: "En préparation", value: "En préparation" },
      { title: "En cours de livraison", value: "En cours de livraison" },
      { title: "Livrée", value: "Livrée" },
    ]}}),
    defineField({ name: "orderDate", title: "Date de commande", type: "datetime" }),
  ],
  preview: { select: { title: "customerName", subtitle: "totalPrice€" } },
});