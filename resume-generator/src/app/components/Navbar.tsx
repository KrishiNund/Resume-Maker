'use client';

// import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SafeLink from './SafeLink';
// import { Button } from "@/components/ui/button";

export default function Navbar(){


  return (
    <nav className="py-4 border-b border-gray-100">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <SafeLink to="/" className="text-2xl font-bold">
            ResumePal
          </SafeLink>
        </div>

        <div className="hidden md:flex items-center space-x-10">
          <SafeLink to="/resumebuilder" className="text-sm text-gray-600 hover:text-black">
            RESUME BUILDER
          </SafeLink>
          <SafeLink to="/templates" className="text-sm text-gray-600 hover:text-black">
            TEMPLATES
          </SafeLink>
          <SafeLink to="" className="text-sm text-gray-600 hover:text-black">
            ABOUT
          </SafeLink>
          <SafeLink to="/pricing" className="text-sm text-gray-600 hover:text-black">
            PRICING
          </SafeLink>
        </div>
      </div>
    </nav>
  );
};
