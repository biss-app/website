import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PortableTextBlock, PortableTextSpan } from '@sanity/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convertit un Portable Text (array of blocks) en simple string
 */
export function portableTextToString(pt: PortableTextBlock[] | undefined | null): string {
  if (!Array.isArray(pt)) return '';

  return pt
    .map(block => {
      if (!Array.isArray(block.children)) return '';
      return block.children
        .map((span: PortableTextSpan) => span.text || '')
        .join('');
    })
    .join('\n');
}