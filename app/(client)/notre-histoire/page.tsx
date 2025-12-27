import React from 'react'

const OurStoryPage = () => {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <article>
        <h1 className="text-gold text-4xl font-extrabold mb-8 uppercase">
          Notre histoire
        </h1>

        <section className="mb-6">
          <p>
            Biss&rsquo;App est née d&rsquo;une idée simple : faire voyager les gens à travers des saveurs qui rassemblent.
          </p>
          <p className="mt-2">
            À l&rsquo;origine, deux jeunes passionnés, <strong>Jackie</strong> et <strong>Maxime</strong>, animés par l&rsquo;envie de partager l&rsquo;énergie,
            les couleurs et l&rsquo;audace de l&rsquo;Afrique au cœur de <strong>Clermont-Ferrand</strong>. Une ville où l&rsquo;innovation et la créativité
            se rencontrent, prête à accueillir de nouvelles influences culinaires.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
            Une inspiration africaine
          </h2>
          <p>
            Inspirés par les boissons et snacks qui rythment les moments de partage en Afrique, ils ont voulu créer une marque
            qui parle à leur génération : <strong>authentique</strong>, <strong>moderne</strong> et <strong>responsable</strong>.
          </p>
          <p className="mt-2">
            Biss&rsquo;App propose ainsi des boissons non alcoolisées à base d&rsquo;hibiscus et de gingembre, des mikatés moelleux
            et des chips de banane plantain — des produits <strong>100% naturels</strong>, sans conservateurs,
            revisités pour un public jeune, curieux et en quête de nouveauté.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
            Notre ambition
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Faire découvrir des saveurs exotiques autrement.</li>
            <li>Offrir une alternative rafraîchissante, saine et accessible.</li>
            <li>Créer un pont entre les cultures, entre Clermont et le continent africain.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
            Plus qu&rsquo;une marque, une vibe
          </h2>
          <p>
            Au-delà d&rsquo;une marque, Biss&rsquo;App représente une vibe : celle d&rsquo;une génération qui ose entreprendre,
            innover, aller chercher ses racines tout en construisant l&rsquo;avenir.
          </p>
          <p className="mt-2">
            C&rsquo;est une histoire de diversité, de modernité et d&rsquo;identités qui se rencontrent autour d&rsquo;un même plaisir :
            <strong> bien manger, bien boire, bien partager.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-gold text-2xl font-bold mb-4 uppercase">
            Une marque locale, ouverte sur le monde
          </h2>
          <p>
            Aujourd&rsquo;hui, Biss&rsquo;App s&rsquo;inscrit dans le paysage clermontois comme une marque locale mais ouverte sur le monde,
            portée par une vision simple : célébrer nos cultures, valoriser nos saveurs et inviter chacun à goûter
            à une nouvelle expérience.
          </p>
          <p className="mt-4 font-semibold text-center text-gold">
            Bienvenue dans la vibe Biss&rsquo;App.
          </p>
        </section>
      </article>
    </main>
  )
}

export default OurStoryPage