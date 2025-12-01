"use client";

import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import PriceFormatter from "./PriceFormatter";
import OrderDetailsDialog from "./OrderDetailsDialog";

const OrdersComponent = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
  const [selectedOrder, setSelectedOrder] =
    useState<MY_ORDERS_QUERYResult[number] | null>(null);

  const handleOrderclicked = (order: MY_ORDERS_QUERYResult[number]) => {
    setSelectedOrder(order);
  };

  const sortedOrders = orders
    ? [...orders].sort((a, b) => {
        const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
        const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
        return dateB - dateA;
      })
    : [];

  const normalizedOrder = selectedOrder
    ? {
        ...selectedOrder,
        orderNumber: selectedOrder.orderNumber || "N/A",
        customerName: selectedOrder.customerName || "",
        email: selectedOrder.email || "",
        orderDate: selectedOrder.orderDate || "",
        status: selectedOrder.status || "En attente",
        totalPrice: selectedOrder.totalPrice || 0,
        amountDiscount: selectedOrder.amountDiscount || 0,
        currency: selectedOrder.currency || "€",
        products: (selectedOrder.products || []).map((p) => ({
          _key: p._key,
          _type: "productSnapshot" as const,
          name: p.title || "Produit inconnu",
          price: p.price || 0,
          quantity: p.quantity || 1,
          image: p.image?.asset
            ? { _type: "image" as const, asset: { _ref: p.image.asset._ref, _type: "reference" as const } }
            : undefined,
        })),
      }
    : null;

  return (
    <>
      {/* TABLE WRAPPER FOR RESPONSIVE SCROLL */}
      <div className="overflow-x-auto w-full">
        <Table className="min-w-[600px] sm:min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Commande</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TooltipProvider>
              {sortedOrders?.map((order) => (
                <React.Fragment key={order._id || order.orderNumber}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TableRow
                        onClick={() => handleOrderclicked(order)}
                        className="cursor-pointer hover:bg-gray-100 h-12"
                      >
                        <TableCell className="font-medium">
                          {order?.orderNumber
                            ? `${order?.orderNumber.slice(0, 5)}...${order?.orderNumber.slice(
                                -5
                              )}`
                            : "N/A"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {order?.orderDate &&
                            new Date(order?.orderDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell className="hidden sm:table-cell">{order?.email}</TableCell>
                        <TableCell>
                          <PriceFormatter
                            amount={order?.totalPrice}
                            className="text-black font-medium"
                          />
                        </TableCell>
                        <TableCell>
                          {order?.status && (
                            <span
                              className={`px-2 py-1 rounded-full text-xxs font-semibold whitespace-nowrap ${
                                order?.status === "En attente"
                                  ? "bg-gray-100 text-gray-600"
                                  : order?.status === "Payée"
                                  ? "bg-green-100 text-green-600"
                                  : order?.status === "En préparation"
                                  ? "bg-orange-100 text-orange-600"
                                  : order?.status === "En cours de livraison"
                                  ? "bg-blue-100 text-blue-600"
                                  : order?.status === "Livrée"
                                  ? "bg-green-200 text-green-800"
                                  : order?.status === "Annulée"
                                  ? "bg-red-200 text-red-700"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {order?.status}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cliquez pour voir les détails de la commande</p>
                    </TooltipContent>
                  </Tooltip>
                </React.Fragment>
              ))}
            </TooltipProvider>
          </TableBody>
        </Table>
      </div>

      <OrderDetailsDialog
        order={normalizedOrder}
        isOpen={!!normalizedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;