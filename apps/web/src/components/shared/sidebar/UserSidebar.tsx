'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  LayoutDashboard,
  PawPrint,
  CreditCard,
  RefreshCcw,
  FileText,
  RotateCcw,
  Bell,
  MessageSquare,
  Settings,
  Moon,
  ShieldCheck,
  ClipboardCheck,
  DollarSign,
  Star,
} from 'lucide-react';

const UserSidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-100';

  return (
    <aside className="w-64 border-r border-gray-200 bg-white p-4">
      <nav className="space-y-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Pet Owner</p>

          <Link
            href="/dashboard/owner/pets/"
            className={`flex items-center rounded-md px-3 py-2 ${isActive('/dashboard/owner/pets/my-pets')}`}
          >
            <PawPrint className="mr-3 h-5 w-5" />
            <span className="text-sm">My Pets</span>
          </Link>
          <Link
            href="/dashboard/owner/pet-care/requests"
            className={`flex items-center rounded-md px-3 py-2 ${isActive('/dashboard/owner/pet-care/requests')}`}
          >
            <ShieldCheck className="mr-3 h-5 w-5" />
            <span className="text-sm">Pet Care Requests</span>
          </Link>
          <Link
            href="/dashboard/owner/adoptions"
            className={`flex items-center rounded-md px-3 py-2 ${isActive('/dashboard/owner/adoptions')}`}
          >
            <ClipboardCheck className="mr-3 h-5 w-5" />
            <span className="text-sm">Completed Adoptions</span>
          </Link>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-gray-500">Pet Adopter</p>

          <Link
            href="/dashboard/adopter/proposals/completed"
            className={`flex items-center rounded-md px-3 py-2 ${isActive('/dashboard/adopter/proposals/completed')}`}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            <span className="text-sm">My Proposals</span>
          </Link>
          <Link
            href="/dashboard/adopter/adoptions"
            className={`flex items-center rounded-md px-3 py-2 ${isActive('/dashboard/adopter/adoptions')}`}
          >
            <ClipboardCheck className="mr-3 h-5 w-5" />
            <span className="text-sm">Adoptions</span>
          </Link>
          <Link
            href="/dashboard/adopter/earnings"
            className={`flex items-center rounded-md px-3 py-2 ${isActive('/dashboard/adopter/earnings')}`}
          >
            <DollarSign className="mr-3 h-5 w-5" />
            <span className="text-sm">Earnings</span>
          </Link>
          <Link
            href="/dashboard/adopter/reviews"
            className={`flex items-center rounded-md px-3 py-2 ${isActive('/dashboard/adopter/reviews')}`}
          >
            <Star className="mr-3 h-5 w-5" />
            <span className="text-sm">Reviews</span>
          </Link>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-gray-500">Transaction</p>
          <Link href="#" className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
            <CreditCard className="mr-3 h-5 w-5" />
            <span className="text-sm">Payment</span>
          </Link>
          <Link href="#" className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
            <RefreshCcw className="mr-3 h-5 w-5" />
            <span className="text-sm">Refunds</span>
          </Link>
          <Link href="#" className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
            <FileText className="mr-3 h-5 w-5" />
            <span className="text-sm">Invoice</span>
          </Link>
          <Link href="#" className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
            <RotateCcw className="mr-3 h-5 w-5" />
            <span className="text-sm">Returns</span>
          </Link>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-gray-500">General</p>
          <Link href="#" className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
            <Bell className="mr-3 h-5 w-5" />
            <span className="text-sm">Notifications</span>
          </Link>
          <Link href="#" className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
            <MessageSquare className="mr-3 h-5 w-5" />
            <span className="text-sm">Feedback</span>
          </Link>
          <Link href="#" className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
            <Settings className="mr-3 h-5 w-5" />
            <span className="text-sm">Setting</span>
          </Link>
        </div>

        <div className="mt-auto">
          <div className="flex cursor-pointer items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
            <Moon className="mr-3 h-5 w-5" />
            <span className="text-sm">Dark Mode</span>
            <button
              aria-label="Toggle Dark Mode"
              className="ml-auto flex h-4 w-8 items-center rounded-full bg-gray-200 px-0.5"
            >
              <span className="block h-3 w-3 transform rounded-full bg-white transition-transform"></span>
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};
export { UserSidebar };
