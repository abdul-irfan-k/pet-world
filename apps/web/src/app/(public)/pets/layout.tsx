import React from 'react';

import { Footer, Header } from '@/components/shared';

export default function PetsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
