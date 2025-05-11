import {
  User,
  MapPin,
  ShoppingBag,
  Mail,
  Lock,
  Eye,
  Link2,
} from 'lucide-react';
import Link from 'next/link';

const settingsLinks = [
  { label: 'Account Details', icon: User, href: '/settings/account' },
  { label: 'Delivery Addresses', icon: MapPin, href: '/settings/delivery' },
  { label: 'Shop Preferences', icon: ShoppingBag, href: '/settings/shop' },
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
  return (
    <div className="">
      <ul className="space-y-5">
        {settingsLinks.map(({ label, icon: Icon, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="flex items-center space-x-4 text-[16px] font-medium text-foreground hover:text-foreground transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { SettingsSidebar };
