import { type SchemaTypeDefinition } from 'sanity'

import { categoryType } from './categoryType'
import { salesType } from './saleType'
import { productType } from './productType';
import { orderType } from './orderType';
import { productSnapshot } from './productSnapshot';

export const schema: { types: SchemaTypeDefinition[] } =
{
  types: [categoryType, salesType, productType, orderType, productSnapshot],
};