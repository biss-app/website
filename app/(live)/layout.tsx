'use client';

import { ReactNode } from 'react';
import { VisualEditing } from 'next-sanity/visual-editing';
import { SanityLive } from '@/sanity/lib/live';

export default function LiveLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <VisualEditing />
      <SanityLive />
      {children}
    </>
  );
}