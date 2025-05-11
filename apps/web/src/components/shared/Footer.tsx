import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-12 text-gray-700 lg:py-24">
      <div className="container mx-auto flex flex-col gap-8 border-b border-gray-200 pb-8 lg:flex-row lg:pb-12">
        <div className="flex w-full flex-col justify-between gap-8 md:flex-row lg:w-[50%] lg:flex-row lg:gap-0">
          <div>
            <h4 className="mb-4 text-sm font-medium uppercase leading-snug tracking-wider text-black lg:mb-6">
              Customer Service
            </h4>
            <div className="space-y-2 text-sm font-medium text-gray-500">
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
            <h4 className="mb-4 text-sm font-medium uppercase leading-snug tracking-wider text-black lg:mb-6">
              About
            </h4>
            <div className="space-y-2 text-sm font-medium text-gray-500">
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
            <h4 className="mb-4 text-sm font-medium uppercase leading-snug tracking-wider text-black lg:mb-6">
              Resources
            </h4>
            <div className="space-y-2 text-sm font-medium text-gray-500">
              <div>
                <Link href="/blog" className="hover:text-gray-900">
                  Blog
                </Link>
              </div>
              <div>
                <Link href="/guides" className="hover:text-gray-900">
                  Pet Care Guides
                </Link>
              </div>
              <div>
                <Link href="/faq" className="hover:text-gray-900">
                  FAQs
                </Link>
              </div>
              <div>
                <Link href="/events" className="hover:text-gray-900">
                  Events
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium uppercase leading-snug tracking-wider text-black lg:mb-6">
              Pet Adoption
            </h4>
            <div className="space-y-2 text-sm font-medium text-gray-500">
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

        <div className="w-full lg:ml-auto lg:w-[37%]">
          <h4 className="mb-4 text-sm font-medium uppercase leading-snug tracking-wider text-black lg:mb-6">
            Stay Connected
          </h4>
          <p className="mb-4 text-sm text-gray-500">
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <form className="mb-6 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="focus:border-brand-500 focus:ring-brand-500 flex-grow rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 focus:ring-brand-500 rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <Youtube size={20} />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 flex flex-col items-center justify-between text-sm text-gray-500 lg:flex-row">
        <p>&copy; {new Date().getFullYear()} Pet World. All rights reserved.</p>
        <div className="mt-4 flex space-x-4 lg:mt-0">
          <Link href="/privacy-policy" className="hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-gray-900">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
