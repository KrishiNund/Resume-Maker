'use client';

import Link from 'next/link';
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and tagline */}
          <div className="lg:col-span-2">
            <SafeLink to="/" className="text-2xl font-bold">
              ResumePal
            </SafeLink>
            <p className="mt-4 text-gray-600 max-w-xs">
              Professional resume builder helping job seekers create standout resumes that get more interviews.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-sm mb-4">PRODUCT</h3>
            <ul className="space-y-3">
              <li><SafeLink to="/templates" className="text-gray-600 hover:text-black">Templates</SafeLink></li>
              <li><SafeLink to="/features" className="text-gray-600 hover:text-black">Features</SafeLink></li>
              <li><SafeLink to="/pricing" className="text-gray-600 hover:text-black">Pricing</SafeLink></li>
              <li><SafeLink to="/testimonials" className="text-gray-600 hover:text-black">Testimonials</SafeLink></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-sm mb-4">RESOURCES</h3>
            <ul className="space-y-3">
              <li><SafeLink to="/blog" className="text-gray-600 hover:text-black">Blog</SafeLink></li>
              <li><SafeLink to="/guides" className="text-gray-600 hover:text-black">Resume Guides</SafeLink></li>
              <li><SafeLink to="/examples" className="text-gray-600 hover:text-black">Resume Examples</SafeLink></li>
              <li><SafeLink to="/career-advice" className="text-gray-600 hover:text-black">Career Advice</SafeLink></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-sm mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li><SafeLink to="/about" className="text-gray-600 hover:text-black">About Us</SafeLink></li>
              <li><SafeLink to="/contact" className="text-gray-600 hover:text-black">Contact</SafeLink></li>
              <li><SafeLink to="/privacy" className="text-gray-600 hover:text-black">Privacy Policy</SafeLink></li>
              <li><SafeLink to="/terms" className="text-gray-600 hover:text-black">Terms of Service</SafeLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© {currentYear} ResumePal. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-600 text-sm">
              Designed by <span className="font-medium">ResumePal Team</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
