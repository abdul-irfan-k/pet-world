// import { Footer, Header } from '@/components/shared';
import React from 'react';

export default function PaymentLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      {/* <Header /> */}
      {children}

      {/* <Footer /> */}
    </div>
  );
}
