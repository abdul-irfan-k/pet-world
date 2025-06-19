import { PropsWithChildren } from 'react';

import { Footer, Header } from '@/components/shared';

export default function AdopterProfileSetupLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <div className="block h-20 w-full"></div>
      <div className="w-full">{children}</div>
      <Footer />
    </div>
  );
}
