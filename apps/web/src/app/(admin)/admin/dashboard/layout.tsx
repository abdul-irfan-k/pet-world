import React from 'react';

import { AdminDashboardSidebar } from '@/components/shared';
import { AdminAuthGuardProvider } from '@/providers';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AdminAuthGuardProvider>
        <div className="flex flex-1">
          <AdminDashboardSidebar />
          {children}
        </div>
      </AdminAuthGuardProvider>
    </div>
  );
}
