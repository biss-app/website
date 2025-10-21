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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CartPage = () => {
  const { deleteCartProduct, getTotalPrice, getItemCount, getSubTotalPrice, resetCart } = userCartStore();
  const groupedItems = userCartStore((state) => state.getGroupedItems());
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"click&collect" | "livraison">("click&collect");
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

  const handleCheckout = async (data: { date: Date; time: string; city: string; mode: "click&collect" | "livraison" }) => {
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

  // --- 🚚 Calcul Livraison ---
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

  const buttonLabel =
    deliveryMode === "click&collect"
      ? "Choisir mon créneau de retrait"
      : "Choisir mon créneau de livraison";

  return (
    <div className="pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              {/* En-tête panier */}
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-semibold">Votre panier</h1>
              </div>

              <div className="grid lg:grid-cols-3 md:gap-8 pb-40">
                {/* Résumé commande */}
                <div className="lg:col-span-1">
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Sous-total</span>
                        <PriceFormatter amount={subTotal} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Réduction</span>
                        <PriceFormatter amount={discount} />
                      </div>

                      {/* 🚚 Livraison avec dropdown moderne */}
                      <div className="flex items-center justify-between relative">
                        <div
                          className="flex items-center gap-1.5 cursor-pointer select-none px-2.5 py-1 border rounded-md"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          <span>{deliveryMode === "click&collect" ? "Click & Collect" : "Livraison à domicile"}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                          />
                        </div>

                        <span
                          className={`font-semibold px-2 py-0.5 rounded-md text-sm ${
                            shippingCost === 0 ? "text-green-600 bg-green-50" : "text-gray-700"
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
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormatter amount={finalTotal} />
                      </div>

                      <div className="flex flex-col gap-2 pt-1">
                        {/* <Button onClick={() => setIsCheckoutOpen(true)} className="text-sm font-medium">
                          {buttonLabel}
                        </Button> */}
                        <Button
                          onClick={() => setIsDialogOpen(true)}
                          className="text-sm font-medium"
                        >
                          Passer commande
                        </Button>

                        <Link
                          href={"/"}
                          className="text-center text-sm text-primary hoverEffect hover:text-gold"
                        >
                          Continuer mes achats
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Liste produits */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-5 md:grid-cols-6 border rounded-tl-lg rounded-tr-lg bg-white p-2.5 text-base font-semibold">
                    <h2 className="col-span-2 md:col-span-3">Produit</h2>
                    <h2>Prix</h2>
                    <h2>Quantité</h2>
                    <h2>Sous-total</h2>
                  </div>

                  <div className="bg-white border border-t-0 rounded-br-lg rounded-bl-lg">
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div key={product?._id} className="grid grid-cols-5 md:grid-cols-6 border-b p-2.5 last:border-b-0">
                          <div className="col-span-2 md:col-span-3 flex items-center">
                            <Trash2
                              onClick={() => handleDeleteProduct(product?._id)}
                              className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                            />
                            {product?.image && (
                              <Link
                                href={`/produit/${product?.slug?.current}`}
                                className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                                style={{ width: 56, height: 56, position: "relative" }}
                              >
                                <Image
                                  src={urlFor(product?.image).url()}
                                  alt="productImage"
                                  fill
                                  className="object-cover group-hover:scale-105 hoverEffect"
                                />
                              </Link>
                            )}
                            <h2 className="text-base text-gray-600 tracking-wide font-semibold line-clamp-1">
                              {product?.name} · <span className="text-gray-500">{product?.label}</span>
                            </h2>
                          </div>
                          <div className="flex items-center">
                            <PriceFormatter amount={product?.price} />
                          </div>
                          <QuantityButtons product={product} className="text-sm gap-0 md:gap-1" />
                          <div className="flex items-center">
                            <PriceFormatter amount={product?.price ? product.price * itemCount : 0} />
                          </div>
                        </div>
                      );
                    })}

                    <Button onClick={handleResetCart} variant="destructive" className="m-5 font-semibold">
                      Réinitialiser le panier
                    </Button>
                  </div>
                </div>
              </div>

              {/* 🧾 Mobile summary */}
              <div className="md:hidden fixed bottom-0 left-0 w-full bg-lightBg">
                <div className="bg-white p-4 rounded-lg border mx-4">
                  <h2 className="text-lg font-semibold mb-2">Résumé de la commande</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <PriceFormatter amount={subTotal} />
                    </div>
                    <div className="flex justify-between">
                      <span>Réduction</span>
                      <PriceFormatter amount={discount} />
                    </div>

                    {/* 🚚 Livraison mobile */}
                    <div className="flex items-center justify-between relative">
                      <div
                        className="flex items-center gap-1.5 cursor-pointer select-none px-2.5 py-1 border rounded-md"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        <span>{deliveryMode === "click&collect" ? "Click & Collect" : "Livraison à domicile"}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                      </div>

                      <span
                        className={`font-semibold px-2 py-0.5 rounded-md text-sm ${
                          shippingCost === 0 ? "text-green-600 bg-green-50" : "text-gray-700"
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

                    <Button onClick={() => setIsCheckoutOpen(true)} className="w-full" size="lg">
                      {buttonLabel}
                    </Button>
                    <Link href="/" className="block text-center text-sm text-primary">
                      Continuer mes achats
                    </Link>
                  </div>
                </div>
              </div>

              <CheckoutDialog
                isOpen={isCheckoutOpen}
                loading={loading}
                onClose={() => setIsCheckoutOpen(false)}
                onConfirm={(data) => handleCheckout({ ...data, mode: deliveryMode })}
                mode={deliveryMode}
              />
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg text-center">
                  <DialogHeader>
                    <DialogTitle>Nous rencontrons un problème temporaire 😔</DialogTitle>
                    <DialogDescription className="mt-3 text-gray-600 leading-relaxed text-sm">
                      <p>
                        Nous travaillons activement à résoudre un souci sur notre système de paiement.
                        En attendant, vous pouvez finaliser votre commande en nous contactant :
                      </p>

                      <div className="mt-3">
                        <a
                          href="mailto:contact@biss-app.fr?subject=COMMANDE%20BISS'APP&body=Bonjour,%0A%0AJe%20souhaite%20commander%20les%20produits%20suivants%20:%0A- Produit%201%20(quantité%20:%20x)%0A- Produit%202%20(quantité%20:%20x)%0A- Produit%203%20(quantité%20:%20x)%0A%0AMode%20de%20remise%20:%20Click%20%26%20Collect%20ou%20Livraison%20à%20domicile%0ADate%20et%20heure%20de%20remise%20souhaitées%20:%0AAdresse%20de%20livraison%20(si%20livraison)%20:%0A%0AMerci%20d'avance%20pour%20votre%20réactivité%20!%0A%0ABien%20à%20vous,%0A[Prénom%20NOM]"
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
                        </a>.
                      </div>

                      <p className="mt-3">Merci de préciser :</p>

                      <ul className="text-left list-disc list-inside mt-2 space-y-1">
                        <li>Les produits souhaités et leur quantité</li>
                        <li>Le mode de remise &#40;Click & Collect ou livraison à domicile&#41;</li>
                        <li>La date et l&rsquo;heure de remise souhaitées</li>
                        <li>Et, dans le cas d&rsquo;une livraison, votre adresse de livraison</li>
                      </ul>

                      <p className="mt-3">
                        Nous sommes désolés pour la gêne occasionnée et faisons notre maximum
                        pour rétablir le service rapidement 🙏
                      </p>
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