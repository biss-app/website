import React from 'react'

const TermsAndConditionsPage = () => {
  return (
    <main className="max-w-4xl mx-auto p-6">
  <article>
    <h1 className="text-gold text-4xl font-extrabold mb-8 uppercase">
      Conditions générales de vente
    </h1>

    <p className="mb-8 text-gray-700">
      Bienvenue sur Biss&rsquo;App. Nous sommes ravis de vous proposer nos boissons et snacks artisanaux. Avant de passer commande, merci de prendre connaissance de nos Conditions Générales de Vente afin de garantir une expérience agréable et transparente.
    </p>

    <section className="mb-6">
      <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
        1. PRODUITS
      </h2>
      <p className="text-gray-700">
        Nous proposons exclusivement des boissons et snacks artisanaux. Tous les produits sont périssables et doivent être consommés rapidement après livraison. Les informations sur les produits (ingrédients, allergènes, ...) sont disponibles sur notre site et doivent être consultées avant toute commande.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
        2. PRIX ET PROMOTIONS
      </h2>
      <p className="text-gray-700">
        Les prix affichés sur notre site correspondent au montant total à payer. Les frais de livraison sont de 2,50€ et sont offerts pour toute commande supérieure ou égale à 25€. Nous pouvons proposer des promotions et codes de réduction ponctuellement. Veuillez consulter notre site pour connaître les offres en cours.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
        3. COMMANDES ET PAIEMENT
      </h2>
      <p className="text-gray-700">
        Toutes les commandes sont payables par défaut via Stripe. Une commande n&rsquo;est validée qu&rsquo;après confirmation du paiement. Veuillez vous assurer que toutes les informations de commande &#40;produits, mode de livraison, adresse de livraison&#41; sont correctes avant de finaliser la commande.
        <br/>
        Biss&rsquo;App se réserve cependant le droit d&rsquo;accepter, sur demande du client, d&rsquo;autres modes de paiement.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
        4. LIVRAISON
      </h2>
      <p className="text-gray-700">
        Nous livrons uniquement dans les villes proposées lors du choix du créneau de livraison. Si vous indiquez une ville non couverte au moment du paiement, aucun remboursement ne pourra être effectué.
      </p>
      <br/>
      <p className="text-gray-700">
        Pour les commandes passées avant midi, la livraison peut être effectuée dès le lendemain. Pour les commandes passées après midi, la livraison pourra être effectuée après-demain.
      </p>
      <br/>
      <p className="text-gray-700">
        Le service Click & Collect ne comporte aucun frais de livraison.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
        5. ANNULATION ET MODIFICATION
      </h2>
      <p className="text-gray-700">
        Pour annuler une commande, veuillez nous contacter à <span className="font-semibold">contact@biss-app.fr</span> au moins 24 heures avant la livraison. Le montant remboursé correspondra au montant payé, déduction faite des frais Stripe.
      </p>
      <p className="text-gray-700">
        En cas de rupture de stock après commande, nous vous proposerons de modifier la date de livraison ou de vous rembourser (frais Stripe inclus).
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
        6. RESPONSABILITÉ
      </h2>
      <p className="text-gray-700">
        Nous nous engageons à livrer vos produits dans les meilleures conditions. Toutefois, nous ne pouvons être tenus responsables en cas de retard lié à des événements indépendants de notre volonté, tels que des conditions météorologiques ou des problèmes de transport.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
        7. DONNÉES PERSONNELLES
      </h2>
      <p className="text-gray-700">
        Les informations collectées &#40;nom et prénom, adresse e-mail, adresse postale si livraison, informations de paiement, historique de commandes&#41; servent uniquement à créer votre compte, personnaliser votre expérience et assurer la livraison. Nous pouvons utiliser votre e-mail pour des promotions, mais vous pouvez vous y opposer en nous contactant à <span className="font-semibold">dpo@biss-app.fr</span>. Vos données sont conservées pendant 3 ans après votre dernière commande et sont hébergées via Stripe, Sanity et Clerk.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
        8. CONTACT
      </h2>
      <p className="text-gray-700">
        Pour toute question concernant vos commandes ou nos conditions, veuillez nous contacter à <span className="font-semibold">contact@biss-app.fr</span>.
      </p>
    </section>

    <p className="text-sm text-gray-500 text-center mt-8">
      Dernière mise à jour : 21 octobre 2025
    </p>
  </article>
</main>

  )
}

export default TermsAndConditionsPage