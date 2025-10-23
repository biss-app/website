import { PortableTextBlock } from '@portabletext/react';

export function getLastSentence(description: PortableTextBlock[]): string {
  if (!description || description.length === 0) return '';

  const fullText = description
    .map(block => block.children?.map(child => child.text).join('') ?? '')
    .join(' ');

  const sentences = fullText.split(/(?<=[.!?])\s+/);
  return sentences[sentences.length - 1] || '';
}
