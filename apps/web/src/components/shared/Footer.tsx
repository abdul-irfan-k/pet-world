import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700">
      <div className="container mx-auto flex gap-8 border-b border-gray-200 px-6 py-12">
        <div className="flex w-[63%] justify-between">
          <div>
            <h4 className="mb-6 text-[14px] font-medium uppercase leading-[21px] tracking-wider text-black">
              Customer Service
            </h4>
            <div className="space-y-2 text-[14px] font-medium text-gray-500">
              <div>
                <Link href="/help" className="hover:text-gray-900">
                  Help Center
                </Link>
              </div>
              <div>
                <Link href="/track-order" className="hover:text-gray-900">
                  Track Order
                </Link>
              </div>
              <div>
                <Link href="/returns" className="hover:text-gray-900">
                  Returns
                </Link>
              </div>
              <div>
                <Link href="/shipping" className="hover:text-gray-900">
                  Shipping
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-[14px] font-medium uppercase leading-[21px] tracking-wider text-black">
              About
            </h4>
            <div className="space-y-2 text-[14px] font-medium text-gray-500">
              <div>
                <Link href="/about" className="hover:text-gray-900">
                  Our Mission
                </Link>
              </div>
              <div>
                <Link href="/how-it-works" className="hover:text-gray-900">
                  How It Works
                </Link>
              </div>
              <div>
                <Link href="/team" className="hover:text-gray-900">
                  Meet the Team
                </Link>
              </div>
              <div>
                <Link href="/careers" className="hover:text-gray-900">
                  Careers
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-6 text-[14px] font-medium uppercase leading-[21px] tracking-wider text-black">
              About
            </h4>
            <div className="space-y-2 text-[14px] font-medium text-gray-500">
              <div>
                <Link href="/about" className="hover:text-gray-900">
                  Our Mission
                </Link>
              </div>
              <div>
                <Link href="/how-it-works" className="hover:text-gray-900">
                  How It Works
                </Link>
              </div>
              <div>
                <Link href="/team" className="hover:text-gray-900">
                  Meet the Team
                </Link>
              </div>
              <div>
                <Link href="/careers" className="hover:text-gray-900">
                  Careers
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-[14px] font-medium uppercase leading-[21px] tracking-wider text-black">
              Pet Adoption
            </h4>
            <div className="space-y-2 text-[14px] font-medium text-gray-500">
              <div>
                <Link href="/adopt" className="hover:text-gray-900">
                  Browse Pets
                </Link>
              </div>
              <div>
                <Link href="/pet-owner" className="hover:text-gray-900">
                  Become a Pet Owner
                </Link>
              </div>
              <div>
                <Link href="/breeds" className="hover:text-gray-900">
                  Pet Breeds
                </Link>
              </div>
              <div>
                <Link href="/faq" className="hover:text-gray-900">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <h4 className="mb-6 text-[14px] font-medium uppercase leading-[21px] tracking-wider text-black">
            Connect
          </h4>
          <div className="mb-4 flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              <Youtube size={20} />
            </a>
          </div>
          <select className="w-fdivl rounded bg-gray-100 p-2 text-xs text-gray-700">
            <option>English (EN)</option>
            <option>हिंदी (HI)</option>
            <option>Español (ES)</option>
          </select>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-6 text-xs text-gray-500 md:flex-row">
        <p className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} PetAdopt. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link href="/terms" className="hover:text-gray-700">
            Terms of Use
          </Link>
          <Link href="/privacy" className="hover:text-gray-700">
            Privacy Policy
          </Link>
          <Link href="/sitemap" className="hover:text-gray-700">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
