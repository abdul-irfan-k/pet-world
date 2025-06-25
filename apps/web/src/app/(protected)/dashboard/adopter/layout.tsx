import { PropsWithChildren } from 'react';

import { PetAdopterAuthGuardProvider } from '@/providers';

export default function AdopterDashboardLayout({ children }: PropsWithChildren) {
  return <PetAdopterAuthGuardProvider>{children}</PetAdopterAuthGuardProvider>;
}
