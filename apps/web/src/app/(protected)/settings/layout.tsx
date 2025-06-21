import React from 'react';

import { SettingsSidebar } from '@/components/settings';
import { Footer, Header } from '@/components/shared';

export default function SettingsPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="p-25 flex flex-col gap-6">
        <div className="">
          <h2 className="text-2xl font-medium">Settings</h2>
        </div>
        <div className="gap-25 flex">
          <aside className="w-[350px] py-8">
            <SettingsSidebar />
          </aside>
          <main className="py-8">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
