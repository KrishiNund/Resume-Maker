'use client';

import Link from 'next/link';
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-4">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-center gap-4 text-xs text-gray-500">
          {/* Copyright */}
          <span>© {currentYear} LetMeResume. All rights reserved.</span>

          {/* Links */}
          {/* <div className="flex flex-wrap justify-center gap-4">
            <Link href="/resumebuilder" className="hover:text-gray-800 transition-colors">
              Builder
            </Link>
            <Link href="/privacy" className="hover:text-gray-800 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-800 transition-colors">
              Terms
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}