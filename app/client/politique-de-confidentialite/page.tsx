import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <article>
        {/* TITRE PRINCIPAL */}
        <h1 className="text-gold text-4xl font-extrabold mb-8 uppercase">
          Politique de confidentialité
        </h1>

        {/* INTRODUCTION */}
        <p className="text-gray-700 mb-8">
          Parce que votre confiance nous est précieuse, <a href="https://annuaire-entreprises.data.gouv.fr/entreprise/biss-app-945074524" target="_blank" rel="noopener noreferrer">Biss&rsquo;App</a> s&rsquo;engage à protéger vos données personnelles et à garantir leur confidentialité, dans le respect du Règlement Général sur la Protection des Données &#40;<a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees" target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-gold-700">RGPD - UE 2016/679</a>&#41; et de la <a href="https://www.cnil.fr/fr/le-cadre-national/la-loi-informatique-et-libertes" target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-gold-700">loi Informatique et Libertés modifiée</a>.
        </p>

        {/* 1. PRÉAMBULE */}
        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">1. PRÉAMBULE</h2>
          <p>
            La présente politique de confidentialité vise à informer les utilisateurs du site{" "} <a href="https://biss-app.fr" target="_blank" rel="noopener noreferrer">biss-app.fr</a> sur les modalités de collecte, d&rsquo;utilisation et de protection de leurs données personnelles par <a href="https://annuaire-entreprises.data.gouv.fr/entreprise/biss-app-945074524" target="_blank" rel="noopener noreferrer">Biss&rsquo;App</a>.
          </p>
        </section>

        {/* 2. RESPONSABLE DU TRAITEMENT */}
        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
            2. RESPONSABLE DU TRAITEMENT
          </h2>
          <p>
            Le responsable du traitement des données est <a href="https://annuaire-entreprises.data.gouv.fr/entreprise/biss-app-945074524" target="_blank" rel="noopener noreferrer">Biss&rsquo;App</a>, dont le siège social est situé au 14 bis rue Vaucanson &#40;63100 Clermont-Ferrand&#41;.
          </p>
          <p>
            Vous pouvez contacter le responsable de la protection des données à l&rsquo;adresse suivante :{" "} <a href="mailto:dpo@biss-app.fr" className="text-gold underline hover:text-gold-700">dpo@biss-app.fr</a>.
          </p>
        </section>

        {/* 3. DONNÉES COLLECTÉES */}
        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">3. DONNÉES COLLECTÉES</h2>
          <p>Les données personnelles collectées par notre site sont les suivantes :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Adresse postale &#40;uniquement en cas de livraison à domicile&#41;</li>
            <li>Informations de paiement &#40;via <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a>&#41;</li>
            <li>Historique de commandes</li>
          </ul>
          <p className="mt-2">
            Nous ne collectons aucun cookie de suivi ou données de navigation à des fins publicitaires.
          </p>
        </section>

        {/* 4. FINALITÉ DU TRAITEMENT */}
        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">4. FINALITÉ DU TRAITEMENT</h2>
          <p>Vos données sont traitées pour les finalités suivantes :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Création et gestion de votre compte client</li>
            <li>Personnalisation de votre expérience sur notre site</li>
            <li>Gestion, préparation et livraison de vos commandes</li>
            <li>Envoi éventuel de communications commerciales ou promotionnelles</li>
          </ul>
          <p className="mt-2">
            Vous pouvez à tout moment vous opposer à la réception d&rsquo;e-mails promotionnels en nous contactant à l&rsquo;adresse suivante : <a href="mailto:dpo@biss-app.fr" className="text-gold underline hover:text-gold-700">dpo@biss-app.fr</a>.
          </p>
        </section>

        {/* 5. PARTAGE DES DONNÉES */}
        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
            5. PARTAGE DES DONNÉES AVEC DES TIERS
          </h2>
          <p>
            Certaines de vos données peuvent être transmises à des prestataires de confiance, uniquement dans le cadre du bon fonctionnement du site :
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Stripe</strong> — pour le traitement sécurisé des paiements
            </li>
            <li>
              <strong>Sanity</strong> — pour la gestion des contenus du site
            </li>
            <li>
              <strong>Clerk</strong> — pour l&rsquo;authentification et la gestion des comptes clients
            </li>
          </ul>
          <p className="mt-2">
            Ces prestataires s&rsquo;engagent à respecter la confidentialité de vos données et à les
            traiter conformément à leurs propres politiques de protection des données.
          </p>
        </section>

        {/* 6. DURÉE DE CONSERVATION */}
        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">6. DURÉE DE CONSERVATION</h2>
          <p>
            Les données personnelles sont conservées pendant une durée maximale de{" "} <strong>3 ans</strong> à compter de la dernière relation commerciale ou du dernier contact avec <a href="https://annuaire-entreprises.data.gouv.fr/entreprise/biss-app-945074524" target="_blank" rel="noopener noreferrer">Biss&rsquo;App</a>.
          </p>
          <p>
            Passé ce délai, elles sont supprimées ou anonymisées, sauf obligation légale de conservation.
          </p>
        </section>

        {/* 7. SÉCURITÉ DES DONNÉES */}
        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">7. SÉCURITÉ DES DONNÉES</h2>
          <p>
            <a href="https://annuaire-entreprises.data.gouv.fr/entreprise/biss-app-945074524" target="_blank" rel="noopener noreferrer">Biss&rsquo;App</a> met en œuvre toutes les mesures techniques et organisationnelles nécessaires pour garantir la sécurité et la confidentialité de vos données personnelles.
          </p>
          <p>
            Les échanges d&rsquo;informations avec nos prestataires &#40;Stripe, Sanity, Clerk&#41; s&rsquo;effectuent via des connexions sécurisées &#40;HTTPS&#41;. Les informations de paiement ne sont jamais stockées sur nos serveurs.
          </p>
        </section>

        {/* 8. VOS DROITS */}
        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">8. VOS DROITS</h2>
          <p>Conformément à la législation en vigueur, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><a href="https://www.cnil.fr/fr/definition/droit-dacces-ses-donnees-personnelles" target="_blank" rel="noopener noreferrer">Droit d&rsquo;accès</a></li>
            <li><a href="https://www.cnil.fr/fr/definition/droit-de-rectification" target="_blank" rel="noopener noreferrer">Droit de rectification</a></li>
            <li><a href="https://www.cnil.fr/fr/falc-droit-effacement" target="_blank" rel="noopener noreferrer">Droit à l&rsquo;effacement</a></li>
            <li><a href="https://www.cnil.fr/fr/definition/droit-dopposition" target="_blank" rel="noopener noreferrer">Droit d&rsquo;opposition</a></li>
            <li><a href="https://www.cnil.fr/fr/comprendre-mes-droits/le-droit-la-limitation-du-traitement-geler-lutilisation-de-vos-donnees" target="_blank" rel="noopener noreferrer">Droit à la limitation du traitement</a></li>
            <li><a href="https://www.cnil.fr/fr/comprendre-mes-droits/le-droit-la-portabilite-obtenir-et-reutiliser-une-copie-de-vos-donnees" target="_blank" rel="noopener noreferrer">Droit à la portabilité</a></li>
          </ul>
          <p className="mt-2">
            Vous pouvez exercer ces droits en nous contactant à :{" "} <a href="mailto:dpo@biss-app.fr" className="text-gold underline hover:text-gold-700">dpo@biss-app.fr</a>.
          </p>
        </section>

        {/* 9. MODIFICATIONS */}
        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
            9. MODIFICATIONS DE LA POLITIQUE
          </h2>
          <p>
            <a href="https://annuaire-entreprises.data.gouv.fr/entreprise/biss-app-945074524" target="_blank" rel="noopener noreferrer">Biss&rsquo;App</a> se réserve le droit de modifier la présente politique de confidentialité à tout moment afin de se conformer à toute évolution législative ou technique.
          </p>
          <p>
            La version la plus récente sera toujours disponible sur cette page, accompagnée de la
            date de dernière mise à jour en bas de page.
          </p>
        </section>

        {/* 10. CONTACT */}
        <section>
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">10. CONTACT</h2>
          <p>
            Pour toute question relative à la protection de vos données ou à cette politique de confidentialité, vous pouvez nous contacter à l&rsquo;adresse suivante :{" "} <a href="mailto:dpo@biss-app.fr" className="text-gold underline hover:text-gold-700">dpo@biss-app.fr</a>.
          </p>
        </section>
        <p className="text-sm text-gray-500 text-center mt-8">
          Dernière mise à jour : 21 octobre 2025
        </p>

      </article>
    </main>
  )
}

export default PrivacyPolicyPage