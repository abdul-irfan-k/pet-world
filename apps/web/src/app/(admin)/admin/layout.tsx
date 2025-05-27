import React from 'react';

import { AdminDashboardSidebar } from '@/components/shared';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-1">
        <AdminDashboardSidebar />
        {children}
      </div>
    </div>
  );
}
