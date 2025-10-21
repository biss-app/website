"use client";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
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

  return (
    <>
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
                    <TableCell className="hidden sm:table-cell">
                      {order?.email}
                    </TableCell>
                    <TableCell>
                      <PriceFormatter
                        amount={order?.totalPrice}
                        className="text-black font-medium"
                      />
                    </TableCell>
                    <TableCell>
                      {order?.status && (
                        <span
                          className={`px-2 py-1 rounded-full text-xxs font-semibold ${
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

      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;