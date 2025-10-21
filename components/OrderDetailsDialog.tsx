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
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Détails de la commande - {order.orderNumber}</DialogTitle>
        </DialogHeader>

        <div>
          <p><strong>Client :</strong> {order.customerName}<br /></p>
          <p><strong>E-mail :</strong> {order.email}<br /></p>
          <p>
            <strong>Date :</strong> {order.orderDate
              ? `${new Date(order.orderDate).toLocaleDateString("fr-FR")} à ${new Date(order.orderDate).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
              : "N/A"}
            <br/>
          </p>
          <p><strong>Statut :</strong> {order.status}<br/></p>
        </div>

        <Table>
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
                  <TableCell className="flex items-center gap-2">
                    {imageUrl && <Image src={imageUrl} alt={product.name || "productImage"} width={50} height={50} className="border rounded-sm hover:scale-105 hoverEffect" />}
                    {product.name}
                    {product.label && <span className="ml-2 text-gray-500">{product.label}</span>}
                  </TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <PriceFormatter amount={product.price} className="text-black font-medium" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="mt-4 text-right">
          <p className="font-medium">
            Sous-total: <PriceFormatter amount={order.totalPrice} className="text-gold font-medium" />
          </p>
          <p className="font-medium">
            Réduction: <PriceFormatter amount={order.amountDiscount} className="text-bissap font-medium" />
          </p>
          <br/>
          <p className="font-bold">
            Total: <PriceFormatter amount={order.totalPrice - order.amountDiscount} className="text-gold font-bold" />
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;