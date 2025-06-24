'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ShoppingBag, User2, Settings, Heart, LogOut, Globe, HelpCircle, MessageSquare } from 'lucide-react';

import { Button } from '../../ui/button';
import { HeaderSearch } from '../search/HeaderSearch';

import { Avatar } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu';
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
    <header className="fixed z-20 h-20 w-full bg-white shadow-sm">
      <div className="container relative mx-auto flex items-center justify-between">
        <Link href="/" className="z-40">
          <Image src="/logo/logo.png" alt="Pet World Logo" width={150} height={50} className="cursor-pointer" />
        </Link>

        {/* <nav className="hidden gap-6 text-sm font-medium text-black md:flex">
          <Link href="/explore">Explore</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/add-pet">Add Pet</Link>
          <Link href="/my-pets">My Pets</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/help">Help</Link>
        </nav> */}

        <div className="relative z-40 flex items-center gap-3">
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
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-fit">
                    <Avatar className="h-10 w-10">
                      <Image
                        src={'/user-profile.png'}
                        alt={user.name || 'User Profile'}
                        fill
                        className="object-cover"
                      />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="fade-in-0 zoom-out-95 w-64 p-0">
                    <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User2 className="mr-3 h-5 w-5" />
                        Dashboard
                      </Link>
                      <Link
                        href="/add-pet"
                        className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <ShoppingBag className="mr-3 h-5 w-5" />
                        Add Pets
                      </Link>
                      <Link
                        href="/become-adopter"
                        className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Heart className="mr-3 h-5 w-5" />
                        Become Pet Adopter
                      </Link>
                      <div className="my-2 border-t" />
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User2 className="mr-3 h-5 w-5" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings className="mr-3 h-5 w-5" />
                        Account settings
                      </Link>
                      <Link
                        href="/messages"
                        className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <MessageSquare className="mr-3 h-5 w-5" />
                        Messages
                      </Link>
                      <div className="my-2 border-t" />
                      <Link
                        href="/languages-currency"
                        className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Globe className="mr-3 h-5 w-5" />
                        Languages & currency
                      </Link>
                      <Link
                        href="/help"
                        className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <HelpCircle className="mr-3 h-5 w-5" />
                        Help Centre
                      </Link>
                      <div className="my-2 border-t" />
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-black"
                        role="menuitem"
                      >
                        <LogOut className="mr-3 h-5 w-5" />
                        Log out
                      </button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
        <div className="absolute left-[50%] z-20 translate-x-[-50%]">
          <HeaderSearch />
        </div>
      </div>
    </header>
  );
};
export { Header };
