'use client';

import { ReactNode } from 'react';
import { VisualEditing } from '@sanity/visual-editing/react';
import { SanityLive } from '@/sanity/lib/live';

export default function LiveLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <VisualEditing portal={true} />
      <SanityLive />
      {children}
    </>
  );
}