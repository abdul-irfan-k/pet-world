'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Search, ShoppingBag, User2 } from 'lucide-react';

import { Button } from '../ui/button';

import { useAuthStore } from '@/stores/authStore';

const Header = () => {
  const { isAuthenticated, user } = useAuthStore();

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
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-300">
                <Image
                  src={'/user-profile.png'}
                  alt={user.name || 'User Profile'}
                  fill
                  className="object-cover"
                />
              </div>
              <User2 className="h-5 w-5 cursor-pointer text-black" />
              <ShoppingBag className="h-5 w-5 cursor-pointer text-black" />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export { Header };
