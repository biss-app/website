import React from 'react';
import Image from 'next/image';
import logo from '../images/logo.png';
import Container from './Container';
import Form from 'next/form';
import Link from 'next/link';
import CartIcon from './CartIcon';
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { User } from 'lucide-react';
import { getMyOrders } from '@/sanity/helpers';
const Header = async() => {
  const user = await currentUser();
  let orders = null;
  if(user?.id) {
    orders = await getMyOrders(user?.id);
  }
  console.log("orders", orders?.length);
  return (
    <header className="w-full bg-white py-4 sticky top-0 z-50">
      <Container className="flex md:items-center justify-between gap-5 flex-col md:flex-row">
        <Link href={"/"}>
        <Image src={logo} alt="logo" className="w-15" priority/>
        </Link>
        <Form action="/recherche" className="flex-1">
          <input
            type="text"
            name="query"
            placeholder="Chercher un produit..."
            className="w-full border-2 border-gray-200 px-4 py-2.5
            rounded-md focus-visible:border-gold outline-none"
          />
        </Form>
        <div className="flex items-center gap-5">
          <CartIcon />
        <ClerkLoaded>
          <SignedIn>
            {/* <Link
              href={"/commandes"}
              className="flex items-center text-sm gap-2 border
              border-gray-200 px-2 py-1 rounded-md shadow-md
              hover:shadow-none hoverEffect"
            >
              <ShoppingBasket className="text-gold w-6 h-6"/>
              <div className="flex flex-col">
                <p className="text-xs">
                  <span className="font-semibold">
                    {orders?.length ?? 0}
                  </span>{" "}
                  {(orders?.length ?? 0) <= 1 ? "commande passée" : "commandes passées"}
                </p>
                <p className="font-semibold">Historique</p>
              </div>
            </Link>*/}
          </SignedIn>
          {user ? (
            <div className="flex items-center text-sm gap-2 border
            border-gray-200 px-2 py-1 rounded-md shadow-md
            hover:shadow-none hoverEffect">
              <UserButton />
              {user?.firstName ? (
                <div className="hidden md:inline-flex flex-col">
                  <p className="text-xs">Ton palais a encore des envies,</p>
                  <p className="text-xs">
                    <span className="font-semibold">{user.firstName}</span> ? On est là ! 👋
                  </p>
                </div>
              ) : (
                <div className="hidden md:inline-flex flex-col">
                  <p className="text-xs">
                    Ton palais a encore des envies ?
                    <br/>
                    On est là ! 👋
                  </p>
                </div>
              )}

            </div>
          ) : (
            <SignInButton mode="modal">
              <div className="flex items-center text-sm gap-2 border
              border-gray-200 px-2 py-1 rounded-md shadow-md
              hover:shadow-none hoverEffect">
                <User className="w-6 h-6 text-gold"/>
                <div className="flex flex-col">
                  <p className="text-xs">Compte</p>
                  <p className="font-semibold">Se connecter</p>
                </div>
              </div>
            </SignInButton>
          )}   
        </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;