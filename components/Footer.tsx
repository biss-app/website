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
        <p className="text-gray-500 text-center md:text-left">
          Copyright © {new Date().getFullYear()}{" "}
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

        <div className="flex flex-wrap gap-3 text-gray-400 justify-center md:justify-end">
          <FooterLink href={"/notre-histoire"}>Notre histoire</FooterLink>
          <FooterLink href={"/mentions-legales"}>Mentions légales</FooterLink>
          <FooterLink href={"/politique-de-confidentialite"}>
            Politique de confidentialité
          </FooterLink>
          <FooterLink href={"/conditions-generales-de-vente"}>
            Conditions Générales de Vente
          </FooterLink>
        </div>

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
              href="https://www.facebook.com/people/BissApp/61583983762750/#"
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
              <Image src={Tripadvisor} alt="Tripadvisor" width={32} height={32} />
            </a>
          </div>
        </div>
      </Container>
    <div className="w-full flex flex-col md:flex-row gap-6 px-6 pb-10">
      <div className="w-full md:w-1/2 h-64 rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12005.624158599678!2d3.1050910845255064!3d45.790261725894474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x26ed34c8dff4d7a3%3A0x4fb95a3ae6ec7317!2sBiss&#39;App!5e0!3m2!1sfr!2sfr!4v1765369139368!5m2!1sfr!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="w-full md:w-1/2 h-64 rounded-xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center p-4">
        <div className="text-center text-gray-600 leading-relaxed">
          <p className="font-medium mb-1">Notre emplacement Apple Plans apparaîtra bientôt ici.</p>
          <p>
            En attendant, vous pouvez consulter notre fiche Apple Plans en cliquant juste{" "}
            <a href="https://maps.apple.com/place?address=14%20bis%20Rue%20Vaucanson,%2063100%20Clermont-Ferrand,%20France&coordinate=45.787016,3.106889&name=Biss'App&place-id=IAB303554033336B&map=explore" target="_blank" rel="noopener noreferrer" className="text-gold font-semibold">ici</a>.
          </p>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;