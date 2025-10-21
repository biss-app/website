"use client";

import React, { ReactNode } from 'react';
import Container from './Container';
import Image from 'next/image';
import payment from '../images/payment.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  children: ReactNode;
}

const FooterLink = ({href, children}: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`hover:text-gold ${isActive ? "text-gold" : "text-gray-400"}`}
    >
      {children}
    </Link>
  );
}

const Footer = () => {
  return (
    <footer className="bg-lightBg text-sm">
      <Container className="py-5 flex items-center
      justify-between">
      <p className="text-gray-500">
        Copyright © 2025 <a href="https://annuaire-entreprises.data.gouv.fr/entreprise/biss-app-945074524" target="_blank" rel="noopener noreferrer" className="text-gold font-semibold">Biss&rsquo;App</a> tous droits réservés.
      </p>
      <div className="flex flex-wrap gap-3 text-gray-400">
        <FooterLink href={"/mentions-legales"}>Mentions légales</FooterLink>
        <FooterLink href={"/politique-de-confidentialite"}>Politique de confidentialité</FooterLink>
        {/* <FooterLink href={"/cookies"}>Politique de gestion des cookies</FooterLink> */}
        <FooterLink href={"/conditions-generales-de-vente"}>Conditions Générales de Vente</FooterLink>
      </div>
      {/*<Image src={payment} alt="payment" className="w-64
      object-cover"/>*/}
      </Container>
    </footer>
  )
}

export default Footer