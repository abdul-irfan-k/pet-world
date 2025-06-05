'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  User,
  MapPin,
  Mail,
  Lock,
  Eye,
  Link2,
  LogOut,
  Wallet,
} from 'lucide-react';

import { Button } from '@/components/ui/button/Button';
import { useLogoutMutation } from '@/lib/api/authApi';

const settingsLinks = [
  { label: 'Account Details', icon: User, href: '/settings/account' },
  { label: 'My Addresses', icon: MapPin, href: '/settings/addresses' },
  { label: 'Payment Methods', icon: Wallet, href: '/settings/payments' },
  {
    label: 'Communication Preferences',
    icon: Mail,
    href: '/settings/communication',
  },
  { label: 'Privacy', icon: Lock, href: '/settings/privacy' },
  { label: 'Profile Visibility', icon: Eye, href: '/settings/visibility' },
  { label: 'Linked Accounts', icon: Link2, href: '/settings/accounts' },
];

const SettingsSidebar = () => {
  const router = useRouter();
  const { mutate: logoutUser, isPending } = useLogoutMutation({
    onSuccess: () => {
      router.push('/');
    },
  });

  const handleLogout = () => {
    logoutUser(undefined);
  };

  return (
    <div className="">
      <ul className="space-y-5">
        {settingsLinks.map(({ label, icon: Icon, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-foreground hover:text-foreground flex items-center space-x-4 text-[16px] font-medium transition-colors"
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
        <li>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="flex w-full items-center justify-start px-0 text-[16px] font-medium text-red-500"
            isLoading={isPending}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export { SettingsSidebar };
