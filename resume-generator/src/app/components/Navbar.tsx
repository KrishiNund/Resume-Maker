'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function Navbar(){
  const pathname = usePathname();

  // SafeLink for internal and external links
  const SafeLink = ({
    to,
    children,
    className,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    if (to.startsWith('http')) {
      return (
        <a href={to} className={className} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <Link href={to} className={className}>
        {children}
      </Link>
    );
  };

  return (
    <nav className="py-4 border-b border-gray-100">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <SafeLink to="/" className="text-2xl font-bold">
            ResumePal
          </SafeLink>
        </div>

        <div className="hidden md:flex items-center space-x-10">
          <SafeLink to="/templates" className="text-sm text-gray-600 hover:text-black">
            TEMPLATES
          </SafeLink>
          <SafeLink to="/resources" className="text-sm text-gray-600 hover:text-black">
            RESOURCES
          </SafeLink>
          <SafeLink to="/about" className="text-sm text-gray-600 hover:text-black">
            ABOUT
          </SafeLink>
          <SafeLink to="/pricing" className="text-sm text-gray-600 hover:text-black">
            PRICING
          </SafeLink>
        </div>

        <div className="flex items-center space-x-4">
          <SafeLink to="/login" className="text-sm font-medium">
            SIGN IN
          </SafeLink>
          <Button className="cta-button">GET STARTED</Button>
        </div>
      </div>
    </nav>
  );
};
