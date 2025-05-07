import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingBag, User2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo/nike.svg"
            alt="Pet World Logo"
            width={70}
            height={70}
            className="cursor-pointer"
          />
        </Link>

        <nav className="hidden md:flex gap-6 font-medium text-sm text-black">
          <Link href="/explore">Explore</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/add-pet">Add Pet</Link>
          <Link href="/my-pets">My Pets</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/help">Help</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-full">
            <Search size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">Search all products</span>
          </div>

          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-300">
            <Image
              src="/user-profile.png"
              alt="Sparkle"
              fill
              className="object-cover"
            />
          </div>

          <User2 className="w-5 h-5 text-black cursor-pointer" />

          <ShoppingBag className="w-5 h-5 text-black cursor-pointer" />
        </div>
      </div>
    </header>
  );
};
export { Header };
