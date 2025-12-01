"use client";

import userCartStore from '@/store';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Home, Package, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearCart = userCartStore((state) => state.resetCart);

  useEffect(() => {
    if (orderNumber) {
      clearCart();
    }
  }, [orderNumber, clearCart]);

  return (
    <div className="py-10 bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg"
        >
          <Check className="text-teal-600 w-12 h-12" />
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Commande confirmée !
        </h1>

        <div className="space-y-3 mb-6 text-left sm:text-left text-gray-600 text-sm sm:text-base">
          <p>
            Merci pour votre achat. Un e-mail de confirmation avec les détails de votre commande vous a été envoyé.
          </p>
          <p>
            Numéro de commande :{" "}
            <span className="text-black font-semibold">{orderNumber}</span>
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left sm:text-left">
          <h2 className="font-semibold text-green-800 mb-2 text-center sm:text-left">
            Et ensuite ?
          </h2>
          <ul className="text-green-700 text-sm sm:text-base space-y-1 list-disc list-inside">
            <li>Vous avez reçu une confirmation de commande par mail !</li>
            <li>
              Vous pouvez accéder au détail de votre commande en accédant à votre{" "}
              <Link href="/commandes" className="underline font-medium">historique des commandes</Link>
            </li>
            <li>Là-bas, vous pourrez également suivre en temps réel le statut de votre commande.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition-all duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Accueil
          </Link>

          <Link
            href="/commandes"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition-all duration-300"
          >
            <Package className="w-5 h-5 mr-2" />
            Commandes
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition-all duration-300"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Déguster d'autres produits
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;