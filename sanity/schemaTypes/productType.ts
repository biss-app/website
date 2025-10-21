import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export const productType = defineType({
  name: 'product',
  title: 'Produits',
  type: 'document',
  icon: TrolleyIcon,
  fields: [
    // Champ requis pour l'ordre triable
    orderRankField({ type: 'product', newItemPosition: 'after' }),

    defineField({
      name: 'name',
      title: 'Nom du produit',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image du produit',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'price',
      title: 'Prix',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'discount',
      title: 'Remise',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({ name: 'stock', title: 'Stock', type: 'number', validation: (Rule) => Rule.min(0) }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.min(0) }),
    defineField({
      name: 'status',
      title: 'Statut du produit',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Hot', value: 'hot' },
          { title: 'Sale', value: 'sale' },
        ],
      },
    }),

    // ---------------------------
    // Champ ingrédients
    // ---------------------------
    defineField({
      name: 'ingredients',
      title: 'Ingrédients',
      type: 'array',
      of: [
        defineField({
          name: 'ingredient',
          title: 'Ingrédient',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nom de l’ingrédient', type: 'string', validation: Rule => Rule.required().error('L’ingrédient est obligatoire') }),
            defineField({ name: 'allergen', title: 'Allergène (facultatif)', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'allergen' },
            prepare({ title, subtitle }) { return { title, subtitle: subtitle ? `Allergène : ${subtitle}` : '' }; },
          },
        }),
      ],
      validation: Rule => Rule.min(1).error('Au moins un ingrédient est requis'),
    }),
  ],
  orderings: [orderRankOrdering], // Permet d'utiliser l'ordre dans les listes du studio
  preview: {
    select: { title: 'name', media: 'image', subtitle: 'price' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `${subtitle}€`, media };
    },
  },
});