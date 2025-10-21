import Container from '@/components/Container'
import OrdersComponent from '@/components/OrdersComponent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getMyOrders } from '@/sanity/helpers';
import { auth } from '@clerk/nextjs/server'
import { FileX } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation'
import React from 'react'

const OrdersPage = async () => {
  const {userId} = await auth()
  if (!userId) {
    return redirect("/");
  }
  const orders = await getMyOrders(userId);

  return (
    <div>
      <Container className="py-10">
        {orders?.length ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                Liste des commandes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] md:w-auto">
                        Numéro de commande
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead className="hidden md:table-cell">
                        E-mail
                      </TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponent orders={orders} />
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : ( <div className="flex flex-col items-center justify-center py-12 px-4">
          <FileX className="h-24 w-24 text-gray-400 mb-4"/>
          <h3 className="text-2xl font-semibold text-gray-900">Aucune commande trouvée</h3>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
            Il semblerait que vous n&rsquo;ayez pas encore réalisé de commandes. 
            <br/>
            Commandez pour voir votre historique de commande ici !
          </p>
          <Button>
            <Link href={"/"}>Browse products</Link>
          </Button>
        </div>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage