import { StructureResolver } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Biss'App")
    .items([
      S.documentTypeListItem('category').title('Catégories'),
      S.divider(),

      // Produits triables
      orderableDocumentListDeskItem({
        type: 'product',
        title: 'Produits',
        S,
        context,
      }),
      S.divider(),

      // Annonces triables
      orderableDocumentListDeskItem({
        type: 'sale',
        title: 'Annonces',
        S,
        context,
      }),
      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['category', 'product', 'sale'].includes(item.getId()!)
      ),
    ]);