import React from 'react';

import { PetOwnerHeader, PetOwnerSidebar } from '@/components/shared';

export default function PetOwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <PetOwnerHeader />
      <div className="flex flex-1">
        <PetOwnerSidebar />
        {children}
      </div>
    </div>
  );
}
