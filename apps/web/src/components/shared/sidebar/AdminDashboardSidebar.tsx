import Link from 'next/link';

import { Users, List, CreditCard, FileText, ShieldCheck, Tag, LayoutGrid, MapPin, Search } from 'lucide-react';

const AdminDashboardSidebar = () => {
  return (
    <div className="flex w-72 flex-col border-r border-gray-200 bg-white">
      <Link href="/admin/dashboard/" className="flex-shrink-0">
        <div className="flex items-center gap-3 px-6 py-4">
          <div className="bg-brand-600 h-8 w-8 rounded-md"></div>
          <span className="text-xl font-medium">PetWorld</span>
        </div>
      </Link>

      <div className="flex-shrink-0 px-4 py-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search"
            className="focus:border-brand-500 focus:ring-brand-500 block w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm placeholder-gray-400"
          />
        </div>
      </div>
      <nav className="flex-1 space-y-3 overflow-y-auto p-3">
        <div className="space-y-0.5">
          <Link
            href="/admin/dashboard/users"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Users className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>All Users</span>
          </Link>
          <Link
            href="#"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Users className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>Pet Owners</span>
          </Link>
          <Link
            href="#"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Users className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>Adopters</span>
          </Link>
        </div>

        <div className="space-y-0.5 pt-3">
          <Link
            href="/admin/dashboard/pets"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <List className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>All Pets</span>
          </Link>
          <Link
            href="#"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <List className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>Flagged Listings</span>
          </Link>
        </div>

        <div className="space-y-0.5 pt-3">
          <Link
            href="#"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <CreditCard className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>Platform Earnings</span>
          </Link>
          <Link
            href="#"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <CreditCard className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>Fee Settlements</span>
          </Link>
        </div>

        <div className="pt-3">
          <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Reviews & Reports</h3>
          <Link
            href="#"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <FileText className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>User Reports</span>
          </Link>
          <Link
            href="#"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <ShieldCheck className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>Review Moderation</span>
          </Link>
        </div>

        <div className="pt-3">
          <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">System Settings</h3>
          <Link
            href="#"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Tag className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>Pet Types</span>
          </Link>
          <Link
            href="#"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <LayoutGrid className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>Breed Categories</span>
          </Link>
          <Link
            href="#"
            className="group flex items-center space-x-2.5 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <MapPin className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            <span>Location Tags</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export { AdminDashboardSidebar };
