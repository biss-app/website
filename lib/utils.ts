import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PortableTextSpan } from '@sanity/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function portableTextToString(pt: any) {
  if (!Array.isArray(pt)) return ''  // <-- sécurité
  return pt
    .map(block => {
      if (!block.children || !Array.isArray(block.children)) return ''
      return block.children
        .map((span: PortableTextSpan) => span.text || '')
        .join('')
    })
    .join('\n')
}