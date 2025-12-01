import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import Image from 'next/image';
import PriceFormatter from './PriceFormatter';
import { urlFor } from '@/sanity/lib/image';

interface OrderProduct {
  _key?: string;
  name: string;
  image?: string | { _type: "image"; asset: { _ref: string; _type: "reference" } };
  label?: string;
  quantity: number;
  price: number;
}

interface Order {
  orderNumber: string;
  customerName: string;
  email?: string;
  orderDate?: string;
  status?: string;
  products: OrderProduct[];
  totalPrice: number;
  amountDiscount: number;
}

interface Props {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog: React.FC<Props> = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          w-full 
          max-w-3xl 
          max-h-[90vh] 
          overflow-y-auto 
          p-4 
          sm:p-6
        "
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Détails de la commande – {order.orderNumber}
          </DialogTitle>
        </DialogHeader>

        {/* CUSTOMER INFO */}
        <div className="space-y-2 text-sm sm:text-base mt-4">
          <p><strong>Client :</strong> {order.customerName}</p>
          <p><strong>Email :</strong> {order.email}</p>
          <p>
            <strong>Date :</strong>{" "}
            {order.orderDate
              ? `${new Date(order.orderDate).toLocaleDateString("fr-FR")} à ${new Date(order.orderDate).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
              : "N/A"}
          </p>
          <p><strong>Statut :</strong> {order.status}</p>
        </div>

        {/* RESPONSIVE TABLE WRAPPER */}
        <div className="mt-6 overflow-x-auto">
          <Table className="min-w-[600px] sm:min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Prix</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.products.map((product: OrderProduct, index: number) => {
                let imageUrl: string | undefined;
                if (typeof product.image === "string") imageUrl = product.image;
                else if (product.image && "asset" in product.image) imageUrl = urlFor(product.image).url();

                return (
                  <TableRow key={product._key ?? index}>
                    <TableCell className="flex items-center gap-3 min-w-[200px]">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="border rounded-sm w-12 h-12 object-cover"
                        />
                      )}
                      <div className="flex flex-col">
                        {product.name}
                        {product.label && (
                          <span className="text-xs text-gray-500">{product.label}</span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="min-w-20">
                      {product.quantity}
                    </TableCell>

                    <TableCell className="min-w-[100px]">
                      <PriceFormatter amount={product.price} className="text-black font-medium" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* TOTALS */}
        <div className="mt-6 text-right space-y-1 text-sm sm:text-base">
          <p>
            <strong>Sous-total :</strong>{" "}
            <PriceFormatter amount={order.totalPrice} className="text-gold font-medium" />
          </p>

          <p>
            <strong>Réduction :</strong>{" "}
            <PriceFormatter amount={order.amountDiscount} className="text-bissap font-medium" />
          </p>

          <p className="mt-3 text-lg font-bold">
            Total :{" "}
            <PriceFormatter amount={order.totalPrice - order.amountDiscount} className="text-gold font-bold" />
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;