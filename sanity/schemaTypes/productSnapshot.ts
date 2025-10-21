import { defineField, defineType } from "sanity";

export const productSnapshot = defineType({
  name: "productSnapshot",
  title: "Product Snapshot",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "price",
      title: "Prix",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quantity",
      title: "Quantité",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Image du produit",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});