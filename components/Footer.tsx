"use client";

import React, { ReactNode } from 'react';
import Container from './Container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Instagram from '../images/Instagram.svg';
import Facebook from '../images/Facebook.png';
import TikTok from '../images/TikTok.png';
import LinkedIn from '../images/LinkedIn.png';
import Tripadvisor from '../images/Tripadvisor.png';
import Image from 'next/image';

interface Props {
  href: string;
  children: ReactNode;
}

const FooterLink = ({ href, children }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`hover:text-gold transition ${
        isActive ? "text-gold" : "text-gray-400"
      }`}
    >
      {children}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="bg-lightBg text-sm">
      <Container
        className="
        py-8 
        flex flex-col gap-6 
        md:flex-row md:items-center md:justify-between
        "
      >
        {/* Bloc Copyright */}
        <p className="text-gray-500 text-center md:text-left">
          Copyright © 2025{" "}
          <a
            href="https://annuaire-entreprises.data.gouv.fr/entreprise/biss-app-945074524"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold font-semibold"
          >
            Biss&rsquo;App
          </a>{" "}
          tous droits réservés.
        </p>

        {/* Liens */}
        <div className="flex flex-wrap gap-3 text-gray-400 justify-center md:justify-end">
          <FooterLink href={"/mentions-legales"}>Mentions légales</FooterLink>
          <FooterLink href={"/politique-de-confidentialite"}>
            Politique de confidentialité
          </FooterLink>
          <FooterLink href={"/conditions-generales-de-vente"}>
            Conditions Générales de Vente
          </FooterLink>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex flex-col gap-3 text-center md:text-right">
          <p>
            <a
              href="https://annuaire-entreprises.data.gouv.fr/entreprise/biss-app-945074524"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-semibold"
            >
              Biss&rsquo;App
            </a>{" "}
            est ici... mais aussi ailleurs :
          </p>

          <div className="flex flex-row justify-center md:justify-end gap-4">
            <a
              href="https://instagram.com/bissapp.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8"
            >
              <Image src={Instagram} alt="Instagram" width={32} height={32} />
            </a>
            <a
              href="https://www.tiktok.com/@bissapp.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8"
            >
              <Image src={TikTok} alt="TikTok" width={32} height={32} />
            </a>
            <a
              href="https://www.facebook.com/people/BissApp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8"
            >
              <Image src={Facebook} alt="Facebook" width={32} height={32} />
            </a>
            <a
              href="https://www.linkedin.com/company/bissappfr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8"
            >
              <Image src={LinkedIn} alt="LinkedIn" width={32} height={32} />
            </a>
            <a
              href="https://www.tripadvisor.fr/Restaurant_Review-g187091-d33988079-Reviews-Biss_App-Clermont_Ferrand_Puy_de_Dome_Auvergne_Rhone_Alpes.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8"
            >
              <Image
                src={Tripadvisor}
                alt="Tripadvisor"
                width={32}
                height={32}
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
