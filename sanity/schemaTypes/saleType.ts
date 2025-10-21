import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const salesType = defineType ({
  name:"sale",
  title: "Annonces",
  type: "document",
  icon:TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Sale title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Sale description",
      type: "text",
    }),
    defineField({
      name: "badge",
      title: "Discount badge",
      type: "string",
      description: "Discount badge ratio",
    }),
    defineField({
      name: "discountAmount",
      title: "Discount amount",
      type: "number",
      description: "Amount off in percentage or fixed value",
    }),
    defineField({
      name: "couponCode",
      title: "Coupon code",
      type: "string",
    }),
    defineField({
      name: "validFrom",
      title: "Valid from",
      type: "datetime",
    }),
    defineField({
      name: "validUntil",
      title: "Valid until",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      title: "Is active",
      type: "boolean",
      description: "Toggle to activate/deactivate the sale",
      initialValue: true,
    }),
    defineField({
      name: "image",
      title: "Product image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation:(Rule)=>Rule.required()
    }),
  ],
  preview:{
    select:{
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive"
    },
    prepare(select){
      const {title,discountAmount,couponCode,isActive}=select
      const status= isActive ? "Active" : "Inactive"
      return{
        title,
        subtitle:`${discountAmount}% off - code: ${couponCode} - ${status}`,
      };
    },
  },
});