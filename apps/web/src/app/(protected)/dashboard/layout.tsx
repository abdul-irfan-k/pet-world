import React from 'react';

import { UserDashboardHeader, UserSidebar } from '@/components/shared';

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <UserDashboardHeader />
      <div className="flex flex-1">
        <UserSidebar />
        {children}
      </div>
    </div>
  );
}
