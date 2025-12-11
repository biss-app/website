"use client";

import { useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import userCartStore from '@/store';
import { motion } from 'framer-motion';
import { Check, Home, Package, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearCart = userCartStore((state) => state.resetCart);

  useEffect(() => {
    if (orderNumber) clearCart();
  }, [orderNumber, clearCart]);

  return (
    <div className="py-10 bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-xl w-full text-center"
      >
        {/* Contenu page success identique */}
      </motion.div>
    </div>
  );
};

export default SuccessPage;