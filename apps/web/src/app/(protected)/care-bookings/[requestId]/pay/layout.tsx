import React from 'react';

import Image from 'next/image';

export default function PaymentLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <div className="container">
        <div className="flex items-center justify-between px-8">
          <Image src="/logo/logo.png" alt="Payment Banner" width={200} height={100} className="hidden md:block" />
        </div>
      </div>
      {children}
    </div>
  );
}
