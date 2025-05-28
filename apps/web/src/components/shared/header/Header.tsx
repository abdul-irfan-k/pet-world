'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Search,
  ShoppingBag,
  User2,
  Settings,
  Heart,
  LogOut,
} from 'lucide-react';

import { Button } from '../../ui/button';

import { useLogoutMutation } from '@/lib/api/authApi';
import { useAuthStore } from '@/stores/authStore';

const Header = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const { mutate: logoutUser } = useLogoutMutation({
    onSuccess: () => {
      router.push('/');
      setIsDropdownOpen(false);
    },
  });

  const handleLogout = () => {
    logoutUser(undefined);
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/">
          <Image
            src="/logo/nike.svg"
            alt="Pet World Logo"
            width={70}
            height={70}
            className="cursor-pointer"
          />
        </Link>

        <nav className="hidden gap-6 text-sm font-medium text-black md:flex">
          <Link href="/explore">Explore</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/add-pet">Add Pet</Link>
          <Link href="/my-pets">My Pets</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/help">Help</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-gray-700 px-4 py-2">
            <Search size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">Search all products</span>
          </div>

          {!isAuthenticated && (
            <>
              <Link href="/sign-up" className="text-sm font-medium text-black">
                Sign Up
              </Link>
              <Button variant={'primary'} size={'lg'}>
                <Link href="/sign-in" className="text-sm font-medium">
                  Sign In
                </Link>
              </Button>
            </>
          )}

          {isAuthenticated && user && (
            <>
              <User2 className="h-5 w-5 cursor-pointer text-black" />
              <ShoppingBag className="h-5 w-5 cursor-pointer text-black" />
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="focus:ring-brand-500 relative h-10 w-10 overflow-hidden rounded-full border border-gray-300 focus:outline-none focus:ring-2"
                >
                  <Image
                    src={'/user-profile.png'}
                    alt={user.name || 'User Profile'}
                    fill
                    className="object-cover"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings className="mr-3 h-5 w-5 text-gray-400" />
                        Settings
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Heart className="mr-3 h-5 w-5 text-gray-400" />
                        Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export { Header };
