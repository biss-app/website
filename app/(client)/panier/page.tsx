"use client";

import { useEffect, useState } from "react";
import Loader from "@/app/(client)/loading";
import { useAuth, useUser } from "@clerk/nextjs";
import SignInPrompt from "@/components/SignInPrompt";
import { ShoppingBag, Trash2, ChevronDown } from "lucide-react";
import userCartStore from "@/store";
import Container from "@/components/Container";
import PriceFormatter from "@/components/PriceFormatter";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import QuantityButtons from "@/components/QuantityButtons";
import EmptyCart from "@/components/EmptyCart";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";
import CheckoutDialog from "@/components/CheckoutDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const CartPage = () => {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const { deleteCartProduct, getTotalPrice, getItemCount, getSubTotalPrice, resetCart } = userCartStore();
  const groupedItems = userCartStore((state) => state.getGroupedItems());

  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"click&collect" | "livraison">("click&collect");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => setIsClient(true), []);
  if (!isClient) return <Loader />;

  if (!isSignedIn) return <SignInPrompt />;

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Le produit a bien été supprimé du panier !");
  };

  const handleResetCart = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser votre panier ?")) {
      resetCart();
      toast.success("Votre panier a été réinitialisé avec succès");
    }
  };

  const handleCheckout = async (data: {
    date: Date;
    time: string;
    city: string;
    mode: "click&collect" | "livraison";
  }) => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Anonyme",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Adresse e-mail non fournie",
        clerkUserId: userId ?? "",
        deliveryDate: data.date.toISOString(),
        deliveryTime: data.time,
        deliveryCity: data.mode === "livraison" ? data.city : undefined,
        deliveryMode: data.mode
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) window.location.href = checkoutUrl;
    } finally {
      setLoading(false);
    }
  };

  const subTotal = getSubTotalPrice();
  const total = getTotalPrice();
  const discount = subTotal - total;
  const shippingCost = deliveryMode === "click&collect" ? 0 : total >= 25 ? 0 : 2.5;
  const finalTotal = total + shippingCost;
  const shippingLabel = deliveryMode === "click&collect"
    ? "OFFERT"
    : shippingCost === 0
    ? "OFFERTE"
    : <PriceFormatter amount={shippingCost} />;

  return (
    <div className="pb-10">
      <Container>
        {groupedItems?.length ? (
          <>
            {/* Résumé de commande & liste produits */}
            {/* ...le code reste identique à ton ancien panier page */}
            {/* CheckoutDialog et Dialog */}
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </div>
  );
};

export default CartPage;