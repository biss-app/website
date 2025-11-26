"use client";

import { useEffect, useState } from "react";
import Loader from "@/loader";
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
  const { deleteCartProduct, getTotalPrice, getItemCount, getSubTotalPrice, resetCart } =
    userCartStore();
  const groupedItems = userCartStore((state) => state.getGroupedItems());
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"click&collect" | "livraison">(
    "click&collect"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => setIsClient(true), []);
  if (!isClient) return <Loader />;

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
        clerkUserId: user?.id ?? "",
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

  // --- 🚚 Calculs ---
  const subTotal = getSubTotalPrice();
  const discount = subTotal - getTotalPrice();
  const totalAfterDiscount = subTotal - discount;
  const shippingCost = deliveryMode === "click&collect" ? 0 : totalAfterDiscount >= 25 ? 0 : 2.5;
  const finalTotal = getTotalPrice() + shippingCost;

  const shippingLabel =
    deliveryMode === "click&collect"
      ? "OFFERT"
      : shippingCost === 0
      ? "OFFERTE"
      : <PriceFormatter amount={shippingCost} />;

  return (
    <div className="pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              {/* En-tête */}
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-semibold">Votre panier</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-32">
                {/* Résumé Desktop */}
                <div className="lg:col-span-1">
                  <div className="hidden md:block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Sous-total</span>
                        <PriceFormatter amount={subTotal} />
                      </div>

                      <div className="flex justify-between">
                        <span>Réduction</span>
                        <PriceFormatter amount={discount} />
                      </div>

                      {/* Livraison */}
                      <div className="flex items-center justify-between relative">
                        <div
                          className="flex items-center gap-1.5 cursor-pointer select-none px-2.5 py-1 border rounded-md"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          <span>
                            {deliveryMode === "click&collect"
                              ? "Click & Collect"
                              : "Livraison à domicile"}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              dropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        <span
                          className={`font-semibold px-2 py-0.5 rounded-md text-sm ${
                            shippingCost === 0
                              ? "text-green-600 bg-green-50"
                              : "text-gray-700"
                          }`}
                        >
                          {shippingLabel}
                        </span>

                        {dropdownOpen && (
                          <div className="absolute top-full mt-1 left-0 w-56 bg-white border rounded-md shadow-md z-10 text-sm">
                            <div
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setDeliveryMode("click&collect");
                                setDropdownOpen(false);
                              }}
                            >
                              Click & Collect
                            </div>
                            <div
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setDeliveryMode("livraison");
                                setDropdownOpen(false);
                              }}
                            >
                              Livraison à domicile
                            </div>
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormatter amount={finalTotal} />
                      </div>

                      <div className="flex flex-col gap-2 pt-1">
                        <Button onClick={() => setIsDialogOpen(true)}>Passer commande</Button>
                        <Link href="/" className="text-center text-sm text-primary">
                          Continuer mes achats
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Produits */}
                <div className="lg:col-span-2 rounded-lg overflow-hidden border">
                  {/* Header Desktop */}
                  <div className="hidden md:grid grid-cols-6 bg-white border-b p-3 font-semibold">
                    <h2 className="col-span-3">Produit</h2>
                    <h2>Prix</h2>
                    <h2>Quantité</h2>
                    <h2>Sous-total</h2>
                  </div>

                  <div className="bg-white">
                    {groupedItems.map(({ product }) => {
                      const itemCount = getItemCount(product._id);

                      return (
                        <div
                          key={product._id}
                          className="
                            grid grid-cols-1 gap-3 border-b p-3
                            md:grid md:grid-cols-6 md:items-center
                          "
                        >
                          {/* Produit */}
                          <div className="flex items-center gap-3 md:col-span-3">
                            <Trash2
                              onClick={() => handleDeleteProduct(product._id)}
                              className="w-5 h-5 text-gray-500 hover:text-red-600 hoverEffect"
                            />

                            <Link
                              href={`/produit/${product.slug.current}`}
                              className="border rounded-md overflow-hidden"
                              style={{
                                width: 56,
                                height: 56,
                                position: "relative"
                              }}
                            >
                              <Image
                                src={urlFor(product.image).url()}
                                alt="productImage"
                                fill
                                className="object-cover"
                              />
                            </Link>

                            <div>
                              <h2 className="text-base font-semibold text-gray-700 line-clamp-1">
                                {product.name}
                              </h2>
                              <p className="text-sm text-gray-500">{product.label}</p>
                            </div>
                          </div>

                          {/* Prix */}
                          <div className="flex justify-between md:block">
                            <span className="md:hidden text-sm text-gray-500">Prix :</span>
                            <PriceFormatter amount={product.price} />
                          </div>

                          {/* Quantité */}
                          <div className="flex justify-between md:block">
                            <span className="md:hidden text-sm text-gray-500">
                              Quantité :
                            </span>
                            <QuantityButtons product={product} />
                          </div>

                          {/* Sous-total */}
                          <div className="flex justify-between md:block font-medium">
                            <span className="md:hidden text-sm text-gray-500">
                              Sous-total :
                            </span>
                            <PriceFormatter amount={product.price * itemCount} />
                          </div>
                        </div>
                      );
                    })}

                    <Button
                      onClick={handleResetCart}
                      variant="destructive"
                      className="m-5 font-semibold"
                    >
                      Réinitialiser le panier
                    </Button>
                  </div>
                </div>
              </div>

              {/* Résumé Mobile */}
              <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 z-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-xl font-semibold">
                      <PriceFormatter amount={finalTotal} />
                    </p>
                  </div>

                  <Button onClick={() => setIsDialogOpen(true)} className="px-6 py-3 text-sm">
                    Commander
                  </Button>
                </div>
              </div>

              {/* Checkout Dialog */}
              <CheckoutDialog
                isOpen={isCheckoutOpen}
                loading={loading}
                onClose={() => setIsCheckoutOpen(false)}
                onConfirm={(data) => handleCheckout({ ...data, mode: deliveryMode })}
                mode={deliveryMode}
              />

              {/* Info Dialog */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg text-center">
                  <DialogHeader>
                    <DialogTitle>Nous rencontrons un problème temporaire 😔</DialogTitle>
                    <DialogDescription className="mt-3 text-gray-600 leading-relaxed text-sm">
                      <p>
                        Nous travaillons activement à résoudre un souci sur notre système de
                        paiement. En attendant, contactez-nous :
                      </p>

                      <div className="mt-3">
                        <a
                          href="mailto:contact@biss-app.fr?subject=COMMANDE%20BISS'APP"
                          className="text-primary font-semibold hover:underline"
                        >
                          📧 Par e-mail
                        </a>{" "}
                        ou{" "}
                        <a
                          href="https://www.instagram.com/direct/new/?username=bissapp.fr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-semibold hover:underline"
                        >
                          💬 sur Instagram
                        </a>
                        .
                      </div>

                      <p className="mt-3">Merci de préciser :</p>

                      <ul className="text-left list-disc list-inside mt-2 space-y-1">
                        <li>Les produits souhaités</li>
                        <li>Le mode de remise</li>
                        <li>Date / heure souhaitées</li>
                        <li>Adresse si livraison</li>
                      </ul>
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <Button onClick={() => setIsDialogOpen(false)}>Fermer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <SignInPrompt />
      )}
    </div>
  );
};

export default CartPage;