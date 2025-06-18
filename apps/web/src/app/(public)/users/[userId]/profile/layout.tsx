import { PropsWithChildren } from 'react';

import { Header } from '@/components/shared';

export default function UserProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="">
      <Header />
      <div className="block h-20 w-full"></div>
      <div className="w-full">{children}</div>
    </div>
  );
}
